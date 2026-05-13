import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium ring-1 ring-inset',
  {
    variants: {
      variant: {
        platinum:
          'bg-arrivia-slate-100 text-arrivia-slate-800 ring-arrivia-slate-300',
        coral:
          'bg-arrivia-coral-50 text-arrivia-coral-700 ring-arrivia-coral-200',
        blue:
          'bg-arrivia-blue-50 text-arrivia-blue-700 ring-arrivia-blue-200',
        success:
          'bg-emerald-50 text-emerald-700 ring-emerald-200',
        warn:
          'bg-amber-50 text-amber-700 ring-amber-200',
        error:
          'bg-red-50 text-red-700 ring-red-200',
        muted:
          'bg-arrivia-slate-50 text-arrivia-slate-600 ring-arrivia-slate-200',
      },
    },
    defaultVariants: { variant: 'muted' },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
