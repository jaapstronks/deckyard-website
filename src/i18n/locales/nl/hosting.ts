import type { HostingContent } from '@/i18n/types';

export const hosting: HostingContent = {
  metaTitle: 'Hosting - zelf draaien, of het ons laten doen - Deckyard',
  metaDescription:
    'Deckyard is een Docker Compose-bestand dat je op je eigen servers kunt draaien. Wil niemand in je organisatie die klus, dan draaien wij een eigen instance voor je, op je eigen domein, in Europa.',
  heroKicker: 'Hosting',
  heroTitle: 'Deckyard draait waar jij wil',
  heroIntro:
    'De software is MIT-gelicentieerd en gemaakt om zelf te hosten, dus zelf draaien is het standaardpad en dat blijft zo. Maar iemand moet die server wel bijhouden, en niet elke organisatie heeft die iemand. Daarom draaien wij ook instances.',
  cardIntro:
    'Zelf draaien vanaf één Docker Compose-bestand, of laat ons een eigen instance voor je draaien, op je eigen domein, in Europa.',

  routesTitle: 'Twee deuren, dezelfde software',
  routesLead:
    'Geen gratis versie en een betaalde versie. Dezelfde code, op jouw infrastructuur of op die van ons, en de keuze gaat over wie het onderhoud doet.',
  selfLabel: 'Zelf draaien',
  selfTitle: 'Eén regel om het te proberen, Compose om het te draaien',
  selfBody:
    'Eén commando zet Deckyard op je eigen machine op localhost:4177, en kiest zelf tussen Docker en Node 22+. Het vervolgens voor een organisatie neerzetten gaat via Compose, met Postgres als je dat wil.',
  selfPoints: [
    'MIT-licentie, zonder features die achter een betaalde editie blijven',
    'Jouw servers, jouw jurisdictie, jouw back-upbeleid',
    'Upgraden wanneer het jou uitkomt, of nooit',
  ],
  selfCta: 'Lees de deployment-docs',
  managedLabel: 'Wij draaien het',
  managedTitle: 'Een eigen instance, op je eigen domein',
  managedBody:
    'Je eigen Deckyard, geen huurder in die van iemand anders. Gehost in Europa, op jouw domein, met de upgrades, back-ups en certificaten geregeld.',
  managedPoints: [
    'Een aparte instance, dus je data ligt niet op één hoop met die van anderen',
    'Je eigen hostnaam, met TLS ingericht en verlengd',
    'Upgrades, back-ups en monitoring geregeld',
    'Alles exporteren en weglopen kan altijd; het is dezelfde software',
  ],
  managedCta: 'Neem contact op',

  domainKicker: 'Op je eigen domein',
  domainTitle: 'Het ziet eruit als jouw organisatie, want dat is het',
  domainBody:
    'Een beheerde instance staat op een hostnaam die jij kiest en beheert, met het certificaat op jouw naam. Geen gedeelde inlogpagina met het logo van iemand anders erop, en geen leveranciersdomein in de URL die je publiek ziet.',
  domainExample: 'decks.jouw-organisatie.nl',
  domainCaption: 'Jij zet het DNS-record; de rest doen wij.',

  includedTitle: 'Wat het draaien voor je precies inhoudt',
  includedLead:
    'De eerlijke lijst. Geen pakketten, want er staat niets tussen dat we zouden achterhouden om het je later te verkopen.',
  included: [
    {
      title: 'Een eigen instance',
      body: 'Je eigen database en je eigen applicatie, geen regel in een gedeelde. Later verhuizen naar je eigen infrastructuur kan zonder export-importdans.',
    },
    {
      title: 'Europese infrastructuur',
      body: 'Gehost in Europa onder Europees recht, wat voor veel publieke organisaties het punt is dat bepaalt of dit überhaupt bruikbaar is.',
    },
    {
      title: 'Upgrades en back-ups',
      body: 'Nieuwe versies uitgerold, back-ups gemaakt en gecontroleerd, certificaten verlengd. Precies het werk dat zelf hosten tot een verplichting maakt in plaats van een installatie.',
    },
    {
      title: 'Iemand die opneemt',
      body: 'Klein genoeg dat support een persoon is die jouw opstelling kent, geen wachtrij. Daarom nemen we ook een beperkt aantal instances aan.',
    },
  ],

  fundingKicker: 'Waar het geld heen gaat',
  fundingTitle: 'De hosting betaalt de doorontwikkeling',
  fundingBody: [
    'Er zit geen durfkapitaal achter Deckyard, en er is geen plan om aan zo veel mogelijk mensen stoelen te verkopen. Dan moet het geld ergens eerlijk vandaan komen, en dit is het.',
    'Organisaties die voor een beheerde instance betalen, financieren software die iedereen verder gratis mag draaien. De roadmap volgt de organisaties die het echt gebruiken, en dat is een heel andere druk dan het volgen van de organisaties die het snelst een duurder pakket nemen.',
  ],

  contactTitle: 'Vertel wat je nodig hebt',
  contactBody:
    'Er is geen aanmeldprocedure, want dit begint als een gesprek en niet als een afrekening. Stuur een mail, dan zeggen we eerlijk of een beheerde instance of zelf hosten beter bij je past.',
  contactCta: 'Mail ons over hosting',
  contactNoteHeading: 'Handig om te vermelden',
  contactNote: [
    'je organisatie, en ongeveer hoeveel mensen decks zouden maken',
    'of je al een hostnaam in gedachten hebt',
    'waar je inkoop- of privacymensen naar gaan vragen',
  ],
};
