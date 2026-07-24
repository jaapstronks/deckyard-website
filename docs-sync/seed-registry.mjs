#!/usr/bin/env node
// One-shot registry bootstrapper.
//
// Builds docs-sync/registry.json from:
//   1. CATEGORY_SOURCES below — the doc-category → deckyard-core source paths map.
//   2. a screenshot map TSV (name<TAB>captureDate<TAB>page1|page2|…), path passed
//      as argv[2] or defaulting to the scratchpad copy.
//
// Run ONCE to seed the registry, then hand-maintain registry.json (add/adjust
// entries, refine `sources`). Re-running overwrites registry.json, so only do
// that intentionally. After seeding, run check-staleness.mjs --update to record
// the baseline hashes.
//
//   node docs-sync/seed-registry.mjs [path/to/screenshot-map.tsv]

import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, '..');

// ── The mapping that matters ────────────────────────────────────────────────
// Each doc category → the deckyard-core paths (relative to ../deckyard) that,
// when changed, make that category's docs+screenshots stale. Keep paths as
// specific as the feature allows. FILL FROM the deckyard exploration report.
const CATEGORY_SOURCES = {
  admin: [
    'server/routes/api/admin-users.js',
    'server/routes/api/organizations.js',
    'server/routes/api/organization-members.js',
    'client/views/settings/admin-users/',
    'server/auth/',
  ],
  ai: [
    'server/routes/api/ai/',
    'server/utils/llm/',
    'server/utils/ai/',
    'client/views/editor/ai-append.js',
    'client/views/editor/ai-review-annotations.js',
    'shared/llm-vendors.js',
  ],
  collaboration: [
    'server/collab/',
    'client/lib/collab/',
    'client/views/editor/comments-panel.js',
    'client/views/editor/comments-panel-sse.js',
    'client/views/editor/comment-markers.js',
    'client/views/editor/comments-api.js',
    'client/lib/comments/',
    'server/routes/api/collaborators.js',
  ],
  configuration: ['.env.example', 'server/config/', 'server/db/'],
  creating: [
    'server/routes/api/ai/wizard.js',
    'client/views/editor/slide-type-picker.js',
    'client/views/list/onboarding-checklist.js',
    'shared/slide-types/presentation.js',
  ],
  customization: [
    'custom/',
    'themes/',
    'shared/slide-types/custom-loader.js',
    'server/routes/api/custom-slide-types.js',
    'client/views/settings/slide-type-editor/',
  ],
  deployment: [
    'Dockerfile',
    'scripts/vps-deploy.sh',
    'scripts/vps-bootstrap.sh',
    'scripts/setup.js',
    'Caddyfile',
  ],
  developer: [
    'server/mcp/',
    'client/embed-sdk.js',
    'server/routes/api/',
    'server/routes/public-api/',
  ],
  editing: [
    'client/views/editor/inspector-panes.js',
    'client/views/editor/inspector-resize.js',
    'client/views/editor/editor-form/',
    'client/views/editor/editor-form.js',
    'client/views/editor/editor-controller.js',
    'client/views/editor/slide-list.js',
  ],
  export: [
    'server/export/',
    'client/views/editor/export-modal.js',
    'client/views/editor/export-dropdown.js',
  ],
  integrations: [
    'server/integrations/',
    'server/routes/api/notion/',
    'server/routes/api/notion.js',
    'server/routes/api/stock-media.js',
  ],
  interactions: [
    'client/lib/slide-runtime/',
    'client/views/follow/',
    'server/routes/api/questions.js',
    'server/routes/api/follow.js',
  ],
  libraries: [
    'client/lib/slide-library/',
    'client/lib/slide-collections/',
    'client/views/editor/image-library/',
    'server/routes/api/slide-library.js',
    'server/routes/api/image-library.js',
  ],
  organizing: ['client/views/list/', 'server/routes/api/tags.js'],
  presenter: [
    'client/views/presenter/',
    'server/routes/api/present-sessions.js',
  ],
  publishing: [
    'server/routes/api/publish.js',
    'server/routes/api/share-links.js',
    'client/views/editor/publish-export/',
    'client/views/share-viewer/',
  ],
  'slide-types': [
    'shared/slide-types/registry.js',
    'shared/slide-types/types/',
    'shared/slide-types/convert.js',
    'shared/slide-types/json-schema.js',
    'client/views/editor/slide-type-picker.js',
    'client/views/editor/convert-slide-action.js',
    'client/views/editor/slide-type-schematics.js',
  ],
  themes: [
    'client/lib/theme/',
    'client/views/settings/theme-editor/',
    'shared/theme-config-schema.js',
    'shared/theme-normalize.js',
    'shared/theme-fonts.js',
  ],
};

// Optional per-screenshot source overrides for artifacts that depend on a
// narrower slice than their whole category (verified paths from the video
// briefing). Keyed by screenshot filename.
const SOURCE_OVERRIDES = {
  // 'theme-editor-full.png': ['client/lib/theme/theme-select.js', 'client/views/settings/theme-editor/'],
};

// ── Build ───────────────────────────────────────────────────────────────────
const tsvPath =
  process.argv[2] ||
  '/private/tmp/claude-502/-Users-jstronks-Github-NW-deckyard-website/c2abbd21-85f6-44b1-a2c0-a9908819d229/scratchpad/screenshot-map.tsv';

if (!existsSync(tsvPath)) {
  console.error(`screenshot map TSV not found: ${tsvPath}`);
  process.exit(2);
}

const slug = (s) => s.replace(/\.[a-z]+$/, '').replace(/[^a-z0-9]+/gi, '-').toLowerCase();
const categoryOf = (page) => page.split('/')[0];

const artifacts = [];

// 1. Doc-category entries (text staleness, one per category)
const DOCS_DIR = join(REPO_ROOT, 'docs');
for (const [cat, sources] of Object.entries(CATEGORY_SOURCES)) {
  const dir = join(DOCS_DIR, cat);
  const pages = existsSync(dir)
    ? readdirSync(dir).filter((f) => f.endsWith('.md')).map((f) => `docs/${cat}/${f}`)
    : [];
  artifacts.push({
    id: `doc-${cat}`,
    type: 'doc',
    docPages: pages,
    sources,
    sourceHash: '',
    lang: 'en',
  });
}

// 2. Screenshot entries
const rows = readFileSync(tsvPath, 'utf8').trim().split('\n');
for (const row of rows) {
  const [name, date, pagesRaw] = row.split('\t');
  const pages = (pagesRaw || '').split('|').filter(Boolean).map((p) => `docs/${p}`);
  const cat = pages.length ? categoryOf(pages[0].replace('docs/', '')) : 'unknown';
  const sources = SOURCE_OVERRIDES[name] || CATEGORY_SOURCES[cat] || [];
  artifacts.push({
    id: `shot-${slug(name)}`,
    type: 'screenshot',
    path: `public/images/screenshots/${name}`,
    docPages: pages,
    sources,
    sourceHash: '',
    lang: 'en',
    capturedAt: date,
    recipe: null,
  });
}

const registry = {
  $schema: './registry.schema.json',
  coreRepo: '../deckyard',
  note: 'Hand-maintained. See README.md. Bootstrapped by seed-registry.mjs; run check-staleness.mjs --update to set baseline hashes.',
  artifacts,
};

writeFileSync(join(HERE, 'registry.json'), JSON.stringify(registry, null, 2) + '\n');
console.log(`wrote registry.json — ${artifacts.length} artifacts (${Object.keys(CATEGORY_SOURCES).length} doc categories + ${rows.length} screenshots)`);
const emptySrc = artifacts.filter((a) => !a.sources.length).length;
if (emptySrc) console.log(`  ⚠ ${emptySrc} artifacts have no sources yet — fill CATEGORY_SOURCES and re-run.`);
