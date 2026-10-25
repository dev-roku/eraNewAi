import siteConfig from '@/lib/site.js';
import { getAllPosts } from '@/lib/posts.js';

export const dynamic = 'force-static';

export default function sitemap() {
  const posts = getAllPosts();
  const baseUrl = siteConfig.url;

  const staticPages = [
    {
      url: baseUrl + '/',
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: baseUrl + '/blog/',
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: baseUrl + '/about/',
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: baseUrl + '/contact/',
      lastModified: new Date().toISOString(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  const postPages = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}/`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticPages, ...postPages];
}
