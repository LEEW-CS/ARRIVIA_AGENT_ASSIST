'use client';

import Link from 'next/link';
import { Settings, Cable } from 'lucide-react';
import { ArriviaLogo } from './arrivia-logo';
import { CallStatusStrip } from './call-status-strip';
import { ScenarioToggle } from './scenario-toggle';
import type { Member } from '@/lib/types';

interface TopBarProps {
  member: Member;
  scenarioId: string;
  showScenarioToggle?: boolean;
  connectorsHref?: string;
}

export function TopBar({
  member,
  scenarioId,
  showScenarioToggle = true,
  connectorsHref = '/connectors',
}: TopBarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-arrivia-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center gap-5 px-6">
        <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="arrivia, home">
          <ArriviaLogo heightClass="h-8" />
        </Link>

        {showScenarioToggle && (
          <ScenarioToggle activeId={scenarioId} className="shrink-0 hidden md:inline-flex" />
        )}

        <div className="flex-1 min-w-0">
          <CallStatusStrip member={member} />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href={connectorsHref}
            className="hidden md:inline-flex items-center gap-2 rounded-md border border-arrivia-slate-200 bg-white px-3 h-9 text-sm text-arrivia-slate-700 hover:bg-arrivia-slate-50 hover:border-arrivia-slate-300 transition-colors"
          >
            <Cable className="h-4 w-4" />
            Connectors
          </Link>
          <button
            aria-label="Settings"
            className="inline-flex items-center justify-center h-9 w-9 rounded-md text-arrivia-slate-500 hover:bg-arrivia-slate-100 hover:text-arrivia-slate-700 transition-colors"
          >
            <Settings className="h-4 w-4" />
          </button>
          <div
            aria-label="Agent avatar"
            className="ml-1 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-arrivia-blue-500 to-arrivia-blue-700 text-xs font-semibold text-white"
          >
            JL
          </div>
        </div>
      </div>
    </header>
  );
}
