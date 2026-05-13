import {
  Plane,
  HelpCircle,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Crown,
  ChevronUp,
  Calendar,
  Building2,
  CreditCard,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { Member, MemberTier, Ownership, MemberSocial } from '@/lib/types';

interface MemberProfileProps {
  member: Member;
}

const tierMeta: Record<
  MemberTier,
  {
    gradient: string;
    pill: string;
    label: string;
    icon: React.ReactNode;
    order: number;
  }
> = {
  Bronze: {
    gradient: 'from-amber-800 via-amber-700 to-amber-500',
    pill: 'bg-amber-500 text-white ring-amber-300/50',
    label: 'Bronze',
    icon: <Crown className="h-3.5 w-3.5" />,
    order: 1,
  },
  Silver: {
    gradient: 'from-arrivia-slate-700 via-arrivia-slate-600 to-arrivia-blue-500',
    pill: 'bg-arrivia-slate-200 text-arrivia-slate-900 ring-arrivia-slate-100',
    label: 'Silver',
    icon: <Crown className="h-3.5 w-3.5" />,
    order: 2,
  },
  Gold: {
    gradient: 'from-amber-700 via-amber-500 to-yellow-400',
    pill: 'bg-yellow-400 text-amber-900 ring-yellow-200',
    label: 'Gold',
    icon: <Crown className="h-3.5 w-3.5" />,
    order: 3,
  },
  Platinum: {
    gradient: 'from-arrivia-blue-600 via-arrivia-blue-500 to-arrivia-blue-400',
    pill: 'bg-arrivia-coral-500 text-white ring-arrivia-coral-300/50',
    label: 'Platinum',
    icon: <Crown className="h-3.5 w-3.5 fill-current" />,
    order: 4,
  },
};

const tierLadder: MemberTier[] = ['Bronze', 'Silver', 'Gold', 'Platinum'];

export function MemberProfile({ member }: MemberProfileProps) {
  const t = tierMeta[member.tier];
  return (
    <Card className="overflow-hidden">
      <div className={cn('relative bg-gradient-to-br px-5 py-5 text-white', t.gradient)}>
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-arrivia-coral-300 blur-2xl" />
          <div className="absolute left-10 bottom-0 h-24 w-24 rounded-full bg-white blur-2xl" />
        </div>
        <div className="relative flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h2 className="text-xl font-semibold tracking-tight truncate">
              {member.name}
            </h2>
            <p className="mt-0.5 text-xs text-white/70 truncate">
              {member.membershipNumber}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              <TierLadder current={member.tier} />
              <TenureBadge years={member.tenureYears} since={member.memberSince} />
            </div>
          </div>
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/15 text-base font-semibold backdrop-blur ring-2 ring-white/20">
            {member.initials}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 divide-x divide-arrivia-slate-100 border-t border-arrivia-slate-100">
        <Stat label="Member since" value={member.memberSince} icon={<Calendar className="h-3 w-3" />} />
        <Stat label="Lifetime value" value={member.lifetimeValue} />
      </div>

      <div className="grid grid-cols-2 divide-x divide-arrivia-slate-100 border-t border-arrivia-slate-100">
        <Stat
          label="Home airport"
          value={member.homeAirport}
          icon={<Plane className="h-3 w-3" />}
          missing={member.homeAirportStatus === 'not-on-file'}
        />
        <Stat label="Points balance" value={`${member.pointsBalance} pts`} accent="coral" />
      </div>

      {member.address && (
        <div className="border-t border-arrivia-slate-100 px-4 py-3">
          <div className="flex items-start gap-2">
            <MapPin className="h-3.5 w-3.5 text-arrivia-slate-400 mt-0.5 shrink-0" />
            <div className="min-w-0">
              <div className="text-[10px] uppercase tracking-wider text-arrivia-slate-400">
                Mailing address
              </div>
              <div className="text-xs text-arrivia-slate-700 mt-0.5 leading-relaxed">
                {member.address.street}
                <br />
                {member.address.city}, {member.address.state} {member.address.zip}
              </div>
            </div>
          </div>
        </div>
      )}

      {member.ownership && <OwnershipCard ownership={member.ownership} />}

      {member.socials && member.socials.length > 0 && (
        <SocialsRow socials={member.socials} />
      )}
    </Card>
  );
}

function TierLadder({ current }: { current: MemberTier }) {
  const t = tierMeta[current];
  return (
    <div className="inline-flex items-center gap-1 rounded-full bg-white/15 backdrop-blur px-1 py-0.5 ring-1 ring-white/20">
      <span
        className={cn(
          'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset',
          t.pill
        )}
      >
        {t.icon}
        {t.label}
      </span>
      <span className="hidden sm:inline-flex items-center gap-0.5 pr-1.5 text-[10px] text-white/70 font-medium">
        {tierLadder.map((x, i) => (
          <span
            key={x}
            className={cn(
              'h-1 rounded-full transition-all',
              tierMeta[x].order <= t.order ? 'w-3 bg-white' : 'w-2 bg-white/30'
            )}
          />
        ))}
      </span>
    </div>
  );
}

function TenureBadge({ years, since }: { years: number; since: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-white/15 backdrop-blur px-2 py-0.5 text-[11px] font-medium ring-1 ring-white/20">
      <Calendar className="h-3 w-3" />
      {years} {years === 1 ? 'year' : 'years'} a member
      <span className="text-white/60 font-normal">, since {since}</span>
    </span>
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

function OwnershipCard({ ownership }: { ownership: Ownership }) {
  if (ownership.kind === 'timeshare') {
    return (
      <div className="border-t border-arrivia-slate-100 px-4 py-3 bg-arrivia-cream-50/40">
        <div className="flex items-start gap-2">
          <Building2 className="h-3.5 w-3.5 text-arrivia-coral-500 mt-0.5 shrink-0" />
          <div className="min-w-0 flex-1">
            <div className="text-[10px] uppercase tracking-wider text-arrivia-slate-400">
              Timeshare ownership
            </div>
            <div className="text-sm font-semibold text-arrivia-slate-800 mt-0.5">
              {ownership.brand}
            </div>
            {ownership.since && (
              <div className="text-[11px] text-arrivia-slate-500 mt-0.5">
                Owner since {ownership.since}
              </div>
            )}
          </div>
          <span className="inline-flex items-center rounded-full bg-arrivia-coral-50 px-2 py-0.5 text-[10px] font-semibold text-arrivia-coral-700 ring-1 ring-arrivia-coral-200">
            Cross-sell candidate
          </span>
        </div>
      </div>
    );
  }
  return (
    <div className="border-t border-arrivia-slate-100 px-4 py-3 bg-arrivia-cream-50/40">
      <div className="flex items-start gap-2">
        <CreditCard className="h-3.5 w-3.5 text-arrivia-blue-600 mt-0.5 shrink-0" />
        <div className="min-w-0 flex-1">
          <div className="text-[10px] uppercase tracking-wider text-arrivia-slate-400">
            Channel partner
          </div>
          <div className="text-sm font-semibold text-arrivia-slate-800 mt-0.5">
            {ownership.partner}
          </div>
          {ownership.programLabel && (
            <div className="text-[11px] text-arrivia-slate-500 mt-0.5">
              {ownership.programLabel}
            </div>
          )}
        </div>
        <span className="inline-flex items-center rounded-full bg-arrivia-blue-50 px-2 py-0.5 text-[10px] font-semibold text-arrivia-blue-700 ring-1 ring-arrivia-blue-200">
          Business travel
        </span>
      </div>
    </div>
  );
}

function SocialsRow({ socials }: { socials: MemberSocial[] }) {
  const iconMap = {
    facebook: Facebook,
    instagram: Instagram,
    linkedin: Linkedin,
    twitter: Twitter,
  } as const;
  return (
    <div className="border-t border-arrivia-slate-100 px-4 py-2.5 flex items-center gap-1.5 flex-wrap">
      <span className="text-[10px] uppercase tracking-wider text-arrivia-slate-400 mr-1">
        Socials
      </span>
      {socials.map((s) => {
        const Icon = iconMap[s.platform];
        return (
          <a
            key={s.platform}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-full border border-arrivia-slate-200 bg-white px-2 py-0.5 text-[11px] text-arrivia-slate-600 hover:border-arrivia-blue-300 hover:bg-arrivia-blue-50 hover:text-arrivia-blue-700 transition-colors"
          >
            <Icon className="h-3 w-3" />
            <span className="truncate max-w-[140px]">{s.handle}</span>
          </a>
        );
      })}
    </div>
  );
}
