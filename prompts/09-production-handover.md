# Phase 09: approved production cutover and handover

Apply AGENTS.md. Read all actual readiness evidence, docs/launch-checklist.md and build plan sections 12 through 14. Verify the complete release, accepted content, hosting cost, backup restoration, remote preview and every mandatory gate. Keep the old website operating if a gate fails.

Prepare plans/P09-production-handover.md with the exact release, final content freeze/sync, production environment scope, affected DNS records using provider-issued targets, preserved mail/portal records, SEO/media compatibility, post-switch checks and precise rollback. Present it for Stephen's explicit cutover approval. Do not treat earlier setup approval or the target date as this approval.

After approval, execute only the listed sequence. Preserve newer enquiries/edits during sync. Change only authorized records; keep Cloudflare authoritative DNS. Verify public DNS/SSL/canonical host, rendered content/metadata/robots/sitemap/schema, old URLs/media, form storage and real inbox delivery, booking, portal links, private preview, CMS/admin and publish refresh after propagation. Restore the recorded safe state if the approved rollback trigger is reached; retain new leads/edits before any database restore.

Complete editor/operations handover using real control names, account ownership, environment storage locations without values, deployment/backup/restore instructions and accepted limitations. Record manual immediate/next-day/seven-day check instructions; do not create a scheduled automation without a separate request. Ask Stephen to confirm completion against the acceptance criteria.

Acceptance criterion: "The approved release serves the public domain with functioning integrations, preserved SEO/media intent and tested recovery, and Stephen receives verified editing/operations instructions and confirms completion."
