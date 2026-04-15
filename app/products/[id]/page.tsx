import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSanityProducts, getSanityProductById, getSanityCategories, getSanityProductsByCategory } from "@/lib/sanity-data";
import ProductDetail from "@/components/pages/ProductDetail";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const products = await getSanityProducts();
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getSanityProductById(id);
  if (!product) return { title: "Not Found" };
  return {
    title: `${product.name} — Maple Packaging`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = await getSanityProductById(id);
  if (!product) notFound();

  // Fetch only what's needed — category list (cached) + category products (cached)
  const [allCategories, categoryProducts] = await Promise.all([
    getSanityCategories(),
    getSanityProductsByCategory(product.categoryId),
  ]);

  const category = allCategories.find((c) => c.id === product.categoryId);
  const relatedProducts = categoryProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <ProductDetail
      product={product}
      categoryName={category?.name ?? ""}
      categorySlug={category?.slug ?? ""}
      relatedProducts={relatedProducts}
    />
  );
}
