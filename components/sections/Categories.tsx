"use client";

import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/lib/types";
import { ArrowUpRight } from "lucide-react";

interface CategoriesProps {
  categories: Category[];
}

export default function Categories({ categories }: CategoriesProps) {
  // Create asymmetric bento layout - first item large, others smaller
  const [featured, ...rest] = categories;

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Asymmetric */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 md:mb-24">
          <div>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text-dark leading-[1.1]">
              Explore Our
              <br />
              Collections
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-lg md:text-xl text-text-muted leading-relaxed">
              From intimate celebrations to grand corporate events, discover packaging that tells your story
            </p>
          </div>
        </div>

        {/* Bento Grid - Asymmetric Layout */}
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3 md:gap-4">
          {/* Featured Category - Large */}
          {featured && (
            <Link
              href={`/categories/${featured.slug}`}
              className="group relative col-span-4 md:col-span-4 row-span-2 overflow-hidden rounded-2xl bg-beige-dark"
            >
              <div className="absolute inset-0">
                <Image
                  src={featured.image}
                  alt={featured.name}
                  fill
                  className="object-cover transition-all duration-700 ease-out group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
              </div>
              
              <div className="relative h-full min-h-100 flex flex-col justify-between p-6 md:p-8">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm self-start">
                  <ArrowUpRight className="w-5 h-5 text-white transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
                <div>
                  <p className="text-white/70 text-xs md:text-sm mb-2 uppercase tracking-wider">Featured</p>
                  <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-2">
                    {featured.name}
                  </h3>
                  <p className="text-white/80 text-sm md:text-base max-w-xs">
                    {featured.description}
                  </p>
                </div>
              </div>
            </Link>
          )}

          {/* Other Categories - Smaller Cards */}
          {rest.slice(0, 5).map((category, idx) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className={`group relative overflow-hidden rounded-2xl bg-beige-dark ${
                idx === 0 ? 'col-span-4 md:col-span-4' : 
                idx === 1 ? 'col-span-2 md:col-span-2' :
                idx === 2 ? 'col-span-2 md:col-span-2' :
                'col-span-2 md:col-span-2'
              }`}
            >
              <div className="absolute inset-0">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-all duration-700 ease-out group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
              </div>
              
              <div className="relative h-full min-h-45 md:min-h-50 flex flex-col justify-between p-4 md:p-6">
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm self-start opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-heading text-base md:text-lg font-bold text-white mb-1">
                    {category.name}
                  </h3>
                  <p className="text-white/70 text-xs line-clamp-1">
                    {category.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
