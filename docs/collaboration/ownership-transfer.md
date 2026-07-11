---
title: "Ownership Transfer"
description: "Transfer presentation ownership to another team member"
---

# Ownership Transfer

Transfer ownership of a presentation to another team member.

## Overview

When you need to hand off a presentation to someone else, you can transfer ownership while optionally keeping access as a collaborator.

![Share Links dialog showing current owner with Transfer button for ownership transfer](/images/screenshots/share-links-permissions-dialog.png)

## When to Transfer Ownership

Common scenarios:
- **Project handoff** - Someone else is taking over
- **Team changes** - Moving to a different team
- **Leaving the organization** - Ensuring continuity
- **Responsibility shift** - New presenter or maintainer

## Transferring Ownership

### Requirements

To transfer ownership, you must:
- Be the current owner of the presentation
- Or have admin permission on it
- The new owner must have a user account

### Steps

1. Open the presentation
2. Click **Settings** > **Transfer Ownership**
3. Enter the new owner's email address
4. Choose whether to keep access (see below)
5. Click **Transfer**
6. Confirm the action

### What Changes

When ownership transfers:
- New owner gets full admin permissions
- New owner appears as the owner in all views
- Presentation moves to new owner's workspace (if applicable)
- Activity log records the transfer

## Keeping Access

When transferring, you can choose to remain as a collaborator on the presentation.

### Option: Keep Access

If you select "Keep access after transfer":
- You become a collaborator with edit permission
- You can still view and edit the presentation
- You can no longer transfer ownership or delete it
- The new owner can adjust your permissions

### Option: Remove Access

If you don't keep access:
- You lose all access to the presentation
- You cannot view or edit it
- You would need to be re-added as a collaborator

### Which to Choose

**Keep access if:**
- You'll continue contributing
- You need to support the new owner
- It's a gradual handoff

**Remove access if:**
- It's a clean break
- You're leaving the organization
- Privacy/compliance requires it

## Notifications

The new owner will be notified about the transfer.

### What the New Owner Receives

- **In-app notification** - Alert in the notification bell
- **Email notification** - If email notifications are enabled
- **Details included** - Who transferred it and when

### Notification Content

The notification includes:
- Presentation name
- Previous owner
- Transfer timestamp
- Link to the presentation

## After Transfer

### For the New Owner

The new owner can:
- Continue editing as normal
- Change collaborator permissions
- Publish or unpublish
- Transfer again if needed
- Delete the presentation

### For the Previous Owner

The previous owner:
- Sees the presentation in "Shared with me" (if they kept access)
- No longer sees it in "My Presentations"
- Has reduced permissions based on their new role

## Bulk Transfer

Admins can transfer multiple presentations at once.

### Admin Bulk Transfer

1. Go to **Admin** > **Presentations**
2. Select multiple presentations
3. Click **Bulk Actions** > **Transfer Ownership**
4. Enter the new owner
5. Confirm

This is useful when:
- A user is leaving
- Restructuring teams
- Migrating content

## API

### Transfer via API

```bash
POST /api/presentations/{id}/transfer
Content-Type: application/json

{
  "newOwnerEmail": "newowner@example.com",
  "keepAccess": true
}
```

### Response

```json
{
  "ok": true,
  "presentation": {
    "id": "abc123",
    "owner": "newowner@example.com"
  },
  "previousOwnerRole": "edit"
}
```

## Considerations

### Team Presentations

For team-owned presentations:
- Transfer may require team admin permission
- Presentation stays in team context
- Team policies still apply

### Collaborators

Existing collaborators:
- Keep their current permissions
- Are not affected by the transfer
- May receive a notification about the change

### Published Presentations

If the presentation is published:
- Public URL continues to work
- Publishing settings are preserved
- New owner can unpublish if desired

## Related

- [Sharing & Permissions](/docs/collaboration/sharing-permissions/)
- [Activity & Notifications](/docs/collaboration/activity-notifications/)
- [User Management](/docs/admin/user-management/)
