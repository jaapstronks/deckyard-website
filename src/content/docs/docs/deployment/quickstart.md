---
title: "Quickstart (Self-Host)"
description: "Get Deckyard running locally in minutes"
---

# Quickstart (Self-Host)

Get Deckyard running on your machine quickly.

## What This Is

Deckyard is a **self-hosted web app** for creating and presenting slide decks. It uses:

- Plain Node.js server
- Vanilla ESM client (no bundler)
- File-based JSON persistence on disk

## Requirements

- Node.js 18+
- npm

## Installation

```bash
# Clone the repository
git clone <repo-url>
cd deckyard

# Install dependencies
npm install

# Start the server
npm run start
# or: node server/server.js
```

## Access

Open your browser to: `http://localhost:4177`

## Configuration

1. Copy `env.example` to `.env`
2. Edit values as needed

See [Environment Variables](/docs/configuration/environment) for the full configuration reference.

## Next Steps

- [Docker Deployment](/docs/deployment/docker) - For production deployments
- [Configuration](/docs/configuration/) - Customize your instance
- [Creating Presentations](/docs/creating/) - Start making presentations
