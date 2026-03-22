import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import { getBlogPosts } from "@/lib/supabase-data";

export const metadata: Metadata = {
  title: "Blog — Maple Packaging",
  description:
    "Insights on packaging trends, gifting ideas, wedding stationery, and sustainability from the Maple Packaging team.",
};

function formatDate(dateString: string) {
  const parts = dateString.split("-");
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  return `${parseInt(parts[2])} ${months[parseInt(parts[1]) - 1]} ${parts[0]}`;
}

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();

  return (
    <div className="bg-beige py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Blog"
          title="The Maple Journal"
          subtitle="Insights on packaging, gifting, and the art of presentation"
        />

        {/* Blog grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={post.image || "/placeholder-product.png"}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <span className="absolute top-4 left-4 px-3 py-1 text-xs font-medium bg-white/90 text-text-dark rounded-full">
                  {post.category}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-text-muted mb-3">
                  <time>{formatDate(post.date)}</time>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="font-heading text-xl font-bold text-text-dark group-hover:text-primary transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm text-text-muted leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
                <span className="inline-block mt-4 text-sm font-medium text-primary">
                  Read more →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
