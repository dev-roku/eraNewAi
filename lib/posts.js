// ============================================================
// lib/posts.js — Core content API
// All MDX file reading, parsing, and querying happens here
// ============================================================

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getCategoryMap } from './categories.js';

const POSTS_DIR = path.join(process.cwd(), 'content', 'blog');
const WORDS_PER_MINUTE = 200;

// ── Helpers ───────────────────────────────────────────────────

function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function countWords(str) {
  return str.trim().split(/\s+/).filter(Boolean).length;
}

function calcReadingTime(content) {
  const words = countWords(content);
  const minutes = Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
  return `${minutes} min read`;
}

/**
 * Validates a post's frontmatter.
 * Throws a descriptive error if any required field is missing or invalid.
 */
function validateFrontmatter(data, slug) {
  const categoryMap = getCategoryMap();
  const errors = [];

  if (!data.title || typeof data.title !== 'string' || !data.title.trim()) {
    errors.push('`title` is required and must be a non-empty string.');
  }

  if (
    !data.description ||
    typeof data.description !== 'string' ||
    !data.description.trim()
  ) {
    errors.push('`description` is required and must be a non-empty string.');
  }

  if (!data.date) {
    errors.push('`date` is required (format: YYYY-MM-DD).');
  } else {
    const parsed = new Date(data.date);
    if (isNaN(parsed.getTime())) {
      errors.push(`\`date\` "${data.date}" is not a valid date.`);
    }
  }

  if (!data.category) {
    errors.push('`category` is required.');
  } else if (!categoryMap.has(data.category)) {
    const valid = [...categoryMap.keys()].join(', ');
    errors.push(
      `\`category\` "${data.category}" is not a configured category. Valid values: ${valid}`
    );
  }

  if (!Array.isArray(data.tags)) {
    errors.push('`tags` must be an array of strings.');
  }

  if (typeof data.draft !== 'boolean') {
    errors.push('`draft` must be a boolean (true or false).');
  }

  if (errors.length > 0) {
    throw new Error(
      `[posts.js] Frontmatter validation failed for "${slug}":\n  - ${errors.join('\n  - ')}`
    );
  }
}

/**
 * Parse and return a single MDX file as a post object.
 * Returns null for draft posts when in production (excludeDrafts = true).
 */
function parsePost(filename, excludeDrafts = true) {
  const filePath = path.join(POSTS_DIR, filename);
  const fileContents = fs.readFileSync(filePath, 'utf8');

  const { data, content } = matter(fileContents);

  // Derive slug: frontmatter slug (if provided) or slugified filename
  const rawBaseName = filename.replace(/\.mdx$/, '');
  let slug = data.slug ? slugify(String(data.slug)) : slugify(rawBaseName);
  if (
    slug === 'a-research-backed-workflow-for-ai-assisted-social-content' ||
    data.title === 'One Idea, Seven Days: A Research-Backed Workflow for AI-Assisted Social Content'
  ) {
    slug = 'one-idea-seven-days';
  }

  // Validate frontmatter — throws on error
  validateFrontmatter(data, slug);

  if (excludeDrafts && data.draft === true) {
    return null;
  }

  return {
    slug,
    title: data.title.trim(),
    description: data.description.trim(),
    date: data.date,
    category: data.category,
    tags: data.tags || [],
    cover: data.cover || null,
    draft: data.draft,
    readingTime: calcReadingTime(content),
    content, // raw MDX string (for rendering)
  };
}

// ── Public API ─────────────────────────────────────────────────

/**
 * Returns all published posts, sorted newest first.
 * Validates every MDX file and throws on errors.
 * Detects duplicate slugs.
 */
export function getAllPosts() {
  if (!fs.existsSync(POSTS_DIR)) {
    return [];
  }

  const filenames = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.mdx'));

  const posts = filenames
    .map((f) => parsePost(f, true))
    .filter(Boolean);

  // Detect duplicate slugs
  const slugs = posts.map((p) => p.slug);
  const seen = new Set();
  for (const s of slugs) {
    if (seen.has(s)) {
      throw new Error(`[posts.js] Duplicate slug detected: "${s}"`);
    }
    seen.add(s);
  }

  // Sort newest first; deterministic tie-breaking by slug
  return posts.sort((a, b) => {
    const dateComp = new Date(b.date) - new Date(a.date);
    if (dateComp !== 0) return dateComp;
    return a.slug.localeCompare(b.slug);
  });
}

/**
 * Returns a single post by slug, including its raw content for rendering.
 * Throws if not found.
 */
export function getPostBySlug(slug) {
  const allPosts = getAllPosts();
  const post = allPosts.find(
    (p) =>
      p.slug === slug ||
      (slug === 'a-research-backed-workflow-for-ai-assisted-social-content' &&
        p.slug === 'one-idea-seven-days')
  );

  if (!post) {
    throw new Error(`[posts.js] Post not found: "${slug}"`);
  }

  return post;
}

/**
 * Returns the N most recent published posts.
 */
export function getLatestPosts(limit = 6) {
  return getAllPosts().slice(0, limit);
}

/**
 * Returns up to 3 related posts:
 *   1. Same category (excluding the current post)
 *   2. Falls back to other posts if category has fewer than 3
 */
export function getRelatedPosts(post, limit = 3) {
  const all = getAllPosts().filter((p) => p.slug !== post.slug);

  const sameCategory = all.filter((p) => p.category === post.category);
  const others = all.filter((p) => p.category !== post.category);

  return [...sameCategory, ...others].slice(0, limit);
}

/**
 * Returns an array of unique category slugs that appear in published posts.
 */
export function getAllCategories() {
  const posts = getAllPosts();
  const slugs = [...new Set(posts.map((p) => p.category))];
  return slugs;
}
