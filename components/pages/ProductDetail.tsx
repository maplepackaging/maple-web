"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Heart, Share2, ChevronRight } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";
import ProductCard from "@/components/ui/ProductCard";
import SectionHeading from "@/components/ui/SectionHeading";

interface ProductDetailProps {
  product: Product;
  categoryName: string;
  categorySlug: string;
  relatedProducts: Product[];
}

export default function ProductDetail({
  product,
  categoryName,
  categorySlug,
  relatedProducts,
}: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : null;

  return (
    <div className="bg-beige min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm text-text-muted">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronRight size={14} />
          <Link
            href="/categories"
            className="hover:text-primary transition-colors"
          >
            Collections
          </Link>
          <ChevronRight size={14} />
          <Link
            href={`/categories/${categorySlug}`}
            className="hover:text-primary transition-colors"
          >
            {categoryName}
          </Link>
          <ChevronRight size={14} />
          <span className="text-text-dark">{product.name}</span>
        </nav>
      </div>

      {/* Product section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative aspect-square rounded-xl overflow-hidden bg-beige-dark">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {product.bestseller && (
                <span className="absolute top-4 left-4 bg-text-dark text-white text-xs font-medium px-3 py-1.5 rounded-full">
                  Bestseller
                </span>
              )}
              {discount && (
                <span className="absolute top-4 right-4 bg-primary text-white text-xs font-medium px-3 py-1.5 rounded-full">
                  {discount}% off
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3 mt-4">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === i
                        ? "border-primary"
                        : "border-transparent"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col"
          >
            <div className="flex flex-wrap gap-2 mb-4">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium text-primary uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="font-heading text-3xl md:text-4xl font-semibold text-text-dark leading-tight">
              {product.name}
            </h1>

            {/* Price */}
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-3xl font-semibold text-text-dark">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-text-muted line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="text-sm font-medium text-primary">
                    Save {discount}%
                  </span>
                </>
              )}
            </div>

            <div className="h-px bg-border my-6" />

            {/* Description */}
            <p className="text-text-muted leading-relaxed text-base">
              {product.description}
            </p>

            {/* Actions */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg" className="flex-1 min-w-50">
                <ShoppingBag size={18} className="mr-2" />
                Add to Cart
              </Button>
              <button className="p-3 border border-border rounded-lg hover:border-primary hover:text-primary transition-colors">
                <Heart size={20} />
              </button>
              <button className="p-3 border border-border rounded-lg hover:border-primary hover:text-primary transition-colors">
                <Share2 size={20} />
              </button>
            </div>

            {/* Highlights */}
            <div className="mt-8 space-y-3">
              {[
                "Handcrafted with premium materials",
                "Fully customizable — colors, textures, monograms",
                "Pan-India delivery with careful packaging",
                "Minimum order quantities may apply",
              ].map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span className="text-sm text-text-muted">{point}</span>
                </div>
              ))}
            </div>

            {/* Enquiry */}
            <div className="mt-8 p-5 bg-surface border border-border rounded-xl">
              <p className="text-sm font-medium text-text-dark">
                Need this customized?
              </p>
              <p className="text-sm text-text-muted mt-1">
                We offer bespoke packaging with your branding, colors, and
                materials. Contact us for a quote.
              </p>
              <Link
                href="/customize"
                className="inline-block mt-3 text-sm font-medium text-primary hover:underline"
              >
                Start Customizing →
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <div className="bg-surface py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="You May Also Like"
              subtitle="More from this collection"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <Link key={p.id} href={`/products/${p.id}`}>
                  <ProductCard product={p} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
