---
title: "Sandbox Mode"
description: "Isolated demo environments for visitors"
---

# Sandbox Mode

Create isolated demo environments for visitors to explore Deckyard.

## Overview

Sandbox mode provides per-visitor isolated sessions, perfect for demos and trials. Each visitor gets their own environment to experiment with without affecting other users.

## How It Works

When sandbox mode is enabled:

1. **Per-visitor isolation** - Each visitor gets their own isolated workspace
2. **Auto-provisioned access** - Guest sessions are created automatically via cookies
3. **Sandbox watermarking** - Presentations display a sandbox indicator
4. **Automatic cleanup** - Sandbox data is periodically cleaned up

### Session Creation

When a new visitor arrives:
1. System generates a unique sandbox session ID
2. Session is stored in a cookie
3. Visitor can create and edit presentations
4. All data is scoped to their session

### Data Isolation

Each sandbox session has:
- Its own set of presentations
- Isolated image library
- Separate settings
- No visibility into other sessions

## Configuration

Enable sandbox mode via environment variable:

```bash
SANDBOX_MODE=true
```

### Additional Options

| Variable | Default | Description |
|----------|---------|-------------|
| `SANDBOX_MODE` | `false` | Enable sandbox mode |
| `SANDBOX_CLEANUP_HOURS` | `24` | Hours before sandbox data cleanup |
| `SANDBOX_MAX_PRESENTATIONS` | `5` | Max presentations per sandbox |

### Combined with Demo Mode

Sandbox mode works well with demo mode for public demonstrations:

```bash
SANDBOX_MODE=true
DEMO_MODE=true
```

This creates a fully isolated demo environment with restricted features.

## Use Cases

### Public Demos

Perfect for:
- Product demonstrations
- Marketing websites with "Try it now" functionality
- Self-service product exploration

### Product Trials

Enable potential customers to:
- Explore all features without commitment
- Create test presentations
- Experience the editor interface

### Trade Show Presentations

At events:
- Each booth visitor gets their own sandbox
- No data carries over between visitors
- Clean environment for each demonstration

### Training Environments

For workshops and training:
- Each participant has their own workspace
- No interference between participants
- Easy cleanup after sessions

## Watermarking

In sandbox mode, presentations display a visual indicator:
- "Sandbox" badge in the editor
- Watermark on exported presentations
- Clear indication this is a trial environment

## Limitations

Sandbox mode has intentional limitations:

### Disabled Features

- User authentication (guests only)
- Email notifications
- Collaboration features
- Publishing to public URLs
- API access

### Storage Limits

- Limited number of presentations
- Reduced image library capacity
- No permanent data storage

### Session Expiration

- Sessions expire after configurable period
- Data is automatically cleaned up
- No recovery of expired sandbox data

## Implementation Details

### Cookie-Based Sessions

Sandbox sessions use cookies:
- Cookie name: `sb_sandbox_session`
- Contains unique session identifier
- HttpOnly for security
- Expires with cleanup period

### Data Storage

Sandbox data is stored:
- In a separate namespace
- With session ID prefix
- Subject to automatic cleanup

### Cleanup Process

Automatic cleanup runs periodically:
1. Identifies sessions older than threshold
2. Removes associated presentations
3. Cleans up images and uploads
4. Logs cleanup statistics

## Monitoring

### Sandbox Metrics

Monitor sandbox usage:
- Active sandbox sessions
- Presentations created
- Session duration
- Cleanup statistics

### Server Logs

Sandbox events are logged:
```
[sandbox] New session created: sb_abc123
[sandbox] Cleanup: removed 15 expired sessions
```

## Security Considerations

### Isolation

- Each sandbox is completely isolated
- No cross-sandbox data access
- Guest users cannot access authenticated areas

### Resource Protection

- Rate limiting applies to sandbox users
- Storage quotas prevent abuse
- CPU/memory limits on exports

### No Persistence

- Make clear to users that data is temporary
- Display expiration warnings
- No expectation of data preservation

## Related

- [User Management](/docs/admin/user-management/)
- [Authentication](/docs/configuration/authentication/)
- [Instance Settings](/docs/admin/settings/)
