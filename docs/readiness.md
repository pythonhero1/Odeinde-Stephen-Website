# Discovery and Readiness Snapshot

Prepared 22 October 2026. Status: DISCOVERY COMPLETE (Phase 00).
Updated with evidence from eight Divi page exports, the full WordPress WXR XML export (`reference/wordpress/oderindestephen.WordPress.2026-10-22.xml`), and Stephen's confirmed architectural decisions.

---

## 1. Status Categories: Verified Facts, Confirmed Decisions, and Unverified Live Conditions

### A. Verified Facts (from Inspected Code and Exports)
* **Local Runtimes:** Node.js `v24.20.0`, npm `v11.19.0` (invoked as `npm.cmd` on Windows), Git `v2.56.0.windows.2`, Python `v3.12.7`.
* **Workflow Integrity:** Passed 211 checks in `tools/check-kit.mjs` and 7 checks in `tools/check-memory.py`.
* **Parsed Divi Pages:** 8 layouts parsed (2,469 blocks, 123 button modules, 78 unique deduplicated image assets totaling 10.82 MB).
* **Recovered Shared Booking Destination:** `https://cal.com/oderinde/free` verified across multiple exports (Home, Business Solutions, Business Development, Pricing, Contact).
* **WordPress Content Inventory (from WXR XML Export):**
  * **Pages (7 active, 2 trashed):**
    * Home (`/` - ID 14)
    * Business Website Solutions (`/business-website-solutions/` - ID 96112)
    * Business Website Development (`/business-website-development/` - ID 96116)
    * Case Studies (`/case-studies/` - ID 96083)
    * Pricing (`/pricing/` - ID 96380)
    * Contact (`/contact/` - ID 96339)
    * E-commerce Development (draft - no public slug)
  * **Custom Post Type `case-study` (6 published records):**
    1. `born-accelerators-case-study-website` (BORN Accelerators)
    2. `agentur-ostwest-turning-an-outdated-agency-site-into-a-clean-bilingual-portfolio` (Agentur Ostwest)
    3. `bau-helden-website-redesign-case-study` (Bau Helden)
    4. `einbruchschutz-baumgaertner-modernizing-website-redesign-case-study` (Einbruchschutz Baumgaertner)
    5. `samuel-edmond-stone-landing-page` (Doug Steinman / Samuel Edmond Stone)
    6. `pipe-patch-pro-amazon-listing-website` (Pipe Patch Pro, ID 96182)
  * **Blog Post (1 published record):**
    * `why-wordpress-is-still-a-game-changer-for-small-businesses-in-2026`
  * **Theme Builder Layouts (Global Header & Footer):**
    * Header Layout: `Default Website Template Header Layout` (ID 96084)
    * Footer Layout: `Default Website Template Footer Layout` (ID 96086)
  * **ACF Schema Groups:**
    * `Case Study fields` (`group_6a7f3d410d6c4`): Business Focus, System Delivered, Verified Outcome, Technology 1, Technology 2, Technology 3, Card Accent Color.
    * `Blog Article Data` (`group_6a83a52b7ff14`): Article Type, Experience Basis, Last Reviewed, Reading Time, Related Service Title, Related Service Description, Related Service URL, Review Status.
  * **Media Attachments:** 101 registered WordPress attachment items.

### B. Confirmed Decisions (by Stephen)
* **Frontend Hosting:** Cloudflare (Cloudflare Pages/Workers) instead of Vercel Pro ([D-7](file:///c:/Users/Pythonhero/Desktop/Oderinde%20Stephen%20Headless%20Website/memory/decisions.md#L47-L52)).
* **Currency Policy:** Standardized to GBP (£) across both Pricing and Contact form budget options ([D-8](file:///c:/Users/Pythonhero/Desktop/Oderinde%20Stephen%20Headless%20Website/memory/decisions.md#L54-L59)).
* **Content Reference Baseline:** WordPress WXR XML export integrated into `reference/wordpress/` ([D-9](file:///c:/Users/Pythonhero/Desktop/Oderinde%20Stephen%20Headless%20Website/memory/decisions.md#L61-L66)).
* **CMS Editorial Ownership:** WordPress remains editorial source; ACF Pro flexible sections for pages, native blocks for blog ([D-1](file:///c:/Users/Pythonhero/Desktop/Oderinde%20Stephen%20Headless%20Website/memory/decisions.md#L5-L10), [D-3](file:///c:/Users/Pythonhero/Desktop/Oderinde%20Stephen%20Headless%20Website/memory/decisions.md#L19-L24)).

### C. Unverified Live Conditions (Require Runtime Verification)
* **Spantrix CMS Host Details:** Free disk space, PHP version/limits, database backup/restore access, and SSL support on the proposed CMS subdomain (e.g. `cms.oderindestephen.com`).
* **Cloudflare DNS Export:** Current active DNS records for mail (MX, SPF, DKIM, DMARC) and external portal routing.
* **Cal.com Event Availability:** Confirmation that `https://cal.com/oderinde/free` opens an active booking calendar.
* **Contact Email Inbox Delivery:** Confirmation that `Contact@oderindestephen.com` delivers reliably to Stephen's monitored inbox.
* **Live SEO Baseline:** Live crawl / Rank Math REST API verification once staging/subdomain access is established.

---

## 2. Complete URL, Page, Feature, and CTA Inventory

| Public URL Path | Content Type / Source | Key Sections & Features | Primary CTAs & Destinations |
| --- | --- | --- | --- |
| `/` | Page (Home, ID 14) | Dark hero, Trust bar, Services overview, Case Studies grid, Interactive Portal illustration, Testimonials, FAQ | "Book Strategy Call" $\rightarrow$ Cal.com; "Explore My Work" $\rightarrow$ `/case-studies/`; "Get in Touch" $\rightarrow$ `/contact/` |
| `/business-website-solutions/` | Page (ID 96112) | Solution architecture, Pain vs. Solution, Process breakdown, Deliverables | "Book a Consultation" $\rightarrow$ Cal.com; "View Case Studies" $\rightarrow$ `/case-studies/` |
| `/business-website-development/` | Page (ID 96116) | Tech stack breakdown (WordPress, Next.js, Headless), Performance comparison, Deliverables | "Book a Technical Call" $\rightarrow$ Cal.com; "Explore Pricing" $\rightarrow$ `/pricing/` |
| `/case-studies/` | Page (ID 96083) + `case-study` archive | Filterable/categorized grid of 6 client projects with ACF metrics (Outcome, Stack, Accent) | "View Case Study" $\rightarrow$ Individual `/case-study/:slug/`; "Start Your Project" $\rightarrow$ Cal.com |
| `/case-study/:slug/` | CPT `case-study` (6 records) | Problem statement, Delivered system, Verified business outcomes, Technology badges | "Book a Project Call" $\rightarrow$ Cal.com; "Back to Case Studies" $\rightarrow$ `/case-studies/` |
| `/pricing/` | Page (ID 96380) | 4 starting packages (£250, £400, £450, £700), Add-ons, FAQ | "Select Package / Enquire" $\rightarrow$ `/contact/`; "Book a Discovery Call" $\rightarrow$ Cal.com |
| `/contact/` | Page (ID 96339) | Replacement 7-field form (Name, Email, Service, Company, Website, Budget in GBP, Timeline, Message) | "Submit Enquiry" $\rightarrow$ `/api/enquiry`; "Book a Strategy Call" $\rightarrow$ Cal.com |
| `/insights/` (or `/blog/`) | Post archive | Blog listing with ACF metadata (reading time, related service) | "Read Article" $\rightarrow$ Individual `/insights/:slug/` |
| `/insights/:slug/` | Single `post` (1 record) | Long-form article with native blocks, author attribution, related service CTA | "Book Strategy Call" $\rightarrow$ Cal.com |

---

## 3. Resolution Matrix for Missing Items and Dependencies

| Item / Route | Discovery Finding | Resolution |
| --- | --- | --- |
| **Global Header & Footer** | Missing from isolated page exports. | **RESOLVED:** Recovered in full from WXR XML (IDs 96084 & 96086). Porting to responsive React Server Components. |
| **Case Studies CPT & Slugs** | Ambiguity in exports over whether Pipe Patch Pro was a page or CPT. | **RESOLVED:** Verified as CPT `case-study` with 6 records and custom ACF fields in WXR XML. |
| **Pricing Currency Conflict** | Pricing had GBP (£); Contact form had USD ($). | **RESOLVED (D-8):** Standardized to GBP (£) across all pricing tiers and contact budget dropdowns. |
| **Blog & Insights Content** | Unverified whether blog existed. | **RESOLVED:** 1 published article found in XML with dedicated ACF metadata schema (`group_6a83a52b7ff14`). |
| **Legal Pages (Privacy / Terms)** | Neither found in Divi exports nor in WordPress XML. | **ACTION NEEDED:** Stephen to provide existing legal text, or approve clean standard Privacy/Terms templates. |
| **Resource Asset (Free Checklist CTA)** | Checklist CTA referenced in Divi copy, but downloadable asset was not attached. | **ACTION NEEDED:** Stephen to provide the PDF asset file or confirm if CTA should route to Cal.com / Contact. |
| **Contact Form Inbox** | Divi label read "SET RECIPIENT IN BUILDER". | **ACTION NEEDED:** Confirm `Contact@oderindestephen.com` as the primary recipient inbox. |

---

## 4. Architecture & Hosting Review: Cloudflare Pages

Per Stephen's decision ([D-7](file:///c:/Users/Pythonhero/Desktop/Oderinde%20Stephen%20Headless%20Website/memory/decisions.md#L47-L52)), the frontend will be deployed to **Cloudflare** rather than Vercel Pro.

* **Frontend Engine:** Next.js (App Router) deployed via **Cloudflare Pages** (using `@cloudflare/next-on-pages` or OpenNext edge adapter).
* **Benefits:**
  * Zero separate monthly subscription fee on Cloudflare Free/Pro tiers (eliminating Vercel's $20/month charge).
  * Direct integration with Stephen's existing Cloudflare DNS zone.
  * Global edge CDN caching, Cloudflare Turnstile bot protection for contact forms, and DDoS mitigation included.
* **WordPress CMS Subdomain:**
  * WordPress remains hosted on Spantrix at `cms.oderindestephen.com` (proxied or DNS-only via Cloudflare).
  * REST API endpoints consumed server-side with ISR (Incremental Static Regeneration) / on-demand revalidation.
* **Email & Portal Records Preservation:**
  * When configuring Cloudflare Pages for `oderindestephen.com`, existing Cloudflare DNS records for email (MX, SPF, DKIM) and any external portal links will remain strictly untouched.

---

## 5. Consolidated Review: Remaining Owner Decisions

To conclude Phase 00 and authorize Phase 01 ([prompts/01-windows-repository.md](file:///c:/Users/Pythonhero/Desktop/Oderinde%20Stephen%20Headless%20Website/prompts/01-windows-repository.md)), the following three owner decisions remain:

1. **Contact Email Recipient:** Please confirm that `Contact@oderindestephen.com` is the correct inbox for contact form submissions.
2. **Legal Pages (Privacy & Terms):** Do you have existing Privacy Policy and Terms of Service copy on WordPress, or should standard professional templates be prepared for your review?
3. **Free Checklist CTA Asset:** Do you have the PDF file for the "Free Checklist / Guide" mentioned in the marketing copy, or should that CTA temporarily link to the strategy call / contact page until the asset is ready?
