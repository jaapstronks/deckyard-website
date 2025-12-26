const LS_LANG_KEY = 'dreamslides.lang.ui';

function $(sel, root = document) {
  return root.querySelector(sel);
}

function $all(sel, root = document) {
  return Array.from(root.querySelectorAll(sel));
}

function setAriaPressed(btns, lang) {
  for (const b of btns) {
    const isActive = String(b.dataset.lang || '') === lang;
    b.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  }
}

function readUiLang() {
  try {
    const v = localStorage.getItem(LS_LANG_KEY);
    return v === 'nl' ? 'nl' : 'en';
  } catch {
    return 'en';
  }
}

function writeUiLang(lang) {
  try {
    localStorage.setItem(LS_LANG_KEY, lang);
  } catch {
    // ignore
  }
}

function initLanguageSwitchUiOnly() {
  const btns = $all('[data-js="langBtn"]');
  if (btns.length === 0) return;

  // UI only: we persist a selected language so the toggle feels real,
  // but we do not translate page content in v1.
  const initial = readUiLang();
  setAriaPressed(btns, initial);

  for (const b of btns) {
    b.addEventListener('click', () => {
      const lang = String(b.dataset.lang || '') === 'nl' ? 'nl' : 'en';
      writeUiLang(lang);
      setAriaPressed(btns, lang);
    });
  }
}

function initMobileNav() {
  const toggle = $('[data-js="navToggle"]');
  const links = $('[data-js="navLinks"]');
  const header = $('[data-js="siteHeader"]');
  const closeBtn = $('[data-js="navClose"]');
  if (!toggle || !links || !header) return;

  function close() {
    links.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    if (isOpen) {
      // move focus inside drawer for accessibility
      const first = links.querySelector('a,button');
      first?.focus?.();
    }
  });

  closeBtn?.addEventListener('click', () => {
    close();
    toggle.focus();
  });

  // Close on link click (mobile).
  links.addEventListener('click', (e) => {
    const a = e.target && e.target.closest ? e.target.closest('a') : null;
    if (!a) return;
    if (links.classList.contains('is-open')) close();
  });

  // Close on outside click.
  document.addEventListener('click', (e) => {
    const target = e.target;
    if (!links.classList.contains('is-open')) return;
    if (header.contains(target)) return;
    close();
  });

  // Close on Escape.
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (!links.classList.contains('is-open')) return;
    close();
    toggle.focus();
  });
}

function initExportChips() {
  const chips = $all('[data-js="exportChip"]');
  const panels = $all('.export-panel');
  if (chips.length === 0 || panels.length === 0) return;

  function setActive(targetId) {
    for (const c of chips) {
      const isActive = String(c.dataset.target || '') === targetId;
      c.classList.toggle('is-active', isActive);
      c.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    }
    for (const p of panels) {
      const isActive = String(p.dataset.id || '') === targetId;
      p.classList.toggle('is-active', isActive);
    }
  }

  // Make it accessible-ish even though this is a simple sketch: buttons act like a toggle group.
  for (const c of chips) {
    c.setAttribute('aria-pressed', c.classList.contains('is-active') ? 'true' : 'false');
    c.addEventListener('click', () => setActive(String(c.dataset.target || 'html')));
  }
}

function initExportAccordion() {
  const wrap = $('[data-js="exportAccordion"]');
  if (!wrap) return;
  const items = $all('details.export-item', wrap);
  if (items.length === 0) return;

  // Keep behavior close to the Lovable prototype: one open at a time.
  for (const d of items) {
    d.addEventListener('toggle', () => {
      if (!d.open) return;
      for (const other of items) {
        if (other === d) continue;
        other.open = false;
      }
    });
  }
}

function initHeroEmbed() {
  const root = $('[data-js="heroEmbed"]');
  if (!root) return;
  const src = String(root.dataset.embedSrc || '').trim();
  const frame = $('[data-js="heroEmbedFrame"]', root);
  const loading = $('[data-js="heroEmbedLoading"]', root);
  const error = $('[data-js="heroEmbedError"]', root);
  const openBtn = $('[data-js="heroEmbedOpen"]', root);
  const link = $('[data-js="heroEmbedLink"]', root);
  if (!frame || !src) return;

  // Wire links.
  try {
    if (openBtn) openBtn.setAttribute('href', src);
    if (link) link.setAttribute('href', src);
  } catch {
    // ignore
  }

  let settled = false;
  function showError() {
    if (settled) return;
    settled = true;
    if (loading) loading.hidden = true;
    if (error) error.hidden = false;
  }
  function showFrame() {
    if (settled) return;
    settled = true;
    if (loading) loading.hidden = true;
    if (error) error.hidden = true;
    frame.classList.add('is-loaded');
  }

  // In some environments `onerror` on iframes is unreliable, so also add a timeout fallback.
  const timeout = window.setTimeout(showError, 4500);
  frame.addEventListener('load', () => {
    window.clearTimeout(timeout);
    showFrame();
  });
  frame.addEventListener('error', () => {
    window.clearTimeout(timeout);
    showError();
  });

  frame.setAttribute('src', src);
}

initLanguageSwitchUiOnly();
initMobileNav();
initExportChips();
initExportAccordion();
initHeroEmbed();


