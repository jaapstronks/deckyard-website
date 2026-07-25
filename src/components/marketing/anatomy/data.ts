// Structural vocabulary for the slide-anatomy explainer.
//
// Not translatable copy: the keys, types, required flags and limits mirror the
// real slide-type definitions in the engine (shared/slide-types/types/*.js).
// Editorial strings live in src/i18n/locales/<lang>/anatomy.ts instead.
//
// This is its own module because both the rendered markup and the interactive
// controller need it. SOURCE_OF used to be declared twice - once in the
// component frontmatter and again inside the <script> - which is exactly the
// drift this file exists to prevent.

export interface FieldDef {
  key: string;
  type: string;
  required?: boolean;
  ordered?: boolean;
  min?: number;
  max?: number;
  maxLen?: number;
  sub?: string;
  /** Passages in the source material this field was drawn from. Empty means the
   *  field is an authoring decision, not something the source contains. */
  spans: string[];
}

// Field vocabulary per slide type. Structural, so not translated: the keys,
// types, required flags and limits mirror the real definitions in the engine
// (shared/slide-types/types/*.js). Note that image-slide's `alt` is genuinely
// optional there - `imageRole` is what carries the accessibility decision.

export const FIELDS: Record<string, FieldDef[]> = {
  'timeline-slide': [
    { key: 'title', type: 'string', maxLen: 120, spans: ['h1'] },
    {
      key: 'items',
      type: 'items',
      required: true,
      ordered: true,
      min: 2,
      max: 10,
      sub: 'date · title · text',
      spans: ['t1', 'n1', 't2', 'n2', 't3', 'n3', 't4', 'n4'],
    },
  ],
  'chart-slide': [
    { key: 'title', type: 'string', required: true, maxLen: 120, spans: ['sh'] },
    { key: 'chartType', type: 'enum', required: true, sub: 'bar · line · pie', spans: [] },
    { key: 'data', type: 'csv', required: true, spans: ['c1', 'c2', 'c3'] },
  ],
  'quote-slide': [
    { key: 'quote', type: 'string', required: true, maxLen: 400, spans: ['q1'] },
    { key: 'authorName', type: 'string', required: true, maxLen: 80, spans: ['q2'] },
    { key: 'authorTitle', type: 'string', required: true, maxLen: 120, spans: ['q3'] },
  ],
  'image-slide': [
    { key: 'image', type: 'image', spans: ['i1'] },
    { key: 'alt', type: 'string', maxLen: 180, spans: ['i2'] },
    { key: 'imageRole', type: 'enum', sub: 'content · decorative', spans: [] },
    { key: 'caption', type: 'string', maxLen: 160, spans: [] },
  ],
};

// Which raw source each slide type draws on. Drives which card comes forward.

export const SOURCE_OF: Record<string, string> = {
  'timeline-slide': 'doc',
  'chart-slide': 'sheet',
  'quote-slide': 'note',
  'image-slide': 'library',
};

// Slide-type glyphs for the "add a slide" mock, in the same order as the
// picker options in the dictionary. Schematic on purpose: this is a diagram of
// a type picker, not a screenshot of one.

export const GLYPHS = [
  // title
  '<rect x="4" y="7" width="16" height="3.2" rx="1.6"/><rect x="4" y="13" width="9" height="2.4" rx="1.2"/>',
  // timeline
  '<path d="M3 13h18" stroke="currentColor" stroke-width="1.4" fill="none"/><circle cx="6" cy="13" r="2"/><circle cx="12" cy="13" r="2"/><circle cx="18" cy="13" r="2"/>',
  // chart
  '<rect x="4" y="12" width="3.6" height="7" rx="1"/><rect x="10.2" y="8" width="3.6" height="11" rx="1"/><rect x="16.4" y="5" width="3.6" height="14" rx="1"/>',
  // quote
  '<path d="M5 16c0-4 2-6.6 5-7.4l.6 1.8C9 11 8.4 11.9 8.4 13H11v5H5zm7.6 0c0-4 2-6.6 5-7.4l.6 1.8c-1.6.6-2.2 1.5-2.2 2.6H18.6v5h-6z"/>',
  // image
  '<rect x="3.5" y="5.5" width="17" height="13" rx="2" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="9" cy="10.2" r="1.6"/><path d="M5.5 17.2l4.2-4.2 3 3 2.6-2.4 3.4 3.6z"/>',
];

// The alt text the image field holds, reused as the rendered slide's alt: the
// accessibility claim on this page is that the field is the alt, so the demo
// had better behave that way too.

export const TILES = [
  '/images/library/stand-saturday-morning.jpg',
  '/images/library/tray-of-glasses.jpg',
  '/images/library/pitcher.jpg',
  '/images/library/lemons-in-a-box.jpg',
  '/images/library/hand-lettered-sign.jpg',
  '/images/library/pouring-out.jpg',
];

// Theme tokens. Only the alternates need declaring; the Deckyard theme is
// the stylesheet default, so switching back just clears the overrides.
export const THEME_KEYS = [
  '--t-bg',
  '--t-ink',
  '--t-accent',
  '--t-head',
  '--t-muted',
  '--t-rule',
  '--t-radius',
  '--t-font-head',
  '--t-font-body',
  '--t-font-eye',
  '--t-eye-ls',
  '--t-node',
  '--t-border',
  '--t-fresh',
];
export const THEMES: Record<string, Record<string, string>> = {
  deckyard: {},
  council: {
    '--t-bg': '#ffffff',
    '--t-ink': '#12233a',
    '--t-accent': '#1f5fa8',
    '--t-head': '#0d2a4d',
    '--t-muted': '#5a6b7d',
    '--t-rule': '#ccd8e4',
    '--t-radius': '2px',
    '--t-font-head': 'Arial, Helvetica, sans-serif',
    '--t-font-body': 'Arial, Helvetica, sans-serif',
    '--t-font-eye': 'Arial, Helvetica, sans-serif',
    '--t-eye-ls': '0.2em',
    '--t-node': '2px',
    '--t-border': '1px solid #dee6ee',
  },
  editorial: {
    '--t-bg': '#f8f2e7',
    '--t-ink': '#241f18',
    '--t-accent': '#9a3412',
    '--t-head': '#1c1712',
    '--t-muted': '#6b5f4c',
    '--t-rule': '#dbcbad',
    '--t-radius': '2px',
    '--t-font-head': 'Georgia, "Times New Roman", serif',
    '--t-font-body': 'Georgia, "Times New Roman", serif',
    '--t-font-eye': 'var(--mono)',
    '--t-eye-ls': '0.22em',
    '--t-node': '50%',
    '--t-border': '1px solid #e5d8bd',
  },
  studio: {
    '--t-bg': '#111018',
    '--t-ink': '#f3effa',
    '--t-accent': '#57e0c8',
    '--t-head': '#ffffff',
    '--t-muted': '#9a91ad',
    '--t-rule': '#2f2b3d',
    '--t-radius': '12px',
    '--t-font-eye': 'var(--mono)',
    '--t-eye-ls': '0.18em',
    '--t-node': '50%',
    '--t-border': '1px solid #262336',
    // The only dark house style, so the only one that needs the bright brass.
    '--t-fresh': '#dba323',
  },
};
