<?php
/**
 * ACF Configuration and Options Page
 *
 * @package OderindeHeadless
 */

if (!defined('ABSPATH')) {
    exit;
}

class OS_Headless_ACF_Config {

    public static function init() {
        add_filter('acf/settings/save_json', [__CLASS__, 'save_json_path']);
        add_filter('acf/settings/load_json', [__CLASS__, 'load_json_path']);
        add_action('acf/init', [__CLASS__, 'register_options_page']);
    }

    /**
     * Set directory for saving ACF JSON schema.
     */
    public static function save_json_path($path) {
        $custom_path = WP_PLUGIN_DIR . '/../acf-json';
        if (is_dir($custom_path)) {
            return $custom_path;
        }

        // Inside repo structure: wordpress/acf-json
        $repo_path = dirname(dirname(dirname(__FILE__))) . '/acf-json';
        if (is_dir($repo_path)) {
            return $repo_path;
        }

        return $path;
    }

    /**
     * Add directory for loading ACF JSON schema.
     */
    public static function load_json_path($paths) {
        $repo_path = dirname(dirname(dirname(__FILE__))) . '/acf-json';
        if (is_dir($repo_path)) {
            $paths[] = $repo_path;
        }

        $plugin_adjacent = WP_PLUGIN_DIR . '/../acf-json';
        if (is_dir($plugin_adjacent)) {
            $paths[] = $plugin_adjacent;
        }

        return $paths;
    }

    /**
     * Register Site Settings Options Page in WP Admin.
     */
    public static function register_options_page() {
        if (function_exists('acf_add_options_page')) {
            acf_add_options_page([
                'page_title'    => __('Site Settings', 'oderinde-headless'),
                'menu_title'    => __('Site Settings', 'oderinde-headless'),
                'menu_slug'     => 'oderinde-site-settings',
                'capability'    => 'manage_options',
                'icon_url'      => 'dashicons-admin-generic',
                'redirect'      => false,
                'position'      => 60,
                'show_in_graphql' => false,
            ]);
        }
    }
}
