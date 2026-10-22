# Phase 08: remote CMS and protected frontend preview

Apply AGENTS.md. Read build plan section 12, release evidence, hosting budget approval, DNS snapshot and restore plan. Verify Phase 07's actual pushed commit/tag before migration preparation.

Prepare plans/P08-remote-preview-cms.md with the exact host/subdomain/document-root/SSL work, storage check, backup/import mapping, serialized URL replacement dry run, protected deployment, environment names, plugin activation scope, preview cache/SEO rules, changed nonproduction DNS records and rollback. Wait for approval before host changes, paid activation or CMS preparation.

Create the approved CMS clone without overwriting the original live WordPress installation. Preserve content IDs/relationships as required by the reviewed mapping and do not overwrite newer enquiries. Verify CMS reachability, media, API schema, SMTP and authentication. Deploy the pushed frontend with project root apps/web and separate preview environment values. A remote deployment must use a reachable HTTPS CMS, not a local .local hostname.

Protect preview from public access/indexing. Validate current private preview, publish refresh, published metadata, forms, all required routes and old media compatibility against the remote CMS. Recheck WordPress global search visibility versus frontend SEO intent. Produce a concrete cutover readiness report with the exact release, affected production DNS records, expected interruption and tested rollback. No production frontend DNS switch in this phase.

Acceptance criterion: "The exact GitHub release works in a protected remote preview with real remote CMS data and integrations, and a concrete verified production cutover and rollback are ready for Stephen's review."
