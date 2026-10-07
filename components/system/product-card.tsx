import Link from 'next/link';
import { ImageBlock } from '@/components/system/image-block';

export function ProductCard({
  href,
  title,
  category,
  description,
  imageUrl,
  imageAlt,
  imageFit = 'contain',
  imageSizes,
  meta,
  enquireHref,
  enquireLabel = 'Enquire',
  enquireExternal = false,
  viewLabel = 'View details',
}: {
  href: string;
  title: string;
  category?: string;
  description?: string;
  imageUrl?: string | null;
  imageAlt?: string;
  imageFit?: 'contain' | 'cover';
  imageSizes?: string;
  meta?: string;
  enquireHref?: string;
  enquireLabel?: string;
  enquireExternal?: boolean;
  viewLabel?: string;
}) {
  const media = <ImageBlock src={imageUrl} alt={imageAlt || title} fit={imageFit} sizes={imageSizes} />;

  if (!enquireHref) {
    return (
      <Link href={href} className="flex h-full flex-col border border-line bg-paper transition-colors hover:border-gold focus-visible:border-gold">
        {media}
        <span className="flex flex-1 flex-col p-4 sm:p-5">
          {category ? <span className="ds-label">{category}</span> : null}
          <span className="ds-h3 mt-2">{title}</span>
          {description ? <span className="ds-small mt-2 line-clamp-3">{description}</span> : null}
          {meta ? <span className="ds-meta-value mt-3">{meta}</span> : null}
        </span>
      </Link>
    );
  }

  return (
    <article className="flex h-full flex-col border border-line bg-paper">
      <Link href={href} className="block focus-visible:outline-offset-0">
        {media}
      </Link>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {category ? <p className="ds-label">{category}</p> : null}
        <h3 className="ds-h3 mt-2">
          <Link href={href} className="hover:text-navy-soft">
            {title}
          </Link>
        </h3>
        {description ? <p className="ds-small mt-2 line-clamp-3">{description}</p> : null}
        {meta ? <p className="ds-meta-value mt-3">{meta}</p> : null}
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href={href} className="ds-btn ds-btn-sm ds-button">
            {viewLabel}
          </Link>
          {enquireExternal ? (
            <a href={enquireHref} className="ds-btn ds-btn-outline ds-btn-sm ds-button" target="_blank" rel="noopener noreferrer">
              {enquireLabel}
            </a>
          ) : (
            <Link href={enquireHref} className="ds-btn ds-btn-outline ds-btn-sm ds-button">
              {enquireLabel}
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
