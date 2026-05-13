'use client';

import { useState, useRef, useEffect } from 'react';
import { MoreVertical, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { Connector } from '@/lib/types';

interface ConnectorCardProps {
  connector: Connector;
  focused?: boolean;
  onEdit?: () => void;
}

const statusMeta = {
  connected: {
    icon: CheckCircle2,
    label: 'Connected',
    className: 'text-emerald-600',
    dot: 'bg-emerald-500',
  },
  disconnected: {
    icon: XCircle,
    label: 'Disconnected',
    className: 'text-arrivia-slate-400',
    dot: 'bg-arrivia-slate-400',
  },
  error: {
    icon: AlertTriangle,
    label: 'Error',
    className: 'text-red-600',
    dot: 'bg-red-500',
  },
} as const;

export function ConnectorCard({ connector, focused, onEdit }: ConnectorCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [menuOpen]);

  const meta = statusMeta[connector.status];
  const StatusIcon = meta.icon;

  return (
    <Card
      id={`connector-${connector.id}`}
      className={cn(
        'p-4 transition-all hover:shadow-md',
        focused && 'ring-2 ring-arrivia-coral-400 ring-offset-2'
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xs font-bold tracking-tight',
            connector.accent
          )}
        >
          {connector.initials}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-arrivia-slate-900 truncate">
                {connector.name}
              </h3>
              <p className="text-[11px] text-arrivia-slate-500 mt-0.5">
                {connector.type}
              </p>
            </div>

            <div className="relative" ref={menuRef}>
              <button
                aria-label="Connector actions"
                onClick={() => setMenuOpen((o) => !o)}
                className="p-1 rounded text-arrivia-slate-400 hover:bg-arrivia-slate-100 hover:text-arrivia-slate-700 transition-colors"
              >
                <MoreVertical className="h-4 w-4" />
              </button>
              {menuOpen && (
                <div className="absolute right-0 top-7 z-20 w-40 rounded-lg border border-arrivia-slate-200 bg-white shadow-lg py-1 text-sm">
                  <MenuItem onClick={() => { setMenuOpen(false); onEdit?.(); }}>Edit</MenuItem>
                  <MenuItem onClick={() => { setMenuOpen(false); toast.success('Test successful', { description: `${connector.name} responded in 412 ms.` }); }}>
                    Test connection
                  </MenuItem>
                  <MenuItem onClick={() => { setMenuOpen(false); toast(`${connector.name} disabled`, { description: 'Will be re-enabled on next save.' }); }}>
                    Disable
                  </MenuItem>
                  <div className="border-t border-arrivia-slate-100 my-1" />
                  <MenuItem
                    danger
                    onClick={() => { setMenuOpen(false); toast(`${connector.name} removed`, { description: 'This is a demo, no change has been made.' }); }}
                  >
                    Remove
                  </MenuItem>
                </div>
              )}
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between gap-2">
            <div className={cn('flex items-center gap-1.5 text-[11px] font-medium', meta.className)}>
              <span className="relative flex h-1.5 w-1.5">
                <span className={cn('absolute inline-flex h-full w-full rounded-full opacity-70', connector.status === 'connected' && 'animate-ping', meta.dot)} />
                <span className={cn('relative inline-flex h-1.5 w-1.5 rounded-full', meta.dot)} />
              </span>
              <StatusIcon className="h-3 w-3" />
              {connector.status === 'error' && connector.errorMessage
                ? `Error, ${connector.errorMessage}`
                : meta.label}
            </div>
            {connector.lastSync && (
              <span className="text-[11px] text-arrivia-slate-400">
                Sync, {connector.lastSync}
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

function MenuItem({
  children,
  onClick,
  danger,
}: {
  children: React.ReactNode;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full text-left px-3 py-1.5 text-sm hover:bg-arrivia-slate-50 transition-colors',
        danger ? 'text-red-600 hover:bg-red-50' : 'text-arrivia-slate-700'
      )}
    >
      {children}
    </button>
  );
}
