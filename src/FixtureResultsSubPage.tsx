import { ArrowLeft, CalendarDays, ChevronDown, CloudSun, MapPin, Menu, Radio, Trophy } from 'lucide-react';
import { useEffect, useState } from 'react';
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

const formatMonthLabel = (monthValue: string, style: 'short' | 'long' = 'short') =>
  new Date(`${monthValue}-01T00:00:00`).toLocaleDateString('en-US', style === 'long' ? { month: 'long' } : { month: 'short' });

const formatFullDate = (dateValue: string) =>
  new Date(`${dateValue}T00:00:00`).toLocaleDateString('en-US', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  });

const formatReadableDate = (dateValue: string) =>
  new Date(`${dateValue}T00:00:00`).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
  });

const buildGoogleMapsUrl = (venue: string, competition: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${venue}, ${competition}, Uganda`)}`;

const buildCalendarSyncUrl = (matches: FixtureMatch[], title: string, dateValue?: string) => {
  const startDate = dateValue ?? matches[0]?.date;
  if (!startDate || matches.length === 0) return '#';

  const endDate = matches[matches.length - 1]?.date ?? startDate;
  const details = matches
    .map((match) => `${match.round}: ${match.home} vs ${match.away} at ${match.venue} on ${match.date}`)
    .join('\n');

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startDate.replace(/-/g, '')}/${endDate.replace(/-/g, '')}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(matches[0]?.venue ?? 'Uganda')}`;
};

export default function FixtureResultsSubPage({ activePage, onBack }: FixtureResultsSubPageProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(activePage.matches[0]?.date ?? '');
  const [selectedMonth, setSelectedMonth] = useState((activePage.matches[0]?.date ?? '').slice(0, 7));

  useEffect(() => {
    setSelectedDate(activePage.matches[0]?.date ?? '');
    setSelectedMonth((activePage.matches[0]?.date ?? '').slice(0, 7));
  }, [activePage]);

  const genderPills: { label: string; value: FixtureGender }[] = [
    { label: 'Men', value: 'men' },
    { label: 'Women', value: 'women' },
  ];

  const availableMonths = Array.from(new Set(activePage.matches.map((match) => match.date.slice(0, 7))));
  const monthEntries = availableMonths.map((monthValue) => {
    const matches = activePage.matches.filter((match) => match.date.startsWith(monthValue));
    return {
      monthValue,
      label: formatMonthLabel(monthValue),
      fullLabel: `${formatMonthLabel(monthValue, 'long')} ${monthValue.slice(0, 4)}`,
      matches,
      rounds: new Set(matches.map((match) => match.round)).size,
    };
  });

  const selectedMonthMatches = activePage.matches.filter((match) => match.date.startsWith(selectedMonth));
  const selectedMonthGroups = Array.from(
    selectedMonthMatches.reduce((groups, match) => {
      const existing = groups.get(match.date) ?? [];
      existing.push(match);
      groups.set(match.date, existing);
      return groups;
    }, new Map<string, FixtureMatch[]>()),
  );
  const selectedMatches = activePage.matches.filter((match) => match.date === selectedDate);
  const completedMatches = activePage.matches.filter((match) => match.status === 'completed');
  const upcomingMatches = activePage.matches.filter((match) => match.status === 'upcoming');
  const nextFixture = upcomingMatches[0];
  const latestResult = completedMatches[completedMatches.length - 1];
  const totalTeams = new Set(activePage.matches.flatMap((match) => [match.home, match.away])).size;
  const topCompetitionLabel =
    activePage.division === 'premiership'
      ? `National ${activePage.gender === 'men' ? "Men's" : "Women's"} Premiership`
      : `${activePage.division.charAt(0).toUpperCase()}${activePage.division.slice(1)} ${activePage.gender === 'men' ? "Men's" : "Women's"} League`;

  const divisionRouteMap = {
    premiership: buildLeagueRoute('premiership', activePage.gender),
    central: buildLeagueRoute('central', activePage.gender),
    eastern: buildLeagueRoute('eastern', activePage.gender),
    northern: buildLeagueRoute('northern', activePage.gender),
    western: buildLeagueRoute('western', activePage.gender),
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

  const selectedMonthLabel = monthEntries.find((entry) => entry.monthValue === selectedMonth)?.fullLabel ?? activePage.season;
  const brandRed = activePage.accent;
  const brandYellow = '#d6a327';
  const calendarMonthDate = selectedMonth ? new Date(`${selectedMonth}-01T00:00:00`) : new Date('2026-05-01T00:00:00');
  const firstWeekday = calendarMonthDate.getDay();
  const daysInMonth = new Date(calendarMonthDate.getFullYear(), calendarMonthDate.getMonth() + 1, 0).getDate();
  const calendarCells = Array.from({ length: firstWeekday + daysInMonth }, (_, index) => {
    if (index < firstWeekday) return null;
    const day = index - firstWeekday + 1;
    const fullDate = `${selectedMonth}-${String(day).padStart(2, '0')}`;
    const hasGame = selectedMonthMatches.some((match) => match.date === fullDate);
    return { day, fullDate, hasGame };
  });
  const selectedMonthCalendarUrl = buildCalendarSyncUrl(
    selectedMonthMatches,
    `${activePage.title} ${selectedMonthLabel} Fixtures`,
    selectedMonthMatches[0]?.date,
  );
  const fixtureBoardOptions = fixtureResultsMenuLinks.flatMap((link) =>
    genderPills.map((pill) => {
      const divisionKey = link.label.toLowerCase() as 'premiership' | 'central' | 'northern' | 'eastern' | 'western';
      return {
        label: `${link.label} ${pill.label}`,
        href: buildFixtureResultsRoute(divisionKey, pill.value),
        isActive: activePage.division === divisionKey && activePage.gender === pill.value,
      };
    }),
  );
  const activeFixtureBoard = fixtureBoardOptions.find((board) => board.isActive);
  const alternateFixtureBoards = fixtureBoardOptions.filter((board) => !board.isActive);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#040507_0%,#09111b_22%,#06080d_55%,#030405_100%)] text-white">
      <div className="relative z-30 isolate border-t-4 border-b border-[#0f4aa6] bg-[linear-gradient(90deg,#050607_0%,#0a1320_48%,#10140f_100%)] px-2 py-2 text-white sm:px-3">
        <div className="flex w-full items-center justify-between gap-3 rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] px-3 py-2 shadow-[0_10px_26px_rgba(0,0,0,0.22)] backdrop-blur-xl">
          <button type="button" onClick={onBack} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/28 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10">
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
          <button type="button" onClick={() => setIsMobileMenuOpen((value) => !value)} className="flex items-center justify-center gap-3 py-4 text-xl font-semibold">
            <Menu size={22} />
            <span className="text-2xl">Menu</span>
          </button>
        </div>
        {isMobileMenuOpen ? (
          <div className="border-t border-white/10 bg-black px-4 py-4">
            <MobileTopNav menus={topMenuPanels} standaloneLink={{ label: 'Age Grade', href: buildRegionRoute('Schools', 'Boys') }} onNavigate={() => setIsMobileMenuOpen(false)} />
          </div>
        ) : null}
      </section>

      <main>
        <section className="relative overflow-hidden border-b border-white/10 bg-[linear-gradient(135deg,#08101b_0%,#0f1823_46%,#11150f_100%)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_24%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.04),transparent_22%)]" />
          <div className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: brandRed }} />
          <div className="relative mx-auto max-w-[1380px] px-4 py-8 sm:px-6 sm:py-10">
            <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
              <a href={buildFixtureResultsRoute(activePage.division, activePage.gender)} className="rounded-[6px] border border-white bg-white px-4 py-2 text-sm font-black text-black transition-colors">Matchplan</a>
              <a href="#fixture-schedule" className="rounded-[6px] border border-white/35 px-4 py-2 text-sm font-black text-white transition-colors hover:bg-white/8">Matchdays</a>
              <a href={buildLeagueRoute(activePage.division, activePage.gender)} className="rounded-[6px] border border-white/35 px-4 py-2 text-sm font-black text-white transition-colors hover:bg-white/8">Standings</a>
              <a href={`${buildLeagueRoute(activePage.division, activePage.gender)}#league-standings`} className="rounded-[6px] border border-white/35 px-4 py-2 text-sm font-black text-white transition-colors hover:bg-white/8">Stats</a>
            </div>

            <div className="mt-5 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
              <div className="max-w-4xl">
                <div className="inline-flex rounded-full border px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em]" style={{ borderColor: `${brandYellow}66`, color: brandYellow }}>{topCompetitionLabel}</div>
                <h1 className="mt-5 text-4xl font-black uppercase leading-[0.92] text-white sm:text-5xl lg:text-6xl">
                  Matchplan Season {activePage.season.replace(' Calendar', '').replace(' Campaign', '').replace(' Run', '').replace(' Contest', '').replace(' Race', '')}
                </h1>
                <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/74 sm:text-lg">A cleaner Rugby in Uganda match center built around your own divisions, matchdays, venues, and scorelines across the current season.</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {genderPills.map((pill) => (
                    <a key={pill.value} href={buildFixtureResultsRoute(activePage.division, pill.value)} className={`rounded-full border px-5 py-2.5 text-sm font-black uppercase tracking-[0.14em] transition-colors ${activePage.gender === pill.value ? 'text-[#09111b]' : 'border-white/12 bg-white/6 text-white hover:bg-white/10'}`} style={activePage.gender === pill.value ? { backgroundColor: activePage.accent, borderColor: activePage.accent } : undefined}>
                      {pill.label}
                    </a>
                  ))}
                  <a href={selectedMonthCalendarUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full border border-[#ef2d2d] bg-[linear-gradient(90deg,#ef2d2d_0%,#ff6d3f_100%)] px-5 py-2.5 text-sm font-black uppercase tracking-[0.14em] text-white transition-colors hover:opacity-90">Sync Fixtures To Calendar</a>
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-3 xl:min-w-[620px]">
                <div className="rounded-[10px] border border-white/12 bg-white/6 px-4 py-3 shadow-[0_12px_24px_rgba(0,0,0,0.16)]"><div className="text-[10px] font-black uppercase tracking-[0.16em] text-white/48">Competition</div><div className="mt-1 text-sm font-black uppercase text-white">{activePage.title}</div></div>
                <div className="rounded-[10px] border border-white/12 bg-white/6 px-4 py-3 shadow-[0_12px_24px_rgba(0,0,0,0.16)]"><div className="text-[10px] font-black uppercase tracking-[0.16em] text-white/48">Coverage</div><div className="mt-1 text-sm font-black uppercase text-white">All Matchdays</div></div>
                <div className="rounded-[10px] border border-white/12 bg-white/6 px-4 py-3 shadow-[0_12px_24px_rgba(0,0,0,0.16)]"><div className="text-[10px] font-black uppercase tracking-[0.16em] text-white/48">Season</div><div className="mt-1 text-sm font-black uppercase text-white">{activePage.season}</div></div>
              </div>
            </div>

            <div className="mt-7 flex gap-3 overflow-x-auto border-t border-white/10 pt-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {monthEntries.map((entry) => (
                <button
                  key={entry.monthValue}
                  type="button"
                  onClick={() => {
                    setSelectedMonth(entry.monthValue);
                    setSelectedDate(entry.matches[0]?.date ?? '');
                  }}
                  className={`shrink-0 border-b-2 px-1 pb-3 text-base font-black uppercase transition-colors ${selectedMonth === entry.monthValue ? 'text-white' : 'border-transparent text-white/48 hover:text-white/78'}`}
                  style={selectedMonth === entry.monthValue ? { borderColor: brandRed } : undefined}
                >
                  {entry.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="fixture-schedule" className="mx-auto max-w-[1380px] px-4 py-8 sm:px-6 sm:py-10">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1.28fr)_360px]">
            <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] shadow-[0_28px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl">
              <div className="border-b border-white/10 px-5 py-6 sm:px-8">
                <div className="text-[11px] font-black uppercase tracking-[0.22em]" style={{ color: brandRed }}>Matchplan</div>
                <h2 className="mt-3 text-3xl font-black uppercase text-white sm:text-4xl">{selectedMonthLabel}</h2>
                <div className="mt-3 flex flex-wrap gap-3 text-[11px] font-black uppercase tracking-[0.16em] text-white/56">
                  <span>{selectedMonthMatches.length} fixtures in view</span>
                  <span>{monthEntries.find((entry) => entry.monthValue === selectedMonth)?.rounds ?? 0} active rounds</span>
                  <span>{totalTeams} teams on the board</span>
                </div>
              </div>

              <div className="divide-y divide-white/10">
                {selectedMonthGroups.map(([dateValue, matches]) => (
                  <div key={dateValue} className="px-4 py-5 sm:px-8 sm:py-7">
                    <div className="mb-5 flex flex-col gap-2 border-b border-white/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
                      <button type="button" onClick={() => setSelectedDate(dateValue)} className="w-fit text-left">
                        <div className="text-[15px] font-black uppercase text-white">{formatFullDate(dateValue)}</div>
                        <div className="mt-1 text-[11px] font-black uppercase tracking-[0.18em] text-white/48">{matches.length} fixtures</div>
                      </button>
                      <div className="w-fit rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em]" style={{ backgroundColor: selectedDate === dateValue ? brandRed : 'rgba(255,255,255,0.08)', color: selectedDate === dateValue ? '#ffffff' : 'rgba(255,255,255,0.78)' }}>
                        {selectedDate === dateValue ? 'Selected matchday' : 'Matchday slate'}
                      </div>
                    </div>

                    <div className="space-y-3">
                      {matches.map((match) => (
                        <article key={`${match.round}-${match.home}-${match.date}-${match.away}`} className="rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-4 transition-colors hover:bg-white/10 sm:p-5">
                          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                            <div className="min-w-0 flex-1">
                              <div className="text-[10px] font-black uppercase tracking-[0.18em] text-white/45">{match.round}</div>
                              <div className="mt-3 grid items-center gap-3 sm:grid-cols-[1fr_auto_1fr]">
                                <div className="min-w-0"><div className="text-xl font-black uppercase leading-tight text-white sm:text-2xl">{match.home}</div></div>
                                {match.status === 'completed' ? (
                                  <div className="inline-flex items-center justify-center rounded-full px-5 py-2 text-xl font-black text-white sm:text-2xl" style={{ backgroundColor: brandRed }}>{match.homeScore} : {match.awayScore}</div>
                                ) : (
                                  <div className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/8 px-5 py-2 text-sm font-black uppercase tracking-[0.18em] text-white/80">Upcoming</div>
                                )}
                                <div className="min-w-0 text-left sm:text-right"><div className="text-xl font-black uppercase leading-tight text-white sm:text-2xl">{match.away}</div></div>
                              </div>
                            </div>

                            <div className="grid gap-2 text-left lg:min-w-[220px] lg:text-right">
                              <div className="text-[11px] font-black uppercase tracking-[0.16em] text-white/56">{match.status === 'completed' ? 'Full Time' : 'Upcoming'}</div>
                              <a href={buildGoogleMapsUrl(match.venue, activePage.title)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[12px] font-black uppercase tracking-[0.12em] transition-colors lg:justify-end" style={{ color: brandYellow }}>
                                <MapPin size={14} />
                                {match.venue}
                              </a>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <aside className="space-y-5">
              <div className="rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[11px] font-black uppercase tracking-[0.2em]" style={{ color: brandRed }}>Calendar View</div>
                    <h3 className="mt-2 text-2xl font-black uppercase text-white">{selectedMonthLabel}</h3>
                  </div>
                  <a href={selectedMonthCalendarUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full border border-[#c62828] bg-[#c62828] px-4 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#111111] hover:border-[#111111]">Sync To Calendar</a>
                </div>
                <div className="mt-5 grid grid-cols-7 gap-2 text-center text-[10px] font-black uppercase tracking-[0.14em] text-white/45">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => <div key={`${day}-${index}`}>{day}</div>)}
                </div>
                <div className="mt-3 grid grid-cols-7 gap-2">
                  {calendarCells.map((cell, index) =>
                    cell ? (
                      <button
                        key={cell.fullDate}
                        type="button"
                        onClick={() => {
                          if (cell.hasGame) setSelectedDate(cell.fullDate);
                        }}
                        className={`relative flex aspect-square min-h-[42px] items-center justify-center rounded-[14px] border text-sm font-black transition-colors ${cell.fullDate === selectedDate ? 'border-[#c62828] bg-[#c62828] text-white' : cell.hasGame ? 'border-white/10 bg-white/6 text-white hover:bg-white/10' : 'border-transparent bg-transparent text-white/42'}`}
                      >
                        {cell.day}
                        {cell.hasGame && cell.fullDate !== selectedDate ? <span className="absolute bottom-1.5 left-1/2 h-[4px] w-4 -translate-x-1/2 rounded-full bg-[#d6a327]" /> : null}
                      </button>
                    ) : (
                      <div key={`empty-${index}`} />
                    ),
                  )}
                </div>
              </div>

              <div className="rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:p-6">
                <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em]" style={{ color: brandRed }}><CalendarDays size={15} />Selected Matchday</div>
                <h3 className="mt-3 text-2xl font-black uppercase text-white">{selectedDate ? formatReadableDate(selectedDate) : 'Pick A Matchday'}</h3>
                <div className="mt-4 space-y-3">
                  {selectedMatches.map((match) => (
                    <div key={`${match.date}-${match.home}-${match.away}-selected`} className="rounded-[18px] border border-white/10 bg-black/16 p-4">
                      <div className="text-[10px] font-black uppercase tracking-[0.18em] text-white/45">{match.round}</div>
                      <div className="mt-2 text-base font-black uppercase text-white">{match.home} vs {match.away}</div>
                      <a href={buildGoogleMapsUrl(match.venue, activePage.title)} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.14em] transition-colors hover:text-[#c62828]" style={{ color: brandYellow }}>
                        <MapPin size={13} />
                        {match.venue}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:p-6">
                <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em]" style={{ color: brandRed }}><Radio size={15} />Next Fixture</div>
                <div className="mt-4 rounded-[20px] border border-white/10 bg-black/16 p-4">
                  <div className="text-[10px] font-black uppercase tracking-[0.18em] text-white/45">{nextFixture?.round ?? 'Coming Soon'}</div>
                  <div className="mt-2 text-xl font-black uppercase leading-tight text-white">{nextFixture ? `${nextFixture.home} vs ${nextFixture.away}` : 'Schedule will be updated soon'}</div>
                  {nextFixture ? (
                    <a href={buildGoogleMapsUrl(nextFixture.venue, activePage.title)} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.14em] transition-colors hover:text-[#c62828]" style={{ color: brandYellow }}>
                      <MapPin size={13} />
                      {`${formatReadableDate(nextFixture.date)} · ${nextFixture.venue}`}
                    </a>
                  ) : (
                    <div className="mt-3 text-[11px] font-black uppercase tracking-[0.14em]" style={{ color: brandYellow }}>{activePage.season}</div>
                  )}
                </div>
              </div>

                <div className="rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:p-6">
                <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em]" style={{ color: brandRed }}><Trophy size={15} />Latest Result</div>
                  <div className="mt-4 rounded-[20px] border border-white/10 bg-black/16 p-4">
                    <div className="text-[10px] font-black uppercase tracking-[0.18em] text-white/45">{latestResult?.round ?? 'No result yet'}</div>
                  <div className="mt-2 flex items-center justify-between gap-4">
                      <div className="min-w-0 text-sm font-black uppercase text-white">{latestResult?.home ?? activePage.title}</div>
                    <div className="shrink-0 rounded-full px-4 py-2 text-base font-black text-white" style={{ backgroundColor: brandRed }}>{latestResult ? `${latestResult.homeScore} : ${latestResult.awayScore}` : '--'}</div>
                      <div className="min-w-0 text-right text-sm font-black uppercase text-white">{latestResult?.away ?? 'Result Pending'}</div>
                  </div>
                  <div className="mt-3 text-[11px] font-black uppercase tracking-[0.14em] text-black/58">{latestResult ? `${formatReadableDate(latestResult.date)} · ${latestResult.venue}` : activePage.season}</div>
                </div>
              </div>

              <div className="rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:p-6">
                <div className="text-[11px] font-black uppercase tracking-[0.2em]" style={{ color: brandRed }}>Competition Pulse</div>
                <div className="mt-4 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
                  <div className="rounded-[18px] border border-white/10 bg-black/16 p-4"><div className="text-[10px] font-black uppercase tracking-[0.18em] text-white/45">Matchdays</div><div className="mt-2 text-3xl font-black text-white">{selectedMonthGroups.length}</div></div>
                  <div className="rounded-[18px] border border-white/10 bg-black/16 p-4"><div className="text-[10px] font-black uppercase tracking-[0.18em] text-white/45">Fixtures Listed</div><div className="mt-2 text-3xl font-black text-white">{activePage.matches.length}</div></div>
                  <div className="rounded-[18px] border border-white/10 bg-black/16 p-4"><div className="text-[10px] font-black uppercase tracking-[0.18em] text-white/45">Teams</div><div className="mt-2 text-3xl font-black text-white">{totalTeams}</div></div>
                </div>
              </div>
            </aside>
          </div>

          <div className="mt-8 rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:p-6">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
              <div className="rounded-[24px] border border-white/10 bg-black/18 p-5">
                <div className="text-[11px] font-black uppercase tracking-[0.2em]" style={{ color: brandRed }}>Fixture Board</div>
                <h3 className="mt-3 text-2xl font-black uppercase text-white">{activeFixtureBoard?.label ?? activePage.title}</h3>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70">
                  This board stays pinned for the current competition. Use the dropdown to jump into a different division or switch between the men's and women's fixture views.
                </p>
                <div className="mt-4 flex flex-wrap gap-3 text-[11px] font-black uppercase tracking-[0.14em] text-white/60">
                  <span>{selectedMonthMatches.length} fixtures this month</span>
                  <span>{selectedMonthGroups.length} matchdays</span>
                  <span>{totalTeams} teams</span>
                </div>
              </div>

              <details className="group rounded-[24px] border border-white/10 bg-black/18 p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-left">
                  <div>
                    <div className="text-[11px] font-black uppercase tracking-[0.2em] text-white/55">Explore More</div>
                    <div className="mt-2 text-lg font-black uppercase text-white">Browse Other Boards</div>
                  </div>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/6 text-white transition-transform group-open:rotate-180">
                    <ChevronDown size={18} />
                  </span>
                </summary>
                <div className="mt-4 grid gap-2">
                  {alternateFixtureBoards.map((board) => (
                    <a
                      key={board.label}
                      href={board.href}
                      className="rounded-[18px] border border-white/10 bg-white/6 px-4 py-3 text-sm font-black uppercase tracking-[0.14em] text-white transition-colors hover:bg-white/10"
                    >
                      {board.label}
                    </a>
                  ))}
                </div>
              </details>
            </div>
          </div>
        </section>
      </main>

      <SharedFooter />
    </div>
  );
}
