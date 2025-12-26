## Website (marketing + docs)

This folder contains the public website for the project:

- Marketing pages (Astro)
- Product + developer documentation (Starlight)

### Local dev

From repo root:

- `cd website`
- `npm install`
- `npm run dev`

Docs are sourced from the repo’s `docs/` folder and copied into `website/src/content/docs/` by:

- `npm run sync-docs`

### Build

- `npm run build`
- Output: `website/dist/`


