'use client';

import Link from 'next/link';
import { Database } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { DataSource, DataSourceStatus } from '@/lib/types';

interface DataSourcesStripProps {
  sources: DataSource[];
  scenarioId: string;
}

const statusMeta: Record<
  DataSourceStatus,
  { dot: string; ring: string; label: string; labelClass: string; pingClass?: string }
> = {
  connected: {
    dot: 'bg-emerald-500',
    ring: 'border-arrivia-slate-200',
    label: 'connected',
    labelClass: 'text-emerald-600',
    pingClass: 'animate-ping',
  },
  pending: {
    dot: 'bg-amber-500',
    ring: 'border-amber-200',
    label: 'pending',
    labelClass: 'text-amber-700',
  },
  error: {
    dot: 'bg-red-500',
    ring: 'border-red-200',
    label: 'error',
    labelClass: 'text-red-600',
  },
  disconnected: {
    dot: 'bg-arrivia-slate-400',
    ring: 'border-arrivia-slate-200',
    label: 'offline',
    labelClass: 'text-arrivia-slate-500',
  },
};

export function DataSourcesStrip({ sources, scenarioId }: DataSourcesStripProps) {
  const degraded = sources.filter((s) => s.status !== 'connected').length;

  return (
    <div className="rounded-xl border border-arrivia-slate-200 bg-white px-4 py-3">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-arrivia-slate-500 shrink-0">
          <Database className="h-3.5 w-3.5" />
          Live data sources
          {degraded > 0 && (
            <span className="ml-1 inline-flex items-center rounded-full bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold text-amber-800 ring-1 ring-amber-200 normal-case tracking-normal">
              {degraded} degraded
            </span>
          )}
        </div>
        <div className="h-3.5 w-px bg-arrivia-slate-200 hidden md:block" />
        <div className="flex flex-wrap gap-1.5">
          {sources.map((s) => {
            const m = statusMeta[s.status];
            return (
              <Link
                key={s.id}
                href={`/connectors?focus=${s.id}&scenario=${scenarioId}`}
                title={s.detail || undefined}
                className={cn(
                  'group inline-flex items-center gap-1.5 rounded-full border bg-arrivia-cream-50/50 pl-2 pr-2.5 py-0.5 text-[11px] text-arrivia-slate-600 transition-colors',
                  m.ring,
                  'hover:border-arrivia-blue-300 hover:bg-white hover:text-arrivia-blue-700'
                )}
              >
                <span className="relative flex h-1.5 w-1.5">
                  {m.pingClass && (
                    <span
                      className={cn(
                        'absolute inline-flex h-full w-full rounded-full opacity-70',
                        m.dot,
                        m.pingClass
                      )}
                    />
                  )}
                  <span className={cn('relative inline-flex h-1.5 w-1.5 rounded-full', m.dot)} />
                </span>
                {s.label}
                <span className="text-arrivia-slate-300 group-hover:text-arrivia-blue-400">·</span>
                <span className={cn('text-[10px] group-hover:text-arrivia-blue-700', m.labelClass)}>
                  {m.label}
                  {s.detail && (
                    <span className="hidden xl:inline text-arrivia-slate-400 normal-case">
                      , {s.detail}
                    </span>
                  )}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
