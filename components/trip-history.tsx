'use client';

import {
  Ship,
  Plane,
  Hotel,
  Car,
  Shield,
  ChevronRight,
  FileWarning,
} from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Trip, TripKind } from '@/lib/types';

interface TripHistoryProps {
  trips: Trip[];
}

const kindMeta: Record<
  TripKind,
  {
    Icon: React.ComponentType<{ className?: string }>;
    iconClass: string;
    label: string;
  }
> = {
  cruise: { Icon: Ship, iconClass: 'text-arrivia-blue-600', label: 'Cruise' },
  flight: { Icon: Plane, iconClass: 'text-arrivia-blue-500', label: 'Flight' },
  hotel: { Icon: Hotel, iconClass: 'text-arrivia-coral-600', label: 'Hotel' },
  car: { Icon: Car, iconClass: 'text-arrivia-slate-700', label: 'Car rental' },
  insurance: { Icon: Shield, iconClass: 'text-emerald-700', label: 'Insurance' },
};

export function TripHistory({ trips }: TripHistoryProps) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between gap-2">
        <CardTitle>Trip history</CardTitle>
        {trips.length > 0 && (
          <span className="text-[10px] text-arrivia-slate-400">{trips.length} entries</span>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        {trips.length === 0 ? (
          <div className="rounded-lg border border-dashed border-arrivia-slate-200 bg-arrivia-cream-50/50 px-4 py-6 text-center">
            <FileWarning className="mx-auto h-5 w-5 text-arrivia-slate-400" />
            <p className="mt-2 text-xs text-arrivia-slate-600">No prior trips on file.</p>
            <p className="text-[11px] text-arrivia-slate-400 mt-0.5">
              Treat this caller as a brand new member.
            </p>
          </div>
        ) : (
          <ol className="relative space-y-3 before:absolute before:left-[14px] before:top-1 before:bottom-1 before:w-px before:bg-arrivia-slate-100">
            {trips.map((t) => {
              const meta = kindMeta[t.kind];
              const Icon = meta.Icon;
              return (
                <li key={t.id} className="relative pl-8">
                  <span className="absolute left-0 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-white ring-1 ring-arrivia-slate-200">
                    <Icon className={cn('h-3.5 w-3.5', meta.iconClass)} />
                  </span>
                  <div className="rounded-lg border border-arrivia-slate-100 bg-arrivia-cream-50/60 px-3 py-2.5 hover:border-arrivia-slate-200 hover:bg-white transition-colors">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-semibold text-arrivia-slate-800">
                            {t.supplier}
                          </span>
                          <span className="inline-flex items-center rounded-full bg-arrivia-slate-50 px-1.5 py-0 text-[9px] uppercase tracking-wider text-arrivia-slate-500 ring-1 ring-arrivia-slate-100">
                            {meta.label}
                          </span>
                          {!t.preferred && (
                            <Badge variant="warn" className="text-[10px]">
                              Off preference
                            </Badge>
                          )}
                        </div>
                        <p className="text-[12px] text-arrivia-slate-600 mt-0.5">{t.title}</p>
                        <p className="text-[11px] text-arrivia-slate-500 mt-0.5">{t.details}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-[11px] text-arrivia-slate-400">{t.date}</div>
                        <div className="text-sm font-semibold text-arrivia-slate-800 mt-0.5">
                          {t.spend}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        toast(`Itinerary for ${t.supplier}, ${t.date}`, {
                          description: 'Viewing itineraries is not enabled in this demo.',
                        })
                      }
                      className="mt-2 inline-flex items-center gap-0.5 text-[11px] font-medium text-arrivia-blue-600 hover:text-arrivia-blue-700 transition-colors"
                    >
                      View itinerary
                      <ChevronRight className="h-3 w-3" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ol>
        )}
      </CardContent>
    </Card>
  );
}
