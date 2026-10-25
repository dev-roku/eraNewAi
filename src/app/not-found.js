import Link from 'next/link';

export const metadata = {
  title: '404 — Page Not Found',
};

export default function NotFound() {
  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 py-24 text-center">
      <span className="text-6xl block mb-4" aria-hidden="true">🔭</span>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Page not found</h1>
      <p className="text-gray-500 mb-8">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link
          href="/"
          className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Go home
        </Link>
        <Link
          href="/blog/"
          className="px-5 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:border-indigo-300 hover:text-indigo-600 transition-colors"
        >
          Browse articles
        </Link>
      </div>
    </div>
  );
}
