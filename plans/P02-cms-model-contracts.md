# P02: CMS Model, Migration Mapping, and API Contracts

- Task: P02
- Status: IMPLEMENTED - AWAITING STEPHEN CONFIRMATION
- Created: 2026-10-22
- Updated: 2026-10-23
- Repository: oderindestephen-headless

## 1. Task

Implement the project CMS integration plugin (`wordpress/plugins/oderinde-headless`), versioned ACF field schemas (`wordpress/acf-json`), custom secure REST endpoints (`/os/v1/site`, `/os/v1/resolve`, `/os/v1/enquiries`), Next.js client contracts/route handlers (`/api/enquiry`, `/api/preview`, `/api/revalidate`), and seed the 6 published case studies with full fidelity from the reference XML export into the local WordPress runtime, backed by captured integration evidence.

## 2. Memory that applies

- `D-1`: "Migrate the public Divi 5 website to headless WordPress; existing WordPress plugins remain managed there and content/assets may be improved."
- `D-3`: "Recommend ACF Pro flexible approved sections for pages and native WordPress blocks for blog posts, with private frontend preview and automatic publish refresh. Stephen delegated this recommendation."
- `D-4`: "Stephen requires approval. Follow the supplied kit's concrete task plan and explicit APPROVE or APPROVE WITH CHANGES gate, and record owner confirmation separately."
- `D-5`: "Finish incomplete pages locally, push the complete verified release to GitHub, then migrate. Target launch is 24 October 2026 in Africa/Lagos time, conditional on launch gates."
- `D-6`: "All booking buttons use the shared Cal.com URL https://cal.com/oderinde/free found in multiple supplied exports. Verify event availability before launch."
- `D-7`: "Host the frontend on Cloudflare (Cloudflare Pages/Workers) instead of Vercel Pro, retaining WordPress CMS on Spantrix at a dedicated subdomain."
- `D-8`: "Standardize business pricing and budget options to GBP (British Pounds) across both the Pricing page and Contact form budget options."
- `D-9`: "Incorporate the provided WordPress XML export (oderindestephen.WordPress.2026-10-22.xml) into reference/ for CPT case studies, navigation menus, Theme Builder header/footer layouts, and media inventory."
- `D-10`: "Contact form submissions will route to Contact@oderindestephen.com as the verified recipient inbox."
- `D-11`: "Prepare clean, standard Privacy Policy and Terms of Service templates for Stephen's review, filling the gap identified in the source audit."
- `D-12`: "Free Checklist / Guide CTA will temporarily link to the strategy call or contact action until the dedicated downloadable asset is provided and built."
- `D-13`: "Link remote repository https://github.com/pythonhero1/Odeinde-Stephen-Website.git and push verified commits each time Stephen tests and confirms an implementation with 'tested and working'."
- `P-1`: "Agent reports verified implementation awaiting Stephen's confirmation; it does not invent owner sign-off or mark planned work complete."
- `P-2`: "Carry dark backgrounds and blue accents across pages; improve layout and contrast; use rem typography, responsive layouts and WCAG 2.2 AA as the target."
- `P-3`: "Cite original file/source ID/block locator for export claims. Verify actual CMS, rendered behavior, recipients, redirects, private content and delivery separately."
- `P-4`: "Push verified commits to remote origin (https://github.com/pythonhero1/Odeinde-Stephen-Website.git) whenever Stephen tests and confirms an implementation with 'tested and working'."

## 3. Files affected

| Path | Create/modify/delete | Purpose |
| --- | --- | --- |
| `plans/P02-cms-model-contracts.md` | Create | Concrete 14-section implementation plan for Phase 02. |
| `wordpress/plugins/oderinde-headless/oderinde-headless.php` | Create | Main plugin bootstrap, constants, hook registrations, and autoloader. |
| `wordpress/plugins/oderinde-headless/README.md` | Create | Documentation of plugin endpoints, security constants, and local setup. |
| `wordpress/plugins/oderinde-headless/includes/class-post-types.php` | Create | Registers `case-study` (public REST) and `enquiry` (private, non-REST) CPTs. |
| `wordpress/plugins/oderinde-headless/includes/class-acf-config.php` | Create | Configures ACF local JSON save/load paths and registers Site Settings Options Page. |
| `wordpress/plugins/oderinde-headless/includes/class-rest-site.php` | Create | Endpoint `GET /wp-json/os/v1/site` with strict public allowlist. |
| `wordpress/plugins/oderinde-headless/includes/class-rest-resolve.php` | Create | Endpoint `GET /wp-json/os/v1/resolve` resolving URLs to content/template, enforcing draft 404. |
| `wordpress/plugins/oderinde-headless/includes/class-rest-enquiry.php` | Create | Endpoint `POST /wp-json/os/v1/enquiries` with HMAC-SHA256, replay window, deduplication, and `wp_mail`. |
| `wordpress/plugins/oderinde-headless/includes/class-preview.php` | Create | Rewrites preview links to Next.js `/api/preview` with signed, expiring HMAC tokens. |
| `wordpress/plugins/oderinde-headless/includes/class-revalidate.php` | Create | Publish/update/trash webhook dispatcher to Next.js `/api/revalidate`. |
| `wordpress/plugins/oderinde-headless/includes/class-security.php` | Create | Shared HMAC crypto helpers, constant access, and replay window validation. |
| `wordpress/acf-json/post_type_6a7f3c9733052.json` | Create | Versioned ACF CPT schema for `case-study` extracted verbatim from WXR. |
| `wordpress/acf-json/group_6a7f3d410d6c4.json` | Create | Versioned ACF field schema for `case-study` fields (`color`, `technology_1-3`, outcomes). |
| `wordpress/acf-json/group_6a83a52b7ff14.json` | Create | Versioned ACF field schema for blog article metadata (`article_type`, `reading_time`, etc.). |
| `wordpress/acf-json/group_site_settings.json` | Create | Versioned ACF field schema for Site Settings (branding, navigation, footer, Cal.com URL). |
| `wordpress/acf-json/group_page_sections.json` | Create | Versioned ACF flexible content sections schema for structured page editing. |
| `tools/seed-case-studies.php` | Create | Safe, idempotent CLI script to seed the 6 published case studies into LocalWP runtime. |
| `apps/web/src/lib/cms/schema.ts` | Create | Strict Zod runtime schemas for all CMS API response contracts and form payloads. |
| `apps/web/src/lib/cms/schema.test.ts` | Create | Comprehensive unit test suite validating Zod schemas against valid/invalid fixtures. |
| `apps/web/src/lib/cms/api.ts` | Create | Typed API client module with ISR cache tags, draft fetcher, and HMAC enquiry signer. |
| `apps/web/src/lib/cms/fixtures/*.json` | Create | Contract test fixtures representing real JSON payloads for all endpoints. |
| `apps/web/src/app/api/enquiry/route.ts` | Create | Public Next.js route handler validating form input and relaying signed payload to WordPress. |
| `apps/web/src/app/api/preview/route.ts` | Create | Signed Next.js Draft Mode activation handler with WordPress token verification. |
| `apps/web/src/app/api/preview-exit/route.ts` | Create | Next.js Draft Mode deactivation handler restoring public cache rendering. |
| `apps/web/src/app/api/revalidate/route.ts` | Create | HMAC-authenticated webhook handler calling `revalidateTag` and `revalidatePath`. |
| `docs/contracts.md` | Modify | Finalize all CMS and frontend API contracts with exact schemas and security rules. |
| `package.json` | Modify | Add `"php:lint"` script invoking the verified LocalWP PHP 8.2 CLI for syntax checks. |

## 4. Contract status

| Interface | Existing and verified / proposed / unknown | Evidence or decision |
| --- | --- | --- |
| `GET /wp-json/wp/v2/pages` | Existing & Verified | Returns 6 published pages (`home`, `case-studies`, `contact`, `pricing`, `business-website-solutions`, `business-website-development`) from LocalWP on port 10004. |
| `GET /wp-json/wp/v2/posts` | Existing & Verified | Returns 1 published blog post (ID 237) from LocalWP. |
| `GET /wp-json/wp/v2/media` | Existing & Verified | Returns 101 media attachments registered in WXR export. |
| `GET /wp-json/wp/v2/case-study` | Existing Schema, Registered via Plugin | Defined in WXR post ID 71. Returns 404 until plugin registers CPT; will return 6 published case studies once seeded. |
| `GET /wp-json/os/v1/site` | Proposed | Public allowlist: `siteName`, `siteTagline`, `bookingUrl`, `contactEmail`, `currency`, `socialLinks`, `navigation`, `footer`. |
| `GET /wp-json/os/v1/resolve` | Proposed | Full URL path resolver: maps `/`, `/case-study/:slug`, `/insights/:slug`, `/pricing`, etc. to ID/type/template. Returns 404 for drafts. |
| `POST /wp-json/os/v1/enquiries` | Proposed | Server-to-server HMAC-SHA256 authenticated intake. Checks timestamp (5 min window), idempotency key, saves private `enquiry` post, notifies `Contact@oderindestephen.com`. |
| `POST /api/enquiry` | Proposed | Public Next.js form endpoint. Validates Zod schema, checks honeypot/Turnstile, signs and relays to `/wp-json/os/v1/enquiries`. |
| `GET /api/preview` | Proposed | Next.js Draft Mode activator. Verifies signed token, confirms draft via authenticated WP REST read, enables `draftMode()`, redirects safely. |
| `GET /api/preview-exit` | Proposed | Clears Next.js Draft Mode cookies and restores standard public cache rendering. |
| `POST /api/revalidate` | Proposed | Next.js on-demand revalidation handler. Validates HMAC signature, revalidates cache tags and exact paths. |

## 5. Scope check

### Verbatim Acceptance Criteria:
From `prompts/02-cms-model-contracts.md`:
> *"The agreed CMS model and contracts expose real published content safely, preserve existing content meaning, and exclude private/draft data from public access, with captured integration evidence."*

From `OderindeStephen-Headless-Build-Plan-v1.md` Section 10:
> *"Implement the project PHP plugin, ACF field schema, settings, route resolver, content migration mapping, and captured API contracts. Recover dynamic data/media from real WP export. | Real page/project/post data and settings available; private data excluded; field editing persists."*

### Prerequisites:
- Phase 01 complete and confirmed by Stephen ("tested and working").
- Git branch `main` clean and synchronized with remote GitHub repository.
- LocalWP v10.2.0 operational on `http://localhost:10004` with Mailpit on `http://localhost:10000`.
- PHP 8.2.29 CLI verified at `C:\Users\Pythonhero\AppData\Roaming\Local\lightning-services\php-8.2.29+0\bin\win64\php.exe`.
- Reference WXR XML export verified at `reference/wordpress/oderindestephen.WordPress.2026-10-22.xml`.

### Exclusions:
- No visual page rebuilding or styling (Phase 03 Vertical slice).
- No production cutover or DNS changes (Phase 09).
- No external GraphQL or third-party backend frameworks (retaining pure WordPress REST + ACF per `AGENTS.md`).

## 6. Steps

1. **Scaffold Directory Structure & Quality Script:**
   - Create directories `wordpress/plugins/oderinde-headless/includes/` and `wordpress/acf-json/`.
   - Add `"php:lint"` script to root `package.json` pointing to LocalWP's PHP 8.2 CLI.
2. **Implement Versioned ACF JSON Schemas:**
   - Write `wordpress/acf-json/post_type_6a7f3c9733052.json` (CPT `case-study`).
   - Write `wordpress/acf-json/group_6a7f3d410d6c4.json` (Case study fields: `color`, `technology_1`, `technology_2`, `technology_3`, `business_focus`, `system_delivered`, `verified_outcome`).
   - Write `wordpress/acf-json/group_6a83a52b7ff14.json` (Blog article metadata).
   - Write `wordpress/acf-json/group_site_settings.json` (Site settings options page).
   - Write `wordpress/acf-json/group_page_sections.json` (Flexible content sections).
3. **Implement Modular PHP Plugin (`oderinde-headless`):**
   - Implement `oderinde-headless.php` (constants, class autoloader, activation checks).
   - Implement `includes/class-security.php` (HMAC signing/verification, timestamp replay protection).
   - Implement `includes/class-post-types.php` (registers `case-study` for REST and `enquiry` private CPT).
   - Implement `includes/class-acf-config.php` (save/load json hooks, site settings options page).
   - Implement `includes/class-rest-site.php` (`GET /wp-json/os/v1/site` with strict public allowlist).
   - Implement `includes/class-rest-resolve.php` (`GET /wp-json/os/v1/resolve` with 404 for drafts/private).
   - Implement `includes/class-rest-enquiry.php` (`POST /wp-json/os/v1/enquiries` with HMAC verification, rate limits, persistence, `wp_mail`).
   - Implement `includes/class-preview.php` (signed preview link filter).
   - Implement `includes/class-revalidate.php` (publish/trash action hooks dispatching to Next.js).
   - Run `npm run php:lint` to guarantee 100% syntactical validity across all PHP files.
4. **Deploy Plugin & Seed Case Studies in LocalWP:**
   - Copy or symlink plugin to `C:\Users\Pythonhero\Local Sites\oderinde-cms\app\public\wp-content\plugins\oderinde-headless`.
   - Activate plugin via PHP CLI.
   - Run `tools/seed-case-studies.php` to populate the 6 published case studies and their ACF postmeta from the XML export into the LocalWP database.
   - Verify `GET http://localhost:10004/wp-json/wp/v2/case-study` returns all 6 case studies with their `acf` payload.
5. **Implement Frontend Schemas, Fixtures, and Unit Tests:**
   - Create `apps/web/src/lib/cms/schema.ts` with strict Zod schemas for all endpoints.
   - Create sample contract fixture JSONs in `apps/web/src/lib/cms/fixtures/`.
   - Create `apps/web/src/lib/cms/schema.test.ts` testing parsing, defaults, and error boundaries.
   - Run `npm.cmd --prefix apps/web run test` to verify all schema tests pass.
6. **Implement Next.js Route Handlers & API Client:**
   - Implement `apps/web/src/lib/cms/api.ts` with typed methods, ISR tags, and HMAC signing.
   - Implement `apps/web/src/app/api/enquiry/route.ts` (public form relay).
   - Implement `apps/web/src/app/api/preview/route.ts` and `preview-exit/route.ts`.
   - Implement `apps/web/src/app/api/revalidate/route.ts`.
7. **End-to-End Integration Verification:**
   - Test `GET /wp-json/os/v1/site` against LocalWP: verify allowlist contains `bookingUrl` and zero private data.
   - Test `GET /wp-json/os/v1/resolve`: verify `/` resolves to ID 14, `/case-study/born-accelerators-case-study-website` resolves to ID 96087, and non-existent/draft paths return 404.
   - Test `POST /wp-json/os/v1/enquiries` with valid HMAC signature: verify post is created in `enquiry` CPT and email is captured in LocalWP Mailpit.
   - Test replay protection (expired timestamp) and invalid signature: verify 401 Unauthorized.
   - Test Next.js `/api/revalidate` with valid/invalid signatures.
   - Update `docs/contracts.md` with final captured response evidence.
8. **Rollback Strategy:**
   - Plugin is self-contained in `wordpress/plugins/oderinde-headless/`. Deactivating or deleting the plugin folder cleanly restores WordPress to standard behavior without leaving orphaned table modifications.
   - All frontend changes are versioned in Git.

## 7. Objections

1. **Objection 1 (Blocker): The 6 published case studies are missing from the active LocalWP database because the CPT was not registered when the XML was imported.**
   - *Risk:* If case studies are not available in the CMS runtime, frontend endpoints (`/case-studies/`, single case study pages) cannot query real data or capture live contract evidence.
   - *Resolution:* Implement `tools/seed-case-studies.php` to extract the 6 case studies, their titles, excerpts, slugs, thumbnail mappings, and ACF fields (`business_focus`, `system_delivered`, `verified_outcome`, `technology_1-3`, `color`) directly from `reference/wordpress/oderindestephen.WordPress.2026-10-22.xml` and insert them idempotently into the LocalWP database once the plugin registers the `case-study` post type.
2. **Objection 2 (Serious): Risk of private lead exposure or draft content leaking through public REST endpoints.**
   - *Risk:* WordPress REST API exposes public post types by default. If `enquiry` is registered as a public post type or if `/os/v1/resolve` leaks draft slugs, sensitive client submissions and unpublished articles become publicly discoverable.
   - *Resolution:* Explicitly set `'public' => false`, `'show_in_rest' => false`, and custom capability `'manage_options'` on the `enquiry` CPT so it can never be queried via standard REST. In `/os/v1/resolve`, verify that `post_status === 'publish'` before returning data; all other statuses return a strict 404 response.
3. **Objection 3 (Serious): Replay attacks or forged form submissions bypassing Next.js validation to spam the WordPress CMS.**
   - *Risk:* An attacker discovering `/wp-json/os/v1/enquiries` could inject fake leads directly into WordPress or trigger mail bombing without going through frontend Turnstile/honeypot checks.
   - *Resolution:* Require a shared secret (`CMS_BRIDGE_SECRET`) and authenticate all server-to-server requests using `HMAC-SHA256` over `${timestamp}.${raw_body}` in headers `X-OS-Signature` and `X-OS-Timestamp`. Enforce a strict 5-minute replay window (`abs(time() - timestamp) <= 300`) and rate limit submissions via transients.
4. **Objection 4 (Minor): Discrepancy between ACF field label "Card Accent Color" and the internal database meta key `color`.**
   - *Risk:* Divi audit notes referred to "Card Accent Color", but the XML inspection proved the underlying ACF field name is `color` (stored as `_color => field_6a7f6138962f1`). Using `card_accent_color` in the field schema would break data binding with existing posts.
   - *Resolution:* Maintain the exact internal name `color` in `group_6a7f3d410d6c4.json` and map it transparently in the frontend Zod schema (`accentColor: z.string().default('2563eb')`) to ensure complete backwards compatibility.

## 8. Verdict

IMPLEMENTED - AWAITING STEPHEN CONFIRMATION.

All authorized steps in Phase 02 have been completed, verified with automated tests, and proven against the local WordPress clone and LocalWP Mailpit.

## 9. Approval

APPROVED by Stephen.
- Words: "APPROVE"
- Date: 2026-10-23
- Scope: Phase 02: CMS model, migration mapping and API contracts as specified in this plan.

## 10. Implementation log

- 2026-10-22: Completed comprehensive repository and runtime gap review. Fanned out two specialized research subagents (`915b8625` for XML/WXR schema audit and `083463a9` for plugin and contract gap analysis).
- 2026-10-22: Identified critical finding that CPT `case-study` and ACF fields were skipped during previous XML import due to missing post type registration at import time.
- 2026-10-22: Formulated complete 14-section implementation plan `plans/P02-cms-model-contracts.md`. Status moved to AWAITING APPROVAL.
- 2026-10-23: Stephen approved plan with "APPROVE". Status moved to IN PROGRESS.
- 2026-10-23: Created directories `wordpress/plugins/oderinde-headless/includes/` and `wordpress/acf-json/`.
- 2026-10-23: Added `"php:lint"` script to root `package.json` pointing to LocalWP's verified PHP 8.2.29 CLI.
- 2026-10-23: Created versioned ACF JSON schemas in `wordpress/acf-json/`:
  - `post_type_6a7f3c9733052.json` (CPT `case-study`)
  - `group_6a7f3d410d6c4.json` (Case study fields: `color`, `technology_1-3`, outcomes)
  - `group_6a83a52b7ff14.json` (Blog article data)
  - `group_site_settings.json` (Site settings options page)
  - `group_page_sections.json` (Page flexible content sections)
- 2026-10-23: Implemented modular PHP plugin in `wordpress/plugins/oderinde-headless/`:
  - `oderinde-headless.php` (Bootstrap, hooks, autoloader)
  - `README.md` (Documentation and constants)
  - `includes/class-security.php` (HMAC signing/verification, replay window checking)
  - `includes/class-post-types.php` (Registers public REST `case-study` and isolated private `enquiry`)
  - `includes/class-acf-config.php` (ACF local JSON save/load paths, options page)
  - `includes/class-rest-site.php` (`GET /wp-json/os/v1/site` with strict public allowlist)
  - `includes/class-rest-resolve.php` (`GET /wp-json/os/v1/resolve` with 404 for drafts)
  - `includes/class-rest-enquiry.php` (`POST /wp-json/os/v1/enquiries` with HMAC-SHA256, rate limits, persistence, `wp_mail`)
  - `includes/class-preview.php` (Signed preview link rewriting)
  - `includes/class-revalidate.php` (Publish hooks dispatching to Next.js `/api/revalidate`)
- 2026-10-23: Ran `npm run php:lint`: 9/9 PHP files passed lint with 0 syntax errors.
- 2026-10-23: Deployed plugin to LocalWP (`C:\Users\Pythonhero\Local Sites\oderinde-cms\app\public\wp-content\plugins\oderinde-headless`) and activated it via PHP CLI.
- 2026-10-23: Implemented and executed `tools/seed-case-studies.php`. All 6 published case studies seeded with full ACF postmeta into LocalWP database.
- 2026-10-23: Verified `GET http://localhost:10004/wp-json/wp/v2/case-study` returns all 6 case studies.
- 2026-10-23: Verified `GET http://localhost:10004/wp-json/os/v1/site` returns 200 with strict allowlist.
- 2026-10-23: Verified `GET http://localhost:10004/wp-json/os/v1/resolve?path=/` returns homepage ID 14.
- 2026-10-23: Verified `GET http://localhost:10004/wp-json/os/v1/resolve?path=/case-study/born-accelerators-case-study-website` returns ID 96087.
- 2026-10-23: Verified `GET /os/v1/resolve?path=/missing` returns 404 Not Found.
- 2026-10-23: Tested `POST /wp-json/os/v1/enquiries`:
  - Missing headers: 401 Unauthorized.
  - Expired timestamp (replay attack): 401 Unauthorized (`replay_rejected`).
  - Invalid signature: 401 Unauthorized (`invalid_signature`).
  - Valid request: 201 Created (persisted to private `enquiry` ID 96418).
  - Mail verification: LocalWP Mailpit (`http://localhost:10000`) captured notification email to `Contact@oderindestephen.com` with `Reply-To: John Doe <johndoe@example.com>`.
  - Idempotency test: Resubmitted identical `submissionKey` returned 200 with `Submission already processed (idempotent)`.
- 2026-10-23: Implemented frontend Zod schemas in `apps/web/src/lib/cms/schema.ts` and test fixtures in `apps/web/src/lib/cms/fixtures/`.
- 2026-10-23: Created and executed `apps/web/src/lib/cms/schema.test.ts`. 8/8 tests passed.
- 2026-10-23: Implemented typed API client in `apps/web/src/lib/cms/api.ts`.
- 2026-10-23: Implemented Next.js route handlers in `apps/web/src/app/api/`:
  - `/api/enquiry/route.ts` (Form validation & relay)
  - `/api/preview/route.ts` & `/api/preview-exit/route.ts` (Draft mode toggle)
  - `/api/revalidate/route.ts` (ISR revalidation)
- 2026-10-23: Executed full quality gate suite in `apps/web`:
  - `npm run typecheck`: 0 errors
  - `npm run lint`: 0 errors, 0 warnings
  - `npm run test`: 8/8 tests pass
  - `npm run build`: Compiled successfully (8/8 static and dynamic routes)
- 2026-10-23: Updated `docs/contracts.md` to record verified specifications.
- 2026-10-23: Implementation complete. Status moved to `IMPLEMENTED - AWAITING STEPHEN CONFIRMATION`.

## 11. Deviations

| Planned | Found | Resolution | Approval impact |
| --- | --- | --- | --- |
| Standard CPT import via WP Importer | `case-study` posts skipped during import because post type did not exist yet | Implemented idempotent seeding script `tools/seed-case-studies.php` to restore all 6 case studies with their exact postmeta from the XML baseline | Fulfills real content requirement safely. |
| Inferred ACF field name `card_accent_color` | Inspected XML revealed true internal field name is `color` | Standardized `group_6a7f3d410d6c4.json` to use `color` | Prevents data loss during migration. |

## 12. Memory written

- Memory entries `D-1` through `D-13` and `P-1` through `P-4` verified active.
- No new memory triggers fired during implementation.

## 13. For Stephen to confirm

1. **Verify LocalWP REST Endpoints:**
   - Run `Invoke-RestMethod -Uri "http://localhost:10004/wp-json/os/v1/site"`: verify site branding, `bookingUrl: https://cal.com/oderinde/free`, and navigation. (Verified)
   - Run `Invoke-RestMethod -Uri "http://localhost:10004/wp-json/wp/v2/case-study"`: verify 6 case studies returned. (Verified by Stephen via browser screenshot)
2. **Verify LocalWP Mailpit Lead Delivery:**
   - Open Mailpit at `http://localhost:10000` to inspect the test enquiry captured for `Contact@oderindestephen.com`. (Verified)
3. **Verify Quality Gates:**
   - Run `npm.cmd --prefix apps/web run typecheck` (0 errors) (Verified)
   - Run `npm.cmd --prefix apps/web run lint` (0 errors) (Verified)
   - Run `npm.cmd --prefix apps/web run test` (8/8 passed) (Verified)
   - Run `npm.cmd --prefix apps/web run build` (compiled cleanly) (Verified)
   - Run `npm.cmd run php:lint` (9/9 PHP files clean) (Verified)
4. **Authorize Remote Push:** Reply with `"tested and working"` to confirm completion and trigger the continuous GitHub push per `D-13` and `P-4`. (Confirmed)

### Stephen Confirmation Record:
- **Confirmation Words:** "tested and working"
- **Date:** 2026-10-23
- **Verification Artifact:** Browser screenshot verifying `http://localhost:10004/wp-json/wp/v2/case-study` displaying all 6 seeded case studies.
- **Status:** CONFIRMED COMPLETE BY STEPHEN. Ready for remote push to GitHub and progression to Phase 03.

## 14. Backend or external handoff

- `docs/contracts.md` will record final captured schemas, authentication headers, and response payloads upon implementation completion.
- LocalWP Mailpit (`http://localhost:10000`) is the verified local capture inbox for test enquiry emails.
- No live production DNS or external credentials are used or modified in this phase.
