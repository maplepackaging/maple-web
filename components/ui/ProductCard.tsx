"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : null;

  return (
    <Link
      href={`/products/${product.id}`}
      className="card-soft lift group block p-3"
    >
      <div className="relative aspect-square overflow-hidden rounded-[1.25rem] bg-cream-deep">
        <Image
          src={product.images?.[0] || "/placeholder-product.png"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {product.bestseller && (
          <span className="absolute top-2.5 left-2.5 bg-ink/90 text-cream text-[11px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">
            Bestseller
          </span>
        )}
        {discount && (
          <span className="absolute top-2.5 right-2.5 bg-terracotta text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
            -{discount}%
          </span>
        )}
      </div>

      <div className="px-1.5 pt-3.5 pb-1.5">
        <h3 className="font-semibold text-[0.95rem] text-ink group-hover:text-terracotta transition-colors line-clamp-1">
          {product.name}
        </h3>
        <div className="mt-2 flex items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-terracotta-soft text-terracotta font-bold text-sm px-3 py-1">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-ink-soft line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
