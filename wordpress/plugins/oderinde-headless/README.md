# Oderinde Stephen Headless Integration Plugin

WordPress integration plugin bridging WordPress CMS data with the Next.js headless frontend application.

## 1. Responsibilities

- **Custom Post Types:**
  - `case-study`: Public REST CPT (`/wp/v2/case-study`) for portfolio projects.
  - `enquiry`: Private, non-REST CPT for storing incoming client enquiries and audit trails.
- **ACF Schema Synchronization:**
  - Local JSON auto-sync configured to `wordpress/acf-json/`.
  - Site Settings options page (`oderinde-site-settings`).
- **Custom REST API Endpoints (`/wp-json/os/v1/`):**
  - `GET /wp-json/os/v1/site`: Strict public allowlist of site settings, navigation, branding, and Cal.com booking URL.
  - `GET /wp-json/os/v1/resolve?path=...`: Public path resolver mapping URLs to content IDs/templates; strictly isolates drafts with 404 responses.
  - `POST /wp-json/os/v1/enquiries`: Server-to-server HMAC-SHA256 authenticated enquiry intake, rate limiting, persistence, and `wp_mail` delivery.
- **Next.js Draft Mode Preview:**
  - Rewrites preview links to Next.js `/api/preview` with short-lived HMAC-signed tokens.
- **On-Demand ISR Revalidation:**
  - Action hooks on post publish/update/trash dispatch signed webhooks to Next.js `/api/revalidate`.

## 2. Environment Constants (`wp-config.php`)

Add the following constants to `wp-config.php` (or set via environment variables):

```php
// Shared secret for server-to-server enquiry intake from Next.js
define('OS_CMS_BRIDGE_SECRET', 'your-strong-bridge-secret-32-chars');

// Shared secret for signing short-lived Draft Mode preview links
define('OS_PREVIEW_SECRET', 'your-strong-preview-secret-32-chars');

// Shared secret for signing ISR publish revalidation webhooks
define('OS_REVALIDATION_SECRET', 'your-strong-reval-secret-32-chars');

// Canonical frontend origin (e.g. http://localhost:3000 locally, or https://oderindestephen.com)
define('OS_FRONTEND_ORIGIN', 'http://localhost:3000');
```
