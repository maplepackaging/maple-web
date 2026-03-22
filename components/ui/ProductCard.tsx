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
    <Link href={`/products/${product.id}`} className="group block">
      <div className="relative aspect-3/4 overflow-hidden rounded-xl bg-beige-dark mb-3">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {product.bestseller && (
          <span className="absolute top-3 left-3 bg-text-dark text-white text-xs font-medium px-2.5 py-1 rounded-full">
            Bestseller
          </span>
        )}
        {discount && (
          <span className="absolute top-3 right-3 bg-primary text-white text-xs font-medium px-2.5 py-1 rounded-full">
            -{discount}%
          </span>
        )}
      </div>

      <div className="space-y-1">
        <h3 className="font-medium text-sm md:text-base text-text-dark group-hover:text-primary transition-colors line-clamp-1">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-base md:text-lg font-semibold text-text-dark">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs md:text-sm text-text-muted line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
