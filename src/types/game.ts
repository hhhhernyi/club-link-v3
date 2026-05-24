import { Timestamp } from 'firebase/firestore';

export interface PlayerState {
  displayName: string;
  score: number;
  ready: boolean;
  chosenClubId: number | null;
  chosenClubName: string | null;
  currentGuess: string | null;
  hasSubmitted: boolean;
}

export interface ClubInfo {
  id: number;
  name: string;
  logo_url: string | null;
}

export interface RoundState {
  clubA: ClubInfo | null;
  clubB: ClubInfo | null;
  phase: 'choosing' | 'countdown' | 'guessing' | 'second_chance' | 'result';
  phaseEndsAt: Timestamp | null;
  firstSubmitter: string | null;
  roundWinner: string | null;
  correctAnswer: string | null;
}

export interface RoundHistory {
  round: number;
  clubA: ClubInfo;
  clubB: ClubInfo;
  winner: string | null;
  answer: string | null;
  playerResult?: 'correct' | 'wrong' | 'timeout' | 'skipped';
}

export type GameStatus = 'waiting' | 'choosing' | 'countdown' | 'guessing' | 'result' | 'finished';
export type GameMode = 'strangers' | 'friends' | 'single';

export interface GameRoom {
  id?: string;
  status: GameStatus;
  mode: GameMode;
  maxRounds: number;
  currentRound: number;
  createdAt: Timestamp;
  hostId: string;
  roomCode: string | null;
  players: Record<string, PlayerState>;
  roundState: RoundState;
  history: RoundHistory[];
}

export interface QueueEntry {
  uid: string;
  displayName: string;
  joinedAt: Timestamp;
  status: 'waiting' | 'matched';
  roomId: string | null;
}
