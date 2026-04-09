import { buildClubRoute, regionalClubsByRegion } from './regionalClubs';

interface RegionalClubDirectoryProps {
  regionTitle: string;
}

export default function RegionalClubDirectory({ regionTitle }: RegionalClubDirectoryProps) {
  const clubs = regionalClubsByRegion[regionTitle] ?? [];
  const toSlug = (value: string) => value.toLowerCase().replace(/&/g, 'and').replace(/\s+/g, '-');

  return (
    <section id="clubs-grid" className="bg-[#f1efec] text-[#151515]">
      <div className="mx-auto max-w-[1380px] px-4 py-10 sm:px-6 sm:py-14">
        <div className="mb-8 border-b border-black/10 pb-6">
          <div className="text-[11px] font-black uppercase tracking-[0.3em] text-black/45">{regionTitle} Region</div>
          <h2 className="mt-2 text-4xl font-black uppercase tracking-[0.03em] text-black sm:text-5xl">Club Directory</h2>
        </div>

        <div className="club-directory-scroll -mx-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex w-max snap-x snap-mandatory gap-6">
            {clubs.map((club) => (
              <article
                key={club.name}
                id={`club-${toSlug(club.name)}`}
                className="relative h-[500px] w-[350px] shrink-0 snap-start overflow-hidden rounded-[2px] text-white shadow-[0_22px_48px_rgba(0,0,0,0.18)]"
                style={{ background: club.background }}
              >
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02)_42%,rgba(0,0,0,0.12)_100%)]" />
                <div className="absolute inset-0 opacity-[0.12]">
                  <div className="flex h-full items-center justify-center text-[11rem] font-black uppercase leading-none">
                    {club.initials}
                  </div>
                </div>

                <div className="relative flex h-full flex-col px-6 py-7">
                  <h3 className="text-center text-[1.9rem] font-black uppercase leading-[0.95] tracking-[0.02em] text-white">
                    {club.name}
                  </h3>

                  <div className="flex flex-1 items-center justify-center">
                    <div
                      className="flex h-36 w-36 items-center justify-center rounded-full border-[5px] text-[2.15rem] font-black uppercase shadow-[0_16px_34px_rgba(0,0,0,0.25)]"
                      style={{
                        borderColor: club.accent,
                        background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.22), rgba(255,255,255,0.08) 42%, rgba(0,0,0,0.18) 100%)`,
                      }}
                    >
                      {club.initials}
                    </div>
                  </div>

                  <a
                    href={buildClubRoute(club.region, club.slug)}
                    className="mt-auto inline-flex w-full items-center justify-center gap-3 bg-[#f6f1e8] px-6 py-4 text-base font-black uppercase tracking-[0.08em] text-black transition-transform hover:-translate-y-0.5"
                  >
                    Club Profile
                    <span aria-hidden="true" className="text-xl leading-none">›</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
