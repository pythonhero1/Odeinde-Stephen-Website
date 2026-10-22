# Phase 01: Windows, local CMS and repository

Apply AGENTS.md and matching memory/rules. Read START-HERE.md, build plan sections 3, 6, 10 and 11, docs/readiness.md and docs/environment.md.

Prepare plans/P01-windows-repository.md using all 14 sections. Include unresolved architecture choices and hosting cost status from discovery in the same review. Define the actual files or pinned scaffold template/options to be generated, validation, dependency versions, secret exclusions, local WordPress clone steps, potential generated nested AGENTS.md handling and rollback. Wait for Stephen's approval before implementation.

After approval, validate Node/Git versions, initialize one Git repository if none exists, scaffold apps/web with the chosen stable Next.js/TypeScript/Tailwind/ESLint options, configure the agreed initial cache model, record exact versions/lockfile and meaningful scripts. Prepare a local HTTPS WordPress clone from the real export without modifying production or sending unintended mail. Keep one repository; preserve the root protocol.

Do not buy frontend hosting or migrate production in this phase. Document the actual local CMS origin and environment variable names without secret values. Update docs/versions.md and readiness evidence. Check the Node kit integrity tool and run an initial frontend build once its real CMS requirements are available; identify a prerequisite instead of inventing CMS responses.

Acceptance criterion: "The approved frontend scaffold and real local WordPress clone run on Windows, dependency versions and configuration are documented, and secrets/backups are excluded from the single repository."
