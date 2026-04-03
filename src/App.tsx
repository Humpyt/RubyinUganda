import React, { useEffect, useState } from 'react';
import { ChevronDown, Calendar, Menu, CloudSun, Facebook, Info, Send, MessageCircle } from 'lucide-react';

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileRegion, setOpenMobileRegion] = useState<string | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [countdown, setCountdown] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });
  const [pollVotes, setPollVotes] = useState({ win: 0, draw: 0, loss: 0 });
  const [isMatchPollOpen, setIsMatchPollOpen] = useState(false);
  const [selectedVote, setSelectedVote] = useState<'win' | 'draw' | 'loss' | null>(null);

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

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 4500);

    return () => window.clearInterval(intervalId);
  }, [heroSlides.length]);

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

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Top Bar */}
      <div className="relative z-30 isolate border-t-4 border-b-4 border-[#0f4aa6] bg-black px-2 py-1.5 text-white sm:px-3">
        <div className="flex w-full items-center gap-2 rounded-full border border-white/10 bg-[#0f1012] px-2 py-1 shadow-[inset_0_0_0_9999px_#0f1012]">
          <div className="flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-[#17191c] px-3 py-1 shadow-[inset_0_0_0_9999px_#17191c]">
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
      <section className="relative min-h-[1380px] bg-gray-900 md:min-h-[520px] md:h-[600px]">
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
                          <a href="#" className="flex flex-1 items-center border-b border-white/15 text-sm font-semibold text-white transition-colors hover:text-[#d6cf77]">
                            {item.title === 'Schools' ? 'Boys' : 'Men'}
                          </a>
                          <a href="#" className="flex flex-1 items-center border-b border-white/15 text-sm font-semibold text-white transition-colors hover:text-[#d6cf77]">
                            {item.title === 'Schools' ? 'Girls' : 'Women'}
                          </a>
                          <a href="#" className="flex flex-1 items-center border-b border-white/15 text-sm font-semibold text-white transition-colors hover:text-[#d6cf77]">
                            Fixtures
                          </a>
                          <a href="#" className="flex flex-1 items-center text-sm font-semibold text-white transition-colors hover:text-[#d6cf77]">
                            Results
                          </a>
                        </div>
                      </div>
                      <div
                        className="min-h-[312px] bg-center bg-no-repeat"
                        style={{
                          backgroundSize: '100% 100%',
                          backgroundImage: item.title === 'Central'
                            ? "url('https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=1200')"
                            : item.title === 'Northern'
                              ? "url('https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=1200')"
                              : item.title === 'Eastern'
                                ? "url('https://images.unsplash.com/photo-1508098682722-e99c643e7485?auto=format&fit=crop&q=80&w=1200')"
                                : item.title === 'Western'
                                  ? "url('https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&q=80&w=1200')"
                                  : item.title === 'Schools'
                                    ? "url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1200')"
                                    : "url('https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=1200')",
                        }}
                      />
                    </div>
                  </div>
                ) : null}
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
        <div className="absolute right-0 bottom-0 left-0 w-full bg-[#3a4740]/72 py-6 backdrop-blur-md">
          <div className="container mx-auto flex justify-center px-4">
            <div className="flex w-full flex-wrap items-center gap-4 md:w-auto">
              <div className="relative w-full sm:w-[calc(50%-0.5rem)] lg:w-auto">
                <select defaultValue="" className="w-full appearance-none border border-white/60 bg-transparent px-4 py-3 text-lg uppercase text-white focus:border-white focus:outline-none md:py-2 md:text-sm lg:w-48">
                  <option value="" disabled hidden className="text-black">SHOP</option>
                  <option className="text-black">RIU</option>
                  <option className="text-black">CLUBS</option>
                </select>
                <ChevronDown size={18} className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 transform text-white/90 md:size-[14px]" />
              </div>
              <div className="relative w-full sm:w-[calc(50%-0.5rem)] lg:w-auto">
                <select defaultValue="" className="w-full appearance-none border border-white/60 bg-transparent px-4 py-3 text-lg uppercase text-white focus:border-white focus:outline-none md:py-2 md:text-sm lg:w-48">
                  <option value="" disabled hidden className="text-black">EVENTS</option>
                  <option className="text-black">ON GOING</option>
                  <option className="text-black">UP COMING</option>
                </select>
                <ChevronDown size={18} className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 transform text-white/90 md:size-[14px]" />
              </div>
              <div className="relative w-full sm:w-[calc(50%-0.5rem)] lg:w-auto">
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
              <div className="relative w-full sm:w-[calc(50%-0.5rem)] lg:w-auto">
                <select defaultValue="" className="w-full appearance-none border border-white/60 bg-transparent px-4 py-3 text-lg uppercase text-white focus:border-white focus:outline-none md:py-2 md:text-sm lg:w-40">
                  <option value="" disabled hidden className="text-black">NEWS</option>
                  <option className="text-black">ALL NEWS</option>
                  <option className="text-black">LATEST NEWS</option>
                </select>
                <ChevronDown size={18} className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 transform text-white/90 md:size-[14px]" />
              </div>
              <div className="relative w-full sm:w-[calc(50%-0.5rem)] lg:w-auto">
                <input type="text" placeholder="CALENDAR" className="w-full border border-white/60 bg-transparent px-4 py-3 text-lg uppercase text-white placeholder-white/90 focus:border-white focus:outline-none md:py-2 md:text-sm lg:w-40" />
                <Calendar size={18} className="absolute top-1/2 right-4 -translate-y-1/2 transform text-white/90 md:size-[14px]" />
              </div>
              <button className="w-full whitespace-nowrap bg-[#d93838] px-6 py-3 text-lg font-bold text-white transition-colors hover:bg-red-700 md:w-auto md:px-8 md:py-2.5 md:text-sm">
                Partner With Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative overflow-hidden py-20 sm:py-28">
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
            className="relative min-h-[860px] transition-transform duration-700 sm:min-h-[640px]"
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
              <div className="bg-[rgba(255,255,255,0.9)] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.18)] sm:p-8">
                <div className="rounded-[22px] border-[3px] border-black bg-[#f0eadf] p-4 text-black shadow-[8px_8px_0_#000] sm:p-6">
                  <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h2 className="text-sm font-black uppercase tracking-[0.28em]">Match Poll</h2>
                    </div>
                    <div className="text-right text-sm font-black uppercase leading-6">
                      <div>Total Votes: {totalVotes}</div>
                      <div>Total Active Polls: 1</div>
                    </div>
                  </div>

                  <div className="mb-5 rounded-xl border-[3px] border-black bg-[#f4a71d] px-6 py-5 text-center shadow-[inset_0_-2px_0_rgba(0,0,0,0.15)]">
                    <div className="text-sm font-black uppercase tracking-[0.2em]">Match Date</div>
                    <div className="mt-1 text-3xl font-black uppercase">Sun 05/04</div>
                  </div>

                  <p className="mb-4 text-xl font-black uppercase">Life Guard Rams To Win</p>

                  <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {voteOptions.map((option) => (
                      <button
                        key={option.key}
                        type="button"
                        onClick={() => handleVote(option.key)}
                        className={`rounded-lg border-[2px] px-6 py-3 text-base font-black uppercase transition-transform ${
                          selectedVote === option.key
                            ? option.key === 'win'
                              ? 'border-black bg-black text-white shadow-[0_0_0_3px_rgba(244,167,29,0.4)]'
                              : option.key === 'draw'
                                ? 'border-black bg-[#f4a71d] text-black shadow-[0_0_0_3px_rgba(244,167,29,0.35)]'
                                : 'border-black bg-white text-black shadow-[0_0_0_3px_rgba(0,0,0,0.18)]'
                            : option.key === 'draw'
                              ? 'border-black bg-[#f4a71d] text-black hover:-translate-y-0.5'
                              : option.key === 'win'
                                ? 'border-black bg-black text-white hover:-translate-y-0.5'
                                : 'border-black bg-white text-black hover:-translate-y-0.5'
                        }`}
                      >
                        {selectedVote === option.key ? `${option.label} Selected` : option.label}
                      </button>
                    ))}
                  </div>

                  <p className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-black/70">
                    {selectedVote ? 'Your vote is active. Tap another option to change it.' : 'Tap one option to cast your vote.'}
                  </p>

                  <div className="space-y-4">
                    {voteOptions.map((option) => {
                      const percentage = totalVotes === 0 ? 0 : Math.round((option.count / totalVotes) * 100);

                      return (
                        <div key={`result-${option.key}`} className="grid grid-cols-[48px_1fr_auto] items-center gap-3 sm:grid-cols-[72px_1fr_auto]">
                          <span className="text-lg font-black uppercase">{option.label}</span>
                          <div className="h-8 overflow-hidden rounded-none border-[2px] border-black bg-white">
                            <div
                              className="h-full bg-[#f4a71d] transition-all duration-300"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-lg font-black">{percentage}% | {option.count}</span>
                        </div>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsMatchPollOpen(false)}
                    className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-black px-6 py-4 text-sm font-black uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#222]"
                  >
                    Back To Match
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="bg-[#050505] py-16 sm:py-24">
        <div className="mb-16 px-4 text-center">
          <p className="mb-3 font-serif text-lg italic text-gray-400">What can you do at the Leisure Template?</p>
          <h2 className="mb-6 font-serif text-3xl tracking-wide text-white sm:text-4xl">
            LEISURE CLUB ACTIVITIES
          </h2>
          <div className="mx-auto h-[2px] w-12 bg-[#d93838]"></div>
        </div>

        <div className="container mx-auto grid grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="group border border-white/10 bg-[#111315] p-6 text-center transition-all duration-300 hover:shadow-xl hover:shadow-black/40">
            <div className="mb-6 h-40 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800" alt="Cuisine" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <h3 className="mb-4 font-serif text-xl leading-snug text-white">International Cuisine<br />for all Your Tastes</h3>
            <p className="text-sm leading-relaxed text-gray-400">
              A communi observantia non est recedendum. Cum ceteris in veneratione tui montes.
            </p>
          </div>

          <div className="group border border-white/10 bg-[#111315] p-6 text-center transition-all duration-300 hover:shadow-xl hover:shadow-black/40">
            <div className="mb-6 h-40 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&q=80&w=800" alt="Yacht" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <h3 className="mb-4 font-serif text-xl leading-snug text-white">Take our Yacht and<br />Visit the Surroundings</h3>
            <p className="text-sm leading-relaxed text-gray-400">
              Prima luce, cum quibus mons aliud consensu ab eo. Quid securi etiam tamquam eu fugiat.
            </p>
          </div>

          <div className="group border border-white/10 bg-[#111315] p-6 text-center transition-all duration-300 hover:shadow-xl hover:shadow-black/40">
            <div className="mb-6 h-40 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=800" alt="Apartments" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <h3 className="mb-4 font-serif text-xl leading-snug text-white">Studios & VIP<br />Exclusive Apartments</h3>
            <p className="text-sm leading-relaxed text-gray-400">
              Magna pars studiorum, prodita quaerimus. Quid securi etiam tamquam eu fugiat nulla.
            </p>
          </div>

          <div className="group border border-white/10 bg-[#111315] p-6 text-center transition-all duration-300 hover:shadow-xl hover:shadow-black/40">
            <div className="mb-6 h-40 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=800" alt="Fitness" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <h3 className="mb-4 font-serif text-xl leading-snug text-white">Pro Fitness Instructor<br />for Every Day Classes</h3>
            <p className="text-sm leading-relaxed text-gray-400">
              Praeterea iter est quasdam res quas ex communi. Vivamus sagittis lacus vel augue laoreet.
            </p>
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
            <ul className="space-y-7 text-lg">
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
            <ul className="space-y-7 text-lg">
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
            <ul className="space-y-7 text-lg">
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
