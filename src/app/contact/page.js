import siteConfig from '@/lib/site.js';

export const metadata = {
  title: 'Contact',
  description: `Get in touch with the ${siteConfig.name} team.`,
  alternates: {
    canonical: `${siteConfig.url}/contact/`,
  },
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <header className="mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Contact</h1>
        <p className="mt-2 text-gray-500">Questions, corrections, or article ideas — reach out directly.</p>
      </header>

      <div className="prose prose-gray max-w-none">
        <p>
          The best way to get in touch is by email. There is no contact form on this
          site — email goes directly to the right person without any middleware.
        </p>

        <h2>Email</h2>
        <p>
          <a href={`mailto:${siteConfig.email}`} className="font-medium">
            {siteConfig.email}
          </a>
        </p>

        <h2>What to include</h2>
        <ul>
          <li>
            <strong>Article corrections:</strong> include the article title and the
            specific claim you believe is inaccurate.
          </li>
          <li>
            <strong>Article suggestions:</strong> describe the topic and the audience
            you have in mind.
          </li>
          <li>
            <strong>Collaboration enquiries:</strong> include a brief description of
            what you are proposing.
          </li>
        </ul>

        <p className="text-sm text-gray-500">
          Response times vary. Most messages receive a reply within a few business days.
        </p>
      </div>
    </div>
  );
}
