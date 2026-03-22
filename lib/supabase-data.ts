"use cache";

import { cacheLife, cacheTag } from "next/cache";
import { supabase } from "./supabase";
import type { Category, SubCategory, SubSubCategory, Product, BlogPost, Testimonial } from "./types";

// ═══════════════════════════════════════════════════════════════════════
// CATEGORIES — cached for hours (rarely changes, 3 joined tables)
// Single fetch for all 3 tables, assembled server-side, cached as one unit.
// ═══════════════════════════════════════════════════════════════════════

export async function getCategories(): Promise<Category[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("categories");

  const [catRes, subRes, subSubRes] = await Promise.all([
    supabase
      .from("categories")
      .select("id, name, slug, description, image")
      .order("sort_order"),
    supabase
      .from("subcategories")
      .select("id, name, slug, parent_id")
      .order("sort_order"),
    supabase
      .from("sub_subcategories")
      .select("id, name, slug, parent_id")
      .order("sort_order"),
  ]);

  const cats = catRes.data ?? [];
  const subs = subRes.data ?? [];
  const subSubs = subSubRes.data ?? [];

  // Build lookup maps to avoid O(n²) filtering
  const subSubsBySub = new Map<string, SubSubCategory[]>();
  for (const ss of subSubs) {
    const arr = subSubsBySub.get(ss.parent_id) ?? [];
    arr.push({ id: ss.id, name: ss.name, slug: ss.slug, parentId: ss.parent_id });
    subSubsBySub.set(ss.parent_id, arr);
  }

  const subsByCat = new Map<string, SubCategory[]>();
  for (const s of subs) {
    const arr = subsByCat.get(s.parent_id) ?? [];
    arr.push({
      id: s.id,
      name: s.name,
      slug: s.slug,
      parentId: s.parent_id,
      items: subSubsBySub.get(s.id) ?? [],
    });
    subsByCat.set(s.parent_id, arr);
  }

  return cats.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    description: c.description ?? "",
    image: c.image ?? "",
    subcategories: subsByCat.get(c.id) ?? [],
  }));
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  "use cache";
  cacheLife("hours");
  cacheTag("categories");

  // Reuse the cached getCategories — Next.js deduplicates within the same cache scope
  const categories = await getCategories();
  return categories.find((c) => c.slug === slug) ?? null;
}

// ═══════════════════════════════════════════════════════════════════════
// PRODUCTS — cached for hours, select only needed columns
// ═══════════════════════════════════════════════════════════════════════

const PRODUCT_COLUMNS = "id, name, description, price, original_price, images, category_id, subcategory_id, tags, featured, bestseller";

export async function getProducts(): Promise<Product[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("products");

  const { data } = await supabase
    .from("products")
    .select(PRODUCT_COLUMNS);
  return (data ?? []).map(mapProduct);
}

export async function getProductById(id: string): Promise<Product | null> {
  "use cache";
  cacheLife("hours");
  cacheTag("products");

  const { data } = await supabase
    .from("products")
    .select(PRODUCT_COLUMNS)
    .eq("id", id)
    .single();
  return data ? mapProduct(data) : null;
}

export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("products");

  const { data } = await supabase
    .from("products")
    .select(PRODUCT_COLUMNS)
    .eq("category_id", categoryId);
  return (data ?? []).map(mapProduct);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("products");

  const { data } = await supabase
    .from("products")
    .select(PRODUCT_COLUMNS)
    .eq("featured", true)
    .limit(4);
  return (data ?? []).map(mapProduct);
}

function mapProduct(p: Record<string, unknown>): Product {
  return {
    id: p.id as string,
    name: p.name as string,
    description: (p.description as string) ?? "",
    price: p.price as number,
    originalPrice: (p.original_price as number) ?? undefined,
    images: (p.images as string[]) ?? [],
    categoryId: p.category_id as string,
    subcategoryId: (p.subcategory_id as string) ?? "",
    tags: (p.tags as string[]) ?? [],
    featured: (p.featured as boolean) ?? false,
    bestseller: (p.bestseller as boolean) ?? false,
  };
}

// ═══════════════════════════════════════════════════════════════════════
// BLOG POSTS — cached for days (content changes infrequently)
// ═══════════════════════════════════════════════════════════════════════

const BLOG_COLUMNS = "id, title, slug, excerpt, content, image, category, date, read_time";

export async function getBlogPosts(): Promise<BlogPost[]> {
  "use cache";
  cacheLife("days");
  cacheTag("blog");

  const { data } = await supabase
    .from("blog_posts")
    .select(BLOG_COLUMNS)
    .order("date", { ascending: false });
  return (data ?? []).map(mapBlogPost);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  "use cache";
  cacheLife("days");
  cacheTag("blog");

  const { data } = await supabase
    .from("blog_posts")
    .select(BLOG_COLUMNS)
    .eq("slug", slug)
    .single();
  return data ? mapBlogPost(data) : null;
}

function mapBlogPost(p: Record<string, unknown>): BlogPost {
  return {
    id: p.id as string,
    title: p.title as string,
    slug: p.slug as string,
    excerpt: (p.excerpt as string) ?? "",
    content: (p.content as string) ?? "",
    image: (p.image as string) ?? "",
    category: (p.category as string) ?? "",
    date: p.date as string,
    readTime: (p.read_time as string) ?? "",
  };
}

// ═══════════════════════════════════════════════════════════════════════
// TESTIMONIALS — cached for weeks (almost never changes)
// ═══════════════════════════════════════════════════════════════════════

export async function getTestimonials(): Promise<Testimonial[]> {
  "use cache";
  cacheLife("weeks");
  cacheTag("testimonials");

  const { data } = await supabase
    .from("testimonials")
    .select("id, name, role, content, rating, avatar");
  return (data ?? []).map((t) => ({
    id: t.id as string,
    name: t.name as string,
    role: (t.role as string) ?? "",
    content: t.content as string,
    rating: (t.rating as number) ?? 5,
    avatar: (t.avatar as string) ?? "",
  }));
}

// ═══════════════════════════════════════════════════════════════════════
// CHAT PRODUCT CATALOG — lightweight projection for AI prompt
// Only fetches the columns needed for the system prompt, cached for hours.
// ═══════════════════════════════════════════════════════════════════════

export async function getProductCatalogForChat(): Promise<
  { id: string; name: string; price: number; tags: string[]; description: string }[]
> {
  "use cache";
  cacheLife("hours");
  cacheTag("products");

  const { data } = await supabase
    .from("products")
    .select("id, name, price, tags, description");
  return (data ?? []).map((p) => ({
    id: p.id as string,
    name: p.name as string,
    price: p.price as number,
    tags: (p.tags as string[]) ?? [],
    description: (p.description as string) ?? "",
  }));
}
