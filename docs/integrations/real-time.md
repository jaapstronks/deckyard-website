---
title: "Real-Time Updates"
description: "Server-Sent Events for live updates"
---

Deckyard uses Server-Sent Events (SSE) for real-time updates across the platform.

## Overview

Real-time features keep your presentations in sync across devices and users. SSE provides efficient, one-way streaming of events from the server to connected clients.

## Features

### Presentation Sessions

During live presentations:
- **Slide sync** - Audience follows presenter's current slide
- **Step sync** - Animated builds stay in sync
- **Control state** - Enable/disable audience control

### Collaboration

During editing:
- **Presence indicators** - See who's editing
- **Slide locks** - Know when slides are being edited
- **Comment notifications** - Instant new comment alerts
- **Activity updates** - Real-time activity feed

### Interactive Elements

For audience participation:
- **Poll results** - Live vote counts
- **Q&A updates** - New questions appear instantly
- **Feedback submission** - Real-time response collection

## How It Works

### Connection Lifecycle

1. **Connect** - Client opens SSE connection to server
2. **Subscribe** - Client subscribes to relevant channels
3. **Receive** - Server pushes events as they occur
4. **Heartbeat** - Keep-alive pings maintain connection
5. **Disconnect** - Connection closed on navigation/timeout

### SSE Protocol

Server sends events in this format:

```
event: state
data: {"slideIndex":3,"slideId":"abc123"}

event: controlEnabled
data: {"controlEnabled":true,"updatedAt":1705312200000}
```

### Heartbeats

Every 30 seconds, the server sends a heartbeat comment to keep connections alive:

```
: heartbeat
```

This prevents proxies and browsers from closing idle connections.

## Event Types

### Session Events

| Event | Payload | Description |
|-------|---------|-------------|
| `state` | `{ slideIndex, slideId, slideType, stepIdx }` | Current presentation state |
| `controlEnabled` | `{ controlEnabled, updatedAt }` | Audience control toggle |
| `branch` | `{ slideId, onClose }` | Navigate to branched slide |
| `deckUpdated` | `{ presentationId, slideId, reason }` | Presentation content changed |
| `interactionState` | `{ ... }` | Poll/Q&A state updates |

### Collaboration Events

| Event | Payload | Description |
|-------|---------|-------------|
| `presence` | `{ users }` | Active collaborators |
| `lock` | `{ slideId, email }` | Slide edit lock acquired |
| `unlock` | `{ slideId }` | Slide edit lock released |
| `comment` | `{ commentId, slideId }` | New comment added |

## Client Integration

### JavaScript Example

```javascript
// Connect to SSE endpoint
const eventSource = new EventSource('/api/present/session/ABC123/events');

// Listen for state changes
eventSource.addEventListener('state', (event) => {
  const state = JSON.parse(event.data);
  console.log('Now on slide:', state.slideIndex);
  navigateToSlide(state.slideId);
});

// Handle errors
eventSource.onerror = (error) => {
  console.error('SSE connection error:', error);
  // Implement reconnection logic
};

// Clean up on page unload
window.addEventListener('beforeunload', () => {
  eventSource.close();
});
```

### Reconnection

SSE has built-in reconnection, but you can customize:

```javascript
let retryCount = 0;
const maxRetries = 5;

function connect() {
  const eventSource = new EventSource('/api/present/session/ABC123/events');

  eventSource.onopen = () => {
    retryCount = 0; // Reset on successful connect
  };

  eventSource.onerror = () => {
    eventSource.close();
    if (retryCount < maxRetries) {
      retryCount++;
      setTimeout(connect, Math.pow(2, retryCount) * 1000);
    }
  };
}
```

## Session Management

### Creating Sessions

When you start presenting:

1. Server creates a presentation session
2. Generates short follow codes (per language)
3. Returns session ID and follow URLs

```javascript
// Start a presentation session
const response = await fetch('/api/present/session', {
  method: 'POST',
  body: JSON.stringify({ presentationId: 'abc123' })
});
const { sessionId, followCodes } = await response.json();
```

### Session State

Each session tracks:
- Current slide (index and ID)
- Step index (for animated builds)
- Control enabled/disabled
- Connected clients
- Last activity timestamp

### Session Expiry

Sessions expire after inactivity:
- Default TTL: 30 minutes
- Activity resets the timer
- Expired sessions are cleaned up automatically

## Follow Codes

### Generation

Short 4-character codes make joining easy:

```
https://your-instance.com/go
Code: ABCD
```

### Per-Language Codes

Each session generates separate codes for each language:

```javascript
followCodes: {
  nl: "ABCD",
  en: "EFGH"
}
```

### Expiry

Follow codes expire after 24 hours and are regenerated automatically for active sessions.

## Broadcasting

### Server-Side

The server broadcasts to all connected clients:

```javascript
// Internal: Send to all clients in a session
broadcast(repoRoot, sessionId, 'state', {
  slideId: 'abc123',
  slideIndex: 5,
  updatedAt: Date.now()
});
```

### Selective Broadcasting

Some events go to specific clients or exclude the sender.

## Performance

### Connection Limits

- Browser limit: ~6 SSE connections per domain
- Server handles thousands of concurrent connections

### Bandwidth

SSE is efficient:
- Small event payloads
- HTTP/2 multiplexing supported
- Compression with gzip

### Scalability

For horizontal scaling:
- Use Redis pub/sub for cross-instance broadcasts
- Sticky sessions or broadcast coordination needed

## Troubleshooting

### Connection Drops

- Check proxy timeouts
- Verify heartbeat is reaching client
- Look for browser network throttling

### Events Not Received

- Verify subscription to correct session
- Check authentication/permissions
- Monitor server logs for errors

### High Latency

- Check server load
- Verify network path
- Consider geographic distribution

## Security

### Authentication

SSE endpoints validate:
- Session ownership
- User permissions
- Valid session tokens

### Rate Limiting

Connections are rate-limited:
- Max connections per IP
- Event frequency limits
- Prevents abuse

## Related

- [Real-time Editing](/docs/collaboration/realtime-editing/)
- [Presenter Mode](/docs/presenter/)
- [Follow Mode](/docs/presenter/follow-mode/)
- [Presentation Sessions](/docs/developer/sessions/)
