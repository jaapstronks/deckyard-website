// The worked JSON on /spec/conformance/.
//
// Structural, not copy: a `content` object has the same keys in every language,
// so these sit beside the component rather than in the locale files - the same
// rule the explainer's field vocabularies follow. A translator who could edit
// these could make the page describe a format that does not exist.
//
// Each one is deliberately the smallest object that still shows the shape the
// section is arguing about. They are illustrations of a contract, not fixtures:
// the guaranteed-accurate artifacts are the published schemas and the example
// deck in core, and the page links to both.

import type { SlideStructure } from '@/lib/slideTypes';

/**
 * One `content` object per structure, showing what "the item contract" means in
 * the only way that settles it. `chrome` carries nothing at all, which is the
 * point of it, so it gets an empty object rather than a comment apologising for
 * the emptiness.
 */
export const STRUCTURE_EXAMPLES: Record<SlideStructure, string> = {
  singleton: `"content": {
  "title": "A deck is a file you own",
  "subtitle": "Portable by construction"
}`,

  collection: `"content": {
  "title": "Three horizons",
  "items": [
    { "label": "Now",   "text": "One pilot" },
    { "label": "Next",  "text": "A second reader" },
    { "label": "Later", "text": "An archive" }
  ]
}`,

  'fixed-collection': `"content": {
  "title": "Effort against impact",
  "quadrants": [
    { "label": "Do now",   "text": "…" },
    { "label": "Plan",     "text": "…" },
    { "label": "Delegate", "text": "…" },
    { "label": "Drop",     "text": "…" }
  ]
}`,

  tabular: `"content": {
  "title": "What each layer carries",
  "rows": [
    { "layer": "Deck format",  "offline": false },
    { "layer": "Deck package", "offline": true  }
  ]
}`,

  dataset: `"content": {
  "title": "Installs per quarter",
  "chartType": "bar",
  "chartData": "{\\"labels\\":[\\"Q1\\",\\"Q2\\"], …}"
}`,

  chrome: `"content": {}`,
};

/**
 * The evolution rule as the one thing it forbids, beside the thing it permits.
 * Both halves change the same type in what looks like the same way, which is
 * exactly why the rule is worth stating: only one of them keeps every deck ever
 * written valid.
 */
export const RULE_OK_EXAMPLE = `"fields": [
  { "key": "title",    "required": true  },
  { "key": "subtitle", "required": false },
  { "key": "eyebrow",  "required": false }
]`;

export const RULE_BAD_EXAMPLE = `"fields": [
  { "key": "title",    "required": true  },
  { "key": "subtitle", "required": false },
  { "key": "eyebrow",  "required": true  }
]`;

/**
 * A slide of a type nobody outside one fork has ever heard of, carrying one
 * scalar, one array and one global key. Between them they exercise rules 2, 3
 * and 5 of the unknown-type contract, which is what makes the rendering beside
 * it worth showing rather than describing.
 */
export const UNKNOWN_TYPE = 'nl.ciiic.slide.roadmap';

/** The `notes` key, which is envelope-level: rule 5 says a reader honours it. */
export const UNKNOWN_NOTES = 'Do not promise dates.';

/**
 * The content, as the object a reader would actually hold. The JSON block on the
 * page is formatted by hand below (one item per line reads better than
 * `JSON.stringify` at this size), but the *rendering* beside it is walked out of
 * this object by `renderUnknown`, so the two halves of the demo cannot disagree
 * about what the slide contains.
 */
export const UNKNOWN_CONTENT: Record<string, string | Record<string, string>[]> = {
  title: 'Where this is going',
  intro: 'Three horizons, no dates.',
  phases: [
    { label: 'Now', detail: 'One pilot' },
    { label: 'Next', detail: 'A second reader' },
  ],
};

export const UNKNOWN_SLIDE = `{
  "type": "${UNKNOWN_TYPE}",
  "content": {
    "title": "Where this is going",
    "intro": "Three horizons, no dates.",
    "phases": [
      { "label": "Now",  "detail": "One pilot" },
      { "label": "Next", "detail": "A second reader" }
    ]
  },
  "notes": "${UNKNOWN_NOTES}"
}`;

/** A block in the generic rendering: a line of text, or a repeated item's values. */
export type UnknownBlock = { text: string } | { item: string[] };

/**
 * Rules 2 and 3 of the unknown-type contract, applied.
 *
 * Every string-valued entry becomes a line, in the order the keys appear; every
 * array-valued entry becomes one repeated item per element, with rule 2 applied
 * inside it. Nothing is added, nothing is reordered, and the empty string is
 * skipped as unset - which is the whole contract, executed rather than asserted.
 */
export function renderUnknown(content: typeof UNKNOWN_CONTENT): UnknownBlock[] {
  const blocks: UnknownBlock[] = [];
  for (const value of Object.values(content)) {
    if (Array.isArray(value)) {
      for (const element of value) {
        blocks.push({ item: Object.values(element).map(String).filter(Boolean) });
      }
    } else if (String(value)) {
      blocks.push({ text: String(value) });
    }
  }
  return blocks;
}
