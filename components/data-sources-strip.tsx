'use client';

import Link from 'next/link';
import { Database } from 'lucide-react';
import { dataSources } from '@/lib/mock-data';

export function DataSourcesStrip() {
  return (
    <div className="rounded-xl border border-arrivia-slate-200 bg-white px-4 py-3">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-arrivia-slate-500 shrink-0">
          <Database className="h-3.5 w-3.5" />
          Live data sources
        </div>
        <div className="h-3.5 w-px bg-arrivia-slate-200 hidden md:block" />
        <div className="flex flex-wrap gap-1.5">
          {dataSources.map((s) => (
            <Link
              key={s.id}
              href={`/connectors?focus=${s.id}`}
              className="group inline-flex items-center gap-1.5 rounded-full border border-arrivia-slate-200 bg-arrivia-cream-50/50 pl-2 pr-2.5 py-0.5 text-[11px] text-arrivia-slate-600 hover:border-arrivia-blue-300 hover:bg-white hover:text-arrivia-blue-700 transition-colors"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              {s.label}
              <span className="text-arrivia-slate-300 group-hover:text-arrivia-blue-400">·</span>
              <span className="text-[10px] text-emerald-600 group-hover:text-arrivia-blue-700">connected</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
