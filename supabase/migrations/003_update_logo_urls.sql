-- 003_update_logo_urls.sql
-- Sets logo_url for each seeded club using football-data.org CDN (matched by name, not id)

UPDATE clubs SET logo_url = 'https://crests.football-data.org/86.png'  WHERE name = 'Real Madrid';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/81.png'  WHERE name = 'Barcelona';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/66.png'  WHERE name = 'Manchester United';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/65.png'  WHERE name = 'Manchester City';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/64.png'  WHERE name = 'Liverpool';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/61.png'  WHERE name = 'Chelsea';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/57.png'  WHERE name = 'Arsenal';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/5.png'   WHERE name = 'Bayern Munich';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/4.png'   WHERE name = 'Borussia Dortmund';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/109.png' WHERE name = 'Juventus';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/98.png'  WHERE name = 'AC Milan';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/108.png' WHERE name = 'Inter Milan';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/524.png' WHERE name = 'Paris Saint-Germain';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/78.png'  WHERE name = 'Atletico Madrid';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/73.png'  WHERE name = 'Tottenham Hotspur';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/100.png' WHERE name = 'AS Roma';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/113.png' WHERE name = 'Napoli';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/559.png' WHERE name = 'Sevilla';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/678.png' WHERE name = 'Ajax';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/503.png' WHERE name = 'Porto';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/498.png' WHERE name = 'Benfica';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/338.png' WHERE name = 'Leicester City';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/563.png' WHERE name = 'West Ham United';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/62.png'  WHERE name = 'Everton';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/67.png'  WHERE name = 'Newcastle United';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/58.png'  WHERE name = 'Aston Villa';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/76.png'  WHERE name = 'Wolves';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/523.png' WHERE name = 'Lyon';
UPDATE clubs SET logo_url = 'https://crests.football-data.org/548.png' WHERE name = 'Monaco';
