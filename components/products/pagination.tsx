import Link from 'next/link';
import { productListHref } from '@/lib/products';

export function Pagination({
  page,
  pageCount,
  category,
  q,
}: {
  page: number;
  pageCount: number;
  category: string | null;
  q: string;
}) {
  if (pageCount <= 1) return null;
  const href = (next: number) => productListHref({ category, q, page: next });
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  return (
    <nav className="mt-12 flex flex-wrap items-center gap-2" aria-label="Pagination">
      {page > 1 ? (
        <Link href={href(page - 1)} rel="prev" className="ds-btn ds-btn-outline ds-btn-sm ds-button">
          Previous
        </Link>
      ) : (
        <span className="ds-btn ds-btn-outline ds-btn-sm ds-button opacity-40">Previous</span>
      )}
      <ol className="flex flex-wrap gap-2">
        {pages.map((number) => (
          <li key={number}>
            {number === page ? (
              <span aria-current="page" className="ds-btn ds-btn-sm ds-button">
                {number}
              </span>
            ) : (
              <Link href={href(number)} className="ds-btn ds-btn-outline ds-btn-sm ds-button">
                {number}
              </Link>
            )}
          </li>
        ))}
      </ol>
      {page < pageCount ? (
        <Link href={href(page + 1)} rel="next" className="ds-btn ds-btn-outline ds-btn-sm ds-button">
          Next
        </Link>
      ) : (
        <span className="ds-btn ds-btn-outline ds-btn-sm ds-button opacity-40">Next</span>
      )}
    </nav>
  );
}
