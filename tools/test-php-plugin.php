<?php
/**
 * Standalone PHP Plugin Verification Test Suite
 *
 * Runs via LocalWP PHP CLI or standard PHP CLI without requiring full WordPress bootstrap.
 */

if (!defined('ABSPATH')) {
    define('ABSPATH', dirname(__DIR__) . '/wordpress/');
}

// Minimal WordPress function shims for CLI unit testing
if (!function_exists('add_action')) {
    function add_action($tag, $callback, $priority = 10, $accepted_args = 1) {}
}
if (!function_exists('register_post_type')) {
    function register_post_type($post_type, $args = []) {}
}
if (!function_exists('register_rest_route')) {
    function register_rest_route($namespace, $route, $args = []) {}
}
if (!function_exists('wp_json_encode')) {
    function wp_json_encode($data) {
        return json_encode($data);
    }
}
if (!function_exists('trailingslashit')) {
    function trailingslashit($string) {
        return rtrim($string, '/\\') . '/';
    }
}
if (!function_exists('sanitize_text_field')) {
    function sanitize_text_field($str) {
        return trim(strip_tags($str));
    }
}
if (!function_exists('esc_url_raw')) {
    function esc_url_raw($url) {
        return filter_var($url, FILTER_SANITIZE_URL);
    }
}
if (!function_exists('sanitize_email')) {
    function sanitize_email($email) {
        return filter_var($email, FILTER_SANITIZE_EMAIL);
    }
}
if (!function_exists('get_bloginfo')) {
    function get_bloginfo($show = '') {
        return 'Oderinde Stephen';
    }
}

// Require plugin security class
require_once dirname(__DIR__) . '/wordpress/plugins/oderinde-headless/includes/class-security.php';

$passes = 0;
$failures = 0;

function assert_test($condition, $name) {
    global $passes, $failures;
    if ($condition) {
        echo "[PASS] $name\n";
        $passes++;
    } else {
        echo "[FAIL] $name\n";
        $failures++;
    }
}

echo "Running PHP Plugin Verification Tests...\n";
echo "PHP Version: " . PHP_VERSION . "\n";
echo "--------------------------------------------------------\n";

// Test 1: HMAC-SHA256 Computation
$data = "1729680000.{\"test\":\"payload\"}";
$secret = "local-bridge-dev-secret-key-32chars";
$sig1 = OS_Headless_Security::compute_hmac($data, $secret);
$sig2 = OS_Headless_Security::compute_hmac($data, $secret);

assert_test(strlen($sig1) === 64, "compute_hmac returns 64-character SHA256 hex string");
assert_test($sig1 === $sig2, "compute_hmac is deterministic across identical inputs");

$sig3 = OS_Headless_Security::compute_hmac("different_data", $secret);
assert_test($sig1 !== $sig3, "compute_hmac changes when data changes");

// Test 2: Replay Window Validation
$now = time();
assert_test(OS_Headless_Security::validate_replay_window($now, 300) === true, "validate_replay_window accepts current timestamp");
assert_test(OS_Headless_Security::validate_replay_window($now - 150, 300) === true, "validate_replay_window accepts 150s past timestamp");
assert_test(OS_Headless_Security::validate_replay_window($now - 301, 300) === false, "validate_replay_window rejects >300s past timestamp");
assert_test(OS_Headless_Security::validate_replay_window($now + 350, 300) === false, "validate_replay_window rejects >300s future timestamp");
assert_test(OS_Headless_Security::validate_replay_window("invalid", 300) === false, "validate_replay_window rejects invalid non-numeric string");

// Test 3: Secret Alias Resolution
// Test default fallback
$def = OS_Headless_Security::get_secret('NON_EXISTENT_CONSTANT_KEY', 'default_value');
assert_test($def === 'default_value', "get_secret returns default when unset");

// Test alias resolution for PREVIEW_SIGNING_SECRET / OS_PREVIEW_SECRET
define('PREVIEW_SIGNING_SECRET', 'test-signing-secret-value-12345');
$found1 = OS_Headless_Security::get_secret('OS_PREVIEW_SECRET', 'fallback');
assert_test($found1 === 'test-signing-secret-value-12345', "get_secret resolves OS_PREVIEW_SECRET alias to defined PREVIEW_SIGNING_SECRET");

$found2 = OS_Headless_Security::get_secret('PREVIEW_SIGNING_SECRET', 'fallback');
assert_test($found2 === 'test-signing-secret-value-12345', "get_secret resolves PREVIEW_SIGNING_SECRET directly");

// Test 4: Frontend origin resolution
define('OS_FRONTEND_ORIGIN', 'https://oderindestephen.com');
$origin = OS_Headless_Security::get_frontend_origin();
assert_test($origin === 'https://oderindestephen.com', "get_frontend_origin returns defined frontend origin");

echo "--------------------------------------------------------\n";
echo "PHP Plugin Tests: $passes passed, $failures failed.\n";

if ($failures > 0) {
    exit(1);
}
exit(0);
