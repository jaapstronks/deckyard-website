---
title: "Giphy Integration"
description: "Add animated GIFs from Giphy to your presentations"
---

# Giphy Integration

Add animated GIFs from Giphy to make your presentations more engaging.

## Overview

The Giphy integration provides access to millions of GIFs and stickers. Search for animations, preview them, and add them to your slides to enhance your message with motion.

## Setup

### Get an API Key

1. Go to [Giphy Developers](https://developers.giphy.com/)
2. Create an account or sign in
3. Create a new app
4. Select **API** (not SDK)
5. Copy your **API Key**

### Configure Deckyard

Add to your `.env` file:

```bash
GIPHY_API_KEY=your-api-key-here
```

Restart Deckyard to apply the changes.

## Using Giphy

### Access the GIF Library

1. Open a slide in the editor
2. Click on an image field or the **Add Image** button
3. Select the **GIFs** tab in the image picker

### Search for GIFs

1. Type your search query (e.g., "celebration")
2. Browse the animated results
3. Hover to preview the animation
4. Click to add it to your slide

### Trending GIFs

When you open the GIF tab without searching, you'll see currently trending GIFs.

## GIF Formats

Giphy provides multiple formats:

| Format | Use Case |
|--------|----------|
| Preview | Low-res for picker |
| Original | Full quality GIF |
| Still | Static thumbnail |
| MP4 | Video format (smaller file) |

Deckyard uses:
- **Preview** for the picker interface
- **Original** for slides in edit mode
- **Still** for export thumbnails

## Content Rating

### Available Ratings

Control the type of content shown:

| Rating | Description |
|--------|-------------|
| G | General audience |
| PG | Parental guidance suggested |
| PG-13 | Parents strongly cautioned |
| R | Restricted |

### Default Setting

Deckyard defaults to **G** rating for family-friendly content.

### Changing the Rating

Administrators can configure the default rating in settings (if exposed in your instance).

## Attribution

### Powered by GIPHY

Per Giphy's terms, the GIF picker displays the "Powered by GIPHY" badge. This is required for all API integrations.

### Viewing Source

Each GIF includes a link to its original Giphy page where you can see:
- Creator information
- Related GIFs
- Sharing options

## Rate Limits

### API Limits

- **Beta keys**: 42 searches per hour, 1,000 searches per day
- **Production keys**: Higher limits (apply for access)

### Upgrade to Production

1. Go to your Giphy dashboard
2. Request production access
3. Describe your use case
4. Wait for approval

## Troubleshooting

### "Giphy API is not configured"

The API key is missing or invalid:

1. Check `GIPHY_API_KEY` in `.env`
2. Verify the key is correct
3. Restart Deckyard

### GIFs Not Playing

- Check browser supports GIF playback
- Large GIFs may take time to load
- Try a different GIF

### Search Returns No Results

- Check your search terms
- Try more common keywords
- Some terms may be filtered by content rating

### Rate Limit Errors

- Wait for limits to reset
- Apply for production access
- Consider caching popular GIFs

## Best Practices

### When to Use GIFs

GIFs work best for:
- Reactions and emotions
- Quick demonstrations
- Adding humor
- Celebrating achievements
- Breaking up dense content

### When to Avoid GIFs

Consider alternatives when:
- Presenting formally
- File size is critical
- Audience has slow connections
- Content needs to be accessible

### Accessibility

- GIFs can be distracting for some users
- Consider providing a static alternative
- Don't rely solely on GIFs to convey information

### Performance

- GIFs can be large files
- Limit the number per presentation
- Consider using MP4 format if supported

## API Details

### Search Request

```
GET https://api.giphy.com/v1/gifs/search
  ?api_key=YOUR_KEY
  &q=celebration
  &limit=20
  &offset=0
  &rating=g
  &lang=en
```

### Trending Request

```
GET https://api.giphy.com/v1/gifs/trending
  ?api_key=YOUR_KEY
  &limit=20
  &rating=g
```

### Response Format

Each GIF includes:

```json
{
  "id": "abc123",
  "title": "Celebration GIF",
  "slug": "celebration-abc123",
  "rating": "g",
  "url": "https://giphy.com/gifs/...",
  "images": {
    "original": {
      "url": "...",
      "width": "480",
      "height": "360",
      "size": "1234567",
      "mp4": "..."
    },
    "preview_gif": {
      "url": "..."
    },
    "original_still": {
      "url": "..."
    }
  }
}
```

## Related

- [Unsplash Integration](/docs/integrations/unsplash/)
- [Media Services](/docs/integrations/media-services/)
- [Image Slides](/docs/slide-types/image/)
