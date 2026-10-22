# Task plans

One file per concrete task or approved phase. Copy the following template. The main build plan describes the project; it does not automatically approve every later file change.

Status sequence: DRAFT, AWAITING APPROVAL, APPROVED, IN PROGRESS, IMPLEMENTED - AWAITING STEPHEN CONFIRMATION. Also allowed: BLOCKED, ABANDONED, SUPERSEDED BY a path. Stephen's confirmation is recorded in section 13. Do not label unreviewed work complete.

```markdown
# P01: Windows and repository setup

- Task: P01
- Status: DRAFT
- Created: YYYY-MM-DD
- Updated: YYYY-MM-DD
- Repository: oderindestephen-headless

## 1. Task

Restate the exact requested result in one sentence.

## 2. Memory that applies

Quote actual matching entries after opening them. If none apply, name the files and triggers checked. Do not invent an entry ID.

## 3. Files affected

| Path | Create/modify/delete | Purpose |
| --- | --- | --- |
| Exact file path | action | reason |

List the concrete files for this phase; no open-ended permission to modify unrelated areas. Record generated scaffold files after the wizard preview before accepting scope changes.

## 4. Contract status

| Interface | Existing and verified / proposed / unknown | Evidence or decision |
| --- | --- | --- |
| Interface | status | locator |

A proposed interface needs an agreed schema and approval before implementation. An unknown existing interface must be inspected rather than guessed.

## 5. Scope check

Quote the relevant acceptance criteria verbatim from the project plan, phase prompt or a later explicit instruction. List prerequisites and exclusions relevant to this task.

## 6. Steps

Ordered changes, each naming the affected files and its meaningful verification. Include dependencies and recovery steps.

## 7. Objections

At least three real objections, rated blocker, serious or minor, each with a resolution or accepted tradeoff. Exactly one file with no dependency/contract change may use two objections. Review missing CMS data, SEO/drafts, compatibility, performance, irreversible actions and owner expectations where applicable.

## 8. Verdict

BLOCKED with a consolidated list of facts only Stephen can supply, or READY FOR APPROVAL with a concise explanation.

## 9. Approval

Record Stephen's exact words, date, approved changes and scope. Until received: NOT APPROVED. Acceptance of the interview answers is not approval of the implementation plan.

## 10. Implementation log

Record actual steps, real file locators, commands and results as work occurs. Clearly distinguish not attempted, failed, passed and implemented awaiting review.

## 11. Deviations

| Planned | Found | Resolution | Approval impact |
| --- | --- | --- | --- |

## 12. Memory written

Actual entry IDs and changes, or why no memory trigger fired.

## 13. For Stephen to confirm

Concrete visible checks and results against section 5. Record Stephen's confirmation separately from agent-reported verification.

## 14. Backend or external handoff

Reference the matching handoff file for unconfirmed external contracts, or state why no handoff is needed. Include migration/operations instructions when relevant without secret values.
```
