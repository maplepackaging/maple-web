import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { getBlogPosts, getBlogPostBySlug } from "@/lib/supabase-data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const blogPosts = await getBlogPosts();
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Not Found" };
  return {
    title: `${post.title} — Maple Packaging Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="bg-beige">
      {/* Hero image */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <Image
          src={post.image || "/placeholder-product.png"}
          alt={post.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
      </div>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10 pb-20">
        {/* Card */}
        <div className="bg-surface rounded-xl shadow-lg p-8 md:p-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-text-muted mb-6">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight size={12} />
            <Link href="/blog" className="hover:text-primary transition-colors">
              Blog
            </Link>
            <ChevronRight size={12} />
            <span className="text-text-dark truncate">{post.title}</span>
          </nav>

          {/* Meta */}
          <div className="flex items-center gap-3 text-sm text-text-muted mb-4">
            <span className="px-3 py-1 bg-primary-light text-primary rounded-full text-xs font-medium">
              {post.category}
            </span>
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

          {/* Title */}
          <h1 className="font-heading text-3xl md:text-4xl font-semibold text-text-dark leading-tight">
            {post.title}
          </h1>

          {/* Content */}
          <div className="mt-8 prose-maple">
            {post.content.split("\n\n").map((paragraph, i) => {
              if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                const text = paragraph.replace(/\*\*/g, "");
                return (
                  <h3
                    key={i}
                    className="font-heading text-xl font-semibold text-text-dark mt-8 mb-3"
                  >
                    {text}
                  </h3>
                );
              }
              if (paragraph.startsWith("- ")) {
                const items = paragraph.split("\n").filter((l) => l.startsWith("- "));
                return (
                  <ul key={i} className="space-y-2 my-4">
                    {items.map((item, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-3 text-text-muted leading-relaxed"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        <span>{item.replace("- ", "")}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
              // Check for bold subheadings within paragraphs
              if (paragraph.includes("**")) {
                const parts = paragraph.split(/(\*\*[^*]+\*\*)/);
                return (
                  <p key={i} className="text-text-muted leading-relaxed mb-4">
                    {parts.map((part, j) => {
                      if (part.startsWith("**") && part.endsWith("**")) {
                        return (
                          <strong key={j} className="font-semibold text-text-dark block mt-6 mb-2 font-heading text-lg">
                            {part.replace(/\*\*/g, "")}
                          </strong>
                        );
                      }
                      return <span key={j}>{part}</span>;
                    })}
                  </p>
                );
              }
              return (
                <p key={i} className="text-text-muted leading-relaxed mb-4">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Back link */}
          <div className="mt-12 pt-8 border-t border-border">
            <Link
              href="/blog"
              className="text-sm font-medium text-primary hover:underline"
            >
              ← Back to all articles
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
