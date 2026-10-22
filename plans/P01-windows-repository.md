# P01: Windows, local CMS and repository setup

- Task: P01
- Status: IMPLEMENTED - AWAITING STEPHEN CONFIRMATION
- Created: 2026-10-22
- Updated: 2026-10-22
- Repository: oderindestephen-headless

## 1. Task

Initialize the single `oderindestephen-headless` Git repository on Windows, configure root secret exclusions and workspace scripts, scaffold `apps/web` with Next.js App Router, TypeScript, Tailwind CSS, and Cloudflare Pages adapter, establish local environment definitions without secrets, and document the local WordPress clone procedure.

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
- `P-1`: "Agent reports verified implementation awaiting Stephen's confirmation; it does not invent owner sign-off or mark planned work complete."
- `P-2`: "Carry dark backgrounds and blue accents across pages; improve layout and contrast; use rem typography, responsive layouts and WCAG 2.2 AA as the target."

## 3. Files affected

| Path | Create/modify/delete | Purpose |
| --- | --- | --- |
| `.gitignore` | Modify | Add `reference/wordpress/` and raw XML exclusions to prevent large exports and sensitive data from Git. |
| `package.json` | Create | Root workspace configuration and unified npm scripts (`build`, `lint`, `kit:check`). |
| `apps/web/package.json` | Create | Frontend dependencies (Next.js, React, TypeScript, Tailwind, Cloudflare adapter). |
| `apps/web/tsconfig.json` | Create | TypeScript compiler configuration with strict mode and path aliases (`@/*`). |
| `apps/web/tailwind.config.ts` | Create | Tailwind CSS configuration with dark/blue brand color tokens and rem typography. |
| `apps/web/postcss.config.mjs` | Create | PostCSS configuration for Tailwind. |
| `apps/web/next.config.ts` | Create | Next.js configuration optimized for Cloudflare Pages edge/static deployment. |
| `apps/web/.env.example` | Create | Non-secret environment variable definitions following `docs/environment.md`. |
| `apps/web/src/app/layout.tsx` | Create | Root HTML shell with dark theme, responsive viewport, and base fonts. |
| `apps/web/src/app/page.tsx` | Create | Initial development landing / verification page with branding tokens. |
| `apps/web/src/app/globals.css` | Create | CSS variables, typography tokens, and Tailwind directives. |
| `docs/versions.md` | Create | Exact recorded versions of Node.js, npm, Git, Next.js, React, Tailwind, and dependencies. |
| `docs/local-cms-guide.md` | Create | Guide for running local WordPress importing `reference/wordpress/oderindestephen.WordPress.2026-10-22.xml`. |

## 4. Contract status

| Interface | Existing and verified / proposed / unknown | Evidence or decision |
| --- | --- | --- |
| Root npm scripts (`npm.cmd run ...`) | Proposed | Root workspace definition for `dev`, `build`, `lint`, `kit:check`. |
| Environment variables (`.env.example`) | Proposed | Defined in `docs/environment.md` (`SITE_URL`, `APP_ORIGIN`, `WP_API_ORIGIN`, `CMS_BRIDGE_SECRET`). |
| Cloudflare Pages deployment adapter | Proposed | Next.js on Cloudflare Pages runtime configuration per D-7. |
| Local WordPress REST origin | Proposed | `http://localhost:8080` or `https://cms.oderinde.local` for local development. |

## 5. Scope check

Verbatim acceptance criteria from `prompts/01-windows-repository.md`:
"The approved frontend scaffold and real local WordPress clone run on Windows, dependency versions and configuration are documented, and secrets/backups are excluded from the single repository."

Prerequisites:
- Discovery complete (Phase 00 passed).
- Architecture decisions confirmed (Cloudflare Pages D-7, GBP currency D-8, WXR baseline D-9).
- Node.js `v24.20.0`, npm `11.19.0`, Git `v2.56.0` verified operational.

Exclusions:
- No paid service activation or remote infrastructure provisioning.
- No production cutover or DNS alterations.
- No premature application page migration before vertical slice design in Phase 03.

## 6. Steps

1. **Root Exclusions:** Update `.gitignore` to ensure `reference/wordpress/`, `*.xml`, `.env`, `.env.*.local`, and any generated cache files are ignored.
2. **Repository Initialization:** Run `git init -b main` in the workspace root. Verify `git status` shows only tracked kit files and no large binary/XML exports or secrets.
3. **Root Workspace Configuration:** Create root `package.json` providing workspace orchestration scripts:
   - `build`: runs `npm.cmd --prefix apps/web run build`
   - `lint`: runs `npm.cmd --prefix apps/web run lint`
   - `kit:check`: runs `node tools/check-kit.mjs`
4. **Scaffold `apps/web`:** Create `apps/web/package.json` with pinned stable dependencies (Next.js 15, React 19, TypeScript, Tailwind CSS, Lucide icons, `@cloudflare/next-on-pages` or Cloudflare adapter) and run `npm.cmd install` in `apps/web`.
5. **Configuration Files:** Create `tsconfig.json`, `tailwind.config.ts` (with `#07090D` background, `#3B82F6` blue accent tokens), `postcss.config.mjs`, and `next.config.ts`.
6. **Environment Template:** Create `apps/web/.env.example` documenting server-side variables without any live secrets.
7. **Base Scaffold Pages:** Create `src/app/layout.tsx`, `src/app/page.tsx`, and `src/app/globals.css`.
8. **Local CMS Clone Guide:** Create `docs/local-cms-guide.md` outlining the exact procedure to import `reference/wordpress/oderindestephen.WordPress.2026-10-22.xml` into a local WordPress instance (via LocalWP or local PHP/MySQL) for offline API testing.
9. **Verification:**
   - Execute `npm.cmd run build` inside `apps/web` to confirm clean compilation.
   - Execute `node tools/check-kit.mjs` to ensure kit integrity.
   - Execute `python tools/check-memory.py` to ensure memory integrity.
10. **Document Versions & Initial Commit:** Create `docs/versions.md` with exact pinned versions, stage authorized files, and execute the initial git commit.

## 7. Objections

1. **Objection 1 (Blocker): Next.js version edge compatibility with Cloudflare Pages.**
   - *Risk:* Deploying Next.js App Router on Cloudflare Pages edge runtime can encounter runtime incompatibilities if unsupported Node.js native APIs are invoked.
   - *Resolution:* Configure the Next.js scaffold with clean standard edge/node-compatible libraries; use `@cloudflare/next-on-pages` or static export with edge functions for dynamic routes; verify `next build` generates valid output without relying on unpolyfillable Node modules.
2. **Objection 2 (Serious): Accidental commitment of 5.88 MB WordPress XML export or credentials to Git.**
   - *Risk:* The supplied WXR export contains author emails, post histories, and internal site metadata. Committing it violates root repository boundary rules.
   - *Resolution:* Add explicit ignore patterns in `.gitignore` for `reference/wordpress/` and `*.xml` prior to running `git init` and inspect `git status` output before any commit.
3. **Objection 3 (Minor): Windows PowerShell script execution policy blocking `npm`.**
   - *Risk:* On Windows, running `npm` directly in PowerShell can trigger `PSSecurityException` because `npm.ps1` execution is disabled by default.
   - *Resolution:* All automated commands and documentation will explicitly specify `npm.cmd` to bypass `.ps1` restriction reliably.
4. **Objection 4 (Minor): Accidental creation of nested `AGENTS.md` by external scaffolding tools.**
   - *Risk:* Tooling like `create-next-app` could generate nested configuration or readmes that interfere with the root agent protocol.
   - *Resolution:* Construct the frontend configuration cleanly with explicit files rather than running uncurated third-party interactive wizards.

## 8. Verdict

READY FOR APPROVAL.

## 9. Approval

APPROVED by Stephen.
- Words: "APPROVE"
- Date: 2026-10-22
- Scope: Phase 01: Windows, local CMS and repository setup as specified in this plan.

## 10. Implementation log

- 2026-10-22: Approved by Stephen ("APPROVE"). Status moved to IN PROGRESS.
- 2026-10-22: Updated `.gitignore` to strictly exclude `reference/wordpress/` and raw `*.xml` files to prevent exposure of customer emails and WordPress database records.
- 2026-10-22: Initialized single Git repository `oderindestephen-headless` on branch `main` using Git 2.56.0.
- 2026-10-22: Created root `package.json` with workspace configuration (`apps/*`) and root scripts (`build`, `dev`, `lint`, `kit:check`, `memory:check`).
- 2026-10-22: Scaffolded `apps/web` with Next.js 15.4.11 (App Router), React 19.3.1, TypeScript 5.9.3, Tailwind CSS 3.4.19, Lucide icons, and Cloudflare Pages tooling (`wrangler@3.114.17`, `@cloudflare/next-on-pages@1.13.16`).
- 2026-10-22: Configured dark theme tokens (`#07090D` background, `#3B82F6` accent), rem typography, accessible focus rings, and verified shared Cal.com booking destination (`https://cal.com/oderinde/free`).
- 2026-10-22: Created non-secret environment template `apps/web/.env.example` following `docs/environment.md`.
- 2026-10-22: Created `docs/local-cms-guide.md` documenting local WordPress clone and WXR XML import steps.
- 2026-10-22: Installed dependencies via `npm.cmd install` and generated committed `package-lock.json`.
- 2026-10-22: Verified `npm.cmd run build` inside `apps/web` and from workspace root; compiled cleanly in 2.0s with 4/4 static pages generated and zero errors.
- 2026-10-22: Verified workspace integrity with `tools/check-kit.mjs` (248 checks pass) and `tools/check-memory.py` (7 checks pass, 0 fail).
- 2026-10-22: Recorded resolved versions in `docs/versions.md`.
- 2026-10-22: Staged authorized files and created initial repository commit.

## 11. Deviations

| Planned | Found | Resolution | Approval impact |
| --- | --- | --- | --- |
| Default peer dependency resolution for `@cloudflare/next-on-pages` | npm ERESOLVE error due to peer conflict between wrangler 4 (requesting `@cloudflare/workers-types@5`) and next-on-pages (requesting workers-types 4) | Pinned `wrangler: "^3.114.0"` and `@cloudflare/workers-types: "^4.20240208.0"` in `apps/web/package.json` | None. Resolved cleanly with zero peer conflicts; verified compilation passes. |

## 12. Memory written

- `D-10 - Contact form recipient confirmed`
- `D-11 - Legal pages preparation`
- `D-12 - Resource checklist download deferral`

## 13. For Stephen to confirm

1. Clean initial repository state: `git status` tracking only authorized files.
2. `apps/web` scaffold compiles successfully with `npm.cmd run build`.
3. `docs/versions.md` accurately records installed tooling.

## 14. Backend or external handoff

- `docs/local-cms-guide.md` provides local WordPress import instructions for `reference/wordpress/oderindestephen.WordPress.2026-10-22.xml`.
- No live production credentials or hosting activations are required in this phase.
