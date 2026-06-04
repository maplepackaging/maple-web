"use client";

import { useEffect } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <div className="min-h-[80vh] grid place-items-center gradient-hero px-5">
      <div className="max-w-md w-full text-center">
        <div className="text-6xl mb-6">⚠️</div>
        <h1 className="font-heading text-3xl md:text-4xl text-ink mb-4">Something went wrong</h1>
        <p className="text-ink-soft mb-8">
          We encountered an unexpected error. Please try again or contact support if the problem persists.
        </p>
        <div className="flex flex-col sm:flex-row gap-3.5 justify-center">
          <Button size="lg" onClick={reset}>Try Again</Button>
          <Link href="/" className="btn btn-pill-light btn-lg">Go Home</Link>
        </div>
      </div>
    </div>
  );
}
