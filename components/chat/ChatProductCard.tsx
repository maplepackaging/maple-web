import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface ChatProductCardProps {
  product: Product;
}

export default function ChatProductCard({ product }: ChatProductCardProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group block mt-3 rounded-xl overflow-hidden border border-border hover:border-primary/40 hover:shadow-md transition-all duration-200"
    >
      <div className="flex gap-0">
        {/* Image */}
        <div className="relative w-20 h-20 shrink-0 bg-beige-dark">
          <Image
            src={product.images?.[0] || "/placeholder-product.png"}
            alt={product.name}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 px-3 py-2.5 bg-white flex flex-col justify-between">
          <div>
            <p className="text-xs font-medium text-text-dark leading-snug line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </p>
          </div>
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm font-bold text-primary">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-text-muted line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <ArrowUpRight size={13} className="text-text-muted group-hover:text-primary transition-colors shrink-0" />
          </div>
        </div>
      </div>
    </Link>
  );
}
