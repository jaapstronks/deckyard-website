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
  featuresKicker: 'Onder de motorkap',
  featuresTitle: 'Al gebouwd, nu in de openbaarheid',
  featuresLead:
    'Dit is geen wachtlijst voor een idee. Deckyard is een werkend platform dat dagelijks wordt gebruikt, en de broncode staat nu openbaar op GitHub. Dit is wat je krijgt.',
  pillars: [
    {
      title: '{count} slidetypes',
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
