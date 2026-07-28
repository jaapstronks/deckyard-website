import type { FeaturesContent } from '@/i18n/types';

export const features: FeaturesContent = {
  metaTitle: 'Features - everything Deckyard already does',
  metaDescription:
    'The full inventory: slide types, themes, AI on your own key, collaboration, live audiences, publishing and export. Grouped by the moment you need it, with the documentation one link away.',
  heroKicker: 'The full inventory',
  heroTitle: 'Everything that is already in there',
  heroIntro:
    'The rest of this site makes one argument at a time. This page is the list: what Deckyard does today, grouped by the moment you need it, with the documentation one link away.',

  groups: [
    {
      id: 'making',
      label: 'Making a deck',
      title: 'You pick a type and fill in the fields',
      body: 'There is no canvas and no text box to place. Every slide is a declared type with named fields, so the design was decided once, in the theme, and never again per slide.',
      teaser: 'Declared types, named fields, and a library of what you already made.',
      moreLabel: 'Editing docs',
      items: [
        {
          title: '{count} declared slide types',
          body: 'A timeline, a matrix, a funnel, a quote, a chart. You choose the one you mean instead of drawing it.',
        },
        {
          title: 'The editor is a form',
          body: 'Title, subheading, byline, the items in the list. Fields with names, next to a preview that updates while you type.',
        },
        {
          title: 'A slide library',
          body: 'Save a slide you will need again, for yourself or for the team, and drop it into the next deck.',
        },
        {
          title: 'An image library',
          body: 'Uploads land in one searchable place instead of inside whichever deck happened to be open.',
        },
        {
          title: 'One deck, several languages',
          body: 'A deck carries its languages side by side and the viewer switches between them, rather than being copied and diverging.',
        },
      ],
    },
    {
      id: 'brand',
      label: 'Your brand',
      title: 'The house style is a file, not a habit',
      body: 'Colours, fonts, logos and layout rules are a theme: one JSON file, versioned like anything else. Nobody applies it, because there is no unstyled state to forget.',
      teaser: 'Colours, fonts and logos as one versioned file, applied by default.',
      moreLabel: 'Theme docs',
      items: [
        {
          title: 'A theme is JSON',
          body: 'Readable, diffable and reviewable. A brand change is a pull request rather than a new template nobody downloads.',
        },
        {
          title: 'On brand by default',
          body: 'A deck renders in the theme it was given. There is nothing to apply afterwards and nothing to forget.',
        },
        {
          title: 'Rebrand centrally',
          body: 'Change the theme and every deck using it follows, including the ones that are already published.',
        },
        {
          title: 'Your own licensed fonts',
          body: 'Upload the files once. Exports carry them inline instead of fetching them from somebody else’s font CDN.',
        },
        {
          title: 'A fork keeps its own',
          body: 'Custom themes live beside the shipped ones and take precedence, so a house style is never a patch to the core.',
        },
      ],
    },
    {
      id: 'ai',
      label: 'AI',
      title: 'On your key, inside the shape',
      body: 'AI is switched on by you, paid for by you, and confined to filling in fields that already have a declared shape. There is no model in the middle you did not pick.',
      teaser: 'Your provider, your key, and fields it cannot design its way out of.',
      moreLabel: 'AI docs',
      items: [
        {
          title: 'Bring your own key',
          body: 'You choose the provider and pay them directly. Turn it off entirely and the rest of the platform is unaffected.',
        },
        {
          title: 'It fills in, it does not design',
          body: 'A model asks which types exist and completes one of them. There is no layout for it to invent.',
        },
        {
          title: 'A draft from your notes',
          body: 'Paste what you have and it comes back as typed slides, which you then correct field by field.',
        },
        {
          title: 'Alt text and translation',
          body: 'The two jobs that never get done by hand, offered per slide rather than as a batch nobody reviews.',
        },
        {
          title: 'Drive it from your own tools',
          body: 'An MCP server exposes the same operations, so an agent you already run can write into Deckyard.',
        },
      ],
    },
    {
      id: 'together',
      label: 'Working together',
      title: 'More than one person, without a merge conflict',
      body: 'Decks are usually written by a few people under time pressure. That means real permissions, comments where the slide is, and a way back to what it said yesterday.',
      teaser: 'Permissions per person, comments on the slide, and a way back.',
      moreLabel: 'Collaboration docs',
      items: [
        {
          title: 'Permissions per person',
          body: 'View, comment or edit, decided per deck, rather than one link that hands over everything at once.',
        },
        {
          title: 'Comments on the slide',
          body: 'Reply, resolve and delete, beside the live preview instead of in a separate thread that loses its subject.',
        },
        {
          title: 'Editing at the same time',
          body: 'Two people in one deck without overwriting each other, and without anybody having to announce it first.',
        },
        {
          title: 'Version history',
          body: 'Every save is a version you can read and restore, so “put back what it said this morning” is a click.',
        },
        {
          title: 'Activity and mentions',
          body: 'A notification when somebody changes or mentions something you own, instead of finding out during the meeting.',
        },
      ],
    },
    {
      id: 'room',
      label: 'In the room',
      title: 'The audience answers on the slide itself',
      body: 'A question to the room is a slide type like any other, so the answers are part of the deck rather than a second tool you also had to open.',
      teaser: 'Polls, Q&A and a phone in every hand, without a second tool.',
      moreLabel: 'Presenter docs',
      items: [
        {
          title: 'Polls and scales',
          body: 'Multiple choice, multi-select, rating and Likert, answered from the room while the slide is on the wall.',
        },
        {
          title: 'Moderated Q&A',
          body: 'Questions arrive in a queue you decide to show. Nothing reaches the screen because somebody typed it.',
        },
        {
          title: 'Feedback and lead capture',
          body: 'Ask for a reaction or an address on the slide, and keep the answers with the deck they belong to.',
        },
        {
          title: 'Presenter view',
          body: 'Notes, the next slide, a timer, per-slide pacing and a highlighter, in a second window your audience never sees.',
        },
        {
          title: 'Follow along on a phone',
          body: 'A code puts the deck in the room’s own hands, in their language, with the question box attached.',
        },
        {
          title: 'Per-slide analytics',
          body: 'Afterwards: which slide people stayed on, and which one they actually answered.',
        },
      ],
    },
    {
      id: 'out',
      label: 'Getting it out again',
      title: 'Six exits, none of them a request',
      body: 'A deck leaves in the shape you need it: a link, an embed, a single file, or a document for a tool that is not this one. All of it at any moment, without asking anyone.',
      teaser: 'A link, an embed, a single HTML file, PDF, PowerPoint or JSON.',
      moreLabel: 'Publishing docs',
      items: [
        {
          title: 'Publish with a link',
          body: 'One click, a readable URL you can edit afterwards, and a share image generated for it.',
        },
        {
          title: 'Private links with rules',
          body: 'Password, expiry date, e-mail verification, view or edit. Set per link, so revoking one does not revoke the deck.',
        },
        {
          title: 'Embed in your own page',
          body: 'The SDK resolves a published deck against your instance, and the polls and Q&A keep working inside the frame.',
        },
        {
          title: 'One self-contained HTML file',
          body: 'Fonts, images and the viewer inlined. It runs from any static host, or from a file on a stick.',
        },
        {
          title: 'PDF, PowerPoint, PNG, JSON',
          body: 'Four document formats out, including the JSON the deck was already stored as.',
        },
        {
          title: 'Feeds and share images',
          body: 'A published deck brings its own preview image, and a set of them can be an RSS feed.',
        },
      ],
    },
  ],

  runTitle: 'And you are the one running it',
  runBody:
    'One Docker Compose file, Node and Postgres. On your own servers under your own rules, or on an instance we run for you.',
  runHosting: 'Read about hosting',
  runDocs: 'Install it yourself',
};
