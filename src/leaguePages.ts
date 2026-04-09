export type LeagueKey = 'premiership' | 'central' | 'eastern' | 'northern' | 'western';
export type LeagueGender = 'men' | 'women';

export interface LeagueStandingRow {
  rank: number;
  team: string;
  played: number;
  won: number;
  lost: number;
  points: number;
}

export interface LeaguePageData {
  league: LeagueKey;
  gender: LeagueGender;
  title: string;
  subtitle: string;
  summary: string;
  accent: string;
  highlight: string;
  venue: string;
  season: string;
  standings: LeagueStandingRow[];
}

const leagueMeta: Record<LeagueKey, { title: string; subtitle: string; accent: string; venue: string; season: string }> = {
  premiership: {
    title: 'Premiership',
    subtitle: 'Top Flight Rugby',
    accent: '#f1cf75',
    venue: 'National League Venues',
    season: '2026 Championship',
  },
  central: {
    title: 'Central',
    subtitle: 'Central League Rugby',
    accent: '#ff8a3d',
    venue: 'Legends & Kings Park',
    season: '2026 Central Campaign',
  },
  eastern: {
    title: 'Eastern',
    subtitle: 'Eastern League Rugby',
    accent: '#4eb5ff',
    venue: 'Jinja & Elgon Corridor',
    season: '2026 Eastern Run',
  },
  northern: {
    title: 'Northern',
    subtitle: 'Northern League Rugby',
    accent: '#76d36a',
    venue: 'Gulu & Lira Grounds',
    season: '2026 Northern Contest',
  },
  western: {
    title: 'Western',
    subtitle: 'Western League Rugby',
    accent: '#d796ff',
    venue: 'Mbarara & Kasese Circuit',
    season: '2026 Western Race',
  },
};

const standingsByLeague: Record<LeagueKey, Record<LeagueGender, LeagueStandingRow[]>> = {
  premiership: {
    men: [
      { rank: 1, team: 'Kobs RFC', played: 12, won: 10, lost: 1, points: 71 },
      { rank: 2, team: 'Eagles RFC', played: 12, won: 9, lost: 1, points: 59 },
      { rank: 3, team: 'Pirates RFC', played: 12, won: 8, lost: 1, points: 55 },
      { rank: 4, team: 'Hippos RFC', played: 12, won: 8, lost: 3, points: 52 },
      { rank: 5, team: 'Buffaloes', played: 12, won: 7, lost: 4, points: 46 },
    ],
    women: [
      { rank: 1, team: 'Ewes', played: 6, won: 5, lost: 1, points: 16 },
      { rank: 2, team: 'She Wolves', played: 6, won: 5, lost: 1, points: 16 },
      { rank: 3, team: 'Thunderbirds', played: 6, won: 4, lost: 1, points: 14 },
      { rank: 4, team: 'Impis', played: 6, won: 3, lost: 2, points: 10 },
      { rank: 5, team: 'Black Pearls', played: 6, won: 3, lost: 1, points: 12 },
    ],
  },
  central: {
    men: [
      { rank: 1, team: 'Kobs RFC', played: 10, won: 8, lost: 1, points: 38 },
      { rank: 2, team: 'Eagles RFC', played: 10, won: 7, lost: 2, points: 34 },
      { rank: 3, team: 'Pirates RFC', played: 10, won: 6, lost: 2, points: 31 },
      { rank: 4, team: 'Kyadondo', played: 10, won: 5, lost: 4, points: 24 },
      { rank: 5, team: 'Makers', played: 10, won: 3, lost: 6, points: 17 },
    ],
    women: [
      { rank: 1, team: 'Ewes', played: 8, won: 7, lost: 1, points: 29 },
      { rank: 2, team: 'She Wolves', played: 8, won: 6, lost: 2, points: 26 },
      { rank: 3, team: 'Thunderbirds', played: 8, won: 5, lost: 3, points: 22 },
      { rank: 4, team: 'Impis', played: 8, won: 4, lost: 4, points: 18 },
      { rank: 5, team: 'Panthers', played: 8, won: 2, lost: 6, points: 10 },
    ],
  },
  eastern: {
    men: [
      { rank: 1, team: 'Walukuba', played: 10, won: 8, lost: 1, points: 41 },
      { rank: 2, team: 'Jinja Hippos II', played: 10, won: 7, lost: 2, points: 37 },
      { rank: 3, team: 'Mongers', played: 10, won: 6, lost: 3, points: 33 },
      { rank: 4, team: 'Elgon Wolves', played: 10, won: 4, lost: 4, points: 26 },
      { rank: 5, team: 'Busoga Select', played: 10, won: 3, lost: 6, points: 18 },
    ],
    women: [
      { rank: 1, team: 'Jinja Queens', played: 6, won: 5, lost: 1, points: 15 },
      { rank: 2, team: 'Walukuba Ladies', played: 6, won: 4, lost: 1, points: 13 },
      { rank: 3, team: 'Mongers Ladies', played: 6, won: 3, lost: 2, points: 10 },
      { rank: 4, team: 'Elgon Queens', played: 6, won: 2, lost: 4, points: 6 },
      { rank: 5, team: 'Busoga Sisters', played: 6, won: 1, lost: 5, points: 4 },
    ],
  },
  northern: {
    men: [
      { rank: 1, team: 'Gulu City', played: 8, won: 6, lost: 1, points: 29 },
      { rank: 2, team: 'Lira Bulls', played: 8, won: 5, lost: 2, points: 24 },
      { rank: 3, team: 'Arua Rhinos', played: 8, won: 3, lost: 3, points: 19 },
      { rank: 4, team: 'Kitgum Giants', played: 8, won: 2, lost: 6, points: 12 },
      { rank: 5, team: 'Karamoja Stallions', played: 8, won: 1, lost: 7, points: 7 },
    ],
    women: [
      { rank: 1, team: 'Gulu Queens', played: 5, won: 4, lost: 1, points: 12 },
      { rank: 2, team: 'Lira Ladies', played: 5, won: 3, lost: 1, points: 10 },
      { rank: 3, team: 'Arua Queens', played: 5, won: 2, lost: 2, points: 7 },
      { rank: 4, team: 'Kitgum Sisters', played: 5, won: 1, lost: 4, points: 3 },
      { rank: 5, team: 'Acholi Roses', played: 5, won: 1, lost: 4, points: 3 },
    ],
  },
  western: {
    men: [
      { rank: 1, team: 'Buffaloes West', played: 9, won: 7, lost: 1, points: 35 },
      { rank: 2, team: 'Mbarara Hawks', played: 9, won: 6, lost: 2, points: 31 },
      { rank: 3, team: 'Kasese Select', played: 9, won: 4, lost: 3, points: 24 },
      { rank: 4, team: 'Fort Portal', played: 9, won: 2, lost: 5, points: 16 },
      { rank: 5, team: 'Kigezi Highlanders', played: 9, won: 2, lost: 6, points: 14 },
    ],
    women: [
      { rank: 1, team: 'Buffaloes Ladies', played: 5, won: 4, lost: 1, points: 12 },
      { rank: 2, team: 'Mbarara Queens', played: 5, won: 3, lost: 1, points: 10 },
      { rank: 3, team: 'Kasese Ladies', played: 5, won: 2, lost: 2, points: 7 },
      { rank: 4, team: 'Fort Portal Women', played: 5, won: 1, lost: 4, points: 3 },
      { rank: 5, team: 'Ankole Queens', played: 5, won: 1, lost: 4, points: 3 },
    ],
  },
};

export const buildLeagueRoute = (league: LeagueKey, gender: LeagueGender) => `#/leagues/${league}/${gender}`;

export const leagueMenuLinks = (Object.keys(leagueMeta) as LeagueKey[]).map((league) => ({
  label: leagueMeta[league].title,
  href: buildLeagueRoute(league, 'men'),
})) as readonly { label: string; href: string }[];

export const getLeaguePage = (routeHash: string): LeaguePageData | null => {
  const match = routeHash.match(/^#\/leagues\/([^/]+)\/([^/]+)$/);
  if (!match) {
    return null;
  }

  const [, rawLeague, rawGender] = match;
  if (!(['premiership', 'central', 'eastern', 'northern', 'western'] as string[]).includes(rawLeague)) {
    return null;
  }
  if (!(['men', 'women'] as string[]).includes(rawGender)) {
    return null;
  }

  const league = rawLeague as LeagueKey;
  const gender = rawGender as LeagueGender;
  const meta = leagueMeta[league];

  return {
    league,
    gender,
    title: `${meta.title} ${gender === 'men' ? 'Men' : 'Women'}`,
    subtitle: meta.subtitle,
    summary: `${meta.title} ${gender} league coverage with standings, contenders, and season notes for Rugby in Uganda.`,
    accent: meta.accent,
    highlight: gender === 'men' ? 'Title Race' : 'Championship Push',
    venue: meta.venue,
    season: meta.season,
    standings: standingsByLeague[league][gender],
  };
};
