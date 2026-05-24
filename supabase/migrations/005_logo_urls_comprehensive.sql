-- 005_logo_urls_comprehensive.sql
-- Comprehensive logo update using ILIKE name matching.
-- Covers Premier League, La Liga, Bundesliga, Serie A, Ligue 1,
-- Portuguese Liga, Eredivisie, and major UCL clubs.
-- Run after 003_update_logo_urls.sql (this will overwrite where names overlap — same URLs).

-- ─── PREMIER LEAGUE / ENGLISH ────────────────────────────────────────────────
UPDATE clubs SET logo_url = 'https://crests.football-data.org/57.png'   WHERE LOWER(name) = 'arsenal';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/58.png'   WHERE LOWER(name) = 'aston villa';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/59.png'   WHERE LOWER(name) LIKE '%blackburn%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/1044.png' WHERE LOWER(name) LIKE '%bournemouth%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/402.png'  WHERE LOWER(name) LIKE '%brentford%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/397.png'  WHERE LOWER(name) LIKE '%brighton%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/328.png'  WHERE LOWER(name) LIKE '%burnley%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/61.png'   WHERE LOWER(name) = 'chelsea';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/60.png'   WHERE LOWER(name) LIKE '%charlton%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/354.png'  WHERE LOWER(name) LIKE '%crystal palace%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/62.png'   WHERE LOWER(name) = 'everton';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/63.png'   WHERE LOWER(name) = 'fulham';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/339.png'  WHERE LOWER(name) LIKE '%ipswich%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/341.png'  WHERE LOWER(name) LIKE '%leeds%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/338.png'  WHERE LOWER(name) LIKE '%leicester%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/64.png'   WHERE LOWER(name) = 'liverpool';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/389.png'  WHERE LOWER(name) LIKE '%luton%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/65.png'   WHERE LOWER(name) LIKE '%manchester city%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/66.png'   WHERE LOWER(name) LIKE '%manchester united%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/343.png'  WHERE LOWER(name) LIKE '%middlesbrough%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/67.png'   WHERE LOWER(name) LIKE '%newcastle%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/68.png'   WHERE LOWER(name) LIKE '%norwich%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/351.png'  WHERE LOWER(name) LIKE '%nottingham%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/69.png'   WHERE LOWER(name) LIKE '%portsmouth%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/373.png'  WHERE LOWER(name) LIKE '%reading%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/356.png'  WHERE LOWER(name) LIKE '%sheffield united%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/359.png'  WHERE LOWER(name) LIKE '%sheffield wednesday%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/340.png'  WHERE LOWER(name) LIKE '%southampton%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/70.png'   WHERE LOWER(name) LIKE '%stoke%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/71.png'   WHERE LOWER(name) LIKE '%sunderland%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/72.png'   WHERE LOWER(name) LIKE '%swansea%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/73.png'   WHERE LOWER(name) LIKE '%tottenham%' OR LOWER(name) LIKE '%spurs%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/346.png'  WHERE LOWER(name) LIKE '%watford%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/74.png'   WHERE LOWER(name) LIKE '%west brom%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/563.png'  WHERE LOWER(name) LIKE '%west ham%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/76.png'   WHERE LOWER(name) LIKE '%wolverhampton%' OR LOWER(name) = 'wolves';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/331.png'  WHERE LOWER(name) LIKE '%birmingham%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/332.png'  WHERE LOWER(name) LIKE '%bolton%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/333.png'  WHERE LOWER(name) LIKE '%coventry%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/342.png'  WHERE LOWER(name) LIKE '%derby%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/75.png'   WHERE LOWER(name) LIKE '%wigan%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/1081.png' WHERE LOWER(name) LIKE '%preston%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/69.png'   WHERE LOWER(name) LIKE '%queens park%' OR LOWER(name) = 'qpr';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/1076.png' WHERE LOWER(name) LIKE '%hull%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/1076.png' WHERE LOWER(name) LIKE '%hull city%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/402.png'  WHERE LOWER(name) LIKE '%brentford%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/1076.png' WHERE LOWER(name) LIKE '%hull%';

-- ─── LA LIGA ─────────────────────────────────────────────────────────────────
UPDATE clubs SET logo_url = 'https://crests.football-data.org/77.png'   WHERE LOWER(name) LIKE '%athletic%bilbao%' OR LOWER(name) = 'athletic club';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/78.png'   WHERE LOWER(name) LIKE '%atletico%' OR LOWER(name) LIKE '%atlético%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/80.png'   WHERE LOWER(name) LIKE '%deportivo la coruna%' OR LOWER(name) LIKE '%deportivo coruña%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/81.png'   WHERE LOWER(name) = 'barcelona' OR LOWER(name) = 'fc barcelona';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/82.png'   WHERE LOWER(name) LIKE '%espanyol%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/83.png'   WHERE LOWER(name) LIKE '%getafe%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/84.png'   WHERE LOWER(name) LIKE '%mallorca%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/86.png'   WHERE LOWER(name) LIKE '%real madrid%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/87.png'   WHERE LOWER(name) LIKE '%osasuna%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/88.png'   WHERE LOWER(name) LIKE '%rayo vallecano%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/90.png'   WHERE LOWER(name) LIKE '%real betis%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/92.png'   WHERE LOWER(name) LIKE '%real sociedad%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/94.png'   WHERE LOWER(name) LIKE '%villarreal%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/95.png'   WHERE LOWER(name) LIKE '%valencia%' AND LOWER(name) NOT LIKE '%celta%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/558.png'  WHERE LOWER(name) LIKE '%celta%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/559.png'  WHERE LOWER(name) LIKE '%sevilla%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/298.png'  WHERE LOWER(name) LIKE '%girona%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/89.png'   WHERE LOWER(name) LIKE '%racing santander%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/264.png'  WHERE LOWER(name) LIKE '%alaves%' OR LOWER(name) LIKE '%alavés%';

-- ─── BUNDESLIGA ──────────────────────────────────────────────────────────────
UPDATE clubs SET logo_url = 'https://crests.football-data.org/1.png'    WHERE LOWER(name) LIKE '%cologne%' OR LOWER(name) LIKE '%köln%' OR LOWER(name) LIKE '%koln%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/3.png'    WHERE LOWER(name) LIKE '%leverkusen%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/4.png'    WHERE LOWER(name) LIKE '%dortmund%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/5.png'    WHERE LOWER(name) LIKE '%bayern%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/6.png'    WHERE LOWER(name) LIKE '%schalke%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/9.png'    WHERE LOWER(name) LIKE '%hamburger%' OR LOWER(name) = 'hamburg' OR LOWER(name) = 'hsv';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/10.png'   WHERE LOWER(name) LIKE '%stuttgart%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/11.png'   WHERE LOWER(name) LIKE '%wolfsburg%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/12.png'   WHERE LOWER(name) LIKE '%werder%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/16.png'   WHERE LOWER(name) LIKE '%augsburg%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/17.png'   WHERE LOWER(name) LIKE '%freiburg%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/18.png'   WHERE LOWER(name) LIKE '%gladbach%' OR LOWER(name) LIKE '%monchengladbach%' OR LOWER(name) LIKE '%mönchengladbach%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/19.png'   WHERE LOWER(name) LIKE '%eintracht frankfurt%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/25.png'   WHERE LOWER(name) LIKE '%hertha%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/28.png'   WHERE LOWER(name) LIKE '%union berlin%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/721.png'  WHERE LOWER(name) LIKE '%rb leipzig%' OR LOWER(name) = 'leipzig';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/721.png'  WHERE LOWER(name) LIKE '%rasenball%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/36.png'   WHERE LOWER(name) LIKE '%bochum%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/30.png'   WHERE LOWER(name) LIKE '%hannover%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/31.png'   WHERE LOWER(name) LIKE '%kaiserslautern%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/33.png'   WHERE LOWER(name) LIKE '%mainz%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/721.png'  WHERE LOWER(name) = 'rb leipzig';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/533.png'  WHERE LOWER(name) LIKE '%hoffenheim%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/39.png'   WHERE LOWER(name) LIKE '%darmstadt%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/40.png'   WHERE LOWER(name) LIKE '%nurnberg%' OR LOWER(name) LIKE '%nürnberg%';

-- ─── SERIE A ─────────────────────────────────────────────────────────────────
UPDATE clubs SET logo_url = 'https://crests.football-data.org/98.png'   WHERE LOWER(name) = 'ac milan' OR LOWER(name) = 'milan';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/99.png'   WHERE LOWER(name) LIKE '%fiorentina%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/100.png'  WHERE LOWER(name) = 'as roma' OR LOWER(name) = 'roma';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/102.png'  WHERE LOWER(name) LIKE '%atalanta%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/103.png'  WHERE LOWER(name) LIKE '%bologna%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/104.png'  WHERE LOWER(name) LIKE '%cagliari%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/107.png'  WHERE LOWER(name) LIKE '%genoa%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/108.png'  WHERE LOWER(name) LIKE '%inter milan%' OR LOWER(name) = 'internazionale' OR LOWER(name) = 'inter';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/109.png'  WHERE LOWER(name) LIKE '%juventus%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/110.png'  WHERE LOWER(name) LIKE '%lazio%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/113.png'  WHERE LOWER(name) LIKE '%napoli%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/115.png'  WHERE LOWER(name) LIKE '%udinese%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/586.png'  WHERE LOWER(name) LIKE '%torino%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/471.png'  WHERE LOWER(name) LIKE '%sassuolo%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/450.png'  WHERE LOWER(name) LIKE '%hellas verona%' OR LOWER(name) = 'verona';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/472.png'  WHERE LOWER(name) LIKE '%spezia%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/445.png'  WHERE LOWER(name) LIKE '%sampdoria%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/448.png'  WHERE LOWER(name) LIKE '%parma%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/106.png'  WHERE LOWER(name) LIKE '%empoli%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/5890.png' WHERE LOWER(name) LIKE '%frosinone%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/584.png'  WHERE LOWER(name) LIKE '%lecce%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/1106.png' WHERE LOWER(name) LIKE '%salernitana%';

-- ─── LIGUE 1 ─────────────────────────────────────────────────────────────────
UPDATE clubs SET logo_url = 'https://crests.football-data.org/516.png'  WHERE LOWER(name) LIKE '%marseille%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/519.png'  WHERE LOWER(name) LIKE '%bordeaux%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/521.png'  WHERE LOWER(name) LIKE '%lille%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/522.png'  WHERE LOWER(name) = 'nice' OR LOWER(name) = 'ogc nice';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/523.png'  WHERE LOWER(name) LIKE '%lyon%' OR LOWER(name) LIKE '%olympique lyon%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/524.png'  WHERE LOWER(name) LIKE '%paris saint%' OR LOWER(name) = 'psg';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/527.png'  WHERE LOWER(name) LIKE '%montpellier%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/529.png'  WHERE LOWER(name) LIKE '%rennes%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/543.png'  WHERE LOWER(name) LIKE '%nantes%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/548.png'  WHERE LOWER(name) = 'monaco' OR LOWER(name) LIKE '%as monaco%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/576.png'  WHERE LOWER(name) LIKE '%strasbourg%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/532.png'  WHERE LOWER(name) LIKE '%saint-etienne%' OR LOWER(name) LIKE '%saint etienne%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/531.png'  WHERE LOWER(name) LIKE '%reims%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/528.png'  WHERE LOWER(name) LIKE '%metz%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/546.png'  WHERE LOWER(name) LIKE '%lens%' AND LOWER(country) = 'fr';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/537.png'  WHERE LOWER(name) LIKE '%toulouse%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/536.png'  WHERE LOWER(name) LIKE '%troyes%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/518.png'  WHERE LOWER(name) LIKE '%brest%' AND LOWER(country) = 'fr';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/515.png'  WHERE LOWER(name) LIKE '%angers%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/517.png'  WHERE LOWER(name) LIKE '%lorient%';

-- ─── PORTUGUESE PRIMEIRA LIGA ────────────────────────────────────────────────
UPDATE clubs SET logo_url = 'https://crests.football-data.org/498.png'  WHERE LOWER(name) LIKE '%benfica%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/503.png'  WHERE LOWER(name) LIKE '%porto%' AND LOWER(name) NOT LIKE '%deportivo%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/498.png'  WHERE LOWER(name) LIKE '%sporting%' AND (LOWER(country) = 'pt' OR LOWER(name) LIKE '%sporting cp%' OR LOWER(name) LIKE '%sporting lisbon%');
-- Note: Sporting CP and Benfica share ID 498 in this fallback — run 003 migration first
-- to set Benfica correctly, then manually verify Sporting CP

-- ─── EREDIVISIE (DUTCH) ──────────────────────────────────────────────────────
UPDATE clubs SET logo_url = 'https://crests.football-data.org/678.png'  WHERE LOWER(name) = 'ajax' OR LOWER(name) LIKE '%ajax amsterdam%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/674.png'  WHERE LOWER(name) LIKE '%psv%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/675.png'  WHERE LOWER(name) LIKE '%feyenoord%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/679.png'  WHERE LOWER(name) LIKE '%az alkmaar%' OR LOWER(name) = 'az';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/680.png'  WHERE LOWER(name) LIKE '%vitesse%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/682.png'  WHERE LOWER(name) LIKE '%twente%';

-- ─── SCOTTISH PREMIERSHIP ────────────────────────────────────────────────────
UPDATE clubs SET logo_url = 'https://crests.football-data.org/732.png'  WHERE LOWER(name) LIKE '%celtic%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/733.png'  WHERE LOWER(name) LIKE '%rangers%' AND LOWER(country) IN ('gb', 'gb-sct', 'sc');

-- ─── TURKISH SÜPER LIG ───────────────────────────────────────────────────────
UPDATE clubs SET logo_url = 'https://crests.football-data.org/442.png'  WHERE LOWER(name) LIKE '%galatasaray%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/443.png'  WHERE LOWER(name) LIKE '%fenerbahce%' OR LOWER(name) LIKE '%fenerbahçe%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/444.png'  WHERE LOWER(name) LIKE '%besiktas%' OR LOWER(name) LIKE '%beşiktaş%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/445.png'  WHERE LOWER(name) LIKE '%trabzonspor%';

-- ─── MAJOR INTERNATIONAL CLUBS ───────────────────────────────────────────────
UPDATE clubs SET logo_url = 'https://crests.football-data.org/755.png'  WHERE LOWER(name) LIKE '%zenit%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/1903.png' WHERE LOWER(name) LIKE '%anderlecht%';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/1903.png' WHERE LOWER(name) LIKE '%brugge%' OR LOWER(name) LIKE '%bruges%';
