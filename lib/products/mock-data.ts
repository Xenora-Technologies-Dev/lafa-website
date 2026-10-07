import productData from '@/data/products.json';
import { seedCategories } from '@/lib/categories';
import { toProductCategory } from '@/lib/products/category-meta';
import type { Product, ProductCategory } from '@/lib/products/types';

type SeedProduct = {
  id: string;
  name: string;
  slug: string;
  category: string;
  shortDescription: string;
  description: string;
  image: { src: string; alt: string } | null;
  gallery: { src: string; alt: string }[];
  origin: string | null;
  packaging: string | null;
  availability: string | null;
  exportAvailable: boolean | null;
  featured: boolean;
  status: 'published' | 'draft';
  seoTitle: string | null;
  seoDescription: string | null;
  createdAt: string;
  updatedAt: string;
};

/**
 * Curated public catalogue shipped with the site.
 * Uses local photographs in /public/images/home so the brochure looks complete
 * without Neon or ImageKit. Admin/Neon can override when published products exist.
 */
export function staticProductCategories(): ProductCategory[] {
  return seedCategories
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

export function staticProducts(): Product[] {
  return (productData as SeedProduct[])
    .filter((product) => product.status === 'published')
    .map((product) => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      category: product.category,
      shortDescription: product.shortDescription,
      description: product.description,
      image: product.image,
      gallery: product.gallery ?? [],
      origin: product.origin,
      packaging: product.packaging,
      availability: product.availability,
      exportAvailable: product.exportAvailable,
      featured: Boolean(product.featured),
      status: product.status,
      seoTitle: product.seoTitle,
      seoDescription: product.seoDescription,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }))
    .sort((a, b) => a.name.localeCompare(b.name, 'en'));
}
