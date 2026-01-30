---
title: "Unsplash Integration"
description: "Add stock photos from Unsplash to your presentations"
---

# Unsplash Integration

Add professional stock photos from Unsplash directly to your presentations.

## Overview

The Unsplash integration provides access to millions of free, high-quality photos. Search for images, preview them, and add them to your slides without leaving Deckyard.

## Setup

### Get an API Key

1. Go to [Unsplash Developers](https://unsplash.com/developers)
2. Create an account or sign in
3. Create a new application
4. Accept the API guidelines
5. Copy your **Access Key**

### Configure Deckyard

Add to your `.env` file:

```bash
UNSPLASH_ACCESS_KEY=your-access-key-here
```

Restart Deckyard to apply the changes.

## Using Unsplash

### Access the Image Library

1. Open a slide in the editor
2. Click on an image field or the **Add Image** button
3. Select the **Unsplash** tab in the image picker

### Search for Photos

1. Type your search query (e.g., "mountain sunset")
2. Browse the results
3. Click a photo to preview it
4. Click **Use** to add it to your slide

### Photo Sizes

Unsplash provides multiple sizes:

| Size | Use Case |
|------|----------|
| Thumb | Thumbnails in picker |
| Small | Mobile displays |
| Regular | Standard slides |
| Full | High-resolution export |
| Raw | Original quality |

Deckyard automatically selects the appropriate size based on context.

## API Features

### Search

The integration uses Unsplash's search API:

- Full-text search across photo descriptions
- Results sorted by relevance
- Paginated results (20 per page)
- Maximum 30 results per request

### Download Tracking

Per Unsplash API requirements, downloads are tracked when you use a photo. This helps photographers see how their work is being used.

## Attribution

### Automatic Attribution

Deckyard stores photographer information with each photo:

- Photographer name
- Username
- Profile URL
- Original photo URL

### Displaying Credits

You can add attribution to your presentation:

1. Create a credits slide at the end
2. List photographers and their Unsplash profiles
3. Link back to the original photos

### API Terms

By using Unsplash through Deckyard, you agree to:

- Use photos for free, without requiring permission
- Not sell unaltered photos
- Credit photographers when practical
- Not compile photos to create a competing service

## Rate Limits

Unsplash API has rate limits:

- **Demo apps**: 50 requests per hour
- **Production apps**: 5,000 requests per hour

If you hit limits, you'll see an error message. Wait and try again later.

### Upgrade to Production

To get higher limits:

1. Go to your Unsplash app settings
2. Apply for production access
3. Provide your app URL and description
4. Wait for approval (usually 1-2 days)

## Troubleshooting

### "Unsplash API is not configured"

The API key is missing or invalid:

1. Check `UNSPLASH_ACCESS_KEY` in `.env`
2. Verify the key is correct
3. Restart Deckyard

### No Search Results

- Check your search terms
- Try more general keywords
- Verify your API key has access

### Rate Limit Exceeded

- Wait for the limit to reset (hourly)
- Apply for production access if needed
- Cache frequently used images locally

## Best Practices

### Image Selection

- Choose images that enhance your message
- Look for consistent visual style
- Consider your theme colors
- Check image orientation (landscape vs portrait)

### Performance

- Deckyard uses appropriately sized images
- Large presentations may benefit from caching
- Consider using your media provider for frequently used images

### Legal Use

- Unsplash photos are free for commercial use
- No permission needed for most uses
- Attribution is appreciated but not required

## API Details

### Request Format

```
GET https://api.unsplash.com/search/photos?query=...
Authorization: Client-ID YOUR_ACCESS_KEY
Accept-Version: v1
```

### Response Format

Each photo includes:

```json
{
  "id": "abc123",
  "description": "Mountain landscape at sunset",
  "width": 4000,
  "height": 3000,
  "urls": {
    "thumb": "...",
    "small": "...",
    "regular": "...",
    "full": "...",
    "raw": "..."
  },
  "user": {
    "name": "John Photographer",
    "username": "johnphoto",
    "links": {
      "html": "https://unsplash.com/@johnphoto"
    }
  }
}
```

## Related

- [Giphy Integration](/docs/integrations/giphy/)
- [Media Services](/docs/integrations/media-services/)
- [Image Slides](/docs/slide-types/image/)
