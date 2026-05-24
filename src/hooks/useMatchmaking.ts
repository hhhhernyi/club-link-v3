import { useState, useEffect, useCallback } from 'react';
import { collection, addDoc, deleteDoc, doc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import type { QueueEntry } from '../types/game';

export function useMatchmaking() {
  const [queueEntryId, setQueueEntryId] = useState<string | null>(null);
  const [matchedRoomId, setMatchedRoomId] = useState<string | null>(null);
  const [searching, setSearching] = useState(false);

  const joinQueue = useCallback(async (uid: string, displayName: string) => {
    setSearching(true);
    try {
      const docRef = await addDoc(collection(db, 'matchmaking_queue'), {
        uid,
        displayName,
        joinedAt: serverTimestamp(),
        status: 'waiting',
        roomId: null,
      } satisfies Omit<QueueEntry, 'joinedAt'> & { joinedAt: ReturnType<typeof serverTimestamp> });
      setQueueEntryId(docRef.id);
    } catch (err) {
      console.error('Join queue error:', err);
      setSearching(false);
    }
  }, []);

  const leaveQueue = useCallback(async () => {
    if (queueEntryId) {
      try {
        await deleteDoc(doc(db, 'matchmaking_queue', queueEntryId));
      } catch (err) {
        console.error('Leave queue error:', err);
      }
    }
    setQueueEntryId(null);
    setSearching(false);
    setMatchedRoomId(null);
  }, [queueEntryId]);

  // Listen for match
  useEffect(() => {
    if (!queueEntryId) return;

    const unsub = onSnapshot(doc(db, 'matchmaking_queue', queueEntryId), (snap) => {
      if (!snap.exists()) return;
      const data = snap.data() as QueueEntry;
      if (data.status === 'matched' && data.roomId) {
        setMatchedRoomId(data.roomId);
        setSearching(false);
      }
    });

    return unsub;
  }, [queueEntryId]);

  return { searching, matchedRoomId, joinQueue, leaveQueue };
}
