"use client";

import { Star } from "lucide-react";
import type { Testimonial } from "@/lib/types";
import { Marquee } from "@/components/ui/marquee";

interface TestimonialsProps {
  testimonials: Testimonial[];
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="w-[300px] md:w-[360px] shrink-0 bg-white rounded-2xl p-6 flex flex-col gap-4 shadow-sm border border-border">
      {/* Stars */}
      <div className="flex gap-0.5">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} size={13} className="fill-primary text-primary" />
        ))}
      </div>
      {/* Quote */}
      <p className="text-text-dark text-sm leading-relaxed line-clamp-4 flex-1">
        &ldquo;{testimonial.content}&rdquo;
      </p>
      {/* Author */}
      <div className="flex items-center gap-3 pt-3 border-t border-border">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-xs shrink-0">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-semibold text-text-dark leading-none">{testimonial.name}</p>
          <p className="text-xs text-text-muted mt-0.5">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section className="relative py-12 md:py-20 bg-beige overflow-hidden">
      {/* Bottom fade into Instagram section (white) */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-b from-transparent to-white pointer-events-none z-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 md:mb-14">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-primary text-xs font-medium tracking-[0.2em] uppercase mb-2">Reviews</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-dark leading-tight">
              What our clients say
            </h2>
          </div>
          <p className="text-text-muted text-sm hidden md:block">
            {testimonials.length > 0 ? `${testimonials.length * 100}+ happy orders` : ""}
          </p>
        </div>
      </div>

      {/* Marquee — single row */}
      <Marquee pauseOnHover className="[--duration:40s]">
        {testimonials.map((t, i) => (
          <TestimonialCard key={i} testimonial={t} />
        ))}
      </Marquee>
    </section>
  );
}
