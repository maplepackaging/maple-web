import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextBlock } from "@portabletext/react";
import { getAboutPage } from "@/lib/content";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "About Us — Maple Packaging",
  description:
    "Discover the story behind Maple Packaging — our vision, our craft, and why thousands of clients trust us with their most important moments.",
};

const defaultValues = [
  { title: "Craftsmanship First", description: "Every product passes through the hands of skilled artisans. Packaging is the first impression — and it must be flawless." },
  { title: "Sustainability Matters", description: "We actively source eco-friendly materials and minimize waste across production. Premium doesn't have to cost the planet." },
  { title: "Client Obsession", description: "From 50 invite boxes to 5,000 corporate welcome kits — every client receives the same care and attention." },
];

const defaultSteps = [
  { step: "01", title: "Consultation", description: "Understand your vision, occasion, and budget" },
  { step: "02", title: "Design", description: "Create concepts with material samples and mockups" },
  { step: "03", title: "Production", description: "Handcraft with precision using premium materials" },
  { step: "04", title: "Delivery", description: "Careful packaging and reliable pan-India shipping" },
];

export default async function AboutPage() {
  const about = await getAboutPage();
  const values = about.values?.length ? about.values : defaultValues;
  const processSteps = about.processSteps?.length ? about.processSteps : defaultSteps;

  return (
    <div className="bg-cream">
      <PageHero
        label="Our Story"
        title={about.heroTitle || "We make moments worth unwrapping"}
        subtitle={about.heroSubtitle || "Crafting premium packaging and gifting experiences, one box at a time."}
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {/* What we do */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <p className="eyebrow mb-3">What we do</p>
              <h2 className="font-heading text-3xl md:text-5xl text-ink leading-[1.05]">
                {about.whatWeDoTitle || "Ordinary moments, made extraordinary"}
              </h2>
              {about.whatWeDoBody?.length ? (
                <div className="mt-6 text-ink-soft leading-relaxed space-y-4">
                  <PortableText value={about.whatWeDoBody as PortableTextBlock[]} />
                </div>
              ) : (
                <div className="mt-6 space-y-4 text-ink-soft leading-relaxed">
                  <p>
                    Maple Packaging is a premium packaging and gifting company based in India,
                    specialising in wedding invitations, gift hampers, corporate gifting, and bespoke
                    packaging design.
                  </p>
                  <p>
                    What started as a passion for beautiful packaging has grown into a brand trusted
                    by over 10,000 clients — from intimate celebrations to large-scale corporate
                    events. The right packaging doesn&apos;t just hold a gift — it elevates the whole
                    experience.
                  </p>
                </div>
              )}
            </div>
            <div className="relative aspect-[4/3] rounded-[1.75rem] overflow-hidden border border-line/60 bg-cream-deep">
              <Image
                src={about.whatWeDoImage || "/hero-box-1.png"}
                alt="Premium packaging craftsmanship"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 gradient-warm">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <p className="eyebrow mb-3">Our values</p>
            <h2 className="font-heading text-4xl md:text-5xl text-ink leading-[1.02]">What we stand for</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5 md:gap-6">
            {values.map((value, i) => (
              <div key={value.title} className="card-soft p-8">
                <span className="icon-chip bg-terracotta w-12 h-12 mb-5 font-heading text-lg text-white">
                  {i + 1}
                </span>
                <h3 className="font-heading text-xl text-ink">{value.title}</h3>
                <p className="mt-3 text-sm text-ink-soft leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="dotted-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <p className="eyebrow mb-3">How we work</p>
            <h2 className="font-heading text-4xl md:text-5xl text-ink leading-[1.02]">Our process</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {processSteps.map((item) => (
              <div key={item.step} className="card-soft p-7 text-center">
                <span className="icon-chip bg-espresso w-14 h-14 mx-auto mb-5 font-heading text-xl text-cream">
                  {item.step}
                </span>
                <h3 className="font-heading text-lg text-ink">{item.title}</h3>
                <p className="mt-2 text-sm text-ink-soft leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cream pb-16 md:pb-24 px-5 sm:px-6 lg:px-8">
        <div className="relative max-w-5xl mx-auto overflow-hidden rounded-[2.5rem] bg-espresso-deep text-cream px-6 py-16 md:px-12 md:py-20 text-center">
          <div className="dotted-grid absolute inset-0 opacity-[0.08] [background-image:radial-gradient(rgba(255,255,255,0.6)_1px,transparent_1px)] pointer-events-none" />
          <div className="relative">
            <h2 className="font-heading text-3xl md:text-5xl text-white leading-[1.05] max-w-2xl mx-auto">
              {about.ctaHeading || "Every box carries a piece of our heart"}
            </h2>
            <p className="mt-6 text-cream/70 leading-relaxed max-w-2xl mx-auto">
              {about.ctaBody ||
                "We're storytellers, craftspeople, and perfectionists who believe the way a gift is presented matters as much as the gift itself. That's the Maple promise."}
            </p>
            <div className="mt-9 flex flex-col sm:flex-row justify-center gap-3.5">
              <Link href="/customize" className="btn btn-pill-brand btn-lg">Start a project</Link>
              <Link href="/contact" className="btn btn-pill-ghost btn-lg">Get in touch</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
