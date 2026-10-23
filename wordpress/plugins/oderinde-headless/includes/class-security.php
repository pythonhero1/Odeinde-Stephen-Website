<?php
/**
 * Security and Cryptographic Helpers
 *
 * @package OderindeHeadless
 */

if (!defined('ABSPATH')) {
    exit;
}

class OS_Headless_Security {

    /**
     * Get shared secret with environment fallback.
     *
     * @param string $constant_name Constant name.
     * @param string $default Fallback value.
     * @return string
     */
    public static function get_secret($constant_name, $default = '') {
        $aliases = [
            'OS_PREVIEW_SECRET'      => ['PREVIEW_SIGNING_SECRET', 'OS_PREVIEW_SECRET'],
            'PREVIEW_SIGNING_SECRET' => ['PREVIEW_SIGNING_SECRET', 'OS_PREVIEW_SECRET'],
            'OS_CMS_BRIDGE_SECRET'   => ['CMS_BRIDGE_SECRET', 'OS_CMS_BRIDGE_SECRET'],
            'CMS_BRIDGE_SECRET'      => ['CMS_BRIDGE_SECRET', 'OS_CMS_BRIDGE_SECRET'],
            'OS_REVALIDATION_SECRET' => ['REVALIDATION_SECRET', 'OS_REVALIDATION_SECRET'],
            'REVALIDATION_SECRET'    => ['REVALIDATION_SECRET', 'OS_REVALIDATION_SECRET'],
            'OS_FRONTEND_ORIGIN'     => ['NEXT_PUBLIC_SITE_ORIGIN', 'FRONTEND_ORIGIN', 'OS_FRONTEND_ORIGIN'],
        ];

        $keys_to_check = isset($aliases[$constant_name]) ? $aliases[$constant_name] : [$constant_name];

        foreach ($keys_to_check as $key) {
            if (defined($key)) {
                return constant($key);
            }
            $env_val = getenv($key);
            if ($env_val !== false && $env_val !== '') {
                return $env_val;
            }
        }

        return $default;
    }

    /**
     * Get configured frontend origin (e.g. http://localhost:3000 or production domain).
     *
     * @return string
     */
    public static function get_frontend_origin() {
        return self::get_secret('OS_FRONTEND_ORIGIN', 'http://localhost:3000');
    }

    /**
     * Verify timestamp against maximum drift window (default: 300 seconds = 5 minutes).
     *
     * @param int|string $timestamp Unix timestamp.
     * @param int $max_drift Maximum allowed clock drift in seconds.
     * @return bool
     */
    public static function validate_replay_window($timestamp, $max_drift = 300) {
        $ts = intval($timestamp);
        if ($ts <= 0) {
            return false;
        }

        return abs(time() - $ts) <= $max_drift;
    }

    /**
     * Compute HMAC-SHA256 signature for data string.
     *
     * @param string $data Data to sign.
     * @param string $secret Shared secret.
     * @return string Hex-encoded HMAC signature.
     */
    public static function compute_hmac($data, $secret) {
        if (empty($secret)) {
            return '';
        }
        return hash_hmac('sha256', $data, $secret);
    }

    /**
     * Verify HMAC-SHA256 signature using timing-safe comparison.
     *
     * @param string $data Expected raw signed data.
     * @param string $provided_signature Provided hex signature.
     * @param string $secret Shared secret.
     * @return bool
     */
    public static function verify_hmac($data, $provided_signature, $secret) {
        if (empty($provided_signature) || empty($secret)) {
            return false;
        }

        $expected = self::compute_hmac($data, $secret);
        return hash_equals($expected, $provided_signature);
    }
}
