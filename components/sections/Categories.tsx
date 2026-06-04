import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Category } from "@/lib/types";

interface CategoriesProps {
  categories: Category[];
}

export default function Categories({ categories }: CategoriesProps) {
  const list = categories.slice(0, 8);

  return (
    <section className="py-12 md:py-16 bg-cream">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-7 md:mb-9">
          <div>
            <p className="eyebrow mb-2">Collections</p>
            <h2 className="font-heading text-3xl md:text-4xl text-ink leading-[1.04]">
              Shop by collection
            </h2>
          </div>
          <Link href="/categories" className="btn btn-pill-light btn-sm">
            View all
            <ArrowUpRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {list.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="lift group relative overflow-hidden rounded-2xl border border-line/60 bg-cream-deep aspect-square"
            >
              <Image
                src={category.image || "/placeholder-product.png"}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
              <div className="absolute inset-0 p-4 flex items-end justify-between gap-2">
                <h3 className="font-heading text-base md:text-lg text-white leading-tight">
                  {category.name}
                </h3>
                <span className="shrink-0 grid place-items-center w-8 h-8 rounded-full bg-white/95 text-ink translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <ArrowUpRight size={15} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
