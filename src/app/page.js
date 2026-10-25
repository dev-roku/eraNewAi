import Link from 'next/link';
import Image from 'next/image';
import siteConfig from '@/lib/site.js';
import { getLatestPosts } from '@/lib/posts.js';
import categories from '@/lib/categories.js';
import PostCard from '@/components/PostCard.jsx';
import NewsletterBox from '@/components/NewsletterBox.jsx';

export const metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.url,
  },
};

export default function HomePage() {
  const latestPosts = getLatestPosts(6);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
          <span className="inline-block text-xs font-semibold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full mb-4">
            Practical AI Education
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 leading-tight">
            {siteConfig.tagline}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {siteConfig.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link
              href="/blog/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors text-sm"
            >
              Browse all articles
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/about/"
              className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 text-gray-700 font-medium rounded-lg hover:border-indigo-300 hover:text-indigo-600 transition-colors text-sm"
            >
              About this site
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* ── Latest articles ──────────────────────────────────── */}
        {latestPosts.length > 0 && (
          <section aria-labelledby="latest-heading" className="py-14">
            <div className="flex items-center justify-between mb-8">
              <h2
                id="latest-heading"
                className="text-xl font-bold text-gray-900"
              >
                Latest Articles
              </h2>
              <Link
                href="/blog/"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-800 hover:underline"
              >
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {latestPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* ── Topic discovery ───────────────────────────────────── */}
        <section aria-labelledby="topics-heading" className="py-10 border-t border-gray-100">
          <h2 id="topics-heading" className="text-xl font-bold text-gray-900 mb-6">
            Explore by Topic
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {categories.slice(0, 8).map((cat) => (
              <Link
                key={cat.slug}
                href={`/blog/?cat=${cat.slug}`}
                className="flex flex-col items-start p-4 bg-gray-50 hover:bg-indigo-50 border border-gray-100 hover:border-indigo-200 rounded-xl transition-all group"
              >
                <span className="text-2xl mb-2" aria-hidden="true">
                  {cat.emoji}
                </span>
                <span className="text-sm font-semibold text-gray-800 group-hover:text-indigo-700 leading-tight">
                  {cat.label}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Newsletter ───────────────────────────────────────── */}
        <NewsletterBox />

        {/* ── Author intro ─────────────────────────────────────── */}
        <section aria-labelledby="author-heading" className="py-10 border-t border-gray-100 mb-6">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="flex-shrink-0">
              <div
                className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-2xl"
                aria-hidden="true"
              >
                🤖
              </div>
            </div>
            <div>
              <h2 id="author-heading" className="text-lg font-bold text-gray-900">
                About {siteConfig.name}
              </h2>
              <p className="mt-2 text-gray-600 text-sm leading-relaxed max-w-2xl">
                This site shares practical, honest guides on using AI tools in everyday
                work and study. The focus is always on real workflows you can try today,
                not hype or buzzwords. Articles are written in plain English and designed
                to be useful whether you are a student, a freelancer, or running a small
                business.
              </p>
              <Link
                href="/about/"
                className="mt-3 inline-block text-sm font-medium text-indigo-600 hover:underline"
              >
                Read more about this site →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
