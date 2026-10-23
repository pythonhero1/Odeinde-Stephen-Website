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
