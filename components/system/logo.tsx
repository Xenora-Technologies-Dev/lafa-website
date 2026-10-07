import Image from 'next/image';
import { cn } from '@/lib/utils';

const frames = {
  header: 'w-[4.5rem] sm:w-20',
  footer: 'w-24',
} as const;

/**
 * The supplied lockup, shown whole. Size changes only the rendered width.
 * The file is not cropped, recolored, or redrawn.
 */
export function BrandLogo({
  variant = 'header',
  priority = false,
  decorative = false,
}: {
  variant?: keyof typeof frames;
  priority?: boolean;
  decorative?: boolean;
}) {
  return (
    <Image
      src="/logo.png"
      alt={decorative ? '' : 'LAFA General Trading'}
      width={512}
      height={512}
      priority={priority}
      sizes={variant === 'footer' ? '96px' : '80px'}
      className={cn('h-auto max-w-none', frames[variant])}
    />
  );
}
