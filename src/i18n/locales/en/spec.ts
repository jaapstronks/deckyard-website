import type { SpecContent } from '@/i18n/types';

export const spec: SpecContent = {
  shared: {
    moreTitle: 'The rest of the spec',
    pages: {
      index: {
        title: 'The Deckyard deck format',
        blurb: 'What it is, the two layers it comes in, and what you may do with it.',
      },
      'deck-format': {
        title: 'The format',
        blurb: 'The envelope, the schemas and the archive that carries a deck with its images.',
      },
      'slide-types': {
        title: 'Slide types',
        blurb: 'Every built-in type, its shape, its fields and when to reach for it.',
      },
      conformance: {
        title: 'Conformance',
        blurb: 'What a second implementation has to build, and what it may then claim.',
      },
    },
    sourceNote: 'Every example on this page is served live by any Deckyard instance.',
    codeLabel: 'Read the implementation',
    referenceLabel: 'Full reference',
  },

  index: {
    metaTitle: 'The deck format - Deckyard',
    metaDescription:
      'Deckyard decks are a documented, versioned, openly implementable format: a JSON envelope for the data and a ZIP package for the assets.',
    heroKicker: 'Format spec',
    heroTitle: 'A deck is a file you own, in a format anybody may implement',
    heroIntro:
      'Deckyard stores presentations in a format that is written down, versioned, and free to implement. Not an export option bolted on afterwards; the shape the software works in.',

    layersTitle: 'Two layers, and the difference matters',
    layersLead:
      'The question people ask first is whether a deck is "some JSON" or "the zip". It is both, one inside the other, and each answers a different need.',
    layers: [
      {
        badge: 'Layer 1',
        name: 'The deck format',
        what: 'JSON. The data.',
        body: 'A flat, readable envelope: a title, a theme, and an ordered array of slides, each one naming its type. No server ids, no timestamps, no storage leftovers. You can open it in a text editor and understand it.',
      },
      {
        badge: 'Layer 2',
        name: 'The deck package',
        what: 'ZIP. The data plus its pixels.',
        body: 'The same envelope with every local image carried alongside it, addressed by the hash of its own bytes. It renders offline, on a machine that has never seen the server it came from.',
      },
    ],

    whyTitle: 'Why it is written down',
    whyBody: [
      'A presentation tool that keeps your work in a shape only it understands has made a claim on your work. Everything follows from that: whether you can leave, whether a script can read your decks, whether an archive can keep them, whether anyone else could ever build something that opens them.',
      'Deckyard is open source, so the implementation was always inspectable. That is a weaker promise than this one. Code tells you what a program does today; a spec tells you what a file means, which is what you need when the program is gone.',
    ],

    claimsTitle: 'What is actually unusual about it',
    claimsLead:
      'Plenty of tools export JSON. Three things here are harder to find, and each one is checkable rather than claimed.',
    claims: [
      {
        title: 'One source for the editor, the validator, the schema and the agent',
        body: 'A slide type declares its fields once. That declaration builds the form in the editor, validates the content, generates the JSON Schema, and is what an LLM is handed over MCP. This is not a spec written alongside an implementation and drifting from it; it falls out of the implementation, and CI holds the two together.',
      },
      {
        title: 'Semantics, not geometry',
        body: 'A deck says "a timeline with four milestones", never "a text box at 312.88pt". That is why one deck can render responsively, export to HTML and PDF, and take a different theme without being redrawn. It is also why a machine can reason about it, and why the same type contract a human sees in the slide picker is what a model receives.',
      },
      {
        title: 'Degradation is specified, not accidental',
        body: 'An unknown slide type does not throw. It imports as a placeholder that names the type it could not find, says whether the type was retired and what replaced it, and carries the original content across as text. A missing image becomes a dangling reference, not a crash. That is what makes it safe to build a second implementation.',
      },
    ],

    statusTitle: 'Status',
    statusLead: 'What is settled, what is promised, and how far the conformance goes today.',
    status: [
      {
        term: 'Envelope version',
        def: 'Version {version}. It has not changed, and a breaking change to the envelope shape would bump it and come with a migration path.',
      },
      {
        term: 'Content shape',
        def: 'Versioned separately, under its own schema version ({schemaVersion} today), with a migration runner and a lenient read contract. New keys are additive; old decks keep opening.',
      },
      {
        term: 'Implementation',
        def: 'The reference implementation is Deckyard itself, MIT-licensed. The specification text carries its own licence, CC0-1.0, so a second implementation can lift the wording into its own document without asking. Nothing about reading or writing this format requires permission, a key, or a fee.',
      },
      {
        term: 'Conformance',
        def: 'Two levels, written down: level 1 is the envelope and the six structure contracts, level 2 adds the nine normative slide types. Neither grows when a slide type is added.',
      },
    ],
  },

  format: {
    metaTitle: 'The deck format - spec - Deckyard',
    metaDescription:
      'The deck format, field by field: the JSON envelope, the generated schemas, and the content-addressed archive that carries a deck together with its images.',
    heroKicker: 'Spec',
    heroTitle: 'The deck format',
    heroIntro:
      "The portable, versioned shape a presentation serializes to, so a second implementation can read, render and round-trip it without Deckyard's server or its storage.",
    introBody: [
      'A deck is data, not a rendering. The format is deliberately plain: slides are a flat array of `{ type, content }`, and nothing in it depends on the machine it came from.',
    ],

    envelopeTitle: 'The envelope',
    envelopeBody: ['Five top-level fields. Everything else about a deck lives inside `slides`.'],
    leniency:
      'The envelope is lenient. Unknown top-level keys are ignored by an importer, never rejected, so a newer producer can add a field that an older reader simply skips.',
    envelopeRefNote:
      'Each of the five fields, its type and what a reader should do with it, is written out in the documentation.',

    slidesTitle: 'Slides, and the one spelling of a type id',
    slidesBody: [
      'A slide is a type and a content object whose shape that type defines. An absent or empty field means "unset": an importer fills the type\'s defaults and never blanks a required field. Portable slides carry no id, because ids are a storage concern and are regenerated on import.',
      "`slides[].type` is the type's canonical id, and a type has exactly one: reverse-DNS for a declarant with a domain (`eu.deckyard.slide.title`), `namespace/name` for one without. The id names the definition the slide was written against and may pin a version (`@2`), so there is no separate manifest to cross-check. Two older spellings - the bare registry key `title-slide` and the qualified `core/title-slide` - are pre-convergence residue, not part of the format: Deckyard still accepts and normalizes them on import, but what it exports is canonical, and a second implementation owes them nothing.",
    ],

    schemaTitle: 'Content schemas',
    schemaBody: [
      "Each slide type's content shape is described by a JSON Schema generated from the same field registry that drives validation and builds the editor form. One declaration, four consumers, and no way for a schema to describe a shape the software does not accept.",
      'They are versioned by their `$id`, which carries the version of the content shape ({schemaVersion}) rather than the envelope version ({version}). `{schemaBase}/deck.schema.json` is the whole deck, `{schemaBase}/slide-types/<type>.schema.json` is one type, and `{schemaBase}/index.json` hands you the list. All three resolve: a `$id` is not formally required to be fetchable, and a format offered to other people as a standard should be anyway.',
      'Additional properties are allowed. The schemas document the known shape of a slide; they do not reject history. Nothing under a published version path is ever withdrawn either, because a type that has been retired here is still named by somebody else’s deck.',
    ],

    assetsTitle: 'Asset references',
    assetsBody: [
      'Images are referenced by string. A local upload is a server path, portable only while that server is reachable. An external `https://` URL is already portable and is left untouched by every transform.',
    ],

    packageTitle: 'The package: a deck with its pixels',
    packageLead:
      'Where the JSON export still points at images on a server, the package carries its own. It renders and round-trips on a machine that has never seen the instance it came from, and it can enumerate exactly which assets it contains.',
    packageBody: [
      'The layout is modelled on OCF, the container EPUB uses, for the same reason EPUB uses it: a ZIP whose first entry is an uncompressed media type is identifiable by magic number before anything unpacks it. Four entries, in this order.',
    ],
    layoutNotes: {
      mimetype: 'First entry, stored uncompressed, containing exactly `{mime}`.',
      manifest:
        'Package metadata and the complete asset inventory. The original filenames stay in it, so hash churn never leaks into the readable structure, and several sources against one hash means the same bytes were referenced from several places.',
      deck: 'The portable envelope, with every asset reference rewritten to point inside the archive.',
      assets:
        'The asset bytes, addressed by the SHA-256 of their own content. Identical bytes are stored once.',
    },
    guarantees: [
      {
        title: 'Self-contained',
        body: 'Every local asset is embedded. The package renders offline, with no server in the picture.',
      },
      {
        title: 'Content-addressed and verifiable',
        body: "Each asset's bytes hash to its own reference. The reader re-hashes everything on the way in and rejects a mismatch, so a corrupted or tampered archive fails loudly.",
      },
      {
        title: 'Deduplicated',
        body: 'Identical bytes are stored once, however many slides point at them.',
      },
      {
        title: 'Enumerable',
        body: 'The manifest lists every asset a deck needs. You can answer "what is in here" without unpacking it.',
      },
    ],
    packageRefNote:
      'Every manifest field, and what import does with each one, is written out in the documentation.',

    degradeTitle: 'What is guaranteed, and what is lossy',
    degradeLead:
      'For content-bearing slides, export to import to export is a fixpoint: after one normalization pass the portable projection is stable, and identical asset bytes hash to identical addresses. A test in the core repo proves this against a committed example deck on every run. Two edges are deliberately not lossless, and both are specified so that they degrade rather than crash - which is what makes the format safe to implement against.',
    degrade: [
      {
        term: 'Unknown slide type',
        def: 'Imports as a placeholder that names the type it could not resolve, says whether it was deliberately retired and what replaces it, and carries the original content across as text.',
      },
      {
        term: 'Missing local asset',
        def: 'Keeps its original reference and imports as a dangling one. Harmless, and visible rather than silent. Theme assets and external URLs are not embedded by the package either: the first is a known gap, the second is deliberate, since an `https://` URL is already portable.',
      },
    ],

    securityTitle: 'A deck is not inert',
    securityBody: [
      'Most of the format is data a reader can render without executing anything. Two slide types are not: `custom-html-slide` carries HTML an author wrote, and `embed-slide` carries a URL that will be framed. A deck is therefore active content, and treating a file from someone else as safe because it validated is the wrong conclusion.',
      'What follows is a duty on whoever reads the format, not a property of it: sanitise author HTML before it reaches a document, and isolate embedded URLs in a frame that cannot reach the page around it. The package layer does not change this. Content addressing proves the bytes are the bytes that were packed; it says nothing about whether they are safe to run.',
    ],

    versioningTitle: 'Versioning',
    versioningBody: [
      "`version` is the envelope version. It moves only for a breaking change to the envelope shape, and it has not moved. Slide content is versioned independently, tied to a schema version with its own migration runner. The model is Jupyter's nbformat: a reader validates against the version it understands, and the lenient contract lets it tolerate keys from a newer one.",
    ],
  },

  types: {
    metaTitle: 'Slide types - spec - Deckyard',
    metaDescription:
      'Every built-in Deckyard slide type: its shape, its fields, its limits and when to use it. Generated from the core registry, so the list cannot drift.',
    heroKicker: 'Spec',
    heroTitle: 'Slide types',
    heroIntro:
      'The vocabulary a deck is written in. Each type declares its own fields, and that declaration is what you see below.',
    introBody: [
      'A slide type is a small contract: a name, a set of fields, and a shape. It is not a template you fill in and then push around, which is why the same deck can render at any size, on any theme, into HTML or PDF, and be read by something that is not a person. Core ships {activeCount} of them, all declared in one registry; the glyph on each card below is the abstract diagram the editor draws in its own slide picker, from the same description of the layout.',
    ],

    structureLead:
      'The grid is grouped by the `structure` each type declares: the shape of its primary content, independent of what the slide is about and how it looks. Six values cover all of them, with no "other" bucket, and this is the axis a second implementation builds against - support a structure and you support every type in it.',
    structureContracts: {
      singleton:
        'A fixed set of scalar slots. Read the keys the type declares; there is no repetition to walk.',
      collection:
        'One array of items that all share a shape. Walk the array, render the item, repeat.',
      'fixed-collection':
        'The same item contract as a collection, with the count fixed because the count carries meaning: four quadrants is what makes a matrix a matrix.',
      tabular: 'Rows of cells. The row is the item; the columns are positions inside it.',
      dataset:
        'Data points plus an encoding. The payload is an encoded blob rather than named fields, so this is the one shape a renderer cannot walk generically.',
      chrome:
        'No content fields at all. The slide is its own furniture, so there is nothing to read out of it.',
    },
    structureCaveats: {
      'fixed-collection':
        'Two of these do not keep to it yet: `poll-slide` and `likert-slide` carry `option1..optionN` as separate scalars rather than an array, because they never got the migration the other collections did. They are listed here rather than quietly rounded up.',
    },
    structureCountLabel: '{n} types',
    structureCountOne: '1 type',
    structureItemsLabel: 'Item shape',
    structureNoItems: 'Scalar fields only',

    structureLabels: {
      singleton: 'Singleton',
      collection: 'Collection',
      'fixed-collection': 'Fixed collection',
      tabular: 'Tabular',
      dataset: 'Dataset',
      chrome: 'Chrome',
    },
    filterAudienceLabel: 'Audience types only',
    filterAudienceHint:
      'Only the types where the room itself does something - answer a poll, rate a statement, leave feedback - rather than only watch.',
    resultCount: '{n} types shown',
    emptyResult: 'No types match those filters.',

    audienceBadge: 'Audience',
    detailsLabel: 'Fields and detail',
    fieldsTitle: 'Fields',
    colKey: 'Key',
    colType: 'Type',
    colRequired: 'Required',
    colLimit: 'Limit',
    colOptions: 'Options',
    required: 'Yes',
    optional: 'No',
    noLimit: '—',
    itemFieldsNote: 'Repeats, each item with:',
    variantsTitle: 'Layout variants',
    bestForTitle: 'Reach for it when',
    notForTitle: 'Reach for something else when',
    schemaLinkLabel: 'JSON Schema',
    identityLabel: 'Identity',
    tierLabel: 'Tier',
    runtimeLabel: 'Runtime',
    fallbackLabel: 'Falls back to',

    runtimeNote:
      'A type also declares a `runtime`: what the presenting session has to do for it beyond serving the slide. For nearly the whole catalogue the answer is nothing - a `static` type renders with no server in the picture. The {liveCount} `live` types are the exception: the audience answers, and the session collects and aggregates those answers as state the presenter opens and closes. One type, the countdown, is `timed` - its clock runs in the presenting window and asks nothing of the session.',

    globalTitle: 'The fields every type carries',
    globalBody: [
      'Nine fields are added to every slide type rather than declared on each one: two for what a screen reader announces, six for a per-slide background image and how it is treated, and one for the theme logo.',
    ],

    deprecatedTitle: 'Retired types',
    deprecatedBody: [
      'These are no longer offered when you add a slide, but they still render, because decks that use them still exist and a deck that stops opening is a deck you have lost. They have no layout glyph on purpose: nothing should be inviting you to use one.',
    ],
    deprecatedBadge: 'Retired',

    liveNote: "Each type's schema is also served live, by any running instance:",
    referenceNote:
      'Nothing on this page is typed by hand: the list, the counts, the field tables and the glyphs are generated from the core registry. The same registry as one flat, searchable table is in the documentation.',
  },

  conformance: {
    metaTitle: 'Conformance - spec - Deckyard',
    metaDescription:
      'What a second implementation has to build to say it reads Deckyard decks: two conformance levels, six item contracts, nine normative slide types and a specified contract for a type it has never heard of.',
    heroKicker: 'Spec',
    heroTitle: 'What it takes to read a Deckyard deck',
    heroIntro:
      'Publishing a format is a promise, and a promise without an edge is not one. This page draws the edge: what you have to build, what you may then say you support, and what happens at every point where your reader meets something it does not know.',

    levelsTitle: 'Conformance has two levels',
    levelsLead:
      'The point of the split is that neither level grows with the number of slide types. A reader that learns nine type contracts knows nine things and is stale the day a tenth is published. A reader that learns six structure contracts can render a type that did not exist when it shipped.',
    levels: [
      {
        badge: 'Level 1',
        name: 'Structure',
        implement:
          'The envelope, the six `structure` contracts, and the behaviour on a type you do not recognise.',
        claim: 'Reads Deckyard decks',
        body: 'Every deck renders and nothing is dropped. Some slides render generically rather than the way they were authored, which is a degradation you have declared rather than a failure the reader discovers.',
      },
      {
        badge: 'Level 2',
        name: 'Core profile',
        implement: 'Level 1, plus the field contracts of the nine tier-1 types, plus `fallback`.',
        claim: 'Renders the Deckyard core profile',
        body: 'Every deck renders the way it was authored, up to the degradation each type declares for itself. This is the realistic target: it is a weekend of work, not a catalogue.',
      },
    ],

    builderTitle: 'The claim you may publish',
    builderLead:
      'Tick what you actually render. The sentence underneath is the one you are entitled to put in your own documentation, and the numbers behind it are counted off the published registry rather than estimated.',
    builderStructuresLabel: 'Structures you render',
    builderProfileLabel: 'The nine tier-1 types, field by field',
    builderProfileHint:
      'Their own field contracts, not just their structure. This is what separates level 2 from level 1.',
    builderCoverage: '{n} of {total}',
    builderCoverageLabel: 'render as authored',
    builderDegradeLabel: 'degrade through a declared fallback or the unknown-type contract',
    builderClaimLabel: 'What you may say',
    builderClaimNone:
      'Nothing yet. A reader that renders no structure at all cannot claim to read the format.',
    builderClaimStructures:
      'Reads the Deckyard deck format. Slide structures {structures} render as authored ({n} of {total} types); every other slide renders through the unknown-type contract.',
    builderClaimProfile:
      'Renders the Deckyard core profile. Slide structures {structures} render as authored ({n} of {total} types); every other slide degrades through its declared fallback.',
    builderStaticNote:
      'This page can build the sentence for you with scripting on. Without it: name the structures you render, count the types they cover on the slide-types page, and say what the rest degrade to.',

    contractTitle: 'The six item contracts',
    contractLead:
      'Every slide type declares one structure, and that declaration is the interop currency: it says what the content carries, whether the count means anything, and what a reader that knows nothing else about the type is entitled to do with it.',
    contractCarriesLabel: 'The content carries',
    contractCountLabel: 'The count means',
    contractReaderLabel: 'A reader that knows only this',
    contractTypesLabel: 'Types declaring it',
    contractExampleLabel: 'What that looks like',
    contracts: {
      singleton: {
        carries: 'No repeated-item array.',
        count: 'Nothing to count.',
        reader: 'Renders the named scalar slots, in declaration order.',
      },
      collection: {
        carries: 'Exactly one item array.',
        count: "The author's choice.",
        reader:
          'Iterates. You may reflow it, paginate it or split it across slides; you may not reorder or truncate it.',
      },
      'fixed-collection': {
        carries: 'Exactly one item array, with `minItems === maxItems`.',
        count: "Part of the type's meaning.",
        reader:
          'Iterates, but never drops or pads items to make a layout fit. Four quadrants is what makes a matrix a matrix.',
      },
      tabular: {
        carries: 'Exactly one item array: the rows.',
        count: "The author's choice.",
        reader: 'Treats items as rows and item keys as columns, with the column set shared.',
      },
      dataset: {
        carries: 'An encoded payload plus its encoding.',
        count: 'Inside the payload.',
        reader: 'Decodes to rows and falls back to `tabular`. Only the visual encoding is lost.',
      },
      chrome: {
        carries: 'No content fields at all.',
        count: 'Nothing to count.',
        reader: 'Renders the beat the slide occupies, or omits the slide. Either one is lossless.',
      },
    },
    contractNotes: [
      '**`collection` and `fixed-collection` differ only in whether the count is meaning.** That is exactly why they are two structures and not one: a list of six may be reflowed into two columns, and a four-quadrant matrix may not be reduced to three. `dataset` is the one structure whose payload cannot be checked, and the contract says so rather than leaving a reader to invent a degradation.',
    ],

    profileTitle: 'The nine that carry a promise',
    profileLead:
      'Nine names are normative. The other types Deckyard ships are published and documented but version with the app, and a type from a fork carries its declarant’s promise rather than ours. A tier is a property of the name, not of the definition: a fork that overrides `title-slide` inherits the tier-1 promise, because that is what choosing the name means.',
    profileCriterion:
      'The choice is a criterion, not a taste: this is the minimal set that expresses an ordinary presentation without loss - title, section break, prose, enumeration, quotation, image, image-with-text, table, closing. Everything outside it adds expressiveness that has an acceptable degradation inside it, which is also why no chart type is in it: a profile that demands a charting runtime is no longer an entry threshold.',

    mapTitle: 'Every other type degrades into one of them',
    mapLead:
      'This is the rule that makes the nine worth anything: **every tier-2 type declares a `fallback` to a tier-1 type.** A funnel falls back to a list, a gallery to images, a chart to a table. So a reader that knows only the nine renders every Deckyard deck without dropping content.',
    mapDegradeLabel: '{n} degrade to it',
    mapNote:
      'The `fallback` names a tier-1 contract, not a one-for-one slide swap. A gallery falling back to `image-slide` means "this content is images, render it the way you render images", and a reader is free to emit more than one slide for it.',
    mapGapLabel: 'Declares no fallback',

    ruleTitle: 'The evolution rule',
    rule: 'Within a name, only additions. A change of meaning is a change of name.',
    ruleLead:
      'Normative, and it applies to every published name: a slide type, a content key, an envelope key, an enum value. Deckyard migrates its own storage forward, but a reader we do not own does not run our migration chain, so for anything published a migration is not a fix. The two blocks below make the same change to the same type, and only one of them leaves every deck ever written still valid.',
    ruleOkLabel: 'Permitted',
    ruleOkCaption: 'A new optional key. Every existing deck stays valid.',
    ruleBadLabel: 'Forbidden',
    ruleBadCaption: 'A new required key. Every existing deck is retroactively invalid.',
    duties: [
      'A published name MUST keep its meaning for as long as it exists. If the meaning has to change, the name changes, and the old one is deprecated rather than removed silently.',
      'Optional keys MAY be added at any time. A new **required** key MUST NOT be added to a published type: that turns every existing deck retroactively invalid, and it is a rename wearing a compatible-looking hat. Widening a value space is additive; **narrowing it is not.**',
      'A reader MUST ignore keys it does not know, at every level - envelope, slide, content, item - and MUST NOT reject a deck for carrying them.',
      'A reader MUST compare type ids as strings, after stripping an optional `@version` suffix: one type has one id, and there is no alias table to learn. The two older spellings of a core id - the bare `title-slide` and the qualified `core/title-slide` - are pre-convergence residue, not part of the format; a reader owes them nothing and MAY treat them as unknown types, which the unknown-type contract renders without loss. The `@version` suffix is a compatibility hint about a definition, not a different type, so `eu.deckyard.slide.title@2` MUST NOT be treated as unknown.',
    ],

    unknownTitle: 'A type your reader has never heard of',
    unknownLead:
      'This is what "nothing is dropped" means at the hardest point: a type you have no declaration for at all, from a fork you have never seen. It is a specified rendering, not an error path, and it is the last resort - a type you have the declaration for but have not implemented takes its `structure` or its declared `fallback` instead.',
    unknownInCaption: 'A slide from a fork you do not know',
    unknownOutCaption: 'What a conforming reader shows',
    unknownOutBadge: 'Unknown type',
    unknownOutNote:
      'Every string in author order, every array element as a repeated item, the type named on the slide, and the presenter note honoured because it is an envelope key and does not depend on the type.',
    unknownRules: [
      {
        must: 'MUST render the slide.',
        body: 'Dropping it silently changes the slide count, the numbering and the argument the deck is making. A reader MUST NOT reject the deck either: one unknown type is not a malformed deck.',
      },
      {
        must: 'MUST render every string-valued entry of `content` as text,',
        body: "in the order the keys appear in `content` - a producer writes them in the declared field order, so that order is the author's. A reader whose parser does not preserve member order MUST pick a stable order rather than an arbitrary one. The empty string means unset and MAY be skipped.",
      },
      {
        must: 'MUST render each element of an array-valued entry as a repeated item,',
        body: 'in array order, applying rule 2 within each element. This is the `collection` contract: it may be reflowed, it may not be reordered or truncated.',
      },
      {
        must: 'MUST show the type reference,',
        body: 'as written in `type`, on or beside the slide. A viewer has to be able to tell a generic rendering from an authored one; silently pretty output is how "we support Deckyard" becomes untrue without anyone noticing.',
      },
      {
        must: 'MUST honour the global slide keys it already knows',
        body: '- notes, duration, visibility, and the accessibility and background keys. Those are envelope-level and their meaning does not depend on the type.',
      },
      {
        must: 'SHOULD render it in the deck’s theme,',
        body: 'so an unknown type reads as a plain slide rather than as breakage.',
      },
      {
        must: 'MUST NOT invent content.',
        body: 'No synthesized headings, no filled-in blanks, no reordering. Rendering less faithfully than the author wrote is a degradation; rendering something the author did not write is a bug.',
      },
    ],
    unknownNested:
      'A value that is neither a scalar nor an array or object of scalars - a nested payload a reader cannot interpret - MAY be omitted. Rule 7 outranks completeness.',

    referenceNote:
      'The exhaustive tables - every envelope field, every manifest field, every slide type with its facets - are in the documentation, which is the half the site search indexes.',
  },
};
