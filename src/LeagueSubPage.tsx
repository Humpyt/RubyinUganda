import { ArrowLeft, CloudSun, Menu } from 'lucide-react';
import { useState } from 'react';
import DesktopTopNav from './DesktopTopNav';
import MobileTopNav from './MobileTopNav';
import SharedFooter from './SharedFooter';
import type { LeagueGender, LeaguePageData } from './leaguePages';
import { buildLeagueRoute, leagueMenuLinks } from './leaguePages';
import { buildFixtureResultsRoute, fixtureResultsMenuLinks } from './fixtureResultsPages';

interface LeagueSubPageProps {
  activePage: LeaguePageData;
  onBack: () => void;
}

const buildRegionRoute = (regionTitle: string, link: string) =>
  `#/regions/${regionTitle.toLowerCase().replace(/&/g, 'and').replace(/\s+/g, '-')}/${link.toLowerCase().replace(/&/g, 'and').replace(/\s+/g, '-')}`;

export default function LeagueSubPage({ activePage, onBack }: LeagueSubPageProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const currentIndex = Math.max(0, activePage.standings.findIndex((row) => row.rank === 1));
  const leader = activePage.standings[currentIndex];
  const runnerUp = activePage.standings[1];
  const centralLeader = activePage.standings[2] ?? activePage.standings[0];
  const westernLeader = activePage.standings[3] ?? activePage.standings[1] ?? activePage.standings[0];
  const northernLeader = activePage.standings[4] ?? activePage.standings[2] ?? activePage.standings[0];
  const easternLeader = activePage.standings[1] ?? activePage.standings[0];
  const topMenuPanels = [
    {
      label: 'Latest',
      href: '#/',
      featured: false,
      links: [
        { label: 'Homepage', href: '#/' },
        { label: 'Matchday Wear', href: '#/shop/matchday-wear' },
        { label: 'Fan Essentials', href: '#/shop/fan-essentials' },
      ],
    },
    {
      label: 'Teams',
      href: buildRegionRoute('Central', 'Men'),
      featured: false,
      links: [
        { label: 'Central', href: buildRegionRoute('Central', 'Men') },
        { label: 'Northern', href: buildRegionRoute('Northern', 'Men') },
        { label: 'Eastern', href: buildRegionRoute('Eastern', 'Men') },
        { label: 'Western', href: buildRegionRoute('Western', 'Men') },
        { label: 'Schools', href: buildRegionRoute('Schools', 'Boys') },
        { label: 'National Team', href: buildRegionRoute('National Team', 'Men') },
      ],
    },
    {
      label: 'Leagues',
      href: buildLeagueRoute(activePage.league, 'men'),
      featured: false,
      links: leagueMenuLinks,
    },
    {
      label: 'RIU',
      href: '#/shop/matchday-wear',
      featured: false,
      links: [
        { label: 'Matchday Wear', href: '#/shop/matchday-wear' },
        { label: 'Fan Essentials', href: '#/shop/fan-essentials' },
        { label: 'Accessories', href: '#/shop/accessories' },
      ],
    },
    {
      label: 'Fixture & Results',
      href: buildFixtureResultsRoute(activePage.league, 'men'),
      featured: true,
      links: fixtureResultsMenuLinks,
    },
  ] as const;

  const genderPills: { label: string; value: LeagueGender }[] = [
    { label: 'Men', value: 'men' },
    { label: 'Women', value: 'women' },
  ];

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#040507_0%,#09111b_22%,#06080d_55%,#030405_100%)] text-white">
      <div className="relative z-30 isolate border-t-4 border-b border-[#0f4aa6] bg-[linear-gradient(90deg,#050607_0%,#0a1320_48%,#10140f_100%)] px-2 py-2 text-white sm:px-3">
        <div className="flex w-full items-center justify-between gap-3 rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] px-3 py-2 shadow-[0_10px_26px_rgba(0,0,0,0.22)] backdrop-blur-xl">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/28 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            <ArrowLeft size={16} />
            Home
          </button>
          <div className="text-right">
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/65">League Section</div>
            <div className="text-sm font-semibold text-white">{activePage.title}</div>
          </div>
        </div>
      </div>

      <header className="relative z-[70] isolate border-b border-white/10 bg-[linear-gradient(180deg,rgba(4,6,9,0.96),rgba(8,12,18,0.92))] px-4 py-4 text-white shadow-[0_18px_40px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <a href="#/" className="inline-flex items-center">
            <img src="/logo-cutout.png" alt="Rugby in Uganda" className="h-20 w-auto object-contain sm:h-24 lg:h-28" />
          </a>
          <div className="hidden md:block">
            <DesktopTopNav menus={topMenuPanels} standaloneLink={{ label: 'Age Grade', href: buildRegionRoute('Schools', 'Boys') }} />
          </div>
        </div>
      </header>

      <section className="relative z-[90] border-b border-white/10 bg-black md:hidden">
        <div className="grid grid-cols-2 bg-black text-white">
          <div className="flex items-center justify-center gap-3 border-r border-white px-3 py-4">
            <CloudSun size={20} />
            <div className="text-left leading-tight">
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/75">Kampala Weather</div>
              <div className="text-sm font-semibold">Overcast 29C / 19C</div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((value) => !value)}
            className="flex items-center justify-center gap-3 py-4 text-xl font-semibold"
          >
            <Menu size={22} />
            <span className="text-2xl">Menu</span>
          </button>
        </div>
        {isMobileMenuOpen ? (
          <div className="border-t border-white/10 bg-black px-4 py-4">
            <MobileTopNav
              menus={topMenuPanels}
              standaloneLink={{ label: 'Age Grade', href: buildRegionRoute('Schools', 'Boys') }}
              onNavigate={() => setIsMobileMenuOpen(false)}
            />
          </div>
        ) : null}
      </section>

      <main>
        <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_22%),linear-gradient(135deg,#08101b_0%,#0f1823_42%,#11150f_100%)]">
          <div className="absolute inset-0 opacity-10">
            <div className="flex h-full items-center justify-center text-[10rem] font-black uppercase tracking-[0.08em]">
              {activePage.league}
            </div>
          </div>
          <div className="relative mx-auto max-w-[1380px] px-6 py-12">
            <div className="max-w-5xl">
              <div
                className="inline-flex rounded-full border px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em]"
                style={{ borderColor: `${activePage.accent}66`, color: activePage.accent }}
              >
                {activePage.subtitle}
              </div>
              <h1 className="mt-5 text-4xl font-black uppercase leading-[0.92] sm:text-5xl lg:text-6xl">
                {activePage.title}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/76">
                {activePage.summary}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {genderPills.map((pill) => (
                  <a
                    key={pill.value}
                    href={buildLeagueRoute(activePage.league, pill.value)}
                    className={`rounded-full border px-5 py-3 text-sm font-black uppercase tracking-[0.14em] transition-colors ${
                      activePage.gender === pill.value ? 'text-[#09111b]' : 'border-white/12 bg-white/6 text-white hover:bg-white/10'
                    }`}
                    style={activePage.gender === pill.value ? { backgroundColor: activePage.accent, borderColor: activePage.accent } : undefined}
                  >
                    {pill.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-10 flex gap-4 overflow-x-auto pb-2 [scrollbar-width:thin] snap-x snap-mandatory lg:grid lg:overflow-visible lg:pb-0 lg:snap-none lg:grid-cols-5">
              <div className="min-w-[280px] snap-start rounded-[22px] border border-white/12 bg-white/6 p-6 backdrop-blur-md lg:min-w-0">
                <div className="text-[10px] font-black uppercase tracking-[0.18em] text-white/55">Premier League Leaders</div>
                <div className="mt-3 text-2xl font-black uppercase leading-tight">{leader.team}</div>
                <div className="mt-2 text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: activePage.accent }}>{leader.points} points</div>
              </div>
              <div className="min-w-[280px] snap-start rounded-[22px] border border-white/12 bg-white/6 p-6 backdrop-blur-md lg:min-w-0">
                <div className="text-[10px] font-black uppercase tracking-[0.18em] text-white/55">Central League Leaders</div>
                <div className="mt-3 text-2xl font-black uppercase leading-tight">{centralLeader.team}</div>
                <div className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/70">{centralLeader.points} points</div>
              </div>
              <div className="min-w-[280px] snap-start rounded-[22px] border border-white/12 bg-white/6 p-6 backdrop-blur-md lg:min-w-0">
                <div className="text-[10px] font-black uppercase tracking-[0.18em] text-white/55">Western League Leaders</div>
                <div className="mt-3 text-2xl font-black uppercase leading-tight">{westernLeader.team}</div>
                <div className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/70">{westernLeader.points} points</div>
              </div>
              <div className="min-w-[280px] snap-start rounded-[22px] border border-white/12 bg-white/6 p-6 backdrop-blur-md lg:min-w-0">
                <div className="text-[10px] font-black uppercase tracking-[0.18em] text-white/55">Northern League Leaders</div>
                <div className="mt-3 text-2xl font-black uppercase leading-tight">{northernLeader.team}</div>
                <div className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/70">{northernLeader.points} points</div>
              </div>
              <div className="min-w-[280px] snap-start rounded-[22px] border border-white/12 bg-white/6 p-6 backdrop-blur-md lg:min-w-0">
                <div className="text-[10px] font-black uppercase tracking-[0.18em] text-white/55">Eastern League Leaders</div>
                <div className="mt-3 text-2xl font-black uppercase leading-tight">{easternLeader.team}</div>
                <div className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/70">{easternLeader.points} points</div>
              </div>
            </div>
          </div>
        </section>

        <section id="league-standings" className="mx-auto max-w-[1380px] scroll-mt-8 px-6 py-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] font-black uppercase tracking-[0.18em] text-white/55">Standings</div>
                  <h2 className="mt-2 text-3xl font-black uppercase">{activePage.title}</h2>
                </div>
                <div
                  className="rounded-full px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em]"
                  style={{ backgroundColor: `${activePage.accent}20`, color: activePage.accent }}
                >
                  Live Table
                </div>
              </div>
              <div className="mt-6 space-y-3">
                {activePage.standings.map((row) => (
                  <div key={`${activePage.league}-${activePage.gender}-${row.rank}`} className="grid grid-cols-[52px_1fr_auto] items-center gap-4 rounded-[18px] border border-white/10 bg-black/18 px-4 py-4">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-[14px] text-lg font-black"
                      style={{ backgroundColor: row.rank === 1 ? activePage.accent : 'rgba(255,255,255,0.08)', color: row.rank === 1 ? '#08101b' : '#fff' }}
                    >
                      {row.rank}
                    </div>
                    <div>
                      <div className="text-lg font-black uppercase">{row.team}</div>
                      <div className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/55">
                        P {row.played} / W {row.won} / L {row.lost}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-black uppercase tracking-[0.16em] text-white/45">Points</div>
                      <div className="mt-1 text-2xl font-black">{row.points}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl">
                <div className="text-[11px] font-black uppercase tracking-[0.18em] text-white/55">League Snapshot</div>
                <h3 className="mt-3 text-3xl font-black uppercase">{activePage.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-white/74">
                  This division page keeps the focus on standings, momentum, and the active race between the leading clubs in the {activePage.league} competition.
                </p>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl">
                <div className="text-[11px] font-black uppercase tracking-[0.18em] text-white/55">Quick Switch</div>
                <div className="mt-4 grid gap-3">
                  {leagueMenuLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => {
                        window.sessionStorage.setItem('pendingScrollTarget', 'league-standings');
                      }}
                      className="rounded-[18px] border border-white/10 bg-black/18 px-4 py-4 text-sm font-black uppercase tracking-[0.14em] text-white transition-colors hover:bg-white/10"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SharedFooter />
    </div>
  );
}
