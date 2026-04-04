import React, { useEffect, useState } from 'react';
import { ChevronDown, Calendar, Menu, CloudSun, Facebook, Info, Send, MessageCircle, Globe, Phone } from 'lucide-react';

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileRegion, setOpenMobileRegion] = useState<string | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [countdown, setCountdown] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });
  const [pollVotes, setPollVotes] = useState({ rams: 18, draw: 6, eagles: 12 });
  const [selectedPollOption, setSelectedPollOption] = useState<'rams' | 'draw' | 'eagles' | null>(null);
  const [selectedSponsorClub, setSelectedSponsorClub] = useState('Eagles RFC');
  const [selectedFixtureIndex, setSelectedFixtureIndex] = useState(0);
  const [fixtureDeckMode, setFixtureDeckMode] = useState<'fixtures' | 'results' | 'standings'>('fixtures');
  const [selectedStandingsDivision, setSelectedStandingsDivision] = useState('Premiership');
  const [routeHash, setRouteHash] = useState(() => window.location.hash || '#/');

  const tickerItems = [
    'FT Ewes 36-27 She Wolves | 28 Mar',
    'MEN FT Kakira 11-52 Kobs | 14 Mar',
    'MEN FT Hippos 19-34 Walukuba | 14 Mar',
    'WOMEN FT Pirates 31-9 Impis | 14 Mar',
  ];

  const mobileMenuItems = [
    { label: 'Latest', hasDropdown: true },
    { label: 'Teams', hasDropdown: true },
    { label: 'Age Grade', hasDropdown: false },
    { label: 'Tournaments', hasDropdown: true },
    { label: 'RIU', hasDropdown: true },
    { label: 'Fixture & Results', hasDropdown: true },
  ];

  const regionCards = [
    { title: 'Central', subtitle: 'Regional Rugby' },
    { title: 'Northern', subtitle: 'Regional Rugby' },
    { title: 'Eastern', subtitle: 'Regional Rugby' },
    { title: 'Western', subtitle: 'Regional Rugby' },
    { title: 'Schools', subtitle: 'Youth Rugby' },
    { title: 'National Team', subtitle: 'Uganda Rugby' },
  ];

  const desktopRegionPanels = [
    {
      title: 'Central',
      subtitle: 'Regional Rugby',
      links: ['Men', 'Women', 'Fixtures', 'Standings'],
      image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=1200',
      align: 'left',
    },
    {
      title: 'Northern',
      subtitle: 'Regional Rugby',
      links: ['Men', 'Women', 'Clubs', 'Results'],
      image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=1200',
      align: 'left',
    },
    {
      title: 'Eastern',
      subtitle: 'Regional Rugby',
      links: ['Men', 'Women', 'Schedules', 'Rankings'],
      image: 'https://images.unsplash.com/photo-1508098682722-e99c643e7485?auto=format&fit=crop&q=80&w=1200',
      align: 'left',
    },
    {
      title: 'Western',
      subtitle: 'Regional Rugby',
      links: ['Men', 'Women', 'Fixtures', 'Teams'],
      image: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&q=80&w=1200',
      align: 'right',
    },
    {
      title: 'Schools',
      subtitle: 'Youth Rugby',
      links: ['Boys', 'Girls', 'Schools Cup', 'Results'],
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1200',
      align: 'right',
    },
    {
      title: 'National Team',
      subtitle: 'Uganda Rugby',
      links: ['Men', 'Women', 'Fixtures', 'Squad'],
      image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=1200',
      align: 'right',
    },
  ];

  const heroSlides = [
    '/slider/one.jpg',
    '/slider/two.jpeg',
    '/slider/three.webp',
  ];

  const sponsorClubOptions = [
    { name: 'Eagles RFC', mark: 'ER', image: '/slider/one.jpg' },
    { name: 'Kobs RFC', mark: 'KR', image: '/slider/two.jpeg' },
    { name: 'Pirates RFC', mark: 'PR', image: '/slider/three.webp' },
    { name: 'Hippos RFC', mark: 'HR', image: '/slider/one.jpg' },
    { name: 'Walukuba', mark: 'WR', image: '/slider/two.jpeg' },
  ];

  const playerOfMonthTeams = [
    { team: 'Eagles RFC', player: 'Ivan Magomu', role: 'Backline Leader', points: '42', highlight: 'Game control', image: '/player.png' },
    { team: 'Kobs RFC', player: 'Joseph Aredo', role: 'Reliable Kicker', points: '36', highlight: 'Big moments', image: '/slider/one.jpg' },
    { team: 'Pirates RFC', player: 'Pius Ogena', role: 'Power Carrier', points: '28', highlight: 'Gain line wins', image: '/slider/two.jpeg' },
    { team: 'Hippos RFC', player: 'Michael Wokorach', role: 'Impact Runner', points: '31', highlight: 'Explosive breaks', image: '/slider/three.webp' },
  ];

  const fixtureResultCards = [
    {
      stage: 'Top 14 - J24',
      date: '16 May',
      time: '00h00',
      home: 'Kobs RFC',
      away: 'Walukuba',
      venue: 'Legends Grounds',
      accent: '#ff4f93',
      image: '/slider/two.jpeg',
      status: 'Booking',
      resultStatus: 'FT',
      homeScore: 27,
      awayScore: 18,
    },
    {
      stage: 'Top 14 - J25',
      date: '30 May',
      time: '00h00',
      home: 'Eagles RFC',
      away: 'Pirates RFC',
      venue: 'Kings Park',
      accent: '#ff4f93',
      image: '/slider/one.jpg',
      status: 'Booking',
      resultStatus: 'FT',
      homeScore: 31,
      awayScore: 22,
    },
    {
      stage: 'Top 14 - J26',
      date: '06 Jun',
      time: '00h00',
      home: 'Hippos RFC',
      away: 'Buffaloes',
      venue: 'Jinja Grounds',
      accent: '#ff4f93',
      image: '/slider/three.webp',
      status: 'Booking',
      resultStatus: 'FT',
      homeScore: 19,
      awayScore: 14,
    },
  ];

  const standingsByDivision = {
    Premiership: [
      { rank: 1, team: 'Kobs RFC', played: 12, points: 71 },
      { rank: 2, team: 'Eagles RFC', played: 12, points: 59 },
      { rank: 3, team: 'Pirates RFC', played: 12, points: 55 },
      { rank: 4, team: 'Hippos RFC', played: 12, points: 52 },
      { rank: 5, team: 'Walukuba', played: 12, points: 46 },
    ],
    Eastern: [
      { rank: 1, team: 'Walukuba', played: 10, points: 41 },
      { rank: 2, team: 'Jinja Hippos II', played: 10, points: 37 },
      { rank: 3, team: 'Mongers', played: 10, points: 33 },
      { rank: 4, team: 'Elgon Wolves', played: 10, points: 26 },
    ],
    Northern: [
      { rank: 1, team: 'Gulu City', played: 8, points: 29 },
      { rank: 2, team: 'Lira Bulls', played: 8, points: 24 },
      { rank: 3, team: 'Arua Rhinos', played: 8, points: 19 },
      { rank: 4, team: 'Kitgum Giants', played: 8, points: 12 },
    ],
    Western: [
      { rank: 1, team: 'Buffaloes West', played: 9, points: 35 },
      { rank: 2, team: 'Mbarara Hawks', played: 9, points: 31 },
      { rank: 3, team: 'Kasese Select', played: 9, points: 24 },
      { rank: 4, team: 'Fort Portal', played: 9, points: 16 },
    ],
    Central: [
      { rank: 1, team: 'Ewes', played: 11, points: 44 },
      { rank: 2, team: 'She Wolves', played: 11, points: 39 },
      { rank: 3, team: 'Impis', played: 11, points: 34 },
      { rank: 4, team: 'Thunderbirds', played: 11, points: 22 },
    ],
  } as const;

  const rugbySponsorLogos = [
    'Companies Sponsoring Rugby',
    'Companies Sponsoring Rugby',
    'Companies Sponsoring Rugby',
    'Companies Sponsoring Rugby',
    'Companies Sponsoring Rugby',
    'Companies Sponsoring Rugby',
  ];

  const getRegionPanel = (title: string) =>
    desktopRegionPanels.find((panel) => panel.title === title) ?? desktopRegionPanels[0];

  const merchandisePages = {
    '#/shop/matchday-wear': {
      title: 'Matchday Wear',
      subtitle: 'Official Rugby In Uganda matchday pieces for fans, players, and club communities.',
      image: '/slider/one.jpg',
      items: ['Match Jerseys', 'Training Tops', 'Sideline Jackets', 'Supporter Tees'],
    },
    '#/shop/fan-essentials': {
      title: 'Fan Essentials',
      subtitle: 'Everyday supporter gear built for match weekends, watch parties, and travel.',
      image: '/slider/two.jpeg',
      items: ['Caps', 'Scarves', 'Supporter Tees', 'Flags'],
    },
    '#/shop/accessories': {
      title: 'Accessories',
      subtitle: 'Small finishing pieces that carry the Rugby In Uganda identity wherever you go.',
      image: '/slider/three.webp',
      items: ['Water Bottles', 'Wristbands', 'Key Holders', 'Travel Bags'],
    },
  } as const;

  const activeMerchPage = merchandisePages[routeHash as keyof typeof merchandisePages];

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 4500);

    return () => window.clearInterval(intervalId);
  }, [heroSlides.length]);

  useEffect(() => {
    const handleHashChange = () => {
      setRouteHash(window.location.hash || '#/');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const matchKickoff = new Date('2026-04-05T16:00:00+03:00').getTime();

    const updateCountdown = () => {
      const diff = Math.max(matchKickoff - Date.now(), 0);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setCountdown({
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
      });
    };

    updateCountdown();
    const intervalId = window.setInterval(updateCountdown, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  const totalPollVotes = pollVotes.rams + pollVotes.draw + pollVotes.eagles;

  const livePollOptions = [
    { key: 'rams' as const, label: 'Rams', count: pollVotes.rams },
    { key: 'draw' as const, label: 'Draw', count: pollVotes.draw },
    { key: 'eagles' as const, label: 'Eagles', count: pollVotes.eagles },
  ];

  const handleLivePollVote = (option: 'rams' | 'draw' | 'eagles') => {
    if (selectedPollOption === option) {
      return;
    }

    setPollVotes((current) => {
      const nextVotes = { ...current };

      if (selectedPollOption) {
        nextVotes[selectedPollOption] = Math.max(0, nextVotes[selectedPollOption] - 1);
      }

      nextVotes[option] = nextVotes[option] + 1;
      return nextVotes;
    });

    setSelectedPollOption(option);
  };

  if (activeMerchPage) {
    return (
      <div className="min-h-screen bg-[#0a0c10] text-white">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img src={activeMerchPage.image} alt={activeMerchPage.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(6,8,12,0.9),rgba(11,45,100,0.58))]" />
          </div>

          <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-4 py-16 sm:px-6">
            <a
              href="#/"
              className="mb-8 inline-flex w-fit items-center justify-center rounded-full border border-white/15 bg-white/8 px-5 py-3 text-xs font-black uppercase tracking-[0.22em] text-white backdrop-blur-md transition-colors hover:bg-white/14"
            >
              Back Home
            </a>

            <div className="max-w-3xl rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.05))] p-8 shadow-[0_24px_70px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:p-10">
              <div className="text-xs font-semibold uppercase tracking-[0.34em] text-[#d6a327]">Official Merchandise</div>
              <h1 className="mt-4 text-4xl font-serif uppercase tracking-[0.06em] text-white sm:text-6xl">
                {activeMerchPage.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/78">
                {activeMerchPage.subtitle}
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {activeMerchPage.items.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-base font-black uppercase tracking-[0.08em] text-white"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <a
                href="https://wa.me/256773207919"
                className="mt-10 inline-flex items-center justify-center rounded-[4px] bg-[#ef2d2d] px-10 py-4 text-base font-black uppercase tracking-[0.08em] text-white shadow-[0_14px_30px_rgba(239,45,45,0.22)] transition-colors hover:bg-[#ff3b3b]"
              >
                Order via WhatsApp
              </a>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#040507_0%,#09111b_22%,#06080d_55%,#030405_100%)] text-white">
      {/* Top Bar */}
      <div className="relative z-30 isolate border-t-4 border-b border-[#0f4aa6] bg-[linear-gradient(90deg,#050607_0%,#0a1320_48%,#10140f_100%)] px-2 py-2 text-white sm:px-3">
        <div className="flex w-full items-center gap-2 rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] px-2 py-1.5 shadow-[0_10px_26px_rgba(0,0,0,0.22)] backdrop-blur-xl">
          <div className="hidden shrink-0 items-center gap-2 rounded-full border border-white/10 bg-black/28 px-3 py-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] md:flex">
            <CloudSun size={16} />
            <div className="flex flex-col leading-none">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/75">Kampala Weather</span>
              <span className="text-sm font-semibold text-white">Overcast 29C / 19C</span>
            </div>
          </div>
          <div className="ticker-shell flex-1 overflow-hidden rounded-full bg-black/18 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <div className="ticker-track py-1">
              {[0, 1, 2].map((group) => (
                <div key={group} className="ticker-group">
                  {tickerItems.map((item, index) => (
                    <span key={`${group}-${index}-${item}`} className="whitespace-nowrap rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] px-3.5 py-1.5 text-[11.5px] font-semibold text-white/90">
                      {item}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="relative z-30 isolate border-b border-white/10 bg-[linear-gradient(180deg,rgba(4,6,9,0.96),rgba(8,12,18,0.92))] px-4 py-4 text-white shadow-[0_18px_40px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center justify-between gap-3">
            <img src="/logo-cutout.png" alt="Rugby in Uganda" className="h-20 w-auto object-contain sm:h-24 lg:h-28" />
            <div className="flex flex-col items-end gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                Our Partners
              </span>
              <div className="flex flex-wrap items-center justify-end gap-2">
                <div className="flex h-10 min-w-[74px] items-center justify-center rounded-full border border-white/10 bg-[linear-gradient(180deg,#173e7a_0%,#0f2c59_100%)] px-3 text-sm font-black italic text-white shadow-[0_10px_20px_rgba(15,44,89,0.24)]">
                  macron
                </div>
                <div className="flex h-10 min-w-[74px] items-center justify-center rounded-full border border-white/10 bg-[linear-gradient(180deg,#173e7a_0%,#0f2c59_100%)] px-3 text-xs font-bold text-white shadow-[0_10px_20px_rgba(15,44,89,0.24)]">
                  HSBC
                </div>
                <div className="flex h-10 min-w-[74px] items-center justify-center rounded-full border border-white/10 bg-[linear-gradient(180deg,#173e7a_0%,#0f2c59_100%)] px-3 text-xs font-bold tracking-wide text-white shadow-[0_10px_20px_rgba(15,44,89,0.24)]">
                  NILE
                </div>
              </div>
            </div>
          </div>
          <nav className="hidden md:flex md:justify-end">
            <div className="flex items-center gap-3 rounded-full border border-white/10 bg-black/18 px-3 py-2 text-base font-semibold text-white backdrop-blur-md">
              <a href="#" className="flex items-center gap-2 rounded-full px-4 py-2 transition-colors hover:bg-white/8 hover:text-white">
                <span>Latest</span>
                <ChevronDown size={18} />
              </a>
              <a href="#" className="flex items-center gap-2 rounded-full px-4 py-2 transition-colors hover:bg-white/8 hover:text-white">
                <span>Teams</span>
                <ChevronDown size={18} />
              </a>
              <a href="#" className="rounded-full px-4 py-2 transition-colors hover:bg-white/8 hover:text-white">Age Grade</a>
              <a href="#" className="flex items-center gap-2 rounded-full px-4 py-2 transition-colors hover:bg-white/8 hover:text-white">
                <span>Tournaments</span>
                <ChevronDown size={18} />
              </a>
              <a href="#" className="flex items-center gap-2 rounded-full px-4 py-2 transition-colors hover:bg-white/8 hover:text-white">
                <span>RIU</span>
                <ChevronDown size={18} />
              </a>
              <a href="#" className="flex items-center gap-2 rounded-full bg-[linear-gradient(90deg,#ef2d2d_0%,#ff6d3f_100%)] px-4 py-2 text-white shadow-[0_12px_24px_rgba(239,45,45,0.2)] transition-transform hover:-translate-y-0.5">
                <span>Fixture & Results</span>
                <ChevronDown size={18} />
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[920px] bg-[#071019] md:min-h-[580px] md:h-[680px]">
        {heroSlides.map((slide, index) => (
          <img
            key={slide}
            src={slide}
            alt={`Rugby in Uganda slide ${index + 1}`}
            className={activeSlide === index
              ? 'absolute inset-0 h-full w-full scale-125 object-cover object-center opacity-90 transition-opacity duration-700 md:scale-110 md:object-[center_40%]'
              : 'absolute inset-0 h-full w-full scale-125 object-cover object-center opacity-0 transition-opacity duration-700 md:scale-110 md:object-[center_40%]'}
          />
        ))}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,8,12,0.28)_0%,rgba(4,8,12,0.4)_40%,rgba(3,5,8,0.76)_100%)]"></div>

        <div className="absolute top-0 left-0 z-20 w-full overflow-hidden bg-black md:hidden">
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
              <div className="grid grid-cols-2 gap-3 text-sm font-semibold text-white">
                {mobileMenuItems.map((item) => (
                  <a key={item.label} href="#" className="flex items-center justify-between rounded-md border border-white/10 bg-white/5 px-3 py-3 transition-colors hover:bg-white/10">
                    <span>{item.label}</span>
                    {item.hasDropdown ? <ChevronDown size={14} /> : null}
                  </a>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div className={`absolute left-0 right-0 z-20 px-4 pb-4 md:hidden ${isMobileMenuOpen ? 'top-[300px]' : 'top-[84px]'}`}>
          <div className="space-y-3">
            {regionCards.map((item) => (
              <div key={item.title} className="overflow-hidden rounded-[6px] border border-white/45 bg-black/45 shadow-[0_10px_28px_rgba(0,0,0,0.28)] backdrop-blur-md">
                {(() => {
                  const regionPanel = getRegionPanel(item.title);

                  return (
                    <>
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
                          {regionPanel.links.map((link, index) => (
                            <a
                              key={link}
                              href="#"
                              className={`flex flex-1 items-center text-sm font-semibold text-white transition-colors hover:text-[#d6cf77] ${
                                index < regionPanel.links.length - 1 ? 'border-b border-white/15' : ''
                              }`}
                            >
                              {link}
                            </a>
                          ))}
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
                    </>
                  );
                })()}
              </div>
            ))}
          </div>
        </div>

        {/* Sub Nav Overlay */}
        <div className="absolute top-0 left-0 hidden w-full border-b border-white/10 bg-[linear-gradient(180deg,rgba(4,8,12,0.7),rgba(4,8,12,0.38))] backdrop-blur-md md:block">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-6 divide-x divide-white/20 text-center text-white">
              {desktopRegionPanels.map((item) => (
                <div key={item.title} className="group relative cursor-pointer py-4 transition-colors hover:bg-white/8">
                  <div className="mb-1 text-sm font-bold tracking-widest">{item.title.toUpperCase()}</div>
                  <div className="text-xs tracking-wider text-gray-300">{item.subtitle.toUpperCase()}</div>
                  <div
                    className={
                      item.align === 'right'
                        ? 'absolute top-full right-0 z-20 hidden w-[560px] overflow-hidden border-[6px] border-white bg-[#111315] text-left shadow-2xl group-hover:block'
                        : 'absolute top-full left-0 z-20 hidden w-[560px] overflow-hidden border-[6px] border-white bg-[#111315] text-left shadow-2xl group-hover:block'
                    }
                  >
                    <div
                      className="relative min-h-[260px] bg-cover bg-center"
                      style={{ backgroundImage: `url('${item.image}')` }}
                    >
                      <div className="absolute inset-0 bg-black/45" />
                      <div className="relative z-10 w-[220px] bg-black/75 px-8 py-6">
                        {item.links.map((link) => (
                          <a key={link} href="#" className="block border-b border-white/20 py-4 text-base text-white transition-colors hover:text-[#d6cf77]">
                            {link}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Bar */}
        <div className="absolute inset-x-0 bottom-0 w-full bg-[linear-gradient(90deg,rgba(22,34,27,0.92),rgba(15,29,39,0.92),rgba(33,35,21,0.92))] py-6 backdrop-blur-xl">
          <div className="container mx-auto flex justify-center px-4">
            <div className="flex w-full items-center gap-3 overflow-x-auto whitespace-nowrap rounded-[24px] border border-white/10 bg-black/14 px-3 py-3 pb-1 shadow-[0_18px_40px_rgba(0,0,0,0.2)] md:w-auto md:flex-wrap md:justify-center md:overflow-visible md:whitespace-normal md:pb-3">
              <div className="relative w-[210px] shrink-0 md:w-auto">
                <select defaultValue="" className="w-full appearance-none border border-white/60 bg-transparent px-4 py-3 text-lg uppercase text-white focus:border-white focus:outline-none md:py-2 md:text-base lg:w-48">
                  <option value="" disabled hidden className="text-black">SHOP</option>
                  <option className="text-black">RIU</option>
                  <option className="text-black">CLUBS</option>
                </select>
                <ChevronDown size={18} className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 transform text-white/90 md:size-[14px]" />
              </div>
              <div className="relative w-[210px] shrink-0 md:w-auto">
                <select defaultValue="" className="w-full appearance-none border border-white/60 bg-transparent px-4 py-3 text-lg uppercase text-white focus:border-white focus:outline-none md:py-2 md:text-base lg:w-48">
                  <option value="" disabled hidden className="text-black">EVENTS</option>
                  <option className="text-black">ON GOING</option>
                  <option className="text-black">UP COMING</option>
                </select>
                <ChevronDown size={18} className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 transform text-white/90 md:size-[14px]" />
              </div>
              <div className="relative w-[210px] shrink-0 md:w-auto">
                <select
                  defaultValue=""
                  onChange={(event) => {
                    const division = event.target.value;
                    if (!division) return;
                    setSelectedStandingsDivision(division);
                    setFixtureDeckMode('standings');
                    window.requestAnimationFrame(() => {
                      document.getElementById('fixtures-results-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    });
                  }}
                  className="w-full appearance-none border border-white/60 bg-transparent px-4 py-3 text-lg uppercase text-white focus:border-white focus:outline-none md:py-2 md:text-base lg:w-40"
                >
                  <option value="" disabled hidden className="text-black">TABLE STANDINGS</option>
                  <option className="text-black">Premiership</option>
                  <option className="text-black">Eastern</option>
                  <option className="text-black">Northern</option>
                  <option className="text-black">Western</option>
                  <option className="text-black">Central</option>
                </select>
                <ChevronDown size={18} className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 transform text-white/90 md:size-[14px]" />
              </div>
              <div className="relative w-[210px] shrink-0 md:w-auto">
                <select defaultValue="" className="w-full appearance-none border border-white/60 bg-transparent px-4 py-3 text-lg uppercase text-white focus:border-white focus:outline-none md:py-2 md:text-base lg:w-40">
                  <option value="" disabled hidden className="text-black">NEWS</option>
                  <option className="text-black">ALL NEWS</option>
                  <option className="text-black">LATEST NEWS</option>
                </select>
                <ChevronDown size={18} className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 transform text-white/90 md:size-[14px]" />
              </div>
              <div className="relative w-[210px] shrink-0 md:w-auto">
                <input type="text" placeholder="CALENDAR" className="w-full border border-white/60 bg-transparent px-4 py-3 text-lg uppercase text-white placeholder-white/90 focus:border-white focus:outline-none md:py-2 md:text-base lg:w-40" />
                <Calendar size={18} className="absolute top-1/2 right-4 -translate-y-1/2 transform text-white/90 md:size-[14px]" />
              </div>
              <button className="w-[210px] shrink-0 whitespace-nowrap bg-[#d93838] px-6 py-3 text-lg font-bold text-white transition-colors hover:bg-red-700 md:w-auto md:px-8 md:py-2.5 md:text-base">
                Partner With Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-font-fixed relative overflow-visible pt-10 pb-2 sm:pt-12 sm:pb-1">
        <div className="absolute inset-0">
          <img
            src="/slider/two.jpeg"
            alt="Rugby background"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="relative z-10 mx-auto max-w-[720px] px-3 sm:px-4">
          <div
            id="fixtures-results-section"
            className="mb-6 overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(8,16,23,0.82),rgba(8,14,20,0.88))] shadow-[0_24px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:mb-8"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(7,18,24,0.78), rgba(8,14,20,0.88)), url('/slider/three.webp')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="grid grid-cols-1 gap-5 p-4 sm:p-5 lg:p-7">
              <div className="mx-auto w-full max-w-[560px] pt-4 sm:pt-6">
                <div className="mb-5 flex justify-center">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/24 px-3 py-2 shadow-[0_12px_24px_rgba(0,0,0,0.14)] backdrop-blur-md">
                  <a
                    href="#"
                    onClick={(event) => {
                      event.preventDefault();
                      setFixtureDeckMode('fixtures');
                    }}
                    className={`rounded-full px-4 py-2 text-center text-sm font-black uppercase tracking-[0.16em] transition-all sm:px-5 sm:text-base ${
                      fixtureDeckMode === 'fixtures'
                        ? 'bg-[#f1cf75] text-[#13253e] shadow-[0_10px_22px_rgba(241,207,117,0.22)]'
                        : 'text-white hover:text-[#f1cf75]'
                    }`}
                  >
                    Fixtures
                  </a>
                  <a
                    href="#"
                    onClick={(event) => {
                      event.preventDefault();
                      setFixtureDeckMode('results');
                    }}
                    className={`rounded-full px-4 py-2 text-center text-sm font-black uppercase tracking-[0.16em] transition-all sm:px-5 sm:text-base ${
                      fixtureDeckMode === 'results'
                        ? 'bg-[#ff4f93] text-white shadow-[0_10px_22px_rgba(255,79,147,0.22)]'
                        : 'text-white hover:text-[#f1cf75]'
                    }`}
                  >
                    Results
                  </a>
                  </div>
                </div>
                {fixtureDeckMode === 'standings' ? (
                  <div className="rounded-[18px] border border-white/10 bg-[linear-gradient(180deg,rgba(6,16,27,0.82),rgba(10,20,34,0.68))] p-4 text-white shadow-[0_18px_36px_rgba(0,0,0,0.18)] backdrop-blur-md">
                    <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
                      <div>
                        <div className="text-[11px] font-black uppercase tracking-[0.16em] text-[#f1cf75]">Table Standings</div>
                        <div className="mt-1 text-xl font-black uppercase tracking-[0.04em] text-white">{selectedStandingsDivision}</div>
                      </div>
                      <div className="rounded-full border border-white/10 bg-white/8 px-3 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-white/76">
                        Live Table
                      </div>
                    </div>

                    <div className="mt-4 space-y-3">
                      {standingsByDivision[selectedStandingsDivision as keyof typeof standingsByDivision].map((row) => (
                        <div
                          key={`${selectedStandingsDivision}-${row.rank}-${row.team}`}
                          className="grid grid-cols-[40px_1fr_auto_auto] items-center gap-3 rounded-[14px] border border-white/10 bg-white px-3 py-3 text-[#17304b] shadow-[0_10px_22px_rgba(0,0,0,0.12)]"
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[linear-gradient(180deg,#17304b_0%,#0f1f34_100%)] text-sm font-black text-white">
                            {row.rank}
                          </div>
                          <div className="min-w-0">
                            <div className="truncate text-sm font-black uppercase tracking-[0.04em]">{row.team}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-[10px] font-black uppercase tracking-[0.12em] text-[#5d6b7b]">P</div>
                            <div className="mt-1 text-sm font-black">{row.played}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-[10px] font-black uppercase tracking-[0.12em] text-[#5d6b7b]">Pts</div>
                            <div className="mt-1 text-sm font-black">{row.points}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="relative h-[372px] w-full lg:h-[430px]">
                  {fixtureResultCards.map((match, index) => {
                    const offset = (index - selectedFixtureIndex + fixtureResultCards.length) % fixtureResultCards.length;
                    const position =
                      offset === 0 ? 'center' : offset === 1 ? 'right' : 'left';

                    const cardClass =
                      position === 'center'
                        ? 'left-1/2 top-0 z-30 w-[276px] -translate-x-1/2 lg:w-[360px]'
                        : position === 'left'
                          ? 'left-[4px] top-[16px] z-10 w-[170px] lg:left-[28px] lg:top-[20px] lg:w-[220px]'
                          : 'right-[4px] top-[16px] z-10 w-[170px] lg:right-[28px] lg:top-[20px] lg:w-[220px]';

                    return (
                      <button
                        key={`stacked-fixture-${match.home}-${match.away}`}
                        type="button"
                        onClick={() => setSelectedFixtureIndex(index)}
                        className={`absolute h-[280px] overflow-hidden rounded-[14px] border border-white/90 bg-[linear-gradient(180deg,#ffffff_0%,#f8f9fc_100%)] text-center text-[#17304b] shadow-[0_18px_36px_rgba(0,0,0,0.18)] transition-all duration-300 ${cardClass} lg:h-[332px]`}
                      >
                        {position === 'center' ? (
                          <div className="px-6 py-7 lg:px-8 lg:py-9">
                            <div className="flex items-center justify-between gap-3 text-[11px] font-bold uppercase tracking-[0.08em] lg:text-xs">
                              <span className="rounded-full bg-[#17304b]/6 px-3 py-1 text-[#17304b]">{match.stage}</span>
                              <span className="text-[#17304b]">
                                {fixtureDeckMode === 'fixtures' ? `${match.date} ${match.time}` : match.resultStatus}
                              </span>
                            </div>
                            <div className="mt-5 lg:mt-7">
                              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#ffe1ef] bg-[linear-gradient(135deg,#ffeff7,#ffffff)] text-lg font-black uppercase text-[#ff4f93] shadow-[0_10px_24px_rgba(255,79,147,0.12)] lg:h-20 lg:w-20 lg:text-xl">
                                {match.home.split(' ')[0].slice(0, 2)}
                              </div>
                            </div>
                            <div className="mt-5 text-[17px] font-black uppercase leading-tight tracking-[0.04em] lg:text-[21px]">{match.home}</div>
                            {fixtureDeckMode === 'fixtures' ? (
                              <div className="mt-3 text-[42px] font-black uppercase leading-none text-[#ff4f93] lg:text-[52px]">VS</div>
                            ) : (
                              <div className="mt-3 text-[34px] font-black uppercase leading-none text-[#ff4f93] lg:text-[42px]">
                                {match.homeScore} - {match.awayScore}
                              </div>
                            )}
                            <div className="mt-3 text-[17px] font-black uppercase leading-tight tracking-[0.04em] lg:text-[21px]">{match.away}</div>
                            <div className="mt-5 lg:mt-6">
                              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border-4 border-[#e7efff] bg-[linear-gradient(135deg,#eef4ff,#ffffff)] text-sm font-black uppercase text-[#17304b] lg:h-14 lg:w-14">
                                {match.away.split(' ')[0].slice(0, 2)}
                              </div>
                            </div>
                            <div className="mt-5 rounded-[12px] border border-[#17304b]/10 bg-[linear-gradient(180deg,rgba(23,48,75,0.05),rgba(23,48,75,0.02))] px-4 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-[#5d6b7b] lg:mt-6">
                              Venue: {match.venue}
                            </div>
                            <div className={`mt-5 inline-flex rounded-[10px] px-6 py-3 text-sm font-black text-white lg:mt-7 lg:px-7 lg:py-3.5 ${
                              fixtureDeckMode === 'fixtures'
                                ? 'bg-[linear-gradient(180deg,#17304b_0%,#12243c_100%)] shadow-[0_10px_22px_rgba(18,36,60,0.18)]'
                                : 'bg-[linear-gradient(180deg,#ff4f93_0%,#ff2e7d_100%)] shadow-[0_10px_22px_rgba(255,79,147,0.22)]'
                            }`}>
                              {fixtureDeckMode === 'fixtures' ? match.status : match.resultStatus}
                            </div>
                          </div>
                        ) : (
                          <div className="flex h-full flex-col justify-between bg-[linear-gradient(180deg,rgba(255,255,255,1),rgba(245,247,251,0.96))] px-4 py-6 text-[#b6b0a8] lg:px-5 lg:py-7">
                            <div className="text-xs font-medium uppercase leading-tight lg:text-[13px]">
                              {match.stage}
                            </div>
                            <div className="text-sm font-semibold lg:text-base">
                              {fixtureDeckMode === 'fixtures' ? match.date : `${match.homeScore}-${match.awayScore}`}
                            </div>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
                )}
              </div>

            </div>
          </div>

          <div className="bg-[rgba(255,255,255,0.9)] p-2 shadow-[0_24px_60px_rgba(0,0,0,0.18)] sm:p-3">
            <div
              className="relative overflow-hidden rounded-[24px] border border-[#f3a51b]/50 px-5 py-6 sm:px-8 sm:py-8"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, rgba(8,8,8,0.84), rgba(28,14,8,0.58)), url('/slider/one.jpg')",
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}
            >
              <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
              <div className="relative z-10">
                <div className="mb-10 flex items-start justify-between gap-4">
                  <div className="inline-flex rounded-md bg-[#f4a71d] px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-black">
                    Match of the Day
                  </div>
                  <p className="text-xs font-semibold text-white/70 sm:text-sm">Nile Special Rugby</p>
                </div>

                <div className="mb-6 flex flex-col gap-4 text-white lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-center justify-between gap-3 sm:gap-5 lg:flex-1 lg:pt-8">
                    <h2
                      className="min-w-0 flex-1 text-left text-[20px] font-black uppercase leading-none sm:text-4xl"
                      style={{ color: '#ffffff', textShadow: '0 2px 12px rgba(0,0,0,0.65)' }}
                    >
                      Life Guard Rams
                    </h2>

                    <div className="shrink-0 text-center">
                      <div className="text-[24px] font-black uppercase text-[#f4a71d] sm:text-5xl">VS</div>
                      <p className="mt-1 text-[11px] font-semibold text-white/80 sm:mt-2 sm:text-sm">Sun 05/04</p>
                      <p className="text-[16px] font-black uppercase text-[#f4a71d] sm:text-lg">4:00PM</p>
                      <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/65 sm:mt-4 sm:text-sm sm:tracking-[0.22em]">Kitante</p>
                    </div>

                    <h2
                      className="min-w-0 flex-1 text-right text-[20px] font-black uppercase leading-none sm:text-4xl"
                      style={{ color: '#ffffff', textShadow: '0 2px 12px rgba(0,0,0,0.65)' }}
                    >
                      Eagles
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    { value: countdown.days, label: 'Days' },
                    { value: countdown.hours, label: 'Hrs' },
                    { value: countdown.minutes, label: 'Min' },
                    { value: countdown.seconds, label: 'Sec' },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-xl border border-[#f3a51b]/50 bg-black/55 px-4 py-4 text-center shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)]"
                    >
                      <div className="text-3xl font-black text-[#f4a71d]">{item.value}</div>
                      <div className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-white/65">{item.label}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(0,0,0,0.42),rgba(0,0,0,0.28))] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-md sm:mt-6 sm:p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#f4a71d]">Live Poll</div>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.08em] text-white/80 sm:text-sm">
                        Who takes this one?
                      </p>
                    </div>
                    <div className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-white/70">
                      {totalPollVotes} Votes
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {livePollOptions.map((option) => {
                      const isSelected = selectedPollOption === option.key;
                      const percentage = totalPollVotes === 0 ? 0 : Math.round((option.count / totalPollVotes) * 100);

                      return (
                        <button
                          key={option.key}
                          type="button"
                          onClick={() => handleLivePollVote(option.key)}
                          className={`rounded-[14px] border px-2 py-2 text-center transition-all duration-200 sm:px-3 sm:py-3 ${
                            isSelected
                              ? 'border-[#f4a71d] bg-[linear-gradient(180deg,rgba(244,167,29,0.22),rgba(244,167,29,0.12))] shadow-[0_10px_24px_rgba(244,167,29,0.14)]'
                              : 'border-white/12 bg-white/6 hover:border-white/20 hover:bg-white/10'
                          }`}
                        >
                          <div className={`text-[11px] font-black uppercase tracking-[0.1em] sm:text-xs ${isSelected ? 'text-[#f8c35a]' : 'text-white'}`}>
                            {option.label}
                          </div>
                          <div className={`mt-1 text-[18px] font-black sm:text-[22px] ${isSelected ? 'text-[#f8c35a]' : 'text-white'}`}>
                            {percentage}%
                          </div>
                          <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.14em] text-white/55">
                            {option.count} picks
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-3 space-y-2">
                    {livePollOptions.map((option) => {
                      const percentage = totalPollVotes === 0 ? 0 : Math.round((option.count / totalPollVotes) * 100);

                      return (
                        <div key={`poll-bar-${option.key}`}>
                          <div className="mb-1 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.12em] text-white/72">
                            <span>{option.label}</span>
                            <span>{percentage}%</span>
                          </div>
                          <div className="h-2 overflow-hidden rounded-full border border-white/10 bg-white/8">
                            <div
                              className={`h-full transition-all duration-300 ${
                                option.key === 'draw'
                                  ? 'bg-[linear-gradient(90deg,#ffe08a_0%,#f4a71d_100%)]'
                                  : option.key === 'rams'
                                    ? 'bg-[linear-gradient(90deg,#ffffff_0%,#d8d8d8_100%)]'
                                    : 'bg-[linear-gradient(90deg,#0f4aa6_0%,#5f95ff_100%)]'
                              }`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="relative mt-8 overflow-hidden bg-[#050505] pt-14 pb-18 sm:mt-10 sm:pt-18 sm:pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(214,163,39,0.16),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(15,74,166,0.22),transparent_28%),linear-gradient(180deg,#040404_0%,#090909_100%)]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent)]" />
        <div className="absolute left-[-8%] top-24 h-64 w-64 rounded-full bg-[#d6a327]/8 blur-3xl" />
        <div className="absolute right-[-6%] top-36 h-72 w-72 rounded-full bg-[#0f4aa6]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-5xl rounded-[34px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-5 py-8 text-center shadow-[0_30px_80px_rgba(0,0,0,0.32)] backdrop-blur-xl sm:px-8 sm:py-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d6a327]/25 bg-[#d6a327]/8 px-5 py-2.5 text-xs font-black uppercase tracking-[0.22em] text-[#f1cf75] backdrop-blur-md">
              Premium Advertising
            </div>
            <p className="mx-auto mt-5 max-w-2xl font-serif text-[16px] italic leading-snug text-[#f1cf75] sm:text-2xl">
              Put Your Brand Where Rugby Culture Lives
            </p>
            <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-white/84 sm:text-xl">
              Serious brands can show up here through logo placement, branded features, matchday visibility, and long-term storytelling across Rugby In Uganda.
            </p>
          </div>

          <div className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
            <div className="min-w-[85%] snap-center rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.09),rgba(255,255,255,0.03))] px-6 py-6 shadow-[0_18px_40px_rgba(0,0,0,0.24)] backdrop-blur-md md:min-w-0">
              <div className="mb-4 h-1 w-16 rounded-full bg-[linear-gradient(90deg,#d6a327_0%,#efbf45_100%)]" />
              <div className="text-[11px] font-black uppercase tracking-[0.22em] text-white/45">Monthly Reach</div>
              <div className="mt-3 text-5xl font-black text-white">50K+</div>
              <div className="mt-3 text-base leading-relaxed text-white/78 sm:text-lg">Across fixtures, results, polls, feature stories, and partner mentions.</div>
            </div>
            <div className="min-w-[85%] snap-center rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.09),rgba(255,255,255,0.03))] px-6 py-6 shadow-[0_18px_40px_rgba(0,0,0,0.24)] backdrop-blur-md md:min-w-0">
              <div className="mb-4 h-1 w-16 rounded-full bg-[linear-gradient(90deg,#0f4aa6_0%,#4f8cff_100%)]" />
              <div className="text-[11px] font-black uppercase tracking-[0.22em] text-white/45">Audience Fit</div>
              <div className="mt-3 text-5xl font-black text-white">Fans, Clubs</div>
              <div className="mt-3 text-base leading-relaxed text-white/78 sm:text-lg">A community built around sport, events, schools, and loyal supporter networks.</div>
            </div>
            <div className="min-w-[85%] snap-center rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.09),rgba(255,255,255,0.03))] px-6 py-6 shadow-[0_18px_40px_rgba(0,0,0,0.24)] backdrop-blur-md md:min-w-0">
              <div className="mb-4 h-1 w-16 rounded-full bg-[linear-gradient(90deg,#ef2d2d_0%,#ff9b45_100%)]" />
              <div className="text-[11px] font-black uppercase tracking-[0.22em] text-white/45">Brand Value</div>
              <div className="mt-3 text-5xl font-black text-white">Worldwide</div>
              <div className="mt-3 text-base leading-relaxed text-white/78 sm:text-lg">A polished presentation that makes local and global sponsors look at home.</div>
            </div>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-4">
            <div className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,#121418_0%,#0a0b0d_100%)] p-6 shadow-[0_24px_50px_rgba(0,0,0,0.3)] lg:col-span-2">
              <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#d6a327_0%,#ef2d2d_52%,#0f4aa6_100%)]" />
              <div className="rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.09),rgba(255,255,255,0.03))] p-5">
                <div className="text-xs font-black uppercase tracking-[0.18em] text-white/55">Kampanis Shoes and Bags Clinic</div>

                <div className="mt-4 overflow-hidden rounded-[20px] border border-dashed border-white/16 bg-[linear-gradient(135deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-2">
                  <div className="group/logo relative flex h-[176px] items-center justify-center overflow-hidden rounded-[18px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] px-5 text-center">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(214,163,39,0.18),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(15,74,166,0.18),transparent_40%)]" />
                    <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[16px] border border-white/30 bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
                      <div className="flex h-full w-full items-center justify-center p-4 sm:p-5">
                        <img
                          src="/advertiseres/kampanis.jpeg"
                          alt="Kampanis Shoes and Bags Clinic logo"
                          className="max-h-full max-w-full object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.28)]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex snap-x snap-mandatory gap-2 overflow-x-auto pb-1 text-[10px] font-bold uppercase tracking-[0.08em] text-white/70 sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0 sm:text-xs sm:tracking-[0.12em]">
                  <a
                    href="#"
                    className="inline-flex min-w-[120px] snap-start items-center justify-center gap-1 rounded-full border border-white/10 px-2 py-2.5 text-center transition-colors hover:border-white/20 hover:bg-white/6 sm:w-full sm:min-w-0 sm:gap-2 sm:px-3"
                  >
                    <Globe size={14} />
                    <span>Web</span>
                  </a>
                  <a
                    href="tel:+256000000000"
                    className="inline-flex min-w-[120px] snap-start items-center justify-center gap-1 rounded-full border border-white/10 px-2 py-2.5 text-center transition-colors hover:border-white/20 hover:bg-white/6 sm:w-full sm:min-w-0 sm:gap-2 sm:px-3"
                  >
                    <Phone size={14} />
                    <span>Call</span>
                  </a>
                  <a
                    href="https://wa.me/256000000000"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-w-[140px] snap-start items-center justify-center gap-1 rounded-full bg-[linear-gradient(90deg,#d6a327_0%,#efbf45_100%)] px-2 py-2.5 text-center text-black shadow-[0_14px_24px_rgba(214,163,39,0.22)] transition-transform hover:-translate-y-0.5 sm:w-full sm:min-w-0 sm:gap-2 sm:px-4"
                  >
                    <MessageCircle size={14} />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 text-center">
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(90deg,#d6a327_0%,#efbf45_100%)] px-4 py-2.5 text-xs font-black uppercase tracking-[0.12em] text-black shadow-[0_14px_24px_rgba(214,163,39,0.22)] transition-transform hover:-translate-y-0.5"
            >
              Advertise With Us
            </a>
          </div>
        </div>
      </section>

      {/* Promo Section */}
      <section className="section-font-fixed relative overflow-hidden bg-[#e5dccb] px-4 py-14 sm:px-6 sm:py-20">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-38"
          style={{ backgroundImage: "url('/slider/two.jpeg')" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(241,235,222,0.68)_0%,rgba(229,220,203,0.72)_100%)]" />
        <div className="absolute inset-0 opacity-70">
          <div className="absolute -left-8 top-8 h-44 w-44 rounded-full bg-[#0b2d64]/10 blur-3xl sm:h-56 sm:w-56" />
          <div className="absolute right-0 top-1/4 h-40 w-40 rounded-full bg-[#ef2d2d]/10 blur-3xl sm:h-52 sm:w-52" />
          <div className="absolute bottom-0 left-1/3 h-44 w-44 rounded-full bg-[#d6a327]/12 blur-3xl sm:h-60 sm:w-60" />
        </div>

        <div className="relative mx-auto max-w-[88rem]">
          <div className="mb-10 text-center sm:mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#0b2d64]/12 bg-white/70 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-[#0b2d64] shadow-[0_10px_20px_rgba(11,45,100,0.08)] backdrop-blur-sm">
              Official Kit Drop
            </div>
          </div>

          <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 md:grid md:max-w-[78rem] md:grid-cols-[0.98fr_1.22fr_0.98fr] md:items-stretch md:overflow-visible md:pb-0 lg:gap-8">
            <div className="group relative flex min-h-[500px] min-w-[72%] snap-center flex-col overflow-hidden rounded-[32px] border border-white/15 bg-[radial-gradient(circle_at_top,#2b2b32_0%,#0d0d10_72%)] p-3 shadow-[0_24px_60px_rgba(0,0,0,0.22)] sm:min-h-[540px] sm:min-w-0 sm:p-6">
              <div className="absolute left-4 top-4 z-20 rounded-full border border-white/12 bg-white/8 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white/80 backdrop-blur-md">
                Black Edition
              </div>
              <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(180deg,transparent_0%,rgba(11,45,100,0.22)_100%)]" />
              <div className="relative mt-4 flex flex-1 items-center justify-center sm:mt-12">
                <img
                  src="/shop/black.jpeg"
                  alt="Black Rugby In Uganda merchandise"
                  className="h-full max-h-[500px] w-full object-contain object-center transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div className="relative z-10 mt-5 flex items-end justify-between text-white">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/55">Supporter Jersey</div>
                  <div className="mt-2 text-2xl font-black uppercase tracking-[0.06em]">RIU Black</div>
                </div>
                <div className="rounded-full border border-white/12 bg-white/8 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-white/78">
                  New
                </div>
              </div>
            </div>

            <div className="relative flex min-h-[520px] min-w-[92%] snap-center flex-col overflow-hidden rounded-[34px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,250,244,0.95)_0%,rgba(243,236,224,0.92)_100%)] px-6 py-10 text-center shadow-[0_24px_60px_rgba(0,0,0,0.12)] sm:min-h-[680px] sm:min-w-0 sm:px-10 sm:py-12">
              <div className="absolute inset-x-0 top-0 h-1.5 bg-[linear-gradient(90deg,#0b2d64_0%,#ef2d2d_54%,#d6a327_100%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(11,45,100,0.08),transparent_48%)]" />
              <div className="absolute right-6 top-6 hidden h-24 w-24 rounded-full border border-[#0b2d64]/8 bg-white/40 md:block" />

              <div className="relative z-10 mb-6 flex items-center justify-center gap-3 text-[#111] sm:mb-8 sm:gap-4">
                <div className="text-4xl font-black tracking-tight text-[#0b2d64] sm:text-5xl">RIU</div>
                <div className="h-12 w-px bg-[#9b9b9b] sm:h-14" />
                <div className="text-base font-black uppercase tracking-[0.16em] text-[#1a1a1a] sm:text-lg">Rugby In Uganda</div>
              </div>

              <div className="relative z-10 mx-auto max-w-lg">
                <div className="text-xs font-black uppercase tracking-[0.28em] text-[#0b2d64]/56">Official Merchandise</div>
                <h2 className="mt-5 font-serif text-[2.45rem] leading-[0.95] font-black uppercase text-[#0b2d64] sm:text-[3.5rem]">
                  Matchday Style
                </h2>
                <p className="mt-5 text-base leading-relaxed text-[#11386f]/82 sm:text-lg">
                  Designed for supporters, club communities, and everyday wear with a look rooted in Rugby In Uganda.
                </p>
              </div>

              <div className="relative z-10 mt-8 grid grid-cols-3 gap-3 text-left sm:mt-10 sm:gap-4">
                <div className="rounded-2xl border border-[#0b2d64]/10 bg-white/70 px-4 py-4 shadow-[0_10px_20px_rgba(11,45,100,0.05)]">
                  <div className="text-[10px] font-black uppercase tracking-[0.18em] text-[#0b2d64]/52">Fit</div>
                  <div className="mt-2 text-base font-black uppercase text-[#0b2d64]">Sport</div>
                </div>
                <div className="rounded-2xl border border-[#0b2d64]/10 bg-white/70 px-4 py-4 shadow-[0_10px_20px_rgba(11,45,100,0.05)]">
                  <div className="text-[10px] font-black uppercase tracking-[0.18em] text-[#0b2d64]/52">Style</div>
                  <div className="mt-2 text-base font-black uppercase text-[#0b2d64]">Bold</div>
                </div>
                <div className="rounded-2xl border border-[#0b2d64]/10 bg-white/70 px-4 py-4 shadow-[0_10px_20px_rgba(11,45,100,0.05)]">
                  <div className="text-[10px] font-black uppercase tracking-[0.18em] text-[#0b2d64]/52">Drop</div>
                  <div className="mt-2 text-base font-black uppercase text-[#0b2d64]">2026</div>
                </div>
              </div>

              <div className="relative z-10 mt-8 flex flex-col items-center gap-3 sm:mt-10">
                <a
                  href="#"
                  className="inline-flex min-w-[260px] items-center justify-center rounded-full bg-[linear-gradient(90deg,#ef2d2d_0%,#ff4c3f_100%)] px-10 py-4 text-base font-black uppercase tracking-[0.16em] text-white shadow-[0_18px_34px_rgba(239,45,45,0.24)] transition-transform hover:-translate-y-0.5"
                >
                  I Support My Team
                </a>
                <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#0b2d64]/52">
                  Wear the badge. Back the game.
                </div>
              </div>
            </div>

            <div className="group relative flex min-h-[500px] min-w-[72%] snap-center flex-col overflow-hidden rounded-[32px] border border-white/15 bg-[radial-gradient(circle_at_top,#26272c_0%,#08080b_74%)] p-3 shadow-[0_24px_60px_rgba(0,0,0,0.22)] sm:min-h-[540px] sm:min-w-0 sm:p-6">
              <div className="absolute left-4 top-4 z-20 rounded-full border border-white/12 bg-white/8 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white/80 backdrop-blur-md">
                White Edition
              </div>
              <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(180deg,transparent_0%,rgba(239,45,45,0.2)_100%)]" />
              <div className="relative mt-4 flex flex-1 items-center justify-center sm:mt-12">
                <img
                  src="/shop/white.jpeg"
                  alt="White Rugby In Uganda merchandise"
                  className="h-full max-h-[500px] w-full object-contain object-center transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div className="relative z-10 mt-5 flex items-end justify-between text-white">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/55">Supporter Jersey</div>
                  <div className="mt-2 text-2xl font-black uppercase tracking-[0.06em]">RIU White</div>
                </div>
                <div className="rounded-full border border-white/12 bg-white/8 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-white/78">
                  Clean
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsor A Club Section */}
      <section className="relative overflow-hidden bg-[#080a0f] px-4 pt-16 pb-6 text-white sm:px-6 sm:pt-24 sm:pb-8">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-45"
          style={{ backgroundImage: "url('/slider/three.webp')" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,8,12,0.86),rgba(6,8,12,0.9))]" />
        <div className="absolute inset-0 opacity-80">
          <div className="absolute left-8 top-10 h-56 w-56 rounded-full bg-[#ef2d2d]/16 blur-3xl" />
          <div className="absolute bottom-8 right-12 h-64 w-64 rounded-full bg-[#d6a327]/12 blur-3xl" />
          <div className="absolute left-1/2 top-1/3 h-48 w-48 -translate-x-1/2 rounded-full bg-[#0b2d64]/20 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-10 overflow-hidden rounded-[34px] border border-white/10 bg-[linear-gradient(135deg,rgba(8,12,19,0.95),rgba(12,18,28,0.86))] shadow-[0_30px_80px_rgba(0,0,0,0.36)] backdrop-blur-2xl">
            <div className="absolute inset-x-0 top-0 h-1.5 bg-[linear-gradient(90deg,#0b2d64_0%,#ef2d2d_52%,#d6a327_100%)]" />
            <div className="relative flex justify-center px-6 py-8 text-center sm:px-8 sm:py-10">
              <div className="max-w-3xl">
                <div className="mb-5 inline-flex items-center rounded-full border border-[#d6a327]/30 bg-[#d6a327]/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.32em] text-[#f1cf75]">
                  Matchday Partnership
                </div>
                <h2 className="text-4xl font-black uppercase tracking-[0.04em] text-white sm:text-5xl lg:text-6xl">
                  Sponsor A Club
                </h2>
                <p className="mt-5 text-base leading-relaxed text-white/76 sm:text-lg">
                  Step into the heartbeat of Ugandan rugby with a sport-first brand placement built around players, fans, fixtures, and club culture.
                </p>
              </div>
            </div>
          </div>

          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
            {sponsorClubOptions.map((club) => (
              <button
                key={club.name}
                type="button"
                onClick={() => setSelectedSponsorClub(club.name)}
                className={`group relative flex min-h-[456px] min-w-[360px] snap-center flex-col justify-between overflow-hidden rounded-[18px] border text-left shadow-[0_20px_44px_rgba(0,0,0,0.24)] transition-all duration-300 hover:-translate-y-1 ${
                  selectedSponsorClub === club.name
                    ? 'border-[#ef2d2d]/85 ring-2 ring-[#ef2d2d]/55'
                    : 'border-white/10'
                }`}
              >
                <img
                  src={club.image}
                  alt={club.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,16,0.08)_0%,rgba(8,10,16,0.18)_40%,rgba(6,7,10,0.62)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 h-44 bg-[linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.42)_100%)]" />
                <div className="relative z-10 min-h-[72px]" />
                <div className="relative z-10 p-6">
                  <div className="flex items-center justify-between rounded-[10px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.24),rgba(255,255,255,0.16))] px-5 py-4 text-white backdrop-blur-sm">
                    <div className="text-[16px] font-black uppercase leading-tight tracking-[0.08em]">
                      {`SPONSOR ${club.name.replace(' RFC', '').toUpperCase()}`}
                    </div>
                    <span className="text-3xl leading-none">→</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-10 px-4 text-center">
            <a
              href="#"
              className="inline-flex w-full items-center justify-center rounded-full border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.05))] px-6 py-4 text-center text-sm font-black uppercase tracking-[0.18em] text-white backdrop-blur-xl transition-colors hover:bg-white/14 sm:w-auto sm:px-8"
            >
              Explore Club Sponsorship
            </a>
          </div>
        </div>
      </section>

      {/* Player Of The Month Section */}
      <section className="relative overflow-hidden bg-[#0b0e14] px-4 pt-6 pb-16 text-white sm:px-6 sm:pt-8 sm:pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(214,163,39,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(15,74,166,0.16),transparent_32%),linear-gradient(180deg,#090c12_0%,#0e1219_100%)]" />
        <div className="absolute left-[-6%] top-16 h-56 w-56 rounded-full bg-[#ef2d2d]/10 blur-3xl" />
        <div className="absolute right-[-4%] bottom-10 h-64 w-64 rounded-full bg-[#0f4aa6]/14 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-8 text-center sm:mb-10">
            <div className="inline-flex items-center rounded-full border border-[#d6a327]/25 bg-[#d6a327]/8 px-4 py-2 text-[11px] font-black uppercase tracking-[0.28em] text-[#f1cf75]">
              Monthly Spotlight
            </div>
            <h2 className="mt-5 text-4xl font-black uppercase tracking-[0.04em] text-white sm:text-5xl lg:text-6xl">
              Player Of The Month
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/72 sm:text-lg">
              Each club can spotlight its own standout performer. Here are this month&apos;s featured players across different teams.
            </p>
          </div>

          <div className="hidden gap-6 lg:grid lg:grid-cols-2 xl:grid-cols-4">
            {playerOfMonthTeams.map((item) => (
              <article
                key={item.team}
                className="overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.09),rgba(255,255,255,0.03))] shadow-[0_24px_60px_rgba(0,0,0,0.24)] backdrop-blur-xl"
              >
                <div className="relative h-[280px] overflow-hidden border-b border-white/10">
                  <img src={item.image} alt={item.player} className="h-full w-full object-cover object-top" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,16,0.05)_0%,rgba(8,10,16,0.15)_55%,rgba(6,7,10,0.45)_100%)]" />
                  <div className="absolute left-4 top-4 rounded-full border border-white/16 bg-black/18 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white/88 backdrop-blur-md">
                    {item.team}
                  </div>
                </div>
                <div className="p-5">
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#f1cf75]">{item.role}</div>
                  <h3 className="mt-2 text-[28px] font-black uppercase leading-[0.96] tracking-[0.03em] text-white">
                    {item.player}
                  </h3>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="rounded-[16px] border border-white/10 bg-black/18 px-4 py-3">
                      <div className="text-[9px] font-black uppercase tracking-[0.16em] text-white/42">Points</div>
                      <div className="mt-1 text-xl font-black text-white">{item.points}</div>
                    </div>
                    <div className="min-w-0 flex-1 rounded-[16px] border border-white/10 bg-black/18 px-4 py-3">
                      <div className="text-[9px] font-black uppercase tracking-[0.16em] text-white/42">Highlight</div>
                      <div className="mt-1 text-sm font-black uppercase tracking-[0.04em] text-white">{item.highlight}</div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 -mx-4 overflow-x-auto px-4 pb-2 lg:hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex snap-x snap-mandatory gap-4">
            {playerOfMonthTeams.map((item) => (
              <article
                key={`mobile-${item.team}`}
                className="w-[252px] shrink-0 snap-center overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.09),rgba(255,255,255,0.03))] shadow-[0_24px_60px_rgba(0,0,0,0.24)] backdrop-blur-xl"
              >
                <div className="relative h-[280px] overflow-hidden border-b border-white/10">
                  <img src={item.image} alt={item.player} className="h-full w-full object-cover object-top" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,16,0.05)_0%,rgba(8,10,16,0.15)_55%,rgba(6,7,10,0.45)_100%)]" />
                  <div className="absolute left-4 top-4 rounded-full border border-white/16 bg-black/18 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white/88 backdrop-blur-md">
                    {item.team}
                  </div>
                </div>
                <div className="p-5">
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#f1cf75]">{item.role}</div>
                  <h3 className="mt-2 text-[28px] font-black uppercase leading-[0.96] tracking-[0.03em] text-white">
                    {item.player}
                  </h3>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="rounded-[16px] border border-white/10 bg-black/18 px-4 py-3">
                      <div className="text-[9px] font-black uppercase tracking-[0.16em] text-white/42">Points</div>
                      <div className="mt-1 text-xl font-black text-white">{item.points}</div>
                    </div>
                    <div className="min-w-0 flex-1 rounded-[16px] border border-white/10 bg-black/18 px-4 py-3">
                      <div className="text-[9px] font-black uppercase tracking-[0.16em] text-white/42">Highlight</div>
                      <div className="mt-1 text-sm font-black uppercase tracking-[0.04em] text-white">{item.highlight}</div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
            </div>
          </div>

          <div className="hidden">
            <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] shadow-[0_24px_60px_rgba(0,0,0,0.28)]">
              <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#0b2d64_0%,#ef2d2d_55%,#d6a327_100%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_42%)]" />
              <div className="relative px-5 py-5 sm:px-6 sm:py-6">
                <div className="flex items-center justify-between gap-3">
                  <div className="rounded-full border border-white/12 bg-white/8 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white/82 backdrop-blur-md">
                    April 2026
                  </div>
                  <div className="rounded-full bg-[#ef2d2d] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white">
                    Selected
                  </div>
                </div>

                <div className="mt-5 overflow-hidden rounded-[24px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]">
                  <img
                    src="/player.png"
                    alt="Player of the month"
                    className="h-[360px] w-full object-cover object-top sm:h-[460px]"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] px-5 py-6 shadow-[0_24px_60px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:px-7 sm:py-8">
              <div>
                <div className="text-[11px] font-black uppercase tracking-[0.24em] text-[#f1cf75]">Backline Leader</div>
                <h3 className="mt-3 text-4xl font-black uppercase tracking-[0.04em] text-white sm:text-5xl">
                  Ivan Magomu
                </h3>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/74 sm:text-lg">
                  A composed playmaker with a huge boot, relentless match tempo, and the ability to turn pressure into points. This month’s performances stood out for leadership, precision, and consistency.
                </p>

                <div className="mt-7 grid grid-cols-3 gap-3">
                  <div className="rounded-[20px] border border-white/10 bg-black/16 px-4 py-4 text-center">
                    <div className="text-[10px] font-black uppercase tracking-[0.18em] text-white/42">Points</div>
                    <div className="mt-2 text-2xl font-black text-white">42</div>
                  </div>
                  <div className="rounded-[20px] border border-white/10 bg-black/16 px-4 py-4 text-center">
                    <div className="text-[10px] font-black uppercase tracking-[0.18em] text-white/42">Tries</div>
                    <div className="mt-2 text-2xl font-black text-white">4</div>
                  </div>
                  <div className="rounded-[20px] border border-white/10 bg-black/16 px-4 py-4 text-center">
                    <div className="text-[10px] font-black uppercase tracking-[0.18em] text-white/42">MOTM</div>
                    <div className="mt-2 text-2xl font-black text-white">2</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#"
                  className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(90deg,#ef2d2d_0%,#ff4a3f_100%)] px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-white shadow-[0_18px_40px_rgba(239,45,45,0.28)] transition-transform hover:-translate-y-0.5"
                >
                  View Full Story
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/6 px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-white backdrop-blur-xl transition-colors hover:bg-white/12"
                >
                  More Player Awards
                </a>
              </div>
            </div>
          </div>

          <div className="hidden">
            <div className="overflow-hidden rounded-[22px] border border-white/10">
              <img
                src="/player.png"
                alt="Player of the month"
                className="h-[280px] w-full object-cover object-top"
              />
            </div>
            <div className="mt-4 text-[10px] font-black uppercase tracking-[0.22em] text-[#f1cf75]">Player Of The Month</div>
            <h3 className="mt-2 text-3xl font-black uppercase tracking-[0.04em] text-white">Ivan Magomu</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/74">
              A composed playmaker whose game control, kicking accuracy, and leadership stood out all month.
            </p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="rounded-[16px] border border-white/10 bg-black/16 px-3 py-3 text-center">
                <div className="text-[9px] font-black uppercase tracking-[0.16em] text-white/42">Points</div>
                <div className="mt-1 text-lg font-black text-white">42</div>
              </div>
              <div className="rounded-[16px] border border-white/10 bg-black/16 px-3 py-3 text-center">
                <div className="text-[9px] font-black uppercase tracking-[0.16em] text-white/42">Tries</div>
                <div className="mt-1 text-lg font-black text-white">4</div>
              </div>
              <div className="rounded-[16px] border border-white/10 bg-black/16 px-3 py-3 text-center">
                <div className="text-[9px] font-black uppercase tracking-[0.16em] text-white/42">MOTM</div>
                <div className="mt-1 text-lg font-black text-white">2</div>
              </div>
            </div>
            <a
              href="#"
              className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[linear-gradient(90deg,#ef2d2d_0%,#ff4a3f_100%)] px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-white shadow-[0_18px_40px_rgba(239,45,45,0.28)] transition-transform hover:-translate-y-0.5"
            >
              View Full Story
            </a>
          </div>
        </div>
      </section>

      {/* Rugby Sponsors Marquee */}
      <section className="overflow-hidden border-t border-b border-white/10 bg-[#0a0c10] py-8 text-white sm:py-10">
        <div className="sponsor-marquee">
          <div className="sponsor-marquee__track">
            {[0, 1].map((group) => (
              <div key={group} className="sponsor-marquee__group">
                {rugbySponsorLogos.map((logo) => (
                  <div
                    key={`${group}-${logo}`}
                    className="flex h-[96px] min-w-[210px] items-center justify-center rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.11),rgba(255,255,255,0.04))] px-8 text-center shadow-[0_12px_28px_rgba(0,0,0,0.22)] backdrop-blur-xl"
                  >
                    <span className="text-sm font-black uppercase tracking-[0.14em] text-white sm:text-base">
                      {logo}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#121212] text-white">
        <div className="grid grid-cols-1 border-b border-white/10 lg:grid-cols-[1.15fr_1fr_1fr_1fr_1fr]">
          <div className="flex flex-col items-center justify-start border-b border-white/10 px-8 py-10 text-center md:border-b-0 md:border-r">
            <img src="/logo-cutout.png" alt="Rugby in Uganda" className="-mt-3 h-[270px] w-auto object-contain" />
            <div className="mx-auto -mt-2 max-w-sm space-y-2 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/55">Rugby In Uganda</p>
              <p className="text-base leading-relaxed text-white/80">
                Home of regional rugby, schools rugby, national team updates, fixtures, standings, and partner opportunities.
              </p>
            </div>
          </div>

          <div className="border-b border-white/10 px-8 py-10 md:border-b-0 md:border-r">
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-white/55">Explore</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-7 text-lg md:block md:space-y-7">
              <li><a href="#" className="transition-colors hover:text-[#d6a327]">Latest</a></li>
              <li><a href="#" className="transition-colors hover:text-[#d6a327]">Teams</a></li>
              <li><a href="#" className="transition-colors hover:text-[#d6a327]">Age Grade</a></li>
              <li><a href="#" className="transition-colors hover:text-[#d6a327]">Tournaments</a></li>
              <li><a href="#" className="transition-colors hover:text-[#d6a327]">RIU</a></li>
              <li><a href="#" className="transition-colors hover:text-[#d6a327]">Fixture & Results</a></li>
            </ul>
          </div>

          <div className="border-b border-white/10 px-8 py-10 md:border-b-0 md:border-r">
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-white/55">Regions</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-7 text-lg md:block md:space-y-7">
              <li><a href="#" className="transition-colors hover:text-[#d6a327]">Central</a></li>
              <li><a href="#" className="transition-colors hover:text-[#d6a327]">Northern</a></li>
              <li><a href="#" className="transition-colors hover:text-[#d6a327]">Eastern</a></li>
              <li><a href="#" className="transition-colors hover:text-[#d6a327]">Western</a></li>
              <li><a href="#" className="transition-colors hover:text-[#d6a327]">Schools</a></li>
              <li><a href="#" className="transition-colors hover:text-[#d6a327]">National Team</a></li>
            </ul>
          </div>

          <div className="border-b border-white/10 px-8 py-10 md:border-b-0 md:border-r">
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-white/55">Services</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-7 text-lg md:block md:space-y-7">
              <li><a href="#" className="transition-colors hover:text-[#d6a327]">Shop</a></li>
              <li><a href="#" className="transition-colors hover:text-[#d6a327]">Events</a></li>
              <li><a href="#" className="transition-colors hover:text-[#d6a327]">Table Standings</a></li>
              <li><a href="#" className="transition-colors hover:text-[#d6a327]">News</a></li>
              <li><a href="#" className="transition-colors hover:text-[#d6a327]">Calendar</a></li>
              <li><a href="#" className="transition-colors hover:text-[#d6a327]">Partner With Us</a></li>
            </ul>
          </div>

          <div className="border-b border-white/10 px-8 py-10 md:border-b-0 md:border-r">
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">Connect</p>
              <div className="flex items-center gap-4">
                <a href="#" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/50 transition-colors hover:border-[#d6a327] hover:text-[#d6a327]">
                  <Facebook size={16} />
                </a>
                <a href="#" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/50 transition-colors hover:border-[#d6a327] hover:text-[#d6a327]">
                  <Send size={16} />
                </a>
                <a href="#" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/50 transition-colors hover:border-[#d6a327] hover:text-[#d6a327]">
                  <Info size={16} />
                </a>
              </div>
              <a href="#" className="inline-flex border border-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] transition-colors hover:bg-white hover:text-black">
                Subscribe
              </a>
            </div>
          </div>

        </div>

        <div className="flex flex-col gap-6 px-6 py-6 text-sm text-white/80 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Rugby in Uganda. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <a href="#" className="transition-colors hover:text-[#d6a327]">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="transition-colors hover:text-[#d6a327]">Terms of Use</a>
            <span>|</span>
            <a href="#" className="transition-colors hover:text-[#d6a327]">Cookie Policy</a>
          </div>
        </div>
      </footer>

      <a
        href="https://wa.me/256773207919"
        aria-label="Chat with Rugby in Uganda on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_rgba(37,211,102,0.35)] transition-transform hover:scale-105"
      >
        <MessageCircle size={26} />
      </a>
    </div>
  );
}
