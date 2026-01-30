---
title: "Website Hosting"
description: "Hosting options for the Deckyard documentation and marketing website"
---

# Website Hosting

This project’s public website is a static build (Astro) located in `website/`.

### EU-first hosting options

If you prefer EU-based providers for values/alignment:

- **Self-host the static site on an EU VPS** (recommended for simplicity + control)
  - Providers: Hetzner (DE), Scaleway (FR), OVHcloud (FR), etc.
  - Serve `website/dist/` with Caddy or Nginx.
- **EU object storage + CDN**
  - Example: Scaleway Object Storage (FR) with static website hosting + CDN.
  - Good when you want “no servers”, but it adds more moving parts.
- **Self-host GitLab + GitLab Pages** (EU deployment)
  - If you already run GitLab in the EU, Pages is great.

### A pragmatic default

If you already deploy the app to an EU VPS, the lowest-complexity path is:

- build the website in CI
- upload `website/dist/` to the same server
- serve it from the same Caddy instance (different host or path)

### Notes on “US companies with global CDNs”

For a static marketing/docs site (no user accounts, no tracking by default), a US vendor is often fine technically.
But if your product messaging is explicitly EU/public-values aligned, hosting in the EU is a reasonable choice to avoid mixed signals.








