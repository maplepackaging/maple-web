import Image from "next/image";
import Link from "next/link";
import type { SiteSettings } from "@/lib/content";

interface CTAProps {
  settings?: SiteSettings;
}

export default function CTA({ settings }: CTAProps) {
  const heading = settings?.ctaHeading || "Let's make something beautiful together";
  const body =
    settings?.ctaBody ||
    "Bespoke wedding invitations, branded corporate hampers, custom boxes — tell us your vision and we'll craft it, end to end.";

  return (
    <section className="bg-cream py-12 md:py-20 px-5 sm:px-6 lg:px-8">
      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 overflow-hidden rounded-[2.5rem] border border-line/70 bg-gradient-to-br from-cream-deep via-cream to-terracotta-soft">
        {/* Copy */}
        <div className="px-7 py-12 md:px-12 md:py-16 lg:py-20 flex flex-col justify-center">
          <h2 className="font-heading text-3xl md:text-5xl text-ink leading-[1.05]">{heading}</h2>
          <p className="mt-5 text-ink-soft text-base md:text-lg max-w-md leading-relaxed">{body}</p>
          <div className="mt-8 flex flex-wrap gap-3.5">
            <Link href="/customize" className="btn btn-pill-brand btn-lg">Start customizing</Link>
            <Link href="/contact" className="btn btn-pill-light btn-lg">Get in touch</Link>
          </div>
        </div>

        {/* Image */}
        <div className="relative min-h-[260px] lg:min-h-[460px]">
          <Image
            src="/hero-box-2.png"
            alt="Custom Maple gift hamper"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-cream/40 via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
}
