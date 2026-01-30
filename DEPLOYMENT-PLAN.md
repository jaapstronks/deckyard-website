# Deckyard Production Deployment Plan

## Overview

This plan covers deploying the complete Deckyard ecosystem on Scaleway:
- **deckyard.eu** - Marketing website + documentation (static)
- **app.deckyard.eu** - Paid hosted version with client portal and payments
- **try.deckyard.eu** - Public sandbox for trying out the product

---

## Architecture Summary

```
                    ┌─────────────────┐
                    │   Cloudflare    │  (CDN, DDoS, SSL)
                    └────────┬────────┘
                             │
          ┌──────────────────┼──────────────────┐
          ▼                  ▼                  ▼
    deckyard.eu        app.deckyard.eu    try.deckyard.eu
    (Object Storage)   (VPS - Production)  (VPS - Sandbox)
          │                  │                  │
    Static files      ┌──────┴──────┐     ┌────┴────┐
    (2.5MB Astro)     │   nginx     │     │  nginx  │
                      └──────┬──────┘     └────┬────┘
                             │                 │
                      ┌──────┴──────┐    ┌────┴────┐
                      │ deckyard-   │    │deckyard │
                      │   cloud     │    │ (sandbox│
                      │  (4180)     │    │  mode)  │
                      └──────┬──────┘    └────┬────┘
                             │                 │
                      ┌──────┴──────┐    File-based
                      │   deckyard  │    storage
                      │    core     │    (ephemeral)
                      │   (4177)    │
                      └──────┬──────┘
                             │
                      ┌──────┴──────┐
                      │ PostgreSQL  │
                      └─────────────┘
                             │
                      ┌──────┴──────┐
                      │ Object      │
                      │ Storage     │
                      │ (uploads,   │
                      │  exports)   │
                      └─────────────┘
```

### Repository Roles

| Repository | Purpose | Technology |
|------------|---------|------------|
| **deckyard-website** | Static marketing site + docs | Astro SSG, 2.5MB static files |
| **deckyard** | Core presentation engine | Node.js, PostgreSQL, Puppeteer/Chromium |
| **deckyard-cloud** | Billing layer + proxy | Express.js, SQLite, Mollie payments |

### Key Finding: Sandbox Mode

The main deckyard repo has **built-in sandbox mode** - no fork needed. It's activated via environment variable:

```bash
SANDBOX_MODE=1
SANDBOX_TTL_HOURS=24          # Auto-cleanup after 24h
DISABLE_UPLOADS=1             # Prevent abuse
SANDBOX_WATERMARK="Try Deckyard - upgrade for full features"
```

Features in sandbox mode:
- Guest users via anonymous cookies (no registration needed)
- Auto-deletion of presentations after TTL
- Watermarked exports
- Disabled uploads (prevents storage abuse)
- Built-in rate limiting (8 exports/min, 12 publishes/min)
- Limited AI (Mistral only, not OpenAI/Claude)

---

## Recommended Architecture

### Option A: Split VPS (Recommended for Launch)

| Component | Domain | Hosting | Scaleway Type | Monthly Cost |
|-----------|--------|---------|---------------|--------------|
| **Website** | deckyard.eu | Object Storage + Cloudflare | S3-compatible | ~€3 |
| **Production** | app.deckyard.eu | VPS (Paris) | DEV1-M (3GB) | ~€12 |
| **Sandbox** | try.deckyard.eu | VPS (Paris) | DEV1-S (2GB) | ~€6 |
| **Object Storage** | - | Uploads/exports | Scaleway S3 | ~€2 |

**Total: ~€23/month**

### Option B: Consolidated VPS (Budget Alternative)

Run sandbox on same VPS as production using subdomain routing and rate limiting:

| Component | Domain | Hosting | Monthly Cost |
|-----------|--------|---------|--------------|
| **Website** | deckyard.eu | Object Storage | ~€3 |
| **All Apps** | app/try.deckyard.eu | Single DEV1-L (4GB) | ~€18 |
| **Object Storage** | - | Uploads/exports | ~€2 |

**Total: ~€23/month** (same cost, but production shares resources with sandbox)

### Why Split is Recommended

1. **Isolation**: Sandbox abuse (Puppeteer load) can't affect paying customers
2. **Security**: Payment data on separate instance
3. **Maintenance**: Can reset sandbox without touching production
4. **Scaling**: Upgrade production VPS independently

---

## VPS Specifications

### VPS 1: Website (deckyard.eu)

**Option A: Scaleway Stardust (Cheapest)**
- **Type**: STARDUST1-S
- **RAM**: 1GB
- **CPU**: 1 vCPU
- **Storage**: 10GB SSD
- **Cost**: ~€2/month
- **Use case**: nginx serving static files

**Option B: Object Storage + CDN (Recommended)**
- **Type**: Scaleway Object Storage + Edge Services
- **Storage**: Pay-per-use (~€0.02/GB)
- **CDN**: Included
- **Cost**: ~€1-3/month
- **Use case**: Pure static hosting, no server maintenance

### VPS 2: Production (app.deckyard.eu)

**Type**: DEV1-M or GP1-XS
- **RAM**: 3-4GB (for Node.js + Chromium for PDF export)
- **CPU**: 2-3 vCPUs
- **Storage**: 40-60GB SSD
- **Cost**: €7-20/month

**Requirements**:
- PostgreSQL database (for multi-user production)
- deckyard-cloud (port 4180) + deckyard core (port 4177)
- Caddy for HTTPS + reverse proxy
- Docker + Docker Compose

### VPS 3: Sandbox (try.deckyard.eu)

**Type**: DEV1-S
- **RAM**: 2GB
- **CPU**: 2 vCPUs
- **Storage**: 20GB SSD (ephemeral, can be small)
- **Cost**: ~€4-8/month

**Requirements**:
- Only deckyard core (no deckyard-cloud, no billing)
- File-based storage (no PostgreSQL needed)
- SANDBOX_MODE=1
- Caddy for HTTPS
- Docker

---

## Deployment Configuration

### 1. Website Deployment (deckyard.eu)

**Using Scaleway Object Storage:**

```bash
# Build locally
cd deckyard-website
npm install
npm run build

# Upload to Object Storage
s3cmd sync ./dist/ s3://deckyard-website/ --acl-public

# Configure bucket as static website
# Enable CDN via Scaleway Edge Services
```

**Or using VPS with nginx:**

```nginx
server {
    listen 80;
    server_name deckyard.eu www.deckyard.eu;
    root /var/www/deckyard-website;
    index index.html;

    location / {
        try_files $uri $uri/ $uri.html =404;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### 2. Production Deployment (app.deckyard.eu)

**docker-compose.yml:**

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    restart: unless-stopped
    environment:
      POSTGRES_DB: deckyard
      POSTGRES_USER: deckyard
      POSTGRES_PASSWORD: ${DATABASE_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U deckyard"]
      interval: 10s
      timeout: 5s
      retries: 5

  deckyard-core:
    build: ./deckyard
    restart: unless-stopped
    environment:
      PORT: 4177
      HOST: 0.0.0.0
      NODE_ENV: production
      STORAGE_MODE: postgres
      DATABASE_HOST: postgres
      DATABASE_PORT: 5432
      DATABASE_NAME: deckyard
      DATABASE_USER: deckyard
      DATABASE_PASSWORD: ${DATABASE_PASSWORD}
      DATABASE_SSL: "false"
      AUTH_ENABLED: "true"
      AUTH_SECRET: ${AUTH_SECRET}
      AUTH_ADMIN_EMAIL: ${ADMIN_EMAIL}
      # AI providers
      OPENAI_API: ${OPENAI_API}
      CLAUDE_API: ${CLAUDE_API}
      # Media APIs
      UNSPLASH_ACCESS_KEY: ${UNSPLASH_ACCESS_KEY}
      GIPHY_API_KEY: ${GIPHY_API_KEY}
    volumes:
      - core_uploads:/app/server/uploads
    depends_on:
      postgres:
        condition: service_healthy

  deckyard-cloud:
    build: ./deckyard-cloud
    restart: unless-stopped
    environment:
      PORT: 4180
      NODE_ENV: production
      CORE_URL: http://deckyard-core:4177
      APP_URL: https://app.deckyard.eu
      JWT_SECRET: ${JWT_SECRET}
      MOLLIE_API_KEY: ${MOLLIE_API_KEY}
      MONEYBIRD_API_TOKEN: ${MONEYBIRD_API_TOKEN}
      MONEYBIRD_ADMINISTRATION_ID: ${MONEYBIRD_ADMINISTRATION_ID}
      PRICE_MONTHLY_CENTS: 1500
      PRICE_YEARLY_CENTS: 15000
    volumes:
      - cloud_data:/app/data
    depends_on:
      - deckyard-core

  caddy:
    image: caddy:2-alpine
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile
      - caddy_data:/data
      - caddy_config:/config
    depends_on:
      - deckyard-cloud

volumes:
  postgres_data:
  core_uploads:
  cloud_data:
  caddy_data:
  caddy_config:
```

**Caddyfile:**

```
app.deckyard.eu {
    reverse_proxy deckyard-cloud:4180

    header {
        Strict-Transport-Security "max-age=31536000; includeSubDomains"
        X-Content-Type-Options "nosniff"
        X-Frame-Options "DENY"
        Referrer-Policy "strict-origin-when-cross-origin"
    }
}
```

### 3. Sandbox Deployment (try.deckyard.eu)

**docker-compose.sandbox.yml:**

```yaml
version: '3.8'

services:
  deckyard-sandbox:
    build: ./deckyard
    restart: unless-stopped
    environment:
      PORT: 4177
      HOST: 0.0.0.0
      NODE_ENV: production
      # Sandbox mode
      SANDBOX_MODE: "1"
      SANDBOX_TTL_HOURS: "24"
      SANDBOX_WATERMARK: "Created with Deckyard Sandbox - Upgrade for full features"
      DISABLE_UPLOADS: "1"
      # AI (limited to Mistral for cost control)
      MISTRAL_API: ${MISTRAL_API}
      MISTRAL_MODEL: mistral-large-latest
      # Media (optional)
      UNSPLASH_ACCESS_KEY: ${UNSPLASH_ACCESS_KEY}
      GIPHY_API_KEY: ${GIPHY_API_KEY}
    volumes:
      - sandbox_data:/app/server/data
      - sandbox_uploads:/app/server/uploads

  caddy:
    image: caddy:2-alpine
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./Caddyfile.sandbox:/etc/caddy/Caddyfile
      - caddy_data:/data
      - caddy_config:/config
    depends_on:
      - deckyard-sandbox

volumes:
  sandbox_data:
  sandbox_uploads:
  caddy_data:
  caddy_config:
```

**Caddyfile.sandbox:**

```
try.deckyard.eu {
    reverse_proxy deckyard-sandbox:4177

    header {
        Strict-Transport-Security "max-age=31536000"
        X-Content-Type-Options "nosniff"
        X-Robots-Tag "noindex, nofollow"
    }
}
```

---

## Environment Variables Reference

### Production (.env)

```bash
# Database
DATABASE_PASSWORD=strong-random-password-here

# Authentication
AUTH_SECRET=32-char-random-string-for-sessions
JWT_SECRET=32-char-random-string-for-jwt
ADMIN_EMAIL=admin@deckyard.eu

# Payments (Mollie)
MOLLIE_API_KEY=live_xxxxxxxxxxxxxxxx

# Invoicing (Moneybird)
MONEYBIRD_API_TOKEN=xxxxxxxx
MONEYBIRD_ADMINISTRATION_ID=xxxxxxxx

# AI Providers
OPENAI_API=sk-xxxxxxxx
CLAUDE_API=sk-ant-xxxxxxxx

# Media
UNSPLASH_ACCESS_KEY=xxxxxxxx
GIPHY_API_KEY=xxxxxxxx
```

### Sandbox (.env.sandbox)

```bash
# AI (Mistral only - cheaper)
MISTRAL_API=xxxxxxxx

# Media
UNSPLASH_ACCESS_KEY=xxxxxxxx
GIPHY_API_KEY=xxxxxxxx
```

---

## DNS Configuration

Configure at your domain registrar:

| Record | Type | Value |
|--------|------|-------|
| deckyard.eu | A | [Website VPS IP or CDN] |
| www.deckyard.eu | CNAME | deckyard.eu |
| app.deckyard.eu | A | [Production VPS IP] |
| try.deckyard.eu | A | [Sandbox VPS IP] |

---

## CI/CD Pipeline (GitHub Actions)

### Required GitHub Secrets

Set these in each repository's Settings → Secrets and Variables → Actions:

| Secret | Repository | Description |
|--------|------------|-------------|
| `SCW_ACCESS_KEY` | deckyard-website | Scaleway API access key |
| `SCW_SECRET_KEY` | deckyard-website | Scaleway API secret key |
| `PRODUCTION_HOST` | deckyard, deckyard-cloud | Production VPS IP address |
| `SANDBOX_HOST` | deckyard | Sandbox VPS IP address |
| `SSH_PRIVATE_KEY` | All | SSH key for deployment |

### Website Deployment (deckyard-website repo)

```yaml
# .github/workflows/deploy.yml
name: Deploy Website

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Install s3cmd
        run: |
          sudo apt-get update
          sudo apt-get install -y s3cmd

      - name: Configure s3cmd
        run: |
          cat > ~/.s3cfg << EOF
          [default]
          access_key = ${{ secrets.SCW_ACCESS_KEY }}
          secret_key = ${{ secrets.SCW_SECRET_KEY }}
          host_base = s3.fr-par.scw.cloud
          host_bucket = %(bucket)s.s3.fr-par.scw.cloud
          use_https = True
          EOF

      - name: Deploy to Scaleway Object Storage
        run: |
          s3cmd sync ./dist/ s3://deckyard-website/ \
            --delete-removed \
            --acl-public \
            --add-header="Cache-Control:public, max-age=31536000, immutable" \
            --exclude="*.html" \
            --exclude="sitemap*.xml"

          # HTML files with shorter cache (for updates)
          s3cmd sync ./dist/ s3://deckyard-website/ \
            --exclude="*" \
            --include="*.html" \
            --include="sitemap*.xml" \
            --acl-public \
            --add-header="Cache-Control:public, max-age=3600"

      - name: Purge Cloudflare cache (optional)
        if: ${{ secrets.CLOUDFLARE_API_TOKEN != '' }}
        run: |
          curl -X POST "https://api.cloudflare.com/client/v4/zones/${{ secrets.CLOUDFLARE_ZONE_ID }}/purge_cache" \
            -H "Authorization: Bearer ${{ secrets.CLOUDFLARE_API_TOKEN }}" \
            -H "Content-Type: application/json" \
            --data '{"purge_everything":true}'
```

### Production Deployment (deckyard + deckyard-cloud repos)

```yaml
# .github/workflows/deploy-production.yml
name: Deploy Production

on:
  push:
    branches: [main]
  workflow_dispatch:  # Allow manual trigger

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Production
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.PRODUCTION_HOST }}
          username: deploy
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /opt/deckyard

            # Pull latest changes
            cd deckyard && git pull origin main && cd ..
            cd deckyard-cloud && git pull origin main && cd ..

            # Rebuild and restart with zero downtime
            docker compose build --no-cache
            docker compose up -d

            # Clean up old images
            docker image prune -f

            # Health check
            sleep 10
            curl -f http://localhost:4180/health || exit 1
```

### Sandbox Deployment (deckyard repo)

```yaml
# .github/workflows/deploy-sandbox.yml
name: Deploy Sandbox

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Sandbox
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.SANDBOX_HOST }}
          username: deploy
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /opt/deckyard-sandbox
            git pull origin main
            docker compose -f docker-compose.sandbox.yml build --no-cache
            docker compose -f docker-compose.sandbox.yml up -d
            docker image prune -f
```

---

## Scaleway Setup Steps

### 1. Create VPS Instances

```bash
# Install Scaleway CLI
brew install scw

# Login
scw init

# Create Production VPS (Paris region)
scw instance server create \
  type=DEV1-M \
  image=ubuntu_jammy \
  name=deckyard-production \
  zone=fr-par-1

# Create Sandbox VPS (Paris region)
scw instance server create \
  type=DEV1-S \
  image=ubuntu_jammy \
  name=deckyard-sandbox \
  zone=fr-par-1

# Create Object Storage bucket (Paris region)
scw object bucket create name=deckyard-uploads region=fr-par
scw object bucket create name=deckyard-website region=fr-par
```

### 2. Initial Server Setup

```bash
# SSH into server
ssh root@<server-ip>

# Update system
apt update && apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com | sh
systemctl enable docker

# Install Docker Compose
apt install docker-compose-plugin

# Create deploy user (for CI/CD)
useradd -m -s /bin/bash deploy
usermod -aG docker deploy
mkdir -p /home/deploy/.ssh
# Add your SSH public key to /home/deploy/.ssh/authorized_keys

# Create app directory
mkdir -p /opt/deckyard
chown deploy:deploy /opt/deckyard
cd /opt/deckyard

# Clone repositories (as deploy user)
su - deploy
cd /opt/deckyard
git clone https://github.com/yourorg/deckyard.git
git clone https://github.com/yourorg/deckyard-cloud.git

# Create .env file
nano .env

# Start services
docker compose up -d
```

---

## Verification Checklist

After deployment:

- [ ] Website loads at https://deckyard.eu
- [ ] Documentation accessible at https://deckyard.eu/docs/
- [ ] All 12 locales work (e.g., /nl/, /de/, /fr/)
- [ ] Sandbox loads at https://try.deckyard.eu
- [ ] Can create presentation in sandbox without login
- [ ] Presentations auto-deleted after 24h
- [ ] Exports are watermarked
- [ ] Production loads at https://app.deckyard.eu
- [ ] Checkout flow works with Mollie test mode
- [ ] Webhook endpoint receives Mollie callbacks
- [ ] Users can log in after payment
- [ ] SSL certificates valid on all domains
- [ ] Rate limiting active on sandbox

---

## Cost Summary

| Component | Service | Monthly Cost |
|-----------|---------|--------------|
| Website | Object Storage + CDN | ~€3 |
| Production VPS | DEV1-M | ~€12 |
| Sandbox VPS | DEV1-S | ~€6 |
| Object Storage (backups) | 50GB | ~€1 |
| **Total** | | **~€22/month** |

---

## Security Considerations

1. **Firewall**: Only ports 80/443 open
2. **SSH**: Key-only authentication, no password
3. **Secrets**: All in .env files, never in git
4. **Backups**: Daily PostgreSQL dumps to Object Storage
5. **Updates**: Automated security patches via unattended-upgrades
6. **Mollie webhooks**: Validate signatures
7. **Rate limiting**: Built into sandbox mode

---

## Implementation Order

Execute in this sequence:

### Phase 1: Infrastructure Setup
1. Create Scaleway account and API keys
2. Provision VPS instances (Production + Sandbox)
3. Create Object Storage buckets
4. Configure DNS records at registrar
5. Set up Cloudflare (optional but recommended)

### Phase 2: Production Deployment
1. SSH into production VPS
2. Install Docker and Docker Compose
3. Clone deckyard and deckyard-cloud repos
4. Configure `.env` file with all secrets
5. Run `docker compose up -d`
6. Verify https://app.deckyard.eu loads
7. Configure Mollie webhook URL

### Phase 3: Sandbox Deployment
1. SSH into sandbox VPS
2. Install Docker
3. Clone deckyard repo
4. Configure sandbox `.env`
5. Run `docker compose -f docker-compose.sandbox.yml up -d`
6. Verify https://try.deckyard.eu loads

### Phase 4: Website Deployment
1. Build deckyard-website locally
2. Upload to Object Storage
3. Configure bucket as public/static website
4. Verify https://deckyard.eu loads

### Phase 5: CI/CD Setup
1. Add GitHub Secrets to each repository
2. Create workflow files
3. Test with a commit push

---

## Next Steps After Deployment

1. Complete client portal UI in deckyard-cloud (subscription management, invoices)
2. Add shared authentication between cloud and core (single sign-on)
3. Set up monitoring (Uptime Kuma, Grafana, or Scaleway Cockpit)
4. Configure email notifications (Brevo integration in deckyard-cloud)
5. Add usage analytics
6. Create backup restoration procedure
7. Document support/troubleshooting runbook
