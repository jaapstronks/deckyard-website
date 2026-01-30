---
title: "Presentation Sessions"
description: "Managing live presentation sessions"
---

# Presentation Sessions

Sessions enable real-time synchronization between presenters and audience members during live presentations.

## Overview

When you present a deck, a session is created to coordinate state across all connected clients. The session tracks which slide is active, handles follow codes, and broadcasts updates via Server-Sent Events (SSE).

## How Sessions Work

### Session Lifecycle

1. **Create** - Presenter starts presenting, session created
2. **Active** - Audience joins, state synchronized
3. **Update** - Presenter navigates, state broadcast
4. **Expire** - No activity for 30 minutes, session cleaned up

### Session Data

Each session stores:

```javascript
{
  sessionId: 'abc123',
  presentationId: 'pres456',
  state: {
    slideId: 'slide789',
    slideIndex: 3,
    slideType: 'content-slide',
    stepIdx: 0,
    stepParagraphs: false,
    updatedAt: 1705312200000
  },
  controlEnabled: false,
  followCodes: {
    nl: 'ABCD',
    en: 'EFGH'
  },
  followCodesCreatedAt: 1705312200000,
  createdAt: 1705312200000,
  lastActivityAt: 1705312200000,
  clients: Set(),
  heartbeatTimers: Map()
}
```

## Creating Sessions

### API Endpoint

```
POST /api/present/session
Content-Type: application/json

{
  "presentationId": "abc123"
}
```

### Response

```json
{
  "sessionId": "xyz789",
  "joinPath": "/notes/xyz789",
  "followCodes": {
    "nl": "ABCD",
    "en": "EFGH"
  }
}
```

### Session Reuse

If an active session exists for the presentation, it's reused:

- Same session ID returned
- Follow codes refreshed if expired
- Activity timestamp updated

## Session State

### State Properties

| Property | Description |
|----------|-------------|
| `slideId` | Current slide's unique ID |
| `slideIndex` | 0-based slide position |
| `slideType` | Type of current slide |
| `stepIdx` | Build step within slide |
| `stepParagraphs` | Paragraph-level stepping enabled |
| `updatedAt` | Last state change timestamp |

### Updating State

When presenter navigates:

```
PATCH /api/present/session/:sessionId/state
Content-Type: application/json

{
  "slideId": "slide789",
  "slideIndex": 5,
  "stepIdx": 2
}
```

State is broadcast to all connected clients via SSE.

## Follow Codes

### Purpose

Short, easy-to-share codes for audience to join.

### Generation

```
https://your-instance.com/go
Code: ABCD
```

- 4 uppercase letters
- One code per language
- Valid for 24 hours

### Resolution

When audience enters a code:

1. Code looked up in database
2. Target URL returned
3. Viewer redirected to follow view
4. SSE connection established

### Refresh

Codes are automatically refreshed:
- When they expire (24 hours)
- Session must still be active
- Presenter sees updated codes

## SSE Connection

### Connecting

Clients connect to receive updates:

```javascript
const eventSource = new EventSource(
  '/api/present/session/ABC123/events'
);
```

### Initial State

On connection, clients receive:
- Current state snapshot
- Control enabled status

### Event Types

| Event | Description |
|-------|-------------|
| `state` | Slide navigation |
| `controlEnabled` | Audience control toggle |
| `deckUpdated` | Presentation content changed |
| `interactionState` | Poll/Q&A updates |
| `branch` | Navigate to branched slide |

See [Real-Time Updates](/docs/integrations/real-time/) for details.

## Audience Control

### Toggle Control

Allow audience to self-navigate:

```
PATCH /api/present/session/:sessionId/control
Content-Type: application/json

{
  "enabled": true
}
```

### Control State

- **Disabled** (default) - Audience locked to presenter's slide
- **Enabled** - Audience can navigate freely

### Broadcast

Control state changes are broadcast to all clients.

## Session Expiry

### TTL (Time to Live)

Sessions expire after 30 minutes of inactivity.

### Activity Tracking

These actions reset the timer:
- State updates
- Client connections
- Control toggles
- Any API calls to session

### Cleanup

Expired sessions are:
- Removed from memory
- Cleaned from disk storage
- Follow codes invalidated

### Manual Close

Sessions can be explicitly closed:

```
DELETE /api/present/session/:sessionId
```

## Persistence

### Memory Storage

Active sessions are stored in memory for performance.

### Disk Persistence

Sessions are periodically saved to disk:
- On state changes (debounced)
- On graceful shutdown
- Loaded on server restart

### Storage Location

```
./server/data/present-sessions/
```

## Multiple Presenters

### Session Sharing

Multiple users can present the same deck:
- Same session is reused
- State updates from any presenter
- All audience members see same state

### Conflict Resolution

Last write wins - the most recent navigation is broadcast.

## Heartbeats

### Purpose

Keep SSE connections alive through proxies.

### Interval

Every 30 seconds:

```
: heartbeat
```

### Client Tracking

Each client has its own heartbeat timer:
- Created on connection
- Cleared on disconnect
- Used to detect stale connections

## Scalability

### Single Server

Default: sessions stored in memory, persisted to disk.

### Horizontal Scaling

For multiple servers:
- Use Redis for session storage
- Use Redis pub/sub for broadcasts
- Sticky sessions or distributed coordination

## API Reference

### Create Session

```
POST /api/present/session
```

### Get Session

```
GET /api/present/session/:sessionId
```

### Update State

```
PATCH /api/present/session/:sessionId/state
```

### Toggle Control

```
PATCH /api/present/session/:sessionId/control
```

### Close Session

```
DELETE /api/present/session/:sessionId
```

### SSE Events

```
GET /api/present/session/:sessionId/events
```

## Troubleshooting

### Session Not Found

- Session may have expired
- Check sessionId is correct
- Verify session was created

### Follow Code Not Working

- Code may have expired (24 hours)
- Check code was typed correctly
- Verify session is still active

### State Not Syncing

- Check SSE connection is open
- Verify no network issues
- Look for errors in browser console

### High Memory Usage

- Many concurrent sessions
- Large numbers of connected clients
- Consider horizontal scaling

## Related

- [Real-Time Updates](/docs/integrations/real-time/)
- [Follow Mode](/docs/presenter/follow-mode/)
- [Presenter Mode](/docs/presenter/)
- [Slide Rendering](/docs/developer/rendering/)
