"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { ArrowUpRight, Star } from "lucide-react";

interface FeaturedProps {
  products: Product[];
}

export default function Featured({ products }: FeaturedProps) {
  const [hero, ...rest] = products;

  return (
    <section className="py-16 md:py-24 bg-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Split Layout */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <p className="text-primary text-xs md:text-sm font-medium tracking-wider uppercase mb-3">Bestsellers</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-text-dark leading-[1.1]">
              Loved by Thousands
            </h2>
          </div>
          <Link 
            href="/categories"
            className="group inline-flex items-center gap-2 text-text-dark hover:text-primary transition-colors"
          >
            <span className="text-base font-medium">View All</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>

        {/* Hero Product + Grid Layout */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-6">
          {/* Hero Product - Large */}
          {hero && (
            <Link 
              href={`/products/${hero.id}`}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 md:p-8"
            >
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div className="order-2 md:order-1">
                  {hero.bestseller && (
                    <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-2.5 py-1 rounded-full text-xs font-medium mb-3">
                      <Star className="w-3 h-3 fill-current" />
                      <span>Bestseller</span>
                    </div>
                  )}
                  <h3 className="font-heading text-2xl md:text-3xl font-bold text-text-dark mb-3 group-hover:text-primary transition-colors">
                    {hero.name}
                  </h3>
                  <p className="text-text-muted text-sm md:text-base mb-4 leading-relaxed line-clamp-2">
                    {hero.description}
                  </p>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-2xl md:text-3xl font-bold text-text-dark">
                      {formatPrice(hero.price)}
                    </span>
                    {hero.originalPrice && (
                      <span className="text-base text-text-muted line-through">
                        {formatPrice(hero.originalPrice)}
                      </span>
                    )}
                  </div>
                  <div className="inline-flex items-center gap-2 text-text-dark group-hover:text-primary transition-colors">
                    <span className="text-sm font-medium">Shop Now</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
                <div className="order-1 md:order-2 relative aspect-square rounded-xl overflow-hidden bg-beige-dark">
                  <Image
                    src={hero.images[0]}
                    alt={hero.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>
            </Link>
          )}

          {/* Secondary Featured Product */}
          {rest[0] && (
            <Link
              href={`/products/${rest[0].id}`}
              className="group relative overflow-hidden rounded-3xl bg-white"
            >
              <div className="relative aspect-4/5 md:aspect-square">
                <Image
                  src={rest[0].images[0]}
                  alt={rest[0].name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                    {rest[0].name}
                  </h3>
                  <div className="flex items-baseline gap-2 text-white">
                    <span className="text-xl md:text-2xl font-bold">
                      {formatPrice(rest[0].price)}
                    </span>
                    {rest[0].originalPrice && (
                      <span className="text-sm line-through opacity-70">
                        {formatPrice(rest[0].originalPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          )}
        </div>

        {/* Product Grid - Remaining Products */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {rest.slice(1, 5).map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group block"
            >
              <div className="relative aspect-3/4 overflow-hidden rounded-2xl bg-beige-dark mb-3">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                {product.bestseller && (
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full">
                    <Star className="w-3 h-3 fill-primary text-primary" />
                  </div>
                )}
              </div>
              <h3 className="font-medium text-sm md:text-base text-text-dark group-hover:text-primary transition-colors mb-1 line-clamp-1">
                {product.name}
              </h3>
              <div className="flex items-baseline gap-2">
                <span className="text-base md:text-lg font-semibold text-text-dark">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-text-muted line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
