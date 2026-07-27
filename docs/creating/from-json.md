---
title: "From JSON"
description: "Import presentations from Deckyard's JSON format"
---

Restore presentations from Deckyard's portable JSON export format.

![Advanced import section with Import JSON, Import Markdown, and Paste Markdown options](/images/screenshots/advanced-import-dialog.png)

## When to Use

- **Restoring backups** - Recover presentations from JSON exports
- **Migrating between instances** - Move presentations between Deckyard installations
- **Version control** - Restore from a JSON file stored in git

## How to Import

1. From the presentation list, select **Import**
2. Choose **JSON**
3. Upload your `.json` file
4. Click **Import**

A new presentation is created with all content from the JSON file.

## The format

The file is a deck envelope: a title, a theme, the slide-type identity manifest
and an ordered array of slides. It carries no server ids or timestamps, so it
imports cleanly into any instance.

Field-by-field, that is the [deck format reference](/docs/reference/deck-format/).
If your deck has images you want to travel with it, export a
[deck package](/docs/reference/deck-bundle/) instead - the JSON on its own still
points at images on the instance it came from.

## Related

- [Export to JSON](/docs/export/)
- [Deck format reference](/docs/reference/deck-format/)
- [Version History](/docs/collaboration/versions/)
