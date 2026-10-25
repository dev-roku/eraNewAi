// ============================================================
// lib/categories.js — Central category configuration
// Add, remove, or edit categories here without touching page code
// ============================================================

/**
 * Category definition shape:
 * {
 *   slug:        string  — used in MDX frontmatter and URL (/blog?cat=slug)
 *   label:       string  — display name shown in UI
 *   description: string  — shown on filtered views and category pages
 *   emoji:       string  — optional decorative icon (single emoji)
 * }
 */
const categories = [
  {
    slug: 'learning-study',
    label: 'Learning & Study',
    description:
      'Use AI to understand concepts faster, generate practice questions, and build better study habits.',
    emoji: '📚',
  },
  {
    slug: 'productivity',
    label: 'Productivity',
    description:
      'Practical AI workflows that help you get more done with less effort every day.',
    emoji: '⚡',
  },
  {
    slug: 'marketing-seo',
    label: 'Marketing & SEO',
    description:
      'AI-assisted strategies for content marketing, keyword research, and growing your online presence.',
    emoji: '📈',
  },
  {
    slug: 'content-creation',
    label: 'Content Creation',
    description:
      'Write, design, and produce better content faster with the help of AI tools.',
    emoji: '✍️',
  },
  {
    slug: 'business-automation',
    label: 'Business & Automation',
    description:
      'Automate repetitive tasks and streamline business operations using accessible AI tools.',
    emoji: '🤖',
  },
  {
    slug: 'ai-tools',
    label: 'AI Tools',
    description:
      'Reviews, comparisons, and guides covering the most useful free and affordable AI tools.',
    emoji: '🛠️',
  },
  {
    slug: 'development-coding',
    label: 'Development & Coding',
    description:
      'Learn to code, debug faster, and build projects with AI as your assistant.',
    emoji: '💻',
  },
  {
    slug: 'other',
    label: 'Other',
    description:
      'Miscellaneous AI topics and experiments that do not fit neatly into one category.',
    emoji: '💡',
  },
];

export default categories;

/**
 * Returns a Map of slug → category for fast lookup.
 * Used by lib/posts.js for validation.
 */
export function getCategoryMap() {
  return new Map(categories.map((c) => [c.slug, c]));
}

/**
 * Returns a single category by slug, or undefined.
 */
export function getCategoryBySlug(slug) {
  return categories.find((c) => c.slug === slug);
}

/**
 * Returns an array of all category slugs.
 */
export function getAllCategorySlugs() {
  return categories.map((c) => c.slug);
}
