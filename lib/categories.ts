import categoryData from '@/data/categories.json';
import type { Category, CategoryWeight } from '@/lib/types';

type SeedCategory = {
  id: string;
  title: string;
  slug: string;
  description: string;
  sortOrder: number;
  weight: CategoryWeight;
  licenceCode?: string;
};

export const FOOD_RANGE =
  'fruit and vegetables, dairy, eggs, edible oils and fats, meat, fish and seafood, sugar and confectionery, bakery, beverages, and coffee, tea, cocoa and spices';

export const seedCategories: Category[] = (categoryData as SeedCategory[]).map((category) => ({
  id: category.id,
  title: category.title,
  slug: category.slug,
  description: category.description,
  sortOrder: category.sortOrder,
  weight: category.weight === 'secondary' ? 'secondary' : 'primary',
  licenceCode: category.licenceCode,
  productCount: 0,
}));
