# Approved Public Content & Migration Data

This directory stores versioned, human-reviewed public content records, page route inventories, and migration manifests for `oderindestephen.com`.

## Scope & Provenance

1. **Manifest File:** `manifest.json` tracks all 11 core routes, 6 case study CPT records, 1 published insight post, global site settings, navigation items, and verified Cal.com booking destinations.
2. **CMS Invariants:**
   - WordPress remains the editorial source.
   - All booking CTAs resolve to `https://cal.com/oderinde/free` per D-6.
   - Pricing packages and Contact form budget options are standardized to GBP (£) per D-8.
   - Contact form submissions route to `Contact@oderindestephen.com` per D-10.
   - Client Portal illustration uses clearly labeled sample data pointing to `https://portal.oderindestephen.com/`.
3. **Boundaries:**
   - No customer leads, passwords, or raw database dumps belong in this directory or Git.
   - Raw WordPress XML and Divi exports are maintained separately in `reference/` and are not committed to Git.
