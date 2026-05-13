'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { TopBar } from '@/components/top-bar';
import { MemberProfile } from '@/components/member-profile';
import { PreferencesPanel } from '@/components/preferences-panel';
import { TripHistory } from '@/components/trip-history';
import { TalkTrack } from '@/components/talk-track';
import { RecommendedOffers } from '@/components/recommended-offers';
import { DataSourcesStrip } from '@/components/data-sources-strip';
import { AlertBanner } from '@/components/alert-banner';
import { ScenarioToggle } from '@/components/scenario-toggle';
import { getScenario } from '@/lib/mock-data';

function AgentConsoleInner() {
  const params = useSearchParams();
  const scenario = getScenario(params.get('scenario'));

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar
        member={scenario.member}
        scenarioId={scenario.id}
        connectorsHref={`/connectors?scenario=${scenario.id}`}
      />

      <main className="flex-1 mx-auto w-full max-w-[1600px] px-6 py-6">
        <div className="mb-5 flex md:hidden">
          <ScenarioToggle activeId={scenario.id} />
        </div>

        <div className="mb-4 flex items-center gap-3 text-[12px] text-arrivia-slate-500">
          <span className="inline-flex items-center rounded-full bg-arrivia-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-arrivia-slate-600">
            Scenario {scenario.id.toUpperCase()}
          </span>
          <span className="truncate">{scenario.tagline}</span>
        </div>

        {scenario.alerts && scenario.alerts.length > 0 && (
          <div className="mb-5">
            <AlertBanner alerts={scenario.alerts} />
          </div>
        )}

        <div className="grid grid-cols-12 gap-6">
          <section className="col-span-12 lg:col-span-5 space-y-5">
            <MemberProfile member={scenario.member} />
            <PreferencesPanel preferences={scenario.preferences} />
            <TripHistory trips={scenario.trips} />
          </section>

          <section className="col-span-12 lg:col-span-7 space-y-5">
            <TalkTrack bubbles={scenario.talkTrack} tone={scenario.talkTrackTone} />
            <RecommendedOffers
              offers={scenario.offers}
              header={scenario.offersHeader}
              subheader={scenario.offersSubheader}
            />
            <DataSourcesStrip sources={scenario.dataSources} scenarioId={scenario.id} />
          </section>
        </div>
      </main>

      <footer className="border-t border-arrivia-slate-100 bg-white">
        <div className="mx-auto max-w-[1600px] px-6 py-3 flex items-center justify-between text-[11px] text-arrivia-slate-400">
          <span>Conceptual demo, no live integrations, no real PII.</span>
          <span>arrivia Agent Assist, prototype</span>
        </div>
      </footer>
    </div>
  );
}

export default function AgentConsole() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <AgentConsoleInner />
    </Suspense>
  );
}
