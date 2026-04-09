import { useEffect, useRef, useState } from 'react';
import { Facebook, Instagram, Twitter, ExternalLink, ArrowLeft, CloudSun, Menu } from 'lucide-react';
import DesktopTopNav from './DesktopTopNav';
import MobileTopNav from './MobileTopNav';
import SharedFooter from './SharedFooter';
import type { RegionalClub } from './regionalClubs';
import { buildClubRoute } from './regionalClubs';
import { buildLeagueRoute, leagueMenuLinks } from './leaguePages';
import { buildFixtureResultsRoute, fixtureResultsMenuLinks } from './fixtureResultsPages';

interface ClubProfilePageProps {
  club: RegionalClub;
  activeTab: string;
}

const profileTabs = [
  { key: 'news', label: 'Shop' },
  { key: 'fixtures-results', label: 'Fixtures & Results' },
  { key: 'standings', label: 'Standings' },
  { key: 'squad', label: 'Squad' },
  { key: 'statistics', label: 'Statistics' },
  { key: 'tickets', label: 'Tickets' },
] as const;

export default function ClubProfilePage({ club, activeTab }: ClubProfilePageProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const currentTab = profileTabs.find((tab) => tab.key === activeTab) ?? profileTabs[0];
  const contentSectionRef = useRef<HTMLElement | null>(null);
  const buildRegionRoute = (regionTitle: string, link: string) =>
    `#/regions/${regionTitle.toLowerCase().replace(/&/g, 'and').replace(/\s+/g, '-')}/${link.toLowerCase().replace(/&/g, 'and').replace(/\s+/g, '-')}`;
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
      href: buildRegionRoute(club.region, 'Men'),
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
      href:
        club.region === 'Central'
          ? buildLeagueRoute('central', 'men')
          : club.region === 'Eastern'
            ? buildLeagueRoute('eastern', 'men')
            : club.region === 'Northern'
              ? buildLeagueRoute('northern', 'men')
              : club.region === 'Western'
                ? buildLeagueRoute('western', 'men')
                : buildLeagueRoute('premiership', 'men'),
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
      href:
        club.region === 'Central'
          ? buildFixtureResultsRoute('central', 'men')
          : club.region === 'Eastern'
            ? buildFixtureResultsRoute('eastern', 'men')
            : club.region === 'Northern'
              ? buildFixtureResultsRoute('northern', 'men')
              : club.region === 'Western'
                ? buildFixtureResultsRoute('western', 'men')
                : buildFixtureResultsRoute('premiership', 'men'),
      featured: true,
      links: fixtureResultsMenuLinks,
    },
  ] as const;

  useEffect(() => {
    contentSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [activeTab, club.slug]);

  return (
    <div className="min-h-screen bg-[#f2f0eb] text-[#111]">
      <div className="relative z-30 isolate border-t-4 border-b border-[#0f4aa6] bg-[linear-gradient(90deg,#050607_0%,#0a1320_48%,#10140f_100%)] px-2 py-2 text-white sm:px-3">
        <div className="flex w-full items-center justify-between gap-3 rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] px-3 py-2 shadow-[0_10px_26px_rgba(0,0,0,0.22)] backdrop-blur-xl">
          <a
            href={`#/regions/${club.region.toLowerCase().replace(/&/g, 'and').replace(/\s+/g, '-')}/men`}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/28 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            <ArrowLeft size={16} />
            Back To Clubs
          </a>
          <div className="text-right">
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/65">Club Profile</div>
            <div className="text-sm font-semibold text-white">{club.name}</div>
          </div>
        </div>
      </div>

      <header className="relative z-[70] isolate border-b border-white/10 bg-[linear-gradient(180deg,rgba(4,6,9,0.96),rgba(8,12,18,0.92))] px-4 py-4 text-white shadow-[0_18px_40px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4 sm:gap-6">
            <a href="#/" className="inline-flex shrink-0 items-center">
              <img src="/logo-cutout.png" alt="Rugby in Uganda" className="h-20 w-auto object-contain sm:h-24 lg:h-28" />
            </a>
            <div className="min-w-0">
              <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80">
                Our Partners
              </span>
              <div className="mt-2 flex flex-nowrap items-center gap-1.5">
                <div className="flex h-9 min-w-[60px] shrink-0 items-center justify-center rounded-full border border-white/10 bg-[linear-gradient(180deg,#173e7a_0%,#0f2c59_100%)] px-2.5 text-[11px] font-black italic text-white shadow-[0_10px_20px_rgba(15,44,89,0.24)]">
                  macron
                </div>
                <div className="flex h-9 min-w-[60px] shrink-0 items-center justify-center rounded-full border border-white/10 bg-[linear-gradient(180deg,#173e7a_0%,#0f2c59_100%)] px-2.5 text-[10px] font-bold text-white shadow-[0_10px_20px_rgba(15,44,89,0.24)]">
                  HSBC
                </div>
                <div className="flex h-9 min-w-[60px] shrink-0 items-center justify-center rounded-full border border-white/10 bg-[linear-gradient(180deg,#173e7a_0%,#0f2c59_100%)] px-2.5 text-[10px] font-bold tracking-wide text-white shadow-[0_10px_20px_rgba(15,44,89,0.24)]">
                  NILE
                </div>
              </div>
            </div>
          </div>
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

      <section className="relative overflow-hidden bg-[#173c8f] text-white">
        <div className="absolute inset-0 opacity-15">
          <div className="flex h-full items-center justify-center text-[18rem] font-black uppercase tracking-[0.08em]">
            {club.initials}
          </div>
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,20,44,0.28),rgba(15,32,82,0.1),rgba(7,12,24,0.28))]" />

        <div className="relative mx-auto max-w-[1380px] px-6 py-12">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
              <div
                className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-[5px] text-3xl font-black uppercase shadow-[0_18px_34px_rgba(0,0,0,0.24)]"
                style={{
                  borderColor: club.accent,
                  background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.24), rgba(255,255,255,0.08) 42%, rgba(0,0,0,0.2) 100%)',
                }}
              >
                {club.initials}
              </div>
              <div className="min-w-0">
                <div className="mb-3 flex gap-2">
                  {club.form.map((item, index) => (
                    <span key={`${club.slug}-${index}-${item}`} className="flex h-6 w-6 items-center justify-center rounded-full bg-[#21b44b] text-[11px] font-black">
                      {item}
                    </span>
                  ))}
                </div>
                <h1 className="max-w-4xl text-3xl font-black uppercase leading-[0.9] tracking-[0.02em] sm:text-4xl lg:text-5xl">
                  {club.name}
                </h1>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              <div className="rounded-[20px] border border-white/18 bg-white/6 px-5 py-5 backdrop-blur-md">
                <div className="text-[11px] font-black uppercase tracking-[0.18em] text-white/78">Region</div>
                <div className="mt-3 text-2xl font-black uppercase leading-tight">{club.region}</div>
              </div>
              <div className="rounded-[20px] border border-white/18 bg-white/6 px-5 py-5 backdrop-blur-md">
                <div className="text-[11px] font-black uppercase tracking-[0.18em] text-white/78">Stadium</div>
                <div className="mt-3 text-xl font-black uppercase leading-tight">{club.stadium}</div>
              </div>
              <div className="rounded-[20px] border border-white/18 bg-white/6 px-5 py-5 backdrop-blur-md">
                <div className="text-[11px] font-black uppercase tracking-[0.18em] text-white/78">Founded</div>
                <div className="mt-3 text-2xl font-black uppercase leading-tight">{club.founded}</div>
              </div>
              <div className="rounded-[20px] border border-white/18 bg-white/6 px-5 py-5 backdrop-blur-md">
                <div className="text-[11px] font-black uppercase tracking-[0.18em] text-white/78">Social Media</div>
                <div className="mt-3 flex items-center gap-3">
                  <a href={club.socialLinks.facebook} className="transition-opacity hover:opacity-70"><Facebook size={24} /></a>
                  <a href={club.socialLinks.instagram} className="transition-opacity hover:opacity-70"><Instagram size={24} /></a>
                  <a href={club.socialLinks.x} className="transition-opacity hover:opacity-70"><Twitter size={24} /></a>
                </div>
              </div>
              <div className="rounded-[20px] border border-white/18 bg-white/6 px-5 py-5 backdrop-blur-md">
                <div className="text-[11px] font-black uppercase tracking-[0.18em] text-white/78">Club Website</div>
                <a href={club.website} className="mt-3 inline-flex items-center gap-2 text-xl font-black uppercase leading-tight">
                  Visit
                  <ExternalLink size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-white">
        <div className="mx-auto flex max-w-[1380px] gap-8 overflow-x-auto px-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {profileTabs.map((tab) => (
            <a
              key={tab.key}
              href={buildClubRoute(club.region, club.slug, tab.key)}
              className={`border-b-[4px] px-1 py-6 text-lg font-black uppercase whitespace-nowrap transition-colors ${
                currentTab.key === tab.key ? 'border-[#ff5a3b] text-black' : 'border-transparent text-black/72 hover:text-black'
              }`}
            >
              {tab.label}
            </a>
          ))}
        </div>
      </section>

      <section ref={contentSectionRef} className="mx-auto max-w-[1380px] scroll-mt-8 px-6 py-10">
        {currentTab.key === 'news' ? (
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <article className="rounded-[28px] border border-black/10 bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
              <div className="text-[11px] font-black uppercase tracking-[0.22em] text-[#173c8f]">Latest Story</div>
              <h2 className="mt-4 text-4xl font-black uppercase leading-[0.94] text-black">{club.headline}</h2>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-black/72">{club.story}</p>
              <div className="mt-8 rounded-[22px] border border-black/8 bg-[linear-gradient(135deg,rgba(23,60,143,0.08),rgba(0,0,0,0.02))] p-6">
                <div className="text-[11px] font-black uppercase tracking-[0.2em] text-black/45">Club Focus</div>
                <p className="mt-3 text-base leading-relaxed text-black/70">
                  Matchday culture, supporter energy, and club identity continue to shape how {club.name} presents itself on and off the field.
                </p>
              </div>
            </article>

            <aside className="rounded-[28px] border border-black/10 bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
              <div className="text-[11px] font-black uppercase tracking-[0.22em] text-[#173c8f]">Next Up</div>
              <div className="mt-5 space-y-4">
                {club.fixtures.map((fixture) => (
                  <div key={`${club.slug}-${fixture.round}-${fixture.date}`} className="rounded-[20px] border border-black/8 bg-[#f7f5f1] p-5">
                    <div className="text-[10px] font-black uppercase tracking-[0.18em] text-black/45">{fixture.round}</div>
                    <div className="mt-2 text-2xl font-black uppercase text-black">{fixture.opponent}</div>
                    <div className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-black/60">{fixture.venue}</div>
                    <div className="mt-3 text-sm font-black uppercase tracking-[0.14em] text-[#173c8f]">{fixture.date}</div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        ) : null}

        {currentTab.key === 'fixtures-results' ? (
          <div className="rounded-[28px] border border-black/10 bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
            <h2 className="text-3xl font-black uppercase text-black">Fixtures & Results</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {club.fixtures.map((fixture) => (
                <div key={`${fixture.round}-${fixture.date}`} className="rounded-[20px] border border-black/8 bg-[#f7f5f1] p-5">
                  <div className="text-[10px] font-black uppercase tracking-[0.18em] text-black/45">{fixture.round}</div>
                  <div className="mt-2 text-2xl font-black uppercase text-black">{fixture.opponent}</div>
                  <div className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-black/60">{fixture.venue}</div>
                  <div className="mt-3 text-sm font-black uppercase tracking-[0.14em] text-[#173c8f]">{fixture.date}</div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {currentTab.key === 'standings' ? (
          <div className="rounded-[28px] border border-black/10 bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
            <h2 className="text-3xl font-black uppercase text-black">Standing Snapshot</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {club.statistics.map((stat) => (
                <div key={stat.label} className="rounded-[20px] border border-black/8 bg-[#f7f5f1] p-5">
                  <div className="text-[10px] font-black uppercase tracking-[0.18em] text-black/45">{stat.label}</div>
                  <div className="mt-3 text-4xl font-black uppercase text-black">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {currentTab.key === 'squad' ? (
          <div className="rounded-[28px] border border-black/10 bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
            <h2 className="text-3xl font-black uppercase text-black">Squad Core</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {club.squad.map((player) => (
                <div key={player} className="rounded-[20px] border border-black/8 bg-[#f7f5f1] px-5 py-6 text-xl font-black uppercase text-black">
                  {player}
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {currentTab.key === 'statistics' ? (
          <div className="rounded-[28px] border border-black/10 bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
            <h2 className="text-3xl font-black uppercase text-black">Club Statistics</h2>
            <div className="mt-6 space-y-4">
              {club.statistics.map((stat) => (
                <div key={stat.label} className="flex items-center justify-between rounded-[18px] border border-black/8 bg-[#f7f5f1] px-5 py-5">
                  <div className="text-sm font-black uppercase tracking-[0.18em] text-black/55">{stat.label}</div>
                  <div className="text-2xl font-black uppercase text-black">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {currentTab.key === 'tickets' ? (
          <div className="rounded-[28px] border border-black/10 bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
            <h2 className="text-3xl font-black uppercase text-black">Tickets</h2>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-black/72">
              Follow {club.name} through Rugby in Uganda for upcoming fixtures, matchday access updates, and supporter information.
            </p>
            <a
              href={club.website}
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-[linear-gradient(90deg,#ef2d2d_0%,#ff6d3f_100%)] px-8 py-4 text-base font-black uppercase tracking-[0.14em] text-white shadow-[0_18px_34px_rgba(239,45,45,0.24)]"
            >
              Club Website
              <ExternalLink size={18} />
            </a>
          </div>
        ) : null}
      </section>

      <SharedFooter />
    </div>
  );
}
