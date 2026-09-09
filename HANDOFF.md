# Review-en-mergesessie: PR #73, de screenshot-refresh van docs-sync

**Model: Fable.** Review en merge-oordeel, in elke repo Fable.

## Stand bij vertrek

2026-09-09 @mbp (Fable). PR #79 is gereviewd, gesquasht en gedeployed: `b4e75ea` op `main`, de schema's staan live op `https://deckyard.eu/schema/v13/` en `/schema/v3/deck.schema.json` (de IANA-belofte) geeft nog 200. Branch `sync-schema-v13` is opgeruimd. De werkboom heeft nog steeds dat ene ongerelateerde, ongetrackte concept (`src/content/blog/nl/betere-presentatie-tools.md`). Laten liggen.

`npm run check-slide-types` is hierna rood tegen een core-checkout die voor zijn tag uitloopt (core `HEAD` en werkboom staan op 15, de release `v1.32.0` op 13). Dat is beleid: de site publiceert alleen wat op een release-tag staat. Niet "oplossen" door 14 of 15 te publiceren; zodra core een release met een hogere schemaversie knipt volgt een syncsessie van dezelfde vorm als #79 (Opus).

**`docs-sync` staat op `main` al minstens vijf pushes rood** (gated stale screenshots). PR #73 is de refresh die dat moet verhelpen en wacht sinds 6 september op review: <https://github.com/jaapstronks/deckyard-website/pull/73>, branch `docs-sync/refresh-2026-09-06-2011`, 2 bestanden, 16+/16-, `verify` groen, `docs-sync` op de PR zelf ook rood.

## De opdracht

1. **Review PR #73.** Het is een automatische refresh vanaf `dev-server-1`: negen artefacten opnieuw gebaselined, drie captures mislukt (`poll-live-en`, `presenter-view-nl`, `presenter-view-en`, alle drie een 20s-timeout) en twee nog steeds stale (`shot-marketing-presenter-view-en`/`-nl`). Toets drie dingen: (a) de negen nieuwe beelden tonen wat de pagina belooft (open ze, vergelijk met de kopij eromheen; een screenshot van een lege editor of een half geladen paneel is geen refresh); (b) de PR-branch ligt drie dagen achter op `main`, rebase of merge-conflicten met #78/#79 zijn onwaarschijnlijk (andere bestanden) maar controleer het; (c) waarom `docs-sync` op de PR zelf nog rood is: alleen de twee presenter-view-artefacten, of meer.
2. **Merge** (squash) als de negen kloppen. Een deelrefresh is beter dan vijf dagen rood; de twee presenter-views mogen stale blijven zolang dat de enige reden is.
3. **De presenter-view-captures zijn een core-kwestie**, niet van deze repo: het recept in `deckyard/capture/` loopt tegen een timeout. Spoke naar hub gaat altijd via een briefing: `../_meta/scripts/briefings.sh new --from deckyard-website --to deckyard --topic capture-presenter-view-timeout --needs agent --size S`. Zet erin wat de drie captures deden en welke run het was (PR-body van #73 heeft de details).
4. **Merge-housekeeping**: branch opruimen. Deze repo heeft geen `docs/plans/` of `TODO.md`, dus er is verder niets af te vinken.
5. Journal-entry in `JAAP-KB/journal/2026-MM-DD.md` (auto-write).
6. **Overschrijf dit bestand** met de volgende opdracht, en sluit je antwoord af met de sluitregel (`/handoff` + sessiesoort + model van de nieuwe handoff).

## Ter context, signalen die niet in deze opdracht zitten

- Drie stokoude PR's staan nog open: #34 (eerste blogpost met figuren), #12 (structured-slides explainer) en #1 (repositionering). De explainer en de repositionering staan allang op de site via andere routes; dit zijn hoogstwaarschijnlijk dode branches. Sluiten met een regel is een Jaap-beslissing, geen agent-beslissing; noem het één keer.
- Deze repo staat nog niet op de werkwijze: geen `docs/plans/`, geen `TODO.md`. Een `/workflow-init` hier moet weten dat `docs/` de bron is van de gebruikersdocumentatie die naar Starlight gesynct wordt, en dus niet de planningsmap kan zijn.

## Extra van Jaap

_(leeg)_
