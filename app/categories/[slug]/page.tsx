import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategories, getCategoryBySlug, getProductsByCategory } from "@/lib/supabase-data";
import CategoryDetail from "@/components/pages/CategoryDetail";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: "Not Found" };
  return {
    title: `${category.name} — Maple Packaging`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const categoryProducts = await getProductsByCategory(category.id);

  return (
    <CategoryDetail category={category} products={categoryProducts} />
  );
}
