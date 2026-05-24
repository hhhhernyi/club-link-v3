-- ============================================================
-- Club Link — Comprehensive Seed Data
-- Top 5 leagues (full) + Portugal, Netherlands, Scotland, Saudi, MLS, Turkey, etc.
-- ============================================================

-- ── Clubs ──

INSERT INTO clubs (name, country, league) VALUES
  ('Arsenal', 'England', 'Premier League'),
  ('Aston Villa', 'England', 'Premier League'),
  ('Bournemouth', 'England', 'Premier League'),
  ('Brentford', 'England', 'Premier League'),
  ('Brighton', 'England', 'Premier League'),
  ('Chelsea', 'England', 'Premier League'),
  ('Crystal Palace', 'England', 'Premier League'),
  ('Everton', 'England', 'Premier League'),
  ('Fulham', 'England', 'Premier League'),
  ('Ipswich Town', 'England', 'Premier League'),
  ('Leicester City', 'England', 'Premier League'),
  ('Liverpool', 'England', 'Premier League'),
  ('Manchester City', 'England', 'Premier League'),
  ('Manchester United', 'England', 'Premier League'),
  ('Newcastle United', 'England', 'Premier League'),
  ('Nottingham Forest', 'England', 'Premier League'),
  ('Southampton', 'England', 'Premier League'),
  ('Tottenham Hotspur', 'England', 'Premier League'),
  ('West Ham United', 'England', 'Premier League'),
  ('Wolverhampton Wanderers', 'England', 'Premier League'),
  ('Real Madrid', 'Spain', 'La Liga'),
  ('Barcelona', 'Spain', 'La Liga'),
  ('Atletico Madrid', 'Spain', 'La Liga'),
  ('Sevilla', 'Spain', 'La Liga'),
  ('Valencia', 'Spain', 'La Liga'),
  ('Real Betis', 'Spain', 'La Liga'),
  ('Real Sociedad', 'Spain', 'La Liga'),
  ('Villarreal', 'Spain', 'La Liga'),
  ('Athletic Bilbao', 'Spain', 'La Liga'),
  ('Celta Vigo', 'Spain', 'La Liga'),
  ('Espanyol', 'Spain', 'La Liga'),
  ('Getafe', 'Spain', 'La Liga'),
  ('Osasuna', 'Spain', 'La Liga'),
  ('Mallorca', 'Spain', 'La Liga'),
  ('Rayo Vallecano', 'Spain', 'La Liga'),
  ('Girona', 'Spain', 'La Liga'),
  ('Las Palmas', 'Spain', 'La Liga'),
  ('Alaves', 'Spain', 'La Liga'),
  ('Valladolid', 'Spain', 'La Liga'),
  ('Leganes', 'Spain', 'La Liga'),
  ('Juventus', 'Italy', 'Serie A'),
  ('AC Milan', 'Italy', 'Serie A'),
  ('Inter Milan', 'Italy', 'Serie A'),
  ('AS Roma', 'Italy', 'Serie A'),
  ('Napoli', 'Italy', 'Serie A'),
  ('Lazio', 'Italy', 'Serie A'),
  ('Fiorentina', 'Italy', 'Serie A'),
  ('Atalanta', 'Italy', 'Serie A'),
  ('Bologna', 'Italy', 'Serie A'),
  ('Torino', 'Italy', 'Serie A'),
  ('Udinese', 'Italy', 'Serie A'),
  ('Sassuolo', 'Italy', 'Serie A'),
  ('Sampdoria', 'Italy', 'Serie A'),
  ('Genoa', 'Italy', 'Serie A'),
  ('Cagliari', 'Italy', 'Serie A'),
  ('Hellas Verona', 'Italy', 'Serie A'),
  ('Parma', 'Italy', 'Serie A'),
  ('Monza', 'Italy', 'Serie A'),
  ('Empoli', 'Italy', 'Serie A'),
  ('Como', 'Italy', 'Serie A'),
  ('Bayern Munich', 'Germany', 'Bundesliga'),
  ('Borussia Dortmund', 'Germany', 'Bundesliga'),
  ('RB Leipzig', 'Germany', 'Bundesliga'),
  ('Bayer Leverkusen', 'Germany', 'Bundesliga'),
  ('Eintracht Frankfurt', 'Germany', 'Bundesliga'),
  ('VfB Stuttgart', 'Germany', 'Bundesliga'),
  ('Wolfsburg', 'Germany', 'Bundesliga'),
  ('Borussia Monchengladbach', 'Germany', 'Bundesliga'),
  ('Werder Bremen', 'Germany', 'Bundesliga'),
  ('Freiburg', 'Germany', 'Bundesliga'),
  ('Hoffenheim', 'Germany', 'Bundesliga'),
  ('Mainz 05', 'Germany', 'Bundesliga'),
  ('Augsburg', 'Germany', 'Bundesliga'),
  ('Union Berlin', 'Germany', 'Bundesliga'),
  ('Heidenheim', 'Germany', 'Bundesliga'),
  ('FC Koln', 'Germany', 'Bundesliga'),
  ('Hertha Berlin', 'Germany', 'Bundesliga'),
  ('Schalke 04', 'Germany', 'Bundesliga'),
  ('Paris Saint-Germain', 'France', 'Ligue 1'),
  ('Monaco', 'France', 'Ligue 1'),
  ('Lyon', 'France', 'Ligue 1'),
  ('Marseille', 'France', 'Ligue 1'),
  ('Lille', 'France', 'Ligue 1'),
  ('Nice', 'France', 'Ligue 1'),
  ('Rennes', 'France', 'Ligue 1'),
  ('Lens', 'France', 'Ligue 1'),
  ('Strasbourg', 'France', 'Ligue 1'),
  ('Nantes', 'France', 'Ligue 1'),
  ('Montpellier', 'France', 'Ligue 1'),
  ('Toulouse', 'France', 'Ligue 1'),
  ('Reims', 'France', 'Ligue 1'),
  ('Brest', 'France', 'Ligue 1'),
  ('Le Havre', 'France', 'Ligue 1'),
  ('Angers', 'France', 'Ligue 1'),
  ('Saint-Etienne', 'France', 'Ligue 1'),
  ('Auxerre', 'France', 'Ligue 1'),
  ('Benfica', 'Portugal', 'Primeira Liga'),
  ('Porto', 'Portugal', 'Primeira Liga'),
  ('Sporting CP', 'Portugal', 'Primeira Liga'),
  ('Braga', 'Portugal', 'Primeira Liga'),
  ('Vitoria de Guimaraes', 'Portugal', 'Primeira Liga'),
  ('Ajax', 'Netherlands', 'Eredivisie'),
  ('PSV Eindhoven', 'Netherlands', 'Eredivisie'),
  ('Feyenoord', 'Netherlands', 'Eredivisie'),
  ('Celtic', 'Scotland', 'Scottish Premiership'),
  ('Rangers', 'Scotland', 'Scottish Premiership'),
  ('Aberdeen', 'Scotland', 'Scottish Premiership'),
  ('Hearts', 'Scotland', 'Scottish Premiership'),
  ('Hibernian', 'Scotland', 'Scottish Premiership'),
  ('Al-Hilal', 'Saudi Arabia', 'Saudi Pro League'),
  ('Al-Nassr', 'Saudi Arabia', 'Saudi Pro League'),
  ('Al-Ahli', 'Saudi Arabia', 'Saudi Pro League'),
  ('Al-Ittihad', 'Saudi Arabia', 'Saudi Pro League'),
  ('Al-Shabab', 'Saudi Arabia', 'Saudi Pro League'),
  ('Inter Miami', 'USA', 'MLS'),
  ('LA Galaxy', 'USA', 'MLS'),
  ('LAFC', 'USA', 'MLS'),
  ('New York Red Bulls', 'USA', 'MLS'),
  ('Atlanta United', 'USA', 'MLS'),
  ('Montreal Impact', 'Canada', 'MLS'),
  ('Galatasaray', 'Turkey', 'Turkish Super Lig'),
  ('Fenerbahce', 'Turkey', 'Turkish Super Lig'),
  ('Besiktas', 'Turkey', 'Turkish Super Lig'),
  ('Club Brugge', 'Belgium', 'Belgian Pro League'),
  ('Anderlecht', 'Belgium', 'Belgian Pro League'),
  ('Boca Juniors', 'Argentina', 'Argentine Primera'),
  ('River Plate', 'Argentina', 'Argentine Primera'),
  ('Flamengo', 'Brazil', 'Brazilian Serie A'),
  ('Santos', 'Brazil', 'Brazilian Serie A'),
  ('Sao Paulo', 'Brazil', 'Brazilian Serie A');

-- ── Players ──

INSERT INTO players (name, nationality) VALUES
  ('Cristiano Ronaldo', 'Portugal'),
  ('Lionel Messi', 'Argentina'),
  ('Neymar', 'Brazil'),
  ('Kylian Mbappe', 'France'),
  ('Robert Lewandowski', 'Poland'),
  ('David Beckham', 'England'),
  ('Thierry Henry', 'France'),
  ('Zlatan Ibrahimovic', 'Sweden'),
  ('Wayne Rooney', 'England'),
  ('Luis Suarez', 'Uruguay'),
  ('Gareth Bale', 'Wales'),
  ('Eden Hazard', 'Belgium'),
  ('Antoine Griezmann', 'France'),
  ('Luka Modric', 'Croatia'),
  ('Toni Kroos', 'Germany'),
  ('Carlos Tevez', 'Argentina'),
  ('Robin van Persie', 'Netherlands'),
  ('Fernando Torres', 'Spain'),
  ('Samuel Eto''o', 'Cameroon'),
  ('Ronaldinho', 'Brazil'),
  ('Cesc Fabregas', 'Spain'),
  ('Angel Di Maria', 'Argentina'),
  ('James Rodriguez', 'Colombia'),
  ('Memphis Depay', 'Netherlands'),
  ('Pierre-Emerick Aubameyang', 'Gabon'),
  ('Alexis Sanchez', 'Chile'),
  ('Raheem Sterling', 'England'),
  ('Philippe Coutinho', 'Brazil'),
  ('Kevin De Bruyne', 'Belgium'),
  ('Mohamed Salah', 'Egypt'),
  ('Karim Benzema', 'France'),
  ('Sergio Aguero', 'Argentina'),
  ('Erling Haaland', 'Norway'),
  ('Virgil van Dijk', 'Netherlands'),
  ('Sadio Mane', 'Senegal'),
  ('Edinson Cavani', 'Uruguay'),
  ('Romelu Lukaku', 'Belgium'),
  ('Thomas Muller', 'Germany'),
  ('Marco Reus', 'Germany'),
  ('Mario Gotze', 'Germany'),
  ('Mesut Ozil', 'Germany'),
  ('Thibaut Courtois', 'Belgium'),
  ('David de Gea', 'Spain'),
  ('Gianluigi Buffon', 'Italy'),
  ('Xavi Hernandez', 'Spain'),
  ('Andres Iniesta', 'Spain'),
  ('Andrea Pirlo', 'Italy'),
  ('Paul Pogba', 'France'),
  ('Gonzalo Higuain', 'Argentina'),
  ('Arjen Robben', 'Netherlands'),
  ('Franck Ribery', 'France'),
  ('Sergio Ramos', 'Spain'),
  ('Gerard Pique', 'Spain'),
  ('David Villa', 'Spain'),
  ('Radamel Falcao', 'Colombia'),
  ('Dani Alves', 'Brazil'),
  ('Marcelo', 'Brazil'),
  ('Ivan Rakitic', 'Croatia'),
  ('Arturo Vidal', 'Chile'),
  ('N''Golo Kante', 'France'),
  ('Olivier Giroud', 'France'),
  ('Alexandre Lacazette', 'France'),
  ('Harry Kane', 'England'),
  ('Son Heung-min', 'South Korea'),
  ('Dele Alli', 'England'),
  ('Jack Grealish', 'England'),
  ('Jadon Sancho', 'England'),
  ('Marcus Rashford', 'England'),
  ('Bruno Fernandes', 'Portugal'),
  ('Bernardo Silva', 'Portugal'),
  ('Joao Felix', 'Portugal'),
  ('Joao Cancelo', 'Portugal'),
  ('Raphael Varane', 'France'),
  ('Hugo Lloris', 'France'),
  ('Pierre-Emile Hojbjerg', 'Denmark'),
  ('Christian Eriksen', 'Denmark'),
  ('Riyad Mahrez', 'Algeria'),
  ('Hakim Ziyech', 'Morocco'),
  ('Achraf Hakimi', 'Morocco'),
  ('Victor Osimhen', 'Nigeria'),
  ('Jude Bellingham', 'England'),
  ('Bukayo Saka', 'England'),
  ('Phil Foden', 'England'),
  ('Pedri', 'Spain'),
  ('Vinicius Junior', 'Brazil'),
  ('Rodrygo', 'Brazil'),
  ('Federico Valverde', 'Uruguay'),
  ('Frenkie de Jong', 'Netherlands'),
  ('Matthijs de Ligt', 'Netherlands'),
  ('Lisandro Martinez', 'Argentina'),
  ('Casemiro', 'Brazil'),
  ('Trent Alexander-Arnold', 'England'),
  ('Alisson Becker', 'Brazil'),
  ('Thiago Alcantara', 'Spain'),
  ('Fabinho', 'Brazil'),
  ('Roberto Firmino', 'Brazil'),
  ('Diogo Jota', 'Portugal'),
  ('Luis Diaz', 'Colombia'),
  ('Darwin Nunez', 'Uruguay'),
  ('Kai Havertz', 'Germany'),
  ('Declan Rice', 'England'),
  ('Martin Odegaard', 'Norway'),
  ('William Saliba', 'France'),
  ('Gabriel Jesus', 'Brazil'),
  ('Leroy Sane', 'Germany'),
  ('Kingsley Coman', 'France'),
  ('Serge Gnabry', 'Germany'),
  ('Jamal Musiala', 'Germany'),
  ('Florian Wirtz', 'Germany'),
  ('Xabi Alonso', 'Spain'),
  ('Steven Gerrard', 'England'),
  ('Frank Lampard', 'England'),
  ('Didier Drogba', 'Ivory Coast'),
  ('Michael Essien', 'Ghana'),
  ('Claude Makelele', 'France'),
  ('Ashley Cole', 'England'),
  ('Rio Ferdinand', 'England'),
  ('Nemanja Vidic', 'Serbia'),
  ('Patrice Evra', 'France'),
  ('Michael Owen', 'England'),
  ('Dimitar Berbatov', 'Bulgaria'),
  ('Peter Crouch', 'England'),
  ('Emmanuel Adebayor', 'Togo'),
  ('Robinho', 'Brazil'),
  ('Rivaldo', 'Brazil'),
  ('Ronaldo Nazario', 'Brazil'),
  ('Clarence Seedorf', 'Netherlands'),
  ('Kaka', 'Brazil'),
  ('Hernan Crespo', 'Argentina'),
  ('Andriy Shevchenko', 'Ukraine'),
  ('Paolo Maldini', 'Italy'),
  ('Alessandro Del Piero', 'Italy'),
  ('Francesco Totti', 'Italy'),
  ('Gianfranco Zola', 'Italy'),
  ('Ruud van Nistelrooy', 'Netherlands'),
  ('Patrick Vieira', 'France'),
  ('Dennis Bergkamp', 'Netherlands'),
  ('Marc Overmars', 'Netherlands'),
  ('Henrik Larsson', 'Sweden'),
  ('Fabio Cannavaro', 'Italy'),
  ('Lilian Thuram', 'France'),
  ('Zinedine Zidane', 'France'),
  ('Edgar Davids', 'Netherlands'),
  ('Pavel Nedved', 'Czech Republic'),
  ('Alessandro Nesta', 'Italy'),
  ('Maicon', 'Brazil'),
  ('Wesley Sneijder', 'Netherlands'),
  ('Rafael van der Vaart', 'Netherlands'),
  ('Michael Ballack', 'Germany'),
  ('Bastian Schweinsteiger', 'Germany'),
  ('Philipp Lahm', 'Germany'),
  ('Miroslav Klose', 'Germany'),
  ('Raul', 'Spain'),
  ('Iker Casillas', 'Spain'),
  ('Pepe', 'Portugal'),
  ('Fabio Coentrao', 'Portugal'),
  ('Keylor Navas', 'Costa Rica'),
  ('Oscar', 'Brazil'),
  ('Willian', 'Brazil'),
  ('Diego Costa', 'Spain'),
  ('Alvaro Morata', 'Spain'),
  ('Lautaro Martinez', 'Argentina'),
  ('Paulo Dybala', 'Argentina'),
  ('Mauro Icardi', 'Argentina'),
  ('Douglas Costa', 'Brazil'),
  ('Juan Cuadrado', 'Colombia'),
  ('Miralem Pjanic', 'Bosnia'),
  ('Blaise Matuidi', 'France'),
  ('Marco Verratti', 'Italy'),
  ('Thiago Silva', 'Brazil'),
  ('Marquinhos', 'Brazil'),
  ('Ousmane Dembele', 'France'),
  ('Ansu Fati', 'Spain'),
  ('Ferran Torres', 'Spain'),
  ('Ilkay Gundogan', 'Germany'),
  ('Rafa Silva', 'Portugal'),
  ('Nicolas Pepe', 'Ivory Coast'),
  ('Allan Saint-Maximin', 'France'),
  ('Miguel Almiron', 'Paraguay'),
  ('Richarlison', 'Brazil'),
  ('Yerry Mina', 'Colombia'),
  ('Andre Gomes', 'Portugal'),
  ('Dominic Calvert-Lewin', 'England'),
  ('James Maddison', 'England'),
  ('Youri Tielemans', 'Belgium'),
  ('Jamie Vardy', 'England'),
  ('Wissam Ben Yedder', 'France'),
  ('Fabio Vieira', 'Portugal'),
  ('Santi Cazorla', 'Spain'),
  ('Bruno Guimaraes', 'Brazil'),
  ('Alexander Isak', 'Sweden'),
  ('Hakan Calhanoglu', 'Turkey'),
  ('Henrikh Mkhitaryan', 'Armenia'),
  ('Alexis Mac Allister', 'Argentina'),
  ('Moises Caicedo', 'Ecuador'),
  ('Enzo Fernandez', 'Argentina'),
  ('Christopher Nkunku', 'France'),
  ('Cole Palmer', 'England'),
  ('Mikel Arteta', 'Spain'),
  ('Aaron Ramsey', 'Wales'),
  ('Joe Hart', 'England'),
  ('Scott Brown', 'Scotland'),
  ('Kyogo Furuhashi', 'Japan'),
  ('Alfredo Morelos', 'Colombia'),
  ('Moussa Dembele', 'France');

-- ── Player-Club relationships ──

-- Cristiano Ronaldo
INSERT INTO player_clubs (player_id, club_id) VALUES
  (1, (SELECT id FROM clubs WHERE name = 'Sporting CP')),
  (1, (SELECT id FROM clubs WHERE name = 'Manchester United')),
  (1, (SELECT id FROM clubs WHERE name = 'Real Madrid')),
  (1, (SELECT id FROM clubs WHERE name = 'Juventus')),
  (1, (SELECT id FROM clubs WHERE name = 'Al-Nassr'));

-- Lionel Messi
INSERT INTO player_clubs (player_id, club_id) VALUES
  (2, (SELECT id FROM clubs WHERE name = 'Barcelona')),
  (2, (SELECT id FROM clubs WHERE name = 'Paris Saint-Germain')),
  (2, (SELECT id FROM clubs WHERE name = 'Inter Miami'));

-- Neymar
INSERT INTO player_clubs (player_id, club_id) VALUES
  (3, (SELECT id FROM clubs WHERE name = 'Santos')),
  (3, (SELECT id FROM clubs WHERE name = 'Barcelona')),
  (3, (SELECT id FROM clubs WHERE name = 'Paris Saint-Germain')),
  (3, (SELECT id FROM clubs WHERE name = 'Al-Hilal'));

-- Kylian Mbappe
INSERT INTO player_clubs (player_id, club_id) VALUES
  (4, (SELECT id FROM clubs WHERE name = 'Monaco')),
  (4, (SELECT id FROM clubs WHERE name = 'Paris Saint-Germain')),
  (4, (SELECT id FROM clubs WHERE name = 'Real Madrid'));

-- Robert Lewandowski
INSERT INTO player_clubs (player_id, club_id) VALUES
  (5, (SELECT id FROM clubs WHERE name = 'Borussia Dortmund')),
  (5, (SELECT id FROM clubs WHERE name = 'Bayern Munich')),
  (5, (SELECT id FROM clubs WHERE name = 'Barcelona'));

-- David Beckham
INSERT INTO player_clubs (player_id, club_id) VALUES
  (6, (SELECT id FROM clubs WHERE name = 'Manchester United')),
  (6, (SELECT id FROM clubs WHERE name = 'Real Madrid')),
  (6, (SELECT id FROM clubs WHERE name = 'LA Galaxy')),
  (6, (SELECT id FROM clubs WHERE name = 'AC Milan')),
  (6, (SELECT id FROM clubs WHERE name = 'Paris Saint-Germain'));

-- Thierry Henry
INSERT INTO player_clubs (player_id, club_id) VALUES
  (7, (SELECT id FROM clubs WHERE name = 'Monaco')),
  (7, (SELECT id FROM clubs WHERE name = 'Arsenal')),
  (7, (SELECT id FROM clubs WHERE name = 'Barcelona')),
  (7, (SELECT id FROM clubs WHERE name = 'New York Red Bulls'));

-- Zlatan Ibrahimovic
INSERT INTO player_clubs (player_id, club_id) VALUES
  (8, (SELECT id FROM clubs WHERE name = 'Ajax')),
  (8, (SELECT id FROM clubs WHERE name = 'Juventus')),
  (8, (SELECT id FROM clubs WHERE name = 'Inter Milan')),
  (8, (SELECT id FROM clubs WHERE name = 'Barcelona')),
  (8, (SELECT id FROM clubs WHERE name = 'AC Milan')),
  (8, (SELECT id FROM clubs WHERE name = 'Paris Saint-Germain')),
  (8, (SELECT id FROM clubs WHERE name = 'Manchester United')),
  (8, (SELECT id FROM clubs WHERE name = 'LA Galaxy'));

-- Wayne Rooney
INSERT INTO player_clubs (player_id, club_id) VALUES
  (9, (SELECT id FROM clubs WHERE name = 'Everton')),
  (9, (SELECT id FROM clubs WHERE name = 'Manchester United'));

-- Luis Suarez
INSERT INTO player_clubs (player_id, club_id) VALUES
  (10, (SELECT id FROM clubs WHERE name = 'Ajax')),
  (10, (SELECT id FROM clubs WHERE name = 'Liverpool')),
  (10, (SELECT id FROM clubs WHERE name = 'Barcelona')),
  (10, (SELECT id FROM clubs WHERE name = 'Atletico Madrid')),
  (10, (SELECT id FROM clubs WHERE name = 'Inter Miami'));

-- Gareth Bale
INSERT INTO player_clubs (player_id, club_id) VALUES
  (11, (SELECT id FROM clubs WHERE name = 'Tottenham Hotspur')),
  (11, (SELECT id FROM clubs WHERE name = 'Real Madrid')),
  (11, (SELECT id FROM clubs WHERE name = 'LAFC'));

-- Eden Hazard
INSERT INTO player_clubs (player_id, club_id) VALUES
  (12, (SELECT id FROM clubs WHERE name = 'Lille')),
  (12, (SELECT id FROM clubs WHERE name = 'Chelsea')),
  (12, (SELECT id FROM clubs WHERE name = 'Real Madrid'));

-- Antoine Griezmann
INSERT INTO player_clubs (player_id, club_id) VALUES
  (13, (SELECT id FROM clubs WHERE name = 'Real Sociedad')),
  (13, (SELECT id FROM clubs WHERE name = 'Atletico Madrid')),
  (13, (SELECT id FROM clubs WHERE name = 'Barcelona'));

-- Luka Modric
INSERT INTO player_clubs (player_id, club_id) VALUES
  (14, (SELECT id FROM clubs WHERE name = 'Tottenham Hotspur')),
  (14, (SELECT id FROM clubs WHERE name = 'Real Madrid'));

-- Toni Kroos
INSERT INTO player_clubs (player_id, club_id) VALUES
  (15, (SELECT id FROM clubs WHERE name = 'Bayern Munich')),
  (15, (SELECT id FROM clubs WHERE name = 'Real Madrid'));

-- Carlos Tevez
INSERT INTO player_clubs (player_id, club_id) VALUES
  (16, (SELECT id FROM clubs WHERE name = 'Boca Juniors')),
  (16, (SELECT id FROM clubs WHERE name = 'Manchester United')),
  (16, (SELECT id FROM clubs WHERE name = 'Manchester City')),
  (16, (SELECT id FROM clubs WHERE name = 'Juventus'));

-- Robin van Persie
INSERT INTO player_clubs (player_id, club_id) VALUES
  (17, (SELECT id FROM clubs WHERE name = 'Feyenoord')),
  (17, (SELECT id FROM clubs WHERE name = 'Arsenal')),
  (17, (SELECT id FROM clubs WHERE name = 'Manchester United')),
  (17, (SELECT id FROM clubs WHERE name = 'Fenerbahce'));

-- Fernando Torres
INSERT INTO player_clubs (player_id, club_id) VALUES
  (18, (SELECT id FROM clubs WHERE name = 'Atletico Madrid')),
  (18, (SELECT id FROM clubs WHERE name = 'Liverpool')),
  (18, (SELECT id FROM clubs WHERE name = 'Chelsea')),
  (18, (SELECT id FROM clubs WHERE name = 'AC Milan'));

-- Samuel Eto'o
INSERT INTO player_clubs (player_id, club_id) VALUES
  (19, (SELECT id FROM clubs WHERE name = 'Barcelona')),
  (19, (SELECT id FROM clubs WHERE name = 'Inter Milan')),
  (19, (SELECT id FROM clubs WHERE name = 'Chelsea')),
  (19, (SELECT id FROM clubs WHERE name = 'Everton'));

-- Ronaldinho
INSERT INTO player_clubs (player_id, club_id) VALUES
  (20, (SELECT id FROM clubs WHERE name = 'Paris Saint-Germain')),
  (20, (SELECT id FROM clubs WHERE name = 'Barcelona')),
  (20, (SELECT id FROM clubs WHERE name = 'AC Milan')),
  (20, (SELECT id FROM clubs WHERE name = 'Flamengo'));

-- Cesc Fabregas
INSERT INTO player_clubs (player_id, club_id) VALUES
  (21, (SELECT id FROM clubs WHERE name = 'Arsenal')),
  (21, (SELECT id FROM clubs WHERE name = 'Barcelona')),
  (21, (SELECT id FROM clubs WHERE name = 'Chelsea')),
  (21, (SELECT id FROM clubs WHERE name = 'Monaco'));

-- Angel Di Maria
INSERT INTO player_clubs (player_id, club_id) VALUES
  (22, (SELECT id FROM clubs WHERE name = 'Benfica')),
  (22, (SELECT id FROM clubs WHERE name = 'Real Madrid')),
  (22, (SELECT id FROM clubs WHERE name = 'Manchester United')),
  (22, (SELECT id FROM clubs WHERE name = 'Paris Saint-Germain')),
  (22, (SELECT id FROM clubs WHERE name = 'Juventus'));

-- James Rodriguez
INSERT INTO player_clubs (player_id, club_id) VALUES
  (23, (SELECT id FROM clubs WHERE name = 'Porto')),
  (23, (SELECT id FROM clubs WHERE name = 'Real Madrid')),
  (23, (SELECT id FROM clubs WHERE name = 'Bayern Munich')),
  (23, (SELECT id FROM clubs WHERE name = 'Everton'));

-- Memphis Depay
INSERT INTO player_clubs (player_id, club_id) VALUES
  (24, (SELECT id FROM clubs WHERE name = 'PSV Eindhoven')),
  (24, (SELECT id FROM clubs WHERE name = 'Manchester United')),
  (24, (SELECT id FROM clubs WHERE name = 'Lyon')),
  (24, (SELECT id FROM clubs WHERE name = 'Barcelona')),
  (24, (SELECT id FROM clubs WHERE name = 'Atletico Madrid'));

-- Pierre-Emerick Aubameyang
INSERT INTO player_clubs (player_id, club_id) VALUES
  (25, (SELECT id FROM clubs WHERE name = 'Borussia Dortmund')),
  (25, (SELECT id FROM clubs WHERE name = 'Arsenal')),
  (25, (SELECT id FROM clubs WHERE name = 'Barcelona')),
  (25, (SELECT id FROM clubs WHERE name = 'Chelsea')),
  (25, (SELECT id FROM clubs WHERE name = 'Marseille'));

-- Alexis Sanchez
INSERT INTO player_clubs (player_id, club_id) VALUES
  (26, (SELECT id FROM clubs WHERE name = 'Barcelona')),
  (26, (SELECT id FROM clubs WHERE name = 'Arsenal')),
  (26, (SELECT id FROM clubs WHERE name = 'Manchester United')),
  (26, (SELECT id FROM clubs WHERE name = 'Inter Milan')),
  (26, (SELECT id FROM clubs WHERE name = 'Marseille'));

-- Raheem Sterling
INSERT INTO player_clubs (player_id, club_id) VALUES
  (27, (SELECT id FROM clubs WHERE name = 'Liverpool')),
  (27, (SELECT id FROM clubs WHERE name = 'Manchester City')),
  (27, (SELECT id FROM clubs WHERE name = 'Chelsea')),
  (27, (SELECT id FROM clubs WHERE name = 'Arsenal'));

-- Philippe Coutinho
INSERT INTO player_clubs (player_id, club_id) VALUES
  (28, (SELECT id FROM clubs WHERE name = 'Inter Milan')),
  (28, (SELECT id FROM clubs WHERE name = 'Liverpool')),
  (28, (SELECT id FROM clubs WHERE name = 'Barcelona')),
  (28, (SELECT id FROM clubs WHERE name = 'Aston Villa'));

-- Kevin De Bruyne
INSERT INTO player_clubs (player_id, club_id) VALUES
  (29, (SELECT id FROM clubs WHERE name = 'Chelsea')),
  (29, (SELECT id FROM clubs WHERE name = 'Manchester City'));

-- Mohamed Salah
INSERT INTO player_clubs (player_id, club_id) VALUES
  (30, (SELECT id FROM clubs WHERE name = 'Chelsea')),
  (30, (SELECT id FROM clubs WHERE name = 'Fiorentina')),
  (30, (SELECT id FROM clubs WHERE name = 'AS Roma')),
  (30, (SELECT id FROM clubs WHERE name = 'Liverpool'));

-- Karim Benzema
INSERT INTO player_clubs (player_id, club_id) VALUES
  (31, (SELECT id FROM clubs WHERE name = 'Lyon')),
  (31, (SELECT id FROM clubs WHERE name = 'Real Madrid')),
  (31, (SELECT id FROM clubs WHERE name = 'Al-Ittihad'));

-- Sergio Aguero
INSERT INTO player_clubs (player_id, club_id) VALUES
  (32, (SELECT id FROM clubs WHERE name = 'Atletico Madrid')),
  (32, (SELECT id FROM clubs WHERE name = 'Manchester City')),
  (32, (SELECT id FROM clubs WHERE name = 'Barcelona'));

-- Erling Haaland
INSERT INTO player_clubs (player_id, club_id) VALUES
  (33, (SELECT id FROM clubs WHERE name = 'Borussia Dortmund')),
  (33, (SELECT id FROM clubs WHERE name = 'Manchester City'));

-- Virgil van Dijk
INSERT INTO player_clubs (player_id, club_id) VALUES
  (34, (SELECT id FROM clubs WHERE name = 'Celtic')),
  (34, (SELECT id FROM clubs WHERE name = 'Southampton')),
  (34, (SELECT id FROM clubs WHERE name = 'Liverpool'));

-- Sadio Mane
INSERT INTO player_clubs (player_id, club_id) VALUES
  (35, (SELECT id FROM clubs WHERE name = 'Southampton')),
  (35, (SELECT id FROM clubs WHERE name = 'Liverpool')),
  (35, (SELECT id FROM clubs WHERE name = 'Bayern Munich')),
  (35, (SELECT id FROM clubs WHERE name = 'Al-Nassr'));

-- Edinson Cavani
INSERT INTO player_clubs (player_id, club_id) VALUES
  (36, (SELECT id FROM clubs WHERE name = 'Napoli')),
  (36, (SELECT id FROM clubs WHERE name = 'Paris Saint-Germain')),
  (36, (SELECT id FROM clubs WHERE name = 'Manchester United'));

-- Romelu Lukaku
INSERT INTO player_clubs (player_id, club_id) VALUES
  (37, (SELECT id FROM clubs WHERE name = 'Chelsea')),
  (37, (SELECT id FROM clubs WHERE name = 'West Ham United')),
  (37, (SELECT id FROM clubs WHERE name = 'Everton')),
  (37, (SELECT id FROM clubs WHERE name = 'Manchester United')),
  (37, (SELECT id FROM clubs WHERE name = 'Inter Milan')),
  (37, (SELECT id FROM clubs WHERE name = 'AS Roma')),
  (37, (SELECT id FROM clubs WHERE name = 'Napoli'));

-- Thomas Muller
INSERT INTO player_clubs (player_id, club_id) VALUES
  (38, (SELECT id FROM clubs WHERE name = 'Bayern Munich'));

-- Marco Reus
INSERT INTO player_clubs (player_id, club_id) VALUES
  (39, (SELECT id FROM clubs WHERE name = 'Borussia Monchengladbach')),
  (39, (SELECT id FROM clubs WHERE name = 'Borussia Dortmund'));

-- Mario Gotze
INSERT INTO player_clubs (player_id, club_id) VALUES
  (40, (SELECT id FROM clubs WHERE name = 'Borussia Dortmund')),
  (40, (SELECT id FROM clubs WHERE name = 'Bayern Munich')),
  (40, (SELECT id FROM clubs WHERE name = 'PSV Eindhoven')),
  (40, (SELECT id FROM clubs WHERE name = 'Eintracht Frankfurt'));

-- Mesut Ozil
INSERT INTO player_clubs (player_id, club_id) VALUES
  (41, (SELECT id FROM clubs WHERE name = 'Werder Bremen')),
  (41, (SELECT id FROM clubs WHERE name = 'Real Madrid')),
  (41, (SELECT id FROM clubs WHERE name = 'Arsenal')),
  (41, (SELECT id FROM clubs WHERE name = 'Fenerbahce'));

-- Thibaut Courtois
INSERT INTO player_clubs (player_id, club_id) VALUES
  (42, (SELECT id FROM clubs WHERE name = 'Atletico Madrid')),
  (42, (SELECT id FROM clubs WHERE name = 'Chelsea')),
  (42, (SELECT id FROM clubs WHERE name = 'Real Madrid'));

-- David de Gea
INSERT INTO player_clubs (player_id, club_id) VALUES
  (43, (SELECT id FROM clubs WHERE name = 'Atletico Madrid')),
  (43, (SELECT id FROM clubs WHERE name = 'Manchester United')),
  (43, (SELECT id FROM clubs WHERE name = 'Fiorentina'));

-- Gianluigi Buffon
INSERT INTO player_clubs (player_id, club_id) VALUES
  (44, (SELECT id FROM clubs WHERE name = 'Parma')),
  (44, (SELECT id FROM clubs WHERE name = 'Juventus')),
  (44, (SELECT id FROM clubs WHERE name = 'Paris Saint-Germain'));

-- Xavi Hernandez
INSERT INTO player_clubs (player_id, club_id) VALUES
  (45, (SELECT id FROM clubs WHERE name = 'Barcelona')),
  (45, (SELECT id FROM clubs WHERE name = 'Al-Ahli'));

-- Andres Iniesta
INSERT INTO player_clubs (player_id, club_id) VALUES
  (46, (SELECT id FROM clubs WHERE name = 'Barcelona'));

-- Andrea Pirlo
INSERT INTO player_clubs (player_id, club_id) VALUES
  (47, (SELECT id FROM clubs WHERE name = 'Inter Milan')),
  (47, (SELECT id FROM clubs WHERE name = 'AC Milan')),
  (47, (SELECT id FROM clubs WHERE name = 'Juventus'));

-- Paul Pogba
INSERT INTO player_clubs (player_id, club_id) VALUES
  (48, (SELECT id FROM clubs WHERE name = 'Manchester United')),
  (48, (SELECT id FROM clubs WHERE name = 'Juventus'));

-- Gonzalo Higuain
INSERT INTO player_clubs (player_id, club_id) VALUES
  (49, (SELECT id FROM clubs WHERE name = 'River Plate')),
  (49, (SELECT id FROM clubs WHERE name = 'Real Madrid')),
  (49, (SELECT id FROM clubs WHERE name = 'Napoli')),
  (49, (SELECT id FROM clubs WHERE name = 'Juventus')),
  (49, (SELECT id FROM clubs WHERE name = 'AC Milan')),
  (49, (SELECT id FROM clubs WHERE name = 'Chelsea')),
  (49, (SELECT id FROM clubs WHERE name = 'Inter Miami'));

-- Arjen Robben
INSERT INTO player_clubs (player_id, club_id) VALUES
  (50, (SELECT id FROM clubs WHERE name = 'PSV Eindhoven')),
  (50, (SELECT id FROM clubs WHERE name = 'Chelsea')),
  (50, (SELECT id FROM clubs WHERE name = 'Real Madrid')),
  (50, (SELECT id FROM clubs WHERE name = 'Bayern Munich'));

-- Franck Ribery
INSERT INTO player_clubs (player_id, club_id) VALUES
  (51, (SELECT id FROM clubs WHERE name = 'Marseille')),
  (51, (SELECT id FROM clubs WHERE name = 'Bayern Munich')),
  (51, (SELECT id FROM clubs WHERE name = 'Fiorentina'));

-- Sergio Ramos
INSERT INTO player_clubs (player_id, club_id) VALUES
  (52, (SELECT id FROM clubs WHERE name = 'Sevilla')),
  (52, (SELECT id FROM clubs WHERE name = 'Real Madrid')),
  (52, (SELECT id FROM clubs WHERE name = 'Paris Saint-Germain'));

-- Gerard Pique
INSERT INTO player_clubs (player_id, club_id) VALUES
  (53, (SELECT id FROM clubs WHERE name = 'Manchester United')),
  (53, (SELECT id FROM clubs WHERE name = 'Barcelona'));

-- David Villa
INSERT INTO player_clubs (player_id, club_id) VALUES
  (54, (SELECT id FROM clubs WHERE name = 'Valencia')),
  (54, (SELECT id FROM clubs WHERE name = 'Barcelona')),
  (54, (SELECT id FROM clubs WHERE name = 'Atletico Madrid'));

-- Radamel Falcao
INSERT INTO player_clubs (player_id, club_id) VALUES
  (55, (SELECT id FROM clubs WHERE name = 'Porto')),
  (55, (SELECT id FROM clubs WHERE name = 'Atletico Madrid')),
  (55, (SELECT id FROM clubs WHERE name = 'Monaco')),
  (55, (SELECT id FROM clubs WHERE name = 'Manchester United')),
  (55, (SELECT id FROM clubs WHERE name = 'Chelsea')),
  (55, (SELECT id FROM clubs WHERE name = 'Galatasaray')),
  (55, (SELECT id FROM clubs WHERE name = 'Rayo Vallecano'));

-- Dani Alves
INSERT INTO player_clubs (player_id, club_id) VALUES
  (56, (SELECT id FROM clubs WHERE name = 'Sevilla')),
  (56, (SELECT id FROM clubs WHERE name = 'Barcelona')),
  (56, (SELECT id FROM clubs WHERE name = 'Juventus')),
  (56, (SELECT id FROM clubs WHERE name = 'Paris Saint-Germain')),
  (56, (SELECT id FROM clubs WHERE name = 'Sao Paulo'));

-- Marcelo
INSERT INTO player_clubs (player_id, club_id) VALUES
  (57, (SELECT id FROM clubs WHERE name = 'Real Madrid')),
  (57, (SELECT id FROM clubs WHERE name = 'Flamengo'));

-- Ivan Rakitic
INSERT INTO player_clubs (player_id, club_id) VALUES
  (58, (SELECT id FROM clubs WHERE name = 'Schalke 04')),
  (58, (SELECT id FROM clubs WHERE name = 'Sevilla')),
  (58, (SELECT id FROM clubs WHERE name = 'Barcelona'));

-- Arturo Vidal
INSERT INTO player_clubs (player_id, club_id) VALUES
  (59, (SELECT id FROM clubs WHERE name = 'Bayer Leverkusen')),
  (59, (SELECT id FROM clubs WHERE name = 'Juventus')),
  (59, (SELECT id FROM clubs WHERE name = 'Bayern Munich')),
  (59, (SELECT id FROM clubs WHERE name = 'Barcelona')),
  (59, (SELECT id FROM clubs WHERE name = 'Inter Milan')),
  (59, (SELECT id FROM clubs WHERE name = 'Flamengo'));

-- N'Golo Kante
INSERT INTO player_clubs (player_id, club_id) VALUES
  (60, (SELECT id FROM clubs WHERE name = 'Leicester City')),
  (60, (SELECT id FROM clubs WHERE name = 'Chelsea')),
  (60, (SELECT id FROM clubs WHERE name = 'Al-Ittihad'));

-- Olivier Giroud
INSERT INTO player_clubs (player_id, club_id) VALUES
  (61, (SELECT id FROM clubs WHERE name = 'Montpellier')),
  (61, (SELECT id FROM clubs WHERE name = 'Arsenal')),
  (61, (SELECT id FROM clubs WHERE name = 'Chelsea')),
  (61, (SELECT id FROM clubs WHERE name = 'AC Milan'));

-- Alexandre Lacazette
INSERT INTO player_clubs (player_id, club_id) VALUES
  (62, (SELECT id FROM clubs WHERE name = 'Lyon')),
  (62, (SELECT id FROM clubs WHERE name = 'Arsenal'));

-- Harry Kane
INSERT INTO player_clubs (player_id, club_id) VALUES
  (63, (SELECT id FROM clubs WHERE name = 'Tottenham Hotspur')),
  (63, (SELECT id FROM clubs WHERE name = 'Bayern Munich'));

-- Son Heung-min
INSERT INTO player_clubs (player_id, club_id) VALUES
  (64, (SELECT id FROM clubs WHERE name = 'Bayer Leverkusen')),
  (64, (SELECT id FROM clubs WHERE name = 'Tottenham Hotspur'));

-- Dele Alli
INSERT INTO player_clubs (player_id, club_id) VALUES
  (65, (SELECT id FROM clubs WHERE name = 'Tottenham Hotspur')),
  (65, (SELECT id FROM clubs WHERE name = 'Everton')),
  (65, (SELECT id FROM clubs WHERE name = 'Besiktas'));

-- Jack Grealish
INSERT INTO player_clubs (player_id, club_id) VALUES
  (66, (SELECT id FROM clubs WHERE name = 'Aston Villa')),
  (66, (SELECT id FROM clubs WHERE name = 'Manchester City'));

-- Jadon Sancho
INSERT INTO player_clubs (player_id, club_id) VALUES
  (67, (SELECT id FROM clubs WHERE name = 'Manchester City')),
  (67, (SELECT id FROM clubs WHERE name = 'Borussia Dortmund')),
  (67, (SELECT id FROM clubs WHERE name = 'Manchester United')),
  (67, (SELECT id FROM clubs WHERE name = 'Chelsea'));

-- Marcus Rashford
INSERT INTO player_clubs (player_id, club_id) VALUES
  (68, (SELECT id FROM clubs WHERE name = 'Manchester United'));

-- Bruno Fernandes
INSERT INTO player_clubs (player_id, club_id) VALUES
  (69, (SELECT id FROM clubs WHERE name = 'Sporting CP')),
  (69, (SELECT id FROM clubs WHERE name = 'Manchester United'));

-- Bernardo Silva
INSERT INTO player_clubs (player_id, club_id) VALUES
  (70, (SELECT id FROM clubs WHERE name = 'Monaco')),
  (70, (SELECT id FROM clubs WHERE name = 'Manchester City'));

-- Joao Felix
INSERT INTO player_clubs (player_id, club_id) VALUES
  (71, (SELECT id FROM clubs WHERE name = 'Benfica')),
  (71, (SELECT id FROM clubs WHERE name = 'Atletico Madrid')),
  (71, (SELECT id FROM clubs WHERE name = 'Barcelona')),
  (71, (SELECT id FROM clubs WHERE name = 'Chelsea'));

-- Joao Cancelo
INSERT INTO player_clubs (player_id, club_id) VALUES
  (72, (SELECT id FROM clubs WHERE name = 'Benfica')),
  (72, (SELECT id FROM clubs WHERE name = 'Valencia')),
  (72, (SELECT id FROM clubs WHERE name = 'Juventus')),
  (72, (SELECT id FROM clubs WHERE name = 'Manchester City')),
  (72, (SELECT id FROM clubs WHERE name = 'Bayern Munich')),
  (72, (SELECT id FROM clubs WHERE name = 'Barcelona'));

-- Raphael Varane
INSERT INTO player_clubs (player_id, club_id) VALUES
  (73, (SELECT id FROM clubs WHERE name = 'Real Madrid')),
  (73, (SELECT id FROM clubs WHERE name = 'Manchester United')),
  (73, (SELECT id FROM clubs WHERE name = 'Como'));

-- Hugo Lloris
INSERT INTO player_clubs (player_id, club_id) VALUES
  (74, (SELECT id FROM clubs WHERE name = 'Lyon')),
  (74, (SELECT id FROM clubs WHERE name = 'Nice')),
  (74, (SELECT id FROM clubs WHERE name = 'Tottenham Hotspur')),
  (74, (SELECT id FROM clubs WHERE name = 'LAFC'));

-- Pierre-Emile Hojbjerg
INSERT INTO player_clubs (player_id, club_id) VALUES
  (75, (SELECT id FROM clubs WHERE name = 'Bayern Munich')),
  (75, (SELECT id FROM clubs WHERE name = 'Southampton')),
  (75, (SELECT id FROM clubs WHERE name = 'Tottenham Hotspur')),
  (75, (SELECT id FROM clubs WHERE name = 'Marseille'));

-- Christian Eriksen
INSERT INTO player_clubs (player_id, club_id) VALUES
  (76, (SELECT id FROM clubs WHERE name = 'Ajax')),
  (76, (SELECT id FROM clubs WHERE name = 'Tottenham Hotspur')),
  (76, (SELECT id FROM clubs WHERE name = 'Inter Milan')),
  (76, (SELECT id FROM clubs WHERE name = 'Brentford')),
  (76, (SELECT id FROM clubs WHERE name = 'Manchester United'));

-- Riyad Mahrez
INSERT INTO player_clubs (player_id, club_id) VALUES
  (77, (SELECT id FROM clubs WHERE name = 'Leicester City')),
  (77, (SELECT id FROM clubs WHERE name = 'Manchester City')),
  (77, (SELECT id FROM clubs WHERE name = 'Al-Ahli'));

-- Hakim Ziyech
INSERT INTO player_clubs (player_id, club_id) VALUES
  (78, (SELECT id FROM clubs WHERE name = 'Ajax')),
  (78, (SELECT id FROM clubs WHERE name = 'Chelsea')),
  (78, (SELECT id FROM clubs WHERE name = 'Galatasaray'));

-- Achraf Hakimi
INSERT INTO player_clubs (player_id, club_id) VALUES
  (79, (SELECT id FROM clubs WHERE name = 'Real Madrid')),
  (79, (SELECT id FROM clubs WHERE name = 'Borussia Dortmund')),
  (79, (SELECT id FROM clubs WHERE name = 'Inter Milan')),
  (79, (SELECT id FROM clubs WHERE name = 'Paris Saint-Germain'));

-- Victor Osimhen
INSERT INTO player_clubs (player_id, club_id) VALUES
  (80, (SELECT id FROM clubs WHERE name = 'Lille')),
  (80, (SELECT id FROM clubs WHERE name = 'Napoli')),
  (80, (SELECT id FROM clubs WHERE name = 'Galatasaray'));

-- Jude Bellingham
INSERT INTO player_clubs (player_id, club_id) VALUES
  (81, (SELECT id FROM clubs WHERE name = 'Borussia Dortmund')),
  (81, (SELECT id FROM clubs WHERE name = 'Real Madrid'));

-- Bukayo Saka
INSERT INTO player_clubs (player_id, club_id) VALUES
  (82, (SELECT id FROM clubs WHERE name = 'Arsenal'));

-- Phil Foden
INSERT INTO player_clubs (player_id, club_id) VALUES
  (83, (SELECT id FROM clubs WHERE name = 'Manchester City'));

-- Pedri
INSERT INTO player_clubs (player_id, club_id) VALUES
  (84, (SELECT id FROM clubs WHERE name = 'Barcelona'));

-- Vinicius Junior
INSERT INTO player_clubs (player_id, club_id) VALUES
  (85, (SELECT id FROM clubs WHERE name = 'Flamengo')),
  (85, (SELECT id FROM clubs WHERE name = 'Real Madrid'));

-- Rodrygo
INSERT INTO player_clubs (player_id, club_id) VALUES
  (86, (SELECT id FROM clubs WHERE name = 'Santos')),
  (86, (SELECT id FROM clubs WHERE name = 'Real Madrid'));

-- Federico Valverde
INSERT INTO player_clubs (player_id, club_id) VALUES
  (87, (SELECT id FROM clubs WHERE name = 'Real Madrid'));

-- Frenkie de Jong
INSERT INTO player_clubs (player_id, club_id) VALUES
  (88, (SELECT id FROM clubs WHERE name = 'Ajax')),
  (88, (SELECT id FROM clubs WHERE name = 'Barcelona'));

-- Matthijs de Ligt
INSERT INTO player_clubs (player_id, club_id) VALUES
  (89, (SELECT id FROM clubs WHERE name = 'Ajax')),
  (89, (SELECT id FROM clubs WHERE name = 'Juventus')),
  (89, (SELECT id FROM clubs WHERE name = 'Bayern Munich')),
  (89, (SELECT id FROM clubs WHERE name = 'Manchester United'));

-- Lisandro Martinez
INSERT INTO player_clubs (player_id, club_id) VALUES
  (90, (SELECT id FROM clubs WHERE name = 'Ajax')),
  (90, (SELECT id FROM clubs WHERE name = 'Manchester United'));

-- Casemiro
INSERT INTO player_clubs (player_id, club_id) VALUES
  (91, (SELECT id FROM clubs WHERE name = 'Real Madrid')),
  (91, (SELECT id FROM clubs WHERE name = 'Manchester United'));

-- Trent Alexander-Arnold
INSERT INTO player_clubs (player_id, club_id) VALUES
  (92, (SELECT id FROM clubs WHERE name = 'Liverpool')),
  (92, (SELECT id FROM clubs WHERE name = 'Real Madrid'));

-- Alisson Becker
INSERT INTO player_clubs (player_id, club_id) VALUES
  (93, (SELECT id FROM clubs WHERE name = 'AS Roma')),
  (93, (SELECT id FROM clubs WHERE name = 'Liverpool'));

-- Thiago Alcantara
INSERT INTO player_clubs (player_id, club_id) VALUES
  (94, (SELECT id FROM clubs WHERE name = 'Barcelona')),
  (94, (SELECT id FROM clubs WHERE name = 'Bayern Munich')),
  (94, (SELECT id FROM clubs WHERE name = 'Liverpool'));

-- Fabinho
INSERT INTO player_clubs (player_id, club_id) VALUES
  (95, (SELECT id FROM clubs WHERE name = 'Monaco')),
  (95, (SELECT id FROM clubs WHERE name = 'Liverpool'));

-- Roberto Firmino
INSERT INTO player_clubs (player_id, club_id) VALUES
  (96, (SELECT id FROM clubs WHERE name = 'Liverpool')),
  (96, (SELECT id FROM clubs WHERE name = 'Al-Ahli'));

-- Diogo Jota
INSERT INTO player_clubs (player_id, club_id) VALUES
  (97, (SELECT id FROM clubs WHERE name = 'Porto')),
  (97, (SELECT id FROM clubs WHERE name = 'Wolverhampton Wanderers')),
  (97, (SELECT id FROM clubs WHERE name = 'Liverpool'));

-- Luis Diaz
INSERT INTO player_clubs (player_id, club_id) VALUES
  (98, (SELECT id FROM clubs WHERE name = 'Porto')),
  (98, (SELECT id FROM clubs WHERE name = 'Liverpool'));

-- Darwin Nunez
INSERT INTO player_clubs (player_id, club_id) VALUES
  (99, (SELECT id FROM clubs WHERE name = 'Benfica')),
  (99, (SELECT id FROM clubs WHERE name = 'Liverpool'));

-- Kai Havertz
INSERT INTO player_clubs (player_id, club_id) VALUES
  (100, (SELECT id FROM clubs WHERE name = 'Bayer Leverkusen')),
  (100, (SELECT id FROM clubs WHERE name = 'Chelsea')),
  (100, (SELECT id FROM clubs WHERE name = 'Arsenal'));

-- Declan Rice
INSERT INTO player_clubs (player_id, club_id) VALUES
  (101, (SELECT id FROM clubs WHERE name = 'West Ham United')),
  (101, (SELECT id FROM clubs WHERE name = 'Arsenal'));

-- Martin Odegaard
INSERT INTO player_clubs (player_id, club_id) VALUES
  (102, (SELECT id FROM clubs WHERE name = 'Real Madrid')),
  (102, (SELECT id FROM clubs WHERE name = 'Real Sociedad')),
  (102, (SELECT id FROM clubs WHERE name = 'Arsenal'));

-- William Saliba
INSERT INTO player_clubs (player_id, club_id) VALUES
  (103, (SELECT id FROM clubs WHERE name = 'Arsenal')),
  (103, (SELECT id FROM clubs WHERE name = 'Marseille'));

-- Gabriel Jesus
INSERT INTO player_clubs (player_id, club_id) VALUES
  (104, (SELECT id FROM clubs WHERE name = 'Manchester City')),
  (104, (SELECT id FROM clubs WHERE name = 'Arsenal'));

-- Leroy Sane
INSERT INTO player_clubs (player_id, club_id) VALUES
  (105, (SELECT id FROM clubs WHERE name = 'Manchester City')),
  (105, (SELECT id FROM clubs WHERE name = 'Bayern Munich'));

-- Kingsley Coman
INSERT INTO player_clubs (player_id, club_id) VALUES
  (106, (SELECT id FROM clubs WHERE name = 'Paris Saint-Germain')),
  (106, (SELECT id FROM clubs WHERE name = 'Juventus')),
  (106, (SELECT id FROM clubs WHERE name = 'Bayern Munich'));

-- Serge Gnabry
INSERT INTO player_clubs (player_id, club_id) VALUES
  (107, (SELECT id FROM clubs WHERE name = 'Arsenal')),
  (107, (SELECT id FROM clubs WHERE name = 'Werder Bremen')),
  (107, (SELECT id FROM clubs WHERE name = 'Bayern Munich'));

-- Jamal Musiala
INSERT INTO player_clubs (player_id, club_id) VALUES
  (108, (SELECT id FROM clubs WHERE name = 'Chelsea')),
  (108, (SELECT id FROM clubs WHERE name = 'Bayern Munich'));

-- Florian Wirtz
INSERT INTO player_clubs (player_id, club_id) VALUES
  (109, (SELECT id FROM clubs WHERE name = 'Bayer Leverkusen'));

-- Xabi Alonso
INSERT INTO player_clubs (player_id, club_id) VALUES
  (110, (SELECT id FROM clubs WHERE name = 'Real Sociedad')),
  (110, (SELECT id FROM clubs WHERE name = 'Liverpool')),
  (110, (SELECT id FROM clubs WHERE name = 'Real Madrid')),
  (110, (SELECT id FROM clubs WHERE name = 'Bayern Munich'));

-- Steven Gerrard
INSERT INTO player_clubs (player_id, club_id) VALUES
  (111, (SELECT id FROM clubs WHERE name = 'Liverpool')),
  (111, (SELECT id FROM clubs WHERE name = 'LA Galaxy'));

-- Frank Lampard
INSERT INTO player_clubs (player_id, club_id) VALUES
  (112, (SELECT id FROM clubs WHERE name = 'West Ham United')),
  (112, (SELECT id FROM clubs WHERE name = 'Chelsea')),
  (112, (SELECT id FROM clubs WHERE name = 'Manchester City'));

-- Didier Drogba
INSERT INTO player_clubs (player_id, club_id) VALUES
  (113, (SELECT id FROM clubs WHERE name = 'Marseille')),
  (113, (SELECT id FROM clubs WHERE name = 'Chelsea')),
  (113, (SELECT id FROM clubs WHERE name = 'Galatasaray')),
  (113, (SELECT id FROM clubs WHERE name = 'Montreal Impact'));

-- Michael Essien
INSERT INTO player_clubs (player_id, club_id) VALUES
  (114, (SELECT id FROM clubs WHERE name = 'Lyon')),
  (114, (SELECT id FROM clubs WHERE name = 'Chelsea')),
  (114, (SELECT id FROM clubs WHERE name = 'Real Madrid')),
  (114, (SELECT id FROM clubs WHERE name = 'AC Milan'));

-- Claude Makelele
INSERT INTO player_clubs (player_id, club_id) VALUES
  (115, (SELECT id FROM clubs WHERE name = 'Real Madrid')),
  (115, (SELECT id FROM clubs WHERE name = 'Chelsea'));

-- Ashley Cole
INSERT INTO player_clubs (player_id, club_id) VALUES
  (116, (SELECT id FROM clubs WHERE name = 'Arsenal')),
  (116, (SELECT id FROM clubs WHERE name = 'Chelsea')),
  (116, (SELECT id FROM clubs WHERE name = 'AS Roma')),
  (116, (SELECT id FROM clubs WHERE name = 'LA Galaxy'));

-- Rio Ferdinand
INSERT INTO player_clubs (player_id, club_id) VALUES
  (117, (SELECT id FROM clubs WHERE name = 'West Ham United')),
  (117, (SELECT id FROM clubs WHERE name = 'Manchester United'));

-- Nemanja Vidic
INSERT INTO player_clubs (player_id, club_id) VALUES
  (118, (SELECT id FROM clubs WHERE name = 'Manchester United')),
  (118, (SELECT id FROM clubs WHERE name = 'Inter Milan'));

-- Patrice Evra
INSERT INTO player_clubs (player_id, club_id) VALUES
  (119, (SELECT id FROM clubs WHERE name = 'Monaco')),
  (119, (SELECT id FROM clubs WHERE name = 'Manchester United')),
  (119, (SELECT id FROM clubs WHERE name = 'Juventus')),
  (119, (SELECT id FROM clubs WHERE name = 'Marseille')),
  (119, (SELECT id FROM clubs WHERE name = 'West Ham United'));

-- Michael Owen
INSERT INTO player_clubs (player_id, club_id) VALUES
  (120, (SELECT id FROM clubs WHERE name = 'Liverpool')),
  (120, (SELECT id FROM clubs WHERE name = 'Real Madrid')),
  (120, (SELECT id FROM clubs WHERE name = 'Newcastle United')),
  (120, (SELECT id FROM clubs WHERE name = 'Manchester United'));

-- Dimitar Berbatov
INSERT INTO player_clubs (player_id, club_id) VALUES
  (121, (SELECT id FROM clubs WHERE name = 'Bayer Leverkusen')),
  (121, (SELECT id FROM clubs WHERE name = 'Tottenham Hotspur')),
  (121, (SELECT id FROM clubs WHERE name = 'Manchester United')),
  (121, (SELECT id FROM clubs WHERE name = 'Fulham')),
  (121, (SELECT id FROM clubs WHERE name = 'Monaco'));

-- Peter Crouch
INSERT INTO player_clubs (player_id, club_id) VALUES
  (122, (SELECT id FROM clubs WHERE name = 'Liverpool')),
  (122, (SELECT id FROM clubs WHERE name = 'Tottenham Hotspur')),
  (122, (SELECT id FROM clubs WHERE name = 'Southampton'));

-- Emmanuel Adebayor
INSERT INTO player_clubs (player_id, club_id) VALUES
  (123, (SELECT id FROM clubs WHERE name = 'Monaco')),
  (123, (SELECT id FROM clubs WHERE name = 'Arsenal')),
  (123, (SELECT id FROM clubs WHERE name = 'Manchester City')),
  (123, (SELECT id FROM clubs WHERE name = 'Real Madrid')),
  (123, (SELECT id FROM clubs WHERE name = 'Tottenham Hotspur')),
  (123, (SELECT id FROM clubs WHERE name = 'Crystal Palace'));

-- Robinho
INSERT INTO player_clubs (player_id, club_id) VALUES
  (124, (SELECT id FROM clubs WHERE name = 'Real Madrid')),
  (124, (SELECT id FROM clubs WHERE name = 'Manchester City')),
  (124, (SELECT id FROM clubs WHERE name = 'AC Milan')),
  (124, (SELECT id FROM clubs WHERE name = 'Santos'));

-- Rivaldo
INSERT INTO player_clubs (player_id, club_id) VALUES
  (125, (SELECT id FROM clubs WHERE name = 'Barcelona')),
  (125, (SELECT id FROM clubs WHERE name = 'AC Milan'));

-- Ronaldo Nazario
INSERT INTO player_clubs (player_id, club_id) VALUES
  (126, (SELECT id FROM clubs WHERE name = 'Barcelona')),
  (126, (SELECT id FROM clubs WHERE name = 'Inter Milan')),
  (126, (SELECT id FROM clubs WHERE name = 'Real Madrid')),
  (126, (SELECT id FROM clubs WHERE name = 'AC Milan'));

-- Clarence Seedorf
INSERT INTO player_clubs (player_id, club_id) VALUES
  (127, (SELECT id FROM clubs WHERE name = 'Ajax')),
  (127, (SELECT id FROM clubs WHERE name = 'Real Madrid')),
  (127, (SELECT id FROM clubs WHERE name = 'Inter Milan')),
  (127, (SELECT id FROM clubs WHERE name = 'AC Milan'));

-- Kaka
INSERT INTO player_clubs (player_id, club_id) VALUES
  (128, (SELECT id FROM clubs WHERE name = 'AC Milan')),
  (128, (SELECT id FROM clubs WHERE name = 'Real Madrid')),
  (128, (SELECT id FROM clubs WHERE name = 'Sao Paulo'));

-- Hernan Crespo
INSERT INTO player_clubs (player_id, club_id) VALUES
  (129, (SELECT id FROM clubs WHERE name = 'Parma')),
  (129, (SELECT id FROM clubs WHERE name = 'Lazio')),
  (129, (SELECT id FROM clubs WHERE name = 'Inter Milan')),
  (129, (SELECT id FROM clubs WHERE name = 'Chelsea')),
  (129, (SELECT id FROM clubs WHERE name = 'AC Milan'));

-- Andriy Shevchenko
INSERT INTO player_clubs (player_id, club_id) VALUES
  (130, (SELECT id FROM clubs WHERE name = 'AC Milan')),
  (130, (SELECT id FROM clubs WHERE name = 'Chelsea'));

-- Paolo Maldini
INSERT INTO player_clubs (player_id, club_id) VALUES
  (131, (SELECT id FROM clubs WHERE name = 'AC Milan'));

-- Alessandro Del Piero
INSERT INTO player_clubs (player_id, club_id) VALUES
  (132, (SELECT id FROM clubs WHERE name = 'Juventus'));

-- Francesco Totti
INSERT INTO player_clubs (player_id, club_id) VALUES
  (133, (SELECT id FROM clubs WHERE name = 'AS Roma'));

-- Gianfranco Zola
INSERT INTO player_clubs (player_id, club_id) VALUES
  (134, (SELECT id FROM clubs WHERE name = 'Napoli')),
  (134, (SELECT id FROM clubs WHERE name = 'Parma')),
  (134, (SELECT id FROM clubs WHERE name = 'Chelsea'));

-- Ruud van Nistelrooy
INSERT INTO player_clubs (player_id, club_id) VALUES
  (135, (SELECT id FROM clubs WHERE name = 'PSV Eindhoven')),
  (135, (SELECT id FROM clubs WHERE name = 'Manchester United')),
  (135, (SELECT id FROM clubs WHERE name = 'Real Madrid'));

-- Patrick Vieira
INSERT INTO player_clubs (player_id, club_id) VALUES
  (136, (SELECT id FROM clubs WHERE name = 'AC Milan')),
  (136, (SELECT id FROM clubs WHERE name = 'Arsenal')),
  (136, (SELECT id FROM clubs WHERE name = 'Juventus')),
  (136, (SELECT id FROM clubs WHERE name = 'Inter Milan')),
  (136, (SELECT id FROM clubs WHERE name = 'Manchester City'));

-- Dennis Bergkamp
INSERT INTO player_clubs (player_id, club_id) VALUES
  (137, (SELECT id FROM clubs WHERE name = 'Ajax')),
  (137, (SELECT id FROM clubs WHERE name = 'Inter Milan')),
  (137, (SELECT id FROM clubs WHERE name = 'Arsenal'));

-- Marc Overmars
INSERT INTO player_clubs (player_id, club_id) VALUES
  (138, (SELECT id FROM clubs WHERE name = 'Ajax')),
  (138, (SELECT id FROM clubs WHERE name = 'Arsenal')),
  (138, (SELECT id FROM clubs WHERE name = 'Barcelona'));

-- Henrik Larsson
INSERT INTO player_clubs (player_id, club_id) VALUES
  (139, (SELECT id FROM clubs WHERE name = 'Feyenoord')),
  (139, (SELECT id FROM clubs WHERE name = 'Celtic')),
  (139, (SELECT id FROM clubs WHERE name = 'Barcelona')),
  (139, (SELECT id FROM clubs WHERE name = 'Manchester United'));

-- Fabio Cannavaro
INSERT INTO player_clubs (player_id, club_id) VALUES
  (140, (SELECT id FROM clubs WHERE name = 'Napoli')),
  (140, (SELECT id FROM clubs WHERE name = 'Parma')),
  (140, (SELECT id FROM clubs WHERE name = 'Inter Milan')),
  (140, (SELECT id FROM clubs WHERE name = 'Juventus')),
  (140, (SELECT id FROM clubs WHERE name = 'Real Madrid'));

-- Lilian Thuram
INSERT INTO player_clubs (player_id, club_id) VALUES
  (141, (SELECT id FROM clubs WHERE name = 'Parma')),
  (141, (SELECT id FROM clubs WHERE name = 'Juventus')),
  (141, (SELECT id FROM clubs WHERE name = 'Barcelona'));

-- Zinedine Zidane
INSERT INTO player_clubs (player_id, club_id) VALUES
  (142, (SELECT id FROM clubs WHERE name = 'Juventus')),
  (142, (SELECT id FROM clubs WHERE name = 'Real Madrid'));

-- Edgar Davids
INSERT INTO player_clubs (player_id, club_id) VALUES
  (143, (SELECT id FROM clubs WHERE name = 'Ajax')),
  (143, (SELECT id FROM clubs WHERE name = 'AC Milan')),
  (143, (SELECT id FROM clubs WHERE name = 'Juventus')),
  (143, (SELECT id FROM clubs WHERE name = 'Barcelona')),
  (143, (SELECT id FROM clubs WHERE name = 'Inter Milan')),
  (143, (SELECT id FROM clubs WHERE name = 'Tottenham Hotspur'));

-- Pavel Nedved
INSERT INTO player_clubs (player_id, club_id) VALUES
  (144, (SELECT id FROM clubs WHERE name = 'Lazio')),
  (144, (SELECT id FROM clubs WHERE name = 'Juventus'));

-- Alessandro Nesta
INSERT INTO player_clubs (player_id, club_id) VALUES
  (145, (SELECT id FROM clubs WHERE name = 'Lazio')),
  (145, (SELECT id FROM clubs WHERE name = 'AC Milan'));

-- Maicon
INSERT INTO player_clubs (player_id, club_id) VALUES
  (146, (SELECT id FROM clubs WHERE name = 'Monaco')),
  (146, (SELECT id FROM clubs WHERE name = 'Inter Milan')),
  (146, (SELECT id FROM clubs WHERE name = 'Manchester City')),
  (146, (SELECT id FROM clubs WHERE name = 'AS Roma'));

-- Wesley Sneijder
INSERT INTO player_clubs (player_id, club_id) VALUES
  (147, (SELECT id FROM clubs WHERE name = 'Ajax')),
  (147, (SELECT id FROM clubs WHERE name = 'Real Madrid')),
  (147, (SELECT id FROM clubs WHERE name = 'Inter Milan')),
  (147, (SELECT id FROM clubs WHERE name = 'Galatasaray')),
  (147, (SELECT id FROM clubs WHERE name = 'Nice'));

-- Rafael van der Vaart
INSERT INTO player_clubs (player_id, club_id) VALUES
  (148, (SELECT id FROM clubs WHERE name = 'Ajax')),
  (148, (SELECT id FROM clubs WHERE name = 'Real Madrid')),
  (148, (SELECT id FROM clubs WHERE name = 'Tottenham Hotspur'));

-- Michael Ballack
INSERT INTO player_clubs (player_id, club_id) VALUES
  (149, (SELECT id FROM clubs WHERE name = 'Bayer Leverkusen')),
  (149, (SELECT id FROM clubs WHERE name = 'Bayern Munich')),
  (149, (SELECT id FROM clubs WHERE name = 'Chelsea'));

-- Bastian Schweinsteiger
INSERT INTO player_clubs (player_id, club_id) VALUES
  (150, (SELECT id FROM clubs WHERE name = 'Bayern Munich')),
  (150, (SELECT id FROM clubs WHERE name = 'Manchester United'));

-- Philipp Lahm
INSERT INTO player_clubs (player_id, club_id) VALUES
  (151, (SELECT id FROM clubs WHERE name = 'Bayern Munich'));

-- Miroslav Klose
INSERT INTO player_clubs (player_id, club_id) VALUES
  (152, (SELECT id FROM clubs WHERE name = 'Werder Bremen')),
  (152, (SELECT id FROM clubs WHERE name = 'Bayern Munich')),
  (152, (SELECT id FROM clubs WHERE name = 'Lazio'));

-- Raul
INSERT INTO player_clubs (player_id, club_id) VALUES
  (153, (SELECT id FROM clubs WHERE name = 'Real Madrid')),
  (153, (SELECT id FROM clubs WHERE name = 'Schalke 04'));

-- Iker Casillas
INSERT INTO player_clubs (player_id, club_id) VALUES
  (154, (SELECT id FROM clubs WHERE name = 'Real Madrid')),
  (154, (SELECT id FROM clubs WHERE name = 'Porto'));

-- Pepe
INSERT INTO player_clubs (player_id, club_id) VALUES
  (155, (SELECT id FROM clubs WHERE name = 'Porto')),
  (155, (SELECT id FROM clubs WHERE name = 'Real Madrid')),
  (155, (SELECT id FROM clubs WHERE name = 'Besiktas'));

-- Fabio Coentrao
INSERT INTO player_clubs (player_id, club_id) VALUES
  (156, (SELECT id FROM clubs WHERE name = 'Benfica')),
  (156, (SELECT id FROM clubs WHERE name = 'Real Madrid')),
  (156, (SELECT id FROM clubs WHERE name = 'Monaco'));

-- Keylor Navas
INSERT INTO player_clubs (player_id, club_id) VALUES
  (157, (SELECT id FROM clubs WHERE name = 'Real Madrid')),
  (157, (SELECT id FROM clubs WHERE name = 'Paris Saint-Germain')),
  (157, (SELECT id FROM clubs WHERE name = 'Nottingham Forest'));

-- Oscar
INSERT INTO player_clubs (player_id, club_id) VALUES
  (158, (SELECT id FROM clubs WHERE name = 'Chelsea'));

-- Willian
INSERT INTO player_clubs (player_id, club_id) VALUES
  (159, (SELECT id FROM clubs WHERE name = 'Chelsea')),
  (159, (SELECT id FROM clubs WHERE name = 'Arsenal')),
  (159, (SELECT id FROM clubs WHERE name = 'Fulham'));

-- Diego Costa
INSERT INTO player_clubs (player_id, club_id) VALUES
  (160, (SELECT id FROM clubs WHERE name = 'Atletico Madrid')),
  (160, (SELECT id FROM clubs WHERE name = 'Chelsea')),
  (160, (SELECT id FROM clubs WHERE name = 'Wolverhampton Wanderers'));

-- Alvaro Morata
INSERT INTO player_clubs (player_id, club_id) VALUES
  (161, (SELECT id FROM clubs WHERE name = 'Real Madrid')),
  (161, (SELECT id FROM clubs WHERE name = 'Juventus')),
  (161, (SELECT id FROM clubs WHERE name = 'Chelsea')),
  (161, (SELECT id FROM clubs WHERE name = 'Atletico Madrid')),
  (161, (SELECT id FROM clubs WHERE name = 'AC Milan'));

-- Lautaro Martinez
INSERT INTO player_clubs (player_id, club_id) VALUES
  (162, (SELECT id FROM clubs WHERE name = 'Inter Milan'));

-- Paulo Dybala
INSERT INTO player_clubs (player_id, club_id) VALUES
  (163, (SELECT id FROM clubs WHERE name = 'Juventus')),
  (163, (SELECT id FROM clubs WHERE name = 'AS Roma'));

-- Mauro Icardi
INSERT INTO player_clubs (player_id, club_id) VALUES
  (164, (SELECT id FROM clubs WHERE name = 'Inter Milan')),
  (164, (SELECT id FROM clubs WHERE name = 'Paris Saint-Germain')),
  (164, (SELECT id FROM clubs WHERE name = 'Galatasaray'));

-- Douglas Costa
INSERT INTO player_clubs (player_id, club_id) VALUES
  (165, (SELECT id FROM clubs WHERE name = 'Bayern Munich')),
  (165, (SELECT id FROM clubs WHERE name = 'Juventus'));

-- Juan Cuadrado
INSERT INTO player_clubs (player_id, club_id) VALUES
  (166, (SELECT id FROM clubs WHERE name = 'Fiorentina')),
  (166, (SELECT id FROM clubs WHERE name = 'Juventus')),
  (166, (SELECT id FROM clubs WHERE name = 'Chelsea')),
  (166, (SELECT id FROM clubs WHERE name = 'Inter Milan'));

-- Miralem Pjanic
INSERT INTO player_clubs (player_id, club_id) VALUES
  (167, (SELECT id FROM clubs WHERE name = 'Lyon')),
  (167, (SELECT id FROM clubs WHERE name = 'AS Roma')),
  (167, (SELECT id FROM clubs WHERE name = 'Juventus')),
  (167, (SELECT id FROM clubs WHERE name = 'Barcelona'));

-- Blaise Matuidi
INSERT INTO player_clubs (player_id, club_id) VALUES
  (168, (SELECT id FROM clubs WHERE name = 'Paris Saint-Germain')),
  (168, (SELECT id FROM clubs WHERE name = 'Juventus')),
  (168, (SELECT id FROM clubs WHERE name = 'Inter Miami'));

-- Marco Verratti
INSERT INTO player_clubs (player_id, club_id) VALUES
  (169, (SELECT id FROM clubs WHERE name = 'Paris Saint-Germain')),
  (169, (SELECT id FROM clubs WHERE name = 'Al-Hilal'));

-- Thiago Silva
INSERT INTO player_clubs (player_id, club_id) VALUES
  (170, (SELECT id FROM clubs WHERE name = 'AC Milan')),
  (170, (SELECT id FROM clubs WHERE name = 'Paris Saint-Germain')),
  (170, (SELECT id FROM clubs WHERE name = 'Chelsea')),
  (170, (SELECT id FROM clubs WHERE name = 'Flamengo'));

-- Marquinhos
INSERT INTO player_clubs (player_id, club_id) VALUES
  (171, (SELECT id FROM clubs WHERE name = 'AS Roma')),
  (171, (SELECT id FROM clubs WHERE name = 'Paris Saint-Germain'));

-- Ousmane Dembele
INSERT INTO player_clubs (player_id, club_id) VALUES
  (172, (SELECT id FROM clubs WHERE name = 'Borussia Dortmund')),
  (172, (SELECT id FROM clubs WHERE name = 'Barcelona')),
  (172, (SELECT id FROM clubs WHERE name = 'Paris Saint-Germain'));

-- Ansu Fati
INSERT INTO player_clubs (player_id, club_id) VALUES
  (173, (SELECT id FROM clubs WHERE name = 'Barcelona')),
  (173, (SELECT id FROM clubs WHERE name = 'Brighton'));

-- Ferran Torres
INSERT INTO player_clubs (player_id, club_id) VALUES
  (174, (SELECT id FROM clubs WHERE name = 'Valencia')),
  (174, (SELECT id FROM clubs WHERE name = 'Manchester City')),
  (174, (SELECT id FROM clubs WHERE name = 'Barcelona'));

-- Ilkay Gundogan
INSERT INTO player_clubs (player_id, club_id) VALUES
  (175, (SELECT id FROM clubs WHERE name = 'Borussia Dortmund')),
  (175, (SELECT id FROM clubs WHERE name = 'Manchester City')),
  (175, (SELECT id FROM clubs WHERE name = 'Barcelona'));

-- Rafa Silva
INSERT INTO player_clubs (player_id, club_id) VALUES
  (176, (SELECT id FROM clubs WHERE name = 'Benfica'));

-- Nicolas Pepe
INSERT INTO player_clubs (player_id, club_id) VALUES
  (177, (SELECT id FROM clubs WHERE name = 'Lille')),
  (177, (SELECT id FROM clubs WHERE name = 'Arsenal')),
  (177, (SELECT id FROM clubs WHERE name = 'Nice'));

-- Allan Saint-Maximin
INSERT INTO player_clubs (player_id, club_id) VALUES
  (178, (SELECT id FROM clubs WHERE name = 'Nice')),
  (178, (SELECT id FROM clubs WHERE name = 'Newcastle United')),
  (178, (SELECT id FROM clubs WHERE name = 'Al-Ahli'));

-- Miguel Almiron
INSERT INTO player_clubs (player_id, club_id) VALUES
  (179, (SELECT id FROM clubs WHERE name = 'Atlanta United')),
  (179, (SELECT id FROM clubs WHERE name = 'Newcastle United'));

-- Richarlison
INSERT INTO player_clubs (player_id, club_id) VALUES
  (180, (SELECT id FROM clubs WHERE name = 'Everton')),
  (180, (SELECT id FROM clubs WHERE name = 'Tottenham Hotspur'));

-- Yerry Mina
INSERT INTO player_clubs (player_id, club_id) VALUES
  (181, (SELECT id FROM clubs WHERE name = 'Barcelona')),
  (181, (SELECT id FROM clubs WHERE name = 'Everton')),
  (181, (SELECT id FROM clubs WHERE name = 'Fiorentina'));

-- Andre Gomes
INSERT INTO player_clubs (player_id, club_id) VALUES
  (182, (SELECT id FROM clubs WHERE name = 'Barcelona')),
  (182, (SELECT id FROM clubs WHERE name = 'Everton'));

-- Dominic Calvert-Lewin
INSERT INTO player_clubs (player_id, club_id) VALUES
  (183, (SELECT id FROM clubs WHERE name = 'Everton'));

-- James Maddison
INSERT INTO player_clubs (player_id, club_id) VALUES
  (184, (SELECT id FROM clubs WHERE name = 'Leicester City')),
  (184, (SELECT id FROM clubs WHERE name = 'Tottenham Hotspur'));

-- Youri Tielemans
INSERT INTO player_clubs (player_id, club_id) VALUES
  (185, (SELECT id FROM clubs WHERE name = 'Anderlecht')),
  (185, (SELECT id FROM clubs WHERE name = 'Leicester City')),
  (185, (SELECT id FROM clubs WHERE name = 'Aston Villa'));

-- Jamie Vardy
INSERT INTO player_clubs (player_id, club_id) VALUES
  (186, (SELECT id FROM clubs WHERE name = 'Leicester City'));

-- Wissam Ben Yedder
INSERT INTO player_clubs (player_id, club_id) VALUES
  (187, (SELECT id FROM clubs WHERE name = 'Sevilla')),
  (187, (SELECT id FROM clubs WHERE name = 'Monaco'));

-- Fabio Vieira
INSERT INTO player_clubs (player_id, club_id) VALUES
  (188, (SELECT id FROM clubs WHERE name = 'Porto')),
  (188, (SELECT id FROM clubs WHERE name = 'Arsenal'));

-- Santi Cazorla
INSERT INTO player_clubs (player_id, club_id) VALUES
  (189, (SELECT id FROM clubs WHERE name = 'Arsenal')),
  (189, (SELECT id FROM clubs WHERE name = 'Villarreal'));

-- Bruno Guimaraes
INSERT INTO player_clubs (player_id, club_id) VALUES
  (190, (SELECT id FROM clubs WHERE name = 'Lyon')),
  (190, (SELECT id FROM clubs WHERE name = 'Newcastle United'));

-- Alexander Isak
INSERT INTO player_clubs (player_id, club_id) VALUES
  (191, (SELECT id FROM clubs WHERE name = 'Real Sociedad')),
  (191, (SELECT id FROM clubs WHERE name = 'Newcastle United'));

-- Hakan Calhanoglu
INSERT INTO player_clubs (player_id, club_id) VALUES
  (192, (SELECT id FROM clubs WHERE name = 'Bayer Leverkusen')),
  (192, (SELECT id FROM clubs WHERE name = 'AC Milan')),
  (192, (SELECT id FROM clubs WHERE name = 'Inter Milan'));

-- Henrikh Mkhitaryan
INSERT INTO player_clubs (player_id, club_id) VALUES
  (193, (SELECT id FROM clubs WHERE name = 'Borussia Dortmund')),
  (193, (SELECT id FROM clubs WHERE name = 'Manchester United')),
  (193, (SELECT id FROM clubs WHERE name = 'Arsenal')),
  (193, (SELECT id FROM clubs WHERE name = 'AS Roma')),
  (193, (SELECT id FROM clubs WHERE name = 'Inter Milan'));

-- Alexis Mac Allister
INSERT INTO player_clubs (player_id, club_id) VALUES
  (194, (SELECT id FROM clubs WHERE name = 'Brighton')),
  (194, (SELECT id FROM clubs WHERE name = 'Liverpool'));

-- Moises Caicedo
INSERT INTO player_clubs (player_id, club_id) VALUES
  (195, (SELECT id FROM clubs WHERE name = 'Brighton')),
  (195, (SELECT id FROM clubs WHERE name = 'Chelsea'));

-- Enzo Fernandez
INSERT INTO player_clubs (player_id, club_id) VALUES
  (196, (SELECT id FROM clubs WHERE name = 'Benfica')),
  (196, (SELECT id FROM clubs WHERE name = 'Chelsea')),
  (196, (SELECT id FROM clubs WHERE name = 'River Plate'));

-- Christopher Nkunku
INSERT INTO player_clubs (player_id, club_id) VALUES
  (197, (SELECT id FROM clubs WHERE name = 'Paris Saint-Germain')),
  (197, (SELECT id FROM clubs WHERE name = 'RB Leipzig')),
  (197, (SELECT id FROM clubs WHERE name = 'Chelsea'));

-- Cole Palmer
INSERT INTO player_clubs (player_id, club_id) VALUES
  (198, (SELECT id FROM clubs WHERE name = 'Manchester City')),
  (198, (SELECT id FROM clubs WHERE name = 'Chelsea'));

-- Mikel Arteta
INSERT INTO player_clubs (player_id, club_id) VALUES
  (199, (SELECT id FROM clubs WHERE name = 'Barcelona')),
  (199, (SELECT id FROM clubs WHERE name = 'Paris Saint-Germain')),
  (199, (SELECT id FROM clubs WHERE name = 'Rangers')),
  (199, (SELECT id FROM clubs WHERE name = 'Everton')),
  (199, (SELECT id FROM clubs WHERE name = 'Arsenal'));

-- Aaron Ramsey
INSERT INTO player_clubs (player_id, club_id) VALUES
  (200, (SELECT id FROM clubs WHERE name = 'Arsenal')),
  (200, (SELECT id FROM clubs WHERE name = 'Juventus')),
  (200, (SELECT id FROM clubs WHERE name = 'Rangers')),
  (200, (SELECT id FROM clubs WHERE name = 'Nice'));

-- Joe Hart
INSERT INTO player_clubs (player_id, club_id) VALUES
  (201, (SELECT id FROM clubs WHERE name = 'Manchester City')),
  (201, (SELECT id FROM clubs WHERE name = 'Torino')),
  (201, (SELECT id FROM clubs WHERE name = 'Celtic'));

-- Scott Brown
INSERT INTO player_clubs (player_id, club_id) VALUES
  (202, (SELECT id FROM clubs WHERE name = 'Hibernian')),
  (202, (SELECT id FROM clubs WHERE name = 'Celtic')),
  (202, (SELECT id FROM clubs WHERE name = 'Aberdeen'));

-- Kyogo Furuhashi
INSERT INTO player_clubs (player_id, club_id) VALUES
  (203, (SELECT id FROM clubs WHERE name = 'Celtic'));

-- Alfredo Morelos
INSERT INTO player_clubs (player_id, club_id) VALUES
  (204, (SELECT id FROM clubs WHERE name = 'Rangers'));

-- Moussa Dembele
INSERT INTO player_clubs (player_id, club_id) VALUES
  (205, (SELECT id FROM clubs WHERE name = 'Celtic')),
  (205, (SELECT id FROM clubs WHERE name = 'Lyon')),
  (205, (SELECT id FROM clubs WHERE name = 'Atletico Madrid'));

-- ── Aliases ──

INSERT INTO player_aliases (player_id, alias) VALUES
  (1, 'CR7'),
  (1, 'C. Ronaldo'),
  (1, 'Ronaldo'),
  (2, 'Leo Messi'),
  (2, 'Leo'),
  (2, 'La Pulga'),
  (3, 'Neymar Jr'),
  (3, 'Neymar Junior'),
  (4, 'Mbappe'),
  (5, 'Lewy'),
  (6, 'Becks'),
  (7, 'Titi'),
  (8, 'Zlatan'),
  (8, 'Ibra'),
  (9, 'Wazza'),
  (10, 'El Pistolero'),
  (11, 'The Welsh Wizard'),
  (13, 'Grizi'),
  (16, 'El Apache'),
  (17, 'RVP'),
  (17, 'Van Persie'),
  (18, 'El Nino'),
  (19, 'Etoo'),
  (20, 'Dinho'),
  (20, 'R10'),
  (21, 'Cesc'),
  (22, 'Fideo'),
  (24, 'Memphis'),
  (25, 'Auba'),
  (27, 'Raheem'),
  (29, 'KDB'),
  (30, 'Mo Salah'),
  (31, 'Benz'),
  (32, 'Kun Aguero'),
  (32, 'Kun'),
  (34, 'VVD'),
  (36, 'El Matador'),
  (43, 'DDG'),
  (45, 'Xavi'),
  (46, 'Iniesta'),
  (48, 'Pogba'),
  (49, 'Pipita'),
  (53, 'Pique'),
  (54, 'El Guaje'),
  (55, 'El Tigre'),
  (65, 'Dele'),
  (85, 'Vini Jr'),
  (91, 'Case'),
  (92, 'TAA'),
  (93, 'Alisson'),
  (94, 'Thiago'),
  (96, 'Bobby'),
  (126, 'R9'),
  (126, 'Ronaldo Fenomeno'),
  (126, 'O Fenomeno'),
  (130, 'Sheva'),
  (142, 'Zizou'),
  (163, 'La Joya');