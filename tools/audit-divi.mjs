import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

// Reads Divi JSON as data. Never evaluates code, follows URLs, or changes sources.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const input = path.join(root, 'reference', 'divi');
const output = path.join(root, 'reference', 'normalized');
const extract = process.argv.includes('--extract-assets');
const assetDir = path.join(root, 'reference', 'assets');
fs.mkdirSync(output, { recursive: true });
if (extract) fs.mkdirSync(assetDir, { recursive: true });
const hash = value => crypto.createHash('sha256').update(value).digest('hex');
const clean = value => String(value).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
const esc = value => String(value).replace(/\|/g, '\\|').replace(/[\r\n]+/g, ' ');
const slugify = value => value.normalize('NFKD').replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase();
const walk = function* (value, locator = '') {
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) yield* walk(value[i], `${locator}/${i}`);
  } else if (value && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) yield* walk(child, `${locator}/${key}`);
  } else if (typeof value === 'string') yield [locator, value];
};
const summaries = [];
const assets = new Map();
const urls = new Map();
let errors = 0;
for (const name of fs.readdirSync(input).filter(name => name.endsWith('.json')).sort()) {
  const sourceBytes = fs.readFileSync(path.join(input, name));
  const source = JSON.parse(sourceBytes.toString('utf8').replace(/^\uFEFF/, ''));
  if (source.context !== 'et_builder' || !source.data) throw new Error(`Unsupported export: ${name}`);
  const page = {
    source: name, source_sha256: hash(sourceBytes), bytes: sourceBytes.length,
    source_ids: Object.keys(source.data), context: source.context,
    modules: {}, versions: [], headings: [], texts: [], buttons: [],
    sections: [], form_fields: [], links: [], dynamic_values: [], blocks: [],
    global_colors: source.global_colors, global_variables: source.global_variables,
    page_settings_meta: source.page_settings_meta, embedded_images: [], issues: []
  };
  const versions = new Set();
  const links = new Set();
  const dynamics = new Set();
  let index = 0;
  for (const [sourceId, content] of Object.entries(source.data)) {
    if (typeof content !== 'string') throw new Error(`Expected block markup in ${name}`);
    const pattern = /<!--\s+wp:(divi\/[\w-]+)(?:\s+(\{[\s\S]*?\}))?\s*\/?-->/g;
    for (const match of content.matchAll(pattern)) {
      const type = match[1];
      let attrs;
      try { attrs = JSON.parse(match[2] || '{}'); }
      catch (error) { errors++; page.issues.push(`Block ${index}: ${error.message}`); continue; }
      const locator = `data[${sourceId}], block ${index}`;
      page.blocks.push({ index, source_id: sourceId, type, attrs });
      page.modules[type] = (page.modules[type] || 0) + 1;
      if (attrs.builderVersion) versions.add(attrs.builderVersion);
      const title = attrs.title?.innerContent?.desktop?.value;
      if (type === 'divi/heading' && typeof title === 'string') page.headings.push({ text: clean(title), locator });
      const text = attrs.content?.innerContent?.desktop?.value;
      if (type === 'divi/text' && typeof text === 'string') page.texts.push({ text: clean(text), html: text, locator });
      if (type === 'divi/code') page.issues.push(`${locator}: custom code requires manual port and accessibility review; never execute the exported code during auditing.`);
      const section = attrs.module?.meta?.adminLabel?.desktop?.value;
      if (type === 'divi/section' && section) page.sections.push({ text: section, locator });
      if (type === 'divi/button') {
        const button = attrs.button?.innerContent?.desktop?.value || {};
        const item = { label: clean(button.text || ''), href: button.linkUrl || '', locator };
        page.buttons.push(item);
        if (!item.href) page.issues.push(`${locator}: button has no URL: ${item.label}`);
        if (/book.*call/i.test(item.label) && item.href !== 'https://cal.com/oderinde/free') page.issues.push(`${locator}: booking CTA needs the shared Cal.com setting: ${item.label} -> ${item.href || '(empty)'}`);
      }
      if (type === 'divi/contact-field') {
        const field = attrs.fieldItem || {};
        page.form_fields.push({
          id: field.advanced?.id?.desktop?.value,
          label: field.innerContent?.desktop?.value,
          type: field.advanced?.type?.desktop?.value,
          required: field.advanced?.requiredMark?.desktop?.value === 'on',
          options: field.advanced?.selectOptions?.desktop?.value || [], locator
        });
      }
      for (const [attribute, value] of walk(attrs)) {
        if (value.includes('$variable(')) dynamics.add(value);
        if (/linkUrl|\/url$|\/href$/i.test(attribute) && value && !/\.(avif|png|jpe?g|webp|svg|gif)(?:[?#]|$)/i.test(value)) links.add(value);
        for (const anchor of value.matchAll(/href\s*=\s*["']([^"']+)["']/gi)) links.add(anchor[1]);
      }
      index++;
    }
  }
  page.versions = [...versions].sort();
  page.links = [...links].sort();
  page.dynamic_values = [...dynamics];
  for (const [key, value] of Object.entries(source.images || {})) {
    if (!value || typeof value !== 'object' || typeof value.encoded !== 'string') continue;
    const encoded = value.encoded.replace(/\s/g, '');
    const bytes = Buffer.from(encoded, 'base64');
    if (bytes.toString('base64').replace(/=+$/, '') !== encoded.replace(/=+$/, '')) throw new Error(`Invalid base64 image in ${name}: ${key}`);
    const digest = hash(bytes);
    const url = value.url || key;
    let basename;
    try { basename = path.posix.basename(new URL(url).pathname); }
    catch { basename = 'asset.bin'; }
    basename = basename.replace(/[^a-zA-Z0-9._-]/g, '-');
    const file = `${digest.slice(0, 12)}-${basename || 'asset.bin'}`;
    if (!assets.has(digest)) assets.set(digest, { sha256: digest, bytes: bytes.length, file, sources: [], urls: [] });
    const asset = assets.get(digest);
    if (!asset.sources.includes(name)) asset.sources.push(name);
    if (!asset.urls.includes(url)) asset.urls.push(url);
    if (urls.has(url) && urls.get(url) !== digest) page.issues.push(`Different embedded bytes share an image URL: ${url}`);
    urls.set(url, digest);
    page.embedded_images.push({ url, id: value.id || null, sha256: digest, bytes: bytes.length, extracted_file: `reference/assets/${file}` });
    if (extract && !fs.existsSync(path.join(assetDir, file))) fs.writeFileSync(path.join(assetDir, file), bytes);
  }
  const slug = slugify(name.replace(/\.json$/i, ''));
  fs.writeFileSync(path.join(output, `${slug}.json`), JSON.stringify(page, null, 2) + '\n');
  const report = [
    `# Source audit: ${name}`, '',
    'This is an export audit, not evidence of the live rendered page, its current URL, publication status, or functioning integrations.', '',
    `- SHA-256: \`${page.source_sha256}\``,
    `- Source post IDs: ${page.source_ids.join(', ')}`,
    `- Divi versions recorded in blocks: ${page.versions.join(', ')}`,
    `- Blocks: ${page.blocks.length}; embedded image records: ${page.embedded_images.length}`,
    `- Parsed detail: \`reference/normalized/${slug}.json\``, '',
    '## Module counts', '', '| Module | Count |', '| --- | --- |',
    ...Object.entries(page.modules).map(([key, count]) => `| ${key} | ${count} |`), '',
    '## Headings', '', ...page.headings.map(item => `- ${item.text} [${item.locator}]`), '',
    '## Buttons', '', '| Label | Destination | Source locator |', '| --- | --- | --- |',
    ...page.buttons.map(item => `| ${esc(item.label)} | ${esc(item.href || '(missing)')} | ${item.locator} |`), '',
    '## Contact fields', '', ...page.form_fields.map(item => `- ${item.label}: ${item.type}; required=${item.required} [${item.locator}]`), '',
    '## Issues found in export', '', ...(page.issues.length ? page.issues.map(item => `- ${item}`) : ['No parser-level issues identified. Runtime functionality is unverified.']), '',
    '## Content', '', ...page.texts.map(item => `${item.text}\n\nSource: ${item.locator}\n`), ''
  ];
  fs.writeFileSync(path.join(output, `${slug}.md`), report.join('\n'));
  summaries.push({ source: name, source_sha256: page.source_sha256, source_ids: page.source_ids,
    blocks: page.blocks.length, headings: page.headings.length, sections: page.modules['divi/section'] || 0,
    buttons: page.buttons.length, embedded_images: page.embedded_images.length,
    forms: page.modules['divi/contact-form'] || 0, dynamic_values: page.dynamic_values.length,
    issues: page.issues.length, links: page.links, detail: `reference/normalized/${slug}.json` });
}
const uniqueAssets = [...assets.values()].sort((a, b) => a.file.localeCompare(b.file));
const summary = {
  generated_at: new Date().toISOString(), interpretation: 'Source exports only; verify the live CMS separately.',
  page_exports: summaries.length, parser_errors: errors,
  unique_embedded_assets_by_sha256: uniqueAssets.length,
  unique_asset_bytes: uniqueAssets.reduce((sum, asset) => sum + asset.bytes, 0),
  embedded_image_records: summaries.reduce((sum, page) => sum + page.embedded_images, 0),
  page_summaries: summaries,
  internal_link_candidates: [...new Set(summaries.flatMap(page => page.links)
    .filter(link => link.startsWith('/') || link.startsWith('https://oderindestephen.com')))].sort(),
  booking_urls_found: [...new Set(summaries.flatMap(page => page.links).filter(link => link.startsWith('https://cal.com/')))].sort()
};
fs.writeFileSync(path.join(output, 'summary.json'), JSON.stringify(summary, null, 2) + '\n');
fs.writeFileSync(path.join(output, 'asset-manifest.json'), JSON.stringify(uniqueAssets, null, 2) + '\n');
console.log(JSON.stringify({ pages: summary.page_exports, parser_errors: errors,
  embedded_image_records: summary.embedded_image_records, unique_assets: uniqueAssets.length,
  unique_asset_bytes: summary.unique_asset_bytes, assets_extracted: extract,
  booking_urls: summary.booking_urls_found, reports: output }, null, 2));
if (errors) process.exitCode = 1;
