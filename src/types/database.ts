export interface Club {
  id: number;
  name: string;
  country: string;
  logo_url: string | null;
  league: string;
}

export interface Player {
  id: number;
  name: string;
  nationality: string;
  image_url: string | null;
}

export interface PlayerClub {
  player_id: number;
  club_id: number;
  season_from: string | null;
  season_to: string | null;
}

export interface PlayerAlias {
  player_id: number;
  alias: string;
}

export interface ValidateAnswerResult {
  valid: boolean;
  player_id: number | null;
  player_name: string | null;
}
