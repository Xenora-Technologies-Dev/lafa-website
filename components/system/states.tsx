import type { ReactNode } from 'react';
import { Heading, Small } from '@/components/system/type';

export function LoadingState({ label = 'Loading' }: { label?: string }) {
  return (
    <p className="ds-small" role="status">
      {label}
    </p>
  );
}

export function EmptyState({
  title,
  text,
  action,
}: {
  title: string;
  text?: string;
  action?: ReactNode;
}) {
  return (
    <div className="border border-line bg-paper px-6 py-8">
      <Heading level={3}>{title}</Heading>
      {text ? <Small className="mt-3 max-w-xl">{text}</Small> : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}

export function ErrorState({
  title,
  text,
  action,
}: {
  title: string;
  text?: string;
  action?: ReactNode;
}) {
  return (
    <div className="max-w-xl" role="alert">
      <Heading level={1}>{title}</Heading>
      {text ? <Small className="mt-4">{text}</Small> : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
