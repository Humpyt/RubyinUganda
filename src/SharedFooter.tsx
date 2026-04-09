import { Facebook, Info, Send } from 'lucide-react';

const buildRegionRoute = (regionTitle: string, link: string) =>
  `#/regions/${regionTitle.toLowerCase().replace(/&/g, 'and').replace(/\s+/g, '-')}/${link.toLowerCase().replace(/&/g, 'and').replace(/\s+/g, '-')}`;

const homeMenuHrefMap = {
  Latest: '#/',
  Teams: buildRegionRoute('Central', 'Men'),
  'Age Grade': buildRegionRoute('Schools', 'Boys'),
  Tournaments: buildRegionRoute('Central', 'Fixtures'),
  RIU: '#/shop/matchday-wear',
  'Fixture & Results': buildRegionRoute('Central', 'Fixtures'),
} as const;

export default function SharedFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#121212] text-white">
      <div className="grid grid-cols-1 border-b border-white/10 lg:grid-cols-[1.15fr_1fr_1fr_1fr_1fr]">
        <div className="flex flex-col items-center justify-start border-b border-white/10 px-8 py-10 text-center md:border-b-0 md:border-r">
          <img src="/logo-cutout.png" alt="Rugby in Uganda" className="-mt-3 h-[240px] w-auto object-contain sm:h-[270px]" />
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
            <li><a href={homeMenuHrefMap.Latest} className="transition-colors hover:text-[#d6a327]">Latest</a></li>
            <li><a href={homeMenuHrefMap.Teams} className="transition-colors hover:text-[#d6a327]">Teams</a></li>
            <li><a href={homeMenuHrefMap['Age Grade']} className="transition-colors hover:text-[#d6a327]">Age Grade</a></li>
            <li><a href={homeMenuHrefMap.Tournaments} className="transition-colors hover:text-[#d6a327]">Tournaments</a></li>
            <li><a href={homeMenuHrefMap.RIU} className="transition-colors hover:text-[#d6a327]">RIU</a></li>
            <li><a href={homeMenuHrefMap['Fixture & Results']} className="transition-colors hover:text-[#d6a327]">Fixture & Results</a></li>
          </ul>
        </div>

        <div className="border-b border-white/10 px-8 py-10 md:border-b-0 md:border-r">
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-white/55">Regions</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-7 text-lg md:block md:space-y-7">
            <li><a href={buildRegionRoute('Central', 'Men')} className="transition-colors hover:text-[#d6a327]">Central</a></li>
            <li><a href={buildRegionRoute('Northern', 'Men')} className="transition-colors hover:text-[#d6a327]">Northern</a></li>
            <li><a href={buildRegionRoute('Eastern', 'Men')} className="transition-colors hover:text-[#d6a327]">Eastern</a></li>
            <li><a href={buildRegionRoute('Western', 'Men')} className="transition-colors hover:text-[#d6a327]">Western</a></li>
            <li><a href={buildRegionRoute('Schools', 'Boys')} className="transition-colors hover:text-[#d6a327]">Schools</a></li>
            <li><a href={buildRegionRoute('National Team', 'Men')} className="transition-colors hover:text-[#d6a327]">National Team</a></li>
          </ul>
        </div>

        <div className="border-b border-white/10 px-8 py-10 md:border-b-0 md:border-r">
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-white/55">Services</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-7 text-lg md:block md:space-y-7">
            <li><a href="#/shop/matchday-wear" className="transition-colors hover:text-[#d6a327]">Shop</a></li>
            <li><a href={buildRegionRoute('Central', 'Fixtures')} className="transition-colors hover:text-[#d6a327]">Events</a></li>
            <li><a href={buildRegionRoute('Central', 'Standings')} className="transition-colors hover:text-[#d6a327]">Table Standings</a></li>
            <li><a href="#/" className="transition-colors hover:text-[#d6a327]">News</a></li>
            <li><a href={buildRegionRoute('Central', 'Fixtures')} className="transition-colors hover:text-[#d6a327]">Calendar</a></li>
            <li><a href="#official-kit-drop" className="transition-colors hover:text-[#d6a327]">Partner With Us</a></li>
          </ul>
        </div>

        <div className="px-8 py-10">
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
        <p>&copy; 2026 Rugby in Uganda. All rights reserved.</p>
        <div className="flex flex-wrap gap-4">
          <a href="#" className="transition-colors hover:text-[#d6a327]">Privacy Policy</a>
          <span>|</span>
          <a href="#" className="transition-colors hover:text-[#d6a327]">Terms of Use</a>
          <span>|</span>
          <a href="#" className="transition-colors hover:text-[#d6a327]">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
}
