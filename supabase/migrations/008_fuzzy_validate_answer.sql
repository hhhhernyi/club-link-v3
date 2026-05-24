-- ============================================================
-- Extend validate_answer to accept partial name matches.
-- "aguero" now matches "Sergio Aguero" (last-name suffix match).
-- "de bruyne" matches "Kevin De Bruyne" (multi-word suffix).
-- Canonical-name exact match and alias exact match still checked first.
-- ============================================================

CREATE OR REPLACE FUNCTION validate_answer(guess TEXT, club_a_id INTEGER, club_b_id INTEGER)
RETURNS JSON
LANGUAGE plpgsql STABLE
AS $$
DECLARE
  found_player RECORD;
BEGIN
  -- 1. Exact canonical name match
  SELECT p.id, p.name INTO found_player
  FROM players p
  JOIN player_clubs pc_a ON pc_a.player_id = p.id AND pc_a.club_id = club_a_id
  JOIN player_clubs pc_b ON pc_b.player_id = p.id AND pc_b.club_id = club_b_id
  WHERE LOWER(p.name) = LOWER(guess)
  LIMIT 1;

  IF found_player IS NOT NULL THEN
    RETURN json_build_object('valid', true, 'player_id', found_player.id, 'player_name', found_player.name);
  END IF;

  -- 2. Alias exact match
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

  -- 3. Partial name match: guess matches a trailing word or words in the canonical name
  --    e.g. "aguero" matches "Sergio Aguero"
  --         "de bruyne" matches "Kevin De Bruyne"
  SELECT p.id, p.name INTO found_player
  FROM players p
  JOIN player_clubs pc_a ON pc_a.player_id = p.id AND pc_a.club_id = club_a_id
  JOIN player_clubs pc_b ON pc_b.player_id = p.id AND pc_b.club_id = club_b_id
  WHERE LOWER(p.name) LIKE '% ' || LOWER(guess)
  LIMIT 1;

  IF found_player IS NOT NULL THEN
    RETURN json_build_object('valid', true, 'player_id', found_player.id, 'player_name', found_player.name);
  END IF;

  -- 4. Partial alias match (trailing words)
  SELECT p.id, p.name INTO found_player
  FROM players p
  JOIN player_aliases pa ON pa.player_id = p.id
  JOIN player_clubs pc_a ON pc_a.player_id = p.id AND pc_a.club_id = club_a_id
  JOIN player_clubs pc_b ON pc_b.player_id = p.id AND pc_b.club_id = club_b_id
  WHERE LOWER(pa.alias) LIKE '% ' || LOWER(guess)
  LIMIT 1;

  IF found_player IS NOT NULL THEN
    RETURN json_build_object('valid', true, 'player_id', found_player.id, 'player_name', found_player.name);
  END IF;

  RETURN json_build_object('valid', false, 'player_id', null, 'player_name', null);
END;
$$;
