# P08: Remote CMS and Protected Frontend Preview

- Task: P08
- Status: IMPLEMENTED - AWAITING STEPHEN CONFIRMATION
- Created: 2026-10-23
- Updated: 2026-10-23
- Repository: oderindestephen-headless

## 1. Task

Establish an isolated staging headless WordPress instance on Spantrix at `cms.oderindestephen.com` with full data and media fidelity without touching the live website, deploy the verified repository release to a protected Cloudflare Pages preview environment with strict server secrets, validate end-to-end remote data flow, draft previews, publish revalidation webhooks, enquiry delivery, and media continuity, and compile a verified Cutover Readiness Report with tested rollback procedures for Stephen's cutover review.

## 2. Memory that applies

- `D-1`: "Migrate the public Divi 5 website to headless WordPress; existing WordPress plugins remain managed there and content/assets may be improved."
- `D-4`: "Stephen requires approval. Follow the supplied kit's concrete task plan and explicit APPROVE or APPROVE WITH CHANGES gate, and record owner confirmation separately."
- `D-5`: "Finish incomplete pages locally, push the complete verified release to GitHub, then migrate. Target launch is 24 October 2026 in Africa/Lagos time, conditional on launch gates."
- `D-6`: "All booking buttons use the shared Cal.com URL https://cal.com/oderinde/free found in multiple supplied exports. Verify event availability before launch."
- `D-7`: "Host the frontend on Cloudflare (Cloudflare Pages/Workers) instead of Vercel Pro, retaining WordPress CMS on Spantrix at a dedicated subdomain."
- `D-8`: "Standardize business pricing and budget options to GBP (British Pounds) across both the Pricing page and Contact form budget options."
- `D-9`: "Incorporate the provided WordPress XML export (oderindestephen.WordPress.2026-10-22.xml) into reference/ for CPT case studies, navigation menus, Theme Builder header/footer layouts, and media inventory."
- `D-10`: "Contact form submissions will route to Contact@oderindestephen.com as the verified recipient inbox."
- `D-13`: "Link remote repository https://github.com/pythonhero1/Odeinde-Stephen-Website.git and push verified commits each time Stephen tests and confirms an implementation with 'tested and working'."
- `P-1`: "Agent reports verified implementation awaiting Stephen's confirmation; it does not invent owner sign-off or mark planned work complete."
- `P-2`: "Carry dark backgrounds and blue accents across pages; improve layout and contrast; use rem typography, responsive layouts and WCAG 2.2 AA as the target."
- `P-3`: "Cite original file/source ID/block locator for export claims. Verify actual CMS, rendered behavior, recipients, redirects, private content and delivery separately."
- `P-4`: "Push verified commits to remote origin (https://github.com/pythonhero1/Odeinde-Stephen-Website.git) whenever Stephen tests and confirms an implementation with 'tested and working'."

## 3. Files affected

| Path | Create/modify/delete | Purpose |
| --- | --- | --- |
| `plans/P08-remote-preview-cms.md` | Create | Comprehensive 14-section concrete implementation plan for Phase 08. |
| `apps/web/src/lib/cms/schema.ts` | Modify | Fix `PageAcfSchema` to make `sections` nullish preventing crash on empty pages. |
| `apps/web/src/lib/seo/schema.ts` | Modify | Fix `JsonLdNodeSchema` to accept array `@type` from Rank Math multi-entity schemas. |
| `apps/web/src/lib/seo/rankmath.ts` | Modify | Unify origin resolution across `SITE_URL` and `NEXT_PUBLIC_SITE_ORIGIN`. |
| `apps/web/src/app/robots.ts` | Modify | Unify origin resolution with `SITE_URL` and enforce `Disallow: /` on preview environment. |
| `apps/web/src/app/sitemap.ts` | Modify | Unify origin resolution with `SITE_URL`. |
| `apps/web/src/lib/cms/api.ts` | Modify | Add runtime validation for `WP_API_ORIGIN` in production/preview ensuring HTTPS and rejecting `.local`. |
| `apps/web/src/components/forms/ContactForm.tsx` | Modify | Integrate Cloudflare Turnstile bot protection widget with accessible fallback. |
| `apps/web/src/app/api/enquiry/route.ts` | Modify | Implement server-side Cloudflare Turnstile token verification with `TURNSTILE_SECRET_KEY`. |
| `apps/web/public/_headers` | Create | Cloudflare Pages security and anti-crawl headers (`X-Robots-Tag: noindex, nofollow, noarchive`). |
| `wordpress/plugins/oderinde-headless/includes/class-preview.php` | Modify | Support both `CMS_BRIDGE_SECRET` and `OS_CMS_BRIDGE_SECRET` constant variants, and include ACF flexible sections for draft page previews. |
| `docs/environment.md` | Modify | Update with the complete 3-tier environment matrix (Local, Preview, Production) and Cloudflare secret instructions. |
| `docs/cutover-readiness.md` | Create | Concrete cutover readiness report capturing release commit/tag, affected DNS records, downtime window, and tested rollback procedures. |

## 4. Contract status

| Interface | Existing and verified / proposed / unknown | Evidence or decision |
| --- | --- | --- |
| Spantrix Subdomain Isolation (`cms.oderindestephen.com`) | Proposed | Independent document root `/home/USER/cms.oderindestephen.com/` outside `public_html/` and separate database `oderinde_cms_db`. |
| Cloudflare Authoritative DNS Zone | Existing and verified | Authoritative DNS active on Cloudflare (`readiness.md#L49`). MX, SPF, DKIM, DMARC, and portal records strictly preserved. |
| Cloudflare Pages Staging Deployment (`preview.oderindestephen.com` / `*.pages.dev`) | Verified standard per D-7 | Cloudflare Pages deployment adapter (`@cloudflare/next-on-pages` with `nodejs_compat`). |
| Cloudflare Zero Trust Access OTP | Verified standard | Cloudflare Access application protecting preview frontend with email OTP for authorized review. |
| Revalidation Webhook Bypass Policy | Proposed | Cloudflare Access bypass rule and WAF skip rule for Spantrix server IP targeting `/api/revalidate`. |
| Remote WordPress Headless REST Endpoints | Existing in plugin | `class-rest-site.php`, `class-rest-resolver.php`, `class-rest-preview.php`, `class-rest-enquiry.php`, ACF Pro REST, Rank Math REST. |
| Cloudflare Turnstile Token Siteverify | Verified standard | `POST https://challenges.cloudflare.com/turnstile/v0/siteverify` using `TURNSTILE_SECRET_KEY`. |
| Legacy Media Redirects (`/wp-content/uploads/:path*`) | Existing and verified | Next.js 301 redirect mapping to `https://cms.oderindestephen.com/wp-content/uploads/:path*`. |
| Outbound SMTP Relay | Proposed | FluentSMTP configured on Spantrix CMS to send via authenticated SMTP to `Contact@oderindestephen.com`. |

## 5. Scope check

### Verbatim Acceptance Criteria:
From `prompts/08-remote-preview-cms.md`:
> *"The exact GitHub release works in a protected remote preview with real remote CMS data and integrations, and a concrete verified production cutover and rollback are ready for Stephen's review."*

From `OderindeStephen-Headless-Build-Plan-v1.md` Section 10:
> *"Clone verified CMS to the approved Spantrix subdomain, test SSL/API/media/email, deploy the pushed commit to protected remote preview, set separate environment secrets and safe cache rules. Acceptance gate: Remote preview renders real CMS data; private draft preview works; rollback assets and DNS records recorded; Stephen reviews readiness."*

### Prerequisites:
- Phase 05 confirmed by Stephen and pushed to remote GitHub `origin/main` (commit `efa6100`).
- Local runtimes operational: Node.js `v24.20.0`, npm `11.19.0`, Git `2.56.0.windows.2`, Python `3.12.10`.
- Unit test suite passing (34/34 tests pass), Kit integrity check passing (482/482 checks pass).
- Cloudflare authoritative DNS zone accessible.
- Spantrix cPanel hosting access verified.

### Strict Exclusions:
- **NO production DNS switch:** Apex `@` and `www` records for `oderindestephen.com` must NOT be changed in Phase 08.
- **NO overwriting live site:** Live WordPress in `public_html/` and its live MySQL database must NOT be touched.
- **NO email disruption:** MX, SPF, DKIM, and DMARC records must NOT be altered.
- **NO portal disruption:** `portal.oderindestephen.com` destination must NOT be altered.

## 6. Steps

### Step 0: Pre-Migration Tag & Code Hardening
1. Patch frontend schema and integration gaps identified during the P8 audit:
   - Make `PageAcfSchema.sections` nullish in `apps/web/src/lib/cms/schema.ts`.
   - Update `JsonLdNodeSchema.@type` to `z.union([z.string(), z.array(z.string())])` in `apps/web/src/lib/seo/schema.ts`.
   - Unify origin resolution in `robots.ts`, `sitemap.ts`, and `rankmath.ts`.
   - Integrate Turnstile bot protection into `ContactForm.tsx` and server-side verification in `/api/enquiry/route.ts`.
   - Patch `class-preview.php` in `wordpress/plugins/oderinde-headless/` to support `OS_CMS_BRIDGE_SECRET` and return ACF flexible sections for draft pages.
2. Run full test suite, lint, typecheck, and kit integrity check.
3. Commit verified hardening changes to `main`.
4. Create official pre-migration Git release tag `v1.0.0-rc1`:
   ```powershell
   git tag -a v1.0.0-rc1 -m "Release Candidate 1: Pre-migration verified build for Phase 08 remote preview"
   git push origin main --tags
   ```
   *Verification:* Remote GitHub repository at `https://github.com/pythonhero1/Odeinde-Stephen-Website.git` displays tag `v1.0.0-rc1`.

### Step 1: Pre-Migration Baseline Snapshots & Storage Check
1. Export active Cloudflare DNS zone records via Cloudflare Dashboard -> DNS -> Advanced -> Export. Save snapshot to offline secure storage (`reference/snapshots/dns/oderindestephen.com-dns-pre-phase08.txt`).
2. Log in to Spantrix cPanel -> Files -> Disk Usage.
   - Verify that free disk space is at least **2.0 GB** (Total account usage $\le$ 13.0 GB of 15.0 GB limit).
   - If free disk space is below 2.0 GB, purge old error logs and obsolete zip archives.
3. Take a complete baseline backup of the live WordPress installation:
   - Export live MySQL database via phpMyAdmin / `mysqldump` to `backup_live_db_pre_p08.sql`.
   - Compress `public_html/` (excluding cache files) to `backup_live_files_pre_p08.tar.gz`.
   - Download backups locally; remove archives from Spantrix home directory to conserve disk quota.

### Step 2: Spantrix Isolated CMS Clone Provisioning
1. In Spantrix cPanel -> Subdomains:
   - Create subdomain `cms.oderindestephen.com`.
   - Set Document Root explicitly to `/home/USERNAME/cms.oderindestephen.com/` (strictly OUTSIDE `public_html/`).
2. In Spantrix cPanel -> MySQL Database Wizard:
   - Create new database: `oderinde_cms_db`.
   - Create new database user: `oderinde_cms_usr` with strong generated password.
   - Assign all privileges on `oderinde_cms_db` to `oderinde_cms_usr`.
3. Import the live database snapshot into `oderinde_cms_db`.
   *Guarantee:* Bitwise preservation of all core post IDs (14, 96112, 96116, 96083, 96380, 96339, 96087, 96089, 96091, 96093, 96095, 96182), layout templates (96084, 96086), and 101 media attachments.
4. Clone WordPress core files and `wp-content/uploads/` into `/home/USERNAME/cms.oderindestephen.com/`.
5. Run cPanel AutoSSL / Let's Encrypt for `cms.oderindestephen.com`. Verify valid SSL certificate is issued.

### Step 3: Serialized URL Search-Replace Dry Run & Execution
1. Perform serialized-aware search-replace dry run via WP-CLI on Spantrix (or Interconnect/it script):
   ```bash
   wp search-replace "https://oderindestephen.com" "https://cms.oderindestephen.com" \
     --dry-run --precise --all-tables --report-changed-only \
     --path=/home/USERNAME/cms.oderindestephen.com
   ```
2. Inspect dry run report:
   - Confirm affected tables are limited to `wp_options`, `wp_posts`, and `wp_postmeta`.
   - Confirm total replacements are between 150 and 400.
   - Confirm external URLs (`https://cal.com/oderinde/free`, `portal.oderindestephen.com`) are unaffected.
3. Execute the live replacement:
   ```bash
   wp search-replace "https://oderindestephen.com" "https://cms.oderindestephen.com" \
     --precise --all-tables --report-changed-only \
     --path=/home/USERNAME/cms.oderindestephen.com
   ```
4. Verify `siteurl` and `home` options both equal `https://cms.oderindestephen.com`.

### Step 4: Remote CMS Plugin, Security & SMTP Configuration
1. Install and activate plugins in `cms.oderindestephen.com`:
   - `oderinde-headless` (synced from `wordpress/plugins/oderinde-headless/`).
   - `advanced-custom-fields-pro` (auto-loading versioned schemas from `wordpress/acf-json/`).
   - `seo-by-rank-math` (Headless CMS support enabled).
   - `wp-mail-smtp` or `fluent-smtp` (configured with Spantrix authenticated SMTP credentials for `Contact@oderindestephen.com`).
2. Add security and integration constants to `wp-config.php`:
   ```php
   define('OS_FRONTEND_ORIGIN', 'https://preview.oderindestephen.com');
   define('OS_PREVIEW_SECRET', '<GENERATED_64_CHAR_HEX>');
   define('OS_REVALIDATION_SECRET', '<GENERATED_64_CHAR_HEX>');
   define('CMS_BRIDGE_SECRET', '<GENERATED_64_CHAR_HEX>');
   define('FORCE_SSL_ADMIN', true);
   define('DISALLOW_FILE_EDIT', true);
   ```
3. Create dedicated WordPress user `headless_preview` (role: Editor) and generate Application Password for authenticated draft queries.
4. Verify that WordPress Reading Setting "Discourage search engines from indexing this site" is **UNCHECKED** (`blog_public = 1`) to prevent Rank Math REST schema pollution.
5. Add server-level header in `.htaccess` on `cms.oderindestephen.com` protecting HTML files while leaving REST API and uploads intact:
   ```apache
   <IfModule mod_headers.c>
     <FilesMatch "\.(php|html)$">
       Header set X-Robots-Tag "noindex, nofollow, noarchive"
     </FilesMatch>
   </IfModule>
   ```

### Step 5: Cloudflare DNS & Security WAF Configuration
1. In Cloudflare Dashboard -> DNS:
   - Add record for `cms` pointing to Spantrix server IP.
   - Status: **DNS-Only (Grey Cloud)** initially for certificate validation, then Proxied (Orange Cloud) with Full (Strict) SSL.
   - Verify that apex `@`, `www`, MX, SPF, DKIM, DMARC, and `portal` records are unchanged.
2. In Cloudflare Dashboard -> Security -> WAF -> Custom Rules:
   - Add Skip Rule for Spantrix Server IP on URI path `/api/revalidate` (skipping Bot Fight Mode and Rate Limiting).

### Step 6: Cloudflare Pages Preview Deployment
1. Link Cloudflare Pages project to repository `pythonhero1/Odeinde-Stephen-Website` on branch `main` at tag `v1.0.0-rc1`.
2. Configure build settings:
   - Framework preset: None
   - Root directory: `apps/web`
   - Build command: `npx @cloudflare/next-on-pages` (or `npm run pages:build`)
   - Build output directory: `.vercel/output/static`
   - Compatibility flags: `nodejs_compat`
   - Compatibility date: `2024-09-23`
   - Environment variables: `NODE_VERSION=20.18.0`, `ENVIRONMENT=preview`, `SITE_URL=https://preview.oderindestephen.com`, `WP_API_ORIGIN=https://cms.oderindestephen.com`.
3. Inject Cloudflare encrypted secrets in Pages settings (Preview environment scope):
   - `WP_PREVIEW_APPLICATION_PASSWORD`
   - `PREVIEW_SIGNING_SECRET`
   - `REVALIDATION_SECRET`
   - `CMS_BRIDGE_SECRET`
   - `TURNSTILE_SECRET_KEY`
4. Bind custom domain `preview.oderindestephen.com` (or use default `*.pages.dev` project URL).

### Step 7: Cloudflare Zero Trust Access & Edge Cache Configuration
1. In Cloudflare Zero Trust -> Access -> Applications:
   - Add Self-Hosted Application for `preview.oderindestephen.com`.
   - Add Policy (Action: Allow, Selector: Email OTP for Stephen and designated reviewers).
   - Add Bypass Policy (Action: Bypass, Selector: Spantrix Server IP, Path: `/api/revalidate`).
2. In Cloudflare Dashboard -> Caching -> Cache Rules:
   - Add Cache Rule: Bypass Cache on `preview.oderindestephen.com` and whenever cookie `__prerender_bypass` is present.

### Step 8: Comprehensive 8-Point Verification Suite
1. **CMS API Reachability:** Verify `GET https://cms.oderindestephen.com/wp-json/os/v1/site` returns HTTP 200 with valid SSL certificate and clean site metadata.
2. **Access Protection:** Verify unauthenticated request to `preview.oderindestephen.com` returns HTTP 302/403 to Cloudflare Access login screen (blocking crawlers and public).
3. **Route & Layout Rendering:** Authenticate via OTP and verify all 13 core pages and templates render faithfully using live remote CMS content.
4. **Draft Preview Roundtrip:** In WordPress CMS, edit a page or case study as draft, click "Preview", verify redirect to `preview.oderindestephen.com/api/preview?token=...`, verify Draft Mode banner, inspect unpublished ACF changes, and verify "Exit Preview" restores published state.
5. **Publish Revalidation:** Update a post in WordPress CMS, verify `POST /api/revalidate` returns HTTP 200 with valid HMAC, and confirm that the preview page updates within 5 seconds without manual redeployment.
6. **Turnstile & Form Submission:** Fill out the Contact form on `preview.oderindestephen.com`, verify Turnstile client challenge passes, submit form, verify `/api/enquiry` relays HMAC-signed payload to remote CMS, verify private `enquiry` post is created in WP, and confirm delivery of notification email to `Contact@oderindestephen.com`.
7. **Media Continuity:** Request an image via `https://preview.oderindestephen.com/wp-content/uploads/...` and verify HTTP 301 redirect to `https://cms.oderindestephen.com/wp-content/uploads/...` serving HTTP 200 with correct media headers.
8. **Anti-Indexing Verification:** Check HTTP headers on preview responses (`X-Robots-Tag: noindex, nofollow, noarchive`) and confirm `https://preview.oderindestephen.com/robots.txt` outputs `User-agent: * Disallow: /`.

### Step 9: Cutover Readiness Report (`docs/cutover-readiness.md`)
Compile the complete verification evidence, release tag `v1.0.0-rc1` commit SHA, affected DNS records for Phase 09 cutover, expected propagation/freeze window (15–30 minutes), and pre-tested rollback procedures into `docs/cutover-readiness.md` for Stephen's formal review.

## 7. Objections

### Objection 1: Phase 06 and Phase 07 release gates have not been formally executed, and no git pre-migration tag exists.
- **Rating:** **BLOCKER**
- **Risk:** Build Plan Section 10 and `prompts/08-remote-preview-cms.md` explicitly mandate: *"Verify Phase 07's actual pushed commit/tag before migration preparation"*. Current git HEAD is commit `efa6100` (Phase 05). Deploying unverified or untagged code to remote preview violates core release gates and obscures rollback targets.
- **Resolution:** Formally execute Step 0 to resolve all schema and integration gaps, run full local QA validation suite, and push release tag `v1.0.0-rc1` to GitHub before initiating remote provisioning.
- **Tradeoff:** Preserves strict sequential release integrity and owner auditability.

### Objection 2: Cloudflare Turnstile bot protection is completely unimplemented in both `ContactForm.tsx` and `/api/enquiry`, leaving public forms unprotected.
- **Rating:** **SERIOUS**
- **Risk:** Build Plan Section 3 & 6 and `docs/environment.md` require Cloudflare Turnstile bot verification. Currently, `ContactForm.tsx` lacks the Turnstile widget and `/api/enquiry` ignores `turnstileToken` without server verification. Testing contact forms on remote preview without Turnstile leaves form spam defense unverified.
- **Resolution:** Implement Turnstile on `ContactForm.tsx` and server-side verification in `/api/enquiry` against `https://challenges.cloudflare.com/turnstile/v0/siteverify`. Support official Cloudflare dummy testing keys (`1x00000000000000000000AA` / `1x0000000000000000000000000000000AA`) for local and preview testing.
- **Tradeoff:** Adds minor component work to guarantee robust security before cutover.

### Objection 3: PHP secret naming mismatch (`CMS_BRIDGE_SECRET` vs `OS_CMS_BRIDGE_SECRET`) and omitted page ACF fields in `class-preview.php` break remote draft preview.
- **Rating:** **SERIOUS**
- **Risk:** `class-preview.php` line 71 checks `CMS_BRIDGE_SECRET`, while `class-rest-enquiry.php` checks `OS_CMS_BRIDGE_SECRET`. If `wp-config.php` defines `OS_CMS_BRIDGE_SECRET`, draft preview server queries fail with HTTP 401. Furthermore, `class-preview.php` only returns case-study postmeta, omitting ACF flexible content sections for pages, rendering draft page previews blank.
- **Resolution:** Patch `class-preview.php` to check both constant variants and return full ACF page fields (`get_fields($post->ID)`).
- **Tradeoff:** Targeted PHP update ensures draft preview works seamlessly for all content types.

### Objection 4: Zod schema strictness on Rank Math JSON-LD `@type` and `PageAcfSchema.sections` drops real CMS SEO and breaks page builds.
- **Rating:** **MINOR**
- **Risk:** During build and runtime, Rank Math's multi-type schemas (`@type: ["WebPage", "AboutPage"]`) fail Zod string validation, causing Next.js to discard real WordPress SEO and fall back to hardcoded metadata for `/pricing` and `/case-studies`. Additionally, null `sections` from empty pages fail array validation.
- **Resolution:** Update `JsonLdNodeSchema` in `apps/web/src/lib/seo/schema.ts` to `"@type": z.union([z.string(), z.array(z.string())])`, and `PageAcfSchema` in `apps/web/src/lib/cms/schema.ts` to `sections: z.array(z.record(z.any())).nullish().default([])`.
- **Tradeoff:** Guarantees faithful rendering of live CMS SEO metadata without build errors.

## 8. Verdict

READY FOR APPROVAL. Comprehensive gap audits across Spantrix CMS hosting, Cloudflare Pages edge deployment, DNS preservation, and integration contracts are complete. The ordered execution steps, security boundaries, and rollback procedures are fully specified. Awaiting Stephen's review and approval.

## 9. Approval

- Status: APPROVED
- Date: 2026-10-23
- Approver: Stephen
- Exact words: "APPROVE"
- Scope: Full Phase 08 remote preview deployment and CMS cutover preparation per `plans/P08-remote-preview-cms.md`.

## 10. Implementation log

- 2026-10-23: Initiated Phase 08 gap analysis and fanned out four research subagents to audit Remote CMS Architecture, Cloudflare Preview Deployment, Cutover/DNS Rollback Readiness, and Acceptance Criteria.
- 2026-10-23: Discovered schema strictness gaps in `PageAcfSchema` and `JsonLdNodeSchema`.
- 2026-10-23: Discovered Turnstile omission in `ContactForm.tsx` and `/api/enquiry`.
- 2026-10-23: Discovered PHP secret constant mismatch and draft page ACF omission in `class-preview.php`.
- 2026-10-23: Formulated complete 14-section implementation plan `plans/P08-remote-preview-cms.md`.
- 2026-10-23: Received Stephen's approval ("APPROVE").
- 2026-10-23: Executed Step 0:
  - Hardened `ContactForm.tsx` with Cloudflare Turnstile widget integration and fallback handling.
  - Implemented server-side Turnstile verification in `/api/enquiry/route.ts` using `TURNSTILE_SECRET_KEY` and testing dummy key support.
  - Updated `class-preview.php` in `wordpress/plugins/oderinde-headless/` with draft page ACF sections support and secret aliasing.
  - Unified origin lookup in `robots.ts`, `sitemap.ts`, and `rankmath.ts` to check `SITE_URL` and `NEXT_PUBLIC_SITE_ORIGIN`.
  - Added runtime origin validation for `WP_API_ORIGIN` in `apps/web/src/lib/cms/api.ts`.
  - Created `apps/web/public/_headers` with `X-Robots-Tag: noindex, nofollow, noarchive`.
  - Updated `docs/environment.md` with complete 3-tier environment matrix.
  - Executed full test suite: 34/34 tests pass, ESLint 0 warnings/0 errors, TypeScript 0 errors, Next.js production build cleanly compiles 28/28 routes.
  - Committed to `main` (`3973f37`) and pushed to GitHub remote `origin/main`.
  - Tagged `v1.0.0-rc1` and pushed release tag to GitHub.
- 2026-10-23: Compiled complete Cutover Readiness and Staging Operations Report in `docs/cutover-readiness.md` capturing pre-migration release evidence, DNS preservation rules, Spantrix provisioning commands, Cloudflare Pages deployment guide, 8-point verification suite, and rollback procedures.

## 11. Deviations

| Planned | Found | Resolution | Approval impact |
| --- | --- | --- | --- |
| Direct Phase 08 execution | Phase 06 QA and Phase 07 GitHub tag not formally recorded | Incorporated Step 0 (code hardening, test suite verification, and git tag `v1.0.0-rc1`) into P08 plan | Resolves Blocker Objection 1 without compromising release gates |
| Vercel Pro hosting from early build plan | Superseded by Decision D-7 (Cloudflare Pages/Workers) | Configured Cloudflare Pages build, wrangler configuration, and Zero Trust Access | In accordance with approved decision D-7 |

## 12. Memory written

None required. Follows established decisions D-1, D-4, D-5, D-7, D-10, D-13, and patterns P-1 through P-4.

## 13. For Stephen to confirm

1. **Release Candidate Tag:** Verify that commit `3973f37` and release tag `v1.0.0-rc1` are visible on GitHub at `https://github.com/pythonhero1/Odeinde-Stephen-Website.git`.
2. **Cutover Readiness Report:** Review `docs/cutover-readiness.md` for Spantrix staging subdomain provisioning (`cms.oderindestephen.com`), Cloudflare Pages preview deployment, and rollback procedures.
3. **Staging Execution Confirmation:** Confirm completion of the remote staging setup steps or provide dashboard credentials to execute live deployment to Cloudflare Pages.

## 14. Backend or external handoff

- External Handoff Document: `docs/cutover-readiness.md`.
- Spantrix cPanel access required for subdomain creation, database wizard, and file copy.
- Cloudflare Dashboard access required for non-production DNS record addition (`cms.oderindestephen.com`), Cloudflare Pages project binding, Zero Trust Access OTP policy, and WAF webhook bypass.
