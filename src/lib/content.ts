// The rule both editorial collections follow: an entry's language is the
// folder it sits in, never a frontmatter field.
//
// Two things come out of that. The location and the language cannot disagree,
// so nothing can quietly file a Dutch text as English. And the languages stop
// sharing an id namespace, which matters because the glob loader keys its
// store on the id: two entries that slugify to the same string collide, and
// the collision is a build *warning* - the loser disappears from the site with
// a green build.

import { isLang, type Lang } from '@/i18n';

/**
 * The language folder an entry id starts with. Throws rather than guessing:
 * a file in the wrong place should fail the build, not pick up a language by
 * accident.
 */
export function langFromFolder(id: string, collection: string): Lang {
  const [dir] = id.split('/');
  if (!isLang(dir)) {
    // The id is slugified, so it is not always the filename: name the folder
    // the file belongs in rather than guessing what the file is called.
    throw new Error(
      `${collection} entry "${id}" is not in a language folder. ` +
        `Move the file into src/content/${collection}/en/ or src/content/${collection}/nl/.`
    );
  }
  return dir;
}
