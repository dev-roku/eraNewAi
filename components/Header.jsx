'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import siteConfig from '@/lib/site.js';

export default function Header() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { href: '/blog/', label: 'Blog' },
    { href: '/about/', label: 'About' },
    { href: '/contact/', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* EraNewAI */}
          <Link
            href="/"
            className="flex items-center hover:opacity-80 transition-opacity"
            aria-label={`${siteConfig.name} — home`}
          >
            <Image
              src="/images/EraNewAI%20Sunrise%20Tech%20Logo.png"
              alt="EraNewAI Logo"
              width={160}
              height={54}
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="hidden sm:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/blog/"
              className="text-sm font-medium bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Read Articles
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="sm:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <nav
            aria-label="Mobile navigation"
            className="sm:hidden pb-4 border-t border-gray-100 pt-2 flex flex-col gap-1"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-2 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/blog/"
              className="mt-1 px-2 py-2 text-sm font-medium text-indigo-600 hover:underline"
              onClick={() => setOpen(false)}
            >
              Browse all articles →
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
