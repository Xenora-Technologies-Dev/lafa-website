import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function Display({
  as = 'p',
  className,
  children,
}: {
  as?: 'h1' | 'p';
  className?: string;
  children: ReactNode;
}) {
  const Tag = as;
  return <Tag className={cn('ds-display', className)}>{children}</Tag>;
}

export function Heading({
  level = 2,
  className,
  children,
}: {
  level?: 1 | 2 | 3;
  className?: string;
  children: ReactNode;
}) {
  const Tag = (`h${level}` as const);
  const style = level === 1 ? 'ds-h1' : level === 2 ? 'ds-h2' : 'ds-h3';
  return <Tag className={cn(style, className)}>{children}</Tag>;
}

export function Body({ className, children }: { className?: string; children: ReactNode }) {
  return <p className={cn('ds-body', className)}>{children}</p>;
}

export function Small({ className, children }: { className?: string; children: ReactNode }) {
  return <p className={cn('ds-small', className)}>{children}</p>;
}

export function LabelText({ className, children }: { className?: string; children: ReactNode }) {
  return <p className={cn('ds-label', className)}>{children}</p>;
}

export function ProductMeta({ items }: { items: { label: string; value: string }[] }) {
  if (!items.length) return null;
  return (
    <dl className="ds-meta">
      {items.map((item) => (
        <div key={item.label}>
          <dt className="ds-meta-label">{item.label}</dt>
          <dd className="ds-meta-value">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
