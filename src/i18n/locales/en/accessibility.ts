import type { AccessibilityContent } from '@/i18n/types';

export const accessibility: AccessibilityContent = {
  metaTitle: 'Accessibility - a property of the format, not a checklist - Deckyard',
  metaDescription:
    'Because a Deckyard slide is a typed record rather than a drawing, it projects to real headings, lists and tables. Every published deck has a reading view that works with JavaScript off. Including what this does not fix.',
  heroKicker: 'Accessibility',
  heroTitle: 'Nobody makes a drawing accessible afterwards',
  heroIntro:
    'A slide on a canvas is shapes at coordinates, and no amount of care at the end turns that into something a screen reader can read out properly. A slide that is a record with typed fields projects to a document: headings that are headings, a sequence that is a numbered list, a table that keeps its header row. That is the whole argument, and the rest of this page is what it does and does not get you.',

  followsTitle: 'What the structure yields',
  followsLead:
    'This is generated from the declared field vocabulary rather than written per slide type, so every type is covered - including one your own organisation added - and the output cannot drift away from the definitions.',
  follows: [
    {
      field: 'A text field with a heading role',
      result: 'A real heading, in a hierarchy: one h1 for the deck, one h2 per slide.',
    },
    {
      field: 'A collection whose order carries meaning',
      result:
        'An ordered list. A timeline or a process declares `ordered: true`, so it becomes an <ol> and nothing downstream may reshuffle it.',
    },
    {
      field: 'A collection whose order is incidental',
      result: 'An unordered list. Cards and columns are a set, and the projection says so.',
    },
    {
      field: 'A table field',
      result: 'A table with a real header row: <thead> and <th scope="col">, not bold text.',
    },
    {
      field: 'An image declared as meaningful',
      result: 'A figure with its alt text, and a caption when there is one.',
    },
    {
      field: 'An image declared as decorative',
      result: 'Empty alt and aria-hidden, so assistive technology skips it instead of guessing.',
    },
    {
      field: 'A field that only configures appearance',
      result:
        'Nothing. Colours, sizes and layout choices are not content and are left out of the document view.',
    },
    {
      field: 'The per-slide accessibility fields',
      result:
        'An accessibility title and summary announced when the slide becomes active, for the cases the fields cannot infer.',
    },
  ],

  readerKicker: 'The reading view',
  readerTitle: 'Every published deck is also a document',
  readerBody: [
    'A published deck lives at its own address, and the same deck has a reading view one path further along, linked from the deck itself. It is the same content, projected as a document: one heading hierarchy, a table of contents, landmarks, figures with their alt text.',
    'It is a separate view rather than a mode, which matters more than it sounds: the presentation stays a presentation, and the accessible version is not a degraded copy somebody has to remember to update. Both are projections of the same record.',
  ],
  readerPoints: [
    'Readable with JavaScript switched off, and with the page’s own styling switched off',
    'One column, relative units, no fixed canvas: it reflows on a phone instead of shrinking',
    'On the open web with no login, so anybody you send the link to can use it',
    'Generated from the field definitions, so a new slide type appears in it without extra work',
  ],

  phoneTitle: 'And on a phone',
  phoneBody:
    'A canvas has one honest option on a small screen, which is to shrink until it is unreadable. A document reflows. That is the same mechanism as the screen reader case, arriving through a different door, and it is the version most of your audience actually uses.',

  limitsTitle: 'What this does not fix',
  limitsLead:
    'The format removes the obstacles. It cannot make your content good, and a page about accessibility that pretends otherwise is being read by exactly the people who will check.',
  limits: [
    {
      title: 'Somebody still has to write the alt text',
      body: 'The field exists, it asks whether the image is meaningful or decorative, and AI can draft a description. Whether that description is any use is a human judgement, every time.',
    },
    {
      title: 'The theme editor measures contrast, it does not enforce it',
      body: 'Pick a background and you get light or dark text against it automatically; that choice now goes to whichever of the two measures higher, not to whichever looks lighter, and the editor shows the ratio and the WCAG verdict next to the pickers that produced it. It reports rather than blocks: a low-contrast variant can be a deliberate brand decision, and a settings panel is not the place to overrule one. It covers the main colours and the background variants, so your own brand palette, and the judgement about what is legible enough, stay yours.',
    },
    {
      title: 'Video and audio need captions',
      body: 'A slide can hold a video. Nothing about a typed field produces a transcript, and we do not generate captions for you.',
    },
    {
      title: 'We make no conformance claim about your deck',
      body: 'Deckyard is not a certificate. If your organisation has to publish an accessibility statement, the reading view is the surface to test against, and we would rather help you test it than assert something on your behalf.',
    },
  ],

  ctaTitle: 'Check it rather than take our word for it',
  ctaBody:
    'The sandbox is the Deckyard editor in your browser, with no install and no account: build a timeline and see what the fields ask of you. Publishing is off there, so for the reading view you need an instance of your own: publish a deck, follow the link to its reading view, and then switch JavaScript off and read it again.',
  ctaDocs: 'Read the accessibility docs',
  ctaSandbox: 'Try the live sandbox',
};
