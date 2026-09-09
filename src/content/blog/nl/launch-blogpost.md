---
title: 'Open source, vrij en automatiseerbaar: laten we presentaties anders gaan doen'
intro: 'Presentaties kosten uren omdat een PowerPoint geen document is maar een tekening. Elke tool, ook de nieuwe AI-generatie, bouwt op die tekening door. Deckyard begint aan de andere kant: bij een open, gestructureerd formaat dat je meeneemt. En zoekt nu organisaties voor een pilot.'
pubDate: 2026-09-09
category: 'Bouwen in de openbaarheid'
tags: ['launch']
draft: true
---

<!-- Redactienotities: (1) Het wachtlijstformulier onder de post heeft een vinkje "ik wil meedoen aan de pilot"; wie het aanvinkt komt op de Listmonk-lijst "Deckyard pilot". (2) De twee codeblokken in "geen document" zijn vereenvoudigd; de PowerPoint-XML is echt nog veel langer. -->

Dit is de eerste blogpost over Deckyard, en ik schrijf hem zelf. Dat zeg ik er maar meteen bij, want een aankondiging van een presentatietool die "anders" wil zijn, kan tegenwoordig ook gewoon uit een model zijn gerold. Deze niet. Waar ik in de rest van dit stuk naartoe wil: we steken met z'n allen belachelijk veel tijd in presentaties, dat komt door het formaat waarin we ze maken, en dat formaat is te vervangen.

## Wat het kost

Een goede presentatie maken kost een dag. Soms meer. Dat geldt voor mij, en ik zie het bij iedereen om me heen: het deck voor het bestuur, de toelichting voor een subsidiegever, de verantwoording aan het eind van een project. In de kenniseconomie is de presentatie stiekem een van de belangrijkste dingen die we maken. We leggen er onze ziel en zaligheid in, vaak zonder zeker te weten of het ding straks op een scherm wordt gepresenteerd of als PDF wordt doorgebladerd.

Waar gaat die dag in zitten? Niet in het denkwerk, dat hoort erbij. Hij zit in de rest. Drie zinnen per slide betekent dat elke zin op de millimeter geformuleerd moet worden. Een schema met vier stappen betekent vormen tekenen, lijntjes trekken, uitlijnen: vormgeverswerk, uitgevoerd door iemand die geen vormgever is. En dan is er de huisstijl. Iemand heeft een prachtig template gemaakt, en jij zit er de hele middag mee te vechten omdat het net niet doet wat je nodig hebt, tot je het loslaat en het deck er alsnog anders uitziet dan alle andere decks van je organisatie.

Er zijn inmiddels tools die beloven dit met AI op te lossen. Ze werken niet echt, en dat heeft twee oorzaken. De eerste is dat je een deel niet wíl automatiseren. Een belangrijke presentatie is het resultaat van denkwerk, net als een artikel, en dat denkwerk besteed je niet uit. De tweede is dat je een deel niet kúnt automatiseren: een script kan moeilijk een PowerPoint genereren, en een agent kan moeilijk tegen een PowerPoint aanpraten. Het is een bestand op een schijf, een concept uit de vorige eeuw. Om te snappen waarom, moeten we even kijken wat zo'n bestand eigenlijk is.

## Een PowerPoint is geen document

Een PowerPoint is een tekening. Dat klinkt als een flauwe opmerking, maar het is de kern van het probleem. Wat er in het bestand staat, zijn tekstvakken op coördinaten: dit stukje tekst staat op 2,4 centimeter van de linkerrand en 1,8 van de bovenrand, in 40 punts Calibri, vet. Net als een PDF. Dat heeft één voordeel: je weet precies hoe het eruitziet op het scherm en op de printer. En het gaat ten koste van ongeveer al het andere.

Want nergens in dat bestand staat wat iets ís. Dat de grote vette regel bovenaan een titel is, en de regels eronder de kern van het betoog, weet jij omdat je ernaar kijkt. Het bestand weet het niet. Er is niets in de structuur dat een titel onderscheidt van een tekstvak dat toevallig groot en vet is. Vergelijk dat met een webpagina. Vereenvoudigd slaat PowerPoint dit op:

```xml
<sp>
  <xfrm><off x="838200" y="365125"/><ext cx="10515600" cy="1325563"/></xfrm>
  <r><rPr sz="4000" b="1"/><t>Kwartaalcijfers</t></r>
</sp>
```

En dit is hetzelfde op het web:

```html
<h1>Kwartaalcijfers</h1>
```

Die tweede regel zegt niet hoe groot de tekst is of waar hij staat. Hij zegt wat het is: de titel. Hoe hij eruitziet, regelt de huisstijl, één keer, voor alle pagina's tegelijk. En omdat vastligt wat het is, kan een zoekmachine het indexeren, weet een schermlezer dat hier een nieuw onderwerp begint, en kan een script of een agent een slide aanmaken met "deze titel en deze drie punten" zonder dat het iets van pixels hoeft te weten. Precies de dingen die met een PowerPoint niet lukken: niet toegankelijk, niet indexeerbaar, niet automatiseerbaar. Niet omdat iemand dat zo bedoeld heeft, maar omdat een tekening nu eenmaal geen structuur heeft.

Het maakt het formaat ook gesloten, ook al is het op papier een open standaard. Probeer een PowerPoint in Keynote te openen: het lukt half, en het ziet er anders uit. Terwijl "het ziet er overal hetzelfde uit" nou juist het ene voordeel was. Dat voordeel is trouwens toch al wankel: het werkt alleen als de ontvanger dezelfde lettertypen heeft geïnstalleerd. Stuur je deck naar de organisator van een congres en de huisstijl valt weg; dus exporteer je eerst naar PDF, en dan zijn je overgangen en je video's weg. [Daar schreef ik eerder al over.](/nl/blog/de-huisstijl-mag-niet-van-je-laptop-afhangen/)

## De nieuwe tools versnellen het verkeerde

Je zou verwachten dat de nieuwe generatie tools hier iets aan doet. Het tegendeel is waar. Google Slides herhaalt het model van 1997 in de browser. Canva en Gamma maken het tekenen sneller, met sjablonen en een AI die de eerste opzet uit je hoofd haalt, maar de tekening blijft de tekening: nog steeds tekstvakken op coördinaten, nog steeds geen structuur, en nu ook nog opgeslagen bij een leverancier die het formaat niet eens publiceert. Voor elk probleem dat ze oplossen, komt er een nieuw bij.

En de AI-laag op PowerPoint zelf versnelt het deel dat je juist zelf wilde doen, het schrijven, terwijl hij niets kan aan het deel dat je kwijt wilde, het tekenen. Als we AI willen inzetten bij presentaties, dan op onze eigen voorwaarden: met een model dat wij kiezen, tegen een formaat dat een agent kan lezen en schrijven, zonder dat het denkwerk uit handen wordt genomen.

## Hoe het dan wel moet

Draai het om. Begin niet bij de tekening maar bij het document, en stel vier eisen.

Het is web-native en gestructureerd: een titel is een titel, een lijst is een lijst, een spreker is een spreker. Daarmee is toegankelijkheid geen extra werk maar een bijproduct, en kan een script of een agent ermee overweg zonder pixels te hoeven begrijpen.

Het formaat is een open specificatie, niet het bestandsformaat van één leverancier. Wie wil, kan een tweede implementatie bouwen.

De inhoud is portable en self-contained. Tekst, opmaak, afbeeldingen en huisstijl reizen mee in één pakketje dat niet aan een editor of een aanbieder hangt, zoals een webpagina ook niet aan de browser hangt waarin hij is gemaakt.

En de editor perkt je in, zoals een CMS dat doet. Je kiest een slidetype, je vult velden in, en de huisstijl bepaalt hoe het eruitziet. Je kunt er geen troep van maken, en dat is de bedoeling. Dat is ook de reden dat een tekst van Word naar een website kopiëren nog altijd misgaat: Word laat je alles opmaken, en het web wil weten wat het is.

## Dat is Deckyard

Deckyard is dat, en het bestaat. Het is open source (MIT), het draait in Europa of op je eigen server, en het is gebouwd op precies die vier eisen. Een deck bestaat uit slides van een vast type, [34 op dit moment](/nl/structured-slides/), elk met eigen velden: een titelslide heeft een titel en een ondertitel, een stellingslide heeft een stelling en antwoorden, een stappenschema heeft stappen. Het thema bepaalt hoe dat eruitziet, en het thema is een klein bestand dat de organisatie bezit. Het [formaat is gepubliceerd als specificatie](/nl/spec/), met schema's waar een tweede implementatie tegenaan kan bouwen.

Omdat een slide velden heeft in plaats van coördinaten, is een deck automatisch toegankelijk, doorzoekbaar en te exporteren als één bestand dat je meeneemt. En een agent kan ermee werken: er zit geen AI-model ingebouwd dat je wordt opgedrongen, maar je eigen model kan slides aanmaken en aanpassen, omdat het formaat leesbaar is voor een machine zonder dat je het eerst hoeft uit te leggen.

Het draait al maanden in dagelijks gebruik, [de code staat online](/nl/blog/de-code-staat-online/), en het is klaar voor de volgende stap.

## Doe mee met de pilot

Die volgende stap is: organisaties die dit herkennen en het willen proberen. Ik zoek een handvol organisaties voor een pilot van drie maanden. Je krijgt een eigen instance met je huisstijl als thema, ik help bij de inrichting, en in ruil daarvoor wil ik weten waar het wringt. Aan het eind neem je het zelf in beheer of laat je het bij ons draaien; [beide paden zijn hetzelfde product](/nl/hosting/).

Herken je de dag die in elk deck gaat zitten? Laat hieronder je adres achter en vink aan dat je wilt meedoen aan de pilot, dan neem ik contact op.
