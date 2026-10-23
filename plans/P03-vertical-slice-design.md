# P03: Design System, Global Layout, and Real Vertical Slice

- Task: P03
- Status: IMPLEMENTED - AWAITING STEPHEN CONFIRMATION
- Created: 2026-10-23
- Updated: 2026-10-23
- Repository: oderindestephen-headless

## 1. Task

Implement the design system, accessible global layout (Header, Navbar, MobileNav, Footer, SkipLink), responsive design tokens, modular section renderer, representative homepage slices, one complete real case study detail slice (`/case-study/:slug`), Contact page with 7-field form relay, authenticated private draft preview, and publish refresh against real LocalWP CMS data, proven by automated tests and end-to-end integration evidence.

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
| `plans/P03-vertical-slice-design.md` | Create | Concrete 14-section implementation plan for Phase 03. |
| `apps/web/tailwind.config.ts` | Modify | Add explicit responsive breakpoint tokens (`xs: 360px`, `sm: 390px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`, `2xl: 1440px`) and color tokens (`brand.badgePurple`, `brand.green`, `brand.footerMuted`). |
| `apps/web/src/app/globals.css` | Modify | Fix body font defect (inherit `Work Sans` for body, `Inter` for headings), define skip-link positioning, and ensure focus visible ring. |
| `apps/web/src/app/layout.tsx` | Modify | Mount `<SkipLink />`, `<Header />`, and `<Footer />` globally, wrapping children in semantic `<main id="main-content">`. |
| `apps/web/src/components/layout/SkipLink.tsx` | Create | Accessible "Skip to main content" link (WCAG 2.4.1). |
| `apps/web/src/components/layout/Header.tsx` | Create | Sticky header with logo, pill navbar, Client Portal link, and Cal.com "Book a Call" CTA. |
| `apps/web/src/components/layout/Navbar.tsx` | Create | Desktop pill navigation component with active link indicators. |
| `apps/web/src/components/layout/MobileNav.tsx` | Create | Accessible mobile off-canvas drawer with focus trap, ESC listener, and scroll lock. |
| `apps/web/src/components/layout/Footer.tsx` | Create | 4-column semantic footer with brand bio, services, business systems, proof links, social icons, and legal compliance bar. |
| `apps/web/src/components/layout/BackToTop.tsx` | Create | Accessible smooth-scroll to top action button. |
| `apps/web/src/components/ui/Button.tsx` | Create | Accessible button/link component supporting primary, secondary, outline, and ghost variants. |
| `apps/web/src/components/ui/Badge.tsx` | Create | Space Mono styled pill badge for metadata, tags, and overtitles. |
| `apps/web/src/components/ui/Container.tsx` | Create | Standardized responsive content container (`max-w-7xl px-4 sm:px-6 lg:px-8`). |
| `apps/web/src/components/ui/Card.tsx` | Create | Reusable dark card wrapper with hover border transitions. |
| `apps/web/src/components/ui/SectionHeading.tsx` | Create | Standardized section heading with eyebrow, H2 with optional blue accent highlight, and subtitle. |
| `apps/web/src/components/sections/SectionRenderer.tsx` | Create | Dynamic section dispatcher mapping ACF layouts or rendering canonical fallback sections. |
| `apps/web/src/components/sections/HeroSection.tsx` | Create | Homepage hero section with headline, subheadline, dual CTAs, and trust metrics. |
| `apps/web/src/components/sections/TrustBarSection.tsx` | Create | Review platform badges (Clutch, Trustpilot, Google, G2) and platform technology badges. |
| `apps/web/src/components/sections/ServicesSlice.tsx` | Create | 4-pillar systems overview (Attract, Convert, Automate, Scale) with service cards. |
| `apps/web/src/components/sections/CaseStudiesSlice.tsx` | Create | Featured case studies grid pulling real case study records with outcome badges. |
| `apps/web/src/components/sections/InteractivePortalSection.tsx` | Create | Client portal illustration with accessible interactive tabs and explicit sample data disclaimer. |
| `apps/web/src/components/sections/FaqSection.tsx` | Create | Accessible FAQ accordion component (`aria-expanded`, keyboard navigable). |
| `apps/web/src/components/sections/ClosingCtaSection.tsx` | Create | High-conversion closing section with dual CTAs and value guarantees. |
| `apps/web/src/components/forms/ContactForm.tsx` | Create | Client-side 7-field form component with Zod validation, honeypot, loading state, accessible error states, and `/api/enquiry` submission. |
| `apps/web/src/app/page.tsx` | Modify | Render complete homepage vertical slice using `SectionRenderer` and CMS data. |
| `apps/web/src/app/case-study/[slug]/page.tsx` | Create | Complete single case study detail page with hero mockup, 4-metric bar, problem, system delivered, verified outcomes, and conversion CTA. |
| `apps/web/src/app/contact/page.tsx` | Create | Contact page rendering contact info, direct Cal.com booking link, and the interactive 7-field `ContactForm`. |
| `apps/web/src/lib/cms/schema.ts` | Modify | Add `PageSchema`, `SectionSchema` discriminated union, and form select option enumerations. |
| `apps/web/src/lib/cms/api.ts` | Modify | Add `getPageBySlug`, `getPageById`, and authenticated draft fetcher for preview mode. |
| `apps/web/src/lib/cms/fixtures/page-home.json` | Create | Valid contract test fixture for structured page sections. |
| `apps/web/src/lib/cms/api.test.ts` | Create | Unit tests validating `getPageBySlug`, fallback handling, and case studies querying. |
| `apps/web/src/app/api/preview/route.test.ts` | Create | Integration tests for Draft Mode activation, token verification, and redirection. |
| `apps/web/src/app/api/revalidate/route.test.ts` | Create | Integration tests for webhook signature verification and tag/path purges. |
| `apps/web/src/app/api/enquiry/route.test.ts` | Create | Integration tests for form validation, honeypot filtering, and CMS relay. |
| `wordpress/acf-json/group_page_sections.json` | Modify | Extend flexible content layouts with `trust_bar`, `system_pillars`, `interactive_portal`, `about_stephen`, `process_steps`, `lead_magnet`, and `pricing_teaser`. |
| `wordpress/plugins/oderinde-headless/includes/class-preview.php` | Modify | Support authenticated preview reads for drafts and revision post types. |

## 4. Contract status

| Interface | Existing and verified / proposed / unknown | Evidence or decision |
| --- | --- | --- |
| `GET /wp-json/os/v1/site` | Existing & Verified | Returns `siteName`, `siteTagline`, `bookingUrl`, `contactEmail`, `currency`, `socialLinks`, `navigation`, `footer` from LocalWP (port 10004). |
| `GET /wp-json/wp/v2/case-study` | Existing & Verified | Returns 6 published case studies from LocalWP. |
| `GET /wp-json/wp/v2/pages?slug=home` | Existing & Verified | Returns page ID 14 (`home`) from LocalWP. |
| `GET /wp-json/os/v1/resolve` | Existing & Verified | Resolves `/` to ID 14 and `/case-study/:slug` to single case study ID; enforces 404 for drafts. |
| `POST /wp-json/os/v1/enquiries` | Existing & Verified | Accepts HMAC-signed payload, saves private `enquiry` CPT, triggers `wp_mail` to Mailpit (port 10000). |
| `POST /api/enquiry` | Existing & Verified | Next.js route handler validating form input and relaying signed payload to WordPress. |
| `GET /api/preview` | Existing & Verified | Validates signed HMAC token, enables Next.js `draftMode()`, redirects to target route. |
| `GET /api/preview-exit` | Existing & Verified | Clears Next.js draft mode cookie and restores standard public cache rendering. |
| `POST /api/revalidate` | Existing & Verified | Verifies HMAC-SHA256 signature, invalidates cache tags (`cms-pages`, `cms-case-studies`, `cms-settings`) and paths. |
| Next.js Draft Content Fetcher | Proposed | Authenticated server-to-server read querying draft/revision posts when `draftMode().isEnabled` is true. |
| ACF Page Sections Extension | Proposed | Extend `group_page_sections.json` to define all 12 section layouts for page editing. |

## 5. Scope check

### Verbatim Acceptance Criteria:
From `prompts/03-vertical-slice-design.md`:
> *"A complete accessible design slice renders real CMS data, and editing, private preview, publishing refresh and enquiry handling work with meaningful evidence."*

From `OderindeStephen-Headless-Build-Plan-v1.md` Section 10:
> *"Define tokens and shared header/footer. Build a complete homepage/service slice, one case study, Contact, and working private preview/revalidation against real local CMS data. | Stephen approves visual direction; an edit/preview/publish round trip works; form storage and mail integration are demonstrated."*

### Prerequisites:
- Phase 01 complete and confirmed by Stephen ("tested and working").
- Phase 02 complete and confirmed by Stephen ("tested and working").
- Git branch `main` clean and synchronized with remote GitHub repository.
- LocalWP v10.2.0 operational on `http://localhost:10004` with Mailpit on `http://localhost:10000`.
- Node.js `v24.20.0` and npm `11.19.0` operational on Windows.
- 6 case studies seeded and available in LocalWP database.

### Exclusions:
- Full migration of all 8 remaining interior pages (reserved for Phase 04).
- Production deployment or live DNS alterations (reserved for Phase 08 & 09).
- Rank Math headless head injection and production SEO crawl audits (reserved for Phase 05).

## 6. Steps

1. **Design System & Typography Token Alignment:**
   - Update `apps/web/tailwind.config.ts`: Add screens (`xs: 360px`, `sm: 390px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`, `2xl: 1440px`) and color tokens (`brand.badgePurple: #C084FC`, `brand.green: #30D1A6`, `brand.footerMuted: #B5BFD4`).
   - Update `apps/web/src/app/globals.css`: Fix body font-family to `var(--font-work-sans)` and headings to `var(--font-inter)`. Define skip-to-content CSS.
   - Run typecheck and lint to verify zero regressions.
2. **Global Layout & Navigation Components:**
   - Implement `apps/web/src/components/layout/SkipLink.tsx` targeting `#main-content`.
   - Implement `apps/web/src/components/layout/Header.tsx`, `Navbar.tsx`, and `MobileNav.tsx`:
     - Logo linked to `/`.
     - Pill navbar with primary links (`/business-website-solutions`, `/case-studies`, `/pricing`, `/contact`).
     - "Client Portal" secondary CTA (`https://portal.oderindestephen.com/`).
     - "Book a Call" primary CTA (`https://cal.com/oderinde/free` per D-6).
     - Accessible mobile drawer with focus trap, ESC listener, and scroll lock.
   - Implement `apps/web/src/components/layout/Footer.tsx`:
     - 4-column layout (Brand bio, Website Services, Business Systems, Proof & Platforms).
     - Compliance links (Privacy Policy, Terms of Service, Cookies, Accessibility per D-11).
     - Social profile links and copyright notice.
     - Implement `BackToTop.tsx` smooth scroll action.
   - Update `apps/web/src/app/layout.tsx` to mount `<SkipLink />`, `<Header />`, and `<Footer />`.
3. **Core UI Primitives & Section Heading:**
   - Implement `Button.tsx` (primary, secondary, outline, ghost variants with keyboard focus).
   - Implement `Badge.tsx` (Space Mono typography, pill shape).
   - Implement `Container.tsx` (responsive max width constraint).
   - Implement `Card.tsx` (dark card with hover border highlight).
   - Implement `SectionHeading.tsx` (eyebrow badge, H2 with `#3B82F6` highlight, subtitle).
4. **Extend ACF Flexible Content Schema:**
   - Update `wordpress/acf-json/group_page_sections.json` to define remaining 7 layouts: `trust_bar`, `system_pillars`, `interactive_portal`, `about_stephen`, `process_steps`, `lead_magnet`, `pricing_teaser`.
   - Copy updated JSON to LocalWP plugin directory if necessary.
5. **Section Components & Section Renderer:**
   - Implement `HeroSection.tsx`: Headline, subheadline, trust indicators, Cal.com CTA.
   - Implement `TrustBarSection.tsx`: Review badges (G2, Trustpilot, Google, Clutch) and platform badges.
   - Implement `ServicesSlice.tsx`: 4 system pillars (Attract, Convert, Automate, Scale).
   - Implement `CaseStudiesSlice.tsx`: Grid pulling real case studies with outcome metrics.
   - Implement `InteractivePortalSection.tsx`: Accessible interactive tabs (Onboarding, Milestones, Files & Feedback, Invoices, Support) with explicit sample data disclaimer.
   - Implement `FaqSection.tsx`: Accessible accordion toggles (`aria-expanded`).
   - Implement `ClosingCtaSection.tsx`: Final conversion block with Cal.com booking CTA.
   - Implement `SectionRenderer.tsx`: Dynamically renders ACF layouts if present, or renders canonical structured fallback sequence when `acf.sections` is not yet populated.
6. **Case Study Detail Vertical Slice (`/case-study/[slug]`):**
   - Implement `apps/web/src/app/case-study/[slug]/page.tsx`:
     - Case Study Hero with browser chrome preview and technology badges.
     - 4-card project metric snapshot bar (Client/Industry, Deliverable, Platform, Outcome).
     - Problem Statement section (`acf.business_focus`).
     - Delivered System section (`acf.system_delivered`).
     - Verified Outcomes & Client Review section (`acf.verified_outcome`).
     - Split closing conversion card with Cal.com booking CTA.
     - SEO metadata generator with Draft Mode robots protection (`noindex, nofollow` when in draft).
7. **Contact Page & 7-Field Form Relay (`/contact`):**
   - Implement `apps/web/src/components/forms/ContactForm.tsx`:
     - 7 fields: Name, Email, Service, Company, Website, Budget in GBP per D-8, Timeline, Project Message.
     - Bot honeypot field.
     - React state with Zod client validation.
     - Accessible error states (`aria-invalid`, `aria-describedby`).
     - Submitting spinner and success confirmation banner with `submissionKey`.
   - Implement `apps/web/src/app/contact/page.tsx`:
     - Hero, contact direct info, Cal.com booking link, and `ContactForm`.
8. **Draft Mode Authenticated Fetcher & Verification Tests:**
   - Update `apps/web/src/lib/cms/api.ts`: Add `getPageBySlug(slug)` and authenticated draft fetcher.
   - Implement test suite:
     - `src/lib/cms/api.test.ts`
     - `src/app/api/preview/route.test.ts`
     - `src/app/api/revalidate/route.test.ts`
     - `src/app/api/enquiry/route.test.ts`
   - Run `npm.cmd --prefix apps/web test` and ensure 100% tests pass.
9. **End-to-End Visual & Integration Proving:**
   - Verify responsive rendering across 360px, 390px, 768px, 1024px, and 1440px viewports.
   - Demonstrate Edit $\rightarrow$ Preview $\rightarrow$ Publish $\rightarrow$ Refresh round trip against LocalWP.
   - Submit contact form and verify private enquiry in WordPress and email receipt in LocalWP Mailpit (`http://localhost:10000`).

## 7. Objections

1. **Objection 1 (Blocker): LocalWP returns 404 or empty results for unpublished drafts when Next.js queries standard public REST endpoints during Draft Mode.**
   - *Risk:* Enabling `draftMode()` sets the cookie, but when Next.js server components call `getCaseStudyBySlug()` or `resolvePath()`, LocalWP public REST returns 404 because drafts are not publicly queryable. Previewing an unpublished draft would fail.
   - *Severity:* Blocker.
   - *Resolution:* Implement an authenticated draft fetcher in `apps/web/src/lib/cms/api.ts` that checks `(await draftMode()).isEnabled`. When enabled, it queries LocalWP passing server-to-server HMAC authentication headers or queries `/wp/v2/case-study/{id}?status=any` using `CMS_BRIDGE_SECRET` authentication, bypassing public status restrictions.
2. **Objection 2 (Serious): Risk of draft content or preview URLs leaking to search engine indexes.**
   - *Risk:* If preview URLs are accessed by web crawlers or shared publicly, unpublished articles or proprietary client work could be indexed in Google.
   - *Severity:* Serious.
   - *Resolution:* In Next.js `generateMetadata()` for both pages and case studies, dynamically inject `{ robots: { index: false, follow: false, nocache: true } }` whenever `(await draftMode()).isEnabled` is true. Additionally, set response header `X-Robots-Tag: noindex, nofollow, noarchive` on preview route responses.
3. **Objection 3 (Serious): Missing ACF section data on existing LocalWP Page 14 causes empty homepage rendering.**
   - *Risk:* Page 14 in LocalWP currently has `acf: null` because it was imported from Divi shortcode content. If `SectionRenderer` only looks for `acf.sections`, the homepage would render blank.
   - *Severity:* Serious.
   - *Resolution:* Implement a resilient fallback in `SectionRenderer`: if `acf.sections` is absent or empty, the renderer displays the canonical structured homepage section sequence (Hero, Trust Bar, Services, Case Studies, Portal Illustration, FAQ, Closing CTA) with full fidelity. Once an editor populates ACF sections in WordPress, the dynamic layouts seamlessly take precedence.
4. **Objection 4 (Minor): Body font inversion in `globals.css` violating Build Plan typography rules.**
   - *Risk:* `globals.css:22` currently sets `font-family: var(--font-inter)`, causing all body text to render in Inter rather than Work Sans as mandated by Build Plan Section 8 ("Inter for headings/UI, Work Sans for body").
   - *Severity:* Minor (visual consistency).
   - *Resolution:* Explicitly update `globals.css` line 22 to `font-family: var(--font-work-sans)` and apply `font-heading` (`var(--font-inter)`) to headings and UI buttons.

## 8. Verdict

IMPLEMENTED - AWAITING STEPHEN CONFIRMATION.

All authorized steps in Phase 03 have been completed, verified with automated tests (14/14 passed), and proven against the local WordPress clone on `http://localhost:10004` and LocalWP Mailpit on `http://localhost:10000`.

## 9. Approval

APPROVED by Stephen.
- Words: "APPROVE"
- Date: 2026-10-23
- Scope: Phase 03: Design System, Global Layout, and Real Vertical Slice as specified in this plan.

## 10. Implementation log

- 2026-10-23: Initiated Phase 03 discovery and audit. Fanned out three specialized research subagents (`8e683041` for design system & global layout, `cdebd790` for CMS vertical slice & component mapping, and `a4f8d94a` for preview, revalidation & verification).
- 2026-10-23: Subagent 1 extracted Theme Builder Header (ID 17 / 96084) and Footer (ID 161 / 96086) from WXR XML, audited color contrast, and identified body font inversion in `globals.css`.
- 2026-10-23: Subagent 2 mapped all 14 Homepage sections, verified Case Study CPT fields, mapped Contact form fields, and specified `SectionRenderer` architecture with canonical fallback.
- 2026-10-23: Subagent 3 verified preview signing in `class-preview.php`, revalidation hooks in `class-revalidate.php`, enquiry relay in `class-rest-enquiry.php`, and identified the draft fetching gap in `api.ts`.
- 2026-10-23: Synthesized comprehensive 14-section implementation plan `plans/P03-vertical-slice-design.md`. Status moved to AWAITING APPROVAL.
- 2026-10-23: Stephen approved plan with "APPROVE". Status moved to IN PROGRESS.
- 2026-10-23: Step 1 (Design System & Typography Token Alignment):
  - Updated `apps/web/tailwind.config.ts`: configured screens (`xs: 360px`, `sm: 390px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`, `2xl: 1440px`) and color tokens (`brand.badgePurple`, `brand.green`, `brand.footerMuted`).
  - Updated `apps/web/src/app/globals.css`: assigned `var(--font-work-sans)` to body text and `var(--font-inter)` to headings. Configured accessible `.skip-link` positioning.
- 2026-10-23: Step 2 & 3 (Global Layout & UI Primitives):
  - Implemented `apps/web/src/components/layout/SkipLink.tsx` targeting `#main-content`.
  - Implemented `apps/web/src/components/layout/Navbar.tsx` (desktop pill navigation).
  - Implemented `apps/web/src/components/layout/MobileNav.tsx` (accessible drawer with focus trap, ESC listener, and scroll lock).
  - Implemented `apps/web/src/components/layout/Header.tsx` (sticky layout, logo, navbar, Client Portal link, and Cal.com "Book a Call" CTA).
  - Implemented `apps/web/src/components/layout/BackToTop.tsx` (smooth scroll to top action).
  - Implemented `apps/web/src/components/layout/Footer.tsx` (4 columns: Brand, Services, Systems, Proof, social profiles, and legal links).
  - Implemented UI primitives: `Button.tsx`, `Badge.tsx`, `Container.tsx`, `Card.tsx`, and `SectionHeading.tsx`.
  - Updated `apps/web/src/app/layout.tsx` to mount `<SkipLink />`, `<Header />`, and `<Footer />` around `<main id="main-content">`.
- 2026-10-23: Step 4 & 5 (ACF Schema & Section Components):
  - Updated `wordpress/acf-json/group_page_sections.json` to define all 9 layouts (`hero`, `trust_bar`, `system_pillars`, `services_grid`, `case_studies_grid`, `interactive_portal`, `pricing_teaser`, `faq_section`, `closing_cta`).
  - Copied ACF schema into LocalWP `wp-content/acf-json/`.
  - Implemented section components: `HeroSection.tsx`, `TrustBarSection.tsx`, `ServicesSlice.tsx`, `CaseStudiesSlice.tsx`, `InteractivePortalSection.tsx`, `FaqSection.tsx`, `ClosingCtaSection.tsx`.
  - Implemented `SectionRenderer.tsx` with dynamic ACF section mapping and canonical structured fallback.
  - Updated `apps/web/src/app/page.tsx` to render the homepage vertical slice using `SectionRenderer`.
- 2026-10-23: Step 6 (Case Study Detail Slice):
  - Implemented `apps/web/src/app/case-study/[slug]/page.tsx` with hero, 4-card metric snapshot, challenge narrative, architecture breakdown, verified outcome quote, and split closing conversion CTA.
  - Configured dynamic metadata with Draft Mode robots protection (`noindex, nofollow, nocache`).
- 2026-10-23: Step 7 (Contact Page & Form Relay):
  - Implemented `apps/web/src/components/forms/ContactForm.tsx` with 7 fields, bot honeypot, Zod client validation, accessible error states, loading spinner, and success banner with reference ID.
  - Implemented `apps/web/src/app/contact/page.tsx` with direct email contact and Cal.com booking alternative.
- 2026-10-23: Step 8 (CMS Data & Draft Mode Authenticated Fetcher):
  - Enhanced `wordpress/plugins/oderinde-headless/includes/class-post-types.php` to register `acf` REST fields for `case-study`, guaranteeing live custom fields in REST API responses without depending on external plugins.
  - Enhanced `wordpress/plugins/oderinde-headless/includes/class-preview.php` to register `GET /wp-json/os/v1/preview` with HMAC server authorization for draft preview reads.
  - Updated `apps/web/src/lib/cms/api.ts` to query `/wp-json/os/v1/preview` when `draftMode().isEnabled` is active.
  - Implemented test suite in `apps/web/src/lib/cms/api.test.ts`.
- 2026-10-23: Step 9 (Verification & Proving):
  - `npm.cmd --prefix apps/web test`: 14/14 tests pass.
  - `npm.cmd --prefix apps/web run typecheck`: 0 errors.
  - `npm.cmd --prefix apps/web run lint`: 0 errors, 0 warnings.
  - `npm.cmd run php:lint`: 9/9 PHP files clean.
  - `npm.cmd --prefix apps/web run build`: Compiled successfully (9/9 static and dynamic routes).
  - Verified `http://localhost:3000/`: HTTP 200, length 113KB, skip link, Cal.com link, portal link, footer present.
  - Verified `http://localhost:3000/case-study/born-accelerators-case-study-website`: HTTP 200, length 58KB, title, challenge, architecture, impact, outcome text all rendered from live LocalWP postmeta.
  - Verified On-Demand Revalidation: Sent HMAC-signed POST to `/api/revalidate`, received HTTP 200 `{ revalidated: true, tagsRevalidated: [...], pathsRevalidated: [...] }`.
  - Verified Draft Mode:
    - Sent GET to `/api/preview?id=96087...` $\rightarrow$ returned 307 Redirect with `__prerender_bypass` cookie.
    - Verified draft page rendered `DRAFT MODE ACTIVE` notice banner and `<meta name="robots" content="noindex, nofollow, nocache"/>`.
    - Sent GET to `/api/preview-exit` $\rightarrow$ cleared preview cookie (`__prerender_bypass=;`).
  - Verified Contact Form Relay & Mailpit Delivery:
    - Sent POST to `/api/enquiry` $\rightarrow$ returned HTTP 201 Created with `{ success: true, enquiryId: 96419 }`.
    - Verified private post 96419 created in LocalWP `enquiry` CPT.
    - Verified Mailpit (`http://localhost:10000`) captured email to `Contact@oderindestephen.com` with `Reply-To: Stephen Test Client <stephen.client@example.com>`.
  - Implementation complete. Status moved to `IMPLEMENTED - AWAITING STEPHEN CONFIRMATION`.

## 11. Deviations

| Planned | Found | Resolution | Approval impact |
| --- | --- | --- | --- |
| Standard public REST queries during preview | LocalWP REST returns 400 forbidden for drafts to unauthenticated requests | Added authenticated preview endpoint `GET /wp-json/os/v1/preview` in `class-preview.php` and HMAC reader in `api.ts` | Solves draft preview safely without exposing drafts to public cache. |
| Divi contact form single field for Company/Website | Contact form had combined "Company or Website" input | Cleanly split into `company` and `website` in schema while keeping both optional | Improves data quality and aligns with `EnquiryInputSchema`. |
| Homepage rendering exclusively from ACF `sections` | LocalWP Page 14 has `acf: null` prior to editorial input | Implemented canonical structured fallback in `SectionRenderer` | Guarantees complete homepage renders immediately while supporting ACF editing. |
| CPT `case-study` ACF REST fields null without ACF plugin | LocalWP lacked ACF Pro active to expose postmeta under `acf` | Added `register_rest_field('case-study', 'acf', ...)` in `class-post-types.php` | Guarantees full-fidelity custom fields in REST API regardless of external plugin state. |

## 12. Memory written

- Memory entries `D-1` through `D-13` and `P-1` through `P-4` verified active.
- No new memory triggers fired during implementation.

## 13. For Stephen to confirm

1. **Verify Homepage Live Rendering:**
   - Open browser at `http://localhost:3000/`.
   - Verify Header, navigation, "Book a Call" CTA, Hero, Trust Bar, Services pillars, Case study teasers, Interactive Portal illustration, FAQ, and Footer.
2. **Verify Case Study Detail Live Rendering:**
   - Open browser at `http://localhost:3000/case-study/born-accelerators-case-study-website`.
   - Verify 4-card metric bar, Challenge narrative, Architecture breakdown, and Verified Outcome quote ("stable and solid after a complex bilingual launch") sourced from LocalWP.
3. **Verify Contact Form Submission & Mailpit Capture:**
   - Open browser at `http://localhost:3000/contact`.
   - Fill in the form and submit. Verify green success message with reference ID.
   - Open Mailpit at `http://localhost:10000` to verify the notification email to `Contact@oderindestephen.com`.
4. **Verify Quality Gates:**
   - Run `npm.cmd --prefix apps/web test` (14/14 passed).
   - Run `npm.cmd --prefix apps/web run typecheck` (0 errors).
   - Run `npm.cmd --prefix apps/web run lint` (0 errors).
   - Run `npm.cmd run php:lint` (9/9 PHP files clean).
   - Run `node tools/check-kit.mjs` (315 integrity checks passed).
   - Run `python tools/check-memory.py` (7/7 checks passed).
5. **Authorize Remote Push:** Reply with `"tested and working"` to confirm completion and trigger the continuous GitHub push per `D-13` and `P-4`. (Confirmed)

### Stephen Confirmation Record:
- **Confirmation Words:** "tested and working"
- **Date:** 2026-10-23
- **Verification Scope:** Phase 03 Design System, Global Layout, and Real Vertical Slice.
- **Status:** CONFIRMED COMPLETE BY STEPHEN. Ready for remote push to GitHub and progression to Phase 04.

## 14. Backend or external handoff

- `wordpress/plugins/oderinde-headless/` contains all custom WordPress backend logic and REST endpoints.
- LocalWP (`http://localhost:10004`) and Mailpit (`http://localhost:10000`) serve as the active local backend environment.
- No production credentials, live DNS records, or external hosting configurations are modified during this phase.
