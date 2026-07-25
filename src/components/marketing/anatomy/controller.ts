// Interactive behaviour for the slide-anatomy explainer.
//
// One controller for all three zones on purpose: picking a slide type has to
// bring the matching source card forward in zone 1 *and* re-render the slide
// in zone 3, so the behaviour does not belong to either of them. It binds
// against the shared .anatomy root and re-binds after view transitions.
import { SOURCE_OF, THEME_KEYS, THEMES } from './data';

function initAnatomy() {
  const root = document.querySelector<HTMLElement>('.anatomy');
  if (root) {
    const typeTabs = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-type]'));
    const themeTabs = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-theme]'));
    const routeTabs = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-route]'));
    const panes = Array.from(root.querySelectorAll<HTMLElement>('[data-pane]'));
    const sides = Array.from(root.querySelectorAll<HTMLElement>('[data-side]'));
    const routeBodies = Array.from(root.querySelectorAll<HTMLElement>('[data-route-body]'));
    const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-src]'));
    const slides = Array.from(root.querySelectorAll<HTMLElement>('[data-slide]'));

    function select(list: HTMLButtonElement[], attr: string, value: string) {
      list.forEach((btn) => btn.setAttribute('aria-selected', String(btn.dataset[attr] === value)));
    }

    function showType(typeId: string) {
      select(typeTabs, 'type', typeId);
      panes.forEach((p) => {
        p.hidden = p.dataset.pane !== typeId;
      });
      sides.forEach((s) => {
        s.hidden = s.dataset.side !== typeId;
      });
      // Bring the source this type draws on forward, and mark its passages.
      const srcId = SOURCE_OF[typeId];
      cards.forEach((c) => c.classList.toggle('is-active', c.dataset.src === srcId));
      markUsed(typeId);
    }

    function markUsed(typeId: string) {
      const side = sides.find((s) => s.dataset.side === typeId);
      const used = new Set<string>();
      side?.querySelectorAll<HTMLElement>('.field').forEach((f) => {
        (f.dataset.spans || '')
          .split(',')
          .filter(Boolean)
          .forEach((id) => used.add(id));
      });
      root!.querySelectorAll<HTMLElement>('[data-span]').forEach((s) => {
        s.classList.toggle('is-used', used.has(s.dataset.span || ''));
      });
    }

    function applyTheme(themeId: string) {
      select(themeTabs, 'theme', themeId);
      const vars = THEMES[themeId] || {};
      slides.forEach((slide) => {
        THEME_KEYS.forEach((k) => slide.style.removeProperty(k));
        Object.entries(vars).forEach(([k, v]) => slide.style.setProperty(k, v));
      });
    }

    function showRoute(routeId: string) {
      select(routeTabs, 'route', routeId);
      routeBodies.forEach((b) => {
        b.hidden = b.dataset.routeBody !== routeId;
        b.classList.remove('is-switching');
      });
      // Let the element this route just added arrive rather than appear.
      // Toggling the class off and back on restarts the animation; the reflow
      // in between is what makes the restart stick.
      const shown = routeBodies.find((b) => b.dataset.routeBody === routeId);
      if (shown) {
        void shown.offsetWidth;
        shown.classList.add('is-switching');
      }
    }

    function light(field: HTMLElement, on: boolean) {
      const key = field.dataset.field;
      const ids = (field.dataset.spans || '').split(',').filter(Boolean);
      const pane = panes.find((p) => !p.hidden);

      field.classList.toggle('is-lit', on);
      // Some fields (alt, imageRole) drive no visible region: they exist for
      // screen readers or for the renderer. Dimming the slide for those would
      // just look broken, so only probe when there is something to point at.
      const regions = Array.from(pane?.querySelectorAll<HTMLElement>('[data-region]') ?? []);
      const hasRegion = regions.some((r) => r.dataset.region === key);
      pane?.querySelector('.slide')?.classList.toggle('is-probing', on && hasRegion);
      regions.forEach((r) => {
        r.classList.toggle('is-lit', on && r.dataset.region === key);
      });
      root!.querySelectorAll<HTMLElement>('[data-span]').forEach((s) => {
        s.classList.toggle('is-lit', on && ids.includes(s.dataset.span || ''));
      });
    }

    typeTabs.forEach((tab) =>
      tab.addEventListener('click', () => showType(tab.dataset.type || ''))
    );
    themeTabs.forEach((tab) =>
      tab.addEventListener('click', () => applyTheme(tab.dataset.theme || ''))
    );
    routeTabs.forEach((tab) =>
      tab.addEventListener('click', () => showRoute(tab.dataset.route || ''))
    );

    root.querySelectorAll<HTMLElement>('.field').forEach((field) => {
      field.addEventListener('mouseenter', () => light(field, true));
      field.addEventListener('mouseleave', () => light(field, false));
      field.addEventListener('focus', () => light(field, true));
      field.addEventListener('blur', () => light(field, false));
    });

    showType(typeTabs[0]?.dataset.type || '');
  }
}

initAnatomy();
document.addEventListener('astro:page-load', initAnatomy);
