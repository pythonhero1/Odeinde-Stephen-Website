---
trigger: always_on
description: Local completion, GitHub release, protected preview and safe WordPress/DNS cutover
---

# Migration sequence

Finish and verify all approved pages locally, push and verify the complete GitHub release, then prepare CMS/remote preview migration. Preserve the live WordPress installation. Never edit production URLs/DNS to create a local clone.

The Spantrix BETA screenshot shows 15 GB storage and 40 GB bandwidth, not a verified Node runtime. Separate frontend hosting and its cost need review. CMS subdomain/origin, SSL, free space, backups and REST behavior require checks. A remote frontend cannot fetch a local .local CMS.

Before live cutover, provide concrete release/test evidence, accepted content, backup restore proof, exact affected DNS records and rollback. Obtain Stephen's approval. Keep Cloudflare authoritative DNS and preserve mail, verification and portal records. Use provider-issued DNS targets. Verify public SEO, old media URLs, form receipt/inbox, booking, publishing and admin after changes.

Do not expose secrets, database backups, private leads or premium plugin binaries in Git/chat. Do not let local/preview clones send unintended production notifications. The 24 October target does not override quality gates. If a blocker remains, keep the current site operating and report it without silently cutting scope.
