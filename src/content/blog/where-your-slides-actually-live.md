---
title: 'Where your slides actually live'
intro: 'Self-hosting is the point, not a fallback. But somebody has to keep the server patched, and for a lot of organisations that somebody does not exist. So we run instances too, and that is what funds the development.'
pubDate: 2026-07-31
lang: en
category: 'Building in public'
tags: ['self-hosting', 'sovereignty']
draft: true
---

Ask an organisation where its presentations live and you usually get a brand
name rather than a location. That is the whole problem in one answer. The decks
are somewhere, on infrastructure nobody in the building has seen, in a format
nobody in the building could open without the vendor, under rules nobody in the
building negotiated.

## Self-hosting is the point

Trying Deckyard is one line in a terminal; it picks Docker or Node 22+ and puts
the app on localhost. Running it for an organisation is the Compose path, which
is not a heroic operation either: an afternoon for someone who has set up a web
application before. The [deployment docs](/docs/deployment/quickstart/) are the
honest version of that claim, including the parts that are fiddly.

This is deliberately the default path. MIT licence, no feature gating, no
edition that mysteriously lacks the thing you need. If you run it yourself you
get all of it, and we would rather you did.

## But somebody has to patch the server

Here is where a lot of open source pitches quietly stop. Running a web
application means backups, upgrades, TLS certificates, a database that needs
attention, and being the person who gets called when it is down on the morning
of the board meeting.

Plenty of organisations that want digital sovereignty do not have anyone whose
job that is. Telling them to self-host is not an answer; it is a way of not
answering.

## So we run instances too

Not a SaaS. There is no signup page, no plan table, no seat counting. It is your
own instance, on your own domain, in Europe, with your data separate from
everybody else's - the same software you could have installed yourself, with the
maintenance handled.

Which one is right for you is mostly a question about your ops capacity, not
about features. Both paths run the same code.

## What that pays for

There is no venture capital behind Deckyard, which means the money has to come
from somewhere honest. Hosting revenue is it. Organisations that pay for a
managed instance are paying for the development of software that everybody else
gets to run for free, and the roadmap follows the people actually using it.

That is a normal arrangement in open source, and it is worth stating plainly
rather than leaving it to be inferred from a pricing page that does not exist.
