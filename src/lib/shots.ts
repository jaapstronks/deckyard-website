// The marketing screenshots, as the pages address them.
//
// `src/data/marketing-shots.json` is written by scripts/derive-marketing-images.js
// from the capture-harness PNGs in public/images/marketing/. It carries the
// measured pixel size of each derivative, so `width`/`height` on the page are
// read off the file rather than typed beside it.
//
// A shot is named without its language: `shot('poll-live', lang)` picks the half
// of the pair that matches, because every one of these exists in both. Naming
// the file directly would put `-nl` in a component, which is where a language
// stops following the page it is on.
import shots from '@/data/marketing-shots.json';
import type { Lang } from '@/i18n';

export interface Shot {
  /** Fallback source, and the one the <img> element itself carries. */
  png: string;
  webp: string;
  /** Intrinsic pixels of the derivative, not of the capture source. */
  width: number;
  height: number;
  /** CSS width the derivative was sized for, at 2x. Documentation, not markup. */
  slot: number;
}

const SHOTS = shots as Record<string, Shot>;

/**
 * Base names, i.e. everything before the `-nl` / `-en`.
 *
 * Only what a page draws. `editor-form` is captured and committed but has no
 * derivative yet, so it is deliberately absent: adding it here without adding it
 * to the derive script would move the failure from "no such name" to a build
 * that throws in `shot()`.
 */
export type ShotName = 'poll-live' | 'join-screen';

/**
 * The shot of that name in that language.
 *
 * Throws rather than falling back: a missing derivative means the derive script
 * was not run after a capture, and a page that quietly renders a broken image is
 * the failure this whole manifest exists to prevent.
 */
export function shot(name: ShotName, lang: Lang): Shot {
  const key = `${name}-${lang}`;
  const found = SHOTS[key];
  if (!found) {
    throw new Error(
      `No marketing shot "${key}". Run \`npm run derive-images\` after capturing in ../deckyard.`
    );
  }
  return found;
}
