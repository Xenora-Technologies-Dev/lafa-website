import { CategoryManager } from '@/components/admin/category-manager';
import { AdminError, DatabaseRequired } from '@/components/admin/database-required';
import { loadAdmin } from '@/lib/admin';
import { databaseConfigured } from '@/lib/db';
import { listAdminCategories } from '@/lib/queries';

export default async function AdminCategoriesPage() {
  if (!databaseConfigured()) {
    return (
      <div>
        <h1 className="mb-6 font-serif text-4xl text-navy">Categories</h1>
        <DatabaseRequired>
          <span />
        </DatabaseRequired>
      </div>
    );
  }
  const result = await loadAdmin(() => listAdminCategories());
  return (
    <div>
      <h1 className="font-serif text-4xl text-navy">Categories</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-stone">
        Slugs are part of the public URL and are not changed after creation. Licence codes stay off the public site. A category that still has products cannot be deleted.
      </p>
      {!result.ok ? (
        <div className="mt-6">
          <AdminError message={result.error} />
        </div>
      ) : (
        <div className="mt-8">
          <CategoryManager categories={result.data} />
        </div>
      )}
    </div>
  );
}
