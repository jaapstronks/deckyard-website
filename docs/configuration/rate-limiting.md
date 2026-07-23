---
title: "Rate Limiting"
description: "Configure rate limiting for API endpoints"
---

Deckyard includes built-in rate limiting to protect against abuse and ensure fair usage.

## Overview

Rate limiting uses a token bucket algorithm that:
- Allows burst traffic up to the bucket capacity
- Refills tokens at a steady rate
- Tracks limits per IP address

## Configuration

### Trust Proxy

When running behind a reverse proxy (nginx, Caddy, etc.), enable proxy trust to get the real client IP:

```bash
TRUST_PROXY=true
```

This allows Deckyard to read the client IP from:
- `X-Forwarded-For` header (first IP in chain)
- `X-Real-IP` header

⚠️ **Security:** Only enable this when running behind a trusted proxy. Otherwise, clients can spoof their IP address.

## Endpoint Limits

### Lead Capture

Protects lead submission endpoints from spam:

| Limit Type | Rate |
|------------|------|
| Per IP | 10 submissions per minute |
| Global | 100 submissions per minute |

### Follow Codes

Protects the follow-along feature:

| Endpoint | Limit |
|----------|-------|
| Code creation | 10 per hour per IP |
| Code resolution | 60 per hour per IP |

### Authentication

Protects authentication endpoints:

| Endpoint | Limit |
|----------|-------|
| Password reset requests | 3 per email per hour |
| Password reset (by IP) | 10 per hour per IP |
| Share link verification | 3 per email per hour |

### Admin Operations

Protects administrative endpoints:

| Endpoint | Limit |
|----------|-------|
| User creation | 20 per hour per admin |

## API Rate Limits

The public API has tiered rate limits:

| Tier | Requests per minute |
|------|---------------------|
| Standard | 60 |
| High | 300 |

Rate limit information is included in API response headers:

```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1706140800
```

### Handling Rate Limits

When rate limited, the API returns:

```json
{
  "error": "Too many requests",
  "retryAfter": 30
}
```

**HTTP Status:** `429 Too Many Requests`

Implement exponential backoff in your API clients to handle rate limits gracefully.

## IP Address Detection

Deckyard validates IP addresses to prevent spoofing attacks:

1. Checks `X-Forwarded-For` header (if `TRUST_PROXY=true`)
2. Falls back to `X-Real-IP` header
3. Uses socket remote address as final fallback

Invalid IP formats in headers are logged and ignored:

```
[rate-limit] Invalid X-Forwarded-For IP: malicious-string
```

## Supported IP Formats

- IPv4: `192.168.1.1`
- IPv6: `2001:0db8:85a3::8a2e:0370:7334`
- IPv4-mapped IPv6: `::ffff:192.168.1.1`
- Bracketed IPv6: `[::1]`

## Scaling Considerations

The built-in rate limiter uses in-memory storage. For multi-instance deployments:

- Each instance maintains its own rate limit buckets
- Effective rate limits are multiplied by the number of instances
- For strict rate limiting across instances, use an external solution (Redis, database)

## Customizing Limits

Rate limits are configured in the codebase. To adjust limits for your deployment, modify the rate limit middleware in `server/utils/rate-limit.js`.

Example configuration:

```javascript
allowRequest(key, {
  capacity: 10,      // Maximum burst
  refillPerSec: 0.5  // Refill rate (0.5 = 1 token every 2 seconds)
})
```

## Related

- [Authentication](/docs/configuration/authentication/)
- [API Documentation](/docs/developer/api/)
