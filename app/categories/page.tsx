import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getSanityCategories } from "@/lib/content";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "All Collections — Maple Packaging",
  description:
    "Explore our complete range of premium packaging and gifting solutions — from wedding invitations to corporate hampers.",
};

export default async function CategoriesPage() {
  const categories = await getSanityCategories();

  return (
    <>
      <PageHero
        label="Shop"
        title="All collections"
        subtitle="Explore our complete range of premium packaging and gifting solutions."
        crumbs={[{ label: "Home", href: "/" }, { label: "Collections" }]}
      />

      <section className="py-14 md:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="lift group relative block overflow-hidden rounded-[1.75rem] border border-line/60 bg-cream-deep aspect-[4/5]"
              >
                <Image
                  src={category.image || "/placeholder-product.png"}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />
                <div className="absolute inset-0 p-6 md:p-7 flex flex-col justify-end">
                  <h2 className="font-heading text-2xl md:text-3xl text-white leading-tight">
                    {category.name}
                  </h2>
                  <p className="mt-2 text-sm text-white/75 max-w-sm leading-relaxed line-clamp-2">
                    {category.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="inline-flex items-center rounded-full bg-white/15 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5">
                      {category.subcategories.length} subcategories
                    </span>
                    <span className="grid place-items-center w-9 h-9 rounded-full bg-white text-ink translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                      <ArrowUpRight size={17} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
