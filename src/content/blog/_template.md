---
# Copy this file into the folder of the language you are writing in
# (`en/` or `nl/`), rename it to the slug you want, and delete the comments.
# The filename becomes the URL: `en/my-post.md` -> /blog/my-post/, and
# `nl/mijn-post.md` -> /nl/blog/mijn-post/. There is no `lang` field; the
# folder is the language, so the two can never disagree.
#
# A post belongs to exactly one language. A Dutch post is a separate file with
# its own Dutch slug, not a translation sitting beside the English one. Give
# both files the same `translationKey` and they become each other's official
# version: the language switcher lands on the real translation instead of the
# blog index, and both pages get a proper hreflang pair.

# Required.
title: 'A short, concrete title'
# Required. Doubles as the card teaser, the meta description and the RSS
# summary, so write it as a standalone sentence or two.
intro: 'One or two sentences that make the argument of the post on their own.'
pubDate: 2026-07-25 # drives ordering on the index; newest first

# Optional. The same string on this post's other language versions; drop it
# while the post exists in one language only.
# translationKey: 'my-post'

# Optional, with these defaults.
category: 'Building in public' # kicker above the title; use the Dutch label on Dutch posts
tags: []
author: 'Jaap Stronks'
# heroImage: /images/blog/my-post.png   # path under public/
# heroImageAlt: 'What the image shows'
# description: 'Overrides `intro` for <meta name=description> only.'
draft: true # true = visible in dev, excluded from the production build
---

Open with a paragraph, never a heading: the first paragraph gets the drop cap.

## Headings are h2

Body copy is editorial text, so no em dashes; use a spaced hyphen - like this -
or a semicolon. Blockquotes render as a large display pull quote, `inline code`
and fenced code blocks are styled, and `---` renders as a small brass divider.

The waitlist form and the "all posts" link are appended automatically by
`BlogPostPage.astro`; don't write a call to action at the end.
