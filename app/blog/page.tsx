import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { getSanityBlogPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog — Maple Packaging",
  description:
    "Insights on packaging trends, gifting ideas, wedding stationery, and sustainability from the Maple Packaging team.",
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPage() {
  const blogPosts = await getSanityBlogPosts();

  return (
    <>
      <PageHero
        label="Journal"
        title="The Maple journal"
        subtitle="Insights on packaging, gifting, and the art of presentation."
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      />

      <section className="py-14 md:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6 md:gap-7">
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="card-soft lift group block overflow-hidden p-0"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.image || "/placeholder-product.png"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <span className="absolute top-4 left-4 badge-pill !py-1.5 !text-xs">
                    {post.category}
                  </span>
                </div>
                <div className="p-6 md:p-7">
                  <div className="flex items-center gap-3 text-xs text-ink-soft mb-3">
                    <time>{formatDate(post.date)}</time>
                    <span className="w-1 h-1 rounded-full bg-line" />
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="font-heading text-xl md:text-2xl text-ink group-hover:text-terracotta transition-colors leading-snug">
                    {post.title}
                  </h2>
                  <p className="mt-2.5 text-sm text-ink-soft leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-terracotta">
                    Read more
                    <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
