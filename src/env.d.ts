/// <reference types="astro/client" />

/**
 * Set by the inline theme script in src/layouts/SiteLayout.astro.
 *
 * It has to be a global rather than a module export: the script runs before
 * anything is bundled or hydrated (that is the whole point - it resolves the
 * theme before the first paint), so the only place it can leave a handle is
 * `window`. The theme toggle in SiteHeader.astro calls it after storing a new
 * preference, and the optional chaining is not decoration: a page that somehow
 * renders without the layout still has a working button, it just does not
 * repaint the browser chrome.
 */
declare interface Window {
  __deckyardApplyTheme?: () => void;
  __deckyardThemeBound?: boolean;
}
