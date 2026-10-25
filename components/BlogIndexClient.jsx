'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import PostCard from '@/components/PostCard.jsx';
import CategoryFilter from '@/components/CategoryFilter.jsx';

/**
 * Inner component — must be wrapped in <Suspense> because it uses useSearchParams().
 */
function BlogIndexInner({ posts, activeCategorySlugs }) {
  const searchParams = useSearchParams();
  const selectedCat = searchParams.get('cat') || 'all';
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    let result = posts;

    if (selectedCat !== 'all') {
      result = result.filter((p) => p.category === selectedCat);
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    return result;
  }, [posts, selectedCat, query]);

  return (
    <>
      {/* Filters row */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between mb-8">
        <CategoryFilter activeCategorySlugs={activeCategorySlugs} />

        {/* Search */}
        <div className="relative flex-shrink-0">
          <label htmlFor="search-input" className="sr-only">
            Search articles
          </label>
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M16.65 16.65A7 7 0 1116.65 2.65a7 7 0 010 14z" />
          </svg>
          <input
            id="search-input"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles…"
            className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg w-56 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
          />
        </div>
      </div>

      {/* Article grid */}
      {filtered.length > 0 ? (
        <>
          <p className="text-sm text-gray-500 mb-4">
            {filtered.length} article{filtered.length !== 1 ? 's' : ''}
            {selectedCat !== 'all' || query ? ' found' : ''}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-20 text-gray-500">
          <span className="text-4xl block mb-3" aria-hidden="true">🔍</span>
          <p className="font-medium">No articles found.</p>
          <p className="text-sm mt-1">Try a different category or search term.</p>
        </div>
      )}
    </>
  );
}

/**
 * BlogIndexClient — exported client wrapper with Suspense boundary.
 * This component receives pre-fetched posts (serializable data) from the
 * server component (app/blog/page.js).
 */
export default function BlogIndexClient({ posts, activeCategorySlugs }) {
  return (
    <Suspense
      fallback={
        <div className="text-center py-20 text-gray-400 text-sm">
          Loading articles…
        </div>
      }
    >
      <BlogIndexInner
        posts={posts}
        activeCategorySlugs={activeCategorySlugs}
      />
    </Suspense>
  );
}
