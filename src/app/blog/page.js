import siteConfig from '@/lib/site.js';
import { getAllPosts, getAllCategories } from '@/lib/posts.js';
import BlogIndexClient from '@/components/BlogIndexClient.jsx';

export const metadata = {
  title: 'Blog',
  description: `All articles on ${siteConfig.name} — practical AI tutorials, tools, and workflows.`,
  alternates: {
    canonical: `${siteConfig.url}/blog/`,
  },
  openGraph: {
    title: `Blog | ${siteConfig.name}`,
    description: `All articles on ${siteConfig.name} — practical AI tutorials, tools, and workflows.`,
    url: `${siteConfig.url}/blog/`,
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const activeCategorySlugs = getAllCategories();

  // Strip the raw MDX content from posts before passing to the client component
  // (content can be large; the index page does not need it)
  const serializable = posts.map(({ content: _content, ...rest }) => rest);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <header className="mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">All Articles</h1>
        <p className="mt-2 text-gray-500 text-sm">
          Practical tutorials and guides on using AI tools in everyday work and study.
        </p>
      </header>

      <BlogIndexClient
        posts={serializable}
        activeCategorySlugs={activeCategorySlugs}
      />
    </div>
  );
}
