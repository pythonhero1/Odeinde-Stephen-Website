# OderindeStephen.com: headless WordPress build plan

Version: 1.0 | Prepared: 22 October 2026 | Owner: Stephen

Status: READY FOR REVIEW. The architecture below is a recommendation, not a record of approval or implementation. Target launch: 24 October 2026, Africa/Lagos time. This is a separate migration plan; it does not replace the approved 11 October master document.

## 1. Result to build

Rebuild the public website with a fast, accessible frontend while keeping WordPress as the place to manage pages, services, case studies, blog posts, media, SEO values, and enquiries. Retain the homepage's dark technology aesthetic and blue accents, improve the imperfect Divi layouts, and finish the incomplete pages locally before pushing the release to GitHub and migrating production.

All booking actions use the shared setting `https://cal.com/oderinde/free`, recovered from the supplied exports. Verify that the event is active before launch. The existing portal destination is `https://portal.oderindestephen.com/`; check its availability and published promises. Authentication and the portal application remain a separate project.

This is an enquiry and services website. Examples of client ecommerce functionality describe Stephen's services; they do not authorize adding a shop, checkout, or payment processing to this marketing website.

## 2. Confirmed facts and boundaries

| Item | Evidence and treatment |
| --- | --- |
| Computer | Windows; Antigravity v2.24.0; Node.js and Git installed. Verify their exact versions locally. |
| Starting code | No frontend code or GitHub repository exists. Create one repository after plan approval. |
| Current CMS | WordPress with Divi 5. Exported blocks contain several Divi versions; do not infer the installed version from a single block. |
| Hosting and DNS | Domain/hosting at Spantrix; authoritative nameservers managed by Cloudflare. |
| Hosting screenshot | BETA plan: 15 GB SSD, 40 GB bandwidth, unlimited subdomains, five additional websites/addons, email accounts, SSL, and daily backup advertised. Actual usage, retention, restore capability, PHP limits, and Node hosting are unverified. |
| Existing plugins | Rank Math, Visitor Traffic Pro, Link Whisper Premium, Imagify, ACF Pro. Exact versions and compatibility need inspection. |
| Content | Improve existing content and assets. Export other required material from WordPress. Do not invent business evidence, reviews, prices, or delivered outcomes. |
| Design | Keep close to the Divi reference while making reviewed improvements. English initially; global audiences; mobile, tablet, and desktop; WCAG 2.2 AA target. |
| Workflow | Ask Stephen for approval before implementation. Finish locally and push to GitHub before migration. |

Do not infer a monthly frontend hosting budget from permission to use premium WordPress plugins. Paid hosting activation is an explicit review item.

## 3. Recommended stack and why

| Layer | Recommendation | Purpose |
| --- | --- | --- |
| Main language | TypeScript in strict mode | Typed content contracts and maintainable frontend code. |
| Frontend | Next.js App Router with React | Server rendered HTML, metadata, preview, incremental regeneration, and a small set of server endpoints. |
| Styling | Tailwind CSS plus CSS design tokens | Reusable spacing, typography, colors, gradients, and responsive components. Use rem for typography. |
| CMS | Existing WordPress database/content, migrated through a clone | Retain editorial ownership and avoid replacing the CMS. |
| Page editing | ACF Pro Flexible Content and repeaters | Add and reorder an approved set of sections without breaking their design. |
| Blog editing | Native WordPress block editor with a documented supported block set | Familiar publishing; server render supported content safely. |
| Data | WordPress REST API with ACF's REST visibility enabled only for intended public fields | Reuse existing capabilities and avoid an extra GraphQL adapter dependency. |
| CMS integration | One small project owned PHP plugin | Public site settings, path resolution, signed preview/revalidation, and private enquiry intake. |
| Validation | Zod for external data and submissions | Fail clearly when CMS data differs from the agreed contract. |
| State | Server Components; local React state for interactive controls | Keep content pages light. Global client state is unnecessary for this scope. |
| Forms and email | Next.js form endpoint, private WordPress enquiry records, WordPress mail via FluentSMTP or the verified existing SMTP setup | WordPress retains enquiries and email administration. Confirm delivery to the real inbox. |
| Abuse protection | Cloudflare Turnstile, honeypot, persistent rate limiting, input limits | Protect public enquiry/resource endpoints. Verify tokens on the server. |
| Frontend hosting | Vercel Pro, recommended subject to cost approval | Managed deployment, previews, image delivery, and native Next.js hosting. |
| CMS hosting | Spantrix, proposed at `cms.oderindestephen.com` | Keep WordPress on PHP hosting. Confirm DNS, SSL, storage, and server limits first. |
| Version control | Git and a private GitHub repository | Version source, CMS integration, field definitions, approved public content, and deployment history. |
| Verification | ESLint, TypeScript, Playwright, axe accessibility checks, Lighthouse/PageSpeed, PHP syntax and integration checks | Verify critical behavior and rendered output. Add focused unit tests for URL, signature, and metadata logic. |

Use a supported Node LTS release compatible with the selected Next.js version. During setup, verify the current stable Next.js/React/Tailwind versions against official documentation, record the exact installed versions, and commit the npm lockfile. Use stable APIs. Do not blindly upgrade dependencies after the release candidate is tested. The Next.js installation documentation checked on 22 October showed v16.4.2 and a Node minimum of 20.9; a minimum is not the recommended production Node version. [S1]

Choose Next.js here for the integrated preview, publishing, SEO, forms, and cache workflow. Astro is a strong alternative for a primarily static content site, but would require a different preview and regeneration design. Keeping Divi would preserve its editor but would not deliver this requested separate frontend. ACF plus REST fits the existing licenses and the modest content model; WPGraphQL can be revisited only if measured API needs justify it.

Vercel's Pro documentation currently lists a USD 20 monthly platform fee including one deploying seat and USD 20 usage credit, with additional usage/addons possible. Commercial production should not be planned on Hobby, whose terms restrict it to personal/noncommercial use. Confirm price, taxes, usage limits, alerts, and Stephen's budget before activation. If declined, revise the hosting plan before building deployment specific features. The Spantrix screenshot does not establish that it can run this Next.js application. [S6, S7]

## 4. What WordPress editing will look like

1. Open WordPress and choose a page.
2. Edit its hero, text, images, service cards, FAQs, related projects, and calls to action through named ACF fields.
3. Add or reorder approved section types. Typography, colors, and layout rules remain in the frontend design system.
4. Click Preview to open a private, authenticated preview of the actual frontend.
5. Publish or update. A signed CMS event refreshes the affected page and dependent listings.
6. Verify the result on the public URL. Routine publishing must not require a developer to rebuild the whole site.

The proposed editing system replaces Divi's page layout editor for migrated pages. Divi JSON provides reference content, settings, and embedded assets; React components must be built and CMS content mapped explicitly.

Use the WordPress block editor for blog articles. Document supported paragraphs, headings, lists, links, quotes, images, galleries, tables, and code. Unsupported blocks need a reviewed fallback. Do not expose raw Divi markup or unresolved `$variable(...)$` expressions on the frontend. ACF groups must explicitly opt into REST visibility. [S2]

## 5. Source audit and launch scope

The eight supplied exports parsed with zero parser errors. They contain 124 embedded image records representing 78 unique byte hashes, about 10.8 MB decoded. These are recoverable references, not a complete WordPress/media backup. An image module count can exceed the number of embedded files. The JSON files do not prove current publication status or rendered appearance.

| Required source | Source ID | Expected public route, subject to URL inventory | Work required |
| --- | --- | --- | --- |
| Website Development & Digital Solutions _ Oderinde Stephen.json | 14 | `/` | Improve homepage hierarchy, connect buttons, resolve project/article loops and resource CTA, port portal illustration accessibly. |
| Business Website Solutions (1).json | 96112 | `/business-website-solutions/` | Complete solution paths and related content; correct CTA destinations. |
| Business Website Development(1).json | 96116 | `/business-website-development/` | Improve cards and copied labels, complete dynamic work and article sections, consistent numbering and booking links. |
| E-commerce Development(1).json | 96119 | `/e-commerce-development/` | Finish the full service page, commerce evidence, comparison, CTA anchors, and Cal.com booking destination. |
| Case Studies.json | 96083 | `/case-studies/` | Resolve case study and portfolio queries, custom fields, archive cards, filters if present, and links. |
| Pipe Patch Pro WordPress Product Website Development.json | 96182 | Preserve actual permalink; proposed nested case study route only if needed | Restore the empty hero, visual evidence, and real images; verify delivery claims and payment activation qualifications. |
| Contact.json | 96339 | `/contact/` | Replace the native Divi form, connect seven fields, verify recipient and SMTP, repair booking and About links. |
| Pricing.json | 96380 | `/pricing/` | Improve cards; confirm displayed GBP starting prices, scope statements, and budget currency; fix several unrelated links. |

The source audit is in `docs/source-audit.md`; per-page evidence and block locators are under `reference/normalized/`. Do not carry source IDs into permanent frontend routing logic.

Additional link destinations found in the exports include `/portfolio/`, `/insights/`, `/website-redesign/`, `/client-portals-business-systems/`, `/wordpress-development/`, `/woocommerce-development/`, `/shopify-development/`, and `/solutions/`. Homepage About and resource buttons also need destinations. No dedicated exports were supplied for those destinations. Their live existence and completion are UNVERIFIED.

Phase 0 must resolve every destination by exporting and migrating its existing page, writing a distinct approved page, or obtaining approval for an appropriate link change. A blog index and individual article template are required for publishing; article cards must point to actual articles. Portfolio and case studies can share project records while retaining different presentation and existing URLs. Do not create empty service pages, fabricated articles, or generic redirects to make a link checker pass. Do not silently remove any of the eight supplied pages to meet the date.

Also inventory the global header/footer, navigation, legal pages, forms, lead magnet, review sources, active post types, existing posts, ACF groups, redirects, metadata, and full media library. There were no separate Theme Builder/header/footer exports or complete WordPress backup in these attachments.

## 6. Architecture and content contract

| Public address or function | Runtime owner | Notes |
| --- | --- | --- |
| `https://oderindestephen.com` | Next.js frontend | Preserve existing paths, canonical host, and trailing slash behavior based on the baseline. |
| `https://cms.oderindestephen.com` | Proposed WordPress CMS on Spantrix | Admin/API/media; validate availability, SSL, and any wildcard DNS before adopting. |
| `http://localhost:3000` | Local Next.js | Connect to a local CMS clone during development. |
| A Local site such as `https://oderinde-cms.local` | Local WordPress | The exact hostname is selected locally; trust its certificate. |
| Booking | Cal.com link | Redirect users to the shared URL; no new booking engine or embedded calendar is needed. |
| Client portal | Existing external portal application | Verify the link and availability separately. |

Use one repository, with the frontend under `apps/web`, CMS integration under `wordpress/plugins/oderinde-headless`, field definitions under `wordpress/acf-json`, and reviewed public migration content under `content/approved`. Keep WordPress core, licensed plugin binaries, database dumps, credentials, and complete production media backups outside Git.

Proposed page fields: template kind, hero, ordered sections, related project/post references, and CTA references. Initial section types: hero, text/image, service or benefit cards, platform comparison, process steps, project grid, verified testimonial block, FAQ, pricing CTA, resource CTA, and closing CTA. Add a new section type only for a real requirement. Put navigation, footer, business identity, contact details, social links, and booking URL in one public site settings model.

Inspect the actual case study/portfolio post types before choosing a REST base. Retain existing field meanings such as `technology_1`, `technology_2`, `technology_3`, and `verified_outcome` where suitable. If none exists, propose a `case_study` post type; do not create a duplicate merely because an export contains a loop. Register post type and field definitions in versioned code; use ACF local JSON for field schema, loaded/saved through the project plugin. Store content in WordPress and generate reviewed migration exports separately. ACF local JSON is not a content backup.

Integration contracts below are proposed work, not existing endpoints:

| Interface | Definition and acceptance requirement |
| --- | --- |
| Core REST reads | Use WordPress pages/posts/media and the verified case study REST base. Read all paginated results, not only the first ten. Capture real `OPTIONS` schemas and responses. [S4] |
| `GET /wp-json/os/v1/site` | New public allowlist of approved site settings. Never return SMTP settings, secrets, private leads, users, or internal option values. |
| `GET /wp-json/os/v1/resolve?path=...` | New resolver for full public paths and nested URLs; only published, public content. Return a validated type/ID/path or a real 404. |
| `POST /wp-json/os/v1/enquiries` | New server-to-server intake, authenticated with a timestamped HMAC over the exact request body. Validate replay window, fields, submission key, and abuse controls. Save private enquiry before acknowledging receipt; notify through WordPress mail. |
| `POST /api/enquiry` | New public Next.js handler. Validate Zod schema, request size, origin, Turnstile and honeypot; enforce persistent rate limits; forward a minimal payload to WordPress. Never expose the bridge secret. |
| `GET /api/preview` and preview exit | New signed, short lived CMS preview link. Validate signature, expiry, content ID/type, and allowed destination. Fetch drafts server side using a dedicated least privilege WordPress application password over HTTPS. Exit with POST. No draft data in public cache. [S5, S8] |
| `POST /api/revalidate` | New signed event handler with an explicit event/path allowlist. Refresh affected detail paths, old slug, archives, homepage references, metadata and site settings as appropriate. Reject arbitrary URLs and invalid signatures. |

Finalize request/response schemas in `docs/contracts.md` before implementation. A designed endpoint may be implemented once its plan is approved; do not claim it was found in the current site. Verify errors, timeouts, unauthorized requests, duplicates, and private/draft access. Do not solve server-side requests by allowing unrestricted browser CORS or exposing service credentials.

For the first release, explicitly choose conventional Next.js fetch caching/ISR with Cache Components disabled during scaffolding. Cache published reads with explicit tags and a bounded fallback lifetime. Use authenticated publish hooks after ACF/meta writes complete. Cover publish, update, unpublish, delete, slug changes, media references, menus, and Rank Math changes. Use the invalidation APIs appropriate to the pinned Next.js version. A stale-while-revalidate response is not proof of immediate refresh; test subsequent requests and deletion/unpublication separately. Preview and form routes must bypass caches.

## 7. Existing plugins in the new system

| Plugin | Keep/manage in WordPress | Frontend work required |
| --- | --- | --- |
| Rank Math | Titles, descriptions, social metadata, schema inputs, editorial SEO and existing redirects inventory. Enable documented headless support. | Fetch the documented `getHead` response server side, parse an allowlist, map to Next.js metadata and validated JSON-LD. Verify public canonicals and schema URLs. Do not paste arbitrary head HTML or duplicate metadata. [S3] |
| ACF Pro | Approved section fields, settings and case study data. | Typed renderers and media/link mapping. Test revisions and draft preview with real fields. |
| Imagify | Optimize source media and keep appropriate originals. | Responsive images, correct sizes/dimensions and limited origins. Avoid repeated lossy recompression. Preserve the fixed homepage hero crop. |
| Link Whisper Premium | Editorial linking assistance where it can inspect the actual content fields. | Render the approved links; audit the public crawl. Verify ACF coverage before relying on its suggestions. |
| Visitor Traffic Pro | Retain existing data; identify the exact plugin/version. | PHP theme tracking may not measure frontend visits. Verify a supported tracking method. Recommended fallback: GA4 on the frontend with reviewed consent behavior; do not report backend traffic as public traffic. |

Plugin installation does not automatically provide React rendering, tracking, WordPress redirect execution, image loading behavior, or public SEO output. Redirects must execute on the frontend hosting layer after cutover. The public sitemap and robots files will be owned by the frontend.

## 8. Design, content, and functional acceptance

Use the homepage as the brand reference: dark backgrounds around `#07090D`, dark cards around `#0E1219`, primary blue `#2563EB`, readable blue heading highlights such as `#3B82F6`, primary text `#F5F7FC`, and reviewed muted text. Source exports also contain navy gradients, cyan, and inconsistent alternatives; consolidate by role. Verify contrast on the rendered background rather than assuming every blue is readable at small sizes.

Preserve Inter for headings/UI, Work Sans for body, and Space Mono for labels where verified. Obtain legitimate font files and self host or use the framework font pipeline. Use rem typography, fluid sizing, sensible line lengths, consistent card heights and focus states. Improve repeated/copied headings and section spacing. Maintain first-person singular business copy, avoid em dashes, and use blue emphasis sparingly. These are source/past project conventions, not permission to change the brand.

Review at 360, 390, 768, 1024, and 1440 CSS pixel widths, plus an intermediate layout and zoom. Test keyboard navigation, focus order, mobile menu, FAQ controls, contrast, form labels/errors, accessible names, reduced motion, image alternatives, and horizontal overflow. The portal illustration must identify sample data as an illustration rather than live client activity; controls that remain interactive must work with keyboard and touch.

Specific source repairs:

- Home: connect missing work/About/resource/insights/project CTAs; replace placeholder review text and unresolved loops with approved content.
- Contact: seven fields are name, email, optional company/website, service, optional budget, optional timeline, and project message. Its Divi admin label explicitly says to set the recipient. `Contact@oderindestephen.com` is present in public contact copy; confirm mailbox ownership and real delivery before configuring it. Do not treat it as proven form configuration.
- Booking: every booking button uses the shared Cal.com setting, including the Contact hero currently linking to `#portfolio` and Ecommerce booking currently going to Contact.
- Pricing: exported starting amounts are GBP 450, 250, 400, and 700; Contact budget options use USD. Preserve them as source evidence pending Stephen's content approval, then adopt a clear approved currency policy. Do not convert amounts or change prices automatically.
- Case studies: inspect actual CPT records and associated images; do not output raw loop fields. Pipe Patch Pro has an empty first section and zero embedded image records; recover its visual evidence from WordPress. Its copy qualifies direct payment activation as dependent on client onboarding; do not remove that qualification or imply verified sales increases.
- Reviews: verify testimonials, platform profiles, rating counts, and permission to publish. Do not migrate placeholder stars or third-party product reviews as Stephen's own customer reviews.
- Resource CTA: the checklist asset and delivery mechanism have not been supplied. Export the real asset or draft and obtain approval for the promised resource and delivery flow. No fake success/download interaction.

Create a functionality matrix with each CTA/form/filter/control, intended behavior, source, owner, and test result. Finish every in-scope item or flag a real blocker for Stephen. A fixed layout alone does not satisfy functional completion.

## 9. SEO, preview, and performance acceptance

Before changes, capture all current public URLs/status codes, titles, descriptions, canonicals, robots directives, schema, sitemap URLs, internal links, media URLs, redirects, and Search Console baseline. JSON export filenames are not a URL inventory. Preserve valuable URLs, publication dates, and content intent. A change to a live slug needs an approved one-hop permanent redirect.

On the frontend verify HTML responses include substantive text without requiring client JavaScript, one appropriate H1, unique title/description, correct canonical, social metadata, sensible breadcrumbs, valid applicable structured data, working internal links, and a sitemap containing only canonical indexable public URLs. A real unknown route returns 404. Drafts, private content, preview URLs and staging must not enter the public sitemap or cache.

Use Rank Math's documented `GET /wp-json/rankmath/v1/getHead?url=...` endpoint for the CMS equivalent URL. Parse its supported metadata server side; translate CMS origins and `@id` values to public equivalents where appropriate, while retaining legitimate media and external URLs. Keep one owner for each schema entity to avoid duplication. The production CMS's global search visibility setting must not unintentionally make Rank Math return `noindex` for every public frontend page. Protect/redirect CMS HTML separately from public SEO intent; preview/staging still require authentication and noindex. [S3]

Duplicate CMS HTML should redirect to its matching public page after cutover or receive appropriate HTML-only noindex handling, excluding admin, REST, and assets. Do not broadly disallow the whole CMS or apply an indiscriminate noindex header to image files needed for indexing. Old `/wp-content/uploads/...` URLs at the public domain must continue to resolve, for example with precise redirects to preserved CMS media paths. Do not change WordPress GUIDs merely to rewrite domains. Use a serialized-data-aware migration tool and dry runs.

Target good field Core Web Vitals: LCP at most 2.5 seconds, INP at most 200 ms, CLS at most 0.1 at the 75th percentile, assessed separately for mobile and desktop. Prelaunch lab results are diagnostics, not a guarantee of field results. Use fixed image dimensions, responsive sizes, lazy loading below the fold, an intentional hero image, little client JavaScript, deferred third-party scripts, and no embedded booking widget unless separately approved. Rank Math scores and headless architecture do not guarantee search rankings or AI citations. [S12]

Private preview must show current unpublished changes, including ACF edits, and leave normal visitors on the published version. Verify unauthenticated access fails and exit preview restores public rendering. WordPress updates must invalidate all dependent frontend content without a full redeploy. Test CMS downtime, slow reads, empty results, malformed responses, unpublish/delete, and stale cache behavior. Preserve previously cached public content on a temporary upstream failure where safe; never substitute draft/mock data or turn a server failure into a false 404.

## 10. Implementation phases and gates

For each phase, use the corresponding file in `prompts/`. Antigravity first writes a concrete plan in `plans/` with the 14-section template, real objections, exact file list and acceptance criteria. It then waits for Stephen's `APPROVE` or `APPROVE WITH CHANGES`. Research and planning documentation can continue without that implementation approval. Approval for one plan covers its listed steps; it is not a reason to interrupt every command. A separate approval is required for scope changes and production cutover.

| Phase | Work and deliverables | Acceptance gate |
| --- | --- | --- |
| 00 Discovery and scope | Read the kit; inventory all eight exports, current URLs, missing destinations, backups, plugins, content types, hosting, headers/footer, assets, email and tracking. Consolidate any remaining owner-only inputs in one list. | `docs/readiness.md`, route/feature matrix, backup/restore evidence and revised scope are reviewed. No guessed credentials/contracts. |
| 01 Windows and repository | Follow `START-HERE.md`; validate Node/Git; initialize one private repo; scaffold `apps/web`; record pinned versions and scripts; set up local WordPress clone and approved HTTPS origin. | Frontend and local CMS run; git ignores secrets/backups; no production changes. |
| 02 CMS content model | Implement the project PHP plugin, ACF field schema, settings, route resolver, content migration mapping, and captured API contracts. Recover dynamic data/media from real WP export. | Real page/project/post data and settings available; private data excluded; field editing persists. |
| 03 Vertical slice and design system | Define tokens and shared header/footer. Build a complete homepage/service slice, one case study, Contact, and working private preview/revalidation against real local CMS data. | Stephen approves visual direction; an edit/preview/publish round trip works; form storage and mail integration are demonstrated. |
| 04 All pages and content | Complete all eight sources, every approved linked destination, portfolio/blog templates and approved articles, shared navigation/legal/resource content. Improve copy and assets. | Content review, route matrix and functionality matrix show every in-scope item implemented. No missing hero, source placeholders, mock reviews, or broken CTAs. |
| 05 SEO and integrations | Rank Math metadata adapter, schema, sitemap, robots, redirects, image URL continuity, analytics/consent, Cal links, portal link, resource delivery and any approved search/filter. | Rendered SEO matches approved intent and public domains; all integrations have real evidence. |
| 06 QA and release candidate | Production build; typing/lint; critical browser flows; manual responsive/accessibility check; link/SEO crawl; email delivery; security/cache/draft isolation tests. | No unresolved critical or serious launch defects. Record limitations honestly and fix failures. |
| 07 GitHub release | Commit reviewed source, field schema, content migration data and checks; push the complete locally verified release to GitHub; create a pre-migration tag. | Remote commit/tag verified; clean build reproduced from the pushed source. This precedes CMS/DNS migration. |
| 08 Remote staging and CMS cutover preparation | Clone verified CMS to the approved Spantrix subdomain, test SSL/API/media/email, deploy the pushed commit to protected remote preview, set separate environment secrets and safe cache rules. | Remote preview renders real CMS data; private draft preview works; rollback assets and DNS records recorded; Stephen reviews readiness. |
| 09 Production migration and handover | Obtain explicit cutover approval, freeze edits briefly, sync final content, change only approved DNS records, verify public behavior, then hand over editing and recovery instructions. | Main domain serves tested release; form/inbox, booking, metadata, redirects, media and admin work; Stephen confirms completion. |

Remote Vercel previews cannot reach a `.local` WordPress hostname. Phase 08 uses an HTTPS CMS reachable from the hosting platform. Keep remote preview protected and noindex; set its actual origin in its own environment rather than leaving localhost values.

## 11. Windows setup and commands

Detailed steps are in `START-HERE.md`. Extract the ZIP to a short local path such as `C:\Projects\oderindestephen-headless`, outside a WordPress document root and preferably outside a synced desktop folder. Open that root in Antigravity.

After Phase 01 approval, use PowerShell commands one at a time:

```powershell
node --version
npm.cmd --version
git --version
git init -b main
npx.cmd create-next-app@latest apps/web --use-npm
```

Choose custom setup: TypeScript yes, ESLint, Tailwind yes, `src` directory yes, App Router yes, React Compiler no initially, Cache Components no for the agreed initial cache model, import alias `@/*`. If scaffolding creates a nested `AGENTS.md`, inspect it and make it explicitly additive to the root protocol, within the approved setup plan. Do not overwrite the root rules with framework defaults. Verify actual prompts against the installed version rather than assuming the wizard never changes. [S1]

```powershell
node tools/audit-divi.mjs
node tools/audit-divi.mjs --extract-assets
npm.cmd --prefix apps/web run dev
```

The audit commands only process local reference files. The extraction command writes recoverable images under `reference/assets`; select and optimize production assets deliberately. The file formats may include SVG, which needs sanitization before public use.

Create documented `lint`, `typecheck`, `test`, and `test:e2e` scripts during implementation, then use `npm.cmd --prefix apps/web run ...`. For npm's transient CLI use `npx.cmd` or run commands from `apps/web`. The adapted memory checker uses Python's standard library; run `py -3 tools/check-memory.py` on Windows if Python is installed. The supplied Node `tools/check-kit.mjs` is the initial integrity check and does not need Python.

GitHub creation/sign-in is owner controlled. Create a private repository, copy its exact HTTPS remote URL, and add it locally. Push only after inspecting staged files. Do not put WordPress application passwords, `.env` files, uploads/database backups or licensed plugin ZIPs in GitHub. GitHub Actions should run clean installation, lint, typecheck, focused tests and production build; integration fixtures must be explicitly marked fixtures, not a substitute for the real CMS release checks.

## 12. Environment, deployment and migration

Document every variable in `docs/environment.md`. Server-only values include CMS origin, preview application username/password, preview signing secret, revalidation secret, CMS bridge secret and Turnstile secret. Browser visible values are restricted to intended public origins/site keys/analytics IDs. Never prefix a secret with `NEXT_PUBLIC_`. Separate local, protected preview, and production values. Generate secrets locally and store them through WordPress/server configuration and frontend hosting secrets; do not ask for them in chat.

At Vercel, set project root to `apps/web`, choose the verified Node runtime, use the committed npm lockfile, and configure environment scopes. At Spantrix, confirm the CMS subdomain has independent correct document root and SSL. Do not overwrite the current live WordPress installation to prepare the CMS clone. Check actual free storage before adding a clone; the 15 GB limit is not 15 GB of free space.

Keep Cloudflare authoritative DNS. Export current DNS records and preserve MX, SPF, DKIM, DMARC, mail hosts, verification TXT and the portal subdomain. Add only the records required for the approved frontend and CMS. Use the exact current DNS targets shown by the frontend provider. Recommended initial configuration is DNS-only for the Vercel host records to avoid an unnecessary reverse proxy/cache layer; follow current provider guidance and verify SSL. If CMS is proxied, explicitly bypass caching/challenges for authenticated admin, preview/API requests and form delivery, while retaining appropriate protection. Never weaken the whole firewall just because one API route fails. [S11]

Production cutover sequence:

1. Confirm GitHub release/tag, verified restore backup, DNS export, accepted content, critical test evidence, CMS reachability, and cost approval.
2. Announce and agree a short content freeze with Stephen in the current working session; do not send messages externally. Record final sync time and any lead submissions occurring during it.
3. Sync the completed local CMS content/schema into the new CMS without overwriting newer production enquiries or losing revisions/media. Use a reviewed ID mapping/import plan and record counts.
4. Re-run CMS URL replacements as a dry run, then apply approved replacements with a serialized-data-aware tool. Preserve canonical public paths and media compatibility. Test Rank Math after final CMS origin settings.
5. Deploy the exact pushed release with production environment values. Verify against the deployment URL while it is protected/noindex.
6. Ask Stephen for production cutover approval using the concrete readiness report, affected DNS records, expected interruption and rollback steps.
7. Change only the approved frontend DNS records and verify domain ownership, SSL, canonical host redirects, caches, actual public HTML, sitemap, forms, Cal.com and old media URLs.
8. Confirm the public site is indexable and CMS duplicate HTML is controlled. Submit the frontend sitemap in Search Console without deleting the property or historical data.
9. Check errors, email, conversion events, crawler access and CMS publishing after propagation. Stephen confirms completion. Keep the old installation and backups for the agreed recovery period.

Rollback: retain the previous working DNS targets and untouched live WordPress installation; do not convert that installation in place. For a frontend deployment defect, roll back to the preceding verified deployment. For a failed first cutover, restore the recorded WordPress DNS targets and undo any new routing rule that intercepts the domain. Preserve newly received leads and CMS edits before restoring a database. Domain propagation and caches must be rechecked. Avoid destructive cleanup until Stephen approves retirement.

## 13. Target schedule and launch decision

The period from 22 to 24 October is tight for a CMS model migration, eight large page references, unresolved linked pages and live integrations. Rough planning allowance is 30-50 focused implementation/review hours after prerequisites are available; missing content or hosting access can increase it. Daily availability has not been supplied. The date is a target, not a verified delivery promise.

| Date, Africa/Lagos | Target checkpoint |
| --- | --- |
| 22 October | Discovery, budget/scope review, backup/local clone, repository, CMS model and first real vertical slice. |
| 23 October | Complete pages/content and missing destinations, forms/resources, SEO/cache/preview checks, responsive QA, verified GitHub push. |
| 24 October | Remote CMS/preview verification, final content review and production cutover only if gates pass; verify public behavior and hand over. |

Launch only when the complete approved route/feature matrix passes, the release is on GitHub, the protected remote preview works with the real CMS, form receipt and inbox delivery are confirmed, drafts stay private, SEO/media/redirect checks pass, backups restore, and Stephen approves the exact cutover. If a gate fails, keep the current website operating and present the specific blocker and impact. Do not quietly shrink scope or disable failing features to meet the date.

Owner-only inputs remaining after source inspection should be collected together during Phase 00: approval of separate hosting and cost, actual WordPress/CMS export and access method, missing route/content decisions, current legal/consent text, final pricing currency, verified reviews/case evidence/resource asset, and verified contact inbox. The booking URL is already present in the exports; do not ask Stephen to supply it again unless the event is unavailable.

## 14. Handover and ongoing operation

Provide a short editor guide covering page fields, section reordering, article publishing, case studies, media/alt text, Rank Math fields, private preview, booking settings and enquiries. Include repository/hosting ownership, environment variable names and storage locations without secret values, exact deployment/rollback procedure, backup restore evidence and known limitations.

After launch, the manual operations checklist covers immediate checks, a next-day review, and a seven-day review of errors, publishing, email, crawl/indexation, analytics and performance. These are implementation runbook checkpoints, not scheduled automations created by this document. Report lab results accurately and collect field performance over a suitable observation period before claiming sustained improvement.

Only Stephen confirms completion. Antigravity reports implemented work with evidence and uses `IMPLEMENTED - AWAITING STEPHEN CONFIRMATION` until that confirmation is recorded.

## 15. Official references checked

- [S1 Next.js installation](https://nextjs.org/docs/app/getting-started/installation)
- [S2 ACF REST API integration](https://www.advancedcustomfields.com/resources/wp-rest-api-integration/)
- [S3 Rank Math headless support](https://rankmath.com/kb/headless-cms-support/)
- [S4 WordPress pages REST reference](https://developer.wordpress.org/rest-api/reference/pages/)
- [S5 WordPress REST authentication](https://developer.wordpress.org/rest-api/using-the-rest-api/authentication/)
- [S6 Vercel Pro plan](https://vercel.com/docs/plans/pro-plan)
- [S7 Vercel terms, including Hobby eligibility](https://vercel.com/legal/terms)
- [S8 Next.js Draft Mode](https://nextjs.org/docs/app/guides/draft-mode)
- [S9 Antigravity rules](https://antigravity.google/docs/rules/)
- [S10 Antigravity workflow migration notice](https://antigravity.google/docs/migration/workflows-to-skills/)
- [S11 Vercel Cloudflare guidance](https://vercel.com/guides/using-cloudflare-with-vercel)
- [S12 Core Web Vitals thresholds](https://web.dev/articles/vitals)
- [S13 Cloudflare Turnstile server validation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/)

The supplied workflow uses persistent rules and explicit phase prompt files rather than depending on legacy slash workflow discovery. Current Antigravity documentation announces that legacy workflow directories stopped being indexed after 19 October 2026; verify rule loading in the installed v2.24.0 build. The prompt files remain directly readable even if customization interfaces differ. [S9, S10]
