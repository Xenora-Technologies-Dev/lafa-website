import { revalidatePath, revalidateTag, unstable_cache } from 'next/cache';
import { seedCategories } from '@/lib/categories';
import { databaseConfigured } from '@/lib/db';
import { queryPublishedSnapshot } from '@/lib/queries';
import type { Catalogue } from '@/lib/types';

function fallbackCatalogue(): Catalogue {
  return {
    categories: seedCategories,
    products: [],
    posts: [],
  };
}

async function loadPublishedCatalogue(): Promise<Catalogue> {
  if (!databaseConfigured()) return fallbackCatalogue();
  try {
    const snapshot = await queryPublishedSnapshot();
    if (snapshot.categories.length === 0) return fallbackCatalogue();
    return snapshot;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`Published catalogue could not be loaded (${message}). Showing the licensed category list.`);
    return fallbackCatalogue();
  }
}

export const getPublishedCatalogue = unstable_cache(loadPublishedCatalogue, ['published-catalogue'], {
  revalidate: 60,
  tags: ['catalogue'],
});

export function refreshPublicContent() {
  revalidateTag('catalogue');
  revalidatePath('/', 'layout');
}
