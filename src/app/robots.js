import siteConfig from '@/lib/site.js';

export const dynamic = 'force-static';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/privacy/'],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
