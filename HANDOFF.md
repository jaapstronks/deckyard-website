# Uitvoersessie: schema-drift tussen core en de site opheffen

**Model: Opus.** Gebriefd bouwwerk met een checklist dat een PR oplevert; er valt niets te beslissen.

## Stand bij vertrek

2026-09-09 @mbp (Fable). PR #78 (IANA-registratie) gereviewd, gesquasht naar `main` als `bd283c2`, gedeployd en live nagemeten: `/spec/deck-bundle/`, `/spec/deck-format/` en `/schema/v3/deck.schema.json` geven 200, de registratielink staat op `/spec/deck-format/` en de Mediatype-rij op `/spec/`. De briefing van core is gesloten. Dit bestand zit in een aparte commit bovenop `bd283c2`.

De werkboom heeft nog steeds dat ene ongerelateerde, ongetrackte concept (`src/content/blog/nl/betere-presentatie-tools.md`). Laten liggen.

Ter context, twee signalen die niet in deze opdracht zitten: de check `docs-sync` staat op `main` al minstens drie pushes rood (14 gated stale screenshots; PR #73 is de refresh en wacht op review), en deze repo heeft geen `docs/plans/` of `TODO.md`, dus de merge-housekeeping had geen planning-docs om bij te werken. `docs/` is hier de bron van de gebruikersdocumentatie die naar Starlight gesynct wordt; een `/workflow-init` moet daar rekening mee houden.

## De opdracht

`npm run check-slide-types` faalt op drie bestanden: `public/schema/v14/index.json`, `docs/reference/deck-format.md` en `docs/reference/schemas.md`. Core zit op schemaversie 14, de gecommitte `src/data/deck-format.json` op 11. Dat betekent ook dat de `$id` van een deck dat core vandaag schrijft niet resolvet op deckyard.eu. Hef die drift op, maar publiceer alleen wat core heeft uitgebracht.

1. Stel vast welke schemaversie core op zijn laatste release-tag heeft: `git -C ../deckyard describe --tags` (bij vertrek `v1.32.0`, 20 commits erachter) en de bron van `schemaVersion` in core (`grep -rn schemaVersion ../deckyard/shared`), gelezen op de tag met `git show <tag>:<pad>`. Is dat 14: door naar stap 2. Is het lager: dan zit versie 14 nog niet in een release en hoort hij niet op de site; stop, schrijf dat in dit bestand en laat de check rood.
2. Core's werkboom is vies (i18n-bestanden) en de generator leest bestanden, niet git HEAD. Draai `npm run sync-slide-types` daarom tegen een schone checkout van de tag: `git -C ../deckyard worktree add /tmp/deckyard-<tag> <tag>` en de generator tijdelijk daarop wijzen (kijk in `scripts/generate-slide-types.js` hoe het pad naar core bepaald wordt), of de i18n-wijzigingen in core stashen en na afloop terugzetten. Ruim de worktree na afloop op.
3. Lees de diff die de sync oplevert voordat je hem commit: `src/data/*.json`, `public/schema/v14/`, de markerspans in `docs/reference/`, en het type-aantal in `README.md` en `docs/slide-types/index.md`. Nieuwe slide types zonder pagina in `docs/slide-types/` noem je in de PR-beschrijving; die pagina's schrijf je niet zelf. Onder `public/schema/` wordt niets verwijderd, ook `v4` en `v11` niet.
4. `npm run check-slide-types` en `npm run verify` allebei groen. Branch `sync-schema-v14`, één commit, PR met in de body wat er veranderde en welke versies nu gepubliceerd staan. Niet zelf mergen; `claude-notify-pr` als allerlaatste actie.
5. Journal-entry in `JAAP-KB/journal/2026-MM-DD.md` (auto-write).
6. **Overschrijf dit bestand** met de review-en-mergesessie voor die PR (Fable), en sluit je antwoord af met de sluitregel (`/handoff` + sessiesoort + model van de nieuwe handoff).

## Extra van Jaap

_(leeg)_
