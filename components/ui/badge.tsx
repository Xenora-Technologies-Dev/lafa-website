import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva('ds-badge', {
  variants: {
    variant: {
      default: 'ds-badge-navy',
      outline: 'ds-badge-neutral',
      gold: 'ds-badge-line',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

function Badge({ className, variant, ...props }: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
