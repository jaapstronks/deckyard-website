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
        title: 'Het formaat',
        blurb: "De envelop, de schema's en het archief dat een deck met zijn beelden meedraagt.",
      },
      'slide-types': {
        title: 'Slidetypes',
        blurb: 'Elk ingebouwd type, zijn vorm, zijn velden en wanneer je het pakt.',
      },
      conformance: {
        title: 'Conformance',
        blurb: 'Wat een tweede implementatie moet bouwen, en wat ze daarna mag claimen.',
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
        body: 'Een platte, leesbare envelop: een titel, een thema en een geordende reeks slides, elk met de naam van zijn type. Geen server-ids, geen timestamps, geen restanten van opslag. Je opent het in een teksteditor en je snapt wat er staat.',
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
      'Deckyard is open source, dus de implementatie was altijd al in te zien. Dat is een zwakkere belofte dan deze. Code vertelt je wat een programma vandaag doet; een specificatie vertelt je wat een bestand betekent, en dat is wat je nodig hebt als het programma er niet meer is.',
    ],

    claimsTitle: 'Wat er werkelijk ongebruikelijk aan is',
    claimsLead:
      'Genoeg tools exporteren JSON. Drie dingen hier zijn zeldzamer, en elk ervan is te controleren in plaats van te geloven.',
    claims: [
      {
        title: 'Eén bron voor de editor, de validatie, het schema en de agent',
        body: 'Een slidetype declareert zijn velden één keer. Diezelfde declaratie bouwt het formulier in de editor, valideert de inhoud, genereert het JSON Schema, en is wat een taalmodel via MCP krijgt aangereikt. Dit is geen specificatie die naast een implementatie wordt bijgehouden en er langzaam van afdrijft; hij valt uit de implementatie, en CI houdt de twee tegen elkaar aan.',
      },
      {
        title: 'Betekenis, geen geometrie',
        body: 'Een deck zegt "een tijdlijn met vier mijlpalen", nooit "een tekstvak op 312,88pt". Daarom kan hetzelfde deck responsief renderen, naar HTML en PDF exporteren en een ander thema aannemen zonder opnieuw getekend te worden. En daarom kan een machine erover nadenken: hetzelfde typecontract dat de slidekiezer aan een mens laat zien, is wat een model ontvangt.',
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
        def: 'Twee niveaus, opgeschreven: niveau 1 is de envelop en de zes structuurcontracten, niveau 2 voegt de negen normatieve slidetypes toe. Geen van beide groeit mee als er een slidetype bij komt.',
      },
    ],
  },

  format: {
    metaTitle: 'Het deckformaat - specificatie - Deckyard',
    metaDescription:
      "Het deckformaat, veld voor veld: de JSON-envelop, de gegenereerde schema's, en het op hash geadresseerde archief dat een deck samen met zijn beelden meedraagt.",
    heroKicker: 'Specificatie',
    heroTitle: 'Het deckformaat',
    heroIntro:
      'De draagbare, geversioneerde vorm waarin een presentatie wordt geserialiseerd, zodat een tweede implementatie hem kan lezen, renderen en round-trippen zonder de server of de opslag van Deckyard.',
    introBody: [
      'Een deck is data, geen rendering. Het formaat is met opzet eenvoudig: slides zijn een platte reeks van `{ type, content }`, en niets erin hangt af van de machine waar het vandaan komt.',
    ],

    envelopeTitle: 'De envelop',
    envelopeBody: ['Vijf velden op het hoogste niveau. Al het andere zit in `slides`.'],
    leniency:
      'De envelop is inschikkelijk. Onbekende sleutels op het hoogste niveau worden door een importeur genegeerd en nooit geweigerd, zodat een nieuwere schrijver een veld kan toevoegen dat een oudere lezer simpelweg overslaat.',
    envelopeRefNote:
      'Alle vijf velden staan uitgeschreven in de documentatie: hun type, en wat een lezer ermee hoort te doen.',

    slidesTitle: 'Slides, en de ene spelling van een type-id',
    slidesBody: [
      'Een slide is een type plus een content-object waarvan dat type de vorm bepaalt. Een afwezig of leeg veld betekent "niet ingevuld": een importeur vult de standaardwaarden van het type in en maakt een verplicht veld nooit leeg. Draagbare slides hebben geen id, want ids horen bij opslag en worden bij import opnieuw gegenereerd.',
      '`slides[].type` is de canonieke id van het type, en een type heeft er precies één: reverse-DNS voor een declarant met een domein (`eu.deckyard.slide.title`), `namespace/naam` voor een declarant zonder. De id noemt zelf al de definitie waartegen de slide geschreven is en mag een versie vastpinnen (`@2`), dus er is geen apart manifest om ernaast te leggen. Twee oudere spellingen - de kale registrysleutel `title-slide` en de gekwalificeerde `core/title-slide` - zijn restanten van vóór de convergentie, geen onderdeel van het formaat: Deckyard accepteert en normaliseert ze nog bij import, maar wat het exporteert is canoniek, en een tweede implementatie is ze niets verschuldigd.',
    ],

    schemaTitle: "Contentschema's",
    schemaBody: [
      'De contentvorm van elk slidetype wordt beschreven door een JSON Schema dat wordt gegenereerd uit dezelfde veldregistry die de validatie draait en het editorformulier bouwt. Eén declaratie, vier afnemers, en geen manier waarop een schema een vorm kan beschrijven die de software niet accepteert.',
      'Ze zijn geversioneerd via hun `$id`, en die draagt de versie van de contentvorm ({schemaVersion}), niet de envelopversie ({version}). `{schemaBase}/deck.schema.json` is het hele deck, `{schemaBase}/slide-types/<type>.schema.json` is één type, en `{schemaBase}/index.json` geeft je de lijst. Alle drie zijn ze op te halen: formeel hoeft een `$id` dat niet te zijn, maar voor een formaat dat je aan anderen aanbiedt als standaard hoort het toch.',
      "Extra eigenschappen zijn toegestaan. De schema's documenteren de bekende vorm van een slide; ze wijzen de geschiedenis niet af. Onder een gepubliceerd versiepad wordt ook nooit iets teruggetrokken, want een type dat hier met pensioen ging, wordt in het deck van iemand anders nog genoemd.",
    ],

    assetsTitle: 'Verwijzingen naar beelden',
    assetsBody: [
      'Afbeeldingen worden per string aangeduid. Een lokale upload is een serverpad en is alleen draagbaar zolang die server bereikbaar is. Een externe `https://`-URL is al draagbaar en wordt door elke transformatie met rust gelaten.',
    ],

    packageTitle: 'Het pakket: een deck met zijn pixels',
    packageLead:
      'Waar de JSON-export nog naar plaatjes op een server wijst, draagt het pakket zijn eigen pixels mee. Het rendert en round-trript op een machine die de installatie waar het vandaan komt nooit gezien heeft, en het kan precies opsommen welke bestanden erin zitten.',
    packageBody: [
      'De indeling is gemodelleerd op OCF, de verpakking die EPUB gebruikt, en om dezelfde reden: een ZIP waarvan de eerste ingang een ongecomprimeerd mediatype is, valt te herkennen aan een magic number voordat er iets is uitgepakt. Vier ingangen, in deze volgorde.',
    ],
    layoutNotes: {
      mimetype: 'Eerste ingang, ongecomprimeerd opgeslagen, met precies `{mime}` erin.',
      manifest:
        'Metadata van het pakket en de volledige inventaris van de beelden. De oorspronkelijke bestandsnamen blijven erin staan, zodat hash-churn nooit in de leesbare structuur lekt, en meerdere bronnen bij één hash betekent dat dezelfde bytes vanaf meerdere plekken werden gebruikt.',
      deck: 'De draagbare envelop, met elke verwijzing naar een beeld herschreven naar een plek in het archief.',
      assets:
        'De bytes van de beelden, geadresseerd op de SHA-256 van hun eigen inhoud. Identieke bytes worden één keer opgeslagen.',
    },
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
    packageRefNote:
      'Elk veld in het manifest, en wat de import ermee doet, staat uitgeschreven in de documentatie.',

    degradeTitle: 'Wat gegarandeerd is, en wat lossy',
    degradeLead:
      'Voor slides met inhoud is export naar import naar export een vast punt: na één normalisatieslag is de draagbare projectie stabiel, en identieke bytes hashen naar identieke adressen. Een test in de core-repo bewijst dat bij elke run tegen een meegeleverd voorbeelddeck. Twee randen zijn bewust wel lossy, en allebei zijn ze gespecificeerd zodat ze degraderen in plaats van crashen - en dat is precies wat het formaat veilig maakt om tegenaan te bouwen.',
    degrade: [
      {
        term: 'Onbekend slidetype',
        def: 'Importeert als plaatshouder die zegt welk type niet gevonden werd, of dat type bewust is uitgefaseerd en wat ervoor in de plaats komt, en die de oorspronkelijke inhoud als tekst meeneemt.',
      },
      {
        term: 'Ontbrekend lokaal beeld',
        def: "Behoudt zijn oorspronkelijke verwijzing en importeert als losse verwijzing. Onschadelijk, en zichtbaar in plaats van stil. Beelden die aan een thema hangen neemt het pakket ook niet mee, net zomin als externe URL's: het eerste is een bekend gat, het tweede is een keuze, want een `https://`-URL is al draagbaar.",
      },
    ],

    securityTitle: 'Een deck is niet inert',
    securityBody: [
      'Het grootste deel van het formaat is data die een lezer kan renderen zonder iets uit te voeren. Twee slidetypes niet: `custom-html-slide` draagt HTML die een auteur geschreven heeft, en `embed-slide` draagt een URL die in een frame komt te staan. Een deck is dus actieve inhoud, en een bestand van iemand anders veilig noemen omdat het valideert is de verkeerde conclusie.',
      'Wat daaruit volgt is een plicht voor wie het formaat leest, geen eigenschap ervan: saneer auteurs-HTML voordat die een document bereikt, en isoleer ingesloten URLs in een frame dat niet bij de pagina eromheen kan. De pakketlaag verandert daar niets aan. Adressering op hash bewijst dat de bytes de ingepakte bytes zijn; over de vraag of ze veilig zijn om uit te voeren zegt het niets.',
    ],

    versioningTitle: 'Versionering',
    versioningBody: [
      '`version` is de envelopversie. Die beweegt alleen bij een breaking wijziging aan de vorm van de envelop, en hij heeft nog niet bewogen. De inhoud van slides is apart geversioneerd, gekoppeld aan een schemaversie met een eigen migratieloop. Het model is nbformat uit Jupyter: een lezer valideert tegen de versie die hij kent, en het inschikkelijke contract laat hem sleutels uit een nieuwere versie verdragen.',
    ],
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
      'Een slidetype is een klein contract: een naam, een set velden en een vorm. Het is geen sjabloon dat je invult en daarna verschuift, en juist daarom kan hetzelfde deck op elk formaat renderen, op elk thema, naar HTML of PDF, en gelezen worden door iets dat geen mens is. De tekening op elke kaart is hetzelfde abstracte diagram dat de editor in zijn eigen slidekiezer tekent, uit dezelfde beschrijving van de layout.',
    ],

    structureLead:
      'De grid is gegroepeerd op de `structure` die elk type declareert: de vorm van zijn primaire inhoud, los van waar de slide over gaat en hoe hij eruitziet. Zes waarden dekken ze allemaal, zonder restcategorie, en dit is de as waar een tweede implementatie tegenaan bouwt - ondersteun je een structuur, dan ondersteun je elk type erin.',
    structureContracts: {
      singleton:
        'Een vaste set losse velden. Lees de sleutels die het type declareert; er valt niets te herhalen.',
      collection:
        'Eén array met items die allemaal dezelfde vorm hebben. Loop de array af, render het item, herhaal.',
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
        'Twee hiervan houden zich er nog niet aan: `poll-slide` en `likert-slide` dragen `option1..optionN` als losse velden in plaats van een array, omdat ze de migratie die de andere collections kregen nooit gehad hebben. Ze staan hier genoemd in plaats van stilletjes naar boven afgerond.',
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
      'Types waarbij het publiek antwoordt, beoordeelt of meedoet, in plaats van alleen toekijkt.',
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

    runtimeTitle: 'Wat er achter een slide moet draaien',
    runtimeLead:
      'Een type declareert ook een `runtime`: wat de presenterende sessie voor dat type moet doen, bovenop het serveren van de slide. Dit is het facet dat bepaalt of een lezer überhaupt een server nodig heeft, en het grootste deel van de catalogus vraagt niets.',
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

    globalTitle: 'De velden die elk type meedraagt',
    globalBody: [
      'Negen velden worden aan elk slidetype toegevoegd in plaats van per type gedeclareerd: twee voor wat een schermlezer aankondigt, zes voor een achtergrondbeeld per slide en hoe dat behandeld wordt, en één voor het themalogo.',
    ],

    deprecatedTitle: 'Uitgefaseerde types',
    deprecatedBody: [
      'Deze worden niet meer aangeboden als je een slide toevoegt, maar ze renderen nog wel, want decks die ze gebruiken bestaan nog steeds en een deck dat niet meer opengaat is een deck dat je kwijt bent. Ze hebben met opzet geen layouttekening: niets hoort je uit te nodigen er nog een te gebruiken.',
    ],
    deprecatedBadge: 'Uitgefaseerd',

    liveNote: 'Het schema van elk type wordt ook live geserveerd, door elke draaiende installatie:',
    referenceNote:
      'Niets op deze pagina is met de hand ingetikt: de lijst, de aantallen, de veldtabellen en de tekeningen worden uit de core-registry gegenereerd. Dezelfde registry als één platte, doorzoekbare tabel staat in de documentatie.',
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
      'Het punt van de splitsing is dat geen van beide niveaus meegroeit met het aantal slidetypes. Een lezer die negen typecontracten leert, kent negen dingen en is verouderd op de dag dat er een tiende gepubliceerd wordt. Een lezer die zes structuurcontracten leert, kan een type renderen dat nog niet bestond toen hij gebouwd werd.',
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
      '**`collection` en `fixed-collection` verschillen alleen in of het aantal betekenis draagt.** Precies daarom zijn het twee structuren en niet één: een lijst van zes mag je in twee kolommen herschikken, een vierkwadrantenmatrix mag je niet tot drie terugbrengen. `dataset` is de enige structuur waarvan de payload niet te controleren is, en het contract zegt dat ook, in plaats van een lezer er zelf een degradatie bij te laten verzinnen.',
    ],

    profileTitle: 'De negen die een belofte dragen',
    profileLead:
      'Negen namen zijn normatief. De overige types die Deckyard shipt, worden gepubliceerd en gedocumenteerd maar versioneren mee met de app, en een type uit een fork draagt de belofte van zijn declarant en niet die van ons. Een tier is een eigenschap van de naam, niet van de definitie: een fork die `title-slide` overschrijft, erft de tier-1-belofte, want dat is wat het kiezen van die naam betekent.',
    profileCriterion:
      'De keuze is een criterium, geen smaak: dit is de minimale verzameling om een gewone presentatie zonder verlies uit te drukken - titel, sectiebreuk, proza, opsomming, citaat, beeld, beeld-met-tekst, tabel, afsluiting. Alles daarbuiten voegt expressiviteit toe die binnen de negen een aanvaardbare degradatie heeft, en dat is ook waarom er geen grafiektype in zit: een profiel dat een charting-runtime eist, is geen instapdrempel meer.',

    mapTitle: 'Elk ander type degradeert naar één van die negen',
    mapLead:
      'Dit is de regel die de negen iets waard maakt: **elk tier-2-type declareert een `fallback` naar een tier-1-type.** Een funnel valt terug op een lijst, een gallery op beelden, een grafiek op een tabel. Zo rendert een lezer die alleen de negen kent élk Deckyard-deck zonder inhoud te laten vallen.',
    mapDegradeLabel: '{n} degraderen hiernaartoe',
    mapNote:
      'De `fallback` noemt een tier-1-contract, geen één-op-één slidewissel. Een gallery die terugvalt op `image-slide` betekent "deze inhoud is beeld, render het zoals je beeld rendert", en een lezer mag er meer dan één slide van maken.',
    mapGapLabel: 'Declareert geen fallback',

    ruleTitle: 'De evolutieregel',
    rule: 'Binnen een naam alleen toevoegen. Betekenis wijzigen is een naam wijzigen.',
    ruleLead:
      'Normatief, en geldig voor elke gepubliceerde naam: een slidetype, een contentsleutel, een envelopsleutel, een enum-waarde. Deckyard migreert zijn eigen opslag vooruit, maar een lezer die wij niet bezitten draait onze migratieketen niet, dus voor alles wat gepubliceerd is, is een migratie geen reparatie. De twee blokken hieronder maken dezelfde wijziging aan hetzelfde type, en maar één van de twee houdt elk ooit geschreven deck geldig.',
    ruleOkLabel: 'Mag',
    ruleOkCaption: 'Een nieuwe optionele sleutel. Elk bestaand deck blijft geldig.',
    ruleBadLabel: 'Mag niet',
    ruleBadCaption:
      'Een nieuwe verplichte sleutel. Elk bestaand deck is met terugwerkende kracht ongeldig.',
    duties: [
      'Een gepubliceerde naam MOET zijn betekenis houden zolang hij bestaat. Moet de betekenis veranderen, dan verandert de naam, en de oude wordt eerst deprecated in plaats van stilletjes weggehaald.',
      'Optionele sleutels MOGEN altijd worden toegevoegd. Een nieuwe **verplichte** sleutel MAG NIET aan een gepubliceerd type worden toegevoegd: dat maakt elk bestaand deck met terugwerkende kracht ongeldig, en het is een hernoeming die zich voordoet als compatibel. Een waardenruimte verbreden is additief; **versmallen is dat niet.**',
      'Een lezer MOET sleutels negeren die hij niet kent, op elk niveau - envelop, slide, content, item - en MAG een deck niet afwijzen omdat het ze bevat.',
      'Een lezer MOET type-ids vergelijken als strings, na het afknippen van een optioneel achtervoegsel `@version`: één type heeft één id, en er is geen aliastabel om te leren. De twee oudere spellingen van een core-id - de kale `title-slide` en de gekwalificeerde `core/title-slide` - zijn restanten van vóór de convergentie en geen onderdeel van het formaat; een lezer is ze niets verschuldigd en MAG ze als onbekend type behandelen, wat het onbekend-type-contract zonder verlies rendert. Het achtervoegsel `@version` is een compatibiliteitshint over een definitie, geen ander type, dus `eu.deckyard.slide.title@2` MAG niet als onbekend gelden.',
    ],

    unknownTitle: 'Een type dat je lezer nooit gezien heeft',
    unknownLead:
      'Dit is wat "er valt niets weg" betekent op het lastigste punt: een type waarvoor je helemaal geen declaratie hebt, uit een fork die je nooit gezien hebt. Het is een vastgelegde rendering, geen foutpad, en het is het laatste redmiddel - een type waarvan je de declaratie wél hebt maar dat je niet geïmplementeerd hebt, gaat via zijn `structure` of zijn gedeclareerde `fallback`.',
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
        body: 'in de volgorde waarin de sleutels in `content` staan - een producent schrijft ze in de gedeclareerde veldvolgorde, dus dat is de volgorde van de auteur. Een lezer wiens parser die volgorde niet bewaart, MOET een stabiele volgorde kiezen in plaats van een willekeurige. De lege string betekent niet-ingevuld en MAG worden overgeslagen.',
      },
      {
        must: 'MOET elk element van een array-waarde als een herhaald item renderen,',
        body: 'in arrayvolgorde, met regel 2 binnen elk element. Dat is het `collection`-contract: herschikken mag, herordenen of afkappen niet.',
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

    referenceNote:
      'De uitputtende tabellen - elk envelopveld, elk manifestveld, elk slidetype met zijn facetten - staan in de documentatie, de helft die de zoekfunctie van de site indexeert.',
  },
};
