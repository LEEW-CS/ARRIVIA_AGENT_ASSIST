'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  side?: 'right' | 'left';
  className?: string;
}

export function Sheet({ open, onOpenChange, children, side = 'right', className }: SheetProps) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onOpenChange(false);
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-arrivia-slate-900/40 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      <div
        className={cn(
          'absolute top-0 bottom-0 w-full max-w-md bg-white shadow-2xl flex flex-col',
          side === 'right' ? 'right-0' : 'left-0',
          className
        )}
      >
        <button
          aria-label="Close"
          onClick={() => onOpenChange(false)}
          className="absolute right-3 top-3 z-10 rounded-md p-1.5 text-arrivia-slate-400 hover:bg-arrivia-slate-100 hover:text-arrivia-slate-700 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
        {children}
      </div>
    </div>
  );
}

export function SheetHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('px-6 pt-6 pb-4 border-b border-arrivia-slate-100', className)}>
      {children}
    </div>
  );
}

export function SheetTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={cn('text-lg font-semibold text-arrivia-slate-900', className)}>{children}</h2>
  );
}

export function SheetDescription({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn('mt-1 text-sm text-arrivia-slate-500', className)}>{children}</p>;
}

export function SheetBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('flex-1 overflow-y-auto px-6 py-5 space-y-5', className)}>{children}</div>;
}

export function SheetFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('px-6 py-4 border-t border-arrivia-slate-100 flex items-center justify-end gap-2', className)}>
      {children}
    </div>
  );
}
