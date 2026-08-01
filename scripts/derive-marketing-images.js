#!/usr/bin/env node
// Display derivatives for the marketing screenshots.
//
// There is no astro:assets pipeline for public/: files there are copied to the
// output byte for byte, at whatever size they happen to be. The capture harness
// in ../deckyard writes 2x shots of a 1280x800 viewport, so the source PNGs are
// 2446-2560px wide while nothing on the site displays them wider than ~1180px.
// Serving the source would mean shipping - and decoding - roughly four times the
// pixels any reader sees.
//
// So each shot gets two derivatives at the width it is actually drawn at:
//
//   editor-form-nl.png        the source, from the capture harness. Never
//                             referenced by a page; this is the archive copy and
//                             the one the registry points at.
//   editor-form-nl-1600.webp  what the page loads.
//   editor-form-nl-1600.png   what a browser without webp loads.
//
// The width in the filename is the pixel width of the file, not the CSS width it
// is drawn at: each is 2x its display slot, so it stays sharp on a retina
// screen. `WIDTHS` records the display slot beside it, because that is the
// number that has to be re-checked when a layout changes.
//
// It also writes `src/data/marketing-shots.json` with the *measured* pixel size
// of each derivative, which is what the `width` and `height` attributes on the
// page are read from. A page therefore cannot declare an aspect ratio the file
// does not have, and re-capturing at a different viewport cannot silently leave
// a wrong ratio behind reserving the wrong amount of space.
//
// Run after every `npm run capture` in ../deckyard that touches any of these:
//
//     npm run derive-images
//
// Idempotent, and prints what it wrote. The derivatives and the manifest are
// committed, so a CI build and a fresh checkout need neither this script nor
// sharp.
import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIR = join(ROOT, 'public/images/marketing');
const MANIFEST = join(ROOT, 'src/data/marketing-shots.json');

// name -> { width: derivative pixel width, slot: CSS px it is drawn at }
//
// Only the shots a page actually draws are listed. Deriving one nothing renders
// ships a few hundred kB of unreferenced PNG and webp, which is how
// public/images/marketing/ came to hold three files nobody used.
const WIDTHS = {
  // Two shots side by side on the homepage, so each gets half the container
  // minus the gap.
  'poll-live-nl': { width: 1200, slot: 600 },
  'poll-live-en': { width: 1200, slot: 600 },
  'join-screen-nl': { width: 1200, slot: 600 },
  'join-screen-en': { width: 1200, slot: 600 },

  // The /features groups. Each figure sits at the top of the items column, not
  // across the container: the sticky group head takes the left 20rem, so the
  // column tops out at 660 CSS px once the container stops growing. Measured on
  // the built page, not estimated - re-measure if the group grid changes.
  'editor-form-nl': { width: 1320, slot: 660 },
  'editor-form-en': { width: 1320, slot: 660 },
  'presenter-view-nl': { width: 1320, slot: 660 },
  'presenter-view-en': { width: 1320, slot: 660 },
  'comments-nl': { width: 1320, slot: 660 },
  'comments-en': { width: 1320, slot: 660 },

  // The two portrait dialogs. Their sources are 1124 and 1524 px wide and much
  // taller than they are wide, so they are drawn narrower than the column and
  // centred in it (`.group-shot-portrait`, max-width 30rem) - at full column
  // width they would run metres down the page. share-link-rules is the one case
  // where the derivative is not a clean 2x of the source, which is why
  // `withoutEnlargement` is on the resize below.
  'share-link-rules-nl': { width: 960, slot: 480 },
  'share-link-rules-en': { width: 960, slot: 480 },
  'ai-fills-fields-nl': { width: 960, slot: 480 },
  'ai-fills-fields-en': { width: 960, slot: 480 },
};

const kb = (b) => `${Math.round(b.length / 1024)} kB`;
const manifest = {};
let wrote = 0;

for (const [name, { width, slot }] of Object.entries(WIDTHS)) {
  const src = join(DIR, `${name}.png`);
  if (!existsSync(src)) {
    console.error(`missing source: ${src}`);
    process.exitCode = 1;
    continue;
  }
  const input = await readFile(src);
  const base = sharp(input).resize({ width, withoutEnlargement: true });

  // Screenshots of flat UI: palette PNG loses nothing visible and roughly halves
  // the fallback, and webp at 88 is smaller again without softening 1px rules.
  const png = await base.clone().png({ palette: true, compressionLevel: 9 }).toBuffer();
  const webp = await base.clone().webp({ quality: 88 }).toBuffer();

  await writeFile(join(DIR, `${name}-${width}.png`), png);
  await writeFile(join(DIR, `${name}-${width}.webp`), webp);
  wrote += 2;

  // Measured, not assumed: a source whose height changes gets a new ratio here
  // rather than a page that reserves the old one.
  const meta = await sharp(png).metadata();
  manifest[name] = {
    png: `/images/marketing/${name}-${width}.png`,
    webp: `/images/marketing/${name}-${width}.webp`,
    width: meta.width,
    height: meta.height,
    slot,
  };
  console.log(
    `${name}: ${kb(input)} source -> ${meta.width}x${meta.height}  ` +
      `${kb(png)} png, ${kb(webp)} webp`
  );
}

await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
console.log(`\n${wrote} files in public/images/marketing/, manifest in src/data/`);
