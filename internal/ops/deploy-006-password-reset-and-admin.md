# Deploy: Password Reset, Admin User Management & Guest Commenting

## Overview

This deployment includes three related features:
1. **Password Reset** - Email-based password reset and change functionality
2. **Admin User Management** - Add, edit, and delete users from the settings panel
3. **Guest Commenting** - Email verification for non-authenticated commenters on shared presentations

## Database Migrations

Two migrations need to be run:

| Migration | Purpose |
|-----------|---------|
| `005_share_link_guests.js` | Guest verification for share link commenting |
| `006_password_reset.js` | Password reset tokens, user password storage, audit logging |

## Important: Backward Compatibility

**Existing users keep their current passwords.** The system uses dual authentication:
1. Checks database for users with `auth_source = 'database'`
2. Falls back to ENV-based users (`AUTH_USERS_JSON` / `AUTH_USERS_B64`)

Users are migrated to database auth only when they:
- Reset their password via email
- Change their password in settings
- Are created by an admin through the UI

ENV-based authentication continues to work for users who haven't changed their password.

## Deployment Steps

### 1. Verify Environment Variables

Ensure these are set for email delivery:

```bash
# Required for password reset and invitation emails
BREVO_API_KEY=your-api-key
BREVO_SENDER_EMAIL=noreply@yourdomain.com
BREVO_SENDER_NAME=Your App Name

# Already required for auth
AUTH_SECRET=your-secret-key
```

No new environment variables are required beyond what's already configured.

### 2. Deploy the Code

Deploy the latest code to production as usual.

### 3. Run the Migrations

SSH into the production server and run:

```bash
npm run db:migrate
```

Or if using Docker:

```bash
docker exec -it <container_name> npm run db:migrate
```

This will run both migrations in order (005, then 006).

### 4. Verify the Migrations

Check that both migrations were applied:

```bash
npm run db:migrate:status
```

You should see both listed as applied:
- `005_share_link_guests.js`
- `006_password_reset.js`

### 5. Restart the Application

Restart the application to ensure all new routes are loaded:

```bash
# If using PM2
pm2 restart all

# If using Docker
docker-compose restart
```

## Rollback

If needed, rollback migrations one at a time (in reverse order):

```bash
# Rollback 006 first
npm run db:migrate:down

# Then rollback 005 if needed
npm run db:migrate:down
```

**Warning**: Rolling back will:
- `006`: Remove password hashes from users table (users revert to ENV auth only)
- `005`: Remove guest sessions (guests will need to re-verify)

## Testing After Deploy

### Password Reset Flow
1. Go to login page
2. Click "Forgot password?"
3. Enter email address
4. Check email for reset link
5. Click link and set new password
6. Verify login works with new password

### Password Change Flow
1. Log in as any user
2. Go to Settings
3. Find "Change password" section
4. Enter current and new password
5. Verify old password no longer works, new one does

### Admin User Management (Admin only)
1. Log in as admin
2. Go to Settings
3. Find "User management" section
4. Add a new user with email
5. Check that invitation email is received
6. Click invitation link and set password
7. Verify new user can log in

### Guest Commenting Flow
1. Create a share link with "Can comment" permission
2. Open in incognito/private browser
3. Click "Join discussion"
4. Enter email and optional name
5. Check email for verification link
6. Click link and verify you can now comment

## Security Notes

- Password reset tokens expire after 1 hour
- Rate limiting: 3 reset requests per email per hour, 10 per IP per hour
- Tokens are single-use and stored as SHA-256 hashes
- All auth events are logged in `auth_audit_log` table
- Guest sessions expire after 7 days of inactivity
