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
    { "label": "Now",  "text": "One pilot, self-hosted" },
    { "label": "Next", "text": "A second implementation" },
    { "label": "Later","text": "An archive that outlives us" }
  ]
}`,

  'fixed-collection': `"content": {
  "title": "Effort against impact",
  "quadrants": [
    { "label": "Do now",   "text": "Low effort, high impact" },
    { "label": "Plan",     "text": "High effort, high impact" },
    { "label": "Delegate", "text": "Low effort, low impact" },
    { "label": "Drop",     "text": "High effort, low impact" }
  ]
}`,

  tabular: `"content": {
  "title": "What each layer carries",
  "rows": [
    { "layer": "Deck format",  "carries": "JSON", "offline": "No"  },
    { "layer": "Deck package", "carries": "ZIP",  "offline": "Yes" }
  ]
}`,

  dataset: `"content": {
  "title": "Installs per quarter",
  "chartType": "bar",
  "chartData": "{\\"labels\\":[\\"Q1\\",\\"Q2\\"],\\"series\\":[[3,7]]}"
}`,

  chrome: `"content": {}`,
};

/**
 * One slide, spelled three ways. The whole argument of the identity section is
 * that these are one type and not three, which a table of names can state and
 * only a block like this can show.
 */
export const SPELLINGS_EXAMPLE = `{ "type": "title-slide",                "content": { … } }
{ "type": "core/title-slide",           "content": { … } }
{ "type": "eu.deckyard.slide.title",    "content": { … } }`;

/**
 * The evolution rule as the one thing it forbids, beside the thing it permits.
 * Both halves change the same type in what looks like the same way, which is
 * exactly why the rule is worth stating: only one of them keeps every deck ever
 * written valid.
 */
export const RULE_OK_EXAMPLE = `{
  "key": "title",    "required": true  },
{ "key": "subtitle", "required": false },
{ "key": "eyebrow",  "required": false }`;

export const RULE_BAD_EXAMPLE = `{
  "key": "title",    "required": true  },
{ "key": "subtitle", "required": false },
{ "key": "eyebrow",  "required": true  }`;

/**
 * A slide of a type nobody outside one fork has ever heard of, carrying one
 * scalar, one array and one global key. Between them they exercise rules 2, 3
 * and 5 of the unknown-type contract, which is what makes the rendering beside
 * it worth showing rather than describing.
 */
export const UNKNOWN_SLIDE = `{
  "type": "nl.ciiic.slide.roadmap",
  "content": {
    "title": "Where this is going",
    "intro": "Three horizons, no dates.",
    "phases": [
      { "label": "Now",  "detail": "One pilot, self-hosted" },
      { "label": "Next", "detail": "A second implementation" }
    ]
  },
  "notes": "Do not promise dates."
}`;

/**
 * What rules 2 to 5 produce from the slide above, as data rather than as markup,
 * so the mock rendering beside the JSON is derived from the same declaration a
 * conforming reader would walk instead of being drawn by hand.
 */
export const UNKNOWN_RENDERED: { text: string; items?: { label: string; text: string }[] }[] = [
  { text: 'Where this is going' },
  { text: 'Three horizons, no dates.' },
  {
    text: '',
    items: [
      { label: 'Now', text: 'One pilot, self-hosted' },
      { label: 'Next', text: 'A second implementation' },
    ],
  },
];
