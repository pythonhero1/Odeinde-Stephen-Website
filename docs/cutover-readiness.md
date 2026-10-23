# Cutover Readiness & Staging Operations Report

**Prepared for:** Stephen  
**Project:** OderindeStephen.com Headless WordPress Migration  
**Phase:** Phase 08 (`prompts/08-remote-preview-cms.md` / `plans/P08-remote-preview-cms.md`)  
**Status:** READY FOR STAGING DEPLOYMENT & VERIFICATION  
**Date:** 2026-10-23  

---

## 1. Verified Release Identifier

| Property | Value |
| :--- | :--- |
| **Git Remote Repository** | `https://github.com/pythonhero1/Odeinde-Stephen-Website.git` |
| **Verified Git Branch** | `main` |
| **Release Commit Hash** | `d0507fc` (`d0507fc11c1df7c49b6b90be886b623b3787a718`) |
| **Release Candidate Tag** | `v1.0.0-rc1` (Pushed and verified on GitHub) |
| **Local Quality Gates** | 34/34 Unit Tests Passing, ESLint 0 warnings/0 errors, TypeScript 0 errors, 19/19 Routes Compiled |
| **Workflow Integrity** | 482 checks passing in `tools/check-kit.mjs`; 7 memory checks passing in `tools/check-memory.py` |

---

## 2. Cloudflare Authoritative DNS Preservation & Staging Records

Cloudflare is the authoritative DNS manager for `oderindestephen.com`. 

### A. Critical Invariant: Untouched Production Records
The following active production records must **NEVER** be modified during Phase 08:
* **Apex (`@`) & `www`:** `oderindestephen.com` and `www.oderindestephen.com` remain pointing to the existing live Spantrix WordPress installation.
* **Mail Routing (MX):** All mail exchange records routing incoming emails for `@oderindestephen.com`.
* **Mail Authentication (TXT):** SPF (`v=spf1 ...`), DKIM (`*._domainkey`), and DMARC (`_dmarc`).
* **Client Portal (CNAME/A):** `portal.oderindestephen.com` routing active clients to the standalone portal.
* **Domain Verification (TXT):** Google Search Console and Bing verification strings.

### B. Phase 08 Staging Additions (Non-Production Only)
| Record Type | Name / Host | Target Value | Cloudflare Proxy | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **A** or **CNAME** | `cms` | Spantrix Server Dedicated IP | **DNS-Only (Grey Cloud)** | Remote headless CMS origin (`cms.oderindestephen.com`). Grey cloud ensures Let's Encrypt / AutoSSL verification and prevents premature edge caching. |
| **CNAME** | `preview` | `<pages-project>.pages.dev` | **Proxied (Orange Cloud)** | Protected staging preview frontend (`preview.oderindestephen.com`). |

---

## 3. Spantrix CMS Clone & Storage Isolation Guide

### A. Storage Quota Check
* **Account Quota:** Spantrix account limit is 15 GB total (shared across files, MySQL, mailboxes, and logs).
* **Pre-flight Threshold:** Verified free disk space must be at least **2.0 GB** (Total account consumption $\le 13.0\text{ GB}$).
* **Action in cPanel:** Check **Disk Usage** widget. If below 2.0 GB free, delete old zip backups and error logs.

### B. Isolated Subdomain Setup
1. In cPanel -> **Domains -> Subdomains**:
   * Subdomain: `cms`
   * Domain: `oderindestephen.com`
   * Document Root: `/home/USERNAME/cms.oderindestephen.com/` (Explicitly outside `public_html/`).
2. In cPanel -> **MySQL Database Wizard**:
   * Create database: `oderinde_cms_db`
   * Create user: `oderinde_cms_usr`
   * Grant all privileges.

### C. Live Baseline Backup & Data Sync
1. In phpMyAdmin or Terminal: Export live database tables with exact primary keys:
   ```bash
   mysqldump --single-transaction --quick --quote-names \
     -u [LIVE_USER] -p [LIVE_DB] \
     wp_posts wp_postmeta wp_terms wp_term_taxonomy wp_term_relationships wp_options \
     > live_backup_$(date +%Y%m%d).sql
   ```
2. Import into `oderinde_cms_db`:
   ```bash
   mysql -u oderinde_cms_usr -p oderinde_cms_db < live_backup_*.sql
   ```
   *Result:* Bitwise preservation of Homepage ID 14, all 6 Case Studies (96087, 96089, 96091, 96093, 96095, 96182), pages (96112, 96116, 96083, 96380, 96339), layouts (96084, 96086), and 101 media attachments.
3. Sync files and uploads into `/home/USERNAME/cms.oderindestephen.com/`:
   ```bash
   cp -r /home/USERNAME/public_html/wp-content/uploads /home/USERNAME/cms.oderindestephen.com/wp-content/
   ```

### D. Serialized Search & Replace
Run via WP-CLI on Spantrix (or Interconnect/it Search Replace DB):
```bash
# 1. Dry run verification
wp search-replace "https://oderindestephen.com" "https://cms.oderindestephen.com" \
  --dry-run --precise --all-tables --report-changed-only \
  --path=/home/USERNAME/cms.oderindestephen.com

# 2. Live execution after verifying ~150-400 expected replacements
wp search-replace "https://oderindestephen.com" "https://cms.oderindestephen.com" \
  --precise --all-tables --report-changed-only \
  --path=/home/USERNAME/cms.oderindestephen.com
```

### E. WordPress Configuration (`wp-config.php`)
Append to `cms.oderindestephen.com/wp-config.php`:
```php
// Staging Headless Configuration
define('OS_FRONTEND_ORIGIN', 'https://preview.oderindestephen.com');
define('OS_PREVIEW_SECRET', '<GENERATED_64_CHAR_HEX>');
define('OS_REVALIDATION_SECRET', '<GENERATED_64_CHAR_HEX>');
define('CMS_BRIDGE_SECRET', '<GENERATED_64_CHAR_HEX>');
define('FORCE_SSL_ADMIN', true);
define('DISALLOW_FILE_EDIT', true);
```

### F. Plugin & Email Activation
1. Activate `oderinde-headless` plugin in `wp-content/plugins/`.
2. Activate `advanced-custom-fields-pro` (schema auto-loads from `wordpress/acf-json/`).
3. Activate `seo-by-rank-math` (Headless CMS support enabled).
4. Configure FluentSMTP with Spantrix cPanel authenticated SMTP credentials (port 465 SSL or 587 TLS) for `Contact@oderindestephen.com`.
5. Create user `headless_preview` (Role: Editor) and generate Application Password `Nextjs_Draft_Mode`.

---

## 4. Cloudflare Pages Preview Deployment Guide

1. In Cloudflare Dashboard -> **Workers & Pages -> Create Application -> Pages -> Connect to Git**.
2. Select GitHub repository: `pythonhero1/Odeinde-Stephen-Website`.
3. Configure Build Settings:
   * **Framework preset:** None
   * **Build command:** `npx @cloudflare/next-on-pages` (or `npm run pages:build`)
   * **Build output directory:** `.vercel/output/static`
   * **Root directory:** `apps/web`
4. Configure Build Environment Variables (Preview Scope):
   * `NODE_VERSION`: `20.18.0`
   * `ENVIRONMENT`: `preview`
   * `SITE_URL`: `https://preview.oderindestephen.com`
   * `WP_API_ORIGIN`: `https://cms.oderindestephen.com`
   * `CMS_MEDIA_ORIGIN`: `https://cms.oderindestephen.com`
5. Inject Encrypted Cloudflare Secrets (Preview Scope):
   * `WP_PREVIEW_APPLICATION_PASSWORD`: Generated WP Application Password
   * `PREVIEW_SIGNING_SECRET`: Matches `OS_PREVIEW_SECRET`
   * `REVALIDATION_SECRET`: Matches `OS_REVALIDATION_SECRET`
   * `CMS_BRIDGE_SECRET`: Matches `CMS_BRIDGE_SECRET`
   * `TURNSTILE_SECRET_KEY`: Cloudflare Turnstile Secret Key (or testing key)
   * `NEXT_PUBLIC_TURNSTILE_SITE_KEY`: Cloudflare Turnstile Site Key (or testing key)

---

## 5. Security, WAF & Zero Trust Access Protection

1. **Cloudflare Zero Trust (Access) Application:**
   * Protect: `preview.oderindestephen.com` and `*.pages.dev`
   * Policy: **Allow** with Email OTP for Stephen and designated testers.
   * Unauthenticated visitors and crawlers receive HTTP 302/403 (Zero public exposure or search indexation).
2. **Revalidation Webhook Bypass Policy:**
   * Policy in Cloudflare Access: **Bypass** for Path `/api/revalidate` matching the Spantrix Server IP.
   * Rule in Cloudflare WAF: **Skip** all remaining security/bot rules for Spantrix Server IP on `/api/revalidate`.
3. **Edge Caching Rules:**
   * In Cloudflare Caching -> Cache Rules:
     * Bypass Cache for `(http.host eq "preview.oderindestephen.com")`
     * Bypass Cache for `(http.cookie contains "__prerender_bypass")`

---

## 6. Comprehensive 8-Point Verification Suite

| # | Check | Target | Expected Result | Pass/Fail |
| :--- | :--- | :--- | :--- | :--- |
| **1** | **CMS API Reachability** | `GET https://cms.oderindestephen.com/wp-json/os/v1/site` | HTTP 200 with valid TLS/SSL, clean JSON payload, and `bookingUrl` matching Cal.com contract. | [ ] |
| **2** | **Access Protection** | Unauthenticated visit to `preview.oderindestephen.com` | HTTP 302/403 Cloudflare Access challenge. Crawlers strictly blocked. | [ ] |
| **3** | **Route & Content Rendering** | Authenticated session on 13 routes | All pages render faithfully using live remote CMS content. | [ ] |
| **4** | **Draft Preview Roundtrip** | Edit post/page draft in WP -> Click "Preview" | Redirects to `/api/preview?token=...`, enables `draftMode()`, renders draft changes, and "Exit Preview" restores public state. | [ ] |
| **5** | **Publish Revalidation** | Update post in WordPress CMS | Triggers webhook to `/api/revalidate`, Next.js purges cache tags, and preview view updates within 5s. | [ ] |
| **6** | **Turnstile & Form Submission** | Submit Contact form on `preview.oderindestephen.com` | Turnstile client verification passes, `/api/enquiry` relays HMAC payload to CMS, private enquiry created, email received at `Contact@oderindestephen.com`. | [ ] |
| **7** | **Media Continuity** | Request `https://preview.oderindestephen.com/wp-content/uploads/...` | Returns HTTP 301 redirecting to `https://cms.oderindestephen.com/wp-content/uploads/...` serving HTTP 200 image. | [ ] |
| **8** | **Anti-Indexing Verification** | `curl -I https://preview.oderindestephen.com/` | Response headers include `X-Robots-Tag: noindex, nofollow, noarchive`, and `/robots.txt` returns `Disallow: /`. | [ ] |

---

## 7. Rollback & Recovery Procedures

### Scenario A: CMS Subdomain Failure (Spantrix)
* **Risk:** Subdomain misconfiguration or database error during staging setup.
* **Impact on Live Site:** Zero. The live site at `oderindestephen.com` runs from a completely isolated document root (`public_html/`) and database.
* **Procedure:** Drop `oderinde_cms_db` tables, re-import `live_backup_*.sql`, and re-run serialized URL replacement.

### Scenario B: Cloudflare Pages Deployment Failure
* **Risk:** Build or runtime error on Cloudflare Pages.
* **Impact on Production:** Zero. Production DNS points exclusively to the live site.
* **Procedure:** In Cloudflare Pages Deployments tab, click **Rollback to previous deployment** ($< 30\text{ seconds}$ global rollback).

---

## 8. Cutover Window & Phase 09 Plan Preview

Once all 8 points in Section 6 pass verification:
1. Stephen will review the live staging preview at `preview.oderindestephen.com`.
2. A formal 15–30 minute Content Freeze will be agreed upon.
3. Final delta sync of any enquiries received on the live site will be imported into the CMS.
4. Stephen will issue cutover approval for Phase 09.
5. Production DNS cutover will switch apex `@` and `www` to Cloudflare Pages, leaving the CMS at `cms.oderindestephen.com`.
