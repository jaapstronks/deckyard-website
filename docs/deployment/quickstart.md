---
title: "Quickstart (Self-Host)"
description: "Get Deckyard running on your own machine, with one command or by hand"
---

Get Deckyard running on your machine. The installer takes one line; the manual path takes five.

## What This Is

Deckyard is a **self-hosted web app** for creating and presenting slide decks. It runs as:

- A plain Node.js server
- A vanilla ESM client (no bundler)
- File-based JSON persistence on disk, with Postgres as an optional mode

## Requirements

Either of these is enough; the installer uses whichever it finds.

- **Docker**, or
- **Node.js 22 or newer** with npm

The installer does not install Docker or Node for you. If neither is present it says where to get them and stops.

## One-Line Install

```bash
curl -fsSL https://deckyard.eu/install.sh | bash
```

This clones the repository, auto-detects Docker or Node, writes a local `.env`, installs dependencies, starts the app and opens your browser at `http://localhost:4177`. Nothing leaves your machine.

It is safe to re-run: an existing install is updated in place, and an existing `.env` is left alone.

Optional knobs, all set as environment variables:

| Variable | Effect |
|----------|--------|
| `DECKYARD_DIR` | Target directory (default: `./deckyard`) |
| `DECKYARD_BRANCH` | Branch to check out (default: `main`) |
| `DECKYARD_MODE` | Force `docker` or `node` instead of auto-detecting |
| `PORT` | App port (default: `4177`) |

Piping a script into `bash` deserves a look first. It is served at [deckyard.eu/install.sh](https://deckyard.eu/install.sh), and the same file is `scripts/install.sh` in the repository.

## Manual Install

```bash
git clone https://github.com/jaapstronks/deckyard.git
cd deckyard
npm install
npm run setup   # optional: AI key, auth, port (Enter accepts defaults)
npm run start
```

## Access

Open your browser to: `http://localhost:4177`

## Configuration

`npm run setup` writes a `.env` for you. To edit it by hand, copy `.env.example` to `.env` and change what you need.

See [Environment Variables](/docs/configuration/environment) for the full configuration reference.

## Letting an AI Agent Do It

Deckyard is MCP-native, so a shell-capable coding agent can clone it, configure it with your keys, start it and wire itself in over MCP. The setup script takes flags for exactly that:

```bash
npm run setup -- --yes --ai=claude --ai-key=… --auth=off
```

## Next Steps

- [Docker Deployment](/docs/deployment/docker) - the production path, with Compose
- [Configuration](/docs/configuration/environment/) - customize your instance
- [Creating Presentations](/docs/creating/) - start making presentations
