// Shape of the site's translatable copy, one interface per namespace.
//
// A namespace maps 1:1 to a file per locale under locales/<lang>/. Adding a
// page means adding an interface here plus one file per locale you translate
// it into; untranslated locales fall back to EN (see index.ts).

export interface Pillar {
  title: string;
  body: string;
}

/** Locale-level scalars, not page copy. */
export interface LocaleMeta {
  /** Value for <html lang>. */
  htmlLang: string;
  /** Value for <meta property="og:locale">, e.g. 'nl_NL'. */
  ogLocale: string;
  skipToContent: string;
}

export interface NavContent {
  sandbox: string;
  blog: string;
  changelog: string;
  hosting: string;
  /** Label for /compare/. In the footer rather than the header: the primary nav
   *  is deliberately four items, and the homepage band is the real entrance. */
  compare: string;
  docs: string;
  github: string;
  homeAria: string;
  languageAria: string;
  menuAria: string;
}

export interface WaitlistContent {
  button: string;
  emailLabel: string;
  placeholder: string;
  honeypot: string;
  statusOk: string;
  statusError: string;
  note: string;
}

export interface FooterContent {
  tagline: string;
  followHeading: string;
  followBlog: string;
  followRss: string;
  productHeading: string;
  productDocs: string;
  productGithub: string;
  productDreamkit: string;
  metaCopyright: string; // {year} placeholder
  metaMade: string;
}

export interface HomeContent {
  metaTitle: string;
  metaDescription: string;
  heroKicker: string;
  heroTitleMain: string;
  heroTitleHighlight: string;
  /**
   * The one plain sentence saying what Deckyard is and what it stands in place
   * of - the line somebody forwards to a colleague. Not a tagline: the kicker
   * above the headline already does that job, and it did it twice.
   */
  heroWhatItIs: string;
  heroLead: string;
  featuresKicker: string;
  featuresTitle: string;
  featuresLead: string;
  pillars: Pillar[];
  /** The band that sends someone arriving from another tool to /compare/. */
  compareKicker: string;
  compareTitle: string;
  compareBody: string;
  compareCta: string;
  ctaKicker: string;
  ctaTitle: string;
  ctaLead: string;
  ctaGithub: string;
  ctaWaitlistButton: string;
  sandboxButton: string;
  sandboxNote: string;
  ctaSandboxButton: string;
}

export interface InstallContent {
  kicker: string;
  title: string;
  lead: string;
  tabHuman: string;
  tabAgent: string;
  humanCaption: string;
  agentCaption: string;
  copy: string;
  copied: string;
  readFirst: string;
}

// The dedicated explainer page that wraps the anatomy component in prose,
// plus the homepage teaser that links to it.
export interface StructuredContent {
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  title: string;
  dek: string;
  stats: { value: string; label: string }[];
  s1Title: string;
  s1Body: string[];
  s2Title: string;
  s2Body: string[];
  pull: string;
  s3Title: string;
  s3Body: string[];
  chainTitle: string;
  chainLead: string;
  chain: { because: string; claim: string; body: string }[];
  compareTitle: string;
  compareLead: string;
  compareAspect: string;
  compareCanvas: string;
  compareRecord: string;
  compareRows: { aspect: string; canvas: string; record: string }[];
  ctaTitle: string;
  ctaBody: string;
  ctaSandbox: string;
  ctaDocs: string;
  // Homepage teaser that links here. The illustration is one annotated
  // slide - its content is borrowed from `anatomy.types` so the teaser shows
  // literally the slide you meet again on the explainer page.
  teaserKicker: string;
  teaserTitle: string;
  teaserBody: string;
  teaserCta: string;
  teaserFoot: string;
}

// "How raw material becomes an on-brand slide". Three zones: the pile of
// stuff you start with, the three routes that structure it, and the slide
// itself with its two independent controls (type and house style).
//
// The running example is a deliberately absurd one - a lemonade stand
// reported on in stiff corporate register - so nobody mistakes the demo
// content for a claim about Deckyard.
export interface AnatomyContent {
  // --- zone 1: the raw material ---
  sourcesLabel: string;
  sourcesNote: string;
  // Passages a slide field is drawn from are wrapped in
  // <span data-span="ID">. Those IDs are structural and map to fields in
  // SlideAnatomy.astro, so keep them when translating.
  sources: {
    id: string;
    kind: 'doc' | 'sheet' | 'note' | 'library';
    name: string; // filename in the window chrome
    caption: string; // what kind of thing this is
    heading?: string;
    paragraphs?: string[]; // doc + note, as HTML
    rows?: string[][]; // sheet cells, as HTML
    assetFile?: string;
    assetAlt?: string;
  }[];

  // --- zone 2: structuring it ---
  routesLabel: string;
  routesLead: string;
  //
  // Every route has the same three-part shape: on the left the world of
  // whoever is acting, on the right the mechanism they reach for, and below
  // both the slide that comes out of it, with the element this route just
  // added marked and animated in.
  //
  // The routes deliberately do NOT all produce the same slide. A scheduled
  // job appending last month's figure is a chart, not a timeline; pretending
  // otherwise to make the JSON match would be a nicer diagram about a product
  // that does not exist.
  routes: {
    id: string;
    label: string;
    blurb: string;
    leftLabel: string;
    rightLabel: string;
    // left column - exactly one of these
    picker?: { title: string; options: string[]; chosen: number }; // hand
    // api: an automation somebody assembled in a no-code tool. Steps run top
    // to bottom; `data` is what actually passed through on the last run, set
    // in mono on a tint so it reads as moved data rather than as label text.
    flow?: {
      name: string;
      status: string;
      steps: {
        kind: string; // trigger / tool call / only if / action
        name: string;
        detail?: string;
        data?: string; // HTML with .k/.s spans
        branch?: string; // the leg the flow takes when the condition fails
      }[];
    };
    chat?: { who: string; text: string; self?: boolean }[]; // mcp
    // right column - exactly one of these
    form?: { title: string; fields: { key: string; value: string }[]; more: string }; // hand
    sent?: { barLabel: string; code: string; okLabel: string }; // api; code is HTML with .k/.s/.c spans
    wire?: { dir: string; text: string }[]; // mcp; text may contain <b>
    // what comes out: which demo slide to render, which element is new, and
    // the record fragment that element is stored as
    result: {
      kind: 'timeline' | 'chart';
      label: string;
      fresh: number;
      extraBar?: { label: string; value: number };
      storedLabel: string;
      stored: string; // HTML with .k/.s spans
      note: string; // may contain <b>
    };
  }[];
  gateText: string; // may contain <b>

  // --- zone 3: the slide ---
  recordLabel: string;
  typeLabel: string;
  themeLabel: string;
  fieldsLabel: string;
  hint: string;
  // The field vocabulary itself (keys, types, required flags, limits) is
  // structural and lives in the component; only the values are translated.
  types: {
    id: string;
    label: string;
    claim: string; // may contain <b>
    eyebrow: string;
    title: string;
    items?: { date: string; title: string }[];
    bars?: { label: string; value: number }[];
    quote?: { text: string; name: string; role: string };
    image?: { caption: string };
  }[];
  themes: { id: string; label: string; swatch: string }[];
}

export interface BlogIndexContent {
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  title: string;
  intro: string;
  /** Contains HTML links. Placeholders: {home}, {rss}. */
  empty: string;
  /** Titles the locale's RSS feed at /<lang>/rss.xml. */
  feedTitle: string;
  feedDescription: string;
}

export interface BlogPostContent {
  metaTitleSuffix: string;
  followKicker: string;
  followTitle: string;
  allPosts: string;
  dateLocale: string;
}

export interface BlogCardContent {
  readMore: string;
  dateLocale: string;
}

export interface ChangelogContent {
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  title: string;
  intro: string;
  latestBadge: string;
  githubCta: string;
  dateLocale: string;
}

/**
 * "What you gain, and what you give up": Deckyard next to the tools people
 * actually arrive from. Deliberately not a feature matrix - every party gets a
 * strength and a cost, Deckyard included, because a table we win every row of
 * is not evidence of anything.
 *
 * `alternatives` is a list rather than four fixed keys so a fifth tool is one
 * entry, and so a future /compare/<id>/ page per tool can read the same data
 * instead of restating it.
 */
export interface CompareContent {
  metaTitle: string;
  metaDescription: string;
  heroKicker: string;
  heroTitle: string;
  heroIntro: string;

  tableTitle: string;
  tableLead: string;
  /** Column headings. `colTool` also labels the row-header column. */
  colTool: string;
  colStrength: string;
  colGiveUp: string;
  /** Deckyard's own row is marked so the table can show it as one of four. */
  alternatives: {
    /** Stable key; doubles as the slug if this tool ever gets its own page. */
    id: string;
    name: string;
    self?: boolean;
    strength: string;
    giveUp: string;
    /** The longer read: what the trade actually feels like in an organisation. */
    body: string[];
  }[];

  readTitle: string;
  readLead: string;

  wrongTitle: string;
  wrongLead: string;
  wrong: string[];

  ctaTitle: string;
  ctaBody: string;
  ctaSandbox: string;
  ctaHow: string;
}

/** Everything one locale must provide to be complete. */
export interface HostingContent {
  metaTitle: string;
  metaDescription: string;
  heroKicker: string;
  heroTitle: string;
  heroIntro: string;

  /** The two doors: run it yourself, or have it run for you. */
  routesTitle: string;
  routesLead: string;
  selfLabel: string;
  selfTitle: string;
  selfBody: string;
  selfPoints: string[];
  selfCta: string;
  managedLabel: string;
  managedTitle: string;
  managedBody: string;
  managedPoints: string[];
  managedCta: string;

  domainKicker: string;
  domainTitle: string;
  domainBody: string;
  /** Example hostname shown in the browser mock. Not a real domain. */
  domainExample: string;
  domainCaption: string;

  includedTitle: string;
  includedLead: string;
  included: { title: string; body: string }[];

  fundingKicker: string;
  fundingTitle: string;
  fundingBody: string[];

  contactTitle: string;
  contactBody: string;
  contactCta: string;
  contactNoteHeading: string;
  contactNote: string[];
}

export interface Content extends LocaleMeta {
  nav: NavContent;
  waitlist: WaitlistContent;
  footer: FooterContent;
  home: HomeContent;
  install: InstallContent;
  structured: StructuredContent;
  compare: CompareContent;
  hosting: HostingContent;
  anatomy: AnatomyContent;
  blogIndex: BlogIndexContent;
  blogPost: BlogPostContent;
  blogCard: BlogCardContent;
  changelog: ChangelogContent;
}

/**
 * A locale that is only partly translated. Every key is optional at every
 * depth, so a new language can ship one page at a time and inherit the rest
 * from EN. Arrays are replaced wholesale, never merged element by element.
 */
export type DeepPartial<T> = T extends readonly unknown[]
  ? T
  : T extends object
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T;
