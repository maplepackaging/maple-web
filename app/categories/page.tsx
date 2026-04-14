import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getSanityCategories } from "@/lib/sanity-data";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "All Collections — Maple Packaging",
  description:
    "Explore our complete range of premium packaging and gifting solutions — from wedding invitations to corporate hampers.",
};

export default async function CategoriesPage() {
  const categories = await getSanityCategories();

  return (
    <section className="py-16 md:py-24 bg-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Shop"
          title="All Collections"
          subtitle="Explore our complete range of premium packaging and gifting solutions"
        />

        {/* Main categories grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group relative block overflow-hidden rounded-xl aspect-4/3"
            >
              <Image
                src={category.image || "/placeholder-product.png"}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <h2 className="font-heading text-2xl md:text-3xl font-semibold text-white">
                  {category.name}
                </h2>
                <p className="mt-2 text-sm text-white/70 max-w-sm leading-relaxed">
                  {category.description}
                </p>
                <div className="mt-3 flex items-center gap-2 text-sm text-white/80 font-medium">
                  <span>{category.subcategories.length} subcategories</span>
                  <span className="text-primary">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
