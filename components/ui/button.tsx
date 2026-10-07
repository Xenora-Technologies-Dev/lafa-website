import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva('ds-btn ds-button', {
  variants: {
    variant: {
      default: '',
      gold: 'ds-btn-accent',
      outline: 'ds-btn-outline',
      ghost: 'ds-btn-quiet',
      destructive: 'ds-btn-danger',
    },
    size: {
      default: '',
      sm: 'ds-btn-sm',
      lg: 'ds-btn-lg',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

function Button({
  className,
  variant,
  size,
  asChild = false,
  type = 'button',
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const classes = cn(buttonVariants({ variant, size }), className);
  if (asChild) return <Slot className={classes} {...props} />;
  return <button type={type} className={classes} {...props} />;
}

export { Button, buttonVariants };
