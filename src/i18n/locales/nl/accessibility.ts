import type { AccessibilityContent } from '@/i18n/types';

export const accessibility: AccessibilityContent = {
  metaTitle: 'Toegankelijkheid - een eigenschap van het formaat, geen checklist - Deckyard',
  metaDescription:
    'Omdat een Deckyard-slide een getypeerd record is en geen tekening, projecteert hij naar echte koppen, lijsten en tabellen. Elk gepubliceerd deck heeft een leesweergave die werkt met JavaScript uit. Inclusief wat dit níet oplost.',
  heroKicker: 'Toegankelijkheid',
  heroTitle: 'Een tekening maak je achteraf niet toegankelijk',
  heroIntro:
    'Een slide op een canvas is vormen op coördinaten, en geen enkele zorgvuldigheid aan het eind maakt daar iets van dat een screenreader netjes kan voorlezen. Een slide die een record met getypeerde velden is, projecteert naar een document: koppen die koppen zijn, een reeks die een genummerde lijst is, een tabel die zijn kopregel houdt. Dat is het hele argument, en de rest van deze pagina is wat het je wel en niet oplevert.',

  followsTitle: 'Wat er uit de structuur volgt',
  followsLead:
    'Dit wordt gegenereerd uit de gedeclareerde veldvocabulaire, niet per slidetype geschreven. Daardoor is elk type gedekt, ook een type dat je eigen organisatie heeft toegevoegd, en kan de uitvoer niet weglopen van de definities.',
  follows: [
    {
      field: 'Een tekstveld met een kop-rol',
      result: 'Een echte kop, in een hiërarchie: één h1 voor het deck, één h2 per slide.',
    },
    {
      field: 'Een reeks waarin de volgorde betekenis draagt',
      result:
        'Een geordende lijst. Een tijdlijn of een proces declareert `ordered: true`, wordt dus een <ol>, en niets verderop mag de items herschikken.',
    },
    {
      field: 'Een verzameling waarin de volgorde toevallig is',
      result: 'Een ongeordende lijst. Kaarten en kolommen zijn een set, en de projectie zegt dat.',
    },
    {
      field: 'Een tabelveld',
      result: 'Een tabel met een echte kopregel: <thead> en <th scope="col">, geen vette tekst.',
    },
    {
      field: 'Een beeld dat als inhoudelijk is opgegeven',
      result: 'Een figure met zijn alt-tekst, en een caption als die er is.',
    },
    {
      field: 'Een beeld dat als decoratief is opgegeven',
      result:
        'Lege alt en aria-hidden, zodat hulpsoftware het overslaat in plaats van ernaar te gokken.',
    },
    {
      field: 'Een veld dat alleen de vormgeving regelt',
      result:
        'Niets. Kleuren, maten en layoutkeuzes zijn geen inhoud en blijven uit de documentweergave.',
    },
    {
      field: 'De toegankelijkheidsvelden per slide',
      result:
        'Een toegankelijkheidstitel en -samenvatting, aangekondigd zodra de slide actief wordt, voor de gevallen die de velden niet kunnen afleiden.',
    },
  ],

  readerKicker: 'De leesweergave',
  readerTitle: 'Elk gepubliceerd deck is ook een document',
  readerBody: [
    'Een gepubliceerd deck staat op zijn eigen adres, en hetzelfde deck heeft één pad verder een leesweergave, gelinkt vanuit het deck zelf. Dezelfde inhoud, geprojecteerd als document: één koppenhiërarchie, een inhoudsopgave, landmarks, figures met hun alt-tekst.',
    'Het is een aparte weergave en geen modus, en dat scheelt meer dan het klinkt: de presentatie blijft een presentatie, en de toegankelijke versie is geen uitgeklede kopie die iemand moet onthouden bij te werken. Het zijn twee projecties van hetzelfde record.',
  ],
  readerPoints: [
    'Leesbaar met JavaScript uit, en met de eigen opmaak van de pagina uit',
    'Eén kolom, relatieve eenheden, geen vast canvas: het herschikt op een telefoon in plaats van te krimpen',
    'Op het open web zonder inlog, dus iedereen aan wie je de link stuurt kan er iets mee',
    'Gegenereerd uit de velddefinities, dus een nieuw slidetype staat erin zonder extra werk',
  ],

  phoneTitle: 'En op een telefoon',
  phoneBody:
    'Een canvas heeft op een klein scherm één eerlijke optie, en dat is krimpen tot het onleesbaar is. Een document herschikt. Dat is hetzelfde mechanisme als bij de screenreader, dat via een andere deur binnenkomt, en het is de versie die het grootste deel van je publiek daadwerkelijk gebruikt.',

  limitsTitle: 'Wat dit niet oplost',
  limitsLead:
    'Het formaat haalt de obstakels weg. Het maakt je inhoud niet goed, en een pagina over toegankelijkheid die anders doet voorkomen wordt gelezen door precies de mensen die het gaan nakijken.',
  limits: [
    {
      title: 'Iemand moet die alt-tekst nog steeds schrijven',
      body: 'Het veld bestaat, het vraagt of het beeld inhoudelijk of decoratief is, en AI kan een beschrijving opzetten. Of die beschrijving iets waard is, blijft elke keer een menselijk oordeel.',
    },
    {
      title: 'De theme-editor meet contrast, hij dwingt het niet af',
      body: 'Kies je een achtergrond, dan komt daar automatisch lichte of donkere tekst bij; die keuze gaat nu naar de kleur die het hoogst meet, niet naar de kleur die het lichtst oogt, en de editor toont de verhouding en het WCAG-oordeel naast de kiezers die hem opleveren. Hij rapporteert, hij blokkeert niet: een variant met laag contrast kan een bewuste merkkeuze zijn, en een instellingenpaneel is niet de plek om die te overrulen. Het gaat om de hoofdkleuren en de achtergrondvarianten, dus je eigen merkpalet, en het oordeel over wat leesbaar genoeg is, blijven van jou.',
    },
    {
      title: 'Video en audio hebben ondertiteling nodig',
      body: 'Een slide kan een video bevatten. Aan een getypeerd veld ontstaat geen transcript, en wij maken je ondertiteling niet.',
    },
    {
      title: 'Wij beweren niets over de conformiteit van jouw deck',
      body: 'Deckyard is geen certificaat. Moet je organisatie een toegankelijkheidsverklaring publiceren, dan is de leesweergave het oppervlak om tegen te testen, en helpen we liever met dat testen dan dat we namens jou iets beweren.',
    },
  ],

  ctaTitle: 'Beter zelf nakijken dan ons op ons woord geloven',
  ctaBody:
    'De sandbox is de Deckyard-editor in je browser, zonder installatie en zonder account: bouw een tijdlijn en kijk wat de velden van je vragen. Publiceren staat daar uit, dus voor de leesweergave heb je een eigen instance nodig: publiceer een deck, volg de link naar de leesweergave, en zet daarna JavaScript uit om het opnieuw te lezen.',
  ctaDocs: 'Lees de toegankelijkheidsdocs',
  ctaSandbox: 'Probeer de live sandbox',
};
