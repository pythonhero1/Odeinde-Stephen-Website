# Decisions

Confirmed facts and clearly marked proposals from this planning session. No implementation approval is recorded.

### D-1 - Preserve WordPress editorial ownership
- Decision: Migrate the public Divi 5 website to headless WordPress; existing WordPress plugins remain managed there and content/assets may be improved.
- Rejected: Replacing WordPress as CMS, because Stephen explicitly wants headless WordPress.
- Applies to: Public oderindestephen.com marketing site.
- Status: active
- Date: 2026-10-22

### D-2 - Proposed frontend and hosting stack
- Decision: Recommend TypeScript, Next.js App Router, React, Tailwind, WordPress REST, ACF Pro and one PHP integration plugin; Vercel Pro frontend with Spantrix CMS at a reviewed subdomain.
- Rejected: Divi as public renderer does not meet the requested architecture; extra GraphQL/backend/database layers add unproven need. Astro remains viable but uses a different preview/regeneration design.
- Applies to: Stack recommendation and frontend hosting budget review in the new build plan.
- Status: superseded by D-7
- Date: 2026-10-22

### D-3 - Proposed structured page editor
- Decision: Recommend ACF Pro flexible approved sections for pages and native WordPress blocks for blog posts, with private frontend preview and automatic publish refresh. Stephen delegated this recommendation.
- Rejected: Fixed hardcoded content prevents routine CMS editing; preserving the Divi editor does not automatically render layouts in React.
- Applies to: Editing experience and CMS model.
- Status: pending confirmation
- Date: 2026-10-22

### D-4 - Approval before implementation
- Decision: Stephen requires approval. Follow the supplied kit's concrete task plan and explicit APPROVE or APPROVE WITH CHANGES gate, and record owner confirmation separately.
- Rejected: Automatic implementation approval from the intake answers or deadline.
- Applies to: Application/config/schema changes, spend, publishing and migration.
- Status: active
- Date: 2026-10-22

### D-5 - Local completion and GitHub before migration
- Decision: Finish incomplete pages locally, push the complete verified release to GitHub, then migrate. Target launch is 24 October 2026 in Africa/Lagos time, conditional on launch gates.
- Rejected: Production-first page construction or silent removal of unfinished scope to meet the date.
- Applies to: Delivery order and release readiness.
- Status: active
- Date: 2026-10-22

### D-6 - Booking link recovered from source
- Decision: All booking buttons use the shared Cal.com URL https://cal.com/oderinde/free found in multiple supplied exports. Verify event availability before launch.
- Rejected: Building a new booking system or retaining source booking links to unrelated anchors/Contact.
- Applies to: Booking CTAs and global site settings.
- Status: active
- Date: 2026-10-22

### D-7 - Cloudflare frontend hosting
- Decision: Host the frontend on Cloudflare (Cloudflare Pages/Workers) instead of Vercel Pro, retaining WordPress CMS on Spantrix at a dedicated subdomain.
- Rejected: Vercel Pro monthly subscription rejected by Stephen in favor of Cloudflare.
- Applies to: Frontend hosting, deployment pipeline, and DNS architecture.
- Status: active
- Date: 2026-10-22

### D-8 - Standardize pricing currency to GBP
- Decision: Standardize business pricing and budget options to GBP (British Pounds) across both the Pricing page and Contact form budget options.
- Rejected: USD budget options on the Contact form, which conflicted with GBP starting prices on the Pricing page.
- Applies to: Pricing page, Contact form budget selector, and quote communications.
- Status: active
- Date: 2026-10-22

### D-9 - WordPress XML export incorporated as reference baseline
- Decision: Incorporate the provided WordPress XML export (oderindestephen.WordPress.2026-10-22.xml) into reference/ for CPT case studies, navigation menus, Theme Builder header/footer layouts, and media inventory.
- Rejected: Relying solely on isolated Divi page exports which lacked global navigation, Theme Builder layouts, and CPT records.
- Applies to: CMS model, contracts, navigation, case studies, and migration data.
- Status: active
- Date: 2026-10-22

### D-10 - Contact form recipient confirmed
- Decision: Contact form submissions will route to Contact@oderindestephen.com as the verified recipient inbox.
- Rejected: Leaving form recipient unset or using generic unconfirmed mailboxes.
- Applies to: Contact page, API enquiry relay, and WordPress mail notifications.
- Status: active
- Date: 2026-10-22

### D-11 - Legal pages preparation
- Decision: Prepare clean, standard Privacy Policy and Terms of Service templates for Stephen's review, filling the gap identified in the source audit.
- Rejected: Leaving legal links broken or omitting standard compliance pages on the marketing site.
- Applies to: Footer navigation, Privacy Policy route, and Terms route.
- Status: active
- Date: 2026-10-22

### D-12 - Resource checklist download deferral
- Decision: Free Checklist / Guide CTA will temporarily link to the strategy call or contact action until the dedicated downloadable asset is provided and built.
- Rejected: Blocking Phase 01 on asset design or serving a broken download link.
- Applies to: Marketing CTAs, resource landing links, and lead magnets.
- Status: active
- Date: 2026-10-22
