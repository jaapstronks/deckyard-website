import type { HomeContent } from '@/i18n/types';

export const home: HomeContent = {
  metaTitle: 'Deckyard - Open source, end-to-end presentation platform',
  metaDescription:
    'The open source presentation platform you run yourself, in place of PowerPoint, Canva or Gamma. Create, present, publish and collaborate in one tool - on brand by default, GDPR-native, no lock-in. MIT licensed, code on GitHub.',
  heroKicker: 'Open source · End-to-end · Made in Europe',
  heroTitleMain: 'Presentations,',
  heroTitleHighlight: 'set free.',
  heroWhatItIs:
    'Deckyard is an open source presentation platform you host yourself, in place of PowerPoint, Canva or Gamma: your brand, your data, and AI that fills slides in rather than designing them.',
  heroLead:
    'Not just a slide builder: create, present, publish and collaborate in one web-based tool that runs on infrastructure you control. Every deck looks like it came from your design department, and stays yours from first draft to live audience.',
  featuresKicker: 'Under the hood',
  featuresTitle: 'Already built, now in the open',
  featuresLead:
    "This isn't a waitlist for an idea. Deckyard is a working platform in daily use, and the source is now public on GitHub. Here's what ships.",
  pillars: [
    {
      title: '{count} slide types',
      body: 'Charts, timelines, matrices, funnels, KPIs, galleries, quotes and more: structured layouts that do the design, so your team only types content.',
    },
    {
      title: 'AI on your terms',
      body: 'People reach for AI to draft decks; Deckyard puts you in control of it. Bring your own API key, tune the prompts, or drive it from your own tools over MCP. No forced LLM, no lock-in: use as much or as little as you want.',
    },
    {
      title: 'Real collaboration',
      body: 'Invite collaborators with granular permissions, comment on slides in real time, edit together without conflicts, and roll back with version history.',
    },
    {
      title: 'Publish anywhere',
      body: 'Put a deck on the web in one click, share it with a link, or embed it in your own site with the JS SDK. Social preview images come free.',
    },
    {
      title: 'Live audiences',
      body: 'Polls, Likert scales, moderated Q&A, feedback and lead capture on the slides themselves; per-slide analytics tell you afterwards what landed.',
    },
    {
      title: 'Your brand as software',
      body: 'Fonts, colours, logos and layout rules defined once as a theme. Everyone is on brand automatically; rebrand centrally and every deck follows.',
    },
    {
      title: 'No lock-in',
      body: 'Export to PDF, PowerPoint, self-contained HTML, PNG or JSON at any time. Your decks are documents you own, never records in someone else’s cloud.',
    },
    {
      title: 'Self-host in an afternoon',
      body: 'One Docker Compose file, Node and Postgres. Run it on your own servers under your own rules, or wait for our hosted version on European infrastructure.',
    },
  ],
  aiKicker: 'The part nobody has solved',
  aiTitle: 'Your people are already letting AI write for the organisation',
  aiLead:
    'Not as a policy decision. Somebody had a deck to make on Thursday, pasted the notes into a chat window, and pasted the answer back. It reads fine, it is faster, and it is not going to stop. What nobody can say is whether what came out stays inside the rules the organisation has: the right claims, the right tone, the right look, the things that legally have to be there. Reviewing every deck does not scale, and asking people not to use AI has never once worked.',
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
  compareKicker: 'Coming from somewhere else',
  compareTitle: 'How this compares to what you use now',
  compareBody:
    'Most people reading this make decks in PowerPoint, Canva or Gamma. All three are good at something, and all three cost you something. The comparison says which, and where Deckyard is the wrong answer.',
  compareCta: 'Read the comparison',
  ctaKicker: 'Open source, out now',
  ctaTitle: 'Explore the code, follow the launch',
  ctaLead:
    'Deckyard is MIT licensed, GDPR native and built to be self-hosted. The code is public on GitHub today. Star it, run it, or leave your address for launch and hosted-version updates.',
  ctaGithub: 'View on GitHub',
  ctaWaitlistButton: 'Join the launch list',
  sandboxButton: 'Try the live sandbox',
  sandboxNote: 'No install, no signup: a full Deckyard, running in your browser.',
  ctaSandboxButton: 'Open the sandbox',
};
