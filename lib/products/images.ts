import type { ProductImage } from '@/lib/products/types';

/**
 * Image fields are URL strings. Local files and ImageKit URLs both pass through.
 * Product components receive `src` and `alt` only.
 */
export function imageSrc(image: ProductImage | null | undefined) {
  const src = image?.src?.trim();
  return src || null;
}

export function imageAlt(image: ProductImage | null | undefined, fallback: string) {
  const alt = image?.alt?.trim();
  return alt || fallback;
}
