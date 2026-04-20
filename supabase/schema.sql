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

DROP POLICY IF EXISTS "Anyone can read active products" ON products;
DROP POLICY IF EXISTS "Admin full access products" ON products;
DROP POLICY IF EXISTS "Admin full access credentials" ON admin_credentials;

-- Public can only see active products
CREATE POLICY "Anyone can read active products"
  ON products FOR SELECT
  USING (is_active = true);

-- Admin writes now go through Next.js server routes using the service role key.
-- Keep RLS strict here; the service role bypasses policies safely server-side.

-- ============================================
-- Blog Posts table
-- ============================================
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  slug text UNIQUE NOT NULL,
  legacy_slugs text[] DEFAULT '{}',
  meta_description text DEFAULT '',
  og_image text DEFAULT '',
  content_html text NOT NULL DEFAULT '',
  published boolean NOT NULL DEFAULT false,
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

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

CREATE TRIGGER set_blog_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS for blog_posts
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read published blog posts" ON blog_posts;
CREATE POLICY "Anyone can read published blog posts"
  ON blog_posts FOR SELECT
  USING (published = true);
