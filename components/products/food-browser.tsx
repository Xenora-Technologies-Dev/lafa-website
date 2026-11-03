'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Flip } from 'gsap/Flip';
import { OpenContactButton } from '@/components/contact/open-contact-button';
import { FoodCardView, type FoodCardModel } from '@/components/products/food-card';
import { MOTION_QUERY, gsap, useGSAP } from '@/lib/gsap';
import { productListHref } from '@/lib/products';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(Flip);
}

const PAGE_SIZE = 12;

function readLocation() {
  const url = new URL(window.location.href);
  const parts = url.pathname.split('/').filter(Boolean);
  const category = parts[0] === 'products' && parts[1] ? decodeURIComponent(parts[1]) : url.searchParams.get('category');
  const page = Number.parseInt(url.searchParams.get('page') || '1', 10);
  return {
    category: category || null,
    query: url.searchParams.get('q') || '',
    page: Number.isFinite(page) && page > 0 ? page : 1,
  };
}

export function FoodBrowser({
  products,
  categories,
  initialCategory,
  initialQuery,
  initialPage,
}: {
  products: FoodCardModel[];
  categories: { slug: string; title: string }[];
  initialCategory: string | null;
  initialQuery: string;
  initialPage: number;
}) {
  const gridRef = useRef<HTMLUListElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);
  const [category, setCategory] = useState<string | null>(initialCategory);
  const [query, setQuery] = useState(initialQuery);
  const [page, setPage] = useState(initialPage);

  useEffect(() => {
    function onPop() {
      const next = readLocation();
      setCategory(next.category);
      setQuery(next.query);
      setPage(next.page);
    }
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return products.filter((product) => {
      if (category && product.categorySlug !== category) return false;
      if (!needle) return true;
      const haystack = `${product.name} ${product.shortDescription} ${product.categoryTitle ?? ''}`.toLowerCase();
      return haystack.includes(needle);
    });
  }, [products, category, query]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount);
  const visible = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const visibleKey = visible.map((item) => item.id).join('|');

  useGSAP(() => {
    if (!flipState.current) return;
    const state = flipState.current;
    flipState.current = null;
    const mm = gsap.matchMedia();
    mm.add(MOTION_QUERY, () => {
      Flip.from(state, {
        duration: 0.45,
        ease: 'power2.inOut',
        absolute: true,
        stagger: 0.03,
        prune: true,
      });
    });
    return () => mm.revert();
  }, { dependencies: [visibleKey], scope: gridRef, revertOnUpdate: true });

  function go(nextCategory: string | null, nextQuery: string, nextPage: number) {
    if (window.matchMedia(MOTION_QUERY).matches && gridRef.current) {
      flipState.current = Flip.getState(gridRef.current.querySelectorAll('.food-card'));
    }
    setCategory(nextCategory);
    setQuery(nextQuery);
    setPage(nextPage);
    const href = productListHref({
      category: nextCategory,
      q: nextQuery || null,
      page: nextPage,
    });
    window.history.pushState(null, '', href);
  }

  return (
    <div>
      <form
        role="search"
        className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-end"
        onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          go(category, String(data.get('q') || ''), 1);
        }}
      >
        <div className="min-w-0 flex-1">
          <label className="ds-label" htmlFor="product-search">
            Search
          </label>
          <input id="product-search" name="q" type="search" defaultValue={query} placeholder="Product or category" className="ds-control mt-2" />
        </div>
        <button type="submit" className="ds-btn ds-button">
          Search
        </button>
      </form>
      <nav className="mt-8" aria-label="Food categories">
        <ul className="ds-chip-row">
          <li className="shrink-0">
            <button
              type="button"
              aria-current={category ? undefined : 'page'}
              className="ds-small font-semibold text-navy aria-[current=page]:shadow-[inset_0_-2px_0_var(--ds-gold)]"
              onClick={() => go(null, query, 1)}
            >
              All
            </button>
          </li>
          {categories.map((item) => (
            <li key={item.slug} className="shrink-0">
              <button
                type="button"
                aria-current={category === item.slug ? 'page' : undefined}
                className="ds-small text-navy aria-[current=page]:font-semibold aria-[current=page]:shadow-[inset_0_-2px_0_var(--ds-gold)]"
                onClick={() => go(item.slug, query, 1)}
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <p className="ds-small mt-6">
        {filtered.length === 0 ? 'No products' : filtered.length === 1 ? '1 product' : `${filtered.length} products`}
        {query ? ` for “${query}”` : ''}
      </p>
      {visible.length ? (
        <ul ref={gridRef} className="ds-card-grid mt-8">
          {visible.map((product) => (
            <li key={product.id}>
              <FoodCardView product={product} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-8 border border-line bg-paper p-6">
          <h2 className="ds-h3">No products match.</h2>
          <p className="ds-small mt-2">Try another category, or send the product and quantity on WhatsApp.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" className="ds-btn ds-btn-outline ds-button" onClick={() => go(null, '', 1)}>
              Clear filters
            </button>
            <OpenContactButton className="ds-btn ds-btn-wa ds-button" label="WhatsApp" division="food" subject={query || undefined} />
          </div>
        </div>
      )}
      {pageCount > 1 ? (
        <nav className="mt-10 flex items-center justify-between gap-4" aria-label="Pagination">
          <button type="button" className="ds-btn ds-btn-outline ds-button" disabled={safePage <= 1} onClick={() => go(category, query, safePage - 1)}>
            Previous
          </button>
          <p className="ds-small">
            Page {safePage} of {pageCount}
          </p>
          <button type="button" className="ds-btn ds-btn-outline ds-button" disabled={safePage >= pageCount} onClick={() => go(category, query, safePage + 1)}>
            Next
          </button>
        </nav>
      ) : null}
    </div>
  );
}
