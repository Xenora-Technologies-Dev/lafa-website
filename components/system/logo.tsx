import Image from 'next/image';
import { cn } from '@/lib/utils';

const frames = {
  header: 'h-full w-full object-cover object-[center_46%]',
  footer: 'h-auto w-40',
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
      width={1024}
      height={1024}
      quality={92}
      priority={priority}
      sizes={variant === 'footer' ? '160px' : '200px'}
      className={cn(frames[variant])}
    />
  );
}
