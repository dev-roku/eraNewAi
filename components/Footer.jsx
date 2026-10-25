import Link from 'next/link';
import Image from 'next/image';
import siteConfig from '@/lib/site.js';
import categories from '@/lib/categories.js';

export default function Footer() {
  const year = new Date().getFullYear();

  const footerLinks = [
    { href: '/about/', label: 'About' },
    { href: '/contact/', label: 'Contact' },
    { href: '/privacy/', label: 'Privacy' },
    { href: '/rss.xml', label: 'RSS Feed' },
  ];

  // Filter social links that have values
  const socialLinks = Object.entries(siteConfig.social).filter(
    ([, url]) => url
  );

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="inline-flex hover:opacity-80 transition-opacity"
              aria-label={`${siteConfig.name} — home`}
            >
              <Image
                src="/images/EraNewAI%20Sunrise%20Tech%20Logo.png"
                alt=""
                width={160}
                height={54}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="mt-2 text-sm text-gray-500 leading-relaxed">
              {siteConfig.tagline}
            </p>
          </div>

          {/* Topics */}
          <div>
            <h2 className="text-sm font-semibold text-gray-800 uppercase tracking-wide mb-3">
              Topics
            </h2>
            <ul className="space-y-2">
              {categories.slice(0, 5).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/blog/?cat=${cat.slug}`}
                    className="text-sm text-gray-500 hover:text-indigo-600 transition-colors"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h2 className="text-sm font-semibold text-gray-800 uppercase tracking-wide mb-3">
              Navigation
            </h2>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-indigo-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social links */}
        {socialLinks.length > 0 && (
          <div className="flex gap-4 mb-6">
            {socialLinks.map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-500 hover:text-indigo-600 transition-colors capitalize"
              >
                {platform}
              </a>
            ))}
          </div>
        )}

        {/* Bottom bar */}
        <div className="border-t border-gray-200 pt-6 text-sm text-gray-400">
          © {year} {siteConfig.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
