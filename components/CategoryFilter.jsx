'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import categories from '@/lib/categories.js';

/**
 * CategoryFilter — client component for /blog/ page.
 * Reads ?cat= from the URL and updates it on selection.
 * activeCategorySlugs: string[] of slugs that have published posts.
 */
export default function CategoryFilter({ activeCategorySlugs = [] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCat = searchParams.get('cat') || 'all';

  const handleSelect = (slug) => {
    const params = new URLSearchParams(searchParams.toString());
    if (slug === 'all') {
      params.delete('cat');
    } else {
      params.set('cat', slug);
    }
    // Also reset search when switching category
    params.delete('q');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Only show categories that actually have posts
  const visibleCategories = categories.filter((c) =>
    activeCategorySlugs.includes(c.slug)
  );

  return (
    <div
      role="group"
      aria-label="Filter articles by category"
      className="flex flex-wrap gap-2"
    >
      <button
        onClick={() => handleSelect('all')}
        aria-pressed={currentCat === 'all'}
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
          currentCat === 'all'
            ? 'bg-indigo-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        All
      </button>

      {visibleCategories.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => handleSelect(cat.slug)}
          aria-pressed={currentCat === cat.slug}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            currentCat === cat.slug
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {cat.emoji && <span aria-hidden="true" className="mr-1">{cat.emoji}</span>}
          {cat.label}
        </button>
      ))}
    </div>
  );
}
