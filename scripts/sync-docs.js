import fs from 'node:fs/promises';
import path from 'node:path';
import url from 'node:url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const websiteRoot = path.resolve(__dirname, '..');

// Docs now live in this repo directly (moved from main deckyard repo)
const srcDocsRoot = path.join(websiteRoot, 'docs');
// Nested under docs/docs so Starlight serves at /docs/* paths
const destDocsRoot = path.join(websiteRoot, 'src', 'content', 'docs', 'docs');

async function rmDir(p) {
  try {
    await fs.rm(p, { recursive: true, force: true });
  } catch {
    // ignore
  }
}

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true });
}

async function copyDir(src, dest) {
  await ensureDir(dest);
  const entries = await fs.readdir(src, { withFileTypes: true });
  for (const e of entries) {
    const s = path.join(src, e.name);
    const d = path.join(dest, e.name);
    if (e.isDirectory()) {
      await copyDir(s, d);
      continue;
    }
    if (!e.isFile()) continue;
    // Only copy markdown files; Starlight reads MD/MDX from content/docs.
    if (!e.name.toLowerCase().endsWith('.md')) continue;
    // Skip README files - they're meta docs about the folder, not site content
    if (e.name.toLowerCase() === 'readme.md') continue;
    await fs.copyFile(s, d);
  }
}

function frontmatter(title) {
  return `---\ntitle: ${JSON.stringify(title)}\n---\n\n`;
}

async function ensureIndexIfMissing(relDir, title, bodyMd) {
  const p = path.join(destDocsRoot, relDir, 'index.md');
  try {
    await fs.stat(p);
    return;
  } catch {
    // missing
  }
  await ensureDir(path.dirname(p));
  await fs.writeFile(p, frontmatter(title) + (bodyMd || ''), 'utf8');
}

async function injectFrontmatterIfMissing(relPath, title) {
  const p = path.join(destDocsRoot, relPath);
  let raw = '';
  try {
    raw = await fs.readFile(p, 'utf8');
  } catch {
    return;
  }
  const trimmed = raw.trimStart();
  if (trimmed.startsWith('---\n')) return; // already has frontmatter
  await fs.writeFile(p, frontmatter(title) + raw, 'utf8');
}

async function main() {
  // Start fresh to avoid stale removed files.
  // Clean the parent docs collection folder, not just the nested one
  const docsCollectionRoot = path.join(websiteRoot, 'src', 'content', 'docs');
  await rmDir(docsCollectionRoot);
  await ensureDir(destDocsRoot);

  // Copy docs from ./docs/ to ./src/content/docs/
  // User/product docs now live directly in this repo's docs/ folder
  await copyDir(srcDocsRoot, destDocsRoot);

  // Starlight expects an index page at the docs root.
  await ensureIndexIfMissing(
    '',
    'Documentation',
    [
      'Welcome to the Deckyard documentation!',
      '',
      'Browse the sidebar to find guides on getting started, configuration, hosting, and integrations.',
      '',
      'For developer/contributor docs, see the [main repository](https://github.com/jaapstronks/deckyard/tree/main/docs/developer).',
      '',
    ].join('\n')
  );

  // Ensure key pages have titles without forcing you to change the source docs yet.
  await injectFrontmatterIfMissing('getting-started.md', 'Getting started');
  await injectFrontmatterIfMissing('user-manual.md', 'User manual');
  await injectFrontmatterIfMissing('configuration/environment.md', 'Environment (.env)');
  await injectFrontmatterIfMissing('hosting/website-hosting.md', 'Website hosting');
  await injectFrontmatterIfMissing('integrations/analytics.md', 'Analytics');
  await injectFrontmatterIfMissing('integrations/webhooks.md', 'Webhooks');
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('[website] sync-docs failed:', err);
  process.exit(1);
});








