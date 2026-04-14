"use cache";

import { cacheLife, cacheTag } from "next/cache";
import { sanityClient, urlFor } from "./sanity";
import type { Category, SubCategory, SubSubCategory, Product, BlogPost, Testimonial } from "./types";
import {
  getCategories as getSupabaseCategories,
  getCategoryBySlug as getSupabaseCategoryBySlug,
  getProducts as getSupabaseProducts,
  getProductById as getSupabaseProductById,
  getProductsByCategory as getSupabaseProductsByCategory,
  getFeaturedProducts as getSupabaseFeaturedProducts,
  getProductCatalogForChat as getSupabaseProductCatalogForChat,
  getBlogPosts as getSupabaseBlogPosts,
  getBlogPostBySlug as getSupabaseBlogPostBySlug,
  getTestimonials as getSupabaseTestimonials,
} from "./supabase-data";

// ═══════════════════════════════════════════════════════════════════════
// HERO SLIDES
// ═══════════════════════════════════════════════════════════════════════

export interface HeroSlide {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cta: { text: string; href: string };
}

export async function getHeroSlides(): Promise<HeroSlide[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("heroSlides");

  const data = await sanityClient.fetch(
    `*[_type == "heroSlide"] | order(sortOrder asc) {
      title,
      subtitle,
      description,
      image,
      ctaText,
      ctaHref
    }`
  );

  return (data ?? []).map((s: Record<string, unknown>) => ({
    title: (s.title as string) ?? "",
    subtitle: (s.subtitle as string) ?? "",
    description: (s.description as string) ?? "",
    image: s.image ? urlFor(s.image as Record<string, unknown>).width(1200).quality(85).auto("format").url() : "",
    cta: {
      text: (s.ctaText as string) ?? "Explore",
      href: (s.ctaHref as string) ?? "/categories",
    },
  }));
}

// ═══════════════════════════════════════════════════════════════════════
// CATEGORIES — with nested subcategories + sub-subcategories
// ═══════════════════════════════════════════════════════════════════════

export async function getSanityCategories(): Promise<Category[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("categories");

  const data = await sanityClient.fetch(
    `*[_type == "category"] | order(sortOrder asc) {
      "id": _id,
      name,
      "slug": slug.current,
      description,
      image,
      "subcategories": *[_type == "subcategory" && parent._ref == ^._id] | order(sortOrder asc) {
        "id": _id,
        name,
        "slug": slug.current,
        "parentId": parent._ref,
        "items": *[_type == "subSubcategory" && parent._ref == ^._id] | order(sortOrder asc) {
          "id": _id,
          name,
          "slug": slug.current,
          "parentId": parent._ref
        }
      }
    }`
  );

  const result = (data ?? []).map((c: Record<string, unknown>) => ({
    id: c.id as string,
    name: c.name as string,
    slug: (c.slug as string) ?? "",
    description: (c.description as string) ?? "",
    image: c.image ? urlFor(c.image as Record<string, unknown>).width(600).quality(80).auto("format").url() : "",
    subcategories: ((c.subcategories as Record<string, unknown>[]) ?? []).map((s) => ({
      id: s.id as string,
      name: s.name as string,
      slug: (s.slug as string) ?? "",
      parentId: (s.parentId as string) ?? "",
      items: ((s.items as Record<string, unknown>[]) ?? []).map((ss) => ({
        id: ss.id as string,
        name: ss.name as string,
        slug: (ss.slug as string) ?? "",
        parentId: (ss.parentId as string) ?? "",
      })),
    })),
  }));

  // Fall back to Supabase if Sanity has no categories yet
  if (result.length === 0) return getSupabaseCategories();
  return result;
}

export async function getSanityCategoryBySlug(slug: string): Promise<Category | null> {
  "use cache";
  cacheLife("hours");
  cacheTag("categories");

  const categories = await getSanityCategories();
  const found = categories.find((c) => c.slug === slug) ?? null;
  // Fall back to Supabase if not found in Sanity
  if (!found) return getSupabaseCategoryBySlug(slug);
  return found;
}

// ═══════════════════════════════════════════════════════════════════════
// PRODUCTS
// ═══════════════════════════════════════════════════════════════════════

const PRODUCT_PROJECTION = `{
  "id": _id,
  name,
  "slug": slug.current,
  description,
  price,
  originalPrice,
  images,
  externalImages,
  "categoryId": category._ref,
  "subcategoryId": subcategory._ref,
  tags,
  featured,
  bestseller
}`;

function mapSanityProduct(p: Record<string, unknown>): Product {
  const sanityImages = (p.images as Record<string, unknown>[]) ?? [];
  const externalImages = (p.externalImages as string[]) ?? [];
  // Use Sanity CDN images if available, otherwise fall back to external URLs
  const resolvedImages = sanityImages.length > 0
    ? sanityImages.map((img) => urlFor(img).width(800).quality(80).auto("format").url())
    : externalImages;
  return {
    id: p.id as string,
    name: p.name as string,
    description: (p.description as string) ?? "",
    price: (p.price as number) ?? 0,
    originalPrice: (p.originalPrice as number) ?? undefined,
    images: resolvedImages,
    categoryId: (p.categoryId as string) ?? "",
    subcategoryId: (p.subcategoryId as string) ?? "",
    tags: (p.tags as string[]) ?? [],
    featured: (p.featured as boolean) ?? false,
    bestseller: (p.bestseller as boolean) ?? false,
  };
}

export async function getSanityProducts(): Promise<Product[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("products");

  const data = await sanityClient.fetch(`*[_type == "product"] ${PRODUCT_PROJECTION}`);
  const result = (data ?? []).map(mapSanityProduct);
  if (result.length === 0) return getSupabaseProducts();
  return result;
}

export async function getSanityProductById(id: string): Promise<Product | null> {
  "use cache";
  cacheLife("hours");
  cacheTag("products");

  const data = await sanityClient.fetch(
    `*[_type == "product" && _id == $id][0] ${PRODUCT_PROJECTION}`,
    { id }
  );
  if (data) return mapSanityProduct(data);
  // Fall back to Supabase
  return getSupabaseProductById(id);
}

export async function getSanityProductsByCategory(categoryId: string): Promise<Product[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("products");

  const data = await sanityClient.fetch(
    `*[_type == "product" && category._ref == $categoryId] ${PRODUCT_PROJECTION}`,
    { categoryId }
  );
  const result = (data ?? []).map(mapSanityProduct);
  if (result.length === 0) return getSupabaseProductsByCategory(categoryId);
  return result;
}

export async function getSanityFeaturedProducts(): Promise<Product[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("products");

  const data = await sanityClient.fetch(
    `*[_type == "product" && featured == true][0...4] ${PRODUCT_PROJECTION}`
  );
  const result = (data ?? []).map(mapSanityProduct);
  if (result.length === 0) return getSupabaseFeaturedProducts();
  return result;
}

export async function getSanityProductCatalogForChat(): Promise<
  { id: string; name: string; price: number; tags: string[]; description: string }[]
> {
  "use cache";
  cacheLife("hours");
  cacheTag("products");

  const data = await sanityClient.fetch(
    `*[_type == "product"] { "id": _id, name, price, tags, description }`
  );
  const result = (data ?? []).map((p: Record<string, unknown>) => ({
    id: p.id as string,
    name: p.name as string,
    price: (p.price as number) ?? 0,
    tags: (p.tags as string[]) ?? [],
    description: (p.description as string) ?? "",
  }));
  if (result.length === 0) return getSupabaseProductCatalogForChat();
  return result;
}

// ═══════════════════════════════════════════════════════════════════════
// BLOG POSTS
// ═══════════════════════════════════════════════════════════════════════

export interface SanityBlogPost extends Omit<BlogPost, "content"> {
  // body is Portable Text (array of blocks), kept raw for rendering
  body: unknown[];
  // Fallback plain content for backward compat
  content: string;
}

export async function getSanityBlogPosts(): Promise<SanityBlogPost[]> {
  "use cache";
  cacheLife("days");
  cacheTag("blog");

  const data = await sanityClient.fetch(
    `*[_type == "blogPost"] | order(date desc) {
      "id": _id,
      title,
      "slug": slug.current,
      excerpt,
      body,
      "coverImage": coverImage,
      category,
      date,
      readTime
    }`
  );

  const result = (data ?? []).map((p: Record<string, unknown>) => ({
    id: p.id as string,
    title: p.title as string,
    slug: (p.slug as string) ?? "",
    excerpt: (p.excerpt as string) ?? "",
    body: (p.body as unknown[]) ?? [],
    content: "", // Portable Text is in body
    image: p.coverImage
      ? urlFor(p.coverImage as Record<string, unknown>).width(1200).quality(85).auto("format").url()
      : "",
    category: (p.category as string) ?? "",
    date: (p.date as string) ?? "",
    readTime: (p.readTime as string) ?? "",
  }));

  // Fall back to Supabase if Sanity has no blog posts yet
  if (result.length === 0) {
    const sbPosts = await getSupabaseBlogPosts();
    return sbPosts.map((p) => ({ ...p, body: [] as unknown[] }));
  }
  return result;
}

export async function getSanityBlogPostBySlug(slug: string): Promise<SanityBlogPost | null> {
  "use cache";
  cacheLife("days");
  cacheTag("blog");

  const data = await sanityClient.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0] {
      "id": _id,
      title,
      "slug": slug.current,
      excerpt,
      body,
      "coverImage": coverImage,
      category,
      date,
      readTime
    }`,
    { slug }
  );

  if (!data) {
    // Fall back to Supabase
    const sbPost = await getSupabaseBlogPostBySlug(slug);
    if (!sbPost) return null;
    return { ...sbPost, body: [] as unknown[] };
  }

  return {
    id: data.id as string,
    title: data.title as string,
    slug: (data.slug as string) ?? "",
    excerpt: (data.excerpt as string) ?? "",
    body: (data.body as unknown[]) ?? [],
    content: "",
    image: data.coverImage
      ? urlFor(data.coverImage as Record<string, unknown>).width(1200).quality(85).auto("format").url()
      : "",
    category: (data.category as string) ?? "",
    date: (data.date as string) ?? "",
    readTime: (data.readTime as string) ?? "",
  };
}

// ═══════════════════════════════════════════════════════════════════════
// TESTIMONIALS
// ═══════════════════════════════════════════════════════════════════════

export async function getSanityTestimonials(): Promise<Testimonial[]> {
  "use cache";
  cacheLife("weeks");
  cacheTag("testimonials");

  const data = await sanityClient.fetch(
    `*[_type == "testimonial"] {
      "id": _id,
      name,
      role,
      content,
      rating,
      avatar
    }`
  );

  const result = (data ?? []).map((t: Record<string, unknown>) => ({
    id: t.id as string,
    name: t.name as string,
    role: (t.role as string) ?? "",
    content: t.content as string,
    rating: (t.rating as number) ?? 5,
    avatar: (t.avatar as string) ?? "",
  }));

  // Fall back to Supabase if Sanity has no testimonials yet
  if (result.length === 0) return getSupabaseTestimonials();
  return result;
}

// ═══════════════════════════════════════════════════════════════════════
// SITE SETTINGS (singleton)
// ═══════════════════════════════════════════════════════════════════════

export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  announcements: string[];
  navLinks: { label: string; href: string }[];
  email: string;
  phone: string;
  address: string;
  hours: string;
  whatsappNumber: string;
  instagramUrl: string;
  instagramHandle: string;
  instagramFeedUrl: string;
  facebookUrl: string;
  pinterestUrl: string;
  footerShopLinks: { label: string; href: string }[];
  footerCompanyLinks: { label: string; href: string }[];
  footerSupportLinks: { label: string; href: string }[];
  footerTagline: string;
  whyUsHeading: string;
  whyUsBody: string;
  whyUsStats: { value: number; suffix: string; label: string }[];
  ctaHeading: string;
  ctaBody: string;
  ctaStats: { value: string; label: string }[];
  newsletterHeading: string;
  newsletterBody: string;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  "use cache";
  cacheLife("hours");
  cacheTag("siteSettings");

  const data = await sanityClient.fetch(
    `*[_type == "siteSettings" && _id == "siteSettings"][0]`
  );

  if (!data) {
    // Return sensible defaults if not yet configured in Sanity
    return {
      siteName: "Maple Packaging",
      siteDescription: "Premium Packaging & Gifting Solutions",
      announcements: [],
      navLinks: [],
      email: "",
      phone: "",
      address: "",
      hours: "",
      whatsappNumber: "",
      instagramUrl: "",
      instagramHandle: "",
      instagramFeedUrl: "",
      facebookUrl: "",
      pinterestUrl: "",
      footerShopLinks: [],
      footerCompanyLinks: [],
      footerSupportLinks: [],
      footerTagline: "",
      whyUsHeading: "",
      whyUsBody: "",
      whyUsStats: [],
      ctaHeading: "",
      ctaBody: "",
      ctaStats: [],
      newsletterHeading: "",
      newsletterBody: "",
    };
  }

  return {
    siteName: data.siteName ?? "Maple Packaging",
    siteDescription: data.siteDescription ?? "",
    announcements: data.announcements ?? [],
    navLinks: data.navLinks ?? [],
    email: data.email ?? "",
    phone: data.phone ?? "",
    address: data.address ?? "",
    hours: data.hours ?? "",
    whatsappNumber: data.whatsappNumber ?? "",
    instagramUrl: data.instagramUrl ?? "",
    instagramHandle: data.instagramHandle ?? "",
    instagramFeedUrl: data.instagramFeedUrl ?? "",
    facebookUrl: data.facebookUrl ?? "",
    pinterestUrl: data.pinterestUrl ?? "",
    footerShopLinks: data.footerShopLinks ?? [],
    footerCompanyLinks: data.footerCompanyLinks ?? [],
    footerSupportLinks: data.footerSupportLinks ?? [],
    footerTagline: data.footerTagline ?? "",
    whyUsHeading: data.whyUsHeading ?? "",
    whyUsBody: data.whyUsBody ?? "",
    whyUsStats: data.whyUsStats ?? [],
    ctaHeading: data.ctaHeading ?? "",
    ctaBody: data.ctaBody ?? "",
    ctaStats: data.ctaStats ?? [],
    newsletterHeading: data.newsletterHeading ?? "",
    newsletterBody: data.newsletterBody ?? "",
  };
}

// ═══════════════════════════════════════════════════════════════════════
// ABOUT PAGE (singleton)
// ═══════════════════════════════════════════════════════════════════════

export interface AboutPageData {
  heroImage: string;
  heroTitle: string;
  heroSubtitle: string;
  whatWeDoTitle: string;
  whatWeDoBody: unknown[]; // Portable Text
  whatWeDoImage: string;
  values: { title: string; description: string }[];
  processSteps: { step: string; title: string; description: string }[];
  ctaHeading: string;
  ctaBody: string;
}

export async function getAboutPage(): Promise<AboutPageData> {
  "use cache";
  cacheLife("hours");
  cacheTag("aboutPage");

  const data = await sanityClient.fetch(
    `*[_type == "aboutPage" && _id == "aboutPage"][0] {
      heroImage,
      heroTitle,
      heroSubtitle,
      whatWeDoTitle,
      whatWeDoBody,
      whatWeDoImage,
      values,
      processSteps,
      ctaHeading,
      ctaBody
    }`
  );

  if (!data) {
    return {
      heroImage: "",
      heroTitle: "Our Story",
      heroSubtitle: "",
      whatWeDoTitle: "",
      whatWeDoBody: [],
      whatWeDoImage: "",
      values: [],
      processSteps: [],
      ctaHeading: "",
      ctaBody: "",
    };
  }

  return {
    heroImage: data.heroImage ? urlFor(data.heroImage).width(1600).quality(85).auto("format").url() : "",
    heroTitle: data.heroTitle ?? "Our Story",
    heroSubtitle: data.heroSubtitle ?? "",
    whatWeDoTitle: data.whatWeDoTitle ?? "",
    whatWeDoBody: data.whatWeDoBody ?? [],
    whatWeDoImage: data.whatWeDoImage ? urlFor(data.whatWeDoImage).width(800).quality(80).auto("format").url() : "",
    values: data.values ?? [],
    processSteps: data.processSteps ?? [],
    ctaHeading: data.ctaHeading ?? "",
    ctaBody: data.ctaBody ?? "",
  };
}

// ═══════════════════════════════════════════════════════════════════════
// CUSTOMIZE PAGE (singleton)
// ═══════════════════════════════════════════════════════════════════════

export interface CustomizePageData {
  heroLabel: string;
  heroTitle: string;
  heroBody: string;
  steps: { title: string; description: string; icon: string }[];
  customizableProducts: string[];
  customizableTitle: string;
  customizableBody: string;
}

export async function getCustomizePage(): Promise<CustomizePageData> {
  "use cache";
  cacheLife("hours");
  cacheTag("customizePage");

  const data = await sanityClient.fetch(
    `*[_type == "customizePage" && _id == "customizePage"][0]`
  );

  if (!data) {
    return {
      heroLabel: "Bespoke Packaging",
      heroTitle: "",
      heroBody: "",
      steps: [],
      customizableProducts: [],
      customizableTitle: "",
      customizableBody: "",
    };
  }

  return {
    heroLabel: data.heroLabel ?? "Bespoke Packaging",
    heroTitle: data.heroTitle ?? "",
    heroBody: data.heroBody ?? "",
    steps: data.steps ?? [],
    customizableProducts: data.customizableProducts ?? [],
    customizableTitle: data.customizableTitle ?? "",
    customizableBody: data.customizableBody ?? "",
  };
}
