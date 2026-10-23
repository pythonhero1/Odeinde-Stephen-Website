<?php
/**
 * Headless Draft Preview Integration
 *
 * @package OderindeHeadless
 */

if (!defined('ABSPATH')) {
    exit;
}

class OS_Headless_Preview {

    public static function init() {
        add_filter('preview_post_link', [__CLASS__, 'filter_preview_link'], 10, 2);
        add_action('rest_api_init', [__CLASS__, 'register_rest_routes']);
    }

    /**
     * Register authenticated preview endpoint.
     */
    public static function register_rest_routes() {
        register_rest_route('os/v1', '/preview', [
            'methods'             => 'GET',
            'callback'            => [__CLASS__, 'get_preview_content'],
            'permission_callback' => [__CLASS__, 'verify_preview_auth'],
            'args'                => [
                'id' => [
                    'type'     => 'integer',
                    'required' => false,
                ],
                'slug' => [
                    'type'     => 'string',
                    'required' => false,
                ],
                'type' => [
                    'type'     => 'string',
                    'required' => false,
                    'default'  => 'any',
                ],
            ],
        ]);
    }

    /**
     * Verify preview authorization via token or server bridge secret.
     */
    public static function verify_preview_auth($request) {
        $token = $request->get_param('token');
        $expires = $request->get_param('expires');
        $id = $request->get_param('id');
        $type = $request->get_param('type') ?: 'any';

        // 1. Check signed preview URL parameters
        if ($token && $expires && $id) {
            $secret = OS_Headless_Security::get_secret('OS_PREVIEW_SECRET', 'local-preview-dev-secret-key-32chars');
            if (time() <= intval($expires)) {
                $payload = sprintf('%d:%s:%d', intval($id), $type, intval($expires));
                $expected = OS_Headless_Security::compute_hmac($payload, $secret);
                if (hash_equals($expected, $token)) {
                    return true;
                }
            }
        }

        // 2. Check server-to-server HMAC bridge secret (headers)
        $signature = $request->get_header('x_os_signature');
        $timestamp = $request->get_header('x_os_timestamp');

        if ($signature && $timestamp) {
            $secret = OS_Headless_Security::get_secret('CMS_BRIDGE_SECRET', 'local-bridge-dev-secret-key-32chars');
            if (abs(time() - intval($timestamp)) <= 300) {
                $expected = OS_Headless_Security::compute_hmac($timestamp . './os/v1/preview', $secret);
                if (hash_equals($expected, $signature)) {
                    return true;
                }
            }
        }

        return new WP_Error('preview_unauthorized', __('Unauthorized preview access.', 'oderinde-headless'), ['status' => 401]);
    }

    /**
     * Get preview content including drafts and revisions.
     */
    public static function get_preview_content($request) {
        $id = $request->get_param('id');
        $slug = $request->get_param('slug');
        $post_type = $request->get_param('type') ?: 'any';

        if ($id) {
            $post = get_post(intval($id));
        } elseif ($slug) {
            $args = [
                'name'        => sanitize_text_field($slug),
                'post_type'   => $post_type === 'any' ? ['page', 'case-study', 'post'] : $post_type,
                'post_status' => 'any',
                'numberposts' => 1,
            ];
            $posts = get_posts($args);
            $post = !empty($posts) ? $posts[0] : null;
        } else {
            return new WP_Error('missing_param', __('Must provide id or slug', 'oderinde-headless'), ['status' => 400]);
        }

        if (!$post) {
            return new WP_Error('not_found', __('Content not found', 'oderinde-headless'), ['status' => 404]);
        }

        $acf_data = [];
        if (function_exists('get_fields')) {
            $acf_fields = get_fields($post->ID);
            if (is_array($acf_fields)) {
                $acf_data = $acf_fields;
            }
        }

        // Fallback for case study meta fields if get_fields didn't provide them
        if (empty($acf_data)) {
            $acf_data = [
                'business_focus'   => get_post_meta($post->ID, 'business_focus', true) ?: '',
                'system_delivered' => get_post_meta($post->ID, 'system_delivered', true) ?: '',
                'verified_outcome' => get_post_meta($post->ID, 'verified_outcome', true) ?: '',
                'technology_1'     => get_post_meta($post->ID, 'technology_1', true) ?: '',
                'technology_2'     => get_post_meta($post->ID, 'technology_2', true) ?: '',
                'technology_3'     => get_post_meta($post->ID, 'technology_3', true) ?: '',
                'color'            => get_post_meta($post->ID, 'color', true) ?: '2563eb',
            ];
        }

        return [
            'id'             => $post->ID,
            'slug'           => $post->post_name,
            'status'         => $post->post_status,
            'type'           => $post->post_type,
            'title'          => ['rendered' => get_the_title($post)],
            'excerpt'        => ['rendered' => get_the_excerpt($post)],
            'content'        => ['rendered' => apply_filters('the_content', $post->post_content)],
            'featured_media' => (int) get_post_thumbnail_id($post),
            'acf'            => $acf_data,
        ];
    }

    /**
     * Rewrite WordPress preview link to Next.js preview route with signed token.
     */
    public static function filter_preview_link($link, $post) {
        if (!$post instanceof WP_Post) {
            return $link;
        }

        $frontend_origin = OS_Headless_Security::get_frontend_origin();
        $secret = OS_Headless_Security::get_secret('OS_PREVIEW_SECRET', 'local-preview-dev-secret-key-32chars');

        // Token valid for 15 minutes (900 seconds)
        $expires = time() + 900;
        $payload = sprintf('%d:%s:%d', $post->ID, $post->post_type, $expires);
        $token = OS_Headless_Security::compute_hmac($payload, $secret);

        $preview_url = add_query_arg([
            'id'      => $post->ID,
            'type'    => $post->post_type,
            'slug'    => $post->post_name,
            'token'   => $token,
            'expires' => $expires,
        ], trailingslashit($frontend_origin) . 'api/preview');

        return $preview_url;
    }
}
