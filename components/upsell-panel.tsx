'use client';

import {
  Plane,
  Hotel,
  Car,
  Shield,
  TrendingUp,
  PackagePlus,
  Sparkles,
  Plus,
} from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { UpsellCategory, UpsellItem } from '@/lib/types';

interface UpsellPanelProps {
  items: UpsellItem[];
  header: string;
}

const categoryMeta: Record<
  UpsellCategory,
  { Icon: React.ComponentType<{ className?: string }>; label: string; wrap: string }
> = {
  flight: { Icon: Plane, label: 'Flight', wrap: 'bg-arrivia-blue-50 text-arrivia-blue-700' },
  accommodation: { Icon: Hotel, label: 'Accommodation', wrap: 'bg-arrivia-coral-50 text-arrivia-coral-700' },
  car: { Icon: Car, label: 'Car rental', wrap: 'bg-arrivia-slate-100 text-arrivia-slate-700' },
  insurance: { Icon: Shield, label: 'Insurance', wrap: 'bg-emerald-50 text-emerald-700' },
  upgrade: { Icon: TrendingUp, label: 'Upgrade', wrap: 'bg-amber-50 text-amber-700' },
  'pre-cruise': { Icon: Hotel, label: 'Pre-cruise night', wrap: 'bg-arrivia-coral-50 text-arrivia-coral-700' },
};

export function UpsellPanel({ items, header }: UpsellPanelProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle className="text-base flex items-center gap-1.5">
            <PackagePlus className="h-4 w-4 text-arrivia-coral-500" />
            {header}
          </CardTitle>
          <Badge variant="coral" className="text-[10px]">
            <Sparkles className="h-2.5 w-2.5" />
            Symphony AI
          </Badge>
        </div>
        <p className="text-[11px] text-arrivia-slate-400">
          Flights, accommodation, car rentals, insurance, and upgrades the AI thinks fit this trip.
        </p>
      </CardHeader>
      <CardContent className="pt-0">
        <ul className="space-y-2.5">
          {items.map((item) => (
            <UpsellRow key={item.id} item={item} />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function UpsellRow({ item }: { item: UpsellItem }) {
  const meta = categoryMeta[item.category];
  const Icon = meta.Icon;

  return (
    <li
      className={cn(
        'group rounded-lg border bg-white p-3 transition-colors flex items-start gap-3',
        item.highlight
          ? 'border-arrivia-coral-200 ring-1 ring-arrivia-coral-100'
          : 'border-arrivia-slate-100 hover:border-arrivia-blue-200'
      )}
    >
      <div className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-md', meta.wrap)}>
        <Icon className="h-4 w-4" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] uppercase tracking-wider text-arrivia-slate-400 font-semibold">
                {meta.label}
              </span>
              {item.highlight && (
                <Badge variant="coral" className="text-[10px]">
                  Lead pitch
                </Badge>
              )}
            </div>
            <h4 className="text-sm font-semibold text-arrivia-slate-800 mt-0.5">
              {item.title}
            </h4>
          </div>
          {item.priceHint && (
            <span className="text-[11px] text-arrivia-slate-500 shrink-0 text-right whitespace-nowrap">
              {item.priceHint}
            </span>
          )}
        </div>
        <p className="text-[12px] text-arrivia-slate-600 mt-1 leading-relaxed">{item.pitch}</p>

        <div className="mt-2 flex items-center gap-1.5">
          <Button
            variant="outline"
            size="sm"
            className="h-7 text-[11px] px-2.5"
            onClick={() =>
              toast.success('Added to suggested itinerary', {
                description: item.title,
              })
            }
          >
            <Plus className="h-3 w-3" />
            Add to itinerary
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-[11px] px-2.5"
            onClick={() =>
              toast('Talk track inserted', { description: `Use this line: ${item.pitch}` })
            }
          >
            Use this line
          </Button>
        </div>
      </div>
    </li>
  );
}
