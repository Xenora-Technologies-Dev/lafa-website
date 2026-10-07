import * as React from 'react';
import { controlClass } from '@/components/system/field';

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return <textarea className={controlClass(`min-h-32 ${className ?? ''}`)} {...props} />;
}

export { Textarea };
