import type { CompareContent } from '@/i18n/types';

export const compare: CompareContent = {
  metaTitle: 'Deckyard compared to PowerPoint, Canva and Gamma - Deckyard',
  metaDescription:
    'An honest comparison: what PowerPoint, Canva, Gamma and Deckyard each do well, and what each of them costs you. Including where Deckyard is the wrong answer.',
  heroKicker: 'Compared',
  heroTitle: 'What you gain, and what you give up',
  heroIntro:
    'Almost everybody arriving here already makes decks in PowerPoint, Canva or Gamma. So this page says plainly what each of those is good at, what it costs you, and where Deckyard is the wrong answer. A comparison we win every row of would tell you nothing.',

  tableTitle: 'Four ways to make a deck',
  tableLead:
    'Two columns per tool, because each of these is a trade rather than a ranking. Deckyard is in the same table on the same terms, and its second column is not empty.',
  colTool: 'Tool',
  colStrength: 'What it does well',
  colGiveUp: 'What you give up',
  alternatives: [
    {
      id: 'powerpoint',
      name: 'PowerPoint',
      strength:
        'Already in the licence, already on every laptop, and everybody has opened one before. Works offline, with no account and no network.',
      giveUp:
        'Every slide is a drawing, so the brand drifts slide by slide and accessibility is manual work on each one. Filling a deck from another system means writing an Office file, not filling in fields.',
      body: [
        'PowerPoint is the honest baseline: it is paid for, it is installed, and nobody needs training. Any argument for something else has to be worth the cost of not using the thing everyone already has.',
        'What it cannot do is hold a shape. A slide is shapes at coordinates, so two people making the same slide make two different slides, and a template is a suggestion rather than a rule. The same is true of everything downstream: an accessible deck is something a person makes accessible slide by slide, and a deck generated from your own data is a file your script assembles, with nothing to check it against.',
      ],
    },
    {
      id: 'canva',
      name: 'Canva',
      strength:
        'An enormous template library and a genuinely fast route to something that looks good. Brand kits, comments and shared folders work well.',
      giveUp:
        'Your work lives on their infrastructure, priced per person. You can export a copy, but the editable original stays there and there is no version you run yourself.',
      body: [
        'Canva solved the problem PowerPoint left open: it made a good-looking deck reachable for somebody who is not a designer, and it made brand assets something a team can share rather than email around.',
        'The cost is where it all sits. The decks, the images and the brand kit are on somebody else’s platform, under their terms and their roadmap, billed per seat as the team grows. For a lot of organisations that is a perfectly reasonable trade. For the ones that have to answer where their material is processed, or that would rather not have their visual identity live in an account they do not control, it is the whole question.',
      ],
    },
    {
      id: 'gamma',
      name: 'Gamma',
      strength:
        'The fastest route there is from a prompt to a finished-looking deck. Hard to beat when the point is to have something today.',
      giveUp:
        'Hosted only, and the deck takes the shape the generator chose rather than one your organisation defined. There is nothing to run yourself and no format to build on.',
      body: [
        'Gamma is very good at the thing it does. If you need a deck this afternoon and nobody is going to audit it, generating one is the sensible answer, and pretending otherwise would be silly.',
        'What it is not is a place where your organisation’s rules live. The output is shaped by the generator, so what comes out looks like a Gamma deck that mentions your brand rather than a deck your brand produced; and because there is no self-hosted version, "our decks" stays a thing on their platform. Deckyard is aiming at the step after that: not the fastest first draft, but the deck you can put in front of a board without checking every slide first.',
      ],
    },
    {
      id: 'deckyard',
      name: 'Deckyard',
      self: true,
      strength:
        'You own the form, the content and the machine it runs on. Slides are typed records, so the brand holds and the accessibility falls out of the format instead of a checklist.',
      giveUp:
        'Younger and smaller: {count} slide types instead of a template marketplace, fewer integrations, one repository instead of an ecosystem. And somebody has to run it, or pay us to.',
      body: [
        'The trade Deckyard makes is to put the rules in the format. A slide is a record with a declared type, the theme carries every colour and font, and anything filling a field is validated the same way whether it is a person, a script or an agent. That is where the unbreakable brand, the accessible output and the integrations all come from; they are one decision, not four features.',
        'And that is also the cost. There is no marketplace of 3,000 templates, the integration list is short, and the software is younger than everything else in this table. Self-hosting is real work: a server, upgrades, backups, somebody who owns it. If nobody in your organisation is that somebody, a managed instance exists, but then you are paying for hosting rather than getting it free with a licence you already own.',
      ],
    },
  ],

  readTitle: 'The same four, at length',
  readLead:
    'The table is the short version. This is what each trade actually feels like once an organisation lives with it.',

  wrongTitle: 'When Deckyard is the wrong answer',
  wrongLead:
    'The fastest way to find out whether this fits is to read the cases where it does not. If you recognise yourself here, one of the other three is the better tool and we would rather you used it.',
  wrong: [
    'You need one good-looking deck by Friday and nobody will ever open it again. Generate it.',
    'You want to browse thousands of templates and pick a look. That is not what this is; the look comes from your theme.',
    'Nobody can run a server and there is no budget for a managed instance. Self-hosting is the default path here, not an optional extra.',
    'Your workflow is built on PowerPoint files being edited by everyone in the chain. Deckyard exports to PowerPoint, but it is not a round-trip editor for Office documents.',
    'You are one person making personal decks. This is built for organisations that need everybody’s decks to agree with each other.',
  ],

  ctaTitle: 'Easier to judge than to read about',
  ctaBody:
    'The sandbox is the Deckyard editor in your browser, with no install and no account. Make a slide, switch the theme, and see whether the trade above is one you want. AI, uploads and publishing are off there, because it is public and anonymous.',
  ctaSandbox: 'Try the live sandbox',
  ctaHow: 'Read how it works',
};
