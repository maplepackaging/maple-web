"use client";

import Button from "@/components/ui/Button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-20 md:py-32 bg-text-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to Make Your Vision Come Alive?
          </h2>

          <p className="text-base md:text-lg text-white/70 mb-10 max-w-2xl mx-auto">
            From bespoke wedding invitations to custom corporate hampers — we bring your ideas to life with premium craftsmanship
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/customize">
              <Button size="lg" className="w-full sm:w-auto group">
                Start Customizing
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto border-2 border-white/30 text-white hover:bg-white hover:text-text-dark"
              >
                Get in Touch
              </Button>
            </Link>
          </div>

          <div className="mt-12 pt-12 border-t border-white/10">
            <div className="grid grid-cols-3 gap-8">
              <div>
                <div className="font-heading text-2xl md:text-3xl font-bold text-white mb-1">10K+</div>
                <div className="text-xs md:text-sm text-white/60 uppercase tracking-wider">Happy Clients</div>
              </div>
              <div>
                <div className="font-heading text-2xl md:text-3xl font-bold text-white mb-1">500+</div>
                <div className="text-xs md:text-sm text-white/60 uppercase tracking-wider">Products</div>
              </div>
              <div>
                <div className="font-heading text-2xl md:text-3xl font-bold text-white mb-1">50+</div>
                <div className="text-xs md:text-sm text-white/60 uppercase tracking-wider">Corporate Partners</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
