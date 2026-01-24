# Gebruikershandleiding / User Manual

Met dit systeem kun je professionele presentaties maken in je eigen huisstijl.

---

## 1. Waarom dit systeem

### 1.1 Waar gebruiken we dit voor?

Dit systeem is handig voor o.a.:

- **Infosessies en events**: informatiebijeenkomsten, calls, lezingen
- **Interne presentaties**: delen en bespreken van strategiedocumenten en plannen
- **Publieke waarden**: toegankelijkheid met alt-tekst, minder afhankelijkheid van "walled gardens", interoperabel werken

### 1.2 Wat levert het op?

- **Consistente vormgeving**: de presentatie past automatisch in je huisstijl zonder designwerk
- **Automatisch tweetalig**: werk in NL of EN en genereer een tweede taalversie die het publiek live kan volgen op hun mobiel
- **Snel bouwen**: plak tekst (uit Notion, Word of een document) en laat de AI een eerste deck maken; jij schaaft bij
- **Sterke live-features**:
  - Speaker notes op je mobiel (met optionele afstandsbediening)
  - Live meekijken: publiek volgt de andere taal live op hun telefoon
  - Polls, Likert-schalen en open feedback: stemmen via QR met live resultaten
  - Q&A: publiek stelt vragen die je kunt modereren

---

## 2. Snel starten

### 2.1 Nieuwe presentatie (standaard flow)

1. Maak een **nieuwe presentatie** en kies meteen **NL of EN**
2. Geef de presentatie een duidelijke titel (zodat je 'm later terugvindt)
3. Voeg slides toe via `+ Slide` en kies het gewenste **diatype**
4. Schrijf (optioneel) **speaker notes** per slide
5. Presenteer via **Presenteren**

### 2.2 Supersnel: AI-wizard (deck genereren uit tekst)

Als je een document hebt (strategietekst, call-tekst, briefing):

1. Open de **AI-wizard** in de presentatielijst
2. Plak de tekst (ruw is oké) of selecteer een **Notion-pagina**
3. Kies taalmodus (NL/EN) en genereer
4. Loop daarna je slides langs en:
   - Pas koppen aan
   - Voeg afbeeldingen toe
   - Voeg speaker notes toe

### 2.3 Voor een infosessie: live features klaarzetten

1. Zorg dat je **tweede taalversie** bestaat (vertalen)
2. Gebruik (waar passend):
   - **Follow-along invite** slide (QR voor live meekijken in andere taal)
   - **Poll** of **Likert** slide(s) voor interactie
   - **Feedback** slide voor open vragen
3. Open **Notes (QR)** vóór je talk om je telefoon te koppelen

---

## 3. Presentaties beheren (lijstweergave)

In de lijstweergave (`/app`) beheer je al je decks.

### 3.1 Nieuwe presentatie maken

- Kies **titel** en **taal** (NL/EN). Je start direct in de editor in die taal.

### 3.2 AI-wizard (nieuwe presentatie genereren)

- Plak ruwe notities/tekst; de wizard genereert een nieuwe presentatie op basis van beschikbare diatypen
- Werkt in **taalmodus** (NL output of EN output)
- **Notion-integratie**: selecteer een Notion-pagina als bron

### 3.3 JSON importeren

- Upload een `.json` deck-bestand; het systeem maakt een nieuwe presentatie aan op basis van de inhoud

### 3.4 Bestaande presentaties

- Je ziet een **thumbnail** (eerste slide) en "Gewijzigd"-datum
- **Taal-acties per presentatie**: knoppen voor **Bewerk NL / Vertaal → NL** en **Bewerk EN / Translate → EN**
- **Verwijderen**: presentatie verwijderen met bevestiging

---

## 4. Editor: slides maken en bewerken

De editor heeft drie kolommen: **slides** (links), **bewerken** (midden), **voorbeeld** (rechts).

### 4.1 Automatisch opslaan

- Wijzigingen worden **automatisch** opgeslagen
- Bij verlaten van de pagina met niet-opgeslagen wijzigingen krijg je een browserwaarschuwing

### 4.2 Slides beheren

- **Toevoegen**: via `+ Slide` of via "invoegen tussen slides"
- **Reorder**: slides kun je **verslepen** (drag & drop)
- **Selecteren**: klik een slide in de lijst om te bewerken en live te previewen
- **Verwijderen**: slides kunnen verwijderd worden met bevestiging

### 4.3 Live preview

- Preview update **live** terwijl je typt
- Klik op het vergrootglas voor een **grote preview** (lightbox)

### 4.4 Presentator-notities per slide

- Per slide kun je **speaker notes** toevoegen (markdown ondersteund)
- Deze notes kun je op je mobiel gebruiken tijdens het presenteren

### 4.5 AI: slides toevoegen aan bestaande presentatie

- Via **"AI toevoegen…"** kun je extra slides genereren
- De AI sluit logisch aan op wat er al in je presentatie staat
- Vraag je om een afbeelding, dan zet het systeem een **placeholder** die jij later kunt vervangen

### 4.6 Toegankelijkheidsvelden

Per slide kun je optioneel instellen:
- **A11y titel**: wordt voorgelezen wanneer de slide actief wordt
- **A11y samenvatting**: extra context voor screenreaders

### 4.7 "Presenteren" en "Notes (QR)"

- **Presenteren** opent de presentermodus in een nieuw tabblad
- **Notes (QR)** maakt/hergebruikt een notes-sessie en toont een join-pagina met QR

---

## 5. Slide-typen (volledig overzicht)

Het systeem heeft 26 diatypen. Elk type heeft eigen velden en layout.

### 5.1 Titel & Structuur

| Type | Beschrijving |
|------|-------------|
| **Titeldia** | Titel, subtitel, optionele achtergrondafbeelding en achtergrondvariant |
| **Sectiedia** (chapter title) | Hoofdstuk/sectieheader |
| **Split Partner Titeldia** | Dual-branded title layout voor partners |

### 5.2 Inhoud & Tekst

| Type | Beschrijving |
|------|-------------|
| **Inhoud** | Tekst/inhoud met optionele achtergrondafbeelding |
| **Lijstje** | Bullets/opsomming |
| **Citaat** | Quote-layout met optionele attributie |
| **Payoff** | Statement/afsluiter slide |
| **Tekstblokken** | Meerdere onafhankelijke tekstblokken |

### 5.3 Media

| Type | Beschrijving |
|------|-------------|
| **Afbeeldingsdia** | Afbeelding met titel, bijschrift en alt-tekst (NL/EN). Ondersteunt **zoom-stappen** naar hoeken, horizontaal, verticaal of kwadranten |
| **Afbeelding + tekst** | Combinatie-layout met afbeelding en tekst naast elkaar |
| **Videodia** | Video toevoegen (YouTube/Vimeo/Bunny), met optie voor automatisch afspelen |

### 5.4 Data & Visualisatie

| Type | Beschrijving |
|------|-------------|
| **Chart** | Bar/line/pie chart op basis van CSV/TSV data (bijv. uit Excel/Sheets) |
| **KPI Metrics** | Tot 4 metrics met waarde, eenheid, delta, notitie en count-up animatie |
| **Agenda/Timeline** | Roadmap/schedule met afwisselende kaartlayout |
| **Tabel** | 1-10 kolommen, tot 40 rijen met optionele header |

### 5.5 Kaarten & Grids

| Type | Beschrijving |
|------|-------------|
| **4 kaarten** (card stack) | Vaste kaart-layout met overlap-effect |
| **Iconen kaarten** (icon card grid) | Kaart-grid met iconen |
| **Team overview** | Standaard teamoverzicht met foto's |
| **Team kaarten** | Grid van team member cards |
| **Logo Wall** | Display partner/sponsor logo's |

### 5.6 Interactie & Publiek

| Type | Beschrijving |
|------|-------------|
| **Poll** | Meerkeuzevraag (2-4 opties) met QR voor stemmen en live resultaten |
| **Likert** | Eensschaal met 2-10 aanpasbare labels |
| **Likert Slider** | Numerieke 1-10 slider response |
| **Feedback** | Open tekst feedback verzamelen |
| **Follow-along invite** | QR-slide voor live meekijken (wordt automatisch beheerd) |

---

## 6. Taalmodus (NL/EN) + vertalen

Het systeem werkt met een **taalmodus**: je bewerkt en presenteert telkens één taalversie.

### 6.1 Taal wisselen

- In de editor kies je bovenin NL/EN. Dat schakelt de bewerkbuffer om.

### 6.2 Vertalen

- Knop **"Vertalen"** maakt (of ververst) de andere taalversie
- In de lijstweergave kun je ook **ontbrekende taalversies** laten aanmaken

### 6.3 Presenteren in taal

- De presentermodus kan ook op NL of EN staan (met switch in de topbar)

### 6.4 Tip voor events

- Zorg vóór een infosessie dat beide taalversies bestaan, zodat "live meekijken" ook werkt

---

## 7. Presenteren (live)

De presentermodus is bedoeld voor **fullscreen presenteren** met handige live tools.

### 7.1 Navigatie (toetsenbord)

| Toets | Actie |
|-------|-------|
| ← / → of Spatie | Vorige/volgende |
| Home / End | Eerste/laatste slide |
| F | Fullscreen |
| Esc | Exit fullscreen of terug naar editor |

### 7.2 Voortgang

- Boven/onder zie je een **progress indicator** (bijv. `3 / 18`) en een voortgangsbalk

### 7.3 Stap-voor-stap opbouw ("Tekst stap voor stap")

Optie om fragmenten/elementen gefaseerd te tonen:

- **Tekst stepping**: bullets één voor één tonen
- **Kaart stepping**: kaarten verschijnen progressief
- **Chart stepping**: grafiekfragmenten verschijnen sequentieel
- **Image zoom stepping**: voorgedefinieerde zoomposities of custom zoom points

### 7.4 Video's

- Video's worden zo behandeld dat ze **niet** ongewenst afspelen op verborgen slides
- Autoplay (indien aangezet) activeert pas wanneer de slide **actief** wordt

---

## 8. Mobiel tijdens het presenteren

Dit is één van de sterkste onderdelen: je presenteert op je laptop en gebruikt je telefoon als **tweede scherm**.

### 8.1 Speaker notes op je mobiel (Notes companion)

**Wat je ziet op mobiel:**
- Een **preview** van de huidige slide
- Je **speaker notes** (per slide)
- **Q&A vragen** van het publiek

**Hoe je het gebruikt:**
1. Schrijf per slide je **presentator-notities** in de editor
2. Klik op **Notes (QR)** en scan de QR op je telefoon
3. Je telefoon synchroniseert automatisch met je presentatie

**Optioneel: afstandsbediening**
- In de presentermodus kun je **afstandsbediening aanzetten**
- Dan kan je telefoon ook volgende/vorige doen of naar een specifieke slide springen

### 8.2 Live meekijken (follow-along)

Voor publiek/collega's (bijv. internationale bezoekers):
- De telefoon toont live de **huidige slide**
- Werkt goed als je een NL talk geeft en mensen EN willen meelezen (of andersom)

**Makkelijk joinen:**
- Via de **Follow-along invite** slide met QR-code
- Of via korte code: `/go XXXX` (4-letterige code)

### 8.3 Q&A op mobiel

Publiek kan via de follow-along view:
- Vragen insturen
- Vragen van anderen upvoten

Jij ziet de vragen in je Notes companion view.

---

## 9. Interactie: Polls, Likert & Feedback

### 9.1 Poll slide

- **Vraag** met antwoorden A/B (+ optioneel C/D)
- **QR-code** naar de stem-pagina
- **Live resultaten** (bars + totaal) verschijnen automatisch

### 9.2 Likert slide

- **Eensschaal** met 2-10 aanpasbare labels (bijv. "Helemaal oneens" tot "Helemaal eens")
- Live resultaten tonen de verdeling

### 9.3 Likert Slider slide

- Numerieke **1-10 slider**
- Toont gemiddelde en verdeling

### 9.4 Feedback slide

- **Open tekst** feedback verzamelen
- Reacties komen binnen in de moderator view

### 9.5 Stemmen op mobiel

- De stem-pagina toont vraag + antwoordknoppen
- Per apparaat kun je **maar één keer** stemmen

### 9.6 Modereren

- Als admin kun je naar `/moderate/<presentationId>` voor het moderator-overzicht
- Hier zie je alle Q&A vragen en feedback
- Je kunt vragen promoten of verwijderen

---

## 10. Exporteren

In de editor zit een **Exporteren** dropdown. Export werkt per **actieve taal**.

### 10.1 Documenten

| Format | Beschrijving |
|--------|-------------|
| **PDF** | Slides naar PDF (per slide) |
| **PPTX** | PowerPoint format voor verder bewerken |
| **PNG** | Slides als PNG-afbeeldingen |

### 10.2 Web & Interactief

| Format | Beschrijving |
|--------|-------------|
| **HTML** | Standalone `.html` die offline werkt (assets ingebed) |
| **JSON** | Portable deck-structuur (voor import/versiebeheer) |

### 10.3 Speciale exports

| Format | Beschrijving |
|--------|-------------|
| **Notes Export** | Markdown of DOCX met speaker notes |
| **Handoff ZIP** | Complete project package voor overdracht |
| **Print Text View** | Alle slides als tekst voor printen |

### 10.4 JSON importeren

- In de lijstweergave kun je JSON weer importeren als nieuwe presentatie

---

## 11. Publiceren & Embedden

### 11.1 Publieke link maken

- Je kunt een presentatie **publiceren**, zodat iedereen met de link deze kan openen
- Link format: `/p/<publishId>` of `/p/<publishId>-<slug>`

### 11.2 In een website embedden

Via **embed** kun je presentaties in een website tonen:

```
/embed/<publishId>
```

**Embed parameters:**
- `?controls=0|1` - Toon/verberg speler controls
- `?start=<index>` - Start bij specifieke slide
- `?loop=0|1` - Enable looping
- `?ui=min|default` - Minimale of standaard UI
- `?lang=nl|en-GB` - Forceer taalversie
- `?langSwitch=0|1` - Toon in-frame taalkeuze

### 11.3 Notion-integratie

Als je presentatie is gemaakt vanuit een Notion-pagina, kun je de embed **terugplaatsen** naar die Notion-pagina.

---

## 12. Beeldbank en afbeeldingen

### 12.1 Beeldbank (image library)

- Centraal beheer van afbeeldingen die je in presentaties gebruikt
- Zoeken op **titel**, **fotograaf**, **alt-tekst** en URL
- Optioneel: automatisch bijschrift invullen met `Foto: <fotograaf>`

### 12.2 Afbeeldingen toevoegen

- **Upload** naar de server
- **ImageKit**: cloud-hosted afbeeldingen zoeken en selecteren
- Vul titel, credit en alt-tekst (NL/EN) in

### 12.3 Alt-tekst (NL/EN)

- Bij afbeeldingsslides kun je alt-tekst toevoegen in NL en/of EN
- **AI alt-tekst**: laat automatisch beschrijvingen genereren (tweetalig)

### 12.4 Uploads en presets

- Er zijn vaste **achtergronden** en **partnerlogo's** beschikbaar

---

## 13. Notion-integratie

### 13.1 Presentatie maken vanuit Notion

1. Open de **AI-wizard**
2. Kies **"Van Notion-pagina"**
3. Zoek en selecteer de gewenste pagina
4. Genereer de presentatie

Het systeem extraheert:
- Headings en tekst
- Bullets en genummerde lijsten
- Quotes, code blocks, callouts
- Tabellen
- Afbeeldingen

### 13.2 Publiceren naar Notion

Als je presentatie is gemaakt vanuit Notion, kun je de embed **terugplaatsen**:
1. Ga naar de export-opties
2. Kies **"Toevoegen aan Notion-pagina"**
3. De embed wordt automatisch toegevoegd aan de bronpagina

---

## 14. Tips & best practices

### 14.1 Voorbereiding infosessie

1. **Maak beide taalversies** vooraf klaar
2. **Test de poll/likert slides** door zelf te stemmen
3. **Open Notes (QR)** 5 minuten voor aanvang op je telefoon
4. **Deel de follow-code** bij binnenkomst (op scherm of in chat)

### 14.2 Tijdens het presenteren

- Houd je telefoon bij de hand voor notes en Q&A
- Check de Q&A regelmatig voor vragen uit het publiek
- Bij polls: wacht tot de balk zich vult voordat je doorgaat

### 14.3 Afbeeldingen

- Vul altijd **alt-tekst** in voor toegankelijkheid
- Gebruik de beeldbank voor consistentie
- Hoge resolutie afbeeldingen werken het beste

### 14.4 AI-wizard

- Meer context = betere resultaten
- Loop gegenereerde slides altijd na en pas aan
- Voeg persoonlijke speaker notes toe

---

## 15. Keyboard shortcuts (presenteren)

| Toets | Actie |
|-------|-------|
| → / Spatie | Volgende slide/stap |
| ← | Vorige slide/stap |
| Home | Eerste slide |
| End | Laatste slide |
| F | Fullscreen toggle |
| Esc | Exit fullscreen / terug |

---

## 16. Veelgestelde vragen

**Q: Hoe maak ik een tweetalige presentatie?**
A: Maak eerst de presentatie in één taal, klik dan op "Vertalen" om de andere taalversie te genereren.

**Q: Kunnen mensen tegelijk op hun telefoon volgen?**
A: Ja, via de Follow-along invite slide of de korte code (`/go XXXX`). Ze zien de huidige slide in de taal van hun keuze.

**Q: Hoe lang blijven poll-resultaten bewaard?**
A: Resultaten blijven bewaard bij de presentatie. Ze worden gereset als je een nieuwe poll-sessie start.

**Q: Kan ik mijn presentatie offline gebruiken?**
A: Ja, exporteer naar HTML. Dit bestand werkt volledig offline met alle assets ingebed.

**Q: Hoe werkt de afstandsbediening op mijn telefoon?**
A: Open Notes (QR), scan de code, en zet in de presentermodus "afstandsbediening" aan. Je telefoon kan dan slides bedienen.

---

*Laatste update: januari 2025*
