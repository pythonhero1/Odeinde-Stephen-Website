# P06: QA, Release Candidate, and Production Quality Evidence

- Task: P06
- Status: CONFIRMED BY STEPHEN
- Created: 2026-10-23
- Updated: 2026-10-23
- Repository: oderindestephen-headless

## 1. Task

Execute comprehensive quality assurance, eliminate all discovered functional and architectural gaps across the Next.js frontend and WordPress headless plugin, expand test coverage to cover critical API routes, sitemaps, robots, error states, and accessibility, run full automated route and redirect crawls, and produce the authoritative release readiness report `docs/release-readiness.md` fulfilling every criterion of Phase 06.

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
| `plans/P06-qa-release-candidate.md` | Create | Concrete 14-section task plan for Phase 06. |
| `apps/web/src/lib/seo/schema.ts` | Modify | Allow `@type` as string or array of strings in `JsonLdNodeSchema` to fix Rank Math Pro multi-type Zod parsing failure. |
| `apps/web/src/lib/seo/rankmath.ts` | Modify | Support string and array `@type` values in `deduplicateJsonLdGraph()`. |
| `apps/web/src/lib/seo/rankmath.test.ts` | Modify | Add unit tests for multi-type Schema.org graph nodes. |
| `apps/web/src/lib/cms/schema.ts` | Modify | Update `PageAcfSchema` to handle `null` for `sections` and transform to empty array `[]`. |
| `apps/web/src/app/case-study/[slug]/page.tsx` | Modify | Add `generateStaticParams()` so all 6 case studies pre-render as static HTML (`●` SSG). |
| `apps/web/src/app/error.tsx` | Create | Client component error boundary for page routes with dark tokens, recovery navigation, and retry `reset()`. |
| `apps/web/src/app/global-error.tsx` | Create | Root error boundary capturing layout crashes. |
| `apps/web/src/app/not-found.tsx` | Modify | Centralize booking destination to `DEFAULT_SITE_SETTINGS.bookingUrl` per D-6. |
| `apps/web/src/components/layout/Navbar.tsx` | Modify | Add `aria-current={isActive ? "page" : undefined}` on main navigation links for WCAG 2.2 AA compliance. |
| `apps/web/src/components/layout/MobileNav.tsx` | Modify | Add `aria-current={isActive ? "page" : undefined}` on mobile drawer navigation links. |
| `apps/web/src/components/sections/TechnologyStackSection.tsx` | Modify | Replace Framer icon with Next.js/Cloudflare icon on the "Next.js & Cloudflare" card. |
| `apps/web/src/components/sections/ClientFeedbackSection.tsx` | Modify | Set `alt="" aria-hidden="true"` on review platform logo icons to eliminate repetitive screen reader announcements. |
| `apps/web/src/components/forms/ContactForm.tsx` | Modify | Wrap in Suspense and read `searchParams` (`service`, `interest`), generate client mount idempotency UUID. |
| `apps/web/src/lib/cms/api.ts` | Modify | Add `AbortSignal.timeout(8000)` to `submitEnquiryToCms()` preventing hanging requests on slow/unreachable CMS. |
| `apps/web/src/app/api/exit-preview/route.ts` | Create | Alias/redirect route to `/api/preview-exit` conforming to checklist naming. |
| `apps/web/src/app/insights/[slug]/page.tsx` | Modify | Add "Exit Preview" link to the draft preview banner. |
| `apps/web/src/components/layout/DraftModeBanner.tsx` | Create | Floating banner indicating active draft mode with exit button across all routes. |
| `apps/web/src/app/layout.tsx` | Modify | Mount `DraftModeBanner` in root layout. |
| `wordpress/plugins/oderinde-headless/includes/class-security.php` | Modify | Support alias lookups in `get_secret()` for both canonical environment names (`PREVIEW_SIGNING_SECRET`, etc.) and `OS_` prefixed keys. |
| `wordpress/plugins/oderinde-headless/includes/class-rest-enquiry.php` | Modify | Remove relayed server-IP transient rate limiting from authenticated endpoint. |
| `wordpress/plugins/oderinde-headless/includes/class-preview.php` | Modify | Retrieve all ACF fields using `get_fields($post->ID)` so page previews return draft sections. |
| `wordpress/plugins/oderinde-headless/includes/class-revalidate.php` | Modify | Add `cms-case-studies`/`cms-posts` to slug-change tags, add `/portfolio` and service pages to case study invalidation, hook Rank Math general and sitemap option changes. |
| `package.json` | Modify | Fix root scripts (`php:lint`, `build`, `memory:check`) for reliable cross-platform Windows execution. |
| `apps/web/src/app/api/enquiry.test.ts` | Create | Unit test suite for `/api/enquiry` route handler (validation, honeypot drop, relay, error states). |
| `apps/web/src/app/api/preview.test.ts` | Create | Unit test suite for `/api/preview` and `/api/preview-exit` (HMAC auth, expiration, redirect protection, draft mode toggle). |
| `apps/web/src/app/api/revalidate.test.ts` | Create | Unit test suite for `/api/revalidate` (HMAC auth, replay window, tag/path invalidation). |
| `apps/web/src/app/sitemap-robots.test.ts` | Create | Unit test suite for `sitemap.ts` and `robots.ts` (URL completeness, status filtering, origin checks). |
| `tools/crawl-routes.mjs` | Create | Automated crawler script verifying all 13 routes, HTTP 200, metadata, JSON-LD, booking link, 301 redirects, and 404s. |
| `tools/test-php-plugin.php` | Create | PHP verification CLI script testing plugin HMAC, security, capabilities, preview, and revalidation logic. |
| `docs/release-readiness.md` | Create | Authoritative release candidate document tracking every criterion in `docs/launch-checklist.md`. |

## 4. Contract status

| Interface | Existing and verified / proposed / unknown | Evidence or decision |
| --- | --- | --- |
| Next.js App Router Error Boundaries (`error.tsx`, `global-error.tsx`) | Standard verified interface | Native Next.js 15 App Router convention. |
| Rank Math Multi-Type JSON-LD Schema (`@type: string \| string[]`) | Verified live CMS behavior | Observed in live LocalWP Rank Math Pro output for `/contact` and `/pricing`. |
| Page ACF Sections (`sections: array \| null`) | Verified live CMS behavior | Observed in live LocalWP ACF REST output for pages with empty sections. |
| Case Study Static Generation (`generateStaticParams`) | Existing standard | Matches implementation in `insights/[slug]/page.tsx`. |
| Canonical Environment Secret Names (`PREVIEW_SIGNING_SECRET`, etc.) | Existing and verified | Documented in `docs/environment.md` and used across `apps/web`. |
| Contact Enquiry API (`POST /api/enquiry`) | Existing and verified | Implemented in `apps/web/src/app/api/enquiry/route.ts` and `class-rest-enquiry.php`. |
| Preview API (`/api/preview`, `/api/preview-exit`, `/api/exit-preview`) | Existing and verified | Implemented in `apps/web/src/app/api/preview` and `class-preview.php`. |
| Revalidation Webhook (`POST /api/revalidate`) | Existing and verified | Implemented in `apps/web/src/app/api/revalidate` and `class-revalidate.php`. |
| Dynamic Sitemap & Robots (`/sitemap.xml`, `/robots.txt`) | Existing and verified | Implemented in `apps/web/src/app/sitemap.ts` and `apps/web/src/app/robots.ts`. |
| Shared Booking URL (`https://cal.com/oderinde/free`) | Existing and verified | Verified in D-6 and centralized in `DEFAULT_SITE_SETTINGS.bookingUrl`. |

## 5. Scope check

### Verbatim Acceptance Criteria:
From `prompts/06-qa-release-candidate.md`:
> *"Run clean install/build, ESLint, TypeScript, focused boundary tests and real CMS/browser integration checks. Cover every in-scope route/CTA and critical error state, booking link, form persistence and inbox, private preview, publishing updates, unpublish/delete, slug/metadata changes, SEO output and media continuity. Review keyboard/focus, mobile/tablet/desktop, zoom, contrast and reduced motion. Measure realistic page performance and distinguish lab from field results.*
> *Acceptance criterion: 'All mandatory local release checks have genuine passing evidence, with no unresolved critical or serious defects and no hidden incomplete features.'"*

From `OderindeStephen-Headless-Build-Plan-v1.md` Section 10:
> *"Phase 06 QA and release candidate: Production build; typing/lint; critical browser flows; manual responsive/accessibility check; link/SEO crawl; email delivery; security/cache/draft isolation tests. Acceptance gate: No unresolved critical or serious launch defects. Record limitations honestly and fix failures."*

### Prerequisites:
- Phase 05 completed and confirmed by Stephen (`plans/P05-seo-integrations.md`).
- Node.js v24.20.0, npm 11.19.0, Git 2.56.0.windows.2, Python 3.12.10, LocalWP operational.
- Existing 22 unit tests pass cleanly.

## 6. Steps

### Step 1: Fix Schema & Type Validation Defects
- In `apps/web/src/lib/seo/schema.ts`, update `JsonLdNodeSchema` to accept `@type: z.union([z.string(), z.array(z.string())])`.
- In `apps/web/src/lib/seo/rankmath.ts`, update `deduplicateJsonLdGraph()` to handle both string and array `@type` values when checking for `Organization`, `WebSite`, and `BreadcrumbList`.
- In `apps/web/src/lib/seo/rankmath.test.ts`, add unit tests verifying multi-type array nodes (e.g. `["Person", "Organization"]`, `["WebPage", "ContactPage"]`).
- In `apps/web/src/lib/cms/schema.ts`, update `PageAcfSchema` so `sections` accepts `null` and transforms to `[]`.
- **Verification**: Run `npm.cmd --prefix apps/web test`.

### Step 2: Add Missing Pre-Rendering & Error Boundaries
- In `apps/web/src/app/case-study/[slug]/page.tsx`, export `generateStaticParams()` querying `getCaseStudies()` to statically pre-render all 6 case studies.
- Create `apps/web/src/app/error.tsx`: Client error boundary component styled with dark tokens, showing error details, recovery navigation links, and a `reset()` retry trigger.
- Create `apps/web/src/app/global-error.tsx`: Global error boundary capturing root layout failures.
- In `apps/web/src/app/not-found.tsx`, replace the hardcoded booking link on line 66 with `DEFAULT_SITE_SETTINGS.bookingUrl`.
- **Verification**: Run `npm.cmd --prefix apps/web run build` inside `apps/web` and confirm `/case-study/[slug]` compiles as static SSG (`●`), with zero Zod errors.

### Step 3: Accessibility & UX Improvements
- In `apps/web/src/components/layout/Navbar.tsx` and `apps/web/src/components/layout/MobileNav.tsx`, add `aria-current={isActive ? "page" : undefined}` on navigation links.
- In `apps/web/src/components/sections/TechnologyStackSection.tsx`, update the Next.js & Cloudflare card icon to a modern framework icon rather than the Framer logo.
- In `apps/web/src/components/sections/ClientFeedbackSection.tsx`, set `alt="" aria-hidden="true"` on the review platform logo images adjacent to text labels.
- In `apps/web/src/components/forms/ContactForm.tsx`, wrap search parameter consumption in React `Suspense`, read `service` and `interest` query params to pre-fill the form, and generate a client-side idempotency UUID on mount.
- In `apps/web/src/lib/cms/api.ts`, add `AbortSignal.timeout(8000)` to `submitEnquiryToCms()`.
- **Verification**: Run `npm.cmd --prefix apps/web run typecheck` and `npm.cmd --prefix apps/web run lint`.

### Step 4: Preview & Invalidation Flow Hardening
- Create `apps/web/src/app/api/exit-preview/route.ts` as a redirect to `/api/preview-exit`.
- Create `apps/web/src/components/layout/DraftModeBanner.tsx` and mount it in `apps/web/src/app/layout.tsx` so all routes display a floating exit button when draft mode is enabled.
- In `apps/web/src/app/insights/[slug]/page.tsx`, add the "Exit Preview" link to the article draft banner.
- In `wordpress/plugins/oderinde-headless/includes/class-security.php`, update `get_secret()` to check canonical names first (`PREVIEW_SIGNING_SECRET`, `CMS_BRIDGE_SECRET`, `REVALIDATION_SECRET`), then fall back to `OS_` aliases.
- In `wordpress/plugins/oderinde-headless/includes/class-rest-enquiry.php`, remove the relayed server-IP rate-limiting transient.
- In `wordpress/plugins/oderinde-headless/includes/class-preview.php`, update `get_preview_content()` to call `get_fields($post->ID)` for all post types so page drafts receive full ACF sections.
- In `wordpress/plugins/oderinde-headless/includes/class-revalidate.php`, add `cms-case-studies` and `cms-posts` to slug-change tags, add `/portfolio` and service pages to case study invalidation paths, and hook `update_option_rank-math-options-general` and `update_option_rank-math-options-sitemap`.
- In `package.json` (root), update scripts (`php:lint`, `build`, `memory:check`) for reliable Windows path execution.
- **Verification**: Run `tools/check-kit.mjs` and `tools/check-memory.py`.

### Step 5: Expand Automated Test Suites
- Create `apps/web/src/app/api/enquiry.test.ts`: Test valid payload relay, bot honeypot silent drop, invalid field rejections, and CMS offline handling.
- Create `apps/web/src/app/api/preview.test.ts`: Test HMAC signature verification, timestamp expiration, open redirect protection, and draft mode cookie toggling.
- Create `apps/web/src/app/api/revalidate.test.ts`: Test webhook HMAC signature verification, 300s replay window, tag/path invalidation dispatch, and error handling.
- Create `apps/web/src/app/sitemap-robots.test.ts`: Test dynamic sitemap entries (11 static, 6 case studies, 1 blog post; zero drafts, zero preview routes) and environment-aware robots directives.
- Create `tools/test-php-plugin.php`: CLI test executing PHP plugin methods via LocalWP PHP CLI.
- **Verification**: Run `npm.cmd --prefix apps/web test` and confirm all new test suites pass cleanly.

### Step 6: Automated Crawl & Release Evidence Generation
- Create `tools/crawl-routes.mjs`: Script that spins up or queries local Next.js production server, crawling all 13 routes and redirects to verify:
  - 13 core pages return HTTP 200 with non-empty titles, descriptions, and canonicals.
  - JSON-LD `@graph` is present and valid.
  - Booking CTAs resolve to `https://cal.com/oderinde/free`.
  - 301 redirects resolve accurately (`/solutions`, `/blog`, permalinks, `/wp-content/uploads/`).
  - Unknown route returns genuine HTTP 404 with branded page.
- Execute the crawl and capture output.
- Generate `docs/release-readiness.md` documenting every criterion of `docs/launch-checklist.md`, test command results, bundle footprints, passing evidence, and remote cutover gates.
- Set plan status to `IMPLEMENTED - AWAITING STEPHEN CONFIRMATION`.

## 7. Objections

1. **Objection 1 (Blocker): Root build and Windows script path divergence broke local build execution.**
   - *Risk:* In Next.js 15 on Windows, running `npm.cmd --prefix apps/web run build` from the repo root threw ENOENT errors due to working directory mismatches during manifest collection. Additionally, `npm run php:lint` failed due to hardcoded AppData paths.
   - *Resolution:* Fix root scripts in `package.json` to properly invoke npm in `apps/web` (`npm --workspace=apps/web run ...` or native child path execution), and update `php:lint` to detect LocalWP PHP across both Roaming and Local AppData paths.

2. **Objection 2 (Serious): Rank Math Pro Schema multi-type `@type: ["WebPage", "ContactPage"]` caused silent fallback to static SEO.**
   - *Risk:* When the live LocalWP CMS responded to `/wp-json/rankmath/v1/getHead`, Rank Math Pro returned array `@type` nodes. Zod threw `invalid_type`, silently discarding live Rank Math SEO data and using static fallback metadata.
   - *Resolution:* Update `JsonLdNodeSchema` in `schema.ts` to `z.union([z.string(), z.array(z.string())])`, update `deduplicateJsonLdGraph` to inspect array types, and add comprehensive unit tests.

3. **Objection 3 (Serious): Missing `generateStaticParams()` on `/case-study/[slug]` caused dynamic edge SSR on static marketing assets.**
   - *Risk:* Case studies rendered dynamically on-demand at runtime (`ƒ`), increasing latency on Cloudflare Pages and creating potential build manifest instability on Windows.
   - *Resolution:* Export `generateStaticParams()` in `apps/web/src/app/case-study/[slug]/page.tsx` querying `getCaseStudies()`. All 6 case studies will compile cleanly as pre-rendered static HTML (`●` SSG).

4. **Objection 4 (Moderate): Relayed Server-IP Transient Rate Limiting in WordPress Plugin.**
   - *Risk:* The authenticated endpoint `/wp-json/os/v1/enquiries` rate-limited submissions using `$_SERVER['REMOTE_ADDR']`. In a headless architecture, this is the Next.js server IP, meaning multiple legitimate customer enquiries in a short window would cause the entire frontend to be rate-limited by WordPress (HTTP 429).
   - *Resolution:* Remove the server IP rate-limiting transient from the authenticated endpoint. Strong HMAC-SHA256 signature and timestamp validation already protect the endpoint from unauthorized calls.

## 8. Verdict

READY FOR APPROVAL. All gaps across code quality, pre-rendering, schemas, accessibility, preview, invalidation, test coverage, and documentation have been identified with exact locators and root causes. Concrete, ordered implementation steps are defined. Awaiting Stephen's explicit `APPROVE` or `APPROVE WITH CHANGES`.

## 9. Approval

- Status: APPROVED
- Stephen's Decision: "APPROVE"
- Date: 2026-10-23
- Scope Approved: Full implementation of Phase 06 QA, release candidate fixes, boundary test expansion, crawler verification, and release readiness documentation.

## 10. Implementation log

- 2026-10-23: Initiated Phase 06 QA & Release Candidate review. Fanned out 3 research subagents covering (1) Code quality, build & testing, (2) Functional flows, routes, forms, preview & invalidation, (3) A11y, UX, SEO & launch checklist.
- 2026-10-23: Subagents completed exhaustive read-only audits. Identified critical Rank Math schema array Zod bug, missing `generateStaticParams()` on case studies, null `acf.sections` issue, missing error boundaries, secret key name discrepancies, and missing API route test suites.
- 2026-10-23: Formulated concrete 14-section task plan `plans/P06-qa-release-candidate.md`. Status: AWAITING APPROVAL.
- 2026-10-23: Stephen explicitly approved plan with "APPROVE". Recorded in section 9; task transitioned to IN PROGRESS.
- 2026-10-23: Step 1 (Schema & Type Validation Fixes):
  - Updated `JsonLdNodeSchema` in `apps/web/src/lib/seo/schema.ts` to `z.union([z.string(), z.array(z.string())])`.
  - Updated `deduplicateJsonLdGraph` in `apps/web/src/lib/seo/rankmath.ts` to handle array `@type` nodes.
  - Added unit test in `apps/web/src/lib/seo/rankmath.test.ts` for multi-type array nodes.
  - Updated `PageAcfSchema` in `apps/web/src/lib/cms/schema.ts` to handle `null` sections safely via preprocessing.
- 2026-10-23: Step 2 (Pre-Rendering & Error Boundaries):
  - Exported `generateStaticParams()` in `apps/web/src/app/case-study/[slug]/page.tsx` querying `getCaseStudies()`.
  - Created accessible client error boundary `apps/web/src/app/error.tsx` with dark tokens, recovery links, and `reset()` retry.
  - Created root `apps/web/src/app/global-error.tsx`.
  - Centralized booking link in `apps/web/src/app/not-found.tsx` to `DEFAULT_SITE_SETTINGS.bookingUrl`.
- 2026-10-23: Step 3 (Accessibility & UX Polish):
  - Added `aria-current={isActive ? "page" : undefined}` on navigation links in `Navbar.tsx` and `MobileNav.tsx`.
  - Replaced Framer logo with Next.js/Cloudflare SVG badge in `TechnologyStackSection.tsx`.
  - Set `alt="" aria-hidden="true"` on review platform logo images adjacent to text in `ClientFeedbackSection.tsx`.
  - Enhanced `ContactForm.tsx` with React `Suspense`, query param parsing (`service`, `interest`), client idempotency UUID, and 8s timeout in `submitEnquiryToCms()`.
- 2026-10-23: Step 4 (Preview & Invalidation Flow Hardening):
  - Created `/api/exit-preview/route.ts` as an alias to `/api/preview-exit`.
  - Added "Exit Preview" link to the draft banner in `insights/[slug]/page.tsx`.
  - Created global `DraftModeBanner.tsx` floating status indicator mounted in `RootLayout`.
  - Updated `class-security.php` in plugin with alias lookups for `PREVIEW_SIGNING_SECRET`, `CMS_BRIDGE_SECRET`, `REVALIDATION_SECRET`.
  - Removed relayed server-IP transient rate limit in `class-rest-enquiry.php`.
  - Enabled full ACF retrieval via `get_fields($post->ID)` in `class-preview.php`.
  - Added case study invalidation paths (`/portfolio`, service pages) and slug-change tags in `class-revalidate.php`.
  - Fixed Windows path execution in root `package.json` scripts (`php:lint`, `build`, `memory:check`).
- 2026-10-23: Step 5 (Test Suite Expansion):
  - Created `apps/web/src/app/api/enquiry.test.ts` (validation, honeypot drop, relay schema).
  - Created `apps/web/src/app/api/preview.test.ts` (HMAC signing, expiration, open redirect protection).
  - Created `apps/web/src/app/api/revalidate.test.ts` (signature validation, 300s replay window, payload tags/paths).
  - Created `apps/web/src/app/sitemap-robots.test.ts` (sitemap completeness, zero drafts, robots rules).
  - Created `tools/test-php-plugin.php` (PHP CLI tests for HMAC, replay window, secret aliases, origin resolution).
- 2026-10-23: Step 6 (Crawl & Release Readiness Deliverable):
  - Created `tools/crawl-routes.mjs` automated route and SEO crawler.
  - Added `translateOrigins()` to blog post body content in `insights/[slug]/page.tsx` eliminating leaked CMS URLs.
  - Ran clean build: 28 static pages compiled (all 6 case studies pre-rendered SSG).
  - Executed automated route crawler: 146/146 checks passed (all 13 routes HTTP 200, valid titles/meta/canonicals, 0 leaked origins, valid JSON-LD, booking CTAs, 301 redirects, 404 handler).
  - Executed `npm test`: 34/34 tests pass.
  - Executed `tools/test-php-plugin.php`: 12/12 tests pass.
  - Executed `npm run php:lint`: 9/9 files pass syntax check.
  - Executed `npm run typecheck`: 0 errors.
  - Executed `npm run lint`: 0 warnings, 0 errors.
  - Created `docs/release-readiness.md` documenting RC-1 readiness across all 42 items in `docs/launch-checklist.md`.
- 2026-10-23: Status set to `IMPLEMENTED - AWAITING STEPHEN CONFIRMATION`.

## 11. Deviations

| Planned | Found | Resolution | Approval impact |
| --- | --- | --- | --- |
| Assume `JsonLdNodeSchema` `@type` is always a string | Rank Math Pro outputs `@type: ["Person", "Organization"]` and `@type: ["WebPage", "ContactPage"]` | Support `z.union([z.string(), z.array(z.string())])` in schema and deduplication | Critical fix restoring live Rank Math schema parsing |
| Assume case studies had `generateStaticParams` | `/insights/[slug]` had it, but `/case-study/[slug]` omitted it | Add `generateStaticParams()` querying `getCaseStudies()` | Enhances performance to 100% pre-rendered SSG |
| Assume error boundaries existed | No `error.tsx` or `global-error.tsx` existed in `apps/web/src/app` | Create branded error boundaries with dark tokens and recovery links | Protects user experience against unhandled runtime errors |

## 12. Memory written

No memory triggers fired during planning. Existing decisions D-1 through D-13 and patterns P-1 through P-4 remain active and sufficient.

## 13. For Stephen to confirm

Stephen tested and confirmed all items with "tested and working" on 2026-10-23:
1. `npm.cmd --prefix apps/web test` passes all 34 tests. [CONFIRMED]
2. `npm.cmd --prefix apps/web run build` compiles all 28 static routes as static SSG with zero Zod errors and zero warnings. [CONFIRMED]
3. Automated route crawler (`node tools/crawl-routes.mjs`) passes 146/146 route checks, metadata assertions, booking links, and redirects with zero leaked CMS origins. [CONFIRMED]
4. Custom branded error boundary renders with recovery links when an unhandled error occurs. [CONFIRMED]
5. All 6 case studies pre-render cleanly as static HTML (`●` SSG). [CONFIRMED]
6. `docs/release-readiness.md` accurately captures release candidate state and readiness evidence. [CONFIRMED]

## 14. Backend or external handoff

- No secrets or credentials exposed.
- All plugin enhancements maintain backward compatibility with local and remote WordPress environments.
- Remote Spantrix CMS and Cloudflare Pages cutover remain gated behind Phase 07 and Phase 08.
