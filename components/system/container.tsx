import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function Container({
  size = 'default',
  className,
  children,
}: {
  size?: 'default' | 'narrow' | 'wide';
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        'ds-container',
        size === 'narrow' && 'ds-container-narrow',
        size === 'wide' && 'ds-container-wide',
        className,
      )}
    >
      {children}
    </div>
  );
}
