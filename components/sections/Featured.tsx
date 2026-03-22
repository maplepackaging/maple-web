"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface FeaturedProps {
  products: Product[];
}

export default function Featured({ products }: FeaturedProps) {
  return (
    <section className="py-10 md:py-16 bg-beige overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-primary text-xs font-medium tracking-[0.2em] uppercase mb-2">Bestsellers</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-dark leading-tight">
              Most Loved
            </h2>
          </div>
          <Link
            href="/categories"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-text-muted hover:text-primary transition-colors"
          >
            Shop all
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Horizontal scrollable strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          {products.slice(0, 5).map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group block"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-beige-dark mb-3">
                <Image
                  src={product.images?.[0] || "/placeholder-product.png"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
                {/* Price on hover */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white font-semibold text-sm">{formatPrice(product.price)}</p>
                  {product.originalPrice && (
                    <p className="text-white/60 text-xs line-through">{formatPrice(product.originalPrice)}</p>
                  )}
                </div>
              </div>
              <p className="text-sm font-medium text-text-dark group-hover:text-primary transition-colors line-clamp-1">
                {product.name}
              </p>
              <p className="text-sm text-text-muted mt-0.5">{formatPrice(product.price)}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
