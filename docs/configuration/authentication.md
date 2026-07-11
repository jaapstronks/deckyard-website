---
title: "Authentication"
description: "Configure authentication for your Deckyard instance"
---

# Authentication

Set up authentication for your Deckyard installation.

## Overview

Deckyard supports authentication to secure your instance. By default, authentication is enabled but requires configuration. You can disable it explicitly by setting `AUTH_ENABLED=false`.

Authentication supports:
- Database-backed users with password authentication
- Magic link (passwordless) authentication via email
- Development bypass mode for local testing

![Account settings showing profile photo upload, display name field, and password change form](/images/screenshots/settings-account.png)

## AUTH_SECRET

The secret key used for signing session tokens. This is **required** when authentication is enabled.

```bash
AUTH_SECRET=your-random-secret-string-at-least-32-characters
```

Generate a secure secret:

```bash
# Using OpenSSL
openssl rand -base64 32

# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Important:**
- Use a long, random string (at least 32 characters recommended)
- Keep this secret secure and never commit it to version control
- Changing this secret will invalidate all existing sessions

## User Configuration

Users can be configured via environment variables or managed through the database.

### AUTH_USERS_JSON

Define users in JSON format directly in the environment variable.

**Simple format** (email:password pairs):

```bash
# Single user
AUTH_USERS_JSON={"user@example.com":"mypassword"}

# Multiple users
AUTH_USERS_JSON={"admin@example.com":"pass1","user@example.com":"pass2"}
```

**Extended format** (with roles and names):

```bash
AUTH_USERS_JSON=[{"email":"user@example.com","password":"secret","name":"User","role":"user"}]
```

### AUTH_USERS_B64

Base64-encoded user configuration. Useful when JSON characters cause issues in your environment.

```bash
# Encode your JSON
echo '{"user@example.com":{"password":"secret","role":"admin"}}' | base64

# Use the encoded value
AUTH_USERS_B64=eyJ1c2VyQGV4YW1wbGUuY29tIjp7InBhc3N3b3JkIjoic2VjcmV0Iiwicm9sZSI6ImFkbWluIn19
```

## AUTH_ADMIN_EMAIL

Set the administrator email address. The user matching this email automatically receives admin privileges, regardless of their configured role.

```bash
AUTH_ADMIN_EMAIL=admin@yourdomain.com
```

If not set, no user has automatic admin privileges—roles must be assigned explicitly.

## Magic Link Authentication

Passwordless login via email links. Users receive a secure link that logs them in automatically.

**Requirements:**
- Email service configured (see [Email Configuration](/docs/admin/email-configuration/))
- Database mode enabled for user storage

**How it works:**
1. User enters their email address
2. System sends a secure, time-limited link
3. Clicking the link authenticates the user and creates a session
4. Links expire after a single use or timeout (typically 15 minutes)

Users authenticated via magic link are stored in the database with `auth_source: 'magic_link'`.

## Password Reset Flows

When using database-backed authentication, users can reset their passwords.

**Requirements:**
- Email service configured
- Database mode enabled

**Flow:**
1. User requests a password reset
2. System sends an email with a secure reset link
3. User clicks the link and enters a new password
4. All existing sessions are invalidated
5. User is logged in with the new password

**Rate limits:**
- 3 reset requests per email per hour
- 10 reset requests per IP per hour

## Development Bypass Mode

For local development, you can bypass authentication entirely.

```bash
AUTH_DEV_BYPASS=true
```

When enabled:
- All requests are treated as coming from an admin user (`dev@local`)
- No login required
- Full admin privileges granted

⚠️ **Security Warning:** Never enable this in production. The server logs a security warning if `AUTH_DEV_BYPASS` is detected in a production environment.

## Cookie Configuration

### COOKIE_DOMAIN

Set a cookie domain for cross-subdomain single sign-on.

```bash
# Share sessions across all subdomains
COOKIE_DOMAIN=.example.com

# Single domain only
COOKIE_DOMAIN=app.example.com
```

### SECURE_COOKIES

Force secure cookies (HTTPS only). Automatically enabled when running behind HTTPS.

```bash
SECURE_COOKIES=true
```

## Session Behavior

- Sessions are valid for 14 days by default
- Sessions are stored as signed cookies (HttpOnly, SameSite=Lax)
- Password changes invalidate all existing sessions for that user
- Sessions are verified against the database on each request

## Disabling Authentication

To run Deckyard without authentication (not recommended for production):

```bash
AUTH_ENABLED=false
```

When disabled, all users have anonymous admin access.

## Related

- [Environment Variables](/docs/configuration/environment/)
- [User Management](/docs/admin/user-management/)
- [Email Configuration](/docs/admin/email-configuration/)
