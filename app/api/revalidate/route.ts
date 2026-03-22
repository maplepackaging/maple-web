import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get("secret");
    const tag = searchParams.get("tag");

    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!tag) {
       return NextResponse.json({ error: "Missing tag parameter" }, { status: 400 });
    }

    if (tag === "all") {
      const validTags = ["categories", "products", "blog", "testimonials"];
      validTags.forEach(t => revalidateTag(t, "max"));
      return NextResponse.json({ revalidated: true, tags: validTags, now: Date.now() });
    }

    const validTags = ["categories", "products", "blog", "testimonials"];
    if (!validTags.includes(tag)) {
      return NextResponse.json(
        { error: `Invalid tag. Use: all, ${validTags.join(", ")}` },
        { status: 400 }
      );
    }

    revalidateTag(tag, "max");
    return NextResponse.json({ revalidated: true, tag, now: Date.now() });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to revalidate" },
      { status: 500 }
    );
  }
}
