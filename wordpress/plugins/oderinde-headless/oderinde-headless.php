<?php
/**
 * Plugin Name:       Oderinde Stephen Headless Integration
 * Plugin URI:        https://oderindestephen.com
 * Description:       Headless WordPress bridge providing custom REST endpoints, ACF schemas, signed preview, enquiry intake, and Next.js revalidation.
 * Version:           1.0.0
 * Author:            Stephen Oderinde
 * Author URI:        https://oderindestephen.com
 * License:           GPL v2 or later
 * Text Domain:       oderinde-headless
 * Requires at least: 6.0
 * Requires PHP:      8.0
 *
 * @package OderindeHeadless
 */

if (!defined('ABSPATH')) {
    exit;
}

define('OS_HEADLESS_VERSION', '1.0.0');
define('OS_HEADLESS_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('OS_HEADLESS_PLUGIN_URL', plugin_dir_url(__FILE__));

// Require Core Modules
require_once OS_HEADLESS_PLUGIN_DIR . 'includes/class-security.php';
require_once OS_HEADLESS_PLUGIN_DIR . 'includes/class-post-types.php';
require_once OS_HEADLESS_PLUGIN_DIR . 'includes/class-acf-config.php';
require_once OS_HEADLESS_PLUGIN_DIR . 'includes/class-rest-site.php';
require_once OS_HEADLESS_PLUGIN_DIR . 'includes/class-rest-resolve.php';
require_once OS_HEADLESS_PLUGIN_DIR . 'includes/class-rest-enquiry.php';
require_once OS_HEADLESS_PLUGIN_DIR . 'includes/class-preview.php';
require_once OS_HEADLESS_PLUGIN_DIR . 'includes/class-revalidate.php';

/**
 * Bootstrap the plugin.
 */
function os_headless_init() {
    OS_Headless_Post_Types::init();
    OS_Headless_ACF_Config::init();
    OS_Headless_REST_Site::init();
    OS_Headless_REST_Resolve::init();
    OS_Headless_REST_Enquiry::init();
    OS_Headless_Preview::init();
    OS_Headless_Revalidate::init();
}
add_action('plugins_loaded', 'os_headless_init');

/**
 * Activation hook: flush rewrite rules to recognize custom post types.
 */
register_activation_hook(__FILE__, function () {
    OS_Headless_Post_Types::register_post_types();
    flush_rewrite_rules();
});

/**
 * Deactivation hook: flush rewrite rules on cleanup.
 */
register_deactivation_hook(__FILE__, function () {
    flush_rewrite_rules();
});
