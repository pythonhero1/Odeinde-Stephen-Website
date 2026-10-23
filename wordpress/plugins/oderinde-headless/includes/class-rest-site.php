<?php
/**
 * REST API Endpoint: Site Settings
 *
 * @package OderindeHeadless
 */

if (!defined('ABSPATH')) {
    exit;
}

class OS_Headless_REST_Site {

    public static function init() {
        add_action('rest_api_init', [__CLASS__, 'register_routes']);
    }

    public static function register_routes() {
        register_rest_route('os/v1', '/site', [
            'methods'             => WP_REST_Server::READABLE,
            'callback'            => [__CLASS__, 'get_site_settings'],
            'permission_callback' => '__return_true',
        ]);
    }

    /**
     * Return strictly allowlisted site settings.
     */
    public static function get_site_settings(WP_REST_Request $request) {
        // Core branding
        $site_name = get_bloginfo('name') ?: 'Oderinde Stephen';
        $site_tagline = get_bloginfo('description') ?: 'Website Development & Digital Solutions';

        // ACF Options values with fallback defaults
        $booking_url = function_exists('get_field') ? get_field('booking_url', 'option') : '';
        if (empty($booking_url)) {
            $booking_url = 'https://cal.com/oderinde/free'; // Per D-6
        }

        $contact_email = function_exists('get_field') ? get_field('contact_email', 'option') : '';
        if (empty($contact_email)) {
            $contact_email = 'Contact@oderindestephen.com'; // Per D-10
        }

        $currency = function_exists('get_field') ? get_field('currency', 'option') : '';
        if (empty($currency)) {
            $currency = 'GBP'; // Per D-8
        }

        $portal_url = function_exists('get_field') ? get_field('portal_url', 'option') : '';
        if (empty($portal_url)) {
            $portal_url = 'https://portal.oderindestephen.com/';
        }

        // Social Links
        $social_acf = function_exists('get_field') ? get_field('social_links', 'option') : [];
        $social_links = [
            'linkedin'       => !empty($social_acf['linkedin']) ? $social_acf['linkedin'] : 'https://www.linkedin.com/in/pythonhero/',
            'clutch'         => !empty($social_acf['clutch']) ? $social_acf['clutch'] : 'https://clutch.co/profile/oderinde-stephen',
            'trustpilot'     => !empty($social_acf['trustpilot']) ? $social_acf['trustpilot'] : 'https://www.trustpilot.com/review/oderindestephen.com',
            'googleBusiness' => !empty($social_acf['google_business']) ? $social_acf['google_business'] : 'https://share.google/vDGgZ0FrAHvVTa31h',
        ];

        // Header Navigation (from ACF or fallback to WordPress main-menu)
        $navigation = [];
        $acf_nav = function_exists('get_field') ? get_field('navigation_header', 'option') : [];

        if (!empty($acf_nav) && is_array($acf_nav)) {
            foreach ($acf_nav as $item) {
                $navigation[] = [
                    'label'      => sanitize_text_field($item['label'] ?? ''),
                    'path'       => esc_url_raw($item['path'] ?? ''),
                    'isExternal' => !empty($item['is_external']),
                    'isCta'      => !empty($item['is_cta']),
                ];
            }
        } else {
            // Fallback to verified WordPress menu items
            $navigation = [
                ['label' => 'Solutions', 'path' => '/business-website-solutions', 'isExternal' => false, 'isCta' => false],
                ['label' => 'Development', 'path' => '/business-website-development', 'isExternal' => false, 'isCta' => false],
                ['label' => 'Case Studies', 'path' => '/case-studies', 'isExternal' => false, 'isCta' => false],
                ['label' => 'Pricing', 'path' => '/pricing', 'isExternal' => false, 'isCta' => false],
                ['label' => 'Contact', 'path' => '/contact', 'isExternal' => false, 'isCta' => false],
                ['label' => 'Book Call', 'path' => $booking_url, 'isExternal' => true, 'isCta' => true],
            ];
        }

        // Footer Settings
        $copyright = function_exists('get_field') ? get_field('copyright_text', 'option') : '';
        if (empty($copyright)) {
            $copyright = '© 2026 Oderinde Stephen. All rights reserved.';
        }

        $legal_links = [
            ['label' => 'Privacy Policy', 'path' => '/privacy-policy'],
            ['label' => 'Terms of Service', 'path' => '/terms'],
        ];

        $response_data = [
            'siteName'     => sanitize_text_field($site_name),
            'siteTagline'  => sanitize_text_field($site_tagline),
            'bookingUrl'   => esc_url_raw($booking_url),
            'contactEmail' => sanitize_email($contact_email),
            'currency'     => sanitize_text_field($currency),
            'portalUrl'    => esc_url_raw($portal_url),
            'socialLinks'  => $social_links,
            'navigation'   => $navigation,
            'footer'       => [
                'copyright'  => sanitize_text_field($copyright),
                'legalLinks' => $legal_links,
            ],
        ];

        return new WP_REST_Response($response_data, 200);
    }
}
