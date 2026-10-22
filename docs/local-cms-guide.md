# Local WordPress CMS Setup Guide

This guide describes how to run a local WordPress development instance on Windows using the reference XML export (`reference/wordpress/oderindestephen.WordPress.2026-10-22.xml`).

---

## 1. Local WordPress Options

Choose either of the following standard Windows local WordPress setups:

### Option A: LocalWP (Recommended)
1. Download and open **Local** (formerly Local by Flywheel) on Windows.
2. Create a new site:
   * **Site name:** `oderinde-cms`
   * **Environment:** Preferred (PHP 8.2+, MySQL 8.0, NGINX)
   * **Local domain:** `http://oderinde-cms.local`
3. Click **Start Site** and navigate to WP Admin.

### Option B: Docker / WP-CLI
```powershell
# Using docker-compose or wp-env
npx wp-env start
```

---

## 2. Importing the Reference WXR Data

1. In WP Admin, navigate to **Tools $\rightarrow$ Import**.
2. Install and run the **WordPress Importer**.
3. Select the file:
   `reference/wordpress/oderindestephen.WordPress.2026-10-22.xml`
4. On the import options screen:
   * Assign posts to the admin user.
   * Check **Download and import file attachments** (this fetches images directly from the live media URLs into your local uploads).
5. Click **Submit** and await completion.

---

## 3. Required Plugin & Setting Configuration

1. **Permalinks:**
   * Go to **Settings $\rightarrow$ Permalinks**.
   * Set permalinks to **Post name** (`/%postname%/`).
   * Save changes to flush rewrite rules.
2. **ACF Pro:**
   * Ensure Advanced Custom Fields Pro is active.
   * ACF will load the versioned field groups from `wordpress/acf-json/` once the project plugin is symlinked or copied.
3. **Dedicated Preview User:**
   * Create a user with role **Editor** (e.g. `headless_preview`).
   * Generate an **Application Password** under User Profile.
   * Place the credentials into `apps/web/.env.local` (never commit this file).
4. **Prevent Outbound Mail:**
   * Install a mail-catcher plugin (e.g., *WP Mail Logging* or *MailHog*) to ensure test form submissions never send real emails to live clients during local testing.

---

## 4. Connecting `apps/web` to Local CMS

Update `apps/web/.env.local`:
```bash
WP_API_ORIGIN=http://oderinde-cms.local
# or http://localhost:8080 depending on your local web server port
```
