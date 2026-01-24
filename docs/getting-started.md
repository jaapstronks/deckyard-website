## Getting started (self-host)

### What this is

This is a **self-hosted web app** to create and present slide decks. It uses:

- Plain Node.js server
- Vanilla ESM client (no bundler)
- File-based JSON persistence on disk

### Quickstart (local)

- Install deps: `npm install`
- Start: `npm run start` (or `node server/server.js`)
- Open: `http://localhost:4177`

### Configuration

- Copy `env.example` to `.env` and set values as needed.
- See `docs/product/configuration/environment.md` for the full `.env` schema.








