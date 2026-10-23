# P04: Complete All Core Pages, Secondary Destinations, Templates, and Content Reparations

- Task: P04
- Status: CONFIRMED BY STEPHEN
- Created: 2026-10-23
- Updated: 2026-10-23
- Repository: oderindestephen-headless

## 1. Task

Complete all 8 core Divi pages, secondary approved destinations, portfolio and blog templates, and legal compliance pages with verified real content, responsive accessible layouts, genuine CTA behavior, repaired source defects (Pipe Patch Pro hero/images, pricing currency, missing review citations, dead anchors), and comprehensive integration and unit tests, fulfilling every acceptance criterion of Phase 04.

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
| `plans/P04-pages-content.md` | Create | Concrete 14-section implementation plan for Phase 04. |
| `apps/web/next.config.ts` | Modify | Configure 301 redirects for legacy/secondary paths (`/solutions`, `/blog`, `/blog/:slug`, `/website-redesign`, `/client-portals-business-systems`, `/wordpress-development`, `/woocommerce-development`, `/shopify-development`). |
| `apps/web/src/lib/cms/schema.ts` | Modify | Add `BlogPostSchema`, `BlogPostAcfSchema`, strongly typed `PageSectionSchema` union, and extend `CaseStudyAcfSchema` with `live_url`, `client_name`, `hero_image_url`, `rating_value`, `rating_source`, `review_quote`, `review_author`. |
| `apps/web/src/lib/cms/api.ts` | Modify | Implement `getPosts()`, `getPostBySlug()`, `getPages()`, `getFeaturedMedia()` helper, and offline static fallback fixtures. |
| `apps/web/src/lib/cms/fixtures/blog-posts.json` | Create | Verified fixture for post ID 237 (*"Why WordPress Is Still a Game Changer for Small Businesses in 2026"*). |
| `apps/web/src/lib/cms/fixtures/pages-data.json` | Create | Verified static fallback fixtures for all core pages to guarantee offline build resilience. |
| `apps/web/src/lib/cms/fixtures/site-settings.json` | Modify | Add `contactPhone`, `contactLocation`, and include Portfolio and Insights in navigation array. |
| `apps/web/src/lib/cms/api.test.ts` | Modify | Unit tests verifying blog post fetching, single post retrieval, fallback handling, and schema validation. |
| `apps/web/src/components/sections/SectionRenderer.tsx` | Modify | Support new layouts: `pricing_packages`, `testimonials_grid`, `process_steps`, `problem_paths`, `platform_comparison`, `lead_magnet`, `blog_insights_grid`, `portfolio_showcase`. |
| `apps/web/src/components/sections/ConnectedSolutionsSection.tsx` | Create | 4-solution connected ecosystem section for Home page. |
| `apps/web/src/components/sections/TechnologyStackSection.tsx` | Create | Technology selection philosophy (WordPress, WooCommerce, Shopify, Next.js). |
| `apps/web/src/components/sections/AboutStephenSection.tsx` | Create | Founder bio, 3 guiding principles (Clarity, Conversion, Growth), and core platform badges. |
| `apps/web/src/components/sections/ProcessStepsSection.tsx` | Create | Reusable 4-step execution roadmap (Discover, Plan, Build, Launch). |
| `apps/web/src/components/sections/LeadMagnetSection.tsx` | Create | Free Growth Checklist teaser routed to Cal.com per D-12. |
| `apps/web/src/components/sections/PricingTeaserSection.tsx` | Create | Reusable starting prices teaser bar (£450, £250, £400, £700). |
| `apps/web/src/components/sections/InsightsTeaserSection.tsx` | Create | Reusable recent guides/insights showcase grid. |
| `apps/web/src/components/sections/DiagnosticRouterSection.tsx` | Create | 4-situation problem diagnostic router for Business Website Solutions. |
| `apps/web/src/components/sections/PlatformPhilosophySection.tsx` | Create | Platform selection philosophy section with direct exploration links. |
| `apps/web/src/components/sections/ClientFeedbackSection.tsx` | Create | 3 verified testimonials with platform rating badges (Clutch, Trustpilot, Google, G2). |
| `apps/web/src/components/sections/PainVsSolutionSection.tsx` | Create | Challenges vs Solutions comparison for Business Website Development. |
| `apps/web/src/components/sections/CoreDeliverablesSection.tsx` | Create | 4 core deliverables (Clarity, Search Structure, Enquiries, Easy Management). |
| `apps/web/src/components/sections/ConversionJourneySection.tsx` | Create | 4-step visitor conversion breakdown. |
| `apps/web/src/components/sections/SiteArchitectureSection.tsx` | Create | Essential 6-page site architecture with repaired sequential numbering (01 to 06). |
| `apps/web/src/components/sections/EcommerceFrictionSection.tsx` | Create | Storefront friction analysis for E-commerce Development. |
| `apps/web/src/components/sections/BuyingJourneySection.tsx` | Create | 5-stage customer buying journey breakdown. |
| `apps/web/src/components/sections/PlatformComparisonMatrix.tsx` | Create | WooCommerce vs Shopify side-by-side architectural and operational comparison. |
| `apps/web/src/components/sections/StorefrontOperationsSection.tsx` | Create | 6 operational components connecting storefront to back-office workflows. |
| `apps/web/src/components/sections/OrderWorkflowSection.tsx` | Create | 4-stage order lifecycle breakdown. |
| `apps/web/src/components/sections/CaseStudiesFilterGrid.tsx` | Create | Client-side filterable case studies grid supporting category tags. |
| `apps/web/src/components/sections/PricingPackagesGrid.tsx` | Create | 4 pricing package cards with scope considerations, GBP prices, and pre-filled contact links. |
| `apps/web/src/components/sections/UniversalInclusionsSection.tsx` | Create | Scope before commitment (01 Deliverables, 02 Milestones, 03 QA & Handover). |
| `apps/web/src/components/sections/ServiceMatchSelectorSection.tsx` | Create | 4-card service matcher (Find your fit). |
| `apps/web/src/components/sections/ProposalRoadmapSection.tsx` | Create | 3-step quotation process (01 Share, 02 Review, 03 Proposal). |
| `apps/web/src/components/sections/PricingFactorsSection.tsx` | Create | 6 project cost drivers. |
| `apps/web/src/components/case-study/PipePatchProBespokeCaseStudy.tsx` | Create | Full 274-block bespoke narrative for Pipe Patch Pro, featuring restored hero image, Wix domain migration story, 6-section architecture, 3 kit tiers, and qualified WooCommerce statement. |
| `apps/web/src/components/case-study/CaseStudyNavigation.tsx` | Create | Next/Previous project pagination bar for case studies. |
| `apps/web/src/components/contact/ContactChannelsGrid.tsx` | Create | Multi-channel connection cards (Email, Phone `+44 7848 149224`, Cal.com, LinkedIn, Google Business). |
| `apps/web/src/components/contact/PostEnquiryTimeline.tsx` | Create | 3-step timeline (01 Share, 02 Discuss, 03 Plan). |
| `apps/web/src/components/contact/GlobalDeliverySection.tsx` | Create | London base and worldwide remote delivery context. |
| `apps/web/src/components/blog/BlogCard.tsx` | Create | Article preview card with category badge, reading time, and date. |
| `apps/web/src/components/blog/BlogArticleHeader.tsx` | Create | Article hero with metadata, reading time, author, and last reviewed date. |
| `apps/web/src/components/blog/RelatedServiceCta.tsx` | Create | In-article conversion card linked to relevant service. |
| `apps/web/src/components/layout/Header.tsx` | Modify | Update navigation items to include Portfolio and Insights. |
| `apps/web/src/components/layout/Footer.tsx` | Modify | Add phone number, location, and verified links across all 4 footer columns. |
| `apps/web/src/app/page.tsx` | Modify | Integrate full sequence of sections (Hero, Trust, Solutions, Services, Tech, About, Process, Case Studies, Portal, Lead Magnet, Pricing Teaser, Insights, FAQ, Closing CTA). |
| `apps/web/src/app/business-website-solutions/page.tsx` | Create | Full Business Website Solutions page. |
| `apps/web/src/app/business-website-development/page.tsx` | Create | Full Business Website Development page with repaired numbering and fixed duplicate headings. |
| `apps/web/src/app/e-commerce-development/page.tsx` | Create | Full E-commerce Development page with 5-stage buying journey, WooCommerce vs Shopify matrix, and Cal.com booking. |
| `apps/web/src/app/case-studies/page.tsx` | Create | Full Case Studies hub with filterable library, live portfolio highlights, and methodology breakdown. |
| `apps/web/src/app/portfolio/page.tsx` | Create | Visual gallery showcase with responsive device mockups and verified live external website links. |
| `apps/web/src/app/case-study/[slug]/page.tsx` | Modify | Mount bespoke Pipe Patch Pro component with restored hero image, or render generic CPT template for other records. |
| `apps/web/src/app/pricing/page.tsx` | Create | Full Pricing page with 4 starting packages in GBP (£450, £250, £400, £700), inclusions, factors, and FAQ. |
| `apps/web/src/app/contact/page.tsx` | Modify | Add multi-channel grid, post-enquiry timeline, and global delivery context around existing 7-field form. |
| `apps/web/src/app/insights/page.tsx` | Create | Blog/Insights archive page listing published articles. |
| `apps/web/src/app/insights/[slug]/page.tsx` | Create | Single blog post template rendering structured Gutenberg blocks and ACF article metadata. |
| `apps/web/src/app/privacy-policy/page.tsx` | Create | UK GDPR compliant Privacy Policy per D-11. |
| `apps/web/src/app/terms/page.tsx` | Create | Professional Terms of Service per D-11. |
| `apps/web/public/images/` | Populate | Brand assets, logos, platform icons, review badges, and Pipe Patch Pro hero image. |
| `wordpress/acf-json/group_page_sections.json` | Modify | Add layouts: `pricing_packages`, `testimonials_grid`, `process_steps`, `problem_paths`, `platform_comparison`, `lead_magnet`, `blog_insights_grid`, `portfolio_showcase`. |
| `wordpress/acf-json/group_site_settings.json` | Modify | Add `contact_phone`, `contact_location`. |
| `wordpress/acf-json/group_6a7f3d410d6c4.json` | Modify | Add `live_url`, `client_name`, `project_type`, `hero_screenshot`, `rating_value`, `rating_source`, `review_quote`, `review_author`. |
| `wordpress/plugins/oderinde-headless/includes/class-rest-resolve.php` | Modify | Support `/portfolio` path mapping, `/blog` and `/insights` archive resolution, and slug aliases. |
| `wordpress/plugins/oderinde-headless/includes/class-post-types.php` | Modify | Register fallback REST `'acf'` field on `'page'` and `'post'`; expose extended case study fields. |
| `wordpress/plugins/oderinde-headless/includes/class-rest-site.php` | Modify | Return `contactPhone`, `contactLocation`, and updated navigation array including Portfolio and Insights. |
| `tools/seed-case-studies.php` | Modify | Update Pipe Patch Pro (ID 96182) with thumbnail ID `96183`, live URL `https://www.pipepatchpro.net/`, and full copy. |

## 4. Contract status

| Interface | Existing and verified / proposed / unknown | Evidence or decision |
| --- | --- | --- |
| `GET /wp-json/os/v1/site` | Existing & Verified | Returns branding, booking URL, contact email, currency, navigation, footer from LocalWP. Modified to include phone and updated nav. |
| `GET /wp-json/wp/v2/case-study` | Existing & Verified | Returns 6 published case studies. Extended with `live_url`, `client_name`, and rating fields. |
| `GET /wp-json/wp/v2/pages?slug=...` | Existing & Verified | Returns published page with ACF flexible sections. |
| `GET /wp-json/wp/v2/posts` | Existing & Verified | Returns published post ID 237 (*"Why WordPress Is Still a Game Changer for Small Businesses in 2026"*). |
| `GET /wp-json/os/v1/resolve?path=...` | Existing & Verified | Maps URL paths to content IDs and templates. Extended to handle `/portfolio`, `/insights`, and slug normalization. |
| `POST /wp-json/os/v1/enquiries` | Existing & Verified | Authenticated HMAC enquiry relay to private CPT and Mailpit. |
| `POST /api/enquiry` | Existing & Verified | Next.js form relay endpoint with Zod validation. |
| `GET /api/preview` | Existing & Verified | Validates HMAC signature and enables Next.js draft mode. |
| Next.js 301 Redirects (`next.config.ts`) | Proposed | Cleanly maps legacy/secondary paths (`/solutions`, `/blog`, `/blog/:slug`, `/website-redesign`, `/client-portals-business-systems`, `/wordpress-development`, `/woocommerce-development`, `/shopify-development`) to active canonical routes. |
| Extended ACF Section Schemas | Proposed | Discriminated union in `schema.ts` typing all 17 page section layouts. |
| `BlogPost` Zod Schema (`schema.ts`) | Proposed | Strictly types blog post title, excerpt, content, date, modified, featured media, and ACF metadata (`group_6a83a52b7ff14`). |

## 5. Scope check

### Verbatim Acceptance Criteria:
From `prompts/04-pages-content.md`:
> *"All eight supplied pages and all approved additional destinations are complete locally, with real content, accessible responsive presentation and genuine CTA/control behavior; no unresolved Divi placeholders or fabricated evidence remain."*

From `OderindeStephen-Headless-Build-Plan-v1.md` Section 10 (Phase 04):
> *"Complete all eight sources, every approved linked destination, portfolio/blog templates and approved articles, shared navigation/legal/resource content. Improve copy and assets. | Content review, route matrix and functionality matrix show every in-scope item implemented. No missing hero, source placeholders, mock reviews, or broken CTAs."*

### Prerequisites:
- Phase 01 complete and confirmed by Stephen ("tested and working").
- Phase 02 complete and confirmed by Stephen ("tested and working").
- Phase 03 complete and confirmed by Stephen ("tested and working").
- Git branch `main` clean and synchronized with remote repository.

### Exclusions:
- Rank Math headless meta injection, full XML sitemap, and Google Search Console registration (reserved for Phase 05).
- Cross-browser end-to-end automation suite and final QA crawl (reserved for Phase 06).
- Cloudflare Pages remote preview deployment and DNS records cutover (reserved for Phase 08 & 09).

## 6. Steps

1. **ACF JSON Schema & WordPress Plugin Updates:**
   - Modify `wordpress/acf-json/group_page_sections.json`: Add layouts for `pricing_packages`, `testimonials_grid`, `process_steps`, `problem_paths`, `platform_comparison`, `lead_magnet`, `blog_insights_grid`, and `portfolio_showcase`.
   - Modify `wordpress/acf-json/group_site_settings.json`: Add `contact_phone` (`+44 7848 149224`) and `contact_location`.
   - Modify `wordpress/acf-json/group_6a7f3d410d6c4.json`: Add `live_url`, `client_name`, `project_type`, `hero_screenshot`, `rating_value`, `rating_source`, `review_quote`, `review_author`.
   - Modify `wordpress/plugins/oderinde-headless/includes/class-rest-resolve.php`: Add support for `/portfolio`, `/blog`, `/insights`, and slug normalization.
   - Modify `wordpress/plugins/oderinde-headless/includes/class-post-types.php`: Expose new fields in REST API and register fallback REST `'acf'` field on `'page'` and `'post'`.
   - Modify `wordpress/plugins/oderinde-headless/includes/class-rest-site.php`: Return phone, location, and updated navigation items.
   - Modify `tools/seed-case-studies.php`: Set Pipe Patch Pro thumbnail ID to `96183` and add `live_url = "https://www.pipepatchpro.net/"`.
   - Verification: Run `npm.cmd run php:lint` to verify zero PHP syntax errors.

2. **Media Asset Population & Next.js Image Setup:**
   - Copy core permanent brand assets from LocalWP uploads (`C:\Users\Pythonhero\Local Sites\oderinde-cms\app\public\wp-content\uploads\`) into `apps/web/public/images/`:
     - Stephen portrait (`oderinde-stephen-cms-developer-portrait-picture.avif`)
     - Logo (`Oderinde-Stephen-Logo-.svg`)
     - Review platform badges (`clutch-review-platform-icon.png`, `trustpilot-review-platform-icon.png`, `google-reviews-icon.png`, `g2-review-platform-icon.png`)
     - Platform icons (`wordpress-cms-platform-icon.png`, `woocommerce-ecommerce-platform-icon.png`, `shopify-ecommerce-platform-icon.png`, `wix-studio-platform-icon.png`, `squarespace-website-platform-icon.png`, `framer-website-platform-icon.png`)
     - Pillar SVGs (`ATTRACT-Icon.svg`, `CONVERT-Icon.svg`, `Flow-Arrow.svg`)
     - Pipe Patch Pro hero mockup (`pipe-patch-pro-product-website-case-study-feature-image.avif`)
   - Verification: Verify files exist on disk in `apps/web/public/images/` and verify image paths resolve.

3. **Next.js TypeScript Schemas, API Client & Offline Fallbacks:**
   - Update `apps/web/src/lib/cms/schema.ts`: Define `BlogPostSchema`, `BlogPostAcfSchema`, strongly typed `PageSectionSchema` discriminated union, and extend `CaseStudyAcfSchema`.
   - Create `apps/web/src/lib/cms/fixtures/blog-posts.json` with post 237 data.
   - Create `apps/web/src/lib/cms/fixtures/pages-data.json` with offline fallback sections for all 8 pages.
   - Update `apps/web/src/lib/cms/fixtures/site-settings.json` with phone, location, and updated navigation.
   - Update `apps/web/src/lib/cms/api.ts`: Implement `getPosts()`, `getPostBySlug()`, `getPages()`, `getFeaturedMedia()`, and offline fallback fallbacks.
   - Update `apps/web/src/lib/cms/api.test.ts`: Add unit tests for blog post fetching, single post retrieval, fallback handling, and schema validation.
   - Verification: Run `npm.cmd --prefix apps/web test` to verify all tests pass.

4. **Next.js Redirects Configuration:**
   - Update `apps/web/next.config.ts`: Add `redirects()` configuration for:
     - `/solutions` $\rightarrow$ `/business-website-solutions` (301)
     - `/blog` $\rightarrow$ `/insights` (301)
     - `/blog/:slug` $\rightarrow$ `/insights/:slug` (301)
     - `/website-redesign` $\rightarrow$ `/business-website-solutions#redesign` (301)
     - `/client-portals-business-systems` $\rightarrow$ `/business-website-solutions#portals` (301)
     - `/wordpress-development` $\rightarrow$ `/business-website-development` (301)
     - `/woocommerce-development` $\rightarrow$ `/e-commerce-development#woocommerce` (301)
     - `/shopify-development` $\rightarrow$ `/e-commerce-development#shopify` (301)
   - Verification: Typecheck passes and redirects are active in Next.js router.

5. **Home Page Completion (`/`):**
   - Create section components: `ConnectedSolutionsSection.tsx`, `TechnologyStackSection.tsx`, `AboutStephenSection.tsx`, `ProcessStepsSection.tsx`, `LeadMagnetSection.tsx`, `PricingTeaserSection.tsx`, `InsightsTeaserSection.tsx`.
   - Update `SectionRenderer.tsx` to mount new layouts.
   - Update `apps/web/src/app/page.tsx` to render the full sequence with CMS data and fallback.
   - Repair all Divi defects: "Explore My Work" $\rightarrow$ `/case-studies`, "More About Stephen" $\rightarrow$ `/business-website-solutions#about`, "View Full Portfolio" $\rightarrow$ `/case-studies`, "Get the Free Checklist" $\rightarrow$ Cal.com per D-12, "Create Client Account" $\rightarrow$ `https://portal.oderindestephen.com/`. Replace placeholder star ratings with verified review platform badges.
   - Verification: Render `http://localhost:3000/` and verify all sections and buttons.

6. **Business Website Solutions Page (`/business-website-solutions`):**
   - Create `apps/web/src/app/business-website-solutions/page.tsx`.
   - Implement `DiagnosticRouterSection.tsx` (Route 01: Professional website $\rightarrow$ `/business-website-development`, Route 02: Sell products $\rightarrow$ `/e-commerce-development`, Route 03: Redesign $\rightarrow$ `/business-website-development#redesign`, Route 04: Portals/systems $\rightarrow$ `https://portal.oderindestephen.com/`).
   - Implement `PlatformPhilosophySection.tsx` and `ClientFeedbackSection.tsx` (3 verified quotes).
   - Wire `ProcessStepsSection`, `PricingTeaserSection`, `FaqSection` (5 solution FAQs), and `ClosingCtaSection`.
   - Repair defects: Bind `#solution-paths` and `#diagnostic` anchors to valid HTML element IDs; replace dead `/portfolio/` links with `/case-studies`.
   - Verification: Render `http://localhost:3000/business-website-solutions` and test responsive layout at 360px and 1440px.

7. **Business Website Development Page (`/business-website-development`):**
   - Create `apps/web/src/app/business-website-development/page.tsx`.
   - Implement `PainVsSolutionSection.tsx` (repair duplicate heading defect: "Visitors Don't Understand Your Services" $\rightarrow$ "Outdated Systems and Difficult Content Updates").
   - Implement `CoreDeliverablesSection.tsx`, `ConversionJourneySection.tsx`, and `SiteArchitectureSection.tsx` (repair numbering defect: `01, 02, 03, 02, 02, 02` $\rightarrow$ sequential `01, 02, 03, 04, 05, 06`).
   - Implement `DevelopmentProcessSection.tsx`, `RelatedGuidesSection.tsx`, `PricingTeaserSection`, `FaqSection` (6 development FAQs), and `ClosingCtaSection`.
   - Repair defects: Replace `#portfolio` anchors with `/case-studies`; wire "Ask About Your Website Project" to `/contact`.
   - Verification: Render `http://localhost:3000/business-website-development` and verify numbering and headings.

8. **E-commerce Development Page (`/e-commerce-development`):**
   - Create `apps/web/src/app/e-commerce-development/page.tsx`.
   - Implement `EcommerceFrictionSection.tsx`, `BuyingJourneySection.tsx` (5-stage customer journey: Discovery, Product Page, Cart, Checkout, Post-Purchase).
   - Implement `PlatformComparisonMatrix.tsx` (WooCommerce vs Shopify side-by-side architectural and operational comparison).
   - Implement `StorefrontOperationsSection.tsx`, `OrderWorkflowSection.tsx`, `ClientFeedbackSection`, `RelatedGuidesSection`, `FaqSection` (6 commerce FAQs), and `ClosingCtaSection`.
   - Repair defects: Map platform logos; repair "Compare Platforms" button from `#portfolio` to `#platform-comparison`; repair "Book a Strategy Call" from `/contact/` to shared Cal.com URL `https://cal.com/oderinde/free` per D-6.
   - Verification: Render `http://localhost:3000/e-commerce-development` and verify comparison matrix.

9. **Case Studies Hub (`/case-studies`) & Portfolio Gallery (`/portfolio`):**
   - Create `apps/web/src/app/case-studies/page.tsx`:
     - Implement `CaseStudiesFilterGrid.tsx` with interactive category filter tabs (All, WordPress, Headless / Next.js, E-commerce, Redesign).
     - Display all 6 published case study records pulling from LocalWP/REST with ACF outcome badges and technology tags.
     - Implement `MethodologySection.tsx` (01 Understand Challenge $\rightarrow$ 02 Plan & Develop $\rightarrow$ 03 Test & Launch) and `FaqSection` (7 case study FAQs).
     - Repair defects: Fix typo "Vist live Website" $\rightarrow$ "Visit Live Website"; fix dead `#solution-paths` and `#diagnostic` anchors.
   - Create `apps/web/src/app/portfolio/page.tsx`:
     - Render visual gallery showcase with responsive device mockups and verified live external website links (BORN Accelerators, Agentur Ostwest, Bau Helden, Einbruchschutz Baumgaertner, Samuel Edmond Stone, Pipe Patch Pro) plus secondary link to read the full case study.
   - Verification: Render `http://localhost:3000/case-studies` and `http://localhost:3000/portfolio` and test filter toggles.

10. **Pipe Patch Pro Bespoke Case Study Detail (`/case-study/pipe-patch-pro-amazon-listing-website`):**
    - Create `apps/web/src/components/case-study/PipePatchProBespokeCaseStudy.tsx`.
    - Mount dynamically inside `apps/web/src/app/case-study/[slug]/page.tsx` when `slug === "pipe-patch-pro-amazon-listing-website"` or `slug === "pipe-patch-pro"`.
    - Repair defects:
      - Restore empty hero defect using metadata from XML and render browser frame mockup using `pipe-patch-pro-product-website-case-study-feature-image.avif`.
      - Incorporate domain migration story (Wix 60-day transfer lock, Hostinger provisioning, DNS cutover, support email `info@pipepatchpro.net`).
      - Render 6-section site architecture, 3 kit maintenance tiers (Homeowners, Contractors, Facilities 20-Pack), and Amazon verified customer reviews.
      - Retain exact qualified business claim: "pipepatchpro.net went live with dedicated product content, Amazon purchase links and a WooCommerce foundation. Direct WooCommerce payment activation remained dependent on the client completing banking and WooPayments onboarding."
      - Add live external link `https://www.pipepatchpro.net/`.
    - Add `CaseStudyNavigation.tsx` pagination bar across all 6 case studies.
    - Verification: Render `http://localhost:3000/case-study/pipe-patch-pro-amazon-listing-website` and verify image renders cleanly.

11. **Pricing Page (`/pricing`):**
    - Create `apps/web/src/app/pricing/page.tsx`.
    - Implement `PricingPackagesGrid.tsx` with 4 starting packages in GBP (£450 Business Website, £250 E-commerce, £400 Redesign, £700 Digital Solutions) with pre-filled contact links (`/contact?service=...`).
    - Implement `UniversalInclusionsSection.tsx` (01 Deliverables, 02 Milestones, 03 Handover), `ServiceMatchSelectorSection.tsx`, `ProposalRoadmapSection.tsx`, `PricingFactorsSection.tsx` (6 cost drivers), `FaqSection` (6 pricing FAQs), and `ClosingCtaSection`.
    - Repair defects: Ensure strictly GBP currency per D-8; repair "Request a Quote" from `#portfolio` to `/contact`; replace misdirected case study links with `/case-studies`.
    - Verification: Render `http://localhost:3000/pricing` and verify GBP symbols and links.

12. **Contact Page Enhancements (`/contact`):**
    - Update `apps/web/src/app/contact/page.tsx`:
      - Mount `ContactChannelsGrid.tsx`: Direct email (`Contact@oderindestephen.com`), direct phone (`+44 7848 149224`), Cal.com booking link, LinkedIn profile, and Google Business Profile.
      - Mount `PostEnquiryTimeline.tsx` (01 Share, 02 Discuss, 03 Plan).
      - Mount `GlobalDeliverySection.tsx` (London base + worldwide remote delivery).
      - Mount `FaqSection` (7 pre-enquiry FAQs).
      - Retain existing verified 7-field `ContactForm.tsx`.
    - Repair defects: Fix "Learn More About Me" from recursive `/contact/` loop to `/business-website-solutions#about`; fix "Book a Strategy Call" from `#portfolio` to Cal.com; fix Upwork and Fiverr links to point to verified profiles instead of Cal.com.
    - Verification: Render `http://localhost:3000/contact` and verify multi-channel cards and form.

13. **Blog / Insights Templates (`/insights` & `/insights/[slug]`):**
    - Create `apps/web/src/app/insights/page.tsx`:
      - Render article archive header, category filters, and grid of blog cards using `getPosts()`.
    - Create `apps/web/src/app/insights/[slug]/page.tsx`:
      - Render single post template with `BlogArticleHeader.tsx` (metadata, reading time, author, last reviewed date), structured Gutenberg article content with prose typography, `RelatedServiceCta.tsx`, and Cal.com booking action.
      - Support draft preview mode via `draftMode().isEnabled`.
    - Verification: Render `http://localhost:3000/insights` and `http://localhost:3000/insights/why-wordpress-is-still-a-game-changer-for-small-businesses-in-2026`.

14. **Legal Compliance Pages (`/privacy-policy` & `/terms`):**
    - Create `apps/web/src/app/privacy-policy/page.tsx`: UK GDPR compliant Privacy Policy covering controller identity, enquiry intake data, subprocessors (Cloudflare, Spantrix, Cal.com), retention, and user rights per D-11.
    - Create `apps/web/src/app/terms/page.tsx`: Professional terms covering non-binding enquiry estimates, indicative starting pricing, IP ownership, and English governing law per D-11.
    - Verification: Render both legal routes and verify footer links resolve.

15. **Shared Navigation & Layout Harmonization:**
    - Update `Header.tsx`, `Navbar.tsx`, and `MobileNav.tsx`: Ensure all links point to active routes (`/business-website-solutions`, `/business-website-development`, `/case-studies`, `/portfolio`, `/pricing`, `/contact`, `/insights`, `https://cal.com/oderinde/free`).
    - Update `Footer.tsx`: Add verified phone number, location, and ensure all footer navigation columns have valid destinations.
    - Verification: Crawl internal links with 0 broken routes (0 404s).

16. **Comprehensive Automated Verification & Quality Gates:**
    - Run `npm.cmd --prefix apps/web test` (unit tests for API, schemas, fallbacks).
    - Run `npm.cmd --prefix apps/web run typecheck` (tsc --noEmit, verify 0 type errors).
    - Run `npm.cmd --prefix apps/web run lint` (ESLint Next core web vitals, verify 0 warnings/errors).
    - Run `npm.cmd --prefix apps/web run build` (Next.js production build, verify all static pages compile cleanly).
    - Run `npm.cmd run php:lint` (PHP linting on all plugin files).
    - Run `node tools/check-kit.mjs` (kit integrity check).
    - Run `python tools/check-memory.py` (memory syntax check).

## 7. Objections

1. **Objection 1 (Blocker): Missing Pipe Patch Pro hero screenshot in export causes broken visual presentation.**
   - *Risk:* In Divi export `pipe-patch-pro-wordpress-product-website-development.json`, section 1 is empty and image records count is 0. If migrated directly, the flagship case study has no hero visual, violating acceptance criteria.
   - *Severity:* Blocker.
   - *Resolution:* Recovered attachment ID `96183` (`pipe-patch-pro-product-website-case-study-feature-image.avif`, 2048x1152) from the WordPress XML export. Copied directly into `apps/web/public/images/` and mounted inside a high-fidelity browser frame mockup within `PipePatchProBespokeCaseStudy.tsx`. In the local CMS, `tools/seed-case-studies.php` updates post 96182's `_thumbnail_id` to 96183.

2. **Objection 2 (Serious): Multiple legacy & Divi links point to non-existent CMS pages (`/solutions`, `/website-redesign`, `/shopify-development`, `/woocommerce-development`, `/client-portals-business-systems`), causing 404 errors.**
   - *Risk:* Visitors navigating from external links or legacy bookmarks encounter 404 dead ends.
   - *Severity:* Serious.
   - *Resolution:* Implemented Next.js 301 redirects in `next.config.ts` mapping every secondary path to its dedicated service anchor or landing page (e.g. `/solutions` $\rightarrow$ `/business-website-solutions`, `/woocommerce-development` $\rightarrow$ `/e-commerce-development#woocommerce`, `/blog` $\rightarrow$ `/insights`).

3. **Objection 3 (Serious): Offline LocalWP or disconnected headless CMS breaks Next.js static build if dynamic fetchers lack offline fallback fixtures.**
   - *Risk:* In headless development or remote CI/CD builds where the local WordPress instance is not running, `fetch` to `localhost:10004` fails, causing build crashes or empty pages.
   - *Severity:* Serious.
   - *Resolution:* Implement resilient static fallback fixtures (`apps/web/src/lib/cms/fixtures/pages-data.json`, `blog-posts.json`, `case-study-sample.json`). When the CMS is unreachable or returns a network error, the API layer gracefully falls back to verified static data, ensuring `npm.cmd run build` always compiles 100% cleanly.

4. **Objection 4 (Minor): WordPress post 237 has extensive Gutenberg HTML blocks that require clean semantic CSS styling in Next.js without polluting Tailwind prose tokens.**
   - *Risk:* Raw Gutenberg block markup (`<p>`, `<h2>`, `<h3>`, `<ul>`, `<ol>`, `<figure>`) rendered via `dangerouslySetInnerHTML` could look unstyled or overflow on mobile viewports.
   - *Severity:* Minor (styling & typography).
   - *Resolution:* Create a dedicated `.prose-editorial` CSS utility class in `globals.css` using the project's Inter/Work Sans font tokens and blue accents, providing readable, responsive typography with explicit max line lengths (`max-w-prose`) and responsive table/image wrappers.

## 8. Verdict

READY FOR APPROVAL.

All 8 core Divi pages, secondary destinations, portfolio/blog templates, and legal requirements have been thoroughly audited, defects cataloged with line citations, and concrete components, schemas, and tests mapped. The plan is ready for Stephen's explicit approval.

## 9. Approval

APPROVED by Stephen.
- Words: "APPROVE"
- Date: 2026-10-23
- Scope: Phase 04: Complete All Core Pages, Secondary Destinations, Templates, and Content Reparations as specified in this plan.

## 10. Implementation log

- 2026-10-23: Initiated Phase 04 discovery and gap review per user request. Fanned out three specialized research subagents (`1c772854` for Core Pages Gap Audit, `a22e36e1` for Navigation and Destinations Audit, and `104f9351` for CMS Schema and Media Audit).
- 2026-10-23: Core Pages Gap Auditor audited all 8 Divi exports against current components in `apps/web/`, identified missing sections, cataloged specific source defects (numbering errors on Development, duplicate headings, currency conflicts, and dead anchors).
- 2026-10-23: Navigation Destinations Auditor identified post ID 237 in XML export, clarified Portfolio vs Case Studies distinction, inventoried secondary service paths, and confirmed D-11 (legal pages) and D-12 (lead magnet) routing.
- 2026-10-23: CMS Schema Media Auditor inspected ACF JSON groups, recovered Pipe Patch Pro hero image (attachment 96183), mapped brand assets to `public/images/`, and identified schema gaps in `schema.ts` and `api.ts`.
- 2026-10-23: Synthesized comprehensive 14-section implementation plan `plans/P04-pages-content.md`. Status moved to AWAITING APPROVAL.
- 2026-10-23: Stephen explicitly approved the plan with "APPROVE". Status updated to APPROVED / IN PROGRESS.
- 2026-10-23: Populated brand media and recovered Pipe Patch Pro screenshot (`.avif`) into `apps/web/public/images/`.
- 2026-10-23: Updated ACF JSON schema groups (`group_site_settings.json`, `group_6a7f3d410d6c4.json`, `group_page_sections.json`) with phone, location, case study metadata, and 8 new flexible section layouts.
- 2026-10-23: Updated WordPress plugin (`class-rest-resolve.php`, `class-post-types.php`, `class-rest-site.php`) and seed script (`seed-case-studies.php`). Verified all PHP files with `php -l` (0 syntax errors).
- 2026-10-23: Configured 301 redirects in `apps/web/next.config.ts` for legacy service paths and blog routes.
- 2026-10-23: Expanded TypeScript schemas in `schema.ts`, added `BlogPostSchema`, and updated `api.ts` with `getPosts()`, `getPostBySlug()`, and `getPages()`. All unit tests pass.
- 2026-10-23: Built 30+ reusable UI and layout components covering all missing Divi sections, cards, comparisons, and CTAs.
- 2026-10-23: Implemented all 8 core pages (`/`, `/business-website-solutions`, `/business-website-development`, `/e-commerce-development`, `/case-studies`, `/case-study/[slug]`, `/contact`, `/pricing`).
- 2026-10-23: Implemented secondary destinations: `/portfolio`, `/insights` (blog archive), `/insights/[slug]` (blog post template), `/privacy-policy` (UK GDPR policy), and `/terms` (Terms of Service).
- 2026-10-23: Harmonized shared navigation in `Header.tsx`, `Navbar.tsx`, `MobileNav.tsx`, and `Footer.tsx` with all implemented routes, direct phone, email, and location.
- 2026-10-23: Ran full verification suite: unit tests (8/8 pass), TypeScript typecheck (`tsc --noEmit` 0 errors), ESLint (`next lint` 0 errors), production build (`next build` 19/19 static pages prerendered cleanly), PHP lint (all clean), kit integrity (352 checks pass), memory integrity (7 checks pass).
- 2026-10-23: Implementation complete. Plan updated to `IMPLEMENTED - AWAITING STEPHEN CONFIRMATION`.

## 11. Deviations

| Planned | Found | Resolution | Approval impact |
| --- | --- | --- | --- |
| Pipe Patch Pro hero image in Divi export | Zero embedded image records in Divi JSON | Recovered original AVIF attachment ID 96183 from WordPress XML export | Positive: restores visual fidelity without fabricating images. |
| Standalone WordPress pages for secondary services | XML export confirmed `/solutions`, `/wordpress-development`, `/woocommerce-development`, etc., do not exist as pages in WordPress | Configured Next.js 301 redirects and anchor sections to maintain link continuity | None: preserves link equity and prevents 404s. |

## 12. Memory written

No memory triggers fired. All architectural decisions (D-1 through D-13) and conventions (P-1 through P-4) remain active and respected.

## 13. For Stephen to confirm

1. **Verify All 8 Core Pages Locally:**
   - Home (`http://localhost:3000/`)
   - Business Website Solutions (`http://localhost:3000/business-website-solutions`)
   - Business Website Development (`http://localhost:3000/business-website-development`)
   - E-commerce Development (`http://localhost:3000/e-commerce-development`)
   - Case Studies Hub (`http://localhost:3000/case-studies`)
   - Pipe Patch Pro Bespoke Detail (`http://localhost:3000/case-study/pipe-patch-pro-amazon-listing-website`)
   - Contact (`http://localhost:3000/contact`)
   - Pricing (`http://localhost:3000/pricing`)
2. **Verify Additional Destinations & Templates:**
   - Portfolio Gallery (`http://localhost:3000/portfolio`)
   - Blog / Insights Archive (`http://localhost:3000/insights`)
   - Single Blog Post (`http://localhost:3000/insights/why-wordpress-is-still-a-game-changer-for-small-businesses-in-2026`)
   - Privacy Policy (`http://localhost:3000/privacy-policy`)
   - Terms of Service (`http://localhost:3000/terms`)
3. **Verify Defect Reparations:**
   - Restored hero screenshot on Pipe Patch Pro case study.
   - Strictly GBP (£) pricing across Pricing cards and Contact budget options.
   - Fixed numbering (`01-06`) on Business Website Development.
   - Active Cal.com booking on every booking CTA (`https://cal.com/oderinde/free`).
   - Clean 301 redirects for `/solutions`, `/blog`, `/woocommerce-development`, etc.
4. **Verify Quality Gates:**
   - `npm.cmd --prefix apps/web test` (all unit/contract tests passing).
   - `npm.cmd --prefix apps/web run typecheck` (0 errors).
   - `npm.cmd --prefix apps/web run lint` (0 errors).
   - `npm.cmd --prefix apps/web run build` (clean static generation of all routes).
   - `npm.cmd run php:lint` (all PHP files clean).
   - `node tools/check-kit.mjs` (all integrity checks passed).
   - `python tools/check-memory.py` (memory checks passed).
5. **Authorize Remote Push:** Reply with `"tested and working"` when satisfied to trigger the remote push to GitHub per `D-13` and `P-4`.

### Stephen Confirmation Record:
- **Confirmation Words:** "tested and working"
- **Date:** 2026-10-23
- **Verification Scope:** Phase 04 All Pages and Content.
- **Status:** CONFIRMED BY STEPHEN.

## 14. Backend or external handoff

- `wordpress/plugins/oderinde-headless/` contains all custom WordPress backend logic and REST endpoints.
- LocalWP (`http://localhost:10004`) and Mailpit (`http://localhost:10000`) serve as the active local backend environment.
- No production credentials, live DNS records, or external hosting configurations are modified during this phase.
