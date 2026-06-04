"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Heart, Share2, ChevronRight, Check, Sparkles, Truck, ShieldCheck } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import ProductCard from "@/components/ui/ProductCard";

interface ProductDetailProps {
  product: Product;
  categoryName: string;
  categorySlug: string;
  relatedProducts: Product[];
}

const trust = [
  { Icon: Sparkles, label: "Free design proof" },
  { Icon: Truck, label: "Pan-India shipping" },
  { Icon: ShieldCheck, label: "Bulk pricing" },
];

export default function ProductDetail({
  product,
  categoryName,
  categorySlug,
  relatedProducts,
}: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem } = useCart();

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="bg-cream min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-8 pb-2">
        <nav className="flex items-center gap-1.5 text-sm text-ink-soft flex-wrap">
          <Link href="/" className="hover:text-terracotta transition-colors">Home</Link>
          <ChevronRight size={14} className="text-line" />
          <Link href="/categories" className="hover:text-terracotta transition-colors">Collections</Link>
          <ChevronRight size={14} className="text-line" />
          <Link href={`/categories/${categorySlug}`} className="hover:text-terracotta transition-colors">{categoryName}</Link>
          <ChevronRight size={14} className="text-line" />
          <span className="text-ink">{product.name}</span>
        </nav>
      </div>

      {/* Product */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pb-16 pt-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 lg:items-start">
          {/* Gallery */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="lg:sticky lg:top-28 flex flex-col-reverse sm:flex-row gap-4"
          >
            {(product.images?.length ?? 0) > 1 && (
              <div className="flex sm:flex-col gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-colors ${
                      selectedImage === i ? "border-terracotta" : "border-line"
                    }`}
                  >
                    <Image src={img || "/placeholder-product.png"} alt={`${product.name} ${i + 1}`} fill className="object-cover" sizes="80px" />
                  </button>
                ))}
              </div>
            )}
            <div className="relative flex-1 aspect-square rounded-[1.75rem] overflow-hidden bg-cream-deep border border-line/60">
              <Image
                src={product.images?.[selectedImage] || "/placeholder-product.png"}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {product.bestseller && (
                <span className="absolute top-4 left-4 bg-ink/90 text-cream text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm">Bestseller</span>
              )}
              {discount && (
                <span className="absolute top-4 right-4 bg-terracotta text-white text-xs font-bold px-3 py-1.5 rounded-full">{discount}% off</span>
              )}
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {product.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {product.tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center rounded-full bg-terracotta-soft text-terracotta text-xs font-semibold px-3 py-1 capitalize">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <h1 className="font-heading text-3xl md:text-5xl text-ink leading-[1.05]">{product.name}</h1>

            <div className="mt-5 flex items-baseline gap-3 flex-wrap">
              <span className="font-heading text-4xl text-terracotta">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-ink-soft line-through">{formatPrice(product.originalPrice)}</span>
                  <span className="text-sm font-semibold text-sage-deep bg-sage-soft px-2.5 py-1 rounded-full">Save {discount}%</span>
                </>
              )}
            </div>

            <p className="mt-6 text-ink-soft leading-relaxed">{product.description}</p>

            {/* Actions */}
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => addItem(product)} className="btn btn-pill-brand btn-lg flex-1 min-w-[12rem]">
                <ShoppingBag size={18} />
                Add to Cart
              </button>
              <Link href="/customize" className="btn btn-pill-light btn-lg">Customize this</Link>
              <button aria-label="Wishlist" className="grid place-items-center w-[3.4rem] h-[3.4rem] rounded-full bg-paper border border-line text-ink hover:text-terracotta hover:-translate-y-0.5 transition-all">
                <Heart size={20} />
              </button>
              <button aria-label="Share" className="grid place-items-center w-[3.4rem] h-[3.4rem] rounded-full bg-paper border border-line text-ink hover:text-terracotta hover:-translate-y-0.5 transition-all">
                <Share2 size={20} />
              </button>
            </div>

            {/* Trust pills */}
            <div className="mt-6 flex flex-wrap gap-2.5">
              {trust.map(({ Icon, label }) => (
                <span key={label} className="badge-pill !py-2 !text-[0.8rem]">
                  <Icon size={15} className="text-terracotta" />
                  {label}
                </span>
              ))}
            </div>

            {/* Highlights */}
            <div className="card-soft mt-8 p-6 space-y-3">
              {[
                "Handcrafted with premium materials",
                "Fully customizable — colors, textures, monograms",
                "Pan-India delivery with careful packaging",
              ].map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <span className="grid place-items-center w-5 h-5 rounded-full bg-sage-soft text-sage-deep mt-0.5 shrink-0">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  <span className="text-sm text-ink-soft">{point}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Related */}
      {relatedProducts.length > 0 && (
        <div className="gradient-warm py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="text-center mb-10 md:mb-14">
              <p className="eyebrow mb-3">More to love</p>
              <h2 className="font-heading text-4xl md:text-5xl text-ink leading-[1.02]">You may also like</h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
