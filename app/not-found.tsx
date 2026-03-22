import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-beige">
      <div className="text-center px-4">
        <span className="font-heading text-8xl font-bold text-primary/20">
          404
        </span>
        <h1 className="mt-4 font-heading text-3xl font-semibold text-text-dark">
          Page Not Found
        </h1>
        <p className="mt-3 text-text-muted max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-colors text-sm"
          >
            Go Home
          </Link>
          <Link
            href="/categories"
            className="px-6 py-3 bg-surface text-text-dark border border-border font-medium rounded-lg hover:border-primary hover:text-primary transition-colors text-sm"
          >
            Browse Collections
          </Link>
        </div>
      </div>
    </div>
  );
}
