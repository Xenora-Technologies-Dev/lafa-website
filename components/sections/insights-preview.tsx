import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { formatDate } from '@/lib/site';
import type { Post } from '@/lib/types';

export function InsightsPreview({ posts }: { posts: Post[] }) {
  if (!posts.length) return null;
  const [lead, ...rest] = posts;
  return (
    <section className="border-t border-line bg-paper">
      <Container className="ds-section">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="ds-label">07 · Insights</p>
            <h2 className="ds-h2 mt-3">Notes from the trading desk</h2>
          </div>
          <Link href="/insights" className="ds-text-link">
            All insights
          </Link>
        </div>
        <div className="mt-10 grid items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          {lead ? (
            <Link href={`/insights/${lead.slug}`} className="block border-t border-gold pt-6">
              <time className="ds-small" dateTime={lead.publishedAt}>
                {formatDate(lead.publishedAt)}
              </time>
              <span className="ds-h2 mt-3 block">{lead.title}</span>
              <span className="ds-body mt-4 block">{lead.excerpt}</span>
            </Link>
          ) : null}
          {rest.length ? (
            <ul className="ds-ledger">
              {rest.map((post, index) => (
                <li key={post.id}>
                  <p className="ds-label">{String(index + 2).padStart(2, '0')}</p>
                  <div>
                    <time className="ds-small" dateTime={post.publishedAt}>
                      {formatDate(post.publishedAt)}
                    </time>
                    <Link href={`/insights/${post.slug}`} className="ds-h3 mt-2 block hover:text-navy-soft">
                      {post.title}
                    </Link>
                    <p className="ds-small mt-2">{post.excerpt}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
