## Webhooks (automation)

Webhooks let you notify external systems when key events happen.

### Events (current)

- `presentation.moved_to_workspace`
- `presentation.published`

### Configuration

Webhook URLs are stored in **app settings** (not `.env`).

- Configure them in the app UI (admin-only), or
- Edit the app settings JSON on disk (advanced)

![Integrations settings showing webhook URL fields for each event type and RSS feed toggle](/images/screenshots/integrations-webhooks.png)

Implementation lives in:

- `server/utils/webhooks.js` (delivery, payload shape)
- `server/storage/settings.js` (persistence + validation)

### Payload shape (overview)

Each webhook POST is JSON with:

- `event`
- `createdAt`
- `actor` (id/email/name/role)
- `presentation` (id/title/description/theme/scope/published?)
- `links` (edit/public URLs when available)
- optional `extra`

## Related

- [RSS Feeds](/docs/publishing/rss-feeds/) - Syndicate published presentations via RSS/Atom/JSON Feed
- [Instance Settings](/docs/admin/settings/) - Configure webhooks and other integrations

