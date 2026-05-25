-- ============================================================
-- Migration 011 — European leagues
-- Lower divisions for top 5 + completing existing leagues
-- + new European countries (RUS, GRE, SCO2, DEN, NOR, SWE,
--   SUI, AUT, CRO, CZE, POL, UKR, SRB, ROU, HUN, ISR, POR2)
--
-- IDs continue from migration 010 (last was 271).
-- New IDs: 272 onward.
-- ============================================================

-- ── ESP2 — Segunda División (IDs 272-289) ──────────────────
INSERT INTO clubs (id, name, country, league) VALUES
  (272, 'Almeria',           'Spain', 'ESP2'),
  (273, 'Burgos CF',         'Spain', 'ESP2'),
  (274, 'CD Castellon',      'Spain', 'ESP2'),
  (275, 'Eibar',             'Spain', 'ESP2'),
  (276, 'Elche',             'Spain', 'ESP2'),
  (277, 'Eldense',           'Spain', 'ESP2'),
  (278, 'Granada',           'Spain', 'ESP2'),
  (279, 'Huesca',            'Spain', 'ESP2'),
  (280, 'Levante',           'Spain', 'ESP2'),
  (281, 'Malaga',            'Spain', 'ESP2'),
  (282, 'Mirandes',          'Spain', 'ESP2'),
  (283, 'Ponferradina',      'Spain', 'ESP2'),
  (284, 'Racing Santander',  'Spain', 'ESP2'),
  (285, 'Real Zaragoza',     'Spain', 'ESP2'),
  (286, 'Sporting Gijon',    'Spain', 'ESP2'),
  (287, 'Tenerife',          'Spain', 'ESP2'),
  (288, 'Real Valladolid',   'Spain', 'ESP2'),
  (289, 'Recreativo Huelva', 'Spain', 'ESP2');

-- ── ITA2 — Serie B (IDs 290-307) ───────────────────────────
-- Note: Sassuolo (ID 52) and Sampdoria (ID 53) are already in DB as ITA1
INSERT INTO clubs (id, name, country, league) VALUES
  (290, 'Bari',              'Italy', 'ITA2'),
  (291, 'Brescia Calcio',    'Italy', 'ITA2'),
  (292, 'Catanzaro',         'Italy', 'ITA2'),
  (293, 'Cesena',            'Italy', 'ITA2'),
  (294, 'Cittadella',        'Italy', 'ITA2'),
  (295, 'Cosenza',           'Italy', 'ITA2'),
  (296, 'Cremonese',         'Italy', 'ITA2'),
  (297, 'Juve Stabia',       'Italy', 'ITA2'),
  (298, 'Mantova',           'Italy', 'ITA2'),
  (299, 'Modena',            'Italy', 'ITA2'),
  (300, 'Palermo',           'Italy', 'ITA2'),
  (301, 'Pisa',              'Italy', 'ITA2'),
  (302, 'Reggiana',          'Italy', 'ITA2'),
  (303, 'Salernitana',       'Italy', 'ITA2'),
  (304, 'Spezia',            'Italy', 'ITA2'),
  (305, 'Sudtirol',          'Italy', 'ITA2'),
  (306, 'Venezia',           'Italy', 'ITA2'),
  (307, 'Virtus Entella',    'Italy', 'ITA2');

-- ── GER2 — 2. Bundesliga (IDs 308-324) ─────────────────────
-- Note: Hertha Berlin (ID 77) and Schalke 04 (ID 78) already in DB as GER1
INSERT INTO clubs (id, name, country, league) VALUES
  (308, 'Darmstadt 98',          'Germany', 'GER2'),
  (309, 'Eintracht Braunschweig','Germany', 'GER2'),
  (310, 'FC St. Pauli',          'Germany', 'GER2'),
  (311, 'Fortuna Dusseldorf',    'Germany', 'GER2'),
  (312, 'Greuther Furth',        'Germany', 'GER2'),
  (313, 'Hamburger SV',          'Germany', 'GER2'),
  (314, 'Hannover 96',           'Germany', 'GER2'),
  (315, 'Jahn Regensburg',       'Germany', 'GER2'),
  (316, 'Karlsruher SC',         'Germany', 'GER2'),
  (317, 'Magdeburg',             'Germany', 'GER2'),
  (318, 'Nurnberg',              'Germany', 'GER2'),
  (319, 'Paderborn 07',          'Germany', 'GER2'),
  (320, 'Preussen Munster',      'Germany', 'GER2'),
  (321, 'SpVgg Unterhaching',    'Germany', 'GER2'),
  (322, '1. FC Kaiserslautern',  'Germany', 'GER2'),
  (323, 'VfL Osnabruck',         'Germany', 'GER2'),
  (324, 'Wehen Wiesbaden',       'Germany', 'GER2');

-- ── FRA2 — Ligue 2 (IDs 325-342) ───────────────────────────
-- Note: Saint-Etienne (ID 95) and Auxerre (ID 96) already in DB as FRA1
INSERT INTO clubs (id, name, country, league) VALUES
  (325, 'Amiens SC',      'France', 'FRA2'),
  (326, 'Annecy FC',      'France', 'FRA2'),
  (327, 'SC Bastia',      'France', 'FRA2'),
  (328, 'SM Caen',        'France', 'FRA2'),
  (329, 'Dunkerque',      'France', 'FRA2'),
  (330, 'Grenoble Foot',  'France', 'FRA2'),
  (331, 'Gueugnon',       'France', 'FRA2'),
  (332, 'Guingamp',       'France', 'FRA2'),
  (333, 'Laval',          'France', 'FRA2'),
  (334, 'FC Metz',        'France', 'FRA2'),
  (335, 'Niort',          'France', 'FRA2'),
  (336, 'Paris FC',       'France', 'FRA2'),
  (337, 'Pau FC',         'France', 'FRA2'),
  (338, 'Rodez AF',       'France', 'FRA2'),
  (339, 'Troyes',         'France', 'FRA2'),
  (340, 'Valenciennes',   'France', 'FRA2'),
  (341, 'Versailles',     'France', 'FRA2'),
  (342, 'AC Ajaccio',     'France', 'FRA2');

-- ── POR1 Complete — additional Primeira Liga clubs (IDs 343-355) ──
-- (Benfica 97, Porto 98, Sporting CP 99, Braga 100, Vitoria 101 already in DB)
INSERT INTO clubs (id, name, country, league) VALUES
  (343, 'Boavista',          'Portugal', 'POR1'),
  (344, 'Casa Pia',          'Portugal', 'POR1'),
  (345, 'GD Chaves',         'Portugal', 'POR1'),
  (346, 'Estoril Praia',     'Portugal', 'POR1'),
  (347, 'Famalicao',         'Portugal', 'POR1'),
  (348, 'Farense',           'Portugal', 'POR1'),
  (349, 'Gil Vicente',       'Portugal', 'POR1'),
  (350, 'Moreirense',        'Portugal', 'POR1'),
  (351, 'CD Nacional',       'Portugal', 'POR1'),
  (352, 'Pacos de Ferreira', 'Portugal', 'POR1'),
  (353, 'Portimonense',      'Portugal', 'POR1'),
  (354, 'Rio Ave',           'Portugal', 'POR1'),
  (355, 'Santa Clara',       'Portugal', 'POR1');

-- ── POR2 — Liga Portugal 2 (IDs 356-365) ───────────────────
INSERT INTO clubs (id, name, country, league) VALUES
  (356, 'Academica de Coimbra', 'Portugal', 'POR2'),
  (357, 'Arouca',               'Portugal', 'POR2'),
  (358, 'Belenenses',           'Portugal', 'POR2'),
  (359, 'Cova da Piedade',      'Portugal', 'POR2'),
  (360, 'Leixoes',              'Portugal', 'POR2'),
  (361, 'Penafiel',             'Portugal', 'POR2'),
  (362, 'Tondela',              'Portugal', 'POR2'),
  (363, 'Vizela',               'Portugal', 'POR2'),
  (364, 'Feirense',             'Portugal', 'POR2'),
  (365, 'Mafra',                'Portugal', 'POR2');

-- ── NED1 Complete — additional Eredivisie clubs (IDs 366-380) ──
-- (Ajax 102, PSV Eindhoven 103, Feyenoord 104 already in DB)
INSERT INTO clubs (id, name, country, league) VALUES
  (366, 'AZ Alkmaar',     'Netherlands', 'NED1'),
  (367, 'Almere City',    'Netherlands', 'NED1'),
  (368, 'Excelsior',      'Netherlands', 'NED1'),
  (369, 'FC Emmen',       'Netherlands', 'NED1'),
  (370, 'FC Groningen',   'Netherlands', 'NED1'),
  (371, 'FC Utrecht',     'Netherlands', 'NED1'),
  (372, 'FC Volendam',    'Netherlands', 'NED1'),
  (373, 'Fortuna Sittard','Netherlands', 'NED1'),
  (374, 'Go Ahead Eagles','Netherlands', 'NED1'),
  (375, 'NEC Nijmegen',   'Netherlands', 'NED1'),
  (376, 'RKC Waalwijk',   'Netherlands', 'NED1'),
  (377, 'SC Heerenveen',  'Netherlands', 'NED1'),
  (378, 'Sparta Rotterdam','Netherlands','NED1'),
  (379, 'FC Twente',      'Netherlands', 'NED1'),
  (380, 'Willem II',      'Netherlands', 'NED1');

-- ── SCO1 Complete — additional Scottish Premiership clubs (IDs 381-388) ──
-- (Celtic 105, Rangers 106, Aberdeen 107, Hearts 108, Hibernian 109 already in DB)
INSERT INTO clubs (id, name, country, league) VALUES
  (381, 'Dundee',         'Scotland', 'SCO1'),
  (382, 'Dundee United',  'Scotland', 'SCO1'),
  (383, 'Kilmarnock',     'Scotland', 'SCO1'),
  (384, 'Livingston',     'Scotland', 'SCO1'),
  (385, 'Motherwell',     'Scotland', 'SCO1'),
  (386, 'Ross County',    'Scotland', 'SCO1'),
  (387, 'St. Johnstone',  'Scotland', 'SCO1'),
  (388, 'St. Mirren',     'Scotland', 'SCO1');

-- ── SCO2 — Scottish Championship (IDs 389-398) ─────────────
INSERT INTO clubs (id, name, country, league) VALUES
  (389, 'Ayr United',           'Scotland', 'SCO2'),
  (390, 'Cove Rangers',         'Scotland', 'SCO2'),
  (391, 'Dunfermline Athletic', 'Scotland', 'SCO2'),
  (392, 'Falkirk',              'Scotland', 'SCO2'),
  (393, 'Hamilton Academical',  'Scotland', 'SCO2'),
  (394, 'Inverness CT',         'Scotland', 'SCO2'),
  (395, 'Morton',               'Scotland', 'SCO2'),
  (396, 'Partick Thistle',      'Scotland', 'SCO2'),
  (397, 'Queen''s Park',         'Scotland', 'SCO2'),
  (398, 'Raith Rovers',         'Scotland', 'SCO2');

-- ── BEL1 Complete — additional Belgian Pro League clubs (IDs 399-412) ──
-- (Club Brugge 124, Anderlecht 125 already in DB)
INSERT INTO clubs (id, name, country, league) VALUES
  (399, 'Antwerp',          'Belgium', 'BEL1'),
  (400, 'Beerschot',        'Belgium', 'BEL1'),
  (401, 'Cercle Brugge',    'Belgium', 'BEL1'),
  (402, 'Charleroi',        'Belgium', 'BEL1'),
  (403, 'Dender',           'Belgium', 'BEL1'),
  (404, 'Gent',             'Belgium', 'BEL1'),
  (405, 'Genk',             'Belgium', 'BEL1'),
  (406, 'KV Kortrijk',      'Belgium', 'BEL1'),
  (407, 'KV Mechelen',      'Belgium', 'BEL1'),
  (408, 'OH Leuven',        'Belgium', 'BEL1'),
  (409, 'Sint-Truidense',   'Belgium', 'BEL1'),
  (410, 'Standard Liege',   'Belgium', 'BEL1'),
  (411, 'Westerlo',         'Belgium', 'BEL1'),
  (412, 'Zulte Waregem',    'Belgium', 'BEL1');

-- ── TUR1 Complete — additional Super Lig clubs (IDs 413-427) ──
-- (Galatasaray 121, Fenerbahce 122, Besiktas 123 already in DB)
INSERT INTO clubs (id, name, country, league) VALUES
  (413, 'Adana Demirspor',    'Turkey', 'TUR1'),
  (414, 'Alanyaspor',         'Turkey', 'TUR1'),
  (415, 'Ankaragucu',         'Turkey', 'TUR1'),
  (416, 'Antalyaspor',        'Turkey', 'TUR1'),
  (417, 'Istanbul Basaksehir','Turkey', 'TUR1'),
  (418, 'Bursaspor',          'Turkey', 'TUR1'),
  (419, 'Eyupspor',           'Turkey', 'TUR1'),
  (420, 'Giresunspor',        'Turkey', 'TUR1'),
  (421, 'Hatayspor',          'Turkey', 'TUR1'),
  (422, 'Kasimpasa',          'Turkey', 'TUR1'),
  (423, 'Konyaspor',          'Turkey', 'TUR1'),
  (424, 'Rizespor',           'Turkey', 'TUR1'),
  (425, 'Samsunspor',         'Turkey', 'TUR1'),
  (426, 'Sivasspor',          'Turkey', 'TUR1'),
  (427, 'Trabzonspor',        'Turkey', 'TUR1');

-- ── RUS1 — Russian Premier League (IDs 428-443) ────────────
INSERT INTO clubs (id, name, country, league) VALUES
  (428, 'Akhmat Grozny',       'Russia', 'RUS1'),
  (429, 'Baltika Kaliningrad',  'Russia', 'RUS1'),
  (430, 'CSKA Moscow',          'Russia', 'RUS1'),
  (431, 'Dinamo Moscow',        'Russia', 'RUS1'),
  (432, 'Fakel Voronezh',       'Russia', 'RUS1'),
  (433, 'FK Krasnodar',         'Russia', 'RUS1'),
  (434, 'Krylya Sovetov Samara','Russia', 'RUS1'),
  (435, 'Lokomotiv Moscow',     'Russia', 'RUS1'),
  (436, 'FC Orenburg',          'Russia', 'RUS1'),
  (437, 'FK Rostov',            'Russia', 'RUS1'),
  (438, 'Rubin Kazan',          'Russia', 'RUS1'),
  (439, 'Spartak Moscow',       'Russia', 'RUS1'),
  (440, 'Torpedo Moscow',       'Russia', 'RUS1'),
  (441, 'Zenit St. Petersburg', 'Russia', 'RUS1'),
  (442, 'FC Ural Yekaterinburg','Russia', 'RUS1'),
  (443, 'Rotor Volgograd',      'Russia', 'RUS1');

-- ── GRE1 — Super League Greece (IDs 444-457) ───────────────
INSERT INTO clubs (id, name, country, league) VALUES
  (444, 'AEK Athens',      'Greece', 'GRE1'),
  (445, 'Aris Thessaloniki','Greece', 'GRE1'),
  (446, 'Asteras Tripolis', 'Greece', 'GRE1'),
  (447, 'Atromitos',        'Greece', 'GRE1'),
  (448, 'Ionikos',          'Greece', 'GRE1'),
  (449, 'PAS Lamia',        'Greece', 'GRE1'),
  (450, 'OFI Crete',        'Greece', 'GRE1'),
  (451, 'Olympiacos',       'Greece', 'GRE1'),
  (452, 'Panathinaikos',    'Greece', 'GRE1'),
  (453, 'PAOK',             'Greece', 'GRE1'),
  (454, 'Panaitolikos',     'Greece', 'GRE1'),
  (455, 'PAS Giannina',     'Greece', 'GRE1'),
  (456, 'Panetolikos',      'Greece', 'GRE1'),
  (457, 'Volos NPS',        'Greece', 'GRE1');

-- ── DEN1 — Danish Superliga (IDs 458-471) ──────────────────
INSERT INTO clubs (id, name, country, league) VALUES
  (458, 'AC Horsens',      'Denmark', 'DEN1'),
  (459, 'AGF Aarhus',      'Denmark', 'DEN1'),
  (460, 'Brondby IF',      'Denmark', 'DEN1'),
  (461, 'Esbjerg fB',      'Denmark', 'DEN1'),
  (462, 'FC Copenhagen',   'Denmark', 'DEN1'),
  (463, 'FC Fredericia',   'Denmark', 'DEN1'),
  (464, 'FC Midtjylland',  'Denmark', 'DEN1'),
  (465, 'FC Nordsjaelland','Denmark', 'DEN1'),
  (466, 'HB Koge',         'Denmark', 'DEN1'),
  (467, 'OB Odense',       'Denmark', 'DEN1'),
  (468, 'Randers FC',      'Denmark', 'DEN1'),
  (469, 'Silkeborg IF',    'Denmark', 'DEN1'),
  (470, 'Sonderjyske',     'Denmark', 'DEN1'),
  (471, 'Viborg FF',       'Denmark', 'DEN1');

-- ── NOR1 — Norwegian Eliteserien (IDs 472-487) ─────────────
INSERT INTO clubs (id, name, country, league) VALUES
  (472, 'Aalesund',        'Norway', 'NOR1'),
  (473, 'Bodo/Glimt',      'Norway', 'NOR1'),
  (474, 'SK Brann',        'Norway', 'NOR1'),
  (475, 'FK Haugesund',    'Norway', 'NOR1'),
  (476, 'FK Jerv',         'Norway', 'NOR1'),
  (477, 'HamKam',          'Norway', 'NOR1'),
  (478, 'IK Start',        'Norway', 'NOR1'),
  (479, 'Lillestrom SK',   'Norway', 'NOR1'),
  (480, 'Molde FK',        'Norway', 'NOR1'),
  (481, 'Odd Grenland',    'Norway', 'NOR1'),
  (482, 'Rosenborg BK',    'Norway', 'NOR1'),
  (483, 'Sandefjord',      'Norway', 'NOR1'),
  (484, 'Sarpsborg 08',    'Norway', 'NOR1'),
  (485, 'SK Stabak',       'Norway', 'NOR1'),
  (486, 'Stromsgodset',    'Norway', 'NOR1'),
  (487, 'Valerenga',       'Norway', 'NOR1');

-- ── SWE1 — Swedish Allsvenskan (IDs 488-503) ───────────────
INSERT INTO clubs (id, name, country, league) VALUES
  (488, 'AIK',             'Sweden', 'SWE1'),
  (489, 'Djurgardens IF',  'Sweden', 'SWE1'),
  (490, 'IF Elfsborg',     'Sweden', 'SWE1'),
  (491, 'GIF Sundsvall',   'Sweden', 'SWE1'),
  (492, 'Halmstads BK',    'Sweden', 'SWE1'),
  (493, 'Hammarby IF',     'Sweden', 'SWE1'),
  (494, 'IFK Goteborg',    'Sweden', 'SWE1'),
  (495, 'IFK Norrkoping',  'Sweden', 'SWE1'),
  (496, 'IFK Varnamo',     'Sweden', 'SWE1'),
  (497, 'Kalmar FF',       'Sweden', 'SWE1'),
  (498, 'Malmo FF',        'Sweden', 'SWE1'),
  (499, 'Mjallby AIF',     'Sweden', 'SWE1'),
  (500, 'IFK Sirius',      'Sweden', 'SWE1'),
  (501, 'Varberg BoIS',    'Sweden', 'SWE1'),
  (502, 'Orebro SK',       'Sweden', 'SWE1'),
  (503, 'Ostersunds FK',   'Sweden', 'SWE1');

-- ── SUI1 — Swiss Super League (IDs 504-515) ────────────────
INSERT INTO clubs (id, name, country, league) VALUES
  (504, 'BSC Young Boys',      'Switzerland', 'SUI1'),
  (505, 'FC Basel',            'Switzerland', 'SUI1'),
  (506, 'FC Lausanne-Sport',   'Switzerland', 'SUI1'),
  (507, 'FC Luzern',           'Switzerland', 'SUI1'),
  (508, 'FC Lugano',           'Switzerland', 'SUI1'),
  (509, 'FC Servette',         'Switzerland', 'SUI1'),
  (510, 'FC St. Gallen',       'Switzerland', 'SUI1'),
  (511, 'FC Winterthur',       'Switzerland', 'SUI1'),
  (512, 'FC Zurich',           'Switzerland', 'SUI1'),
  (513, 'Grasshopper Club',    'Switzerland', 'SUI1'),
  (514, 'Stade Lausanne-Ouchy','Switzerland', 'SUI1'),
  (515, 'Yverdon-Sport',       'Switzerland', 'SUI1');

-- ── AUT1 — Austrian Bundesliga (IDs 516-527) ───────────────
INSERT INTO clubs (id, name, country, league) VALUES
  (516, 'FK Austria Wien',     'Austria', 'AUT1'),
  (517, 'LASK',                'Austria', 'AUT1'),
  (518, 'SK Rapid Wien',       'Austria', 'AUT1'),
  (519, 'FC Red Bull Salzburg','Austria', 'AUT1'),
  (520, 'SCR Altach',          'Austria', 'AUT1'),
  (521, 'SV Ried',             'Austria', 'AUT1'),
  (522, 'SK Sturm Graz',       'Austria', 'AUT1'),
  (523, 'WSG Tirol',           'Austria', 'AUT1'),
  (524, 'RZ Pellets WAC',      'Austria', 'AUT1'),
  (525, 'Blau-Weiss Linz',     'Austria', 'AUT1'),
  (526, 'FC Juniors OO',       'Austria', 'AUT1'),
  (527, 'TSV Hartberg',        'Austria', 'AUT1');

-- ── CRO1 — Croatian HNL (IDs 528-537) ──────────────────────
INSERT INTO clubs (id, name, country, league) VALUES
  (528, 'Dinamo Zagreb',    'Croatia', 'CRO1'),
  (529, 'Hajduk Split',     'Croatia', 'CRO1'),
  (530, 'HNK Gorica',       'Croatia', 'CRO1'),
  (531, 'HNK Rijeka',       'Croatia', 'CRO1'),
  (532, 'HNK Sibenik',      'Croatia', 'CRO1'),
  (533, 'NK Lokomotiva',    'Croatia', 'CRO1'),
  (534, 'NK Osijek',        'Croatia', 'CRO1'),
  (535, 'NK Slaven Belupo', 'Croatia', 'CRO1'),
  (536, 'NK Varazdin',      'Croatia', 'CRO1'),
  (537, 'HNK Istra 1961',   'Croatia', 'CRO1');

-- ── CZE1 — Czech First League (IDs 538-553) ────────────────
INSERT INTO clubs (id, name, country, league) VALUES
  (538, 'AC Sparta Prague',  'Czech Republic', 'CZE1'),
  (539, 'Banik Ostrava',     'Czech Republic', 'CZE1'),
  (540, 'Bohemians 1905',    'Czech Republic', 'CZE1'),
  (541, 'FK Jablonec',       'Czech Republic', 'CZE1'),
  (542, 'FK Teplice',        'Czech Republic', 'CZE1'),
  (543, 'Hradec Kralove',    'Czech Republic', 'CZE1'),
  (544, 'Slovan Liberec',    'Czech Republic', 'CZE1'),
  (545, 'Mlada Boleslav',    'Czech Republic', 'CZE1'),
  (546, 'Zbrojovka Brno',    'Czech Republic', 'CZE1'),
  (547, 'Sigma Olomouc',     'Czech Republic', 'CZE1'),
  (548, 'Pardubice',         'Czech Republic', 'CZE1'),
  (549, 'Slavia Prague',     'Czech Republic', 'CZE1'),
  (550, 'FC Slovacko',       'Czech Republic', 'CZE1'),
  (551, 'Viktoria Plzen',    'Czech Republic', 'CZE1'),
  (552, 'Fastav Zlin',       'Czech Republic', 'CZE1'),
  (553, 'Dukla Prague',      'Czech Republic', 'CZE1');

-- ── POL1 — Polish Ekstraklasa (IDs 554-571) ────────────────
INSERT INTO clubs (id, name, country, league) VALUES
  (554, 'Cracovia',           'Poland', 'POL1'),
  (555, 'Gornik Zabrze',      'Poland', 'POL1'),
  (556, 'GKS Katowice',       'Poland', 'POL1'),
  (557, 'Jagiellonia Bialystok','Poland','POL1'),
  (558, 'Korona Kielce',      'Poland', 'POL1'),
  (559, 'Lech Poznan',        'Poland', 'POL1'),
  (560, 'Lechia Gdansk',      'Poland', 'POL1'),
  (561, 'Legia Warsaw',       'Poland', 'POL1'),
  (562, 'Miedz Legnica',      'Poland', 'POL1'),
  (563, 'Piast Gliwice',      'Poland', 'POL1'),
  (564, 'Pogon Szczecin',     'Poland', 'POL1'),
  (565, 'Rakow Czestochowa',  'Poland', 'POL1'),
  (566, 'Ruch Chorzow',       'Poland', 'POL1'),
  (567, 'Slask Wroclaw',      'Poland', 'POL1'),
  (568, 'Warta Poznan',       'Poland', 'POL1'),
  (569, 'Widzew Lodz',        'Poland', 'POL1'),
  (570, 'Wisla Krakow',       'Poland', 'POL1'),
  (571, 'Zaglebie Lubin',     'Poland', 'POL1');

-- ── UKR1 — Ukrainian Premier League (IDs 572-583) ──────────
INSERT INTO clubs (id, name, country, league) VALUES
  (572, 'Chornomorets Odesa',    'Ukraine', 'UKR1'),
  (573, 'Desna Chernihiv',       'Ukraine', 'UKR1'),
  (574, 'Dnipro-1',              'Ukraine', 'UKR1'),
  (575, 'Dynamo Kyiv',           'Ukraine', 'UKR1'),
  (576, 'Kolos Kovalivka',       'Ukraine', 'UKR1'),
  (577, 'Kryvbas Kryvyi Rih',    'Ukraine', 'UKR1'),
  (578, 'LNZ Cherkasy',          'Ukraine', 'UKR1'),
  (579, 'Metalist 1925 Kharkiv', 'Ukraine', 'UKR1'),
  (580, 'Oleksandriya',          'Ukraine', 'UKR1'),
  (581, 'Rukh Lviv',             'Ukraine', 'UKR1'),
  (582, 'Shakhtar Donetsk',      'Ukraine', 'UKR1'),
  (583, 'Vorskla Poltava',       'Ukraine', 'UKR1');

-- ── SRB1 — Serbian SuperLiga (IDs 584-597) ─────────────────
INSERT INTO clubs (id, name, country, league) VALUES
  (584, 'FK Cukaricki',       'Serbia', 'SRB1'),
  (585, 'FK Mladost Lucani',  'Serbia', 'SRB1'),
  (586, 'FK Napredak',        'Serbia', 'SRB1'),
  (587, 'FK Partizan',        'Serbia', 'SRB1'),
  (588, 'FK Radnicki Nis',    'Serbia', 'SRB1'),
  (589, 'FK Vojvodina',       'Serbia', 'SRB1'),
  (590, 'OFK Beograd',        'Serbia', 'SRB1'),
  (591, 'Red Star Belgrade',  'Serbia', 'SRB1'),
  (592, 'FK TSC Backa Topola','Serbia', 'SRB1'),
  (593, 'FK Spartak Subotica','Serbia', 'SRB1'),
  (594, 'FK Radnik Bijeljina','Serbia', 'SRB1'),
  (595, 'FK Novi Pazar',      'Serbia', 'SRB1'),
  (596, 'FK Kolubara',        'Serbia', 'SRB1'),
  (597, 'FK Proleter Novi Sad','Serbia','SRB1');

-- ── ROU1 — Romanian Liga I (IDs 598-613) ───────────────────
INSERT INTO clubs (id, name, country, league) VALUES
  (598, 'CFR Cluj',             'Romania', 'ROU1'),
  (599, 'Dinamo Bucharest',     'Romania', 'ROU1'),
  (600, 'FCSB',                 'Romania', 'ROU1'),
  (601, 'FC Arges',             'Romania', 'ROU1'),
  (602, 'FC Botosani',          'Romania', 'ROU1'),
  (603, 'FC Hermannstadt',      'Romania', 'ROU1'),
  (604, 'FC Petrolul Ploiesti', 'Romania', 'ROU1'),
  (605, 'Politehnica Iasi',     'Romania', 'ROU1'),
  (606, 'FC Rapid Bucuresti',   'Romania', 'ROU1'),
  (607, 'FC Universitatea Cluj','Romania', 'ROU1'),
  (608, 'Farul Constanta',      'Romania', 'ROU1'),
  (609, 'Otelul Galati',        'Romania', 'ROU1'),
  (610, 'Sepsi OSK',            'Romania', 'ROU1'),
  (611, 'Universitatea Craiova','Romania', 'ROU1'),
  (612, 'UTA Arad',             'Romania', 'ROU1'),
  (613, 'Voluntari',            'Romania', 'ROU1');

-- ── HUN1 — Hungarian OTP Liga (IDs 614-625) ────────────────
INSERT INTO clubs (id, name, country, league) VALUES
  (614, 'Debrecen',          'Hungary', 'HUN1'),
  (615, 'Diosgyori VTK',     'Hungary', 'HUN1'),
  (616, 'Fehervar FC',       'Hungary', 'HUN1'),
  (617, 'Ferencvaros',       'Hungary', 'HUN1'),
  (618, 'ETO FC Gyor',       'Hungary', 'HUN1'),
  (619, 'Budapest Honved',   'Hungary', 'HUN1'),
  (620, 'Kecskemet',         'Hungary', 'HUN1'),
  (621, 'Kisvarda',          'Hungary', 'HUN1'),
  (622, 'MTK Budapest',      'Hungary', 'HUN1'),
  (623, 'Paks',              'Hungary', 'HUN1'),
  (624, 'Puskas Akademia',   'Hungary', 'HUN1'),
  (625, 'Zalaegerszeg',      'Hungary', 'HUN1');

-- ── ISR1 — Israeli Premier League (IDs 626-639) ────────────
INSERT INTO clubs (id, name, country, league) VALUES
  (626, 'Ashdod FC',          'Israel', 'ISR1'),
  (627, 'Beitar Jerusalem',   'Israel', 'ISR1'),
  (628, 'Bnei Sakhnin',       'Israel', 'ISR1'),
  (629, 'Ironi Kiryat Shmona','Israel', 'ISR1'),
  (630, 'Hapoel Beer Sheva',  'Israel', 'ISR1'),
  (631, 'Hapoel Jerusalem',   'Israel', 'ISR1'),
  (632, 'Hapoel Petah Tikva', 'Israel', 'ISR1'),
  (633, 'Hapoel Tel Aviv',    'Israel', 'ISR1'),
  (634, 'Maccabi Haifa',      'Israel', 'ISR1'),
  (635, 'Maccabi Netanya',    'Israel', 'ISR1'),
  (636, 'Maccabi Petah Tikva','Israel', 'ISR1'),
  (637, 'Maccabi Tel Aviv',   'Israel', 'ISR1'),
  (638, 'Sektzia Ness Ziona', 'Israel', 'ISR1'),
  (639, 'Ironi Tiberias',     'Israel', 'ISR1');

-- Reset sequence
SELECT setval('clubs_id_seq', (SELECT MAX(id) FROM clubs));
