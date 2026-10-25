import PostCard from '@/components/PostCard.jsx';

/**
 * RelatedPosts — displays up to 3 related articles below a post.
 * posts: Post[] from getRelatedPosts()
 */
export default function RelatedPosts({ posts }) {
  if (!posts || posts.length === 0) return null;

  return (
    <section aria-labelledby="related-heading" className="mt-12 pt-10 border-t border-gray-200">
      <h2
        id="related-heading"
        className="text-lg font-bold text-gray-900 mb-6"
      >
        You might also like
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
