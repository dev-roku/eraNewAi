// ============================================================
// lib/toc.js — Table of Contents extraction from MDX content
// Uses the same slug generation as rehype-slug for consistency
// ============================================================

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import { visit } from 'unist-util-visit';
import GithubSlugger from 'github-slugger';

/**
 * Extracts headings from raw MDX/Markdown content.
 * Returns an array of { id, text, level } objects.
 *
 * Uses github-slugger (the same library rehype-slug uses internally)
 * so anchor IDs always match rendered heading IDs.
 */
export async function extractToc(rawContent) {
  const slugger = new GithubSlugger();
  const headings = [];

  // Strip frontmatter if present (gray-matter does this for us in posts.js,
  // but toc.js may receive raw MDX strings directly)
  const content = rawContent.replace(/^---[\s\S]*?---\n?/, '');

  const tree = unified().use(remarkParse).use(remarkGfm).parse(content);

  visit(tree, 'heading', (node) => {
    const level = node.depth;
    // Only include h2 and h3 in the TOC
    if (level < 2 || level > 3) return;

    // Collect plain text from heading children
    const text = node.children
      .filter((n) => n.type === 'text' || n.type === 'inlineCode')
      .map((n) => n.value)
      .join('');

    const id = slugger.slug(text);
    headings.push({ id, text, level });
  });

  return headings;
}
