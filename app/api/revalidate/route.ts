import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    const { tag, secret } = await request.json();

    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const validTags = ["categories", "products", "blog", "testimonials"];
    if (!validTags.includes(tag)) {
      return NextResponse.json(
        { error: `Invalid tag. Use: ${validTags.join(", ")}` },
        { status: 400 }
      );
    }

    revalidateTag(tag, "max");
    return NextResponse.json({ revalidated: true, tag, now: Date.now() });
  } catch {
    return NextResponse.json(
      { error: "Failed to revalidate" },
      { status: 500 }
    );
  }
}
