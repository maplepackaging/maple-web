"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Link from "next/link";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
  {
    title: "Where Every Package Tells a Story",
    subtitle: "Premium Packaging & Gifting",
    description:
      "Handcrafted packaging and curated gift hampers that transform ordinary moments into extraordinary memories.",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238f53e?w=1200&q=80",
    cta: { text: "Explore Collections", href: "/categories" },
  },
  {
    title: "Elevate Your Wedding Experience",
    subtitle: "Luxury Wedding Invitations",
    description:
      "Exquisite invitation boxes and stationery that set the perfect tone for your special day. Crafted with love and attention to detail.",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=80",
    cta: { text: "View Wedding Collection", href: "/categories/wedding-invites" },
  },
  {
    title: "Corporate Gifting Redefined",
    subtitle: "Premium Corporate Solutions",
    description:
      "Make a lasting impression with our curated corporate hampers and custom packaging solutions for your business needs.",
    image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=1200&q=80",
    cta: { text: "Explore Corporate Gifts", href: "/categories/corporate-gifting" },
  },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-beige">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet !bg-primary/30",
          bulletActiveClass: "swiper-pagination-bullet-active !bg-primary",
        }}
        loop={true}
        className="hero-swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative min-h-[600px] md:min-h-[700px] lg:min-h-[800px]">
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full min-h-[600px] md:min-h-[700px] lg:min-h-[800px] flex items-center">
                <div className="max-w-2xl">
                  <span className="inline-block text-primary text-sm font-medium tracking-widest uppercase mb-4 animate-fade-in-up">
                    {slide.subtitle}
                  </span>
                  <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white leading-[1.1] tracking-tight animate-fade-in-up">
                    {slide.title}
                  </h1>
                  <p className="mt-6 text-lg text-white/90 max-w-lg leading-relaxed animate-fade-in-up">
                    {slide.description}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-4 animate-fade-in-up">
                    <Link href={slide.cta.href}>
                      <Button size="lg">{slide.cta.text}</Button>
                    </Link>
                    <Link href="/customize">
                      <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-text-dark">
                        Customize Yours
                      </Button>
                    </Link>
                  </div>

                  {/* Stats */}
                  {index === 0 && (
                    <div className="mt-12 flex gap-10 animate-fade-in-up">
                      {[
                        { value: "10K+", label: "Happy Clients" },
                        { value: "500+", label: "Products" },
                        { value: "50+", label: "Corporate Partners" },
                      ].map((stat) => (
                        <div key={stat.label}>
                          <div className="font-heading text-2xl font-semibold text-white">
                            {stat.value}
                          </div>
                          <div className="text-sm text-white/70 mt-0.5">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .hero-swiper .swiper-pagination {
          bottom: 30px !important;
        }
        .hero-swiper .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          margin: 0 6px !important;
          transition: all 0.3s ease;
        }
        .hero-swiper .swiper-pagination-bullet-active {
          width: 32px;
          border-radius: 6px;
        }
      `}</style>
    </section>
  );
}
