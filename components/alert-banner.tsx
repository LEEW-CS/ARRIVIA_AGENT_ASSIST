import { AlertTriangle, Info, AlertOctagon } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Alert } from '@/lib/types';

const tone = {
  warn: {
    wrap: 'border-amber-200 bg-amber-50 text-amber-900',
    icon: 'text-amber-600',
    Icon: AlertTriangle,
    pill: 'bg-amber-100 text-amber-800 ring-amber-200',
    label: 'Heads up',
  },
  error: {
    wrap: 'border-red-200 bg-red-50 text-red-900',
    icon: 'text-red-600',
    Icon: AlertOctagon,
    pill: 'bg-red-100 text-red-800 ring-red-200',
    label: 'Action needed',
  },
  info: {
    wrap: 'border-arrivia-blue-200 bg-arrivia-blue-50 text-arrivia-blue-900',
    icon: 'text-arrivia-blue-600',
    Icon: Info,
    pill: 'bg-arrivia-blue-100 text-arrivia-blue-800 ring-arrivia-blue-200',
    label: 'Note',
  },
} as const;

interface AlertBannerProps {
  alerts: Alert[];
}

export function AlertBanner({ alerts }: AlertBannerProps) {
  if (!alerts || alerts.length === 0) return null;
  return (
    <div className="space-y-2.5">
      {alerts.map((a, i) => {
        const t = tone[a.level];
        const Icon = t.Icon;
        return (
          <div
            key={i}
            className={cn(
              'flex items-start gap-3 rounded-xl border px-4 py-3',
              t.wrap
            )}
          >
            <Icon className={cn('h-4 w-4 shrink-0 mt-0.5', t.icon)} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={cn(
                    'inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ring-1 ring-inset',
                    t.pill
                  )}
                >
                  {t.label}
                </span>
                <span className="text-sm font-semibold">{a.title}</span>
              </div>
              <p className="mt-1 text-[12px] leading-relaxed opacity-90">
                {a.detail}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
