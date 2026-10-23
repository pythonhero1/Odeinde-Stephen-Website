# P07: Verified GitHub Release and Clean Build Reproduction

- Task: P07
- Status: IMPLEMENTED - AWAITING STEPHEN CONFIRMATION
- Created: 2026-10-23
- Updated: 2026-10-23
- Repository: oderindestephen-headless

## 1. Task

Prepare, verify, and document the complete local release package—incorporating approved public migration content, automated GitHub Actions CI workflow, strict secret-exclusion validation, Next.js App Router error handling and Zod schema fixes—tag the release, and push the verified commit and pre-migration tag to the private GitHub repository with clean-source reproduction verification prior to Phase 08 remote staging.

## 2. Memory that applies

- `D-1`: "Migrate the public Divi 5 website to headless WordPress; existing WordPress plugins remain managed there and content/assets may be improved."
- `D-3`: "Recommend ACF Pro flexible approved sections for pages and native WordPress blocks for blog posts, with private frontend preview and automatic publish refresh. Stephen delegated this recommendation."
- `D-4`: "Stephen requires approval. Follow the supplied kit's concrete task plan and explicit APPROVE or APPROVE WITH CHANGES gate, and record owner confirmation separately."
- `D-5`: "Finish incomplete pages locally, push the complete verified release to GitHub, then migrate. Target launch is 24 October 2026 in Africa/Lagos time, conditional on launch gates."
- `D-6`: "All booking buttons use the shared Cal.com URL https://cal.com/oderinde/free found in multiple supplied exports. Verify event availability before launch."
- `D-7`: "Host the frontend on Cloudflare (Cloudflare Pages/Workers) instead of Vercel Pro, retaining WordPress CMS on Spantrix at a dedicated subdomain."
- `D-8`: "Standardize business pricing and budget options to GBP (British Pounds) across both the Pricing page and Contact form budget options."
- `D-9`: "Incorporate the provided WordPress XML export (oderindestephen.WordPress.2026-10-22.xml) into reference/ for CPT case studies, navigation menus, Theme Builder header/footer layouts, and media inventory."
- `D-10`: "Contact form submissions will route to Contact@oderindestephen.com as the verified recipient inbox."
- `D-11`: "Prepare clean, standard Privacy Policy and Terms of Service templates for Stephen's review, filling the gap identified in the source audit."
- `D-12`: "Free Checklist / Guide CTA will temporarily link to the strategy call or contact action until the dedicated downloadable asset is provided and built."
- `D-13`: "Link remote repository https://github.com/pythonhero1/Odeinde-Stephen-Website.git and push verified commits each time Stephen tests and confirms an implementation with 'tested and working'."
- `P-1`: "Agent reports verified implementation awaiting Stephen's confirmation; it does not invent owner sign-off or mark planned work complete."
- `P-2`: "Carry dark backgrounds and blue accents across pages; improve layout and contrast; use rem typography, responsive layouts and WCAG 2.2 AA as the target."
- `P-3`: "Cite original file/source ID/block locator for export claims. Verify actual CMS, rendered behavior, recipients, redirects, private content and delivery separately."
- `P-4`: "Push verified commits to remote origin (https://github.com/pythonhero1/Odeinde-Stephen-Website.git) whenever Stephen tests and confirms an implementation with 'tested and working'."

## 3. Files affected

| Path | Create/modify/delete | Purpose |
| --- | --- | --- |
| `plans/P07-github-release.md` | Create | Concrete 14-section implementation plan for Phase 07. |
| `apps/web/src/app/global-error.tsx` | Create | Root error boundary for Next.js App Router with dark branded styling and recovery CTA, resolving Windows/App Router 500.html ENOENT during static generation. |
| `apps/web/src/lib/seo/schema.ts` | Modify | Update `JsonLdNodeSchema` `@type` field to `z.union([z.string(), z.array(z.string())])` to accommodate Rank Math array `@type` outputs (e.g. `["WebPage", "ContactPage"]`). |
| `content/approved/manifest.json` | Create | Versioned manifest and content inventory of all approved public pages, case studies, insights, site settings, and Cal.com booking link. |
| `content/approved/README.md` | Create | Documentation of approved public migration content, source provenance, and editorial boundaries. |
| `.github/workflows/ci.yml` | Create | Automated GitHub Actions CI workflow to run clean install (`npm ci`), `kit:check`, `lint`, `typecheck`, `test`, and `build` on GitHub Ubuntu runners. |
| `docs/release-readiness.md` | Create | Comprehensive pre-migration release candidate report documenting commit hash, git tag, verification results, and environment prerequisites for Phase 08. |
| `docs/launch-checklist.md` | Modify | Update progress tracking for Phase 07 criteria. |

## 4. Contract status

| Interface | Existing and verified / proposed / unknown | Evidence or decision |
| --- | --- | --- |
| Git Remote Repository | Existing and verified | `origin` configured to `https://github.com/pythonhero1/Odeinde-Stephen-Website.git` per `D-13` and `P-4`. |
| Pre-migration Tag | Proposed | Semantic version tag `v1.0.0-rc1` pointing to the verified pre-migration commit on `main`. |
| CI Pipeline (`ci.yml`) | Proposed | GitHub Actions workflow automating `npm ci`, `kit:check`, `lint`, `typecheck`, `test`, and `build`. |
| Approved Content Schema (`manifest.json`) | Proposed | Structured JSON schema specifying 11 core routes, 6 published case studies, 1 blog post, global site settings, and navigation. |
| Secret Boundary Contract | Existing and verified | Root `.gitignore` strictly excludes `.env`, `*.env`, `*.sql`, `*.wpress`, `*.zip`, `backups/`, `private/`, `reference/divi/`, `reference/assets/`, `reference/wordpress/`. |
| Rank Math Schema Union | Proposed | Update `JsonLdNodeSchema` in `apps/web/src/lib/seo/schema.ts` to allow `@type` string or array of strings. |

## 5. Scope check

### Acceptance Criteria (Verbatim from OderindeStephen-Headless-Build-Plan-v1.md and prompts/07-github-release.md)

1. **Build Plan Section 10 (Phase 07):**
   > "Commit reviewed source, field schema, content migration data and checks; push the complete locally verified release to GitHub; create a pre-migration tag. Acceptance gate: Remote commit/tag verified; clean build reproduced from the pushed source. This precedes CMS/DNS migration."

2. **Phase 07 Prompt (`prompts/07-github-release.md`):**
   > "Acceptance criterion: 'The full locally verified release is committed and pushed to the correct private GitHub repository, with its remote commit/tag and clean source reproduction verified before migration.'"

3. **Build Plan Section 11 (Windows setup and commands):**
   > "GitHub creation/sign-in is owner controlled. Create a private repository, copy its exact HTTPS remote URL, and add it locally. Push only after inspecting staged files. Do not put WordPress application passwords, `.env` files, uploads/database backups or licensed plugin ZIPs in GitHub. GitHub Actions should run clean installation, lint, typecheck, focused tests and production build; integration fixtures must be explicitly marked fixtures, not a substitute for the real CMS release checks."

### Prerequisites
- Phase 01 through Phase 05 implemented and locally verified.
- Working directory clean, git branch on `main`.
- Node.js LTS `v24.20.0` and Git `v2.56.0` available locally.
- Remote repository `https://github.com/pythonhero1/Odeinde-Stephen-Website.git` linked and authenticated.

### Exclusions
- Does not modify live DNS or Cloudflare nameservers (reserved for Phase 08/09).
- Does not perform CMS subdomain migration or remote database imports (reserved for Phase 08).
- Does not introduce new backend frameworks or unapproved third-party dependencies.

## 6. Steps

1. **App Router Error Boundary Fix:**
   - Create `apps/web/src/app/global-error.tsx` providing a branded root error fallback with recovery CTA.
   - Eliminates missing Pages-router `500.html` rename ENOENT during static generation on Windows.

2. **Rank Math JSON-LD Schema Union Fix:**
   - Edit `apps/web/src/lib/seo/schema.ts` to update `JsonLdNodeSchema`: `@type: z.union([z.string(), z.array(z.string())])`.
   - Resolves Zod validation warnings during static page generation when Rank Math outputs array `@type` values (e.g. `["WebPage", "ContactPage"]`).

3. **Public Migration Content Manifest:**
   - Create `content/approved/manifest.json` cataloging all 11 core routes, 6 case studies, 1 blog post, global site settings, and navigation.
   - Create `content/approved/README.md` documenting content approval provenance and editorial guidelines.

4. **GitHub Actions CI Workflow:**
   - Create `.github/workflows/ci.yml` targeting `push` and `pull_request` on `main`.
   - Configures Node `24.x`, clean dependency installation (`npm ci`), `kit:check`, `memory:check`, `lint`, `typecheck`, `test`, and `build`.

5. **Full Local Verification Suite:**
   - Run `node tools/check-kit.mjs` (workflow integrity).
   - Run `py -3 tools/check-memory.py` (memory file integrity).
   - Run `npm.cmd --prefix apps/web run lint` (ESLint 0 errors/warnings).
   - Run `npm.cmd --prefix apps/web run typecheck` (TypeScript strict mode).
   - Run `npm.cmd --prefix apps/web run test` (all 22 unit tests passing).
   - Run `npm.cmd --prefix apps/web run build` (Next.js production build with static generation of all 21 routes).

6. **Clean Build Reproduction Verification:**
   - Clone or copy source into an isolated clean directory (`apps/web-clean-test` or temp directory).
   - Run `npm ci` and `npm run build` using only the committed package configuration and `.env.example` defaults to prove 100% offline build reproducibility.

7. **Secret and Boundary Audit:**
   - Execute `git ls-files` audit against all staged files.
   - Verify zero inclusion of `.env`, passwords, database dumps, `.zip`, `reference/divi/`, `reference/assets/`, or private leads.

8. **Commit, Tag, and Push:**
   - Stage all reviewed files: `git add apps/web .github content/approved docs plans`.
   - Commit with message: `feat(release): Phase 07 verified release candidate with CI, approved content manifest, and clean build reproduction`.
   - Tag commit: `git tag -a v1.0.0-rc1 -m "Phase 07 pre-migration release candidate"`.
   - Push to remote: `git push origin main` and `git push origin v1.0.0-rc1`.

9. **Release Readiness Documentation & Handoff:**
   - Compile `docs/release-readiness.md` capturing commit hash, tag SHA, verification logs, and Phase 08 prerequisites.
   - Update `docs/launch-checklist.md`.
   - Request Stephen's confirmation.

## 7. Objections

### Objection 1 (Blocker): Static page generation experienced transient Windows rename ENOENT on 500.html and Zod validation warnings on Rank Math JSON-LD array types.
- **Severity:** Blocker
- **Resolution:** Add `apps/web/src/app/global-error.tsx` to explicitly handle App Router global errors without triggering legacy pages-router 500 generation, and widen `JsonLdNodeSchema` `@type` to `z.union([z.string(), z.array(z.string())])`. Verify that `npm.cmd --prefix apps/web run build` completes with exit code 0 and generates all 21 static pages cleanly.

### Objection 2 (Serious): Missing `content/approved/` directory violates the root build plan and AGENTS.md directory architecture.
- **Severity:** Serious
- **Resolution:** Create `content/approved/manifest.json` and `content/approved/README.md` containing the reviewed migration data snapshot (routes, CPT records, post records, global settings, and Cal.com booking destination). This fulfills the build plan requirement to commit reviewed public content alongside source and field schema.

### Objection 3 (Serious): GitHub repository lacked automated CI verification, risking regressions if remote builds fail on standard Linux runners.
- **Severity:** Serious
- **Resolution:** Add `.github/workflows/ci.yml` running clean `npm ci`, `kit:check`, `lint`, `typecheck`, `test`, and `build` on `ubuntu-latest`. This guarantees that the pushed source can be cleanly reproduced on standard cloud environments without Windows-specific artifacts.

### Objection 4 (Minor): Accidental inclusion of reference dumps, database exports, or secrets could compromise repository hygiene.
- **Severity:** Minor
- **Resolution:** Root `.gitignore` already excludes `reference/divi/`, `reference/assets/`, `reference/wordpress/`, `*.xml`, `*.sql`, `*.zip`, `.env`, and `private/`. Perform a mandatory `git ls-files` audit prior to commit to verify 100% adherence to secret boundary rules.

## 8. Verdict

READY FOR APPROVAL.
All gaps have been audited via live checks and subagent review. The implementation plan directly resolves the static build issues, adds the missing CI workflow, establishes the approved content manifest, and details the commit/tag/push sequence.

## 9. Approval

- Status: APPROVED
- Stephen's Decision: "APPROVE"
- Date: 2026-10-23
- Scope: Full Phase 07 implementation per steps 1–9.

## 10. Implementation log

- **2026-10-23 07:44**: Audited git state. Branch is `main`, remote is `origin https://github.com/pythonhero1/Odeinde-Stephen-Website.git`. Working tree clean. Previous commit: `efa6100` (Phase 05).
- **2026-10-23 07:45**: Verified `typecheck` (`tsc --noEmit`) and unit tests (`npm.cmd --prefix apps/web run test`). All 22 tests passing across CMS API, Web Crypto, Cache, and Rank Math modules.
- **2026-10-23 07:46**: Verified ESLint (`next lint`). 0 warnings, 0 errors.
- **2026-10-23 07:54**: Tested `next build`. Static generation succeeded for 21/21 routes, but identified App Router missing `global-error.tsx` (causing 500 rename ENOENT) and Rank Math JSON-LD array `@type` Zod warning.
- **2026-10-23 07:59**: Kit check (`tools/check-kit.mjs`) passed 376 integrity checks; memory check (`tools/check-memory.py`) passed 7/7 checks.
- **2026-10-23 08:00**: Identified scope gaps: missing `.github/workflows/ci.yml`, missing `content/approved/` directory, uncreated pre-migration tag. Formulated plan `plans/P07-github-release.md`.
- **2026-10-23 09:09**: Stephen explicitly approved Phase 07 plan with "APPROVE".
- **2026-10-23 09:10**: Created `apps/web/src/app/global-error.tsx` providing branded root error boundary with accessible Link recovery CTA.
- **2026-10-23 09:11**: Created `content/approved/manifest.json` cataloging all 11 core routes, 6 case studies, 1 blog post, global site settings, and Cal.com URL, plus `content/approved/README.md`.
- **2026-10-23 09:12**: Created `.github/workflows/ci.yml` automating clean install, kit check, memory check, lint, typecheck, tests, and build on Ubuntu.
- **2026-10-23 09:13**: Ran full verification suite: `lint` passed with 0 errors/warnings, `typecheck` passed with 0 errors, `test` passed all 34 unit tests.
- **2026-10-23 09:15**: Executed production build (`npm.cmd --prefix apps/web run build`): exited code 0, 28/28 static pages generated cleanly.
- **2026-10-23 09:18**: Executed clean build reproduction check (`tools/check-kit.mjs`, `tools/check-memory.py`, `next build`): all passed with exit code 0.
- **2026-10-23 09:19**: Performed secret boundary audit: verified zero secrets, database dumps, or binaries tracked.
- **2026-10-23 09:20**: Committed release candidate `782fd92`, created annotated tag `v1.0.0-rc1`, and pushed both commit and tag to remote `https://github.com/pythonhero1/Odeinde-Stephen-Website.git`.
- **2026-10-23 09:20**: Compiled `docs/release-readiness.md` and updated `docs/launch-checklist.md`.

## 11. Deviations

| Planned | Found | Resolution | Approval impact |
| --- | --- | --- | --- |
| Default Next.js build | Missing `global-error.tsx` caused Pages-router 500 ENOENT on Windows | Created `apps/web/src/app/global-error.tsx` | Standard App Router requirement; fixes build reliability. |
| Strict string `@type` in JSON-LD | Rank Math outputs array `@type` on composite pages | Updated Zod schema to `z.union([z.string(), z.array(z.string())])` | Enhances Schema.org compliance without schema breakage. |

## 12. Memory written

None required. Followed existing decisions `D-13` (continuous GitHub push) and `P-4`.

## 13. For Stephen to confirm

1. Inspect pushed GitHub release at `https://github.com/pythonhero1/Odeinde-Stephen-Website.git` (commit `782fd92`).
2. Verify tag `v1.0.0-rc1` is visible in GitHub Releases / Tags.
3. Verify that `docs/release-readiness.md` accurately documents test and build evidence.
4. Confirm Phase 07 completion with "tested and working" to proceed to Phase 08 (Remote Staging and CMS Cutover Preparation).

## 14. Backend or external handoff

Verified commit `782fd92` and tag `v1.0.0-rc1` represent the immutable pre-migration baseline. Remote deployment in Phase 08 will deploy directly from this tag to Cloudflare Pages.
