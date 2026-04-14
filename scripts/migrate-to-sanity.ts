/**
 * Migration script: Supabase → Sanity
 * 
 * Reads all categories, subcategories, sub-subcategories, products,
 * blog posts, and testimonials from Supabase and creates them in Sanity.
 *
 * Usage:  npx tsx scripts/migrate-to-sanity.ts
 */

import { createClient as createSanityClient } from "next-sanity";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import path from "path";

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const sanityToken = process.env.SANITY_API_TOKEN!;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing Supabase env vars");
  process.exit(1);
}
if (!sanityProjectId || !sanityToken) {
  console.error("❌ Missing Sanity env vars (NEXT_PUBLIC_SANITY_PROJECT_ID, SANITY_API_TOKEN)");
  process.exit(1);
}

const supabase = createSupabaseClient(supabaseUrl, supabaseKey);
const sanity = createSanityClient({
  projectId: sanityProjectId,
  dataset: sanityDataset,
  apiVersion: "2024-01-01",
  useCdn: false,
  token: sanityToken,
});

// ID maps: supabase ID → sanity document ID
const categoryIdMap = new Map<string, string>();
const subcategoryIdMap = new Map<string, string>();

async function migrateCategories() {
  console.log("\n📦 Migrating categories...");
  const { data: cats, error } = await supabase
    .from("categories")
    .select("id, name, slug, description, image, sort_order")
    .order("sort_order");

  if (error) { console.error("  ❌ Supabase error:", error.message); return; }
  if (!cats?.length) { console.log("  ⚠ No categories found"); return; }

  for (const cat of cats) {
    const doc = {
      _type: "category" as const,
      name: cat.name,
      slug: { _type: "slug" as const, current: cat.slug },
      description: cat.description || "",
      sortOrder: cat.sort_order ?? 0,
    };

    const result = await sanity.create(doc);
    categoryIdMap.set(cat.id, result._id);
    console.log(`  ✅ ${cat.name} → ${result._id}`);
  }
  console.log(`  📦 ${cats.length} categories migrated`);
}

async function migrateSubcategories() {
  console.log("\n📂 Migrating subcategories...");
  const { data: subs, error } = await supabase
    .from("subcategories")
    .select("id, name, slug, parent_id, sort_order")
    .order("sort_order");

  if (error) { console.error("  ❌ Supabase error:", error.message); return; }
  if (!subs?.length) { console.log("  ⚠ No subcategories found"); return; }

  for (const sub of subs) {
    const parentSanityId = categoryIdMap.get(sub.parent_id);
    if (!parentSanityId) {
      console.log(`  ⚠ Skipping ${sub.name} — parent category not found`);
      continue;
    }

    const doc = {
      _type: "subcategory" as const,
      name: sub.name,
      slug: { _type: "slug" as const, current: sub.slug },
      parent: { _type: "reference" as const, _ref: parentSanityId },
      sortOrder: sub.sort_order ?? 0,
    };

    const result = await sanity.create(doc);
    subcategoryIdMap.set(sub.id, result._id);
    console.log(`  ✅ ${sub.name} → ${result._id}`);
  }
  console.log(`  📂 ${subs.length} subcategories migrated`);
}

async function migrateSubSubcategories() {
  console.log("\n📁 Migrating sub-subcategories...");
  const { data: subSubs, error } = await supabase
    .from("sub_subcategories")
    .select("id, name, slug, parent_id, sort_order")
    .order("sort_order");

  if (error) { console.error("  ❌ Supabase error:", error.message); return; }
  if (!subSubs?.length) { console.log("  ⚠ No sub-subcategories found"); return; }

  let count = 0;
  for (const ss of subSubs) {
    const parentSanityId = subcategoryIdMap.get(ss.parent_id);
    if (!parentSanityId) {
      console.log(`  ⚠ Skipping ${ss.name} — parent subcategory not found`);
      continue;
    }

    const doc = {
      _type: "subSubcategory" as const,
      name: ss.name,
      slug: { _type: "slug" as const, current: ss.slug },
      parent: { _type: "reference" as const, _ref: parentSanityId },
      sortOrder: ss.sort_order ?? 0,
    };

    const result = await sanity.create(doc);
    console.log(`  ✅ ${ss.name} → ${result._id}`);
    count++;
  }
  console.log(`  📁 ${count} sub-subcategories migrated`);
}

async function migrateProducts() {
  console.log("\n🏷️  Migrating products...");
  const { data: products, error } = await supabase
    .from("products")
    .select("id, name, description, price, original_price, images, category_id, subcategory_id, tags, featured, bestseller");

  if (error) { console.error("  ❌ Supabase error:", error.message); return; }
  if (!products?.length) { console.log("  ⚠ No products found"); return; }

  for (const p of products) {
    const catSanityId = categoryIdMap.get(p.category_id);
    const subSanityId = p.subcategory_id ? subcategoryIdMap.get(p.subcategory_id) : undefined;

    const doc: Record<string, unknown> = {
      _type: "product",
      name: p.name,
      slug: { _type: "slug", current: p.id }, // use supabase id as slug for URL compat
      description: p.description || "",
      price: p.price,
      originalPrice: p.original_price || undefined,
      images: (p.images || []).map((url: string, i: number) => ({
        _type: "image",
        _key: `img-${i}`,
        // Store external URL as a custom field since we can't upload to Sanity CDN via API easily
        // The images are external URLs, we'll store them as-is
      })),
      // Store external image URLs as a string array for now
      externalImages: p.images || [],
      tags: p.tags || [],
      featured: p.featured ?? false,
      bestseller: p.bestseller ?? false,
    };

    if (catSanityId) {
      doc.category = { _type: "reference", _ref: catSanityId };
    }
    if (subSanityId) {
      doc.subcategory = { _type: "reference", _ref: subSanityId };
    }

    const result = await sanity.create(doc as Parameters<typeof sanity.create>[0]);
    console.log(`  ✅ ${p.name} → ${result._id}`);
  }
  console.log(`  🏷️  ${products.length} products migrated`);
}

async function migrateBlogPosts() {
  console.log("\n📝 Migrating blog posts...");
  const { data: posts, error } = await supabase
    .from("blog_posts")
    .select("id, title, slug, excerpt, content, image, category, date, read_time")
    .order("date", { ascending: false });

  if (error) { console.error("  ❌ Supabase error:", error.message); return; }
  if (!posts?.length) { console.log("  ⚠ No blog posts found"); return; }

  for (const p of posts) {
    // Convert plain text content to Portable Text blocks
    const paragraphs = (p.content || "").split("\n\n").filter(Boolean);
    const body = paragraphs.map((text: string, i: number) => ({
      _type: "block",
      _key: `block-${i}`,
      style: text.startsWith("**") && text.endsWith("**") ? "h3" : "normal",
      children: [
        {
          _type: "span",
          _key: `span-${i}`,
          text: text.replace(/\*\*/g, ""),
          marks: [],
        },
      ],
      markDefs: [],
    }));

    const doc = {
      _type: "blogPost" as const,
      title: p.title,
      slug: { _type: "slug" as const, current: p.slug },
      excerpt: p.excerpt || "",
      body,
      category: p.category || "",
      date: p.date,
      readTime: p.read_time || "",
    };

    const result = await sanity.create(doc);
    console.log(`  ✅ ${p.title} → ${result._id}`);
  }
  console.log(`  📝 ${posts.length} blog posts migrated`);
}

async function migrateTestimonials() {
  console.log("\n⭐ Migrating testimonials...");
  const { data: testimonials, error } = await supabase
    .from("testimonials")
    .select("id, name, role, content, rating, avatar");

  if (error) { console.error("  ❌ Supabase error:", error.message); return; }
  if (!testimonials?.length) { console.log("  ⚠ No testimonials found"); return; }

  for (const t of testimonials) {
    const doc = {
      _type: "testimonial" as const,
      name: t.name,
      role: t.role || "",
      content: t.content,
      rating: t.rating ?? 5,
      avatar: t.avatar || "",
    };

    const result = await sanity.create(doc);
    console.log(`  ✅ ${t.name} → ${result._id}`);
  }
  console.log(`  ⭐ ${testimonials.length} testimonials migrated`);
}

async function main() {
  console.log("🚀 Starting Supabase → Sanity migration");
  console.log(`   Sanity project: ${sanityProjectId} / ${sanityDataset}`);
  console.log(`   Supabase: ${supabaseUrl}`);

  await migrateCategories();
  await migrateSubcategories();
  await migrateSubSubcategories();
  await migrateProducts();
  await migrateBlogPosts();
  await migrateTestimonials();

  console.log("\n✅ Migration complete!");
  console.log(`   Category ID map: ${categoryIdMap.size} entries`);
  console.log(`   Subcategory ID map: ${subcategoryIdMap.size} entries`);
}

main().catch((err) => {
  console.error("💥 Migration failed:", err);
  process.exit(1);
});
