import type { SpecContent } from '@/i18n/types';

export const spec: SpecContent = {
  shared: {
    moreTitle: 'De rest van de specificatie',
    pages: {
      index: {
        title: 'Het Deckyard-deckformaat',
        blurb: 'Wat het is, uit welke twee lagen het bestaat en wat je ermee mag.',
      },
      'deck-format': {
        title: 'Het deckformaat',
        blurb: 'De draagbare envelop, veld voor veld: slides, types, versies, degradatie.',
      },
      'deck-bundle': {
        title: 'Het deckpakket',
        blurb:
          'Het archief dat een deck en zijn beelden meedraagt, verifieerbaar en op hash geadresseerd.',
      },
      schemas: {
        title: "Schema's",
        blurb: 'Waar de JSON Schemas staan, hoe je ze ophaalt en wat ze beloven.',
      },
      'slide-types': {
        title: 'Slidetypes',
        blurb: 'Elk ingebouwd type, zijn vorm, zijn velden en wanneer je het pakt.',
      },
    },
    sourceNote:
      'Elk voorbeeld op deze pagina wordt live geserveerd door elke Deckyard-installatie.',
    codeLabel: 'Lees de implementatie',
    referenceLabel: 'Volledige referentie',
  },

  index: {
    metaTitle: 'Het deckformaat - Deckyard',
    metaDescription:
      'Decks van Deckyard zitten in een gedocumenteerd, geversioneerd en vrij implementeerbaar formaat: een JSON-envelop voor de data en een ZIP-pakket voor de bestanden.',
    heroKicker: 'Formaatspecificatie',
    heroTitle: 'Een deck is een bestand van jou, in een formaat dat iedereen mag implementeren',
    heroIntro:
      'Deckyard bewaart presentaties in een formaat dat is opgeschreven, geversioneerd en vrij te implementeren. Geen exportknop die er achteraf bij is gezet, maar de vorm waarin de software zelf werkt.',

    layersTitle: 'Twee lagen, en het verschil doet ertoe',
    layersLead:
      'De eerste vraag is altijd of een deck nou "een soort JSON" is of "die zip". Het is allebei, het een in het ander, en elke laag beantwoordt een andere behoefte.',
    layers: [
      {
        badge: 'Laag 1',
        name: 'Het deckformaat',
        what: 'JSON. De data.',
        body: 'Een platte, leesbare envelop: een titel, een thema, een manifest van de gebruikte slidetypes en een geordende reeks slides. Geen server-ids, geen timestamps, geen restanten van opslag. Je opent het in een teksteditor en je snapt wat er staat.',
      },
      {
        badge: 'Laag 2',
        name: 'Het deckpakket',
        what: 'ZIP. De data plus de pixels.',
        body: 'Dezelfde envelop, met elk lokaal beeld ernaast, geadresseerd op de hash van zijn eigen bytes. Het rendert offline, op een machine die de server waar het vandaan komt nooit heeft gezien.',
      },
    ],

    whyTitle: 'Waarom het is opgeschreven',
    whyBody: [
      'Een presentatietool die jouw werk bewaart in een vorm die alleen die tool begrijpt, heeft een claim gelegd op jouw werk. Alles volgt daaruit: of je weg kunt, of een script je decks kan lezen, of een archief ze kan bewaren, of iemand anders ooit iets kan bouwen dat ze opent.',
      'HTML verhoudt zich tot EPUB zoals het deckformaat zich verhoudt tot het deckpakket: het een is het document, het ander de verpakking waarin het document met zijn beelden mee kan reizen. De vergelijking die iedereen maakt is `document.xml` in een `.docx`, en die klopt ook, alleen dan zonder de XML. Dit is JSON die je met het blote oog leest.',
      'Deckyard is open source, dus de implementatie was altijd al in te zien. Dat is een zwakkere belofte dan deze. Code vertelt je wat een programma vandaag doet; een specificatie vertelt je wat een bestand betekent, en dat is wat je nodig hebt als het programma er niet meer is.',
    ],

    claimsTitle: 'Wat er werkelijk ongebruikelijk aan is',
    claimsLead:
      'Genoeg tools exporteren JSON. Vijf dingen hier zijn zeldzamer, en elk ervan is te controleren in plaats van te geloven.',
    claims: [
      {
        title: 'Eén bron voor de editor, de validatie, het schema en de agent',
        body: 'Een slidetype declareert zijn velden één keer. Diezelfde declaratie bouwt het formulier in de editor, valideert de inhoud, genereert het JSON Schema, en is wat een taalmodel via MCP krijgt aangereikt. Dit is geen specificatie die naast een implementatie wordt bijgehouden en er langzaam van afdrijft; hij valt uit de implementatie, en CI houdt de twee tegen elkaar aan.',
      },
      {
        title: 'Betekenis, geen geometrie',
        body: 'Een deck zegt "een tijdlijn met vier mijlpalen", nooit "een tekstvak op 312,88pt". Daarom kan hetzelfde deck responsief renderen, naar HTML en PDF exporteren en een ander thema aannemen zonder opnieuw getekend te worden. En daarom kan een machine erover nadenken.',
      },
      {
        title: 'Net zo leesbaar voor een mens als schrijfbaar voor een agent',
        body: 'Hetzelfde typecontract dat de slidekiezer aan een mens laat zien, is wat een model ontvangt. PPTX en Google Slides zijn machineschrijfbaar maar niet machine-begrijpelijk: die dragen vakjes en coördinaten, geen betekenis.',
      },
      {
        title: 'Twee versie-assen, bewust gescheiden',
        body: 'De envelop heeft een versie, en de inhoud van slides heeft een eigen versie, met een migratieloop naar het model van nbformat uit Jupyter. Lezers zijn per contract inschikkelijk: onbekende sleutels worden genegeerd, niet geweigerd. Daarom gaan decks van jaren geleden nog gewoon open.',
      },
      {
        title: 'Degradatie is gespecificeerd, niet toevallig',
        body: 'Een onbekend slidetype gooit geen fout. Het importeert als een plaatshouder die zegt welk type niet gevonden werd, of dat type bewust is uitgefaseerd en wat ervoor in de plaats komt, en die de oorspronkelijke inhoud als tekst meeneemt. Een ontbrekend beeld wordt een losse verwijzing, geen crash. Dat is wat het veilig maakt om er een tweede implementatie op te bouwen.',
      },
    ],

    statusTitle: 'Status',
    statusLead: 'Wat vaststaat, wat we beloven, en hoe ver de conformiteit vandaag reikt.',
    status: [
      {
        term: 'Envelopversie',
        def: 'Versie {version}. Die is nooit veranderd, en een breaking wijziging aan de vorm van de envelop zou hem ophogen en met een migratiepad komen.',
      },
      {
        term: 'Vorm van de inhoud',
        def: 'Apart geversioneerd, onder een eigen schemaversie ({schemaVersion} op dit moment), met een migratieloop en een inschikkelijk leescontract. Nieuwe sleutels komen erbij; oude decks blijven opengaan.',
      },
      {
        term: 'Implementatie',
        def: 'De referentie-implementatie is Deckyard zelf, onder MIT. De spectekst heeft een eigen licentie, CC0-1.0, zodat een tweede implementatie de formuleringen zonder te vragen in een eigen document kan overnemen. Voor het lezen of schrijven van dit formaat heb je geen toestemming, sleutel of vergoeding nodig.',
      },
      {
        term: 'Conformiteit',
        def: 'Een meegeleverd voorbeelddeck en een round-triptest in de core-repo werken vandaag al als conformiteitsfixture. Die publiceren als downloadbare set is de volgende stap.',
      },
    ],
  },

  format: {
    metaTitle: 'Het deckformaat - specificatie - Deckyard',
    metaDescription:
      'De draagbare deck-envelop, veld voor veld: het identiteitsmanifest van slidetypes, verwijzingen naar beelden, de round-tripgarantie, versionering en gespecificeerde degradatie.',
    heroKicker: 'Specificatie · laag 1',
    heroTitle: 'Het deckformaat',
    heroIntro:
      'De draagbare, geversioneerde envelop waarin een presentatie wordt geserialiseerd, zodat een tweede implementatie hem kan lezen, renderen en round-trippen zonder de server of de opslag van Deckyard.',
    introBody: [
      'Een deck is data, geen rendering. Het formaat is met opzet eenvoudig: slides zijn een platte reeks van `{ type, content }`, en niets erin hangt af van de machine waar het vandaan komt.',
    ],

    envelopeTitle: 'De envelop',
    envelopeBody: ['Zes velden op het hoogste niveau. Al het andere zit in `slides`.'],
    leniency:
      'De envelop is inschikkelijk. Onbekende sleutels op het hoogste niveau worden door een importeur genegeerd en nooit geweigerd, zodat een nieuwere schrijver een veld kan toevoegen dat een oudere lezer simpelweg overslaat.',
    legacySentinel:
      'Voor 1.7.0 stond in dit veld `slidecreator.deck`, een naam van voordat het product zo heette. Niets schrijft dat nog; een lezer accepteert het toch, want een hernoeming hoort nooit de reden te zijn dat een bestand niet opengaat.',
    envelopeRefNote:
      'Alle zes velden staan uitgeschreven in de documentatie: hun type, en wat een lezer ermee hoort te doen.',

    manifestTitle: 'slideTypes: het identiteitsmanifest',
    manifestBody: [
      'Het manifest legt vast tegen welke definities van slidetypes een deck is geschreven, als een afbeelding van de kale sleutel naar een volledige identiteit `namespace/naam[@versie]`. Core-types landen in de namespace `core/`; een type dat iemand zelf heeft toegevoegd draagt de zijne.',
      'Het wordt bij elke export opnieuw uit de registry berekend en nooit met de hand bijgehouden, dus het kan niet afdrijven van de slides die het beschrijft. Een test in CI controleert dat het manifest van het meegeleverde voorbeelddeck gelijk is aan het herberekende manifest.',
      'Zo leert een tweede implementatie welke typedefinities een deck nodig heeft. `slides[].type` blijft de kale sleutel voor compatibiliteit; het manifest is de plek waar de identiteit staat.',
    ],

    slidesTitle: 'Slides',
    slidesBody: [
      'Een slide is een type plus een content-object waarvan dat type de vorm bepaalt. Een afwezig of leeg veld betekent "niet ingevuld": een importeur vult de standaardwaarden van het type in en maakt een verplicht veld nooit leeg.',
      'Draagbare slides hebben geen id. Ids horen bij opslag en worden bij import opnieuw gegenereerd, dus een lezer mag er niet van uitgaan dat de identiteit van een slide een round-trip overleeft.',
    ],

    schemaTitle: "Contentschema's",
    schemaBody: [
      'De contentvorm van elk slidetype wordt beschreven door een JSON Schema dat wordt gegenereerd uit dezelfde veldregistry die de validatie en de editor voedt. Eén bron, geen handmatig gesynchroniseerde kopie, en geen manier waarop het schema een vorm kan beschrijven die de software niet accepteert.',
      "De schema's worden live geserveerd en zijn geversioneerd via hun `$id`. Op de schemapagina staat hoe je ze ophaalt.",
    ],

    assetsTitle: 'Verwijzingen naar beelden',
    assetsBody: [
      'Afbeeldingen worden per string aangeduid. Een lokale upload is een serverpad en is alleen draagbaar zolang die server bereikbaar is. Een externe `https://`-URL is al draagbaar en wordt door elke transformatie met rust gelaten.',
      'Wil je een deck zelfdragend maken, gebruik dan het deckpakket: dat neemt de bytes van elk lokaal beeld op, op hash geadresseerd, en herschrijft de verwijzingen naar het archief. Pakketverwijzingen komen nooit voor in een gewoon draagbaar deck.',
    ],

    roundTripTitle: 'Round-tripgarantie',
    roundTripBody: [
      'Voor slides met inhoud is export naar import naar export een vast punt: na één normalisatieslag is de draagbare projectie stabiel, en identieke bytes hashen naar identieke adressen. Een test in de core-repo bewijst dat bij elke run tegen een meegeleverd voorbeelddeck.',
    ],
    degradeLead:
      'Twee randen zijn bewust lossy. Ze zijn gespecificeerd zodat ze degraderen in plaats van crashen, en dat is precies wat het formaat veilig maakt om tegenaan te bouwen.',
    degrade: [
      {
        term: 'Onbekend slidetype',
        def: 'Importeert als plaatshouder die zegt welk type niet gevonden werd, of dat type bewust is uitgefaseerd en wat ervoor in de plaats komt, en die de oorspronkelijke inhoud als tekst meeneemt.',
      },
      {
        term: 'Ontbrekend lokaal beeld',
        def: 'Behoudt zijn oorspronkelijke verwijzing en importeert als losse verwijzing. Onschadelijk, en zichtbaar in plaats van stil.',
      },
    ],

    securityTitle: 'Een deck is niet inert',
    securityBody: [
      'Het grootste deel van het formaat is data die een lezer kan renderen zonder iets uit te voeren. Twee slidetypes niet: `custom-html-slide` draagt HTML die een auteur geschreven heeft, en `embed-slide` draagt een URL die in een frame komt te staan. Een deck is dus actieve inhoud, en een bestand van iemand anders veilig noemen omdat het valideert is de verkeerde conclusie.',
      'Wat daaruit volgt is een plicht voor wie het formaat leest, geen eigenschap ervan: saneer auteurs-HTML voordat die een document bereikt, en isoleer ingesloten URLs in een frame dat niet bij de pagina eromheen kan. De pakketlaag verandert daar niets aan. Adressering op hash bewijst dat de bytes de ingepakte bytes zijn; over de vraag of ze veilig zijn om uit te voeren zegt het niets.',
      'Deze formulering is bewust gelijk aan de security-paragraaf van de mediatype-registratie. Dezelfde claim hoort hier niet anders te luiden dan daar.',
    ],

    versioningTitle: 'Versionering',
    versioningBody: [
      '`version` is de envelopversie. Die beweegt alleen bij een breaking wijziging aan de vorm van de envelop, en hij heeft nog niet bewogen.',
      'De inhoud van slides is apart geversioneerd, gekoppeld aan een schemaversie met een eigen migratieloop. Het model is nbformat uit Jupyter: een lezer valideert tegen de versie die hij kent, en het inschikkelijke contract laat hem sleutels uit een nieuwere versie verdragen.',
    ],

    apiTitle: 'Een deck maken en lezen',
    apiLead:
      'De schemaroutes antwoorden zonder inloggegevens, op elke installatie en dus ook in de sandbox, want een gepubliceerd formaatcontract hoort op te halen te zijn. De routes die aan iemands decks zitten doen dat niet, om dezelfde reden waarom jouw documenten niet openbaar zijn.',
    apiBody: [
      'Export levert allebei de lagen op; import neemt ze allebei weer aan. Niets in dat rondje is aan één installatie gebonden, en dat is de enige test van een draagbaar formaat die iets zegt: een deck dat jouw installatie schreef, opent op een installatie die het nooit gezien heeft.',
    ],
    apiRefNote:
      'De vier export- en importroutes, en welke ervan inloggegevens vragen, staan in de documentatie.',
  },

  bundle: {
    metaTitle: 'Het deckpakket - specificatie - Deckyard',
    metaDescription:
      'Het .deck-pakket: een ZIP in OCF-stijl die een deck en zijn beelden meedraagt, op SHA-256 geadresseerd, gededupliceerd, verifieerbaar en opsombaar.',
    heroKicker: 'Specificatie · laag 2',
    heroTitle: 'Het deckpakket',
    heroIntro:
      'Een zelfdragend archief van een presentatie en haar beelden. Waar de JSON-export nog naar plaatjes op een server wijst, draagt het pakket zijn eigen pixels mee.',
    introBody: [
      'Het rendert en round-trript op een andere machine, zonder de server waar het vandaan kwam, en het kan precies opsommen welke bestanden erin zitten. De indeling is gemodelleerd op OCF, de verpakking die EPUB gebruikt, en om dezelfde reden: een ZIP waarvan de eerste ingang een ongecomprimeerd mediatype is, valt te herkennen aan een magic number voordat er iets is uitgepakt.',
    ],

    layoutTitle: 'Indeling van het archief',
    layoutBody: ['Vier dingen, in deze volgorde.'],
    layoutNotes: {
      mimetype:
        'Eerste ingang, ongecomprimeerd opgeslagen, met precies `{mime}` erin. Daardoor is het archief te herkennen aan een magic number, voordat er iets is uitgepakt.',
      manifest: 'Metadata van het pakket en de volledige inventaris van de beelden.',
      deck: 'De draagbare envelop, met elke verwijzing naar een beeld herschreven naar een plek in het archief.',
      assets:
        'De bytes van de beelden, geadresseerd op de SHA-256 van hun eigen inhoud. Identieke bytes worden één keer opgeslagen.',
    },
    legacySentinel:
      'Het mediatype heeft dezelfde geschiedenis als het herkenningsteken in de envelop: een pakket van voor 1.7.0 draagt `application/vnd.slidecreator.deck`, en een lezer neemt allebei. Een schrijver zet er alleen `{mime}` in. De bestandsextensie is nooit veranderd, dus een pakket op schijf is hoe dan ook een `.deck`.',

    manifestTitle: 'Het manifest',
    manifestBody: [
      'Het manifest is een volledige inventaris van de beelden in het deck. Elk record koppelt de bytes in het archief aan de namen die ze eerder hadden.',
      'Het veld om te snappen is `sources`: de oorspronkelijke bestandsnamen blijven in het manifest, zodat hash-churn nooit in de leesbare structuur lekt, en meerdere bronnen betekent dat dezelfde bytes vanaf meerdere plekken werden gebruikt.',
    ],
    manifestRefNote: 'Elk veld in het manifest staat uitgeschreven in de documentatie.',

    guaranteesTitle: 'Wat het pakket garandeert',
    guaranteesLead:
      'Vier eigenschappen, en elk ervan wordt door de lezer afgedwongen in plaats van aangenomen.',
    guarantees: [
      {
        title: 'Zelfdragend',
        body: 'Elk lokaal bestand zit erin. Het pakket rendert offline, zonder server in beeld.',
      },
      {
        title: 'Op inhoud geadresseerd en verifieerbaar',
        body: 'De bytes van elk bestand hashen naar hun eigen verwijzing. De lezer hasht bij binnenkomst alles opnieuw en weigert een mismatch, dus een beschadigd of gemanipuleerd archief faalt hoorbaar.',
      },
      {
        title: 'Gededupliceerd',
        body: 'Identieke bytes worden één keer opgeslagen, hoeveel slides er ook naar wijzen.',
      },
      {
        title: 'Opsombaar',
        body: 'Het manifest noemt elk bestand dat een deck nodig heeft. Je kunt "wat zit hier eigenlijk in" beantwoorden zonder uit te pakken.',
      },
    ],

    importTitle: 'Een pakket terug inlezen',
    importBody: [
      'Import is de spiegel van export: het mediatype-herkenningsteken controleren, elk bestand opnieuw hashen, de bytes terugschrijven onder de menselijke naam die het manifest onthield, de verwijzingen in het deck naar hun nieuwe plek herschrijven, en daarna dezelfde normalisatie draaien als de gewone JSON-import.',
      'Ook hier is de degradatie gespecificeerd. Een bestand met een mediatype dat het ontvangende systeem niet accepteert, wordt overgeslagen en gemeld in plaats van de import af te breken. Een onbekend slidetype wordt dezelfde plaatshouder als overal elders. Verwijzingen die al ontbraken toen het pakket werd gebouwd, importeren als losse verwijzing, en dat is onschadelijk.',
    ],

    gapsTitle: 'Wat er nog niet in zit',
    gapsBody: [
      "Bestanden die aan een thema hangen in plaats van aan een slide, een logo bijvoorbeeld, worden niet meegenomen, en externe afbeeldings-URL's ook niet. Die externe URL's zijn een bewuste keuze, want die zijn al draagbaar. Thema-assets zijn een gat, en het staat hier in plaats van dat je er later tegenaan loopt.",
    ],
  },

  schemas: {
    metaTitle: "Schema's - specificatie - Deckyard",
    metaDescription:
      'Deckyard genereert voor elk slidetype een JSON Schema uit dezelfde veldregistry die de editor voedt, en serveert ze live via een open endpoint.',
    heroKicker: 'Specificatie',
    heroTitle: "Schema's",
    heroIntro:
      'Elk slidetype heeft een JSON Schema. Geen ervan is met de hand geschreven, en geen ervan kan een vorm beschrijven die de software niet accepteert.',
    introBody: [
      'Een schema dat los van de code wordt bijgehouden, is een schema dat fout is, met een vertraging die niemand meet. Deze worden gegenereerd uit de veldregistry die ook het editorformulier bouwt, de validatie draait en de agentcatalogus vult: één declaratie, vier afnemers.',
    ],

    sourceTitle: 'Gegenereerd, niet geschreven',
    sourceBody: [
      'Een slidetype declareert zijn velden: de sleutels, de types, of ze verplicht zijn, hun lengtelimieten en hun mogelijke waarden. Die declaratie ís het schema, geprojecteerd. Voeg een veld toe aan een slidetype en het schema heeft het in dezelfde commit, want er is geen tweede plek om bij te werken.',
      'Daarom kan de slidetypepagina op deze site je een veldtabel laten zien die gegarandeerd klopt: die leest dezelfde registry.',
    ],

    idTitle: 'Identiteit en versionering',
    idBody: [
      "Schema's zijn geversioneerd via hun `$id`, die de hoofdversie in het pad draagt. Er is een schema per type en een schema voor het hele deck, onderscheiden op slidetype.",
      'Let op één ding: die versie is de versie van de contentvorm ({schemaVersion}), niet de envelopversie ({version}). Het zijn twee assen, en dat is precies waarom ze uit elkaar lopen.',
      'Allebei zijn ze op te halen. `{schemaBase}/deck.schema.json` is het hele deck, `{schemaBase}/slide-types/<type>.schema.json` is één type, en `{schemaBase}/index.json` geeft je de lijst. Formeel hoeft een JSON Schema `$id` niet op te halen te zijn, hij is een identificatie; voor een formaat dat je aan anderen aanbiedt als standaard hoort dat toch.',
      'Onder een gepubliceerd versiepad wordt nooit iets teruggetrokken. Een slidetype dat met pensioen gaat, houdt het schema waarmee het gepubliceerd is, want het deck van iemand anders noemt het nog steeds.',
    ],

    contractTitle: 'Contracten, geen poortwachters',
    contractBody: [
      "Extra eigenschappen zijn toegestaan. De schema's documenteren de bekende vorm van een slide; ze wijzen de geschiedenis niet af. Een deck van voordat een veld bestond, valideert nog steeds, en een deck van na deze lezer ook.",
      'Dat is dezelfde inschikkelijkheid die de envelop heeft, om dezelfde reden: een formaat dat weigert wat het niet herkent, overleeft zijn eigen versies niet.',
    ],

    fetchTitle: 'Ze ophalen',
    fetchBody: [
      'Er zijn twee plekken om ze op te halen, en het verschil doet ertoe. De bestanden onder `{schemaBase}` zijn de gepubliceerde: de kern-slidetypes, op de URL die hun `$id` noemt, vast per schemaversie.',
      "De schema-endpoints op een draaiende installatie zijn net zo open en vragen ook geen inloggegevens, ook in de sandbox, en die worden op het moment van opvragen uit de registry van die installatie gegenereerd. Een installatie met extra slidetypes serveert daar dus ook schema's voor. Dat is voor die installatie het juiste antwoord, en een goede reden om ze op te halen bij de installatie waar je daadwerkelijk mee praat.",
    ],
    fetchRefNote: 'De endpoints staan, met een `curl` per stuk, in de documentatie.',
  },

  types: {
    metaTitle: 'Slidetypes - specificatie - Deckyard',
    metaDescription:
      'Elk ingebouwd slidetype van Deckyard: de vorm, de velden, de limieten en wanneer je het gebruikt. Gegenereerd uit de core-registry, zodat de lijst niet kan afdrijven.',
    heroKicker: 'Specificatie',
    heroTitle: 'Slidetypes',
    heroIntro:
      'De woordenschat waarin een deck geschreven is. Elk type declareert zijn eigen velden, en die declaratie is wat je hieronder ziet.',
    stats: [
      { value: '{count}', label: 'Ingebouwde types' },
      { value: '{audienceCount}', label: 'Waarbij de zaal meedoet' },
      { value: '1', label: 'Plek waar dit staat opgeschreven' },
    ],
    introBody: [
      'Een slidetype is een klein contract: een naam, een set velden en een vorm. Het is geen sjabloon dat je invult en daarna verschuift, en juist daarom kan hetzelfde deck op elk formaat renderen, op elk thema, naar HTML of PDF, en gelezen worden door iets dat geen mens is.',
      'De tekening op elke kaart is hetzelfde abstracte diagram dat de editor in zijn slidekiezer tekent, uit dezelfde beschrijving van de layout. Het toont structuur in plaats van een verkleinde schermafdruk, en dat is het enige wat op dit formaat leesbaar blijft.',
    ],

    structureTitle: 'Zes vormen, geen zesendertig losse dingen',
    structureBody: [
      'Een platte lijst types zegt niets over hoe ze zich tot elkaar verhouden, dus lijkt elk type iets aparts om te bouwen. Dat zijn ze niet. Elk type declareert een `structure`: de vorm van zijn primaire inhoud, los van waar de slide over gaat en hoe hij eruitziet. Zes waarden dekken ze allemaal, zonder restcategorie.',
      'Dit is de as om tegenaan te bouwen. De categorieën waar een editor types onder wegzet mengen bekendheid, payload en gedrag tijdens het presenteren; dat is meubilair. `structure` is af te leiden uit het veldschema, en dus kan een declaratie die liegt door een test worden betrapt. Core draait die test.',
    ],
    structureRule:
      'Een variant is een renderkeuze die elke geldige instantie van de inhoud zonder verlies overleeft. Een typegrens is waar inhoud toegevoegd of weggegooid moet worden.',
    structureRuleSource: 'De regel die bepaalt wanneer iets een type is en niet een layout.',
    structureContracts: {
      singleton:
        'Een vaste set losse velden. Lees de sleutels die het type declareert; er valt niets te herhalen.',
      collection:
        'Eén array met items die allemaal dezelfde vorm hebben. Loop de array af, render het item, herhaal. Die ene lus is het hele contract, hoeveel types hem ook gebruiken.',
      'fixed-collection':
        'Hetzelfde itemcontract als een collection, met een vast aantal, omdat dat aantal betekenis draagt: vier kwadranten is wat een matrix een matrix maakt.',
      tabular: 'Rijen met cellen. De rij is het item; de kolommen zijn posities daarbinnen.',
      dataset:
        'Datapunten plus een codering. De payload is een gecodeerd blok in plaats van benoemde velden, dus dit is de enige vorm die een renderer niet generiek kan aflopen.',
      chrome:
        'Helemaal geen inhoudsvelden. De slide is zijn eigen meubilair, dus er valt niets uit te lezen.',
    },
    structureCaveats: {
      'fixed-collection':
        'Twee hiervan houden zich er nog niet aan: `poll-slide` en `likert-slide` dragen `option1..optionN` als losse velden in plaats van een array, omdat ze de migratie die de andere collections kregen nooit gehad hebben. Core houdt ze bij in een open burndown; ze staan hier genoemd in plaats van stilletjes naar boven afgerond.',
    },
    structureCountLabel: '{n} types',
    structureCountOne: '1 type',
    structureItemsLabel: 'Itemvorm',
    structureNoItems: 'Alleen losse velden',

    structureLabels: {
      singleton: 'Singleton',
      collection: 'Collection',
      'fixed-collection': 'Fixed collection',
      tabular: 'Tabular',
      dataset: 'Dataset',
      chrome: 'Chrome',
    },
    filterAudienceLabel: 'De zaal doet mee',
    filterAudienceHint:
      'Types waarbij het publiek antwoordt, beoordeelt of meekijkt, in plaats van alleen toekijkt.',
    resultCount: '{n} types getoond',
    emptyResult: 'Geen types die aan die filters voldoen.',

    audienceBadge: 'Zaal',
    detailsLabel: 'Velden en detail',
    fieldsTitle: 'Velden',
    colKey: 'Sleutel',
    colType: 'Type',
    colRequired: 'Verplicht',
    colLimit: 'Limiet',
    colOptions: 'Opties',
    required: 'Ja',
    optional: 'Nee',
    noLimit: '—',
    itemFieldsNote: 'Herhaalt, elk item met:',
    variantsTitle: 'Layoutvarianten',
    bestForTitle: 'Pak dit als',
    notForTitle: 'Pak iets anders als',
    schemaLinkLabel: 'JSON Schema',
    identityLabel: 'Identiteit',

    conformanceTitle: 'Claim structuren, geen types',
    conformanceBody: [
      'Een tweede implementatie wil bijna nooit alle zesendertig, en had tot nu toe geen manier om dat te zeggen: of ze beweerde Deckyard-decks te lezen en viel stilletjes om op een grafiek, of ze zei niets en niemand kon nagaan wat ze deed. Structuren geven de claim een rand. Ondersteun je een structuur, dan ondersteun je elk type erin, want ze delen één contract.',
      'Een lezer die de structuur dekt die hij geclaimd heeft en voor de rest een benoemde placeholder toont, is een correcte gedeeltelijke implementatie en geen kapotte. Daar is het gespecificeerde degraderen van het formaat voor.',
    ],
    conformanceColStructure: 'Structuur',
    conformanceColTypes: 'Types gedekt',
    conformanceColClaim: 'Wat ondersteunen betekent',
    conformanceClaim: 'Leest alle {n}, zonder uitzondering per type.',
    conformanceExampleTitle: 'Hoe zo’n claim eruitziet',
    conformanceExample:
      'Leest het deck-formaat, slidestructuren `singleton` en `collection` ({n} van de {total} core-types). Andere structuren komen binnen als benoemde placeholder.',

    globalTitle: 'De velden die elk type meedraagt',
    globalBody: [
      'Negen velden worden aan elk slidetype toegevoegd in plaats van per type gedeclareerd: twee voor wat een schermlezer aankondigt, zes voor een achtergrondbeeld per slide en hoe dat behandeld wordt, en één voor het themalogo. Ze staan hier één keer in plaats van zesendertig keer hierboven.',
    ],

    deprecatedTitle: 'Uitgefaseerde types',
    deprecatedBody: [
      'Deze worden niet meer aangeboden als je een slide toevoegt, maar ze renderen nog wel, want decks die ze gebruiken bestaan nog steeds en een deck dat niet meer opengaat is een deck dat je kwijt bent. Ze hebben met opzet geen layouttekening: niets hoort je uit te nodigen er nog een te gebruiken.',
    ],
    deprecatedBadge: 'Uitgefaseerd',

    provenanceTitle: 'Waar deze pagina vandaan komt',
    provenanceBody: [
      'Niets op deze pagina is met de hand ingetikt. De lijst, het aantal, de labels, de veldtabellen, de limieten, de layouttekeningen en de "pak dit als"-regels worden uit de Deckyard-core-repo gegenereerd naar een databestand dat deze site leest, en dezelfde bronpaden worden bewaakt, zodat een wijziging in core hier als drift opduikt in plaats van als een pagina die stilletjes verouderde.',
      'Er stond eerst 36 op de ene plek, 38 op de andere en 44 op de derde. Dat is wat een handmatig bijgehouden getal doet.',
    ],
    referenceNote:
      'Dezelfde registry als één platte, doorzoekbare tabel - elk veld, elke limiet, elke optie, zonder de tekeningen - staat in de documentatie.',
  },
};
