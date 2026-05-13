import { TopBar } from '@/components/top-bar';
import { MemberProfile } from '@/components/member-profile';
import { PreferencesPanel } from '@/components/preferences-panel';
import { TripHistory } from '@/components/trip-history';
import { TalkTrack } from '@/components/talk-track';
import { RecommendedOffers } from '@/components/recommended-offers';
import { DataSourcesStrip } from '@/components/data-sources-strip';

export default function AgentConsole() {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />

      <main className="flex-1 mx-auto w-full max-w-[1600px] px-6 py-6">
        <div className="grid grid-cols-12 gap-6">
          <section className="col-span-12 lg:col-span-5 space-y-5">
            <MemberProfile />
            <PreferencesPanel />
            <TripHistory />
          </section>

          <section className="col-span-12 lg:col-span-7 space-y-5">
            <TalkTrack />
            <RecommendedOffers />
            <DataSourcesStrip />
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
