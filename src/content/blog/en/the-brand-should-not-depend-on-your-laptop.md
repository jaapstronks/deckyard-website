---
title: 'The brand should not depend on your laptop'
intro: 'In PowerPoint the house style is only as good as the fonts installed on the machine that opens the file. A theme should be a small file the organisation owns, and one person should be allowed to own it without also running the servers.'
translationKey: 'brand-off-your-laptop'
pubDate: 2026-07-28
category: 'Design decisions'
tags: ['themes', 'fonts', 'brand']
draft: true
---

You open a colleague's deck and something is subtly wrong. The headings are
heavier than they should be, a title that used to fit on one line now wraps, and
the spacing has gone slightly loose everywhere. Nobody edited anything. The
fonts simply were not on this machine, so the file fell back to whatever was.

That is the normal state of affairs, and it is worth naming for what it is: the
house style lives on people's laptops, not in the document.

## A font that lives on the server, not on the machine

In Deckyard the fonts belong to the organisation, not to the person opening the
file. Forty curated faces ship with the platform and are served by your own
instance, so no external request goes out and nothing has to be installed. If
your brand uses something else you upload the `.woff2` files, or connect an
Adobe Fonts or Monotype project.

The practical effect is that a deck looks the same for the person who joined
last week and never received the brand package. Exports carry the fonts with
them too, so the PDF that leaves the building is not quietly re-typeset by
somebody else's reader.

## A theme is deliberately small

A Deckyard theme is a JSON file holding colours, type, logos and background
assets. That is it. It is not a design system and it is not trying to be one.

Small is the feature. The failure mode of brand tooling is not that it lacks
expressive power; it is that making one is a project, so nobody makes one, so
everybody keeps improvising in the deck itself. A theme you can finish in an
afternoon is a theme that actually exists.

It works because the content carries no styling at all. A slide holds fields,
never a colour or a font, which is [the decision underneath the whole
thing](/structured-slides/). The theme is therefore the only place the brand
lives, and swapping it restyles every deck ever made, including the ones from
two years ago.

## Somebody has to own it, and it should not have to be an admin

Here is the part that took a migration to get right. Managing themes and fonts
is not an administrator's job. It is the job of whoever guards the brand, and
that person usually has no business managing user accounts or servers.

So designer is not a role in Deckyard. It is a separate capability on somebody's
membership of an organisation, orthogonal to whether they are a user, an admin
or the owner. Owners get it by default, an organisation can decide whether its
admins get it too, and anyone else can be granted it on its own. The person who
owns the house style gets exactly the keys to the house style.

The cost of all this is real and worth stating: you cannot override the theme on
a single slide when you want that one thing to be red. That is annoying about
once per organisation, and it is the same property that keeps a four-year-old
deck on brand.
