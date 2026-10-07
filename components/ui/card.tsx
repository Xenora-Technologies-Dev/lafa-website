import * as React from 'react';
import { cn } from '@/lib/utils';

function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('rounded-sm border border-line bg-white text-charcoal', className)} {...props} />;
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('px-5 pt-5', className)} {...props} />;
}

function CardTitle({ className, ...props }: React.ComponentProps<'h2'>) {
  return <h2 className={cn('ds-h3', className)} {...props} />;
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('px-5 pb-5', className)} {...props} />;
}

export { Card, CardHeader, CardTitle, CardContent };
