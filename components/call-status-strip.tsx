'use client';

import { useEffect, useState } from 'react';
import { Phone, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Member } from '@/lib/types';

function format(secs: number) {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  const mm = String(m).padStart(2, '0');
  const ss = String(s).padStart(2, '0');
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

interface CallStatusStripProps {
  member: Member;
}

export function CallStatusStrip({ member }: CallStatusStripProps) {
  const [elapsed, setElapsed] = useState(134);

  useEffect(() => {
    setElapsed(134);
    const t = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(t);
  }, [member.membershipNumber]);

  const intentMissing = member.ivrIntentMissing;

  return (
    <div className="flex items-center gap-4 rounded-full border border-arrivia-slate-200 bg-arrivia-cream-50 px-4 py-1.5">
      <div className="flex items-center gap-2 shrink-0">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <Phone className="h-3.5 w-3.5 text-arrivia-slate-600" />
        <span className="text-xs font-medium text-arrivia-slate-700">
          Connected, {format(elapsed)}
        </span>
      </div>

      <span className="hidden md:block h-4 w-px bg-arrivia-slate-200" />

      <div className="hidden md:flex items-center gap-2 min-w-0">
        <span className="text-xs font-semibold text-arrivia-slate-900 truncate">
          {member.name}
        </span>
        <span className="text-[10px] text-arrivia-slate-400">,</span>
        <span className="text-[11px] text-arrivia-slate-500 truncate">
          {member.membershipNumber}
        </span>
      </div>

      <span className="hidden lg:block h-4 w-px bg-arrivia-slate-200" />

      <div className="hidden lg:flex items-center gap-1.5 min-w-0">
        <span className="text-[10px] uppercase tracking-wide text-arrivia-slate-400 shrink-0">
          IVR
        </span>
        <span
          className={cn(
            'text-[11px] truncate flex items-center gap-1',
            intentMissing
              ? 'italic text-amber-700'
              : 'italic text-arrivia-slate-600'
          )}
        >
          {intentMissing && <HelpCircle className="h-3 w-3" />}
          {member.ivrIntent}
        </span>
      </div>
    </div>
  );
}
