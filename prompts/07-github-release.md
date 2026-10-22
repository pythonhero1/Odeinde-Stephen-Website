# Phase 07: verified GitHub release before migration

Apply AGENTS.md. Read the local release evidence and inspect Git state/ignore rules. Stephen has requested that all incomplete pages be finished locally and pushed to GitHub before migration.

Write plans/P07-github-release.md with the exact repository/branch/commit plan, staged file scope, private repository setup, clean-build CI design if included and pre-migration tag. Resolve the actual GitHub identity/remote through owner sign-in, never guess it or request credentials in chat. Wait for approval for this concrete task.

Inspect every staged file for source scope and obvious secret/private backup inclusion. Commit the verified frontend, project PHP plugin, field schema, approved public migration content, checks and documentation. Keep complete database/media backups, application passwords, raw local reference exports and premium plugin binaries out of commits. Push to the exact private repository and verify the remote commit/tag matches the complete locally tested release.

Reproduce the build from the pushed source with appropriate documented CMS configuration. Do not begin CMS/DNS migration when the remote is missing, incomplete, or contains a different release. Record evidence and provide the release identifier for the next phase.

Acceptance criterion: "The full locally verified release is committed and pushed to the correct private GitHub repository, with its remote commit/tag and clean source reproduction verified before migration."
