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

  // The dedicated explainer page that wraps the anatomy component in prose,
  // plus the homepage teaser that links to it.
  structured: {
    metaTitle: string;
    metaDescription: string;
    kicker: string;
    title: string;
    dek: string;
    stats: { value: string; label: string }[];
    s1Title: string;
    s1Body: string[];
    s2Title: string;
    s2Body: string[];
    pull: string;
    s3Title: string;
    s3Body: string[];
    chainTitle: string;
    chainLead: string;
    chain: { because: string; claim: string; body: string }[];
    compareTitle: string;
    compareLead: string;
    compareAspect: string;
    compareCanvas: string;
    compareRecord: string;
    compareRows: { aspect: string; canvas: string; record: string }[];
    ctaTitle: string;
    ctaBody: string;
    ctaSandbox: string;
    ctaDocs: string;
    // Homepage teaser that links here. The illustration is one annotated
    // slide - its content is borrowed from `anatomy.types` so the teaser shows
    // literally the slide you meet again on the explainer page.
    teaserKicker: string;
    teaserTitle: string;
    teaserBody: string;
    teaserCta: string;
    teaserFoot: string;
  };

  // "How raw material becomes an on-brand slide". Three zones: the pile of
  // stuff you start with, the three routes that structure it, and the slide
  // itself with its two independent controls (type and house style).
  //
  // The running example is a deliberately absurd one - a lemonade stand
  // reported on in stiff corporate register - so nobody mistakes the demo
  // content for a claim about Deckyard.
  anatomy: {
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
    //
    // Every route has the same three-part shape: on the left the world of
    // whoever is acting, on the right the mechanism they reach for, and below
    // both the slide that comes out of it, with the element this route just
    // added marked and animated in.
    //
    // The routes deliberately do NOT all produce the same slide. A scheduled
    // job appending last month's figure is a chart, not a timeline; pretending
    // otherwise to make the JSON match would be a nicer diagram about a product
    // that does not exist.
    routes: {
      id: string;
      label: string;
      blurb: string;
      leftLabel: string;
      rightLabel: string;
      // left column - exactly one of these
      picker?: { title: string; options: string[]; chosen: number }; // hand
      // api: an automation somebody assembled in a no-code tool. Steps run top
      // to bottom; `data` is what actually passed through on the last run, set
      // in mono on a tint so it reads as moved data rather than as label text.
      flow?: {
        name: string;
        status: string;
        steps: {
          kind: string; // trigger / tool call / only if / action
          name: string;
          detail?: string;
          data?: string; // HTML with .k/.s spans
          branch?: string; // the leg the flow takes when the condition fails
        }[];
      };
      chat?: { who: string; text: string; self?: boolean }[]; // mcp
      // right column - exactly one of these
      form?: { title: string; fields: { key: string; value: string }[]; more: string }; // hand
      sent?: { barLabel: string; code: string; okLabel: string }; // api; code is HTML with .k/.s/.c spans
      wire?: { dir: string; text: string }[]; // mcp; text may contain <b>
      // what comes out: which demo slide to render, which element is new, and
      // the record fragment that element is stored as
      result: {
        kind: 'timeline' | 'chart';
        label: string;
        fresh: number;
        extraBar?: { label: string; value: number };
        storedLabel: string;
        stored: string; // HTML with .k/.s spans
        note: string; // may contain <b>
      };
    }[];
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

    structured: {
      metaTitle: 'How it works — structured slides, not drawings — Deckyard',
      metaDescription:
        'A Deckyard slide is a record with a type, not a canvas you drop shapes onto. That one decision is where the accessibility, the integrations and the house style all come from.',
      kicker: 'How it works',
      title: 'A slide that knows what it is',
      dek: 'Most tools treat a slide as a canvas: a rectangle you drop boxes onto, wherever they look right. Deckyard treats it as a record with a type. It sounds like a technical detail. It is the reason everything else on this site is possible.',
      stats: [
        { value: '38', label: 'slide types, each with its own fields' },
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
        'The sandbox is a full Deckyard in your browser, with no install and no account. Make a timeline, switch the theme, look at what you built.',
      ctaSandbox: 'Try the live sandbox',
      ctaDocs: 'Read the slide type reference',

      teaserKicker: 'The idea underneath',
      teaserTitle: 'Every slide knows what it is',
      teaserBody:
        'A Deckyard slide is not a canvas with boxes on it. It is a record with a type: a timeline knows it holds a sequence, a quote knows it needs attribution, and neither of them carries a single colour. That is where the accessibility, the integrations and the unbreakable house style all come from.',
      teaserCta: 'How it works',
      teaserFoot: 'Two fields, and not one colour',
    },

    anatomy: {
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
        'This is the step everyone skips over. It can happen three ways, and the point is not which one you pick: it is that all three end up with a slide that is stored as data, and all three are checked against the same slide type.',
      routes: [
        {
          id: 'hand',
          label: 'By hand',
          blurb: 'Someone picks a type and fills it in, on the slide or in the fields.',
          leftLabel: 'Pick a type',
          rightLabel: 'Fill in the moment',
          picker: {
            title: 'New slide',
            options: ['Title', 'Timeline', 'Chart', 'Quote', 'Image'],
            chosen: 1,
          },
          form: {
            title: 'Timeline · moment 4 of 4',
            fields: [
              { key: 'date', value: '2025' },
              { key: 'title', value: 'Trading resumed' },
              { key: 'text', value: 'Under revised governance.' },
            ],
            more: '+ add moment',
          },
          result: {
            kind: 'timeline',
            label: 'And this is the slide',
            fresh: 3,
            storedLabel: 'Stored as',
            stored:
              '{ <span class="k">"date"</span>: <span class="s">"2025"</span>, <span class="k">"title"</span>: <span class="s">"Trading resumed"</span> }',
            note: 'You can type that moment straight onto the slide or into the fields, whichever you prefer. The difference with a drawing tool is not where you type: it is what is kept. A drawing tool keeps a text box that happens to read 2025. This keeps a moment that <b>has</b> a date. And because the type knows how a timeline should look, it is laid out for you.',
          },
        },
        {
          id: 'api',
          label: 'Through the API',
          blurb: 'A system keeps a slide up to date. Nobody retypes last month.',
          leftLabel: 'The automation somebody built',
          rightLabel: 'What it sent last time',
          flow: {
            name: 'Monthly figures → team library',
            status: 'Last run · 1 September, 06:00 · ok',
            steps: [
              {
                kind: 'Trigger',
                name: 'Every first Monday, 06:00',
                data: '<span class="k">"firedAt"</span>: <span class="s">"2025-09-01T06:00"</span>',
              },
              {
                kind: 'Tool call',
                name: 'Figures register · get last month',
                data: '{ <span class="k">"month"</span>: <span class="s">"September"</span>, <span class="k">"cups"</span>: 188 }',
              },
              {
                kind: 'Only if',
                name: 'That month is not on the slide yet',
                branch: 'otherwise · stop, nothing to update',
              },
              {
                kind: 'Action',
                name: 'Deckyard · update the slide in the team library',
                detail: 'The request it sends is on the right.',
              },
            ],
          },
          sent: {
            barLabel: 'Request · 1 September, 06:00',
            code: '<span class="c">PUT /api/v1/presentations/{id}/slides/{slideId}</span>\n{\n  <span class="k">"type"</span>: <span class="s">"chart-slide"</span>,\n  <span class="k">"content"</span>: {\n    <span class="k">"chartType"</span>: <span class="s">"bar"</span>,\n    <span class="k">"data"</span>: <span class="s">"month,cups\\n…\\nAugust,175\\nSeptember,188"</span>\n  }\n}',
            okLabel: '200 OK · slide updated, four months on the chart',
          },
          result: {
            kind: 'chart',
            label: 'And this is the slide',
            fresh: 3,
            extraBar: { label: 'September', value: 188 },
            storedLabel: 'Stored as',
            stored: '<span class="k">"data"</span>: <span class="s">"… August,175\\nSeptember,188"</span>',
            note: 'The figures are a column in the record, so an automation can append a month to them. The slide sits in the team library, which means the next deck that pulls it in already has last month in it. And the write goes through the same validation a person does: <b>a chart the editor would refuse, the API refuses too.</b>',
          },
        },
        {
          id: 'mcp',
          label: 'Through MCP',
          blurb: 'An agent has to ask which types exist before it can fill one in.',
          leftLabel: 'What the person asks',
          rightLabel: 'What the agent has to ask first',
          chat: [
            {
              who: 'You',
              self: true,
              text: 'Put this on a slide: 2021 constituted, 2022 partnership with the bake sale, 2024 suspended, 2025 resumed.',
            },
            {
              who: 'Assistant',
              text: 'Added a timeline slide with those four moments, in that order.',
            },
          ],
          wire: [
            { dir: '→', text: 'get_slide_types()' },
            {
              dir: '←',
              text: '<b>timeline-slide</b> - for a sequence of moments. items[] of (date, title, text), 2 to 10, order carries meaning.',
            },
            { dir: '→', text: 'add_slide({ type: "timeline-slide", … })' },
          ],
          result: {
            kind: 'timeline',
            label: 'And this is the slide',
            fresh: 3,
            storedLabel: 'Stored as',
            stored:
              '{ <span class="k">"date"</span>: <span class="s">"2025"</span>, <span class="k">"title"</span>: <span class="s">"Trading resumed"</span> }',
            note: 'The agent cannot invent a layout, because there is no layout to invent. It asks what exists, gets told what a timeline needs, and fills that in. <b>The result is on style before anyone has looked at it.</b>',
          },
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

    structured: {
      metaTitle: 'Hoe het werkt - gestructureerde slides, geen tekeningen - Deckyard',
      metaDescription:
        'Een slide in Deckyard is een record met een type, geen canvas waar je vormen op sleept. Uit die ene keuze komen de toegankelijkheid, de koppelingen en de huisstijl voort.',
      kicker: 'Hoe het werkt',
      title: 'Een slide die weet wat hij is',
      dek: 'De meeste programma’s behandelen een slide als een canvas: een rechthoek waar je vakjes op legt, daar waar het goed uitkomt. Deckyard behandelt hem als een record met een type. Het klinkt als een technisch detail. Het is de reden dat al het andere op deze site kan bestaan.',
      stats: [
        { value: '38', label: 'slidetypes, elk met eigen velden' },
        { value: '1', label: 'gepubliceerd schema, uit de code gegenereerd' },
        { value: '0', label: 'kleuren of lettertypen in je inhoud' },
      ],

      s1Title: 'Waar een deck echt begint',
      s1Body: [
        'Niemand begint een presentatie in een presentatieprogramma. Je begint met een rapport dat iemand anders schreef, een spreadsheet met de echte cijfers, een notitie op je telefoon van een gesprek van dinsdag, en een map foto’s die niemand fatsoenlijk heeft benoemd.',
        'Dat is het ruwe materiaal, en het heeft drie vervelende eigenschappen: het ligt op vier plekken, het staat in vier formaten, en de interessante delen zitten verstopt in zinnen. Elk deck begint ermee dat iemand dat er stilletjes uit zit te halen.',
      ],

      s2Title: 'Iemand moet daar slides van maken',
      s2Body: [
        'Van oudsher ben jij die iemand, om elf uur ’s avonds, cijfers overtikkend uit een spreadsheet in tekstvakken. Die cijfers staan nu op twee plekken, en één ervan begon te verouderen op het moment dat je plakte.',
        'Het alternatief is niet "laat een robot het doen". Het is dat de slide een vastgelegde vorm heeft, zodat alles wat hem vult - jij, een script, een agent - eerst tegen die vorm gecontroleerd wordt.',
      ],

      pull: 'Controle komt niet voort uit het handmatig doen. Die komt uit het type.',

      s3Title: 'Wat een slidetype precies is',
      s3Body: [
        'Een slidetype is een klein, uitgesproken contract. Een tijdlijn verklaart dat hij een reeks momenten bevat, elk met een datum en een titel, minstens twee en hoogstens tien, en dat de volgorde betekenis draagt. Een citaat verklaart dat het iemand nodig heeft om aan toe te schrijven, en weigert zonder.',
        'In geen van die verklaringen komt een kleur, een lettertype of een positie voor. Dat is de tweede helft van het idee: de inhoud draagt de betekenis, het thema draagt het uiterlijk, en die twee raken elkaar nooit. Daarom kan dezelfde slide kloppen voor een gemeente én voor een designstudio, zonder dat er één woord verandert.',
      ],

      chainTitle: 'Wat daaruit volgt',
      chainLead:
        'Het bruikbare aan deze keuze is niet dat hij elegant is. Het is dat vier losse beloftes dezelfde belofte blijken te zijn, vier keer uitgesproken.',
      chain: [
        {
          because: 'Omdat de velden een type hebben',
          claim: 'kan een slide fatsoenlijk worden voorgelezen.',
          body: 'Een tijdlijn wordt een genummerde lijst, een tabel houdt zijn koprij, een afbeelding zegt of hij decoratief of betekenisvol is. Toegankelijkheid is geen lijstje meer dat iemand achteraf afvinkt, maar een eigenschap van het formaat.',
        },
        {
          because: 'Omdat de velden een type hebben',
          claim: 'kan alles ze vullen.',
          body: 'Een veld met een vastgelegde vorm is een aansluiting. Je datawarehouse, je beeldbibliotheek, een script of een agent kunnen hem vullen, en ze worden allemaal op dezelfde manier gecontroleerd. Niemand tikt een tabel over, en het cijfer op de slide klopt met het cijfer bij de bron.',
        },
        {
          because: 'Omdat de vormgeving elders woont',
          claim: 'bezit de organisatie het uiterlijk.',
          body: 'De huisstijl zit in themetokens, niet in het deck. Een deck kan niet off-brand raken, want hij draagt geen huisstijl bij zich. Zet de achtergrond en het logo vast en zelfs een oud deck rendert binnen de huidige stijl.',
        },
        {
          because: 'Omdat het allemaal één schema is',
          claim: 'overleeft het formaat de applicatie.',
          body: 'Het JSON Schema wordt gegenereerd uit dezelfde velddefinities die de editor en de validatie lezen, dus het kán niet afdrijven van de implementatie. Iemand anders kan een lezer, een converter of een renderer bouwen zonder het ons te vragen. Dát betekent open hier.',
        },
      ],

      compareTitle: 'Hetzelfde deck, twee manieren om het te bewaren',
      compareLead:
        'Dit is geen betoog dat canvassen slecht gemaakt zijn. Het is dat een tekening geen vragen over zichzelf kan beantwoorden, en een record wel.',
      compareAspect: '',
      compareCanvas: 'Slide als canvas',
      compareRecord: 'Slide als record',
      compareRows: [
        {
          aspect: 'Wat een slide is',
          canvas: 'Vormen op coördinaten',
          record: 'Benoemde velden met een type',
        },
        {
          aspect: 'Voorgelezen door een screenreader',
          canvas: 'Gokwerk, op tekenvolgorde',
          record: 'Echte koppen, lijsten en tabellen',
        },
        {
          aspect: 'Geopend op een telefoon',
          canvas: 'Krimpt tot het onleesbaar is',
          record: 'Herschikt als document',
        },
        {
          aspect: 'Gevuld vanuit een ander systeem',
          canvas: 'Zet een tekstvak neer en hoop',
          record: 'Vul de velden, word gevalideerd',
        },
        {
          aspect: 'Huisstijl wijzigen',
          canvas: 'Elke slide met de hand opnieuw',
          record: 'Wissel het thema, inhoud blijft',
        },
        {
          aspect: 'Over tien jaar',
          canvas: 'Hopen dat het programma hem nog opent',
          record: 'Gedocumenteerde JSON tegen een publiek schema',
        },
      ],

      ctaTitle: 'Makkelijker te zien dan te lezen',
      ctaBody:
        'De sandbox is een volledige Deckyard in je browser, zonder installatie en zonder account. Maak een tijdlijn, wissel het thema, kijk wat je gebouwd hebt.',
      ctaSandbox: 'Probeer de sandbox',
      ctaDocs: 'Lees de slidetype-referentie',

      teaserKicker: 'Het idee eronder',
      teaserTitle: 'Elke slide weet wat hij is',
      teaserBody:
        'Een Deckyard-slide is geen canvas met vakjes erop. Het is een record met een type: een tijdlijn weet dat hij een reeks bevat, een citaat weet dat het bronvermelding nodig heeft, en geen van beide draagt ook maar één kleur bij zich. Daar komen de toegankelijkheid, de koppelingen en de onbreekbare huisstijl allemaal uit voort.',
      teaserCta: 'Hoe het werkt',
      teaserFoot: 'Twee velden, en geen enkele kleur',
    },

    anatomy: {
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
        'Dit is de stap waar iedereen overheen leest. Het kan op drie manieren, en het punt is niet welke je kiest: het is dat er in alle drie de gevallen een slide uitkomt die als data is opgeslagen, en dat alle drie tegen hetzelfde slidetype worden gecontroleerd.',
      routes: [
        {
          id: 'hand',
          label: 'Met de hand',
          blurb: 'Iemand kiest een type en vult het in, op de slide of in de velden.',
          leftLabel: 'Kies een type',
          rightLabel: 'Vul het moment in',
          picker: {
            title: 'Nieuwe slide',
            options: ['Titel', 'Tijdlijn', 'Grafiek', 'Citaat', 'Beeld'],
            chosen: 1,
          },
          form: {
            title: 'Tijdlijn · moment 4 van 4',
            fields: [
              { key: 'date', value: '2025' },
              { key: 'title', value: 'Exploitatie hervat' },
              { key: 'text', value: 'Onder herzien bestuur.' },
            ],
            more: '+ moment toevoegen',
          },
          result: {
            kind: 'timeline',
            label: 'En dit is de slide',
            fresh: 3,
            storedLabel: 'Opgeslagen als',
            stored:
              '{ <span class="k">"date"</span>: <span class="s">"2025"</span>, <span class="k">"title"</span>: <span class="s">"Exploitatie hervat"</span> }',
            note: 'Je kunt dat moment gewoon op de slide intikken of in de velden, net wat je prettiger vindt. Het verschil met een tekenprogramma zit niet in waar je typt, maar in wat er bewaard blijft. Een tekenprogramma bewaart een tekstvak waar toevallig 2025 in staat. Dit bewaart een moment dat een datum <b>heeft</b>. En omdat het type weet hoe een tijdlijn eruit hoort te zien, is de opmaak al voor je gedaan.',
          },
        },
        {
          id: 'api',
          label: 'Via de API',
          blurb: 'Een systeem houdt een slide bij. Niemand tikt vorige maand over.',
          leftLabel: 'De automatisering die iemand bouwde',
          rightLabel: 'Wat het de vorige keer stuurde',
          flow: {
            name: 'Maandcijfers → teambibliotheek',
            status: 'Laatste run · 1 september, 06:00 · ok',
            steps: [
              {
                kind: 'Trigger',
                name: 'Elke eerste maandag, 06:00',
                data: '<span class="k">"firedAt"</span>: <span class="s">"2025-09-01T06:00"</span>',
              },
              {
                kind: 'Tool call',
                name: 'Cijferregister · haal vorige maand op',
                data: '{ <span class="k">"maand"</span>: <span class="s">"september"</span>, <span class="k">"bekers"</span>: 188 }',
              },
              {
                kind: 'Alleen als',
                name: 'Die maand nog niet op de slide staat',
                branch: 'anders · stoppen, niets bij te werken',
              },
              {
                kind: 'Actie',
                name: 'Deckyard · slide in de teambibliotheek bijwerken',
                detail: 'Het verzoek dat hij stuurt staat hiernaast.',
              },
            ],
          },
          sent: {
            barLabel: 'Verzoek · 1 september, 06:00',
            code: '<span class="c">PUT /api/v1/presentations/{id}/slides/{slideId}</span>\n{\n  <span class="k">"type"</span>: <span class="s">"chart-slide"</span>,\n  <span class="k">"content"</span>: {\n    <span class="k">"chartType"</span>: <span class="s">"bar"</span>,\n    <span class="k">"data"</span>: <span class="s">"maand,bekers\\n…\\naugustus,175\\nseptember,188"</span>\n  }\n}',
            okLabel: '200 OK · slide bijgewerkt, vier maanden op de grafiek',
          },
          result: {
            kind: 'chart',
            label: 'En dit is de slide',
            fresh: 3,
            extraBar: { label: 'september', value: 188 },
            storedLabel: 'Opgeslagen als',
            stored: '<span class="k">"data"</span>: <span class="s">"… augustus,175\\nseptember,188"</span>',
            note: 'De cijfers zijn een kolom in het record, dus een automatisering kan er een maand aan toevoegen. De slide staat in de teambibliotheek, dus de volgende presentatie die hem ophaalt heeft vorige maand er al in staan. En die schrijfactie gaat door dezelfde validatie als die van een mens: <b>een grafiek die de editor weigert, weigert de API ook.</b>',
          },
        },
        {
          id: 'mcp',
          label: 'Via MCP',
          blurb: 'Een agent moet eerst vragen welke types er zijn voordat hij er één kan vullen.',
          leftLabel: 'Wat de mens vraagt',
          rightLabel: 'Wat de agent eerst moet vragen',
          chat: [
            {
              who: 'Jij',
              self: true,
              text: 'Zet dit op een slide: 2021 opgericht, 2022 samenwerking met de taartverkoop, 2024 opgeschort, 2025 hervat.',
            },
            {
              who: 'Assistent',
              text: 'Een tijdlijnslide toegevoegd met die vier momenten, in die volgorde.',
            },
          ],
          wire: [
            { dir: '→', text: 'get_slide_types()' },
            {
              dir: '←',
              text: '<b>timeline-slide</b> - voor een reeks momenten. items[] van (date, title, text), 2 tot 10, de volgorde draagt betekenis.',
            },
            { dir: '→', text: 'add_slide({ type: "timeline-slide", … })' },
          ],
          result: {
            kind: 'timeline',
            label: 'En dit is de slide',
            fresh: 3,
            storedLabel: 'Opgeslagen als',
            stored:
              '{ <span class="k">"date"</span>: <span class="s">"2025"</span>, <span class="k">"title"</span>: <span class="s">"Exploitatie hervat"</span> }',
            note: 'De agent kan geen opmaak verzinnen, want er valt geen opmaak te verzinnen. Hij vraagt wat er bestaat, krijgt te horen wat een tijdlijn nodig heeft, en vult dat in. <b>Het resultaat staat in de huisstijl voordat iemand ernaar gekeken heeft.</b>',
          },
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
