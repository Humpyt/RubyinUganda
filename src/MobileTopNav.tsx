import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { DesktopTopNavMenu } from './DesktopTopNav';

interface MobileTopNavProps {
  menus: readonly DesktopTopNavMenu[];
  standaloneLink?: { label: string; href: string };
  onNavigate?: () => void;
}

export default function MobileTopNav({ menus, standaloneLink, onNavigate }: MobileTopNavProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const handleNavigate = (href: string, pendingRegion?: string) => {
    setOpenMenu(null);
    onNavigate?.();

    if (pendingRegion) {
      window.sessionStorage.setItem('pendingOpenRegion', pendingRegion);
    } else {
      window.sessionStorage.removeItem('pendingOpenRegion');
    }

    if (href.startsWith('#')) {
      window.location.hash = href.slice(1);
      return;
    }

    window.location.href = href;
  };

  return (
    <div className="space-y-3">
      {menus.map((menu) => (
        <div key={menu.label} className="relative">
          <button
            type="button"
            onClick={() => setOpenMenu((value) => (value === menu.label ? null : menu.label))}
            className={`flex w-full items-center justify-between gap-3 rounded-full border px-4 py-3 text-left text-sm font-semibold text-white transition-colors ${
              menu.featured
                ? 'border-transparent bg-[linear-gradient(90deg,#ef2d2d_0%,#ff6d3f_100%)] shadow-[0_12px_24px_rgba(239,45,45,0.2)]'
                : 'border-white/10 bg-black/18 hover:bg-white/8'
            }`}
          >
            <span>{menu.label}</span>
            <ChevronDown size={16} className={openMenu === menu.label ? 'rotate-180 transition-transform' : 'transition-transform'} />
          </button>

          {openMenu === menu.label ? (
            <div className="mt-3 rounded-[20px] border border-white/10 bg-[#0d1118] p-3 shadow-[0_22px_46px_rgba(0,0,0,0.35)]">
              <div className="space-y-2">
                {menu.links.map((link) => (
                  <button
                    key={`${menu.label}-${link.label}`}
                    type="button"
                    onClick={() => {
                      if (menu.label === 'Leagues') {
                        window.sessionStorage.setItem('pendingScrollTarget', 'league-standings');
                      }
                      handleNavigate(
                        link.href,
                        menu.label === 'Teams' && ['Central', 'Northern', 'Eastern', 'Western', 'Schools', 'National Team'].includes(link.label)
                          ? link.label
                          : undefined,
                      );
                    }}
                    className="block w-full rounded-[14px] border border-white/8 bg-white/4 px-4 py-3 text-left text-sm font-semibold text-white/90 transition-colors hover:bg-white/10 hover:text-[#f1cf75]"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ))}

      {standaloneLink ? (
        <button
          type="button"
          onClick={() => handleNavigate(standaloneLink.href)}
          className="block w-full rounded-full border border-white/10 bg-black/18 px-4 py-3 text-left text-sm font-semibold text-white transition-colors hover:bg-white/10"
        >
          {standaloneLink.label}
        </button>
      ) : null}
    </div>
  );
}
