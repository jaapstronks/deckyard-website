---
title: "Version History"
description: "Track changes and restore previous versions"
---

Keep track of changes and restore previous versions of your presentations.

## Overview

Deckyard automatically saves version history, allowing you to review changes and restore earlier versions when needed.

![Version history dialog showing autosave snapshots with Preview, Compare, Export, and Restore actions](/images/screenshots/version-history-dialog.png)

## Viewing Version History

Access the version history for any presentation:

1. Open the presentation
2. Click **File** > **Version History** (or press `Ctrl/Cmd + Shift + H`)
3. The version history panel opens

### History Panel

The panel shows:
- **Timeline** - Chronological list of versions
- **Author** - Who made the changes
- **Timestamp** - When changes were made
- **Summary** - Description of what changed

### Previewing a Version

Click on any version to preview:
- See the presentation as it was at that point
- Navigate through all slides
- Compare with the current version

## Automatic Snapshots

Deckyard automatically creates snapshots as you work, using a smart system that captures your work without creating unnecessary clutter.

### When Snapshots Are Created

- **Session end** - When you stop editing for 5 minutes, or close the tab
- **Safety net** - Once every 30 minutes during active editing (crash recovery)
- **Before restore** - Automatically before restoring an older version
- **Before publishing** - Automatically before each publish

This session-based approach means you get a snapshot capturing each editing session's work, plus periodic safety backups during long sessions.

### Snapshot Retention

Snapshots are retained using tiered retention:
- **Last 24 hours** - All snapshots kept
- **Days 1-7** - Best snapshot per day (prefers session-end over auto-save)
- **Weeks 1-4** - Best snapshot per week
- **Older than 4 weeks** - Automatically removed

Manual save points and labeled snapshots are **never automatically deleted**, regardless of age.

### Viewing All Snapshots

By default, only significant versions show. To see all:
1. Open version history
2. Toggle **Show all snapshots**

## Manual Save Points

Create named save points for important milestones.

### Creating a Save Point

1. Click **File** > **Create Save Point**
2. Enter a descriptive name (e.g., "Before client review")
3. Optionally add a note
4. Click **Save**

### Save Point Features

Manual save points:
- Have custom names for easy identification
- Are **never automatically deleted** (exempt from retention rules)
- Appear prominently in version history
- Can include descriptive labels

### Recommended Save Points

Create save points:
- Before major revisions
- After completing a section
- Before sharing for review
- Before publishing
- At project milestones

## Restoring Previous Versions

### Full Restore

To restore a complete version:

1. Open version history
2. Select the version you want
3. Click **Restore This Version**
4. Confirm the action

**What happens:**
- Current state is saved as a new version (safety backup)
- Selected version becomes the current presentation
- All collaborators see the restored version

### Partial Restore

To restore only specific slides:

1. Preview the version you want
2. Click **Copy Slides**
3. Select which slides to copy
4. Choose where to insert them
5. Confirm

This keeps your current work while bringing back specific content.

## Comparing Versions

### Side-by-Side Comparison

Compare two versions:
1. Select the first version
2. Hold `Shift` and click the second version
3. Click **Compare**

### Difference View

The comparison highlights:
- **Green** - Added content
- **Red** - Removed content
- **Yellow** - Modified content

### Navigation

- Use arrows to jump between changes
- Counter shows total number of differences
- Click any change to see details

## Activity Log

Beyond versions, see all activity:

### What's Logged

- Edits and saves
- Collaborator access
- Comments added/resolved
- Export operations
- Publish events
- Permission changes

### Viewing Activity

1. Click **File** > **Activity Log**
2. Filter by activity type
3. Filter by user
4. Filter by date range

## Storage and Limits

### Version Storage

Version history uses storage:
- Full copies for named versions
- Efficient diffs for auto-snapshots
- Media is deduplicated across versions

### Managing Space

If you need to reduce storage:
- Delete old manual versions you no longer need
- Auto-snapshots clean up automatically
- Contact admin if you need more space

## Related

- [Real-time Editing](/docs/collaboration/realtime-editing/)
- [Activity & Notifications](/docs/collaboration/activity-notifications/)
- [Export Formats](/docs/export/)
