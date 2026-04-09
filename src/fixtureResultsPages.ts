export type FixtureDivisionKey = 'premiership' | 'central' | 'eastern' | 'northern' | 'western';
export type FixtureGender = 'men' | 'women';

export interface FixtureMatch {
  date: string;
  round: string;
  home: string;
  away: string;
  venue: string;
  status: 'upcoming' | 'completed';
  homeScore?: number;
  awayScore?: number;
}

export interface FixtureResultsPageData {
  division: FixtureDivisionKey;
  gender: FixtureGender;
  title: string;
  subtitle: string;
  accent: string;
  season: string;
  matches: FixtureMatch[];
}

const createSlate = (
  date: string,
  round: string,
  fixtures: Array<{
    home: string;
    away: string;
    venue: string;
    status: 'upcoming' | 'completed';
    homeScore?: number;
    awayScore?: number;
  }>,
): FixtureMatch[] =>
  fixtures.map((fixture) => ({
    date,
    round,
    ...fixture,
  }));

const divisionMeta: Record<FixtureDivisionKey, { title: string; subtitle: string; accent: string; season: string }> = {
  premiership: {
    title: 'Premiership',
    subtitle: 'Top Flight Fixtures',
    accent: '#ff7448',
    season: '2026 Premiership Calendar',
  },
  central: {
    title: 'Central',
    subtitle: 'Central Fixtures',
    accent: '#f1cf75',
    season: '2026 Central Calendar',
  },
  eastern: {
    title: 'Eastern',
    subtitle: 'Eastern Fixtures',
    accent: '#4eb5ff',
    season: '2026 Eastern Calendar',
  },
  northern: {
    title: 'Northern',
    subtitle: 'Northern Fixtures',
    accent: '#7ad66a',
    season: '2026 Northern Calendar',
  },
  western: {
    title: 'Western',
    subtitle: 'Western Fixtures',
    accent: '#d796ff',
    season: '2026 Western Calendar',
  },
};

const matchMap: Record<FixtureDivisionKey, Record<FixtureGender, FixtureMatch[]>> = {
  premiership: {
    men: [
      ...createSlate('2026-05-09', 'Round 8', [
        { home: 'Kobs RFC', away: 'Pirates RFC', venue: 'Legends Grounds', status: 'completed', homeScore: 29, awayScore: 18 },
        { home: 'Eagles RFC', away: 'Hippos RFC', venue: 'Kings Park', status: 'completed', homeScore: 31, awayScore: 22 },
        { home: 'Buffaloes', away: 'Jinja Hippos', venue: 'Kyadondo', status: 'completed', homeScore: 24, awayScore: 19 },
        { home: 'Mongers', away: 'Walukuba', venue: 'Entebbe Works', status: 'completed', homeScore: 17, awayScore: 20 },
        { home: 'Rams', away: 'Victoria Sharks', venue: 'Makerere', status: 'completed', homeScore: 27, awayScore: 14 },
        { home: 'Elgon Wolves', away: 'Lira Bulls', venue: 'Mbale', status: 'completed', homeScore: 16, awayScore: 13 },
      ]),
      ...createSlate('2026-05-24', 'Round 10', [
        { home: 'Buffaloes', away: 'Kobs RFC', venue: 'Kyadondo', status: 'upcoming' },
        { home: 'Pirates RFC', away: 'Eagles RFC', venue: 'Bweyogerere', status: 'upcoming' },
        { home: 'Hippos RFC', away: 'Mongers', venue: 'Dam Waters', status: 'upcoming' },
        { home: 'Walukuba', away: 'Jinja Hippos', venue: 'Jinja Railway', status: 'upcoming' },
        { home: 'Victoria Sharks', away: 'Rams', venue: 'Kings Park Annex', status: 'upcoming' },
        { home: 'Elgon Wolves', away: 'Lira Bulls', venue: 'Mbale', status: 'upcoming' },
      ]),
    ],
    women: [
      ...createSlate('2026-05-10', 'Round 6', [
        { home: 'Ewes', away: 'She Wolves', venue: 'Kings Park Arena', status: 'completed', homeScore: 24, awayScore: 19 },
        { home: 'Thunderbirds', away: 'Impis', venue: 'Makerere', status: 'completed', homeScore: 18, awayScore: 15 },
        { home: 'Black Pearls', away: 'Panthers', venue: 'Kyadondo Annex', status: 'completed', homeScore: 22, awayScore: 10 },
      ]),
      ...createSlate('2026-05-25', 'Round 8', [
        { home: 'Black Pearls', away: 'Ewes', venue: 'Kyadondo Annex', status: 'upcoming' },
        { home: 'She Wolves', away: 'Thunderbirds', venue: 'Kings Park', status: 'upcoming' },
        { home: 'Impis', away: 'Panthers', venue: 'Makerere Bowl', status: 'upcoming' },
      ]),
    ],
  },
  central: {
    men: [
      ...createSlate('2026-05-11', 'Central Round 5', [
        { home: 'Kobs RFC', away: 'Kyadondo', venue: 'Legends Grounds', status: 'completed', homeScore: 27, awayScore: 14 },
        { home: 'Eagles RFC', away: 'Makers', venue: 'Kings Park', status: 'completed', homeScore: 34, awayScore: 11 },
        { home: 'Pirates RFC', away: 'Rams', venue: 'Bweyogerere', status: 'completed', homeScore: 25, awayScore: 13 },
        { home: 'Panthers', away: 'Victoria Sharks', venue: 'Makerere', status: 'completed', homeScore: 19, awayScore: 21 },
        { home: 'Kyambogo', away: 'Warriors', venue: 'Kyambogo', status: 'completed', homeScore: 16, awayScore: 12 },
        { home: 'Grizzlies', away: 'Stallions', venue: 'MUBS', status: 'completed', homeScore: 20, awayScore: 18 },
      ]),
      ...createSlate('2026-05-26', 'Central Round 7', [
        { home: 'Pirates RFC', away: 'Kobs RFC', venue: 'Bweyogerere', status: 'upcoming' },
        { home: 'Kyadondo', away: 'Eagles RFC', venue: 'Kyadondo', status: 'upcoming' },
        { home: 'Makers', away: 'Rams', venue: 'Makerere', status: 'upcoming' },
        { home: 'Victoria Sharks', away: 'Panthers', venue: 'Kings Park Annex', status: 'upcoming' },
        { home: 'Warriors', away: 'Kyambogo', venue: 'Kyambogo', status: 'upcoming' },
        { home: 'Stallions', away: 'Grizzlies', venue: 'MUBS', status: 'upcoming' },
      ]),
    ],
    women: [
      ...createSlate('2026-05-12', 'Central Round 5', [
        { home: 'Ewes', away: 'Thunderbirds', venue: 'Kings Park Arena', status: 'completed', homeScore: 29, awayScore: 12 },
        { home: 'She Wolves', away: 'Impis', venue: 'Kings Park', status: 'completed', homeScore: 21, awayScore: 17 },
        { home: 'Panthers', away: 'Black Pearls', venue: 'Makerere', status: 'completed', homeScore: 11, awayScore: 23 },
      ]),
      ...createSlate('2026-05-27', 'Central Round 7', [
        { home: 'Panthers', away: 'Ewes', venue: 'Makerere', status: 'upcoming' },
        { home: 'Thunderbirds', away: 'She Wolves', venue: 'Makerere Bowl', status: 'upcoming' },
        { home: 'Impis', away: 'Black Pearls', venue: 'Legends Annex', status: 'upcoming' },
      ]),
    ],
  },
  eastern: {
    men: [
      ...createSlate('2026-05-08', 'Eastern Round 4', [
        { home: 'Walukuba', away: 'Mongers', venue: 'Jinja Railway', status: 'completed', homeScore: 22, awayScore: 16 },
        { home: 'Jinja Hippos II', away: 'Elgon Wolves', venue: 'Dam Waters B', status: 'completed', homeScore: 30, awayScore: 12 },
        { home: 'Busoga Select', away: 'Mbale City', venue: 'Iganga', status: 'completed', homeScore: 18, awayScore: 14 },
      ]),
      ...createSlate('2026-05-23', 'Eastern Round 6', [
        { home: 'Busoga Select', away: 'Walukuba', venue: 'Iganga', status: 'upcoming' },
        { home: 'Mongers', away: 'Jinja Hippos II', venue: 'Mbale', status: 'upcoming' },
        { home: 'Elgon Wolves', away: 'Mbale City', venue: 'Mbale', status: 'upcoming' },
      ]),
    ],
    women: [
      ...createSlate('2026-05-09', 'Eastern Round 4', [
        { home: 'Jinja Queens', away: 'Walukuba Ladies', venue: 'Jinja Arena', status: 'completed', homeScore: 19, awayScore: 10 },
        { home: 'Mongers Ladies', away: 'Elgon Queens', venue: 'Mbale', status: 'completed', homeScore: 17, awayScore: 13 },
        { home: 'Busoga Sisters', away: 'Eastern Stars', venue: 'Iganga', status: 'completed', homeScore: 14, awayScore: 12 },
      ]),
      ...createSlate('2026-05-24', 'Eastern Round 6', [
        { home: 'Walukuba Ladies', away: 'Mongers Ladies', venue: 'Jinja', status: 'upcoming' },
        { home: 'Elgon Queens', away: 'Jinja Queens', venue: 'Mbale', status: 'upcoming' },
        { home: 'Busoga Sisters', away: 'Eastern Stars', venue: 'Iganga', status: 'upcoming' },
      ]),
    ],
  },
  northern: {
    men: [
      ...createSlate('2026-05-07', 'Northern Round 4', [
        { home: 'Gulu City', away: 'Lira Bulls', venue: 'Gulu High', status: 'completed', homeScore: 20, awayScore: 18 },
        { home: 'Arua Rhinos', away: 'Kitgum Giants', venue: 'Arua Hill', status: 'completed', homeScore: 26, awayScore: 9 },
        { home: 'Karamoja Stallions', away: 'Acholi Warriors', venue: 'Moroto', status: 'completed', homeScore: 14, awayScore: 16 },
      ]),
      ...createSlate('2026-05-22', 'Northern Round 6', [
        { home: 'Karamoja Stallions', away: 'Gulu City', venue: 'Moroto', status: 'upcoming' },
        { home: 'Lira Bulls', away: 'Arua Rhinos', venue: 'Lira', status: 'upcoming' },
        { home: 'Kitgum Giants', away: 'Acholi Warriors', venue: 'Kitgum', status: 'upcoming' },
      ]),
    ],
    women: [
      ...createSlate('2026-05-08', 'Northern Round 4', [
        { home: 'Gulu Queens', away: 'Lira Ladies', venue: 'Gulu High', status: 'completed', homeScore: 15, awayScore: 8 },
        { home: 'Arua Queens', away: 'Kitgum Sisters', venue: 'Arua', status: 'completed', homeScore: 18, awayScore: 11 },
        { home: 'Acholi Roses', away: 'Karamoja Pearls', venue: 'Gulu', status: 'completed', homeScore: 16, awayScore: 10 },
      ]),
      ...createSlate('2026-05-23', 'Northern Round 6', [
        { home: 'Acholi Roses', away: 'Gulu Queens', venue: 'Gulu', status: 'upcoming' },
        { home: 'Lira Ladies', away: 'Arua Queens', venue: 'Lira', status: 'upcoming' },
        { home: 'Kitgum Sisters', away: 'Karamoja Pearls', venue: 'Kitgum', status: 'upcoming' },
      ]),
    ],
  },
  western: {
    men: [
      ...createSlate('2026-05-06', 'Western Round 4', [
        { home: 'Buffaloes West', away: 'Mbarara Hawks', venue: 'Mbarara Grounds', status: 'completed', homeScore: 24, awayScore: 21 },
        { home: 'Kasese Select', away: 'Fort Portal', venue: 'Kasese', status: 'completed', homeScore: 19, awayScore: 16 },
        { home: 'Kigezi Highlanders', away: 'Rwenzori Bulls', venue: 'Kabale', status: 'completed', homeScore: 14, awayScore: 11 },
      ]),
      ...createSlate('2026-05-21', 'Western Round 6', [
        { home: 'Kigezi Highlanders', away: 'Buffaloes West', venue: 'Kabale', status: 'upcoming' },
        { home: 'Mbarara Hawks', away: 'Kasese Select', venue: 'Mbarara', status: 'upcoming' },
        { home: 'Fort Portal', away: 'Rwenzori Bulls', venue: 'Fort Portal', status: 'upcoming' },
      ]),
    ],
    women: [
      ...createSlate('2026-05-07', 'Western Round 4', [
        { home: 'Buffaloes Ladies', away: 'Mbarara Queens', venue: 'Mbarara', status: 'completed', homeScore: 16, awayScore: 9 },
        { home: 'Kasese Ladies', away: 'Fort Portal Women', venue: 'Kasese', status: 'completed', homeScore: 13, awayScore: 10 },
        { home: 'Ankole Queens', away: 'Rwenzori Ladies', venue: 'Mbarara Annex', status: 'completed', homeScore: 18, awayScore: 12 },
      ]),
      ...createSlate('2026-05-22', 'Western Round 6', [
        { home: 'Ankole Queens', away: 'Buffaloes Ladies', venue: 'Mbarara Annex', status: 'upcoming' },
        { home: 'Mbarara Queens', away: 'Kasese Ladies', venue: 'Mbarara', status: 'upcoming' },
        { home: 'Fort Portal Women', away: 'Rwenzori Ladies', venue: 'Fort Portal', status: 'upcoming' },
      ]),
    ],
  },
};

export const buildFixtureResultsRoute = (division: FixtureDivisionKey, gender: FixtureGender) => `#/fixture-results/${division}/${gender}`;

export const fixtureResultsMenuLinks = [
  { label: 'Premiership', href: buildFixtureResultsRoute('premiership', 'men') },
  { label: 'Central', href: buildFixtureResultsRoute('central', 'men') },
  { label: 'Northern', href: buildFixtureResultsRoute('northern', 'men') },
  { label: 'Eastern', href: buildFixtureResultsRoute('eastern', 'men') },
  { label: 'Western', href: buildFixtureResultsRoute('western', 'men') },
] as const;

export const getFixtureResultsPage = (routeHash: string): FixtureResultsPageData | null => {
  const match = routeHash.match(/^#\/fixture-results\/([^/]+)\/([^/]+)$/);
  if (!match) {
    return null;
  }

  const [, rawDivision, rawGender] = match;
  if (!(['premiership', 'central', 'eastern', 'northern', 'western'] as string[]).includes(rawDivision)) {
    return null;
  }
  if (!(['men', 'women'] as string[]).includes(rawGender)) {
    return null;
  }

  const division = rawDivision as FixtureDivisionKey;
  const gender = rawGender as FixtureGender;
  const meta = divisionMeta[division];

  return {
    division,
    gender,
    title: `${meta.title} ${gender === 'men' ? 'Men' : 'Women'}`,
    subtitle: meta.subtitle,
    accent: meta.accent,
    season: meta.season,
    matches: matchMap[division][gender],
  };
};
