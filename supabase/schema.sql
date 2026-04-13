-- ============================================
-- RioMates Supabase Schema
-- Run in Supabase Dashboard > SQL Editor
-- ============================================

-- Products table
CREATE TABLE IF NOT EXISTS products (
  slug text PRIMARY KEY,
  name text NOT NULL DEFAULT '',
  edition text NOT NULL DEFAULT '',
  price numeric NOT NULL DEFAULT 0,
  short_description text NOT NULL DEFAULT '',
  full_description text NOT NULL DEFAULT '',
  story_title text DEFAULT '',
  story text DEFAULT '',
  craft_sections jsonb DEFAULT '[]'::jsonb,
  ritual_guide jsonb DEFAULT '[]'::jsonb,
  details jsonb DEFAULT '[]'::jsonb,
  images text[] DEFAULT '{}',
  whatsapp_message text DEFAULT '',
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Admin credentials table
CREATE TABLE IF NOT EXISTS admin_credentials (
  id integer PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  password_hash text NOT NULL
);

-- Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_credentials ENABLE ROW LEVEL SECURITY;

-- Public can only see active products
CREATE POLICY "Anyone can read active products"
  ON products FOR SELECT
  USING (is_active = true);

-- Admin can do everything (we protect via page-level auth)
CREATE POLICY "Admin full access products"
  ON products FOR ALL
  USING (true);

CREATE POLICY "Admin full access credentials"
  ON admin_credentials FOR ALL
  USING (true);

-- Auto-update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
