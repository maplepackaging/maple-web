"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="inline-block text-primary text-sm font-medium tracking-widest uppercase mb-4">
              Premium Packaging & Gifting
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-text-dark leading-[1.1] tracking-tight">
              Where Every
              <br />
              <span className="text-primary">Package</span> Tells
              <br />a Story
            </h1>
            <p className="mt-6 text-lg text-text-muted max-w-lg leading-relaxed">
              Handcrafted packaging and curated gift hampers that transform
              ordinary moments into extraordinary memories. From weddings to
              corporate gifting — we make it unforgettable.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/categories">
                <Button size="lg">Explore Collections</Button>
              </Link>
              <Link href="/customize">
                <Button variant="outline" size="lg">
                  Customize Yours
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-12 flex gap-10">
              {[
                { value: "10K+", label: "Happy Clients" },
                { value: "500+", label: "Products" },
                { value: "50+", label: "Corporate Partners" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-heading text-2xl font-semibold text-text-dark">
                    {stat.value}
                  </div>
                  <div className="text-sm text-text-muted mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-beige-dark">
              <Image
                src="https://images.unsplash.com/photo-1549465220-1a8b9238f53e?w=800&q=80"
                alt="Premium gift packaging"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Decorative overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-text-dark/20 to-transparent" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-surface rounded-xl shadow-lg p-4 hidden md:block">
              <div className="text-sm font-medium text-text-dark">
                Trusted by
              </div>
              <div className="font-heading text-xl font-semibold text-primary">
                10,000+ clients
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
