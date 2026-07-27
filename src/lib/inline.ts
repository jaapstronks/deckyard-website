// Inline code spans in copy.
//
// The spec pages talk about field names constantly - `slideTypes`, `version`,
// `additionalProperties` - and a sentence that names a key without marking it as
// one is harder to read than the same sentence with a bit of markup in it. The
// alternative was splitting every such paragraph into an array of fragments in
// the locale files, which makes the copy unreadable for whoever translates it.
//
// So copy may use backticks, and nothing else. Not a markdown renderer: the
// whole string is escaped first and exactly one construct is then allowed back
// in, so a copy string can never introduce markup.

const ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
};

function escapeHtml(text: string): string {
  return text.replace(/[&<>"]/g, (c) => ESCAPES[c]);
}

/** Escape `text` and turn `backticked` runs into <code> elements. */
export function inlineCode(text: string): string {
  return escapeHtml(text).replace(/`([^`]+)`/g, '<code>$1</code>');
}
