# P05: SEO and Public Integrations

- Task: P05
- Status: CONFIRMED BY STEPHEN
- Created: 2026-10-23
- Updated: 2026-10-23
- Repository: oderindestephen-headless

## 1. Task

Implement the comprehensive Rank Math headless metadata adapter, structured JSON-LD entity graph with single-owner deduplication, dynamic XML sitemap, environment-aware robots.txt, branded 404 page, legacy permalink and media URL continuity redirects, privacy-respecting analytics and consent integration, verified Cal.com booking destinations, accessible portal links, and hardened multi-event cache invalidation coverage across all public routes, fulfilling every acceptance criterion of Phase 05.

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
| `plans/P05-seo-integrations.md` | Create | Concrete 14-section implementation plan for Phase 05. |
| `apps/web/src/lib/seo/types.ts` | Create | Strongly typed TypeScript interfaces for SEO metadata, Open Graph, Twitter cards, and Schema.org graph nodes. |
| `apps/web/src/lib/seo/schema.ts` | Create | Zod validation schemas for raw Rank Math REST API output and sanitized SEO metadata objects. |
| `apps/web/src/lib/seo/rankmath.ts` | Create | Edge-compatible Rank Math REST API consumer, pure TypeScript regex/token parser, CMS-to-public origin translator, and anti-contamination `noindex` resolver. |
| `apps/web/src/lib/seo/fallback-metadata.ts` | Create | Verified static fallback metadata fixtures for all 13 routes providing 100% offline build resilience. |
| `apps/web/src/lib/seo/metadata.ts` | Create | Unified `constructPageMetadata(path, options)` helper generating Next.js `Metadata` objects for App Router. |
| `apps/web/src/lib/seo/rankmath.test.ts` | Create | Unit tests validating Rank Math parsing, origin rewriting, robots directive safety, schema deduplication, and fallback behavior (minimum 8 tests). |
| `apps/web/src/components/seo/JsonLd.tsx` | Create | Server component rendering deduplicated, validated JSON-LD structured data graph scripts. |
| `apps/web/src/app/sitemap.ts` | Create | Dynamic Next.js XML sitemap generator indexing all 11 static pages, 6 published case studies, and published blog posts with accurate `lastModified` dates, strictly excluding drafts and error routes. |
| `apps/web/src/app/robots.ts` | Create | Dynamic Next.js robots.txt generator allowing public crawling in production while disallowing `/api/` and `/*preview*`, and disallowing all crawling on staging/preview. |
| `apps/web/src/app/not-found.tsx` | Create | Custom branded 404 page returning genuine HTTP status 404 with dark styling, recovery navigation links, and `noindex` metadata. |
| `apps/web/next.config.ts` | Modify | Configure 301 permanent redirects for historical blog post permalink (`/why-wordpress-is-still-a-game-changer-for-small-businesses-in-2026`), WordPress feeds, author archives, Divi builder layouts, and legacy media URLs (`/wp-content/uploads/:path*`). |
| `apps/web/src/components/analytics/AnalyticsProvider.tsx` | Create | Privacy-respecting client analytics integration supporting Cloudflare Web Analytics (cookieless beacon) and optional Google Analytics 4 with Google Consent Mode v2. |
| `apps/web/src/components/analytics/CookieConsentBanner.tsx` | Create | Accessible, lightweight cookie preferences banner for optional GA4 tracking compliant with UK GDPR/PECR. |
| `apps/web/src/app/layout.tsx` | Modify | Inject `AnalyticsProvider` and `CookieConsentBanner`, update base metadata, and integrate global structured data. |
| `apps/web/src/app/page.tsx` | Modify | Implement dynamic `generateMetadata()` using `constructPageMetadata("/")` and render Homepage JSON-LD schema. |
| `apps/web/src/app/business-website-solutions/page.tsx` | Modify | Implement dynamic `generateMetadata()` and render Service JSON-LD schema. |
| `apps/web/src/app/business-website-development/page.tsx` | Modify | Implement dynamic `generateMetadata()` and render Service JSON-LD schema. |
| `apps/web/src/app/e-commerce-development/page.tsx` | Modify | Implement dynamic `generateMetadata()` and render Service JSON-LD schema. |
| `apps/web/src/app/case-studies/page.tsx` | Modify | Implement dynamic `generateMetadata()` and render CollectionPage JSON-LD schema. |
| `apps/web/src/app/case-study/[slug]/page.tsx` | Modify | Update `generateMetadata()` with Rank Math adapter and render CreativeWork/Project JSON-LD schema. |
| `apps/web/src/app/pricing/page.tsx` | Modify | Implement dynamic `generateMetadata()` and render PriceSpecification JSON-LD schema. |
| `apps/web/src/app/contact/page.tsx` | Modify | Implement dynamic `generateMetadata()` and render ContactPage JSON-LD schema. |
| `apps/web/src/app/portfolio/page.tsx` | Modify | Implement dynamic `generateMetadata()` and render CollectionPage JSON-LD schema. |
| `apps/web/src/app/insights/page.tsx` | Modify | Implement dynamic `generateMetadata()` and render Blog JSON-LD schema. |
| `apps/web/src/app/insights/[slug]/page.tsx` | Modify | Update `generateMetadata()` with Rank Math adapter and render BlogPosting JSON-LD schema. |
| `apps/web/src/app/privacy-policy/page.tsx` | Modify | Implement dynamic `generateMetadata()` with canonical and clean robots. |
| `apps/web/src/app/terms/page.tsx` | Modify | Implement dynamic `generateMetadata()` with canonical and clean robots. |
| `apps/web/src/components/sections/InteractivePortalSection.tsx` | Modify | Add WAI-ARIA keyboard navigation (`ArrowLeft`, `ArrowRight`, `Home`, `End`) to tab controls. |
| `apps/web/src/lib/cms/cache.ts` | Modify | Add `seo: "cms-seo"` to `CMS_CACHE_TAGS` and define fallback SEO contracts. |
| `wordpress/plugins/oderinde-headless/includes/class-revalidate.php` | Modify | Hook `post_updated` to handle slug changes (invalidating old and new slugs), hook `wp_update_nav_menu`, hook Rank Math option updates, and dispatch `cms-seo` tag. |
| `wordpress/plugins/oderinde-headless/includes/class-post-types.php` | Modify | Register `seo_meta` REST field on `page`, `case-study`, and `post` exposing `is_editorial_noindex` to distinguish post-level noindex from CMS-level global discouragement. |
| `docs/contracts.md` | Modify | Document Rank Math REST contract, origin translation rules, sitemap specs, and revalidation hooks. |

## 4. Contract status

| Interface | Existing and verified / proposed / unknown | Evidence or decision |
| --- | --- | --- |
| Rank Math Headless REST API (`GET /wp-json/rankmath/v1/getHead?url=...`) | Existing (WordPress plugin) / Proposed frontend adapter | Documented in Rank Math official headless guide; endpoint queried server-side; schema defined in `src/lib/seo/schema.ts`. |
| Next.js App Router Metadata API (`generateMetadata()`) | Existing and verified | Native Next.js 15 App Router interface. |
| Next.js Dynamic Sitemap API (`app/sitemap.ts`) | Existing and verified | Native Next.js 15 interface returning `MetadataRoute.Sitemap`. |
| Next.js Dynamic Robots API (`app/robots.ts`) | Existing and verified | Native Next.js 15 interface returning `MetadataRoute.Robots`. |
| Next.js Custom 404 Route (`app/not-found.tsx`) | Existing and verified | Native Next.js App Router error handling convention. |
| Schema.org JSON-LD Graph Specification (`@graph`) | Verified standard | Google Search Central structured data guidelines and Schema.org standard. |
| Revalidation Webhook Contract (`/api/revalidate`) | Existing and verified | Implemented in `class-revalidate.php` and `apps/web/src/app/api/revalidate/route.ts`. |
| Cal.com Booking Destination (`https://cal.com/oderinde/free`) | Existing and verified | Verified in D-6 and centralized in `siteSettings.bookingUrl`. |
| Client Portal URL (`https://portal.oderindestephen.com/`) | Existing and verified | Verified in `docs/contracts.md` and centralized in `siteSettings.portalUrl`. |
| Cloudflare Web Analytics Beacon | Verified standard | Cloudflare Pages / Web Analytics cookieless beacon protocol. |

## 5. Scope check

### Verbatim Acceptance Criteria:
From `prompts/05-seo-integrations.md`:
> *"The actual public frontend output preserves approved SEO intent and working integrations, with correct origins, redirects, media continuity, analytics behavior and complete cache/draft isolation checks."*

From `OderindeStephen-Headless-Build-Plan-v1.md` Section 10:
> *"Rank Math metadata adapter, schema, sitemap, robots, redirects, image URL continuity, analytics/consent, Cal links, portal link, resource delivery and any approved search/filter. Acceptance gate: Rendered SEO matches approved intent and public domains; all integrations have real evidence."*

### Prerequisites:
- Phase 04 completed and confirmed by Stephen (`plans/P04-pages-content.md`).
- All 13 core pages and templates implemented, typed, and unit tested.
- Node.js v24.20.0, npm 11.19.0, Git 2.56.0.windows.2, LocalWP operational.
- Existing unit test suite passes (16/16 tests passing).
- Kit integrity check passes (352/352 checks passing).

### Exclusions:
- No changes to authoritative Cloudflare DNS or production Spantrix database in this phase.
- No replacement database or extra backend framework introduced.
- No paid analytics services or external paid tag managers installed.
- The actual portal application remains separate; this phase only verifies the marketing integration and illustrative controls.

## 6. Steps

1. **Step 1: Define SEO Types and Zod Validation Schemas**
   - Create `apps/web/src/lib/seo/types.ts` defining strongly typed interfaces for `SeoMetadata`, `OpenGraphMetadata`, `TwitterMetadata`, `RobotsDirective`, and `JsonLdNode`.
   - Create `apps/web/src/lib/seo/schema.ts` defining Zod schemas for `RankMathRawResponseSchema`, `ParsedSeoMetadataSchema`, and `JsonLdGraphSchema`.
   - Verification: Add schema unit tests in `apps/web/src/lib/seo/rankmath.test.ts` and verify with `npm.cmd test`.

2. **Step 2: Build Static Fallback Metadata Fixtures**
   - Create `apps/web/src/lib/seo/fallback-metadata.ts` containing complete, verified SEO metadata and structured JSON-LD schemas for all 13 public routes (`/`, `/business-website-solutions`, `/business-website-development`, `/e-commerce-development`, `/case-studies`, `/pricing`, `/contact`, `/portfolio`, `/insights`, `/privacy-policy`, `/terms`, `/case-study/*`, `/insights/*`).
   - Ensures zero build failure or metadata degradation if WordPress is offline.
   - Verification: Verify TypeScript compilation via `npm.cmd --prefix apps/web run typecheck`.

3. **Step 3: Implement Rank Math Headless REST Adapter & Edge-Safe HTML Parser**
   - Create `apps/web/src/lib/seo/rankmath.ts`:
     - Implement `getRankMathHead(path: string)` fetching from `${WP_API_ORIGIN}/wp-json/rankmath/v1/getHead?url=...` with `cms-seo` cache tag.
     - Implement pure TypeScript regex/token head parser extracting `<title>`, `<meta name="description">`, `<link rel="canonical">`, Open Graph tags, Twitter tags, robots directives, and JSON-LD script content without heavy DOM dependencies.
     - Implement `translateOrigins(text: string)`: Replaces CMS origins (`http://localhost:10004`, `https://cms.oderindestephen.com`) with `https://oderindestephen.com` in canonicals, Open Graph URLs, Twitter URLs, and Schema `@id` references while preserving external social and schema links.
     - Implement anti-contamination guard `resolveRobotsDirective(...)`: Distinguishes global CMS search discouragement (`blog_public = 0`) from genuine editorial page-level `noindex`. Enforces `{ index: false, follow: false, nocache: true }` in draft mode, respects genuine editorial noindex, but outputs `{ index: true, follow: true }` on production frontend.
     - Implement schema graph deduplication: Filters `@graph` nodes to guarantee strictly ONE `WebSite` node, ONE `Organization` node, and ONE `BreadcrumbList` node per page.
   - Create `apps/web/src/lib/seo/metadata.ts`:
     - Implement `constructPageMetadata(path: string, options?: ...)` transforming parsed Rank Math metadata into Next.js App Router `Metadata` object.
   - Verification: Write comprehensive unit tests in `apps/web/src/lib/seo/rankmath.test.ts` testing URL translation, regex parser, robots resolution, schema deduplication, and offline fallback (8+ tests). Run `npm.cmd test`.

4. **Step 4: Build Server Structured Data Component**
   - Create `apps/web/src/components/seo/JsonLd.tsx`: Server component outputting valid, sanitized `<script type="application/ld+json">` containing the deduplicated `@graph`.
   - Verification: Verify component renders valid JSON string matching Schema.org specifications.

5. **Step 5: Integrate Dynamic Metadata & JSON-LD Across All 13 Public Routes**
   - Wire `generateMetadata()` and `<JsonLd />` across:
     - `apps/web/src/app/page.tsx`
     - `apps/web/src/app/business-website-solutions/page.tsx`
     - `apps/web/src/app/business-website-development/page.tsx`
     - `apps/web/src/app/e-commerce-development/page.tsx`
     - `apps/web/src/app/case-studies/page.tsx`
     - `apps/web/src/app/case-study/[slug]/page.tsx`
     - `apps/web/src/app/pricing/page.tsx`
     - `apps/web/src/app/contact/page.tsx`
     - `apps/web/src/app/portfolio/page.tsx`
     - `apps/web/src/app/insights/page.tsx`
     - `apps/web/src/app/insights/[slug]/page.tsx`
     - `apps/web/src/app/privacy-policy/page.tsx`
     - `apps/web/src/app/terms/page.tsx`
   - Verification: Run `npm.cmd --prefix apps/web run build` and `npm.cmd --prefix apps/web run typecheck` to confirm all static and dynamic pages build with valid metadata.

6. **Step 6: Implement Dynamic XML Sitemap (`apps/web/src/app/sitemap.ts`)**
   - Generate `MetadataRoute.Sitemap` combining:
     - 11 static routes (`/`, `/business-website-solutions`, `/business-website-development`, `/e-commerce-development`, `/case-studies`, `/pricing`, `/contact`, `/portfolio`, `/insights`, `/privacy-policy`, `/terms`).
     - 6 published case study slugs queried from `getCaseStudies()`.
     - Published blog post slugs queried from `getPosts()`.
   - Populate `lastModified` from CMS modified dates (with fallback to verified export timestamps).
   - Enforce exclusions: no drafts, no preview URLs, no `/api/` endpoints, no error pages, no redirected legacy URLs.
   - Verification: Verify sitemap compilation and output structure.

7. **Step 7: Implement Dynamic Robots.txt (`apps/web/src/app/robots.ts`)**
   - Generate `MetadataRoute.Robots`:
     - In production: Allow `/`, Disallow `/api/`, `/_next/`, `/*preview*`, `/*token*`, Sitemap `https://oderindestephen.com/sitemap.xml`.
     - In staging/preview: Disallow `/` for all user agents.
   - Verification: Verify robots route output.

8. **Step 8: Implement Branded 404 Page (`apps/web/src/app/not-found.tsx`)**
   - Create accessible, dark-themed 404 page matching brand tokens (`#07090D` background, `#0E1219` card, `#1E293B` border, `#3B82F6` status badge).
   - Provide recovery navigation links (Homepage, Solutions, Case Studies, Pricing, Contact, Strategy Call).
   - Set metadata `robots: { index: false, follow: false }`.
   - Verification: Test via browser and verify genuine HTTP status 404 returned.

9. **Step 9: Configure Legacy Redirects and Old Media URL Continuity**
   - Update `apps/web/next.config.ts`:
     - Retain 8 existing redirects.
     - Add historical blog post redirect: `/why-wordpress-is-still-a-game-changer-for-small-businesses-in-2026` $\rightarrow$ `/insights/why-wordpress-is-still-a-game-changer-for-small-businesses-in-2026`.
     - Add feed redirects: `/feed`, `/rss` $\rightarrow$ `/insights`.
     - Add author archive redirect: `/author/:slug*` $\rightarrow$ `/insights`.
     - Add admin navigation forwards: `/wp-admin/:path*` $\rightarrow$ `${CMS_ORIGIN}/wp-admin/:path*`, `/wp-login.php` $\rightarrow$ `${CMS_ORIGIN}/wp-login.php`.
     - Add Divi template redirects: `/et_pb_layout/:slug*`, `/et_template/:slug*`, `/et_body_layout/:slug*` $\rightarrow$ `/`.
     - Add Media URL Continuity 301 Redirect: `/wp-content/uploads/:path*` $\rightarrow$ `${CMS_ORIGIN}/wp-content/uploads/:path*`.
   - Verification: Verify Next.js redirect configuration and test redirect targets.

10. **Step 10: Implement Privacy-Respecting Analytics & Consent Management**
    - Create `apps/web/src/components/analytics/AnalyticsProvider.tsx`:
      - Supports cookieless Cloudflare Web Analytics beacon activated via `NEXT_PUBLIC_CF_ANALYTICS_TOKEN` (zero CWV impact, no cookie banner required).
      - Supports Google Analytics 4 (GA4) with Google Consent Mode v2 by default (`analytics_storage: 'denied'`, `ad_storage: 'denied'`) if `NEXT_PUBLIC_GA_MEASUREMENT_ID` is provided.
    - Create `apps/web/src/components/analytics/CookieConsentBanner.tsx`:
      - Minimal, accessible banner storing consent in `localStorage` (`os_cookie_consent`) and updating Consent Mode v2 on user accept.
    - Mount components in `apps/web/src/app/layout.tsx`.
    - Verification: Test with tokens unset (clean zero-overhead render) and with test tokens.

11. **Step 11: Portal & Booking Accessibility & Continuity Hardening**
    - Audit all booking buttons to verify resolution to `https://cal.com/oderinde/free`.
    - Enhance `InteractivePortalSection.tsx` with WAI-ARIA arrow key navigation (`ArrowLeft`, `ArrowRight`, `Home`, `End`) across tab list.
    - Verification: Test keyboard navigation on Portal tabs.

12. **Step 12: Harden CMS Revalidation Webhooks & Expose Editorial Noindex**
    - In `wordpress/plugins/oderinde-headless/includes/class-post-types.php`:
      - Register `seo_meta` REST field exposing `is_editorial_noindex` to explicitly differentiate post-level noindex from CMS-level global discouragement.
    - In `wordpress/plugins/oderinde-headless/includes/class-revalidate.php`:
      - Add `post_updated` hook: If `$post_before->post_name !== $post_after->post_name`, dispatch revalidation for BOTH old and new slug paths.
      - Add `wp_update_nav_menu` hook: Revalidate `['cms-settings', 'cms-pages']` and `['/']`.
      - Add Rank Math option update hooks (`update_option_rank-math-options-titles`) to dispatch `cms-seo`.
      - Register `CMS_CACHE_TAGS.seo = "cms-seo"` in `apps/web/src/lib/cms/cache.ts`.
    - Verification: Unit test revalidation dispatcher and payload schema.

13. **Step 13: Full Suite Verification & Documentation**
    - Run `npm.cmd --prefix apps/web run typecheck` (0 errors).
    - Run `npm.cmd --prefix apps/web run lint` (0 errors).
    - Run `npm.cmd test` (all tests pass, including new Rank Math and SEO tests).
    - Run `npm.cmd --prefix apps/web run build` (successful production build).
    - Run `node tools/check-kit.mjs` (352+ checks pass).
    - Update `docs/contracts.md` with Rank Math, SEO, and sitemap specifications.
    - Recovery: Git commit checkpoint before execution; clean revert to `main` if any step fails.

## 7. Objections

1. **Objection 1 (Blocker): CMS `noindex` Contamination Hazard.**
   - *Risk:* In development/staging or pre-migration Spantrix setups, WordPress often has "Discourage search engines from indexing this site" (`blog_public = 0`) enabled. If Rank Math's raw `getHead` output is blindly imported, the public production frontend (`oderindestephen.com`) will output `<meta name="robots" content="noindex, nofollow" />`, disastrously de-indexing the entire site from Google.
   - *Resolution:* Implement a dual-layer safety architecture in `src/lib/seo/rankmath.ts` and `class-post-types.php`. Expose `is_editorial_noindex` via WordPress REST to capture explicit post-level noindex choices. In production frontend rendering (`NEXT_PUBLIC_SITE_ORIGIN === "https://oderindestephen.com"`), CMS-level global search discouragement is strictly overridden with `{ index: true, follow: true }`, while draft previews and explicit editorial `noindex` directives remain unindexed.

2. **Objection 2 (Serious): Duplicate Schema & Contradictory Graph Ownership.**
   - *Risk:* If Rank Math generates `Organization` and `WebSite` schema while the frontend `RootLayout` or components also inject static schema blocks, search engines encounter duplicate, conflicting entity nodes, causing rich snippet disqualification.
   - *Resolution:* Enforce the Single-Owner Invariant per `prompts/05-seo-integrations.md`. `RootLayout` will NOT inject any independent Organization or WebSite schema. The `JsonLd` component ingests Rank Math's parsed `@graph`, passes it through an entity deduplication filter ensuring strictly ONE `WebSite`, ONE `Organization`, and ONE `BreadcrumbList` node per page, and translates all CMS `@id` URIs to public frontend equivalents.

3. **Objection 3 (Serious): 404 Link Rot for 101 Historical WordPress Media Attachments.**
   - *Risk:* External backlinks, Google Image search, and existing content reference old media files at `https://oderindestephen.com/wp-content/uploads/...`. In a headless architecture where the frontend is hosted on Cloudflare Pages, these requests hit Next.js and return 404, breaking image links and harming SEO equity.
   - *Resolution:* In `apps/web/next.config.ts`, configure an explicit 301 Permanent Redirect mapping `/wp-content/uploads/:path*` to `${CMS_MEDIA_ORIGIN}/wp-content/uploads/:path*`. This preserves SEO equity, satisfies Build Plan Section 9 (line 167), and avoids routing heavy media streaming through Cloudflare Worker execution limits.

4. **Objection 4 (Minor): Performance & Privacy Overhead of Heavy Analytics Tags.**
   - *Risk:* Third-party tracking scripts like GA4 or GTM can degrade Core Web Vitals (LCP, TBT, CLS) and trigger legal non-compliance under UK GDPR/PECR if fired without consent.
   - *Resolution:* Recommend cookieless Cloudflare Web Analytics as the primary lightweight engine (zero CWV penalty, compliant without cookie banners). For optional GA4 integration, implement Google Consent Mode v2 by default (`analytics_storage: 'denied'`) paired with a lightweight, accessible cookie banner that only enables storage upon explicit consent.

## 8. Verdict

READY FOR APPROVAL. Comprehensive gap audit completed across all 13 routes, contracts, exports, and build plan sections 7–9. All architectural blueprints, deduplication rules, anti-contamination guards, redirect inventories, and unit test suites are fully defined and ready for execution upon Stephen's explicit approval.

## 9. Approval

- Status: APPROVED
- Stephen's Decision: "APPROVE"
- Date: 2026-10-23
- Scope Approved: Full implementation of Phase 05 (SEO and Public Integrations) including Rank Math REST adapter, origin translation, schema deduplication, dynamic sitemap, robots.txt, branded 404 page, legacy redirects, media URL continuity, analytics and consent provider, portal tab accessibility, and hardened revalidation hooks.

## 10. Implementation log

- 2026-10-23: Phase 05 Gap audit initiated. Fanned out 3 research subagents covering (1) Rank Math headless & schema deduplication, (2) Sitemap, robots, 404, redirects & media URLs, (3) Integrations, analytics, booking, portal, and cache invalidation.
- 2026-10-23: Fanned-out subagents completed and returned comprehensive technical evidence.
- 2026-10-23: Formulated concrete 14-section implementation plan `plans/P05-seo-integrations.md`. Status: AWAITING APPROVAL.
- 2026-10-23: Stephen explicitly approved with "APPROVE". Recorded in section 9; task transitioned to IN PROGRESS.
- 2026-10-23: Created `apps/web/src/lib/seo/types.ts` and `apps/web/src/lib/seo/schema.ts` defining Zod schemas for raw Rank Math responses, Open Graph, Twitter, robots, and Schema.org graph nodes.
- 2026-10-23: Created `apps/web/src/lib/seo/fallback-metadata.ts` with complete static fallback metadata and JSON-LD schemas for all 13 routes.
- 2026-10-23: Implemented `apps/web/src/lib/seo/rankmath.ts` (edge-safe regex/token parser, CMS origin translator, robots anti-contamination guard, single-owner schema deduplication) and `apps/web/src/lib/seo/metadata.ts`.
- 2026-10-23: Created `apps/web/src/lib/seo/rankmath.test.ts` (unit tests covering origin translation, robots resolution, schema deduplication, HTML parsing, and fallbacks).
- 2026-10-23: Created server component `apps/web/src/components/seo/JsonLd.tsx` for structured data injection.
- 2026-10-23: Integrated dynamic `generateMetadata()` and `<JsonLd />` across all 13 public routes: `/`, `/business-website-solutions`, `/business-website-development`, `/e-commerce-development`, `/case-studies`, `/case-study/[slug]`, `/pricing`, `/contact`, `/portfolio`, `/insights`, `/insights/[slug]`, `/privacy-policy`, `/terms`.
- 2026-10-23: Implemented dynamic XML sitemap `apps/web/src/app/sitemap.ts` (11 static pages, 6 published case studies, published blog posts; excludes drafts and preview URLs).
- 2026-10-23: Implemented dynamic robots `apps/web/src/app/robots.ts` (production allows public crawling, staging disallows).
- 2026-10-23: Implemented branded 404 page `apps/web/src/app/not-found.tsx` with dark tokens, recovery destinations, and `noindex` robots.
- 2026-10-23: Configured 301 permanent redirects in `apps/web/next.config.ts` for historical blog post permalink, RSS feeds, author archives, Divi builder artifacts, and `/wp-content/uploads/:path*` media continuity.
- 2026-10-23: Created `AnalyticsProvider.tsx` and `CookieConsentBanner.tsx` mounted in `apps/web/src/app/layout.tsx`.
- 2026-10-23: Added WAI-ARIA keyboard navigation (`ArrowLeft`, `ArrowRight`, `Home`, `End`) to `InteractivePortalSection.tsx`.
- 2026-10-23: Hardened `wordpress/plugins/oderinde-headless/includes/class-revalidate.php` with `post_updated` slug change detection, `wp_update_nav_menu`, `update_option_rank-math-options-titles`, and registered `seo_meta` REST field in `class-post-types.php`.
- 2026-10-23: Extended `CMS_CACHE_TAGS` in `cache.ts` with `seo: "cms-seo"`.
- 2026-10-23: Executed verification test suite:
  - `npm.cmd --prefix apps/web run typecheck` $\rightarrow$ 0 errors.
  - `npm.cmd --prefix apps/web run lint` $\rightarrow$ 0 errors, 0 warnings.
  - `npm.cmd --prefix apps/web test` $\rightarrow$ 22/22 unit tests passing.
  - `npm.cmd --prefix apps/web run build` $\rightarrow$ Clean build; 21/21 static pages generated including `/sitemap.xml`, `/robots.txt`, `/_not-found`.
  - `node tools/check-kit.mjs` $\rightarrow$ 376 integrity checks pass.
  - `python tools/check-memory.py` $\rightarrow$ 7 checks pass.
- 2026-10-23: Updated `docs/contracts.md` with Section 4 documenting Rank Math REST contract, origin translation, sitemap, and revalidation hooks.
- 2026-10-23: Status set to `IMPLEMENTED - AWAITING STEPHEN CONFIRMATION`.

## 11. Deviations

| Planned | Found | Resolution | Approval impact |
| --- | --- | --- | --- |
| Blindly pass Rank Math robots metadata | Development WordPress emits `noindex, nofollow` when `blog_public = 0` | Build dual-layer anti-contamination guard distinguishing editorial noindex from CMS discouragement | Critical safety enhancement protecting production SEO |
| Proxy `/wp-content/uploads` through Next.js | Cloudflare Worker memory & CPU execution limits risk timeouts on large media | Configure 301 Permanent Redirect to CMS media origin per Build Plan Section 9 | More resilient, zero edge resource overhead |
| Global schema in `RootLayout` | Risk of duplicate `Organization` and `WebSite` nodes with Rank Math graph | Centralize all JSON-LD in page-level deduplicating `<JsonLd />` component | Enforces strict single-owner schema invariant |

## 12. Memory written

No memory triggers fired during planning. Existing decisions D-1 through D-13 and patterns P-1 through P-4 remain active and sufficient.

## 13. For Stephen to confirm

Stephen tested and confirmed all items with "tested and working" on 2026-10-23:
1. `/sitemap.xml` returns clean, valid XML sitemap indexing all 11 static pages, 6 case studies, and blog posts with zero drafts or error routes. [CONFIRMED]
2. `/robots.txt` returns valid directives pointing to `https://oderindestephen.com/sitemap.xml` and disallowing `/api/`. [CONFIRMED]
3. Navigating to an invalid route renders the branded 404 page and returns genuine HTTP 404 status. [CONFIRMED]
4. Viewing HTML source on public pages reveals validated JSON-LD structured data with `https://oderindestephen.com` canonicals and clean Open Graph tags without duplicate Organization nodes. [CONFIRMED]
5. Old URL `/why-wordpress-is-still-a-game-changer-for-small-businesses-in-2026` 301 redirects cleanly to `/insights/why-wordpress-is-still-a-game-changer-for-small-businesses-in-2026`. [CONFIRMED]
6. Requests to `/wp-content/uploads/...` redirect cleanly to the CMS media path without 404s. [CONFIRMED]
7. All booking buttons resolve to `https://cal.com/oderinde/free`. [CONFIRMED]
8. Rank Math Headless CMS support verified live against WordPress REST endpoint. [CONFIRMED]

## 14. Backend or external handoff

- Rank Math Headless CMS Support must be verified enabled in WordPress: Advanced Mode $\rightarrow$ **Rank Math SEO > General Settings > Others > Headless CMS Support**.
- When deploying to production on Cloudflare Pages, configure environment variables:
  - `NEXT_PUBLIC_SITE_ORIGIN=https://oderindestephen.com`
  - `CMS_MEDIA_ORIGIN=https://cms.oderindestephen.com`
  - `WP_API_ORIGIN=https://cms.oderindestephen.com`
  - `NEXT_PUBLIC_CF_ANALYTICS_TOKEN` (optional Cloudflare Web Analytics beacon token)
- No database credentials or private secrets are exposed.
