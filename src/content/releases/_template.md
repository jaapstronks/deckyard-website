---
# Copy this file into the folder of the language you are writing in (`en/` or
# `nl/`), rename it to the version (`1.4.0.md`), and delete the comments. One
# release is one file per language, both named after the version; the folder is
# the language, so the two can never disagree.
#
# Where the material comes from: `deckyard/CHANGELOG.md` (the section for this
# tag) plus the GitHub Release. `refactor`/`chore`/`docs`/`test` commits are not
# release-note material - nothing changes for someone running Deckyard.

# Required. Semver, quoted. Doubles as the anchor slug (dots -> dashes), so both
# languages link to the same anchor on their own changelog page.
version: '1.4.0'
# Required. The release date, i.e. the date on the tag.
date: 2026-07-25
# Required. One line under the version heading; also the teaser. Name what
# changed for the reader, not how many PRs it took.
summary: 'One sentence that says what this release is, on its own.'

# Optional. Short badge next to the version: 'Feature release', 'Maintenance
# release', 'Security release'. Dutch gets the Dutch label.
tag: 'Feature release'
# Optional. Marks the newest release. Exactly one release carries it, in each
# language, so move it off the previous version in the same commit.
latest: true
# Optional. true = visible in dev, excluded from the production build.
# draft: true
---

Open with a paragraph, never a heading: two or three sentences on what this
release is about, written for someone who *runs* Deckyard and is deciding
whether to update.

If there is a reason to update now - a security fix, data loss, a broken
upgrade path - say so in bold right here, before the sections. Don't leave it
buried under "Security" at the bottom.

### Headings are h3

Group by what the reader gets, not by Conventional-Commit type. A bullet says
what is different and, where it isn't obvious, what it means for you:

- **The short version in bold.** Then the sentence that explains it, including
  the setting to change or the thing to check, if there is one.

Body copy is editorial text, so no em dashes; use a spaced hyphen - like this -
or a semicolon. This holds in both languages.

For the complete, commit-level list, see the [1.4.0 release on GitHub](https://github.com/jaapstronks/deckyard/releases/tag/v1.4.0).
