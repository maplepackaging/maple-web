"use client";

import Image from "next/image";
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
    <div className="group relative">
      <div className="relative aspect-4/5 overflow-hidden rounded-lg bg-beige-dark">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {product.bestseller && (
          <span className="absolute top-3 left-3 bg-text-dark text-white text-xs font-medium px-3 py-1 rounded-full">
            Bestseller
          </span>
        )}
        {discount && (
          <span className="absolute top-3 right-3 bg-primary text-white text-xs font-medium px-3 py-1 rounded-full">
            {discount}% off
          </span>
        )}
      </div>

      <div className="mt-4 space-y-1">
        <h3 className="font-heading text-lg font-medium text-text-dark group-hover:text-primary transition-colors duration-300">
          {product.name}
        </h3>
        <p className="text-sm text-text-muted line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center gap-2 pt-1">
          <span className="text-lg font-semibold text-text-dark">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-text-muted line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
