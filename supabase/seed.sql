-- Maple Packaging — Seed Data
-- Run after schema.sql in Supabase SQL Editor

-- Categories
INSERT INTO categories (id, name, slug, description, image, sort_order) VALUES
('wedding-invites', 'Wedding Invites', 'wedding-invites', 'Exquisite wedding invitations crafted to set the tone for your special day', 'https://images.unsplash.com/photo-1607861716497-e65ab29fc7ac?w=800&q=80', 1),
('gift-packaging', 'Gift Packaging', 'gift-packaging', 'Premium packaging solutions that make every gift unforgettable', 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800&q=80', 2),
('wedding-stationery', 'Wedding Stationery', 'wedding-stationery', 'Complete wedding stationery suites that tell your love story beautifully', 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80', 3),
('hampers-gifts', 'Hampers & Gifts', 'hampers-gifts', 'Thoughtfully curated hampers for every occasion and every relationship', 'https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=800&q=80', 4),
('gift-articles', 'Gift Articles', 'gift-articles', 'Elegant gift articles in premium materials — silver, glass, and more', 'https://images.unsplash.com/photo-1512909006721-3d6018887383?w=800&q=80', 5),
('corporate-gifting', 'Corporate Gifting', 'corporate-gifting', 'Professional gifting solutions that strengthen business relationships', 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80', 6);

-- Subcategories (key ones)
INSERT INTO subcategories (id, name, slug, parent_id, sort_order) VALUES
('wedding-boxes', 'Wedding Boxes', 'wedding-boxes', 'wedding-invites', 1),
('wedding-cards', 'Wedding Cards', 'wedding-cards', 'wedding-invites', 2),
('wi-accessories', 'Accessories', 'wedding-invite-accessories', 'wedding-invites', 3),
('wi-others', 'Others', 'wedding-invite-others', 'wedding-invites', 4),
('gp-boxes', 'Boxes', 'gift-packaging-boxes', 'gift-packaging', 1),
('gp-baskets', 'Baskets', 'gift-packaging-baskets', 'gift-packaging', 2),
('gp-trays', 'Trays', 'gift-packaging-trays', 'gift-packaging', 3),
('gp-accessories', 'Accessories', 'gift-packaging-accessories', 'gift-packaging', 4),
('ws-items', 'Stationery Items', 'wedding-stationery-items', 'wedding-stationery', 1),
('hg-types', 'By Type', 'hampers-by-type', 'hampers-gifts', 1),
('hg-occasions', 'By Occasion', 'hampers-by-occasion', 'hampers-gifts', 2),
('hg-recipients', 'By Recipient', 'hampers-by-recipient', 'hampers-gifts', 3),
('ga-items', 'Gift Items', 'gift-article-items', 'gift-articles', 1),
('cg-use-cases', 'Use Cases', 'corporate-use-cases', 'corporate-gifting', 1),
('cg-curated-kits', 'Curated Kits', 'corporate-curated-kits', 'corporate-gifting', 2);

-- Sub-subcategories (representative sample)
INSERT INTO sub_subcategories (id, name, slug, parent_id, sort_order) VALUES
('luxe-wedding-boxes', 'Luxe Wedding Boxes', 'luxe-wedding-boxes', 'wedding-boxes', 1),
('premium-wedding-boxes', 'Premium Wedding Boxes', 'premium-wedding-boxes', 'wedding-boxes', 2),
('affordable-wedding-boxes', 'Affordable Wedding Boxes', 'affordable-wedding-boxes', 'wedding-boxes', 3),
('classic-wedding-cards', 'Classic Wedding Cards', 'classic-wedding-cards', 'wedding-cards', 1),
('deluxe-wedding-cards', 'Deluxe Wedding Cards', 'deluxe-wedding-cards', 'wedding-cards', 2),
('premium-wedding-cards', 'Premium Wedding Cards', 'premium-wedding-cards', 'wedding-cards', 3),
('luxe-wedding-cards', 'Luxe Wedding Cards', 'luxe-wedding-cards', 'wedding-cards', 4),
('velvet-wedding-cards', 'Velvet Wedding Cards', 'velvet-wedding-cards', 'wedding-cards', 5),
('minimal-luxury-invites', 'Minimal Luxury Invites', 'minimal-luxury-invites', 'wedding-cards', 6),
('scroll-invites', 'Scroll Invites', 'scroll-invites', 'wedding-cards', 7),
('passport-invites', 'Passport Invites', 'passport-invites', 'wedding-cards', 8),
('hamper-boxes', 'Hamper Boxes', 'hamper-boxes', 'gp-boxes', 1),
('cavity-boxes', 'Cavity Boxes', 'cavity-boxes', 'gp-boxes', 2),
('rigid-boxes', 'Rigid Boxes', 'rigid-boxes', 'gp-boxes', 3),
('mdf-boxes', 'MDF Boxes', 'mdf-boxes', 'gp-boxes', 4),
('chocolate-sweet-boxes', 'Chocolate / Sweet Boxes', 'chocolate-sweet-boxes', 'gp-boxes', 5),
('hamper-baskets', 'Hamper Baskets', 'hamper-baskets', 'gp-baskets', 1),
('ratan-baskets', 'Ratan Baskets', 'ratan-baskets', 'gp-baskets', 2),
('jute-basket', 'Jute Basket', 'jute-basket', 'gp-baskets', 3),
('pure-silver', 'Pure Silver', 'pure-silver', 'ga-items', 1),
('german-silver', 'German Silver', 'german-silver', 'ga-items', 2),
('idols', 'Idols', 'idols', 'ga-items', 3),
('new-joinee-kits', 'New Joinee Kits', 'new-joinee-kits', 'cg-use-cases', 1),
('warm-welcome', 'A Warm Welcome', 'warm-welcome', 'cg-curated-kits', 1),
('birthday-bliss', 'Birthday Bliss', 'birthday-bliss', 'cg-curated-kits', 2),
('coffee-goals', 'Coffee & Goals', 'coffee-goals', 'cg-curated-kits', 3);

-- Products
INSERT INTO products (id, name, description, price, original_price, images, category_id, subcategory_id, tags, featured, bestseller) VALUES
('P001', 'Royal Velvet Wedding Box', 'A luxurious velvet-finished wedding invitation box with gold foil accents and hand-tied ribbon closure. Perfect for setting the tone of a grand celebration.', 450, 599, ARRAY['https://images.unsplash.com/photo-1607861716497-e65ab29fc7ac?w=600&q=80'], 'wedding-invites', 'wedding-boxes', ARRAY['luxe','velvet','wedding','premium'], true, true),
('P002', 'Minimal Ivory Invite Suite', 'Clean, modern wedding invitation suite on premium cotton paper with letterpress printing. Understated elegance for the contemporary couple.', 85, NULL, ARRAY['https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&q=80'], 'wedding-invites', 'wedding-cards', ARRAY['minimal','luxury','letterpress','modern'], true, false),
('P003', 'Heritage Scroll Invite', 'Traditional scroll invitation with a contemporary twist — printed on handmade paper with custom wax seal and golden rod.', 175, 220, ARRAY['https://images.unsplash.com/photo-1595872018818-97555653a011?w=600&q=80'], 'wedding-invites', 'wedding-cards', ARRAY['scroll','traditional','handmade','wax-seal'], true, false),
('P004', 'Luxe Hamper Box — Midnight', 'Deep navy rigid hamper box with magnetic closure, satin lining, and embossed logo option. Ideal for premium gift hampers.', 320, NULL, ARRAY['https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=600&q=80'], 'gift-packaging', 'gp-boxes', ARRAY['hamper','rigid','luxury','corporate'], true, true),
('P005', 'Rattan Hamper Basket', 'Handwoven rattan basket with leather handles. A timeless packaging choice that doubles as home décor.', 280, 350, ARRAY['https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=600&q=80'], 'gift-packaging', 'gp-baskets', ARRAY['rattan','handwoven','eco','basket'], true, false),
('P006', 'Corporate Welcome Kit — Rise & Shine', 'Curated new joinee welcome kit with branded mug, notebook, pen set, and gourmet cookies in a custom printed box.', 1200, NULL, ARRAY['https://images.unsplash.com/photo-1557821552-17105176677c?w=600&q=80'], 'corporate-gifting', 'cg-curated-kits', ARRAY['corporate','welcome-kit','branded','new-joinee'], true, false),
('P007', 'Pure Silver Ganesh Idol', 'Handcrafted pure silver Ganesh idol with intricate detailing. A timeless gift for auspicious occasions.', 2500, NULL, ARRAY['https://images.unsplash.com/photo-1512909006721-3d6018887383?w=600&q=80'], 'gift-articles', 'ga-items', ARRAY['silver','idol','ganesh','auspicious'], false, true),
('P008', 'Diwali Luxe Hamper', 'Premium Diwali hamper featuring artisanal sweets, dry fruits, scented candles, and a silk potli — all presented in a handcrafted MDF box.', 1800, 2200, ARRAY['https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=600&q=80'], 'hampers-gifts', 'hg-occasions', ARRAY['diwali','festive','luxe','hamper','sweets'], true, true);

-- Blog posts
INSERT INTO blog_posts (id, title, slug, excerpt, content, image, category, date, read_time) VALUES
('b1', '10 Wedding Packaging Trends That Will Define 2025', 'wedding-packaging-trends-2025', 'From sustainable materials to minimalist foil designs — here are the wedding invitation trends every couple needs to know this year.', 'The world of wedding packaging is evolving rapidly...', 'https://images.unsplash.com/photo-1607861716497-e65ab29fc7ac?w=800&q=80', 'Weddings', '2025-03-15', '5 min read'),
('b2', 'Corporate Gifting: How to Make a Lasting Impression', 'corporate-gifting-lasting-impression', 'A well-thought-out corporate gift can strengthen relationships, boost morale, and reinforce your brand.', 'Corporate gifting is more than a gesture...', 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80', 'Corporate', '2025-03-08', '4 min read'),
('b3', 'The Art of Gift Hamper Curation: A Complete Guide', 'art-of-gift-hamper-curation', 'Creating the perfect gift hamper is a balance of theme, quality, and presentation.', 'A great gift hamper is more than a collection of items...', 'https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=800&q=80', 'Gifting', '2025-02-28', '6 min read'),
('b4', 'Eco-Friendly Packaging: Premium Without the Guilt', 'eco-friendly-premium-packaging', 'Sustainability and luxury are not opposites. Here is how Maple Packaging combines eco-conscious materials with premium design.', 'The biggest misconception in packaging is that eco-friendly means low quality...', 'https://images.unsplash.com/photo-1512909006721-3d6018887383?w=800&q=80', 'Sustainability', '2025-02-15', '4 min read');

-- Testimonials
INSERT INTO testimonials (id, name, role, content, rating, avatar) VALUES
('t1', 'Priya Mehta', 'Bride, Mumbai', 'Maple Packaging turned our wedding invitations into a work of art. Every guest called to compliment the box before even opening it. Truly unforgettable craftsmanship.', 5, 'PM'),
('t2', 'Rahul Sharma', 'Founder, Artisan Foods', 'We needed premium hamper packaging for our Diwali corporate gifts. The team understood our brand perfectly and delivered boxes that our clients loved. Will never go elsewhere.', 5, 'RS'),
('t3', 'Ananya Kapoor', 'Event Planner, Delhi', 'I have worked with dozens of packaging vendors over 8 years. Maple is in a different league — their attention to detail, material quality, and turnaround time are unmatched.', 5, 'AK'),
('t4', 'Vikram Patel', 'Head of HR, TechCorp', 'Our employee welcome kits went from forgettable to remarkable. The curated packaging made every new joinee feel genuinely special from day one.', 5, 'VP'),
('t5', 'Meera Joshi', 'Mother of the Bride', 'From the initial consultation to the final delivery, the experience was seamless. The wedding stationery was cohesive, elegant, and exactly what we envisioned.', 5, 'MJ');
