# CSS architecture

Read this before adding or restyling a component, a token or a global rule. The
hard rules are repeated in the root `CLAUDE.md` § CSS; this is the why and the
detail.

Global CSS is layered; the order in `src/styles/global.css` **is** the cascade
contract, so overriding an earlier layer never needs a specificity hack:

| Layer        | File             | Holds                                                                                 |
| ------------ | ---------------- | ------------------------------------------------------------------------------------- |
| `tokens`     | `tokens.css`     | `:root` custom properties. No selectors.                                              |
| `base`       | `base.css`       | Bare element defaults. No classes.                                                    |
| `primitives` | `primitives.css` | Design-system classes reused across pages (`.section`, `.btn`, `.lead`, `.page-hero`) |
| `chrome`     | `chrome.css`     | The site frame: header, nav, language switcher, footer                                |

Component `<style>` blocks are deliberately **not** in a layer. Unlayered styles
outrank every layer, so a component always wins over the global system without
fighting specificity. The rule:

- **reused across pages** -> a layer in `src/styles/`
- **owned by one component** -> that component's `<style>` block
- **shared by sibling components** -> a co-located plain `.css` file next to
  them (Astro can only scope a style to its own template, so shared chrome
  cannot be scoped; see `components/marketing/anatomy/anatomy.css`)

Two hard conventions:

1. **Never write a bare `clamp()` for a size.** Use a `--space-*` / `--step-*`
   token, or add a step to the scale in `tokens.css`. The scales exist because
   one-off clamp values had multiplied until nearly every size was unique.
2. **A dark section is a token flip, not a pile of overrides.** `.section-dark`
   re-points the semantic tokens (`--btn-primary-bg`, `--field-bg`, `--lead-fg`,
   ...). A new component that reads those tokens works on dark for free, and no
   rule in `primitives.css` has to know the component exists.

Component motion owns its own `prefers-reduced-motion` opt-out; don't collect
them in a global block. The same split applies to `forced-colors: active`: a
layer or a component repairs the states **it** paints, because a state told
apart only by a background colour disappears when the user supplies the palette.

Three accessibility tokens follow the same surface-flip rule as the rest:

- **`--brass-text`** is brass as a colour on a glyph. `--brass` / `--brass-bright`
  / `--brass-soft` are fills, rules and outlines; as small type on a light
  surface they reach 2.9:1 and 2.0:1, which is a 1.4.3 failure. Text gets
  `--brass-text`.
- **`--focus-ring`** is the `:focus-visible` outline, green on light and
  `--brass-bright` on dark. Any component that paints its own dark plate inside
  a light section - the install widget's terminal - re-points it, the same way
  `.section-dark` does.
- **`--error-fg`** likewise: the light-surface red is 2.2:1 on the dark section
  the waitlist usually sits on.

Never write `outline: none` on a `:focus` rule. Component styles are unlayered
and so outrank the layer the global focus ring lives in, which means one of
them silently cancels the ring site-wide for that element.

`src/lib/roving.ts` gives a `role="tablist"` / `role="radiogroup"` built out of
buttons the keyboard behaviour those roles promise (arrows, Home/End, one stop
in the tab order). Claim either role and you owe the reader those keys; call
`initRovingIn(root)` after wiring the clicks.
