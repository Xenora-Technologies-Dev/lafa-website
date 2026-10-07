import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DeleteButton } from '@/components/admin/delete-button';
import { AdminError, DatabaseRequired } from '@/components/admin/database-required';
import { ProductForm } from '@/components/admin/product-form';
import { loadAdmin } from '@/lib/admin';
import { databaseConfigured } from '@/lib/db';
import { getAdminProduct, listAdminCategories } from '@/lib/queries';

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  if (!databaseConfigured()) {
    return (
      <DatabaseRequired>
        <span />
      </DatabaseRequired>
    );
  }
  const { id } = await params;
  const result = await loadAdmin(async () => {
    const [product, categories] = await Promise.all([getAdminProduct(id), listAdminCategories()]);
    return { product, categories };
  });
  if (!result.ok) return <AdminError message={result.error} />;
  if (!result.data.product) notFound();
  const { product, categories } = result.data;

  return (
    <div>
      <h1 className="font-serif text-4xl text-navy">Edit product</h1>
      {product.published ? (
        <p className="mt-3">
          <Link className="text-sm font-semibold text-gold-deep hover:text-navy" href={`/products/${product.slug}`}>
            View public page
          </Link>
        </p>
      ) : null}
      <div className="mt-8">
        <ProductForm categories={categories} product={product} />
      </div>
      <div className="mt-10 border-t border-line pt-6">
        <DeleteButton
          url={`/api/admin/products/${product.id}`}
          confirm={`Delete ${product.name}? This cannot be undone.`}
          redirectTo="/admin/products"
        />
      </div>
    </div>
  );
}
