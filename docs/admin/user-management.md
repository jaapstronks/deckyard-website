---
title: "User Management"
description: "Add, remove, and manage users in your instance"
---

# User Management

Manage users in your Deckyard instance.

## Overview

Administrators can add new users, manage roles, and control access to the platform. User management requires:
- Database mode enabled (`STORAGE_MODE=postgres`)
- Admin privileges

## Adding Users

### Via Admin Panel

![User management panel showing user list with email, role, status, and action buttons](/images/screenshots/user-management.png)

1. Navigate to **Admin** > **Users**
2. Click **Add User**
3. Enter the user's email address
4. Optionally enter their display name
5. Select a role (User or Admin)
6. Click **Create**

The user receives an invitation email with a link to set up their account.

### Via API

```bash
POST /api/admin/users
Content-Type: application/json
Authorization: Bearer <admin-token>

{
  "email": "newuser@example.com",
  "name": "New User",
  "role": "user",
  "sendInvitation": true
}
```

**Rate limit:** 20 user creations per admin per hour.

## User Roles

Deckyard has two user roles:

### User Role

Standard users can:
- Create and manage their own presentations
- Collaborate on presentations shared with them
- Access the image library
- Use all editor features

### Admin Role

Admins have all user permissions plus:
- Access to user management
- Access to instance settings
- View and configure webhooks
- Manage email templates
- Access analytics dashboards

### Assigning Admin Role

A user becomes an admin if:
1. Their email matches `AUTH_ADMIN_EMAIL` environment variable
2. They are explicitly assigned the admin role via the admin panel
3. Their role is set to "admin" in `AUTH_USERS_JSON`

## Invite Flows

### Initial Invitation

When you create a new user:
1. User record is created with `auth_source: 'database'`
2. An invitation token is generated (valid for 7 days)
3. An invitation email is sent with a setup link
4. User clicks the link and sets their password
5. Account is activated

### Resending Invitations

If a user hasn't activated their account:
1. Go to **Admin** > **Users**
2. Find the user
3. Click **Resend Invitation**

A new invitation token is generated and an activation reminder email is sent.

### Magic Link Users

Users can also be created via magic link authentication:
1. User enters their email on the login page
2. If magic link is enabled, they receive a login link
3. On first login, a user record is created with `auth_source: 'magic_link'`

These users don't have passwords and always log in via email.

## Password Resets

### User-Initiated Reset

Users can reset their own passwords:
1. Click "Forgot password" on the login page
2. Enter their email address
3. Receive a reset link via email
4. Click the link and set a new password

### Admin-Initiated Reset

Admins can trigger a password reset:
1. Go to **Admin** > **Users**
2. Find the user
3. Click **Reset Password**
4. User receives an email with reset instructions

Password resets:
- Invalidate all existing sessions for that user
- Generate a time-limited reset token
- Are rate-limited (3 per email per hour, 10 per IP per hour)

## Removing Users

### Deleting a User

1. Go to **Admin** > **Users**
2. Find the user
3. Click **Delete**
4. Confirm the deletion

**Important:**
- Admins cannot delete their own account
- Deleting a user removes their login credentials
- Presentations owned by the user are not automatically deleted
- Consider transferring ownership of presentations before deletion

### Via API

```bash
DELETE /api/admin/users/{userId}
Authorization: Bearer <admin-token>
```

## User Status

Users can have different statuses:

| Status | Description |
|--------|-------------|
| **Active** | User can log in normally |
| **Pending** | Invitation sent, waiting for setup |
| **Inactive** | Account disabled (future feature) |

## Viewing User Details

The user list shows:
- Email address
- Display name
- Role (User/Admin)
- Status
- Created date
- Last login (if available)

Click on a user to see detailed information including:
- Account creation details
- Invitation status
- Authentication source

## Audit Logging

User management actions are logged:
- User creation (who created, when)
- User deletion (who deleted, when)
- Role changes
- Password resets

Logs include IP addresses and user agents for security auditing.

## Related

- [Authentication](/docs/configuration/authentication/)
- [Sharing & Permissions](/docs/collaboration/sharing-permissions/)
- [Email Configuration](/docs/admin/email-configuration/)
