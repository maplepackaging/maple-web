import Link from "next/link";

interface Crumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  label?: string;
  title: string;
  subtitle?: string;
  crumbs?: Crumb[];
  align?: "left" | "center";
}

export default function PageHero({
  label,
  title,
  subtitle,
  crumbs,
  align = "center",
}: PageHeroProps) {
  const centered = align === "center";
  return (
    <section className="gradient-hero">
      <div
        className={`max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 pt-14 md:pt-20 pb-12 md:pb-16 ${
          centered ? "text-center" : "text-left"
        }`}
      >
        {crumbs && crumbs.length > 0 && (
          <nav
            className={`flex items-center gap-2 text-sm text-ink-soft mb-5 ${
              centered ? "justify-center" : ""
            }`}
          >
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-2">
                {c.href ? (
                  <Link href={c.href} className="hover:text-terracotta transition-colors">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-ink">{c.label}</span>
                )}
                {i < crumbs.length - 1 && <span className="text-line">/</span>}
              </span>
            ))}
          </nav>
        )}
        {label && <p className="eyebrow mb-3">{label}</p>}
        <h1 className="font-heading text-4xl md:text-6xl text-ink leading-[1.02]">{title}</h1>
        {subtitle && (
          <p
            className={`mt-4 text-ink-soft text-lg leading-relaxed ${
              centered ? "max-w-2xl mx-auto" : "max-w-2xl"
            }`}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
