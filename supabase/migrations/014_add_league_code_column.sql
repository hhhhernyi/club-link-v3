-- ============================================================
-- Migration 014 — Add leagueCode column, restore full league names
--
-- leagueCode stores the abbreviation (ENG1, ESP1, etc.)
-- league stores the full human-readable name (Premier League, La Liga, etc.)
-- ============================================================

-- Step 1: add leagueCode column (nullable until populated)
ALTER TABLE clubs ADD COLUMN IF NOT EXISTS "leagueCode" TEXT;

-- Step 2: copy current abbreviations into leagueCode
UPDATE clubs SET "leagueCode" = league;

-- Step 3: update league to full human-readable names
UPDATE clubs SET league = CASE "leagueCode"
  -- English
  WHEN 'ENG1' THEN 'Premier League'
  WHEN 'ENG2' THEN 'Championship'
  WHEN 'ENG3' THEN 'League One'
  WHEN 'ENG4' THEN 'League Two'
  -- Spanish
  WHEN 'ESP1' THEN 'La Liga'
  WHEN 'ESP2' THEN 'Segunda División'
  -- Italian
  WHEN 'ITA1' THEN 'Serie A'
  WHEN 'ITA2' THEN 'Serie B'
  -- German
  WHEN 'GER1' THEN 'Bundesliga'
  WHEN 'GER2' THEN '2. Bundesliga'
  -- French
  WHEN 'FRA1' THEN 'Ligue 1'
  WHEN 'FRA2' THEN 'Ligue 2'
  -- Portuguese
  WHEN 'POR1' THEN 'Primeira Liga'
  WHEN 'POR2' THEN 'Liga Portugal 2'
  -- Dutch
  WHEN 'NED1' THEN 'Eredivisie'
  -- Scottish
  WHEN 'SCO1' THEN 'Scottish Premiership'
  WHEN 'SCO2' THEN 'Scottish Championship'
  -- Saudi Arabia
  WHEN 'SAU1' THEN 'Saudi Pro League'
  -- United States / Canada
  WHEN 'USA1' THEN 'MLS'
  -- Turkish
  WHEN 'TUR1' THEN 'Süper Lig'
  -- Belgian
  WHEN 'BEL1' THEN 'Belgian Pro League'
  -- South American
  WHEN 'ARG1' THEN 'Argentine Primera'
  WHEN 'BRA1' THEN 'Brazilian Série A'
  WHEN 'COL1' THEN 'Colombian Primera A'
  WHEN 'CHL1' THEN 'Chilean Primera División'
  WHEN 'URU1' THEN 'Uruguayan Primera División'
  WHEN 'MEX1' THEN 'Liga MX'
  -- Other European
  WHEN 'RUS1' THEN 'Russian Premier League'
  WHEN 'GRE1' THEN 'Super League Greece'
  WHEN 'DEN1' THEN 'Danish Superliga'
  WHEN 'NOR1' THEN 'Norwegian Eliteserien'
  WHEN 'SWE1' THEN 'Swedish Allsvenskan'
  WHEN 'SUI1' THEN 'Swiss Super League'
  WHEN 'AUT1' THEN 'Austrian Bundesliga'
  WHEN 'CRO1' THEN 'Croatian HNL'
  WHEN 'CZE1' THEN 'Czech First League'
  WHEN 'POL1' THEN 'Polish Ekstraklasa'
  WHEN 'UKR1' THEN 'Ukrainian Premier League'
  WHEN 'SRB1' THEN 'Serbian SuperLiga'
  WHEN 'ROU1' THEN 'Romanian Liga I'
  WHEN 'HUN1' THEN 'Hungarian OTP Liga'
  WHEN 'ISR1' THEN 'Israeli Premier League'
  -- African
  WHEN 'EGY1' THEN 'Egyptian Premier League'
  WHEN 'RSA1' THEN 'South African Premier Division'
  WHEN 'MAR1' THEN 'Moroccan Botola Pro'
  -- Asian / Oceanian
  WHEN 'JPN1' THEN 'J1 League'
  WHEN 'JPN2' THEN 'J2 League'
  WHEN 'KOR1' THEN 'K League 1'
  WHEN 'KOR2' THEN 'K League 2'
  WHEN 'CHN1' THEN 'Chinese Super League'
  WHEN 'AUS1' THEN 'A-League'
  WHEN 'IND1' THEN 'Indian Super League'
  WHEN 'THA1' THEN 'Thai League 1'
  WHEN 'MAS1' THEN 'Malaysian Super League'
  WHEN 'SGP1' THEN 'Singapore Premier League'
  WHEN 'IDN1' THEN 'Indonesian Liga 1'
  WHEN 'VIE1' THEN 'Vietnam V.League 1'
  WHEN 'UAE1' THEN 'UAE Pro League'
  WHEN 'QAT1' THEN 'Qatar Stars League'
  WHEN 'IRN1' THEN 'Persian Gulf Pro League'
  ELSE league
END;

-- Step 4: enforce NOT NULL now that all rows are populated
ALTER TABLE clubs ALTER COLUMN "leagueCode" SET NOT NULL;
