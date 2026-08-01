// Inline code spans in copy.
//
// The spec pages talk about field names constantly - `slides[].type`, `version`,
// `additionalProperties` - and a sentence that names a key without marking it as
// one is harder to read than the same sentence with a bit of markup in it. The
// alternative was splitting every such paragraph into an array of fragments in
// the locale files, which makes the copy unreadable for whoever translates it.
//
// So copy may use backticks, and `**bold**`, and nothing else. Not a markdown
// renderer: the whole string is escaped first and exactly two constructs are
// then allowed back in, so a copy string can never introduce markup.
//
// Bold arrived with /spec/conformance/, which is the one page on the site
// carrying normative text. "A new **required** key MUST NOT be added" turns on
// a single word, and a normative sentence that cannot emphasise the word it
// turns on either gets split into fragments in the locale file - unreadable for
// a translator, which is the thing this module exists to avoid - or loses the
// emphasis and reads as a suggestion.

const ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
};

function escapeHtml(text: string): string {
  return text.replace(/[&<>"]/g, (c) => ESCAPES[c]);
}

/**
 * Escape `text`, then turn `backticked` runs into <code> and `**bold**` runs
 * into <strong>.
 *
 * Bold first, and then code inside whatever it produced: the copy that needed
 * this bolds a claim that names two field values ("**`collection` and
 * `fixed-collection` differ only in...**"), so the two constructs have to nest
 * in that order. Doing code first would leave the bold run straddling a
 * `<code>` element it must not be allowed to cross.
 *
 * The cost is that a code span containing a literal `**` would be read as bold.
 * No copy does, and the alternative loses a construct the normative sections
 * genuinely need.
 */
export function inlineCode(text: string): string {
  return escapeHtml(text)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
}
