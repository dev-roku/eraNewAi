/**
 * NewsletterBox — UI-only email collection component.
 *
 * This is a static placeholder. To activate real subscriptions:
 * 1. Choose a provider: Mailchimp, ConvertKit, Brevo (Sendinblue), Buttondown, etc.
 * 2. Most offer an HTML embed form — paste the provider's <form> action URL below.
 * 3. For ConvertKit: replace the form action with your form's embed URL.
 * 4. For a serverless integration: use a form submission service like Formspree or
 *    a Cloudflare Worker that calls your provider's API.
 *
 * Until integrated, this component renders the UI and shows a clear notice.
 */
export default function NewsletterBox() {
  return (
    <section
      aria-labelledby="newsletter-heading"
      className="bg-indigo-50 border border-indigo-100 rounded-2xl px-6 py-8 sm:px-10 my-12"
    >
      <div className="max-w-xl mx-auto text-center">
        <span className="text-2xl" aria-hidden="true">✉️</span>
        <h2 id="newsletter-heading" className="mt-2 text-xl font-bold text-gray-900">
          Get practical AI tips in your inbox
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          New tutorials, tool guides, and workflow ideas every week. No spam, unsubscribe anytime.
        </p>

        {/*
          TODO: Replace the div below with your provider's form.
          Example for a Mailchimp embed:
          <form action="https://yourlist.us1.list-manage.com/subscribe/post?u=...&id=..." method="post" ...>
            <input type="email" name="EMAIL" ... />
            <button type="submit">Subscribe</button>
          </form>
        */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <input
            type="email"
            placeholder="your@email.com"
            aria-label="Email address"
            disabled
            className="flex-1 max-w-xs px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white text-gray-400 cursor-not-allowed"
          />
          <button
            disabled
            className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg opacity-60 cursor-not-allowed"
          >
            Subscribe
          </button>
        </div>

        <p className="mt-3 text-xs text-gray-400">
          Newsletter integration coming soon. Check back shortly.
        </p>
      </div>
    </section>
  );
}
