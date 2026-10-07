import Link from 'next/link';
import { AdminError, DatabaseRequired } from '@/components/admin/database-required';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { loadAdmin } from '@/lib/admin';
import { databaseConfigured } from '@/lib/db';
import { listAdminPosts } from '@/lib/queries';
import { formatDate } from '@/lib/site';

export default async function AdminInsightsPage() {
  if (!databaseConfigured()) {
    return (
      <div>
        <h1 className="mb-6 font-serif text-4xl text-navy">Insights</h1>
        <DatabaseRequired>
          <span />
        </DatabaseRequired>
      </div>
    );
  }
  const result = await loadAdmin(() => listAdminPosts());
  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="font-serif text-4xl text-navy">Insights</h1>
        <Button asChild>
          <Link href="/admin/insights/new">New insight</Link>
        </Button>
      </div>
      {!result.ok ? (
        <div className="mt-6">
          <AdminError message={result.error} />
        </div>
      ) : result.data.length === 0 ? (
        <p className="mt-8 text-sm text-stone">No insights yet.</p>
      ) : (
        <ul className="mt-8 divide-y divide-line border-y border-line bg-white">
          {result.data.map((post) => (
            <li key={post.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-4">
              <div>
                <Link href={`/admin/insights/${post.id}`} className="font-semibold text-navy hover:text-gold-deep">
                  {post.title}
                </Link>
                <p className="mt-1 text-sm text-stone">{formatDate(post.publishedAt)}</p>
              </div>
              <Badge variant={post.published ? 'default' : 'outline'}>{post.published ? 'Published' : 'Draft'}</Badge>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
