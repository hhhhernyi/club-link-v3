import { useState, useEffect, useCallback, useRef } from 'react';
import {
  collection, addDoc, deleteDoc, doc, onSnapshot,
  serverTimestamp, query, where, limit, getDocs,
  runTransaction,
} from 'firebase/firestore';
import { db } from '../config/firebase';

function buildRoomData(
  hostUid: string, hostName: string,
  guestUid: string, guestName: string,
) {
  return {
    status: 'waiting',
    mode: 'strangers',
    maxRounds: 5,
    currentRound: 1,
    createdAt: serverTimestamp(),
    hostId: hostUid,
    roomCode: null,
    players: {
      [hostUid]: {
        displayName: hostName,
        score: 0, ready: false,
        chosenClubId: null, chosenClubName: null,
        currentGuess: null, hasSubmitted: false,
      },
      [guestUid]: {
        displayName: guestName,
        score: 0, ready: false,
        chosenClubId: null, chosenClubName: null,
        currentGuess: null, hasSubmitted: false,
      },
    },
    roundState: {
      clubA: null, clubB: null, phase: null,
      firstSubmitter: null, firstGuess: null, firstResult: null,
      secondSubmitter: null, secondGuess: null, secondResult: null,
      roundWinner: null, correctAnswer: null, validAnswers: null,
    },
    history: [],
  };
}

export function useMatchmaking() {
  const [queueEntryId, setQueueEntryId] = useState<string | null>(null);
  const [matchedRoomId, setMatchedRoomId] = useState<string | null>(null);
  const [searching, setSearching] = useState(false);

  // Refs so async callbacks always see the latest values
  const myUidRef      = useRef<string | null>(null);
  const myNameRef     = useRef<string | null>(null);
  const myEntryRef    = useRef<ReturnType<typeof doc> | null>(null);
  const matchingRef   = useRef(false); // prevents concurrent match attempts

  // Try to pair with another waiting player using a Firestore transaction.
  // Called both on join (immediate check) and when the queue snapshot changes.
  const tryMatch = useCallback(async () => {
    if (matchingRef.current) return;
    if (!myUidRef.current || !myNameRef.current || !myEntryRef.current) return;

    matchingRef.current = true;
    try {
      // Find waiting players (excluding our own entry)
      const snap = await getDocs(
        query(
          collection(db, 'matchmaking_queue'),
          where('status', '==', 'waiting'),
          limit(10),
        ),
      );

      const others = snap.docs.filter(d => d.id !== myEntryRef.current!.id);
      if (others.length === 0) return;

      const opponent     = others[0];
      const opponentData = opponent.data();

      // Atomic: verify both are still waiting, then create the room
      await runTransaction(db, async (txn) => {
        const mySnap   = await txn.get(myEntryRef.current!);
        const theirSnap = await txn.get(opponent.ref);

        if (!mySnap.exists()    || mySnap.data()?.status    !== 'waiting') return;
        if (!theirSnap.exists() || theirSnap.data()?.status !== 'waiting') return;

        const roomRef  = doc(collection(db, 'game_rooms'));
        const roomData = buildRoomData(
          opponentData.uid, opponentData.displayName,
          myUidRef.current!, myNameRef.current!,
        );

        txn.set(roomRef, roomData);
        txn.update(myEntryRef.current!,  { status: 'matched', roomId: roomRef.id });
        txn.update(opponent.ref,          { status: 'matched', roomId: roomRef.id });
      });
    } catch (err) {
      // Expected when two players race to match each other — one wins, one retries
      console.log('Match attempt (may retry):', err);
    } finally {
      matchingRef.current = false;
    }
  }, []);

  const joinQueue = useCallback(async (uid: string, displayName: string) => {
    myUidRef.current  = uid;
    myNameRef.current = displayName;
    setSearching(true);

    try {
      const docRef = await addDoc(collection(db, 'matchmaking_queue'), {
        uid,
        displayName,
        joinedAt: serverTimestamp(),
        status: 'waiting',
        roomId: null,
      });

      myEntryRef.current = docRef;
      setQueueEntryId(docRef.id);

      // Immediately try to match with anyone already in the queue
      await tryMatch();
    } catch (err) {
      console.error('Join queue error:', err);
      setSearching(false);
    }
  }, [tryMatch]);

  const leaveQueue = useCallback(async () => {
    if (myEntryRef.current) {
      try { await deleteDoc(myEntryRef.current); } catch { /* already gone */ }
      myEntryRef.current = null;
    }
    myUidRef.current  = null;
    myNameRef.current = null;
    setQueueEntryId(null);
    setSearching(false);
    setMatchedRoomId(null);
  }, []);

  // Listen to own queue entry — fires when the other player matches us
  useEffect(() => {
    if (!queueEntryId) return;
    const unsub = onSnapshot(doc(db, 'matchmaking_queue', queueEntryId), (snap) => {
      if (!snap.exists()) return;
      const data = snap.data();
      if (data.status === 'matched' && data.roomId) {
        setMatchedRoomId(data.roomId);
        setSearching(false);
      }
    });
    return unsub;
  }, [queueEntryId]);

  // Listen to the queue collection — fires when a new player joins so we can match them
  useEffect(() => {
    if (!queueEntryId) return;
    const q = query(
      collection(db, 'matchmaking_queue'),
      where('status', '==', 'waiting'),
    );
    const unsub = onSnapshot(q, (snap) => {
      const others = snap.docs.filter(d => d.id !== queueEntryId);
      if (others.length > 0) tryMatch();
    });
    return unsub;
  }, [queueEntryId, tryMatch]);

  return { searching, matchedRoomId, joinQueue, leaveQueue };
}
