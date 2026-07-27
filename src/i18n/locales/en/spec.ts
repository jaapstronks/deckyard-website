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
        def: 'A committed example deck and a round-trip test in the core repo act as a conformance fixture today. Publishing them as a downloadable kit is the next step.',
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

    filterGroupLabel: 'Category',
    filterAll: 'All',
    groupLabels: {
      basic: 'Basics',
      media: 'Media',
      layouts: 'Layouts',
      data: 'Data',
      interaction: 'Interaction',
      other: 'Other',
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

    globalTitle: 'The fields every type carries',
    globalBody: [
      'Nine fields are added to every slide type rather than declared on each one: two for what a screen reader announces, six for a per-slide background image and how it is treated, and one for the theme logo. They are listed once here instead of thirty-eight times above.',
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
};
