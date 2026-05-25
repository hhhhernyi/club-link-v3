-- ============================================================
-- Migration 012 — Americas & Africa clubs
--
-- Continues from migration 011 (last ID: 639).
-- New clubs start at ID 640.
-- ============================================================

-- Rename Montreal Impact to current official name
UPDATE clubs SET name = 'CF Montréal' WHERE id = 120;

-- ── USA1 — MLS additional clubs (IDs 640-662) ───────────────
INSERT INTO clubs (id, name, country, league) VALUES
  (640, 'Austin FC',              'United States', 'USA1'),
  (641, 'Charlotte FC',           'United States', 'USA1'),
  (642, 'Chicago Fire',           'United States', 'USA1'),
  (643, 'Colorado Rapids',        'United States', 'USA1'),
  (644, 'Columbus Crew',          'United States', 'USA1'),
  (645, 'D.C. United',            'United States', 'USA1'),
  (646, 'FC Cincinnati',          'United States', 'USA1'),
  (647, 'FC Dallas',              'United States', 'USA1'),
  (648, 'Houston Dynamo',         'United States', 'USA1'),
  (649, 'Minnesota United',       'United States', 'USA1'),
  (650, 'Nashville SC',           'United States', 'USA1'),
  (651, 'New England Revolution', 'United States', 'USA1'),
  (652, 'New York City FC',       'United States', 'USA1'),
  (653, 'Orlando City',           'United States', 'USA1'),
  (654, 'Philadelphia Union',     'United States', 'USA1'),
  (655, 'Portland Timbers',       'United States', 'USA1'),
  (656, 'Real Salt Lake',         'United States', 'USA1'),
  (657, 'San Jose Earthquakes',   'United States', 'USA1'),
  (658, 'Seattle Sounders',       'United States', 'USA1'),
  (659, 'Sporting Kansas City',   'United States', 'USA1'),
  (660, 'St. Louis City SC',      'United States', 'USA1'),
  (661, 'Toronto FC',             'Canada',        'USA1'),
  (662, 'Vancouver Whitecaps',    'Canada',        'USA1');

-- ── MEX1 — Liga MX (IDs 663-680) ────────────────────────────
INSERT INTO clubs (id, name, country, league) VALUES
  (663, 'Atlas FC',          'Mexico', 'MEX1'),
  (664, 'Club América',      'Mexico', 'MEX1'),
  (665, 'Club León',         'Mexico', 'MEX1'),
  (666, 'Club Necaxa',       'Mexico', 'MEX1'),
  (667, 'Club Puebla',       'Mexico', 'MEX1'),
  (668, 'Cruz Azul',         'Mexico', 'MEX1'),
  (669, 'Guadalajara',       'Mexico', 'MEX1'),
  (670, 'FC Juárez',         'Mexico', 'MEX1'),
  (671, 'Mazatlán FC',       'Mexico', 'MEX1'),
  (672, 'CF Monterrey',      'Mexico', 'MEX1'),
  (673, 'Pachuca',           'Mexico', 'MEX1'),
  (674, 'Pumas UNAM',        'Mexico', 'MEX1'),
  (675, 'Querétaro FC',      'Mexico', 'MEX1'),
  (676, 'Santos Laguna',     'Mexico', 'MEX1'),
  (677, 'Club Tijuana',      'Mexico', 'MEX1'),
  (678, 'Tigres UANL',       'Mexico', 'MEX1'),
  (679, 'Toluca',            'Mexico', 'MEX1'),
  (680, 'Atlético San Luis', 'Mexico', 'MEX1');

-- ── ARG1 — Argentine Primera additional clubs (IDs 681-706) ─
INSERT INTO clubs (id, name, country, league) VALUES
  (681, 'Argentinos Juniors',      'Argentina', 'ARG1'),
  (682, 'Atlético Tucumán',        'Argentina', 'ARG1'),
  (683, 'Barracas Central',        'Argentina', 'ARG1'),
  (684, 'Belgrano',                'Argentina', 'ARG1'),
  (685, 'Colón de Santa Fe',       'Argentina', 'ARG1'),
  (686, 'Defensa y Justicia',      'Argentina', 'ARG1'),
  (687, 'Estudiantes de La Plata', 'Argentina', 'ARG1'),
  (688, 'Godoy Cruz',              'Argentina', 'ARG1'),
  (689, 'Huracán',                 'Argentina', 'ARG1'),
  (690, 'Independiente',           'Argentina', 'ARG1'),
  (691, 'Instituto',               'Argentina', 'ARG1'),
  (692, 'Lanús',                   'Argentina', 'ARG1'),
  (693, 'Newell''s Old Boys',      'Argentina', 'ARG1'),
  (694, 'Platense',                'Argentina', 'ARG1'),
  (695, 'Racing Club',             'Argentina', 'ARG1'),
  (696, 'Rosario Central',         'Argentina', 'ARG1'),
  (697, 'San Lorenzo',             'Argentina', 'ARG1'),
  (698, 'San Martín de Tucumán',   'Argentina', 'ARG1'),
  (699, 'Sarmiento',               'Argentina', 'ARG1'),
  (700, 'Talleres Córdoba',        'Argentina', 'ARG1'),
  (701, 'Tigre',                   'Argentina', 'ARG1'),
  (702, 'Unión de Santa Fe',       'Argentina', 'ARG1'),
  (703, 'Vélez Sársfield',         'Argentina', 'ARG1'),
  (704, 'Central Córdoba',         'Argentina', 'ARG1'),
  (705, 'Banfield',                'Argentina', 'ARG1'),
  (706, 'Olimpo',                  'Argentina', 'ARG1');

-- ── BRA1 — Brazilian Série A additional clubs (IDs 707-723) ─
INSERT INTO clubs (id, name, country, league) VALUES
  (707, 'América Mineiro',      'Brazil', 'BRA1'),
  (708, 'Athletico Paranaense', 'Brazil', 'BRA1'),
  (709, 'Atlético Mineiro',     'Brazil', 'BRA1'),
  (710, 'Avaí',                 'Brazil', 'BRA1'),
  (711, 'Bahia',                'Brazil', 'BRA1'),
  (712, 'Botafogo',             'Brazil', 'BRA1'),
  (713, 'Red Bull Bragantino',  'Brazil', 'BRA1'),
  (714, 'Ceará',                'Brazil', 'BRA1'),
  (715, 'Corinthians',          'Brazil', 'BRA1'),
  (716, 'Cruzeiro',             'Brazil', 'BRA1'),
  (717, 'Fluminense',           'Brazil', 'BRA1'),
  (718, 'Fortaleza',            'Brazil', 'BRA1'),
  (719, 'Goiás',                'Brazil', 'BRA1'),
  (720, 'Grêmio',               'Brazil', 'BRA1'),
  (721, 'Internacional',        'Brazil', 'BRA1'),
  (722, 'Palmeiras',            'Brazil', 'BRA1'),
  (723, 'Vasco da Gama',        'Brazil', 'BRA1');

-- ── COL1 — Colombian Primera A (IDs 724-739) ─────────────────
INSERT INTO clubs (id, name, country, league) VALUES
  (724, 'América de Cali',        'Colombia', 'COL1'),
  (725, 'Atlético Bucaramanga',   'Colombia', 'COL1'),
  (726, 'Atlético Nacional',      'Colombia', 'COL1'),
  (727, 'Boyacá Chicó',           'Colombia', 'COL1'),
  (728, 'Deportes Tolima',        'Colombia', 'COL1'),
  (729, 'Deportivo Cali',         'Colombia', 'COL1'),
  (730, 'Deportivo Pereira',      'Colombia', 'COL1'),
  (731, 'Envigado FC',            'Colombia', 'COL1'),
  (732, 'La Equidad',             'Colombia', 'COL1'),
  (733, 'Junior de Barranquilla', 'Colombia', 'COL1'),
  (734, 'Millonarios',            'Colombia', 'COL1'),
  (735, 'Once Caldas',            'Colombia', 'COL1'),
  (736, 'Patriotas Boyacá',       'Colombia', 'COL1'),
  (737, 'Independiente Santa Fe', 'Colombia', 'COL1'),
  (738, 'Unión Magdalena',        'Colombia', 'COL1'),
  (739, 'Águilas Doradas',        'Colombia', 'COL1');

-- ── CHL1 — Chilean Primera División (IDs 740-755) ────────────
INSERT INTO clubs (id, name, country, league) VALUES
  (740, 'Audax Italiano',          'Chile', 'CHL1'),
  (741, 'CD Cobreloa',             'Chile', 'CHL1'),
  (742, 'Cobresal',                'Chile', 'CHL1'),
  (743, 'Colo-Colo',               'Chile', 'CHL1'),
  (744, 'Curicó Unido',            'Chile', 'CHL1'),
  (745, 'Deportes Antofagasta',    'Chile', 'CHL1'),
  (746, 'Deportes Copiapó',        'Chile', 'CHL1'),
  (747, 'Deportes Iquique',        'Chile', 'CHL1'),
  (748, 'Deportes La Serena',      'Chile', 'CHL1'),
  (749, 'Everton de Viña del Mar', 'Chile', 'CHL1'),
  (750, 'Huachipato',              'Chile', 'CHL1'),
  (751, 'O''Higgins',              'Chile', 'CHL1'),
  (752, 'Palestino',               'Chile', 'CHL1'),
  (753, 'Universidad Católica',    'Chile', 'CHL1'),
  (754, 'Universidad de Chile',    'Chile', 'CHL1'),
  (755, 'Unión La Calera',         'Chile', 'CHL1');

-- ── URU1 — Uruguayan Primera División (IDs 756-769) ──────────
INSERT INTO clubs (id, name, country, league) VALUES
  (756, 'Club Atlético Cerro',     'Uruguay', 'URU1'),
  (757, 'Peñarol',                 'Uruguay', 'URU1'),
  (758, 'Nacional',                'Uruguay', 'URU1'),
  (759, 'Danubio FC',              'Uruguay', 'URU1'),
  (760, 'Defensor Sporting',       'Uruguay', 'URU1'),
  (761, 'Fénix',                   'Uruguay', 'URU1'),
  (762, 'Juventud',                'Uruguay', 'URU1'),
  (763, 'Liverpool FC Montevideo', 'Uruguay', 'URU1'),
  (764, 'Plaza Colonia',           'Uruguay', 'URU1'),
  (765, 'Rampla Juniors',          'Uruguay', 'URU1'),
  (766, 'Racing Club Montevideo',  'Uruguay', 'URU1'),
  (767, 'River Plate Uruguay',     'Uruguay', 'URU1'),
  (768, 'Sud América',             'Uruguay', 'URU1'),
  (769, 'Montevideo Wanderers',    'Uruguay', 'URU1');

-- ── EGY1 — Egyptian Premier League (IDs 770-787) ─────────────
INSERT INTO clubs (id, name, country, league) VALUES
  (770, 'Al Ahly',            'Egypt', 'EGY1'),
  (771, 'Al Masry',           'Egypt', 'EGY1'),
  (772, 'Aswan SC',           'Egypt', 'EGY1'),
  (773, 'Ceramica Cleopatra', 'Egypt', 'EGY1'),
  (774, 'El Gouna',           'Egypt', 'EGY1'),
  (775, 'El Mokawloon',       'Egypt', 'EGY1'),
  (776, 'El Tersana',         'Egypt', 'EGY1'),
  (777, 'Enppi',              'Egypt', 'EGY1'),
  (778, 'Ismaily SC',         'Egypt', 'EGY1'),
  (779, 'Future FC',          'Egypt', 'EGY1'),
  (780, 'National Bank FC',   'Egypt', 'EGY1'),
  (781, 'Pyramids FC',        'Egypt', 'EGY1'),
  (782, 'Smouha SC',          'Egypt', 'EGY1'),
  (783, 'Talaea El Gaish',    'Egypt', 'EGY1'),
  (784, 'Wadi Degla',         'Egypt', 'EGY1'),
  (785, 'Zamalek',            'Egypt', 'EGY1'),
  (786, 'Petrojet',           'Egypt', 'EGY1'),
  (787, 'Ghazl El Mahalla',   'Egypt', 'EGY1');

-- ── RSA1 — South African Premier Division (IDs 788-803) ──────
INSERT INTO clubs (id, name, country, league) VALUES
  (788, 'AmaZulu FC',        'South Africa', 'RSA1'),
  (789, 'Baroka FC',         'South Africa', 'RSA1'),
  (790, 'Cape Town City FC', 'South Africa', 'RSA1'),
  (791, 'Cape Town Spurs',   'South Africa', 'RSA1'),
  (792, 'Chippa United',     'South Africa', 'RSA1'),
  (793, 'Moroka Swallows',   'South Africa', 'RSA1'),
  (794, 'Golden Arrows',     'South Africa', 'RSA1'),
  (795, 'Kaizer Chiefs',     'South Africa', 'RSA1'),
  (796, 'Mamelodi Sundowns', 'South Africa', 'RSA1'),
  (797, 'Maritzburg United', 'South Africa', 'RSA1'),
  (798, 'Orlando Pirates',   'South Africa', 'RSA1'),
  (799, 'Richards Bay FC',   'South Africa', 'RSA1'),
  (800, 'Sekhukhune United', 'South Africa', 'RSA1'),
  (801, 'Stellenbosch FC',   'South Africa', 'RSA1'),
  (802, 'SuperSport United', 'South Africa', 'RSA1'),
  (803, 'TS Galaxy',         'South Africa', 'RSA1');

-- ── MAR1 — Moroccan Botola Pro (IDs 804-819) ─────────────────
INSERT INTO clubs (id, name, country, league) VALUES
  (804, 'AS FAR',                  'Morocco', 'MAR1'),
  (805, 'Chabab Rif Al Hoceima',   'Morocco', 'MAR1'),
  (806, 'Difaa Hassani El Jadidi', 'Morocco', 'MAR1'),
  (807, 'FUS Rabat',               'Morocco', 'MAR1'),
  (808, 'Hassania Agadir',         'Morocco', 'MAR1'),
  (809, 'Ittihad Khemisset',       'Morocco', 'MAR1'),
  (810, 'Ittihad Tanger',          'Morocco', 'MAR1'),
  (811, 'Moghreb Tetouan',         'Morocco', 'MAR1'),
  (812, 'Mouloudia Oujda',         'Morocco', 'MAR1'),
  (813, 'OC Safi',                 'Morocco', 'MAR1'),
  (814, 'Raja Beni Mellal',        'Morocco', 'MAR1'),
  (815, 'Raja Casablanca',         'Morocco', 'MAR1'),
  (816, 'Renaissance Zemamra',     'Morocco', 'MAR1'),
  (817, 'RSB Berkane',             'Morocco', 'MAR1'),
  (818, 'Rapide Oued Zem',         'Morocco', 'MAR1'),
  (819, 'Wydad Athletic Club',     'Morocco', 'MAR1');

-- Reset sequence
SELECT setval('clubs_id_seq', (SELECT MAX(id) FROM clubs));
