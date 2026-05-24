-- 004_compatible_club_rpc.sql
-- RPC: get_compatible_club
-- Returns a random club that shares at least one player with the chosen club.
-- Guarantees the single-player game always has valid answers.

CREATE OR REPLACE FUNCTION get_compatible_club(chosen_club_id INTEGER)
RETURNS clubs
LANGUAGE sql STABLE
AS $$
  SELECT c.*
  FROM clubs c
  WHERE c.id != chosen_club_id
    AND EXISTS (
      SELECT 1
      FROM player_clubs pc_a
      JOIN player_clubs pc_b ON pc_b.player_id = pc_a.player_id
      WHERE pc_a.club_id = chosen_club_id
        AND pc_b.club_id = c.id
    )
  ORDER BY random()
  LIMIT 1;
$$;
