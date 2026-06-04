import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/lib/types";
import ProductCard from "@/components/ui/ProductCard";

interface FeaturedProps {
  products: Product[];
}

export default function Featured({ products }: FeaturedProps) {
  if (!products?.length) return null;

  return (
    <section className="py-16 md:py-24 gradient-warm overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10 md:mb-14">
          <div>
            <p className="eyebrow mb-3">Bestsellers</p>
            <h2 className="font-heading text-4xl md:text-5xl text-ink leading-[1.02]">
              Most loved
            </h2>
          </div>
          <Link href="/categories" className="btn btn-pill-light btn-md">
            Shop all
            <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
