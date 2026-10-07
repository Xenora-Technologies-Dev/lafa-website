import Link from 'next/link';
import { productListHref } from '@/lib/products';
import type { ProductCategory } from '@/lib/products/types';

export function ProductFilters({
  categories,
  category,
  q,
}: {
  categories: ProductCategory[];
  category: string | null;
  q: string;
}) {
  return (
    <div className="mt-10 grid gap-8">
      <form action="/products" method="get" role="search" className="flex flex-col gap-3 sm:flex-row sm:items-end">
        {category ? <input type="hidden" name="category" value={category} /> : null}
        <div className="min-w-0 flex-1">
          <label className="ds-label" htmlFor="product-search">
            Search
          </label>
          <input
            id="product-search"
            name="q"
            type="search"
            defaultValue={q}
            placeholder="Product or category"
            className="ds-control mt-2"
          />
        </div>
        <button type="submit" className="ds-btn ds-button">
          Search
        </button>
      </form>
      <nav aria-label="Product categories">
        <ul className="ds-chip-row">
          <li className="shrink-0">
            <Link
              href={productListHref({ q })}
              aria-current={category ? undefined : 'page'}
              className="ds-small font-semibold text-navy aria-[current=page]:shadow-[inset_0_-2px_0_var(--ds-gold)]"
            >
              All
            </Link>
          </li>
          {categories.map((item) => (
            <li key={item.slug} className="shrink-0">
              <Link
                href={productListHref({ category: item.slug, q })}
                aria-current={category === item.slug ? 'page' : undefined}
                className="ds-small text-navy aria-[current=page]:font-semibold aria-[current=page]:shadow-[inset_0_-2px_0_var(--ds-gold)]"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
