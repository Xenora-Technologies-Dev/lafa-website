import { revalidatePath, revalidateTag, unstable_cache } from 'next/cache';
import postData from '@/data/posts.json';
import { seedCategories } from '@/lib/categories';
import { databaseConfigured } from '@/lib/db';
import { queryPublishedSnapshot } from '@/lib/queries';
import type { Catalogue, Post } from '@/lib/types';

type SeedPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  image?: { src: string; alt: string } | null;
  publishedAt: string;
  published: boolean;
  createdAt?: string;
  updatedAt?: string;
};

function staticPosts(): Post[] {
  return (postData as SeedPost[])
    .filter((post) => post.published)
    .map((post) => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      body: post.body,
      imageUrl: post.image?.src,
      publishedAt: post.publishedAt,
      published: true,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    }))
    .sort((a, b) => String(b.publishedAt || '').localeCompare(String(a.publishedAt || '')));
}

function fallbackCatalogue(): Catalogue {
  return {
    categories: seedCategories,
    products: [],
    posts: staticPosts(),
  };
}

async function loadPublishedCatalogue(): Promise<Catalogue> {
  if (!databaseConfigured()) return fallbackCatalogue();
  try {
    const snapshot = await queryPublishedSnapshot();
    if (snapshot.categories.length === 0 && snapshot.posts.length === 0) return fallbackCatalogue();
    return {
      categories: snapshot.categories.length > 0 ? snapshot.categories : seedCategories,
      products: snapshot.products,
      posts: snapshot.posts.length > 0 ? snapshot.posts : staticPosts(),
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`Published catalogue could not be loaded (${message}). Showing curated static content.`);
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
