import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { formatDate } from '@/lib/site';
import type { Post } from '@/lib/types';

export function InsightsPreview({ posts }: { posts: Post[] }) {
  if (!posts.length) return null;
  return (
    <section className="border-t border-line bg-white">
      <Container className="py-16 sm:py-20">
        <div className="flex items-end justify-between gap-4">
          <h2 className="ds-h2">Insights</h2>
          <Link href="/insights" className="text-sm font-semibold text-gold-deep hover:text-navy">
            All insights
          </Link>
        </div>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`/insights/${post.slug}`} className="block h-full border border-line bg-ivory p-5 hover:border-gold">
                <time className="ds-small" dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>
                <span className="ds-h3 mt-3 block">{post.title}</span>
                <span className="ds-small mt-2 block">{post.excerpt}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
