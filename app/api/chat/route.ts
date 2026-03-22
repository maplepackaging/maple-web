import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { getProductCatalogForChat, getProducts } from "@/lib/supabase-data";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const SYSTEM_TEMPLATE = `You are a helpful gift and packaging consultant for Maple Packaging, a premium Indian packaging and gifting company.

You have access to the following product catalog:
%%CATALOG%%

IMPORTANT RULES:
1. When recommending a product, embed the product ID tag anywhere in your response using this EXACT format: #PRODUCT_ID* (e.g. #P004*). You can recommend multiple products by including multiple tags.

2. The tag MUST start with # and end with * — this is how the system detects product recommendations.

3. If no product matches the query, respond normally without any product tag.

4. Be warm, helpful, and knowledgeable about packaging, gifting, weddings, and corporate events.

5. Keep responses concise — 2-3 sentences max per recommendation.

6. If the user asks about customization, let them know Maple Packaging offers fully custom solutions and they should visit the Customize page.

Example response when recommending a product:
For Diwali corporate gifts, I'd highly recommend our #P004* — the Luxe Hamper Box in Midnight. It features a magnetic closure and satin lining that will impress your clients.

Example response with multiple recommendations:
Great choices for a wedding! Check out our #P001* for a luxurious invite box, or go with #P002* for a minimal contemporary feel.

Example response for general query:
We'd love to help you find the perfect packaging! Could you tell me more about the occasion and your budget range?`;

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Lightweight catalog for prompt (cached, only 5 columns)
    const catalog = await getProductCatalogForChat();

    const catalogText = catalog
      .map(
        (p) =>
          `ID: ${p.id} | Name: ${p.name} | Price: ₹${p.price} | Tags: ${p.tags.join(", ")} | Description: ${p.description}`
      )
      .join("\n");

    const messages = [
      { role: "system" as const, content: SYSTEM_TEMPLATE.replace("%%CATALOG%%", catalogText) },
      ...(history || []).slice(-10).map((msg: { role: string; content: string }) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      })),
      { role: "user" as const, content: message },
    ];

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages,
      temperature: 0.7,
      max_tokens: 500,
    });

    const reply = completion.choices[0]?.message?.content || "Sorry, I couldn't process that. Please try again.";

    // Extract product IDs using regex: #P001*, #P002*, etc.
    const productIdRegex = /#(P\d{3})\*/g;
    const matches = [...reply.matchAll(productIdRegex)];

    // Only fetch full product objects if AI actually recommended products
    let matchedProducts: Awaited<ReturnType<typeof getProducts>> = [];
    if (matches.length > 0) {
      const matchedIds = new Set(matches.map((m) => m[1]));
      const allProducts = await getProducts();
      matchedProducts = allProducts.filter((p) => matchedIds.has(p.id));
    }

    // Strip the tags from the visible reply
    const cleanReply = reply.replace(productIdRegex, "").replace(/\s{2,}/g, " ").trim();

    return NextResponse.json({
      reply: cleanReply,
      productId: matchedProducts[0]?.id ?? null,
      product: matchedProducts[0] ?? null,
      products: matchedProducts,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
