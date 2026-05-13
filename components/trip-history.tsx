'use client';

import { Ship, Plane, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { trips } from '@/lib/mock-data';

export function TripHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trip history</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <ol className="relative space-y-3 before:absolute before:left-[14px] before:top-1 before:bottom-1 before:w-px before:bg-arrivia-slate-100">
          {trips.map((t) => {
            const Icon = t.kind === 'cruise' ? Ship : Plane;
            return (
              <li key={t.id} className="relative pl-8">
                <span className="absolute left-0 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-white ring-1 ring-arrivia-slate-200 text-arrivia-blue-600">
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <div className="rounded-lg border border-arrivia-slate-100 bg-arrivia-cream-50/60 px-3 py-2.5 hover:border-arrivia-slate-200 hover:bg-white transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-semibold text-arrivia-slate-800">
                          {t.supplier}
                        </span>
                        {!t.preferred && (
                          <Badge variant="warn" className="text-[10px]">
                            Off preference
                          </Badge>
                        )}
                      </div>
                      <p className="text-[12px] text-arrivia-slate-600 mt-0.5">
                        {t.title}
                      </p>
                      <p className="text-[11px] text-arrivia-slate-500 mt-0.5">
                        {t.details}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-[11px] text-arrivia-slate-400">{t.date}</div>
                      <div className="text-sm font-semibold text-arrivia-slate-800 mt-0.5">
                        {t.spend}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => toast(`Itinerary for ${t.supplier}, ${t.date}`, {
                      description: 'Viewing itineraries is not enabled in this demo.',
                    })}
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
      </CardContent>
    </Card>
  );
}
