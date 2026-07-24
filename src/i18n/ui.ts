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

// Live hosted playground: a full Deckyard anyone can try without installing.
export const sandboxBaseUrl = 'https://sandbox.deckyard.eu';

// Open the sandbox in the same language as the site the visitor came from.
// The sandbox reads `?lang=` (validated against its locale manifest) and sets
// the anonymous session locale, precedence URL-param > localStorage > default.
// See deckyard#317. Our lang codes (en/nl) match the sandbox's manifest tags.
export function sandboxUrl(lang: Lang): string {
  return `${sandboxBaseUrl}/?lang=${lang}`;
}

export interface Pillar {
  title: string;
  body: string;
}

export interface Content {
  htmlLang: string;
  ogLocale: string;
  skipToContent: string;

  nav: {
    sandbox: string;
    blog: string;
    changelog: string;
    docs: string;
    github: string;
    homeAria: string;
    badge: string;
    languageAria: string;
    menuAria: string;
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
    sandboxButton: string;
    sandboxNote: string;
    ctaSandboxButton: string;
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

  // "How raw material becomes an on-brand slide" explainer. Three zones: the
  // pile of stuff you start with, the three routes that structure it, and the
  // slide itself with its two independent controls (type and house style).
  //
  // The running example is a deliberately absurd one - a lemonade stand
  // reported on in stiff corporate register - so nobody mistakes the demo
  // content for a claim about Deckyard.
  anatomy: {
    kicker: string;
    title: string;
    lead: string;

    // --- zone 1: the raw material ---
    sourcesLabel: string;
    sourcesNote: string;
    // Passages a slide field is drawn from are wrapped in
    // <span data-span="ID">. Those IDs are structural and map to fields in
    // SlideAnatomy.astro, so keep them when translating.
    sources: {
      id: string;
      kind: 'doc' | 'sheet' | 'note' | 'library';
      name: string; // filename in the window chrome
      caption: string; // what kind of thing this is
      heading?: string;
      paragraphs?: string[]; // doc + note, as HTML
      rows?: string[][]; // sheet cells, as HTML
      assetFile?: string;
      assetAlt?: string;
    }[];

    // --- zone 2: structuring it ---
    routesLabel: string;
    routesLead: string;
    routes: { id: string; label: string; blurb: string; snippet: string }[];
    gateText: string; // may contain <b>

    // --- zone 3: the slide ---
    recordLabel: string;
    typeLabel: string;
    themeLabel: string;
    fieldsLabel: string;
    hint: string;
    // The field vocabulary itself (keys, types, required flags, limits) is
    // structural and lives in the component; only the values are translated.
    types: {
      id: string;
      label: string;
      claim: string; // may contain <b>
      eyebrow: string;
      title: string;
      items?: { date: string; title: string }[];
      bars?: { label: string; value: number }[];
      quote?: { text: string; name: string; role: string };
      image?: { caption: string };
    }[];
    themes: { id: string; label: string; swatch: string }[];
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

  changelog: {
    metaTitle: string;
    metaDescription: string;
    kicker: string;
    title: string;
    intro: string;
    latestBadge: string;
    githubCta: string;
    dateLocale: string;
  };
}

export const ui: Record<Lang, Content> = {
  en: {
    htmlLang: 'en',
    ogLocale: 'en_US',
    skipToContent: 'Skip to content',

    nav: {
      sandbox: 'Try it',
      blog: 'Blog',
      changelog: 'Changelog',
      docs: 'Docs',
      github: 'GitHub',
      homeAria: 'Deckyard home',
      badge: 'Beta',
      languageAria: 'Language',
      menuAria: 'Menu',
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
        'The open source presentation platform you run yourself. Create, present, publish and collaborate in one tool - on brand by default, GDPR-native, no lock-in. MIT licensed, code on GitHub.',
      heroKicker: 'Open source · End-to-end · Made in Europe',
      heroTitleMain: 'Presentations,',
      heroTitleHighlight: 'set free.',
      heroTagline: 'Open source, end to end, and yours to run.',
      heroLead:
        'Deckyard is an open source presentation platform for organizations that want to own their work. Not just a slide builder: create, present, publish and collaborate in one web-based tool that runs on infrastructure you control. Every deck looks like it came from your design department, and stays yours from first draft to live audience.',
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
      sandboxButton: 'Try the live sandbox',
      sandboxNote: 'No install, no signup: a full Deckyard, running in your browser.',
      ctaSandboxButton: 'Open the sandbox',
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

    anatomy: {
      kicker: 'From raw material to an on-brand slide',
      title: 'Structure is where the control is',
      lead: 'A deck starts as a pile of things from everywhere: a document, a spreadsheet, a note on your phone, a photo library. Something has to turn that into slides. You can do it by hand, have a script do it, or let an agent do it - but you want the result on brand and you want a say in how the data lands. That is what slide types are for.',

      sourcesLabel: 'What you start with',
      sourcesNote:
        'Pick a slide type below and the source it draws on comes forward. Different material, different slide, same pile.',
      sources: [
        {
          id: 'doc',
          kind: 'doc',
          name: 'Lemonade-Stand-Q3-Review-FINAL-v2-reviewed_by_jane-REALFINAL(3).docx',
          caption: 'Word processor',
          heading: 'Q3 Operational Review — Sunnyside Lemonade Stand',
          paragraphs: [
            '<b data-span="h1">1. Background.</b> The Stand was <span data-span="n1">constituted by resolution of the household</span> in <span data-span="t1">2021</span>. In <span data-span="t2">2022</span> it entered its <span data-span="n2">first strategic partnership</span>, with the adjacent bake sale. Operations were <span data-span="n3">suspended for reasons of weather</span> throughout <span data-span="t3">2024</span>. Trading <span data-span="n4">resumed under revised governance</span> in <span data-span="t4">2025</span>.',
            '<b>2. Performance.</b> In the period under review the Stand dispensed 412 cups, an increase of 18 per cent on the comparable quarter.',
          ],
        },
        {
          id: 'sheet',
          kind: 'sheet',
          name: 'cups_Q3_final_v4_USE_THIS_ONE.xlsx',
          caption: 'Spreadsheet',
          rows: [
            ['Month', '<span data-span="sh">Cups</span>'],
            ['June', '<span data-span="c1">96</span>'],
            ['July', '<span data-span="c2">141</span>'],
            ['August', '<span data-span="c3">175</span>'],
          ],
        },
        {
          id: 'note',
          kind: 'note',
          name: 'Untitled note',
          caption: 'Note on a phone',
          paragraphs: [
            'for the annual review, do not forget',
            '<span data-span="q2">mrs albers</span> <span data-span="q3">from no. 14</span> said on saturday it is <span data-span="q1">on balance, quite good lemonade</span>',
            'nice line?? put it on a slide',
          ],
        },
        {
          id: 'library',
          kind: 'library',
          name: 'Image library · 412 assets',
          caption: 'Asset library',
          assetFile: 'stand-saturday-morning.jpg',
          assetAlt: 'A folding table with a jug of lemonade and a hand-lettered sign',
        },
      ],

      routesLabel: 'Turning it into structure',
      routesLead:
        'This is the step everyone skips over. It can happen three ways, and the point is not which one you pick: it is that all three end up in the same place.',
      routes: [
        {
          id: 'hand',
          label: 'By hand',
          blurb: 'Someone reads the document and fills the fields in the editor.',
          snippet:
            '<span class="c">// the editor writes exactly the same record</span>\n{\n  <span class="k">"type"</span>: <span class="s">"timeline-slide"</span>,\n  <span class="k">"content"</span>: { <span class="k">"items"</span>: [ … ] }\n}',
        },
        {
          id: 'api',
          label: 'Through the API',
          blurb: 'A script or a business system posts the slide. No one retypes a table.',
          snippet:
            '<span class="c">POST /api/presentations/:id/slides</span>\n{\n  <span class="k">"type"</span>: <span class="s">"timeline-slide"</span>,\n  <span class="k">"content"</span>: { <span class="k">"items"</span>: [ … ] }\n}',
        },
        {
          id: 'mcp',
          label: 'Through MCP',
          blurb: 'An agent asks which types exist, then fills one. It has to ask first.',
          snippet:
            '<span class="c">→ get_slide_types()</span>\n<span class="c">←</span> timeline-slide: items[] <span class="c">(date, title, text)</span>\n<span class="c">→ add_slide(</span>{ <span class="k">"type"</span>: <span class="s">"timeline-slide"</span>, … }<span class="c">)</span>',
        },
      ],
      gateText:
        'All three arrive at the same gate: the record is checked against its slide type. What a person may not save, an integration may not save either, and the other way round. <b>That is where the control lives</b> - not in doing it by hand.',

      recordLabel: 'The slide itself',
      typeLabel: 'What it means',
      themeLabel: 'How it looks',
      fieldsLabel: 'The slide as data',
      hint: 'Hover a field to light up the material it came from.',
      types: [
        {
          id: 'timeline-slide',
          label: 'Timeline',
          claim:
            '<b>ordered: true</b> — the sequence is the meaning here, not a layout choice. So it projects to a numbered list for screen readers, and nothing downstream is allowed to reshuffle it.',
          eyebrow: 'Background',
          title: 'Historical development of the Stand',
          items: [
            { date: '2021', title: 'Constituted by resolution' },
            { date: '2022', title: 'First strategic partnership' },
            { date: '2024', title: 'Operations suspended' },
            { date: '2025', title: 'Trading resumed' },
          ],
        },
        {
          id: 'chart-slide',
          label: 'Chart',
          claim:
            '<b>data: csv (required)</b> — the figures live in the record as data, not as a picture of a chart. That is why this field can stay wired to the spreadsheet instead of being copied out of it.',
          eyebrow: 'Volumes',
          title: 'Cups dispensed per month',
          bars: [
            { label: 'June', value: 96 },
            { label: 'July', value: 141 },
            { label: 'August', value: 175 },
          ],
        },
        {
          id: 'quote-slide',
          label: 'Quote',
          claim:
            '<b>authorName is required</b> — an unattributed quote is not a valid slide in this format. The type holds a journalistic norm that otherwise depends on whoever happened to be in a hurry.',
          eyebrow: 'Stakeholder feedback',
          title: '',
          quote: {
            text: 'It is, on balance, quite good lemonade.',
            name: 'Mrs. H. Albers',
            role: 'Resident of number 14, customer since inception',
          },
        },
        {
          id: 'image-slide',
          label: 'Image',
          claim:
            '<b>imageRole: content | decorative</b> — the format asks what the image is <em>for</em>. Call it decorative and screen readers skip it; call it meaningful and it wants alt text. A canvas cannot ask that question, because there an image is only pixels at coordinates.',
          eyebrow: 'Operations',
          title: 'The Stand in operation',
          image: { caption: 'The Stand, Saturday morning.' },
        },
      ],
      themes: [
        { id: 'deckyard', label: 'This one', swatch: '#2d6b4a' },
        { id: 'council', label: 'Public body', swatch: '#1f5fa8' },
        { id: 'editorial', label: 'Editorial', swatch: '#9a3412' },
        { id: 'studio', label: 'Studio', swatch: '#57e0c8' },
      ],
    },

    blogIndex: {
      metaTitle: 'Blog — Deckyard',
      metaDescription:
        'Building Deckyard in the open: notes on open source presentations, digital sovereignty and brand systems for organizations that want to own their work.',
      kicker: 'Building in public',
      title: 'Notes from the yard',
      intro:
        'Progress reports, design decisions and detours while we build an open source presentation platform anyone can run.',
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

    changelog: {
      metaTitle: 'Changelog — Deckyard',
      metaDescription:
        "What's new in Deckyard, release by release: collaboration, editor, exports, themes, self-hosting and security, in plain language.",
      kicker: "What's new",
      title: 'Changelog',
      intro:
        'Every Deckyard release, in plain language. The commit-level detail lives on GitHub; here is what it means for the people using it.',
      latestBadge: 'Latest',
      githubCta: 'Releases on GitHub →',
      dateLocale: 'en-GB',
    },
  },

  nl: {
    htmlLang: 'nl',
    ogLocale: 'nl_NL',
    skipToContent: 'Naar inhoud',

    nav: {
      sandbox: 'Probeer',
      blog: 'Blog',
      changelog: 'Changelog',
      docs: 'Docs',
      github: 'GitHub',
      homeAria: 'Deckyard startpagina',
      badge: 'Beta',
      languageAria: 'Taal',
      menuAria: 'Menu',
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
        'Het open source presentatieplatform dat je zelf draait. Maken, presenteren, publiceren en samenwerken in één tool - on brand, GDPR-proof, geen lock-in. MIT-licentie, code op GitHub.',
      heroKicker: 'Open source · Van begin tot eind · Made in Europe',
      heroTitleMain: 'Presenteren,',
      heroTitleHighlight: 'eindelijk vrij.',
      heroTagline: 'Open source, van begin tot eind, en van jou.',
      heroLead:
        'Deckyard is een open source presentatieplatform voor elke organisatie die haar eigen werk in handen wil houden. Niet zomaar een slidebouwer: maken, presenteren, publiceren en samenwerken in één webtool die draait op infrastructuur die jij beheert. Elke deck ziet eruit alsof je designafdeling hem maakte, en blijft van jou; van eerste opzet tot live publiek.',
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
      sandboxButton: 'Probeer de live sandbox',
      sandboxNote: 'Geen installatie, geen aanmelding: een volledige Deckyard, in je browser.',
      ctaSandboxButton: 'Open de sandbox',
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

    anatomy: {
      kicker: 'Van ruw materiaal naar een slide in je huisstijl',
      title: 'Structuur is waar de controle zit',
      lead: 'Een deck begint als een stapel dingen van overal: een document, een spreadsheet, een notitie op je telefoon, een beeldbibliotheek. Iets moet daar slides van maken. Dat kan met de hand, door een script, of door een agent - maar je wilt het resultaat wel in je huisstijl, en je wilt zeggenschap over hoe die data in je slides landt. Daar zijn slidetypes voor.',

      sourcesLabel: 'Waar je mee begint',
      sourcesNote:
        'Kies hieronder een slidetype en de bron waar het uit put komt naar voren. Ander materiaal, andere slide, dezelfde stapel.',
      sources: [
        {
          id: 'doc',
          kind: 'doc',
          name: 'Limonadekraam-Q3-DEF-v2-nagekeken_door_jantine-ECHTDEF(3).docx',
          caption: 'Tekstverwerker',
          heading: 'Kwartaalrapportage Q3 - Limonadekraam De Zonnezijde',
          paragraphs: [
            '<b data-span="h1">1. Achtergrond.</b> De Kraam is in <span data-span="t1">2021</span> <span data-span="n1">opgericht bij besluit van het huishouden</span>. In <span data-span="t2">2022</span> ging zij haar <span data-span="n2">eerste strategische samenwerking</span> aan, met de naastgelegen taartverkoop. In <span data-span="t3">2024</span> zijn de werkzaamheden <span data-span="n3">opgeschort wegens weersomstandigheden</span>. In <span data-span="t4">2025</span> is de <span data-span="n4">exploitatie hervat onder herzien bestuur</span>.',
            '<b>2. Prestaties.</b> In de verslagperiode zijn 412 bekers verstrekt, een toename van 18 procent ten opzichte van het vergelijkbare kwartaal.',
          ],
        },
        {
          id: 'sheet',
          kind: 'sheet',
          name: 'bekers_Q3_definitief_v4_DEZE_GEBRUIKEN.xlsx',
          caption: 'Spreadsheet',
          rows: [
            ['Maand', '<span data-span="sh">Bekers</span>'],
            ['juni', '<span data-span="c1">96</span>'],
            ['juli', '<span data-span="c2">141</span>'],
            ['augustus', '<span data-span="c3">175</span>'],
          ],
        },
        {
          id: 'note',
          kind: 'note',
          name: 'Naamloze notitie',
          caption: 'Notitie op een telefoon',
          paragraphs: [
            'voor het jaarbericht, niet vergeten',
            '<span data-span="q2">mw albers</span> <span data-span="q3">van nr 14</span> zei zaterdag dat het <span data-span="q1">alles afwegend, best goede limonade</span> is',
            'mooi citaat?? op een slide zetten',
          ],
        },
        {
          id: 'library',
          kind: 'library',
          name: 'Beeldbibliotheek · 412 assets',
          caption: 'Beeldbibliotheek',
          assetFile: 'kraam-zaterdagochtend.jpg',
          assetAlt: 'Een klaptafel met een kan limonade en een met de hand geletterd bord',
        },
      ],

      routesLabel: 'Er structuur van maken',
      routesLead:
        'Dit is de stap waar iedereen overheen leest. Het kan op drie manieren, en het punt is niet welke je kiest: het is dat alle drie op dezelfde plek uitkomen.',
      routes: [
        {
          id: 'hand',
          label: 'Met de hand',
          blurb: 'Iemand leest het document en vult de velden in de editor.',
          snippet:
            '<span class="c">// de editor schrijft precies hetzelfde record</span>\n{\n  <span class="k">"type"</span>: <span class="s">"timeline-slide"</span>,\n  <span class="k">"content"</span>: { <span class="k">"items"</span>: [ … ] }\n}',
        },
        {
          id: 'api',
          label: 'Via de API',
          blurb: 'Een script of bedrijfssysteem stuurt de slide. Niemand tikt een tabel over.',
          snippet:
            '<span class="c">POST /api/presentations/:id/slides</span>\n{\n  <span class="k">"type"</span>: <span class="s">"timeline-slide"</span>,\n  <span class="k">"content"</span>: { <span class="k">"items"</span>: [ … ] }\n}',
        },
        {
          id: 'mcp',
          label: 'Via MCP',
          blurb: 'Een agent vraagt eerst welke types er zijn en vult er daarna één. Vragen moet.',
          snippet:
            '<span class="c">→ get_slide_types()</span>\n<span class="c">←</span> timeline-slide: items[] <span class="c">(date, title, text)</span>\n<span class="c">→ add_slide(</span>{ <span class="k">"type"</span>: <span class="s">"timeline-slide"</span>, … }<span class="c">)</span>',
        },
      ],
      gateText:
        'Alle drie komen ze bij dezelfde poort: het record wordt gecontroleerd tegen zijn slidetype. Wat een mens niet mag opslaan, mag een integratie ook niet, en andersom. <b>Daar zit de controle</b> - niet in het handmatig doen.',

      recordLabel: 'De slide zelf',
      typeLabel: 'Wat het betekent',
      themeLabel: 'Hoe het eruitziet',
      fieldsLabel: 'De slide als data',
      hint: 'Beweeg over een veld om het materiaal op te laten lichten waar het uit komt.',
      types: [
        {
          id: 'timeline-slide',
          label: 'Tijdlijn',
          claim:
            '<b>ordered: true</b> - de volgorde is hier de betekenis, geen opmaakkeuze. Daarom wordt dit voor een screenreader een genummerde lijst, en mag niets verderop de items herschikken.',
          eyebrow: 'Achtergrond',
          title: 'Historische ontwikkeling van de Kraam',
          items: [
            { date: '2021', title: 'Opgericht bij besluit' },
            { date: '2022', title: 'Eerste samenwerking' },
            { date: '2024', title: 'Werkzaamheden opgeschort' },
            { date: '2025', title: 'Exploitatie hervat' },
          ],
        },
        {
          id: 'chart-slide',
          label: 'Grafiek',
          claim:
            '<b>data: csv (required)</b> - de cijfers staan als data in het record, niet als plaatje van een grafiek. Daarom kan dit veld aan de spreadsheet gekoppeld blijven in plaats van eruit gekopieerd te zijn.',
          eyebrow: 'Volumes',
          title: 'Verstrekte bekers per maand',
          bars: [
            { label: 'juni', value: 96 },
            { label: 'juli', value: 141 },
            { label: 'augustus', value: 175 },
          ],
        },
        {
          id: 'quote-slide',
          label: 'Citaat',
          claim:
            '<b>authorName is required</b> - een citaat zonder bronvermelding is in dit formaat geen geldige slide. Het type houdt een journalistieke norm vast die anders afhangt van wie er toevallig haast had.',
          eyebrow: 'Terugkoppeling belanghebbenden',
          title: '',
          quote: {
            text: 'Het is, alles afwegend, best goede limonade.',
            name: 'Mevrouw H. Albers',
            role: 'Woonachtig op nummer 14, klant sinds de oprichting',
          },
        },
        {
          id: 'image-slide',
          label: 'Beeld',
          claim:
            '<b>imageRole: content | decorative</b> - het formaat vraagt waar het beeld <em>voor</em> is. Noem het decoratief en screenreaders slaan het over; noem het betekenisvol en het vraagt om alt-tekst. Een canvas kan die vraag niet stellen, want daar is een afbeelding alleen pixels op een coördinaat.',
          eyebrow: 'Bedrijfsvoering',
          title: 'De Kraam in bedrijf',
          image: { caption: 'De Kraam, zaterdagochtend.' },
        },
      ],
      themes: [
        { id: 'deckyard', label: 'Deze', swatch: '#2d6b4a' },
        { id: 'council', label: 'Publieke instelling', swatch: '#1f5fa8' },
        { id: 'editorial', label: 'Redactie', swatch: '#9a3412' },
        { id: 'studio', label: 'Studio', swatch: '#57e0c8' },
      ],
    },

    blogIndex: {
      metaTitle: 'Blog - Deckyard',
      metaDescription:
        'Deckyard bouwen in de openbaarheid: aantekeningen over open source presentaties, digitale soevereiniteit en merksystemen voor organisaties die hun eigen werk in handen willen houden.',
      kicker: 'Bouwen in de openbaarheid',
      title: 'Aantekeningen van de werf',
      intro:
        'Voortgang, ontwerpkeuzes en zijsporen terwijl we een open source presentatieplatform bouwen dat iedereen zelf kan draaien.',
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

    changelog: {
      metaTitle: 'Changelog - Deckyard',
      metaDescription:
        'Wat er nieuw is in Deckyard, release voor release: samenwerken, editor, exports, thema’s, self-hosting en beveiliging, in gewone taal.',
      kicker: 'Wat er nieuw is',
      title: 'Changelog',
      intro:
        'Elke release van Deckyard, in gewone taal. De details op commit-niveau staan op GitHub; hier lees je wat het betekent voor wie ermee werkt.',
      latestBadge: 'Nieuwste',
      githubCta: 'Releases op GitHub →',
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
