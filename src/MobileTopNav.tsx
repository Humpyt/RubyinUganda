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
        <div key={menu.label} className="rounded-[18px] border border-white/10 bg-white/5">
          <button
            type="button"
            onClick={() => setOpenMenu((value) => (value === menu.label ? null : menu.label))}
            className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold text-white"
          >
            <span>{menu.label}</span>
            <ChevronDown size={16} className={openMenu === menu.label ? 'rotate-180 transition-transform' : 'transition-transform'} />
          </button>

          {openMenu === menu.label ? (
            <div className="border-t border-white/10 px-3 py-3">
              <div className="space-y-2">
                {menu.links.map((link) => (
                  <button
                    key={`${menu.label}-${link.label}`}
                    type="button"
                    onClick={() =>
                      handleNavigate(
                        link.href,
                        menu.label === 'Teams' && ['Central', 'Northern', 'Eastern', 'Western', 'Schools', 'National Team'].includes(link.label)
                          ? link.label
                          : undefined,
                      )}
                    className="block w-full rounded-[14px] border border-white/8 bg-black/20 px-4 py-3 text-left text-sm font-semibold text-white/82 transition-colors hover:bg-white/10 hover:text-[#f1cf75]"
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
          className="block w-full rounded-[18px] border border-white/10 bg-white/5 px-4 py-3 text-left text-sm font-semibold text-white transition-colors hover:bg-white/10"
        >
          {standaloneLink.label}
        </button>
      ) : null}
    </div>
  );
}
