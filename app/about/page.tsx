import type { Metadata } from "next";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "About Us — Maple Packaging",
  description:
    "Discover the story behind Maple Packaging — our vision, our craft, and why thousands of clients trust us with their most important moments.",
};

const values = [
  {
    title: "Craftsmanship First",
    description:
      "Every product passes through the hands of skilled artisans. We believe packaging is not just a container — it's the first impression, and it must be flawless.",
  },
  {
    title: "Sustainability Matters",
    description:
      "We actively source eco-friendly materials and minimize waste across our production. Premium doesn't have to come at the planet's expense.",
  },
  {
    title: "Client Obsession",
    description:
      "From a bride ordering 50 invite boxes to a Fortune 500 company ordering 5,000 welcome kits — every client receives the same care and attention.",
  },
];

const process_steps = [
  { step: "01", title: "Consultation", description: "Understand your vision, occasion, and budget" },
  { step: "02", title: "Design", description: "Create concepts with material samples and mockups" },
  { step: "03", title: "Production", description: "Handcraft with precision using premium materials" },
  { step: "04", title: "Delivery", description: "Careful packaging and reliable pan-India shipping" },
];

export default function AboutPage() {
  return (
    <div className="bg-beige">
      {/* Hero */}
      <section className="relative h-72 md:h-96 overflow-hidden">
        <Image
          src="/placeholder-product.png"
          alt="Maple Packaging workshop"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-black/20" />
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          <h1 className="font-heading text-4xl md:text-6xl font-semibold text-white">
            Our Story
          </h1>
          <p className="mt-3 text-white/70 max-w-xl text-lg">
            Crafting experiences, one package at a time
          </p>
        </div>
      </section>

      {/* What we do */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="text-primary text-sm font-medium tracking-widest uppercase">
                What We Do
              </span>
              <h2 className="mt-3 font-heading text-3xl md:text-4xl font-semibold text-text-dark leading-tight">
                We transform ordinary moments into extraordinary memories
              </h2>
              <p className="mt-6 text-text-muted leading-relaxed">
                Maple Packaging is a premium packaging and gifting company based
                in India. We specialize in wedding invitations, gift hampers,
                corporate gifting solutions, and bespoke packaging design.
              </p>
              <p className="mt-4 text-text-muted leading-relaxed">
                What started as a passion for beautiful packaging has grown into
                a brand trusted by over 10,000 clients — from intimate family
                celebrations to large-scale corporate events. We believe the
                right packaging doesn&apos;t just hold a gift — it elevates the
                entire experience.
              </p>
            </div>
            <div className="relative aspect-4/3 rounded-xl overflow-hidden">
              <Image
                src="/placeholder-product.png"
                alt="Premium packaging craftsmanship"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Our Values"
            title="What We Stand For"
            subtitle="The principles that guide every product we create"
          />
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <h3 className="font-heading text-xl font-semibold text-text-dark">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm text-text-muted leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="How We Work"
            title="Our Process"
            subtitle="From first conversation to doorstep delivery"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {process_steps.map((item) => (
              <div key={item.step} className="relative">
                <span className="font-heading text-5xl font-bold text-primary/20">
                  {item.step}
                </span>
                <h3 className="mt-2 font-heading text-lg font-semibold text-text-dark">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-text-dark">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white leading-tight">
            Every box we create carries a piece of our heart
          </h2>
          <p className="mt-6 text-white/60 leading-relaxed">
            We&apos;re not just a packaging company. We&apos;re storytellers, craftspeople,
            and perfectionists who believe that the way a gift is presented
            matters just as much as the gift itself. That&apos;s the Maple promise.
          </p>
        </div>
      </section>
    </div>
  );
}
