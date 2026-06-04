import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] grid place-items-center gradient-hero">
      <div className="text-center px-5">
        <span className="font-heading text-[7rem] md:text-[10rem] leading-none font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-terracotta to-clay">
          404
        </span>
        <h1 className="mt-2 font-heading text-3xl md:text-4xl text-ink">Page not found</h1>
        <p className="mt-3 text-ink-soft max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you
          back on track.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3.5">
          <Link href="/" className="btn btn-pill-brand btn-lg">Go home</Link>
          <Link href="/categories" className="btn btn-pill-light btn-lg">Browse collections</Link>
        </div>
      </div>
    </div>
  );
}
