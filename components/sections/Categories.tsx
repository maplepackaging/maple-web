"use client";

import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/lib/types";

interface CategoriesProps {
  categories: Category[];
}

export default function Categories({ categories }: CategoriesProps) {
  const [featured, ...rest] = categories;

  return (
    <section className="relative py-10 md:py-16 bg-white">
      {/* Bottom fade into Featured section (beige) */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-b from-transparent to-[#FAFBF0] pointer-events-none z-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact header */}
        <div className="flex items-end justify-between mb-8 md:mb-10">
          <div>
            <p className="text-primary text-xs font-medium tracking-[0.2em] uppercase mb-2">Collections</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-dark leading-tight">
              Explore Our Range
            </h2>
          </div>
          <Link
            href="/categories"
            className="text-sm font-medium text-text-muted hover:text-primary transition-colors hidden md:block"
          >
            View all →
          </Link>
        </div>

        {/* Bento grid — tighter */}
        <div className="grid grid-cols-4 md:grid-cols-8 gap-2 md:gap-3">
          {featured && (
            <Link
              href={`/categories/${featured.slug}`}
              className="group relative col-span-4 row-span-2 overflow-hidden rounded-xl bg-beige-dark"
            >
              <div className="absolute inset-0">
                <Image
                  src={featured.image || "/placeholder-product.png"}
                  alt={featured.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              </div>
              <div className="relative h-full min-h-[220px] md:min-h-[300px] flex flex-col justify-end p-5 md:p-7">
                <h3 className="font-heading text-xl md:text-2xl font-bold text-white mb-1">
                  {featured.name}
                </h3>
                <p className="text-white/70 text-xs md:text-sm line-clamp-1">{featured.description}</p>
              </div>
            </Link>
          )}

          {rest.slice(0, 5).map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group relative col-span-2 md:col-span-2 overflow-hidden rounded-xl bg-beige-dark"
            >
              <div className="absolute inset-0">
                <Image
                  src={category.image || "/placeholder-product.png"}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              </div>
              <div className="relative h-full min-h-[120px] md:min-h-[140px] flex flex-col justify-end p-3 md:p-4">
                <h3 className="font-heading text-sm md:text-base font-bold text-white leading-tight">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        <Link
          href="/categories"
          className="text-sm font-medium text-text-muted hover:text-primary transition-colors mt-4 block md:hidden"
        >
          View all →
        </Link>
      </div>
    </section>
  );
}
