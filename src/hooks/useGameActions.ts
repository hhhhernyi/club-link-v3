import { useCallback } from 'react';
import { doc, setDoc, updateDoc, serverTimestamp, collection } from 'firebase/firestore';
import { db } from '../config/firebase';
import { supabase } from '../config/supabase';
import { generateRoomCode } from '../utils/generateRoomCode';
import type { GameRoom, GameMode } from '../types/game';

export function useGameActions() {
  const createRoom = useCallback(async (
    uid: string,
    displayName: string,
    mode: GameMode,
    maxRounds = 5
  ): Promise<string> => {
    const roomRef = doc(collection(db, 'game_rooms'));
    const roomCode = mode === 'friends' ? generateRoomCode() : null;

    const room: Omit<GameRoom, 'id'> = {
      status: 'waiting',
      mode,
      maxRounds,
      currentRound: 1,
      createdAt: serverTimestamp() as any,
      hostId: uid,
      roomCode,
      players: {
        [uid]: {
          displayName,
          score: 0,
          ready: false,
          chosenClubId: null,
          chosenClubName: null,
          currentGuess: null,
          hasSubmitted: false,
        },
      },
      roundState: {
        clubA: null,
        clubB: null,
        phase: 'choosing',
        phaseEndsAt: null,
        firstSubmitter: null,
        roundWinner: null,
        correctAnswer: null,
      },
      history: [],
    };

    await setDoc(roomRef, room);
    return roomRef.id;
  }, []);

  const joinRoom = useCallback(async (
    roomId: string,
    uid: string,
    displayName: string
  ) => {
    await updateDoc(doc(db, 'game_rooms', roomId), {
      [`players.${uid}`]: {
        displayName,
        score: 0,
        ready: false,
        chosenClubId: null,
        chosenClubName: null,
        currentGuess: null,
        hasSubmitted: false,
      },
    });
  }, []);

  const setReady = useCallback(async (roomId: string, uid: string, ready: boolean) => {
    await updateDoc(doc(db, 'game_rooms', roomId), {
      [`players.${uid}.ready`]: ready,
    });
  }, []);

  const chooseClub = useCallback(async (
    roomId: string,
    uid: string,
    clubId: number,
    clubName: string
  ) => {
    await updateDoc(doc(db, 'game_rooms', roomId), {
      [`players.${uid}.chosenClubId`]: clubId,
      [`players.${uid}.chosenClubName`]: clubName,
    });
  }, []);

  const submitGuess = useCallback(async (
    roomId: string,
    uid: string,
    guess: string,
    clubAId: number,
    clubBId: number
  ) => {
    // Validate via Supabase RPC
    const { data, error } = await supabase.rpc('validate_answer', {
      guess,
      club_a_id: clubAId,
      club_b_id: clubBId,
    });

    if (error) throw error;

    await updateDoc(doc(db, 'game_rooms', roomId), {
      [`players.${uid}.currentGuess`]: guess,
      [`players.${uid}.hasSubmitted`]: true,
    });

    return data as { valid: boolean; player_id: number | null; player_name: string | null };
  }, []);

  const getValidPlayers = useCallback(async (clubAId: number, clubBId: number) => {
    const { data, error } = await supabase.rpc('get_valid_players', {
      club_a_id: clubAId,
      club_b_id: clubBId,
    });
    if (error) throw error;
    return data as { id: number; name: string }[];
  }, []);

  return { createRoom, joinRoom, setReady, chooseClub, submitGuess, getValidPlayers };
}
