// Maps club name → football-data.org crest ID.
// Names match migration 006 exactly so frontend fallback aligns with DB data.
// Used when logo_url is not set in the DB (clubs not covered by migration 007).
const CREST_BY_NAME: Record<string, number> = {
  // ── Premier League ────────────────────────────────────────
  'Arsenal':                        57,
  'Aston Villa':                    58,
  'Bournemouth':                  1044,
  'Brentford':                     402,
  'Brighton':                      397,
  'Chelsea':                        61,
  'Crystal Palace':                354,
  'Everton':                        62,
  'Fulham':                         63,
  'Ipswich Town':                  339,
  'Leicester City':                338,
  'Liverpool':                      64,
  'Manchester City':                65,
  'Manchester United':              66,
  'Newcastle United':               67,
  'Nottingham Forest':             351,
  'Southampton':                   340,
  'Tottenham Hotspur':              73,
  'West Ham United':               563,
  'Wolverhampton Wanderers':        76,

  // ── La Liga ───────────────────────────────────────────────
  'Real Madrid':                    86,
  'Barcelona':                      81,
  'Atletico Madrid':                78,
  'Sevilla':                       559,
  'Valencia':                       95,
  'Real Betis':                     90,
  'Real Sociedad':                  92,
  'Villarreal':                     94,
  'Athletic Bilbao':                77,
  'Celta Vigo':                    558,
  'Espanyol':                       82,
  'Getafe':                         83,
  'Osasuna':                        87,
  'Mallorca':                       84,
  'Rayo Vallecano':                 88,
  'Girona':                        298,
  'Las Palmas':                    275,
  'Alaves':                        264,

  // ── Serie A ───────────────────────────────────────────────
  'Juventus':                      109,
  'AC Milan':                       98,
  'Inter Milan':                   108,
  'AS Roma':                       100,
  'Napoli':                        113,
  'Lazio':                         110,
  'Fiorentina':                     99,
  'Atalanta':                      102,
  'Bologna':                       103,
  'Torino':                        586,
  'Udinese':                       115,
  'Sassuolo':                      471,
  'Sampdoria':                     445,
  'Genoa':                         107,
  'Cagliari':                      104,
  'Hellas Verona':                 450,
  'Parma':                         448,
  'Empoli':                        106,

  // ── Bundesliga ────────────────────────────────────────────
  'Bayern Munich':                   5,
  'Borussia Dortmund':               4,
  'RB Leipzig':                    721,
  'Bayer Leverkusen':                3,
  'Eintracht Frankfurt':            19,
  'VfB Stuttgart':                  10,
  'Wolfsburg':                      11,
  'Borussia Monchengladbach':        18,
  'Werder Bremen':                  12,
  'Freiburg':                       17,
  'Hoffenheim':                    533,
  'Mainz 05':                       33,
  'Augsburg':                       16,
  'Union Berlin':                   28,
  'FC Koln':                         1,
  'Hertha Berlin':                  25,
  'Schalke 04':                      6,

  // ── Ligue 1 ───────────────────────────────────────────────
  'Paris Saint-Germain':           524,
  'Monaco':                        548,
  'Lyon':                          523,
  'Marseille':                     516,
  'Lille':                         521,
  'Nice':                          522,
  'Rennes':                        529,
  'Lens':                          546,
  'Strasbourg':                    576,
  'Nantes':                        543,
  'Montpellier':                   527,
  'Toulouse':                      537,
  'Reims':                         531,
  'Brest':                         518,
  'Angers':                        515,
  'Saint-Etienne':                 532,

  // ── Portugal ──────────────────────────────────────────────
  'Benfica':                       498,
  'Porto':                         503,

  // ── Eredivisie ────────────────────────────────────────────
  'Ajax':                          678,
  'PSV Eindhoven':                 674,
  'Feyenoord':                     675,

  // ── Scottish Premiership ──────────────────────────────────
  'Celtic':                        732,
  'Rangers':                       733,

  // ── Turkish Super Lig ─────────────────────────────────────
  'Galatasaray':                   442,
  'Fenerbahce':                    443,
  'Besiktas':                      444,
};

/** Returns a logo URL: DB value if present, otherwise football-data.org CDN, otherwise null. */
export function getCrestUrl(clubName: string, logoUrl: string | null): string | null {
  if (logoUrl) return logoUrl;
  const crestId = CREST_BY_NAME[clubName];
  return crestId ? `https://crests.football-data.org/${crestId}.png` : null;
}
