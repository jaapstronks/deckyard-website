import type { FeaturesContent } from '@/i18n/types';

export const features: FeaturesContent = {
  metaTitle: 'Functies - alles wat Deckyard nu al doet',
  metaDescription:
    'De volledige inventaris: slidetypes, thema’s, AI op je eigen sleutel, samenwerken, live publiek, publiceren en exporteren. Gegroepeerd per moment waarop je het nodig hebt, met de documentatie één klik verderop.',
  heroKicker: 'De volledige inventaris',
  heroTitle: 'Alles wat er al in zit',
  heroIntro:
    'De rest van deze site voert één argument tegelijk. Deze pagina is de lijst: wat Deckyard vandaag doet, gegroepeerd per moment waarop je het nodig hebt, met de documentatie één klik verderop.',

  groups: [
    {
      id: 'making',
      label: 'Een deck maken',
      title: 'Je kiest een type en vult de velden in',
      body: 'Er is geen canvas en geen tekstvak om neer te zetten. Elke slide is een gedeclareerd type met benoemde velden, dus het ontwerp is één keer beslist, in het thema, niet per slide.',
      teaser: 'Gedeclareerde types, benoemde velden, en een bibliotheek van wat je al maakte.',
      moreLabel: 'Documentatie over bewerken',
      items: [
        {
          title: '{count} gedeclareerde slidetypes',
          body: 'Een tijdlijn, een matrix, een funnel, een quote, een grafiek. Je kiest wat je bedoelt in plaats van het te tekenen.',
        },
        {
          title: 'De editor is een formulier',
          body: 'Titel, subkop, byline, de items in de lijst. Velden met een naam, naast een preview die meeloopt terwijl je typt.',
        },
        {
          title: 'Een slidebibliotheek',
          body: 'Bewaar een slide die je vaker nodig hebt, voor jezelf of voor het team, en zet hem in het volgende deck.',
        },
        {
          title: 'Een beeldbibliotheek',
          body: 'Uploads komen op één doorzoekbare plek terecht in plaats van in het deck dat toevallig openstond.',
        },
        {
          title: 'Eén deck, meerdere talen',
          body: 'Een deck draagt zijn talen naast elkaar en de kijker schakelt ertussen, in plaats van dat er een kopie ontstaat die uit elkaar groeit.',
        },
      ],
    },
    {
      id: 'brand',
      label: 'Je huisstijl',
      title: 'De huisstijl is een bestand, geen gewoonte',
      body: 'Kleuren, fonts, logo’s en layoutregels zijn een thema: één JSON-bestand, net zo versiebeheerd als de rest. Niemand past het toe, want er is geen ongestylede toestand om te vergeten.',
      teaser: 'Kleuren, fonts en logo’s als één versiebeheerd bestand, standaard toegepast.',
      moreLabel: 'Documentatie over thema’s',
      items: [
        {
          title: 'Een thema is JSON',
          body: 'Leesbaar, vergelijkbaar en te reviewen. Een merkwijziging is een pull request in plaats van een sjabloon dat niemand downloadt.',
        },
        {
          title: 'Standaard on brand',
          body: 'Een deck rendert in het thema dat het meekreeg. Er is niets om achteraf toe te passen en dus niets om te vergeten.',
        },
        {
          title: 'Centraal herstylen',
          body: 'Verander het thema en elk deck dat het gebruikt volgt, ook de decks die al gepubliceerd zijn.',
        },
        {
          title: 'Je eigen gelicenseerde fonts',
          body: 'Upload de bestanden één keer. Exports dragen ze inline mee in plaats van ze op te halen bij de font-CDN van iemand anders.',
        },
        {
          title: 'Een fork houdt zijn eigen stijl',
          body: 'Eigen thema’s staan naast de meegeleverde en gaan voor, dus een huisstijl is nooit een patch op de core.',
        },
      ],
    },
    {
      id: 'ai',
      label: 'AI',
      title: 'Op jouw sleutel, binnen de vorm',
      body: 'AI zet jij aan, jij betaalt hem, en hij mag alleen velden invullen die al een gedeclareerde vorm hebben. Er zit geen model tussen dat jij niet hebt gekozen.',
      teaser: 'Jouw aanbieder, jouw sleutel, en velden waar hij niet omheen ontwerpt.',
      moreLabel: 'Documentatie over AI',
      items: [
        {
          title: 'Je eigen API-sleutel',
          body: 'Je kiest de aanbieder en betaalt die rechtstreeks. Zet je het helemaal uit, dan werkt de rest gewoon door.',
        },
        {
          title: 'Hij vult in, hij ontwerpt niet',
          body: 'Een model vraagt welke types er zijn en vult er één in. Er valt geen layout te verzinnen.',
        },
        {
          title: 'Een opzet uit je aantekeningen',
          body: 'Plak wat je hebt en het komt terug als getypeerde slides, die je daarna veld voor veld corrigeert.',
        },
        {
          title: 'Alt-teksten en vertalingen',
          body: 'De twee klussen die met de hand nooit afkomen, per slide aangeboden in plaats van als batch die niemand nakijkt.',
        },
        {
          title: 'Aansturen vanuit je eigen tools',
          body: 'Een MCP-server biedt dezelfde handelingen aan, dus een agent die je al draait kan in Deckyard schrijven.',
        },
      ],
    },
    {
      id: 'together',
      label: 'Samenwerken',
      title: 'Met meer mensen, zonder merge-conflict',
      body: 'Decks worden meestal door een paar mensen onder tijdsdruk geschreven. Dat vraagt om echte rechten, om reacties op de slide zelf, en om een weg terug naar wat er gisteren stond.',
      teaser: 'Rechten per persoon, reacties op de slide, en een weg terug.',
      moreLabel: 'Documentatie over samenwerken',
      items: [
        {
          title: 'Rechten per persoon',
          body: 'Bekijken, reageren of bewerken, per deck ingesteld, in plaats van één link die alles tegelijk weggeeft.',
        },
        {
          title: 'Reacties op de slide',
          body: 'Antwoorden, afhandelen en verwijderen, naast de live preview in plaats van in een los draadje dat z’n onderwerp kwijtraakt.',
        },
        {
          title: 'Tegelijk bewerken',
          body: 'Twee mensen in één deck zonder elkaar te overschrijven, en zonder dat iemand het eerst hoeft aan te kondigen.',
        },
        {
          title: 'Versiegeschiedenis',
          body: 'Elke opslag is een versie die je kunt lezen en terugzetten, dus “zet terug wat er vanochtend stond” is één klik.',
        },
        {
          title: 'Activiteit en vermeldingen',
          body: 'Een melding als iemand iets van jou wijzigt of noemt, in plaats van dat je het in de vergadering ontdekt.',
        },
      ],
    },
    {
      id: 'room',
      label: 'In de zaal',
      title: 'Het publiek antwoordt op de slide zelf',
      body: 'Een vraag aan de zaal is een slidetype als elk ander, dus de antwoorden horen bij het deck in plaats van bij een tweede tool die je er ook nog bij open had staan.',
      teaser: 'Polls, Q&A en een telefoon in elke hand, zonder tweede tool.',
      moreLabel: 'Documentatie over presenteren',
      items: [
        {
          title: 'Polls en schalen',
          body: 'Meerkeuze, meervoudige keuze, waardering en Likert, beantwoord vanuit de zaal terwijl de slide op de muur staat.',
        },
        {
          title: 'Gemodereerde Q&A',
          body: 'Vragen komen in een wachtrij die jij laat zien. Niets belandt op het scherm doordat iemand het intypte.',
        },
        {
          title: 'Feedback en leadcapture',
          body: 'Vraag om een reactie of een adres op de slide, en houd de antwoorden bij het deck waar ze bij horen.',
        },
        {
          title: 'Presentatieweergave',
          body: 'Notities, de volgende slide, een timer, tempo per slide en een marker, in een tweede venster dat de zaal nooit ziet.',
        },
        {
          title: 'Meekijken op de telefoon',
          body: 'Een code legt het deck in de handen van de zaal, in hun taal, met het vragenvak eraan vast.',
        },
        {
          title: 'Analytics per slide',
          body: 'Achteraf: bij welke slide mensen bleven hangen, en welke ze daadwerkelijk beantwoordden.',
        },
      ],
    },
    {
      id: 'out',
      label: 'Er weer uit',
      title: 'Zes uitgangen, en geen ervan is een verzoek',
      body: 'Een deck vertrekt in de vorm die je nodig hebt: een link, een embed, één bestand, of een document voor een tool die deze niet is. Altijd, en zonder het aan iemand te vragen.',
      teaser: 'Een link, een embed, één HTML-bestand, PDF, PowerPoint of JSON.',
      moreLabel: 'Documentatie over publiceren',
      items: [
        {
          title: 'Publiceren met een link',
          body: 'Eén klik, een leesbare URL die je daarna nog kunt aanpassen, en een deelplaatje dat erbij wordt gemaakt.',
        },
        {
          title: 'Privélinks met regels',
          body: 'Wachtwoord, vervaldatum, e-mailverificatie, bekijken of bewerken. Per link ingesteld, dus één intrekken trekt niet het deck in.',
        },
        {
          title: 'Embedden in je eigen pagina',
          body: 'De SDK haalt een gepubliceerd deck op bij jouw instantie, en de polls en Q&A blijven werken binnen het kader.',
        },
        {
          title: 'Eén zelfstandig HTML-bestand',
          body: 'Fonts, beeld en de viewer zitten erin. Het draait op elke statische host, of vanaf een bestand op een stick.',
        },
        {
          title: 'PDF, PowerPoint, PNG, JSON',
          body: 'Vier documentformaten eruit, inclusief de JSON waarin het deck toch al werd bewaard.',
        },
        {
          title: 'Feeds en deelplaatjes',
          body: 'Een gepubliceerd deck brengt z’n eigen previewplaatje mee, en een reeks ervan kan een RSS-feed zijn.',
        },
      ],
    },
  ],

  runTitle: 'En jij bent degene die het draait',
  runBody:
    'Eén Docker Compose-bestand, Node en Postgres. Op je eigen servers onder je eigen regels, of op een instantie die wij voor je draaien.',
  runHosting: 'Lees over hosting',
  runDocs: 'Zelf installeren',
};
