"use client";

import { useEffect } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Blog error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-beige flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="text-6xl mb-6">📝</div>
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-text-dark mb-4">
          Failed to load blog
        </h1>
        <p className="text-text-muted mb-8">
          We couldn't load the blog content. Please try again in a moment.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={reset}>Try Again</Button>
          <Link
            href="/"
            className="inline-flex items-center justify-center font-medium transition-all duration-300 ease-out cursor-pointer bg-surface text-text-dark border border-border hover:border-primary hover:text-primary px-6 py-3 text-base rounded-lg"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
