---
title: "JSON Schemas"
description: "How to fetch a slide type's JSON Schema, what its $id means, and what the lenient contract promises."
---

Every slide type has a JSON Schema. None of them are written by hand: they are
generated from the same `fields[]` declaration that builds the editor form, runs
validation and feeds the agent catalogue. One declaration, four consumers, so a
schema cannot describe a shape the software does not accept.

## Fetching a schema

The schema routes answer **without credentials** on any instance, including the
public sandbox, because a published format contract should be fetchable.

| Method | Endpoint                                | Returns                                                  |
| ------ | --------------------------------------- | -------------------------------------------------------- |
| `GET`  | `/api/v1/schema/deck.json`              | The whole-deck schema, discriminated by slide `type`.     |
| `GET`  | `/api/v1/schema/slide-types/:name.json` | The content schema for one slide type.                    |

```bash
curl https://sandbox.deckyard.eu/api/v1/schema/slide-types/quote-slide.json
curl https://sandbox.deckyard.eu/api/v1/schema/deck.json
```

`GET /api/v1/slide-types`, which returns the full definitions rather than the
schemas, **does** require authentication. So does everything under
`/api/presentations/`.

Schemas are generated at request time from the running registry, so an instance
carrying extra slide types serves schemas for those too. That is the correct
answer for that instance, and a good reason to fetch from the instance you are
actually talking to rather than from a copy.

## What one looks like

<!--gen:example-schema-->

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://deckyard.app/schema/v3/slide-types/quote-slide.schema.json",
  "title": "quote-slide slide content",
  "type": "object",
  "properties": {
    "quote": { "type": "string", "maxLength": 400 },
    "attribution": { "type": "string", "maxLength": 160 }
  },
  "required": ["quote"],
  "additionalProperties": true
}
```

<!--/gen:example-schema-->

## `$id` and versioning

Schemas are versioned by their `$id`, which carries the major version in its
path:

- Per type: <!--gen:schema-url-type-->`https://deckyard.app/schema/v3/slide-types/<type>.schema.json`<!--/gen:schema-url-type-->
- Whole deck: <!--gen:schema-url-deck-->`https://deckyard.app/schema/v3/deck.schema.json`<!--/gen:schema-url-deck-->

**Two version numbers, do not conflate them.** The version in the `$id` is the
**content-shape** version, currently
<!--gen:schema-version-->3<!--/gen:schema-version-->. The `version` field in a
deck envelope is the **envelope** version, currently
<!--gen:envelope-version-->1<!--/gen:envelope-version-->. They move on separate
axes, which is exactly why they have drifted apart. See
[Versioning](/docs/reference/deck-format/#versioning).

The content-shape version is tied to the stored `schemaVersion` and its migration
runner, modelled on Jupyter's nbformat: a reader validates against the version it
understands, and the lenient contract below lets it tolerate keys from a newer
one.

:::caution
The `$id` domain does not currently resolve to the schemas it names. A JSON
Schema `$id` is an identifier and is not formally required to be fetchable, but
for a format offered as a standard it ought to be. Use the `/api/v1/schema/`
routes on a running instance to fetch the real thing. This is a known gap; see
[the spec's status section](/spec/).
:::

## Lenient contracts, not gates

`additionalProperties` is `true` on every generated schema. The schemas document
the known shape of a slide; they do not reject history.

- A deck written before a field existed still validates.
- A deck written after your reader was built still validates.

This is the same leniency the envelope has, for the same reason: a format that
rejects what it does not recognise cannot survive its own versions. If you are
building a reader, treat validation failures as diagnostics, not as a refusal to
open the file.

## Code

In the [core repository](https://github.com/jaapstronks/deckyard):

- Schema generation: `shared/slide-types/json-schema.js` (`SCHEMA_BASE_URI`).
- Content-shape version: `shared/slide-types/schema-version.js`
  (`CURRENT_SCHEMA_VERSION`).
- Field declarations the schemas project: `shared/slide-types/types/`.
