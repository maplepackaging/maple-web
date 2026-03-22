"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    title: "Where Every Package Tells a Story",
    subtitle: "Premium Packaging & Gifting",
    description:
      "Handcrafted packaging and curated gift hampers that transform ordinary moments into extraordinary memories.",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238f53e?w=1920&q=90",
    cta: { text: "Explore Collections", href: "/categories" },
  },
  {
    title: "Elevate Your Wedding Experience",
    subtitle: "Luxury Wedding Invitations",
    description:
      "Exquisite invitation boxes and stationery that set the perfect tone for your special day.",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1920&q=90",
    cta: { text: "View Wedding Collection", href: "/categories/wedding-invites" },
  },
  {
    title: "Corporate Gifting Redefined",
    subtitle: "Premium Corporate Solutions",
    description:
      "Make a lasting impression with our curated corporate hampers and custom packaging solutions.",
    image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=1920&q=90",
    cta: { text: "Explore Corporate Gifts", href: "/categories/corporate-gifting" },
  },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-black h-[calc(100vh-7rem)]"
    >
      <Swiper
        modules={[Autoplay, Pagination]}
        speed={800}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet !bg-white/40",
          bulletActiveClass: "swiper-pagination-bullet-active !bg-primary",
        }}
        loop={true}
        className="hero-swiper h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  sizes="100vw"
                  quality={90}
                />
                <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/70 to-black/50" />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative h-full flex items-center py-8 md:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div className="max-w-3xl">
                    {/* Subtitle */}
                    <div className="mb-4">
                      <span className="text-primary text-xs md:text-sm font-medium tracking-widest uppercase">
                        {slide.subtitle}
                      </span>
                    </div>

                    {/* Title */}
                    <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-5">
                      {slide.title}
                    </h1>

                    {/* Description */}
                    <p className="text-base md:text-lg text-white/70 max-w-xl leading-relaxed mb-8">
                      {slide.description}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link href={slide.cta.href}>
                        <Button size="lg" className="group w-full sm:w-auto">
                          {slide.cta.text}
                          <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                      <Link href="/customize">
                        <Button 
                          variant="outline" 
                          size="lg" 
                          className="w-full sm:w-auto border-2 border-white/30 text-white hover:bg-white hover:text-text-dark backdrop-blur-sm"
                        >
                          Customize Yours
                        </Button>
                      </Link>
                    </div>

                    {/* Stats - Only on first slide */}
                    {index === 0 && (
                      <div className="mt-12 mb-16 grid grid-cols-3 gap-6 max-w-lg">
                        {[
                          { value: "10K+", label: "Happy Clients" },
                          { value: "500+", label: "Products" },
                          { value: "50+", label: "Corporate Partners" },
                        ].map((stat) => (
                          <div key={stat.label} className="text-center sm:text-left">
                            <div className="font-heading text-2xl md:text-3xl font-bold text-white mb-1">
                              {stat.value}
                            </div>
                            <div className="text-xs text-white/70 uppercase tracking-wider">
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .hero-swiper .swiper-pagination {
          bottom: 40px !important;
          z-index: 10;
        }
        .hero-swiper .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          margin: 0 6px !important;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 1;
        }
        .hero-swiper .swiper-pagination-bullet-active {
          width: 40px;
          border-radius: 5px;
          background: #CD5F39 !important;
        }
      `}</style>
    </section>
  );
}
