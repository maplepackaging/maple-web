import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

const SECRET = process.env.REVALIDATION_SECRET;

// Map Supabase table names to cache tags (kept for backward compat)
const SUPABASE_TAG_MAP: Record<string, string[]> = {
  categories: ["categories"],
  subcategories: ["categories"],
  sub_subcategories: ["categories"],
  products: ["products", "categories"],
  blog_posts: ["blog"],
  testimonials: ["testimonials"],
};

export async function POST(request: NextRequest) {
  try {
    // Verify secret
    const secret = request.nextUrl.searchParams.get("secret");
    if (!SECRET || secret !== SECRET) {
      return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
    }

    const body = await request.json();

    // Supabase webhook sends `table` in the payload
    const table = body?.table as string | undefined;
    if (table && SUPABASE_TAG_MAP[table]) {
      const tags = SUPABASE_TAG_MAP[table];
      for (const tag of tags) {
        revalidateTag(tag, "max");
      }
      return NextResponse.json({
        revalidated: true,
        source: "supabase",
        tags,
        table,
        timestamp: new Date().toISOString(),
      });
    }

    // If no specific type/table, revalidate everything
    const allTags = [
      "categories",
      "products",
      "blog",
      "testimonials",
      "heroSlides",
      "siteSettings",
      "aboutPage",
      "customizePage",
    ];
    for (const tag of allTags) {
      revalidateTag(tag, "max");
    }

    return NextResponse.json({
      revalidated: true,
      tags: allTags,
      timestamp: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to revalidate" },
      { status: 500 },
    );
  }
}
