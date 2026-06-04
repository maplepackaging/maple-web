import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { PortableText, type PortableTextBlock } from "@portabletext/react";
import { getSanityBlogPosts, getSanityBlogPostBySlug } from "@/lib/content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const blogPosts = await getSanityBlogPosts();
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getSanityBlogPostBySlug(slug);
  if (!post) return { title: "Not Found" };
  return {
    title: `${post.title} — Maple Packaging Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getSanityBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="bg-cream">
      {/* Hero image */}
      <div className="relative h-64 md:h-[26rem] overflow-hidden">
        <Image
          src={post.image || "/placeholder-product.png"}
          alt={post.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
      </div>

      <article className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 -mt-20 relative z-10 pb-20">
        <div className="card-soft p-7 md:p-12">
          <nav className="flex items-center gap-2 text-xs text-ink-soft mb-6">
            <Link href="/" className="hover:text-terracotta transition-colors">Home</Link>
            <ChevronRight size={12} className="text-line" />
            <Link href="/blog" className="hover:text-terracotta transition-colors">Blog</Link>
            <ChevronRight size={12} className="text-line" />
            <span className="text-ink truncate">{post.title}</span>
          </nav>

          <div className="flex items-center gap-3 text-sm text-ink-soft mb-5">
            <span className="inline-flex items-center rounded-full bg-terracotta-soft text-terracotta px-3 py-1 text-xs font-semibold">
              {post.category}
            </span>
            <time>
              {new Date(post.date).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
            </time>
            <span className="w-1 h-1 rounded-full bg-line" />
            <span>{post.readTime}</span>
          </div>

          <h1 className="font-heading text-3xl md:text-5xl text-ink leading-[1.08]">{post.title}</h1>

          <div className="mt-8 text-ink-soft leading-relaxed space-y-4">
            {post.body?.length ? (
              <PortableText value={post.body as PortableTextBlock[]} />
            ) : post.content ? (
              post.content.split("\n\n").map((paragraph: string, i: number) => (
                <p key={i}>{paragraph}</p>
              ))
            ) : (
              <p>{post.excerpt}</p>
            )}
          </div>

          <div className="mt-12 pt-8 border-t border-line">
            <Link href="/blog" className="btn btn-pill-light btn-md">
              <ArrowLeft size={16} />
              Back to all articles
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
