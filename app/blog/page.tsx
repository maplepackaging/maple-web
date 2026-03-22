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

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();
  const allCategories = [...new Set(blogPosts.map((p) => p.category))];

  return (
    <div className="bg-beige py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="The Maple Journal"
          subtitle="Insights on packaging, gifting, and the art of presentation"
        />

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <span className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-full">
            All
          </span>
          {allCategories.map((cat) => (
            <span
              key={cat}
              className="px-4 py-2 text-sm font-medium bg-surface text-text-muted border border-border rounded-full hover:border-primary hover:text-primary cursor-pointer transition-colors"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Blog grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group bg-surface rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={post.image}
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
                  <time>
                    {new Date(post.date).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="font-heading text-xl font-semibold text-text-dark group-hover:text-primary transition-colors leading-snug">
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
