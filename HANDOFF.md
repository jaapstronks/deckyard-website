# Uitvoersessie: IANA-registratie op de site + permanente-URL-belofte vastleggen

**Model: Opus.** Gebriefd bouwwerk met een duidelijke "Done when"; levert een PR op (`werkwijze` § Modelkeuze per sessie). Modelkeuze: geen signalen.

## Stand bij vertrek

2026-09-09 @mbp (Fable). `main` op `3bfeaac`, werkboom schoon op één ongerelateerd, ongetracked concept na (`src/content/blog/nl/betere-presentatie-tools.md`; laten liggen). Geen open PR's van deze sessie. Deze repo heeft geen lanes en geen `docs/plans/` (de map `docs/` is hier de bron van de gebruikersdocumentatie, dus daar hoort geen planning); dit bestand in de root is het handoff-bestand.

Deze sessie schreef één briefing naar core (`_meta/briefings/open/2026-09-09--from-deckyard-website--to-deckyard--export-embed-controls-strip.md`): bedieningsstrook onder de slide in de export, plus fullscreen-knop. Niet voor deze sessie; de site volgt pas na de core-release.

## De opdracht

Voer de open briefing van core uit: `_meta/briefings/open/2026-09-09--from-deckyard--to-deckyard-website--iana-media-type-registered.md`. Lees 'm eerst helemaal; de "Done when" daar is de maat.

Kern: `application/vnd.deckyard.deck` is op 2026-08-14 bij IANA geregistreerd in de vendor tree (template: <https://www.iana.org/assignments/media-types/application/vnd.deckyard.deck>). Het verbod om dat op de site te noemen vervalt. Twee dingen moeten gebeuren, en één stukje oude copy zegt nu het tegendeel.

**Wat er nu staat, en waar:**

- `docs/reference/deck-bundle.md:38`: "It sits in the vendor tree and is not IANA-registered." Dat is nu onwaar. Dit is de enige plek op de site die de registratie bij naam ontkent; de zin staat buiten de `gen:`-markers, dus handmatig aanpassen.
- `src/lib/spec.ts:37`: docstring op `FORMAT_MIME` zegt hetzelfde. Ook aanpassen, en voeg daar een `IANA_REGISTRATION_URL` toe die uit `FORMAT_MIME` wordt **afgeleid** (`https://www.iana.org/assignments/media-types/${FORMAT_MIME}`), niet getypt. Regel van de repo-`CLAUDE.md`: geen feit over het formaat wordt in copy getypt. De URL is dan een `{iana}`-placeholder voor `withSpec()`, naast `{mime}`.
- `src/i18n/locales/en/spec.ts:147-150` (en de NL-tegenhanger rond 148): de OCF-alinea en de `mimetype`-ingang op `/spec/deck-format/`. Dit is de plek waar de spec het mediatype introduceert; daar één feitelijke zin bij, met link naar het template. Kijk ook op `/spec/` (de argument-pagina over lock-in) of één zin daar past; niet meer dan dat.
- `src/i18n/types.ts:890` verwijst al naar de security considerations van de registratie; die tekst blijft.

**Toon**: feit, geen trots. Vendor tree, Expert Review, geen standards-track. Geen pagina mag méér beloven dan er is. NL-copy is uitgaande kopij: geen em dashes.

**De permanente-URL-belofte.** De registratie wijst naar drie paden op deckyard.eu, en die moeten blijven werken of redirecten, voor altijd, ook na een herstructurering: `/spec/deck-bundle/` (nu al een redirect naar `/spec/deck-format/`, in `astro.config.mjs:17-22`), `/spec/deck-format/` en `/schema/v3/deck.schema.json`. Let op: `public/schema/` heeft inmiddels `v3`, `v4` en `v11`; de registratie noemt v3, dus die map valt onder dezelfde nooit-verwijderen-regel die `CLAUDE.md` § `/spec/` al voor gepubliceerde schemapaden stelt. Leg de belofte vast op twee plekken die een latere sessie leest vóór ze aan routing komt: een comment boven `redirects` in `astro.config.mjs`, en een korte alinea in `CLAUDE.md` § The `/spec/` section (bij de bestaande regel over schemapaden). Noem de datum en dat wijzigen langs Expert Review gaat.

**Klaar als** (uit de briefing): registratie staat op de site met werkende link naar het IANA-template; de permanente-URL-regel staat waar een routing-sessie hem tegenkomt; geen pagina belooft meer dan vendor tree. Plus: `deck-bundle.md:38` ontkent het niet meer.

## Werkwijze

1. `git pull`, dan `../_meta/scripts/briefings.sh open deckyard-website` om te zien of er intussen iets bij is gekomen.
2. Branch `iana-media-type` vanaf `main`. Nooit op `main` werken.
3. Eerst `src/lib/spec.ts` (constante + placeholder), dan de copy in EN en NL, dan `docs/reference/deck-bundle.md`, dan de twee plekken voor de URL-belofte. Copy die het formaat noemt loopt door `withSpec()`; typ de URL nergens uit.
4. `npm run verify` (format, `astro check`, build) moet groen zijn. Controleer in `dist/` dat `/spec/deck-format/` en `/nl/spec/deck-format/` de link tonen en dat `/docs/reference/deck-bundle/` de nieuwe zin heeft.
5. PR openen, niet zelf mergen. Commit-bodies gewikkeld op 72; de PR-beschrijving eindigt met de sessie-link.
6. Briefing sluiten zodra de "Done when" klopt: `../_meta/scripts/briefings.sh close 2026-09-09--from-deckyard--to-deckyard-website--iana-media-type-registered.md`, en `_meta` committen en pushen. Twijfel je, laat 'm open en zeg dat in één regel.
7. Journal-entry in `JAAP-KB/journal/2026-MM-DD.md` (auto-write), dan `claude-notify-pr <url> "<titel>" review` als allerlaatste actie.
8. **Overschrijf dit bestand** (`HANDOFF.md` in de root) met de volgende opdracht. Opende je een PR, dan is dat per definitie de review-en-merge-sessie voor die PR (Fable, in elke repo). Neem deze overschrijf-plicht weer op als laatste genummerde stap, en sluit je antwoord af met de sluitregel (`/handoff` + sessiesoort + model van de nieuwe handoff).

## Extra van Jaap

_(leeg)_
