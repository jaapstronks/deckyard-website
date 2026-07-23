---
title: "Scaling"
description: "Scale Deckyard for high traffic and multi-instance deployments"
---

Learn when and how to scale Deckyard for higher traffic, better performance, and multi-instance deployments.

## Do I Need to Scale?

For most deployments, Deckyard works great out of the box. Consider scaling when you experience:

| Symptom | Cause | Solution |
|---------|-------|----------|
| Rate limits bypassed | Users hitting different instances | Add Redis |
| Slow permission checks | Repeated database queries | Enable caching |
| Export timeouts | Large presentations | Background jobs |
| High database load | Uncached queries | Add caching layer |

### Quick Decision Guide

- **Single server, < 50 users** → No scaling needed
- **Single server, large presentations** → Consider Redis for async exports
- **Multiple servers** → Redis required
- **100+ concurrent users** → Redis recommended

## Adding Redis

Redis enables distributed rate limiting, permission caching, and background job processing.

### Docker Compose

Add Redis to your `docker-compose.yml`:

```yaml
services:
  redis:
    image: redis:7-alpine
    container_name: deckyard-redis
    restart: unless-stopped
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

  app:
    # ... existing config
    depends_on:
      - redis
    environment:
      REDIS_URL: redis://redis:6379

volumes:
  redis_data:
```

### Environment Variables

```bash
# Option 1: Full URL
REDIS_URL=redis://localhost:6379

# Option 2: Individual settings
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your-password  # Optional
REDIS_DB=0                    # Optional

# Disable Redis (force in-memory fallback)
REDIS_ENABLED=false
```

### What Redis Enables

| Feature | Without Redis | With Redis |
|---------|---------------|------------|
| Rate limiting | Per-process memory | Shared across instances |
| Permission cache | Per-process memory | Shared, survives restarts |
| Heavy exports | Synchronous (may timeout) | Background processing |
| Multiple instances | Limited | Fully supported |

## Configuration Options

### Presentation Limits

Prevent oversized presentations from impacting performance:

```bash
# Soft limits (warnings shown to users)
PRESENTATION_SOFT_SLIDE_LIMIT=100   # Default: 100 slides
PRESENTATION_SOFT_SIZE_MB=10        # Default: 10 MB

# Hard limits (operations blocked)
PRESENTATION_HARD_SLIDE_LIMIT=500   # Default: 500 slides
PRESENTATION_HARD_SIZE_MB=50        # Default: 50 MB
```

### Permission Cache

Control how long collaborator permissions are cached:

```bash
PERMISSION_CACHE_TTL_SECONDS=300    # Default: 5 minutes
PERMISSION_CACHE_MAX_SIZE=10000     # Default: 10,000 entries
```

**Trade-offs:**
- Lower TTL = fresher data, more database queries
- Higher TTL = better performance, slightly delayed permission changes

### Analytics Retention

Control how long analytics data is stored:

```bash
ANALYTICS_RETENTION_DAYS=90         # Default: 90 days
ANALYTICS_IP_ANONYMIZATION_DAYS=30  # Default: 30 days
```

## Multi-Instance Deployment

### Architecture

```
          ┌─────────────────┐
          │  Load Balancer  │
          └────────┬────────┘
                   │
       ┌───────────┼───────────┐
       ▼           ▼           ▼
   ┌───────┐   ┌───────┐   ┌───────┐
   │ App 1 │   │ App 2 │   │ App 3 │
   └───┬───┘   └───┬───┘   └───┬───┘
       │           │           │
       └───────────┼───────────┘
                   ▼
             ┌──────────┐
             │  Redis   │
             └────┬─────┘
                  │
                  ▼
            ┌──────────┐
            │ Postgres │
            └──────────┘
```

### Requirements

1. **Shared database** - All instances connect to the same PostgreSQL
2. **Redis** - Required for shared state (rate limits, cache, jobs)
3. **Shared storage** - For uploads (use external storage like S3/ImageKit)
4. **Sticky sessions** - Optional but recommended for SSE connections

### Docker Compose (Multi-Instance)

```yaml
services:
  app:
    build: .
    deploy:
      replicas: 3
    environment:
      REDIS_URL: redis://redis:6379
      DATABASE_URL: postgresql://user:pass@db:5432/deckyard
      IMAGEKIT_PUBLIC_KEY: ...
      IMAGEKIT_PRIVATE_KEY: ...
      IMAGEKIT_URL_ENDPOINT: ...

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

  db:
    image: postgres:15-alpine
    volumes:
      - postgres_data:/var/lib/postgresql/data

  caddy:
    image: caddy:2-alpine
    ports:
      - "80:80"
      - "443:443"
```

### Kubernetes

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: deckyard
spec:
  replicas: 3
  template:
    spec:
      containers:
        - name: deckyard
          env:
            - name: REDIS_URL
              value: "redis://redis-master:6379"
            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:
                  name: deckyard-secrets
                  key: database-url
```

## Background Jobs

Heavy operations are processed in the background when Redis is available:

| Operation | Queue | Behavior |
|-----------|-------|----------|
| PPTX export | `export` | Returns job ID, poll for result |
| Handoff ZIP | `export` | Returns job ID, poll for result |
| AI Translation | `translate` | Returns job ID, poll for result |

### Client Flow

1. Request export → `202 Accepted` with job ID
2. Poll `/api/jobs/{id}` for status
3. When complete, download from `/api/jobs/{id}/download`

### Force Synchronous

Add `?sync=1` to any export URL to skip the queue:

```
/api/presentations/{id}/export/pptx?sync=1
```

## Monitoring

### Health Check

```bash
curl http://localhost:4177/health
# {"status":"ok","timestamp":1706000000000}
```

### Queue Statistics (Admin Only)

```bash
curl -H "Cookie: session=..." \
  http://localhost:4177/api/jobs/queue/export/stats

# {"queueName":"export","available":true,"waiting":0,"active":1,"completed":42}
```

### Job Status

```bash
curl http://localhost:4177/api/jobs/export-123

# {"id":"export-123","state":"completed","progress":100,"downloadUrl":"..."}
```

## Database Tuning

### Connection Pool

Adjust the connection pool for your workload:

```bash
DATABASE_POOL_MIN=2    # Default: 2
DATABASE_POOL_MAX=10   # Default: 10
```

For high-traffic deployments, consider using PgBouncer as a connection pooler.

### Indexes

Deckyard includes optimized indexes. If you notice slow queries, check:

```sql
-- View slow queries
SELECT * FROM pg_stat_statements ORDER BY total_time DESC LIMIT 10;

-- Check index usage
SELECT relname, indexrelname, idx_scan, idx_tup_read
FROM pg_stat_user_indexes
ORDER BY idx_scan ASC;
```

## Graceful Fallbacks

All scaling features degrade gracefully when Redis is unavailable:

| Feature | With Redis | Without Redis |
|---------|------------|---------------|
| Rate limiting | Shared, persistent | Per-process, resets on restart |
| Permission cache | Shared, persistent | Per-process memory |
| Background jobs | Async processing | Synchronous (may timeout) |
| Multiple instances | Fully coordinated | Independent (not recommended) |

This means you can:
- Start without Redis and add it later
- Survive Redis outages (degraded but functional)
- Run single-instance deployments with zero additional infrastructure

## Troubleshooting

### "Redis unavailable, using in-memory fallback"

This warning means Redis connection failed. Check:

1. `REDIS_URL` or `REDIS_HOST` is correct
2. Redis is running and accessible
3. Firewall allows the connection

The system continues working with in-memory fallback.

### Permission changes not reflected

With caching enabled, permission changes may take up to 5 minutes. To reduce:

```bash
PERMISSION_CACHE_TTL_SECONDS=60  # 1 minute
```

### Exports timing out

For large presentations:

1. Add Redis for background processing
2. Use `?sync=1` if you need immediate results (may still timeout)
3. Consider reducing presentation size

### Rate limits not shared across instances

Ensure all instances connect to the same Redis. Look for this log message:

```
[redis] Connected successfully
```

If you see fallback messages, Redis isn't working.

## Related

- [Docker Deployment](/docs/deployment/docker/)
- [Database Configuration](/docs/configuration/database/)
- [Environment Variables](/docs/configuration/environment/)
