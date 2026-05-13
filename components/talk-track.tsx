'use client';

import { useEffect, useState } from 'react';
import { Copy, RefreshCw, Sparkles, Check, Compass } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { TalkBubble } from '@/lib/types';
import { cn } from '@/lib/utils';

interface TalkTrackProps {
  bubbles: TalkBubble[];
  tone: 'confident' | 'discovery';
}

export function TalkTrack({ bubbles, tone }: TalkTrackProps) {
  const [regenerating, setRegenerating] = useState(false);
  const [version, setVersion] = useState(0);

  // reset copied/visual state when the underlying scenario changes
  useEffect(() => {
    setVersion((v) => v + 1);
  }, [bubbles]);

  const handleRegenerate = () => {
    setRegenerating(true);
    setTimeout(() => {
      setRegenerating(false);
      toast.success('Talk track regenerated', {
        description: 'Symphony AI refreshed the suggested phrasing.',
      });
    }, 1200);
  };

  const isDiscovery = tone === 'discovery';

  return (
    <Card>
      <CardHeader className="flex-row items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <CardTitle className="text-base">
              {isDiscovery ? 'Suggested discovery flow' : 'Suggested talk track'}
            </CardTitle>
            {isDiscovery && (
              <Badge variant="warn" className="text-[10px]">
                <Compass className="h-3 w-3" />
                Discovery mode, limited history
              </Badge>
            )}
          </div>
          <p className="text-[11px] text-arrivia-slate-400 mt-0.5 flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-arrivia-coral-500" />
            Powered by Arrivia Symphony AI
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRegenerate}
          disabled={regenerating}
        >
          <RefreshCw className={`h-3.5 w-3.5 ${regenerating ? 'animate-spin' : ''}`} />
          Regenerate
        </Button>
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        {bubbles.map((bubble, i) => (
          <TalkBubbleCard key={`${version}-${i}`} bubble={bubble} index={i} />
        ))}
      </CardContent>
    </Card>
  );
}

const toneStyles = {
  success: 'success',
  warn: 'warn',
  muted: 'muted',
} as const;

function TalkBubbleCard({
  bubble,
  index,
}: {
  bubble: TalkBubble;
  index: number;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(bubble.text).catch(() => {});
    }
    setCopied(true);
    toast('Copied to clipboard', { description: `Stage: ${bubble.stage}` });
    setTimeout(() => setCopied(false), 1500);
  };

  const badgeVariant = toneStyles[bubble.confidenceTone ?? 'success'];

  return (
    <div className="group rounded-xl border border-arrivia-slate-100 bg-arrivia-cream-50/40 p-3.5 hover:border-arrivia-blue-200 hover:bg-white transition-colors">
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-arrivia-blue-600 text-[10px] font-semibold text-white">
            {index + 1}
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-wide text-arrivia-blue-700">
            {bubble.stage}
          </span>
          <Badge variant={badgeVariant} className={cn('text-[10px]')}>
            {bubble.confidence}
          </Badge>
        </div>
        <button
          aria-label="Copy"
          onClick={handleCopy}
          className="p-1 rounded text-arrivia-slate-400 hover:bg-arrivia-slate-100 hover:text-arrivia-slate-700 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        </button>
      </div>
      <p className="text-sm leading-relaxed text-arrivia-slate-700">{bubble.text}</p>
    </div>
  );
}
