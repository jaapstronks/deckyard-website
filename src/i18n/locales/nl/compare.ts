import type { CompareContent } from '@/i18n/types';

export const compare: CompareContent = {
  metaTitle: 'Deckyard vergeleken met PowerPoint, Canva en Gamma - Deckyard',
  metaDescription:
    'Een eerlijke vergelijking: wat PowerPoint, Canva, Gamma en Deckyard elk goed doen, en wat elk van ze je kost. Inclusief de gevallen waarin Deckyard het verkeerde antwoord is.',
  heroKicker: 'Vergeleken',
  heroTitle: 'Wat je erbij krijgt, en wat je opgeeft',
  heroIntro:
    'Bijna iedereen die hier terechtkomt maakt zijn decks nu in PowerPoint, Canva of Gamma. Deze pagina zegt daarom plat waar elk van die drie goed in is, wat het je kost, en wanneer Deckyard het verkeerde antwoord is. Een vergelijking die wij op elke rij winnen zegt namelijk niets.',

  tableTitle: 'Vier manieren om een deck te maken',
  tableLead:
    'Twee kolommen per tool, want dit zijn afwegingen en geen ranglijst. Deckyard staat in dezelfde tabel op dezelfde voorwaarden, en die tweede kolom is bij ons niet leeg.',
  colTool: 'Tool',
  colStrength: 'Wat het goed doet',
  colGiveUp: 'Wat je opgeeft',
  alternatives: [
    {
      id: 'powerpoint',
      name: 'PowerPoint',
      strength:
        'Zit al in de licentie, staat al op elke laptop, en iedereen heeft er ooit een geopend. Werkt offline, zonder account en zonder netwerk.',
      giveUp:
        'Elke slide is een tekening, dus de huisstijl loopt slide voor slide weg en toegankelijkheid is per slide handwerk. Een deck vullen uit een ander systeem betekent een Office-bestand schrijven, geen velden invullen.',
      body: [
        'PowerPoint is het eerlijke uitgangspunt: het is al betaald, het staat er al, en niemand hoeft een cursus. Elk argument voor iets anders moet opwegen tegen de prijs van níet gebruiken wat iedereen al heeft.',
        'Wat het niet kan, is een vorm vasthouden. Een slide is vormen op coördinaten, dus twee mensen die dezelfde slide maken, maken twee verschillende slides, en een template is een suggestie in plaats van een regel. Alles wat daarna komt erft dat: een toegankelijk deck is iets wat iemand slide voor slide toegankelijk máákt, en een deck uit je eigen data is een bestand dat je script in elkaar zet, zonder iets om het aan te toetsen.',
      ],
    },
    {
      id: 'canva',
      name: 'Canva',
      strength:
        'Een enorme templatebibliotheek en een echt snelle route naar iets wat mooi is. Brand kits, reacties en gedeelde mappen werken goed.',
      giveUp:
        'Je werk staat op hun infrastructuur, afgerekend per persoon. Je kunt een kopie exporteren, maar het bewerkbare origineel blijft daar, en er is geen versie die je zelf draait.',
      body: [
        'Canva loste het probleem op dat PowerPoint liet liggen: een mooi deck werd bereikbaar voor iemand die geen ontwerper is, en merkmateriaal werd iets wat een team deelt in plaats van rondmailt.',
        'De prijs is waar het allemaal staat. De decks, de beelden en de brand kit staan op het platform van iemand anders, onder hun voorwaarden en hun roadmap, per gebruiker afgerekend zodra het team groeit. Voor veel organisaties is dat een volstrekt redelijke afweging. Voor de organisaties die moeten kunnen uitleggen waar hun materiaal verwerkt wordt, of die hun visuele identiteit liever niet in een account laten wonen dat ze niet beheren, is het precies de hele vraag.',
      ],
    },
    {
      id: 'gamma',
      name: 'Gamma',
      strength:
        'De snelste route van een prompt naar een deck dat af lijkt. Moeilijk te verslaan als het erom gaat vandaag iets te hebben.',
      giveUp:
        'Alleen gehost, en het deck krijgt de vorm die de generator koos in plaats van de vorm die jouw organisatie vastlegde. Er is niets om zelf te draaien en geen formaat om op door te bouwen.',
      body: [
        'Gamma is heel goed in wat het doet. Heb je vanmiddag een deck nodig en gaat niemand het narekenen, dan is er één genereren het verstandige antwoord, en doen alsof dat niet zo is zou onzin zijn.',
        'Wat het niet is, is een plek waar de regels van jouw organisatie wonen. De uitkomst wordt door de generator gevormd, dus wat eruit komt lijkt op een Gamma-deck dat jouw merk noemt in plaats van een deck dat jouw merk voortbracht; en omdat er geen zelfgehoste versie is, blijft "onze decks" iets op hun platform. Deckyard mikt op de stap daarna: niet de snelste eerste opzet, maar het deck dat je aan een bestuur kunt geven zonder eerst elke slide na te lopen.',
      ],
    },
    {
      id: 'deckyard',
      name: 'Deckyard',
      self: true,
      strength:
        'Je bezit de vorm, de inhoud en de machine waarop het draait. Slides zijn getypeerde records, dus de huisstijl houdt stand en de toegankelijkheid volgt uit het formaat in plaats van uit een checklist.',
      giveUp:
        'Jonger en kleiner: {count} slidetypes in plaats van een template-markt, minder integraties, één repository in plaats van een ecosysteem. En iemand moet het draaien, of ons ervoor betalen.',
      body: [
        'De afweging die Deckyard maakt, is de regels in het formaat leggen. Een slide is een record met een gedeclareerd type, het thema draagt elke kleur en elk font, en alles wat een veld vult wordt op dezelfde manier gevalideerd; of dat een mens is, een script of een agent. Daar komen de onbreekbare huisstijl, de toegankelijke uitvoer en de integraties alle drie uit voort. Het is één beslissing, geen vier features.',
        'En dat is ook de prijs. Er is geen markt met 3.000 templates, de integratielijst is kort, en de software is jonger dan al het andere in deze tabel. Zelf hosten is echt werk: een server, updates, back-ups, iemand die het bijhoudt. Is er in jouw organisatie niemand die dat is, dan bestaat er een beheerde instance, maar dan betaal je voor hosting in plaats van dat het gratis meekomt met een licentie die je al hebt.',
      ],
    },
  ],

  readTitle: 'Dezelfde vier, uitgebreider',
  readLead:
    'De tabel is de korte versie. Dit is hoe elke afweging voelt zodra een organisatie er een tijdje mee leeft.',

  wrongTitle: 'Wanneer Deckyard het verkeerde antwoord is',
  wrongLead:
    'De snelste manier om te zien of dit past, is de gevallen lezen waarin het niet past. Herken je jezelf hier, dan is een van de andere drie de betere tool en gebruik je die beter ook.',
  wrong: [
    'Je hebt vrijdag één mooi deck nodig en daarna kijkt niemand er ooit meer naar. Genereer het.',
    'Je wilt door duizenden templates bladeren en een look uitkiezen. Dat is dit niet; de look komt hier uit je eigen thema.',
    'Niemand kan een server draaien en er is geen budget voor een beheerde instance. Zelf hosten is hier het uitgangspunt, geen bijzaak.',
    'Je werkwijze bestaat eruit dat PowerPoint-bestanden door iedereen in de keten bewerkt worden. Deckyard exporteert naar PowerPoint, maar is geen heen-en-weer-editor voor Office-documenten.',
    'Je bent één persoon die eigen decks maakt. Dit is gebouwd voor organisaties waar alle decks met elkaar moeten kloppen.',
  ],

  ctaTitle: 'Makkelijker te beoordelen dan te lezen',
  ctaBody:
    'De sandbox is een volledige Deckyard in je browser, zonder installatie en zonder account. Maak een slide, wissel van thema, en kijk of de afweging hierboven een is die je wilt maken.',
  ctaSandbox: 'Probeer de live sandbox',
  ctaHow: 'Lees hoe het werkt',
};
