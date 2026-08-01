import type { CompareContent } from '@/i18n/types';

export const compare: CompareContent = {
  metaTitle: 'Deckyard vergeleken met PowerPoint, Google Slides, Canva en Gamma - Deckyard',
  metaDescription:
    'Een eerlijke vergelijking: wat PowerPoint, Google Slides, Canva, Gamma en Deckyard elk goed doen, en wat elk van ze je kost. Inclusief de gevallen waarin Deckyard het verkeerde antwoord is.',
  heroKicker: 'Vergeleken',
  heroTitle: 'Wat je erbij krijgt, en wat je opgeeft',
  heroIntro:
    'Bijna iedereen die hier terechtkomt maakt zijn decks nu in PowerPoint, Google Slides, Canva of Gamma. Deze pagina zegt daarom plat waar elk van die vier goed in is, wat het je kost, en wanneer Deckyard het verkeerde antwoord is. Een vergelijking die wij op elke rij winnen zegt namelijk niets.',
  cardIntro:
    'Waar PowerPoint, Google Slides, Canva en Gamma goed in zijn, wat ze je kosten, en wanneer Deckyard het verkeerde antwoord is.',

  tableTitle: 'Vijf manieren om een deck te maken',
  tableLead:
    'Twee kolommen per tool, want dit zijn afwegingen en geen ranglijst. Deckyard staat in dezelfde tabel op dezelfde voorwaarden, en die tweede kolom is bij ons niet leeg. De sectie eronder neemt ze een voor een uitgebreider.',
  colTool: 'Tool',
  colStrength: 'Wat het goed doet',
  colGiveUp: 'Wat je opgeeft',
  alternatives: [
    {
      id: 'powerpoint',
      name: 'PowerPoint',
      strength: 'Zit al in de licentie, staat al op elke laptop, en niemand hoeft een cursus.',
      giveUp:
        'Layouts en placeholders bestaan, maar niets houdt je tegen om ernaast te tekenen en niets controleert of je dat deed.',
      body: [
        'PowerPoint is het eerlijke uitgangspunt: het is al betaald, het staat er al, en niemand hoeft een cursus. Elk argument voor iets anders moet opwegen tegen de prijs van níet gebruiken wat iedereen al heeft.',
        'Wat het niet kan, is binden. Slide masters, layouts en placeholders bestaan echt, en een placeholder is iets wat assistieve technologie goed voorleest. Wat ontbreekt is iets wat ze afdwingt: je kunt altijd een vorm naast de placeholder tekenen, en voor een screenreader is die vorm geen kop. De toegankelijkheidscontrole meldt het achteraf, en dat is iets anders dan een formaat waarin het niet mis kón gaan. Hetzelfde gat zie je verderop, waar een deck uit je eigen data een bestand is dat je script in elkaar zet, zonder iets om het aan te toetsen.',
      ],
    },
    {
      id: 'google-slides',
      name: 'Google Slides',
      strength:
        'Zit al in Workspace, werkt standaard realtime, en is te scripten zonder eigen infrastructuur.',
      giveUp:
        'Gehost bij Google, en een slide blijft een tekening, dus een merge vult tekstvakken in plaats van velden.',
      body: [
        'Google Slides is degene die veel mensen gebruiken zonder hem ooit gekozen te hebben: hij komt mee met Workspace, opent in een browser op elke machine, en echte realtime samenwerking met versiegeschiedenis werkt er langer dan waar ook. Er is bovendien een serieuze API. Een batch-update die tekst vervangt in een gekopieerd deck is een werkende template-merge, en met Apps Script is dat bereikbaar voor iemand zonder enige infrastructuur.',
        'De twee dingen die het niet biedt, zijn precies de twee waar deze tabel over gaat. Er is geen versie die je zelf draait, dus waar je materiaal verwerkt wordt is het antwoord van Google en niet van jou. En een slide is nog steeds vormen op coördinaten: de merge kent de betekenis van je velden niet, neemt de opmaak over van het eerste karakter dat hij vervangt, en gaat slecht om met tekst die langer is dan de placeholder waar hij in landt. Het is het model van PowerPoint met veel betere samenwerking, niet een ander model.',
      ],
    },
    {
      id: 'canva',
      name: 'Canva',
      strength: 'Een enorme templatebibliotheek en een echt snelle route naar iets wat mooi is.',
      giveUp:
        'Afgerekend per persoon, en je exporteert een kopie die je elders verder bewerkt, nooit het origineel.',
      body: [
        'Canva loste het probleem op dat PowerPoint liet liggen: een mooi deck werd bereikbaar voor iemand die geen ontwerper is, en merkmateriaal werd iets wat een team deelt in plaats van rondmailt.',
        'De prijs is waar het allemaal staat. De decks, de beelden en de brand kit staan op het platform van iemand anders, onder hun voorwaarden en hun roadmap, per gebruiker afgerekend zodra het team groeit. Voor veel organisaties is dat een volstrekt redelijke afweging. Voor de organisaties die moeten kunnen uitleggen waar hun materiaal verwerkt wordt, of die hun visuele identiteit liever niet in een account laten wonen dat ze niet beheren, is het precies de hele vraag.',
      ],
    },
    {
      id: 'gamma',
      name: 'Gamma',
      strength: 'De snelste route van een prompt naar een deck dat af lijkt.',
      giveUp:
        'Alleen gehost: er is geen versie die je zelf draait, en een thema is styling in plaats van een regel over wat een slide is.',
      body: [
        'Gamma is heel goed in wat het doet. Heb je vanmiddag een deck nodig en gaat niemand het narekenen, dan is er één genereren het verstandige antwoord, en doen alsof dat niet zo is zou onzin zijn.',
        'Wat het niet is, is een plek waar de regels van jouw organisatie wonen. Een Gamma-thema draagt je fonts, kleuren en logo, dus de uitkomst kan er echt uitzien als jij; wat een thema niet kan, is bepalen wát een slide is. De generator kiest nog steeds de structuur, en niets toetst het resultaat aan een regel die jij hebt opgeschreven. Daar komt bij dat er geen zelfgehoste versie is, dus "onze decks" blijft iets op hun platform. Deckyard mikt op de stap daarna: niet de snelste eerste opzet, maar het deck dat je aan een bestuur kunt geven zonder eerst elke slide na te lopen.',
      ],
    },
    {
      id: 'deckyard',
      name: 'Deckyard',
      self: true,
      strength:
        'Slides zijn getypeerde records, dus de huisstijl houdt stand en de toegankelijkheid volgt uit het formaat.',
      giveUp:
        '{count} slidetypes in plaats van een template-markt, een korte integratielijst, en iemand moet het draaien.',
      body: [
        'De afweging die Deckyard maakt, is de regels in het formaat leggen. Een slide is een record met een gedeclareerd type, het thema draagt elke kleur en elk font, en alles wat een veld vult wordt op dezelfde manier gevalideerd; of dat een mens is, een script of een agent. Andere tools kunnen ook een template uit data vullen; het verschil is dat hier het type van de slide gedeclareerd is en het systeem de invulling daaraan toetst, in plaats van tekst in een vakje op een tekening te laten vallen. Daar komen de onbreekbare huisstijl, de toegankelijke uitvoer en de integraties alle drie uit voort. Het is één beslissing, geen vier features.',
        'En dat is ook de prijs. Er is geen markt met 3.000 templates, de integratielijst is kort, en de software is jonger dan al het andere in deze tabel. Zelf hosten is echt werk: een server, updates, back-ups, iemand die het bijhoudt. Is er in jouw organisatie niemand die dat is, dan bestaat er een beheerde instance, maar dan betaal je voor hosting in plaats van dat het gratis meekomt met een licentie die je al hebt.',
      ],
    },
  ],

  readTitle: 'Dezelfde vijf, uitgebreider',
  readLead:
    'De tabel is de korte versie. Dit is hoe elke afweging voelt zodra een organisatie er een tijdje mee leeft.',

  wrongTitle: 'Wanneer Deckyard het verkeerde antwoord is',
  wrongLead:
    'De snelste manier om te zien of dit past, is de gevallen lezen waarin het niet past. Herken je jezelf hier, dan is een van de andere vier de betere tool en gebruik je die beter ook.',
  wrong: [
    'Je hebt vrijdag één mooi deck nodig en daarna kijkt niemand er ooit meer naar. Genereer het.',
    'Je wilt door duizenden templates bladeren en een look uitkiezen. Dat is dit niet; de look komt hier uit je eigen thema.',
    'Niemand kan een server draaien en er is geen budget voor een beheerde instance. Zelf hosten is hier het uitgangspunt, geen bijzaak.',
    'Je werkwijze bestaat eruit dat PowerPoint-bestanden door iedereen in de keten bewerkt worden. Deckyard exporteert naar PowerPoint, maar is geen heen-en-weer-editor voor Office-documenten.',
    'Je bent één persoon die eigen decks maakt. Dit is gebouwd voor organisaties waar alle decks met elkaar moeten kloppen.',
  ],

  ctaTitle: 'Makkelijker te beoordelen dan te lezen',
  ctaBody:
    'De sandbox is de Deckyard-editor in je browser, zonder installatie en zonder account. Maak een slide, wissel van thema, en kijk of de afweging hierboven een is die je wilt maken. AI, uploads en publiceren staan er uit, want hij is openbaar en anoniem.',
  ctaSandbox: 'Probeer de live sandbox',
  ctaHow: 'Lees hoe het werkt',
};
