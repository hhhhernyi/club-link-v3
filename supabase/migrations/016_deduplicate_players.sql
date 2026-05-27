-- ============================================================
-- Migration 016 — Deduplicate players with diacritic/encoding variants
--
-- Problem: seeding scripts inserted the same player multiple times with
-- slightly different name spellings (e.g. "Kylian Mbappe" vs "Kylian Mbappë").
-- This migration:
--   1. Enables the unaccent extension (strips diacritics for comparison)
--   2. Finds all players whose names are identical after unaccent + lower
--   3. Keeps whichever has the most player_clubs entries (best data), with
--      lowest id as tiebreaker
--   4. Migrates all player_clubs and player_aliases to the canonical player
--   5. Adds the discarded name as an alias on the canonical player
--   6. Deletes the duplicate rows
--   7. Updates validate_answer to use unaccent for future-proof matching
-- ============================================================

CREATE EXTENSION IF NOT EXISTS unaccent;

DO $$
DECLARE
  norm_name_val TEXT;
  canonical_id  INTEGER;
  dup_id        INTEGER;
  dup_name      TEXT;
  canonical_name TEXT;
BEGIN
  FOR norm_name_val IN
    SELECT LOWER(unaccent(name))
    FROM players
    GROUP BY LOWER(unaccent(name))
    HAVING COUNT(*) > 1
  LOOP
    -- Canonical = most player_clubs, then lowest id
    SELECT p.id INTO canonical_id
    FROM players p
    WHERE LOWER(unaccent(p.name)) = norm_name_val
    ORDER BY (SELECT COUNT(*) FROM player_clubs pc WHERE pc.player_id = p.id) DESC, p.id ASC
    LIMIT 1;

    SELECT name INTO canonical_name FROM players WHERE id = canonical_id;

    -- Process every duplicate (all others in the group)
    FOR dup_id IN
      SELECT id FROM players
      WHERE LOWER(unaccent(name)) = norm_name_val AND id != canonical_id
    LOOP
      SELECT name INTO dup_name FROM players WHERE id = dup_id;

      -- Migrate player_clubs (skip conflicts — canonical already has that club)
      INSERT INTO player_clubs (player_id, club_id, season_from, season_to)
      SELECT canonical_id, club_id, season_from, season_to
      FROM player_clubs
      WHERE player_id = dup_id
      ON CONFLICT (player_id, club_id) DO NOTHING;

      -- Migrate aliases
      INSERT INTO player_aliases (player_id, alias)
      SELECT canonical_id, pa.alias
      FROM player_aliases pa
      WHERE pa.player_id = dup_id
        AND NOT EXISTS (
          SELECT 1 FROM player_aliases pa2
          WHERE pa2.player_id = canonical_id
            AND LOWER(unaccent(pa2.alias)) = LOWER(unaccent(pa.alias))
        );

      -- Add the duplicate's raw name as an alias (so old spellings still validate)
      INSERT INTO player_aliases (player_id, alias)
      SELECT canonical_id, dup_name
      WHERE LOWER(unaccent(dup_name)) != LOWER(unaccent(canonical_name))
        AND NOT EXISTS (
          SELECT 1 FROM player_aliases pa
          WHERE pa.player_id = canonical_id
            AND LOWER(unaccent(pa.alias)) = LOWER(unaccent(dup_name))
        );

      -- Remove the duplicate (cascades player_clubs + player_aliases)
      DELETE FROM players WHERE id = dup_id;
    END LOOP;
  END LOOP;
END;
$$;

-- ============================================================
-- Update validate_answer to use unaccent so "Mbappe" matches
-- "Mbappé", "De Bruyne" matches "De Bruyně", etc.
-- ============================================================
CREATE OR REPLACE FUNCTION validate_answer(guess TEXT, club_a_id INTEGER, club_b_id INTEGER)
RETURNS JSON
LANGUAGE plpgsql STABLE
AS $$
DECLARE
  found_player RECORD;
BEGIN
  -- 1. Exact canonical name (unaccent-normalised)
  SELECT p.id, p.name INTO found_player
  FROM players p
  JOIN player_clubs pc_a ON pc_a.player_id = p.id AND pc_a.club_id = club_a_id
  JOIN player_clubs pc_b ON pc_b.player_id = p.id AND pc_b.club_id = club_b_id
  WHERE LOWER(unaccent(p.name)) = LOWER(unaccent(guess))
  LIMIT 1;

  IF found_player IS NOT NULL THEN
    RETURN json_build_object('valid', true, 'player_id', found_player.id, 'player_name', found_player.name);
  END IF;

  -- 2. Alias exact match (unaccent-normalised)
  SELECT p.id, p.name INTO found_player
  FROM players p
  JOIN player_aliases pa ON pa.player_id = p.id
  JOIN player_clubs pc_a ON pc_a.player_id = p.id AND pc_a.club_id = club_a_id
  JOIN player_clubs pc_b ON pc_b.player_id = p.id AND pc_b.club_id = club_b_id
  WHERE LOWER(unaccent(pa.alias)) = LOWER(unaccent(guess))
  LIMIT 1;

  IF found_player IS NOT NULL THEN
    RETURN json_build_object('valid', true, 'player_id', found_player.id, 'player_name', found_player.name);
  END IF;

  -- 3. Partial name match — trailing word(s) (unaccent-normalised)
  SELECT p.id, p.name INTO found_player
  FROM players p
  JOIN player_clubs pc_a ON pc_a.player_id = p.id AND pc_a.club_id = club_a_id
  JOIN player_clubs pc_b ON pc_b.player_id = p.id AND pc_b.club_id = club_b_id
  WHERE LOWER(unaccent(p.name)) LIKE '% ' || LOWER(unaccent(guess))
  LIMIT 1;

  IF found_player IS NOT NULL THEN
    RETURN json_build_object('valid', true, 'player_id', found_player.id, 'player_name', found_player.name);
  END IF;

  -- 4. Partial alias match — trailing word(s) (unaccent-normalised)
  SELECT p.id, p.name INTO found_player
  FROM players p
  JOIN player_aliases pa ON pa.player_id = p.id
  JOIN player_clubs pc_a ON pc_a.player_id = p.id AND pc_a.club_id = club_a_id
  JOIN player_clubs pc_b ON pc_b.player_id = p.id AND pc_b.club_id = club_b_id
  WHERE LOWER(unaccent(pa.alias)) LIKE '% ' || LOWER(unaccent(guess))
  LIMIT 1;

  IF found_player IS NOT NULL THEN
    RETURN json_build_object('valid', true, 'player_id', found_player.id, 'player_name', found_player.name);
  END IF;

  RETURN json_build_object('valid', false, 'player_id', null, 'player_name', null);
END;
$$;
