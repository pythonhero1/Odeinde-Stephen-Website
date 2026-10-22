# OderindeStephen headless WordPress workflow

Prepared for Stephen on 22 October 2026. Start with `START-HERE.md`, then read `OderindeStephen-Headless-Build-Plan-v1.md`.

This package adapts the supplied agent-kit-v2 planning, memory, review, analysis and handoff structure to the actual WordPress/Divi migration. It includes the eight original page exports unchanged, normalized source audits, a recoverable image manifest, project rules, a task plan template and ten phase prompts. The website application and WordPress integration plugin are future implementation work behind the approval gate.

## Important paths

| Path | Purpose |
| --- | --- |
| `START-HERE.md` | Windows and Antigravity instructions, first prompt and daily routine. |
| `OderindeStephen-Headless-Build-Plan-v1.md` | Recommended architecture, scope, CMS editing, setup, implementation, SEO, migration, schedule and handover. |
| `AGENTS.md` | Project protocol, evidence, memory and approval rules. |
| `.agents/rules/` | Short persistent rules for the installed Antigravity project. |
| `prompts/00-discovery.md` through `09-production-handover.md` | Read or paste one at a time. These do not depend on legacy slash workflow discovery. |
| `plans/README.md` | The 14-section task plan template, including approval and implementation evidence. |
| `docs/source-audit.md` | Actual findings from every supplied page export. |
| `docs/contracts.md`, `docs/environment.md` | Proposed API contracts and environment design; confirm before implementation. |
| `docs/launch-checklist.md`, `docs/editor-guide.md` | Verification and future editorial handover. |
| `memory/` | Verified decisions/conventions; no fabricated correction history. |
| `reference/divi/` | The eight original exports. Kept local by the supplied Git ignore rules. |
| `reference/normalized/` | Human and machine readable per-page audit with source IDs/block locators. |
| `tools/audit-divi.mjs` | Node-only audit and optional embedded image extraction. |
| `tools/check-kit.mjs` | Node-only package/protocol validation. |
| `tools/check-memory.py` | Adapted supplied standard-library memory checker, optional if Python is available. |

Architecture recommendations and frontend hosting spend are awaiting review. The package does not change production, buy hosting, create a GitHub repository, or modify the approved older project document.

## First action

Open this folder in Antigravity and send the text from `prompts/00-discovery.md`. It should produce a concrete plan/readiness report and wait for approval before application changes.
