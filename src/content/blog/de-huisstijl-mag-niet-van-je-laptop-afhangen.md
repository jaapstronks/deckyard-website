---
title: 'De huisstijl mag niet van je laptop afhangen'
intro: 'In PowerPoint is de huisstijl niet beter dan de fonts die toevallig geïnstalleerd staan op de machine die het bestand opent. Een thema hoort een klein bestand te zijn dat de organisatie bezit, en één iemand moet dat mogen beheren zonder ook de servers te draaien.'
pubDate: 2026-07-28
lang: nl
category: 'Ontwerpkeuzes'
tags: ['themas', 'fonts', 'huisstijl']
draft: true
---

Je opent het deck van een collega en er klopt iets subtiel niet. De koppen zijn
zwaarder dan de bedoeling, een titel die eerst op één regel paste loopt nu om,
en overal is de spatiëring net iets te ruim geworden. Niemand heeft iets
aangepast. De fonts stonden alleen niet op deze machine, dus is het bestand
teruggevallen op wat er wél stond.

Dat is de normale gang van zaken, en het is de moeite waard om te benoemen wat
het eigenlijk is: de huisstijl woont op de laptops van mensen, niet in het
document.

## Een font dat op de server woont, niet op de machine

In Deckyard zijn de fonts van de organisatie, niet van degene die het bestand
opent. Veertig geselecteerde letterfamilies worden meegeleverd en door je eigen
instance geserveerd, dus er gaat geen verzoek naar buiten en er hoeft niets
geïnstalleerd te worden. Gebruikt je merk iets anders, dan upload je de
`.woff2`-bestanden, of koppel je een Adobe Fonts- of Monotype-project.

Het praktische effect: een deck ziet er hetzelfde uit voor degene die vorige week
begon en het merkpakket nooit heeft gekregen. Ook exports nemen de fonts mee, dus
de PDF die het gebouw verlaat wordt niet stilletjes opnieuw gezet door de reader
van iemand anders.

## Een thema is expres klein

Een Deckyard-thema is een JSON-bestand met kleuren, typografie, logo's en
achtergronden. Meer niet. Het is geen designsysteem en probeert dat ook niet te
zijn.

Dat klein zijn is de functie. Merkgereedschap gaat er zelden aan onderdoor dat
het te weinig kan; het gaat eraan onderdoor dat er een project van maken nodig is,
waardoor niemand het maakt, waardoor iedereen in het deck zelf blijft
improviseren. Een thema dat je in een middag af hebt is een thema dat ook echt
bestaat.

Het kan omdat de inhoud helemaal geen vormgeving draagt. Een slide bevat velden,
nooit een kleur of een lettertype; dat is [de keuze die eronder
ligt](/nl/structured-slides/). Het thema is daarmee de enige plek waar het merk
woont, en het verwisselen ervan restyled elk deck dat er ooit gemaakt is, ook die
van twee jaar geleden.

## Iemand moet het beheren, en dat hoeft geen beheerder te zijn

Dit is het stuk waar een migratie voor nodig was. Thema's en fonts beheren is
geen werk voor een systeembeheerder. Het is werk voor degene die over het merk
gaat, en die heeft doorgaans niets te zoeken in gebruikersaccounts of servers.

Designer is in Deckyard daarom geen rol. Het is een aparte bevoegdheid op iemands
lidmaatschap van een organisatie, los van de vraag of diegene gebruiker, beheerder
of eigenaar is. Eigenaren krijgen 'm standaard, een organisatie kan zelf bepalen
of beheerders 'm ook krijgen, en verder kun je 'm aan iedereen los toekennen. Wie
over de huisstijl gaat, krijgt precies de sleutels van de huisstijl.

De prijs hiervan is echt en het is eerlijk om die te noemen: je kunt het thema
niet per slide overrulen als je die ene kop toch rood wilt. Dat is ongeveer één
keer per organisatie irritant, en het is dezelfde eigenschap die een vier jaar
oud deck binnen de huisstijl houdt.
