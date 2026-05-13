'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arrivia-blue-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-arrivia-coral-500 text-white hover:bg-arrivia-coral-600 active:bg-arrivia-coral-700 shadow-sm',
        secondary:
          'bg-arrivia-blue-600 text-white hover:bg-arrivia-blue-700 active:bg-arrivia-blue-800',
        outline:
          'border border-arrivia-slate-200 bg-white text-arrivia-slate-700 hover:bg-arrivia-slate-50 hover:border-arrivia-slate-300',
        ghost:
          'text-arrivia-slate-700 hover:bg-arrivia-slate-100 hover:text-arrivia-slate-900',
        subtle:
          'bg-arrivia-blue-50 text-arrivia-blue-700 hover:bg-arrivia-blue-100',
        danger:
          'bg-red-600 text-white hover:bg-red-700',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4',
        lg: 'h-11 px-6 text-base',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  )
);
Button.displayName = 'Button';

export { buttonVariants };
