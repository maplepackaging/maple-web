import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { getSanityProductCatalogForChat, getSanityProducts } from "@/lib/sanity-data";
import { supabase } from "@/lib/supabase";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});


const SYSTEM_TEMPLATE = `You are a helpful gift and packaging consultant for Maple Packaging, a premium Indian packaging and gifting company.

You have access to the following product catalog:
%%CATALOG%%

IMPORTANT RULES:

RULE 1 - PRODUCT TAGS (CRITICAL - READ CAREFULLY):
When recommending a product, you MUST embed the product ID tag in your response using this EXACT format:
  #PRODUCT_ID*
  Example: #A9XGrwkGGCiReURNTDlkM6*

The format MUST:
- Start with a hash symbol: #
- Followed immediately by the full product ID exactly as shown in the catalog
- End immediately with an asterisk: *
- No spaces, no dots, no brackets, nothing else between # and *

You can recommend multiple products: #id1* #id2*
The system uses this exact pattern to detect and display products. If the format is wrong, no product card will appear.

RULE 2: If no product from the catalog matches, respond normally with no product tag.

RULE 3: Keep responses SHORT - 1-2 sentences maximum. No long paragraphs.

RULE 4: NEVER use em-dashes (—). Use commas or plain dashes (-) instead.

RULE 5: If asked about customization, say Maple Packaging offers full custom solutions and direct them to the Customize page.

Example responses:
- "For weddings, I'd suggest this luxurious invite box or this minimal look." (with product ID tags embedded)
- "Could you share the occasion and your budget so I can find the best fit?"`;


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
    const catalog = await getSanityProductCatalogForChat();

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

    // Extract product IDs using regex: #<id>* format (supports UUIDs and Sanity IDs)
    const productIdRegex = /#([a-zA-Z0-9_-]{8,})\*/g;
    const matches = [...reply.matchAll(productIdRegex)];

    // Only fetch full product objects if AI actually recommended products
    let matchedProducts: Awaited<ReturnType<typeof getSanityProducts>> = [];
    if (matches.length > 0) {
      const matchedIds = new Set(matches.map((m) => m[1]));
      const allProducts = await getSanityProducts();
      matchedProducts = allProducts.filter((p) => matchedIds.has(p.id));
    }

    // Strip the tags from the visible reply
    const cleanReply = reply.replace(productIdRegex, "").replace(/\s{2,}/g, " ").trim();

    // Log to Supabase (fire-and-forget, don't block response)
    const sessionId = request.headers.get("x-session-id") ?? "anonymous";
    supabase.from("chat_logs").insert({
      session_id: sessionId,
      user_message: message,
      bot_reply: cleanReply,
      matched_product_ids: matches.map((m) => m[1]),
    }).then(() => {});

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
