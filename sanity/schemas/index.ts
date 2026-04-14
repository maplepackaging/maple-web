import heroSlide from "./heroSlide";
import category from "./category";
import subcategory from "./subcategory";
import subSubcategory from "./subSubcategory";
import product from "./product";
import blogPost from "./blogPost";
import testimonial from "./testimonial";
import siteSettings from "./siteSettings";
import aboutPage from "./aboutPage";
import customizePage from "./customizePage";

export const schemaTypes = [
  // Singletons
  siteSettings,
  aboutPage,
  customizePage,
  // Collections
  heroSlide,
  category,
  subcategory,
  subSubcategory,
  product,
  blogPost,
  testimonial,
];
