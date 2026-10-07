import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DeleteButton } from '@/components/admin/delete-button';
import { AdminError, DatabaseRequired } from '@/components/admin/database-required';
import { PostForm } from '@/components/admin/post-form';
import { loadAdmin } from '@/lib/admin';
import { databaseConfigured } from '@/lib/db';
import { getAdminPost } from '@/lib/queries';

export default async function EditInsightPage({ params }: { params: Promise<{ id: string }> }) {
  if (!databaseConfigured()) {
    return (
      <DatabaseRequired>
        <span />
      </DatabaseRequired>
    );
  }
  const { id } = await params;
  const result = await loadAdmin(() => getAdminPost(id));
  if (!result.ok) return <AdminError message={result.error} />;
  if (!result.data) notFound();
  const post = result.data;

  return (
    <div>
      <h1 className="font-serif text-4xl text-navy">Edit insight</h1>
      {post.published ? (
        <p className="mt-3">
          <Link className="text-sm font-semibold text-gold-deep hover:text-navy" href={`/insights/${post.slug}`}>
            View public page
          </Link>
        </p>
      ) : null}
      <div className="mt-8">
        <PostForm post={post} />
      </div>
      <div className="mt-10 border-t border-line pt-6">
        <DeleteButton
          url={`/api/admin/posts/${post.id}`}
          confirm={`Delete ${post.title}? This cannot be undone.`}
          redirectTo="/admin/insights"
        />
      </div>
    </div>
  );
}
