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
// Run after every `npm run capture` in ../deckyard that touches these six:
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
// Only the shots a page actually draws are listed. `editor-form-{nl,en}` is
// delivered and committed as a source, but nothing renders it yet: the promoted
// homepage block went to the room rather than the editor, and /features stays a
// text inventory until tranche 2 can give all six groups a picture. Deriving it
// anyway would ship ~370 kB of unreferenced PNG and webp - which is how
// public/images/marketing/ came to hold three files nobody used. When it lands
// on a page, add it back at { width: 2240, slot: 1120 }: it needs the full
// container, because the field labels are the argument and at half of one they
// are grey texture.
const WIDTHS = {
  // Two shots side by side, so each gets half the container minus the gap.
  'poll-live-nl': { width: 1200, slot: 600 },
  'poll-live-en': { width: 1200, slot: 600 },
  'join-screen-nl': { width: 1200, slot: 600 },
  'join-screen-en': { width: 1200, slot: 600 },
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
