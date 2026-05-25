-- ============================================================
-- Migration 013 — Asian leagues clubs
--
-- Continues from migration 012 (last ID: 819).
-- New clubs start at ID 820.
-- ============================================================

-- ── JPN1 — J1 League (IDs 820-837) ──────────────────────────
INSERT INTO clubs (id, name, country, league) VALUES
  (820, 'Albirex Niigata',      'Japan', 'JPN1'),
  (821, 'Avispa Fukuoka',       'Japan', 'JPN1'),
  (822, 'Cerezo Osaka',         'Japan', 'JPN1'),
  (823, 'Consadole Sapporo',    'Japan', 'JPN1'),
  (824, 'FC Tokyo',             'Japan', 'JPN1'),
  (825, 'Gamba Osaka',          'Japan', 'JPN1'),
  (826, 'Kashima Antlers',      'Japan', 'JPN1'),
  (827, 'Kashiwa Reysol',       'Japan', 'JPN1'),
  (828, 'Kawasaki Frontale',    'Japan', 'JPN1'),
  (829, 'Kyoto Sanga',          'Japan', 'JPN1'),
  (830, 'Nagoya Grampus',       'Japan', 'JPN1'),
  (831, 'Sagan Tosu',           'Japan', 'JPN1'),
  (832, 'Sanfrecce Hiroshima',  'Japan', 'JPN1'),
  (833, 'Shonan Bellmare',      'Japan', 'JPN1'),
  (834, 'Urawa Red Diamonds',   'Japan', 'JPN1'),
  (835, 'Vissel Kobe',          'Japan', 'JPN1'),
  (836, 'Yokohama F. Marinos',  'Japan', 'JPN1'),
  (837, 'Yokohama FC',          'Japan', 'JPN1');

-- ── JPN2 — J2 League notable clubs (IDs 838-847) ────────────
INSERT INTO clubs (id, name, country, league) VALUES
  (838, 'FC Gifu',               'Japan', 'JPN2'),
  (839, 'Jubilo Iwata',          'Japan', 'JPN2'),
  (840, 'Matsumoto Yamaga',      'Japan', 'JPN2'),
  (841, 'Mito HollyHock',        'Japan', 'JPN2'),
  (842, 'Montedio Yamagata',     'Japan', 'JPN2'),
  (843, 'Thespakusatsu Gunma',   'Japan', 'JPN2'),
  (844, 'Tokushima Vortis',      'Japan', 'JPN2'),
  (845, 'Ventforet Kofu',        'Japan', 'JPN2'),
  (846, 'Roasso Kumamoto',       'Japan', 'JPN2'),
  (847, 'V-Varen Nagasaki',      'Japan', 'JPN2');

-- ── KOR1 — K League 1 (IDs 848-859) ─────────────────────────
INSERT INTO clubs (id, name, country, league) VALUES
  (848, 'Daegu FC',                  'South Korea', 'KOR1'),
  (849, 'Daejeon Hana Citizen',      'South Korea', 'KOR1'),
  (850, 'FC Seoul',                  'South Korea', 'KOR1'),
  (851, 'Gangwon FC',                'South Korea', 'KOR1'),
  (852, 'Gwangju FC',                'South Korea', 'KOR1'),
  (853, 'Incheon United',            'South Korea', 'KOR1'),
  (854, 'Jeju United',               'South Korea', 'KOR1'),
  (855, 'Jeonbuk Hyundai Motors',    'South Korea', 'KOR1'),
  (856, 'Pohang Steelers',           'South Korea', 'KOR1'),
  (857, 'Seongnam FC',               'South Korea', 'KOR1'),
  (858, 'Suwon Samsung Bluewings',   'South Korea', 'KOR1'),
  (859, 'Ulsan HD',                  'South Korea', 'KOR1');

-- ── KOR2 — K League 2 notable clubs (IDs 860-867) ────────────
INSERT INTO clubs (id, name, country, league) VALUES
  (860, 'Ansan Greeners',    'South Korea', 'KOR2'),
  (861, 'Bucheon FC 1995',   'South Korea', 'KOR2'),
  (862, 'Chungnam Asan FC',  'South Korea', 'KOR2'),
  (863, 'Gimpo FC',          'South Korea', 'KOR2'),
  (864, 'Gyeongnam FC',      'South Korea', 'KOR2'),
  (865, 'Jeonnam Dragons',   'South Korea', 'KOR2'),
  (866, 'Seoul E-Land FC',   'South Korea', 'KOR2'),
  (867, 'Suwon FC',          'South Korea', 'KOR2');

-- ── CHN1 — Chinese Super League (IDs 868-884) ────────────────
INSERT INTO clubs (id, name, country, league) VALUES
  (868, 'Beijing Guoan',          'China', 'CHN1'),
  (869, 'Cangzhou Mighty Lions',  'China', 'CHN1'),
  (870, 'Changchun Yatai',        'China', 'CHN1'),
  (871, 'Chengdu Rongcheng',      'China', 'CHN1'),
  (872, 'Dalian Professional FC', 'China', 'CHN1'),
  (873, 'Guangzhou City FC',      'China', 'CHN1'),
  (874, 'Guangzhou FC',           'China', 'CHN1'),
  (875, 'Hebei FC',               'China', 'CHN1'),
  (876, 'Meizhou Hakka',          'China', 'CHN1'),
  (877, 'Qingdao Hainiu',         'China', 'CHN1'),
  (878, 'Shandong Taishan',       'China', 'CHN1'),
  (879, 'Shanghai Port',          'China', 'CHN1'),
  (880, 'Shanghai Shenhua',       'China', 'CHN1'),
  (881, 'Shenzhen FC',            'China', 'CHN1'),
  (882, 'Tianjin Jinmen Tiger',   'China', 'CHN1'),
  (883, 'Wuhan Three Towns',      'China', 'CHN1'),
  (884, 'Zhejiang FC',            'China', 'CHN1');

-- ── AUS1 — A-League (IDs 885-896) ────────────────────────────
INSERT INTO clubs (id, name, country, league) VALUES
  (885, 'Adelaide United',         'Australia',   'AUS1'),
  (886, 'Auckland FC',             'New Zealand',  'AUS1'),
  (887, 'Brisbane Roar',           'Australia',   'AUS1'),
  (888, 'Central Coast Mariners',  'Australia',   'AUS1'),
  (889, 'Macarthur FC',            'Australia',   'AUS1'),
  (890, 'Melbourne City',          'Australia',   'AUS1'),
  (891, 'Melbourne Victory',       'Australia',   'AUS1'),
  (892, 'Perth Glory',             'Australia',   'AUS1'),
  (893, 'Sydney FC',               'Australia',   'AUS1'),
  (894, 'Wellington Phoenix',      'New Zealand',  'AUS1'),
  (895, 'Western Sydney Wanderers','Australia',   'AUS1'),
  (896, 'Western United',          'Australia',   'AUS1');

-- ── IND1 — Indian Super League (IDs 897-909) ─────────────────
INSERT INTO clubs (id, name, country, league) VALUES
  (897, 'Bengaluru FC',            'India', 'IND1'),
  (898, 'Chennaiyin FC',           'India', 'IND1'),
  (899, 'East Bengal FC',          'India', 'IND1'),
  (900, 'FC Goa',                  'India', 'IND1'),
  (901, 'Hyderabad FC',            'India', 'IND1'),
  (902, 'Jamshedpur FC',           'India', 'IND1'),
  (903, 'Kerala Blasters FC',      'India', 'IND1'),
  (904, 'Mohun Bagan Super Giant', 'India', 'IND1'),
  (905, 'Mohammedan SC',           'India', 'IND1'),
  (906, 'Mumbai City FC',          'India', 'IND1'),
  (907, 'NorthEast United FC',     'India', 'IND1'),
  (908, 'Odisha FC',               'India', 'IND1'),
  (909, 'Punjab FC',               'India', 'IND1');

-- ── THA1 — Thai League 1 (IDs 910-925) ───────────────────────
INSERT INTO clubs (id, name, country, league) VALUES
  (910, 'Ayutthaya United',       'Thailand', 'THA1'),
  (911, 'Bangkok United',         'Thailand', 'THA1'),
  (912, 'Buriram United',         'Thailand', 'THA1'),
  (913, 'Chiangrai United',       'Thailand', 'THA1'),
  (914, 'Chonburi FC',            'Thailand', 'THA1'),
  (915, 'Kanchanaburi FC',        'Thailand', 'THA1'),
  (916, 'Lamphun Warrior',        'Thailand', 'THA1'),
  (917, 'Muang Thong United',     'Thailand', 'THA1'),
  (918, 'Nakhon Ratchasima Mazda','Thailand', 'THA1'),
  (919, 'Pathum United',          'Thailand', 'THA1'),
  (920, 'Port FC',                'Thailand', 'THA1'),
  (921, 'Prachuap FC',            'Thailand', 'THA1'),
  (922, 'Ratchaburi Mitr Phol',   'Thailand', 'THA1'),
  (923, 'Rayong FC',              'Thailand', 'THA1'),
  (924, 'Sukhothai FC',           'Thailand', 'THA1'),
  (925, 'Uthai Thani FC',         'Thailand', 'THA1');

-- ── MAS1 — Malaysian Super League (IDs 926-938) ──────────────
INSERT INTO clubs (id, name, country, league) VALUES
  (926, 'DPMM FC',                       'Brunei',   'MAS1'),
  (927, 'Imigresen FC',                  'Malaysia', 'MAS1'),
  (928, 'Johor Darul Ta''zim',           'Malaysia', 'MAS1'),
  (929, 'Kelantan The Real Warriors',    'Malaysia', 'MAS1'),
  (930, 'Kuala Lumpur City FC',          'Malaysia', 'MAS1'),
  (931, 'Kuching City FC',               'Malaysia', 'MAS1'),
  (932, 'Melaka United',                 'Malaysia', 'MAS1'),
  (933, 'Negeri Sembilan FA',            'Malaysia', 'MAS1'),
  (934, 'PDRM FC',                       'Malaysia', 'MAS1'),
  (935, 'Penang FC',                     'Malaysia', 'MAS1'),
  (936, 'Sabah FA',                      'Malaysia', 'MAS1'),
  (937, 'Selangor FC',                   'Malaysia', 'MAS1'),
  (938, 'Terengganu FC',                 'Malaysia', 'MAS1');

-- ── SGP1 — Singapore Premier League (IDs 939-946) ────────────
INSERT INTO clubs (id, name, country, league) VALUES
  (939, 'Albirex Niigata (S)',  'Singapore', 'SGP1'),
  (940, 'Balestier Khalsa',     'Singapore', 'SGP1'),
  (941, 'Tampines Rovers',      'Singapore', 'SGP1'),
  (942, 'Geylang International','Singapore', 'SGP1'),
  (943, 'Hougang United',       'Singapore', 'SGP1'),
  (944, 'Lion City Sailors',    'Singapore', 'SGP1'),
  (945, 'Tanjong Pagar United', 'Singapore', 'SGP1'),
  (946, 'Young Lions',          'Singapore', 'SGP1');

-- ── IDN1 — Indonesian Liga 1 (IDs 947-964) ───────────────────
INSERT INTO clubs (id, name, country, league) VALUES
  (947, 'Arema FC',           'Indonesia', 'IDN1'),
  (948, 'Bali United',        'Indonesia', 'IDN1'),
  (949, 'Bhayangkara FC',     'Indonesia', 'IDN1'),
  (950, 'Borneo FC',          'Indonesia', 'IDN1'),
  (951, 'Dewa United FC',     'Indonesia', 'IDN1'),
  (952, 'Madura United',      'Indonesia', 'IDN1'),
  (953, 'Malut United',       'Indonesia', 'IDN1'),
  (954, 'Persebaya Surabaya', 'Indonesia', 'IDN1'),
  (955, 'Persib Bandung',     'Indonesia', 'IDN1'),
  (956, 'Persija Jakarta',    'Indonesia', 'IDN1'),
  (957, 'Persijap Jepara',    'Indonesia', 'IDN1'),
  (958, 'Persik Kediri',      'Indonesia', 'IDN1'),
  (959, 'Persis Solo',        'Indonesia', 'IDN1'),
  (960, 'Persita Tangerang',  'Indonesia', 'IDN1'),
  (961, 'PSBS Biak Numfor',   'Indonesia', 'IDN1'),
  (962, 'PSIM Yogyakarta',    'Indonesia', 'IDN1'),
  (963, 'PSM Makassar',       'Indonesia', 'IDN1'),
  (964, 'Semen Padang',       'Indonesia', 'IDN1');

-- ── VIE1 — Vietnam V.League 1 (IDs 965-978) ──────────────────
INSERT INTO clubs (id, name, country, league) VALUES
  (965, 'Becamex Binh Duong', 'Vietnam', 'VIE1'),
  (966, 'CAHN FC',            'Vietnam', 'VIE1'),
  (967, 'Ha Noi FC',          'Vietnam', 'VIE1'),
  (968, 'Ha Tinh FC',         'Vietnam', 'VIE1'),
  (969, 'Hai Phong FC',       'Vietnam', 'VIE1'),
  (970, 'Hoang Anh Gia Lai',  'Vietnam', 'VIE1'),
  (971, 'Ho Chi Minh City FC','Vietnam', 'VIE1'),
  (972, 'Nam Dinh FC',        'Vietnam', 'VIE1'),
  (973, 'Pho Hien FC',        'Vietnam', 'VIE1'),
  (974, 'SHB Da Nang',        'Vietnam', 'VIE1'),
  (975, 'Song Lam Nghe An',   'Vietnam', 'VIE1'),
  (976, 'Thanh Hoa FC',       'Vietnam', 'VIE1'),
  (977, 'Viettel FC',         'Vietnam', 'VIE1'),
  (978, 'Quang Nam FC',       'Vietnam', 'VIE1');

-- ── UAE1 — UAE Pro League (IDs 979-992) ──────────────────────
INSERT INTO clubs (id, name, country, league) VALUES
  (979,  'Ajman Club',       'UAE', 'UAE1'),
  (980,  'Al Ain FC',        'UAE', 'UAE1'),
  (981,  'Al Bataeh',        'UAE', 'UAE1'),
  (982,  'Al Dhafra FC',     'UAE', 'UAE1'),
  (983,  'Al Jazira Club',   'UAE', 'UAE1'),
  (984,  'Al Nasr Dubai',    'UAE', 'UAE1'),
  (985,  'Al Sharjah',       'UAE', 'UAE1'),
  (986,  'Al Wahda FC',      'UAE', 'UAE1'),
  (987,  'Al Wasl',          'UAE', 'UAE1'),
  (988,  'Bani Yas',         'UAE', 'UAE1'),
  (989,  'Dibba Al Fujairah','UAE', 'UAE1'),
  (990,  'Ittihad Kalba',    'UAE', 'UAE1'),
  (991,  'Khorfakkan',       'UAE', 'UAE1'),
  (992,  'Shabab Al Ahli',   'UAE', 'UAE1');

-- ── SAU1 — Saudi Pro League additional clubs (IDs 993-1006) ──
INSERT INTO clubs (id, name, country, league) VALUES
  (993,  'Abha Club',     'Saudi Arabia', 'SAU1'),
  (994,  'Al-Batin FC',   'Saudi Arabia', 'SAU1'),
  (995,  'Al-Fayha',      'Saudi Arabia', 'SAU1'),
  (996,  'Al-Fateh',      'Saudi Arabia', 'SAU1'),
  (997,  'Al-Hazm',       'Saudi Arabia', 'SAU1'),
  (998,  'Al-Khaleej',    'Saudi Arabia', 'SAU1'),
  (999,  'Al-Kholood',    'Saudi Arabia', 'SAU1'),
  (1000, 'Al-Okhdood',    'Saudi Arabia', 'SAU1'),
  (1001, 'Al-Qadsiah',    'Saudi Arabia', 'SAU1'),
  (1002, 'Al-Raed',       'Saudi Arabia', 'SAU1'),
  (1003, 'Al-Riyadh',     'Saudi Arabia', 'SAU1'),
  (1004, 'Al-Tai',        'Saudi Arabia', 'SAU1'),
  (1005, 'Al-Taawoun',    'Saudi Arabia', 'SAU1'),
  (1006, 'Al-Wehda',      'Saudi Arabia', 'SAU1');

-- ── QAT1 — Qatar Stars League (IDs 1007-1018) ────────────────
INSERT INTO clubs (id, name, country, league) VALUES
  (1007, 'Al Ahli SC',      'Qatar', 'QAT1'),
  (1008, 'Al Arabi SC',     'Qatar', 'QAT1'),
  (1009, 'Al Duhail SC',    'Qatar', 'QAT1'),
  (1010, 'Al Gharafa SC',   'Qatar', 'QAT1'),
  (1011, 'Al Khor SC',      'Qatar', 'QAT1'),
  (1012, 'Al Rayyan SC',    'Qatar', 'QAT1'),
  (1013, 'Al Sadd SC',      'Qatar', 'QAT1'),
  (1014, 'Al Shamal SC',    'Qatar', 'QAT1'),
  (1015, 'Al Shahaniya SC', 'Qatar', 'QAT1'),
  (1016, 'Qatar SC',        'Qatar', 'QAT1'),
  (1017, 'Umm Salal SC',    'Qatar', 'QAT1'),
  (1018, 'Al Wakra SC',     'Qatar', 'QAT1');

-- ── IRN1 — Persian Gulf Pro League (IDs 1019-1034) ───────────
INSERT INTO clubs (id, name, country, league) VALUES
  (1019, 'Esteghlal FC',         'Iran', 'IRN1'),
  (1020, 'Foulad Khuzestan',     'Iran', 'IRN1'),
  (1021, 'Gol Gohar Sirjan',     'Iran', 'IRN1'),
  (1022, 'Havadar SC',           'Iran', 'IRN1'),
  (1023, 'Machine Sazi Tabriz',  'Iran', 'IRN1'),
  (1024, 'Malavan FC',           'Iran', 'IRN1'),
  (1025, 'Mes Kerman',           'Iran', 'IRN1'),
  (1026, 'Nassaji Mazandaran',   'Iran', 'IRN1'),
  (1027, 'Naft Masjed Soleyman', 'Iran', 'IRN1'),
  (1028, 'Paykan FC',            'Iran', 'IRN1'),
  (1029, 'Persepolis FC',        'Iran', 'IRN1'),
  (1030, 'Sanat Naft Abadan',    'Iran', 'IRN1'),
  (1031, 'Sepahan FC',           'Iran', 'IRN1'),
  (1032, 'Shahin Bushehr',       'Iran', 'IRN1'),
  (1033, 'Tractor Sazi FC',      'Iran', 'IRN1'),
  (1034, 'Zob Ahan FC',          'Iran', 'IRN1');

-- Reset sequence
SELECT setval('clubs_id_seq', (SELECT MAX(id) FROM clubs));
