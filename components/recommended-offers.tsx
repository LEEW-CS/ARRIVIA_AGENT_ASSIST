'use client';

import { Ship, MapPin, Plus, Star, AlertTriangle, Hotel } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Offer } from '@/lib/types';
import { cn } from '@/lib/utils';

interface RecommendedOffersProps {
  offers: Offer[];
  header: string;
  subheader: string;
}

export function RecommendedOffers({ offers, header, subheader }: RecommendedOffersProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{header}</CardTitle>
        <p className="text-[11px] text-arrivia-slate-400">{subheader}</p>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {offers.map((o) => (
            <OfferCard key={o.id} offer={o} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function OfferCard({ offer: o }: { offer: Offer }) {
  const KindIcon = o.kind === 'hotel' ? Hotel : Ship;
  return (
    <div
      className={cn(
        'group relative flex flex-col rounded-xl border bg-white overflow-hidden transition-all',
        o.highlight
          ? 'border-arrivia-coral-200 ring-1 ring-arrivia-coral-200/60 shadow-sm'
          : 'border-arrivia-slate-200 hover:border-arrivia-blue-200 hover:shadow-sm',
        o.unavailable && 'opacity-90'
      )}
    >
      <div
        className={cn(
          'h-20 relative overflow-hidden flex items-end p-3',
          o.unavailable
            ? 'bg-gradient-to-br from-arrivia-slate-500 to-arrivia-slate-700'
            : o.highlight
            ? 'bg-gradient-to-br from-arrivia-coral-400 to-arrivia-coral-600'
            : 'bg-gradient-to-br from-arrivia-blue-500 to-arrivia-blue-700'
        )}
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-white blur-xl" />
        </div>
        <KindIcon className="relative h-6 w-6 text-white/90" />
        {o.highlight && !o.unavailable && (
          <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-0.5 text-[10px] font-semibold text-arrivia-coral-700 ring-1 ring-arrivia-coral-200">
            <Star className="h-2.5 w-2.5 fill-current" />
            Top match
          </span>
        )}
        {o.unavailable && (
          <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-800 ring-1 ring-amber-200">
            <AlertTriangle className="h-2.5 w-2.5" />
            Inventory unavailable
          </span>
        )}
      </div>

      <div className="flex-1 p-3.5">
        <div className="text-[10px] uppercase tracking-wide text-arrivia-slate-400">
          {o.ship}
        </div>
        <h4 className="text-sm font-semibold text-arrivia-slate-900 mt-0.5">{o.title}</h4>
        <p className="text-xs text-arrivia-slate-600 mt-1 flex items-start gap-1">
          <MapPin className="h-3 w-3 mt-0.5 shrink-0 text-arrivia-slate-400" />
          <span>{o.itinerary}</span>
        </p>
        <p className="text-xs text-arrivia-slate-600 mt-1">{o.suite}</p>

        {o.matchTag && (
          <Badge variant={o.matchTone === 'warn' ? 'warn' : o.matchTone === 'muted' ? 'muted' : 'coral'} className="mt-2 text-[10px]">
            {o.matchTag}
          </Badge>
        )}

        <div className="mt-3 pt-3 border-t border-arrivia-slate-100 flex items-end justify-between gap-2">
          <div>
            <div className="text-[10px] text-arrivia-slate-400">
              {o.unavailable ? 'Awaiting feed' : 'Lead price'}
            </div>
            <div
              className={cn(
                'text-sm font-semibold',
                o.unavailable ? 'text-arrivia-slate-500 italic' : 'text-arrivia-slate-900'
              )}
            >
              {o.price}
            </div>
          </div>
        </div>

        <Button
          variant={o.unavailable ? 'outline' : 'primary'}
          size="sm"
          className="mt-3 w-full"
          onClick={() =>
            o.unavailable
              ? toast('Cannot add this offer yet', {
                  description: 'Inventory feed is offline. Try again after the call.',
                })
              : toast.success('Added to itinerary', {
                  description: `${o.title}, ${o.itinerary}`,
                })
          }
        >
          {o.unavailable ? (
            <>
              <AlertTriangle className="h-3.5 w-3.5" />
              Awaiting feed
            </>
          ) : (
            <>
              <Plus className="h-3.5 w-3.5" />
              Add to itinerary
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
