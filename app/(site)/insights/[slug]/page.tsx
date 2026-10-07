import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductImage } from '@/components/catalogue/product-image';
import { Markdown } from '@/components/insights/markdown';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Container } from '@/components/layout/container';
import { JsonLd } from '@/components/layout/json-ld';
import { getPublishedCatalogue } from '@/lib/catalogue';
import { pageMeta } from '@/lib/seo';
import { COMPANY, formatDate, siteOrigin } from '@/lib/site';

export const revalidate = 60;

export async function generateStaticParams() {
  const { posts } = await getPublishedCatalogue();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { posts } = await getPublishedCatalogue();
  const post = posts.find((item) => item.slug === slug);
  if (!post) return { title: 'Insight' };
  return pageMeta({
    title: post.title,
    description: post.excerpt,
    path: `/insights/${post.slug}`,
    type: 'article',
    ...(post.imageUrl ? { image: { url: post.imageUrl, alt: post.title } } : {}),
  });
}

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { posts } = await getPublishedCatalogue();
  const post = posts.find((item) => item.slug === slug);
  if (!post) notFound();
  const path = `/insights/${post.slug}`;
  const origin = siteOrigin();

  return (
    <article>
      <Container className="py-16 sm:py-20">
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: 'Insights', path: '/insights' },
            { name: post.title, path },
          ]}
        />
        <h1 className="ds-h1 max-w-3xl">{post.title}</h1>
        <p className="ds-small mt-4">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        </p>
        {post.imageUrl ? (
          <div className="mt-8 max-w-3xl">
            <ProductImage name={post.title} imageUrl={post.imageUrl} variant="detail" priority />
          </div>
        ) : null}
        <div className="mt-8 max-w-3xl">
          <Markdown>{post.body}</Markdown>
        </div>
      </Container>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.title,
          description: post.excerpt,
          datePublished: post.publishedAt,
          ...(origin ? { mainEntityOfPage: `${origin}${path}` } : {}),
          author: { '@type': 'Organization', name: COMPANY },
          publisher: { '@type': 'Organization', name: COMPANY },
        }}
      />
    </article>
  );
}
