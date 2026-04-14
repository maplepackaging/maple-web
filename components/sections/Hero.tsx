"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { HeroSlide } from "@/lib/sanity-data";

const fallbackSlides: HeroSlide[] = [
  {
    title: "Where Every Package Tells a Story",
    subtitle: "Premium Packaging & Gifting",
    description: "Handcrafted packaging and curated gift hampers that transform ordinary moments into extraordinary memories.",
    image: "/hero-opt-1.png",
    cta: { text: "Explore Collections", href: "/categories" },
  },
  {
    title: "Crafted for Your Special Day",
    subtitle: "Wedding Collection 2025",
    description: "Exquisite wedding invitations, favor boxes, and packaging that set the tone for your celebration.",
    image: "/hero-opt-2.png",
    cta: { text: "Wedding Collection", href: "/categories/wedding-invites" },
  },
  {
    title: "Make Every Gift Unforgettable",
    subtitle: "Corporate & Personal Gifting",
    description: "Curated gift hampers and premium packaging solutions for corporate events, festivals, and personal milestones.",
    image: "/hero-opt-3.png",
    cta: { text: "Customize Now", href: "/customize" },
  },
];

const SLIDE_DURATION = 6000;

interface HeroProps {
  slides?: HeroSlide[];
}

export default function Hero({ slides: slidesProp }: HeroProps) {
  const slides = slidesProp && slidesProp.length > 0 ? slidesProp : fallbackSlides;
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
    setProgress(0);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  }, []);

  const goTo = useCallback((i: number) => {
    setCurrent(i);
    setProgress(0);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          next();
          return 0;
        }
        return p + 100 / (SLIDE_DURATION / 50);
      });
    }, 50);
    return () => clearInterval(interval);
  }, [current, next]);

  const slide = slides[current];

  return (
    <section className="relative bg-text-dark overflow-hidden h-[calc(100dvh-7rem)]">
      <div className="mx-auto h-full grid grid-cols-1 lg:grid-cols-2">
        {/* Left — Text panel */}
        <div className="relative z-10 flex flex-col justify-center px-6 sm:px-10 lg:px-16 xl:px-20 py-14 md:py-20 lg:py-24 order-2 lg:order-1">


          <div key={current}>
              <span className="inline-block text-primary text-xs font-semibold tracking-[0.2em] uppercase mb-4 md:mb-5">
                {slide.subtitle}
              </span>

              <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.15] mb-4 md:mb-5 max-w-[520px]">
                {slide.title}
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-white/60 leading-relaxed mb-6 md:mb-8 max-w-lg line-clamp-2">
                {slide.description}
              </p>

              <div className="flex flex-wrap gap-3 sm:gap-4">
                <Link
                  href={slide.cta.href}
                  className="group inline-flex items-center justify-center font-medium transition-all duration-300 bg-primary text-white hover:bg-primary-hover shadow-lg hover:shadow-xl px-6 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base rounded-xl"
                >
                  {slide.cta.text}
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/customize"
                  className="inline-flex items-center justify-center font-medium transition-all duration-300 border-2 border-white/20 text-white hover:bg-white/10 px-6 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base rounded-xl"
                >
                  Customize Yours
                </Link>
              </div>
          </div>

          {/* Bottom controls */}
          <div className="mt-12 md:mt-16 flex items-center gap-6">
            {/* Arrows */}
            <div className="flex gap-2">
              <button
                onClick={prev}
                aria-label="Previous slide"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                aria-label="Next slide"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Progress bars */}
            <div className="flex items-center gap-2 flex-1 max-w-48">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className="relative h-1 flex-1 rounded-full bg-white/15 overflow-hidden cursor-pointer"
                >
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-primary transition-all duration-100 ease-linear"
                    style={{
                      width:
                        i === current
                          ? `${progress}%`
                          : i < current
                            ? "100%"
                            : "0%",
                    }}
                  />
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* Right — Image panel */}
        <div className="relative order-1 lg:order-2 min-h-[240px] sm:min-h-[300px] lg:min-h-0">
          <div className="absolute inset-0">
              {slide.image ? (
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={current === 0}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={90}
                />
              ) : (
                <div className="w-full h-full bg-charcoal/30" />
              )}
              {/* Subtle gradient blending into dark panel on left */}
              <div className="absolute inset-0 bg-linear-to-t from-text-dark/80 via-transparent to-transparent lg:bg-linear-to-r lg:from-text-dark/60 lg:via-transparent lg:to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
