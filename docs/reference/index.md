---
title: "Reference Overview"
description: "Field-level reference for the deck format, the deck package, the JSON Schemas and every slide type."
---

The format Deckyard stores presentations in, written down field by field. This
section is for someone with a file in front of them: a reader being written, a
script being fixed, an archive being checked.

## Pages

- **[Deck format](/docs/reference/deck-format/)** — the portable JSON envelope:
  every top-level field, the slide-type identity manifest, asset references,
  the round-trip guarantee and the two version axes.
- **[Deck package](/docs/reference/deck-bundle/)** — the `.deck` archive that
  carries a deck plus its images: layout, manifest fields, integrity guarantees
  and how import re-hydrates it.
- **[Slide types](/docs/reference/slide-types/)** — all
  <!--gen:slide-type-count-->34<!--/gen:slide-type-count--> built-in types with
  every field, type, limit and option. Generated from the core registry.
- **[JSON Schemas](/docs/reference/schemas/)** — how to fetch a schema, what its
  `$id` means, and what the lenient contract promises.

## This section versus `/spec/`

Both describe the same format, for different readers.

| | Question it answers | How it reads |
| --- | --- | --- |
| [The spec](/spec/) | "May I build on this? Is it lock-in?" | Once, start to finish. Available in English and Dutch. |
| This section | "What does field `X` do, exactly?" | Repeatedly, by search. English only. |

If you are deciding whether the format is worth implementing against, start with
[the spec](/spec/). If you have already decided, everything you need is here.

## Nothing here is written twice

The slide-type page is generated straight from the core registry, and the format
constants (the magic sentinel, the media type, both version numbers, the schema
base URI) are substituted into these pages from the same generated data file. A
number in this section that disagrees with the software is a build failure, not
a typo waiting to be found.
