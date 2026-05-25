-- ============================================================
-- Migration 009 — Rename league labels to abbreviations
-- Format: {ISO country code}{division number}
-- ENG1 = English Premier League, GER2 = German 2. Bundesliga, etc.
-- ============================================================

UPDATE clubs SET league = 'ENG1' WHERE league = 'Premier League';
UPDATE clubs SET league = 'ESP1' WHERE league = 'La Liga';
UPDATE clubs SET league = 'ITA1' WHERE league = 'Serie A';
UPDATE clubs SET league = 'GER1' WHERE league = 'Bundesliga';
UPDATE clubs SET league = 'FRA1' WHERE league = 'Ligue 1';
UPDATE clubs SET league = 'POR1' WHERE league = 'Primeira Liga';
UPDATE clubs SET league = 'NED1' WHERE league = 'Eredivisie';
UPDATE clubs SET league = 'SCO1' WHERE league = 'Scottish Premiership';
UPDATE clubs SET league = 'SAU1' WHERE league = 'Saudi Pro League';
UPDATE clubs SET league = 'USA1' WHERE league = 'MLS';
UPDATE clubs SET league = 'TUR1' WHERE league = 'Turkish Super Lig';
UPDATE clubs SET league = 'BEL1' WHERE league = 'Belgian Pro League';
UPDATE clubs SET league = 'ARG1' WHERE league = 'Argentine Primera';
UPDATE clubs SET league = 'BRA1' WHERE league = 'Brazilian Serie A';
