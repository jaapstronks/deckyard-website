import type { HomeContent } from '@/i18n/types';

export const home: HomeContent = {
  metaTitle: 'Deckyard - Open source, end-to-end presentation platform',
  metaDescription:
    'The open source presentation platform you run yourself, in place of PowerPoint, Canva or Gamma. Create, present, publish and collaborate in one tool - on brand by default, GDPR-native, no lock-in. MIT licensed, code on GitHub.',
  heroKicker: 'Open source · End-to-end · Made in Europe',
  heroTitleMain: 'Presentations,',
  heroTitleHighlight: 'set free.',
  heroWhatItIs:
    'Deckyard is an open source presentation platform you host yourself, in place of PowerPoint, Canva or Gamma.',
  heroLead:
    'Create, present, publish and collaborate in one tool: your brand, your data, and AI that fills slides in rather than designing them.',
  heroDeckTitle: 'Hi, this is Deckyard - a presentation embedded on this page',
  heroDeckPlay: 'Play the presentation',
  heroDeckNote:
    'Not a screenshot: a real deck, exported from Deckyard and dropped into this page with a single tag.',
  typesKicker: 'The pieces',
  typesTitle: 'Every deck is made of the same handful of things',
  typesLead:
    'A timeline, a comparison, some numbers, a question for the room. Deckyard ships {count} of them as declared types, so you pick the one you mean instead of drawing it.',
  typesRailLabel: 'A selection of the {count} slide types',
  typesAudienceLabel: 'the room answers',
  typesAllLabel: 'slide types, with their fields',
  typesCta: 'See all {count}',
  formatKicker: 'No lock-in, written down',
  formatTitle: 'Your deck is a file you can read',
  formatBody: [
    'A deck is JSON. It names the format it is in, the version of that format, and a declared type for every slide. None of that needs Deckyard to be running to be understood.',
    'And the format is published rather than described: the JSON Schema is served from the URL its own `$id` names, so anyone can validate a deck against it without asking us first.',
  ],
  formatCodeCaption: 'The envelope, shortened',
  formatCta: 'Read the format spec',
  formatSchemaCta: 'See the schemas',
  roomKicker: 'In the room',
  roomTitle: 'The deck asks, and the room answers',
  roomLead:
    'A poll is a slide type, not a second tool bolted on beside it. You present; people arrive at a short address with a code; and the answers land on the slide everybody is already looking at.',
  roomCta: 'How presenting works',
  roomPollAlt:
    'A poll slide during a presentation. Four answers, the bars unequal: 31 of the 47 votes on the third option, with the running total underneath.',
  roomPollCaption: 'poll-slide, mid-presentation',
  roomJoinAlt:
    'The invitation slide on the big screen: a QR code beside the address deckyard.eu/go and a five-letter access code.',
  roomJoinCaption: 'follow-invite-slide, on the big screen',
  featuresKicker: 'Everything else',
  featuresTitle: 'And then there is everything around the slide',
  featuresLead:
    'Making the deck is one half. The other half is your brand, your team, the room you present to, and getting the thing out again afterwards.',
  featuresCta: 'See all features',
  aiKicker: 'The part nobody has solved',
  aiTitle: 'Your people are already letting AI write for the organisation',
  aiLead: [
    'Not as a policy decision. Somebody had a deck to make on Thursday, pasted the notes into a chat window, and pasted the answer back. It reads fine, it is faster, and it is not going to stop.',
    'What nobody can say is whether what came out stays inside the rules the organisation has: the right claims, the right tone, the right look, the things that legally have to be there. Reviewing every deck does not scale, and asking people not to use AI has never once worked.',
  ],
  aiPoints: [
    {
      title: 'An agent cannot invent a layout',
      body: 'There is no layout to invent. It asks which slide types exist, and it fills in the fields of one of them. The design was already decided, by you, in the theme.',
    },
    {
      title: 'A write is checked like any other',
      body: 'A field with a declared shape validates whatever fills it. A model that produces a timeline with one moment in it, or a quote with nobody to attribute it to, gets the same refusal a person would.',
    },
    {
      title: 'The brand is not in the content',
      body: 'Colours, fonts and logos live in theme tokens, so there is nothing brand-shaped for a model to get wrong. A generated deck renders in the current house style because that is the only style there is.',
    },
  ],
  aiLimit:
    'What this does not do is make the text true. A model can still write a confident sentence about a number it invented, and no format catches that. What it can no longer do is hand you something that looks nothing like your organisation, or that quietly breaks the shape everything else is in.',
  aiCta: 'How that works',
  hostedNote:
    'Or have it run for you: a dedicated instance on your own domain, hosted in Europe, on the same code. The hosting is what pays for the development.',
  hostedCta: 'How hosting works',
  compareKicker: 'Coming from somewhere else',
  compareTitle: 'How this compares to what you use now',
  compareBody:
    'Most people reading this make decks in PowerPoint, Google Slides, Canva or Gamma. Every one of them is good at something, and every one of them costs you something. The comparison says which, and where Deckyard is the wrong answer.',
  compareCta: 'Read the comparison',
  ctaKicker: 'Open source, out now',
  ctaTitle: 'Explore the code, follow the launch',
  ctaLead:
    'Deckyard is MIT licensed, GDPR native and built to be self-hosted. The code is public on GitHub today. Star it, run it, or leave your address for launch and hosted-version updates.',
  ctaGithub: 'View on GitHub',
  ctaWaitlistButton: 'Join the launch list',
  sandboxButton: 'Try the live sandbox',
  sandboxNote: 'No install, no signup. AI, uploads and publishing are off.',
  ctaSandboxButton: 'Open the sandbox',
};
