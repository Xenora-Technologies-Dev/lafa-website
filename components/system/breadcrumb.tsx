import Link from 'next/link';

export type Crumb = { name: string; path?: string };

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={`${item.name}-${index}`} className="ds-small flex items-center gap-2">
              {index > 0 ? <span aria-hidden="true">/</span> : null}
              {item.path && !last ? (
                <Link href={item.path} className="text-stone hover:text-navy">
                  {item.name}
                </Link>
              ) : (
                <span className={last ? 'text-navy' : undefined}>{item.name}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
