import type { SpecContent } from '@/i18n/types';

export const spec: SpecContent = {
  shared: {
    moreTitle: 'De rest van de specificatie',
    pages: {
      index: {
        title: 'Het Deckyard-deckformaat',
        blurb: 'Wat het is, uit welke twee lagen het bestaat en wat je ermee mag.',
      },
      conformance: {
        title: 'Conformance',
        blurb: 'Wat een tweede implementatie moet bouwen, en wat ze daarna mag claimen.',
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
        def: 'Twee niveaus, opgeschreven: niveau 1 is de envelop, de zes structuurcontracten en het onbekend-type-contract; niveau 2 voegt de negen normatieve slidetypes toe. Geen van beide groeit mee als er een slidetype bij komt. Wat je met elk niveau mag zeggen, staat op de conformance-pagina.',
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
    tierLabel: 'Tier',
    runtimeLabel: 'Runtime',
    fallbackLabel: 'Valt terug op',

    runtimeTitle: 'Het tweede facet: wat er achter een slide moet draaien',
    runtimeBody: [
      'Een type declareert ook een `runtime`: wat de presenterende sessie voor dat type moet doen, bovenop het serveren van de slide. Dat is een andere vraag dan `structure`, en het is degene die bepaalt of een lezer überhaupt een server nodig heeft.',
      'Anders dan `structure` is dit facet gemeten in plaats van ontworpen. Negen modules in core schreven dezelfde vier typenamen uit om één vraag te beantwoorden: verzamelt deze slide antwoorden uit de zaal? Ze waren aan de randen al uit elkaar gaan lopen. Geen van de negen wilde weten wélk type het was; ze wilden een eigenschap die het type niet declareerde.',
    ],
    runtimeLabels: {
      static: 'Statisch',
      timed: 'Met klok',
      live: 'Live',
    },
    runtimeContracts: {
      static:
        'De sessie doet er niets voor. De slide mag zelf best gedrag in de browser hebben; dat is de zaak van de slide, niet van de sessie.',
      timed:
        'De presentator draait een klok op de slide. De timerstand leeft in het presentatievenster; de sessie bewaart of aggregeert hem niet.',
      live: 'De zaal antwoordt, en de sessie verzamelt en aggregeert die antwoorden als toestand die de presentator opent en sluit.',
    },
    runtimeEdge:
      'De grens ligt bij sessietoestand, niet bij "heeft gedrag", zodat de lastige gevallen uit de definitie volgen in plaats van stuk voor stuk beslecht te worden. `countdown-slide` is `timed`: een klok, geen zaal. `lead-capture-slide` is `static`, ook al verzamelt het duidelijk iets uit de zaal, want de inzendingen gaan via een eigen endpoint naar leadopslag en bereiken de sessie nooit. `follow-invite-slide` is dat ook: die rendert de deelnamecode die de sessie heeft uitgegeven, en dat is invoer voor de rendering, geen toestand die de sessie bijhoudt.',

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
    conformanceLinkLabel: 'Bouw de claim voor je eigen lezer',
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

  conformance: {
    metaTitle: 'Conformance - specificatie - Deckyard',
    metaDescription:
      'Wat een tweede implementatie moet bouwen om te kunnen zeggen dat ze Deckyard-decks leest: twee conformance-niveaus, zes itemcontracten, negen normatieve slidetypes en een vastgelegd contract voor een type dat ze nooit gezien heeft.',
    heroKicker: 'Specificatie',
    heroTitle: 'Wat er nodig is om een Deckyard-deck te lezen',
    heroIntro:
      'Een formaat publiceren is een belofte doen, en een belofte zonder grens is er geen. Deze pagina trekt die grens: wat je moet bouwen, wat je daarna mag zeggen dat je ondersteunt, en wat er gebeurt op elk punt waar je lezer iets tegenkomt dat hij niet kent.',

    levelsTitle: 'Conformance kent twee niveaus',
    levelsLead:
      'Het punt van de splitsing is dat niveau 1 niet meegroeit met het aantal slidetypes. Een lezer die negen typecontracten leert, kent negen dingen en is verouderd op de dag dat er een tiende gepubliceerd wordt. Een lezer die zes structuurcontracten leert, kan een type renderen dat nog niet bestond toen hij gebouwd werd.',
    levels: [
      {
        badge: 'Niveau 1',
        name: 'Structuur',
        implement:
          'De envelop, de zes `structure`-contracten, en het gedrag bij een type dat je niet herkent.',
        claim: 'Leest Deckyard-decks',
        body: 'Elk deck rendert en er valt niets weg. Sommige slides renderen generiek in plaats van zoals ze geschreven zijn, en dat is een degradatie die je zelf hebt aangekondigd, geen storing die de lezer ontdekt.',
      },
      {
        badge: 'Niveau 2',
        name: 'Core-profiel',
        implement: 'Niveau 1, plus de veldcontracten van de negen tier-1-types, plus `fallback`.',
        claim: 'Rendert het Deckyard-core-profiel',
        body: 'Elk deck rendert zoals het geschreven is, op de degradatie na die elk type voor zichzelf declareert. Dit is het realistische doel: een weekend werk, geen catalogus.',
      },
    ],
    levelsNote:
      'Geen van beide niveaus vraagt om alle types. Dat is het hele ontwerp: een conformance-claim die groeit zodra iemand een slidetype toevoegt, is een claim die niemand kan waarmaken.',

    builderTitle: 'De claim die je mag publiceren',
    builderLead:
      'Vink aan wat je werkelijk rendert. De zin eronder is degene die je in je eigen documentatie mag zetten, en de getallen erachter zijn geteld op de gepubliceerde registry, niet geschat.',
    builderStructuresLabel: 'Structuren die je rendert',
    builderProfileLabel: 'De negen tier-1-types, veld voor veld',
    builderProfileHint:
      'Hun eigen veldcontracten, niet alleen hun structuur. Dit is wat niveau 2 van niveau 1 scheidt.',
    builderCoverage: '{n} van {total}',
    builderCoverageLabel: 'rendert zoals geschreven',
    builderDegradeLabel: 'degradeert via een gedeclareerde fallback of het onbekend-type-contract',
    builderClaimLabel: 'Wat je mag zeggen',
    builderClaimNone:
      'Nog niets. Een lezer die geen enkele structuur rendert, kan niet claimen dat hij het formaat leest.',
    builderClaimStructures:
      'Leest het Deckyard-deckformaat. Slidestructuren {structures} renderen zoals geschreven ({n} van de {total} types); elke andere slide rendert via het onbekend-type-contract.',
    builderClaimProfile:
      'Rendert het Deckyard-core-profiel. Slidestructuren {structures} renderen zoals geschreven ({n} van de {total} types); elke andere slide degradeert via zijn gedeclareerde fallback.',
    builderStaticNote:
      'Met scripting aan bouwt deze pagina de zin voor je. Zonder: noem de structuren die je rendert, tel op de slidetypepagina hoeveel types dat zijn, en zeg waar de rest naar degradeert.',

    contractTitle: 'De zes itemcontracten',
    contractLead:
      'Elk slidetype declareert één structure, en die declaratie is de interop-valuta: ze zegt wat de content bevat, of het aantal iets betekent, en wat een lezer die verder niets van het type weet ermee mag doen.',
    contractCarriesLabel: 'De content bevat',
    contractCountLabel: 'Het aantal betekent',
    contractReaderLabel: 'Een lezer die alleen dit kent',
    contractTypesLabel: 'Types die het declareren',
    contractExampleLabel: 'Hoe dat eruitziet',
    contracts: {
      singleton: {
        carries: 'Geen herhaalde array.',
        count: 'Niets te tellen.',
        reader: 'Rendert de benoemde velden, in declaratievolgorde.',
      },
      collection: {
        carries: 'Precies één array met items.',
        count: 'De keuze van de auteur.',
        reader:
          'Itereert. Herschikken, pagineren of over slides splitsen mag; herordenen of afkappen niet.',
      },
      'fixed-collection': {
        carries: 'Precies één array, met `minItems === maxItems`.',
        count: 'Onderdeel van de betekenis van het type.',
        reader:
          'Itereert, maar laat nooit items weg en vult nooit bij om een layout te laten passen. Vier kwadranten is wat een matrix een matrix maakt.',
      },
      tabular: {
        carries: 'Precies één array met items: de rijen.',
        count: 'De keuze van de auteur.',
        reader:
          'Behandelt items als rijen en itemsleutels als kolommen, met een gedeelde kolomverzameling.',
      },
      dataset: {
        carries: 'Een gecodeerde payload plus de codering.',
        count: 'Zit in de payload.',
        reader:
          'Decodeert naar rijen en valt terug op `tabular`. Alleen de visuele codering gaat verloren.',
      },
      chrome: {
        carries: 'Helemaal geen contentvelden.',
        count: 'Niets te tellen.',
        reader: 'Rendert de beat die de slide inneemt, of laat de slide weg. Allebei verliesvrij.',
      },
    },
    contractNotes: [
      '**`collection` en `fixed-collection` verschillen alleen in of het aantal betekenis draagt.** Precies daarom zijn het twee structuren en niet één: een lijst van zes mag je in twee kolommen herschikken, een vierkwadrantenmatrix mag je niet tot drie terugbrengen.',
      '**`dataset` is de enige structuur waarvan de payload niet te controleren is.** Het contract zegt dat ook, in plaats van te doen alsof, en benoemt de degradatie in plaats van een lezer er zelf een te laten verzinnen.',
    ],

    tiersTitle: 'Drie tiers, één normatief',
    tiersLead:
      'De herformulering die een gepubliceerde typeverzameling draaglijk maakt, is niet "welke types halen we weg" maar "welke types beloven we". Weghalen is destructief en onomkeerbaar zodra een naam eenmaal buiten staat; een tier is gratis en omkeerbaar. Er is dus niets weggehaald.',
    tiers: [
      {
        badge: 'Tier 1',
        name: 'Core-profiel',
        what: 'Negen types.',
        promise: 'Normatief. Wat een conforme implementatie rendert.',
      },
      {
        badge: 'Tier 2',
        name: 'Deckyard-set',
        what: 'De overige types die wij shippen.',
        promise: 'Wij publiceren en documenteren ze, maar ze versioneren mee met de app.',
      },
      {
        badge: 'Tier 3',
        name: 'Extensie',
        what: 'Fork-types, org-types, types van derden.',
        promise:
          'De belofte van de declarant, niet die van ons. Wij beloven er niets over, en we negeren ze niet.',
      },
    ],
    profileTitle: 'De negen',
    profileLead:
      'Een tier is een eigenschap van de naam, niet van de definitie. Een fork die `title-slide` overschrijft, beantwoordt een tier-1-naam en erft de tier-1-belofte; dat is wat het kiezen van die naam betekent.',
    profileCriterion:
      'De keuze is een criterium, geen smaak: dit is de minimale verzameling om een gewone presentatie zonder verlies uit te drukken - titel, sectiebreuk, proza, opsomming, citaat, beeld, beeld-met-tekst, tabel, afsluiting. Alles daarbuiten voegt expressiviteit toe die binnen de negen een aanvaardbare degradatie heeft.',
    profileNoChart:
      'Een grafiektype staat er bewust niet in. Het vereist een grafiekbibliotheek, en het slaagcriterium voor een tweede implementatie is een weekend werk; een profiel dat een charting-runtime eist, is geen instapdrempel meer.',

    mapTitle: 'Elk ander type degradeert naar één van die negen',
    mapLead:
      'Dit is de regel die de tiers iets waard maakt: **elk tier-2-type declareert een `fallback` naar een tier-1-type.** Een funnel valt terug op een lijst, een gallery op beelden, een grafiek op een tabel. Zo rendert een lezer die alleen de negen kent élk Deckyard-deck zonder inhoud te laten vallen.',
    mapDegradeLabel: '{n} degraderen hiernaartoe',
    mapNote:
      'De `fallback` noemt een tier-1-contract, geen één-op-één slidewissel. Een gallery die terugvalt op `image-slide` betekent "deze inhoud is beeld, render het zoals je beeld rendert", en een lezer mag er meer dan één slide van maken.',
    mapGapLabel: 'Declareert geen fallback',

    idTitle: 'Eén identiteit, drie spellingen',
    idLead:
      'De canonieke id is reverse-DNS: wie het domein bezit, mag het type definiëren, en daarmee zijn conflicten structureel uitgesloten in plaats van sociaal geregeld. Het achtervoegsel -slide gaat van de canonieke naam af, want "slide" staat al in de autoriteit.',
    idColSpelling: 'Spelling',
    idColExample: 'Voorbeeld',
    idColWhere: 'Waar je hem tegenkomt',
    idSpellings: [
      {
        spelling: 'Canoniek reverse-DNS',
        where:
          'Het `slideTypes`-manifest, `GET /api/slide-types`, alles wat nieuw gepubliceerd wordt.',
      },
      {
        spelling: 'Gekwalificeerd',
        where: 'Decks die tegen het eerdere identiteitsmodel geschreven zijn.',
      },
      {
        spelling: 'Kale sleutel',
        where: '`slides[].type`, in elk deck, toen en nu.',
      },
    ],
    idExampleCaption:
      'Eén slide, drie manieren om zijn type te noemen. Een lezer MOET alle drie accepteren.',
    idStorage:
      '**Opslag is niet verhuisd.** `slides[].type` bevat nog steeds de kale sleutel, dus de hernoeming heeft geen enkel deck een herschrijving gekost en er valt niets te migreren. Een lezer MOET de drie spellingen als één identiteit behandelen; het gepubliceerde JSON Schema legt aan alle drie hetzelfde contentcontract op.',
    idVersion:
      'Het achtervoegsel `@version` is een compatibiliteitshint over een definitie, geen ander type. Een lezer die de genoemde versie niet heeft, rendert de versie die hij wel heeft, en MAG `title-slide@2` niet als onbekend type behandelen.',

    ruleTitle: 'De evolutieregel',
    rule: 'Binnen een naam alleen toevoegen. Betekenis wijzigen is een naam wijzigen.',
    ruleLead:
      'Normatief, en geldig voor elke gepubliceerde naam: een slidetype, een contentsleutel, een envelopsleutel, een enum-waarde. De twee blokken hieronder wijzigen hetzelfde type op wat een gelijke manier lijkt, en maar één ervan laat elk ooit geschreven deck geldig.',
    ruleOkLabel: 'Mag',
    ruleOkCaption: 'Een nieuwe optionele sleutel. Elk bestaand deck blijft geldig.',
    ruleBadLabel: 'Mag niet',
    ruleBadCaption:
      'Een nieuwe verplichte sleutel. Elk bestaand deck is met terugwerkende kracht ongeldig.',
    producerTitle: 'Wat een producent verschuldigd is',
    producer: [
      'Een gepubliceerde naam MOET zijn betekenis houden zolang hij bestaat. Moet de betekenis veranderen, dan verandert de naam en gaat de oude de deprecatie-ladder af.',
      'Optionele sleutels MOGEN altijd worden toegevoegd. Een nieuwe **verplichte** sleutel MAG NIET aan een gepubliceerd type worden toegevoegd: dat maakt elk bestaand deck met terugwerkende kracht ongeldig, en dat is een hernoeming die zich voordoet als compatibel.',
      'Een waardenruimte verbreden is additief (een nieuwe enum-waarde, een nieuwe spelling van een type-id). **Versmallen is dat niet** en vraagt een nieuwe naam.',
      'Er verdwijnt niets stilletjes. Een naam die weggaat, wordt eerst deprecated, en tier 1 valt onder de staande stabiliteitsbelofte.',
    ],
    readerTitle: 'Wat een lezer verschuldigd is',
    reader: [
      'Een lezer MOET sleutels negeren die hij niet kent, op elk niveau (envelop, slide, content, item), en MAG een deck niet afwijzen omdat het ze bevat.',
      'Een lezer MOET een `type` accepteren dat hij niet kent, en het renderen volgens het contract hieronder.',
    ],
    ruleWhyTitle: 'Waarom dit migratievrijheid vervangt',
    ruleWhy: [
      'Deckyard heeft een migratieketen omdat het beide kanten van de lijn bezit: een oud deck wordt gelezen, in het geheugen vooruit gemigreerd, en in de huidige vorm teruggeschreven. Die vrijheid stopt bij onze eigen opslag. **Een lezer die wij niet bezitten, draait onze migratieketen niet.** Voor alles wat gepubliceerd is, is een migratie dus geen reparatie maar een breuk die wij toevallig overleven.',
      'De regel is wat we voor die vrijheid terugkrijgen, en hij is meer waard: hij is de reden dat een lezer die vandaag geschreven wordt over drie jaar nog werkt zonder onze releases te volgen. De vorm is bewust geleend van atproto’s Lexicon - hetzelfde probleem, hetzelfde antwoord, en geen reden om er een tweede dialect van te verzinnen.',
    ],

    unknownTitle: 'Een type dat je lezer nooit gezien heeft',
    unknownLead:
      'Dit is wat "er valt niets weg" betekent op het lastigste punt: een type waarvoor je helemaal geen declaratie hebt, uit een fork die je nooit gezien hebt. Het is een vastgelegde rendering, geen foutpad.',
    unknownInCaption: 'Een slide uit een fork die je niet kent',
    unknownOutCaption: 'Wat een conforme lezer toont',
    unknownOutBadge: 'Onbekend type',
    unknownOutNote:
      'Elke string in auteursvolgorde, elk array-element als herhaald item, de typenaam op de slide, en de presentatienotitie gehonoreerd omdat het een envelopsleutel is die niet van het type afhangt.',
    unknownRules: [
      {
        must: 'MOET de slide renderen.',
        body: 'Weglaten verandert stilzwijgend het aantal slides, de nummering en het betoog dat het deck voert. Een lezer MAG het deck ook niet afwijzen: één onbekend type maakt een deck niet ongeldig.',
      },
      {
        must: 'MOET elke stringwaarde in `content` als tekst renderen,',
        body: 'in de volgorde waarin de sleutels in `content` staan - een producent schrijft ze in de gedeclareerde veldvolgorde, dus dat is de volgorde van de auteur. Een lezer wiens parser die volgorde niet bewaart, MOET een stabiele volgorde kiezen (alfabetisch volstaat) in plaats van een willekeurige. Niet-string-scalairen renderen als hun tekstvorm; de lege string betekent niet-ingevuld en MAG worden overgeslagen.',
      },
      {
        must: 'MOET elk element van een array-waarde als een herhaald item renderen,',
        body: 'in arrayvolgorde, met regel 2 binnen elk element. Dat is het `collection`-contract, de eerlijke lezing van een array waarvan de betekenis onbekend is: herschikken mag, herordenen of afkappen niet.',
      },
      {
        must: 'MOET de typenaam tonen,',
        body: 'zoals die in `type` staat, op of naast de slide. Een kijker moet een generieke rendering van een geschreven rendering kunnen onderscheiden; stil mooie uitvoer is precies hoe "wij ondersteunen Deckyard" onwaar wordt zonder dat iemand het merkt.',
      },
      {
        must: 'MOET de globale slidesleutels honoreren die hij al kent',
        body: '- notities, duur, zichtbaarheid, en de toegankelijkheids- en achtergrondsleutels. Die zijn envelopniveau en hun betekenis hangt niet van het type af.',
      },
      {
        must: 'ZOU de slide in het thema van het deck moeten renderen,',
        body: 'zodat een onbekend type leest als een gewone slide en niet als kapotte software.',
      },
      {
        must: 'MAG geen inhoud verzinnen.',
        body: 'Geen bedachte koppen, geen ingevulde gaten, geen herordening. Minder getrouw renderen dan de auteur schreef is een degradatie; iets renderen dat de auteur niet schreef is een fout.',
      },
    ],
    unknownNested:
      'Een waarde die geen scalair is en ook geen array of object van scalairen - een geneste payload die een lezer niet kan interpreteren - MAG worden weggelaten. Regel 7 gaat voor volledigheid.',
    precedenceTitle: 'En het is het laatste redmiddel, niet het eerste',
    precedenceLead:
      'Drie gevallen, in volgorde. Het meeste wat op een onbekend type lijkt, is in werkelijkheid een bekend type dat je niet geïmplementeerd hebt, en dat geval heeft een beter antwoord.',
    precedenceColHas: 'De lezer heeft',
    precedenceColDoes: 'Hij doet',
    precedence: [
      { has: 'Het type, geïmplementeerd', does: 'Rendert het native.' },
      {
        has: 'De declaratie maar geen implementatie',
        does: 'Gebruikt `structure` plus het itemcontract, of de gedeclareerde `fallback`.',
      },
      { has: 'Niets dan de slide', does: 'De zeven regels hierboven.' },
    ],

    referenceNote:
      'De uitputtende tabellen - elk envelopveld, elk manifestveld, elk slidetype met zijn facetten - staan in de documentatie, de helft die de zoekfunctie van de site indexeert.',
  },
};
