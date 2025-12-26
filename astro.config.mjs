import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'DreamSlides',
      description: 'Open source, self-hosted presentation system.',
      sidebar: [
        {
          label: 'Product',
          items: [
            { label: 'Getting started', link: '/product/getting-started/' },
            { label: 'Environment (.env)', link: '/product/configuration/environment/' },
            { label: 'Analytics', link: '/product/integrations/analytics/' },
            { label: 'Webhooks', link: '/product/integrations/webhooks/' }
          ]
        },
        {
          label: 'Developer',
          items: [
            { label: 'Dev setup', link: '/developer/dev-setup/' },
            { label: 'Architecture', link: '/developer/architecture/' },
            { label: 'Contributing', link: '/developer/contributing/' },
            { label: 'Slide types', link: '/developer/slide-types/' }
          ]
        }
      ]
    })
  ]
});


