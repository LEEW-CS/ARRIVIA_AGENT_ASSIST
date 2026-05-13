import {
  Anchor,
  BedDouble,
  Ship,
  Plane,
  Armchair,
  Wine,
  BookCheck,
  HelpCircle,
  Wand2,
  WifiOff,
  Car,
  Shield,
  MicVocal,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { Preference, PrefStatus } from '@/lib/types';

const iconMap = {
  anchor: Anchor,
  bed: BedDouble,
  ship: Ship,
  plane: Plane,
  seat: Armchair,
  wine: Wine,
  passport: BookCheck,
  car: Car,
  shield: Shield,
} as const;

interface PreferencesPanelProps {
  preferences: Preference[];
}

export function PreferencesPanel({ preferences }: PreferencesPanelProps) {
  const notOnFile = preferences.filter((p) => p.status === 'not-on-file').length;
  const feedUnavailable = preferences.filter((p) => p.status === 'feed-unavailable').length;
  const inferred = preferences.filter((p) => p.status === 'inferred').length;

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between gap-2">
        <CardTitle>Preferences</CardTitle>
        <div className="flex items-center gap-1.5 flex-wrap justify-end">
          {notOnFile > 0 && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 text-amber-800 ring-1 ring-amber-200 px-2 py-0.5 text-[10px] font-medium">
              <MicVocal className="h-3 w-3" />
              {notOnFile} to capture
            </span>
          )}
          {feedUnavailable > 0 && (
            <span className="inline-flex items-center gap-1 rounded-full bg-arrivia-slate-100 text-arrivia-slate-700 ring-1 ring-arrivia-slate-200 px-2 py-0.5 text-[10px] font-medium">
              <WifiOff className="h-3 w-3" />
              {feedUnavailable} feed offline
            </span>
          )}
          {inferred > 0 && (
            <span className="inline-flex items-center gap-1 rounded-full bg-arrivia-coral-50 text-arrivia-coral-700 ring-1 ring-arrivia-coral-200 px-2 py-0.5 text-[10px] font-medium">
              <Wand2 className="h-3 w-3" />
              {inferred} inferred
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <ul className="space-y-2.5">
          {preferences.map((p) => (
            <PreferenceRow key={p.label} pref={p} />
          ))}
        </ul>

        {(notOnFile > 0 || feedUnavailable > 0) && (
          <div className="mt-3 pt-3 border-t border-arrivia-slate-100 space-y-1">
            {notOnFile > 0 && (
              <p className="text-[11px] text-arrivia-slate-500 flex items-start gap-1.5">
                <MicVocal className="h-3 w-3 text-amber-600 mt-0.5 shrink-0" />
                <span>
                  <span className="font-medium text-amber-700">Not on file</span>, no record yet, the talk track includes capture prompts.
                </span>
              </p>
            )}
            {feedUnavailable > 0 && (
              <p className="text-[11px] text-arrivia-slate-500 flex items-start gap-1.5">
                <WifiOff className="h-3 w-3 text-arrivia-slate-500 mt-0.5 shrink-0" />
                <span>
                  <span className="font-medium text-arrivia-slate-700">Not currently available</span>, on file but the source feed is offline, value will return.
                </span>
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function PreferenceRow({ pref }: { pref: Preference }) {
  const Icon = iconMap[pref.iconKey] ?? Anchor;
  const status: PrefStatus = pref.status ?? 'on-file';

  const stateClasses = {
    'on-file': {
      iconWrap: 'bg-arrivia-blue-50 text-arrivia-blue-600',
      value: 'text-arrivia-slate-800',
      prefix: null as React.ReactNode,
    },
    'not-on-file': {
      iconWrap: 'bg-amber-50 text-amber-600',
      value: 'italic font-medium text-amber-700',
      prefix: <HelpCircle className="h-3 w-3" />,
    },
    'feed-unavailable': {
      iconWrap: 'bg-arrivia-slate-100 text-arrivia-slate-500',
      value: 'italic font-medium text-arrivia-slate-600',
      prefix: <WifiOff className="h-3 w-3" />,
    },
    inferred: {
      iconWrap: 'bg-arrivia-coral-50 text-arrivia-coral-600',
      value: 'font-medium text-arrivia-coral-700',
      prefix: <Wand2 className="h-3 w-3" />,
    },
  } as const;

  const s = stateClasses[status];

  return (
    <li className="flex items-center gap-3">
      <div
        className={cn(
          'flex h-7 w-7 shrink-0 items-center justify-center rounded-md',
          s.iconWrap
        )}
      >
        <Icon className="h-3.5 w-3.5" />
      </div>
      <div className="min-w-0 flex-1 flex items-center justify-between gap-2">
        <span className="text-xs text-arrivia-slate-500 shrink-0">{pref.label}</span>
        <span
          className={cn(
            'text-sm truncate text-right flex items-center gap-1',
            s.value
          )}
        >
          {s.prefix}
          {pref.value}
        </span>
      </div>
    </li>
  );
}
