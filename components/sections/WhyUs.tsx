"use client";

import { motion } from "framer-motion";
import { Gem, Truck, Palette, ShieldCheck } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const reasons = [
  {
    icon: Gem,
    title: "Uncompromising Quality",
    description:
      "Every product is crafted with premium materials — from handmade papers to fine silks and sustainable woods.",
  },
  {
    icon: Palette,
    title: "Fully Customizable",
    description:
      "Your vision, our craft. We customize everything from colors and textures to monograms and embossing.",
  },
  {
    icon: Truck,
    title: "Pan-India Delivery",
    description:
      "Reliable shipping across India with careful packaging to ensure your order arrives in perfect condition.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted by 10K+ Clients",
    description:
      "From intimate weddings to Fortune 500 corporate events — brands and families trust us to deliver excellence.",
  },
];

export default function WhyUs() {
  return (
    <section className="py-20 md:py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Why Maple Packaging"
          subtitle="What sets us apart in a market full of ordinary"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary-light mb-5">
                <reason.icon size={24} className="text-primary" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-text-dark">
                {reason.title}
              </h3>
              <p className="mt-2 text-sm text-text-muted leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
