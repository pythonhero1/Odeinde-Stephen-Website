# Local WordPress CMS Setup Guide

This guide describes how to run a local WordPress development instance on Windows using LocalWP (installed at `C:\Users\Pythonhero\AppData\Local\Programs\Local\Local.exe`) and the reference XML export (`reference/wordpress/oderindestephen.WordPress.2026-10-22.xml`).

---

## 1. LocalWP Environment (Installed)

LocalWP v10.2.0 is installed on this system.

1. Launch **Local** from Windows Start Menu or execute:
   ```powershell
   & "$env:LOCALAPPDATA\Programs\Local\Local.exe"
   ```
2. Create a new site:
   * **Site name:** `oderinde-cms`
   * **Environment:** Preferred (PHP 8.2+, MySQL 8.0/8.4, NGINX)
   * **Local domain:** `http://oderinde-cms.local` (or `https://oderinde-cms.local`)
3. Click **Trust** next to the SSL certificate in Local to trust local HTTPS.
4. Click **Start Site** and open **WP Admin**.

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
4. **Outbound Mail Safety:**
   * LocalWP includes built-in Mailpit (`lightning-services/mailpit`) to catch all outgoing email.
   * Verify all emails appear in Local's "Tools $\rightarrow$ Mailpit" tab rather than sending live emails.

---

## 4. Connecting `apps/web` to Local CMS & Verification

Update `apps/web/.env.local`:
```bash
WP_API_ORIGIN=https://oderinde-cms.local
# or http://localhost:8080 depending on your local web server port
```

Verify runtime endpoint:
```powershell
curl -I -k https://oderinde-cms.local/wp-json/wp/v2/pages
```
Expected response: `HTTP/1.1 200 OK` with JSON array containing the 7 published pages.
