import type { Metadata } from "next";
import Link from "next/link";
import { Palette, Box, Pen, Truck } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import CustomizeForm from "@/components/forms/CustomizeForm";
import { getCustomizePage } from "@/lib/sanity-data";

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
    <div className="bg-beige">
      {/* Hero */}
      <section className="py-20 md:py-28 bg-text-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <span className="inline-block text-primary text-sm font-medium tracking-widest uppercase mb-4">
            {data.heroLabel || "Bespoke Packaging"}
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight">
            {data.heroTitle || "Your Vision, Our Craft"}
          </h1>
          <p className="mt-6 text-lg text-white/60 max-w-xl mx-auto leading-relaxed">
            {data.heroBody || "From custom colors and textures to embossed monograms and bespoke structures — we bring your packaging dreams to life."}
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="How It Works"
            subtitle="Four simple steps from concept to doorstep"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={step.title} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary-light mb-5 relative">
                  {(() => { const Icon = iconMap[step.icon] || Pen; return <Icon size={24} className="text-primary" />; })()}
                  <span className="absolute -top-1 -right-1 w-6 h-6 bg-text-dark text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-heading text-lg font-semibold text-text-dark">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-text-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What can be customized */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary text-sm font-medium tracking-widest uppercase">
                Fully Customizable
              </span>
              <h2 className="mt-3 font-heading text-3xl md:text-4xl font-semibold text-text-dark leading-tight">
                {data.customizableTitle || "Everything Can Be Tailored to You"}
              </h2>
              <p className="mt-4 text-text-muted leading-relaxed">
                {data.customizableBody || "Colors, materials, textures, sizes, printing, foil stamping, embossing, monograms, ribbons, wax seals — every element is yours to choose."}
              </p>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {customizableProducts.map((product) => (
                  <div
                    key={product}
                    className="flex items-center gap-2 text-sm text-text-muted"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {product}
                  </div>
                ))}
              </div>
            </div>

            {/* Enquiry form */}
            <CustomizeForm />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-text-dark">
            Prefer to talk directly?
          </h2>
          <p className="mt-3 text-text-muted">
            Call us at{" "}
            <a href="tel:+918433572388" className="text-primary font-medium">
              +91 84335 72388
            </a>{" "}
            or{" "}
            <Link href="/contact" className="text-primary font-medium hover:underline">
              send us a message
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
