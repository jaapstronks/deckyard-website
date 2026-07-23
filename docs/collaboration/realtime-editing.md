---
title: "Real-time Editing"
description: "Work simultaneously with automatic conflict prevention"
---

Edit presentations together with your team in real-time.

## Overview

Deckyard supports concurrent editing with automatic slide-level locking to prevent conflicts. Multiple users can work on the same presentation simultaneously while seeing each other's presence.

![Editor showing the three-panel layout: slide navigator, edit fields, and live preview with comments](/images/screenshots/editor-three-panel.png)

## Slide Locks

When you start editing a slide, it becomes locked to prevent others from making conflicting changes.

### How Locks Work

1. You click on a slide to edit it
2. The system automatically acquires a lock for you
3. Other users see a lock indicator on that slide
4. When you finish editing, the lock is released

### Lock Behavior

- **Automatic acquisition** - Locks are acquired when you begin editing
- **Timeout release** - Locks automatically release after 2 minutes of inactivity
- **Manual release** - You can explicitly release a lock by leaving the slide
- **Visual indicator** - Locked slides show who is editing

### Lock Indicators

In the slide navigator, you'll see:
- **Green dot** - You are editing this slide
- **Orange dot** - Another user is editing (shows their name)
- **No dot** - Slide is available

## Presence Indicators

See who else is viewing and editing the presentation in real-time.

### Active Collaborators

The editor shows:
- **Avatar row** - Profile pictures of active users
- **Cursor position** - Which slide each user is viewing
- **Editing status** - Who is actively making changes

### User Status

Each collaborator shows their status:
- **Viewing** - Looking at the presentation
- **Editing** - Actively making changes
- **Idle** - Connected but inactive

### Presence Updates

Presence information updates in real-time:
- Users appear when they open the presentation
- Position updates as they navigate slides
- Users disappear when they close the presentation

## Conflict Resolution

Deckyard uses several strategies to prevent and resolve conflicts.

### Prevention

The primary strategy is conflict prevention:
- Slide-level locking prevents simultaneous edits
- Locks are acquired before changes can be made
- Visual indicators warn users about locks

### Automatic Merge

For non-conflicting changes:
- Different slides can be edited simultaneously
- Changes are merged automatically
- All users see updates in real-time

### Conflict Scenarios

When conflicts might occur:

**Lock Timeout:**
If your lock times out while editing:
1. System attempts to reacquire the lock
2. If another user has it, you're notified
3. Your changes are preserved locally
4. You can retry when the slide is available

**Connection Issues:**
If your connection drops:
1. Unsaved changes are preserved locally
2. When reconnected, changes are synced
3. If conflicts exist, you're prompted to resolve

### Manual Resolution

If a conflict can't be auto-resolved:
1. You see a conflict notification
2. Both versions are shown
3. Choose which version to keep
4. Or merge manually

## Real-time Updates

### Server-Sent Events (SSE)

Deckyard uses SSE for real-time communication:
- Low latency updates
- Efficient connection management
- Automatic reconnection

### What Updates in Real-time

- Slide content changes
- Slide additions and deletions
- Reordering of slides
- Collaborator presence
- Comments and reactions
- Lock status changes

### Update Propagation

When you make a change:
1. Change is sent to the server
2. Server validates and saves
3. Server broadcasts to all connected clients
4. Other users see the update

### Update Notifications

When another user saves changes to the presentation you're editing, you'll see:

- **Toast notification** — A brief info message appears at the bottom of the screen showing who made the change, e.g. *"Slides updated by jane@example.com"*
- **Automatic merge** — The updated slides are merged into your local view without interrupting your work. Slides you have locked are never overwritten.

Rapid successive saves from the same collaborator are coalesced into a single notification so the editor stays uncluttered.

## Working with Locks

### Requesting a Lock

If a slide is locked by someone else:
1. You see who has the lock
2. You can request they release it
3. They receive a notification
4. They can choose to release or continue

### Force Release (Admin)

Users with admin permission can force-release locks:
1. Click on the locked slide
2. Click **Force Release**
3. Confirm the action

Use sparingly - the other user may lose work.

### Best Practices

**Communicate:**
- Use comments to coordinate
- Let others know when you're done

**Work in sections:**
- Divide work by slide sections
- Avoid competing for the same slides

**Save frequently:**
- Changes auto-save, but be aware of lock timing
- Finish slides before moving on

## Connection Status

### Indicators

The editor shows your connection status:
- **Green** - Connected and synced
- **Yellow** - Reconnecting
- **Red** - Disconnected

### Offline Behavior

If you lose connection:
- You can continue viewing
- Edits are queued locally
- When reconnected, changes sync

### Reconnection

Automatic reconnection happens:
- On network recovery
- With exponential backoff
- Your session state is preserved

## Performance

### Large Presentations

For presentations with many slides:
- Only visible slides load fully
- Thumbnails load on demand
- Lock checks are optimized

### Many Collaborators

With many simultaneous users:
- Presence updates are batched
- Lock notifications are prioritized
- UI updates are throttled

## Related

- [Comments](/docs/collaboration/comments/)
- [Activity & Notifications](/docs/collaboration/activity-notifications/)
- [Sharing & Permissions](/docs/collaboration/sharing-permissions/)
