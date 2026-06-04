import type { Metadata } from "next";
import Link from "next/link";
import { Star, Quote } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { getSanityTestimonials } from "@/lib/content";

export const metadata: Metadata = {
  title: "Testimonials — Maple Packaging",
  description:
    "Read what our clients say about Maple Packaging — real stories from weddings, corporate events, and personal gifting.",
};

export default async function TestimonialsPage() {
  const testimonials = await getSanityTestimonials();

  return (
    <>
      <PageHero
        label="Testimonials"
        title="Client stories"
        subtitle="Real experiences from people who trusted us with their most important moments."
        crumbs={[{ label: "Home", href: "/" }, { label: "Testimonials" }]}
      />

      <section className="py-14 md:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {testimonials.map((t) => (
              <div key={t.id} className="card-soft p-7 flex flex-col">
                <Quote size={28} className="text-terracotta/80 fill-terracotta/15" />
                <p className="text-ink leading-relaxed mt-4 flex-1">{t.content}</p>
                <span className="rule-gold w-full my-5 !bg-[linear-gradient(90deg,transparent,var(--color-gold),transparent)]" />
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-full bg-terracotta-soft grid place-items-center text-terracotta font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-ink leading-tight">{t.name}</p>
                    <p className="text-sm text-ink-soft mt-0.5">{t.role}</p>
                    <div className="flex gap-0.5 mt-1.5">
                      {Array.from({ length: t.rating || 5 }).map((_, i) => (
                        <Star key={i} size={13} className="fill-terracotta text-terracotta" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <p className="text-ink-soft">Have a story to share? We&apos;d love to hear from you.</p>
            <Link href="/contact" className="btn btn-pill-brand btn-lg mt-5">
              Share your experience
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
