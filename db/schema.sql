-- LAFA General Trading. Applied by `npm run db:setup`.
-- Idempotent. Safe to run more than once.

CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  sort_order INTEGER NOT NULL,
  weight TEXT NOT NULL CHECK (weight IN ('primary', 'secondary')),
  licence_code TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  image_file_id TEXT,
  pack_size TEXT,
  origin TEXT,
  category_id TEXT NOT NULL REFERENCES categories (id) ON DELETE RESTRICT,
  published BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (category_id, slug)
);

CREATE TABLE IF NOT EXISTS posts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  body TEXT NOT NULL,
  image_url TEXT,
  image_file_id TEXT,
  published_at TIMESTAMPTZ,
  published BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS enquiries (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  market TEXT,
  interest TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS products_category_idx ON products (category_id);
CREATE INDEX IF NOT EXISTS products_published_idx ON products (published);
CREATE INDEX IF NOT EXISTS posts_published_idx ON posts (published, published_at DESC);
CREATE INDEX IF NOT EXISTS enquiries_created_idx ON enquiries (created_at DESC);
