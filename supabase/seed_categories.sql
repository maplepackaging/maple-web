-- Maple Packaging — Complete Category Seed Data
-- Synced with categories.txt (all 6 categories, 24 subcategories, 199 items)
-- Run after schema.sql in Supabase SQL Editor
-- This will upsert so it's safe to re-run

-- ============================================================
-- CATEGORIES (6)
-- ============================================================
INSERT INTO categories (id, name, slug, description, image, sort_order) VALUES
('wedding-invites', 'Wedding Invites', 'wedding-invites', 'Exquisite wedding invitations crafted to set the tone for your special day', 'https://images.unsplash.com/photo-1607861716497-e65ab29fc7ac?w=800&q=80', 1),
('gift-packaging', 'Gift Packaging', 'gift-packaging', 'Premium packaging solutions that make every gift unforgettable', 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800&q=80', 2),
('wedding-stationery', 'Wedding Stationery', 'wedding-stationery', 'Complete wedding stationery suites that tell your love story beautifully', 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80', 3),
('hampers-gifts', 'Hampers & Gifts', 'hampers-gifts', 'Thoughtfully curated hampers for every occasion and every relationship', 'https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=800&q=80', 4),
('gift-articles', 'Gift Articles', 'gift-articles', 'Elegant gift articles in premium materials — silver, glass, and more', 'https://images.unsplash.com/photo-1512909006721-3d6018887383?w=800&q=80', 5),
('corporate-gifting', 'Corporate Gifting', 'corporate-gifting', 'Professional gifting solutions that strengthen business relationships', 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80', 6)
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, slug = EXCLUDED.slug, description = EXCLUDED.description, image = EXCLUDED.image, sort_order = EXCLUDED.sort_order;

-- ============================================================
-- SUBCATEGORIES (24)
-- ============================================================
INSERT INTO subcategories (id, name, slug, parent_id, sort_order) VALUES
-- 1. Wedding Invites
('wedding-boxes', 'Wedding Boxes', 'wedding-boxes', 'wedding-invites', 1),
('wedding-cards', 'Wedding Cards', 'wedding-cards', 'wedding-invites', 2),
('wi-accessories', 'Accessories', 'wedding-invite-accessories', 'wedding-invites', 3),
('wi-others', 'Others', 'wedding-invite-others', 'wedding-invites', 4),
-- 2. Gift Packaging
('gp-boxes', 'Boxes', 'gift-packaging-boxes', 'gift-packaging', 1),
('gp-baskets', 'Baskets', 'gift-packaging-baskets', 'gift-packaging', 2),
('gp-materials', 'Materials', 'gift-packaging-materials', 'gift-packaging', 3),
('gp-jar-variants', 'Jar Variants', 'gift-packaging-jar-variants', 'gift-packaging', 4),
('gp-cavity-variants', 'Cavity Variants', 'gift-packaging-cavity-variants', 'gift-packaging', 5),
('gp-trays', 'Trays', 'gift-packaging-trays', 'gift-packaging', 6),
('gp-material-types', 'Material Types', 'gift-packaging-material-types', 'gift-packaging', 7),
('gp-accessories', 'Accessories', 'gift-packaging-accessories', 'gift-packaging', 8),
('gp-others', 'Others', 'gift-packaging-others', 'gift-packaging', 9),
-- 3. Wedding Stationery
('ws-items', 'Stationery Items', 'wedding-stationery-items', 'wedding-stationery', 1),
-- 4. Hampers & Gifts
('hg-types', 'By Type', 'hampers-by-type', 'hampers-gifts', 1),
('hg-recipients', 'By Recipient', 'hampers-by-recipient', 'hampers-gifts', 2),
('hg-relationships', 'By Relationship', 'hampers-by-relationship', 'hampers-gifts', 3),
('hg-price', 'By Price', 'hampers-by-price', 'hampers-gifts', 4),
('hg-occasions', 'By Occasion', 'hampers-by-occasion', 'hampers-gifts', 5),
('hg-others', 'Others', 'hampers-others', 'hampers-gifts', 6),
-- 5. Gift Articles
('ga-items', 'Gift Items', 'gift-article-items', 'gift-articles', 1),
-- 6. Corporate Gifting
('cg-use-cases', 'Use Cases', 'corporate-use-cases', 'corporate-gifting', 1),
('cg-curated-kits', 'Curated Kits', 'corporate-curated-kits', 'corporate-gifting', 2),
('cg-eco', 'Eco', 'corporate-eco', 'corporate-gifting', 3)
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, slug = EXCLUDED.slug, parent_id = EXCLUDED.parent_id, sort_order = EXCLUDED.sort_order;

-- ============================================================
-- SUB-SUBCATEGORIES (199 leaf items)
-- ============================================================
INSERT INTO sub_subcategories (id, name, slug, parent_id, sort_order) VALUES

-- ── 1. WEDDING INVITES ──────────────────────────────────────

-- 1.1 Wedding Boxes (3)
('luxe-wedding-boxes', 'Luxe Wedding Boxes', 'luxe-wedding-boxes', 'wedding-boxes', 1),
('premium-wedding-boxes', 'Premium Wedding Boxes', 'premium-wedding-boxes', 'wedding-boxes', 2),
('affordable-wedding-boxes', 'Affordable Wedding Boxes', 'affordable-wedding-boxes', 'wedding-boxes', 3),

-- 1.2 Wedding Cards (8)
('classic-wedding-cards', 'Classic Wedding Cards', 'classic-wedding-cards', 'wedding-cards', 1),
('deluxe-wedding-cards', 'Deluxe Wedding Cards', 'deluxe-wedding-cards', 'wedding-cards', 2),
('premium-wedding-cards', 'Premium Wedding Cards', 'premium-wedding-cards', 'wedding-cards', 3),
('luxe-wedding-cards', 'Luxe Wedding Cards', 'luxe-wedding-cards', 'wedding-cards', 4),
('velvet-wedding-cards', 'Velvet Wedding Cards', 'velvet-wedding-cards', 'wedding-cards', 5),
('minimal-luxury-invites', 'Minimal Luxury Invites', 'minimal-luxury-invites', 'wedding-cards', 6),
('scroll-invites', 'Scroll Invites', 'scroll-invites', 'wedding-cards', 7),
('passport-invites', 'Passport Invites', 'passport-invites', 'wedding-cards', 8),

-- 1.3 Accessories (7)
('tassel', 'Tassel', 'tassel', 'wi-accessories', 1),
('doori', 'Doori', 'doori', 'wi-accessories', 2),
('ganesh-sticker-moorti', 'Ganesh Sticker Moorti', 'ganesh-sticker-moorti', 'wi-accessories', 3),
('acrylic-wooden-nameplate', 'Acrylic / Wooden Name Plate', 'acrylic-wooden-nameplate', 'wi-accessories', 4),
('mdf-laser-cut', 'MDF Laser Cut', 'mdf-laser-cut', 'wi-accessories', 5),
('wax-seal', 'Wax Seal', 'wax-seal', 'wi-accessories', 6),
('printed-label-stickers', 'Printed Label Stickers', 'printed-label-stickers', 'wi-accessories', 7),

-- 1.4 Others (3)
('shagun-cards', 'Small Batch Shagun Cards', 'shagun-cards', 'wi-others', 1),
('cash-envelopes-wi', 'Cash Envelopes', 'cash-envelopes-wi', 'wi-others', 2),
('e-invites', 'E-Invites', 'e-invites', 'wi-others', 3),

-- ── 2. GIFT PACKAGING ───────────────────────────────────────

-- 2.1 Boxes (11)
('hamper-boxes', 'Hamper Boxes', 'hamper-boxes', 'gp-boxes', 1),
('cavity-boxes', 'Cavity Boxes', 'cavity-boxes', 'gp-boxes', 2),
('paper-foldable-boxes', 'Paper Foldable Boxes', 'paper-foldable-boxes', 'gp-boxes', 3),
('jar-boxes', 'Jar Boxes', 'jar-boxes', 'gp-boxes', 4),
('coin-boxes', 'Coin Boxes', 'coin-boxes', 'gp-boxes', 5),
('collapsible-boxes', 'Collapsible Boxes', 'collapsible-boxes', 'gp-boxes', 6),
('rigid-boxes', 'Rigid Boxes', 'rigid-boxes', 'gp-boxes', 7),
('mdf-boxes', 'MDF Boxes', 'mdf-boxes', 'gp-boxes', 8),
('multipurpose-boxes', 'Multipurpose Boxes', 'multipurpose-boxes', 'gp-boxes', 9),
('chocolate-sweet-boxes', 'Chocolate / Sweet Boxes', 'chocolate-sweet-boxes', 'gp-boxes', 10),
('baby-announcement-boxes', 'Baby Announcement Boxes', 'baby-announcement-boxes', 'gp-boxes', 11),

-- 2.2 Baskets (9)
('hamper-baskets', 'Hamper Baskets', 'hamper-baskets', 'gp-baskets', 1),
('ratan-hamper-boxes', 'Ratan Hamper Boxes', 'ratan-hamper-boxes', 'gp-baskets', 2),
('shimmer-baskets', 'Shimmer Baskets', 'shimmer-baskets', 'gp-baskets', 3),
('suede-baskets', 'Suede Baskets', 'suede-baskets', 'gp-baskets', 4),
('leatherite-baskets', 'Leatherite Baskets', 'leatherite-baskets', 'gp-baskets', 5),
('jute-basket', 'Jute Basket', 'jute-basket', 'gp-baskets', 6),
('pine-wood-baskets', 'Pine Wood Baskets', 'pine-wood-baskets', 'gp-baskets', 7),
('ratan-baskets', 'Ratan Baskets', 'ratan-baskets', 'gp-baskets', 8),
('round-baskets', 'Round Baskets', 'round-baskets', 'gp-baskets', 9),

-- 2.3 Materials (6)
('jute-material', 'Jute', 'jute-material', 'gp-materials', 1),
('leather-material', 'Leather', 'leather-material', 'gp-materials', 2),
('organza-material', 'Organza', 'organza-material', 'gp-materials', 3),
('suede-material', 'Suede', 'suede-material', 'gp-materials', 4),
('pvc-material', 'PVC', 'pvc-material', 'gp-materials', 5),
('fabric-material', 'Fabric Material', 'fabric-material', 'gp-materials', 6),

-- 2.4 Jar Variants (5)
('2-jars', '2 Jars', '2-jars', 'gp-jar-variants', 1),
('3-jars', '3 Jars', '3-jars', 'gp-jar-variants', 2),
('4-jars', '4 Jars', '4-jars', 'gp-jar-variants', 3),
('5-jars', '5 Jars', '5-jars', 'gp-jar-variants', 4),
('6-jars', '6 Jars', '6-jars', 'gp-jar-variants', 5),

-- 2.5 Cavity Variants (6)
('6-cavity', '6 Cavity', '6-cavity', 'gp-cavity-variants', 1),
('9-cavity', '9 Cavity', '9-cavity', 'gp-cavity-variants', 2),
('12-cavity', '12 Cavity', '12-cavity', 'gp-cavity-variants', 3),
('15-cavity', '15 Cavity', '15-cavity', 'gp-cavity-variants', 4),
('18-cavity', '18 Cavity', '18-cavity', 'gp-cavity-variants', 5),
('24-cavity', '24 Cavity', '24-cavity', 'gp-cavity-variants', 6),

-- 2.6 Trays (8)
('cardboard-trays', 'Cardboard Trays', 'cardboard-trays', 'gp-trays', 1),
('mdf-trays', 'MDF Trays', 'mdf-trays', 'gp-trays', 2),
('pinewood-trays', 'Pinewood Trays', 'pinewood-trays', 'gp-trays', 3),
('leather-trays', 'Leather Trays', 'leather-trays', 'gp-trays', 4),
('net-style-trays', 'Net Style Trays', 'net-style-trays', 'gp-trays', 5),
('cane-kauna-trays', 'Cane / Kauna Grass Trays', 'cane-kauna-trays', 'gp-trays', 6),
('glitter-trays', 'Glitter Trays', 'glitter-trays', 'gp-trays', 7),
('cavity-trays', 'Cavity Trays', 'cavity-trays', 'gp-trays', 8),

-- 2.7 Material Types (6)
('acrylic-gp', 'Acrylic', 'acrylic-gp', 'gp-material-types', 1),
('glass-boxes', 'Glass Boxes', 'glass-boxes', 'gp-material-types', 2),
('metal-items-gp', 'Metal Items', 'metal-items-gp', 'gp-material-types', 3),
('tins', 'Tins', 'tins', 'gp-material-types', 4),
('pinewood-gp', 'Pinewood', 'pinewood-gp', 'gp-material-types', 5),
('ratan-items', 'Ratan Items', 'ratan-items', 'gp-material-types', 6),

-- 2.8 Accessories (6)
('shredders', 'Shredders', 'shredders', 'gp-accessories', 1),
('ribbons', 'Ribbons', 'ribbons', 'gp-accessories', 2),
('nets', 'Nets', 'nets', 'gp-accessories', 3),
('seals', 'Seals', 'seals', 'gp-accessories', 4),
('tassels-gp', 'Tassels', 'tassels-gp', 'gp-accessories', 5),
('lock-hinges', 'Lock & Hinges', 'lock-hinges', 'gp-accessories', 6),

-- 2.9 Others (7)
('bags-gp', 'Bags', 'bags-gp', 'gp-others', 1),
('potlis', 'Potlis', 'potlis', 'gp-others', 2),
('bakery-products', 'Bakery Products', 'bakery-products', 'gp-others', 3),
('dried-flowers', 'Dried Flowers', 'dried-flowers', 'gp-others', 4),
('jars-gp', 'Jars', 'jars-gp', 'gp-others', 5),
('jar-cavity-box', 'Jar + Cavity Box', 'jar-cavity-box', 'gp-others', 6),
('paper-boxes', 'Paper Boxes', 'paper-boxes', 'gp-others', 7),

-- ── 3. WEDDING STATIONERY ───────────────────────────────────

-- 3.1 Stationery Items (31)
('printed-invite', 'Printed Invite', 'printed-invite', 'ws-items', 1),
('cash-envelopes-ws', 'Cash Envelopes', 'cash-envelopes-ws', 'ws-items', 2),
('airport-pickup-cards', 'Airport / Station Pickup Cards', 'airport-pickup-cards', 'ws-items', 3),
('paper-bags', 'Paper Bags', 'paper-bags', 'ws-items', 4),
('luggage-tags', 'Luggage Tags', 'luggage-tags', 'ws-items', 5),
('straws-ws', 'Straws', 'straws-ws', 'ws-items', 6),
('key-card-itinerary', 'Key Card Itinerary', 'key-card-itinerary', 'ws-items', 7),
('stickers-ws', 'Stickers', 'stickers-ws', 'ws-items', 8),
('welcome-note', 'Welcome Note', 'welcome-note', 'ws-items', 9),
('popcorn-tubs', 'Popcorn Tubs', 'popcorn-tubs', 'ws-items', 10),
('event-itinerary', 'Event Itinerary', 'event-itinerary', 'ws-items', 11),
('menu-cards', 'Menu Cards', 'menu-cards', 'ws-items', 12),
('passport-itinerary', 'Passport Itinerary', 'passport-itinerary', 'ws-items', 13),
('vow-boards', 'Vow Boards', 'vow-boards', 'ws-items', 14),
('tent-card', 'Tent Card', 'tent-card', 'ws-items', 15),
('wedding-contract', 'Wedding Contract', 'wedding-contract', 'ws-items', 16),
('gift-tags-ws', 'Gift Tags', 'gift-tags-ws', 'ws-items', 17),
('petal-cones', 'Petal Cones', 'petal-cones', 'ws-items', 18),
('door-danglers', 'Door Danglers', 'door-danglers', 'ws-items', 19),
('bells-with-tags', 'Bells with Tags', 'bells-with-tags', 'ws-items', 20),
('newspaper-ws', 'Newspaper', 'newspaper-ws', 'ws-items', 21),
('coasters', 'Coasters', 'coasters', 'ws-items', 22),
('magazine-ws', 'Magazine', 'magazine-ws', 'ws-items', 23),
('welcome-board', 'Welcome Board', 'welcome-board', 'ws-items', 24),
('topper-ws', 'Topper', 'topper-ws', 'ws-items', 25),
('stirrer-ws', 'Stirrer', 'stirrer-ws', 'ws-items', 26),
('playing-cards-ws', 'Playing Cards', 'playing-cards-ws', 'ws-items', 27),
('chocolate-wrapper', 'Chocolate Wrapper', 'chocolate-wrapper', 'ws-items', 28),
('scratch-cards', 'Scratch Cards', 'scratch-cards', 'ws-items', 29),
('tambola-tickets', 'Tambola Tickets', 'tambola-tickets', 'ws-items', 30),
('badge-magnets', 'Badge + Magnets', 'badge-magnets', 'ws-items', 31),

-- ── 4. HAMPERS & GIFTS ──────────────────────────────────────

-- 4.1 By Type (11)
('room-hampers', 'Room Hampers', 'room-hampers', 'hg-types', 1),
('birthday-gifts', 'Birthday Gifts', 'birthday-gifts', 'hg-types', 2),
('anniversary-gifts', 'Anniversary Gifts', 'anniversary-gifts', 'hg-types', 3),
('romantic', 'Romantic', 'romantic', 'hg-types', 4),
('quirky', 'Quirky', 'quirky', 'hg-types', 5),
('nostalgic', 'Nostalgic', 'nostalgic', 'hg-types', 6),
('naughty', 'Naughty', 'naughty', 'hg-types', 7),
('comfort-warmth', 'Comfort & Warmth', 'comfort-warmth', 'hg-types', 8),
('celebration-excitement', 'Celebration & Excitement', 'celebration-excitement', 'hg-types', 9),
('countdown-surprises', 'Countdown Surprises', 'countdown-surprises', 'hg-types', 10),
('do-it-together', 'Do-it Together', 'do-it-together', 'hg-types', 11),

-- 4.2 By Recipient (9)
('for-him', 'For Him', 'for-him', 'hg-recipients', 1),
('for-her', 'For Her', 'for-her', 'hg-recipients', 2),
('for-couple', 'For Couple', 'for-couple', 'hg-recipients', 3),
('for-men', 'For Men', 'for-men', 'hg-recipients', 4),
('for-women', 'For Women', 'for-women', 'hg-recipients', 5),
('for-friends', 'For Friends', 'for-friends', 'hg-recipients', 6),
('for-parents', 'For Parents', 'for-parents', 'hg-recipients', 7),
('for-newly-married', 'For Newly Married Couple', 'for-newly-married', 'hg-recipients', 8),
('for-parents-to-be', 'For Parents-to-be', 'for-parents-to-be', 'hg-recipients', 9),

-- 4.3 By Relationship (9)
('boyfriend', 'Boyfriend', 'boyfriend', 'hg-relationships', 1),
('girlfriend', 'Girlfriend', 'girlfriend', 'hg-relationships', 2),
('husband', 'Husband', 'husband', 'hg-relationships', 3),
('wife', 'Wife', 'wife', 'hg-relationships', 4),
('brother', 'Brother', 'brother', 'hg-relationships', 5),
('sister', 'Sister', 'sister', 'hg-relationships', 6),
('father', 'Father', 'father', 'hg-relationships', 7),
('mother', 'Mother', 'mother', 'hg-relationships', 8),
('friend', 'Friend', 'friend', 'hg-relationships', 9),

-- 4.4 By Price (6)
('under-500', 'Under 500', 'under-500', 'hg-price', 1),
('under-1000', 'Under 1000', 'under-1000', 'hg-price', 2),
('under-1500', 'Under 1500', 'under-1500', 'hg-price', 3),
('under-2000', 'Under 2000', 'under-2000', 'hg-price', 4),
('under-3000', 'Under 3000', 'under-3000', 'hg-price', 5),
('under-5000', 'Under 5000', 'under-5000', 'hg-price', 6),

-- 4.5 By Occasion (11)
('holi-gifts', 'Holi Gifts', 'holi-gifts', 'hg-occasions', 1),
('rakhi-gifts', 'Rakhi Gifts', 'rakhi-gifts', 'hg-occasions', 2),
('diwali-gifts', 'Diwali Gifts', 'diwali-gifts', 'hg-occasions', 3),
('christmas-gifts', 'Christmas Gifts', 'christmas-gifts', 'hg-occasions', 4),
('new-year-gifts', 'New Year Gifts', 'new-year-gifts', 'hg-occasions', 5),
('valentines-day-gifts', 'Valentine''s Day Gifts', 'valentines-day-gifts', 'hg-occasions', 6),
('womens-day-gifts', 'Women''s Day Gifts', 'womens-day-gifts', 'hg-occasions', 7),
('mothers-day-gifts', 'Mother''s Day Gifts', 'mothers-day-gifts', 'hg-occasions', 8),
('fathers-day-gifts', 'Father''s Day Gifts', 'fathers-day-gifts', 'hg-occasions', 9),
('teachers-day-gifts', 'Teachers Day Gifts', 'teachers-day-gifts', 'hg-occasions', 10),
('friendship-day-gifts', 'Friendship Day Gifts', 'friendship-day-gifts', 'hg-occasions', 11),

-- 4.6 Others (17)
('personalized-gifts', 'Personalized Gifts', 'personalized-gifts', 'hg-others', 1),
('luxe-hampers', 'Luxe Hampers', 'luxe-hampers', 'hg-others', 2),
('premium-hampers', 'Premium Hampers', 'premium-hampers', 'hg-others', 3),
('affordable-hampers', 'Affordable Hampers', 'affordable-hampers', 'hg-others', 4),
('gift-boxes-hg', 'Gift Boxes', 'gift-boxes-hg', 'hg-others', 5),
('frames', 'Frames', 'frames', 'hg-others', 6),
('magnets-hg', 'Magnets', 'magnets-hg', 'hg-others', 7),
('calendars', 'Calendars', 'calendars', 'hg-others', 8),
('drinkware', 'Drinkware', 'drinkware', 'hg-others', 9),
('accessories-hg', 'Accessories', 'accessories-hg', 'hg-others', 10),
('wrapping-paper', 'Wrapping Paper', 'wrapping-paper', 'hg-others', 11),
('forever-flowers', 'Forever Flowers', 'forever-flowers', 'hg-others', 12),
('gourmet-gifts', 'Gourmet Gifts', 'gourmet-gifts', 'hg-others', 13),
('housewarming-gifts', 'Housewarming Gifts', 'housewarming-gifts', 'hg-others', 14),
('get-well-soon', 'Get Well Soon', 'get-well-soon', 'hg-others', 15),
('engagement-gifts', 'Engagement Gifts', 'engagement-gifts', 'hg-others', 16),
('farewell-hg', 'Farewell', 'farewell-hg', 'hg-others', 17),

-- ── 5. GIFT ARTICLES ────────────────────────────────────────

-- 5.1 Gift Items (6)
('pure-silver', 'Pure Silver', 'pure-silver', 'ga-items', 1),
('german-silver', 'German Silver', 'german-silver', 'ga-items', 2),
('idols', 'Idols', 'idols', 'ga-items', 3),
('glass-items', 'Glass Items', 'glass-items', 'ga-items', 4),
('lacquered-items', 'Lacquered Items', 'lacquered-items', 'ga-items', 5),
('metal-items-ga', 'Metal Items', 'metal-items-ga', 'ga-items', 6),

-- ── 6. CORPORATE GIFTING ────────────────────────────────────

-- 6.1 Use Cases (5)
('new-joinee-kits', 'New Joinee Kits', 'new-joinee-kits', 'cg-use-cases', 1),
('birthday-anniversary-cg', 'Birthday / Anniversary', 'birthday-anniversary-cg', 'cg-use-cases', 2),
('thank-you-appreciation', 'Thank You / Appreciation', 'thank-you-appreciation', 'cg-use-cases', 3),
('farewell-cg', 'Farewell', 'farewell-cg', 'cg-use-cases', 4),
('ecofriendly-collection', 'Ecofriendly Collection', 'ecofriendly-collection', 'cg-use-cases', 5),

-- 6.2 Curated Kits (12)
('warm-welcome', 'A Warm Welcome', 'warm-welcome', 'cg-curated-kits', 1),
('birthday-bliss', 'Birthday Bliss', 'birthday-bliss', 'cg-curated-kits', 2),
('coffee-goals', 'Coffee & Goals', 'coffee-goals', 'cg-curated-kits', 3),
('gourmet-delights', 'Gourmet Delights', 'gourmet-delights', 'cg-curated-kits', 4),
('mindful-hamper', 'Mindful Hamper', 'mindful-hamper', 'cg-curated-kits', 5),
('motivational', 'Motivational', 'motivational', 'cg-curated-kits', 6),
('rise-and-shine', 'Rise and Shine', 'rise-and-shine', 'cg-curated-kits', 7),
('dream-believe-build', 'Dream. Believe. Build', 'dream-believe-build', 'cg-curated-kits', 8),
('goal-getter', 'Goal Getter', 'goal-getter', 'cg-curated-kits', 9),
('wishing-wellness', 'Wishing Wellness', 'wishing-wellness', 'cg-curated-kits', 10),
('you-go-girl', 'You Go Girl', 'you-go-girl', 'cg-curated-kits', 11),
('gadget-geek', 'Gadget Geek', 'gadget-geek', 'cg-curated-kits', 12),

-- 6.3 Eco (1)
('eco-stationery-kit', 'Eco Friendly Stationery Kit', 'eco-stationery-kit', 'cg-eco', 1)

ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, slug = EXCLUDED.slug, parent_id = EXCLUDED.parent_id, sort_order = EXCLUDED.sort_order;
