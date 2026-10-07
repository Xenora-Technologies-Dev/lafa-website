import { AdminError, DatabaseRequired } from '@/components/admin/database-required';
import { ProductForm } from '@/components/admin/product-form';
import { loadAdmin } from '@/lib/admin';
import { databaseConfigured } from '@/lib/db';
import { listAdminCategories } from '@/lib/queries';

export default async function NewProductPage() {
  if (!databaseConfigured()) {
    return (
      <DatabaseRequired>
        <span />
      </DatabaseRequired>
    );
  }
  const result = await loadAdmin(() => listAdminCategories());
  return (
    <div>
      <h1 className="font-serif text-4xl text-navy">New product</h1>
      {!result.ok ? (
        <div className="mt-6">
          <AdminError message={result.error} />
        </div>
      ) : result.data.length === 0 ? (
        <p className="mt-6 max-w-xl text-sm leading-6 text-stone">
          Add categories first. Run <code>npm run db:setup</code> to load the licensed list.
        </p>
      ) : (
        <div className="mt-8">
          <ProductForm categories={result.data} />
        </div>
      )}
    </div>
  );
}
