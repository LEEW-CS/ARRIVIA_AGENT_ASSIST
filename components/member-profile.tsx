import { Plane, Sparkles, HelpCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { Member } from '@/lib/types';

const tierStyles = {
  Platinum: {
    pill: 'bg-arrivia-coral-500 text-white ring-arrivia-coral-300/50',
    gradient: 'from-arrivia-blue-600 via-arrivia-blue-500 to-arrivia-blue-400',
  },
  Gold: {
    pill: 'bg-amber-500 text-white ring-amber-300/50',
    gradient: 'from-arrivia-blue-600 via-arrivia-blue-500 to-arrivia-blue-400',
  },
  Silver: {
    pill: 'bg-arrivia-slate-500 text-white ring-arrivia-slate-300/50',
    gradient: 'from-arrivia-slate-700 via-arrivia-slate-600 to-arrivia-blue-500',
  },
  Member: {
    pill: 'bg-arrivia-slate-400 text-white ring-arrivia-slate-300/50',
    gradient: 'from-arrivia-slate-700 via-arrivia-slate-600 to-arrivia-slate-500',
  },
} as const;

interface MemberProfileProps {
  member: Member;
}

export function MemberProfile({ member }: MemberProfileProps) {
  const t = tierStyles[member.tier] ?? tierStyles.Member;
  return (
    <Card className="overflow-hidden">
      <div className={cn('relative bg-gradient-to-br px-5 py-5 text-white', t.gradient)}>
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-arrivia-coral-300 blur-2xl" />
          <div className="absolute left-10 bottom-0 h-24 w-24 rounded-full bg-white blur-2xl" />
        </div>
        <div className="relative flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-semibold tracking-tight truncate">
                {member.name}
              </h2>
              <Badge variant="coral" className={cn(t.pill)}>
                <Sparkles className="h-3 w-3" />
                {member.tier}
              </Badge>
            </div>
            <p className="mt-0.5 text-xs text-white/70">
              {member.membershipNumber}
            </p>
          </div>
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/15 text-base font-semibold backdrop-blur">
            {member.initials}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 divide-x divide-arrivia-slate-100 border-t border-arrivia-slate-100">
        <Stat label="Member since" value={member.memberSince} />
        <Stat label="Lifetime value" value={member.lifetimeValue} />
      </div>
      <div className="grid grid-cols-2 divide-x divide-arrivia-slate-100 border-t border-arrivia-slate-100">
        <Stat
          label="Home airport"
          value={member.homeAirport}
          icon={<Plane className="h-3 w-3" />}
          missing={member.homeAirportMissing}
        />
        <Stat
          label="Points balance"
          value={`${member.pointsBalance} pts`}
          accent="coral"
        />
      </div>
    </Card>
  );
}

function Stat({
  label,
  value,
  icon,
  accent,
  missing,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
  accent?: 'coral';
  missing?: boolean;
}) {
  return (
    <div className="px-4 py-3">
      <div className="text-[10px] uppercase tracking-wider text-arrivia-slate-400 flex items-center gap-1">
        {icon}
        {label}
      </div>
      <div
        className={cn(
          'text-sm font-semibold mt-0.5 flex items-center gap-1',
          missing
            ? 'text-amber-700 italic font-medium'
            : accent === 'coral'
            ? 'text-arrivia-coral-600'
            : 'text-arrivia-slate-800'
        )}
      >
        {missing && <HelpCircle className="h-3 w-3" />}
        {value}
      </div>
    </div>
  );
}
