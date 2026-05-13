'use client';

import Link from 'next/link';
import { Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { scenarioList } from '@/lib/mock-data';

interface ScenarioToggleProps {
  activeId: string;
  className?: string;
}

export function ScenarioToggle({ activeId, className }: ScenarioToggleProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-arrivia-slate-200 bg-white p-0.5 shadow-sm',
        className
      )}
      role="tablist"
      aria-label="Demo scenario"
    >
      <span className="hidden sm:flex items-center gap-1 pl-2.5 pr-0.5 text-[10px] uppercase tracking-wider text-arrivia-slate-400">
        <Users className="h-3 w-3" />
        Scenario
      </span>
      {scenarioList.map((s) => {
        const active = activeId === s.id;
        return (
          <Link
            key={s.id}
            href={`/?scenario=${s.id}`}
            role="tab"
            aria-selected={active}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full px-3 h-7 text-xs font-medium transition-colors',
              active
                ? 'bg-arrivia-coral-500 text-white shadow-sm'
                : 'text-arrivia-slate-600 hover:bg-arrivia-slate-50 hover:text-arrivia-slate-900'
            )}
          >
            <span
              className={cn(
                'inline-flex items-center justify-center h-4 w-4 rounded-full text-[9px] font-semibold',
                active
                  ? 'bg-white/25 text-white'
                  : 'bg-arrivia-slate-100 text-arrivia-slate-600'
              )}
            >
              {s.id.toUpperCase()}
            </span>
            <span className="whitespace-nowrap">{s.shortLabel}</span>
          </Link>
        );
      })}
    </div>
  );
}
