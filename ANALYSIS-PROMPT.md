# Codebase analysis after implementation begins

This is a greenfield frontend with existing CMS references. Do not fabricate a codebase map before application source exists. Source exports are already mapped in docs/source-audit.md and reference/normalized/.

When real code exists, read AGENTS.md and inspect the whole repository. Create a dated docs/analysis map with evidence and explicit coverage. Proposed stable files: 00-inventory.md, 01-architecture.md, 02-contract.md, 03-safety.md, one 04-features-domain.md per actual domain, 05-diagrams.md when a diagram clarifies relationships, 06-gaps.md, 07-doc-reconciliation.md and README.md.

Derive domains from real code: likely CMS content, frontend pages, enquiries, SEO and publishing, but do not force this list if implementation differs. Explain which files were inspected, what is verified, unimplemented or unresolved, and cite real code locators. The map locates work; code and captured behavior remain authoritative.

Create only planning/analysis documents in this pass. Do not refactor, implement missing features or alter a tracker status. Update incomplete coverage honestly and allow a later session to resume. Preserve numbering and distinguish sources, intent and actual behavior.
