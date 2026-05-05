-- ============================================
-- LAMSIAN JEWELS - SUPABASE SCHEMA
-- Run this in your Supabase SQL Editor
-- ============================================

-- Products table
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('rings','necklaces','earrings','bracelets','anklets','sets','watches')),
  images TEXT[] DEFAULT '{}',
  in_stock BOOLEAN DEFAULT true,
  is_new BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  material TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_location TEXT NOT NULL,
  product_id UUID REFERENCES products(id),
  product_name TEXT NOT NULL,
  quantity INTEGER DEFAULT 1,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','confirmed','shipped','delivered','cancelled')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Public can read products
CREATE POLICY "Products are publicly readable" ON products
  FOR SELECT USING (true);

-- Only authenticated users (admin) can write products
CREATE POLICY "Admin can manage products" ON products
  FOR ALL USING (auth.role() = 'authenticated');

-- Anyone can insert orders (WhatsApp flow creates order record)
CREATE POLICY "Anyone can create orders" ON orders
  FOR INSERT WITH CHECK (true);

-- Only admin can view/update orders
CREATE POLICY "Admin can manage orders" ON orders
  FOR ALL USING (auth.role() = 'authenticated');

-- Sample products
INSERT INTO products (name, slug, description, price, category, images, in_stock, is_new, is_featured, material) VALUES
('Celestial Ring', 'celestial-ring', 'A stunning gold ring with a celestial design, perfect for everyday elegance.', 4500, 'rings', ARRAY['https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800'], true, true, true, '18K Gold Plated'),
('Bloom Necklace', 'bloom-necklace', 'Delicate floral pendant necklace that adds a touch of nature to any outfit.', 6500, 'necklaces', ARRAY['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800'], true, false, true, 'Sterling Silver'),
('Pearl Drop Earrings', 'pearl-drop-earrings', 'Classic freshwater pearl drop earrings for timeless sophistication.', 3800, 'earrings', ARRAY['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800'], true, true, false, 'Freshwater Pearl'),
('Gold Bangle Set', 'gold-bangle-set', 'Set of 3 stackable gold bangles — wear them together or mix and match.', 5200, 'bracelets', ARRAY['https://images.unsplash.com/photo-1573408301185-9519f94de4a4?w=800'], true, false, true, '18K Gold Plated'),
('Lunar Watch', 'lunar-watch', 'Elegant timepiece with a mother-of-pearl dial and gold-tone case.', 18500, 'watches', ARRAY['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800'], true, true, true, 'Stainless Steel / MOP'),
('Layered Anklet', 'layered-anklet', 'Dainty layered anklet with tiny star charms — beach to brunch.', 2800, 'anklets', ARRAY['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800'], true, false, false, 'Gold Plated');
