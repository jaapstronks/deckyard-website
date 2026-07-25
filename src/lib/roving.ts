// Keyboard behaviour for a composite widget built out of buttons - a tablist,
// or a radiogroup.
//
// Three of these exist on the site (the install widget's human/agent tabs, and
// the explainer's route tabs and slide-type tabs) and a fourth is the
// explainer's house-style picker. All four were reachable with Tab and
// operable with Enter, so nothing was unusable - but a control that announces
// itself as "tab, 1 of 3" has promised arrow keys, and the reader who takes it
// at its word finds nothing happens. Either the role goes or the keys arrive.
//
// The pattern is the WAI-ARIA one: the group is a single stop in the tab
// order, arrows move within it, and the move selects (automatic activation -
// correct here, because every panel is already in the document and showing one
// costs nothing).

/** The one item that carries the group's selection, per role. */
const STATE_ATTR: Record<string, string> = {
  tablist: 'aria-selected',
  radiogroup: 'aria-checked',
};

export function initRoving(group: HTMLElement) {
  if (group.dataset.rovingBound) return;
  const state = STATE_ATTR[group.getAttribute('role') ?? ''];
  if (!state) return;
  group.dataset.rovingBound = 'true';

  const items = () =>
    Array.from(group.querySelectorAll<HTMLElement>('[role="tab"], [role="radio"]'));

  // Only the selected item is tabbable, so Tab enters and leaves the group
  // rather than walking through it. Re-derived from the attribute after every
  // change, because the change can come from a click as easily as from a key.
  const sync = () => {
    const list = items();
    const selected = list.findIndex((item) => item.getAttribute(state) === 'true');
    const tabbable = selected === -1 ? 0 : selected;
    list.forEach((item, i) => {
      item.tabIndex = i === tabbable ? 0 : -1;
    });
  };

  group.addEventListener('keydown', (event) => {
    const list = items();
    const from = list.indexOf(document.activeElement as HTMLElement);
    if (from === -1) return;

    const last = list.length - 1;
    let to: number;
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        to = from === last ? 0 : from + 1;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        to = from === 0 ? last : from - 1;
        break;
      case 'Home':
        to = 0;
        break;
      case 'End':
        to = last;
        break;
      default:
        return;
    }
    event.preventDefault();
    list[to].focus();
    // Whatever the group already does on click is the selection logic; this
    // just reaches it from the keyboard instead of adding a second copy.
    list[to].click();
  });

  group.addEventListener('click', sync);
  sync();
}

export function initRovingIn(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[role="tablist"], [role="radiogroup"]').forEach(initRoving);
}
