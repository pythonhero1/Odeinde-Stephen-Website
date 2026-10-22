# Phase 05: SEO and public integrations

Apply AGENTS.md and read build plan sections 7 through 9, actual CMS contracts and the captured old URL/SEO baseline.

Prepare plans/P05-seo-integrations.md covering exact metadata/schema adapter files, sitemap/robots, redirects, old media URL handling, analytics/consent, booking, portal/resource links and cache invalidation coverage. Preserve one source of truth and avoid duplicate schema. Wait for approval.

Map Rank Math headless output safely into actual server rendered metadata and JSON-LD. Verify public canonical/schema URLs, proper robots intent, real 404s, public-only sitemap, preserved useful paths and old image URLs. Do not let production CMS noindex settings contaminate frontend metadata. Confirm WordPress-side redirect/tracking plugins are not being mistaken for frontend execution.

Integrate the approved frontend analytics method, resource delivery and all external destinations. Check all booking CTAs resolve to the active Cal.com event. Verify publish/meta/menu/media/reference changes refresh affected pages and lists, and preview/private data stays uncached. Use real request/browser evidence, not only configuration values.

Acceptance criterion: "The actual public frontend output preserves approved SEO intent and working integrations, with correct origins, redirects, media continuity, analytics behavior and complete cache/draft isolation checks."
