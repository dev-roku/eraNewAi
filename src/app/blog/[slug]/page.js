import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import siteConfig from '@/lib/site.js';
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/posts.js';
import { getCategoryBySlug } from '@/lib/categories.js';
import { extractToc } from '@/lib/toc.js';
import TableOfContents from '@/components/TableOfContents.jsx';
import RelatedPosts from '@/components/RelatedPosts.jsx';

// ── Static generation ─────────────────────────────────────────
export async function generateStaticParams() {
  const posts = getAllPosts();
  const params = posts.map((post) => ({ slug: post.slug }));
  if (posts.some((p) => p.slug === 'one-idea-seven-days')) {
    params.push({ slug: 'a-research-backed-workflow-for-ai-assisted-social-content' });
  }
  return params;
}

export const dynamicParams = false;

// ── Metadata ──────────────────────────────────────────────────
export async function generateMetadata({ params }) {
  const { slug } = await params;
  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    return {};
  }

  const ogImage = post.cover
    ? { url: post.cover, width: 1200, height: 630, alt: post.title }
    : { url: siteConfig.defaultOgImage, width: 1200, height: 630, alt: post.title };

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `${siteConfig.url}/blog/${slug}/`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${siteConfig.url}/blog/${slug}/`,
      type: 'article',
      publishedTime: post.date,
      authors: [siteConfig.author],
      tags: post.tags,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

// ── MDX options ───────────────────────────────────────────────
const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
  },
};

// ── MDX custom components (Responsive table with clean, visible borders) ──
const mdxComponents = {
  table: ({ children, ...props }) => (
    <div className="my-6 w-full overflow-x-auto rounded-lg border border-gray-200 shadow-xs">
      <table className="w-full text-left text-sm text-gray-700 border-collapse m-0" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead className="bg-gray-50 text-gray-900 border-b border-gray-200" {...props}>
      {children}
    </thead>
  ),
  th: ({ children, ...props }) => (
    <th className="px-4 py-3 font-semibold text-gray-900 border-b border-gray-200 whitespace-nowrap" {...props}>
      {children}
    </th>
  ),
  tbody: ({ children, ...props }) => (
    <tbody className="divide-y divide-gray-100 bg-white" {...props}>
      {children}
    </tbody>
  ),
  td: ({ children, ...props }) => (
    <td className="px-4 py-3 align-top text-gray-700" {...props}>
      {children}
    </td>
  ),
};

// ── Page ─────────────────────────────────────────────────────
export default async function PostPage({ params }) {
  const { slug } = await params;

  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  const category = getCategoryBySlug(post.category);
  const relatedPosts = getRelatedPosts(post);
  const headings = await extractToc(post.content);

  const formattedDate = new Date(post.date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // JSON-LD Article schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: siteConfig.author,
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    url: `${siteConfig.url}/blog/${slug}/`,
    ...(post.cover && { image: `${siteConfig.url}${post.cover}` }),
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/blog/" className="hover:text-indigo-600 transition-colors">Blog</Link>
            {category && (
              <>
                <span aria-hidden="true">/</span>
                <Link
                  href={`/blog/?cat=${category.slug}`}
                  className="hover:text-indigo-600 transition-colors"
                >
                  {category.label}
                </Link>
              </>
            )}
          </nav>

          {/* Article header */}
          <header className="mb-8">
            {category && (
              <Link
                href={`/blog/?cat=${category.slug}`}
                className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-3 hover:text-indigo-800"
              >
                {category.emoji && <span aria-hidden="true">{category.emoji}</span>}
                {category.label}
              </Link>
            )}

            <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
              {post.title}
            </h1>
            <p className="text-base text-gray-600 leading-relaxed mb-5">
              {post.description}
            </p>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 border-b border-gray-100 pb-5">
              <time dateTime={post.date}>{formattedDate}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readingTime}</span>
              <span aria-hidden="true">·</span>
              <span>By {siteConfig.author}</span>
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Cover image */}
          {post.cover && (
            <div className="relative w-full h-64 sm:h-96 mb-8 rounded-xl overflow-hidden">
              <Image
                src={post.cover}
                alt={`Cover image for "${post.title}"`}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Table of Contents */}
          <TableOfContents headings={headings} />

          {/* MDX content with clean typography, normal section gaps, dark crisp text */}
          <article className="prose max-w-none text-gray-800 prose-headings:text-gray-900 prose-headings:font-bold prose-headings:scroll-mt-24 prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-7 prose-h3:mb-3 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:my-4 prose-li:text-gray-700 prose-strong:text-gray-900 prose-strong:font-bold prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline">
            <MDXRemote
              source={post.content}
              options={mdxOptions}
              components={mdxComponents}
            />
          </article>

          {/* Related posts */}
          <RelatedPosts posts={relatedPosts} />
        </div>
      </div>
    </>
  );
}
