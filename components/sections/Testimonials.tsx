"use client";

import Image from "next/image";
import { Star, Quote } from "lucide-react";
import type { Testimonial } from "@/lib/types";
import { Marquee } from "@/components/ui/marquee";

interface TestimonialsProps {
  testimonials: Testimonial[];
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="card-soft w-[320px] md:w-[380px] shrink-0 p-7 flex flex-col">
      <Quote size={30} className="text-terracotta/80 fill-terracotta/15" />
      <p className="text-ink text-[0.97rem] leading-relaxed mt-4 flex-1 line-clamp-5">
        {testimonial.content}
      </p>
      <span className="rule-gold w-full my-5 !bg-[linear-gradient(90deg,transparent,var(--color-gold),transparent)]" />
      <div className="flex items-center gap-3.5">
        {/[/]|^https?:/.test(testimonial.avatar) ? (
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            width={48}
            height={48}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-terracotta-soft grid place-items-center text-terracotta font-bold">
            {testimonial.name.charAt(0)}
          </div>
        )}
        <div>
          <p className="font-semibold text-ink leading-tight">{testimonial.name}</p>
          <p className="text-sm text-ink-soft mt-0.5">{testimonial.role}</p>
          <div className="flex gap-0.5 mt-1.5">
            {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
              <Star key={i} size={13} className="fill-terracotta text-terracotta" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  if (!testimonials?.length) return null;

  return (
    <section className="relative py-16 md:py-24 gradient-warm overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 text-center mb-12 md:mb-16">
        <p className="eyebrow mb-3">Reviews</p>
        <h2 className="font-heading text-5xl md:text-6xl text-ink leading-[1]">
          Testimonials
        </h2>
        <p className="mt-4 text-ink-soft text-lg">
          Kind words from our happy clients
        </p>
      </div>

      <Marquee pauseOnHover className="[--duration:46s] [--gap:1.25rem]">
        {testimonials.map((t, i) => (
          <TestimonialCard key={i} testimonial={t} />
        ))}
      </Marquee>
    </section>
  );
}
