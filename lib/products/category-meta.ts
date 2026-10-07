import type { ProductCategory, ProductImage } from '@/lib/products/types';

/**
 * Category photographs for the public catalogue.
 * Keys are licensed slugs from data/categories.json.
 */
const CATEGORY_IMAGES: Record<string, ProductImage> = {
  'fruit-and-vegetables': {
    src: '/images/home/lafa-produce.jpg',
    alt: 'Citrus, tomatoes, herbs, and a pomegranate.',
  },
  dairy: {
    src: '/images/home/lafa-dairy.jpg',
    alt: 'Milk, cheese, and butter on marble.',
  },
  eggs: {
    src: '/images/home/lafa-eggs.jpg',
    alt: 'Brown eggs in an open tray.',
  },
  'edible-oils-and-fats': {
    src: '/images/home/lafa-oils.jpg',
    alt: 'Golden oil poured into a glass bowl.',
  },
  meat: {
    src: '/images/home/lafa-meat.jpg',
    alt: 'Cuts of beef and poultry on a marble board.',
  },
  'fish-and-seafood': {
    src: '/images/home/lafa-seafood.jpg',
    alt: 'A whole fish and prawns on ice.',
  },
  'sugar-and-confectionery': {
    src: '/images/home/lafa-sugar.jpg',
    alt: 'Raw cane sugar in a wooden scoop.',
  },
  bakery: {
    src: '/images/home/lafa-bakery.jpg',
    alt: 'A loaf and plain crackers on a wooden board.',
  },
  beverages: {
    src: '/images/home/lafa-beverages.jpg',
    alt: 'Bottles and a carafe of juice on stone.',
  },
  'coffee-tea-cocoa-spices': {
    src: '/images/home/lafa-spices.jpg',
    alt: 'Coffee beans, tea, cocoa, cinnamon, and cardamom.',
  },
  'general-wholesale': {
    src: '/images/home/lafa-other.jpg',
    alt: 'Assorted packaged goods on dark stone.',
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

export function categoryImage(slug: string): ProductImage {
  return (
    CATEGORY_IMAGES[slug] ?? {
      src: '/images/home/lafa-produce.jpg',
      alt: 'Wholesale food arranged for trade.',
    }
  );
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