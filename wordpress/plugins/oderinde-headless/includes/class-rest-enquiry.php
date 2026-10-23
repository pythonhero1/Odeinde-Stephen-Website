<?php
/**
 * REST API Endpoint: Authenticated Client Enquiry Intake
 *
 * @package OderindeHeadless
 */

if (!defined('ABSPATH')) {
    exit;
}

class OS_Headless_REST_Enquiry {

    public static function init() {
        add_action('rest_api_init', [__CLASS__, 'register_routes']);
    }

    public static function register_routes() {
        register_rest_route('os/v1', '/enquiries', [
            'methods'             => WP_REST_Server::CREATABLE,
            'callback'            => [__CLASS__, 'handle_enquiry'],
            'permission_callback' => [__CLASS__, 'verify_request_auth'],
        ]);
    }

    /**
     * Authenticate request using HMAC signature and timestamp replay validation.
     */
    public static function verify_request_auth(WP_REST_Request $request) {
        $secret = OS_Headless_Security::get_secret('OS_CMS_BRIDGE_SECRET', 'local-bridge-dev-secret-key-32chars');
        
        $signature = $request->get_header('x_os_signature');
        $timestamp = $request->get_header('x_os_timestamp');

        if (empty($signature) || empty($timestamp)) {
            return new WP_Error('unauthorized', __('Missing required security headers', 'oderinde-headless'), ['status' => 401]);
        }

        // 1. Validate replay window (5 minutes)
        if (!OS_Headless_Security::validate_replay_window($timestamp, 300)) {
            return new WP_Error('replay_rejected', __('Request timestamp outside acceptable window', 'oderinde-headless'), ['status' => 401]);
        }

        // 2. Validate HMAC signature
        $raw_body = $request->get_body();
        $payload_to_verify = $timestamp . '.' . $raw_body;

        if (!OS_Headless_Security::verify_hmac($payload_to_verify, $signature, $secret)) {
            return new WP_Error('invalid_signature', __('Invalid HMAC request signature', 'oderinde-headless'), ['status' => 401]);
        }

        return true;
    }

    /**
     * Process, persist, and notify for validated client enquiry.
     */
    public static function handle_enquiry(WP_REST_Request $request) {
        $params = $request->get_json_params();
        if (empty($params) || !is_array($params)) {
            return new WP_Error('invalid_payload', __('Invalid JSON payload', 'oderinde-headless'), ['status' => 400]);
        }

        // 1. IP Rate Limiting via Transients
        $ip = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
        $rate_key = 'os_rate_' . md5($ip);
        $attempts = (int) get_transient($rate_key);
        if ($attempts >= 10) {
            return new WP_Error('rate_limited', __('Too many submissions. Please wait a few minutes.', 'oderinde-headless'), ['status' => 429]);
        }
        set_transient($rate_key, $attempts + 1, 60);

        // 2. Idempotency Check
        $submission_key = sanitize_text_field($params['submissionKey'] ?? '');
        if (!empty($submission_key)) {
            $existing_id = get_transient('os_sub_' . md5($submission_key));
            if ($existing_id) {
                return new WP_REST_Response([
                    'success'       => true,
                    'enquiryId'     => (int) $existing_id,
                    'submissionKey' => $submission_key,
                    'message'       => 'Submission already processed (idempotent).',
                ], 200);
            }
        }

        // 3. Field Sanitization
        $name     = sanitize_text_field($params['name'] ?? '');
        $email    = sanitize_email($params['email'] ?? '');
        $service  = sanitize_text_field($params['service'] ?? '');
        $message  = sanitize_textarea_field($params['message'] ?? '');
        $company  = sanitize_text_field($params['company'] ?? '');
        $website  = esc_url_raw($params['website'] ?? '');
        $budget   = sanitize_text_field($params['budget'] ?? '');
        $timeline = sanitize_text_field($params['timeline'] ?? '');

        if (empty($name) || empty($email) || empty($service) || empty($message)) {
            return new WP_Error('missing_fields', __('Required fields: name, email, service, message', 'oderinde-headless'), ['status' => 400]);
        }

        if (!is_email($email)) {
            return new WP_Error('invalid_email', __('Invalid email address', 'oderinde-headless'), ['status' => 400]);
        }

        // 4. Persistence in Private 'enquiry' CPT
        $post_title = sprintf('Enquiry: %s (%s)', $name, $service);
        $post_id = wp_insert_post([
            'post_title'   => $post_title,
            'post_content' => $message,
            'post_status'  => 'private',
            'post_type'    => 'enquiry',
        ]);

        if (is_wp_error($post_id) || !$post_id) {
            return new WP_Error('save_failed', __('Failed to persist enquiry record', 'oderinde-headless'), ['status' => 500]);
        }

        // Save detailed meta fields
        update_post_meta($post_id, 'client_name', $name);
        update_post_meta($post_id, 'client_email', $email);
        update_post_meta($post_id, 'service', $service);
        update_post_meta($post_id, 'company', $company);
        update_post_meta($post_id, 'website', $website);
        update_post_meta($post_id, 'budget', $budget);
        update_post_meta($post_id, 'timeline', $timeline);
        update_post_meta($post_id, 'ip_address', sanitize_text_field($ip));
        if (!empty($submission_key)) {
            update_post_meta($post_id, 'submission_key', $submission_key);
            set_transient('os_sub_' . md5($submission_key), $post_id, 3600);
        }

        // 5. Email Notification to Verified Inbox
        $recipient = function_exists('get_field') ? get_field('contact_email', 'option') : '';
        if (empty($recipient)) {
            $recipient = 'Contact@oderindestephen.com'; // Per D-10
        }

        $subject = sprintf('[New Website Lead] %s — %s', $name, $service);
        $body  = "A new client enquiry has been submitted on oderindestephen.com:\n\n";
        $body .= "Name: {$name}\n";
        $body .= "Email: {$email}\n";
        $body .= "Service Requested: {$service}\n";
        if (!empty($company))  $body .= "Company: {$company}\n";
        if (!empty($website))  $body .= "Website: {$website}\n";
        if (!empty($budget))   $body .= "Budget (GBP): {$budget}\n";
        if (!empty($timeline)) $body .= "Timeline: {$timeline}\n";
        $body .= "\nMessage:\n{$message}\n\n";
        $body .= "---\nReceived: " . gmdate('Y-m-d H:i:s') . " UTC\nIP: {$ip}\nEnquiry ID: {$post_id}\n";

        $headers = [
            'From: Oderinde Stephen Website <noreply@oderindestephen.com>',
            sprintf('Reply-To: %s <%s>', $name, $email),
        ];

        $mail_sent = wp_mail($recipient, $subject, $body, $headers);
        if (!$mail_sent) {
            update_post_meta($post_id, '_mail_delivery_failed', '1');
            update_post_meta($post_id, '_mail_delivery_error_time', time());
        }

        return new WP_REST_Response([
            'success'       => true,
            'enquiryId'     => $post_id,
            'submissionKey' => $submission_key,
            'message'       => 'Enquiry safely persisted and notification dispatched.',
        ], 201);
    }
}
