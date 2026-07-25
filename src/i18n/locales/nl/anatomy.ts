import type { AnatomyContent } from '@/i18n/types';

export const anatomy: AnatomyContent = {
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
        stored:
          '<span class="k">"data"</span>: <span class="s">"… augustus,175\\nseptember,188"</span>',
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
};
