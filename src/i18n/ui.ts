// Central i18n dictionary + routing helpers for the marketing site.
// EN is the default locale (served at the root, no prefix); NL is served
// under /nl/. Docs (Starlight) stay English-only and are out of scope here.
//
// Editorial copy below is outgoing marketing text: keep it natural, and in
// Dutch avoid em dashes (use " - " or ";"). Functional strings (aria labels,
// placeholders) may stay pragmatic.

export const languages = {
  en: 'English',
  nl: 'Nederlands',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'en';

export interface Pillar {
  title: string;
  body: string;
}

export interface Content {
  htmlLang: string;
  ogLocale: string;
  skipToContent: string;

  nav: {
    blog: string;
    docs: string;
    github: string;
    homeAria: string;
    badge: string;
    languageAria: string;
  };

  waitlist: {
    button: string;
    emailLabel: string;
    placeholder: string;
    honeypot: string;
    statusOk: string;
    statusError: string;
    note: string;
  };

  footer: {
    tagline: string;
    followHeading: string;
    followBlog: string;
    followRss: string;
    productHeading: string;
    productDocs: string;
    productGithub: string;
    productDreamkit: string;
    metaCopyright: string; // {year} placeholder
    metaMade: string;
  };

  home: {
    metaTitle: string;
    metaDescription: string;
    heroKicker: string;
    heroTitleMain: string;
    heroTitleHighlight: string;
    heroTagline: string;
    heroLead: string;
    featuresKicker: string;
    featuresTitle: string;
    featuresLead: string;
    pillars: Pillar[];
    ctaKicker: string;
    ctaTitle: string;
    ctaLead: string;
    ctaGithub: string;
    ctaWaitlistButton: string;
  };

  install: {
    kicker: string;
    title: string;
    lead: string;
    tabHuman: string;
    tabAgent: string;
    humanCaption: string;
    agentCaption: string;
    copy: string;
    copied: string;
    readFirst: string;
  };

  blogIndex: {
    metaTitle: string;
    metaDescription: string;
    kicker: string;
    title: string;
    intro: string;
    empty: string; // contains HTML links
  };

  blogPost: {
    metaTitleSuffix: string;
    followKicker: string;
    followTitle: string;
    allPosts: string;
    dateLocale: string;
  };

  blogCard: {
    readMore: string;
    dateLocale: string;
  };
}

export const ui: Record<Lang, Content> = {
  en: {
    htmlLang: 'en',
    ogLocale: 'en_US',
    skipToContent: 'Skip to content',

    nav: {
      blog: 'Blog',
      docs: 'Docs',
      github: 'GitHub',
      homeAria: 'Deckyard home',
      badge: 'Beta',
      languageAria: 'Language',
    },

    waitlist: {
      button: 'Keep me posted',
      emailLabel: 'Email address',
      placeholder: 'you@organization.eu',
      honeypot: 'Leave this field empty',
      statusOk: 'Almost there: check your inbox to confirm your address.',
      statusError: 'That did not work. Please try again in a moment.',
      note: 'Launch updates only, a few times a year. Double opt-in, no tracking pixels, stored on our own European server. Unsubscribe with one click.',
    },

    footer: {
      tagline:
        'An open source presentation platform for organizations that want to own their story: their brand, their data, their infrastructure.',
      followHeading: 'Follow along',
      followBlog: 'Blog',
      followRss: 'RSS feed',
      productHeading: 'Product',
      productDocs: 'Documentation',
      productGithub: 'GitHub',
      productDreamkit: 'Dreamkit',
      metaCopyright: '© {year} Deckyard · Bureau Bolster',
      metaMade: 'Made in the Netherlands · Hosted in Europe · MIT licensed',
    },

    home: {
      metaTitle: 'Deckyard — Open source, end-to-end presentation platform',
      metaDescription:
        'Deckyard is the open source, end-to-end presentation platform: create, present, publish and collaborate in one web-based tool that runs on infrastructure you control. On brand by default, and yours from first draft to live audience. The code is public on GitHub.',
      heroKicker: 'Open source · End-to-end · Made in Europe',
      heroTitleMain: 'Presentations,',
      heroTitleHighlight: 'set free.',
      heroTagline: 'Open source, end to end, and yours to run.',
      heroLead:
        'Deckyard is an open source presentation platform for nonprofits, public institutions and cultural organizations in Europe. Not just a slide builder: create, present, publish and collaborate in one web-based tool that runs on infrastructure you control. Every deck looks like it came from your design department, and stays yours from first draft to live audience.',
      featuresKicker: 'Under the hood',
      featuresTitle: 'Already built, now in the open',
      featuresLead:
        "This isn't a waitlist for an idea. Deckyard is a working platform in daily use, and the source is now public on GitHub. Here's what ships.",
      pillars: [
        {
          title: '35+ slide types',
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
          body: 'Fonts, colors, logos and layout rules defined once as a theme. Everyone is on brand automatically; rebrand centrally and every deck follows.',
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
      ctaKicker: 'Open source, out now',
      ctaTitle: 'Explore the code, follow the launch',
      ctaLead:
        'Deckyard is MIT licensed, GDPR native and built to be self-hosted. The code is public on GitHub today. Star it, run it, or leave your address for launch and hosted-version updates.',
      ctaGithub: 'View on GitHub',
      ctaWaitlistButton: 'Join the launch list',
    },

    install: {
      kicker: 'From zero to running',
      title: 'One line. Your own instance.',
      lead:
        'No signup, no sales call. Paste one line and Deckyard clones, configures and starts itself on your machine, at localhost:4177. Docker or Node 22+ is all it needs.',
      tabHuman: 'One-liner',
      tabAgent: 'Let your AI agent do it',
      humanCaption: 'Auto-detects Docker or Node 22+, writes a local .env, and opens the app.',
      agentCaption: 'Paste this to Claude Code, Cursor, or any shell-capable agent.',
      copy: 'Copy',
      copied: 'Copied',
      readFirst: 'Read the script first',
    },

    blogIndex: {
      metaTitle: 'Blog — Deckyard',
      metaDescription:
        'Building Deckyard in the open: notes on open source presentations, digital sovereignty and brand systems for European organizations.',
      kicker: 'Building in public',
      title: 'Notes from the yard',
      intro:
        'Progress reports, design decisions and detours while we build an open source presentation platform for European organizations.',
      empty:
        'Nothing here yet. The first notes land once there’s something real to show; subscribe to the <a href="/rss.xml">RSS feed</a> or join the launch list on the <a href="{home}">homepage</a> and you won’t miss them.',
    },

    blogPost: {
      metaTitleSuffix: '— Deckyard blog',
      followKicker: 'Follow along',
      followTitle: 'Get the next update in your inbox',
      allPosts: '← All posts',
      dateLocale: 'en-GB',
    },

    blogCard: {
      readMore: 'Read the post →',
      dateLocale: 'en-GB',
    },
  },

  nl: {
    htmlLang: 'nl',
    ogLocale: 'nl_NL',
    skipToContent: 'Naar inhoud',

    nav: {
      blog: 'Blog',
      docs: 'Docs',
      github: 'GitHub',
      homeAria: 'Deckyard startpagina',
      badge: 'Beta',
      languageAria: 'Taal',
    },

    waitlist: {
      button: 'Hou me op de hoogte',
      emailLabel: 'E-mailadres',
      placeholder: 'jij@organisatie.eu',
      honeypot: 'Laat dit veld leeg',
      statusOk: 'Bijna klaar: check je inbox om je adres te bevestigen.',
      statusError: 'Dat lukte niet. Probeer het zo nog een keer.',
      note: 'Alleen updates rond de lancering, een paar keer per jaar. Double opt-in, geen tracking pixels, opgeslagen op onze eigen Europese server. Uitschrijven met één klik.',
    },

    footer: {
      tagline:
        'Een open source presentatieplatform voor organisaties die hun eigen verhaal willen bezitten: hun merk, hun data, hun infrastructuur.',
      followHeading: 'Volg mee',
      followBlog: 'Blog',
      followRss: 'RSS-feed',
      productHeading: 'Product',
      productDocs: 'Documentatie',
      productGithub: 'GitHub',
      productDreamkit: 'Dreamkit',
      metaCopyright: '© {year} Deckyard · Bureau Bolster',
      metaMade: 'Gemaakt in Nederland · Gehost in Europa · MIT-licentie',
    },

    home: {
      metaTitle: 'Deckyard - Open source presentatieplatform van begin tot eind',
      metaDescription:
        'Deckyard is het open source presentatieplatform van begin tot eind: maken, presenteren, publiceren en samenwerken in één webtool die draait op infrastructuur die jij beheert. On brand vanaf het eerste moment, en van jou van eerste opzet tot live publiek. De code staat openbaar op GitHub.',
      heroKicker: 'Open source · Van begin tot eind · Made in Europe',
      heroTitleMain: 'Presenteren,',
      heroTitleHighlight: 'bevrijd.',
      heroTagline: 'Open source, van begin tot eind, en van jou.',
      heroLead:
        'Deckyard is een open source presentatieplatform voor maatschappelijke organisaties, overheden en culturele instellingen in Europa. Niet zomaar een slidebouwer: maken, presenteren, publiceren en samenwerken in één webtool die draait op infrastructuur die jij beheert. Elke deck ziet eruit alsof je designafdeling hem maakte, en blijft van jou; van eerste opzet tot live publiek.',
      featuresKicker: 'Onder de motorkap',
      featuresTitle: 'Al gebouwd, nu in de openbaarheid',
      featuresLead:
        'Dit is geen wachtlijst voor een idee. Deckyard is een werkend platform dat dagelijks wordt gebruikt, en de broncode staat nu openbaar op GitHub. Dit is wat je krijgt.',
      pillars: [
        {
          title: '35+ slidetypes',
          body: 'Grafieken, tijdlijnen, matrices, funnels, KPI’s, galerijen, quotes en meer: gestructureerde layouts die het ontwerp doen, zodat je team alleen nog inhoud typt.',
        },
        {
          title: 'AI op jouw voorwaarden',
          body: 'Mensen grijpen naar AI om decks op te zetten; Deckyard geeft jou de regie. Gebruik je eigen API-sleutel, stel de prompts bij, of stuur het aan vanuit je eigen tools via MCP. Geen verplichte LLM, geen lock-in: gebruik zoveel of zo weinig als je wilt.',
        },
        {
          title: 'Echte samenwerking',
          body: 'Nodig medewerkers uit met fijnmazige rechten, reageer live op slides, werk samen zonder conflicten, en draai wijzigingen terug met versiegeschiedenis.',
        },
        {
          title: 'Publiceer overal',
          body: 'Zet een deck met één klik online, deel hem met een link, of embed hem op je eigen site met de JS-SDK. Social previews krijg je er gratis bij.',
        },
        {
          title: 'Live publiek',
          body: 'Polls, Likert-schalen, gemodereerde Q&A, feedback en leadcapture op de slides zelf; analytics per slide vertellen je achteraf wat aankwam.',
        },
        {
          title: 'Je merk als software',
          body: 'Fonts, kleuren, logo’s en layoutregels leg je één keer vast als thema. Iedereen is automatisch on brand; verander het merk centraal en elke deck volgt.',
        },
        {
          title: 'Geen lock-in',
          body: 'Exporteer op elk moment naar PDF, PowerPoint, zelfstandige HTML, PNG of JSON. Je decks zijn documenten die je bezit, geen records in de cloud van iemand anders.',
        },
        {
          title: 'Zelf hosten in een middag',
          body: 'Eén Docker Compose-bestand, Node en Postgres. Draai het op je eigen servers onder je eigen regels, of wacht op onze gehoste versie op Europese infrastructuur.',
        },
      ],
      ctaKicker: 'Open source, nu beschikbaar',
      ctaTitle: 'Verken de code, volg de lancering',
      ctaLead:
        'Deckyard is MIT-gelicenseerd, GDPR-native en gebouwd om zelf te hosten. De code staat vandaag openbaar op GitHub. Geef ’m een ster, draai ’m, of laat je adres achter voor updates over de lancering en de gehoste versie.',
      ctaGithub: 'Bekijk op GitHub',
      ctaWaitlistButton: 'Zet me op de lanceerlijst',
    },

    install: {
      kicker: 'Van niets naar draaiend',
      title: 'Eén regel. Je eigen instance.',
      lead:
        'Geen aanmelding, geen salesgesprek. Plak één regel en Deckyard kloont, configureert en start zichzelf op je eigen machine, op localhost:4177. Docker of Node 22+ is alles wat je nodig hebt.',
      tabHuman: 'One-liner',
      tabAgent: 'Laat je AI-agent het doen',
      humanCaption: 'Detecteert automatisch Docker of Node 22+, schrijft een lokale .env en opent de app.',
      agentCaption: 'Plak dit in Claude Code, Cursor, of een andere shell-agent.',
      copy: 'Kopieer',
      copied: 'Gekopieerd',
      readFirst: 'Lees eerst het script',
    },

    blogIndex: {
      metaTitle: 'Blog - Deckyard',
      metaDescription:
        'Deckyard bouwen in de openbaarheid: aantekeningen over open source presentaties, digitale soevereiniteit en merksystemen voor Europese organisaties.',
      kicker: 'Bouwen in de openbaarheid',
      title: 'Aantekeningen van de werf',
      intro:
        'Voortgang, ontwerpkeuzes en zijsporen terwijl we een open source presentatieplatform voor Europese organisaties bouwen.',
      empty:
        'Hier staat nog niets. De eerste aantekeningen verschijnen zodra er iets echts te laten zien is; abonneer je op de <a href="/rss.xml">RSS-feed</a> of zet je op de lanceerlijst op de <a href="{home}">homepage</a>, dan mis je ze niet.',
    },

    blogPost: {
      metaTitleSuffix: '- Deckyard blog',
      followKicker: 'Volg mee',
      followTitle: 'Krijg de volgende update in je inbox',
      allPosts: '← Alle berichten',
      dateLocale: 'nl-NL',
    },

    blogCard: {
      readMore: 'Lees het bericht →',
      dateLocale: 'nl-NL',
    },
  },
};

// ---- Routing helpers -------------------------------------------------------

/** Detect the active locale from a URL pathname (e.g. /nl/blog/ -> 'nl'). */
export function getLangFromUrl(url: URL): Lang {
  const seg = url.pathname.split('/')[1];
  if (seg in ui) return seg as Lang;
  return defaultLang;
}

/**
 * Turn a logical path (always the EN/root form, starting with '/') into the
 * URL for a given locale. Default locale keeps the bare path; others get a
 * '/<lang>' prefix.
 */
export function localizePath(path: string, lang: Lang): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (lang === defaultLang) return clean;
  return clean === '/' ? `/${lang}/` : `/${lang}${clean}`;
}

/**
 * Split a pathname into its locale and the logical (root-form) path. Used by
 * the language switcher to build the counterpart URL for the current page.
 */
export function stripLangFromPath(pathname: string): { lang: Lang; path: string } {
  const parts = pathname.split('/');
  if (parts[1] in ui && parts[1] !== defaultLang) {
    const rest = '/' + parts.slice(2).join('/');
    return { lang: parts[1] as Lang, path: rest === '/' ? '/' : rest };
  }
  return { lang: defaultLang, path: pathname };
}
