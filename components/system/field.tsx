import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function Field({
  label,
  htmlFor,
  hint,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={htmlFor} className="ds-small font-semibold text-navy">
        {label}
      </label>
      {children}
      {hint ? <p className="ds-small">{hint}</p> : null}
      {error ? (
        <p id={`${htmlFor}-error`} className="ds-small text-[var(--ds-danger)]" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function controlClass(className?: string) {
  return cn('ds-control', className);
}
