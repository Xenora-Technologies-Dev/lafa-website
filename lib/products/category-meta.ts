import type { ProductCategory, ProductImage } from '@/lib/products/types';

/**
 * Category photographs for the public catalogue.
 * Keys are licensed slugs from data/categories.json.
 */
/**
 * Campaign stills for the 11 licensed food categories.
 * A product image from ImageKit or any remote URL replaces these.
 */
const CATEGORY_IMAGES: Record<string, ProductImage> = {
  'fruit-and-vegetables': {
    src: '/images/food/food-fruit-and-vegetables.webp',
    alt: 'Campaign image of fresh fruit and vegetables for food trading.',
  },
  dairy: {
    src: '/images/food/food-dairy.webp',
    alt: 'Campaign image of dairy goods arranged for wholesale supply.',
  },
  eggs: {
    src: '/images/food/food-eggs.webp',
    alt: 'Campaign image of eggs packed for food-service supply.',
  },
  'edible-oils-and-fats': {
    src: '/images/food/food-edible-oils-and-fats.webp',
    alt: 'Campaign image of edible oils prepared for trade.',
  },
  meat: {
    src: '/images/food/food-meat.webp',
    alt: 'Campaign image of meat prepared for chilled and frozen supply.',
  },
  'fish-and-seafood': {
    src: '/images/food/food-fish-and-seafood.webp',
    alt: 'Campaign image of fish and seafood on ice.',
  },
  'sugar-and-confectionery': {
    src: '/images/food/food-sugar-and-confectionery.webp',
    alt: 'Campaign image of sugar and confectionery for distributors.',
  },
  bakery: {
    src: '/images/food/food-bakery.webp',
    alt: 'Campaign image of bakery goods for wholesale trade.',
  },
  beverages: {
    src: '/images/food/food-beverages.webp',
    alt: 'Campaign image of beverages lined for wholesale buyers.',
  },
  'coffee-tea-cocoa-spices': {
    src: '/images/food/food-coffee-tea-cocoa-spices.webp',
    alt: 'Campaign image of coffee, tea, cocoa, and spices.',
  },
  'general-wholesale': {
    src: '/images/food/food-general-wholesale.webp',
    alt: 'Campaign image of packaged general wholesale goods.',
  },
};

/**
 * Previous public category slugs → licensed slugs in data/categories.json.
 * Grains, pulses, and other-food-products are omitted (not on the food licence list).
 * general-wholesale stays general-wholesale (non-food secondary), never other-food-products.
 */
export const legacyCategorySlugs: Record<string, string> = {
  dairy: 'dairy',
  'dairy-products': 'dairy',
  eggs: 'eggs',
  'eggs-egg-products': 'eggs',
  'eggs-and-egg-products': 'eggs',
  meat: 'meat',
  'meat-products': 'meat',
  'meat-and-meat-products': 'meat',
  'fish-and-seafood': 'fish-and-seafood',
  'fishery-products': 'fish-and-seafood',
  'fruit-and-vegetables': 'fruit-and-vegetables',
  'fruits-vegetables': 'fruit-and-vegetables',
  'fruits-and-vegetables': 'fruit-and-vegetables',
  'sugar-and-confectionery': 'sugar-and-confectionery',
  'sugar-sweeteners': 'sugar-and-confectionery',
  'sugar-and-sweeteners': 'sugar-and-confectionery',
  bakery: 'bakery',
  'bakery-products': 'bakery',
  beverages: 'beverages',
  'coffee-tea-cocoa-spices': 'coffee-tea-cocoa-spices',
  'coffee-tea-cocoa-and-spices': 'coffee-tea-cocoa-spices',
  'edible-oils-and-fats': 'edible-oils-and-fats',
  'edible-oils-fats': 'edible-oils-and-fats',
  'general-wholesale': 'general-wholesale',
};

export const legacyProductSlugs: Record<string, string> = {
  'white-sugar': 'refined-sugar',
};

const FALLBACK_CATEGORY_IMAGE: ProductImage = {
  src: '/images/food/food-fruit-and-vegetables.webp',
  alt: 'Campaign image of food arranged for trade.',
};

export function categoryImage(slug: string): ProductImage {
  return CATEGORY_IMAGES[slug] ?? FALLBACK_CATEGORY_IMAGE;
}

/**
 * Prefer a real product photograph (ImageKit or another remote URL).
 * Seed photos under /images/home fall back to the category campaign still.
 */
export function resolveCatalogueImage(slug: string, image?: ProductImage | null): ProductImage {
  const src = image?.src?.trim() || '';
  const remote = src.startsWith('http://') || src.startsWith('https://');
  const alreadyCampaign = src.startsWith('/images/food/') || src.startsWith('/images/lil/');
  if ((remote || alreadyCampaign) && src) {
    return { src, alt: image?.alt?.trim() || categoryImage(slug).alt };
  }
  return categoryImage(slug);
}

export function toProductCategory(input: {
  id: string;
  title: string;
  slug: string;
  description: string;
}): ProductCategory {
  return {
    id: input.id,
    title: input.title,
    slug: input.slug,
    summary: input.description,
    image: categoryImage(input.slug),
  };
}