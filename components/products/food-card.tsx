import Link from 'next/link';
import { AddToEnquiry } from '@/components/contact/enquiry-list';
import { OpenContactButton } from '@/components/contact/open-contact-button';
import { ImageBlock } from '@/components/system/image-block';
export type FoodCardModel = {
  id: string;
  name: string;
  slug: string;
  categorySlug: string;
  categoryTitle?: string;
  shortDescription: string;
  imageUrl: string | null;
  imageAlt: string;
};

export function FoodCardView({ product }: { product: FoodCardModel }) {
  return (
    <article className="food-card ds-card flex h-full flex-col border border-line bg-paper">
      <Link href={`/products/${product.slug}`} className="block focus-visible:outline-offset-0">
        <ImageBlock src={product.imageUrl} alt={product.imageAlt} fit="cover" sizes="(min-width: 1024px) 22rem, (min-width: 640px) 50vw, 100vw" />
      </Link>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {product.categoryTitle ? <p className="ds-label">{product.categoryTitle}</p> : null}
        <h3 className="ds-h3 mt-2">
          <Link href={`/products/${product.slug}`} className="hover:text-navy-soft">
            {product.name}
          </Link>
        </h3>
        <p className="ds-small mt-2 line-clamp-3">{product.shortDescription}</p>
        <div className="mt-5 flex flex-col gap-2">
          <Link href={`/products/${product.slug}`} className="ds-btn ds-btn-sm ds-button w-full">
            View details
          </Link>
          <div className="flex flex-col gap-2 min-[420px]:flex-row">
            <OpenContactButton
              className="ds-btn ds-btn-wa ds-btn-sm ds-button w-full min-[420px]:w-auto"
              label="WhatsApp"
              division="food"
              subject={product.name}
            />
            <AddToEnquiry name={product.name} />
          </div>
        </div>
      </div>
    </article>
  );
}
