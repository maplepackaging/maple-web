import Hero from "@/components/sections/Hero";
import Categories from "@/components/sections/Categories";
import Featured from "@/components/sections/Featured";
import WhyUs from "@/components/sections/WhyUs";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";
import { getCategories, getFeaturedProducts, getTestimonials } from "@/lib/supabase-data";

export default async function Home() {
  const [categories, featuredProducts, testimonials] = await Promise.all([
    getCategories(),
    getFeaturedProducts(),
    getTestimonials(),
  ]);

  return (
    <>
      <Hero />
      <Categories categories={categories} />
      <Featured products={featuredProducts} />
      <WhyUs />
      <Testimonials testimonials={testimonials} />
      <CTA />
    </>
  );
}
