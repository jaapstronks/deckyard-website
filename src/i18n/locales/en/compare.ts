import type { CompareContent } from '@/i18n/types';

export const compare: CompareContent = {
  metaTitle: 'Deckyard compared to PowerPoint, Google Slides, Canva and Gamma - Deckyard',
  metaDescription:
    'An honest comparison: what PowerPoint, Google Slides, Canva, Gamma and Deckyard each do well, and what each of them costs you. Including where Deckyard is the wrong answer.',
  heroKicker: 'Compared',
  heroTitle: 'What you gain, and what you give up',
  heroIntro:
    'Almost everybody arriving here already makes decks in PowerPoint, Google Slides, Canva or Gamma. So this page says plainly what each of those is good at, what it costs you, and where Deckyard is the wrong answer. A comparison we win every row of would tell you nothing.',

  tableTitle: 'Five ways to make a deck',
  tableLead:
    'Two columns per tool, because each of these is a trade rather than a ranking. Deckyard is in the same table on the same terms, and its second column is not empty. The section below takes each one at length.',
  colTool: 'Tool',
  colStrength: 'What it does well',
  colGiveUp: 'What you give up',
  alternatives: [
    {
      id: 'powerpoint',
      name: 'PowerPoint',
      strength: 'Already in the licence, already on every laptop, and nobody needs training.',
      giveUp:
        'Layouts and placeholders exist, but nothing stops you drawing next to them and nothing checks that you did not.',
      body: [
        'PowerPoint is the honest baseline: it is paid for, it is installed, and nobody needs training. Any argument for something else has to be worth the cost of not using the thing everyone already has.',
        'What it cannot do is bind. Slide masters, layouts and placeholders are real, and a placeholder is something assistive technology reads correctly. What is missing is anything that enforces them: you can always draw a shape beside the placeholder, and to a screen reader that shape is not a heading. The Accessibility Checker tells you afterwards, which is a different thing from a format in which it could not have gone wrong. The same gap shows up downstream, where a deck built from your own data is a file your script assembles, with nothing to check it against.',
      ],
    },
    {
      id: 'google-slides',
      name: 'Google Slides',
      strength:
        'Already in Workspace, real-time by default, and scriptable without infrastructure of your own.',
      giveUp:
        'Hosted at Google, and a slide is still a drawing, so a merge fills text boxes rather than fields.',
      body: [
        'Google Slides is the one a lot of people use without ever having chosen it: it comes with Workspace, it opens in a browser on any machine, and real-time collaboration with a version history has worked there for longer than anywhere else. It also has a serious API. A batch update that replaces text across a copied deck is a working template merge, and Apps Script puts that within reach of somebody with no infrastructure at all.',
        'The two things it does not offer are the two this table is about. There is no version you run yourself, so where your material is processed is Google’s answer rather than yours. And a slide is still shapes at coordinates: the merge does not know what your fields mean, so it inherits the formatting of the first character it replaces and copes badly with text longer than the placeholder it lands in. It is PowerPoint’s model with much better collaboration, not a different model.',
      ],
    },
    {
      id: 'canva',
      name: 'Canva',
      strength:
        'An enormous template library and a genuinely fast route to something that looks good.',
      giveUp:
        'Priced per person, and you export a copy you go on editing elsewhere, never the original.',
      body: [
        'Canva solved the problem PowerPoint left open: it made a good-looking deck reachable for somebody who is not a designer, and it made brand assets something a team can share rather than email around.',
        'The cost is where it all sits. The decks, the images and the brand kit are on somebody else’s platform, under their terms and their roadmap, billed per seat as the team grows. For a lot of organisations that is a perfectly reasonable trade. For the ones that have to answer where their material is processed, or that would rather not have their visual identity live in an account they do not control, it is the whole question.',
      ],
    },
    {
      id: 'gamma',
      name: 'Gamma',
      strength: 'The fastest route there is from a prompt to a deck that looks finished.',
      giveUp:
        'Hosted only: there is no version you run yourself, and a theme is styling rather than a rule about what a slide is.',
      body: [
        'Gamma is very good at the thing it does. If you need a deck this afternoon and nobody is going to audit it, generating one is the sensible answer, and pretending otherwise would be silly.',
        'What it is not is a place where your organisation’s rules live. A Gamma theme carries your fonts, colours and logo, so the output can genuinely look like you; what a theme cannot do is decide what a slide is. The generator still picks the structure, and nothing checks the result against a rule you wrote down. Add that there is no self-hosted version and "our decks" stays a thing on their platform. Deckyard is aiming at the step after that: not the fastest first draft, but the deck you can put in front of a board without checking every slide first.',
      ],
    },
    {
      id: 'deckyard',
      name: 'Deckyard',
      self: true,
      strength:
        'Slides are typed records, so the brand holds and the accessibility falls out of the format.',
      giveUp:
        '{count} slide types instead of a template marketplace, a short integration list, and somebody has to run it.',
      body: [
        'The trade Deckyard makes is to put the rules in the format. A slide is a record with a declared type, the theme carries every colour and font, and anything filling a field is validated the same way whether it is a person, a script or an agent. Other tools can fill a template from data too; the difference is that here the type of the slide is declared and the system checks the filling against it, rather than dropping text into a box on a drawing. That is where the unbreakable brand, the accessible output and the integrations all come from; they are one decision, not four features.',
        'And that is also the cost. There is no marketplace of 3,000 templates, the integration list is short, and the software is younger than everything else in this table. Self-hosting is real work: a server, upgrades, backups, somebody who owns it. If nobody in your organisation is that somebody, a managed instance exists, but then you are paying for hosting rather than getting it free with a licence you already own.',
      ],
    },
  ],

  readTitle: 'The same five, at length',
  readLead:
    'The table is the short version. This is what each trade actually feels like once an organisation lives with it.',

  wrongTitle: 'When Deckyard is the wrong answer',
  wrongLead:
    'The fastest way to find out whether this fits is to read the cases where it does not. If you recognise yourself here, one of the other four is the better tool and we would rather you used it.',
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
