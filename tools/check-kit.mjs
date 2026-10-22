import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

// Read-only integrity check. This does not test the future website implementation.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const failures = [];
let checks = 0;
const assert = (condition, message) => {
  checks++;
  if (!condition) failures.push(message);
};
const relative = value => path.relative(root, value).split(path.sep).join('/');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
const required = [
  'README.md', 'START-HERE.md', 'AGENTS.md', 'OderindeStephen-Headless-Build-Plan-v1.md',
  'BOOTSTRAP-PROMPT.md', 'ANALYSIS-PROMPT.md', 'plans/README.md', 'handoff/README.md',
  'docs/source-audit.md', 'docs/readiness.md', 'docs/contracts.md', 'docs/environment.md',
  'docs/launch-checklist.md', 'docs/editor-guide.md', '.gitignore',
  '.agents/rules/project-memory.md', '.agents/rules/plan-before-build.md',
  '.agents/rules/cms-and-seo.md', '.agents/rules/design-and-content.md', '.agents/rules/migration.md',
  'memory/corrections.md', 'memory/decisions.md', 'memory/patterns.md', 'memory/archive.md',
  'tools/audit-divi.mjs', 'tools/check-memory.py',
  'reference/normalized/summary.json', 'reference/normalized/asset-manifest.json',
  'prompts/00-discovery.md', 'prompts/01-windows-repository.md', 'prompts/02-cms-model-contracts.md',
  'prompts/03-vertical-slice-design.md', 'prompts/04-pages-content.md', 'prompts/05-seo-integrations.md',
  'prompts/06-qa-release-candidate.md', 'prompts/07-github-release.md',
  'prompts/08-remote-preview-cms.md', 'prompts/09-production-handover.md'
];
for (const name of required) assert(fs.existsSync(path.join(root, name)), `Missing required file: ${name}`);
const collect = dir => fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
  if (['reference', '.git', 'node_modules', 'apps', 'wordpress', '.next', '__pycache__'].includes(entry.name)) return [];
  const file = path.join(dir, entry.name);
  return entry.isDirectory() ? collect(file) : [file];
});
const documents = collect(root).filter(file => file.endsWith('.md'));
for (const file of documents) {
  const bytes = fs.readFileSync(file);
  assert(!bytes.includes(0), `NUL/possible UTF-16 corruption: ${relative(file)}`);
  let text;
  try { text = new TextDecoder('utf-8', { fatal: true }).decode(bytes); }
  catch { assert(false, `Invalid UTF-8: ${relative(file)}`); continue; }
  assert(!text.includes('\uFFFD'), `Replacement character: ${relative(file)}`);
  assert(!/FILL:|PROJECT_NAME|\bOWNER\b/.test(text), `Unfilled setup marker: ${relative(file)}`);
  if (relative(file).startsWith('memory/')) {
    assert(!/[^\x00-\x7F]/.test(text), `Memory is not ASCII: ${relative(file)}`);
    assert(text.trimEnd().split(/\r?\n/).length <= 200, `Memory exceeds 200 lines: ${relative(file)}`);
  }
}
for (const name of fs.readdirSync(path.join(root, '.agents/rules')).filter(name => name.endsWith('.md'))) {
  const file = `.agents/rules/${name}`;
  assert(/^---\r?\ntrigger: always_on\r?\n/.test(read(file)), `Invalid activation frontmatter: ${file}`);
  assert(Buffer.byteLength(read(file)) < 24000, `Rule exceeds current per-file limit: ${file}`);
}
const known = new Set();
for (const [family, prefix] of [['corrections', 'C'], ['decisions', 'D'], ['patterns', 'P']]) {
  const matcher = new RegExp(`^${family}(?:-(\\d+))?\\.md$`);
  const shards = fs.readdirSync(path.join(root, 'memory')).filter(name => matcher.test(name))
    .sort((a, b) => Number(a.match(matcher)[1] || 1) - Number(b.match(matcher)[1] || 1));
  const ids = new Set();
  for (const [index, name] of shards.entries()) {
    const text = read(`memory/${name}`);
    const sealed = text.includes('<!-- SEALED. Continues in memory/');
    assert(index === shards.length - 1 ? !sealed : sealed, `Invalid rollover seal: memory/${name}`);
    let fenced = false;
    for (const line of text.split(/\r?\n/)) {
      if (line.startsWith('```')) { fenced = !fenced; continue; }
      if (fenced) continue;
      const match = line.match(new RegExp(`^###\\s+(${prefix}-\\d+)(?=\\s|$)`));
      if (match) {
        assert(!ids.has(match[1]), `Duplicate memory ID: ${match[1]}`);
        ids.add(match[1]); known.add(match[1]);
      }
    }
  }
}
for (const file of documents.filter(file => !relative(file).startsWith('memory/'))) {
  const text = fs.readFileSync(file, 'utf8').replace(/```[\s\S]*?```/g, '');
  for (const match of text.matchAll(/(?<![\w-])([CDP]-\d+)(?![\w-])/g)) {
    assert(known.has(match[1]), `Dangling memory citation ${match[1]} in ${relative(file)}`);
  }
}
const template = read('plans/README.md');
for (let i = 1; i <= 14; i++) assert(template.includes(`## ${i}. `), `Plan template lacks section ${i}`);
if (fs.existsSync(path.join(root, 'reference/normalized/summary.json'))) {
  const summary = JSON.parse(read('reference/normalized/summary.json'));
  assert(summary.page_exports >= 8, 'Expected all eight supplied page exports');
  assert(summary.parser_errors === 0, 'Source audit contains parsing errors');
  for (const page of summary.page_summaries) {
    const source = path.join(root, 'reference/divi', page.source);
    // Source files are deliberately Git-ignored; a later repository clone may not contain them.
    if (!fs.existsSync(source)) continue;
    const digest = crypto.createHash('sha256').update(fs.readFileSync(source)).digest('hex');
    assert(digest === page.source_sha256, `Original source changed without re-audit: ${page.source}`);
    assert(fs.existsSync(path.join(root, page.detail)), `Missing normalized page: ${page.detail}`);
  }
  const assets = JSON.parse(read('reference/normalized/asset-manifest.json'));
  assert(new Set(assets.map(asset => asset.sha256)).size === assets.length, 'Asset manifest contains duplicate hashes');
  assert(assets.length === summary.unique_embedded_assets_by_sha256, 'Asset count differs from summary');
  assert(assets.reduce((sum, asset) => sum + asset.bytes, 0) === summary.unique_asset_bytes, 'Asset byte total differs from summary');
}
if (failures.length) {
  for (const failure of failures) console.error(`FAIL: ${failure}`);
  console.error(`${failures.length} failure(s) in ${checks} checks.`);
  process.exitCode = 1;
} else {
  console.log(`PASS: ${checks} integrity checks; ${documents.length} project Markdown files; ${known.size} memory entries.`);
  console.log('This verifies the workflow package, not application implementation or launch readiness.');
}
