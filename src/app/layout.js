
import "./globals.css";
import siteConfig from "@/lib/site.js";
import Header from "@/components/Header.jsx";
import Footer from "@/components/Footer.jsx";

export const metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: "Era New AI | AI Tools & Guides",
    template: `%s | ${siteConfig.name}`,
  },

  description:
    "Discover the best AI tools, practical AI guides, and ways to use artificial intelligence for business, productivity, content creation, and everyday tasks.",

  applicationName: siteConfig.name,

  keywords: [
  
    "artificial intelligence",
    "AI for business",
    "AI productivity tools",
    "AI tools India",
    "AI tools for students",
    "AI tools for content creation",
    "AI tools for marketing",
    "AI tools for developers",
    "AI tools for automation",
    "AI tools India for e-commerce",
    "AI tools for small business",
    "AI tools for freelancers",
  ],

  authors: [{ name: siteConfig.name }],

  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": `${siteConfig.url}/rss.xml`,
    },
  },

  openGraph: {
    title: "Era New AI | AI Tools & Guides",
    description:
      "Explore useful AI tools, practical guides, and AI solutions for business and everyday productivity.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: siteConfig.defaultOgImage,
        width: 1200,
        height: 630,
        alt: "Era New AI - AI Tools and Guides",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Era New AI | AI Tools & Guides",
    description:
      "Discover useful AI tools and practical guides for business, productivity, and everyday work.",
    images: [siteConfig.defaultOgImage],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN">
      <body className="flex flex-col min-h-screen">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <Header />

        <main id="main-content" className="flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
