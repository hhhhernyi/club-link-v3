-- 001_create_tables.sql
-- Club Link — Supabase schema

-- Clubs table
CREATE TABLE IF NOT EXISTS clubs (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT '',
  logo_url TEXT,
  league TEXT NOT NULL DEFAULT ''
);

-- Players table
CREATE TABLE IF NOT EXISTS players (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  nationality TEXT NOT NULL DEFAULT '',
  image_url TEXT
);

-- Junction: player ↔ club
CREATE TABLE IF NOT EXISTS player_clubs (
  player_id INTEGER NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  club_id INTEGER NOT NULL REFERENCES clubs(id) ON DELETE CASCADE,
  season_from TEXT,
  season_to TEXT,
  UNIQUE(player_id, club_id)
);

-- Aliases for fuzzy matching
CREATE TABLE IF NOT EXISTS player_aliases (
  id SERIAL PRIMARY KEY,
  player_id INTEGER NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  alias TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_player_clubs_player ON player_clubs(player_id);
CREATE INDEX IF NOT EXISTS idx_player_clubs_club ON player_clubs(club_id);
CREATE INDEX IF NOT EXISTS idx_player_aliases_player ON player_aliases(player_id);
CREATE INDEX IF NOT EXISTS idx_clubs_name ON clubs(name);

-- RLS: public read-only
ALTER TABLE clubs ENABLE ROW LEVEL SECURITY;
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_clubs ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_aliases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read clubs" ON clubs FOR SELECT USING (true);
CREATE POLICY "Public read players" ON players FOR SELECT USING (true);
CREATE POLICY "Public read player_clubs" ON player_clubs FOR SELECT USING (true);
CREATE POLICY "Public read player_aliases" ON player_aliases FOR SELECT USING (true);

-- RPC: search_clubs
CREATE OR REPLACE FUNCTION search_clubs(query TEXT, max_results INTEGER DEFAULT 20)
RETURNS SETOF clubs
LANGUAGE sql STABLE
AS $$
  SELECT * FROM clubs
  WHERE name ILIKE '%' || query || '%'
  ORDER BY name
  LIMIT max_results;
$$;

-- RPC: get_random_club
CREATE OR REPLACE FUNCTION get_random_club()
RETURNS clubs
LANGUAGE sql STABLE
AS $$
  SELECT * FROM clubs ORDER BY random() LIMIT 1;
$$;

-- RPC: validate_answer
CREATE OR REPLACE FUNCTION validate_answer(guess TEXT, club_a_id INTEGER, club_b_id INTEGER)
RETURNS JSON
LANGUAGE plpgsql STABLE
AS $$
DECLARE
  found_player RECORD;
BEGIN
  -- Check canonical name
  SELECT p.id, p.name INTO found_player
  FROM players p
  JOIN player_clubs pc_a ON pc_a.player_id = p.id AND pc_a.club_id = club_a_id
  JOIN player_clubs pc_b ON pc_b.player_id = p.id AND pc_b.club_id = club_b_id
  WHERE LOWER(p.name) = LOWER(guess)
  LIMIT 1;

  IF found_player IS NOT NULL THEN
    RETURN json_build_object('valid', true, 'player_id', found_player.id, 'player_name', found_player.name);
  END IF;

  -- Check aliases
  SELECT p.id, p.name INTO found_player
  FROM players p
  JOIN player_aliases pa ON pa.player_id = p.id
  JOIN player_clubs pc_a ON pc_a.player_id = p.id AND pc_a.club_id = club_a_id
  JOIN player_clubs pc_b ON pc_b.player_id = p.id AND pc_b.club_id = club_b_id
  WHERE LOWER(pa.alias) = LOWER(guess)
  LIMIT 1;

  IF found_player IS NOT NULL THEN
    RETURN json_build_object('valid', true, 'player_id', found_player.id, 'player_name', found_player.name);
  END IF;

  RETURN json_build_object('valid', false, 'player_id', null, 'player_name', null);
END;
$$;

-- RPC: search_players (for autocomplete — NOT used in V1 style, but kept for API completeness)
CREATE OR REPLACE FUNCTION search_players(query TEXT, max_results INTEGER DEFAULT 10)
RETURNS TABLE(id INTEGER, name TEXT)
LANGUAGE sql STABLE
AS $$
  SELECT p.id, p.name FROM players p
  WHERE p.name ILIKE '%' || query || '%'
  ORDER BY p.name
  LIMIT max_results;
$$;

-- RPC: get_valid_players — returns all valid answers for a club pair
CREATE OR REPLACE FUNCTION get_valid_players(club_a_id INTEGER, club_b_id INTEGER)
RETURNS TABLE(id INTEGER, name TEXT)
LANGUAGE sql STABLE
AS $$
  SELECT p.id, p.name
  FROM players p
  JOIN player_clubs pc_a ON pc_a.player_id = p.id AND pc_a.club_id = club_a_id
  JOIN player_clubs pc_b ON pc_b.player_id = p.id AND pc_b.club_id = club_b_id
  ORDER BY p.name;
$$;
