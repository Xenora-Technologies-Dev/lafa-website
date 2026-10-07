import { getSql } from '@/lib/db';
import type { Category, CategoryInput, Enquiry, EnquiryInput, Post, PostInput, Product, ProductInput } from '@/lib/types';

type CategoryRow = {
  id: string;
  title: string;
  slug: string;
  description: string;
  sort_order: number | string;
  weight: string;
  licence_code?: string | null;
  product_count?: number | string | null;
};

type ProductRow = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url?: string | null;
  image_file_id?: string | null;
  pack_size?: string | null;
  origin?: string | null;
  category_id: string;
  category_slug: string;
  category_title: string;
  published: boolean;
  created_at?: string | Date | null;
  updated_at?: string | Date | null;
};

type PostRow = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  image_url?: string | null;
  image_file_id?: string | null;
  published_at?: string | Date | null;
  published: boolean;
  created_at?: string | Date | null;
  updated_at?: string | Date | null;
};

type EnquiryRow = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone?: string | null;
  market?: string | null;
  interest?: string | null;
  message: string;
  created_at: string | Date;
};

function optional(value: string | null | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function timestamp(value: string | Date | null | undefined) {
  if (!value) return undefined;
  if (value instanceof Date) return value.toISOString();
  return String(value);
}

function mapCategory(row: CategoryRow, includeLicence: boolean): Category {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    description: row.description,
    sortOrder: Number(row.sort_order) || 0,
    weight: row.weight === 'secondary' ? 'secondary' : 'primary',
    licenceCode: includeLicence ? optional(row.licence_code) : undefined,
    productCount: Number(row.product_count ?? 0),
  };
}

function mapProduct(row: ProductRow, includeFile: boolean): Product {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    imageUrl: optional(row.image_url),
    imageFileId: includeFile ? optional(row.image_file_id) : undefined,
    packSize: optional(row.pack_size),
    origin: optional(row.origin),
    categoryId: row.category_id,
    categorySlug: row.category_slug,
    categoryTitle: row.category_title,
    published: Boolean(row.published),
    createdAt: timestamp(row.created_at),
    updatedAt: timestamp(row.updated_at),
  };
}

function mapPost(row: PostRow, includeFile: boolean): Post {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    body: row.body,
    imageUrl: optional(row.image_url),
    imageFileId: includeFile ? optional(row.image_file_id) : undefined,
    publishedAt: timestamp(row.published_at),
    published: Boolean(row.published),
    createdAt: timestamp(row.created_at),
    updatedAt: timestamp(row.updated_at),
  };
}

function requireSql() {
  const sql = getSql();
  if (!sql) throw new Error('DATABASE_URL is not set');
  return sql;
}

export async function queryPublishedSnapshot() {
  const sql = requireSql();
  const [categories, products, posts] = await Promise.all([
    sql`SELECT c.id, c.title, c.slug, c.description, c.sort_order, c.weight,
               COUNT(p.id) FILTER (WHERE p.published = true) AS product_count
        FROM categories c
        LEFT JOIN products p ON p.category_id = c.id
        GROUP BY c.id
        ORDER BY c.sort_order ASC, c.title ASC`,
    sql`SELECT p.id, p.name, p.slug, p.description, p.image_url, p.pack_size, p.origin,
               p.published, p.category_id, c.slug AS category_slug, c.title AS category_title
        FROM products p
        JOIN categories c ON c.id = p.category_id
        WHERE p.published = true
        ORDER BY p.name ASC`,
    sql`SELECT id, title, slug, excerpt, body, image_url, published_at, published
        FROM posts
        WHERE published = true
        ORDER BY published_at DESC NULLS LAST, title ASC`,
  ]);
  return {
    categories: (categories as CategoryRow[]).map((row) => mapCategory(row, false)),
    products: (products as ProductRow[]).map((row) => mapProduct(row, false)),
    posts: (posts as PostRow[]).map((row) => mapPost(row, false)),
  };
}

export async function listAdminCategories() {
  const sql = requireSql();
  const rows = (await sql`SELECT c.id, c.title, c.slug, c.description, c.sort_order, c.weight, c.licence_code,
                                  COUNT(p.id) AS product_count
                           FROM categories c
                           LEFT JOIN products p ON p.category_id = c.id
                           GROUP BY c.id
                           ORDER BY c.sort_order ASC, c.title ASC`) as CategoryRow[];
  return rows.map((row) => mapCategory(row, true));
}

export async function listAdminProducts() {
  const sql = requireSql();
  const rows = (await sql`SELECT p.id, p.name, p.slug, p.description, p.image_url, p.image_file_id, p.pack_size, p.origin,
                                  p.published, p.category_id, p.created_at, p.updated_at,
                                  c.slug AS category_slug, c.title AS category_title
                           FROM products p
                           JOIN categories c ON c.id = p.category_id
                           ORDER BY p.updated_at DESC`) as ProductRow[];
  return rows.map((row) => mapProduct(row, true));
}

export async function getAdminProduct(id: string) {
  const sql = requireSql();
  const rows = (await sql`SELECT p.id, p.name, p.slug, p.description, p.image_url, p.image_file_id, p.pack_size, p.origin,
                                  p.published, p.category_id, p.created_at, p.updated_at,
                                  c.slug AS category_slug, c.title AS category_title
                           FROM products p
                           JOIN categories c ON c.id = p.category_id
                           WHERE p.id = ${id}
                           LIMIT 1`) as ProductRow[];
  return rows[0] ? mapProduct(rows[0], true) : null;
}

export async function productSlugTaken(categoryId: string, slug: string, exceptId?: string) {
  const sql = requireSql();
  const rows = (await sql`SELECT id FROM products WHERE category_id = ${categoryId} AND slug = ${slug}`) as { id: string }[];
  return rows.some((row) => row.id !== exceptId);
}

export async function categoryExists(id: string) {
  const sql = requireSql();
  const rows = (await sql`SELECT id FROM categories WHERE id = ${id} LIMIT 1`) as { id: string }[];
  return rows.length > 0;
}

export async function insertProduct(id: string, input: ProductInput) {
  const sql = requireSql();
  await sql`INSERT INTO products
              (id, name, slug, description, image_url, image_file_id, pack_size, origin, category_id, published)
            VALUES
              (${id}, ${input.name}, ${input.slug}, ${input.description}, ${input.imageUrl}, ${input.imageFileId},
               ${input.packSize}, ${input.origin}, ${input.categoryId}, ${input.published})`;
}

export async function updateProduct(id: string, input: ProductInput) {
  const sql = requireSql();
  const rows = (await sql`UPDATE products SET
                name = ${input.name},
                slug = ${input.slug},
                description = ${input.description},
                image_url = ${input.imageUrl},
                image_file_id = ${input.imageFileId},
                pack_size = ${input.packSize},
                origin = ${input.origin},
                category_id = ${input.categoryId},
                published = ${input.published},
                updated_at = NOW()
              WHERE id = ${id}
              RETURNING id`) as { id: string }[];
  return rows.length > 0;
}

export async function deleteProduct(id: string) {
  const sql = requireSql();
  const rows = (await sql`DELETE FROM products WHERE id = ${id} RETURNING image_file_id`) as { image_file_id: string | null }[];
  return rows[0]?.image_file_id ?? null;
}

export async function listAdminPosts() {
  const sql = requireSql();
  const rows = (await sql`SELECT id, title, slug, excerpt, body, image_url, image_file_id, published_at, published, created_at, updated_at
                           FROM posts
                           ORDER BY COALESCE(published_at, updated_at) DESC`) as PostRow[];
  return rows.map((row) => mapPost(row, true));
}

export async function getAdminPost(id: string) {
  const sql = requireSql();
  const rows = (await sql`SELECT id, title, slug, excerpt, body, image_url, image_file_id, published_at, published, created_at, updated_at
                           FROM posts WHERE id = ${id} LIMIT 1`) as PostRow[];
  return rows[0] ? mapPost(rows[0], true) : null;
}

export async function postSlugTaken(slug: string, exceptId?: string) {
  const sql = requireSql();
  const rows = (await sql`SELECT id FROM posts WHERE slug = ${slug}`) as { id: string }[];
  return rows.some((row) => row.id !== exceptId);
}

export async function insertPost(id: string, input: PostInput) {
  const sql = requireSql();
  await sql`INSERT INTO posts
              (id, title, slug, excerpt, body, image_url, image_file_id, published_at, published)
            VALUES
              (${id}, ${input.title}, ${input.slug}, ${input.excerpt}, ${input.body}, ${input.imageUrl},
               ${input.imageFileId}, ${input.publishedAt}, ${input.published})`;
}

export async function updatePost(id: string, input: PostInput) {
  const sql = requireSql();
  const rows = (await sql`UPDATE posts SET
                title = ${input.title},
                slug = ${input.slug},
                excerpt = ${input.excerpt},
                body = ${input.body},
                image_url = ${input.imageUrl},
                image_file_id = ${input.imageFileId},
                published_at = ${input.publishedAt},
                published = ${input.published},
                updated_at = NOW()
              WHERE id = ${id}
              RETURNING id`) as { id: string }[];
  return rows.length > 0;
}

export async function deletePost(id: string) {
  const sql = requireSql();
  const rows = (await sql`DELETE FROM posts WHERE id = ${id} RETURNING image_file_id`) as { image_file_id: string | null }[];
  return rows[0]?.image_file_id ?? null;
}

export async function categorySlugTaken(slug: string) {
  const sql = requireSql();
  const rows = (await sql`SELECT id FROM categories WHERE slug = ${slug} LIMIT 1`) as { id: string }[];
  return rows.length > 0;
}

export async function insertCategory(id: string, input: CategoryInput) {
  const sql = requireSql();
  await sql`INSERT INTO categories (id, title, slug, description, sort_order, weight, licence_code)
            VALUES (${id}, ${input.title}, ${input.slug}, ${input.description}, ${input.sortOrder}, ${input.weight}, ${input.licenceCode})`;
}

export async function updateCategory(id: string, input: CategoryInput) {
  const sql = requireSql();
  const rows = (await sql`UPDATE categories SET
                title = ${input.title},
                description = ${input.description},
                sort_order = ${input.sortOrder},
                weight = ${input.weight},
                licence_code = ${input.licenceCode},
                updated_at = NOW()
              WHERE id = ${id}
              RETURNING id`) as { id: string }[];
  return rows.length > 0;
}

export async function categoryProductCount(id: string) {
  const sql = requireSql();
  const rows = (await sql`SELECT COUNT(*) AS count FROM products WHERE category_id = ${id}`) as { count: number | string }[];
  return Number(rows[0]?.count ?? 0);
}

export async function deleteCategory(id: string) {
  const sql = requireSql();
  const rows = (await sql`DELETE FROM categories WHERE id = ${id} RETURNING id`) as { id: string }[];
  return rows.length > 0;
}

export async function insertEnquiry(id: string, input: EnquiryInput) {
  const sql = requireSql();
  await sql`INSERT INTO enquiries (id, name, company, email, phone, market, interest, message)
            VALUES (${id}, ${input.name}, ${input.company}, ${input.email}, ${input.phone}, ${input.market}, ${input.interest}, ${input.message})`;
}

export async function listEnquiries() {
  const sql = requireSql();
  const rows = (await sql`SELECT id, name, company, email, phone, market, interest, message, created_at
                           FROM enquiries
                           ORDER BY created_at DESC
                           LIMIT 200`) as EnquiryRow[];
  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    company: row.company,
    email: row.email,
    phone: optional(row.phone),
    market: optional(row.market),
    interest: optional(row.interest),
    message: row.message,
    createdAt: timestamp(row.created_at) || '',
  })) satisfies Enquiry[];
}

export async function adminCounts() {
  const sql = requireSql();
  const rows = (await sql`SELECT
      (SELECT COUNT(*) FROM categories) AS categories,
      (SELECT COUNT(*) FROM products WHERE published = true) AS published_products,
      (SELECT COUNT(*) FROM products WHERE published = false) AS draft_products,
      (SELECT COUNT(*) FROM posts WHERE published = true) AS published_posts,
      (SELECT COUNT(*) FROM posts WHERE published = false) AS draft_posts,
      (SELECT COUNT(*) FROM enquiries) AS enquiries`) as {
    categories: number | string;
    published_products: number | string;
    draft_products: number | string;
    published_posts: number | string;
    draft_posts: number | string;
    enquiries: number | string;
  }[];
  const row = rows[0];
  return {
    categories: Number(row?.categories ?? 0),
    publishedProducts: Number(row?.published_products ?? 0),
    draftProducts: Number(row?.draft_products ?? 0),
    publishedPosts: Number(row?.published_posts ?? 0),
    draftPosts: Number(row?.draft_posts ?? 0),
    enquiries: Number(row?.enquiries ?? 0),
  };
}
