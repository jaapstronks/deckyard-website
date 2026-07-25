import type { HostingContent } from '@/i18n/types';

export const hosting: HostingContent = {
  metaTitle: 'Hosting — run it yourself, or let us run it — Deckyard',
  metaDescription:
    'Deckyard is a Docker Compose file you can run on your own servers. If nobody in your organisation wants that job, we run a dedicated instance for you on your own domain, in Europe.',
  heroKicker: 'Hosting',
  heroTitle: 'Deckyard runs where you want it',
  heroIntro:
    'The software is MIT licensed and made to be self-hosted, so running it yourself is the default path and always will be. But somebody has to keep that server patched, and not every organisation has that person. So we also run instances.',

  routesTitle: 'Two doors, same software',
  routesLead:
    'Not a free tier and a paid tier. The same code, either on your infrastructure or on ours, and the choice is about who does the maintenance.',
  selfLabel: 'Run it yourself',
  selfTitle: 'One line to try it, Compose to run it',
  selfBody:
    'One command puts Deckyard on your own machine at localhost:4177, picking Docker or Node 22+ automatically. Putting it in front of an organisation is the Compose path, with Postgres if you want it.',
  selfPoints: [
    'MIT licensed, with no feature held back for a paid edition',
    'Your servers, your jurisdiction, your backup policy',
    'Upgrade when it suits you, or never',
  ],
  selfCta: 'Read the deployment docs',
  managedLabel: 'We run it for you',
  managedTitle: 'A dedicated instance, on your own domain',
  managedBody:
    'Your own Deckyard, not a tenant inside somebody else’s. Hosted in Europe, on your domain, with the upgrades, backups and certificates handled.',
  managedPoints: [
    'A separate instance, so your data is not pooled with anyone else’s',
    'Your own hostname, with TLS set up and renewed',
    'Upgrades, backups and monitoring handled',
    'Export everything and walk at any time; it is the same software',
  ],
  managedCta: 'Get in touch',

  domainKicker: 'On your own domain',
  domainTitle: 'It looks like your organisation, because it is',
  domainBody:
    'A managed instance sits on a hostname you choose and control, with the certificate issued in your name. There is no shared login page with somebody else’s logo on it, and no vendor domain in the URL your audience sees.',
  domainExample: 'decks.your-organisation.eu',
  domainCaption: 'You point the DNS record; we do the rest.',

  includedTitle: 'What running it for you actually means',
  includedLead:
    'The honest list. No tiers, because there is nothing here we would hold back to sell you later.',
  included: [
    {
      title: 'A dedicated instance',
      body: 'Your own database and your own application, not a row in a shared one. It can be moved to your own infrastructure later without an export-import dance.',
    },
    {
      title: 'European infrastructure',
      body: 'Hosted in Europe under European law, which for a lot of public organisations is the part that decides whether this is usable at all.',
    },
    {
      title: 'Upgrades and backups',
      body: 'New versions applied, backups taken and checked, certificates renewed. The work that makes self-hosting a commitment rather than an install.',
    },
    {
      title: 'A person who answers',
      body: 'Small enough that support is a person who knows your setup, not a queue. That is also why we take on a limited number of instances.',
    },
  ],

  fundingKicker: 'Where the money goes',
  fundingTitle: 'Hosting is what pays for the development',
  fundingBody: [
    'There is no venture capital behind Deckyard, and no plan to sell seats to as many people as possible. That means the money has to come from somewhere honest, and this is it.',
    'Organisations that pay for a managed instance are funding software that everybody else can run for free. The roadmap follows the organisations actually using it, which is a very different pressure from following the organisations most likely to upgrade.',
  ],

  contactTitle: 'Tell us what you need',
  contactBody:
    'There is no signup flow, because this starts as a conversation rather than a checkout. Send an email and we will tell you honestly whether a managed instance or self-hosting fits you better.',
  contactCta: 'Email us about hosting',
  contactNoteHeading: 'Useful to mention',
  contactNote: [
    'your organisation, and roughly how many people would make decks',
    'whether you have a preferred hostname in mind',
    'anything your procurement or privacy people will ask about',
  ],
};
