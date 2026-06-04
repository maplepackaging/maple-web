"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Category, Product } from "@/lib/types";
import ProductCard from "@/components/ui/ProductCard";
import { cn } from "@/lib/utils";

interface CategoryDetailProps {
  category: Category;
  products: Product[];
}

export default function CategoryDetail({ category, products }: CategoryDetailProps) {
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);

  const filteredProducts = activeSubcategory
    ? products.filter((p) => p.subcategoryId === activeSubcategory)
    : products;

  return (
    <div className="bg-cream min-h-screen">
      {/* Header */}
      <section className="gradient-hero">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-14 md:pt-20 pb-12 md:pb-16">
          <nav className="flex items-center gap-2 text-sm text-ink-soft mb-5">
            <Link href="/" className="hover:text-terracotta transition-colors">Home</Link>
            <span className="text-line">/</span>
            <Link href="/categories" className="hover:text-terracotta transition-colors">Collections</Link>
            <span className="text-line">/</span>
            <span className="text-ink">{category.name}</span>
          </nav>
          <h1 className="font-heading text-4xl md:text-6xl text-ink leading-[1.02]">{category.name}</h1>
          {category.description && (
            <p className="mt-4 text-ink-soft text-lg max-w-2xl">{category.description}</p>
          )}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="card-soft p-5 lg:sticky lg:top-28">
              <h3 className="font-heading text-lg text-ink mb-4">Filter</h3>
              <div className="space-y-1.5">
                <button
                  onClick={() => setActiveSubcategory(null)}
                  className={cn(
                    "block w-full text-left px-3.5 py-2.5 rounded-xl text-sm transition-all",
                    activeSubcategory === null
                      ? "bg-terracotta text-white font-semibold"
                      : "text-ink-soft hover:text-ink hover:bg-cream"
                  )}
                >
                  All ({products.length})
                </button>
                {category.subcategories.map((sub) => {
                  const count = products.filter((p) => p.subcategoryId === sub.id).length;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => setActiveSubcategory(sub.id)}
                      className={cn(
                        "block w-full text-left px-3.5 py-2.5 rounded-xl text-sm transition-all",
                        activeSubcategory === sub.id
                          ? "bg-terracotta text-white font-semibold"
                          : "text-ink-soft hover:text-ink hover:bg-cream"
                      )}
                    >
                      {sub.name} {count > 0 && `(${count})`}
                    </button>
                  );
                })}
              </div>

              {activeSubcategory &&
                category.subcategories
                  .filter((s) => s.id === activeSubcategory && s.items.length > 0)
                  .map((sub) => (
                    <div key={sub.id} className="mt-6 pt-5 border-t border-line">
                      <h4 className="eyebrow !text-ink-soft mb-3">Types</h4>
                      <div className="flex flex-wrap gap-2">
                        {sub.items.map((item) => (
                          <span
                            key={item.id}
                            className="inline-block px-3 py-1.5 text-xs bg-cream border border-line rounded-full text-ink-soft"
                          >
                            {item.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
            </div>
          </aside>

          {/* Products */}
          <div className="lg:col-span-3">
            <p className="text-sm text-ink-soft mb-6">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
            </p>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4) }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="card-soft text-center py-20 px-6">
                <div className="font-heading text-2xl text-ink mb-2">Coming soon</div>
                <p className="text-ink-soft max-w-md mx-auto">
                  Products in this category are being curated. Check back soon or contact us for
                  custom orders.
                </p>
                <Link href="/contact" className="btn btn-pill-brand btn-md mt-7">
                  Contact Us
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
