# Deploy: Share Link Guest Verification

## Overview

This migration adds guest email verification for share links, allowing non-authenticated users to comment on presentations shared with "comment" or "edit" permissions.

## Database Changes

Creates the `share_link_guests` table with:
- Guest records linked to specific share links
- Email verification tokens (24-hour expiry)
- Session tokens (7-day expiry)
- Rate limiting support (3 verification requests per email per hour)

## Deployment Steps

### 1. Deploy the code

Deploy the latest code to production as usual.

### 2. Run the migration

SSH into the production server and run:

```bash
npm run db:migrate
```

Or if using Docker:

```bash
docker exec -it <container_name> npm run db:migrate
```

### 3. Verify the migration

Check that the migration was applied:

```bash
npm run db:migrate:status
```

You should see `005_share_link_guests.js` listed as applied.

### 4. Verify Brevo is configured

Ensure these environment variables are set for email delivery:
- `BREVO_API_KEY` - Your Brevo API key
- `BREVO_SENDER_EMAIL` - Sender email address (e.g., `noreply@example.com`)
- `BREVO_SENDER_NAME` - Sender name (e.g., `Presentation System`)

## Rollback

If needed, rollback the migration with:

```bash
npm run db:migrate:down
```

This will drop the `share_link_guests` table. Note: any existing guest sessions will be lost.

## Testing After Deploy

1. Create a share link with "Can comment" permission
2. Open the share link in an incognito/private browser window
3. Click "Join discussion"
4. Enter an email address and optional name
5. Check the email inbox for the verification link
6. Click the verification link
7. Verify you can now add comments as a guest
