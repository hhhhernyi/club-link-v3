import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import type { GameRoom } from '../types/game';

export function useGameRoom(roomId: string | null) {
  const [room, setRoom] = useState<GameRoom | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!roomId) {
      setLoading(false);
      return;
    }

    const unsub = onSnapshot(
      doc(db, 'game_rooms', roomId),
      (snap) => {
        if (snap.exists()) {
          setRoom({ id: snap.id, ...snap.data() } as GameRoom);
        } else {
          setRoom(null);
          setError('Room not found');
        }
        setLoading(false);
      },
      (err) => {
        console.error('Room listener error:', err);
        setError(err.message);
        setLoading(false);
      }
    );

    return unsub;
  }, [roomId]);

  return { room, loading, error };
}
