import { unstable_cache } from 'next/cache';
import { databaseConfigured } from '@/lib/db';
import { legacyCategorySlugs, legacyProductSlugs, toProductCategory } from '@/lib/products/category-meta';
import { staticProductCategories, staticProducts } from '@/lib/products/mock-data';
import type { Product, ProductCategory, ProductListResult, ProductQuery } from '@/lib/products/types';
import { queryPublishedSnapshot } from '@/lib/queries';
import type { Category, Product as DbProduct } from '@/lib/types';

export const PRODUCT_PAGE_SIZE = 12;

function shortDescription(description: string) {
  const trimmed = description.replace(/\s+/g, ' ').trim();
  if (trimmed.length <= 160) return trimmed;
  const cut = trimmed.slice(0, 157);
  const boundary = cut.lastIndexOf(' ');
  return `${(boundary > 80 ? cut.slice(0, boundary) : cut).trim()}…`;
}

function mapDbProduct(row: DbProduct): Product {
  const stamp = row.updatedAt || row.createdAt || new Date(0).toISOString();
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    category: row.categorySlug,
    shortDescription: shortDescription(row.description),
    description: row.description,
    image: row.imageUrl ? { src: row.imageUrl, alt: row.name } : null,
    gallery: [],
    origin: row.origin ?? null,
    packaging: row.packSize ?? null,
    availability: null,
    exportAvailable: null,
    featured: false,
    status: row.published ? 'published' : 'draft',
    seoTitle: null,
    seoDescription: null,
    createdAt: row.createdAt || stamp,
    updatedAt: stamp,
  };
}

function mapCategories(categories: Category[]): ProductCategory[] {
  return categories
    .slice()
    .sort((a, b) => a.sortOrder - b.sortOrder || a.title.localeCompare(b.title, 'en'))
    .map((category) =>
      toProductCategory({
        id: category.id,
        title: category.title,
        slug: category.slug,
        description: category.description,
      }),
    );
}

function offlineCatalogue(): { categories: ProductCategory[]; products: Product[] } {
  return {
    categories: staticProductCategories(),
    products: staticProducts(),
  };
}

async function loadCatalogueSource(): Promise<{ categories: ProductCategory[]; products: Product[] }> {
  if (!databaseConfigured()) return offlineCatalogue();
  try {
    const snapshot = await queryPublishedSnapshot();
    const products = snapshot.products
      .filter((product) => product.published)
      .map(mapDbProduct)
      .sort((a, b) => a.name.localeCompare(b.name, 'en'));

    // Prefer Neon only when it actually has published products.
    // Otherwise keep the curated static catalogue so the public site stays complete.
    if (products.length === 0) return offlineCatalogue();

    const categories =
      snapshot.categories.length > 0 ? mapCategories(snapshot.categories) : staticProductCategories();
    return { categories, products };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`Public catalogue could not be loaded (${message}). Using the curated static catalogue.`);
    return offlineCatalogue();
  }
}

const getCatalogueSource = unstable_cache(loadCatalogueSource, ['public-product-catalogue'], {
  revalidate: 60,
  tags: ['catalogue'],
});

/**
 * Public catalogue data access.
 * Without Neon (or when Neon has no published products), the curated static
 * catalogue in data/products.json is used with local images from /public.
 */
export async function listProductCategories(): Promise<ProductCategory[]> {
  const { categories } = await getCatalogueSource();
  return categories;
}

export async function getProductCategory(slug: string): Promise<ProductCategory | null> {
  const canonical = await resolveCategorySlug(slug);
  if (!canonical) return null;
  const { categories } = await getCatalogueSource();
  return categories.find((category) => category.slug === canonical) ?? null;
}

async function resolveCategorySlug(slug: string) {
  const value = slug.trim().toLowerCase();
  if (!value) return null;
  const { categories } = await getCatalogueSource();
  if (categories.some((category) => category.slug === value)) return value;
  const legacy = legacyCategorySlugs[value];
  if (legacy && categories.some((category) => category.slug === legacy)) return legacy;
  return null;
}

export async function canonicalCategorySlug(slug: string) {
  return resolveCategorySlug(slug);
}

export async function queryProducts(input: ProductQuery = {}): Promise<ProductListResult> {
  const q = (input.q ?? '').trim().slice(0, 80);
  const requestedSlug = (input.category ?? '').trim().toLowerCase();
  const { categories, products: published } = await getCatalogueSource();
  const categorySlug = requestedSlug ? await resolveCategorySlug(requestedSlug) : null;
  const unknownCategory = Boolean(requestedSlug) && !categorySlug;
  const requestedPage = Number.parseInt(input.page ?? '1', 10);
  const needle = q.toLowerCase();

  let items = published;
  if (unknownCategory) items = [];
  else if (categorySlug) items = items.filter((product) => product.category === categorySlug);
  if (needle) {
    items = items.filter((product) => {
      const categoryTitle = categories.find((category) => category.slug === product.category)?.title ?? '';
      const haystack = `${product.name} ${product.shortDescription} ${categoryTitle}`.toLowerCase();
      return haystack.includes(needle);
    });
  }

  const total = items.length;
  const pageCount = Math.max(1, Math.ceil(total / PRODUCT_PAGE_SIZE));
  const page = Math.min(Math.max(Number.isFinite(requestedPage) ? requestedPage : 1, 1), pageCount);
  const start = (page - 1) * PRODUCT_PAGE_SIZE;

  return {
    products: items.slice(start, start + PRODUCT_PAGE_SIZE),
    total,
    page,
    pageCount,
    pageSize: PRODUCT_PAGE_SIZE,
    q,
    category: categorySlug ? (categories.find((category) => category.slug === categorySlug) ?? null) : null,
    unknownCategory,
  };
}

export function canonicalProductSlug(slug: string) {
  const value = slug.trim().toLowerCase();
  return legacyProductSlugs[value] ?? value;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const value = canonicalProductSlug(slug);
  const { products } = await getCatalogueSource();
  return products.find((product) => product.slug === value) ?? null;
}

export async function listRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  const { products } = await getCatalogueSource();
  return products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, limit);
}

export async function listFeaturedProducts(limit = 4): Promise<Product[]> {
  const { products } = await getCatalogueSource();
  const featured = products.filter((product) => product.featured);
  return (featured.length ? featured : products).slice(0, limit);
}

export async function listPublishedProducts(): Promise<Product[]> {
  const { products } = await getCatalogueSource();
  return products;
}

export function productPath(product: Product) {
  return `/products/${product.slug}`;
}

export function productListHref(query: { category?: string | null; q?: string | null; page?: number | null }) {
  const params = new URLSearchParams();
  const page = query.page && query.page > 1 ? query.page : null;
  if (query.q) params.set('q', query.q);
  if (page) params.set('page', String(page));
  if (query.category && !query.q && !page) return `/products/${query.category}`;
  if (query.category && (query.q || page)) params.set('category', query.category);
  const search = params.toString();
  return search ? `/products?${search}` : '/products';
}

export function specificationValue(value: string | null) {
  return value?.trim() || 'Confirmed on enquiry';
}

export function exportAvailabilityLabel(value: boolean | null) {
  if (value === true) return 'Offered for export';
  if (value === false) return 'Not offered for export';
  return 'Confirmed on enquiry';
}
