// ============================================================
// lib/site.js — Central site configuration
// Edit this file to update branding, metadata, and social links
// ============================================================

const siteConfig = {
  // ── Brand ───────────────────────────────────────────────────
  name: 'EraNewAI',
  tagline: 'Practical AI tutorials, tools, and workflows for everyone',
  description:
    'Learn how to use AI tools to study faster, work smarter, create content, and automate your daily tasks. Simple, practical guides in plain English.',
  author: 'EraNewAI Team',
  email: 'hello@eranewai.com', // TODO: replace with your real contact email

  // ── URLs ─────────────────────────────────────────────────────
  // In production, set the NEXT_PUBLIC_SITE_URL environment variable.
  // For local dev, falls back to http://localhost:3000
 url:
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://eranewai.online',
  
  // ── Social profiles (set to null to hide) ────────────────────
  social: {
    twitter: null,   // e.g. 'https://twitter.com/eranewai'
    youtube: null,   // e.g. 'https://youtube.com/@eranewai'
    instagram: null, // e.g. 'https://instagram.com/eranewai'
    github: null,    // e.g. 'https://github.com/eranewai'
    linkedin: null,  // e.g. 'https://linkedin.com/company/eranewai'
  },

  // ── Open Graph defaults ──────────────────────────────────────
  // Place your default OG image at public/images/og-default.webp
  defaultOgImage: '/images/og-default.webp',

  // ── Feed & sitemap ───────────────────────────────────────────
  postsPerPage: 12,
  rssTitle: 'EraNewAI — Latest Articles',
  rssDescription:
    'Practical AI tutorials, tools, and workflows. New articles every week.',
};

export default siteConfig;
