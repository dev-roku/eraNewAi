import siteConfig from '@/lib/site.js';

export const metadata = {
  title: 'Privacy Policy',
  description: `Privacy policy for ${siteConfig.name}.`,
  alternates: {
    canonical: `${siteConfig.url}/privacy/`,
  },
  robots: { index: false },
};

export default function PrivacyPage() {
  const lastUpdated = '2026-10-25';

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <header className="mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Privacy Policy</h1>
        <p className="mt-2 text-sm text-gray-500">Last updated: {lastUpdated}</p>
      </header>

      <div className="prose prose-gray max-w-none">
        <p>
          This privacy policy describes how {siteConfig.name} (&quot;this site&quot;, &quot;we&quot;)
          handles information when you visit this website.
        </p>

        <h2>What data we collect</h2>
        <p>
          This site does not currently use analytics software, tracking pixels, or
          advertising networks. No personal information is collected or stored by this
          website.
        </p>
        <p>
          If you contact us by email, your email address and message contents are received
          and stored only in our email inbox. We do not share this information with third
          parties.
        </p>

        <h2>Hosting and infrastructure</h2>
        <p>
          This site is hosted on Cloudflare Pages. Cloudflare may collect standard web
          server log data (IP addresses, request timestamps, browser type) as part of its
          network infrastructure. Please refer to the{' '}
          <a
            href="https://www.cloudflare.com/privacypolicy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cloudflare Privacy Policy
          </a>{' '}
          for details.
        </p>

        <h2>Cookies</h2>
        <p>
          This site does not set any first-party cookies. Cloudflare may set cookies for
          security and performance purposes as part of its infrastructure.
        </p>

        <h2>Third-party services</h2>
        <p>
          No third-party analytics, advertising, or social tracking scripts are currently
          active on this site. If this changes, this policy will be updated to reflect it.
        </p>

        <h2>External links</h2>
        <p>
          This site links to external websites. We are not responsible for the privacy
          practices or content of those sites.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          This policy will be updated when changes are made to how the site operates or
          what services are enabled. The &quot;last updated&quot; date at the top of this
          page reflects when the most recent change was made.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy can be sent to{' '}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
        </p>
      </div>
    </div>
  );
}
