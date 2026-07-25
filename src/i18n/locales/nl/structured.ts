import type { StructuredContent } from '@/i18n/types';

export const structured: StructuredContent = {
  metaTitle: 'Hoe het werkt - gestructureerde slides, geen tekeningen - Deckyard',
  metaDescription:
    'Een slide in Deckyard is een record met een type, geen canvas waar je vormen op sleept. Uit die ene keuze komen de toegankelijkheid, de koppelingen en de huisstijl voort.',
  kicker: 'Hoe het werkt',
  title: 'Een slide die weet wat hij is',
  dek: 'De meeste programma’s behandelen een slide als een canvas: een rechthoek waar je vakjes op legt, daar waar het goed uitkomt. Deckyard behandelt hem als een record met een type. Het klinkt als een technisch detail. Het is de reden dat al het andere op deze site kan bestaan.',
  stats: [
    { value: '38', label: 'slidetypes, elk met eigen velden' },
    { value: '1', label: 'gepubliceerd schema, uit de code gegenereerd' },
    { value: '0', label: 'kleuren of lettertypen in je inhoud' },
  ],

  s1Title: 'Waar een deck echt begint',
  s1Body: [
    'Niemand begint een presentatie in een presentatieprogramma. Je begint met een rapport dat iemand anders schreef, een spreadsheet met de echte cijfers, een notitie op je telefoon van een gesprek van dinsdag, en een map foto’s die niemand fatsoenlijk heeft benoemd.',
    'Dat is het ruwe materiaal, en het heeft drie vervelende eigenschappen: het ligt op vier plekken, het staat in vier formaten, en de interessante delen zitten verstopt in zinnen. Elk deck begint ermee dat iemand dat er stilletjes uit zit te halen.',
  ],

  s2Title: 'Iemand moet daar slides van maken',
  s2Body: [
    'Van oudsher ben jij die iemand, om elf uur ’s avonds, cijfers overtikkend uit een spreadsheet in tekstvakken. Die cijfers staan nu op twee plekken, en één ervan begon te verouderen op het moment dat je plakte.',
    'Het alternatief is niet "laat een robot het doen". Het is dat de slide een vastgelegde vorm heeft, zodat alles wat hem vult - jij, een script, een agent - eerst tegen die vorm gecontroleerd wordt.',
  ],

  pull: 'Controle komt niet voort uit het handmatig doen. Die komt uit het type.',

  s3Title: 'Wat een slidetype precies is',
  s3Body: [
    'Een slidetype is een klein, uitgesproken contract. Een tijdlijn verklaart dat hij een reeks momenten bevat, elk met een datum en een titel, minstens twee en hoogstens tien, en dat de volgorde betekenis draagt. Een citaat verklaart dat het iemand nodig heeft om aan toe te schrijven, en weigert zonder.',
    'In geen van die verklaringen komt een kleur, een lettertype of een positie voor. Dat is de tweede helft van het idee: de inhoud draagt de betekenis, het thema draagt het uiterlijk, en die twee raken elkaar nooit. Daarom kan dezelfde slide kloppen voor een gemeente én voor een designstudio, zonder dat er één woord verandert.',
  ],

  chainTitle: 'Wat daaruit volgt',
  chainLead:
    'Het bruikbare aan deze keuze is niet dat hij elegant is. Het is dat vier losse beloftes dezelfde belofte blijken te zijn, vier keer uitgesproken.',
  chain: [
    {
      because: 'Omdat de velden een type hebben',
      claim: 'kan een slide fatsoenlijk worden voorgelezen.',
      body: 'Een tijdlijn wordt een genummerde lijst, een tabel houdt zijn koprij, een afbeelding zegt of hij decoratief of betekenisvol is. Toegankelijkheid is geen lijstje meer dat iemand achteraf afvinkt, maar een eigenschap van het formaat.',
    },
    {
      because: 'Omdat de velden een type hebben',
      claim: 'kan alles ze vullen.',
      body: 'Een veld met een vastgelegde vorm is een aansluiting. Je datawarehouse, je beeldbibliotheek, een script of een agent kunnen hem vullen, en ze worden allemaal op dezelfde manier gecontroleerd. Niemand tikt een tabel over, en het cijfer op de slide klopt met het cijfer bij de bron.',
    },
    {
      because: 'Omdat de vormgeving elders woont',
      claim: 'bezit de organisatie het uiterlijk.',
      body: 'De huisstijl zit in themetokens, niet in het deck. Een deck kan niet off-brand raken, want hij draagt geen huisstijl bij zich. Zet de achtergrond en het logo vast en zelfs een oud deck rendert binnen de huidige stijl.',
    },
    {
      because: 'Omdat het allemaal één schema is',
      claim: 'overleeft het formaat de applicatie.',
      body: 'Het JSON Schema wordt gegenereerd uit dezelfde velddefinities die de editor en de validatie lezen, dus het kán niet afdrijven van de implementatie. Iemand anders kan een lezer, een converter of een renderer bouwen zonder het ons te vragen. Dát betekent open hier.',
    },
  ],

  compareTitle: 'Hetzelfde deck, twee manieren om het te bewaren',
  compareLead:
    'Dit is geen betoog dat canvassen slecht gemaakt zijn. Het is dat een tekening geen vragen over zichzelf kan beantwoorden, en een record wel.',
  compareAspect: '',
  compareCanvas: 'Slide als canvas',
  compareRecord: 'Slide als record',
  compareRows: [
    {
      aspect: 'Wat een slide is',
      canvas: 'Vormen op coördinaten',
      record: 'Benoemde velden met een type',
    },
    {
      aspect: 'Voorgelezen door een screenreader',
      canvas: 'Gokwerk, op tekenvolgorde',
      record: 'Echte koppen, lijsten en tabellen',
    },
    {
      aspect: 'Geopend op een telefoon',
      canvas: 'Krimpt tot het onleesbaar is',
      record: 'Herschikt als document',
    },
    {
      aspect: 'Gevuld vanuit een ander systeem',
      canvas: 'Zet een tekstvak neer en hoop',
      record: 'Vul de velden, word gevalideerd',
    },
    {
      aspect: 'Huisstijl wijzigen',
      canvas: 'Elke slide met de hand opnieuw',
      record: 'Wissel het thema, inhoud blijft',
    },
    {
      aspect: 'Over tien jaar',
      canvas: 'Hopen dat het programma hem nog opent',
      record: 'Gedocumenteerde JSON tegen een publiek schema',
    },
  ],

  ctaTitle: 'Makkelijker te zien dan te lezen',
  ctaBody:
    'De sandbox is een volledige Deckyard in je browser, zonder installatie en zonder account. Maak een tijdlijn, wissel het thema, kijk wat je gebouwd hebt.',
  ctaSandbox: 'Probeer de sandbox',
  ctaDocs: 'Lees de slidetype-referentie',

  teaserKicker: 'Het idee eronder',
  teaserTitle: 'Elke slide weet wat hij is',
  teaserBody:
    'Een Deckyard-slide is geen canvas met vakjes erop. Het is een record met een type: een tijdlijn weet dat hij een reeks bevat, een citaat weet dat het bronvermelding nodig heeft, en geen van beide draagt ook maar één kleur bij zich. Daar komen de toegankelijkheid, de koppelingen en de onbreekbare huisstijl allemaal uit voort.',
  teaserCta: 'Hoe het werkt',
  teaserFoot: 'Twee velden, en geen enkele kleur',
};
