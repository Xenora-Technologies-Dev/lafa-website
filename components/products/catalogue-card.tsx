import { ProductCard } from '@/components/system/product-card';
import { whatsappHref } from '@/lib/contact';
import { imageAlt, imageSrc, productPath } from '@/lib/products';
import { getProductCategory } from '@/lib/products/repository';
import type { Product } from '@/lib/products/types';

export async function CatalogueCard({ product }: { product: Product }) {
  const category = await getProductCategory(product.category);
  const chat = whatsappHref(product.name);
  const enquireHref = chat || `/contact?product=${encodeURIComponent(product.name)}`;
  return (
    <ProductCard
      href={productPath(product)}
      title={product.name}
      category={category?.title}
      description={product.shortDescription}
      imageUrl={imageSrc(product.image)}
      imageAlt={imageAlt(product.image, product.name)}
      imageFit="cover"
      imageSizes="(min-width: 1024px) 22rem, (min-width: 640px) 50vw, 100vw"
      enquireHref={enquireHref}
      enquireLabel={chat ? 'WhatsApp enquiry' : 'Enquire'}
      enquireExternal={Boolean(chat)}
      viewLabel="View details"
    />
  );
}
