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
        <ul className="mt-12 max-w-3xl space-y-4">
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`/insights/${post.slug}`} className="block border border-line bg-white p-5 hover:border-gold">
                <time className="ds-small" dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>
                <span className="ds-h2 mt-2 block">{post.title}</span>
                <span className="ds-small mt-2 block">{post.excerpt}</span>
              </Link>
            </li>
          ))}
        </ul>
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
