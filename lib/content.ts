"use cache";

import { cacheLife, cacheTag } from "next/cache";
import type { Category, Product, BlogPost, Testimonial } from "./types";
import {
  getCategories,
  getCategoryBySlug,
  getProducts,
  getProductById,
  getProductsByCategory,
  getFeaturedProducts,
  getProductCatalogForChat,
  getBlogPosts,
  getBlogPostBySlug,
  getTestimonials,
} from "./supabase-data";

// ═══════════════════════════════════════════════════════════════════════
// Content layer — Supabase-backed (Sanity removed).
// Singletons (hero, site settings, about, customize) are static defaults.
// ═══════════════════════════════════════════════════════════════════════

// ── HERO SLIDES ────────────────────────────────────────────────────────

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
  // Hero component supplies its own rich fallback slides.
  return [];
}

// ── CATEGORIES ─────────────────────────────────────────────────────────

export async function getSanityCategories(): Promise<Category[]> {
  return getCategories();
}

export async function getSanityCategoryBySlug(slug: string): Promise<Category | null> {
  return getCategoryBySlug(slug);
}

// ── PRODUCTS ───────────────────────────────────────────────────────────

export async function getSanityProducts(): Promise<Product[]> {
  return getProducts();
}

export async function getSanityProductById(id: string): Promise<Product | null> {
  return getProductById(id);
}

export async function getSanityProductsByCategory(categoryId: string): Promise<Product[]> {
  return getProductsByCategory(categoryId);
}

export async function getSanityFeaturedProducts(): Promise<Product[]> {
  return getFeaturedProducts();
}

export async function getSanityProductCatalogForChat(): Promise<
  { id: string; name: string; price: number; tags: string[]; description: string }[]
> {
  return getProductCatalogForChat();
}

// ── BLOG POSTS ─────────────────────────────────────────────────────────

export interface SanityBlogPost extends Omit<BlogPost, "content"> {
  body: unknown[];
  content: string;
}

export async function getSanityBlogPosts(): Promise<SanityBlogPost[]> {
  const posts = await getBlogPosts();
  return posts.map((p) => ({ ...p, body: [] as unknown[] }));
}

export async function getSanityBlogPostBySlug(slug: string): Promise<SanityBlogPost | null> {
  const post = await getBlogPostBySlug(slug);
  if (!post) return null;
  return { ...post, body: [] as unknown[] };
}

// ── TESTIMONIALS ───────────────────────────────────────────────────────

export async function getSanityTestimonials(): Promise<Testimonial[]> {
  return getTestimonials();
}

// ── SITE SETTINGS (singleton) ──────────────────────────────────────────

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

// ── ABOUT PAGE (singleton) ─────────────────────────────────────────────

export interface AboutPageData {
  heroImage: string;
  heroTitle: string;
  heroSubtitle: string;
  whatWeDoTitle: string;
  whatWeDoBody: unknown[];
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

// ── CUSTOMIZE PAGE (singleton) ─────────────────────────────────────────

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
