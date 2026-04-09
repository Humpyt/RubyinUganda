import { ArrowLeft, CalendarDays, CloudSun, Menu } from 'lucide-react';
import { useState } from 'react';
import DesktopTopNav from './DesktopTopNav';
import MobileTopNav from './MobileTopNav';
import SharedFooter from './SharedFooter';
import type { FixtureGender, FixtureMatch, FixtureResultsPageData } from './fixtureResultsPages';
import { buildFixtureResultsRoute, fixtureResultsMenuLinks } from './fixtureResultsPages';
import { buildLeagueRoute, leagueMenuLinks } from './leaguePages';

interface FixtureResultsSubPageProps {
  activePage: FixtureResultsPageData;
  onBack: () => void;
}

const buildRegionRoute = (regionTitle: string, link: string) =>
  `#/regions/${regionTitle.toLowerCase().replace(/&/g, 'and').replace(/\s+/g, '-')}/${link.toLowerCase().replace(/&/g, 'and').replace(/\s+/g, '-')}`;

export default function FixtureResultsSubPage({ activePage, onBack }: FixtureResultsSubPageProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(activePage.matches[0]?.date ?? '');
  const [selectedMonth, setSelectedMonth] = useState((activePage.matches[0]?.date ?? '').slice(0, 7));
  const genderPills: { label: string; value: FixtureGender }[] = [
    { label: 'Men', value: 'men' },
    { label: 'Women', value: 'women' },
  ];
  const uniqueDates = Array.from(new Set(activePage.matches.map((match) => match.date)));
  const availableMonths = Array.from(new Set(activePage.matches.map((match) => match.date.slice(0, 7))));
  const selectedMatches = activePage.matches.filter((match) => match.date === selectedDate);
  const completedMatches = activePage.matches.filter((match) => match.status === 'completed');
  const upcomingMatches = activePage.matches.filter((match) => match.status === 'upcoming');
  const calendarMonth = selectedMonth || activePage.matches[0]?.date.slice(0, 7);
  const [year, month] = (calendarMonth ?? '2026-05').split('-').map(Number);
  const firstDay = new Date(year, month - 1, 1);
  const firstWeekday = firstDay.getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const monthLabel = firstDay.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const calendarCells = Array.from({ length: firstWeekday + daysInMonth }, (_, index) => {
    if (index < firstWeekday) return null;
    const day = index - firstWeekday + 1;
    const fullDate = `${calendarMonth}-${String(day).padStart(2, '0')}`;
    const hasGame = uniqueDates.includes(fullDate);
    return { day, fullDate, hasGame };
  });

  const divisionRouteMap = {
    premiership: buildLeagueRoute('premiership', 'men'),
    central: buildLeagueRoute('central', 'men'),
    eastern: buildLeagueRoute('eastern', 'men'),
    northern: buildLeagueRoute('northern', 'men'),
    western: buildLeagueRoute('western', 'men'),
  } as const;

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
      href: divisionRouteMap[activePage.division],
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
      href: buildFixtureResultsRoute(activePage.division, 'men'),
      featured: true,
      links: fixtureResultsMenuLinks,
    },
  ] as const;

  const highlightCard = (label: string, match?: FixtureMatch) => (
    <div className="rounded-[18px] border border-white/10 bg-black/20 p-4 shadow-[0_18px_36px_rgba(0,0,0,0.18)] backdrop-blur-md sm:p-5">
      <div className="text-[10px] font-black uppercase tracking-[0.18em] text-white/50">{label}</div>
      <div className="mt-3 text-lg font-black uppercase leading-tight sm:text-[1.55rem]">
        {match ? `${match.home} vs ${match.away}` : 'Schedule Ready'}
      </div>
      <div className="mt-2 text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: activePage.accent }}>
        {match ? `${new Date(`${match.date}T00:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · ${match.venue}` : activePage.season}
      </div>
    </div>
  );

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
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/65">Fixture Section</div>
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
        <section className="relative overflow-hidden border-b border-white/10 bg-[linear-gradient(135deg,#08101b_0%,#0f1823_46%,#11150f_100%)]">
          <div className="mx-auto max-w-[1380px] px-4 py-8 sm:px-6 sm:py-10">
            <div className="max-w-4xl">
              <div className="inline-flex rounded-full border px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em]" style={{ borderColor: `${activePage.accent}66`, color: activePage.accent }}>
                {activePage.subtitle}
              </div>
              <h1 className="mt-4 text-3xl font-black uppercase leading-[0.96] sm:text-4xl lg:text-5xl">
                {activePage.title}
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/74 sm:text-lg">
                Explore the live calendar, match dates, and already played games for the {activePage.title.toLowerCase()} schedule.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {genderPills.map((pill) => (
                  <a
                    key={pill.value}
                    href={buildFixtureResultsRoute(activePage.division, pill.value)}
                    className={`rounded-full border px-5 py-2.5 text-sm font-black uppercase tracking-[0.14em] transition-colors ${
                      activePage.gender === pill.value ? 'text-[#09111b]' : 'border-white/12 bg-white/6 text-white hover:bg-white/10'
                    }`}
                    style={activePage.gender === pill.value ? { backgroundColor: activePage.accent, borderColor: activePage.accent } : undefined}
                  >
                    {pill.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {highlightCard('Next Fixture', upcomingMatches[0])}
              {highlightCard('Calendar Focus', selectedMatches[0])}
              {highlightCard('Latest Result', completedMatches[completedMatches.length - 1])}
            </div>
          </div>
        </section>

        <section id="fixture-calendar" className="mx-auto max-w-[1380px] px-4 py-8 sm:px-6 sm:py-10">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-4 shadow-[0_24px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:rounded-[28px] sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <div>
                  <div className="text-[11px] font-black uppercase tracking-[0.18em] text-white/55">Match Calendar</div>
                  <h2 className="mt-2 text-2xl font-black uppercase sm:text-3xl">{monthLabel}</h2>
                </div>
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-black/18 px-3 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-white/72 sm:px-4 sm:text-[11px]">
                  <CalendarDays size={14} />
                  Dates With Games
                </div>
              </div>

              <div className="mt-5 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {availableMonths.map((monthValue) => (
                  <button
                    key={monthValue}
                    type="button"
                    onClick={() => {
                      setSelectedMonth(monthValue);
                      const firstMatchInMonth = activePage.matches.find((match) => match.date.startsWith(monthValue));
                      if (firstMatchInMonth) {
                        setSelectedDate(firstMatchInMonth.date);
                      }
                    }}
                    className={`shrink-0 rounded-full border px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] transition-colors ${
                      selectedMonth === monthValue
                        ? 'text-[#09111b]'
                        : 'border-white/12 bg-white/6 text-white hover:bg-white/10'
                    }`}
                    style={selectedMonth === monthValue ? { backgroundColor: activePage.accent, borderColor: activePage.accent } : undefined}
                  >
                    {new Date(`${monthValue}-01T00:00:00`).toLocaleDateString('en-US', { month: 'short' })}
                  </button>
                ))}
              </div>

              <div className="mt-5 sm:mt-6">
                <div className="grid grid-cols-7 gap-1.5 text-center text-[9px] font-black uppercase tracking-[0.14em] text-white/40 sm:gap-3 sm:text-[10px] sm:tracking-[0.18em]">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                    <div key={day}>{day}</div>
                  ))}
                </div>
                <div className="mt-3 grid grid-cols-7 gap-1.5 sm:mt-4 sm:gap-3">
                  {calendarCells.map((cell, index) =>
                    cell ? (
                      <button
                        key={cell.fullDate}
                        type="button"
                        onClick={() => {
                          if (cell.hasGame) {
                            setSelectedMonth(cell.fullDate.slice(0, 7));
                            setSelectedDate(cell.fullDate);
                          }
                        }}
                        className={`relative flex aspect-square min-h-[42px] items-center justify-center rounded-[12px] border text-xs font-black transition-all sm:min-h-[56px] sm:rounded-[16px] sm:text-sm ${
                          cell.fullDate === selectedDate
                            ? 'border-white/40 text-[#09111b] shadow-[0_12px_28px_rgba(0,0,0,0.2)]'
                            : cell.hasGame
                              ? 'border-white/14 bg-white/[0.03] text-white hover:border-white/28'
                              : 'border-transparent bg-transparent text-white/76'
                        }`}
                        style={cell.fullDate === selectedDate ? { backgroundColor: activePage.accent } : undefined}
                      >
                        {cell.day}
                        {cell.hasGame ? (
                          <span className={`absolute bottom-1.5 left-1/2 h-[3px] w-[62%] -translate-x-1/2 rounded-full sm:bottom-2 sm:h-[4px] sm:w-[66%] ${cell.fullDate === selectedDate ? 'bg-[#09111b]' : 'bg-white/85'}`} />
                        ) : null}
                      </button>
                    ) : (
                      <div key={`empty-${index}`} />
                    ),
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-4 shadow-[0_24px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:rounded-[28px] sm:p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <div className="text-[11px] font-black uppercase tracking-[0.18em] text-white/55">Selected Matchday</div>
                    <h3 className="mt-2 text-2xl font-black uppercase sm:text-3xl">
                      {selectedDate ? new Date(`${selectedDate}T00:00:00`).toLocaleDateString('en-US', { month: 'long', day: 'numeric' }) : 'Pick A Date'}
                    </h3>
                  </div>
                  <div className="rounded-full border border-white/10 bg-black/18 px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-white/65">
                    {selectedMatches.length} games on this day
                  </div>
                </div>
                <div className="mt-5 flex gap-4 overflow-x-auto pb-2 [scrollbar-width:thin] [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/18">
                  {selectedMatches.map((match) => (
                    <div key={`${match.round}-${match.home}-${match.date}`} className="min-w-[220px] shrink-0 rounded-[18px] border border-white/10 bg-black/18 px-4 py-4 sm:min-w-[280px] sm:rounded-[20px] sm:px-5 sm:py-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="text-[10px] font-black uppercase tracking-[0.18em] text-white/45">{match.round}</div>
                        <div className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em]" style={{ color: activePage.accent }}>
                          {match.status === 'completed' ? 'FT' : 'Upcoming'}
                        </div>
                      </div>
                      <div className="mt-4 text-lg font-black uppercase leading-tight sm:text-xl">{match.home}</div>
                      <div className="text-sm font-semibold uppercase tracking-[0.14em] text-white/72">vs {match.away}</div>
                      <div className="mt-4 text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: activePage.accent }}>
                        {match.venue}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-4 shadow-[0_24px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:rounded-[28px] sm:p-6">
                <div className="text-[11px] font-black uppercase tracking-[0.18em] text-white/55">Upcoming Games</div>
                <h3 className="mt-3 text-2xl font-black uppercase sm:text-3xl">All Matches To Be Played</h3>
                <div className="mt-5 grid gap-3">
                  {upcomingMatches.map((match) => (
                    <div key={`${match.round}-${match.home}-${match.date}-upcoming`} className="rounded-[18px] border border-white/10 bg-black/18 px-4 py-4 sm:px-5 sm:py-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-[10px] font-black uppercase tracking-[0.18em] text-white/45">{match.round}</div>
                          <div className="mt-2 text-xl font-black uppercase leading-tight sm:text-2xl">{match.home}</div>
                          <div className="text-sm font-semibold uppercase tracking-[0.14em] text-white/72">vs {match.away}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-black uppercase tracking-[0.14em]" style={{ color: activePage.accent }}>
                            {new Date(`${match.date}T00:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </div>
                          <div className="mt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55">{match.venue}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-4 shadow-[0_24px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:rounded-[28px] sm:p-6">
                <div className="text-[11px] font-black uppercase tracking-[0.18em] text-white/55">Completed Games</div>
                <h3 className="mt-3 text-2xl font-black uppercase sm:text-3xl">Played Matches</h3>
                <div className="mt-4 grid gap-3">
                  {completedMatches.map((match) => (
                    <div key={`${match.round}-${match.home}-${match.date}-completed`} className="rounded-[18px] border border-white/10 bg-black/18 px-4 py-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <div className="text-[10px] font-black uppercase tracking-[0.18em] text-white/45">{match.round}</div>
                          <div className="mt-2 text-base font-black uppercase sm:text-lg">{match.home} vs {match.away}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-black">{match.homeScore} - {match.awayScore}</div>
                          <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55">{match.venue}</div>
                        </div>
                      </div>
                    </div>
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
