<?php
/**
 * REST API Endpoint: Content Path Resolver
 *
 * @package OderindeHeadless
 */

if (!defined('ABSPATH')) {
    exit;
}

class OS_Headless_REST_Resolve {

    public static function init() {
        add_action('rest_api_init', [__CLASS__, 'register_routes']);
    }

    public static function register_routes() {
        register_rest_route('os/v1', '/resolve', [
            'methods'             => WP_REST_Server::READABLE,
            'callback'            => [__CLASS__, 'resolve_path'],
            'permission_callback' => '__return_true',
            'args'                => [
                'path' => [
                    'required'          => false,
                    'sanitize_callback' => 'sanitize_text_field',
                    'default'           => '/',
                ],
            ],
        ]);
    }

    /**
     * Resolve URL path to published WordPress content type and ID.
     */
    public static function resolve_path(WP_REST_Request $request) {
        $raw_path = $request->get_param('path');
        $path = trim($raw_path, '/');

        // 1. Root / Homepage path
        if ($path === '' || $path === '/') {
            $front_page_id = get_option('page_on_front');
            if (!$front_page_id) {
                // Find page with slug 'home' or lowest ID
                $home_page = get_page_by_path('home');
                $front_page_id = $home_page ? $home_page->ID : 14;
            }

            $post = get_post($front_page_id);
            if ($post && $post->post_status === 'publish') {
                return self::format_resolution_response($post, 'home');
            }
        }

        // 2. Case study single: /case-study/{slug} or /portfolio/{slug}
        if (preg_match('#^(case-study|portfolio)/([^/]+)$#', $path, $matches)) {
            $slug = sanitize_title($matches[2]);
            $posts = get_posts([
                'name'           => $slug,
                'post_type'      => 'case-study',
                'post_status'    => 'publish',
                'posts_per_page' => 1,
            ]);

            if (!empty($posts)) {
                return self::format_resolution_response($posts[0], 'single-case-study');
            }

            return new WP_Error('not_found', __('Case study not found', 'oderinde-headless'), ['status' => 404]);
        }

        // 3. Blog post single: /insights/{slug} or /blog/{slug}
        if (preg_match('#^(insights|blog)/([^/]+)$#', $path, $matches)) {
            $slug = sanitize_title($matches[2]);
            $posts = get_posts([
                'name'           => $slug,
                'post_type'      => 'post',
                'post_status'    => 'publish',
                'posts_per_page' => 1,
            ]);

            if (!empty($posts)) {
                return self::format_resolution_response($posts[0], 'single-post');
            }

            return new WP_Error('not_found', __('Blog post not found', 'oderinde-headless'), ['status' => 404]);
        }

        // 3b. Archives: /portfolio, /case-studies, /insights, /blog
        if ($path === 'portfolio' || $path === 'case-studies') {
            $cs_page = get_page_by_path('case-studies');
            if ($cs_page && $cs_page->post_status === 'publish') {
                return self::format_resolution_response($cs_page, 'archive-case-studies');
            }
        }
        if ($path === 'insights' || $path === 'blog') {
            return new WP_REST_Response([
                'id'       => 0,
                'slug'     => $path,
                'type'     => 'post-archive',
                'template' => 'archive-posts',
                'title'    => 'Insights & Guides',
                'status'   => 'publish',
            ], 200);
        }

        // 4. Standard Page lookup by path (handling slug variations)
        $normalized_path = $path;
        if ($path === 'e-commerce-development') {
            $page_check = get_page_by_path('e-commerce-development');
            if (!$page_check) {
                $normalized_path = 'ecommerce-development';
            }
        } elseif ($path === 'ecommerce-development') {
            $page_check = get_page_by_path('ecommerce-development');
            if (!$page_check) {
                $normalized_path = 'e-commerce-development';
            }
        }

        $page = get_page_by_path($normalized_path);
        if ($page && $page->post_status === 'publish') {
            $template = 'page';
            if ($page->post_name === 'case-studies') {
                $template = 'archive-case-studies';
            } elseif ($page->post_name === 'contact') {
                $template = 'page-contact';
            } elseif ($page->post_name === 'pricing') {
                $template = 'page-pricing';
            }
            return self::format_resolution_response($page, $template);
        }

        // 5. Fallback check for standard post by slug
        $posts = get_posts([
            'name'           => sanitize_title($path),
            'post_type'      => 'post',
            'post_status'    => 'publish',
            'posts_per_page' => 1,
        ]);

        if (!empty($posts)) {
            return self::format_resolution_response($posts[0], 'single-post');
        }

        // Drafts, private items, or non-existent paths strictly return 404
        return new WP_Error('not_found', __('Content not found or not published', 'oderinde-headless'), ['status' => 404]);
    }

    /**
     * Format standardized resolver response.
     */
    private static function format_resolution_response(WP_Post $post, $template) {
        return new WP_REST_Response([
            'id'       => $post->ID,
            'slug'     => $post->post_name,
            'type'     => $post->post_type,
            'template' => $template,
            'title'    => html_entity_decode(get_the_title($post), ENT_QUOTES, 'UTF-8'),
            'status'   => $post->post_status,
        ], 200);
    }
}
