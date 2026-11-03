import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { PageHeader } from '@/components/sections/page-header';
import { EmptyState } from '@/components/system/states';
import { getPublishedCatalogue } from '@/lib/catalogue';
import { formatDate } from '@/lib/site';
import { pageMeta } from '@/lib/seo';

export const revalidate = 60;

export const metadata: Metadata = pageMeta({
  title: 'Insights',
  description: 'Trade notes from LAFA General Trading on sourcing, wholesale supply, and import and export from Dubai.',
  path: '/insights',
});

export default async function InsightsPage() {
  const { posts } = await getPublishedCatalogue();
  return (
    <Container className="py-16 sm:py-20">
      <PageHeader
        eyebrow="Insights"
        title="Notes on trade."
        lede="Short notes on sourcing, wholesale supply, and cross-border trade from Dubai."
      />
      {posts.length ? (
        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
          {posts[0] ? (
            <Link href={`/insights/${posts[0].slug}`} className="block border border-line bg-white p-6 hover:border-gold lg:p-8">
              <p className="ds-label">Featured</p>
              <time className="ds-small mt-4 block" dateTime={posts[0].publishedAt}>
                {formatDate(posts[0].publishedAt)}
              </time>
              <span className="ds-h1 mt-3 block">{posts[0].title}</span>
              <span className="ds-body mt-4 block">{posts[0].excerpt}</span>
            </Link>
          ) : null}
          <ul className="space-y-4">
            {posts.slice(1).map((post) => (
              <li key={post.id}>
                <Link href={`/insights/${post.slug}`} className="block border border-line bg-white p-5 hover:border-gold">
                  <time className="ds-small" dateTime={post.publishedAt}>
                    {formatDate(post.publishedAt)}
                  </time>
                  <span className="ds-h3 mt-2 block">{post.title}</span>
                  <span className="ds-small mt-2 block">{post.excerpt}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="mt-12">
          <EmptyState
            title="Insights will appear here."
            text="Browse the trading range, or send an enquiry with the goods and quantity you need."
            action={
              <Link href="/products" className="ds-btn ds-button">
                Browse products
              </Link>
            }
          />
        </div>
      )}
    </Container>
  );
}
