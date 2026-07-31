import type { SpecContent } from '@/i18n/types';

export const spec: SpecContent = {
  shared: {
    moreTitle: 'The rest of the spec',
    pages: {
      index: {
        title: 'The Deckyard deck format',
        blurb: 'What it is, the two layers it comes in, and what you may do with it.',
      },
      conformance: {
        title: 'Conformance',
        blurb: 'What a second implementation has to build, and what it may then claim.',
      },
      'deck-format': {
        title: 'The deck format',
        blurb: 'The portable envelope, field by field: slides, types, versions, degradation.',
      },
      'deck-bundle': {
        title: 'The deck package',
        blurb: 'The archive that carries a deck and its images, content-addressed and verifiable.',
      },
      schemas: {
        title: 'Schemas',
        blurb: 'Where the JSON Schemas live, how to fetch them, and what they promise.',
      },
      'slide-types': {
        title: 'Slide types',
        blurb: 'Every built-in type, its shape, its fields and when to reach for it.',
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
        body: 'A flat, readable envelope: a title, a theme, a manifest of the slide types used, and an ordered array of slides. No server ids, no timestamps, no storage leftovers. You can open it in a text editor and understand it.',
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
      'HTML is to EPUB what the deck format is to the deck package: one is the document, the other is the container that lets the document travel with its images. The comparison people reach for is `document.xml` inside a `.docx`, and the resemblance is real, minus the XML. This is JSON you can read by eye.',
      'Deckyard is open source, so the implementation was always inspectable. That is a weaker promise than this one. Code tells you what a program does today; a spec tells you what a file means, which is what you need when the program is gone.',
    ],

    claimsTitle: 'What is actually unusual about it',
    claimsLead:
      'Plenty of tools export JSON. Five things here are harder to find, and each one is checkable rather than claimed.',
    claims: [
      {
        title: 'One source for the editor, the validator, the schema and the agent',
        body: 'A slide type declares its fields once. That declaration builds the form in the editor, validates the content, generates the JSON Schema, and is what an LLM is handed over MCP. This is not a spec written alongside an implementation and drifting from it; it falls out of the implementation, and CI holds the two together.',
      },
      {
        title: 'Semantics, not geometry',
        body: 'A deck says "a timeline with four milestones", never "a text box at 312.88pt". That is why one deck can render responsively, export to HTML and PDF, and take a different theme without being redrawn. It is also why a machine can reason about it.',
      },
      {
        title: 'As readable to a person as it is writable by an agent',
        body: 'The same type contract that the slide picker shows a human is what a model receives. PPTX and Google Slides are machine-writable but not machine-understandable: they carry boxes and coordinates, not meaning.',
      },
      {
        title: 'Two version axes, deliberately separated',
        body: "The envelope has a version, and slide content has its own, with a migration runner modelled on Jupyter's nbformat. Readers are lenient by contract: unknown keys are ignored, not rejected. That is why decks written years apart still open.",
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
        def: 'Versioned separately, under its own schema version, with a migration runner and a lenient read contract. New keys are additive; old decks keep opening.',
      },
      {
        term: 'Implementation',
        def: 'The reference implementation is Deckyard itself, MIT-licensed. The specification text carries its own licence, CC0-1.0, so a second implementation can lift the wording into its own document without asking. Nothing about reading or writing this format requires permission, a key, or a fee.',
      },
      {
        term: 'Conformance',
        def: 'Two levels, written down: level 1 is the envelope, the six structure contracts and the unknown-type contract; level 2 adds the nine normative slide types. Neither grows when a slide type is added. What each one entitles you to say is on the conformance page.',
      },
    ],
  },

  format: {
    metaTitle: 'The deck format - spec - Deckyard',
    metaDescription:
      'The portable deck envelope, field by field: the slide-type identity manifest, asset references, the round-trip guarantee, versioning and specified degradation.',
    heroKicker: 'Spec · layer 1',
    heroTitle: 'The deck format',
    heroIntro:
      "The portable, versioned envelope a presentation serializes to, so a second implementation can read, render and round-trip it without Deckyard's server or its storage.",
    introBody: [
      'A deck is data, not a rendering. The format is deliberately plain: slides are a flat array of `{ type, content }`, and nothing in it depends on the machine it came from.',
    ],

    envelopeTitle: 'The envelope',
    envelopeBody: ['Six top-level fields. Everything else about a deck lives inside `slides`.'],
    leniency:
      'The envelope is lenient. Unknown top-level keys are ignored by an importer, never rejected, so a newer producer can add a field that an older reader simply skips.',
    legacySentinel:
      'Before 1.7.0 this field said `slidecreator.deck`, a name that predates the product. Nothing writes it any more; a reader accepts it anyway, because a rename should never be the reason a file will not open.',
    envelopeRefNote:
      'Each of the six fields, its type and what a reader should do with it, is written out in the documentation.',

    manifestTitle: 'slideTypes: the identity manifest',
    manifestBody: [
      'The manifest records which slide-type definitions a deck was written against, as a map from the bare key to a qualified `namespace/name[@version]` identity. Core types resolve into the `core/` namespace; a type someone added themselves carries their own.',
      "It is recomputed from the registry on every export and never hand-maintained, so it cannot drift from the slides it describes. A CI test asserts that the committed example deck's manifest equals the recomputed one.",
      'This is how a second implementation learns which type definitions a deck needs. `slides[].type` stays the bare key for compatibility; the manifest is where the identity lives.',
    ],

    slidesTitle: 'Slides',
    slidesBody: [
      'A slide is a type and a content object whose shape that type defines. An absent or empty field means "unset": an importer fills the type\'s defaults and never blanks a required field.',
      'Portable slides carry no id. Ids are a storage concern and are regenerated on import, so a reader must not depend on slide identity surviving a round trip.',
    ],

    schemaTitle: 'Content schemas',
    schemaBody: [
      "Each slide type's content shape is described by a JSON Schema generated from the same field registry that drives validation and the editor. One source, no hand-synced copy, and no way for the schema to describe a shape the software does not accept.",
      'The schemas are served live and versioned by their `$id`. See the schemas page for how to fetch them.',
    ],

    assetsTitle: 'Asset references',
    assetsBody: [
      'Images are referenced by string. A local upload is a server path, portable only while that server is reachable. An external `https://` URL is already portable and is left untouched by every transform.',
      "To make a deck self-contained, use the deck package: it embeds each local asset's bytes, content-addressed, and rewrites the references to point inside the archive. Package references never appear in a plain portable deck.",
    ],

    roundTripTitle: 'Round-trip guarantee',
    roundTripBody: [
      'For content-bearing slides, export to import to export is a fixpoint: after one normalization pass, the portable projection is stable, and identical asset bytes hash to identical addresses. A test in the core repo proves this against a committed example deck on every run.',
    ],
    degradeLead:
      'Two edges are deliberately lossy. They are specified so that they degrade rather than crash, which is what makes the format safe to implement against.',
    degrade: [
      {
        term: 'Unknown slide type',
        def: 'Imports as a placeholder that names the type it could not resolve, says whether it was deliberately retired and what replaces it, and carries the original content across as text.',
      },
      {
        term: 'Missing local asset',
        def: 'Keeps its original reference and imports as a dangling one. Harmless, and visible rather than silent.',
      },
    ],

    securityTitle: 'A deck is not inert',
    securityBody: [
      'Most of the format is data a reader can render without executing anything. Two slide types are not: `custom-html-slide` carries HTML an author wrote, and `embed-slide` carries a URL that will be framed. A deck is therefore active content, and treating a file from someone else as safe because it validated is the wrong conclusion.',
      'What follows is a duty on whoever reads the format, not a property of it: sanitise author HTML before it reaches a document, and isolate embedded URLs in a frame that cannot reach the page around it. The package layer does not change this. Content addressing proves the bytes are the bytes that were packed; it says nothing about whether they are safe to run.',
      'This is worded to match the security considerations in the media-type registration, deliberately. The same claim should not read one way here and another way there.',
    ],

    versioningTitle: 'Versioning',
    versioningBody: [
      '`version` is the envelope version. It moves only for a breaking change to the envelope shape, and it has not moved.',
      "Slide content is versioned independently, tied to a schema version with its own migration runner. The model is Jupyter's nbformat: a reader validates against the version it understands, and the lenient contract lets it tolerate keys from a newer one.",
    ],

    apiTitle: 'Producing and consuming a deck',
    apiLead:
      "The schema routes answer without credentials on any instance, including the sandbox, because a published format contract should be fetchable. The routes that touch somebody's decks do not, for the same reason your documents are not public.",
    apiBody: [
      'Export produces either layer; import takes either one back. Nothing in that round trip is tied to one installation, which is the only test of a portable format that means anything: a deck your instance wrote opens on an instance that has never seen it.',
    ],
    apiRefNote:
      'The four export and import routes, and which of them need credentials, are listed in the documentation.',
  },

  bundle: {
    metaTitle: 'The deck package - spec - Deckyard',
    metaDescription:
      'The .deck package: an OCF-style ZIP that carries a deck and its assets, content-addressed by SHA-256, deduplicated, verifiable and enumerable.',
    heroKicker: 'Spec · layer 2',
    heroTitle: 'The deck package',
    heroIntro:
      'A self-contained archive of a presentation and its images. Where the JSON export still points at images on a server, the package carries its own pixels.',
    introBody: [
      'It renders and round-trips on another machine without the server it came from, and it can enumerate exactly which assets it contains. The layout is modelled on OCF, the container EPUB uses, for the same reason EPUB uses it: a ZIP whose first entry is an uncompressed media type is identifiable by magic number before anything unpacks it.',
    ],

    layoutTitle: 'Archive layout',
    layoutBody: ['Four things, in this order.'],
    layoutNotes: {
      mimetype:
        'First entry, stored uncompressed, containing exactly `{mime}`. That is what lets the archive be identified by magic number, before anything is unpacked.',
      manifest: 'Package metadata and the complete asset inventory.',
      deck: 'The portable envelope, with every asset reference rewritten to point inside the archive.',
      assets:
        'The asset bytes, addressed by the SHA-256 of their own content. Identical bytes are stored once.',
    },
    legacySentinel:
      'The media type has the same history as the sentinel in the envelope: a package written before 1.7.0 declares `application/vnd.slidecreator.deck`, and a reader takes both. A writer emits `{mime}` only. The file extension never changed, so a package on disk is a `.deck` either way.',

    manifestTitle: 'The manifest',
    manifestBody: [
      "The manifest is a complete inventory of the deck's assets. Each record ties the bytes in the archive to the names they used to have.",
      'The one worth understanding is `sources`: the original filenames stay in the manifest, so hash churn never leaks into the readable structure, and several sources means the same bytes were referenced from several places.',
    ],
    manifestRefNote: 'Every manifest field is written out in the documentation.',

    guaranteesTitle: 'What the package guarantees',
    guaranteesLead: 'Four properties, each one enforced by the reader rather than assumed.',
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

    importTitle: 'Reading a package back',
    importBody: [
      "Import is the mirror of export: verify the media-type sentinel, re-hash every asset, write the bytes back out using the human name the manifest remembered, rewrite the deck's references to their new locations, and then run the same normalization the plain JSON import runs.",
      'It degrades in specified ways too. An asset whose media type the receiving system will not accept is skipped and reported rather than aborting the import. An unknown slide type becomes the same named placeholder it does everywhere else. References that were already missing when the package was built import as dangling, which is harmless.',
    ],

    gapsTitle: 'What it does not cover yet',
    gapsBody: [
      'Assets attached to a theme rather than to a slide - a logo, say - are not embedded, and neither are external image URLs. External URLs are a deliberate choice, since they are already portable. Theme assets are a gap, and it is listed here rather than discovered later.',
    ],
  },

  schemas: {
    metaTitle: 'Schemas - spec - Deckyard',
    metaDescription:
      'Deckyard generates a JSON Schema for every slide type from the same field registry that drives the editor, and serves them live over a public endpoint.',
    heroKicker: 'Spec',
    heroTitle: 'Schemas',
    heroIntro:
      'Every slide type has a JSON Schema. None of them were written by hand, and none of them can describe a shape the software does not accept.',
    introBody: [
      'A schema that is maintained separately from the code it describes is a schema that is wrong, on a delay nobody measures. These are generated from the field registry that also builds the editor form, runs validation and feeds the agent catalogue, so there is one declaration and four consumers.',
    ],

    sourceTitle: 'Generated, not written',
    sourceBody: [
      'A slide type declares its fields: their keys, types, whether they are required, their length limits and their enumerated options. That declaration is the schema, projected. Add a field to a slide type and the schema gains it in the same commit, because there is no second place to update.',
      'This is also why the slide-type page on this site can show you a field table that is guaranteed to match: it is reading the same registry.',
    ],

    idTitle: 'Identity and versioning',
    idBody: [
      'Schemas are versioned by their `$id`, which carries the major version in its path. A per-type schema and a whole-deck schema, discriminated by slide type, are both published.',
      'Worth catching: that version is the version of the content shape ({schemaVersion}), not the envelope version ({version}). They are two axes, which is exactly why they have drifted apart.',
      'Both resolve. `{schemaBase}/deck.schema.json` is the whole deck, `{schemaBase}/slide-types/<type>.schema.json` is one type, and `{schemaBase}/index.json` hands you the list. A JSON Schema `$id` is an identifier and is not formally required to be fetchable; a format offered to other people as a standard should be anyway.',
      'Nothing under a published version path is ever withdrawn. A slide type that is retired keeps the schema it was published with, because somebody else’s deck still names it.',
    ],

    contractTitle: 'Contracts, not gatekeepers',
    contractBody: [
      'Additional properties are allowed. The schemas document the known shape of a slide; they do not reject history. A deck written before a field existed still validates, and a deck written after this reader was built still validates.',
      'This is the same leniency the envelope has, for the same reason: a format that rejects what it does not recognise cannot survive its own versions.',
    ],

    fetchTitle: 'Fetching them',
    fetchBody: [
      'There are two places to get them, and the difference matters. The files under `{schemaBase}` are the published ones: the core slide types, at the URL their `$id` names, frozen per schema version.',
      'The schema endpoints on a running instance are public and unauthenticated too, including on the sandbox, and they are generated at request time from that instance’s registry. So an instance carrying extra slide types serves schemas for those as well - which is the correct answer for that instance, and a good reason to fetch from the one you are actually talking to.',
    ],
    fetchRefNote: 'The endpoints, with a `curl` for each, are in the documentation.',
  },

  types: {
    metaTitle: 'Slide types - spec - Deckyard',
    metaDescription:
      'Every built-in Deckyard slide type: its shape, its fields, its limits and when to use it. Generated from the core registry, so the list cannot drift.',
    heroKicker: 'Spec',
    heroTitle: 'Slide types',
    heroIntro:
      'The vocabulary a deck is written in. Each type declares its own fields, and that declaration is what you see below.',
    stats: [
      { value: '{count}', label: 'Built-in types' },
      { value: '{audienceCount}', label: 'The audience takes part in' },
      { value: '1', label: 'Place any of this is written down' },
    ],
    introBody: [
      'A slide type is a small contract: a name, a set of fields, and a shape. It is not a template you fill in and then push around - which is why the same deck can render at any size, on any theme, into HTML or PDF, and be read by something that is not a person.',
      'The glyph on each card is the same abstract diagram the editor draws in its slide picker, from the same description of the layout. It shows structure rather than a shrunk-down screenshot, which is the only thing that stays legible this small.',
    ],

    structureTitle: 'Six shapes, not thirty-six peers',
    structureBody: [
      'A flat list of types says nothing about how any of them relate, so every type looks like a separate thing to build. They are not. Each type declares a `structure`: the shape of its primary content, independent of what the slide is about and how it looks. Six values cover all of them, with no "other" bucket.',
      'This is the axis worth building against. The categories an editor shelves types under mix familiarity, payload and runtime behaviour, and they are furniture; `structure` is derivable from the field schema, which means a declaration that lies about it can be caught by a test, and core runs one.',
    ],
    structureRule:
      'A variant is a render choice that every valid instance of the content survives without loss. A type boundary is where content has to be added or thrown away.',
    structureRuleSource: 'The rule that decides when something is a type rather than a layout.',
    structureContracts: {
      singleton:
        'A fixed set of scalar slots. Read the keys the type declares; there is no repetition to walk.',
      collection:
        'One array of items that all share a shape. Walk the array, render the item, repeat. That single loop is the whole contract, however many types use it.',
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
        'Two of these do not keep to it yet: `poll-slide` and `likert-slide` carry `option1..optionN` as separate scalars rather than an array, because they never got the migration the other collections did. Core tracks both in an open burndown; they are listed here rather than quietly rounded up.',
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
    filterAudienceLabel: 'The audience takes part',
    filterAudienceHint:
      'Types where the room answers, rates or joins in, rather than only watching.',
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

    runtimeTitle: 'The second facet: what has to be running behind a slide',
    runtimeBody: [
      'A type also declares a `runtime`: what the presenting session has to do for it beyond serving the slide. It answers a different question from `structure`, and it is the one that decides whether a reader needs a server at all.',
      'Unlike `structure`, this facet was measured rather than designed. Nine modules in core were writing out the same four type names to ask "does this slide collect answers from the audience?", and they had already drifted apart at the edges. None of them wanted to know which type it was; they wanted a capability the type did not declare.',
    ],
    runtimeLabels: {
      static: 'Static',
      timed: 'Timed',
      live: 'Live',
    },
    runtimeContracts: {
      static:
        'The session does nothing for it. The slide may still have client-side behaviour of its own; that is the slide\u2019s business, not the session\u2019s.',
      timed:
        'The presenter drives a clock on the slide. The timer state lives in the presenting window; the session neither holds nor aggregates it.',
      live: 'The audience answers, and the session collects and aggregates those answers as state the presenter opens and closes.',
    },
    runtimeEdge:
      'The line is drawn at session state, not at "has behaviour", so the awkward cases fall out of the definition instead of being argued one by one. `countdown-slide` is `timed`: a clock, no audience. `lead-capture-slide` is `static` even though it plainly collects from the room, because its submissions go to lead storage over their own endpoint and never reach the session. `follow-invite-slide` is `static` too: it renders the join code the session issued, which is a render input rather than state the session keeps.',

    conformanceTitle: 'Claim structures, not types',
    conformanceBody: [
      'A second implementation almost never wants all thirty-six, and until now it had no way to say so: either it claimed to read Deckyard decks and quietly fell over on a chart, or it said nothing and nobody could tell what it did. Structures give the claim an edge. Support a structure and you support every type in it, because they share one contract.',
      "A reader that covers a structure it has claimed and renders an unknown-type placeholder for the rest is a correct partial implementation, not a broken one. That is what the format's specified degradation is for.",
    ],
    conformanceColStructure: 'Structure',
    conformanceColTypes: 'Types covered',
    conformanceColClaim: 'What supporting it means',
    conformanceClaim: 'Reads all {n} without a special case per type.',
    conformanceExampleTitle: 'What a claim looks like',
    conformanceLinkLabel: 'Build the claim for your own reader',
    conformanceExample:
      'Reads the deck format, slide structures `singleton` and `collection` ({n} of {total} core types). Other structures import as a named placeholder.',

    globalTitle: 'The fields every type carries',
    globalBody: [
      'Nine fields are added to every slide type rather than declared on each one: two for what a screen reader announces, six for a per-slide background image and how it is treated, and one for the theme logo. They are listed once here instead of thirty-six times above.',
    ],

    deprecatedTitle: 'Retired types',
    deprecatedBody: [
      'These are no longer offered when you add a slide, but they still render, because decks that use them still exist and a deck that stops opening is a deck you have lost. They have no layout glyph on purpose: nothing should be inviting you to use one.',
    ],
    deprecatedBadge: 'Retired',

    provenanceTitle: 'Where this page comes from',
    provenanceBody: [
      'Nothing on this page was typed out by hand. The list, the count, the labels, the field tables, the limits, the layout glyphs and the "reach for it when" lines are generated from the Deckyard core repository into a data file this site reads, and the same source paths are watched so that a change in core shows up as drift here rather than as a page that quietly went out of date.',
      'It used to say 36 in one place, 38 in another and 44 in a third. That is what a hand-maintained number does.',
    ],
    referenceNote:
      'The same registry as one flat, searchable table - every field, limit and option, without the diagrams - is in the documentation.',
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
      'The point of the split is that level 1 does not grow with the number of slide types. A reader that learns nine type contracts knows nine things and is stale the day a tenth is published. A reader that learns six structure contracts can render a type that did not exist when it shipped.',
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
    levelsNote:
      'Neither level asks for all of the types. That is the whole design: a conformance claim that grows every time somebody adds a slide type is a claim nobody can keep.',

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
      '**`collection` and `fixed-collection` differ only in whether the count is meaning.** That is exactly why they are two structures and not one: a list of six may be reflowed into two columns, and a four-quadrant matrix may not be reduced to three.',
      '**`dataset` is the one structure whose payload cannot be checked.** The contract says so rather than pretending otherwise, and it names the degradation instead of leaving a reader to invent one.',
    ],

    tiersTitle: 'Three tiers, one normative',
    tiersLead:
      'The reframe that makes a published type set bearable is not "which types do we remove" but "which types do we promise". Removing is destructive and irreversible once a name is out; a tier is free and reversible. So nothing was removed.',
    tiers: [
      {
        badge: 'Tier 1',
        name: 'Core profile',
        what: 'Nine types.',
        promise: 'Normative. What a conforming implementation renders.',
      },
      {
        badge: 'Tier 2',
        name: 'Deckyard set',
        what: 'The other types we ship.',
        promise: 'We publish and document them, but they version with the app.',
      },
      {
        badge: 'Tier 3',
        name: 'Extension',
        what: 'Fork types, org types, third-party types.',
        promise:
          "The declarant's promise, not ours. We promise nothing about them, and we do not ignore them.",
      },
    ],
    profileTitle: 'The nine',
    profileLead:
      'A tier is a property of the name rather than of the definition. A fork that overrides `title-slide` answers a tier-1 name and inherits the tier-1 promise; that is what choosing the name means.',
    profileCriterion:
      'The choice is a criterion, not a taste: this is the minimal set that expresses an ordinary presentation without loss - title, section break, prose, enumeration, quotation, image, image-with-text, table, closing. Everything outside it adds expressiveness that has an acceptable degradation inside it.',
    profileNoChart:
      'A chart type is deliberately not in it. It demands a charting library, and the success criterion for a second implementation is a weekend of work; a profile that requires a charting runtime is no longer an entry threshold.',

    mapTitle: 'Every other type degrades into one of them',
    mapLead:
      'This is the rule that makes the tiers worth anything: **every tier-2 type declares a `fallback` to a tier-1 type.** A funnel falls back to a list, a gallery to images, a chart to a table. So a reader that knows only the nine renders every Deckyard deck without dropping content.',
    mapDegradeLabel: '{n} degrade to it',
    mapNote:
      'The `fallback` names a tier-1 contract, not a one-for-one slide swap. A gallery falling back to `image-slide` means "this content is images, render it the way you render images", and a reader is free to emit more than one slide for it.',
    mapGapLabel: 'Declares no fallback',

    idTitle: 'One identity, three spellings',
    idLead:
      'The canonical id is reverse-DNS: whoever owns the domain may define the type, which makes collisions structurally impossible instead of socially managed. The -slide suffix comes off the canonical name, because "slide" is already in the authority.',
    idColSpelling: 'Spelling',
    idColExample: 'Example',
    idColWhere: 'Where it appears',
    idSpellings: [
      {
        spelling: 'Canonical reverse-DNS',
        where: 'The `slideTypes` manifest, `GET /api/slide-types`, anything newly published.',
      },
      {
        spelling: 'Qualified',
        where: 'Decks written against the earlier identity model.',
      },
      {
        spelling: 'Bare key',
        where: '`slides[].type`, in every deck, past and present.',
      },
    ],
    idExampleCaption: 'One slide, three ways of naming its type. A reader MUST accept all three.',
    idStorage:
      '**Storage did not move.** `slides[].type` still holds the bare key, so the rename cost no deck a rewrite and nothing has to be migrated. A reader MUST treat the three spellings as one identity; the published JSON Schema applies the same content contract to each of them.',
    idVersion:
      'The `@version` suffix is a compatibility hint about a definition, not a different type. A reader that does not have the named version renders the version it has, and MUST NOT treat `title-slide@2` as an unknown type.',

    ruleTitle: 'The evolution rule',
    rule: 'Within a name, only additions. A change of meaning is a change of name.',
    ruleLead:
      'Normative, and it applies to every published name: a slide type, a content key, an envelope key, an enum value. The two blocks below change the same type in what looks like the same way, and only one of them leaves every deck ever written still valid.',
    ruleOkLabel: 'Permitted',
    ruleOkCaption: 'A new optional key. Every existing deck stays valid.',
    ruleBadLabel: 'Forbidden',
    ruleBadCaption: 'A new required key. Every existing deck is retroactively invalid.',
    producerTitle: 'What a producer owes',
    producer: [
      'A published name MUST keep its meaning for as long as it exists. If the meaning has to change, the name changes and the old one walks the removal ladder.',
      'Optional keys MAY be added at any time. A new **required** key MUST NOT be added to a published type: that turns every existing deck invalid retroactively, and that is a rename wearing a compatible-looking hat.',
      'Widening a value space is additive (a new enum value, a new spelling of a type id). **Narrowing it is not** and needs a new name.',
      'Nothing published is removed silently: a name that goes away is deprecated first, and tier 1 is covered by the standing stability promise.',
    ],
    readerTitle: 'What a reader owes',
    reader: [
      'A reader MUST ignore keys it does not know, at every level (envelope, slide, content, item), and MUST NOT reject a deck for carrying them.',
      'A reader MUST accept a `type` it does not know and render it per the contract below.',
    ],
    ruleWhyTitle: 'Why this replaces migration freedom',
    ruleWhy: [
      'Deckyard has a migration chain because it owns both ends of the line: an old deck is read, migrated forward in memory, and written back in the current shape. That freedom stops at our own storage. **A reader we do not own does not run our migration chain.** For anything published, a migration is therefore not a fix, it is a break that we happen to survive.',
      'The rule is what we trade that freedom for, and it is worth more: it is why a reader written today still works in three years without tracking our releases. The form is borrowed from atproto’s Lexicon on purpose - same problem, same answer, and no reason to invent a second dialect of it.',
    ],

    unknownTitle: 'A type your reader has never heard of',
    unknownLead:
      'This is what "nothing is dropped" means at the hardest point: a type you have no declaration for at all, from a fork you have never seen. It is a specified rendering, not an error path.',
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
        body: "in the order the keys appear in `content` - a producer writes them in the declared field order, so that order is the author's. A reader whose parser does not preserve member order MUST pick a stable order (lexicographic will do) rather than an arbitrary one. Non-string scalars render as their text form; the empty string means unset and MAY be skipped.",
      },
      {
        must: 'MUST render each element of an array-valued entry as a repeated item,',
        body: 'in array order, applying rule 2 within each element. This is the `collection` contract, the honest reading of an array whose meaning is unknown: it may be reflowed, it may not be reordered or truncated.',
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
    precedenceTitle: 'And it is the last resort, not the first',
    precedenceLead:
      'Three cases, in order. Most of what looks like an unknown type is really a known type you have not implemented, and that case has a better answer.',
    precedenceColHas: 'The reader has',
    precedenceColDoes: 'It does',
    precedence: [
      { has: 'The type, implemented', does: 'Renders it natively.' },
      {
        has: 'The declaration but no implementation',
        does: 'Uses `structure` plus the item contract, or the declared `fallback`.',
      },
      { has: 'Nothing but the slide', does: 'The seven rules above.' },
    ],

    referenceNote:
      'The exhaustive tables - every envelope field, every manifest field, every slide type with its facets - are in the documentation, which is the half the site search indexes.',
  },
};
