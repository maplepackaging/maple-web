import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProducts, getProductById, getCategories } from "@/lib/supabase-data";
import ProductDetail from "@/components/pages/ProductDetail";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) return { title: "Not Found" };
  return {
    title: `${product.name} — Maple Packaging`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  // Batch all 3 cached calls in parallel — each is independently cached
  const [product, allCategories, allProducts] = await Promise.all([
    getProductById(id),
    getCategories(),
    getProducts(),
  ]);
  if (!product) notFound();

  const category = allCategories.find((c) => c.id === product.categoryId);
  const relatedProducts = allProducts
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
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
