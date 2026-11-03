import type { Metadata } from 'next';

const fallbackImage = {
  url: '/images/lil/lil-og-share-1200x630.jpg',
  width: 1200,
  height: 630,
  alt: 'Lil by lafa',
};

export function pageMeta({
  title,
  description,
  path,
  image,
  noindex = false,
  type = 'website',
}: {
  title: string;
  description: string;
  path: string;
  image?: { url: string; alt: string };
  noindex?: boolean;
  type?: 'website' | 'article';
}): Metadata {
  const picture = image?.url ? image : fallbackImage;
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      title,
      description,
      url: path,
      type,
      images: [picture],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [picture.url],
    },
  };
}
