import type { Metadata } from "next";
import Link from "next/link";
import { Palette, Box, Pen, Truck, Check } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import CustomizeForm from "@/components/forms/CustomizeForm";
import { getCustomizePage } from "@/lib/content";
import { WHATSAPP_NUMBER } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Customize Your Order — Maple Packaging",
  description:
    "Create bespoke packaging tailored to your brand, wedding, or event. Custom colors, materials, textures, and monograms.",
};

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Pen, Palette, Box, Truck,
};

const defaultSteps = [
  { icon: "Pen", title: "Tell Us Your Vision", description: "Share your event details, color preferences, material choices, and any inspiration images you have." },
  { icon: "Palette", title: "We Design & Sample", description: "Our design team creates concepts with mockups. We send physical samples for your approval before production." },
  { icon: "Box", title: "Production", description: "Once approved, we handcraft your order with meticulous attention to detail using premium materials." },
  { icon: "Truck", title: "Delivery", description: "Carefully packed and shipped pan-India. We ensure everything arrives in pristine condition." },
];

const defaultProducts = [
  "Wedding Invitation Boxes",
  "Wedding Cards & Suites",
  "Gift Hamper Boxes & Baskets",
  "Corporate Welcome Kits",
  "Chocolate & Sweet Boxes",
  "Wedding Stationery Sets",
  "Baby Announcement Boxes",
  "Festival Gift Packaging",
];

export default async function CustomizePage() {
  const data = await getCustomizePage();
  const steps = data.steps?.length ? data.steps : defaultSteps;
  const customizableProducts = data.customizableProducts?.length ? data.customizableProducts : defaultProducts;

  return (
    <div className="bg-cream">
      <PageHero
        label={data.heroLabel || "Bespoke packaging"}
        title={data.heroTitle || "Your vision, our craft"}
        subtitle={
          data.heroBody ||
          "From custom colors and textures to embossed monograms and bespoke structures — we bring your packaging dreams to life."
        }
        crumbs={[{ label: "Home", href: "/" }, { label: "Customize" }]}
      />

      {/* How it works */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="dotted-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <p className="eyebrow mb-3">How it works</p>
            <h2 className="font-heading text-4xl md:text-5xl text-ink leading-[1.02]">Four steps to bespoke</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {steps.map((step, i) => {
              const Icon = iconMap[step.icon] || Pen;
              return (
                <div key={step.title} className="card-soft p-7 text-center">
                  <span className="relative inline-grid mb-5">
                    <span className="icon-chip bg-terracotta-soft w-14 h-14">
                      <Icon size={24} className="text-terracotta" />
                    </span>
                    <span className="absolute -top-1.5 -right-1.5 w-6 h-6 grid place-items-center bg-espresso text-cream text-xs font-bold rounded-full">
                      {i + 1}
                    </span>
                  </span>
                  <h3 className="font-heading text-lg text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm text-ink-soft leading-relaxed">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Customizable + form */}
      <section className="py-16 md:py-24 gradient-warm">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow mb-3">Fully customizable</p>
              <h2 className="font-heading text-3xl md:text-5xl text-ink leading-[1.05]">
                {data.customizableTitle || "Everything tailored to you"}
              </h2>
              <p className="mt-4 text-ink-soft leading-relaxed max-w-md">
                {data.customizableBody ||
                  "Colors, materials, textures, sizes, printing, foil stamping, embossing, monograms, ribbons, wax seals — every element is yours to choose."}
              </p>
              <div className="mt-8 grid sm:grid-cols-2 gap-2.5">
                {customizableProducts.map((product) => (
                  <div key={product} className="flex items-center gap-2.5 text-sm text-ink-soft">
                    <span className="grid place-items-center w-5 h-5 rounded-full bg-sage-soft text-sage-deep shrink-0">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    {product}
                  </div>
                ))}
              </div>
            </div>

            <CustomizeForm />
          </div>
        </div>
      </section>

      {/* Talk CTA */}
      <section className="py-14 md:py-20 bg-cream">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-2xl md:text-4xl text-ink">Prefer to talk directly?</h2>
          <p className="mt-3 text-ink-soft">
            Call us at{" "}
            <a href={`tel:+${WHATSAPP_NUMBER}`} className="text-terracotta font-semibold">+91 84335 72388</a>{" "}
            or{" "}
            <Link href="/contact" className="text-terracotta font-semibold link-underline">send us a message</Link>.
          </p>
        </div>
      </section>
    </div>
  );
}
