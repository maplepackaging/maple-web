"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Category } from "@/lib/types";

interface CategoriesProps {
  categories: Category[];
}

export default function Categories({ categories }: CategoriesProps) {
  return (
    <section className="py-20 md:py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Our Collections"
          subtitle="From wedding invitations to corporate gifting — explore packaging crafted for every occasion"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={`/categories/${category.slug}`}
                className="group relative block overflow-hidden rounded-xl aspect-3/4 md:aspect-square"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                  <h3 className="font-heading text-lg md:text-xl font-semibold text-white">
                    {category.name}
                  </h3>
                  <p className="mt-1 text-sm text-white/70 line-clamp-2 hidden md:block">
                    {category.description}
                  </p>
                  <span className="inline-block mt-3 text-sm text-white/90 font-medium group-hover:text-primary transition-colors duration-300">
                    Explore →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
