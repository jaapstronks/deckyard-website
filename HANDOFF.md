# Uitvoersessie: pin de docs-sync-gate op een core-release-tag

**Model: Opus.** Modelkeuze: gebriefd bouwwerk met een vastgelegd voorbeeld in dezelfde repo; geen escalatiesignalen.

## Stand bij vertrek

2026-09-10 @mbp (Opus, afwijking van de Fable-regel omdat de Fable-credits op waren; Jaap gaf daar expliciet toestemming voor). PR #73 is gereviewd, aangevuld, gesquasht en gedeployed: `7b6c2e3` op `main`, en de nieuwe Nederlandse share-links-afbeelding staat geverifieerd live. Er zijn geen open briefings voor deze repo. De werkboom heeft nog steeds dat ene ongerelateerde, ongetrackte concept (`src/content/blog/nl/betere-presentatie-tools.md`). Laten liggen.

Wat de review opleverde en wat je moet weten voordat je aan de opdracht begint:

- Twee `ai-fills-fields`-baselines zijn bewust **niet** meegegaan in de merge. De bron-PNG erachter is een afgekapte capture; die twee horen rood te blijven tot core het recept repareert. Baseline ze niet "even mee".
- De refresh-pipeline schrijft de bron-PNG maar draait `npm run derive-images` niet, terwijl de pagina's de afgeleide laden. Bij elke volgende capture-ronde in deze repo hoort die stap er dus met de hand bij, tot de pipeline zelf is aangepast.
- Briefing naar core ligt klaar: `_meta/briefings/open/2026-09-10--from-deckyard-website--to-deckyard--capture-recipe-failures.md`, vier kapotte recepten. Die komt via core terug, niet via deze opdracht.

## De opdracht

`docs-sync` staat op `main` al weken rood, en niet door de docs. `.github/workflows/docs-sync.yml` checkt `jaapstronks/deckyard` uit op zijn default branch, zonder pin, terwijl de captures op dev-server-1 tegen een eigen checkout draaien. De gate vergelijkt dus met een doel dat tussen de capture en de CI-run doorloopt: op 6 september 6 gated artefacten, op 10 september 14, zonder dat er iets aan de docs veranderde. Zo kan hij alleen bij toeval groen zijn, en een check die niet groen kán worden leert niemand meer iets.

Dezelfde spanning is in deze repo al een keer beslecht, en dat is het voorbeeld dat je volgt: de site publiceert alleen schema's die op een core-release-tag staan, niet wat core's `HEAD` toevallig zegt (zie `CLAUDE.md` § The `/spec/` section, en de sessie achter `b4e75ea`).

1. **Pin de core-checkout in `docs-sync.yml` op de laatste release-tag** in plaats van de default branch. Hoe je die tag bepaalt is de echte ontwerpvraag: hardcoded in de workflow (zichtbaar, maar iemand moet hem bijwerken), of opgehaald via de GitHub API in een stap ervoor (blijft vanzelf kloppen, maar de gate beweegt dan alsnog mee met elke release). Kies er een, en schrijf in een comment boven de stap waarom, zoals de rest van die workflow dat ook doet.
2. **Draai de gate lokaal tegen die tag** (`node docs-sync/check-staleness.mjs` met `../deckyard` op de tag uitgechecked) en zet in de PR-tekst hoeveel artefacten er dan nog gated zijn. Dat getal is het echte docs-achterstallig onderhoud, los van core's beweging; wordt het klein, dan is er een captureronde nodig, wordt het nul, dan is de gate meteen groen.
3. **Raak de negen andere `△ stale (report)`-regels niet aan.** Die zijn met opzet niet-blokkerend en horen bij een docs-review, niet bij deze wijziging.
4. **Open een PR** en laat 'm op Jaaps review wachten; niet zelf mergen. Vuur daarna `claude-notify-pr` af, als laatste actie van de sessie.
5. **Overschrijf dit bestand** met de volgende opdracht, en sluit je antwoord af met de sluitregel (`/handoff` + sessiesoort + model van de nieuwe handoff).

## Ter context, signalen die niet in deze opdracht zitten

- De sweep-inbox stond vanochtend open en is overgeslagen, omdat een review-en-mergesessie voorgaat. Hij komt bij de volgende `/handoff` vanzelf weer boven.
- Drie stokoude PR's staan nog open: #34 (eerste blogpost met figuren), #12 (structured-slides explainer) en #1 (repositionering). De explainer en de repositionering staan allang op de site via andere routes; dit zijn hoogstwaarschijnlijk dode branches. Sluiten met een regel is een Jaap-beslissing, geen agent-beslissing.
- Deze repo staat nog niet op de werkwijze: geen `docs/plans/`, geen `TODO.md`. Een `/workflow-init` hier moet weten dat `docs/` de bron is van de gebruikersdocumentatie die naar Starlight gesynct wordt, en dus niet de planningsmap kan zijn.
- `npm run check-slide-types` is rood tegen een core-checkout die voor zijn tag uitloopt (core staat op 15, de release `v1.32.0` op 13). Dat is beleid, geen defect. Zelfde principe als de opdracht hierboven.

## Extra van Jaap

_(leeg)_
