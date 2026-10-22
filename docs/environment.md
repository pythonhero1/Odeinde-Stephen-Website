# Environment and secret handling

These variable names are proposed project configuration, not existing live values. Finalize them in the approved CMS contract phase.

| Variable | Visibility | Meaning |
| --- | --- | --- |
| `SITE_URL` | Server | Canonical public origin, eventually `https://oderindestephen.com`. |
| `APP_ORIGIN` | Server | Actual local/preview/production app origin for callback validation. A preview origin is not the canonical public origin. |
| `WP_API_ORIGIN` | Server | Local or remote CMS origin. Remote preview must not use a `.local` hostname. |
| `WP_PREVIEW_USER` | Server | Dedicated WordPress preview user, with only needed read capabilities. |
| `WP_PREVIEW_APPLICATION_PASSWORD` | Server secret | Application password for authenticated draft reads over HTTPS. Not an administrator's normal password. |
| `PREVIEW_SIGNING_SECRET` | Server secret, shared with CMS plugin | Signs preview tokens scoped to content and short expiry. |
| `REVALIDATION_SECRET` | Server secret, shared with CMS plugin | Authenticates publish/content invalidation events. |
| `CMS_BRIDGE_SECRET` | Server secret, shared with CMS plugin | Signs server-to-server enquiry requests with replay protection. |
| `TURNSTILE_SECRET_KEY` | Server secret | Verifies public form tokens with Cloudflare. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Public | Widget site key. Configure allowed local and real hostnames. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Public, optional | Approved frontend analytics property; load in line with reviewed consent behavior. |

The booking URL, contact destinations, navigation and public business identity are CMS settings. Keep a single source of truth rather than adding competing copies in environment files.

Local values belong in the frontend's ignored local environment file. Hosting values belong in the correct provider environment scope. CMS shared secrets belong in server configuration or secured plugin settings excluded from its public settings endpoint. Add a names-only `.env.example` during approved setup, with blank secrets and documented examples for nonsecret origins. Do not include live values in plans or screenshots.

Never print secret-bearing environment files to chat, commit them, expose them with a `NEXT_PUBLIC_` prefix or forward WordPress credentials to the browser. Rotate exposed credentials. Restrict server fetches to the configured CMS origin and validate paths to avoid arbitrary outbound requests.

Separate public production cache from preview/private requests. Do not put secret values in invalidation cache keys, analytics events, URLs or client source maps. A signed, expiring preview token may appear in a CMS-generated preview URL; the signing secret and application password must never appear there.
