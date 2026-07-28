// Shape of the site's translatable copy, one interface per namespace.
//
// A namespace maps 1:1 to a file per locale under locales/<lang>/. Adding a
// page means adding an interface here plus one file per locale you translate
// it into; untranslated locales fall back to EN (see index.ts).
//
// ---------------------------------------------------------------------------
// Length budgets: `@budget <n> words`
//
// A field whose doc comment carries `@budget` was written for a layout that
// only holds that much. Every one of them started short, was later made
// factually correct, and nobody looked at the rendered result again: the
// homepage hero grew to three consecutive paragraphs all explaining what
// Deckyard is, and the note under the sandbox button reached 23 words for one
// line of screen. The budget is here so the next correction has to choose
// between being shorter and moving the fact somewhere it fits.
//
// Two rules:
//
//  - **The budget is measured on the longest locale, which is NL.** Dutch runs
//    5-10% longer than the same sentence in English, so a budget that only
//    holds in EN is not a budget. Stay under it in Dutch and English is free.
//  - **Over budget is a layout decision, not a typo.** Raising the number is
//    allowed; doing it silently, while the section it belongs to reflows, is
//    the thing this comment exists to stop. Change the number in the same
//    commit as the copy, and look at the section.
//
// Not enforced by a test on purpose. A word count is a proxy for "does this
// still read as one line under a button", and the only way to know that is to
// open the page.
// ---------------------------------------------------------------------------

/** Locale-level scalars, not page copy. */
export interface LocaleMeta {
  /** Value for <html lang>. */
  htmlLang: string;
  /** Value for <meta property="og:locale">, e.g. 'nl_NL'. */
  ogLocale: string;
  skipToContent: string;
}

/**
 * The site frame's labels.
 *
 * The primary nav answers one question - *what is this, and does it check out* -
 * and everything else is a footer column. That rule is what decides the five:
 *
 *   How it works · Compared · Format spec · Docs · Blog · GitHub
 *
 * It is why `hosting` is no longer among them. Hosting is a commercial door, it
 * stood first in the row, and it was answering a question nobody has yet on a
 * site where the product itself was not in the nav at all. It now sits beside
 * the install widget on the homepage (install it yourself / have it run for
 * you), on /features, and in the footer.
 *
 * And it is why `features` is not among them either, which is the closer call.
 * The inventory is a real page and a launch visitor does look for it - but a nav
 * offering both "How it works" and "Features" asks the reader to guess which one
 * holds what they want, and the homepage hands the whole thing over in an index
 * band with a link per group. So: one door to the idea in the nav, the inventory
 * one scroll down and first in the footer.
 */
export interface NavContent {
  sandbox: string;
  blog: string;
  /**
   * Label for /structured-slides/. The route says `structured-slides`, which is
   * the implementation's word for it; the nav says what the page is.
   */
  howItWorks: string;
  /** Label for /features/, the full inventory. Footer, and the homepage index. */
  features: string;
  changelog: string;
  /** Label for /hosting/. Footer and the homepage install section, not the nav. */
  hosting: string;
  /** Label for /compare/. */
  compare: string;
  /** Label for /accessibility/. In the footer's meta row, where a statement of
   *  conformance belongs, rather than in a column of product pages. */
  accessibility: string;
  /** Label for /spec/, the format written down as a standard. */
  spec: string;
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

/**
 * The footer.
 *
 * Three columns rather than two, each answering one question, because the old
 * "Product" column had grown into a bin: the inventory, the comparison, the
 * accessibility statement, the docs, the source and the studio that makes it,
 * in one list of six with nothing in common but not being the blog.
 *
 *   Product   what is it        how it works · features · compared · format spec
 *   Run it    how do I have it  docs · hosting · GitHub
 *   Follow    is it alive       blog · changelog · RSS
 *
 * The accessibility statement and the studio link moved to the meta row beside
 * the copyright, which is where a reader looks for a statement of conformance
 * and who made this - and not among the pages that describe the product.
 */
export interface FooterContent {
  tagline: string;
  followHeading: string;
  followBlog: string;
  followRss: string;
  productHeading: string;
  /** Heading of the middle column: getting an instance of your own. */
  runHeading: string;
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
   *
   * Set in the display face at --step-1, so it is read as the second line of
   * the headline rather than as body copy. Beside the deck that column is half
   * the container.
   *
   * @budget 20 words
   */
  heroWhatItIs: string;
  /**
   * What makes it different, once `heroWhatItIs` has said what it is. The two
   * are split by job and may not restate each other: this one carries
   * end-to-end plus the AI stance, and says nothing about self-hosting or
   * standing in for PowerPoint, because the sentence above already did.
   *
   * @budget 25 words
   */
  heroLead: string;
  /**
   * The deck beside the headline. Whether a locale actually has one is not a
   * copy decision - it depends on a translated export existing, so it lives in
   * `src/lib/decks.ts`. These are the strings that describe it when it does.
   */
  heroDeckTitle: string;
  heroDeckPlay: string;
  heroDeckNote: string;
  /**
   * The slide-type showcase. Its claim is that a deck is made of a known set of
   * pieces, so the copy names the pieces ("a timeline, a comparison, some
   * numbers") before it names the figure. `{count}` is substituted by
   * `withFacts`, so the number is never typed here.
   *
   * @budget typesLead 35 words
   */
  typesKicker: string;
  typesTitle: string;
  typesLead: string;
  /** Accessible name of the scrollable strip, for a reader who lands on it. */
  typesRailLabel: string;
  /** Marks the types where the room answers rather than watches. */
  typesAudienceLabel: string;
  /** On the card that ends the run, under the figure itself. */
  typesAllLabel: string;
  typesCta: string;
  /**
   * The deck-format section: the anti-lock-in argument, made by showing the
   * file. Two paragraphs beside one code block, and no third - the field tables
   * are in /docs/reference/ and the full envelope is on /spec/deck-format/.
   *
   * Copy may name a key in backticks (`$id`), which src/lib/inline.ts lets
   * through, and may carry the `{magic}` / `{version}` / `{schemaBase}` /
   * `{schemaVersion}` placeholders, which withSpec() substitutes. Never spell a
   * format constant out here: two of them have moved once already.
   *
   * @budget 40 words per paragraph
   */
  formatKicker: string;
  formatTitle: string;
  formatBody: string[];
  formatCodeCaption: string;
  formatCta: string;
  formatSchemaCta: string;
  /**
   * The promoted showcase: the one section on the homepage that argues with a
   * photograph of the product rather than with a drawing of it. S4 left the slot
   * empty on purpose - the marketing images at the time were a violet render
   * with a zero-vote poll and a QR pointing at a fork - and deckyard's capture
   * harness has since filled it.
   *
   * It is the room rather than the editor, of the two candidates that had a
   * usable image. "A slide is named fields" is already made twice above; "the
   * room answers" was a claim with nothing behind it.
   *
   * Two `alt` rules, and neither is style:
   *
   * - **Never invite the reader to scan the code.** The QR in the join shot
   *   still encodes the capture instance, because re-encoding it would produce a
   *   scannable code pointing at a deck nobody hosts. Naming it is fine;
   *   "scan it" is a promise the picture cannot keep. (The slide's own copy says
   *   "scan the QR code" - that is inside the image and cannot be written away.)
   * - **Describe what is in the frame, including the numbers.** The whole claim
   *   is that the result is real, so "a poll with results" throws away the
   *   evidence for a reader who cannot see the picture.
   *
   * @budget roomLead 45 words
   */
  roomKicker: string;
  roomTitle: string;
  roomLead: string;
  roomCta: string;
  roomPollAlt: string;
  roomPollCaption: string;
  roomJoinAlt: string;
  roomJoinCaption: string;
  /**
   * The band that hands the rest of the product to /features/. It used to be
   * eight cards with an icon each - the tallest section on the page, a list
   * pretending to be an argument, and not one link out of it. Three of the eight
   * had by then been absorbed by the slide-type rail, the format callout and the
   * AI section, and the other five wanted more room than a card rather than
   * less.
   *
   * The list itself is not copy: it is read off `features.groups`, so the
   * homepage and /features/ cannot name a different set of things.
   *
   * @budget featuresLead 30 words
   */
  featuresKicker: string;
  featuresTitle: string;
  featuresLead: string;
  featuresCta: string;
  /**
   * The section about what happens when AI writes on the organisation's behalf.
   * It sits on the homepage rather than on /structured-slides because it is a
   * reason to care, not an explanation of the mechanism - and because "hosted in
   * Europe" is a tiebreaker in a crowded field, while this problem is nobody's
   * yet. Sovereignty stays on the site as a property; this is the headline.
   */
  aiKicker: string;
  aiTitle: string;
  /**
   * The scene this section opens on, as paragraphs rather than one string. It
   * was a single 88-word block set as a `.lead` in a 56ch measure, which is
   * seven lines of large type before the reader reaches a full stop - the one
   * place on the page where somebody stops reading.
   *
   * Two paragraphs, in this order: what people are already doing, then what
   * nobody can say about the result. Do not add a third; the three panels below
   * are the answer, and a lead that keeps going competes with them.
   *
   * @budget 50 words per paragraph
   */
  aiLead: string[];
  /**
   * The figure beside that lead: where the decisions live.
   *
   * The claim the panels below make - the model does not design anything - is a
   * claim about *what was already settled before it ran*, and that is a diagram
   * rather than a sentence. One panel of fixed things, one panel of the fields
   * left open, an arrow between them, and a caption that says what the request
   * therefore is. It also gave the lead its right-hand column back; it used to
   * be two long paragraphs with half a section of nothing beside them.
   *
   * Values are illustrative but not invented: `fixed[].key` names real files,
   * the count and the schema version are substituted from the generated data,
   * and `open[]` is the field list `timeline-slide` actually declares - the
   * slide the teaser two sections up draws.
   *
   * @budget foot 40 words, note 8 words each
   */
  aiFigure: {
    fixedLabel: string;
    fixed: { key: string; note: string }[];
    openLabel: string;
    open: { key: string; value: string }[];
    foot: string;
  };
  /**
   * The three panels. The first one carries the load, so it says what the model
   * *does* (picks a declared type, fills its fields) rather than what it cannot
   * do: "an agent cannot invent a layout" was read as a claim about the limits
   * of models, which is not the argument. The argument is that nothing is asking
   * it to invent one.
   */
  aiPoints: { title: string; body: string }[];
  /**
   * What the format does not fix. Stated on the page, not left to be found.
   *
   * @budget 60 words
   */
  aiLimit: string;
  aiCta: string;
  /**
   * The other door out of the install section: have it run for you.
   *
   * Hosting used to be the first item in the header nav, in front of a product
   * the nav never named. It reads as an offer here and as a price list there:
   * the reader has just been shown the one line that installs it, so "or don't"
   * is an answer to a question they now have. It stays one sentence and a ghost
   * link - /hosting is the page that makes the argument, and this is not a
   * second pitch for it.
   *
   * @budget hostedNote 30 words
   */
  hostedNote: string;
  hostedCta: string;
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
  /**
   * One line under the sandbox button, at 0.9rem. Says what it costs to try
   * (nothing) and which parts are switched off - not *why* they are. The reason
   * ("it is public and anonymous") is true, was what pushed this string to 23
   * words, and belongs in the sandbox rather than under a button on the
   * homepage.
   *
   * @budget 10 words
   */
  sandboxNote: string;
  ctaSandboxButton: string;
}

/**
 * /features/ - the full inventory, and the destination that made deleting the
 * eight homepage pillar cards safe rather than lossy.
 *
 * The homepage argues; this page lists. Everything the pillars used to claim in
 * a card with an icon lives here as a group with its items and a link into the
 * documentation, which is where somebody who wants the detail was always going.
 *
 * `id` is structural: it keys the docs link in FeaturesPage.astro, so a href is
 * not typed into two languages. Reordering the array reorders the page; a group
 * whose id the component does not know gets no "read more" link rather than a
 * dead one.
 */
export interface FeaturesContent {
  metaTitle: string;
  metaDescription: string;
  heroKicker: string;
  heroTitle: string;
  heroIntro: string;

  groups: {
    /** Structural. Keys the docs href in the component. */
    id: string;
    /** Kicker above the group heading. */
    label: string;
    title: string;
    /**
     * What the group is about, before the items list it.
     *
     * @budget 35 words
     */
    body: string;
    /**
     * One line for the homepage list, where this group is a link and not a
     * section. Read by HomePage.astro, so the two pages cannot drift apart.
     *
     * @budget 14 words
     */
    teaser: string;
    /** Label on the link into the docs. */
    moreLabel: string;
    /**
     * @budget 25 words per body
     */
    items: { title: string; body: string }[];
  }[];

  /** The closing band: you run this yourself. */
  runTitle: string;
  runBody: string;
  runHosting: string;
  runDocs: string;
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
  /** Hands the accessibility half of the chain to its own page. */
  chainA11yNote: string;
  chainA11yCta: string;
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

/**
 * Accessibility as a page of its own, not the fourth consequence in a chain on
 * /structured-slides. For Dutch public and cultural institutions this is a legal
 * obligation and therefore a reason to buy, which a bullet cannot carry.
 *
 * Every claim here is checkable against the core repo, and the limits section is
 * load-bearing: this page says what the format does *not* fix, because a page
 * about accessibility that overclaims is read by exactly the people who test.
 */
export interface AccessibilityContent {
  metaTitle: string;
  metaDescription: string;
  heroKicker: string;
  heroTitle: string;
  heroIntro: string;

  /** What the structure yields, field type by field type. */
  followsTitle: string;
  followsLead: string;
  follows: { field: string; result: string }[];

  /** The reading view of a published deck. */
  readerKicker: string;
  readerTitle: string;
  readerBody: string[];
  readerPoints: string[];

  /** Reflow, i.e. what happens to a 16:9 canvas on a phone. */
  phoneTitle: string;
  phoneBody: string;

  /** What this does not do for you. */
  limitsTitle: string;
  limitsLead: string;
  limits: { title: string; body: string }[];

  ctaTitle: string;
  ctaBody: string;
  ctaDocs: string;
  ctaSandbox: string;
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

/**
 * The /spec/ section: the deck format written down as a standard rather than as
 * an implementation detail.
 *
 * Only prose lives here. The JSON examples, the endpoint paths, the field names
 * and the whole slide-type registry are structural and come from src/lib/spec.ts
 * and src/data/slide-types.json, so the two languages cannot show a different
 * format. Notes keyed by a field or endpoint name are the exception: those are
 * copy about structure, so the key is structural and the sentence is not.
 */
export interface SpecContent {
  /** Chrome shared by every page in the section. */
  shared: {
    /** Heading above the in-section page list at the foot of each page. */
    moreTitle: string;
    /** Per-page titles and one-liners, keyed by page id. */
    pages: Record<SpecPageId, { title: string; blurb: string }>;
    /** Note under a code block that the reader can fetch the real thing. */
    sourceNote: string;
    /** Label on a link into the core repo. */
    codeLabel: string;
    /** Label on the link out of a section into its full docs reference. */
    referenceLabel: string;
  };

  index: {
    metaTitle: string;
    metaDescription: string;
    heroKicker: string;
    heroTitle: string;
    heroIntro: string;

    /** The two layers, which is the thing people get wrong first. */
    layersTitle: string;
    layersLead: string;
    layers: { badge: string; name: string; what: string; body: string }[];

    whyTitle: string;
    whyBody: string[];

    /** What is actually unlike anything else. Five claims, each checkable. */
    claimsTitle: string;
    claimsLead: string;
    claims: { title: string; body: string }[];

    /** Version, licence, stability, conformance - stated, not implied. */
    statusTitle: string;
    statusLead: string;
    status: { term: string; def: string }[];
  };

  format: {
    metaTitle: string;
    metaDescription: string;
    heroKicker: string;
    heroTitle: string;
    heroIntro: string;
    introBody: string[];

    envelopeTitle: string;
    envelopeBody: string[];
    leniency: string;
    /**
     * The value a reader keeps accepting besides the one it is shown. Not
     * justified by files in the wild - nothing has been installed long enough
     * for those to exist - but by the cheapness of accepting one more constant
     * against the cost of a rename being why something will not open.
     */
    legacySentinel: string;
    /** Stands in for the field table, which lives in the (searchable) docs. */
    envelopeRefNote: string;

    manifestTitle: string;
    manifestBody: string[];

    slidesTitle: string;
    slidesBody: string[];

    schemaTitle: string;
    schemaBody: string[];

    assetsTitle: string;
    assetsBody: string[];

    roundTripTitle: string;
    roundTripBody: string[];
    degradeLead: string;
    degrade: { term: string; def: string }[];

    versioningTitle: string;
    versioningBody: string[];

    apiTitle: string;
    apiLead: string;
    apiBody: string[];
    /** Stands in for the endpoint table, which lives in the docs. */
    apiRefNote: string;
  };

  bundle: {
    metaTitle: string;
    metaDescription: string;
    heroKicker: string;
    heroTitle: string;
    heroIntro: string;
    introBody: string[];

    layoutTitle: string;
    layoutBody: string[];
    /** One note per archive entry, keyed by BUNDLE_ENTRIES[].key. */
    layoutNotes: Record<string, string>;
    /** The media type a reader must keep accepting; see `format.legacySentinel`. */
    legacySentinel: string;

    manifestTitle: string;
    manifestBody: string[];
    /** Stands in for the manifest field table, which lives in the docs. */
    manifestRefNote: string;

    guaranteesTitle: string;
    guaranteesLead: string;
    guarantees: { title: string; body: string }[];

    importTitle: string;
    importBody: string[];

    gapsTitle: string;
    gapsBody: string[];
  };

  schemas: {
    metaTitle: string;
    metaDescription: string;
    heroKicker: string;
    heroTitle: string;
    heroIntro: string;
    introBody: string[];

    sourceTitle: string;
    sourceBody: string[];

    idTitle: string;
    idBody: string[];

    contractTitle: string;
    contractBody: string[];

    fetchTitle: string;
    fetchBody: string[];
    /** Stands in for the endpoint table, which lives in the docs. */
    fetchRefNote: string;
  };

  types: {
    metaTitle: string;
    metaDescription: string;
    heroKicker: string;
    heroTitle: string;
    heroIntro: string;
    /** Copy carries {count} / {audienceCount}; lib/facts.ts fills them in. */
    stats: { value: string; label: string }[];
    introBody: string[];

    /** Filter bar. Only rendered when scripting is on, so it never lies. */
    filterGroupLabel: string;
    filterAll: string;
    groupLabels: Record<string, string>;
    filterAudienceLabel: string;
    filterAudienceHint: string;
    /** Announced when filtering changes what the grid shows. */
    resultCount: string;
    emptyResult: string;

    /** Card and disclosure. */
    audienceBadge: string;
    detailsLabel: string;
    fieldsTitle: string;
    colKey: string;
    colType: string;
    colRequired: string;
    colLimit: string;
    colOptions: string;
    required: string;
    optional: string;
    noLimit: string;
    itemFieldsNote: string;
    variantsTitle: string;
    bestForTitle: string;
    notForTitle: string;
    schemaLinkLabel: string;
    identityLabel: string;

    globalTitle: string;
    globalBody: string[];

    deprecatedTitle: string;
    deprecatedBody: string[];
    deprecatedBadge: string;

    provenanceTitle: string;
    provenanceBody: string[];
    /** This page keeps its cards; the flat, searchable table is in the docs. */
    referenceNote: string;
  };
}

/** The pages that make up /spec/, in reading order. */
export type SpecPageId = 'index' | 'deck-format' | 'deck-bundle' | 'schemas' | 'slide-types';

export interface Content extends LocaleMeta {
  nav: NavContent;
  spec: SpecContent;
  waitlist: WaitlistContent;
  footer: FooterContent;
  home: HomeContent;
  features: FeaturesContent;
  install: InstallContent;
  structured: StructuredContent;
  compare: CompareContent;
  accessibility: AccessibilityContent;
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
