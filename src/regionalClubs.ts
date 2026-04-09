export interface RegionalClub {
  name: string;
  initials: string;
  accent: string;
  background: string;
  region: string;
  slug: string;
  stadium: string;
  founded: string;
  website: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    x: string;
  };
  form: string[];
  headline: string;
  story: string;
  fixtures: { round: string; opponent: string; venue: string; date: string }[];
  squad: string[];
  statistics: { label: string; value: string }[];
}

const slugify = (value: string) => value.toLowerCase().replace(/&/g, 'and').replace(/\s+/g, '-');

const createClub = (
  region: string,
  name: string,
  initials: string,
  accent: string,
  background: string,
  stadium: string,
  founded: string,
  headline: string,
): RegionalClub => ({
  name,
  initials,
  accent,
  background,
  region,
  slug: slugify(name),
  stadium,
  founded,
  website: `https://rugbyinuganda.com/clubs/${slugify(name)}`,
  socialLinks: {
    facebook: `https://facebook.com/${slugify(name)}`,
    instagram: `https://instagram.com/${slugify(name)}`,
    x: `https://x.com/${slugify(name)}`,
  },
  form: ['W', 'W', 'L'],
  headline,
  story: `${name} carries a bold identity inside ${region.toLowerCase()} rugby, with matchday energy, club culture, and a growing supporter base built around community rugby.`,
  fixtures: [
    { round: 'Next Match', opponent: 'Regional Select', venue: stadium, date: '18 Apr 2026' },
    { round: 'Upcoming', opponent: 'City XV', venue: 'Away', date: '25 Apr 2026' },
    { round: 'Upcoming', opponent: 'District RFC', venue: stadium, date: '02 May 2026' },
  ],
  squad: ['Captain', 'Half Back', 'Centre', 'Back Three', 'Forward Leader', 'Impact Finisher'],
  statistics: [
    { label: 'Home Wins', value: '8' },
    { label: 'Tries', value: '21' },
    { label: 'Points', value: '142' },
  ],
});

export const regionalClubsByRegion: Record<string, RegionalClub[]> = {
  Central: [
    createClub('Central', 'Kobs Rugby', 'KR', '#1c4fb7', 'linear-gradient(180deg,#3556a8 0%,#24396e 100%)', 'Legends Rugby Grounds', '1970', 'Kobs Rugby sharpen their edge for another high-tempo stretch in the Central region.'),
    createClub('Central', 'Heathens Rugby', 'HR', '#d6a327', 'linear-gradient(180deg,#6c5812 0%,#382b08 100%)', 'Kyadondo Rugby Club', '1999', 'Heathens Rugby bring controlled power and a big-match identity to every weekend.'),
    createClub('Central', 'Pirates Rugby', 'PR', '#cf2e3f', 'linear-gradient(180deg,#81263a 0%,#41131e 100%)', 'Kings Park Arena', '2012', 'Pirates Rugby keep the pressure high with a fearless attacking rhythm.'),
    createClub('Central', 'Eagles Rugby', 'ER', '#ef6a2e', 'linear-gradient(180deg,#9f4f24 0%,#4e2412 100%)', 'Kings Park East', '2010', 'Eagles Rugby continue to build around sharp transitions and fast wide play.'),
    createClub('Central', 'Rhinos Rugby', 'RR', '#49a55d', 'linear-gradient(180deg,#2e7540 0%,#173a21 100%)', 'Legends Annex', '2015', 'Rhinos Rugby stay competitive through effort, collisions, and field position.'),
    createClub('Central', 'Rams Rugby', 'RA', '#7f59c9', 'linear-gradient(180deg,#5d43a8 0%,#2f2355 100%)', 'Makerere Grounds', '2013', 'Rams Rugby keep developing a brave young core with direct intent.'),
    createClub('Central', 'Warriors Rugby', 'WR', '#d9d8d2', 'linear-gradient(180deg,#5a5a57 0%,#2d2d2c 100%)', 'Legends Rugby Grounds', '2011', 'Warriors Rugby balance patient build-up with moments of direct punch.'),
    createClub('Central', 'Impis Rugby', 'IR', '#ff7a41', 'linear-gradient(180deg,#9c4d28 0%,#4a2312 100%)', 'Makerere Rugby Arena', '2014', 'Impis Rugby thrive in hard contests and quick swings of momentum.'),
  ],
  Northern: [
    createClub('Northern', 'Gulu City Rugby', 'GC', '#60b35f', 'linear-gradient(180deg,#427f41 0%,#203f20 100%)', 'Gulu Main Grounds', '2016', 'Gulu City Rugby continue to grow their profile with disciplined regional performances.'),
    createClub('Northern', 'Lira Bulls', 'LB', '#d1b34d', 'linear-gradient(180deg,#72611e 0%,#3a300f 100%)', 'Lira Sports Park', '2018', 'Lira Bulls bring physical edge and committed support into every fixture.'),
    createClub('Northern', 'Arua Rhinos', 'AR', '#ca4a4a', 'linear-gradient(180deg,#7e3131 0%,#3d1818 100%)', 'Arua Community Grounds', '2017', 'Arua Rhinos carry real punch when the contest turns direct.'),
    createClub('Northern', 'Kitgum Giants', 'KG', '#7398ff', 'linear-gradient(180deg,#445d9f 0%,#202c4c 100%)', 'Kitgum Rugby Field', '2019', 'Kitgum Giants are building a resilient identity around work rate and contact.'),
  ],
  Eastern: [
    createClub('Eastern', 'Walukuba Rugby', 'WR', '#2f7cff', 'linear-gradient(180deg,#3258a3 0%,#1b2d57 100%)', 'Walukuba Stadium', '2008', 'Walukuba Rugby remain one of the sharpest names in the Eastern corridor.'),
    createClub('Eastern', 'Jinja Hippos II', 'JH', '#38b485', 'linear-gradient(180deg,#287c60 0%,#153d30 100%)', 'Jinja Recreation Park', '2013', 'Jinja Hippos II keep producing energy, pace, and a brave attacking mindset.'),
    createClub('Eastern', 'Mongers Rugby', 'MR', '#f07f36', 'linear-gradient(180deg,#9a5328 0%,#4d2813 100%)', 'Mongers Arena', '2011', 'Mongers Rugby stay dangerous whenever the tempo rises.'),
    createClub('Eastern', 'Elgon Wolves', 'EW', '#cfd5db', 'linear-gradient(180deg,#5d6770 0%,#2a2f35 100%)', 'Mbale Rugby Grounds', '2018', 'Elgon Wolves bring grit and strong regional identity into every round.'),
  ],
  Western: [
    createClub('Western', 'Buffaloes West', 'BW', '#b58f41', 'linear-gradient(180deg,#75612e 0%,#3a3017 100%)', 'Western Buffalo Park', '2012', 'Buffaloes West keep their rugby direct, physical, and crowd-driven.'),
    createClub('Western', 'Mbarara Hawks', 'MH', '#c24040', 'linear-gradient(180deg,#7d2c2c 0%,#3a1515 100%)', 'Mbarara Show Grounds', '2014', 'Mbarara Hawks continue to turn strong home support into confident performances.'),
    createClub('Western', 'Kasese Select', 'KS', '#4b9ed2', 'linear-gradient(180deg,#396984 0%,#1c3340 100%)', 'Kasese Community Field', '2019', 'Kasese Select keep showing ambition with every new outing.'),
    createClub('Western', 'Fort Portal Rugby', 'FP', '#8b69d6', 'linear-gradient(180deg,#5c4792 0%,#2f234a 100%)', 'Fort Portal Sports Ground', '2016', 'Fort Portal Rugby bring movement and intent whenever they hit the front foot.'),
  ],
  Schools: [
    createClub('Schools', 'Kings College Budo', 'KB', '#f0d265', 'linear-gradient(180deg,#756721 0%,#3a330f 100%)', 'Budo Main Pitch', '1906', 'Kings College Budo continue to shape youth rugby culture with serious ambition.'),
    createClub('Schools', 'Namilyango College', 'NC', '#4c7ad6', 'linear-gradient(180deg,#33508d 0%,#182646 100%)', 'Namilyango Grounds', '1902', 'Namilyango College carry tradition and matchday intensity into every school fixture.'),
    createClub('Schools', 'St Marys Kisubi', 'SK', '#d04b4b', 'linear-gradient(180deg,#7f2f2f 0%,#3d1717 100%)', 'Kisubi School Grounds', '1906', 'St Marys Kisubi keep youth rugby exciting with bold, expressive play.'),
    createClub('Schools', 'Jinja SS Rugby', 'JS', '#4db87a', 'linear-gradient(180deg,#2d7a4d 0%,#173d27 100%)', 'Jinja SS Field', '2011', 'Jinja SS Rugby keep adding fresh energy to the schools pathway.'),
  ],
  'National Team': [
    createClub('National Team', 'Uganda Cranes 15s', 'U15', '#d6a327', 'linear-gradient(180deg,#6d5c1d 0%,#342b0d 100%)', 'National Rugby Stadium', '1991', 'Uganda Cranes 15s keep flying the national flag with power and intensity.'),
    createClub('National Team', 'Uganda Sevens', 'U7', '#cf3a3a', 'linear-gradient(180deg,#7c2626 0%,#3b1212 100%)', 'National Rugby Stadium', '2006', 'Uganda Sevens keep chasing speed, space, and tournament impact.'),
    createClub('National Team', 'Lady Cranes', 'LC', '#3f88ff', 'linear-gradient(180deg,#315ba0 0%,#172c4f 100%)', 'National Rugby Stadium', '2004', 'Lady Cranes continue to build a powerful national identity through performance and belief.'),
    createClub('National Team', 'Rugby Cranes Dev', 'RD', '#53b66d', 'linear-gradient(180deg,#2f7a46 0%,#173c22 100%)', 'High Performance Centre', '2018', 'Rugby Cranes Dev keep strengthening the next wave of national talent.'),
  ],
};

export const allRegionalClubs = Object.values(regionalClubsByRegion).flat();

export const findRegionalClub = (regionSlug: string, clubSlug: string) =>
  allRegionalClubs.find((club) => slugify(club.region) === regionSlug && club.slug === clubSlug);

export const buildClubRoute = (region: string, clubSlug: string, tab: string = 'news') =>
  `#/clubs/${slugify(region)}/${clubSlug}/${tab}`;
