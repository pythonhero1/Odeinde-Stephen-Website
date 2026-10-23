# CMS Contracts: Verified Specifications and Runtime Status

Status: IMPLEMENTED AND VERIFIED (Phase 02).
Updated: 2026-10-23. All native and custom interfaces implemented in `wordpress/plugins/oderinde-headless/`, typed with Zod in `apps/web/src/lib/cms/schema.ts`, and verified against the local WordPress clone.

---

## 1. Native WordPress Endpoints (Verified)

| Method/Path | Description | Authentication | Runtime Status |
| :--- | :--- | :--- | :--- |
| `GET /wp-json/wp/v2/pages` | Public published pages. | Public | Verified: 6 published pages (`home`, `case-studies`, `contact`, `pricing`, `business-website-solutions`, `business-website-development`). |
| `GET /wp-json/wp/v2/posts` | Public blog posts. | Public | Verified: 1 published post (ID 237). |
| `GET /wp-json/wp/v2/case-study` | Public case studies with ACF payload. | Public | Verified: 6 published case studies seeded with full ACF postmeta (`business_focus`, `system_delivered`, `verified_outcome`, `technology_1-3`, `color`). |
| `GET /wp-json/wp/v2/media` | Media attachments and image metadata. | Public | Verified: 101 registered media items. |

---

## 2. Custom Project Endpoints (Plugin: `oderinde-headless`)

### A. `GET /wp-json/os/v1/site`
- **Purpose:** Public allowlist of site settings, navigation, branding, and Cal.com booking link.
- **Permission:** Public (`__return_true`).
- **Security:** Strict allowlist only. Never returns internal database options, SMTP credentials, or secrets.
- **Response Schema:**
  ```json
  {
    "siteName": "Oderinde Stephen",
    "siteTagline": "Website Development & Digital Solutions",
    "bookingUrl": "https://cal.com/oderinde/free",
    "contactEmail": "Contact@oderindestephen.com",
    "currency": "GBP",
    "portalUrl": "https://portal.oderindestephen.com/",
    "socialLinks": {
      "linkedin": "https://www.linkedin.com/in/pythonhero/",
      "clutch": "https://clutch.co/profile/oderinde-stephen",
      "trustpilot": "https://www.trustpilot.com/review/oderindestephen.com",
      "googleBusiness": "https://share.google/vDGgZ0FrAHvVTa31h"
    },
    "navigation": [
      { "label": "Solutions", "path": "/business-website-solutions", "isExternal": false, "isCta": false },
      { "label": "Development", "path": "/business-website-development", "isExternal": false, "isCta": false },
      { "label": "Case Studies", "path": "/case-studies", "isExternal": false, "isCta": false },
      { "label": "Pricing", "path": "/pricing", "isExternal": false, "isCta": false },
      { "label": "Contact", "path": "/contact", "isExternal": false, "isCta": false },
      { "label": "Book Call", "path": "https://cal.com/oderinde/free", "isExternal": true, "isCta": true }
    ],
    "footer": {
      "copyright": "© 2026 Oderinde Stephen. All rights reserved.",
      "legalLinks": [
        { "label": "Privacy Policy", "path": "/privacy-policy" },
        { "label": "Terms of Service", "path": "/terms" }
      ]
    }
  }
  ```

---

### B. `GET /wp-json/os/v1/resolve?path=...`
- **Purpose:** Full path resolver mapping public URLs to content IDs, types, and templates.
- **Permission:** Public (`__return_true`).
- **Security / Draft Isolation:** Only returns data if `post_status === 'publish'`. Drafts, trashed posts, and unknown routes strictly return `404 Not Found`.
- **Sample Verified Responses:**
  - `path=/` $\rightarrow$ `{ id: 14, slug: "home", type: "page", template: "home", status: "publish" }`
  - `path=/case-study/born-accelerators-case-study-website` $\rightarrow$ `{ id: 96087, slug: "born-accelerators-case-study-website", type: "case-study", template: "single-case-study", status: "publish" }`
  - `path=/missing-route` $\rightarrow$ `404 Not Found` (`{"code":"not_found","message":"Content not found or not published"}`)

---

### C. `POST /wp-json/os/v1/enquiries`
- **Purpose:** Authenticated client enquiry intake from Next.js backend relay.
- **Authentication:** HMAC-SHA256 over `${timestamp}.${raw_body}` using `OS_CMS_BRIDGE_SECRET`.
  - Required headers: `X-OS-Signature` (hex) and `X-OS-Timestamp` (epoch seconds).
  - Replay window: $\pm 300$ seconds (5 minutes). Rejects expired timestamps with 401.
- **Rate Limiting:** Max 10 requests / minute per IP via transients.
- **Idempotency:** Stable `submissionKey` check prevents duplicate post creation and duplicate emails.
- **Persistence:** Stored in non-public, capability-restricted `enquiry` CPT with status `'private'`.
- **Notification:** Dispatches `wp_mail` to `Contact@oderindestephen.com` with visitor's email set as `Reply-To`.
- **Response:** HTTP 201 Created:
  ```json
  {
    "success": true,
    "enquiryId": 96418,
    "submissionKey": "test-sub-12345",
    "message": "Enquiry safely persisted and notification dispatched."
  }
  ```

---

## 3. Frontend Next.js API Routes (`apps/web/src/app/api/`)

### A. `POST /api/enquiry`
- Public endpoint for contact form submissions.
- Validates payload with `EnquiryInputSchema`.
- Silent acceptance of bot submissions if `honeypot` is populated.
- Relays signed request to `/wp-json/os/v1/enquiries`.

### B. `GET /api/preview` & `GET /api/preview-exit`
- `GET /api/preview?id=...&type=...&slug=...&token=...&expires=...`: Validates HMAC token, verifies expiration, enables Next.js `draftMode()`, redirects to internal content route.
- `GET /api/preview-exit`: Disables `draftMode()` and restores public ISR cache rendering.

### C. `POST /api/revalidate`
- Webhook receiver for WordPress content publish events.
- Verifies HMAC signature using `REVALIDATION_SECRET` and timestamp replay window.
- Calls Next.js `revalidateTag()` and `revalidatePath()`.
