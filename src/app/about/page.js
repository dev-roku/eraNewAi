import siteConfig from '@/lib/site.js';

export const metadata = {
  title: 'About',
  description: `Learn about ${siteConfig.name} — who we are and what we aim to help you with.`,
  alternates: {
    canonical: `${siteConfig.url}/about/`,
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <header className="mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">About {siteConfig.name}</h1>
        <p className="mt-2 text-gray-500">Who we are and what this site is about.</p>
      </header>

      <div className="prose prose-gray max-w-none">
        <h2>What is {siteConfig.name}?</h2>
        <p>
          {siteConfig.name} is an independent blog focused on practical uses of AI tools
          for everyday work, study, and creative projects. The aim is to publish honest,
          beginner-friendly tutorials that show real workflows — not theoretical overviews
          or marketing copy.
        </p>

        <h2>Who is this for?</h2>
        <p>
          The site is built for anyone who wants to use AI more effectively, including:
        </p>
        <ul>
          <li>Students and learners who want to study more efficiently.</li>
          <li>Freelancers and professionals looking to save time on repetitive tasks.</li>
          <li>Content creators and marketers exploring AI-assisted workflows.</li>
          <li>Small business owners automating business operations.</li>
          <li>Developers using AI to write, review, and debug code faster.</li>
          <li>General users curious about free and affordable AI tools.</li>
        </ul>

        <h2>What topics are covered?</h2>
        <p>
          Articles cover learning and study techniques, productivity, marketing and SEO,
          content creation, business automation, AI tool guides, and software development.
          The content evolves based on what is genuinely useful.
        </p>

        <h2>How is the content written?</h2>
        <p>
          Every article is written to be practical and honest. Hypothetical examples are
          clearly labelled. No fake test results, fabricated statistics, or unverified
          claims are published. Where AI tools are used in the writing process, that is
          disclosed.
        </p>

        <h2>How to get in touch</h2>
        <p>
          For questions, article suggestions, or corrections, contact{' '}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
        </p>
      </div>
    </div>
  );
}
