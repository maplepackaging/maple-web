"use client";

import { NumberTicker } from "@/components/ui/number-ticker";
import type { SiteSettings } from "@/lib/sanity-data";

const defaultStats = [
  { value: 10000, suffix: "+", label: "Happy Clients" },
  { value: 500, suffix: "+", label: "Custom Orders" },
  { value: 48, suffix: "h", label: "Avg Delivery" },
  { value: 100, suffix: "%", label: "Handcrafted" },
];

interface WhyUsProps {
  settings?: SiteSettings;
}

export default function WhyUs({ settings }: WhyUsProps) {
  const stats = settings?.whyUsStats?.length ? settings.whyUsStats : defaultStats;
  const heading = settings?.whyUsHeading || "Crafted for moments that matter.";
  const body = settings?.whyUsBody || "From intimate wedding invitations to grand corporate gifts — every piece we make carries the weight of the moment it accompanies.";
  return (
    <section className="bg-text-dark py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left — editorial statement */}
          <div>
            <p className="text-primary text-xs font-medium tracking-[0.2em] uppercase mb-5">Why Maple</p>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] mb-6">
              {heading}
            </h2>
            <p className="text-white/50 text-base md:text-lg leading-relaxed max-w-md">
              {body}
            </p>
          </div>

          {/* Right — animated stats */}
          <div className="grid grid-cols-2 gap-px bg-white/10 rounded-2xl overflow-hidden">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-text-dark p-8 md:p-10 flex flex-col gap-2">
                <div className="font-heading text-4xl md:text-5xl font-bold text-white flex items-baseline gap-0.5">
                  <NumberTicker
                    value={stat.value}
                    className="text-white"
                  />
                  <span>{stat.suffix}</span>
                </div>
                <p className="text-white/40 text-sm uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
