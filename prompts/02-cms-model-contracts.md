# Phase 02: CMS model, migration mapping and API contracts

Apply AGENTS.md. Read the build plan, docs/contracts.md, docs/environment.md, actual WordPress export/plugin state and all relevant normalized source fields/loops. Inspect the existing CPTs, ACF fields, IDs, media, URLs, permissions and REST schemas. Do not invent their current names or create duplicate post types.

Write plans/P02-cms-model-contracts.md with exact new/changed PHP files, ACF field definitions, reviewed content mapping, proposed route/settings/form/preview/event contracts, permissions, error/cache behavior and meaningful integration checks. Separate documented native interfaces from new designed interfaces. Wait for approval.

Implement only the approved CMS scope in wordpress/plugins/oderinde-headless and wordpress/acf-json. Use public allowlists for content/settings and private storage for enquiries. Preserve existing post meanings and public paths. Expose only intended ACF groups via REST, handle all pagination and capture actual sample responses. Content migration must be reversible/idempotent and must not overwrite private leads or source evidence. Record field/schema versus content export responsibilities.

Test invalid/private/draft requests and the actual plugin through WordPress, plus PHP syntax. Do not call mocked contracts integrated. Record verified schemas and any remaining external dependency in docs/contracts.md and a matching handoff document.

Acceptance criterion: "The agreed CMS model and contracts expose real published content safely, preserve existing content meaning, and exclude private/draft data from public access, with captured integration evidence."
