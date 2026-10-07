import { notFound, permanentRedirect } from 'next/navigation';
import { getProductBySlug, productPath } from '@/lib/products';

export default async function LegacyProductPath({ params }: { params: Promise<{ slug: string; legacy: string }> }) {
  const { legacy } = await params;
  const product = await getProductBySlug(legacy);
  if (!product) notFound();
  permanentRedirect(productPath(product));
}
