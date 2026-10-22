# Audit of the supplied Divi exports

Prepared 22 October 2026. Scope: all eight attached JSON exports, parsed as data without executing their custom code or fetching their URLs. The hosting plan screenshot was also inspected. This report is not a live-site or WordPress database audit.

## Coverage and reproducibility

`tools/audit-divi.mjs` parsed 2,469 Divi block records with zero JSON parsing errors. It found 123 button modules and 124 embedded image records. Deduplication by SHA-256 produced 78 unique embedded assets totaling 10,823,738 decoded bytes. Each original source file has its own SHA-256 in `reference/normalized/summary.json`; the originals are included unchanged in `reference/divi/`.

Each page has a normalized JSON record and a human readable Markdown audit. Locators use the source post ID and zero-based block index. Read the normalized JSON for the exact attribute/value before changing an implementation. The parser does not establish that an inherited style, anchor, variable, image or integration works in the rendered page.

| Source file | ID | Parsed blocks | Buttons | Embedded image records |
| --- | --- | --- | --- | --- |
| Business Website Development(1).json | 96116 | 424 | 22 | 34 |
| Business Website Solutions (1).json | 96112 | 281 | 17 | 21 |
| Case Studies.json | 96083 | 218 | 15 | 8 |
| Contact.json | 96339 | 208 | 22 | 4 |
| E-commerce Development(1).json | 96119 | 330 | 13 | 1 |
| Pipe Patch Pro WordPress Product Website Development.json | 96182 | 274 | 4 | 0 |
| Pricing.json | 96380 | 265 | 15 | 12 |
| Website Development & Digital Solutions _ Oderinde Stephen.json | 14 | 469 | 15 | 44 |

The `images` collection does not necessarily contain every image referenced by a module. Some files appear in several exports; some image modules can use external or dynamic data. Embedded recovery cannot replace a full media/CPT/metadata export.

## Findings that affect the build

1. The booking URL is recoverable: `https://cal.com/oderinde/free`. Multiple pages use it. Other booking buttons have empty URLs, `/contact/` or `#portfolio`. One shared CMS setting should drive every booking action.
2. Numerous buttons have labels but no destination. The homepage's "Explore My Work" is one example; the per-page reports list every parsed button. Some other labels point to unrelated pages or inherited diagnostic anchors.
3. Home, Solutions, Development, Case Studies and other layouts include `$variable(...)$` expressions for post titles/links/excerpts and custom fields. These are not resolved project records. Export actual posts/CPTs/ACF values and build real queries.
4. Contact has a native Divi form with seven fields. The form's admin label reads "NATIVE DIVI CONTACT FORM - SET RECIPIENT IN BUILDER" using typographic punctuation in the original. No recipient is established by this export. `Contact@oderindestephen.com` appears in public copy and still needs inbox/SMTP confirmation.
5. Contact source ID 96339, block 9, has "Book a Strategy Call" pointing to `#portfolio`. Block 206 has the same label without a destination. "Learn More About Me" currently points to Contact itself. Correct these behaviors during the rebuild.
6. Pricing has GBP 450, 250, 400 and 700 as starting-price headings. Contact budget choices use USD. This is a content decision for Stephen; do not automatically convert or alter prices.
7. Pricing labels such as "View Case Studies" and "View Portfolio" link to service pages rather than their named destinations. Source references are in its normalized button table.
8. Pipe Patch Pro begins with a self-closing hero section and has no embedded image records. Its visual-evidence section needs actual media from WordPress. Its copy says WooCommerce payment activation depended on the client's banking/onboarding. Preserve that qualification unless verified newer evidence changes it.
9. Review blocks include placeholder wording such as "Rating - Reviews" in the original homepage layout and dynamic/copy content requiring verification. Do not interpret platform logos or star characters as proof of a rating.
10. The homepage contains one large custom code module for a project-portal illustration, including controls and sample progress. Port the visual intentionally, label illustrative data and test keyboard/touch behavior. A marketing illustration does not prove the real portal is live.
11. Source styles mix typography units, colors, responsive overrides, duplicated section labels and heading numbering. Retain the brand while replacing inconsistent details with reviewed tokens/components. The homepage remains the design reference.
12. Free checklist and insight CTAs require their real resource/article records and delivery. Those records/assets are not established by the page layout exports.

## Route and feature discovery still needed

Internal destination candidates include `/`, `/business-website-solutions/`, `/business-website-development/`, `/e-commerce-development/`, `/case-studies/`, `/pricing/`, `/contact/`, `/portfolio/`, `/insights/`, `/website-redesign/`, `/client-portals-business-systems/`, `/wordpress-development/`, `/woocommerce-development/`, `/shopify-development/` and `/solutions/`.

The last eight specialized/listing destinations do not all have dedicated supplied page exports. A candidate link is not proof that a page exists or is unpublished. Inspect the actual WordPress inventory and sitemap, then decide which existing page/export or approved new page fulfills each link. Preserve actual permalinks for existing content rather than generating them from filenames. Also inventory unlinked live pages and redirects; this list is not a complete crawl.

No separate global Theme Builder header/footer export, full database, complete ACF content export, full WordPress media export, font files, SEO/redirect backup or legal text was supplied in these attachments. Their absence here is not evidence of absence on the site.

Separate public read attempts for the site's REST page listing, sitemap and Cal.com event could not return content through the available retrieval service. This is a retrieval limitation, not a finding that the site/event is offline. Actual live paths, publication status, indexability and booking availability remain unverified and must be checked locally or through the owner's access.

## Hosting screenshot

The BETA plan advertises 15 GB SSD storage, 40 GB bandwidth, unlimited subdomains, five additional websites/addons, unlimited email accounts, Softaculous, Nginx/LiteSpeed, SSL and daily backup. It does not establish current free space, a supported Node runtime, PHP resource limits, backup retention, successful restoration, or available remote preview access.

Recommendation for review: keep PHP WordPress on Spantrix and deploy the Next.js frontend separately. Verify capacity and cost before activation. Cloudflare nameserver management was stated by Stephen, not inferred from the screenshot.

## Re-run

```powershell
node tools/audit-divi.mjs
node tools/audit-divi.mjs --extract-assets
```

The second command writes deduplicated reference files under `reference/assets/`. Do not execute embedded code, publish arbitrary SVG files, or copy all reference media into the frontend bundle without selecting, sanitizing and optimizing them.
