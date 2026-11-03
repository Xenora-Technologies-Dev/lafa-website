import { FoodCardView } from '@/components/products/food-card';
import { resolveCatalogueImage } from '@/lib/products/category-meta';
import { getProductCategory } from '@/lib/products/repository';
import type { Product } from '@/lib/products/types';

export async function CatalogueCard({ product }: { product: Product }) {
  const category = await getProductCategory(product.category);
  const image = resolveCatalogueImage(product.category, product.image);
  return (
    <FoodCardView
      product={{
        id: product.id,
        name: product.name,
        slug: product.slug,
        categorySlug: product.category,
        categoryTitle: category?.title,
        shortDescription: product.shortDescription,
        imageUrl: image.src,
        imageAlt: image.alt,
      }}
    />
  );
}
