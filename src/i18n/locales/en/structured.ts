import type { StructuredContent } from '@/i18n/types';

export const structured: StructuredContent = {
  metaTitle: 'How it works - structured slides, not drawings - Deckyard',
  metaDescription:
    'A Deckyard slide is a record with a type, not a canvas you drop shapes onto. That one decision is where the accessibility, the integrations and the house style all come from.',
  kicker: 'How it works',
  title: 'A slide that knows what it is',
  dek: 'Most tools treat a slide as a canvas: a rectangle you drop boxes onto, wherever they look right. Deckyard treats it as a record with a type. It sounds like a technical detail. It is the reason everything else on this site is possible.',
  cardIntro:
    'A slide is a record with a type, not a canvas you drop shapes onto. That one decision is where everything else comes from.',
  stats: [
    { value: '{count}', label: 'slide types, each with its own fields' },
    { value: '1', label: 'published schema, generated from the code' },
    { value: '0', label: 'colours or fonts stored in your content' },
  ],

  s1Title: 'Where a deck actually starts',
  s1Body: [
    'Nobody starts a presentation in a presentation tool. They start with a report somebody else wrote, a spreadsheet holding the real numbers, a note on a phone from a conversation last Tuesday, and a folder of photos nobody has named properly.',
    'That is the raw material, and it has three awkward properties: it is scattered across four places, it is in four different formats, and the interesting parts are buried inside sentences. Every deck begins with somebody quietly doing the work of getting it out.',
  ],

  s2Title: 'Somebody has to turn that into slides',
  s2Body: [
    'Traditionally that somebody is you, at eleven at night, copying figures out of a spreadsheet and into text boxes. The figures now live in two places, and one of them started going out of date the moment you pasted it.',
    'The alternative is not "let a robot do it". It is that the slide has a declared shape, so whatever fills it - you, a script, an agent - is checked against that shape first.',
  ],

  pull: 'Control does not come from doing it by hand. It comes from the type.',

  s3Title: 'What a slide type actually is',
  s3Body: [
    'A slide type is a small, opinionated contract. A timeline declares that it holds a sequence of moments, each with a date and a title, at least two and at most ten, and that the order carries meaning. A quote declares that it needs somebody to attribute it to, and refuses to be saved without one.',
    'None of those declarations mention a colour, a font or a position. That is the second half of the idea: the content carries the meaning, the theme carries the appearance, and the two never touch. Which is why the same slide can be correct for a city council and for a design studio without a single word changing.',
  ],

  chainTitle: 'What follows from it',
  chainLead:
    'The useful thing about this decision is not that it is elegant. It is that four separate promises turn out to be the same promise, stated four times.',
  chain: [
    {
      because: 'Because the fields have a type',
      claim: 'a slide can be read out loud properly.',
      body: 'A timeline projects to a numbered list, a table keeps its header row, an image says whether it is decorative or meaningful. Accessibility stops being a checklist somebody runs at the end and becomes a property of the format.',
    },
    {
      because: 'Because the fields have a type',
      claim: 'anything can fill them.',
      body: 'A field with a declared shape is a socket. Your data warehouse, your image library, a script or an agent can all fill it, and all of them are checked the same way. Nobody retypes a table, and the figure on the slide matches the figure at the source.',
    },
    {
      because: 'Because the styling lives elsewhere',
      claim: 'the organisation owns the look.',
      body: 'Brand lives in theme tokens, not in the deck. A deck cannot drift off-brand, because it is not carrying any brand with it. Lock the background and the logo and even an old deck renders inside the current house style.',
    },
    {
      because: 'Because all of it is one schema',
      claim: 'the format outlives the application.',
      body: 'The JSON Schema is generated from the same field definitions the editor and the validator read, so it cannot drift from the implementation. Somebody else can write a reader, a converter or a renderer without asking us. That is what open actually means here.',
    },
  ],

  chainA11yNote:
    'For plenty of the organisations reading this, the first of those four is not a nice-to-have but something they have to account for. So it has a page of its own: what the projection actually produces, field type by field type, and what it does not fix.',
  chainA11yCta: 'What the structure does for accessibility',

  compareTitle: 'The same deck, two ways of storing it',
  compareLead:
    'None of this is an argument that canvases are badly made. It is that a drawing cannot answer questions about itself, and a record can.',
  compareAspect: '',
  compareCanvas: 'Slide as a canvas',
  compareRecord: 'Slide as a record',
  compareRows: [
    {
      aspect: 'What a slide is',
      canvas: 'Shapes at coordinates',
      record: 'Named fields with a type',
    },
    {
      aspect: 'Read aloud by a screen reader',
      canvas: 'Guesswork, in drawing order',
      record: 'Real headings, lists and tables',
    },
    {
      aspect: 'Opened on a phone',
      canvas: 'Shrinks until it is unreadable',
      record: 'Reflows as a document',
    },
    {
      aspect: 'Filled from another system',
      canvas: 'Place a text box and hope',
      record: 'Fill the fields, get validated',
    },
    {
      aspect: 'Changing the house style',
      canvas: 'Restyle every slide by hand',
      record: 'Swap the theme, content untouched',
    },
    {
      aspect: 'Ten years from now',
      canvas: 'Hope the application still opens it',
      record: 'Documented JSON against a public schema',
    },
  ],

  ctaTitle: 'Easier to see than to read about',
  ctaBody:
    'The sandbox is the Deckyard editor in your browser, with no install and no account. Make a timeline, switch the theme, look at what you built. AI, uploads and publishing are off there, because it is public and anonymous.',
  ctaSandbox: 'Try the live sandbox',
  ctaDocs: 'Read the slide type reference',

  teaserKicker: 'The idea underneath',
  teaserTitle: 'Every slide knows what it is',
  teaserBody:
    'A Deckyard slide is not a canvas with boxes on it. It is a record with a type: a timeline knows it holds a sequence, a quote knows it needs attribution, and neither of them carries a single colour. That is where the accessibility, the integrations and the unbreakable house style all come from.',
  teaserCta: 'How it works',
  teaserFoot: 'Two fields, and not one colour',
};
