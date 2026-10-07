import Image from 'next/image';
import { cn } from '@/lib/utils';

export function ImageBlock({
  src,
  alt,
  caption,
  ratio = '4 / 3',
  priority = false,
  fit = 'contain',
  sizes = '(min-width: 1024px) 40rem, 100vw',
  className,
}: {
  src?: string | null;
  alt: string;
  caption?: string;
  ratio?: '4 / 3' | '16 / 9' | '1 / 1';
  priority?: boolean;
  fit?: 'contain' | 'cover';
  sizes?: string;
  className?: string;
}) {
  const aspect = ratio === '16 / 9' ? 'aspect-[16/9]' : ratio === '1 / 1' ? 'aspect-square' : 'aspect-[4/3]';
  return (
    <figure className={cn('m-0', className)}>
      {src ? (
        <div className={cn('ds-frame relative', aspect)}>
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            className={fit === 'cover' ? 'object-cover' : 'object-contain'}
          />
        </div>
      ) : (
        <div role="img" aria-label={alt} className={cn('ds-placeholder', aspect)}>
          <span className="ds-h3 px-6 text-center">{alt}</span>
        </div>
      )}
      {caption ? <figcaption className="ds-small mt-3">{caption}</figcaption> : null}
    </figure>
  );
}
