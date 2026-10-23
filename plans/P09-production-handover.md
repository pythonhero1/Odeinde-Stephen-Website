# P09: Approved Production Cutover and Handover

- Task: P09
- Status: AWAITING APPROVAL
- Created: 2026-10-23
- Updated: 2026-10-23
- Repository: oderindestephen-headless

## 1. Task

Execute the production migration and handover of OderindeStephen.com by completing prerequisites verification (E2E quality checks, GitHub release tagging, and remote staging CMS validation), executing zero-data-loss content synchronization and serialized URL replacement, re-pointing Cloudflare DNS apex records to Cloudflare Pages while strictly preserving all mail and portal routing, validating live post-cutover integrations and SEO/media continuity on the public domain, delivering operational runbooks to Stephen, and obtaining Stephen's explicit confirmation of completion.

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
| :--- | :--- | :--- |
| `plans/P09-production-handover.md` | Create | Concrete 14-section implementation and cutover plan for Phase 09. |
| `apps/web/src/lib/seo/schema.ts` | Modify | Fix JSON-LD `@type` schema to support `z.union([z.string(), z.array(z.string())])` resolving Rank Math multi-type node crash. |
| `apps/web/src/lib/seo/rankmath.ts` | Modify | Update `deduplicateJsonLdGraph` to support array `@type` properties safely without runtime exceptions. |
| `apps/web/src/lib/cms/api.ts` | Modify | Add server-side Cloudflare Turnstile token verification helper calling `https://challenges.cloudflare.com/turnstile/v0/siteverify`. |
| `apps/web/src/app/api/enquiry/route.ts` | Modify | Integrate server-side Turnstile verification before relaying enquiry to WordPress backend. |
| `apps/web/src/components/forms/ContactForm.tsx` | Modify | Render Cloudflare Turnstile widget client-side using `NEXT_PUBLIC_TURNSTILE_SITE_KEY`. |
| `docs/release-readiness.md` | Create | Comprehensive pre-cutover evidence matrix detailing test results, build artifacts, and release candidate tag. |
| `docs/editor-guide.md` | Modify | Expand into concrete editorial runbook with exact WP Admin menus, field locators, preview workflows, and enquiry review. |
| `docs/environment.md` | Modify | Update with exact Cloudflare Pages production vs. preview environment scopes and Spantrix `wp-config.php` constants. |
| `docs/launch-checklist.md` | Modify | Record verified cutover results and live public checks with date and evidence. |

## 4. Contract status

| Interface | Existing and verified / proposed / unknown | Evidence or decision |
| :--- | :--- | :--- |
| Cloudflare Authoritative DNS Apex (`oderindestephen.com`) | Existing & verified | Authoritative on Cloudflare (`Resolve-DnsName` confirmed). Current targets: `188.114.96.0`, `188.114.97.0` pointing to Spantrix origin `66.85.46.67`. Switch to Cloudflare Pages deployment target. |
| Cloudflare Mail DNS (`MX`, `mail.`, `TXT` SPF, `TXT` DMARC) | Existing & verified | Priority 0 MX pointing to Spantrix (`66.85.46.67`), SPF with `+ip4:66.85.46.67`, DMARC pointing to Brevo. **STRICT INVARIANT: PRESERVE UNTOUCHED**. |
| External Portal DNS (`portal.oderindestephen.com`) | Existing & verified | Proxied A records pointing to `188.114.96.0`/`97.0`. **STRICT INVARIANT: PRESERVE UNTOUCHED**. |
| Proposed CMS Subdomain (`cms.oderindestephen.com`) | Proposed (to be provisioned) | Requires Spantrix DNS A record pointing to `66.85.46.67` with AutoSSL certificate. |
| Cloudflare Turnstile Verification API | Proposed | Server-to-server POST to `https://challenges.cloudflare.com/turnstile/v0/siteverify` with secret key and client token. |
| WordPress REST Endpoints (`/wp-json/os/v1/*`) | Existing & verified | Verified live on LocalWP (`site`, `resolve`, `enquiries`, `preview`). Verified HMAC-SHA256 signature and replay guard. |
| Next.js Cache & Revalidation (`POST /api/revalidate`) | Existing & verified | Verified HMAC-SHA256 signature check and selective path/tag revalidation in `api.test.ts`. |
| Cal.com Booking Action | Existing & verified | Centralized in `DEFAULT_SITE_SETTINGS.bookingUrl = https://cal.com/oderinde/free` per D-6. |
| Contact Form Email Delivery | Existing & verified | Contact form relays to CMS `enquiry` CPT, which fires `wp_mail()` to `Contact@oderindestephen.com` per D-10. |

## 5. Scope check

### Verbatim Acceptance Criteria

From `prompts/09-production-handover.md`:
> *"The approved release serves the public domain with functioning integrations, preserved SEO/media intent and tested recovery, and Stephen receives verified editing/operations instructions and confirms completion."*

From `OderindeStephen-Headless-Build-Plan-v1.md` Section 10:
> *"Phase 09: Production migration and handover: Obtain explicit cutover approval, freeze edits briefly, sync final content, change only approved DNS records, verify public behavior, then hand over editing and recovery instructions. Acceptance gate: Main domain serves tested release; form/inbox, booking, metadata, redirects, media and admin work; Stephen confirms completion."*

From `OderindeStephen-Headless-Build-Plan-v1.md` Section 13:
> *"Launch only when the complete approved route/feature matrix passes, the release is on GitHub, the protected remote preview works with the real CMS, form receipt and inbox delivery are confirmed, drafts stay private, SEO/media/redirect checks pass, backups restore, and Stephen approves the exact cutover. If a gate fails, keep the current website operating and present the specific blocker and impact. Do not quietly shrink scope or disable failing features to meet the date."*

### Prerequisites
1. Full test suite, typechecking, and ESLint pass with zero errors.
2. Rank Math Schema JSON-LD multi-type bug resolved in `schema.ts`.
3. Cloudflare Turnstile bot verification wired to `/api/enquiry`.
4. Git pre-migration release tagged (`v1.0.0-rc1`) and pushed to `https://github.com/pythonhero1/Odeinde-Stephen-Website.git`.
5. Spantrix CMS clone active at `cms.oderindestephen.com` with working SSL and REST endpoints.
6. Cloudflare Pages remote preview verified against remote CMS.
7. Cloudflare DNS snapshot recorded; live Spantrix database backed up.
8. Explicit owner `APPROVE` received from Stephen for cutover execution.

### Exclusions
- No modification of external portal application (`portal.oderindestephen.com`).
- No deletion of historical Search Console properties or analytics baselines.
- No modifications to mail server records (MX, SPF, DKIM, DMARC) or mail hostnames.
- No in-place conversion of live Spantrix WordPress database; live installation remains untouched until cutover is confirmed.

## 6. Steps

### Step 1: Pre-Cutover Code Hardening & Schema Bug Fix
- Update `apps/web/src/lib/seo/schema.ts` to allow union string/array for `@type`:
  `"@type": z.union([z.string(), z.array(z.string())])`.
- Update `deduplicateJsonLdGraph` in `apps/web/src/lib/seo/rankmath.ts` to safely evaluate string arrays.
- Implement server-side Turnstile verification in `apps/web/src/lib/cms/api.ts` and `/api/enquiry/route.ts`.
- Verify with `npm run typecheck`, `npm run lint`, `npm run test`, and `npm run build`.

### Step 2: Release Candidate Evidence & Pre-Migration Git Tag
- Compile release evidence matrix into `docs/release-readiness.md`.
- Commit all hardened changes: `git commit -m "chore(release): prepare v1.0.0-rc1 release candidate"`.
- Tag the release: `git tag -a v1.0.0-rc1 -m "Production release candidate v1.0.0-rc1"`.
- Push commit and tag to remote origin: `git push origin main --tags`.

### Step 3: Remote Staging CMS Setup on Spantrix (`cms.oderindestephen.com`)
- In Spantrix cPanel, create subdomain `cms.oderindestephen.com` pointing to a distinct document root (e.g. `public_html/cms`).
- Issue Let's Encrypt / cPanel AutoSSL certificate for `cms.oderindestephen.com`.
- Copy WordPress files from live site to `public_html/cms`.
- Create a new MySQL database and user; import current live database dump.
- Install and activate `wordpress/plugins/oderinde-headless` and ACF Pro.
- Execute serialized-data-aware search-replace dry run using WP-CLI:
  `wp search-replace "https://oderindestephen.com" "https://cms.oderindestephen.com" --dry-run`
- Execute live search-replace preserving GUIDs:
  `wp search-replace "https://oderindestephen.com" "https://cms.oderindestephen.com" --skip-columns=guid`
- Verify live REST endpoints:
  - `GET https://cms.oderindestephen.com/wp-json/os/v1/site` $\rightarrow$ HTTP 200
  - `GET https://cms.oderindestephen.com/wp-json/os/v1/resolve?path=/business-website-solutions` $\rightarrow$ HTTP 200
  - `GET https://cms.oderindestephen.com/wp-json/rankmath/v1/getHead?url=https://cms.oderindestephen.com/` $\rightarrow$ HTTP 200

### Step 4: Protected Remote Preview Verification on Cloudflare Pages
- Link Cloudflare Pages project to GitHub repository `pythonhero1/Odeinde-Stephen-Website`.
- Configure build settings: Root directory `apps/web`, build command `npx @cloudflare/next-on-pages`, output directory `.vercel/output/static`.
- Configure Preview environment variables:
  - `ENVIRONMENT=preview`
  - `WP_API_ORIGIN=https://cms.oderindestephen.com`
  - `CMS_MEDIA_ORIGIN=https://cms.oderindestephen.com`
  - `CMS_BRIDGE_SECRET`, `REVALIDATION_SECRET`, `PREVIEW_SIGNING_SECRET`
- Deploy preview build and verify:
  - Preview URL returns HTTP 200 with `noindex, nofollow` headers.
  - Draft preview mode functions with signed tokens and does not leak into cache.
  - Test revalidation trigger refreshes cached page within 5 seconds.

### Step 5: Content Freeze & Final Sync Protocol
- Agree on a brief content freeze window with Stephen in chat.
- Query Spantrix production database for any new enquiries:
  `SELECT ID, post_date, post_title FROM wp_posts WHERE post_type = 'enquiry' ORDER BY ID DESC LIMIT 10;`
- Back up live database (`mysqldump`) and store securely outside Git.
- Sync final posts/pages/media from production to `cms.oderindestephen.com`.

### Step 6: Stephen Cutover Gate Review
- Present cutover readiness summary:
  - Release candidate tag: `v1.0.0-rc1`
  - CMS health check on `https://cms.oderindestephen.com`
  - Exact Cloudflare DNS records to be updated vs. preserved
  - Expected propagation window: 1–5 minutes under Cloudflare proxy
  - Rollback commands ready
- **STOP FOR STEPHEN'S EXPLICIT CUTOVER APPROVAL.**

### Step 7: Cloudflare DNS Production Cutover Execution
- In Cloudflare DNS Dashboard for zone `oderindestephen.com`:
  - **CREATE / UPDATE:** `cms.oderindestephen.com` A record $\rightarrow$ `66.85.46.67` (Proxied: DNS-only or with bypass rules for `/wp-admin/`, `/wp-json/`).
  - **SWITCH APEX:** Set `oderindestephen.com` CNAME / Custom Domain pointing to Cloudflare Pages production deployment (`oderindestephen-headless.pages.dev`).
  - **VERIFY PRESERVED:** Confirm `MX`, `mail.`, `TXT` (SPF/DMARC), and `portal.oderindestephen.com` remain 100% untouched.

### Step 8: Comprehensive Post-Switch Public Domain Verification
- Execute automated and manual checks on `https://oderindestephen.com`:
  1. DNS resolution and SSL certificate validity.
  2. HTTP status 200 on all 11 static pages, 6 case studies, and blog post.
  3. Dynamic XML sitemap at `https://oderindestephen.com/sitemap.xml` returns 200 with zero draft or error URLs.
  4. Robots.txt at `https://oderindestephen.com/robots.txt` allows public indexing and points to sitemap.
  5. 404 page at `/unknown-route` returns genuine HTTP 404 status.
  6. Permanent redirects (301) for `/solutions`, `/blog`, `/why-wordpress-...`, and `/wp-content/uploads/:path*` to CMS media origin.
  7. Submit real test inquiry through `/contact` form:
     - Verify client receives success modal.
     - Verify new enquiry saved in WP Admin under Enquiries CPT.
     - Verify email notification arrives in `Contact@oderindestephen.com`.
  8. Click every booking CTA to verify redirection to `https://cal.com/oderinde/free`.
  9. Click portal CTA to verify destination `https://portal.oderindestephen.com/`.
  10. Edit a page in WordPress, publish, and verify that the public page regenerates via on-demand ISR revalidation.

### Step 9: Operations & Editorial Handover
- Deliver updated `docs/editor-guide.md` with concrete WP Admin locators.
- Deliver updated `docs/environment.md` with hosting secrets storage guide.
- Provide manual operations checklists:
  - Immediate post-launch checklist.
  - 24-hour review (Search Console crawl errors, contact delivery audit).
  - 7-day review (analytics trends, core web vitals field metrics).
- Present final verification evidence and request Stephen's confirmation of completion.

## 7. Objections

1. **Objection 1 (Blocker): Pre-requisite phases 06, 07, and 08 are incomplete, and staging CMS subdomain does not exist.**
   - *Risk:* Cutting over DNS before validating Playwright E2E tests, remote CMS cloning, and protected preview risks unexpected production downtime or broken API relays.
   - *Resolution:* Sequence the steps deliberately in this plan: Step 1 (code hardening), Step 2 (RC tagging), Step 3 (Spantrix CMS staging setup), and Step 4 (Cloudflare Pages preview verification) must all pass with recorded evidence before Stephen is asked for cutover approval in Step 6.
2. **Objection 2 (Blocker): Missing explicit owner cutover approval.**
   - *Risk:* AGENTS.md, Build Plan Section 10, and prompts/09-production-handover.md strictly prohibit changing DNS or initiating migration without Stephen's explicit `APPROVE` or `APPROVE WITH CHANGES`.
   - *Resolution:* Plan is marked `AWAITING APPROVAL`. Step 6 is an explicit approval gate where full pre-cutover evidence is presented and work pauses until Stephen authorizes DNS modification.
3. **Objection 3 (Serious): Rank Math Schema multi-type `@type` crashes SSG/runtime during build.**
   - *Risk:* Rank Math emits `@type: ["Person", "Organization"]` on core pages (`/business-website-solutions`, `/pricing`). Strict `z.string()` validation in `schema.ts:47` triggers an `invalid_type` error, forcing fallback to static metadata and losing live SEO values.
   - *Resolution:* Update `JsonLdNodeSchema` in `apps/web/src/lib/seo/schema.ts` to `z.union([z.string(), z.array(z.string())])`, update `deduplicateJsonLdGraph` in `rankmath.ts`, and verify that `npm run build` generates all static pages with zero warnings.
4. **Objection 4 (Serious): Contact enquiry endpoint lacks server-side Cloudflare Turnstile token validation.**
   - *Risk:* Public endpoint `/api/enquiry` currently only checks honeypot. Spambots can bypass client forms and flood WordPress with junk submissions and trigger server mail blocks.
   - *Resolution:* Implement server-side verification against `https://challenges.cloudflare.com/turnstile/v0/siteverify` using `TURNSTILE_SECRET_KEY` in `apps/web/src/app/api/enquiry/route.ts` before forwarding payloads to WordPress.
5. **Objection 5 (Serious): Raw SQL database search-and-replace will corrupt serialized ACF and widget data.**
   - *Risk:* In WordPress, ACF layout definitions, options, and widget configurations are stored as serialized PHP strings (`s:length:"value"`). Running SQL `REPLACE()` breaks string lengths, causing fatal PHP unserialize errors.
   - *Resolution:* Mandatory use of WP-CLI `wp search-replace` or Better Search Replace plugin with `--dry-run` inspection prior to commit. Skip GUID column (`--skip-columns=guid`) to maintain feed/history integrity.
6. **Objection 6 (Minor): Risk of losing active leads during database migration.**
   - *Risk:* Inquiries submitted by clients on the live website while the database is being dumped or cloned could be overwritten.
   - *Resolution:* Query production `wp_posts` for `post_type = 'enquiry'` immediately prior to DNS switch, export records to CSV, and cross-reference with `Contact@oderindestephen.com` inbox.

## 8. Verdict

READY FOR APPROVAL.

The gap analysis is complete, live authoritative DNS records and LocalWP endpoints have been inspected, and the 14-section implementation plan covers all prerequisite gates, code hardening, staging setup, zero-downtime DNS cutover, post-switch verification, and operations handover required to fulfill Phase 09.

## 9. Approval

- Status: NOT APPROVED (Awaiting Stephen's review)
- Approver: Stephen
- Scope: Implementation of Step 1 through Step 9 in `plans/P09-production-handover.md`

## 10. Implementation log

- 2026-10-23: Phase 09 initiated. Executed research subagent (`b0c4d6dd-5821-46f8-8595-b206cb48b101`) to perform exhaustive gap review across Build Plan Sections 9, 10, 12, 13, 14, `prompts/09-production-handover.md`, and `docs/launch-checklist.md`.
- 2026-10-23: Discovered Rank Math `@type` array validation gap in `schema.ts` and missing server Turnstile verification in `/api/enquiry/route.ts`.
- 2026-10-23: Captured authoritative Cloudflare DNS snapshot confirming active Apex, MX, SPF, DMARC, and Portal records.
- 2026-10-23: Formulated concrete 14-section cutover plan `plans/P09-production-handover.md`.

## 11. Deviations

| Planned | Found | Resolution | Approval impact |
| :--- | :--- | :--- | :--- |
| Direct Phase 09 DNS cutover | Prerequisites (Phases 06, 07, 08) unexecuted; `cms.oderindestephen.com` unprovisioned | Integrated prerequisite execution (code hardening, RC tagging, staging clone, preview test) directly into Phase 09 sequence | Essential safety gate ensuring zero production disruption |
| Rank Math schema `@type` as string | Rank Math outputs `@type: ["Person", "Organization"]` on live CMS | Relaxed Zod schema to `z.union([z.string(), z.array(z.string())])` | Fixes build-time SSG fallback warnings |

## 12. Memory written

No memory triggers fired during planning. Existing decisions D-1 through D-13 and patterns P-1 through P-4 remain active and sufficient.

## 13. For Stephen to confirm

Stephen's explicit review and confirmation are required for:
1. **Approval of Plan P09:** Provide `APPROVE` or `APPROVE WITH CHANGES` to authorize execution of Steps 1 through 9.
2. **Spantrix Staging Subdomain:** Creation of subdomain `cms.oderindestephen.com` with SSL in Spantrix cPanel.
3. **Content Freeze Window:** Agreement on a 15–30 minute content freeze window for final database synchronization.
4. **Cutover Approval (Step 6 Gate):** Explicit cutover authorization after reviewing the staging preview evidence before Cloudflare DNS records are changed.
5. **Final Completion Confirmation (Step 9 Gate):** Confirmation that the public website at `https://oderindestephen.com` serves the approved headless build, enquiries arrive in `Contact@oderindestephen.com`, booking links work, and editing instructions are received.

## 14. Backend or external handoff

### Cloudflare DNS Configuration
- Zone: `oderindestephen.com`
- Change:
  - `oderindestephen.com` CNAME / Custom Domain $\rightarrow$ Cloudflare Pages production deployment (`oderindestephen-headless.pages.dev`).
  - `cms.oderindestephen.com` A $\rightarrow$ `66.85.46.67` (Proxied: DNS-only or with bypass rules for `/wp-admin/`, `/wp-json/`).
- Strictly Preserve:
  - `oderindestephen.com` MX $\rightarrow$ `_dc-mx.83f43889e3a2.oderindestephen.com` (Pri 0 $\rightarrow$ `66.85.46.67`)
  - `mail.oderindestephen.com` A $\rightarrow$ `66.85.46.67`
  - `oderindestephen.com` TXT $\rightarrow$ SPF `v=spf1 +a +mx +ip4:172.93.120.110 +ip4:66.85.46.67 ~all`
  - `_dmarc.oderindestephen.com` TXT $\rightarrow$ DMARC `v=DMARC1; p=none; rua=mailto:rua@dmarc.brevo.com`
  - `oderindestephen.com` TXT $\rightarrow$ Brevo verification `brevo-code:06d6334f25bbf184bd107ba740468b69`
  - `portal.oderindestephen.com` A $\rightarrow$ `188.114.96.0`, `188.114.97.0`

### Cloudflare Pages Production Environment Variables
- `ENVIRONMENT=production`
- `NEXT_PUBLIC_SITE_ORIGIN=https://oderindestephen.com`
- `WP_API_ORIGIN=https://cms.oderindestephen.com`
- `CMS_MEDIA_ORIGIN=https://cms.oderindestephen.com`
- `CMS_BRIDGE_SECRET=<secure-random-64-char>`
- `REVALIDATION_SECRET=<secure-random-64-char>`
- `PREVIEW_SIGNING_SECRET=<secure-random-64-char>`
- `TURNSTILE_SECRET_KEY=<cloudflare-turnstile-secret>`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY=<cloudflare-turnstile-site-key>`
- `NEXT_PUBLIC_CF_ANALYTICS_TOKEN=<optional-token>`

### Spantrix `wp-config.php` Security Constants
```php
define('OS_CMS_BRIDGE_SECRET', '<matching-secure-random-64-char>');
define('OS_REVALIDATION_SECRET', '<matching-secure-random-64-char>');
define('OS_PREVIEW_SECRET', '<matching-secure-random-64-char>');
define('OS_FRONTEND_ORIGIN', 'https://oderindestephen.com');
```

### Rollback Targets
- In case of edge frontend issue: Revert Cloudflare apex `oderindestephen.com` A records back to Spantrix origin `66.85.46.67`.
- Live Spantrix WordPress installation remains 100% intact and unaffected.
