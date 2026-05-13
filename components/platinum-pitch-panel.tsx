'use client';

import { useState } from 'react';
import { Crown, ChevronDown, ChevronUp, Copy, Check, Sparkles, ArrowUpRight } from 'lucide-react';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { PlatinumPitch } from '@/lib/types';

interface PlatinumPitchPanelProps {
  pitch: PlatinumPitch;
}

export function PlatinumPitchPanel({ pitch }: PlatinumPitchPanelProps) {
  const [open, setOpen] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(pitch.ctaLine).catch(() => {});
    }
    setCopied(true);
    toast('Pitch line copied', { description: 'Paste into chat or use verbatim.' });
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Card className="overflow-hidden border-arrivia-coral-200 ring-1 ring-arrivia-coral-100">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left flex items-center justify-between gap-2 px-5 py-3 bg-gradient-to-r from-arrivia-coral-500 to-arrivia-coral-600 text-white hover:from-arrivia-coral-600 hover:to-arrivia-coral-700 transition-colors"
        aria-expanded={open}
      >
        <div className="flex items-center gap-2 min-w-0">
          <Crown className="h-4 w-4 shrink-0" />
          <span className="text-sm font-semibold tracking-tight truncate">
            Pitch a Platinum upgrade
          </span>
          <Badge className="bg-white/20 text-white ring-white/30 text-[10px] hidden sm:inline-flex">
            Optional talk track
          </Badge>
        </div>
        {open ? (
          <ChevronUp className="h-4 w-4 shrink-0" />
        ) : (
          <ChevronDown className="h-4 w-4 shrink-0" />
        )}
      </button>

      {open && (
        <div className="px-5 py-4 space-y-3 bg-arrivia-coral-50/40">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="h-3 w-3 text-arrivia-coral-600" />
              <span className="text-[11px] uppercase tracking-wider text-arrivia-coral-700 font-semibold">
                Why pitch now
              </span>
            </div>
            <h4 className="text-sm font-semibold text-arrivia-slate-900">{pitch.headline}</h4>
            <p className="text-[12px] text-arrivia-slate-600 mt-1 leading-relaxed">
              {pitch.example}
            </p>
          </div>

          <div>
            <div className="text-[10px] uppercase tracking-wider text-arrivia-slate-500 font-semibold mb-1.5">
              What Platinum opens up
            </div>
            <ul className="space-y-1.5">
              {pitch.bullets.map((b, i) => (
                <li key={i} className="text-[12px] text-arrivia-slate-700 leading-relaxed flex items-start gap-1.5">
                  <ArrowUpRight className="h-3 w-3 text-arrivia-coral-600 mt-0.5 shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-arrivia-coral-200 bg-white p-3">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-[10px] uppercase tracking-wider text-arrivia-coral-700 font-semibold">
                Use this line
              </span>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1 rounded text-[11px] text-arrivia-slate-500 hover:text-arrivia-slate-800 transition-colors"
              >
                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <p className="text-[13px] text-arrivia-slate-800 italic leading-relaxed">
              &ldquo;{pitch.ctaLine}&rdquo;
            </p>
          </div>
        </div>
      )}
    </Card>
  );
}
