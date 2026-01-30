---
title: "Sharing & Permissions"
description: "Control access to your presentations with permission levels"
---

# Sharing & Permissions

Control who can access your presentations and what they can do.

## Overview

Deckyard's permission system lets you share presentations with team members while controlling their access level. Share with specific users via email or create public share links.

## Permission Levels

### View

Users with view permission can:
- View the presentation
- Navigate through slides
- Access the public viewer

They cannot:
- Make any changes
- Add comments
- Access the editor

### Comment

Users with comment permission can:
- View the presentation
- Add comments and suggestions
- Mention other collaborators

They cannot:
- Edit slide content
- Delete or modify existing content

### Edit

Users with edit permission can:
- View and edit slide content
- Add, reorder, and delete slides
- Add comments
- Use the full editor

They cannot:
- Share with others
- Delete the presentation
- Transfer ownership

### Admin

Users with admin permission have full control:
- All edit permissions
- Share with others and change permissions
- Delete the presentation
- Transfer ownership

## Adding Collaborators

### Via the Share Dialog

![Share menu with collaboration options](/images/screenshots/share-menu.png)

1. Open your presentation
2. Click the **Share** button in the toolbar
3. Enter the collaborator's email address
4. Select the permission level
5. Click **Add**

The collaborator receives an email invitation with a link to the presentation.

### Via Email Invitation

When you add a collaborator:
1. System checks if email exists in the system
2. If user exists: they get immediate access
3. If user doesn't exist: they receive an invitation link

The invitation link allows access even without an account (with limited functionality).

### Sharing with Multiple People

Add multiple collaborators at once:
1. Enter email addresses separated by commas
2. Or paste a list of emails
3. Select a permission level for all
4. Click **Add All**

## Revoking Access

### Remove a Collaborator

1. Open the **Share** dialog
2. Find the collaborator in the list
3. Click the **Remove** button (or X icon)
4. Confirm the removal

The collaborator immediately loses access.

### Changing Permission Levels

1. Open the **Share** dialog
2. Find the collaborator
3. Click the current permission level
4. Select the new level from the dropdown

Changes take effect immediately.

## Presentation Scope

Presentations have a scope that affects visibility:

### Private (Default)

- Only visible to owner and explicit collaborators
- Requires authentication to view
- Most secure option

### Team/Workspace

- Visible to all members of your team or workspace
- Team members get default read access
- Useful for internal presentations

### Public

- Accessible via public share link
- No authentication required for viewing
- Interactions (polls, Q&A) still work

## Share Links

![Share Links modal with workspace invites and external share links](/images/screenshots/share-links-modal.png)

### Creating a Share Link

1. Open the **Share** dropdown in the toolbar
2. Click **Share links...**
3. In the **Share Links (External Guests)** section, configure your link options
4. Click **Create Link**
5. Copy the generated link

### Share Link Options

- **Password protection** - Require a password to view
- **Expiration date** - Link expires after a set date
- **Allow downloads** - Enable/disable export options

### Guest Access via Share Links

Viewers accessing via share link:
- Can view the presentation
- Can participate in polls and Q&A
- Cannot edit or comment
- Are tracked anonymously in analytics

## Organization Context

### Team Ownership

When you create a presentation within a team:
- Team admins have admin access
- Team members may have default access (configurable)
- Presentation belongs to the team context

### Personal vs Team Presentations

**Personal presentations:**
- You are the sole owner
- You control all sharing
- Stored in your personal space

**Team presentations:**
- Created within a team context
- Team policies may apply
- May be visible to team by default

### Moving Between Contexts

Transfer a presentation between personal and team:

1. Open presentation **Settings**
2. Click **Move to...**
3. Select destination (personal or team)
4. Confirm the move

This may change default visibility based on destination policies.

## API Access

### List Collaborators

```bash
GET /api/presentations/{id}/collaborators
```

### Add Collaborator

```bash
POST /api/presentations/{id}/collaborators
Content-Type: application/json

{
  "email": "user@example.com",
  "permission": "edit"
}
```

### Remove Collaborator

```bash
DELETE /api/presentations/{id}/collaborators/{email}
```

## Best Practices

### Principle of Least Privilege

- Start with view permission
- Upgrade to edit only when needed
- Reserve admin for trusted collaborators

### Regular Permission Audits

- Review collaborator lists periodically
- Remove access for people who no longer need it
- Check for stale share links

### Use Teams for Groups

Instead of adding many individual collaborators:
- Create a team
- Add users to the team
- Share with the team

This simplifies permission management.

## Related

- [Real-time Editing](/docs/collaboration/realtime-editing/)
- [Comments](/docs/collaboration/comments/)
- [Ownership Transfer](/docs/collaboration/ownership-transfer/)
