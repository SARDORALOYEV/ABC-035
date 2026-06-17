-- ============================================
-- ADMIN SETTINGS jadvali
-- ============================================
CREATE TABLE IF NOT EXISTS admin_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- ACTIVITY LOG jadvali
-- ============================================
CREATE TABLE IF NOT EXISTS activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  action TEXT NOT NULL,
  type TEXT DEFAULT 'info',
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- BRANDS jadvali
-- ============================================
CREATE TABLE IF NOT EXISTS brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT,
  logo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- MODELS jadvali
-- ============================================
CREATE TABLE IF NOT EXISTS models (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  brand_id UUID REFERENCES brands(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- ADMIN PROFILES jadvali (agar mavjud bo'lmasa)
-- ============================================
CREATE TABLE IF NOT EXISTS admin_profiles (
  id UUID PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  phone TEXT DEFAULT '',
  bio TEXT DEFAULT '',
  avatar_url TEXT DEFAULT '',
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- DEFAULT SOZLAMALAR
-- ============================================
INSERT INTO admin_settings (key, value) VALUES
  ('site_name', 'ABC Auto'),
  ('site_language', 'uz'),
  ('currency', 'UZS'),
  ('items_per_page', '20'),
  ('meta_title', 'ABC Auto - Avtomobillar'),
  ('meta_description', 'O''zbekistondagi eng yirik avtomobil platformasi'),
  ('canonical_url', 'https://abc-auto.uz'),
  ('storage_provider', 'supabase'),
  ('image_quality', '80'),
  ('max_file_size', '5'),
  ('two_factor_auth', 'false'),
  ('session_timeout', '4'),
  ('ip_blocking', 'false'),
  ('notify_new_order', 'true'),
  ('notify_new_user', 'true'),
  ('email_reports', 'false'),
  ('color_scheme', 'platinum'),
  ('font_size', 'medium'),
  ('sidebar_collapsed', 'false')
ON CONFLICT (key) DO NOTHING;
