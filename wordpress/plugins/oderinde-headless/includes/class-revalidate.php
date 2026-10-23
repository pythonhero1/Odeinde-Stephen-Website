<?php
/**
 * Content Publish and Invalidation Webhook Dispatcher
 *
 * @package OderindeHeadless
 */

if (!defined('ABSPATH')) {
    exit;
}

class OS_Headless_Revalidate {

    public static function init() {
        add_action('save_post', [__CLASS__, 'on_save_post'], 20, 2);
        add_action('post_updated', [__CLASS__, 'on_post_updated'], 20, 3);
        add_action('transition_post_status', [__CLASS__, 'on_status_change'], 20, 3);
        add_action('before_delete_post', [__CLASS__, 'on_delete_post'], 20, 2);
        add_action('acf/save_post', [__CLASS__, 'on_acf_save_options'], 20);
        add_action('wp_update_nav_menu', [__CLASS__, 'on_menu_update'], 20);
        add_action('update_option_rank-math-options-titles', [__CLASS__, 'on_rank_math_options_update'], 20);
        add_action('update_option_rank-math-options-general', [__CLASS__, 'on_rank_math_options_update'], 20);
        add_action('update_option_rank-math-options-sitemap', [__CLASS__, 'on_rank_math_options_update'], 20);
    }

    /**
     * Revalidate on post save/update.
     */
    public static function on_save_post($post_id, $post) {
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return;
        }

        if (wp_is_post_revision($post_id) || wp_is_post_autosave($post_id)) {
            return;
        }

        if (!$post || $post->post_status !== 'publish') {
            return;
        }

        self::dispatch_revalidation_for_post($post);
    }

    /**
     * Capture slug changes on post updates to invalidate both old and new paths.
     */
    public static function on_post_updated($post_id, $post_after, $post_before) {
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return;
        }

        if (wp_is_post_revision($post_id) || wp_is_post_autosave($post_id)) {
            return;
        }

        if (!$post_after || $post_after->post_status !== 'publish') {
            return;
        }

        if ($post_before && $post_before->post_name !== $post_after->post_name) {
            $old_path = self::get_public_path_for_slug($post_before->post_type, $post_before->post_name);
            $new_path = self::get_public_path_for_slug($post_after->post_type, $post_after->post_name);

            $tags = ['cms-pages', 'cms-seo'];
            if ($post_after->post_type === 'case-study') {
                $tags[] = 'cms-case-studies';
            } elseif ($post_after->post_type === 'post') {
                $tags[] = 'cms-posts';
            }

            self::dispatch_revalidation([
                'tags'     => array_values(array_unique($tags)),
                'paths'    => array_values(array_filter(['/', $old_path, $new_path])),
                'postId'   => $post_id,
                'slug'     => $post_after->post_name,
                'oldSlug'  => $post_before->post_name,
            ]);
        }
    }

    /**
     * Revalidate on status transitions (e.g. publish, unpublish, trash).
     */
    public static function on_status_change($new_status, $old_status, $post) {
        if ($new_status === $old_status) {
            return;
        }

        if ($new_status === 'publish' || $old_status === 'publish') {
            self::dispatch_revalidation_for_post($post);
        }
    }

    /**
     * Revalidate before post deletion.
     */
    public static function on_delete_post($post_id, $post) {
        if ($post && $post->post_status === 'publish') {
            self::dispatch_revalidation_for_post($post);
        }
    }

    /**
     * Revalidate when Site Settings options are updated.
     */
    public static function on_acf_save_options($post_id) {
        if ($post_id === 'options' || $post_id === 'oderinde-site-settings') {
            self::dispatch_revalidation([
                'tags'  => ['cms-settings', 'cms-seo'],
                'paths' => ['/'],
            ]);
        }
    }

    /**
     * Revalidate when WordPress navigation menus are updated.
     */
    public static function on_menu_update() {
        self::dispatch_revalidation([
            'tags'  => ['cms-settings', 'cms-pages'],
            'paths' => ['/', '/case-studies', '/pricing', '/contact', '/portfolio', '/insights'],
        ]);
    }

    /**
     * Revalidate when Rank Math global titles/SEO settings change.
     */
    public static function on_rank_math_options_update() {
        self::dispatch_revalidation([
            'tags'  => ['cms-seo', 'cms-pages'],
            'paths' => ['/'],
        ]);
    }

    /**
     * Helper to map post type and slug to public frontend path.
     */
    private static function get_public_path_for_slug($post_type, $slug) {
        switch ($post_type) {
            case 'page':
                return '/' . ltrim($slug, '/');
            case 'case-study':
                return '/case-study/' . $slug;
            case 'post':
                return '/insights/' . $slug;
            default:
                return '/' . $slug;
        }
    }

    /**
     * Map post to affected cache tags and paths.
     */
    private static function dispatch_revalidation_for_post(WP_Post $post) {
        $tags = ['cms-seo'];
        $paths = ['/']; // Homepage always refreshed for header/footer/recents

        switch ($post->post_type) {
            case 'page':
                $tags[] = 'cms-pages';
                $paths[] = '/' . ltrim($post->post_name, '/');
                break;

            case 'case-study':
                $tags[] = 'cms-case-studies';
                $tags[] = 'cms-pages'; // case-studies archive page
                $paths[] = '/case-studies';
                $paths[] = '/portfolio';
                $paths[] = '/business-website-solutions';
                $paths[] = '/business-website-development';
                $paths[] = '/e-commerce-development';
                $paths[] = '/case-study/' . $post->post_name;
                break;

            case 'post':
                $tags[] = 'cms-posts';
                $tags[] = 'cms-pages'; // blog archive page
                $paths[] = '/insights';
                $paths[] = '/business-website-development';
                $paths[] = '/insights/' . $post->post_name;
                break;
        }

        if (!empty($tags)) {
            self::dispatch_revalidation([
                'tags'     => array_values(array_unique($tags)),
                'paths'    => array_values(array_unique($paths)),
                'postId'   => $post->ID,
                'postType' => $post->post_type,
                'slug'     => $post->post_name,
            ]);
        }
    }

    /**
     * Dispatch HMAC-signed async webhook to Next.js /api/revalidate.
     */
    public static function dispatch_revalidation(array $payload) {
        $frontend_origin = OS_Headless_Security::get_frontend_origin();
        $secret = OS_Headless_Security::get_secret('OS_REVALIDATION_SECRET', 'local-reval-dev-secret-key-32chars');

        $revalidate_url = trailingslashit($frontend_origin) . 'api/revalidate';
        $json_payload = wp_json_encode($payload);
        $timestamp = (string) time();

        $signature = OS_Headless_Security::compute_hmac($timestamp . '.' . $json_payload, $secret);

        // Non-blocking asynchronous HTTP request
        wp_remote_post($revalidate_url, [
            'timeout'   => 5,
            'blocking'  => false,
            'headers'   => [
                'Content-Type'   => 'application/json',
                'X-OS-Signature' => $signature,
                'X-OS-Timestamp' => $timestamp,
            ],
            'body'      => $json_payload,
        ]);
    }
}
