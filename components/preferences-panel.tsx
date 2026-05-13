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
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { Preference } from '@/lib/types';

const iconMap = {
  anchor: Anchor,
  bed: BedDouble,
  ship: Ship,
  plane: Plane,
  seat: Armchair,
  wine: Wine,
  passport: BookCheck,
} as const;

interface PreferencesPanelProps {
  preferences: Preference[];
}

export function PreferencesPanel({ preferences }: PreferencesPanelProps) {
  const missingCount = preferences.filter((p) => p.isMissing).length;

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between gap-2">
        <CardTitle>Preferences</CardTitle>
        {missingCount > 0 && (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 text-amber-800 ring-1 ring-amber-200 px-2 py-0.5 text-[10px] font-medium">
            <HelpCircle className="h-3 w-3" />
            {missingCount} not on file
          </span>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        <ul className="space-y-2.5">
          {preferences.map((p) => (
            <PreferenceRow key={p.label} pref={p} />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function PreferenceRow({ pref }: { pref: Preference }) {
  const Icon = iconMap[pref.iconKey];
  return (
    <li className="flex items-center gap-3">
      <div
        className={cn(
          'flex h-7 w-7 shrink-0 items-center justify-center rounded-md',
          pref.isMissing
            ? 'bg-amber-50 text-amber-600'
            : pref.isInferred
            ? 'bg-arrivia-coral-50 text-arrivia-coral-600'
            : 'bg-arrivia-blue-50 text-arrivia-blue-600'
        )}
      >
        <Icon className="h-3.5 w-3.5" />
      </div>
      <div className="min-w-0 flex-1 flex items-center justify-between gap-2">
        <span className="text-xs text-arrivia-slate-500 shrink-0">{pref.label}</span>
        <span
          className={cn(
            'text-sm truncate text-right flex items-center gap-1',
            pref.isMissing
              ? 'italic font-medium text-amber-700'
              : pref.isInferred
              ? 'font-medium text-arrivia-coral-700'
              : 'font-medium text-arrivia-slate-800'
          )}
        >
          {pref.isInferred && <Wand2 className="h-3 w-3" />}
          {pref.value}
        </span>
      </div>
    </li>
  );
}
