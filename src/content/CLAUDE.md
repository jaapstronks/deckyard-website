# Editorial content: blog and release notes

Read this before writing or moving a blog post or a release note. Both are
outgoing editorial copy in **both** languages: no em dashes (use `-` or `;`).

## Language and URL

- **An editorial entry's language is its folder**, never a frontmatter field:
  `src/content/blog/en/`, `src/content/blog/nl/`, and the same for
  `src/content/releases/`. The location and the language then cannot disagree,
  and the two languages cannot collide in the id (the glob loader keys its
  store on the id and a duplicate is only a build _warning_ - the loser
  vanishes from the site silently). `src/lib/content.ts` holds the guard, which
  fails the build rather than guessing; `src/lib/blog.ts` adds the blog's own
  derivations: `postLang`, `postSlug`, `postUrl`. Each locale gets its own feed
  (`/rss.xml`, `/nl/rss.xml`, ...).
- A post belongs to one language and the filename is the URL, so a Dutch post is
  a separate file with its own **Dutch** slug, not `<english-slug>.nl.md`. Give
  the two files the same **`translationKey`** and they become each other's
  official version: `hreflang` gets a real pair and the language switcher lands
  on the translation instead of the blog index. Leave it off and the post is
  untranslated, which is a normal state, not a defect. Start from
  `src/content/blog/_template.md`; underscore-prefixed files are excluded from
  the collection glob, so the template never becomes a post. `draft: true` is
  visible in `npm run dev` and dropped from the production build - and a draft
  translation is not advertised as a translation.
- **The URL comes from the file path** - unless a post sets `slug:` in
  frontmatter, which the glob loader honours first and verbatim, before the
  schema runs. `content.config.ts` deliberately leaves it undeclared: a post
  that wants a different URL should get a different filename rather than a
  second place where the URL is decided.

## Release notes (`/changelog`)

The public changelog is **hand-written**, not a mirror of `deckyard/CHANGELOG.md`.
The generated changelog is a commit list; this one is written for someone who
runs Deckyard and is deciding whether to update. Nothing in the build reads the
core repo's tags, so a release only reaches the site when someone writes it.

- One file per language per version, named after the version:
  `src/content/releases/en/1.3.0.md` and `.../nl/1.3.0.md`. Start from
  `src/content/releases/_template.md` (underscore-prefixed, so the glob skips it).
- **`latest: true` moves.** Exactly one release carries it per language; take it
  off the previous version in the same commit.
- Order is date-first, version as the tiebreaker (`src/lib/releases.ts`), because
  two versions can share a date and the collection's own order is alphabetical.
- Source material is the core repo's `CHANGELOG.md` section for the tag plus the
  GitHub Release. `refactor`/`chore`/`docs`/`test` commits are not release-note
  material.

**How a release gets here.** `deckyard`'s `merge-housekeeping` skill (section C)
notices at re-arm that a tag was cut and files a briefing to this repo; a session
that starts here writes the notes and closes it. The hub may also write them
directly (`deckyard/CLAUDE.md` § Releases). Either way the copy stays
hand-written.
