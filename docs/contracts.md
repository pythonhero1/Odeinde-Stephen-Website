# CMS contracts: design status

Status: PROPOSED, NOT IMPLEMENTED. Confirm in Phase 02 before coding. A native WordPress endpoint in documentation still needs validation against the installed site and its permissions/plugins.

## Contract recording procedure

For each endpoint record method/path, purpose, request and response schema, authentication, public/private fields, examples from the actual local CMS, pagination, empty/error responses, cache policy and affected views. Record the source file and tests once implemented. Use Zod or an equivalent shared documented schema on the frontend boundary. Do not commit private lead bodies or credentials.

## Native resources to inspect

- `/wp-json/wp/v2/pages`, posts and media, using pagination and response headers.
- Actual case study/portfolio post types and their REST bases. Exported post ID 96182 does not establish a post type or permalink.
- ACF group REST opt-in and selected public fields.
- Rank Math `/wp-json/rankmath/v1/getHead?url=...`, when documented headless support is enabled. It returns a success flag and head HTML, not a ready-made Next.js Metadata object.
- Authenticated revision/autosave behavior and ACF data. Prove preview shows the latest saved edit rather than only published values.

## New project interfaces to design and implement

| Method/path | Proposed responsibility | Required evidence |
| --- | --- | --- |
| `GET /wp-json/os/v1/site` | Whitelisted public settings, navigation, footer, public booking/contact information. | No secret/private options; schema and empty data handling. |
| `GET /wp-json/os/v1/resolve` | Resolve full public path to public content type/ID/template. | Nested paths, collisions, missing/private/draft content and canonical mapping. |
| `POST /wp-json/os/v1/enquiries` | Authenticated intake, private record storage and WordPress notification. | Timestamped body signature, replay bounds, duplicate submission behavior, persistent limit, invalid fields and mail failure. |
| `POST /api/enquiry` | Public frontend validation and private CMS relay. | Invalid request, Turnstile failure, timeout, accessibility and real submission receipt. |
| `GET /api/preview` | Validate signed preview token, enable private preview, redirect to approved local path. | Invalid/expired token, no open redirect, correct latest draft, no credential/draft leakage. |
| Preview exit using POST | Exit preview deliberately. | Public content/cache restored; cookie state verified. |
| `POST /api/revalidate` | Verify CMS events and invalidate affected content/settings/SEO. | Bad signature, update, slug change, delete/unpublish, relationships, menus and metadata updates. |

Do not hardcode an entire CMS in frontend JSON and call the integration complete. Normalized Divi exports are reference material; they contain dynamic expressions and do not replace live WordPress records.

## Form behavior to agree

The reference Contact page has name/email/message/service required; company/website, budget and timeline optional. Source IDs/labels/options are in the normalized Contact audit. Review the GBP pricing versus USD budget options with Stephen before publishing a unified currency policy.

Verify `Contact@oderindestephen.com` as the recipient. Use a domain-authenticated From address, with the visitor email as validated Reply-To. Do not use arbitrary visitor input for mail headers. Persist a private enquiry before reporting receipt. Log notification failure without exposing private data and provide an admin retry path. `wp_mail()` returning success is not evidence of inbox delivery; confirm a real delivered message.

An upstream failure must produce an honest recoverable error or a truthful queued receipt when persistence succeeded. Never display a success screen for a local-only console log or unaccepted request. Avoid duplicate leads from retries with a stable submission key. Browser inputs are untrusted even when the form UI validates them.
