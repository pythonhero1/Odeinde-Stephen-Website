# Phase 06: production quality and release evidence

Apply AGENTS.md. Read docs/launch-checklist.md, the approved route/feature matrix and implementation plans. Inspect actual scripts and code before claiming verification coverage.

Prepare plans/P06-qa-release-candidate.md for any code/test/config fixes required. Read-only auditing and evidence recording can begin immediately. Wait for approval before unapproved implementation changes.

Run clean install/build, ESLint, TypeScript, focused boundary tests and real CMS/browser integration checks. Cover every in-scope route/CTA and critical error state, booking link, form persistence and inbox, private preview, publishing updates, unpublish/delete, slug/metadata changes, SEO output and media continuity. Review keyboard/focus, mobile/tablet/desktop, zoom, contrast and reduced motion. Measure realistic page performance and distinguish lab from field results.

Use exact test commands/results and rendered/manual evidence. Fix serious defects in approved scope, then repeat affected checks. Do not substitute fixtures for the real CMS release gate, ignore failures or tick boxes from constants. Produce docs/release-readiness.md with the release candidate commit, current blockers, tested environments and criteria not yet attempted. Ask Stephen to review actual results.

Acceptance criterion: "All mandatory local release checks have genuine passing evidence, with no unresolved critical or serious defects and no hidden incomplete features."
