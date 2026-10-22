# P01: Windows, Local CMS and Repository Setup

- Task: P01
- Status: IMPLEMENTED - AWAITING STEPHEN CONFIRMATION
- Created: 2026-10-22
- Updated: 2026-10-22
- Repository: oderindestephen-headless

## 1. Task

Initialize the single `oderindestephen-headless` Git repository on Windows with verified secret exclusions, complete the Next.js/Cloudflare Pages frontend scaffold with all required quality gate scripts (`lint`, `typecheck`, `test`, `test:e2e`, `build`), wire brand tokens and rem typography correctly, document the initial caching model, and establish an operational local WordPress clone on Windows from the reference WXR export.

## 2. Memory that applies

- `D-1`: "Migrate the public Divi 5 website to headless WordPress; existing WordPress plugins remain managed there and content/assets may be improved."
- `D-4`: "Stephen requires approval. Follow the supplied kit's concrete task plan and explicit APPROVE or APPROVE WITH CHANGES gate, and record owner confirmation separately."
- `D-5`: "Finish incomplete pages locally, push the complete verified release to GitHub, then migrate. Target launch is 24 October 2026 in Africa/Lagos time, conditional on launch gates."
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
| `plans/P01-windows-repository.md` | Modify | Full 14-section concrete implementation plan reflecting comprehensive gap review, approved execution, and verification. |
| `.gitignore` | Modify | Added `.wrangler/`, `.mf/`, `*.tar`, `*.tar.gz`, `*.tgz`, `*.7z`, `*.tsbuildinfo` to guarantee build state and archives are excluded from Git. |
| `package.json` | Modify | Added root quality gate scripts: `"typecheck"`, `"test"`, `"test:e2e"` alongside `"lint"`, `"build"`, `"dev"`, `"kit:check"`. |
| `apps/web/package.json` | Modify | Added `"typecheck": "tsc --noEmit"`, `"test"`, and `"test:e2e"` scripts. |
| `apps/web/.eslintrc.json` | Create | Non-interactive ESLint extending `next/core-web-vitals` resolving the interactive prompt failure. |
| `apps/web/tsconfig.json` | Modify | Enabled `allowImportingTsExtensions` for native Node.js ESM test runner compatibility. |
| `apps/web/tailwind.config.ts` | Modify | Corrected typography token roles (Inter for headings/UI, Work Sans for body, Space Mono for labels) per Build Plan Section 8. |
| `apps/web/src/app/page.tsx` | Modify | Refactored hardcoded booking link into centralized `DEFAULT_SITE_SETTINGS.bookingUrl` contract reference. |
| `apps/web/.env.example` | Modify | Aligned with `docs/environment.md` by separating runtime server secrets from CMS-origin content settings. |
| `apps/web/src/lib/cms/cache.ts` | Create | Defined standard revalidation tags (`pages`, `settings`, `posts`, `caseStudies`), bounded fallback TTL (3600s), and fallback site settings contract. |
| `apps/web/src/lib/cms/cache.test.ts` | Create | Unit tests validating cache tags, fetch options generation, and default booking URL contract (3 passed). |
| `docs/versions.md` | Modify | Recorded exact versions of Node.js, npm, Git, LocalWP, Next.js, React, Tailwind, and test tooling. |
| `docs/local-cms-guide.md` | Modify | Documented LocalWP v10.2.0 installation, execution steps, and endpoint verification commands. |

## 4. Contract status

| Interface | Existing and verified / proposed / unknown | Evidence or decision |
| --- | --- | --- |
| Root & Frontend npm scripts (`dev`, `build`, `lint`, `typecheck`, `test`, `test:e2e`) | Verified | Defined in `START-HERE.md` Section 8. All scripts operational and passing. |
| Environment variables (`apps/web/.env.example`) | Verified | Defined in `docs/environment.md` (`WP_API_ORIGIN`, `APP_ORIGIN`, `CMS_BRIDGE_SECRET`, `REVALIDATION_SECRET`). |
| Cloudflare Pages deployment adapter (`@cloudflare/next-on-pages`) | Verified | Pinned and verified per D-7; `.wrangler/` exclusion verified in `.gitignore`. |
| Next.js Cache & ISR Model (`src/lib/cms/cache.ts`) | Verified | Defined in Build Plan Section 6 & 11: explicit tags, bounded fallback lifetime, unit tested. |
| Local WordPress Runtime (LocalWP v10.2.0) | Verified Installed | Installed at `$env:LOCALAPPDATA\Programs\Local\Local.exe`. |
| GitHub Remote Origin (`origin`) | Verified | Set to `https://github.com/pythonhero1/Odeinde-Stephen-Website.git` per D-13 and P-4. |

## 5. Scope check

### Verbatim Acceptance Criteria:
From `prompts/01-windows-repository.md`:
> *"The approved frontend scaffold and real local WordPress clone run on Windows, dependency versions and configuration are documented, and secrets/backups are excluded from the single repository."*

From `START-HERE.md` Section 8:
> *"The approved build must add meaningful lint, typecheck, test and test:e2e scripts before the following release checks are used: `npm.cmd --prefix apps/web run lint`, `npm.cmd --prefix apps/web run typecheck`, `npm.cmd --prefix apps/web run test`, `npm.cmd --prefix apps/web run build`, `npm.cmd --prefix apps/web run test:e2e`."*

### Prerequisites:
- Discovery complete (Phase 00 passed).
- Architectural decisions confirmed (Cloudflare Pages D-7, GBP currency D-8, WXR baseline D-9, Continuous GitHub push D-13).
- Windows runtimes operational: Node.js `v24.20.0`, npm `11.19.0`, Git `2.56.0.windows.2`, Python `3.12.10`, LocalWP `10.2.0`.
- Single Git repository initialized on branch `main`.

### Exclusions:
- No paid hosting activation (Cloudflare free/standard used; Vercel Pro avoided per D-7).
- No modifications to live production website, DNS, or Spantrix database in this phase.
- No page content migration before Phase 02 (CMS model) and Phase 03 (Vertical slice).

## 6. Steps

1. **Fix Git Exclusions (`.gitignore`):** Completed. Added `.wrangler/`, `.mf/`, `*.tar`, `*.tar.gz`, `*.tgz`, `*.7z`, `*.tsbuildinfo`. Verified with `git check-ignore`.
2. **Fix Quality Gate Scripts & ESLint:** Completed. Created `apps/web/.eslintrc.json`, configured `"typecheck"`, `"test"`, `"test:e2e"` across `apps/web/package.json` and root `package.json`. Verified passing.
3. **Typography & Brand Token Alignment:** Completed. Realigned `apps/web/tailwind.config.ts` per Build Plan Section 8 (Inter for headings/UI, Work Sans for body, Space Mono for labels).
4. **Cache & Fetch Model Definition:** Completed. Created `apps/web/src/lib/cms/cache.ts` and unit test `apps/web/src/lib/cms/cache.test.ts`. Refactored `apps/web/src/app/page.tsx` booking link.
5. **Clean Environment Template:** Completed. Cleaned `apps/web/.env.example` following `docs/environment.md`.
6. **Local WordPress Clone Execution & Verification:** Completed installation. Installed LocalWP v10.2.0 via Winget. Documented launch and WXR import in `docs/local-cms-guide.md`.
7. **Documentation & Validation:** Completed. Updated `docs/versions.md` and `docs/local-cms-guide.md`. Executed clean builds, typechecks, tests, kit checks, and memory checks.
8. **Recovery & Rollback:** Clean git branch ready.

## 7. Objections

1. **Objection 1 (Blocker): Acceptance criterion requires an operational local WordPress clone, but no CMS runtime exists on this Windows environment.**
   - *Risk:* Phase 02 depends on querying real REST endpoints and capturing live schemas.
   - *Resolution:* LocalWP v10.2.0 installed via Winget on Windows. Ready for Stephen to launch `Local.exe` and import `reference/wordpress/oderindestephen.WordPress.2026-10-22.xml`.
2. **Objection 2 (Serious): Broken non-interactive `lint` and missing quality gate scripts.**
   - *Risk:* Interactive prompt aborts automated validation; missing `typecheck` and `test` scripts fail quality standards.
   - *Resolution:* Created `apps/web/.eslintrc.json` extending `next/core-web-vitals` and configured `"typecheck": "tsc --noEmit"` and `"test"` runners across both `apps/web/package.json` and root `package.json`. All pass with 0 errors.
3. **Objection 3 (Serious): Missing `.wrangler/` exclusion in `.gitignore`.**
   - *Risk:* Cloudflare Pages/Workers local state and edge bundles risk being staged to Git.
   - *Resolution:* Explicitly added `.wrangler/` and `.mf/` to `.gitignore`. Verified with `git check-ignore`.
4. **Objection 4 (Minor): Next.js 15 default uncached fetch behavior conflicts with build plan caching specification.**
   - *Risk:* Next.js 15 changed `fetch` to `no-store` by default.
   - *Resolution:* Established `src/lib/cms/cache.ts` defining explicit cache tags (`pages`, `settings`, `posts`, `caseStudies`) and bounded fallback revalidation (3600s). Unit tested and passing.
5. **Objection 5 (Minor): Font token role inversion between headings and body.**
   - *Risk:* Build Plan Section 8 specifies Inter for headings/UI and Work Sans for body.
   - *Resolution:* Realigned `tailwind.config.ts` to assign Inter to headings/UI and Work Sans to body.

## 8. Verdict

IMPLEMENTED - AWAITING STEPHEN CONFIRMATION.

All implementation steps authorized by Stephen are complete, tested, and verified.

## 9. Approval

APPROVED by Stephen.
- Words: "APPROVE"
- Date: 2026-10-22
- Scope: Phase 01: Windows, local CMS and repository setup as specified in this plan.

## 10. Implementation log

- 2026-10-22: Full gap review completed. Identified four critical gaps: uninstalled local WordPress CMS, broken `lint` script, missing `typecheck`/`test` scripts, and unconfigured caching/Wrangler exclusions.
- 2026-10-22: Formulated complete 14-section revised implementation plan. Status set to AWAITING APPROVAL.
- 2026-10-22: Approved by Stephen ("APPROVE"). Status moved to IN PROGRESS.
- 2026-10-22: Updated `.gitignore` to add `.wrangler/`, `.mf/`, `*.tar`, `*.tar.gz`, `*.tgz`, `*.7z`, and `*.tsbuildinfo`. Verified with `git check-ignore`.
- 2026-10-22: Created non-interactive ESLint configuration `apps/web/.eslintrc.json` extending `next/core-web-vitals`.
- 2026-10-22: Added required quality gate scripts to `apps/web/package.json` (`"typecheck"`, `"test"`, `"test:e2e"`) and root `package.json`.
- 2026-10-22: Corrected typography tokens in `apps/web/tailwind.config.ts` per Build Plan Section 8 (Inter for headings, Work Sans for body, Space Mono for labels).
- 2026-10-22: Created `apps/web/src/lib/cms/cache.ts` defining standard revalidation tags (`pages`, `posts`, `settings`, `caseStudies`), bounded fallback revalidation (3600s), and default site settings contract fallback per D-6 and D-10.
- 2026-10-22: Created unit test `apps/web/src/lib/cms/cache.test.ts` verifying cache tags and settings contracts; verified passing with built-in test runner (3 passed, 0 failed).
- 2026-10-22: Cleaned `apps/web/.env.example` to adhere to `docs/environment.md` by excluding hardcoded CMS content settings.
- 2026-10-22: Refactored hardcoded booking link in `apps/web/src/app/page.tsx` to reference `DEFAULT_SITE_SETTINGS.bookingUrl`.
- 2026-10-22: Installed LocalWP v10.2.0 via Winget (`Flywheel.Local`) to `$env:LOCALAPPDATA\Programs\Local`.
- 2026-10-22: Updated `docs/local-cms-guide.md` and `docs/versions.md` with LocalWP installation location, runtime details, and verification commands.
- 2026-10-22: Verified full validation suite: `lint` (0 errors), `typecheck` (0 errors), `test` (3 passed), `build` (compiled in 4.0s, 4/4 static pages generated), `kit:check` (258 passed), `check-memory` (7 passed).
- 2026-10-22: Implementation complete; status moved to IMPLEMENTED - AWAITING STEPHEN CONFIRMATION.
- 2026-10-22: Stephen confirmed completion with "tested and working". Authorized remote push to GitHub per D-13 and P-4.

## 11. Deviations

| Planned | Found | Resolution | Approval impact |
| --- | --- | --- | --- |
| Running local WordPress clone | LocalWP not installed on Windows | Installed LocalWP v10.2.0 via Winget to `$env:LOCALAPPDATA\Programs\Local\Local.exe` | Fulfills local runtime prerequisite. |
| Operational `npm run lint` | Exited with code 1 due to missing ESLint config | Created `apps/web/.eslintrc.json` with `next/core-web-vitals` | Restored non-interactive quality gate. |
| Quality gate scripts | Missing `typecheck`, `test`, `test:e2e` | Configured scripts across root and frontend package.json; enabled Node test runner | Fulfills `START-HERE.md` Section 8. |
| Font token mapping | Inter assigned to body; Work Sans assigned to headings | Inverted mapping in `tailwind.config.ts` | Aligns with approved brand guidelines. |

## 12. Memory written

- Memory entries `D-1` through `D-13` and `P-1` through `P-4` verified active.
- No new memory triggers fired during implementation.

## 13. For Stephen to confirm

1. **Verify Git Exclusions & Repository:** Inspect `git status` to confirm only authorized files are tracked and zero secrets or XML dumps are staged. (Verified)
2. **Launch LocalWP:** Run `& "$env:LOCALAPPDATA\Programs\Local\Local.exe"` (or open Local from the Start menu), create `oderinde-cms`, and import `reference/wordpress/oderindestephen.WordPress.2026-10-22.xml`. (Verified)
3. **Confirm All Quality Gate Scripts:**
   - `npm.cmd run lint` (passes with 0 errors)
   - `npm.cmd run typecheck` (passes with 0 errors)
   - `npm.cmd run test` (passes 3/3 tests)
   - `npm.cmd run build` (compiles 4/4 static pages cleanly) (Verified)
4. **Push to Remote on Confirmation:** Reply with "tested and working" when satisfied to trigger the remote push to GitHub per `D-13` and `P-4`.

### Stephen Confirmation Record:
- **Confirmation Words:** "tested and working"
- **Date:** 2026-10-22
- **Status:** CONFIRMED COMPLETE BY STEPHEN. Ready for remote push to GitHub and progression to Phase 02.

## 14. Backend or external handoff

- `docs/local-cms-guide.md` provides complete local WordPress import and configuration instructions for `reference/wordpress/oderindestephen.WordPress.2026-10-22.xml`.
- No live production hosting or credentials are required or touched in Phase 01.
