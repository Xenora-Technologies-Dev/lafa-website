import Link from 'next/link';
import { AdminError, DatabaseRequired } from '@/components/admin/database-required';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { loadAdmin } from '@/lib/admin';
import { databaseConfigured } from '@/lib/db';
import { listAdminProducts } from '@/lib/queries';

export default async function AdminProductsPage() {
  if (!databaseConfigured()) {
    return (
      <div>
        <h1 className="font-serif text-4xl text-navy">Products</h1>
        <div className="mt-6">
          <DatabaseRequired>
            <span />
          </DatabaseRequired>
        </div>
      </div>
    );
  }

  const result = await loadAdmin(() => listAdminProducts());

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="font-serif text-4xl text-navy">Products</h1>
        <Button asChild>
          <Link href="/admin/products/new">New product</Link>
        </Button>
      </div>
      {!result.ok ? (
        <div className="mt-6">
          <AdminError message={result.error} />
        </div>
      ) : result.data.length === 0 ? (
        <p className="mt-8 max-w-xl text-sm leading-6 text-stone">No products yet. A draft can be saved before a photograph is ready.</p>
      ) : (
        <ul className="mt-8 divide-y divide-line border-y border-line bg-white">
          {result.data.map((product) => (
            <li key={product.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-4">
              <div>
                <Link href={`/admin/products/${product.id}`} className="font-semibold text-navy hover:text-gold-deep">
                  {product.name}
                </Link>
                <p className="mt-1 text-sm text-stone">{product.categoryTitle}</p>
              </div>
              <Badge variant={product.published ? 'default' : 'outline'}>{product.published ? 'Published' : 'Draft'}</Badge>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
