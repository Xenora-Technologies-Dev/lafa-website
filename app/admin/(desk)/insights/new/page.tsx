import { DatabaseRequired } from '@/components/admin/database-required';
import { PostForm } from '@/components/admin/post-form';
import { databaseConfigured } from '@/lib/db';

export default function NewInsightPage() {
  if (!databaseConfigured()) {
    return (
      <DatabaseRequired>
        <span />
      </DatabaseRequired>
    );
  }
  return (
    <div>
      <h1 className="font-serif text-4xl text-navy">New insight</h1>
      <div className="mt-8">
        <PostForm />
      </div>
    </div>
  );
}
