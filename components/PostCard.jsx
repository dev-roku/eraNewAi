import Link from 'next/link';
import Image from 'next/image';
import { getCategoryBySlug } from '@/lib/categories.js';

/**
 * PostCard — used on /blog/ index and homepage.
 * Props: post object from lib/posts.js
 */
export default function PostCard({ post }) {
  const category = getCategoryBySlug(post.category);

  const formattedDate = new Date(post.date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="flex flex-col bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-md hover:border-indigo-100 transition-all duration-200 group">
      {/* Cover image */}
      {post.cover && (
        <Link href={`/blog/${post.slug}/`} tabIndex={-1} aria-hidden="true">
          <div className="relative h-44 bg-gray-100 overflow-hidden">
            <Image
              src={post.cover}
              alt={`Cover image for "${post.title}"`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </Link>
      )}

      <div className="flex flex-col flex-1 p-5">
        {/* Category badge */}
        {category && (
          <Link
            href={`/blog/?cat=${category.slug}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-2 hover:text-indigo-800 w-fit"
            aria-label={`Browse ${category.label} articles`}
          >
            {category.emoji && <span aria-hidden="true">{category.emoji}</span>}
            {category.label}
          </Link>
        )}

        {/* Title */}
        <h2 className="text-base font-bold text-gray-900 leading-snug mb-2">
          <Link
            href={`/blog/${post.slug}/`}
            className="hover:text-indigo-600 transition-colors"
          >
            {post.title}
          </Link>
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed flex-1 line-clamp-3">
          {post.description}
        </p>

        {/* Meta row */}
        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100 text-xs text-gray-400">
          <time dateTime={post.date}>{formattedDate}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime}</span>
        </div>
      </div>
    </article>
  );
}
