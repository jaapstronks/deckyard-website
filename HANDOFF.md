# Review-en-mergesessie: PR #79, de schema's op v13

**Model: Fable.** Review en merge-oordeel, in elke repo Fable.

## Stand bij vertrek

2026-09-09 @mbp (Opus). PR #79 open: <https://github.com/jaapstronks/deckyard-website/pull/79>, branch `sync-schema-v13`, één commit `b1682cc` bovenop `bd283c2`. `npm run verify` groen. Dit bestand zit in een aparte commit op `main` bovenop de PR-basis.

De werkboom heeft nog steeds dat ene ongerelateerde, ongetrackte concept (`src/content/blog/nl/betere-presentatie-tools.md`). Laten liggen.

**De vorige opdracht ging uit van schemaversie 14 en dat klopte niet.** Gemeten: core's werkboom staat op 15, `HEAD` op 14, en de laatste release `v1.32.0` (4 sep) op **13**. De site publiceerde 11. De handoff zei "is de release lager dan 14: stop", maar die regel bestond om ongepubliceerde versies van de site te houden, en 13 is wél uitgebracht - decks die de huidige release schrijft dragen een `$id` onder `/schema/v13/` die deckyard.eu niet serveerde. Daarom is er gesynct naar 13 in plaats van gestopt. Dat oordeel is het eerste wat je in de review toetst; verwerp het gerust, de PR is niet gemerged.

## De opdracht

1. **Toets de afwijking hierboven.** Eens: door met de review. Oneens: sluit de PR met een regel waarom, zet de reden in dit bestand en laat de drift staan. Er is niets tussenin - half publiceren kan niet, een `$id`-pad is er of is er niet.
2. **Review de PR.** Vier dingen die de moeite waard zijn: (a) `public/schema/v3`, `v4` en `v11` staan er nog, want onder een gepubliceerd versiepad wordt nooit iets verwijderd en `v3` staat in de IANA-registratie; (b) de markerspans in `docs/reference/deck-format.md`, `schemas.md` en `slide-types.md` staan alle drie op 13 en de envelope-versie staat nog op 1 (twee versienummers, niet verwarren); (c) de PR beweert dat de v13-schema's byte-identiek zijn aan v11 op de `$id` na - narekenen kost één `diff` met `sed 's#/v11/#/vN/#g'`; (d) 34 types, dezelfde namen als in v11, dus geen nieuwe type zonder pagina in `docs/slide-types/`.
3. **Merge** (squash) als het klopt, en deploy. Meet daarna live na dat `https://deckyard.eu/schema/v13/deck.schema.json` en één per-type schema 200 geven, en dat `/schema/v3/deck.schema.json` nog steeds 200 geeft (de IANA-belofte).
4. **`npm run check-slide-types` blijft hierna rood** tegen een core-checkout die voor zijn tag uitloopt. Dat is beleid, geen storing: de check leest core's bestanden, niet zijn git HEAD, en de site publiceert alleen wat op een release-tag staat. Groen is hij tegen `v1.32.0`. Niet "oplossen" door 14 of 15 te publiceren. Zodra core een release met 14/15 knipt is er weer een syncsessie; dat is dan een Opus-opdracht van dezelfde vorm.
5. Merge-housekeeping: branch `sync-schema-v13` opruimen. Deze repo heeft geen `docs/plans/` of `TODO.md`, dus er is verder niets af te vinken.
6. Journal-entry in `JAAP-KB/journal/2026-MM-DD.md` (auto-write).
7. **Overschrijf dit bestand** met de volgende opdracht, en sluit je antwoord af met de sluitregel (`/handoff` + sessiesoort + model van de nieuwe handoff).

## Ter context, twee signalen die niet in deze opdracht zitten

- `docs-sync` staat op `main` al minstens vier pushes rood (14 gated stale screenshots). PR #73 is de refresh en wacht op review.
- Deze repo staat nog niet op de werkwijze: geen `docs/plans/`, geen `TODO.md`. Een `/workflow-init` hier moet weten dat `docs/` de bron is van de gebruikersdocumentatie die naar Starlight gesynct wordt, en dus niet de planningsmap kan zijn.

## Extra van Jaap

_(leeg)_
