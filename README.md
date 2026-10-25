# EraNewAI — Flexible Multi-Niche AI Tools & Tutorials Blog

A modern, fast, SEO-optimized educational blog built with **Next.js App Router**, **Tailwind CSS**, and **MDX**. Designed to publish practical guides on AI workflows, tools, and tutorials without database or server dependencies, and deployed statically to **Cloudflare Pages**.

---

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Folder Structure](#folder-structure)
- [Quick Start](#quick-start)
- [Content Management Guide](#content-management-guide)
  - [Publishing a New MDX Article](#publishing-a-new-mdx-article)
  - [Draft Articles](#draft-articles)
  - [Adding Cover Images](#adding-cover-images)
  - [Adding or Editing Categories](#adding-or-editing-categories)
  - [Adding Tags](#adding-tags)
  - [Updating Site Name & Brand Identity](#updating-site-name--brand-identity)
  - [Pivoting or Expanding Content Focus](#pivoting-or-expanding-content-focus)
- [Building & Deploying to Cloudflare Pages](#building--deploying-to-cloudflare-pages)
  - [GitHub Repository Setup](#github-repository-setup)
  - [Cloudflare Pages Settings](#cloudflare-pages-settings)
  - [Environment Variables](#environment-variables)
- [SEO & Feed Generation](#seo--feed-generation)
- [Verification & Quality Checklist](#verification--quality-checklist)

---

## Architecture Overview

- **Framework**: Next.js (App Router, static export `output: 'export'`)
- **Language**: JavaScript (`.js`, `.jsx` only)
- **Styling**: Tailwind CSS with `@tailwindcss/typography` (prose styling)
- **Content Engine**: Local MDX files parsed via `gray-matter`, rendered via `next-mdx-remote/rsc`, with GitHub Flavored Markdown (`remark-gfm`), heading auto-anchors (`rehype-slug`, `rehype-autolink-headings`), and Table of Contents generator (`github-slugger`).
- **Static Export**: Generates pure static HTML/CSS/JS into the `out/` directory with `dynamicParams = false` and `generateStaticParams()`.
- **Zero Runtime Dependencies**: No database, no headless CMS, no paid API keys. Fully compatible with Cloudflare Pages free tier.

---

## Folder Structure

```text
eranewai-blog/
├── content/
│   └── blog/
│       ├── ai-product-catalog-workflow.mdx
│       ├── ai-revision-notes.mdx
│       └── ai-social-content-workflow.mdx
├── lib/
│   ├── categories.js         # Central category registry
│   ├── posts.js              # Content query & validation API
│   ├── site.js               # Central branding & metadata configuration
│   └── toc.js                # Table of contents parser (rehype-slug compatible)
├── components/
│   ├── BlogIndexClient.jsx   # Client-side filtering & search with Suspense
│   ├── CategoryFilter.jsx    # Category filter pills
│   ├── Footer.jsx            # Semantic footer with topic & legal links
│   ├── Header.jsx            # Responsive header with mobile menu
│   ├── NewsletterBox.jsx     # UI placeholder for email newsletter
│   ├── PostCard.jsx          # Reusable article card
│   ├── RelatedPosts.jsx      # Dynamic related articles by category
│   └── TableOfContents.jsx   # Collapsible in-article TOC navigation
├── public/
│   └── images/
│       └── blog/             # Article cover images
├── src/
│   └── app/
│       ├── about/
│       │   └── page.js       # /about/
│       ├── blog/
│       │   ├── [slug]/
│       │   │   └── page.js   # /blog/[slug]/
│       │   └── page.js       # /blog/
│       ├── contact/
│       │   └── page.js       # /contact/
│       ├── privacy/
│       │   └── page.js       # /privacy/
│       ├── rss.xml/
│       │   └── route.js      # /rss.xml (Static RSS feed)
│       ├── globals.css       # Tailwind & custom prose typography
│       ├── layout.js         # Root layout with Open Graph & skip-link
│       ├── not-found.js      # Custom 404 page
│       ├── page.js           # Homepage /
│       ├── robots.js         # Static robots.txt generator
│       └── sitemap.js        # Static sitemap.xml generator
├── next.config.js            # Next.js export & unoptimized image config
├── package.json              # Scripts & dependencies
├── postcss.config.js         # Tailwind PostCSS configuration
└── README.md
```

---

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Local Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the website.

### 3. Build for Production

```bash
npm run build
```

This generates the fully static website in the `out/` folder.

---

## Content Management Guide

### Publishing a New MDX Article

1. Create a new `.mdx` file in `content/blog/` named with your desired URL slug:
   - Example: `content/blog/how-to-prompt-chatgpt.mdx`
   - URL will automatically be: `/blog/how-to-prompt-chatgpt/`

2. Include the required frontmatter at the top:

```markdown
---
title: "How to Prompt AI for Accurate Research"
description: "A step-by-step guide to structuring prompts for factual research."
date: "2026-10-26"
category: "learning-study"
tags:
  - prompting
  - research
  - study-workflow
cover: "/images/blog/how-to-prompt.webp"
draft: false
---

Write your article here using Markdown or MDX.

## Section One

Content goes here...
```

**Frontmatter Rules & Validation**:
- `title`: String (Required, non-empty)
- `description`: String (Required, non-empty)
- `date`: Valid `YYYY-MM-DD` date string (Required)
- `category`: Must match one of the slugs in `lib/categories.js` (Required)
- `tags`: Array of strings (Required)
- `draft`: Boolean `true` or `false` (Required)
- `cover`: String image path (Optional)

*Note*: If any required field is missing or invalid, the build fails immediately with a detailed error message naming the file and error.

### Draft Articles

To save a post without publishing it publicly:

```yaml
draft: true
```

Drafts are automatically excluded from:
- Production builds and static routes (`/blog/[slug]/`)
- The blog index listing and homepage cards
- Related posts recommendations
- `sitemap.xml`
- `rss.xml`

### Adding Cover Images

1. Place your image in `public/images/blog/my-image.webp` (WebP or PNG recommended).
2. Reference it in your article's frontmatter:
   ```yaml
   cover: "/images/blog/my-image.webp"
   ```
3. If omitted, the post gracefully renders without a cover banner and uses the site default image for Open Graph sharing.

### Adding or Editing Categories

All categories are centrally managed in `lib/categories.js`. To add a new category, simply add an object to the `categories` array:

```javascript
// lib/categories.js
{
  slug: 'freelancing-careers',
  label: 'Freelancing & Careers',
  description: 'AI tools to find clients, pitch proposals, and streamline client delivery.',
  emoji: '💼',
}
```

- No code or component changes are needed.
- The new category will immediately be available for MDX articles, category filter pills on `/blog/`, and topic cards on the homepage.

### Adding Tags

Tags do not require pre-registration. Add any relevant tag string to the `tags` array in the frontmatter of any post:

```yaml
tags:
  - automation
  - free-tools
  - productivity
```

### Updating Site Name & Brand Identity

All branding, social links, and metadata are configured in `lib/site.js`:

```javascript
// lib/site.js
const siteConfig = {
  name: 'EraNewAI',
  tagline: 'Practical AI tutorials, tools, and workflows for everyone',
  description: 'Learn how to use AI tools to study faster, work smarter, create content...',
  author: 'EraNewAI Team',
  email: 'hello@eranewai.com',
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://yourdomain.com',
  social: {
    twitter: 'https://x.com/yourhandle',
    youtube: null,
    linkedin: null,
  },
  defaultOgImage: '/images/og-default.webp',
};
```

### Pivoting or Expanding Content Focus

The website is purposely built without rigid niche locks:
1. **To pivot toward Students/Education**: Add tutorials under `learning-study`, adjust the hero tagline in `lib/site.js`.
2. **To pivot toward E-Commerce/Sellers**: Add categories like `e-commerce-ai` in `lib/categories.js`, publish catalog and automation guides.
3. **To pivot toward Freelancers/Job Seekers**: Introduce tags like `resume-builder`, `client-pitching`, `freelance-workflow`.
4. No routing, database schemas, or visual layouts need to be rewritten.

---

## Building & Deploying to Cloudflare Pages

### GitHub Repository Setup

1. Initialize Git in the project root (if not already done):
   ```bash
   git add .
   git commit -m "Complete AI blog setup"
   ```
2. Create a new repository on GitHub (e.g. `eranewai-blog`).
3. Push your code:
   ```bash
   git remote add origin https://github.com/<your-username>/eranewai-blog.git
   git branch -M main
   git push -u origin main
   ```

### Cloudflare Pages Settings

1. Log into your **Cloudflare Dashboard** and navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
2. Select your repository.
3. Configure build settings:
   - **Framework preset**: `None` (or `Next.js (Static HTML Export)`)
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
   - **Root directory**: `/` (or leave blank if at repo root)
4. Set Environment Variables:
   - Variable name: `NEXT_PUBLIC_SITE_URL`
   - Value: `https://your-custom-domain.com` (or your `https://<project>.pages.dev` URL)
5. Click **Save and Deploy**. Cloudflare Pages will automatically build and distribute your static site globally on its Edge network.

---

## SEO & Feed Generation

During every `npm run build`, Next.js automatically outputs:
1. `out/sitemap.xml`: Full XML sitemap including all static pages and published blog posts with `<lastmod>`, `<changefreq>`, and `<priority>`.
2. `out/robots.txt`: Robots configuration referencing `sitemap.xml` and disallowing non-public pages.
3. `out/rss.xml`: Valid RSS 2.0 feed with complete publication timestamps, categories, and permalinks.
4. Semantic Schema markup: Every article page embeds valid JSON-LD `Article` structured data.

---

## Verification & Quality Checklist

- [x] All pages compile and export cleanly with `npm run build`.
- [x] Static routes generated for all published MDX files.
- [x] Draft posts (`draft: true`) excluded from build.
- [x] Client-side category filtering and real-time search with zero layout shift.
- [x] Table of contents heading anchors match rehype-slug rendered IDs.
- [x] Related posts dynamically filter by category while excluding current article.
- [x] Valid Article JSON-LD schema on article pages.
- [x] Static `sitemap.xml`, `robots.txt`, `rss.xml`, and `404.html` in `out/`.
- [x] Zero server runtime dependencies or external API locks.
