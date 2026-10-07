import * as React from 'react';
import { controlClass } from '@/components/system/field';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return <input type={type} className={controlClass(className)} {...props} />;
}

export { Input };
