---
title: "Media Services"
description: "Configure external media storage and CDN"
---

# Media Services

Configure external media storage for better performance and scalability.

## Overview

By default, Deckyard stores uploaded images locally. For production deployments, configure an external media provider for:

- **CDN delivery** - Faster loading worldwide
- **Scalable storage** - Unlimited capacity
- **Image optimization** - Automatic resizing and formats
- **Reduced server load** - Offload media handling

## Supported Providers

### ImageKit

Full-featured image CDN with optimization:

```bash
IMAGEKIT_PUBLIC_KEY=public_xxxxxxxxxxxxxxx
IMAGEKIT_PRIVATE_KEY=private_xxxxxxxxxxxxxxx
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your-id
```

Features:
- Automatic format conversion (WebP, AVIF)
- Real-time image resizing
- Lazy loading support
- Global CDN

### Scaleway Object Storage

S3-compatible storage with CDN:

```bash
SCALEWAY_ACCESS_KEY=SCWxxxxxxxxxxxxxxxxxx
SCALEWAY_SECRET_KEY=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
SCALEWAY_REGION=fr-par
SCALEWAY_BUCKET=your-bucket-name
SCALEWAY_ENDPOINT=https://s3.fr-par.scw.cloud
```

Features:
- S3-compatible API
- European data centers
- Pay-per-use pricing
- CDN integration available

### AWS S3

Amazon's object storage:

```bash
AWS_ACCESS_KEY_ID=AKIAxxxxxxxxxxxxxxxx
AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket-name
```

Features:
- Highly reliable
- CloudFront CDN integration
- Fine-grained access control
- Multiple storage classes

### S3-Compatible Storage

Any S3-compatible provider (MinIO, DigitalOcean Spaces, etc.):

```bash
S3_ENDPOINT=https://your-s3-endpoint.com
S3_ACCESS_KEY=your-access-key
S3_SECRET_KEY=your-secret-key
S3_BUCKET=your-bucket-name
S3_REGION=auto
```

## Configuration

### Choose a Provider

Set the media provider in your environment:

```bash
# Options: imagekit, scaleway, s3, local
MEDIA_PROVIDER=imagekit
```

If not specified, the system auto-detects based on available credentials.

### Local Storage (Default)

For development or single-server deployments:

```bash
# No configuration needed
# Files stored in ./server/uploads/
```

Limitations:
- Not suitable for multi-server deployments
- No CDN benefits
- Backup responsibility on you

## Usage

### Uploading Images

When you upload an image in Deckyard:

1. Image is sent to the server
2. Server uploads to configured provider
3. Provider returns a public URL
4. URL is stored with your presentation

### Image URLs

Depending on provider, URLs look like:

```
# ImageKit
https://ik.imagekit.io/your-id/uploads/abc123.jpg

# Scaleway
https://your-bucket.s3.fr-par.scw.cloud/uploads/abc123.jpg

# Local
/uploads/abc123.jpg
```

### OG Image Storage

Generated OpenGraph preview images are stored using the same provider.

## ImageKit Setup

### 1. Create Account

1. Go to [ImageKit.io](https://imagekit.io/)
2. Create a free account
3. Verify your email

### 2. Get Credentials

1. Go to **Developer Options**
2. Find your **URL Endpoint**
3. Copy **Public Key** and **Private Key**

### 3. Configure Deckyard

```bash
IMAGEKIT_PUBLIC_KEY=public_xxxxxxxxxxxxxxx
IMAGEKIT_PRIVATE_KEY=private_xxxxxxxxxxxxxxx
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your-id
```

### 4. Image Transformations

ImageKit supports URL-based transformations:

```
# Original
https://ik.imagekit.io/id/image.jpg

# Resized to 800px width
https://ik.imagekit.io/id/tr:w-800/image.jpg

# WebP format
https://ik.imagekit.io/id/tr:f-webp/image.jpg
```

Deckyard can use these for responsive images.

## Scaleway Setup

### 1. Create Account

1. Go to [Scaleway](https://www.scaleway.com/)
2. Create an account
3. Add billing information

### 2. Create Bucket

1. Go to **Object Storage**
2. Click **Create a bucket**
3. Choose a region and name
4. Set visibility to **Public** for CDN access

### 3. Get Credentials

1. Go to **Credentials** > **API Keys**
2. Create a new API key
3. Copy the Access Key and Secret Key

### 4. Configure CORS

In bucket settings, add CORS configuration:

```json
[
  {
    "AllowedOrigins": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST"],
    "AllowedHeaders": ["*"]
  }
]
```

## Migration

### From Local to Cloud

To migrate existing uploads:

1. Configure the new provider
2. Copy files from `./server/uploads/` to cloud
3. Update image URLs in presentations

### Between Providers

1. Download all media from current provider
2. Upload to new provider
3. Update environment variables
4. Update image URLs (or use redirects)

## Troubleshooting

### Upload Failures

- Verify credentials are correct
- Check bucket/account permissions
- Ensure bucket exists
- Verify network connectivity

### Missing Images

- Check the provider dashboard for files
- Verify URLs are accessible
- Check for CORS issues
- Ensure bucket is public (if needed)

### Performance Issues

- Enable CDN if available
- Check image optimization settings
- Verify regional endpoints

## Best Practices

### Security

- Use separate credentials for Deckyard
- Restrict permissions to necessary operations
- Enable bucket logging for auditing
- Consider private bucket + signed URLs for sensitive content

### Performance

- Choose provider with nearby data centers
- Enable CDN for global distribution
- Use image optimization features
- Implement caching headers

### Cost Management

- Monitor storage usage
- Set up billing alerts
- Clean up unused files periodically
- Use appropriate storage classes

## Related

- [Unsplash Integration](/docs/integrations/unsplash/)
- [Giphy Integration](/docs/integrations/giphy/)
- [OpenGraph Images](/docs/publishing/og-images/)
