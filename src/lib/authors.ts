// The face beside a byline, keyed on the name the post already carries.
//
// A post's `author` is a plain string in frontmatter, so a layout could point
// straight at one photograph and be right until the day someone else writes a
// post. This is the lookup instead: an author this map does not know has no
// portrait, which is a normal state rather than a broken image.
//
// Portraits live in public/images/authors/ and are square, so the byline can
// crop them to a circle without knowing anything about the picture.

interface Author {
  /** Path under public/. */
  avatar: string;
}

const authors: Record<string, Author> = {
  'Jaap Stronks': { avatar: '/images/authors/jaap-stronks.webp' },
};

export function authorAvatar(name: string): string | undefined {
  return authors[name]?.avatar;
}
