---
trigger: always_on
description: CMS editing, public SEO, API boundaries and publishing correctness
---

# CMS and SEO guardrails

WordPress owns editorial content and SEO values. Render approved ACF sections and supported blog blocks explicitly. Do not serve raw Divi expressions, ignore pagination, hardcode unresolved CMS content or guess case study post types. Capture actual schemas and fixture provenance. Private data and drafts must not be accessible through public endpoints or public caches.

Draft preview requires validated signed short-lived links and server-only authenticated CMS reads. Publishing requires verified invalidation of detail pages, related lists, site settings and SEO. Test update, unpublish/delete and old/new slug behavior, not just a successful event response.

Rank Math output must be mapped into actual frontend metadata and valid JSON-LD. One owner per schema entity. Verify canonical/public origins, robots intent, redirects, status codes, sitemap and old media URLs. Do not use global CMS noindex settings in a way that causes every public page's imported SEO to be noindex. Duplicate CMS HTML needs targeted handling; assets and APIs have different requirements.

Existing plugins stay administered in WordPress. Validate frontend tracking, linking, media and redirect behavior separately. No promise of guaranteed speed, rankings or AI citations. Preserve real SEO baseline and compare rendered production responses.
