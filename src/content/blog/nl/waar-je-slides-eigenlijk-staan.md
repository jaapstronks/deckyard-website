---
title: 'Waar je slides eigenlijk staan'
intro: 'Zelf hosten is het uitgangspunt, geen terugvaloptie. Maar iemand moet die server wel bijhouden, en bij veel organisaties bestaat die iemand niet. Dus draaien wij ook instances, en dat is wat de doorontwikkeling betaalt.'
translationKey: 'where-your-slides-live'
pubDate: 2026-07-31
category: 'Bouwen in de openbaarheid'
tags: ['zelf hosten', 'soevereiniteit']
draft: true
---

Vraag een organisatie waar haar presentaties staan en je krijgt meestal een
merknaam in plaats van een plek. Daarmee is het probleem in één antwoord
samengevat. De decks staan érgens, op infrastructuur die niemand in het gebouw
ooit gezien heeft, in een formaat dat niemand in het gebouw zonder de
leverancier kan openen, onder voorwaarden die niemand in het gebouw onderhandeld
heeft.

## Zelf hosten is het uitgangspunt

Deckyard proberen is één regel in een terminal; die kiest zelf tussen Docker en
Node 22+ en zet de app op localhost. Het voor een organisatie draaien gaat via
Compose, en ook dat is geen heldendaad: een middag werk voor iemand die weleens
een webapplicatie heeft opgezet. De
[deployment-documentatie](/docs/deployment/quickstart/) is de eerlijke versie van
die belofte, inclusief de stukjes die priegelig zijn.

Dit is bewust het standaardpad. MIT-licentie, geen features achter een hek, geen
editie die toevallig net dat ene mist wat jij nodig hebt. Draai je het zelf, dan
krijg je alles, en dat is wat ons betreft ook de bedoeling.

## Maar iemand moet die server bijhouden

Hier houden veel open source-verhalen stilletjes op. Een webapplicatie draaien
betekent back-ups, upgrades, TLS-certificaten, een database die aandacht vraagt,
en degene zijn die gebeld wordt als het plat ligt op de ochtend van de
bestuursvergadering.

Genoeg organisaties die digitale soevereiniteit willen, hebben niemand wiens werk
dat is. Tegen hen zeggen "host het zelf" is geen antwoord; het is een manier om
geen antwoord te geven.

## Dus draaien wij ook instances

Geen SaaS. Er is geen aanmeldpagina, geen tabel met abonnementen, geen geteld
aantal stoelen. Het is je eigen instance, op je eigen domein, in Europa, met je
data los van die van alle anderen; dezelfde software die je ook zelf had kunnen
installeren, alleen met het onderhoud geregeld.

Welke van de twee bij je past is vooral een vraag over je beheercapaciteit, niet
over features. Beide paden draaien dezelfde code.

## Wat dat betaalt

Er zit geen durfkapitaal achter Deckyard, dus het geld moet ergens eerlijk
vandaan komen. Dat is de hosting. Organisaties die voor een beheerde instance
betalen, betalen daarmee de doorontwikkeling van software die iedereen verder
gratis mag draaien, en de roadmap volgt de mensen die het echt gebruiken.

Dat is een gebruikelijke afspraak in open source, en het is de moeite waard om
het gewoon te zeggen in plaats van het te laten afleiden uit een prijspagina die
niet bestaat.
