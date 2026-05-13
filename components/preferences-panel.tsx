import { Anchor, BedDouble, Ship, Plane, Armchair, Wine, BookCheck } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { preferences } from '@/lib/mock-data';
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

export function PreferencesPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferences</CardTitle>
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
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-arrivia-blue-50 text-arrivia-blue-600">
        <Icon className="h-3.5 w-3.5" />
      </div>
      <div className="min-w-0 flex-1 flex items-baseline justify-between gap-2">
        <span className="text-xs text-arrivia-slate-500 shrink-0">
          {pref.label}
        </span>
        <span className="text-sm font-medium text-arrivia-slate-800 truncate text-right">
          {pref.value}
        </span>
      </div>
    </li>
  );
}
