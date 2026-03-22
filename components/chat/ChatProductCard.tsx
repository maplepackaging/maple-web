import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

interface ChatProductCardProps {
  product: Product;
}

export default function ChatProductCard({ product }: ChatProductCardProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="block bg-beige rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300 my-2"
    >
      <div className="flex gap-3 p-3">
        <div className="relative w-16 h-16 rounded-md overflow-hidden shrink-0 bg-beige-dark">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
            sizes="64px"
          />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="text-sm font-medium text-text-dark truncate">
            {product.name}
          </h4>
          <p className="text-xs text-text-muted line-clamp-1 mt-0.5">
            {product.description}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-semibold text-primary">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-text-muted line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
