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
      className="group flex mt-3 rounded-2xl overflow-hidden bg-paper border border-line hover:border-terracotta/40 hover:shadow-md transition-all duration-200"
    >
      {/* Image */}
      <div className="relative w-20 h-20 shrink-0 bg-cream-deep">
        <Image
          src={product.images?.[0] || "/placeholder-product.png"}
          alt={product.name}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 px-3 py-2.5 flex flex-col justify-between">
        <p className="text-xs font-semibold text-ink leading-snug line-clamp-2 group-hover:text-terracotta transition-colors">
          {product.name}
        </p>
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-bold text-terracotta">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xs text-ink-soft line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <ArrowUpRight size={13} className="text-ink-soft group-hover:text-terracotta transition-colors shrink-0" />
        </div>
      </div>
    </Link>
  );
}
