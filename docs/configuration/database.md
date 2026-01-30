---
title: "Database Configuration"
description: "Configure database storage for Deckyard"
---

# Database Configuration

Deckyard supports multiple storage backends for your data.

## Storage Options

### File-based Storage (Default)

By default, Deckyard uses JSON file-based storage. No additional configuration required.

**Data locations:**
- Presentations: `server/data/presentations/`
- Uploads: `server/uploads/`

This is ideal for:
- Local development
- Single-instance deployments
- Simple self-hosted setups

### PostgreSQL

For production deployments, PostgreSQL is recommended. It provides:
- Better performance at scale
- Multi-instance support
- Reliable data persistence
- Full-text search capabilities

## PostgreSQL Setup

### 1. Enable PostgreSQL Mode

Set the storage mode in your environment:

```bash
STORAGE_MODE=postgres
```

### 2. Configure Connection

**Using individual variables (recommended):**

```bash
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=deckyard
DATABASE_USER=deckyard
DATABASE_PASSWORD=your-secure-password
```

**Using connection URL:**

```bash
DATABASE_URL=postgres://deckyard:password@localhost:5432/deckyard
```

### 3. SSL Configuration

SSL is **enabled by default** for non-localhost connections.

```bash
# Disable SSL (e.g., for local Docker networks)
DATABASE_SSL=false

# Allow self-signed certificates (e.g., managed database services)
DATABASE_SSL_REJECT_UNAUTHORIZED=false
```

### 4. Connection Pool

Configure the connection pool size:

```bash
DATABASE_POOL_MIN=2    # Minimum connections (default: 2)
DATABASE_POOL_MAX=10   # Maximum connections (default: 10)
```

## Migrations

Deckyard uses Kysely for database migrations.

### Running Migrations

Migrations run automatically on server startup when using PostgreSQL mode. You can also run them manually:

```bash
npm run db:migrate
```

### Migration Status

Check which migrations have been applied:

```bash
npm run db:migrate:status
```

### Creating New Migrations

For development, create a new migration:

```bash
npm run db:migrate:create migration-name
```

## Migrating from File to PostgreSQL

If you're upgrading from file-based storage to PostgreSQL:

### 1. Set Up PostgreSQL

Create the database and run migrations:

```bash
STORAGE_MODE=postgres npm run db:migrate
```

### 2. Migrate Existing Data

Run the migration script:

```bash
npm run db:migrate:data
```

This migrates:
- All presentations and their slides
- Tags and metadata
- Image library entries
- Published presentation data

### 3. Verify Migration

The script reports what was migrated. Verify your presentations are accessible before removing file-based data.

## Dual-Write Mode

For safe migration, you can enable dual-write mode:

```bash
# Write to both, read from file, compare results
DUAL_WRITE_MODE=shadow

# Write to both, read from file
DUAL_WRITE_MODE=primary-file

# Write to both, read from PostgreSQL
DUAL_WRITE_MODE=primary-postgres
```

This allows you to validate PostgreSQL behavior before fully switching.

## Environment Variables Reference

| Variable | Default | Description |
|----------|---------|-------------|
| `STORAGE_MODE` | `file` | Storage backend: `file` or `postgres` |
| `DATABASE_HOST` | `localhost` | PostgreSQL host |
| `DATABASE_PORT` | `5432` | PostgreSQL port |
| `DATABASE_NAME` | `deckyard` | Database name |
| `DATABASE_USER` | `deckyard` | Database user |
| `DATABASE_PASSWORD` | (empty) | Database password |
| `DATABASE_SSL` | `true` (non-localhost) | Enable SSL |
| `DATABASE_SSL_REJECT_UNAUTHORIZED` | `true` | Reject self-signed certs |
| `DATABASE_POOL_MIN` | `2` | Minimum pool connections |
| `DATABASE_POOL_MAX` | `10` | Maximum pool connections |
| `DUAL_WRITE_MODE` | `off` | Migration dual-write mode |

## Related

- [Docker Deployment](/docs/deployment/docker/)
- [Environment Variables](/docs/configuration/environment/)
