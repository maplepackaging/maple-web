export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  subcategories: SubCategory[];
}

export interface SubCategory {
  id: string;
  name: string;
  slug: string;
  parentId: string;
  items: SubSubCategory[];
}

export interface SubSubCategory {
  id: string;
  name: string;
  slug: string;
  parentId: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  categoryId: string;
  subcategoryId: string;
  tags: string[];
  featured?: boolean;
  bestseller?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
}

export interface AnnouncementItem {
  id: string;
  text: string;
}
