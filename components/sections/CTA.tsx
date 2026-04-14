"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { SiteSettings } from "@/lib/sanity-data";

const defaultStats = [
  { value: "10K+", label: "Happy Clients" },
  { value: "500+", label: "Products" },
  { value: "50+", label: "Corporate Partners" },
];

interface CTAProps {
  settings?: SiteSettings;
}

export default function CTA({ settings }: CTAProps) {
  const heading = settings?.ctaHeading || "Ready to Make Your Vision Come Alive?";
  const body = settings?.ctaBody || "From bespoke wedding invitations to custom corporate hampers — we bring your ideas to life with premium craftsmanship";
  const stats = settings?.ctaStats?.length ? settings.ctaStats : defaultStats;

  return (
    <section className="py-20 md:py-32 bg-text-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {heading}
          </h2>

          <p className="text-base md:text-lg text-white/70 mb-10 max-w-2xl mx-auto">
            {body}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/customize"
              className="group inline-flex items-center justify-center font-medium transition-all duration-300 ease-out cursor-pointer bg-primary text-white hover:bg-primary-hover shadow-sm hover:shadow-md px-8 py-4 text-lg rounded-lg w-full sm:w-auto"
            >
              Start Customizing
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center font-medium transition-all duration-300 ease-out cursor-pointer bg-transparent border-2 border-white/30 text-white hover:bg-white hover:text-text-dark px-8 py-4 text-lg rounded-lg w-full sm:w-auto"
            >
              Get in Touch
            </Link>
          </div>

          <div className="mt-12 pt-12 border-t border-white/10">
            <div className="grid grid-cols-3 gap-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-heading text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-xs md:text-sm text-white/60 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
