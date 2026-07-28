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
  featuresKicker: 'De rest',
  featuresTitle: 'En dan is er nog alles eromheen',
  featuresLead:
    'Het deck maken is de ene helft. De andere helft is je huisstijl, je team, de zaal waar je staat, en het ding er achteraf weer uit krijgen.',
  featuresCta: 'Bekijk alle functies',
  aiKicker: 'Het stuk dat niemand heeft opgelost',
  aiTitle: 'Jullie mensen laten AI nu al voor de organisatie schrijven',
  aiLead: [
    'Niet als beleidsbesluit. Iemand moest donderdag een deck maken, plakte de aantekeningen in een chatvenster en plakte het antwoord terug. Het leest prima, het gaat sneller, en het gaat niet meer ophouden.',
    'Wat niemand kan zeggen, is of wat eruit kwam binnen de regels van de organisatie blijft: de juiste claims, de juiste toon, het juiste beeld, de dingen die er wettelijk in moeten staan. Elk deck nalopen schaalt niet, en mensen vragen om geen AI te gebruiken heeft nog nooit gewerkt.',
  ],
  aiPoints: [
    {
      title: 'Een agent kan geen layout verzinnen',
      body: 'Er is geen layout om te verzinnen. Hij vraagt welke slidetypes bestaan en vult de velden van een van die types. Het ontwerp was al beslist, door jou, in het thema.',
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
