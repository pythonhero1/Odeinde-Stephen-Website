# Start here: Windows and Antigravity

For Stephen | 22 October 2026 | Target launch 24 October 2026

## 1. Put the package in one project folder

Extract the ZIP so that this file, `AGENTS.md`, and the build plan sit together at a path such as `C:\Projects\oderindestephen-headless`. Avoid accidentally opening its parent folder or opening only `apps/web`. Keep this project outside the live WordPress directory.

Open the project root in Antigravity v2.24.0. Node.js and Git are already installed; their versions and compatibility still need checking. Application scaffolding is a later approved step.

## 2. Read the plan and review the open decisions

Read `OderindeStephen-Headless-Build-Plan-v1.md`. Recommended runtime: Next.js, TypeScript, Tailwind, headless WordPress REST, ACF Pro sections, and a small project PHP plugin. The frontend host recommendation is Vercel Pro; its cost and a separate host still require your approval. The current Spantrix plan remains the proposed CMS host.

The initial workflow collects missing owner-only inputs together. It must not repeatedly ask for the booking link, installed tools or other information already recorded. Booking is `https://cal.com/oderinde/free`.

## 3. Confirm the rules load

Open the agent's Customizations/Rules area where available. Confirm the files in `.agents/rules/` are recognized. They start with `trigger: always_on`. Current Antigravity documentation supports `.agents/rules/`; installed interfaces can differ. Restart the application after extracting if rules are not visible. Check that the folder you opened is the one containing these rules.

Use this explicit fallback instruction in the first conversation even when rules appear loaded:

```text
Read AGENTS.md at the project root, all .agents/rules/*.md files,
memory/corrections.md, memory/decisions.md, memory/patterns.md,
START-HERE.md, and OderindeStephen-Headless-Build-Plan-v1.md.
The project is the public oderindestephen.com headless migration.
Apply the root protocol to this session. Architecture recommendations
are not approved yet. Do not implement or change production.
Then follow prompts/00-discovery.md.
```

This workflow uses explicit prompt files. Do not assume that an old `/workflow-name` command will discover them: Google's current documentation announces legacy workflow indexing changes effective 19 October 2026. See the official references in the build plan. If Antigravity cannot demonstrate rule loading, use the explicit read instruction and resolve that before coding.

## 4. Run the read-only source checks

Open PowerShell at the project root. These commands do not install software or change production. The audit writes generated reports and, with its extra flag, extracted reference assets locally.

```powershell
node --version
npm.cmd --version
git --version
node tools/check-kit.mjs
node tools/audit-divi.mjs
```

Optional asset recovery:

```powershell
node tools/audit-divi.mjs --extract-assets
```

The included audit already found eight valid exports, 124 embedded image records and 78 unique assets. Extraction creates `reference/assets/`. This does not recover missing CPT records, header/footer templates, full media metadata, original font files or the Pipe Patch Pro images. Export those from WordPress during discovery. Do not treat generated source audits as a test of the live site.

The supplied Python checker is adapted to exclude source references from template-marker scans. Python is not required for starting the kit. If it is installed, run:

```powershell
py -3 tools/check-memory.py
```

## 5. Prepare a real local WordPress clone

During the approved setup phase, install Local for Windows, create a local site and trust its HTTPS certificate. Use a full WordPress database plus required `wp-content` export from a verified backup, or a reviewed migration export that includes posts, CPTs, ACF values, media and SEO settings. Divi JSON alone cannot reproduce all this data.

Keep backup files and local credentials outside Git. In the local clone, prevent unintended mail and background tasks while importing. Use a mail capture tool or a verified test mailbox for local testing; enable real delivery only for the approved verification step. Do not accidentally send production notifications from a clone. Record the local CMS hostname and use it only in local environment settings.

Do not modify the live site's URL, nameservers, plugins, content or database to create the local clone. Confirm any plugin license activation against its staging/local terms through the owner's account.

## 6. Approve and implement one concrete plan at a time

Use `prompts/00-discovery.md` first. The agent prepares a plan/readiness document and consolidates unknown facts. For a development phase it must create a file such as `plans/P01-windows-repository.md` with the exact changes, verification, objections and rollback.

Read that file. Reply `APPROVE` or `APPROVE WITH CHANGES` and specify the changes. The agent records your words and then completes that approved scope, maintaining evidence. It should not ask again for each already approved step. Scope changes, paid activation and production cutover require their own concrete review. A general acknowledgement is not the kit's implementation approval.

When a phase is implemented, review its visible outcome and tests. Only you confirm completion. Use the next numbered prompt when its prerequisites pass.

## 7. Create the frontend and GitHub repository in the approved setup phase

Antigravity should inspect the existing folder, verify ignores and initialize a single Git repository before scaffolding. The following commands belong to Phase 01, after approval:

```powershell
git init -b main
npx.cmd create-next-app@latest apps/web --use-npm
```

Customize the wizard as described in build plan section 11. Choose TypeScript, Tailwind, ESLint, `src`, and App Router; keep Cache Components off for the initial agreed cache model. The wizard's exact prompts must be checked against its current version. Record and pin the resulting dependency versions. If a repository already exists by this point, inspect it rather than reinitializing blindly.

Use GitHub's signed-in interface or an approved CLI login to create a private repository. Copy the actual HTTPS remote URL. Do not insert guessed account names into commands. Inspect staged files before committing; verify that no secrets, backups or licensed plugin binaries are staged. The final locally complete release must be pushed and verified before migration begins.

## 8. Run the frontend and actual checks

After the frontend exists:

```powershell
npm.cmd --prefix apps/web run dev
```

Open `http://localhost:3000`. The approved build must add meaningful `lint`, `typecheck`, `test` and `test:e2e` scripts before the following release checks are used:

```powershell
npm.cmd --prefix apps/web run lint
npm.cmd --prefix apps/web run typecheck
npm.cmd --prefix apps/web run test
npm.cmd --prefix apps/web run build
npm.cmd --prefix apps/web run test:e2e
```

The browser suite needs its documented web server/base URL configuration and real CMS integration checks. Do not call a command passing when the script is missing, no tests ran, or the CMS was replaced by fixtures. Run PHP syntax checks through the local WordPress/PHP environment for the project plugin.

## 9. Resume a later session

Paste this when returning:

```text
Read AGENTS.md and the memory files, then the latest approved plan,
docs/readiness.md if present, and the relevant phase prompt.
Inspect the current Git state and real implementation before continuing.
State the exact approved scope and next unchecked criterion in one line.
Continue approved work without asking again. For a new task, prepare
the concrete plan and wait for approval. Never invent missing evidence.
```

## 10. Before migration

Use `docs/launch-checklist.md` and Phase 08/09 prompts. The frontend preview must use a remotely reachable CMS; Vercel cannot reach your local `.local` site. Keep production WordPress operating until the complete GitHub release, content, remote preview, email, SEO, backups and rollback have passed review.

The 24 October target does not override these gates. The exact affected DNS records and rollback are presented for your approval before changes.
