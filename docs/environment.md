# Environment and Secret Handling

Environment variable specifications across Local development, Remote Preview (Phase 08), and Production (Phase 09).

## 1. Complete 3-Tier Variable & Secret Matrix

| Variable | Scope | Local (`.env.local`) | Remote Preview (`preview.oderindestephen.com`) | Production (`oderindestephen.com`) | Purpose |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `SITE_URL` | Server | `http://localhost:3000` | `https://preview.oderindestephen.com` | `https://oderindestephen.com` | Canonical public origin |
| `APP_ORIGIN` | Server | `http://localhost:3000` | `https://preview.oderindestephen.com` | `https://oderindestephen.com` | App runtime origin for callbacks/redirects |
| `WP_API_ORIGIN` | Server | `http://localhost:10004` | `https://cms.oderindestephen.com` | `https://cms.oderindestephen.com` | WordPress REST API endpoint (Strict HTTPS) |
| `CMS_MEDIA_ORIGIN` | Server | `http://localhost:10004` | `https://cms.oderindestephen.com` | `https://cms.oderindestephen.com` | Target for `/wp-content/uploads/` 301 redirects |
| `WP_PREVIEW_USER` | Server | `headless_preview` | `headless_preview` | `headless_preview` | Read-only WordPress preview user |
| `WP_PREVIEW_APPLICATION_PASSWORD` | **Server Secret** | `(local dev password)` | **Cloudflare Encrypted Secret** | **Cloudflare Encrypted Secret** | WordPress Application Password for draft reads |
| `PREVIEW_SIGNING_SECRET` | **Server Secret** | `(32-char dev string)` | **Cloudflare Encrypted Secret** (64 hex) | **Cloudflare Encrypted Secret** (64 hex) | Signs preview tokens (matches `OS_PREVIEW_SECRET`) |
| `REVALIDATION_SECRET` | **Server Secret** | `(32-char dev string)` | **Cloudflare Encrypted Secret** (64 hex) | **Cloudflare Encrypted Secret** (64 hex) | Authenticates publish webhooks (matches `OS_REVALIDATION_SECRET`) |
| `CMS_BRIDGE_SECRET` | **Server Secret** | `(32-char dev string)` | **Cloudflare Encrypted Secret** (64 hex) | **Cloudflare Encrypted Secret** (64 hex) | Signs enquiry relay payloads (matches `CMS_BRIDGE_SECRET`) |
| `TURNSTILE_SECRET_KEY` | **Server Secret** | `1x0000000000000000000000000000000AA` | **Cloudflare Encrypted Secret** | **Cloudflare Encrypted Secret** | Verifies form tokens with Cloudflare Turnstile |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Browser Public | `1x00000000000000000000AA` | Preview Turnstile Site Key | Production Turnstile Site Key | Client-side widget site key |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Browser Public | `(empty)` | `(empty or staging ID)` | `G-XXXXXXXXXX` (if approved) | Optional Google Analytics stream |
| `ENVIRONMENT` | Server | `development` | `preview` | `production` | Enforces `robots.ts` disallow on preview |
| `NODE_VERSION` | Build Only | `v24.20.0` | `20.18.0` | `20.18.0` | Node.js container version for Cloudflare Pages build |

## 2. Rules and Security Boundaries

1. The booking URL (`https://cal.com/oderinde/free`), contact destinations, navigation and public business identity are CMS settings. Keep a single source of truth rather than adding competing copies in environment files.
2. Local values belong in the frontend's ignored `.env.local` file.
3. Hosting values belong in the Cloudflare Pages environment variables and encrypted secrets settings.
4. CMS shared secrets belong in `wp-config.php` on the remote server:
   ```php
   define('OS_FRONTEND_ORIGIN', 'https://preview.oderindestephen.com');
   define('OS_PREVIEW_SECRET', '<GENERATED_64_CHAR_HEX>');
   define('OS_REVALIDATION_SECRET', '<GENERATED_64_CHAR_HEX>');
   define('CMS_BRIDGE_SECRET', '<GENERATED_64_CHAR_HEX>');
   ```
5. Never print secret-bearing environment files to chat, commit them, expose them with a `NEXT_PUBLIC_` prefix, or forward WordPress credentials to the browser.
6. Separate public production cache from preview/private requests. Do not put secret values in invalidation cache keys, analytics events, URLs, or client source maps.
