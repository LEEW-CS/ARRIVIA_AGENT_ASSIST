'use client';

import { Suspense, useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArriviaLogo } from '@/components/arrivia-logo';
import { ConnectorCard } from '@/components/connector-card';
import { ConnectorCatalogueModal } from '@/components/connector-catalogue-modal';
import { ConnectorConfigDrawer } from '@/components/connector-config-drawer';
import { connectors, catalogue, type CatalogueItem } from '@/lib/mock-data';

function ConnectorsContent() {
  const params = useSearchParams();
  const focus = params.get('focus');

  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'connected' | 'disconnected' | 'error'>('all');
  const [catalogueOpen, setCatalogueOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerItem, setDrawerItem] = useState<CatalogueItem | null>(null);

  useEffect(() => {
    if (!focus) return;
    const el = document.getElementById(`connector-${focus}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [focus]);

  const counts = useMemo(() => {
    const c = { connected: 0, disconnected: 0, error: 0 };
    connectors.forEach((x) => c[x.status]++);
    return c;
  }, []);

  const filtered = useMemo(() => {
    return connectors.filter((c) => {
      const matchQuery = query === '' || c.name.toLowerCase().includes(query.toLowerCase());
      const matchStatus = statusFilter === 'all' || c.status === statusFilter;
      return matchQuery && matchStatus;
    });
  }, [query, statusFilter]);

  const handleSelect = (item: CatalogueItem) => {
    setCatalogueOpen(false);
    setDrawerItem(item);
    setDrawerOpen(true);
  };

  const handleEdit = (id: string) => {
    const existing = connectors.find((c) => c.id === id);
    if (!existing) return;
    const asCatalogue: CatalogueItem = {
      id: existing.id,
      name: existing.name,
      type: existing.type,
      category: existing.type,
      initials: existing.initials,
      accent: existing.accent,
      authType: existing.authType,
      recommended: existing.id === 'crm',
      description: existing.description ?? `${existing.name} integration for the Arrivia agent platform.`,
    };
    setDrawerItem(asCatalogue);
    setDrawerOpen(true);
  };

  return (
    <div className="min-h-screen bg-arrivia-cream-50 flex flex-col">
      <header className="sticky top-0 z-30 border-b border-arrivia-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-[1600px] items-center gap-4 px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-arrivia-slate-600 hover:text-arrivia-blue-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to console
          </Link>
          <span className="h-5 w-px bg-arrivia-slate-200" />
          <div className="flex items-center gap-2">
            <ArriviaLogo heightClass="h-7" />
            <Badge variant="muted">Connectors</Badge>
          </div>
          <div className="flex-1" />
          <Button variant="primary" onClick={() => setCatalogueOpen(true)}>
            <Plus className="h-4 w-4" />
            Add connector
          </Button>
        </div>
      </header>

      <main className="flex-1 mx-auto w-full max-w-[1600px] px-6 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-arrivia-slate-900">Connectors</h1>
          <p className="text-sm text-arrivia-slate-500 mt-1 max-w-2xl">
            Configure the systems that power Agent Assist. API keys are encrypted at rest. Connectors marked as MCP expose tools the Symphony AI agent can call directly.
          </p>
        </div>

        <div className="mb-4 rounded-md border border-amber-200 bg-amber-50 px-4 py-2.5 text-xs text-amber-800">
          This is a conceptual demo. Credentials entered here are stored in browser memory only and discarded on refresh.
        </div>

        <div className="mb-5 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-arrivia-slate-400" />
            <Input
              placeholder="Search connectors"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9 h-9"
            />
          </div>
          <div className="flex items-center gap-1.5 rounded-md bg-white border border-arrivia-slate-200 p-0.5">
            <FilterPill
              active={statusFilter === 'all'}
              onClick={() => setStatusFilter('all')}
            >
              All <span className="opacity-60">{connectors.length}</span>
            </FilterPill>
            <FilterPill
              active={statusFilter === 'connected'}
              onClick={() => setStatusFilter('connected')}
              dotClass="bg-emerald-500"
            >
              Connected <span className="opacity-60">{counts.connected}</span>
            </FilterPill>
            <FilterPill
              active={statusFilter === 'disconnected'}
              onClick={() => setStatusFilter('disconnected')}
              dotClass="bg-arrivia-slate-400"
            >
              Disconnected <span className="opacity-60">{counts.disconnected}</span>
            </FilterPill>
            <FilterPill
              active={statusFilter === 'error'}
              onClick={() => setStatusFilter('error')}
              dotClass="bg-red-500"
            >
              Error <span className="opacity-60">{counts.error}</span>
            </FilterPill>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((c) => (
            <ConnectorCard
              key={c.id}
              connector={c}
              focused={focus === c.id}
              onEdit={() => handleEdit(c.id)}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-sm text-arrivia-slate-500">
            No connectors match those filters.
          </div>
        )}
      </main>

      <ConnectorCatalogueModal
        open={catalogueOpen}
        onOpenChange={setCatalogueOpen}
        onSelect={handleSelect}
      />
      <ConnectorConfigDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        item={drawerItem}
      />
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  children,
  dotClass,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  dotClass?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded px-2.5 h-8 text-xs font-medium transition-colors ${
        active
          ? 'bg-arrivia-blue-600 text-white'
          : 'text-arrivia-slate-600 hover:bg-arrivia-slate-50'
      }`}
    >
      {dotClass && (
        <span className={`h-1.5 w-1.5 rounded-full ${dotClass}`} />
      )}
      {children}
    </button>
  );
}

export default function ConnectorsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ConnectorsContent />
    </Suspense>
  );
}
