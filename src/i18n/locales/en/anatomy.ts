import type { AnatomyContent } from '@/i18n/types';

export const anatomy: AnatomyContent = {
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
        stored:
          '<span class="k">"data"</span>: <span class="s">"… August,175\\nSeptember,188"</span>',
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
};
