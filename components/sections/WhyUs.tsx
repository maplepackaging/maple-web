"use client";

import { Heart, Gem, Package, Star, Award } from "lucide-react";
import { NumberTicker } from "@/components/ui/number-ticker";
import type { SiteSettings } from "@/lib/content";

const stats = [
  { value: 1000, suffix: "+", decimals: 0, label: "Weddings", Icon: Gem, color: "bg-terracotta" },
  { value: 50, suffix: "k+", decimals: 0, label: "Boxes shipped", Icon: Package, color: "bg-sage" },
  { value: 4.9, suffix: "★", decimals: 1, label: "Rating", Icon: Star, color: "bg-gold" },
  { value: 15, suffix: "+", decimals: 0, label: "Years", Icon: Award, color: "bg-terracotta" },
];

interface WhyUsProps {
  settings?: SiteSettings;
}

export default function WhyUs({}: WhyUsProps) {
  return (
    <section className="relative py-16 md:py-24 bg-cream overflow-hidden">
      {/* dotted texture, right side */}
      <div className="dotted-grid absolute top-0 right-0 w-1/2 h-full opacity-60 pointer-events-none [mask-image:linear-gradient(to_left,black,transparent)]" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <span className="badge-pill mb-5">
            <Heart size={15} className="text-terracotta fill-terracotta" />
            Trusted by 1000+ couples &amp; brands
          </span>
          <h2 className="font-heading text-5xl md:text-6xl text-ink leading-[1] mt-2">
            Why Maple
          </h2>
          <p className="mt-4 text-ink-soft text-lg">
            Crafted with care. Chosen for every celebration.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {stats.map(({ value, suffix, decimals, label, Icon, color }) => (
            <div
              key={label}
              className="card-soft flex flex-col items-center text-center px-5 py-8 md:py-9"
            >
              <span className={`icon-chip ${color} w-14 h-14 mb-5`}>
                <Icon size={24} className="text-white" />
              </span>
              <div className="font-heading text-4xl md:text-5xl text-ink flex items-baseline">
                <NumberTicker value={value} decimalPlaces={decimals} className="text-ink" />
                <span>{suffix}</span>
              </div>
              <span className="rule-gold my-4" />
              <p className="text-ink-soft text-sm md:text-base">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
