'use client';

import { useMemo, useState } from 'react';
import { Search, Sparkles, Plus } from 'lucide-react';
import { Dialog, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { catalogue, type CatalogueItem } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const categories = [
  'All',
  'Internal',
  'CRM',
  'Supplier, Cruise',
  'Air',
  'Hotel',
  'Activities',
  'Payments',
  'Telephony',
  'AI',
];

interface ConnectorCatalogueModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (item: CatalogueItem) => void;
}

export function ConnectorCatalogueModal({ open, onOpenChange, onSelect }: ConnectorCatalogueModalProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = useMemo(() => {
    return catalogue.filter((c) => {
      const matchQuery = query === '' || c.name.toLowerCase().includes(query.toLowerCase());
      const matchCat = category === 'All' || c.category === category;
      return matchQuery && matchCat;
    });
  }, [query, category]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange} size="xl">
      <DialogHeader>
        <DialogTitle>Add connector</DialogTitle>
        <DialogDescription>
          Pick a system to integrate. Recommended connectors expose tools to the Symphony AI agent.
        </DialogDescription>
      </DialogHeader>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-56 shrink-0 border-r border-arrivia-slate-100 px-4 py-4 bg-arrivia-cream-50/40 overflow-y-auto">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-arrivia-slate-400" />
            <Input
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-9 pl-8 text-xs"
            />
          </div>
          <div className="mt-4 space-y-0.5">
            <div className="px-2 py-1 text-[10px] uppercase tracking-wider text-arrivia-slate-400 font-semibold">
              Category
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  'w-full text-left px-2 py-1.5 rounded-md text-xs transition-colors',
                  category === cat
                    ? 'bg-arrivia-blue-600 text-white font-medium'
                    : 'text-arrivia-slate-600 hover:bg-arrivia-slate-100 hover:text-arrivia-slate-900'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </aside>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {filtered.length === 0 ? (
            <p className="text-sm text-arrivia-slate-500 text-center py-10">
              No connectors match that search.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filtered.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSelect(item)}
                  className={cn(
                    'group relative text-left rounded-xl border bg-white p-4 transition-all hover:shadow-md',
                    item.recommended
                      ? 'border-arrivia-coral-300 ring-1 ring-arrivia-coral-200/50'
                      : 'border-arrivia-slate-200 hover:border-arrivia-blue-300'
                  )}
                >
                  {item.recommended && (
                    <Badge variant="coral" className="absolute top-3 right-3 text-[10px]">
                      <Sparkles className="h-2.5 w-2.5" />
                      Recommended
                    </Badge>
                  )}
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xs font-bold tracking-tight',
                        item.accent
                      )}
                    >
                      {item.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-semibold text-arrivia-slate-900 pr-20">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-arrivia-slate-500 mt-0.5">
                        {item.category}, {item.authType}
                      </p>
                      <p className="text-xs text-arrivia-slate-600 mt-2 line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <Button variant={item.recommended ? 'primary' : 'outline'} size="sm">
                      <Plus className="h-3 w-3" />
                      Configure
                    </Button>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </Dialog>
  );
}
