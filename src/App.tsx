import React, { useEffect, useState } from 'react';
import { ChevronDown, Calendar, Menu, CloudSun, Facebook, Info, Send, MessageCircle, Instagram } from 'lucide-react';

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileRegion, setOpenMobileRegion] = useState<string | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [countdown, setCountdown] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });
  const [pollVotes, setPollVotes] = useState({ win: 0, draw: 0, loss: 0 });
  const [isMatchPollOpen, setIsMatchPollOpen] = useState(false);
  const [selectedVote, setSelectedVote] = useState<'win' | 'draw' | 'loss' | null>(null);
  const [selectedSponsorClub, setSelectedSponsorClub] = useState('Eagles RFC');
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
    { name: 'Eagles RFC', mark: 'ER' },
    { name: 'Kobs RFC', mark: 'KR' },
    { name: 'Pirates RFC', mark: 'PR' },
    { name: 'Hippos RFC', mark: 'HR' },
    { name: 'Walukuba', mark: 'WR' },
  ];

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

  const totalVotes = pollVotes.win + pollVotes.draw + pollVotes.loss;

  const handleVote = (option: 'win' | 'draw' | 'loss') => {
    if (selectedVote === option) {
      return;
    }

    setPollVotes((current) => {
      const nextVotes = { ...current };

      if (selectedVote) {
        nextVotes[selectedVote] = Math.max(0, nextVotes[selectedVote] - 1);
      }

      nextVotes[option] = nextVotes[option] + 1;
      return nextVotes;
    });

    setSelectedVote(option);
  };

  const voteOptions = [
    {
      key: 'win' as const,
      label: 'Win',
      count: pollVotes.win,
    },
    {
      key: 'draw' as const,
      label: 'Draw',
      count: pollVotes.draw,
    },
    {
      key: 'loss' as const,
      label: 'Loss',
      count: pollVotes.loss,
    },
  ];

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
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Top Bar */}
      <div className="relative z-30 isolate border-t-4 border-b-4 border-[#0f4aa6] bg-black px-2 py-1.5 text-white sm:px-3">
        <div className="flex w-full items-center gap-2 rounded-full border border-white/10 bg-[#0f1012] px-2 py-1 shadow-[inset_0_0_0_9999px_#0f1012]">
          <div className="hidden shrink-0 items-center gap-2 rounded-full border border-white/10 bg-[#17191c] px-3 py-1 shadow-[inset_0_0_0_9999px_#17191c] md:flex">
            <CloudSun size={16} />
            <div className="flex flex-col leading-none">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/75">Kampala Weather</span>
              <span className="text-sm font-semibold text-white">Overcast 29C / 19C</span>
            </div>
          </div>
          <div className="ticker-shell flex-1 overflow-hidden rounded-full bg-[#0f1012] shadow-[inset_0_0_0_9999px_#0f1012]">
            <div className="ticker-track py-1">
              {[0, 1, 2].map((group) => (
                <div key={group} className="ticker-group">
                  {tickerItems.map((item, index) => (
                    <span key={`${group}-${index}-${item}`} className="whitespace-nowrap rounded-full border border-white/10 bg-[#22252a] px-3.5 py-1.5 text-[11.5px] font-semibold text-white/90">
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
      <header className="relative z-30 isolate border-b border-white/10 bg-black py-4 px-4 text-white shadow-[inset_0_0_0_9999px_#000] sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 bg-black md:flex-row md:items-center md:justify-between">
          <div className="flex items-center justify-between gap-3 bg-black">
            <img src="/logo-cutout.png" alt="Rugby in Uganda" className="h-20 w-auto object-contain sm:h-24 lg:h-28" />
            <div className="flex flex-col items-end gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                Our Partners
              </span>
              <div className="flex flex-wrap items-center justify-end gap-2">
                <div className="flex h-10 min-w-[74px] items-center justify-center rounded-md border border-white/10 bg-[#0f4aa6] px-3 text-sm font-black italic text-white shadow-sm">
                  macron
                </div>
                <div className="flex h-10 min-w-[74px] items-center justify-center rounded-md border border-white/10 bg-[#0f4aa6] px-3 text-xs font-bold text-white shadow-sm">
                  HSBC
                </div>
                <div className="flex h-10 min-w-[74px] items-center justify-center rounded-md border border-white/10 bg-[#0f4aa6] px-3 text-xs font-bold tracking-wide text-white shadow-sm">
                  NILE
                </div>
              </div>
            </div>
          </div>
          <nav className="hidden md:flex md:justify-end">
            <div className="flex items-center gap-8 px-2 py-2 text-sm font-semibold text-white">
              <a href="#" className="flex items-center gap-2 transition-colors hover:text-gray-300">
                <span>Latest</span>
                <ChevronDown size={14} />
              </a>
              <a href="#" className="flex items-center gap-2 transition-colors hover:text-gray-300">
                <span>Teams</span>
                <ChevronDown size={14} />
              </a>
              <a href="#" className="transition-colors hover:text-gray-300">Age Grade</a>
              <a href="#" className="flex items-center gap-2 transition-colors hover:text-gray-300">
                <span>Tournaments</span>
                <ChevronDown size={14} />
              </a>
              <a href="#" className="flex items-center gap-2 transition-colors hover:text-gray-300">
                <span>RIU</span>
                <ChevronDown size={14} />
              </a>
              <a href="#" className="flex items-center gap-2 transition-colors hover:text-gray-300">
                <span>Fixture & Results</span>
                <ChevronDown size={14} />
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[1100px] bg-gray-900 md:min-h-[520px] md:h-[600px]">
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
        <div className="absolute inset-0 bg-black/20 md:bg-transparent"></div>

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
              <div key={item.title} className="border border-white/50 bg-transparent">
                {(() => {
                  const regionPanel = getRegionPanel(item.title);

                  return (
                    <>
                <button
                  type="button"
                  onClick={() => setOpenMobileRegion((value) => (value === item.title ? null : item.title))}
                  className="flex w-full items-center justify-between px-4 py-4 text-left"
                >
                  <div>
                    <div className="text-lg font-semibold text-white">{item.title}</div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/70">{item.subtitle}</div>
                  </div>
                  <ChevronDown
                    size={18}
                    className={openMobileRegion === item.title ? 'rotate-180 text-white transition-transform' : 'text-white transition-transform'}
                  />
                </button>
                {openMobileRegion === item.title ? (
                  <div className="border-t border-white/20 bg-black/70">
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
        <div className="absolute top-0 left-0 hidden w-full border-b border-white/10 bg-black/30 backdrop-blur-sm md:block">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-6 divide-x divide-white/20 text-center text-white">
              {desktopRegionPanels.map((item) => (
                <div key={item.title} className="group relative cursor-pointer py-4 transition-colors hover:bg-white/10">
                  <div className="mb-1 text-xs font-bold tracking-widest">{item.title.toUpperCase()}</div>
                  <div className="text-[10px] tracking-wider text-gray-300">{item.subtitle.toUpperCase()}</div>
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
        <div className="absolute right-0 bottom-0 left-0 w-full bg-[#3a4740]/90 py-6 backdrop-blur-md">
          <div className="container mx-auto flex justify-center px-4">
            <div className="flex w-full items-center gap-3 overflow-x-auto whitespace-nowrap pb-1 md:w-auto md:flex-wrap md:justify-center md:overflow-visible md:whitespace-normal">
              <div className="relative w-[210px] shrink-0 md:w-auto">
                <select defaultValue="" className="w-full appearance-none border border-white/60 bg-transparent px-4 py-3 text-lg uppercase text-white focus:border-white focus:outline-none md:py-2 md:text-sm lg:w-48">
                  <option value="" disabled hidden className="text-black">SHOP</option>
                  <option className="text-black">RIU</option>
                  <option className="text-black">CLUBS</option>
                </select>
                <ChevronDown size={18} className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 transform text-white/90 md:size-[14px]" />
              </div>
              <div className="relative w-[210px] shrink-0 md:w-auto">
                <select defaultValue="" className="w-full appearance-none border border-white/60 bg-transparent px-4 py-3 text-lg uppercase text-white focus:border-white focus:outline-none md:py-2 md:text-sm lg:w-48">
                  <option value="" disabled hidden className="text-black">EVENTS</option>
                  <option className="text-black">ON GOING</option>
                  <option className="text-black">UP COMING</option>
                </select>
                <ChevronDown size={18} className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 transform text-white/90 md:size-[14px]" />
              </div>
              <div className="relative w-[210px] shrink-0 md:w-auto">
                <select defaultValue="" className="w-full appearance-none border border-white/60 bg-transparent px-4 py-3 text-lg uppercase text-white focus:border-white focus:outline-none md:py-2 md:text-sm lg:w-40">
                  <option value="" disabled hidden className="text-black">TABLE STANDINGS</option>
                  <option className="text-black">PREMIERSHIP</option>
                  <option className="text-black">EASTERN</option>
                  <option className="text-black">NORTHERN</option>
                  <option className="text-black">WESTERN</option>
                  <option className="text-black">CENTRAL</option>
                </select>
                <ChevronDown size={18} className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 transform text-white/90 md:size-[14px]" />
              </div>
              <div className="relative w-[210px] shrink-0 md:w-auto">
                <select defaultValue="" className="w-full appearance-none border border-white/60 bg-transparent px-4 py-3 text-lg uppercase text-white focus:border-white focus:outline-none md:py-2 md:text-sm lg:w-40">
                  <option value="" disabled hidden className="text-black">NEWS</option>
                  <option className="text-black">ALL NEWS</option>
                  <option className="text-black">LATEST NEWS</option>
                </select>
                <ChevronDown size={18} className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 transform text-white/90 md:size-[14px]" />
              </div>
              <div className="relative w-[210px] shrink-0 md:w-auto">
                <input type="text" placeholder="CALENDAR" className="w-full border border-white/60 bg-transparent px-4 py-3 text-lg uppercase text-white placeholder-white/90 focus:border-white focus:outline-none md:py-2 md:text-sm lg:w-40" />
                <Calendar size={18} className="absolute top-1/2 right-4 -translate-y-1/2 transform text-white/90 md:size-[14px]" />
              </div>
              <button className="w-[210px] shrink-0 whitespace-nowrap bg-[#d93838] px-6 py-3 text-lg font-bold text-white transition-colors hover:bg-red-700 md:w-auto md:px-8 md:py-2.5 md:text-sm">
                Partner With Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={`relative overflow-hidden py-20 sm:py-28 ${isMatchPollOpen ? 'pb-40 sm:pb-28' : ''}`}>
        <div className="absolute inset-0">
          <img
            src="/slider/two.jpeg"
            alt="Rugby background"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-4" style={{ perspective: '1800px' }}>
          <div
            className={`relative transition-transform duration-700 ${
              isMatchPollOpen
                ? 'min-h-[1320px] sm:min-h-[900px] lg:min-h-[920px]'
                : 'min-h-[860px] sm:min-h-[640px] lg:min-h-[660px]'
            }`}
            style={{ transformStyle: 'preserve-3d', transform: isMatchPollOpen ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
          >
            <div
              className={isMatchPollOpen ? 'pointer-events-none absolute inset-0' : 'pointer-events-auto absolute inset-0'}
              style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
            >
              <div className="bg-[rgba(255,255,255,0.9)] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.18)] sm:p-8">
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
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <div className="inline-flex rounded-md bg-[#f4a71d] px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-black">
                        Match of the Day
                      </div>
                      <p className="text-xs font-semibold text-white/70 sm:text-sm">Nile Special Rugby</p>
                    </div>

                    <div className="mb-6 flex flex-col gap-5 text-white lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex-1 pt-3 text-center lg:pt-8 lg:text-left">
                        <h2
                          className="text-3xl font-black uppercase sm:text-4xl"
                          style={{ color: '#ffffff', textShadow: '0 2px 12px rgba(0,0,0,0.65)' }}
                        >
                          Life Guard Rams
                        </h2>
                      </div>

                      <div className="text-center">
                        <div className="text-4xl font-black uppercase text-[#f4a71d] sm:text-5xl">VS</div>
                        <p className="mt-2 text-sm font-semibold text-white/80">Sun 05/04</p>
                        <p className="text-lg font-black uppercase text-[#f4a71d]">4:00PM</p>
                        <p className="mt-4 text-sm font-bold uppercase tracking-[0.22em] text-white/65">Kitante</p>
                      </div>

                      <div className="flex-1 pt-3 text-center lg:pt-8 lg:text-right">
                        <h2
                          className="text-3xl font-black uppercase sm:text-4xl"
                          style={{ color: '#ffffff', textShadow: '0 2px 12px rgba(0,0,0,0.65)' }}
                        >
                          Eagles
                        </h2>
                      </div>
                    </div>

                    <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
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

                    <button
                      type="button"
                      onClick={() => setIsMatchPollOpen(true)}
                      className="inline-flex w-full items-center justify-center rounded-xl bg-[#f4a71d] px-6 py-4 text-sm font-black uppercase tracking-[0.14em] text-black transition-colors hover:bg-[#ffb938]"
                    >
                      Match Poll
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={isMatchPollOpen ? 'pointer-events-auto absolute inset-0' : 'pointer-events-none absolute inset-0'}
              style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <div className="bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(247,242,230,0.92))] p-4 shadow-[0_24px_60px_rgba(0,0,0,0.18)] sm:p-8">
                <div className="overflow-hidden rounded-[28px] border border-[#161616] bg-[linear-gradient(180deg,#f7f1e6_0%,#efe7d8_100%)] text-black shadow-[0_24px_50px_rgba(0,0,0,0.28)]">
                  <div className="border-b border-black/10 bg-[linear-gradient(90deg,rgba(255,255,255,0.55),rgba(255,255,255,0.18))] px-5 py-5 sm:px-7">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <div className="text-[11px] font-black uppercase tracking-[0.34em] text-black/55">Interactive Vote</div>
                        <h2 className="mt-2 text-xl font-black uppercase tracking-[0.28em] sm:text-2xl">Match Poll</h2>
                        <p className="mt-2 max-w-xl text-sm text-black/62 sm:text-base">
                          Cast your pick for the result and watch the live percentages update instantly.
                        </p>
                    </div>
                      <div className="grid grid-cols-2 gap-3 sm:min-w-[260px]">
                        <div className="rounded-2xl border border-black/10 bg-white/55 px-4 py-3 text-center">
                          <div className="text-[10px] font-black uppercase tracking-[0.22em] text-black/48">Total Votes</div>
                          <div className="mt-2 text-2xl font-black">{totalVotes}</div>
                        </div>
                        <div className="rounded-2xl border border-black/10 bg-white/55 px-4 py-3 text-center">
                          <div className="text-[10px] font-black uppercase tracking-[0.22em] text-black/48">Active Polls</div>
                          <div className="mt-2 text-2xl font-black">1</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 sm:p-7">
                    <div className="mb-6 rounded-[24px] border border-black/12 bg-[linear-gradient(135deg,#f4a71d_0%,#ffbf43_100%)] px-6 py-6 text-center shadow-[inset_0_-3px_0_rgba(0,0,0,0.12),0_16px_24px_rgba(244,167,29,0.22)]">
                      <div className="text-[11px] font-black uppercase tracking-[0.28em] text-black/65">Match Date</div>
                      <div className="mt-2 text-3xl font-black uppercase sm:text-4xl">Sun 05/04</div>
                    </div>

                    <div className="mb-5 flex flex-col gap-3 border-b border-black/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <div className="text-[11px] font-black uppercase tracking-[0.24em] text-black/45">Prediction Prompt</div>
                        <p className="mt-2 text-2xl font-black uppercase sm:text-3xl">Life Guard Rams To Win</p>
                      </div>
                      <div className="rounded-full border border-black/10 bg-white/55 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-black/65">
                        Live Community Pick
                      </div>
                    </div>

                    <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                      {voteOptions.map((option) => (
                        <button
                          key={option.key}
                          type="button"
                          onClick={() => handleVote(option.key)}
                          className={`rounded-2xl border px-6 py-4 text-base font-black uppercase tracking-[0.08em] transition-all duration-200 ${
                            selectedVote === option.key
                              ? option.key === 'win'
                                ? 'border-black bg-black text-white shadow-[0_12px_24px_rgba(0,0,0,0.18)]'
                                : option.key === 'draw'
                                  ? 'border-[#b87800] bg-[linear-gradient(135deg,#f4a71d_0%,#ffbf43_100%)] text-black shadow-[0_12px_24px_rgba(244,167,29,0.24)]'
                                  : 'border-black bg-white text-black shadow-[0_12px_24px_rgba(0,0,0,0.12)]'
                              : option.key === 'draw'
                                ? 'border-[#c78b14] bg-[#f8d07f]/65 text-black hover:-translate-y-0.5 hover:bg-[#f4a71d]'
                                : option.key === 'win'
                                  ? 'border-black/80 bg-[#111] text-white hover:-translate-y-0.5'
                                  : 'border-black/20 bg-white/75 text-black hover:-translate-y-0.5 hover:bg-white'
                          }`}
                        >
                          <div>{option.label}</div>
                          <div className={`mt-1 text-[11px] font-bold uppercase tracking-[0.18em] ${
                            selectedVote === option.key ? 'opacity-80' : 'opacity-55'
                          }`}>
                            {selectedVote === option.key ? 'Selected' : 'Tap To Vote'}
                          </div>
                        </button>
                      ))}
                    </div>

                    <p className="mb-5 rounded-2xl border border-black/8 bg-white/45 px-4 py-3 text-sm font-bold uppercase tracking-[0.16em] text-black/62">
                      {selectedVote ? 'Your vote is active. Tap another option to change it.' : 'Tap one option to cast your vote.'}
                    </p>

                    <div className="space-y-4">
                      {voteOptions.map((option) => {
                        const percentage = totalVotes === 0 ? 0 : Math.round((option.count / totalVotes) * 100);
                        const barClass =
                          option.key === 'win'
                            ? 'bg-[#111]'
                            : option.key === 'draw'
                              ? 'bg-[linear-gradient(90deg,#f4a71d_0%,#ffbf43_100%)]'
                              : 'bg-white';

                        return (
                          <div key={`result-${option.key}`} className="rounded-[22px] border border-black/10 bg-white/45 px-4 py-4 sm:px-5">
                            <div className="mb-3 flex items-center justify-between gap-3">
                              <span className="text-lg font-black uppercase">{option.label}</span>
                              <span className="text-base font-black">{percentage}% | {option.count}</span>
                            </div>
                            <div className="h-4 overflow-hidden rounded-full border border-black/12 bg-white/80">
                              <div
                                className={`h-full transition-all duration-300 ${barClass}`}
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsMatchPollOpen(false)}
                      className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-[#111] px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#222]"
                    >
                      Back To Match
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="relative overflow-hidden bg-[#050505] py-16 sm:py-24">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#d6a327]/18 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full bg-[#0f4aa6]/16 blur-3xl" />
        </div>

        <div className="relative mb-16 px-4 text-center">
          <p className="mb-3 font-serif text-lg italic text-[#c5b998]">Grow Your Brand With Rugby In Uganda</p>
          <h2 className="mb-6 font-serif text-3xl tracking-wide sm:text-4xl" style={{ color: '#ffffff' }}>
            ADVERTISE YOUR BUSINESS WITH US
          </h2>
          <div className="mx-auto h-[2px] w-12 bg-[#d6a327]"></div>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-gray-300 sm:text-lg">
            Reach over 50,000 views every month through Rugby in Uganda across fixtures, results, polls, news, and partner features.
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-[#d6caa5] sm:text-base">
            Advertising fees help us keep kids in school and continue supporting rugby pathways in our communities.
          </p>
          <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-3 text-left sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-sm">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Monthly Reach</div>
              <div className="mt-2 text-3xl font-black text-white">50K+</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-sm">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Audience</div>
              <div className="mt-2 text-3xl font-black text-white">Fans, Clubs</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-sm">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Placement</div>
              <div className="mt-2 text-3xl font-black text-white">Worldwide</div>
            </div>
          </div>
        </div>

        <div className="container relative mx-auto flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-3 md:grid md:grid-cols-2 md:gap-8 md:overflow-visible md:pb-0 lg:grid-cols-4">
          <div className="group flex aspect-square min-w-[280px] snap-center flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#111315] text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)] md:min-w-0">
            <div className="mb-6 h-44 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800" alt="Website banners" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div className="flex flex-1 flex-col px-6 pb-6">
              <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d6a327]">Premium Placement</div>
              <h3 className="mb-4 font-serif text-xl leading-snug text-white">Website Banners<br />That Get Seen</h3>
              <p className="text-sm leading-relaxed text-gray-400">
              Put your brand in front of rugby fans on our homepage, match pages, and high-traffic sections.
              </p>
            </div>
          </div>

          <div className="group flex aspect-square min-w-[280px] snap-center flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#111315] text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)] md:min-w-0">
            <div className="mb-6 h-44 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&q=80&w=800" alt="Sponsored campaigns" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div className="flex flex-1 flex-col px-6 pb-6">
              <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d6a327]">Brand Storytelling</div>
              <h3 className="mb-4 font-serif text-xl leading-snug text-white">Sponsored Features<br />And Campaigns</h3>
              <p className="text-sm leading-relaxed text-gray-400">
              Launch partner stories, campaign highlights, and branded content that speaks to the rugby community.
              </p>
            </div>
          </div>

          <div className="group flex aspect-square min-w-[280px] snap-center flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#111315] text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)] md:min-w-0">
            <div className="mb-6 h-44 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=800" alt="Matchday visibility" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div className="flex flex-1 flex-col px-6 pb-6">
              <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d6a327]">Matchday Exposure</div>
              <h3 className="mb-4 font-serif text-xl leading-snug text-white">Matchday Visibility<br />For Your Brand</h3>
              <p className="text-sm leading-relaxed text-gray-400">
              Get placement around fixtures, live-style score sections, polls, and top match content.
              </p>
            </div>
          </div>

          <div className="group flex aspect-square min-w-[280px] snap-center flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#111315] text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)] md:min-w-0">
            <div className="mb-6 h-44 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=800" alt="Partner growth" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div className="flex flex-1 flex-col px-6 pb-6">
              <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d6a327]">Business Growth</div>
              <h3 className="mb-4 font-serif text-xl leading-snug text-white">Partner With Us<br />And Scale Reach</h3>
              <p className="text-sm leading-relaxed text-gray-400">
              We can help position your business in front of players, fans, clubs, schools, and sponsors.
              </p>
            </div>
          </div>
        </div>

        <div className="relative mt-10 px-4 text-center">
          <a
            href="#"
            className="inline-flex items-center justify-center rounded-full border border-[#d6a327]/60 bg-[#d6a327] px-8 py-4 text-sm font-black uppercase tracking-[0.22em] text-black transition-colors hover:bg-[#e3b84b]"
          >
            Advertise With Us
          </a>
        </div>
      </section>

      {/* Promo Section */}
      <section className="relative overflow-hidden bg-[#ece7dc] px-4 py-14 sm:px-6 sm:py-20">
        <div className="absolute inset-0 opacity-60">
          <div className="absolute -top-16 left-8 h-48 w-48 rounded-full bg-[#0b2d64]/10 blur-3xl" />
          <div className="absolute right-10 bottom-0 h-56 w-56 rounded-full bg-[#ef2d2d]/10 blur-3xl" />
        </div>

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-[1fr_1.05fr_1fr]">
          <div className="group relative aspect-[4/5] overflow-hidden rounded-[10px] bg-white shadow-[0_16px_40px_rgba(0,0,0,0.08)] lg:min-h-[520px]">
            <img
              src="/slider/two.jpeg"
              alt="Rugby players together"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b2d64]/25 via-transparent to-transparent" />
          </div>

          <div className="relative flex min-h-[620px] flex-col items-center justify-center overflow-hidden rounded-[10px] border border-white/60 bg-[linear-gradient(180deg,#f8f6f1_0%,#ece7dc_100%)] px-8 py-10 text-center shadow-[0_20px_45px_rgba(0,0,0,0.10)] sm:min-h-[520px]">
            <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#0b2d64_0%,#ef2d2d_50%,#d6a327_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(11,45,100,0.06),transparent_45%)]" />
            <div className="relative z-10 mb-6 flex items-center gap-5 text-[#111]">
              <div className="text-4xl font-black tracking-tight text-[#0b2d64]">RIU</div>
              <div className="h-12 w-px bg-[#999]" />
              <div className="text-lg font-black uppercase tracking-[0.18em] text-[#1a1a1a]">Rugby In Uganda</div>
            </div>
            <div className="relative z-10 text-center font-serif uppercase leading-[0.92] text-[#0b2d64]">
              <div className="text-4xl font-black sm:text-5xl">Official</div>
              <div className="mt-2 inline-block bg-[#416ed8] px-3 py-1 text-white">
                <span className="text-4xl font-black sm:text-5xl">Merchandise</span>
              </div>
              <div className="mt-3 text-4xl font-black sm:text-5xl">Rugby In</div>
              <div className="mt-1 text-4xl font-black sm:text-5xl">Uganda</div>
            </div>
            <div className="relative z-10 mx-auto mt-5 h-[3px] w-16 bg-[#ef2d2d]" />
            <p className="relative z-10 mt-8 max-w-md text-xl leading-relaxed text-[#11386f]">
              Support Rugby in Uganda every day
              <br />
              through our official kit.
            </p>
            <div className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#/shop/matchday-wear"
                className="rounded-full border border-[#0b2d64]/15 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#0b2d64] transition-colors hover:bg-[#0b2d64] hover:text-white"
              >
                Matchday Wear
              </a>
              <a
                href="#/shop/fan-essentials"
                className="rounded-full border border-[#0b2d64]/15 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#0b2d64] transition-colors hover:bg-[#0b2d64] hover:text-white"
              >
                Fan Essentials
              </a>
              <a
                href="#/shop/accessories"
                className="rounded-full border border-[#0b2d64]/15 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#0b2d64] transition-colors hover:bg-[#0b2d64] hover:text-white"
              >
                Accessories
              </a>
            </div>
            <a
              href="#"
              className="relative z-10 mt-10 inline-flex items-center justify-center rounded-[4px] bg-[#ef2d2d] px-10 py-4 text-base font-black uppercase tracking-[0.08em] text-white shadow-[0_14px_30px_rgba(239,45,45,0.22)] transition-colors hover:bg-[#ff3b3b]"
            >
              I Support My Team
            </a>
          </div>

          <div className="group relative aspect-[4/5] overflow-hidden rounded-[10px] bg-white shadow-[0_16px_40px_rgba(0,0,0,0.08)] lg:min-h-[520px]">
            <img
              src="/slider/one.jpg"
              alt="Rugby player ready for action"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#ef2d2d]/18 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* Sponsor A Club Section */}
      <section className="relative overflow-hidden bg-[#080a0f] px-4 py-16 text-white sm:px-6 sm:py-24">
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
          <div className="mb-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center rounded-full border border-[#d6a327]/30 bg-white/6 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.34em] text-[#f1cf75] backdrop-blur-md">
                Premium Partnership
              </div>
              <h2
                className="max-w-2xl text-4xl font-serif uppercase tracking-[0.06em] sm:text-5xl lg:text-6xl"
                style={{ color: '#ffffff', textShadow: '0 4px 18px rgba(0,0,0,0.28)' }}
              >
                Sponsor A Club
              </h2>
              <div className="mt-5 h-[3px] w-24 bg-[linear-gradient(90deg,#ef2d2d_0%,#d6a327_100%)]" />
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/78 sm:text-lg">
                Align your brand with ambition, youth development, and matchday culture through a premium club partnership built for visibility and real community impact.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.11),rgba(255,255,255,0.04))] px-5 py-5 shadow-[0_18px_45px_rgba(0,0,0,0.18)] backdrop-blur-xl">
                <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/48">Community Reach</div>
                <div className="mt-3 text-3xl font-black text-white">Clubs</div>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.11),rgba(255,255,255,0.04))] px-5 py-5 shadow-[0_18px_45px_rgba(0,0,0,0.18)] backdrop-blur-xl">
                <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/48">Impact</div>
                <div className="mt-3 text-3xl font-black text-white">Youth</div>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.11),rgba(255,255,255,0.04))] px-5 py-5 shadow-[0_18px_45px_rgba(0,0,0,0.18)] backdrop-blur-xl">
                <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/48">Visibility</div>
                <div className="mt-3 text-3xl font-black text-white">Nationwide</div>
              </div>
            </div>
          </div>

          <div className="mb-8 overflow-hidden rounded-[32px] border border-white/12 bg-[linear-gradient(135deg,rgba(7,9,14,0.92),rgba(18,22,32,0.78))] shadow-[0_30px_80px_rgba(0,0,0,0.36)] backdrop-blur-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="relative px-6 py-8 sm:px-8 sm:py-10">
                <div className="absolute inset-y-0 left-0 w-1 bg-[linear-gradient(180deg,#d6a327_0%,#ef2d2d_100%)]" />
                <div className="pl-3">
                  <div className="text-xs font-semibold uppercase tracking-[0.3em] text-[#f1cf75]">Featured Club</div>
                  <div className="mt-3 max-w-2xl text-4xl font-black uppercase tracking-[0.05em] text-white sm:text-5xl">
                    {selectedSponsorClub}
                  </div>
                  <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/72 sm:text-base">
                    Back player welfare, school outreach, travel, equipment, and a stronger matchday experience while placing your brand in front of fans, families, and the wider rugby community.
                  </p>
                  <div className="mt-7 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-[18px] border border-white/10 bg-white/6 px-4 py-4">
                      <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/42">Audience</div>
                      <div className="mt-2 text-lg font-black uppercase text-white">Fans & Families</div>
                    </div>
                    <div className="rounded-[18px] border border-white/10 bg-white/6 px-4 py-4">
                      <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/42">Value</div>
                      <div className="mt-2 text-lg font-black uppercase text-white">Brand Lift</div>
                    </div>
                    <div className="rounded-[18px] border border-white/10 bg-white/6 px-4 py-4">
                      <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/42">Purpose</div>
                      <div className="mt-2 text-lg font-black uppercase text-white">Community Impact</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between border-t border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] px-6 py-7 lg:border-l lg:border-t-0">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.28em] text-white/45">Sponsorship Access</div>
                  <div className="mt-3 text-3xl font-black uppercase tracking-[0.06em] text-white">Premium Placement</div>
                  <p className="mt-4 text-sm leading-relaxed text-white/68">
                    Secure a cleaner, stronger brand presence around one club with a direct path into local rugby culture.
                  </p>
                </div>
                <a
                  href="#"
                  className="mt-8 inline-flex items-center justify-center rounded-full bg-[linear-gradient(90deg,#ef2d2d_0%,#ff4a3f_100%)] px-8 py-4 text-sm font-black uppercase tracking-[0.2em] text-white shadow-[0_18px_40px_rgba(239,45,45,0.28)] transition-transform hover:-translate-y-0.5"
                >
                  Sponsor {selectedSponsorClub}
                </a>
              </div>
            </div>
          </div>

          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
            {sponsorClubOptions.map((club) => (
              <button
                key={club.name}
                type="button"
                onClick={() => setSelectedSponsorClub(club.name)}
                className={`relative flex min-h-[220px] min-w-[230px] snap-center flex-col items-center justify-center overflow-hidden rounded-[26px] border px-5 py-6 text-center shadow-[0_20px_44px_rgba(0,0,0,0.24)] transition-all duration-300 hover:-translate-y-1 ${
                  selectedSponsorClub === club.name
                    ? 'border-[#ef2d2d]/80 bg-[linear-gradient(180deg,#fff8ef_0%,#ffffff_100%)] text-black ring-2 ring-[#ef2d2d]/55'
                    : 'border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.11),rgba(255,255,255,0.05))] text-white backdrop-blur-xl'
                }`}
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#0b2d64_0%,#ef2d2d_55%,#d6a327_100%)]" />
                <span className={`absolute top-3 right-3 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] ${
                  selectedSponsorClub === club.name
                    ? 'bg-[#ef2d2d] text-white'
                    : 'bg-white/10 text-white/85'
                }`}>
                  {selectedSponsorClub === club.name ? 'Selected' : 'Select Club'}
                </span>
                <div className={`flex h-20 w-20 items-center justify-center rounded-full border text-2xl font-black uppercase tracking-[0.08em] shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] ${
                  selectedSponsorClub === club.name
                    ? 'border-[#d6a327]/50 bg-[#f7f1e5] text-[#0b2d64]'
                    : 'border-[#d6a327]/35 bg-white/6 text-white'
                }`}>
                  {club.mark}
                </div>
                <div className={`mt-5 text-lg font-black uppercase tracking-[0.08em] ${
                  selectedSponsorClub === club.name ? 'text-[#111]' : 'text-white'
                }`}>
                  {club.name}
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
