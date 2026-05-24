-- ============================================================
-- Logo URLs matched exactly to club names in migration 006
-- Source: football-data.org CDN (https://crests.football-data.org/{id}.png)
-- Covers ~99 of 138 clubs (72%) — Saudi, MLS, Argentina, Brazil,
-- Belgium, and some smaller clubs have no reliable crest IDs.
-- ============================================================

-- ── Premier League (20/20) ──────────────────────────────────
UPDATE clubs SET logo_url = 'https://crests.football-data.org/57.png'   WHERE name = 'Arsenal';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/58.png'   WHERE name = 'Aston Villa';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/1044.png' WHERE name = 'Bournemouth';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/402.png'  WHERE name = 'Brentford';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/397.png'  WHERE name = 'Brighton';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/61.png'   WHERE name = 'Chelsea';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/354.png'  WHERE name = 'Crystal Palace';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/62.png'   WHERE name = 'Everton';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/63.png'   WHERE name = 'Fulham';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/339.png'  WHERE name = 'Ipswich Town';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/338.png'  WHERE name = 'Leicester City';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/64.png'   WHERE name = 'Liverpool';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/65.png'   WHERE name = 'Manchester City';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/66.png'   WHERE name = 'Manchester United';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/67.png'   WHERE name = 'Newcastle United';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/351.png'  WHERE name = 'Nottingham Forest';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/340.png'  WHERE name = 'Southampton';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/73.png'   WHERE name = 'Tottenham Hotspur';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/563.png'  WHERE name = 'West Ham United';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/76.png'   WHERE name = 'Wolverhampton Wanderers';

-- ── La Liga (18/20 — skipping Valladolid, Leganes) ─────────
UPDATE clubs SET logo_url = 'https://crests.football-data.org/86.png'   WHERE name = 'Real Madrid';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/81.png'   WHERE name = 'Barcelona';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/78.png'   WHERE name = 'Atletico Madrid';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/559.png'  WHERE name = 'Sevilla';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/95.png'   WHERE name = 'Valencia';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/90.png'   WHERE name = 'Real Betis';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/92.png'   WHERE name = 'Real Sociedad';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/94.png'   WHERE name = 'Villarreal';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/77.png'   WHERE name = 'Athletic Bilbao';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/558.png'  WHERE name = 'Celta Vigo';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/82.png'   WHERE name = 'Espanyol';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/83.png'   WHERE name = 'Getafe';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/87.png'   WHERE name = 'Osasuna';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/84.png'   WHERE name = 'Mallorca';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/88.png'   WHERE name = 'Rayo Vallecano';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/298.png'  WHERE name = 'Girona';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/275.png'  WHERE name = 'Las Palmas';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/264.png'  WHERE name = 'Alaves';

-- ── Serie A (18/20 — skipping Monza, Como) ─────────────────
UPDATE clubs SET logo_url = 'https://crests.football-data.org/109.png'  WHERE name = 'Juventus';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/98.png'   WHERE name = 'AC Milan';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/108.png'  WHERE name = 'Inter Milan';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/100.png'  WHERE name = 'AS Roma';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/113.png'  WHERE name = 'Napoli';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/110.png'  WHERE name = 'Lazio';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/99.png'   WHERE name = 'Fiorentina';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/102.png'  WHERE name = 'Atalanta';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/103.png'  WHERE name = 'Bologna';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/586.png'  WHERE name = 'Torino';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/115.png'  WHERE name = 'Udinese';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/471.png'  WHERE name = 'Sassuolo';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/445.png'  WHERE name = 'Sampdoria';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/107.png'  WHERE name = 'Genoa';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/104.png'  WHERE name = 'Cagliari';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/450.png'  WHERE name = 'Hellas Verona';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/448.png'  WHERE name = 'Parma';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/106.png'  WHERE name = 'Empoli';

-- ── Bundesliga (17/18 — skipping Heidenheim) ───────────────
UPDATE clubs SET logo_url = 'https://crests.football-data.org/5.png'    WHERE name = 'Bayern Munich';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/4.png'    WHERE name = 'Borussia Dortmund';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/721.png'  WHERE name = 'RB Leipzig';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/3.png'    WHERE name = 'Bayer Leverkusen';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/19.png'   WHERE name = 'Eintracht Frankfurt';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/10.png'   WHERE name = 'VfB Stuttgart';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/11.png'   WHERE name = 'Wolfsburg';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/18.png'   WHERE name = 'Borussia Monchengladbach';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/12.png'   WHERE name = 'Werder Bremen';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/17.png'   WHERE name = 'Freiburg';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/533.png'  WHERE name = 'Hoffenheim';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/33.png'   WHERE name = 'Mainz 05';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/16.png'   WHERE name = 'Augsburg';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/28.png'   WHERE name = 'Union Berlin';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/1.png'    WHERE name = 'FC Koln';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/25.png'   WHERE name = 'Hertha Berlin';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/6.png'    WHERE name = 'Schalke 04';

-- ── Ligue 1 (16/18 — skipping Le Havre, Auxerre) ───────────
UPDATE clubs SET logo_url = 'https://crests.football-data.org/524.png'  WHERE name = 'Paris Saint-Germain';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/548.png'  WHERE name = 'Monaco';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/523.png'  WHERE name = 'Lyon';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/516.png'  WHERE name = 'Marseille';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/521.png'  WHERE name = 'Lille';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/522.png'  WHERE name = 'Nice';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/529.png'  WHERE name = 'Rennes';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/546.png'  WHERE name = 'Lens';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/576.png'  WHERE name = 'Strasbourg';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/543.png'  WHERE name = 'Nantes';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/527.png'  WHERE name = 'Montpellier';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/537.png'  WHERE name = 'Toulouse';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/531.png'  WHERE name = 'Reims';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/518.png'  WHERE name = 'Brest';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/515.png'  WHERE name = 'Angers';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/532.png'  WHERE name = 'Saint-Etienne';

-- ── Portugal (2/5 — skipping Sporting CP, Braga, Vitoria de Guimaraes) ──
UPDATE clubs SET logo_url = 'https://crests.football-data.org/498.png'  WHERE name = 'Benfica';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/503.png'  WHERE name = 'Porto';

-- ── Eredivisie (3/3) ────────────────────────────────────────
UPDATE clubs SET logo_url = 'https://crests.football-data.org/678.png'  WHERE name = 'Ajax';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/674.png'  WHERE name = 'PSV Eindhoven';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/675.png'  WHERE name = 'Feyenoord';

-- ── Scottish Premiership (2/5 — skipping Aberdeen, Hearts, Hibernian) ──
UPDATE clubs SET logo_url = 'https://crests.football-data.org/732.png'  WHERE name = 'Celtic';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/733.png'  WHERE name = 'Rangers';

-- ── Turkish Super Lig (3/3) ─────────────────────────────────
UPDATE clubs SET logo_url = 'https://crests.football-data.org/442.png'  WHERE name = 'Galatasaray';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/443.png'  WHERE name = 'Fenerbahce';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/444.png'  WHERE name = 'Besiktas';

-- Clubs with no reliable football-data.org crest ID (39 clubs):
-- Saudi Pro League: Al-Hilal, Al-Nassr, Al-Ahli, Al-Ittihad, Al-Shabab
-- MLS: Inter Miami, LA Galaxy, LAFC, New York Red Bulls, Atlanta United, Montreal Impact
-- Belgian Pro League: Club Brugge, Anderlecht
-- Argentine Primera: Boca Juniors, River Plate
-- Brazilian Serie A: Flamengo, Santos, Sao Paulo
-- Scottish (others): Aberdeen, Hearts, Hibernian
-- Portuguese (others): Sporting CP, Braga, Vitoria de Guimaraes
-- Serie A (new): Monza, Como
-- Bundesliga (new): Heidenheim
-- Ligue 1 (others): Le Havre, Auxerre
-- La Liga (others): Valladolid, Leganes
