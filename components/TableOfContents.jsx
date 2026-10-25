'use client';

import { useState } from 'react';

/**
 * TableOfContents — client component rendered on article pages.
 * headings: Array<{ id: string, text: string, level: number }>
 */
export default function TableOfContents({ headings }) {
  const [collapsed, setCollapsed] = useState(false);

  if (!headings || headings.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-8"
    >
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-between w-full text-sm font-semibold text-gray-700 hover:text-indigo-600 transition-colors"
        aria-expanded={!collapsed}
        aria-controls="toc-list"
      >
        <span>On this page</span>
        <svg
          className={`w-4 h-4 transition-transform ${collapsed ? '' : 'rotate-180'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {!collapsed && (
        <ol id="toc-list" className="mt-3 space-y-1">
          {headings.map((heading) => (
            <li
              key={heading.id}
              className={heading.level === 3 ? 'pl-4' : ''}
            >
              <a
                href={`#${heading.id}`}
                className="text-sm text-gray-600 hover:text-indigo-600 transition-colors leading-snug block py-0.5"
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ol>
      )}
    </nav>
  );
}
