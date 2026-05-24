-- 002_seed_data.sql
-- Starter data: 30 clubs, 30 players, career mappings, aliases

-- CLUBS
INSERT INTO clubs (id, name, country, league) VALUES
(1, 'Real Madrid', 'ES', 'La Liga'),
(2, 'Barcelona', 'ES', 'La Liga'),
(3, 'Manchester United', 'GB', 'Premier League'),
(4, 'Manchester City', 'GB', 'Premier League'),
(5, 'Liverpool', 'GB', 'Premier League'),
(6, 'Chelsea', 'GB', 'Premier League'),
(7, 'Arsenal', 'GB', 'Premier League'),
(8, 'Bayern Munich', 'DE', 'Bundesliga'),
(9, 'Borussia Dortmund', 'DE', 'Bundesliga'),
(10, 'Juventus', 'IT', 'Serie A'),
(11, 'AC Milan', 'IT', 'Serie A'),
(12, 'Inter Milan', 'IT', 'Serie A'),
(13, 'Paris Saint-Germain', 'FR', 'Ligue 1'),
(14, 'Atletico Madrid', 'ES', 'La Liga'),
(15, 'Tottenham Hotspur', 'GB', 'Premier League'),
(16, 'AS Roma', 'IT', 'Serie A'),
(17, 'Napoli', 'IT', 'Serie A'),
(18, 'Sevilla', 'ES', 'La Liga'),
(19, 'Ajax', 'NL', 'Eredivisie'),
(20, 'Porto', 'PT', 'Primeira Liga'),
(21, 'Benfica', 'PT', 'Primeira Liga'),
(22, 'Sporting CP', 'PT', 'Primeira Liga'),
(23, 'Leicester City', 'GB', 'Premier League'),
(24, 'West Ham United', 'GB', 'Premier League'),
(25, 'Everton', 'GB', 'Premier League'),
(26, 'Newcastle United', 'GB', 'Premier League'),
(27, 'Aston Villa', 'GB', 'Premier League'),
(28, 'Wolves', 'GB', 'Premier League'),
(29, 'Lyon', 'FR', 'Ligue 1'),
(30, 'Monaco', 'FR', 'Ligue 1')
ON CONFLICT DO NOTHING;

-- PLAYERS
INSERT INTO players (id, name, nationality) VALUES
(1, 'Cristiano Ronaldo', 'PT'),
(2, 'Lionel Messi', 'AR'),
(3, 'Neymar', 'BR'),
(4, 'Kylian Mbappe', 'FR'),
(5, 'Zlatan Ibrahimovic', 'SE'),
(6, 'Thierry Henry', 'FR'),
(7, 'David Beckham', 'GB'),
(8, 'Wayne Rooney', 'GB'),
(9, 'Luis Suarez', 'UY'),
(10, 'Robert Lewandowski', 'PL'),
(11, 'Eden Hazard', 'BE'),
(12, 'Gonzalo Higuain', 'AR'),
(13, 'Angel Di Maria', 'AR'),
(14, 'James Rodriguez', 'CO'),
(15, 'Cesc Fabregas', 'ES'),
(16, 'Robin van Persie', 'NL'),
(17, 'Fernando Torres', 'ES'),
(18, 'Samuel Eto''o', 'CM'),
(19, 'Carlos Tevez', 'AR'),
(20, 'Alexis Sanchez', 'CL'),
(21, 'Memphis Depay', 'NL'),
(22, 'Pierre-Emerick Aubameyang', 'GA'),
(23, 'Philippe Coutinho', 'BR'),
(24, 'Romelu Lukaku', 'BE'),
(25, 'Antoine Griezmann', 'FR'),
(26, 'Gareth Bale', 'GB'),
(27, 'Luka Modric', 'HR'),
(28, 'Toni Kroos', 'DE'),
(29, 'Raheem Sterling', 'GB'),
(30, 'Alvaro Morata', 'ES')
ON CONFLICT DO NOTHING;

-- PLAYER_CLUBS (career mappings)
INSERT INTO player_clubs (player_id, club_id) VALUES
-- Cristiano Ronaldo: Man Utd, Real Madrid, Juventus
(1, 3), (1, 1), (1, 10),
-- Messi: Barcelona, PSG
(2, 2), (2, 13),
-- Neymar: Barcelona, PSG
(3, 2), (3, 13),
-- Mbappe: Monaco, PSG, Real Madrid
(4, 30), (4, 13), (4, 1),
-- Ibrahimovic: Ajax, Juventus, Inter, Barcelona, AC Milan, PSG, Man Utd
(5, 19), (5, 10), (5, 12), (5, 2), (5, 11), (5, 13), (5, 3),
-- Henry: Monaco, Arsenal, Barcelona
(6, 30), (6, 7), (6, 2),
-- Beckham: Man Utd, Real Madrid, PSG
(7, 3), (7, 1), (7, 13),
-- Rooney: Everton, Man Utd
(8, 25), (8, 3),
-- Suarez: Ajax, Liverpool, Barcelona, Atletico Madrid
(9, 19), (9, 5), (9, 2), (9, 14),
-- Lewandowski: Dortmund, Bayern, Barcelona
(10, 9), (10, 8), (10, 2),
-- Hazard: Chelsea, Real Madrid
(11, 6), (11, 1),
-- Higuain: Real Madrid, Napoli, Juventus, AC Milan, Chelsea
(12, 1), (12, 17), (12, 10), (12, 11), (12, 6),
-- Di Maria: Real Madrid, Man Utd, PSG, Juventus, Benfica
(13, 1), (13, 3), (13, 13), (13, 10), (13, 21),
-- James Rodriguez: Real Madrid, Bayern, Porto
(14, 1), (14, 8), (14, 20), (14, 25),
-- Fabregas: Arsenal, Barcelona, Chelsea
(15, 7), (15, 2), (15, 6),
-- Van Persie: Arsenal, Man Utd
(16, 7), (16, 3),
-- Torres: Atletico Madrid, Liverpool, Chelsea, AC Milan
(17, 14), (17, 5), (17, 6), (17, 11),
-- Eto'o: Real Madrid, Barcelona, Inter, Chelsea, Everton
(18, 1), (18, 2), (18, 12), (18, 6), (18, 25),
-- Tevez: Man Utd, Man City, Juventus, West Ham
(19, 3), (19, 4), (19, 10), (19, 24),
-- Alexis Sanchez: Barcelona, Arsenal, Man Utd, Inter
(20, 2), (20, 7), (20, 3), (20, 12),
-- Memphis Depay: Man Utd, Lyon, Barcelona, Atletico Madrid
(21, 3), (21, 29), (21, 2), (21, 14),
-- Aubameyang: Dortmund, Arsenal, Barcelona
(22, 9), (22, 7), (22, 2),
-- Coutinho: Liverpool, Barcelona, Bayern
(23, 5), (23, 2), (23, 8), (23, 27),
-- Lukaku: Chelsea, Everton, Man Utd, Inter
(24, 6), (24, 25), (24, 3), (24, 12), (24, 16),
-- Griezmann: Atletico Madrid, Barcelona
(25, 14), (25, 2),
-- Bale: Tottenham, Real Madrid
(26, 15), (26, 1),
-- Modric: Tottenham, Real Madrid
(27, 15), (27, 1),
-- Kroos: Bayern, Real Madrid
(28, 8), (28, 1),
-- Sterling: Liverpool, Man City, Chelsea
(29, 5), (29, 4), (29, 6),
-- Morata: Real Madrid, Juventus, Chelsea, Atletico Madrid
(30, 1), (30, 10), (30, 6), (30, 14)
ON CONFLICT DO NOTHING;

-- ALIASES
INSERT INTO player_aliases (player_id, alias) VALUES
(1, 'CR7'), (1, 'Ronaldo'),
(2, 'Messi'), (2, 'Leo Messi'), (2, 'La Pulga'),
(3, 'Neymar Jr'),
(4, 'Mbappe'),
(5, 'Ibra'), (5, 'Zlatan'),
(6, 'Henry'), (6, 'Titi'),
(7, 'Beckham'), (7, 'Becks'),
(8, 'Rooney'), (8, 'Wazza'),
(9, 'Suarez'), (9, 'El Pistolero'),
(10, 'Lewandowski'), (10, 'Lewy'),
(11, 'Hazard'),
(12, 'Higuain'), (12, 'Pipita'),
(13, 'Di Maria'), (13, 'Fideo'),
(14, 'James'),
(15, 'Fabregas'), (15, 'Cesc'),
(16, 'Van Persie'), (16, 'RVP'),
(17, 'Torres'), (17, 'El Nino'),
(18, 'Etoo'),
(19, 'Tevez'), (19, 'Apache'),
(20, 'Alexis'),
(21, 'Memphis'),
(22, 'Auba'), (22, 'Aubameyang'),
(23, 'Coutinho'),
(24, 'Lukaku'), (24, 'Big Rom'),
(25, 'Griezmann'), (25, 'Grizi'),
(26, 'Bale'),
(27, 'Modric'),
(28, 'Kroos'),
(29, 'Sterling'),
(30, 'Morata')
ON CONFLICT DO NOTHING;

-- Reset sequences
SELECT setval('clubs_id_seq', (SELECT MAX(id) FROM clubs));
SELECT setval('players_id_seq', (SELECT MAX(id) FROM players));
