"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Category, Product } from "@/lib/types";
import ProductCard from "@/components/ui/ProductCard";
import { cn } from "@/lib/utils";

interface CategoryDetailProps {
  category: Category;
  products: Product[];
}

export default function CategoryDetail({
  category,
  products,
}: CategoryDetailProps) {
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(
    null
  );

  const filteredProducts = activeSubcategory
    ? products.filter((p) => p.subcategoryId === activeSubcategory)
    : products;

  return (
    <div className="bg-beige min-h-screen">
      {/* Hero banner */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <Image
          src={category.image || "/placeholder-product.png"}
          alt={category.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-black/20" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-3">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/categories"
              className="hover:text-white transition-colors"
            >
              Collections
            </Link>
            <span>/</span>
            <span className="text-white">{category.name}</span>
          </nav>
          <h1 className="font-heading text-3xl md:text-5xl font-semibold text-white">
            {category.name}
          </h1>
          <p className="mt-2 text-white/70 max-w-xl">{category.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid lg:grid-cols-4 gap-10">
          {/* Sidebar - Subcategories */}
          <aside className="lg:col-span-1">
            <h3 className="font-heading text-lg font-semibold text-text-dark mb-4">
              Subcategories
            </h3>
            <div className="space-y-1">
              <button
                onClick={() => setActiveSubcategory(null)}
                className={cn(
                  "block w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-200",
                  activeSubcategory === null
                    ? "bg-primary text-white font-medium"
                    : "text-text-muted hover:text-text-dark hover:bg-beige-dark"
                )}
              >
                All ({products.length})
              </button>
              {category.subcategories.map((sub) => {
                const count = products.filter(
                  (p) => p.subcategoryId === sub.id
                ).length;
                return (
                  <button
                    key={sub.id}
                    onClick={() => setActiveSubcategory(sub.id)}
                    className={cn(
                      "block w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-200",
                      activeSubcategory === sub.id
                        ? "bg-primary text-white font-medium"
                        : "text-text-muted hover:text-text-dark hover:bg-beige-dark"
                    )}
                  >
                    {sub.name} {count > 0 && `(${count})`}
                  </button>
                );
              })}
            </div>

            {/* Sub-subcategories */}
            {activeSubcategory && (
              <div className="mt-6">
                {category.subcategories
                  .filter((s) => s.id === activeSubcategory && s.items.length > 0)
                  .map((sub) => (
                    <div key={sub.id}>
                      <h4 className="text-xs font-medium text-text-muted uppercase tracking-wider mb-3">
                        Types
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {sub.items.map((item) => (
                          <span
                            key={item.id}
                            className="inline-block px-3 py-1.5 text-xs bg-surface border border-border rounded-full text-text-muted"
                          >
                            {item.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </aside>

          {/* Products grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-8">
              <p className="text-sm text-text-muted">
                {filteredProducts.length} product
                {filteredProducts.length !== 1 ? "s" : ""}
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="font-heading text-2xl text-text-dark mb-2">
                  Coming Soon
                </div>
                <p className="text-text-muted">
                  Products in this category are being curated. Check back soon
                  or contact us for custom orders.
                </p>
                <Link
                  href="/contact"
                  className="inline-block mt-6 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors text-sm font-medium"
                >
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
