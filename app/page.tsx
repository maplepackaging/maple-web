import Hero from "@/components/sections/Hero";
import Categories from "@/components/sections/Categories";
import Featured from "@/components/sections/Featured";
import WhyUs from "@/components/sections/WhyUs";
import Testimonials from "@/components/sections/Testimonials";
import InstagramFeed from "@/components/sections/InstagramFeed";
import CTA from "@/components/sections/CTA";
import {
  getHeroSlides,
  getSanityCategories,
  getSanityFeaturedProducts,
  getSanityTestimonials,
  getSiteSettings,
} from "@/lib/sanity-data";

export default async function Home() {
  const [heroSlides, categories, featuredProducts, testimonials, settings] =
    await Promise.all([
      getHeroSlides(),
      getSanityCategories(),
      getSanityFeaturedProducts(),
      getSanityTestimonials(),
      getSiteSettings(),
    ]);

  return (
    <>
      <Hero slides={heroSlides} />
      <Categories categories={categories} />
      <Featured products={featuredProducts} />
      <WhyUs settings={settings} />
      <Testimonials testimonials={testimonials} />
      <InstagramFeed settings={settings} />
      <CTA settings={settings} />
    </>
  );
}
