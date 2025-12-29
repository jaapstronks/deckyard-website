import fs from 'node:fs/promises';
import path from 'node:path';
import url from 'node:url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const websiteRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(websiteRoot, '..');

const srcDocsRoot = path.join(repoRoot, 'docs');
const destDocsRoot = path.join(websiteRoot, 'src', 'content', 'docs');

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
  await rmDir(destDocsRoot);
  await ensureDir(destDocsRoot);

  // Copy doc trees we intend to publish.
  await copyDir(path.join(srcDocsRoot, 'product'), path.join(destDocsRoot, 'product'));
  await copyDir(path.join(srcDocsRoot, 'developer'), path.join(destDocsRoot, 'developer'));

  // Starlight expects an index page at the docs root.
  await ensureIndexIfMissing(
    '',
    'Documentation',
    [
      'Welcome!',
      '',
      '- **Product docs**: see the sidebar under “Product”.',
      '- **Developer docs**: see the sidebar under “Developer”.',
      '',
    ].join('\n')
  );

  // Provide nicer directory landing pages if they are missing.
  await ensureIndexIfMissing(
    'product',
    'Product docs',
    'Docs for self-hosting operators and app users.\n'
  );
  await ensureIndexIfMissing(
    'developer',
    'Developer docs',
    'Docs for contributors and maintainers.\n'
  );

  // Ensure key pages have titles without forcing you to change the source docs yet.
  await injectFrontmatterIfMissing('product/getting-started.md', 'Getting started');
  await injectFrontmatterIfMissing('product/configuration/environment.md', 'Environment (.env)');
  await injectFrontmatterIfMissing('product/integrations/analytics.md', 'Analytics');
  await injectFrontmatterIfMissing('product/integrations/webhooks.md', 'Webhooks');

  await injectFrontmatterIfMissing('developer/dev-setup.md', 'Dev setup');
  await injectFrontmatterIfMissing('developer/architecture.md', 'Architecture');
  await injectFrontmatterIfMissing('developer/contributing.md', 'Contributing');
  await injectFrontmatterIfMissing('developer/slide-types.md', 'Slide types');
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('[website] sync-docs failed:', err);
  process.exit(1);
});








