-- ============================================================
-- Migration 010 — English lower divisions (ENG2 / ENG3 / ENG4)
--
-- All new clubs use explicit IDs starting at 201.
-- Existing clubs from migrations 001-008 occupy IDs 1-200 (safe bound).
-- IDs here are stable references for future player migrations.
-- ============================================================

-- ── ENG2 — Championship (IDs 201-225) ──────────────────────
INSERT INTO clubs (id, name, country, league) VALUES
  (201, 'Birmingham City',      'England', 'ENG2'),
  (202, 'Blackburn Rovers',     'England', 'ENG2'),
  (203, 'Bolton Wanderers',     'England', 'ENG2'),
  (204, 'Bristol City',         'England', 'ENG2'),
  (205, 'Burnley',              'England', 'ENG2'),
  (206, 'Cardiff City',         'England', 'ENG2'),
  (207, 'Charlton Athletic',    'England', 'ENG2'),
  (208, 'Coventry City',        'England', 'ENG2'),
  (209, 'Derby County',         'England', 'ENG2'),
  (210, 'Hull City',            'England', 'ENG2'),
  (211, 'Leeds United',         'England', 'ENG2'),
  (212, 'Luton Town',           'England', 'ENG2'),
  (213, 'Middlesbrough',        'England', 'ENG2'),
  (214, 'Millwall',             'England', 'ENG2'),
  (215, 'Norwich City',         'England', 'ENG2'),
  (216, 'Portsmouth',           'England', 'ENG2'),
  (217, 'Preston North End',    'England', 'ENG2'),
  (218, 'Queens Park Rangers',  'England', 'ENG2'),
  (219, 'Sheffield United',     'England', 'ENG2'),
  (220, 'Sheffield Wednesday',  'England', 'ENG2'),
  (221, 'Stoke City',           'England', 'ENG2'),
  (222, 'Sunderland',           'England', 'ENG2'),
  (223, 'Swansea City',         'England', 'ENG2'),
  (224, 'Watford',              'England', 'ENG2'),
  (225, 'West Bromwich Albion', 'England', 'ENG2');

-- ── ENG3 — League One (IDs 226-249) ────────────────────────
INSERT INTO clubs (id, name, country, league) VALUES
  (226, 'Barnsley',          'England', 'ENG3'),
  (227, 'Blackpool',         'England', 'ENG3'),
  (228, 'Bristol Rovers',    'England', 'ENG3'),
  (229, 'Burton Albion',     'England', 'ENG3'),
  (230, 'Cambridge United',  'England', 'ENG3'),
  (231, 'Cheltenham Town',   'England', 'ENG3'),
  (232, 'Crawley Town',      'England', 'ENG3'),
  (233, 'Exeter City',       'England', 'ENG3'),
  (234, 'Fleetwood Town',    'England', 'ENG3'),
  (235, 'Huddersfield Town', 'England', 'ENG3'),
  (236, 'Leyton Orient',     'England', 'ENG3'),
  (237, 'Lincoln City',      'England', 'ENG3'),
  (238, 'Northampton Town',  'England', 'ENG3'),
  (239, 'Oxford United',     'England', 'ENG3'),
  (240, 'Peterborough United','England','ENG3'),
  (241, 'Reading',           'England', 'ENG3'),
  (242, 'Rotherham United',  'England', 'ENG3'),
  (243, 'Shrewsbury Town',   'England', 'ENG3'),
  (244, 'Stevenage',         'England', 'ENG3'),
  (245, 'Stockport County',  'England', 'ENG3'),
  (246, 'Wigan Athletic',    'England', 'ENG3'),
  (247, 'Wrexham',           'England', 'ENG3'),
  (248, 'Wycombe Wanderers', 'England', 'ENG3'),
  (249, 'Port Vale',         'England', 'ENG3');

-- ── ENG4 — League Two (IDs 250-271) ────────────────────────
INSERT INTO clubs (id, name, country, league) VALUES
  (250, 'AFC Wimbledon',     'England', 'ENG4'),
  (251, 'Accrington Stanley','England', 'ENG4'),
  (252, 'Barrow',            'England', 'ENG4'),
  (253, 'Bradford City',     'England', 'ENG4'),
  (254, 'Carlisle United',   'England', 'ENG4'),
  (255, 'Colchester United', 'England', 'ENG4'),
  (256, 'Crewe Alexandra',   'England', 'ENG4'),
  (257, 'Doncaster Rovers',  'England', 'ENG4'),
  (258, 'Gillingham',        'England', 'ENG4'),
  (259, 'Grimsby Town',      'England', 'ENG4'),
  (260, 'Harrogate Town',    'England', 'ENG4'),
  (261, 'Mansfield Town',    'England', 'ENG4'),
  (262, 'MK Dons',           'England', 'ENG4'),
  (263, 'Morecambe',         'England', 'ENG4'),
  (264, 'Newport County',    'England', 'ENG4'),
  (265, 'Notts County',      'England', 'ENG4'),
  (266, 'Rochdale',          'England', 'ENG4'),
  (267, 'Salford City',      'England', 'ENG4'),
  (268, 'Sutton United',     'England', 'ENG4'),
  (269, 'Swindon Town',      'England', 'ENG4'),
  (270, 'Tranmere Rovers',   'England', 'ENG4'),
  (271, 'Walsall',           'England', 'ENG4');

-- Reset sequence
SELECT setval('clubs_id_seq', (SELECT MAX(id) FROM clubs));
