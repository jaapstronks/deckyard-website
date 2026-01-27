import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://deckyard.eu',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'nl', 'de', 'fr', 'es', 'pt', 'da', 'sv', 'no', 'it', 'pl', 'fi'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          nl: 'nl',
          de: 'de',
          fr: 'fr',
          es: 'es',
          pt: 'pt',
          da: 'da',
          sv: 'sv',
          no: 'no',
          it: 'it',
          pl: 'pl',
          fi: 'fi',
        },
      },
    }),
    starlight({
      title: 'Deckyard',
      description: 'Open source, self-hosted presentation system.',
      sidebar: [
        {
          label: 'Creating Presentations',
          items: [
            { label: 'Overview', link: '/docs/creating/' },
            { label: 'New Presentation', link: '/docs/creating/new-presentation/' },
            { label: 'From Text/Outline', link: '/docs/creating/from-text/' },
            { label: 'From Notion', link: '/docs/creating/from-notion/' },
            { label: 'From PowerPoint', link: '/docs/creating/from-pptx/' },
            { label: 'From JSON', link: '/docs/creating/from-json/' },
            { label: 'Duplicating', link: '/docs/creating/duplicating/' }
          ]
        },
        {
          label: 'Editing',
          items: [
            { label: 'Overview', link: '/docs/editing/' },
            { label: 'Slides Panel', link: '/docs/editing/slides-panel/' },
            { label: 'Basic Editing', link: '/docs/editing/basic-editing/' },
            { label: 'Preview Mode', link: '/docs/editing/preview/' },
            { label: 'Converting Slides', link: '/docs/editing/converting-slides/' },
            { label: 'Speaker Notes', link: '/docs/editing/speaker-notes/' },
            { label: 'Keyboard Shortcuts', link: '/docs/editing/keyboard-shortcuts/' },
            { label: 'Accessibility', link: '/docs/editing/accessibility/' }
          ]
        },
        {
          label: 'Organizing',
          items: [
            { label: 'Overview', link: '/docs/organizing/' },
            { label: 'Search & Discovery', link: '/docs/organizing/search/' },
            { label: 'Tags', link: '/docs/organizing/tags/' },
            { label: 'Trash & Recovery', link: '/docs/organizing/trash/' }
          ]
        },
        {
          label: 'Slide Types',
          items: [
            { label: 'Overview', link: '/docs/slide-types/' },
            { label: 'Data & Visualization', link: '/docs/slide-types/data/' },
            { label: 'Interactive', link: '/docs/slide-types/interactive/' },
            { label: 'Content Cards', link: '/docs/slide-types/cards/' },
            { label: 'Media', link: '/docs/slide-types/media/' },
            { label: 'Structure', link: '/docs/slide-types/structure/' }
          ]
        },
        {
          label: 'AI Features',
          items: [
            { label: 'Setup & API Keys', link: '/docs/ai/getting-started/' },
            { label: 'Deck Generation', link: '/docs/ai/deck-generation/' },
            { label: 'DreamBot Analysis', link: '/docs/ai/analysis/' },
            { label: 'AI Translation', link: '/docs/ai/translation/' },
            { label: 'Description Generation', link: '/docs/ai/description-generation/' },
            { label: 'Alt Text Generation', link: '/docs/ai/alt-text/' }
          ]
        },
        {
          label: 'Interactions',
          items: [
            { label: 'Polls', link: '/docs/interactions/polls/' },
            { label: 'Q&A', link: '/docs/interactions/qa/' },
            { label: 'Feedback', link: '/docs/interactions/feedback/' },
            { label: 'Lead Capture', link: '/docs/interactions/lead-capture/' }
          ]
        },
        {
          label: 'Presenting',
          items: [
            { label: 'Presenter Mode', link: '/docs/presenter/' },
            { label: 'Laser Pointer & Drawing', link: '/docs/presenter/highlighter/' },
            { label: 'Audience Follow Mode', link: '/docs/presenter/follow-mode/' },
            { label: 'Speaker Notes View', link: '/docs/presenter/notes-view/' },
            { label: 'Presentation Locks', link: '/docs/presenter/presentation-locks/' }
          ]
        },
        {
          label: 'Publishing',
          items: [
            { label: 'Publishing & Sharing', link: '/docs/publishing/' },
            { label: 'Embedding (SDK)', link: '/docs/publishing/embedding/' },
            { label: 'OpenGraph Images', link: '/docs/publishing/og-images/' }
          ]
        },
        {
          label: 'Collaboration',
          items: [
            { label: 'Overview', link: '/docs/collaboration/' },
            { label: 'Sharing & Permissions', link: '/docs/collaboration/sharing-permissions/' },
            { label: 'Comments', link: '/docs/collaboration/comments/' },
            { label: 'Real-time Editing', link: '/docs/collaboration/realtime-editing/' },
            { label: 'Activity & Notifications', link: '/docs/collaboration/activity-notifications/' },
            { label: 'Version History', link: '/docs/collaboration/versions/' },
            { label: 'Ownership Transfer', link: '/docs/collaboration/ownership-transfer/' }
          ]
        },
        {
          label: 'Asset Libraries',
          items: [
            { label: 'Overview', link: '/docs/libraries/' },
            { label: 'Slide Library', link: '/docs/libraries/slide-library/' },
            { label: 'Image Library', link: '/docs/libraries/image-library/' }
          ]
        },
        {
          label: 'Themes',
          items: [
            { label: 'Overview', link: '/docs/themes/' },
            { label: 'Theme Editor', link: '/docs/themes/editor/' },
            { label: 'Custom Slide Types', link: '/docs/customization/custom-slide-types/' }
          ]
        },
        {
          label: 'Export',
          items: [
            { label: 'Overview', link: '/docs/export/' },
            { label: 'PDF Export', link: '/docs/export/pdf/' },
            { label: 'PowerPoint Export', link: '/docs/export/pptx/' },
            { label: 'Image Export', link: '/docs/export/images/' },
            { label: 'Speaker Notes', link: '/docs/export/notes/' },
            { label: 'Handoff Bundle', link: '/docs/export/handoff-bundle/' }
          ]
        },
        {
          label: 'Admin & Self-Hosting',
          items: [
            { label: 'Overview', link: '/docs/admin/' },
            { label: 'User Management', link: '/docs/admin/user-management/' },
            { label: 'Email Configuration', link: '/docs/admin/email-configuration/' },
            { label: 'Email Templates', link: '/docs/admin/email-templates/' },
            { label: 'Digest Emails', link: '/docs/admin/digest-emails/' },
            { label: 'Instance Settings', link: '/docs/admin/settings/' },
            { label: 'GDPR & Privacy', link: '/docs/admin/gdpr-privacy/' },
            { label: 'Sandbox Mode', link: '/docs/admin/sandbox-mode/' }
          ]
        },
        {
          label: 'Configuration',
          items: [
            { label: 'Environment Variables', link: '/docs/configuration/environment/' },
            { label: 'Authentication', link: '/docs/configuration/authentication/' },
            { label: 'Database', link: '/docs/configuration/database/' },
            { label: 'i18n / Localization', link: '/docs/configuration/i18n/' },
            { label: 'Rate Limiting', link: '/docs/configuration/rate-limiting/' }
          ]
        },
        {
          label: 'Deployment',
          items: [
            { label: 'Overview', link: '/docs/deployment/' },
            { label: 'Quick Start', link: '/docs/deployment/quickstart/' },
            { label: 'Docker', link: '/docs/deployment/docker/' },
            { label: 'Website Hosting', link: '/docs/deployment/website-hosting/' }
          ]
        },
        {
          label: 'Integrations',
          items: [
            { label: 'Analytics', link: '/docs/integrations/analytics/' },
            { label: 'Webhooks', link: '/docs/integrations/webhooks/' },
            { label: 'Media Services', link: '/docs/integrations/media-services/' },
            { label: 'Unsplash', link: '/docs/integrations/unsplash/' },
            { label: 'Giphy', link: '/docs/integrations/giphy/' },
            { label: 'Notion', link: '/docs/integrations/notion/' },
            { label: 'Real-Time Updates', link: '/docs/integrations/real-time/' }
          ]
        },
        {
          label: 'Developer',
          items: [
            { label: 'Overview', link: '/docs/developer/' },
            { label: 'Sessions & Auth', link: '/docs/developer/sessions/' },
            { label: 'Rendering Pipeline', link: '/docs/developer/rendering/' }
          ]
        }
      ]
    })
  ]
});


