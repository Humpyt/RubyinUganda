import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface DesktopTopNavMenu {
  label: string;
  href: string;
  links: readonly { label: string; href: string }[];
  featured?: boolean;
}

interface DesktopTopNavProps {
  menus: readonly DesktopTopNavMenu[];
  standaloneLink?: { label: string; href: string };
}

export default function DesktopTopNav({ menus, standaloneLink }: DesktopTopNavProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const handleNavigate = (href: string, pendingRegion?: string) => {
    setOpenMenu(null);

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
    <div className="relative z-[80] flex w-full md:justify-end">
      <div className="flex w-full items-center gap-3 overflow-x-auto rounded-full border border-white/10 bg-black/18 px-3 py-2 text-base font-semibold text-white backdrop-blur-md [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:w-auto md:overflow-visible">
        {menus.map((menu) => (
          <div
            key={menu.label}
            className="relative shrink-0"
          >
            <button
              type="button"
              onClick={() => {
                setOpenMenu((value) => (value === menu.label ? null : menu.label));
              }}
              className={`flex items-center gap-2 rounded-full px-4 py-2 transition-colors ${
                menu.featured
                  ? 'bg-[linear-gradient(90deg,#ef2d2d_0%,#ff6d3f_100%)] text-white shadow-[0_12px_24px_rgba(239,45,45,0.2)] hover:-translate-y-0.5'
                  : 'hover:bg-white/8 hover:text-white'
              }`}
            >
              <span>{menu.label}</span>
              <ChevronDown size={18} className={openMenu === menu.label ? 'rotate-180 transition-transform' : 'transition-transform'} />
            </button>
            <div className={openMenu === menu.label ? 'absolute right-0 top-full z-[90] mt-3 w-[280px] rounded-[20px] border border-white/10 bg-[#0d1118] p-3 shadow-[0_22px_46px_rgba(0,0,0,0.35)]' : 'hidden'}>
              <div className="space-y-2">
                {menu.links.map((link) => (
                  <button
                    key={`${menu.label}-${link.label}`}
                    type="button"
                    onClick={() => {
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
          </div>
        ))}

        {standaloneLink ? (
          <button
            type="button"
            onClick={() => {
              handleNavigate(standaloneLink.href);
            }}
            className="shrink-0 rounded-full px-4 py-2 transition-colors hover:bg-white/8 hover:text-white"
          >
            {standaloneLink.label}
          </button>
        ) : null}
      </div>
    </div>
  );
}
