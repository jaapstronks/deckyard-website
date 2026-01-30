---
title: "Docker Deployment"
description: "Deploy Deckyard using Docker"
---

# Docker Deployment

Deploy Deckyard using Docker and Docker Compose for easy setup and management.

## Prerequisites

- **Docker** - Version 20.10 or later
- **Docker Compose** - Version 2.0 or later
- **Domain name** - For HTTPS (production)
- **DNS configured** - Pointing to your server

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/deckyard.git
cd deckyard
```

### 2. Create Environment File

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```bash
# Required
AUTH_SECRET=your-random-secret-key-here

# Domain (for Caddy HTTPS)
DOMAIN=slides.yourdomain.com
LETSENCRYPT_EMAIL=admin@yourdomain.com

# Optional: Database (defaults to SQLite/JSON)
DATABASE_URL=postgresql://user:pass@host:5432/deckyard

# Optional: Email
BREVO_API_KEY=your-brevo-api-key
EMAIL_SENDER_ADDRESS=slides@yourdomain.com
EMAIL_SENDER_NAME=Deckyard

# Optional: AI features
OPENAI_API_KEY=sk-...

# Optional: Media storage
IMAGEKIT_PUBLIC_KEY=...
IMAGEKIT_PRIVATE_KEY=...
IMAGEKIT_URL_ENDPOINT=...
```

### 3. Start the Stack

```bash
docker compose up -d
```

This starts:
- **app** - The Deckyard application on port 4177
- **caddy** - Reverse proxy with automatic HTTPS

### 4. Access Your Instance

Open `https://your-domain.com` in your browser.

## Docker Compose Configuration

### Default Configuration

```yaml
services:
  app:
    build: .
    container_name: deckyard-app
    restart: unless-stopped
    extra_hosts:
      - "host.docker.internal:host-gateway"
    env_file:
      - path: .env
        required: false
    environment:
      PORT: "4177"
      HOST: "0.0.0.0"
    volumes:
      - ./server/data:/app/server/data
      - ./server/uploads:/app/server/uploads
    expose:
      - "4177"

  caddy:
    image: caddy:2-alpine
    container_name: deckyard-caddy
    restart: unless-stopped
    depends_on:
      - app
    ports:
      - "80:80"
      - "443:443"
    env_file:
      - path: .env
        required: false
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile:ro
      - caddy_data:/data
      - caddy_config:/config

volumes:
  caddy_data:
  caddy_config:
```

### Volumes

| Volume | Purpose |
|--------|---------|
| `./server/data` | Presentation data, settings, sessions |
| `./server/uploads` | Uploaded images and files |
| `caddy_data` | SSL certificates and Caddy state |
| `caddy_config` | Caddy configuration cache |

## Reverse Proxy (Caddy)

### Default Caddyfile

```
{
  email {$LETSENCRYPT_EMAIL}
}

{$DOMAIN} {
  encode gzip
  reverse_proxy app:4177
}
```

Caddy automatically:
- Obtains SSL certificates from Let's Encrypt
- Renews certificates before expiry
- Redirects HTTP to HTTPS
- Enables gzip compression

### Environment Variables

Set these in your `.env` file:

```bash
DOMAIN=slides.yourdomain.com
LETSENCRYPT_EMAIL=admin@yourdomain.com
```

### Multiple Domains

To serve multiple domains:

```
{
  email {$LETSENCRYPT_EMAIL}
}

slides.example.com, presentations.example.com {
  encode gzip
  reverse_proxy app:4177
}
```

## Dockerfile

The included Dockerfile:

```dockerfile
FROM node:20-alpine

WORKDIR /app

# Install Chromium for PNG export
RUN apk add --no-cache \
  chromium \
  nss \
  freetype \
  harfbuzz \
  ca-certificates \
  ttf-freefont

# Install dependencies
COPY package.json package-lock.json* ./
COPY scripts/vendor-phosphor.js ./scripts/vendor-phosphor.js
COPY shared/phosphor-icons.js ./shared/phosphor-icons.js
RUN npm install --omit=dev || npm install

# Copy application
COPY . .

ENV NODE_ENV=production
ENV PORT=4177
ENV HOST=0.0.0.0
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

EXPOSE 4177

CMD ["node", "server/server.js"]
```

Key features:
- **Alpine base** - Small image size
- **Chromium** - For PDF/PNG exports
- **Production mode** - Optimized for deployment

## Production Configuration

### Resource Limits

Add resource limits in docker-compose.yml:

```yaml
services:
  app:
    # ... other config
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 2G
        reservations:
          cpus: '0.5'
          memory: 512M
```

### Health Checks

Add health checks for reliability:

```yaml
services:
  app:
    # ... other config
    healthcheck:
      test: ["CMD", "wget", "-q", "--spider", "http://localhost:4177/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

### Logging

Configure log rotation:

```yaml
services:
  app:
    # ... other config
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

## External Database

### PostgreSQL with Docker Compose

Add PostgreSQL to your stack:

```yaml
services:
  db:
    image: postgres:15-alpine
    container_name: deckyard-db
    restart: unless-stopped
    environment:
      POSTGRES_USER: deckyard
      POSTGRES_PASSWORD: your-secure-password
      POSTGRES_DB: deckyard
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U deckyard"]
      interval: 10s
      timeout: 5s
      retries: 5

  app:
    # ... existing config
    depends_on:
      db:
        condition: service_healthy
    environment:
      DATABASE_URL: postgresql://deckyard:your-secure-password@db:5432/deckyard

volumes:
  postgres_data:
```

### External PostgreSQL

Connect to an existing database:

```bash
DATABASE_URL=postgresql://user:pass@your-db-host:5432/deckyard
```

## Updating

### Pull Latest Changes

```bash
git pull origin main
docker compose build
docker compose up -d
```

### Zero-Downtime Updates

For production, use rolling updates:

```bash
docker compose up -d --no-deps --build app
```

## Backup

### Data Backup

Back up the data volume:

```bash
# Stop the app (optional, for consistency)
docker compose stop app

# Create backup
tar -czvf backup-$(date +%Y%m%d).tar.gz \
  ./server/data \
  ./server/uploads

# Restart
docker compose start app
```

### Database Backup

For PostgreSQL:

```bash
docker compose exec db pg_dump -U deckyard deckyard > backup.sql
```

## Troubleshooting

### View Logs

```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f app
docker compose logs -f caddy
```

### Container Status

```bash
docker compose ps
```

### Shell Access

```bash
docker compose exec app sh
```

### SSL Certificate Issues

If Caddy fails to get certificates:

1. Check domain DNS is pointing to your server
2. Verify ports 80 and 443 are open
3. Check Caddy logs: `docker compose logs caddy`

### Memory Issues

If the app crashes due to memory:

1. Increase memory limits in docker-compose.yml
2. Disable PNG export if not needed
3. Use external media storage

## Development Mode

For local development with Docker:

```bash
# Use development compose file
docker compose -f docker-compose.dev.yml up
```

Or run without Docker for faster iteration.

## Related

- [Database Configuration](/docs/configuration/database/)
- [Authentication](/docs/configuration/authentication/)
- [Email Configuration](/docs/admin/email-configuration/)
