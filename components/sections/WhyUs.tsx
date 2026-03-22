"use client";

import { Gem, Truck, Palette, ShieldCheck } from "lucide-react";

const reasons = [
  {
    icon: Gem,
    title: "Premium Quality",
    description: "Crafted with premium materials and meticulous attention to detail",
    stat: "100%",
    label: "Handcrafted",
  },
  {
    icon: Palette,
    title: "Fully Customizable",
    description: "Personalize every aspect to perfectly match your vision",
    stat: "500+",
    label: "Custom Orders",
  },
  {
    icon: Truck,
    title: "Pan-India Delivery",
    description: "Fast and reliable shipping across the country",
    stat: "48hrs",
    label: "Avg Delivery",
  },
  {
    icon: ShieldCheck,
    title: "Trusted by 10K+",
    description: "Chosen by leading brands and families nationwide",
    stat: "10K+",
    label: "Happy Clients",
  },
];

export default function WhyUs() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-primary text-xs md:text-sm font-medium tracking-wider uppercase mb-3">Why Maple</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-text-dark mb-4">
            What Sets Us Apart
          </h2>
          <p className="text-base md:text-lg text-text-muted max-w-2xl mx-auto">
            Excellence in every detail, trusted by thousands
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason) => (
            <div 
              key={reason.title} 
              className="group relative bg-beige rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-transparent hover:border-primary/20"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <reason.icon size={20} className="text-primary" />
                </div>
                <div className="text-right">
                  <div className="font-heading text-2xl font-bold text-text-dark">{reason.stat}</div>
                  <div className="text-xs text-text-muted uppercase tracking-wider">{reason.label}</div>
                </div>
              </div>
              <h3 className="font-heading text-lg font-semibold text-text-dark mb-2">
                {reason.title}
              </h3>
              <p className="text-sm text-text-muted leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
