import React, { useEffect, useMemo, useState } from 'react';
import type { MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent } from 'react';
import { ArrowLeft, ChevronDown, CloudSun, Menu } from 'lucide-react';
import RegionalClubDirectory from './RegionalClubDirectory';
import DesktopTopNav from './DesktopTopNav';
import MobileTopNav from './MobileTopNav';
import SharedFooter from './SharedFooter';
import { buildLeagueRoute, leagueMenuLinks } from './leaguePages';
import { buildFixtureResultsRoute, fixtureResultsMenuLinks } from './fixtureResultsPages';

interface RegionCard {
  title: string;
  subtitle: string;
}

interface RegionPanel {
  title: string;
  subtitle: string;
  links: readonly string[];
  image: string;
  align: 'left' | 'right';
}

interface ActivePage {
  route: string;
  regionTitle: string;
  regionSubtitle: string;
  link: string;
  title: string;
  subtitle: string;
  image: string;
}

interface RegionalSubPageProps {
  activePage: ActivePage;
  regionCards: readonly RegionCard[];
  desktopRegionPanels: readonly RegionPanel[];
  mobileMenuItems: readonly { label: string; hasDropdown: boolean }[];
  buildRegionRoute: (regionTitle: string, link: string) => string;
  onBack: () => void;
}

export default function RegionalSubPage({
  activePage,
  regionCards,
  desktopRegionPanels,
  mobileMenuItems,
  buildRegionRoute,
  onBack,
}: RegionalSubPageProps) {
  const getLeagueMenuRoute = () => {
    switch (activePage.regionTitle) {
      case 'Central':
        return buildLeagueRoute('central', 'men');
      case 'Eastern':
        return buildLeagueRoute('eastern', 'men');
      case 'Northern':
        return buildLeagueRoute('northern', 'men');
      case 'Western':
        return buildLeagueRoute('western', 'men');
      default:
        return buildLeagueRoute('premiership', 'men');
    }
  };
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileRegion, setOpenMobileRegion] = useState<string | null>(null);
  const [openDesktopRegion, setOpenDesktopRegion] = useState<string | null>(null);
  const canUseHover = typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const clubDirectoryScrollTarget = 'clubs-grid';
  const handleTopMenuNavigation = (href: string) => {
    setIsMobileMenuOpen(false);

    if (href.startsWith('#')) {
      window.location.hash = href.slice(1);
      return;
    }

    window.location.href = href;
  };
  const closeRegionalMenus = () => {
    setOpenDesktopRegion(null);
    setOpenMobileRegion(null);
    setIsMobileMenuOpen(false);
  };
  const getDefaultRegionRoute = (regionTitle: string) => {
    const regionPanel = desktopRegionPanels.find((panel) => panel.title === regionTitle);
    return buildRegionRoute(regionTitle, regionPanel?.links[0] ?? 'Men');
  };
  const scrollToClubDirectory = () => {
    const target = document.getElementById(clubDirectoryScrollTarget);
    if (!target) {
      return false;
    }

    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return true;
  };
  const handleRegionalNavigation = (href: string) => {
    closeRegionalMenus();
    window.sessionStorage.setItem('pendingScrollTarget', clubDirectoryScrollTarget);

    if (href === (window.location.hash || '#/')) {
      window.setTimeout(() => {
        scrollToClubDirectory();
      }, 20);
      return;
    }

    if (href.startsWith('#')) {
      window.location.hash = href.slice(1);
      return;
    }

    window.location.href = href;
  };
  const handleImmediateRegionalNavigation = (
    event: ReactMouseEvent<HTMLButtonElement> | ReactTouchEvent<HTMLButtonElement>,
    href: string,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    handleRegionalNavigation(href);
  };

  const activePanel = useMemo(
    () => desktopRegionPanels.find((panel) => panel.title === activePage.regionTitle) ?? desktopRegionPanels[0],
    [activePage.regionTitle, desktopRegionPanels],
  );
  useEffect(() => {
    const pendingRegion = window.sessionStorage.getItem('pendingOpenRegion');
    if (pendingRegion !== activePage.regionTitle) {
      return;
    }

    setOpenDesktopRegion(pendingRegion);
    setOpenMobileRegion(pendingRegion);
    window.sessionStorage.removeItem('pendingOpenRegion');
  }, [activePage.regionTitle]);
  const featureLink =
    activePanel.links.find((link) => link === 'Fixtures')
    ?? activePanel.links.find((link) => link === 'Schedules')
    ?? activePanel.links[0];
  const allTeamsMenuLinks = [
    { label: 'Central', href: buildRegionRoute('Central', 'Men') },
    { label: 'Northern', href: buildRegionRoute('Northern', 'Men') },
    { label: 'Eastern', href: buildRegionRoute('Eastern', 'Men') },
    { label: 'Western', href: buildRegionRoute('Western', 'Men') },
    { label: 'Schools', href: buildRegionRoute('Schools', 'Boys') },
    { label: 'National Team', href: buildRegionRoute('National Team', 'Men') },
  ] as const;
  const sectionMenuHrefMap: Record<string, string> = {
    Latest: '#/',
    Teams: buildRegionRoute(activePage.regionTitle, 'Men'),
    'Age Grade': buildRegionRoute('Schools', 'Boys'),
    Leagues: getLeagueMenuRoute(),
    RIU: '#/shop/matchday-wear',
    'Fixture & Results':
      activePage.regionTitle === 'Central'
        ? buildFixtureResultsRoute('central', 'men')
        : activePage.regionTitle === 'Eastern'
          ? buildFixtureResultsRoute('eastern', 'men')
          : activePage.regionTitle === 'Northern'
            ? buildFixtureResultsRoute('northern', 'men')
            : activePage.regionTitle === 'Western'
              ? buildFixtureResultsRoute('western', 'men')
              : buildFixtureResultsRoute('premiership', 'men'),
  };
  const topMenuPanels = [
    {
      label: 'Latest',
      href: sectionMenuHrefMap.Latest,
      featured: false,
      links: [
        { label: 'Homepage', href: '#/' },
        { label: 'Matchday Wear', href: '#/shop/matchday-wear' },
        { label: 'Fan Essentials', href: '#/shop/fan-essentials' },
      ],
    },
    {
      label: 'Teams',
      href: sectionMenuHrefMap.Teams,
      featured: false,
      links: allTeamsMenuLinks,
    },
    {
      label: 'Leagues',
      href: sectionMenuHrefMap.Leagues,
      featured: false,
      links: leagueMenuLinks,
    },
    {
      label: 'RIU',
      href: sectionMenuHrefMap.RIU,
      featured: false,
      links: [
        { label: 'Matchday Wear', href: '#/shop/matchday-wear' },
        { label: 'Fan Essentials', href: '#/shop/fan-essentials' },
        { label: 'Accessories', href: '#/shop/accessories' },
      ],
    },
    {
      label: 'Fixture & Results',
      href: sectionMenuHrefMap['Fixture & Results'],
      links: fixtureResultsMenuLinks,
      featured: true,
    },
  ] as const;

  return (
    <>
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
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/65">Regional Section</div>
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
            <DesktopTopNav menus={topMenuPanels} standaloneLink={{ label: 'Age Grade', href: sectionMenuHrefMap['Age Grade'] }} />
          </div>
        </div>
      </header>

      <main>
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
                standaloneLink={{ label: 'Age Grade', href: sectionMenuHrefMap['Age Grade'] }}
                onNavigate={() => setIsMobileMenuOpen(false)}
              />
            </div>
          ) : null}
        </section>

        <section className="relative z-40 overflow-visible border-b border-white/10 bg-[linear-gradient(180deg,rgba(4,8,12,0.76),rgba(4,8,12,0.42))] backdrop-blur-md">
          <div className="mx-auto hidden max-w-[1400px] overflow-visible md:block">
            <div className="grid grid-cols-6 divide-x divide-white/20 overflow-visible text-center text-white">
              {desktopRegionPanels.map((item) => (
                <div
                  key={item.title}
                  className="relative"
                  onMouseEnter={canUseHover ? () => setOpenDesktopRegion(item.title) : undefined}
                  onMouseLeave={canUseHover ? () => setOpenDesktopRegion((value) => (value === item.title ? null : value)) : undefined}
                >
                  <button
                    type="button"
                    onClick={() => {
                      handleRegionalNavigation(getDefaultRegionRoute(item.title));
                    }}
                    className={`flex w-full items-center justify-center gap-3 py-4 transition-colors ${
                      item.title === activePage.regionTitle || openDesktopRegion === item.title ? 'bg-white/10' : 'hover:bg-white/8'
                    }`}
                  >
                    <div>
                      <div className="mb-1 text-sm font-bold tracking-widest">{item.title.toUpperCase()}</div>
                      <div className="text-xs tracking-wider text-gray-300">{item.subtitle.toUpperCase()}</div>
                    </div>
                    <ChevronDown
                      size={16}
                      className={`mt-0.5 transition-transform ${openDesktopRegion === item.title ? 'rotate-180 text-[#f1cf75]' : 'text-white/70'}`}
                    />
                  </button>
                  <div
                    className={
                      openDesktopRegion === item.title
                        ? item.align === 'right'
                          ? 'absolute top-full right-0 z-50 w-[560px] overflow-hidden border-[6px] border-white bg-[#111315] text-left shadow-2xl'
                          : 'absolute top-full left-0 z-50 w-[560px] overflow-hidden border-[6px] border-white bg-[#111315] text-left shadow-2xl'
                        :
                      item.align === 'right'
                        ? 'absolute top-full right-0 z-50 hidden w-[560px] overflow-hidden border-[6px] border-white bg-[#111315] text-left shadow-2xl'
                        : 'absolute top-full left-0 z-50 hidden w-[560px] overflow-hidden border-[6px] border-white bg-[#111315] text-left shadow-2xl'
                    }
                  >
                    <div className="relative min-h-[260px] bg-cover bg-center" style={{ backgroundImage: `url('${item.image}')` }}>
                      <div className="absolute inset-0 bg-black/45" />
                      <div className="relative z-10 w-[220px] bg-black/75 px-8 py-6">
                        {item.links.map((link) => {
                          const isActiveLink = item.title === activePage.regionTitle && link === activePage.link;
                          return (
                            <button
                              key={link}
                              type="button"
                              onMouseDown={(event) => handleImmediateRegionalNavigation(event, buildRegionRoute(item.title, link))}
                              onTouchStart={(event) => handleImmediateRegionalNavigation(event, buildRegionRoute(item.title, link))}
                              onClick={(event) => {
                                event.preventDefault();
                              }}
                              className={`block w-full border-b border-white/20 py-4 text-left text-base transition-colors hover:text-[#d6cf77] ${
                                isActiveLink ? 'text-[#f1cf75]' : 'text-white'
                              }`}
                            >
                              {link}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mx-auto max-w-7xl px-4 py-4 md:hidden">
            <div className="space-y-3">
              {regionCards.map((item) => {
                const regionPanel = desktopRegionPanels.find((panel) => panel.title === item.title) ?? activePanel;

                return (
                  <div key={item.title} className="overflow-hidden rounded-[6px] border border-white/45 bg-black/45 shadow-[0_10px_28px_rgba(0,0,0,0.28)] backdrop-blur-md">
                    <button
                      type="button"
                      onClick={() => setOpenMobileRegion((value) => (value === item.title ? null : item.title))}
                      className="flex w-full items-center justify-between bg-[linear-gradient(90deg,rgba(0,0,0,0.34),rgba(255,255,255,0.04))] px-4 py-4 text-left"
                    >
                      <div>
                        <div className="text-lg font-semibold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">{item.title}</div>
                        <div className="mt-1 text-xs uppercase tracking-[0.18em] text-white/90">{item.subtitle}</div>
                      </div>
                      <ChevronDown
                        size={18}
                        className={openMobileRegion === item.title ? 'rotate-180 text-white transition-transform' : 'text-white transition-transform'}
                      />
                    </button>
                    {openMobileRegion === item.title ? (
                      <div className="border-t border-white/20 bg-black/85">
                        <div className="grid grid-cols-[120px_1fr]">
                          <div className="px-4 py-3">
                            <div className="flex min-h-[312px] flex-col">
                              {regionPanel.links.map((link, index) => {
                                const isActiveLink = item.title === activePage.regionTitle && link === activePage.link;
                                return (
                                  <button
                                    key={link}
                                    type="button"
                                    onMouseDown={(event) => handleImmediateRegionalNavigation(event, buildRegionRoute(item.title, link))}
                                    onTouchStart={(event) => handleImmediateRegionalNavigation(event, buildRegionRoute(item.title, link))}
                                    onClick={(event) => {
                                      event.preventDefault();
                                    }}
                                    className={`flex flex-1 items-center text-left text-sm font-semibold transition-colors hover:text-[#d6cf77] ${
                                      isActiveLink ? 'text-[#f1cf75]' : 'text-white'
                                    } ${index < regionPanel.links.length - 1 ? 'border-b border-white/15' : ''}`}
                                  >
                                    {link}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                          <div
                            className="min-h-[312px] bg-center bg-no-repeat"
                            style={{
                              backgroundSize: '100% 100%',
                              backgroundImage: `url('${regionPanel.image}')`,
                            }}
                          />
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <RegionalClubDirectory regionTitle={activePage.regionTitle} />
      </main>

      <SharedFooter />
    </>
  );
}
