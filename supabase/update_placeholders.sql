-- Run this script in your Supabase SQL Editor to replace all Unsplash image URLs with the local placeholder image.

-- 1. Update Categories
UPDATE categories 
SET image = '/placeholder-product.png' 
WHERE image LIKE '%unsplash.com%';

-- 2. Update Blog Posts
UPDATE blog_posts 
SET image = '/placeholder-product.png' 
WHERE image LIKE '%unsplash.com%';

-- 3. Update Products 
-- The products table uses a TEXT[] array for images. 
-- This updates the entire array to just contain the placeholder if the first image is an Unsplash URL.
UPDATE products 
SET images = ARRAY['/placeholder-product.png']
WHERE images[1] LIKE '%unsplash.com%';
