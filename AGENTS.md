# OderindeStephen.com: project protocol

Stephen owns the project, approves implementation and confirms completion. This protocol applies to the public marketing website migration. Read it at the start of every task.

## Workspace and authority

One future Git repository: `oderindestephen-headless`. The kit is already present; application implementation has not started. Recommended stack pending review: TypeScript, Next.js App Router, React Server Components, Tailwind/CSS tokens, Zod, WordPress REST, ACF Pro and a small PHP integration plugin. Use npm and a committed lockfile.

Paths:

- `apps/web/`: future frontend and its tests/configuration.
- `wordpress/plugins/oderinde-headless/`: future CMS integration plugin.
- `wordpress/acf-json/`: future versioned field schema, loaded by that plugin.
- `content/approved/`: future reviewed public content/migration data.
- `reference/`: supplied exports and generated source evidence, not the runtime CMS.
- `plans/`, `docs/`, `handoff/`, `memory/`: review, evidence and continuity.

The project plan is `OderindeStephen-Headless-Build-Plan-v1.md`. A later explicit instruction from Stephen can change scope, but record the change and update its affected plan. Do not silently overwrite the older approved project master document. Actual code and captured responses establish implemented behavior; plans establish intent; analysis is a map. Label recommendations and unknowns honestly.

This project does not include a replacement database/backend framework, a marketing-site checkout, new authentication or the separate portal application. Do not introduce Prisma, Supabase, Redux, a second Node API, a second SEO plugin or WPGraphQL without an approved demonstrated need. Portal marketing links and illustrations still need functional/accuracy checks.

## Read before work

1. Scan all `memory/corrections*.md` trigger lines and open matching entries.
2. Open all `memory/decisions*.md` for architectural, CMS, API, naming or migration tasks.
3. Open all `memory/patterns*.md` before writing code or content.
4. Read the relevant phase prompt and latest task plan, including its actual approval record.
5. Read `docs/readiness.md` and the relevant source audit/contracts. If code analysis exists, use its gaps file to locate work, then inspect real source.

An empty correction file is intentional. Do not invent earlier mistakes or entry IDs. Open and quote an entry before citing it. A file family includes every numbered continuation, not just the first file.

## Plan and approval

Before application source, configuration, dependencies, CMS schema, deployment, content publication, production settings or migration changes, write a concrete plan in `plans/` using its 14-section template. Include affected files, confirmed/proposed contracts, quoted criteria, ordered verification, at least three real objections and rollback. A one-file change without dependency/contract changes may use two objections.

Stop for Stephen's `APPROVE` or `APPROVE WITH CHANGES`. Record the exact words/date/scope. Interview answers, a target date, silence or acknowledgement do not approve a proposed implementation. Once a plan is approved, finish its authorized steps without repeated confirmation. If requirements or approach materially change, revise the plan and ask once for the changed scope.

Read-only investigation and maintenance of planning, analysis, handoff and memory documents do not need a code implementation approval. Creating this kit was explicitly requested. Future edits to this protocol or `.agents/rules/` require approval; do not weaken them on your own authority. Paid service activation and production cutover each require concrete owner review.

Statuses: DRAFT; AWAITING APPROVAL; APPROVED; IN PROGRESS; IMPLEMENTED - AWAITING STEPHEN CONFIRMATION; BLOCKED; ABANDONED; SUPERSEDED BY a path. Only Stephen confirms completion; record it without claiming an agent test was owner confirmation.

## Evidence and execution

- Cite a real opened `path:line` or captured response for implementation claims. For Divi source evidence, use the original file, source ID and normalized block locator.
- Never invent existing post types, routes, field values, provider APIs, credentials, ratings, prices or customer outcomes. A new designed interface must be labeled proposed and approved before coding.
- Distinguish passed, failed, not attempted and blocked. A constant is not runtime behavior; mocked output is not a live integration test.
- Search before claiming something is absent; record the actual search and scope. Do not generalize absence in an export to absence in WordPress.
- Independent read-only checks may run concurrently through tools; serialize writes. Do not launch subagents unless Stephen explicitly requests parallel agent work.
- Keep a concise progress update during sustained work. Finish the authorized task; pause only for an approval gate, missing required input/access, a step that cannot work as approved, or a material owner decision.
- Consolidate owner-only questions after inspecting supplied material. Do not re-ask the known setup, Cal.com link, plugins or other recorded facts.
- Prefer the smallest maintainable implementation satisfying the criterion. Add meaningful boundary/integration tests; avoid tests that merely repeat markup or implementation details.

## CMS, SEO and content invariants

WordPress remains the editorial source. ACF sections are the recommended page editor; native blocks are the blog editor. Divi layouts and unresolved variables must be explicitly mapped. Real CMS data, draft isolation, publish invalidation and enquiry delivery are required before migration.

Booking actions resolve through one CMS setting initially `https://cal.com/oderinde/free`. Preserve valuable public URLs, media URLs, metadata and verified redirect intent. Rank Math values must actually render in frontend HTML. WordPress plugins do not automatically render or track the separate frontend. CMS-origin links and accidental noindex directives must not leak into public SEO output.

Preserve the dark/blue homepage branding, rem typography, WCAG 2.2 AA target and appropriate image crop. Improve content and layouts through review. Use first-person business copy consistent with source material. Verify claims, testimonials, pricing currencies, external destinations and the resource download before publication.

## Secret and production boundaries

No credentials, database dumps, complete backups, private leads or licensed plugin archives in Git or chat. Server secrets never use `NEXT_PUBLIC_`. Local and preview environments must not accidentally send production notifications. Public APIs must not expose drafts or private fields. Validate signatures, permissions, inputs and destination paths.

Finish and verify local work, push and verify the GitHub release, and test protected remote preview before production migration. Keep the live WordPress installation intact until cutover is approved. Preserve Cloudflare mail/portal records, retain a tested backup and exact DNS rollback targets. The 24 October 2026 target does not permit skipped launch checks or silent scope reduction.

## Memory maintenance

Write immediately when Stephen corrects an error, a decision changes, a convention is stated, a costly discovery matters again, or a rule failed. Search the complete family first; update an existing entry rather than duplicating it. Keep active history; supersede rather than delete. Do not seed fictional correction history.

Use plain ASCII in memory files, UTF-8 file editing, and at most 200 lines per file. Avoid shell redirection for memory writes. Read back the result. Merge duplicates, archive superseded entries older than 30 days, then create a numbered shard if needed. IDs remain monotonic across the family. Seal an old shard with `<!-- SEALED. Continues in memory/<family>-<n>.md -->` only when the next file exists.

Entry formats:

```text
### C-<n> - Title
- Trigger: search terms for the relevant task
- I did: real mistake
- Correct: required behavior
- Why: consequence
- Repo: all or concrete scope
- Date: YYYY-MM-DD

### D-<n> - Title
- Decision: actual decision or clearly labeled proposal
- Rejected: alternatives and reasons
- Applies to: scope
- Status: active | pending confirmation | superseded by an actual ID
- Date: YYYY-MM-DD

### P-<n> - Title
- Rule: convention
- Applies when: retrieval cue
- Example: real file/section or verified implementation locator
- Date: YYYY-MM-DD
```

Run `node tools/check-kit.mjs` after protocol/memory edits. The adapted `tools/check-memory.py` offers additional standard-library checks when Python is available. At task end state the plan path/status, real verification, unresolved limits and memory updates in a concise report.
