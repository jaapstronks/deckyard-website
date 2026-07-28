import type { HomeContent } from '@/i18n/types';

export const home: HomeContent = {
  metaTitle: 'Deckyard - Open source presentatieplatform van begin tot eind',
  metaDescription:
    'Het open source presentatieplatform dat je zelf draait, in plaats van PowerPoint, Canva of Gamma. Maken, presenteren, publiceren en samenwerken in één tool - on brand, GDPR-proof, geen lock-in. MIT-licentie, code op GitHub.',
  heroKicker: 'Open source · Van begin tot eind · Made in Europe',
  heroTitleMain: 'Presenteren,',
  heroTitleHighlight: 'eindelijk vrij.',
  heroWhatItIs:
    'Deckyard is een open source presentatieplatform dat je zelf host, in plaats van PowerPoint, Canva of Gamma.',
  heroLead:
    'Maken, presenteren, publiceren en samenwerken in één tool: je eigen huisstijl, je eigen data, en AI die slides vult in plaats van ze te ontwerpen.',
  heroDeckTitle: 'Hoi, dit is Deckyard - een presentatie, geëmbed op deze pagina',
  heroDeckPlay: 'Start de presentatie',
  heroDeckNote:
    'Geen screenshot: een echt deck, geëxporteerd uit Deckyard en met één tag in deze pagina gezet.',
  heroDeckPrev: 'Vorige slide',
  heroDeckNext: 'Volgende slide',
  typesKicker: 'De onderdelen',
  typesTitle: 'Elke deck bestaat uit dezelfde handvol dingen',
  typesLead:
    'Een tijdlijn, een vergelijking, wat cijfers, een vraag aan de zaal. Deckyard levert er {count} als gedeclareerde types, zodat je kiest wat je bedoelt in plaats van het te tekenen.',
  typesRailLabel: 'Een selectie uit de {count} slidetypes',
  typesAudienceLabel: 'de zaal antwoordt',
  typesAllLabel: 'slidetypes, met hun velden',
  typesCta: 'Bekijk alle {count}',
  formatKicker: 'Geen lock-in, opgeschreven',
  formatTitle: 'Je deck is een bestand dat je kunt lezen',
  formatBody: [
    'Een deck is JSON. Het noemt het formaat waarin het staat, de versie van dat formaat, en een gedeclareerd type voor elke slide. Daar hoeft geen Deckyard te draaien om het te begrijpen.',
    'En het formaat is gepubliceerd in plaats van beschreven: het JSON Schema staat op de URL die z’n eigen `$id` noemt, dus iedereen kan een deck ertegen valideren zonder het ons eerst te vragen.',
  ],
  formatCodeCaption: 'De envelop, ingekort',
  formatCta: 'Lees de formaatspecificatie',
  formatSchemaCta: 'Bekijk de schema’s',
  roomKicker: 'In de zaal',
  roomTitle: 'Het deck vraagt, en de zaal antwoordt',
  roomLead:
    'Een poll is een slidetype, geen tweede tool die er los naast hangt. Jij presenteert, de zaal komt binnen op een kort adres met een code, en de antwoorden landen op de slide waar iedereen al naar kijkt.',
  roomCta: 'Hoe presenteren werkt',
  roomPollAlt:
    'Een pollslide tijdens een presentatie. Vier antwoorden, de balken ongelijk: 31 van de 47 stemmen op de derde optie, met het lopende totaal eronder.',
  roomPollCaption: 'poll-slide, tijdens de presentatie',
  roomJoinAlt:
    'De uitnodigingsslide op het grote scherm: een QR-code naast het adres deckyard.eu/go en een toegangscode van vijf letters.',
  roomJoinCaption: 'follow-invite-slide, op het grote scherm',
  featuresKicker: 'De rest',
  featuresTitle: 'En dan is er nog alles eromheen',
  featuresLead:
    'Het deck maken is de ene helft. De andere helft is je huisstijl, je team, de zaal waar je staat, en het ding er achteraf weer uit krijgen.',
  featuresCta: 'Bekijk alle functies',
  aiKicker: 'Het stuk dat niemand heeft opgelost',
  aiTitle: 'Jullie mensen laten AI nu al voor de organisatie schrijven',
  aiLead: [
    'Niet als beleidsbesluit. Iemand moest donderdag een deck maken, plakte de aantekeningen in een chatvenster en plakte het antwoord terug. Het gaat sneller, en het gaat niet meer ophouden.',
    'Wat niemand kan zeggen, is of wat terugkwam binnen de regels van de organisatie blijft: de juiste claims, het juiste beeld, de dingen die er wettelijk in moeten staan. Elk deck nalopen schaalt niet, en mensen vragen om geen AI te gebruiken heeft nog nooit gewerkt.',
  ],
  aiFigure: {
    fixedLabel: 'Ligt vast voordat het draait',
    fixed: [
      { key: 'slidetypes', note: '{count} gedeclareerde vormen met benoemde velden' },
      { key: 'theme.json', note: 'kleuren, fonts, logo’s, ruimte' },
      { key: 'deck.schema.json', note: 'gepubliceerd als v{schemaVersion}: wat valideert' },
    ],
    openLabel: 'Blijft over voor het model',
    open: [
      { key: 'type', value: 'timeline-slide' },
      { key: 'title', value: '"Waar het geld heenging"' },
      { key: 'items', value: '4 x { date, title }' },
    ],
    foot: 'De vraag is dus "vul deze velden in", niet "ontwerp een slide". Een kleinere vraag, een goedkoper antwoord, en niets meer om fout te doen dat het thema niet al had beslist.',
  },
  aiPoints: [
    {
      title: 'Het vult velden, het ontwerpt niet',
      body: 'De layout is niet aan het model. Het vraagt welke slidetypes er zijn, kiest er een, en vult de velden die dat type declareert. Het ontwerp was al beslist voordat het draaide, door jou, in het thema.',
    },
    {
      title: 'Een schrijfactie wordt getoetst als elke andere',
      body: 'Een veld met een gedeclareerde vorm valideert wat het ook vult. Een model dat een tijdlijn met één moment maakt, of een quote zonder iemand om aan toe te schrijven, krijgt dezelfde weigering als een mens.',
    },
    {
      title: 'De huisstijl zit niet in de inhoud',
      body: 'Kleuren, fonts en logo’s wonen in themetokens, dus er is niets huisstijl-vormigs dat een model verkeerd kan doen. Een gegenereerd deck rendert in de huidige huisstijl, want er is geen andere.',
    },
  ],
  aiLimit:
    'Wat dit níet doet, is de tekst waar maken. Een model kan nog steeds een zelfverzekerde zin schrijven over een getal dat het zelf bedacht heeft, en geen formaat vangt dat. Wat het niet meer kan, is je iets geven dat in niets op je organisatie lijkt, of dat stil de vorm breekt waar al het andere in staat.',
  aiCta: 'Hoe dat werkt',
  hostedNote:
    'Of laat het draaien: een eigen instance op je eigen domein, gehost in Europa, op dezelfde code. De hosting is wat de ontwikkeling betaalt.',
  hostedCta: 'Hoe hosting werkt',
  compareKicker: 'Je komt ergens vandaan',
  compareTitle: 'Hoe dit zich verhoudt tot wat je nu gebruikt',
  compareBody:
    'De meeste mensen die dit lezen maken hun decks in PowerPoint, Google Slides, Canva of Gamma. Alle vier zijn ergens goed in, en alle vier kosten je iets. De vergelijking zegt wat, en wanneer Deckyard het verkeerde antwoord is.',
  compareCta: 'Lees de vergelijking',
  ctaKicker: 'Open source, nu beschikbaar',
  ctaTitle: 'Verken de code, volg de lancering',
  ctaLead:
    'Deckyard is MIT-gelicenseerd, GDPR-native en gebouwd om zelf te hosten. De code staat vandaag openbaar op GitHub. Geef ’m een ster, draai ’m, of laat je adres achter voor updates over de lancering en de gehoste versie.',
  ctaGithub: 'Bekijk op GitHub',
  ctaWaitlistButton: 'Zet me op de lanceerlijst',
  sandboxButton: 'Probeer de live sandbox',
  sandboxNote: 'Geen installatie, geen aanmelding. AI, uploads en publiceren staan uit.',
  ctaSandboxButton: 'Open de sandbox',
};
