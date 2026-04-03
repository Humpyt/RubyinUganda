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
            <div className="flex items-center gap-9 px-2 py-2 text-lg font-semibold text-white">
              <a href="#" className="flex items-center gap-2 transition-colors hover:text-gray-300">
                <span>Latest</span>
                <ChevronDown size={18} />
              </a>
              <a href="#" className="flex items-center gap-2 transition-colors hover:text-gray-300">
                <span>Teams</span>
                <ChevronDown size={18} />
              </a>
              <a href="#" className="transition-colors hover:text-gray-300">Age Grade</a>
              <a href="#" className="flex items-center gap-2 transition-colors hover:text-gray-300">
                <span>Tournaments</span>
                <ChevronDown size={18} />
              </a>
              <a href="#" className="flex items-center gap-2 transition-colors hover:text-gray-300">
                <span>RIU</span>
                <ChevronDown size={18} />
              </a>
              <a href="#" className="flex items-center gap-2 transition-colors hover:text-gray-300">
                <span>Fixture & Results</span>
                <ChevronDown size={18} />
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
        <div className="absolute top-0 left-0 hidden w-full border-b border-white/10 bg-black/30 backdrop-blur-sm md:block">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-6 divide-x divide-white/20 text-center text-white">
              {desktopRegionPanels.map((item) => (
                <div key={item.title} className="group relative cursor-pointer py-4 transition-colors hover:bg-white/10">
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
        <div className="absolute right-0 bottom-0 left-0 w-full bg-[#3a4740]/90 py-6 backdrop-blur-md">
          <div className="container mx-auto flex justify-center px-4">
            <div className="flex w-full items-center gap-3 overflow-x-auto whitespace-nowrap pb-1 md:w-auto md:flex-wrap md:justify-center md:overflow-visible md:whitespace-normal">
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
                <select defaultValue="" className="w-full appearance-none border border-white/60 bg-transparent px-4 py-3 text-lg uppercase text-white focus:border-white focus:outline-none md:py-2 md:text-base lg:w-40">
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
      <section className={`section-font-fixed relative overflow-hidden py-20 sm:py-28 ${isMatchPollOpen ? 'pb-96 sm:pb-28' : ''}`}>
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
                ? 'min-h-[1800px] sm:min-h-[980px] lg:min-h-[1120px]'
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
              <div className="bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(247,242,230,0.92))] p-4 shadow-[0_24px_60px_rgba(0,0,0,0.18)] sm:p-5 lg:p-6">
                <div className="overflow-hidden rounded-[24px] border border-[#161616] bg-[linear-gradient(180deg,#f7f1e6_0%,#efe7d8_100%)] text-black shadow-[0_24px_50px_rgba(0,0,0,0.28)] sm:rounded-[28px]">
                  <div className="border-b border-black/10 bg-[linear-gradient(90deg,rgba(255,255,255,0.55),rgba(255,255,255,0.18))] px-4 py-4 sm:px-5 sm:py-4 lg:px-6 lg:py-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <div className="text-[11px] font-black uppercase tracking-[0.22em] text-black/55">Interactive Vote</div>
                        <h2 className="mt-1 text-lg font-black uppercase tracking-[0.16em] sm:mt-2 sm:text-2xl lg:text-3xl">Match Poll</h2>
                        <p className="mt-1 max-w-xl text-[12px] leading-relaxed text-black/62 sm:mt-2 sm:text-base lg:text-lg">
                          Cast your pick for the result and watch the live percentages update instantly.
                        </p>
                    </div>
                      <div className="grid grid-cols-2 gap-2 sm:min-w-[260px] sm:gap-3">
                        <div className="rounded-xl border border-black/10 bg-white/55 px-3 py-2 text-center sm:rounded-2xl sm:px-3 sm:py-2.5 lg:px-4 lg:py-3">
                          <div className="text-[11px] font-black uppercase tracking-[0.18em] text-black/48">Total Votes</div>
                          <div className="mt-1 text-xl font-black sm:mt-1 sm:text-2xl lg:mt-2 lg:text-3xl">{totalVotes}</div>
                        </div>
                        <div className="rounded-xl border border-black/10 bg-white/55 px-3 py-2 text-center sm:rounded-2xl sm:px-3 sm:py-2.5 lg:px-4 lg:py-3">
                          <div className="text-[11px] font-black uppercase tracking-[0.18em] text-black/48">Active Polls</div>
                          <div className="mt-1 text-xl font-black sm:mt-1 sm:text-2xl lg:mt-2 lg:text-3xl">1</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 lg:p-7">
                    <div className="mb-4 rounded-[18px] border border-black/12 bg-[linear-gradient(135deg,#f4a71d_0%,#ffbf43_100%)] px-4 py-4 text-center shadow-[inset_0_-3px_0_rgba(0,0,0,0.12),0_16px_24px_rgba(244,167,29,0.22)] sm:mb-5 sm:rounded-[22px] sm:px-5 sm:py-5 lg:mb-6 lg:rounded-[24px] lg:px-6 lg:py-6">
                      <div className="text-[11px] font-black uppercase tracking-[0.18em] text-black/65 sm:text-[11px] sm:tracking-[0.28em]">Match Date</div>
                      <div className="mt-1 text-3xl font-black uppercase sm:mt-2 sm:text-4xl lg:text-5xl">Sun 05/04</div>
                    </div>

                    <div className="mb-4 flex flex-col gap-2 border-b border-black/10 pb-4 sm:mb-5 sm:gap-3 sm:pb-5 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <div className="text-[11px] font-black uppercase tracking-[0.14em] text-black/45 sm:text-[11px] sm:tracking-[0.24em]">Prediction Prompt</div>
                        <p className="mt-1 text-xl font-black uppercase sm:mt-2 sm:text-3xl lg:text-4xl">Life Guard Rams To Win</p>
                      </div>
                      <div className="rounded-full border border-black/10 bg-white/55 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.08em] text-black/65 sm:px-4 sm:py-2 sm:text-sm sm:tracking-[0.16em]">
                        Live Community Pick
                      </div>
                    </div>

                    <div className="mb-4 grid grid-cols-1 gap-2 sm:mb-5 sm:grid-cols-3 sm:gap-2.5 lg:mb-6 lg:gap-3">
                      {voteOptions.map((option) => (
                        <button
                          key={option.key}
                          type="button"
                          onClick={() => handleVote(option.key)}
                          className={`rounded-lg border px-3 py-2 text-[12px] font-black uppercase tracking-[0.03em] transition-all duration-200 sm:rounded-2xl sm:px-4 sm:py-3 sm:text-base sm:tracking-[0.06em] lg:px-6 lg:py-4 lg:text-lg lg:tracking-[0.08em] ${
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
                          <div className={`mt-0.5 text-[9px] font-bold uppercase tracking-[0.06em] sm:text-[11px] sm:tracking-[0.14em] lg:text-xs lg:tracking-[0.18em] ${
                            selectedVote === option.key ? 'opacity-80' : 'opacity-55'
                          }`}>
                            {selectedVote === option.key ? 'Selected' : 'Tap To Vote'}
                          </div>
                        </button>
                      ))}
                    </div>

                    <p className="mb-4 rounded-md border border-black/8 bg-white/45 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.05em] text-black/62 sm:mb-5 sm:rounded-2xl sm:px-4 sm:py-2.5 sm:text-sm sm:tracking-[0.12em] lg:px-4 lg:py-3 lg:text-base lg:tracking-[0.16em]">
                      {selectedVote ? 'Your vote is active. Tap another option to change it.' : 'Tap one option to cast your vote.'}
                    </p>

                    <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                      {voteOptions.map((option) => {
                        const percentage = totalVotes === 0 ? 0 : Math.round((option.count / totalVotes) * 100);
                        const barClass =
                          option.key === 'win'
                            ? 'bg-[#111]'
                            : option.key === 'draw'
                              ? 'bg-[linear-gradient(90deg,#f4a71d_0%,#ffbf43_100%)]'
                              : 'bg-white';

                        return (
                          <div key={`result-${option.key}`} className="rounded-[12px] border border-black/10 bg-white/45 px-3 py-2 sm:rounded-[20px] sm:px-4 sm:py-3 lg:rounded-[22px] lg:px-5 lg:py-4">
                            <div className="mb-1.5 flex items-center justify-between gap-2 sm:mb-2">
                              <span className="text-[12px] font-black uppercase sm:text-lg lg:text-xl">{option.label}</span>
                              <span className="text-[10px] font-black sm:text-base lg:text-lg">{percentage}% | {option.count}</span>
                            </div>
                            <div className="h-1 overflow-hidden rounded-full border border-black/12 bg-white/80 sm:h-3 lg:h-4">
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
                      className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-[#111] px-4 py-2 text-[9px] font-black uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#222] sm:mt-5 sm:rounded-2xl sm:py-3 sm:text-sm sm:tracking-[0.14em] lg:mt-6 lg:py-4 lg:text-base lg:tracking-[0.18em]"
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
      <section className="relative overflow-hidden bg-[#050505] py-18 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(214,163,39,0.14),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(15,74,166,0.18),transparent_28%)]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent)]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d6a327]/20 bg-white/6 px-5 py-2.5 text-xs font-black uppercase tracking-[0.22em] text-[#f1cf75] backdrop-blur-md">
              Premium Advertising
            </div>
            <p className="mt-5 font-serif text-xl italic text-[#f1cf75] sm:text-2xl">Put Your Brand Where Rugby Culture Lives</p>
            <h2
              className="mx-auto mt-4 max-w-5xl font-serif text-4xl tracking-[0.03em] text-[#fff7e6] sm:text-6xl"
              style={{ textShadow: '0 6px 18px rgba(0,0,0,0.45)' }}
            >
              Advertise With A Format That Makes Your Logo Look Established
            </h2>
            <p className="mx-auto mt-6 max-w-4xl text-lg leading-relaxed text-white/92 sm:text-xl">
              This space is designed for serious sponsors. Your business can appear across premium logo placements, branded features, matchday visibility, and long-term partner storytelling around Rugby In Uganda.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <div className="rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] px-6 py-6 shadow-[0_18px_40px_rgba(0,0,0,0.24)] backdrop-blur-md">
              <div className="text-xs font-black uppercase tracking-[0.2em] text-white/45">Monthly Reach</div>
              <div className="mt-3 text-5xl font-black text-white">50K+</div>
              <div className="mt-3 text-lg leading-relaxed text-white/82">Across fixtures, results, polls, feature stories, and partner mentions.</div>
            </div>
            <div className="rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] px-6 py-6 shadow-[0_18px_40px_rgba(0,0,0,0.24)] backdrop-blur-md">
              <div className="text-xs font-black uppercase tracking-[0.2em] text-white/45">Audience Fit</div>
              <div className="mt-3 text-5xl font-black text-white">Fans, Clubs</div>
              <div className="mt-3 text-lg leading-relaxed text-white/82">A community built around sport, events, schools, and loyal supporter networks.</div>
            </div>
            <div className="rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] px-6 py-6 shadow-[0_18px_40px_rgba(0,0,0,0.24)] backdrop-blur-md">
              <div className="text-xs font-black uppercase tracking-[0.2em] text-white/45">Brand Value</div>
              <div className="mt-3 text-5xl font-black text-white">Worldwide</div>
              <div className="mt-3 text-lg leading-relaxed text-white/82">A polished presentation that makes local and global sponsors look at home.</div>
            </div>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-4">
            <div className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,#121418_0%,#0a0b0d_100%)] p-6 shadow-[0_24px_50px_rgba(0,0,0,0.3)] transition-transform duration-300 hover:-translate-y-1">
              <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#d6a327_0%,#ef2d2d_100%)]" />
              <div className="rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.09),rgba(255,255,255,0.03))] p-5">
                <div className="text-xs font-black uppercase tracking-[0.18em] text-white/55">Logo Preview Area</div>
                <div className="mt-4 flex h-36 items-center justify-center rounded-[18px] border border-dashed border-white/16 bg-black/25 px-4 text-center text-2xl font-black uppercase tracking-[0.16em] text-white/92">
                  Your Logo Here
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-bold uppercase tracking-[0.12em] text-white/70">
                  <div className="rounded-full border border-white/10 px-3 py-2.5 text-center">Homepage</div>
                  <div className="rounded-full border border-white/10 px-3 py-2.5 text-center">Hero Slots</div>
                </div>
              </div>
              <div className="mt-6 text-xs font-black uppercase tracking-[0.24em] text-[#f1cf75]">Premium Placement</div>
              <h3 className="mt-3 font-serif text-3xl leading-tight text-white">Homepage Banner Presence</h3>
              <p className="mt-4 text-lg leading-relaxed text-white/82">
                Best for brands that want immediate visual authority with logo-led exposure in high-traffic positions.
              </p>
            </div>

            <div className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,#121418_0%,#0a0b0d_100%)] p-6 shadow-[0_24px_50px_rgba(0,0,0,0.3)] transition-transform duration-300 hover:-translate-y-1">
              <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#0f4aa6_0%,#d6a327_100%)]" />
              <div className="rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.09),rgba(255,255,255,0.03))] p-5">
                <div className="text-xs font-black uppercase tracking-[0.18em] text-white/55">Editorial Style</div>
                <div className="mt-4 rounded-[18px] border border-white/10 bg-[linear-gradient(135deg,rgba(15,74,166,0.22),rgba(255,255,255,0.04))] px-4 py-6 text-left">
                  <div className="text-sm font-black uppercase tracking-[0.18em] text-white/65">Presented By</div>
                  <div className="mt-3 text-2xl font-black uppercase tracking-[0.08em] text-white">Your Brand Story</div>
                  <div className="mt-2 text-lg leading-relaxed text-white/82">Campaigns, interviews, and feature-led visibility.</div>
                </div>
              </div>
              <div className="mt-6 text-xs font-black uppercase tracking-[0.24em] text-[#f1cf75]">Brand Storytelling</div>
              <h3 className="mt-3 font-serif text-3xl leading-tight text-white">Sponsored Features That Feel Premium</h3>
              <p className="mt-4 text-lg leading-relaxed text-white/82">
                Ideal for companies that want more than impressions and need a story-rich presence people remember.
              </p>
            </div>

            <div className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,#121418_0%,#0a0b0d_100%)] p-6 shadow-[0_24px_50px_rgba(0,0,0,0.3)] transition-transform duration-300 hover:-translate-y-1">
              <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#ef2d2d_0%,#ff9b45_100%)]" />
              <div className="rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.09),rgba(255,255,255,0.03))] p-5">
                <div className="text-xs font-black uppercase tracking-[0.18em] text-white/55">Matchday Visibility</div>
                <div className="mt-4 grid gap-2">
                  <div className="rounded-[16px] border border-white/10 bg-white/5 px-4 py-4 text-base font-black uppercase tracking-[0.14em] text-white/92">Logo In Fixtures</div>
                  <div className="rounded-[16px] border border-white/10 bg-white/5 px-4 py-4 text-base font-black uppercase tracking-[0.14em] text-white/92">Poll Sponsorship</div>
                  <div className="rounded-[16px] border border-white/10 bg-white/5 px-4 py-4 text-base font-black uppercase tracking-[0.14em] text-white/92">Top Match Coverage</div>
                </div>
              </div>
              <div className="mt-6 text-xs font-black uppercase tracking-[0.24em] text-[#f1cf75]">Matchday Exposure</div>
              <h3 className="mt-3 font-serif text-3xl leading-tight text-white">Be Seen Where Attention Peaks</h3>
              <p className="mt-4 text-lg leading-relaxed text-white/82">
                Great for companies that want their logo next to fixtures, predictions, big games, and fan activity.
              </p>
            </div>

            <div className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,#121418_0%,#0a0b0d_100%)] p-6 shadow-[0_24px_50px_rgba(0,0,0,0.3)] transition-transform duration-300 hover:-translate-y-1">
              <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#d6a327_0%,#0f4aa6_100%)]" />
              <div className="rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.09),rgba(255,255,255,0.03))] p-5">
                <div className="text-xs font-black uppercase tracking-[0.18em] text-white/55">Corporate Fit</div>
                <div className="mt-4 flex h-36 items-center justify-center rounded-[18px] border border-white/10 bg-[linear-gradient(135deg,rgba(214,163,39,0.16),rgba(15,74,166,0.12))] px-5 text-center">
                  <div className="text-xl font-black uppercase tracking-[0.14em] text-white">Built For Serious Partners</div>
                </div>
              </div>
              <div className="mt-6 text-xs font-black uppercase tracking-[0.24em] text-[#f1cf75]">Business Growth</div>
              <h3 className="mt-3 font-serif text-3xl leading-tight text-white">A Better-Looking Home For Sponsors</h3>
              <p className="mt-4 text-lg leading-relaxed text-white/82">
                A sharper, more professional environment that helps businesses picture their brand here with confidence.
              </p>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 text-center">
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(90deg,#d6a327_0%,#efbf45_100%)] px-12 py-5 text-base font-black uppercase tracking-[0.22em] text-black shadow-[0_20px_36px_rgba(214,163,39,0.24)] transition-transform hover:-translate-y-0.5"
            >
              Advertise With Us
            </a>
            <div className="text-xs font-bold uppercase tracking-[0.22em] text-white/42">
              Premium presentation for logo-driven partnerships
            </div>
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

          <div className="grid max-w-[78rem] grid-cols-1 gap-6 md:grid-cols-[0.98fr_1.22fr_0.98fr] md:items-stretch lg:gap-8">
            <div className="group relative flex min-h-[430px] flex-col overflow-hidden rounded-[32px] border border-white/15 bg-[radial-gradient(circle_at_top,#2b2b32_0%,#0d0d10_72%)] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.22)] sm:min-h-[540px] sm:p-6">
              <div className="absolute left-4 top-4 z-20 rounded-full border border-white/12 bg-white/8 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white/80 backdrop-blur-md">
                Black Edition
              </div>
              <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(180deg,transparent_0%,rgba(11,45,100,0.22)_100%)]" />
              <div className="relative mt-10 flex flex-1 items-center justify-center sm:mt-12">
                <img
                  src="/shop/black.jpeg"
                  alt="Black Rugby In Uganda merchandise"
                  className="h-full max-h-[380px] w-full object-contain object-center transition-transform duration-700 group-hover:scale-[1.04] sm:max-h-[500px]"
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

            <div className="relative flex min-h-[520px] flex-col overflow-hidden rounded-[34px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,250,244,0.95)_0%,rgba(243,236,224,0.92)_100%)] px-6 py-10 text-center shadow-[0_24px_60px_rgba(0,0,0,0.12)] sm:min-h-[680px] sm:px-10 sm:py-12">
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

            <div className="group relative flex min-h-[430px] flex-col overflow-hidden rounded-[32px] border border-white/15 bg-[radial-gradient(circle_at_top,#26272c_0%,#08080b_74%)] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.22)] sm:min-h-[540px] sm:p-6">
              <div className="absolute left-4 top-4 z-20 rounded-full border border-white/12 bg-white/8 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white/80 backdrop-blur-md">
                White Edition
              </div>
              <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(180deg,transparent_0%,rgba(239,45,45,0.2)_100%)]" />
              <div className="relative mt-10 flex flex-1 items-center justify-center sm:mt-12">
                <img
                  src="/shop/white.jpeg"
                  alt="White Rugby In Uganda merchandise"
                  className="h-full max-h-[380px] w-full object-contain object-center transition-transform duration-700 group-hover:scale-[1.04] sm:max-h-[500px]"
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
