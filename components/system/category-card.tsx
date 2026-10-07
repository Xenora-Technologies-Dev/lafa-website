import Link from 'next/link';

export function CategoryCard({
  href,
  index,
  title,
  description,
  meta,
}: {
  href: string;
  index?: string;
  title: string;
  description?: string;
  meta?: string;
}) {
  return (
    <Link
      href={href}
      className="group grid gap-2 border-b border-line py-6 transition-colors sm:grid-cols-[4.5rem_minmax(0,1fr)_auto] sm:items-baseline sm:gap-8"
    >
      {index ? <span className="ds-h3 text-gold-deep">{index}</span> : <span />}
      <span>
        <span className="ds-h3 block group-hover:text-navy-soft">{title}</span>
        {description ? <span className="ds-small mt-1 block max-w-2xl">{description}</span> : null}
      </span>
      {meta ? <span className="ds-label text-stone">{meta}</span> : null}
    </Link>
  );
}
