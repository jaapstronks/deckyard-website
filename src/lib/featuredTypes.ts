// Which slide types the homepage puts on show, and in which order.
//
// The registry (src/data/slide-types.json, generated from core) is the source of
// truth for *what a type is*; this file only decides which handful of them the
// front page leads with. Two separate jobs, so two separate places: a type that
// gains a field, changes its glyph or is retired changes here for free.
//
// The order is a deck running from front to back - it opens, it makes a claim,
// it shows numbers, it asks the room something, it ends - rather than the
// registry's own shelving. The claim the section makes is "these are the pieces
// a deck is actually made of", and registration order does not tell that story.
//
// **Names are checked at build time.** A curated list of string keys into
// generated data is exactly the thing that rots silently: core renames a type,
// the site quietly shows nine glyphs instead of ten, and nobody notices because
// nine glyphs look fine. `featuredTypes()` throws instead, which turns a rename
// in core into a failed build here - the same bargain src/lib/content.ts makes
// with the blog's language folders.

import { slideTypes, type SlideType } from '@/lib/slideTypes';

/**
 * The front-page selection, in reading order.
 *
 * Picked to span the groups without naming them: two openers, a structure, the
 * data family, two that the audience answers, and a close. Change the list
 * freely - it is an editorial choice, not a fact about the format.
 */
export const FEATURED_TYPE_NAMES = [
  'title-slide',
  'list-slide',
  'timeline-slide',
  'chart-slide',
  'kpi-metrics-slide',
  'comparison-slide',
  'process-slide',
  'matrix-slide',
  'quote-slide',
  'poll-slide',
  'likert-slide',
  'gallery-slide',
  'end-slide',
] as const;

/**
 * The featured types, resolved against the registry.
 *
 * Throws when a name no longer exists or has been deprecated, naming the key so
 * the fix is obvious. A deprecated type still resolves, which is why it is
 * checked separately: core withholds a glyph from retired types on purpose, so
 * one on the front page would render as the neutral text-only fallback and look
 * like a bug in the drawing code rather than a stale curation list.
 */
export function featuredTypes(): SlideType[] {
  return FEATURED_TYPE_NAMES.map((name) => {
    const type = slideTypes.find((t) => t.name === name);
    if (!type) {
      throw new Error(
        `featuredTypes: "${name}" is not in the slide-type registry. It was ` +
          `renamed or removed in core. Fix FEATURED_TYPE_NAMES in ` +
          `src/lib/featuredTypes.ts, then re-run npm run sync-slide-types.`
      );
    }
    if (type.deprecated) {
      throw new Error(
        `featuredTypes: "${name}" is deprecated in core and has no layout glyph. ` +
          `Replace it in FEATURED_TYPE_NAMES in src/lib/featuredTypes.ts.`
      );
    }
    return type;
  });
}
