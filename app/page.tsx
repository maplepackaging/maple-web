import Hero from "@/components/sections/Hero";
import Categories from "@/components/sections/Categories";
import Featured from "@/components/sections/Featured";
import WhyUs from "@/components/sections/WhyUs";
import Testimonials from "@/components/sections/Testimonials";
import InstagramFeed from "@/components/sections/InstagramFeed";
import CTA from "@/components/sections/CTA";
import {
  getSanityCategories,
  getSanityFeaturedProducts,
  getSanityTestimonials,
  getSiteSettings,
} from "@/lib/content";

export default async function Home() {
  const [categories, featuredProducts, testimonials, settings] =
    await Promise.all([
      getSanityCategories(),
      getSanityFeaturedProducts(),
      getSanityTestimonials(),
      getSiteSettings(),
    ]);

  return (
    <>
      <Hero />
      <Categories categories={categories} />
      <Featured products={featuredProducts} />
      <WhyUs settings={settings} />
      <Testimonials testimonials={testimonials} />
      <InstagramFeed settings={settings} />
      <CTA settings={settings} />
    </>
  );
}
