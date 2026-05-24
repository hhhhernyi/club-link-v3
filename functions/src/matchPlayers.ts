import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

const db = admin.firestore();

/**
 * Firestore onCreate trigger on matchmaking_queue/{docId}.
 * When a new entry arrives, queries for another waiting player.
 * If found, atomically creates a game room and updates both entries.
 */
export const matchPlayers = functions.firestore
  .document('matchmaking_queue/{docId}')
  .onCreate(async (snap, context) => {
    const newEntry = snap.data();
    const newDocId = context.params.docId;

    if (newEntry.status !== 'waiting') return;

    // Find another waiting player
    const queueRef = db.collection('matchmaking_queue');
    const waiting = await queueRef
      .where('status', '==', 'waiting')
      .orderBy('joinedAt', 'asc')
      .limit(2)
      .get();

    // Need at least 2 waiting players
    const waitingDocs = waiting.docs.filter((d) => d.id !== newDocId);
    if (waitingDocs.length === 0) return;

    const matchDoc = waitingDocs[0];
    const matchData = matchDoc.data();

    // Create a game room
    const roomRef = db.collection('game_rooms').doc();
    const batch = db.batch();

    const room = {
      status: 'waiting',
      mode: 'strangers',
      maxRounds: 5,
      currentRound: 1,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      hostId: matchData.uid,
      roomCode: null,
      players: {
        [matchData.uid]: {
          displayName: matchData.displayName,
          score: 0,
          ready: false,
          chosenClubId: null,
          chosenClubName: null,
          currentGuess: null,
          hasSubmitted: false,
        },
        [newEntry.uid]: {
          displayName: newEntry.displayName,
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

    batch.set(roomRef, room);

    // Update both queue entries
    batch.update(snap.ref, { status: 'matched', roomId: roomRef.id });
    batch.update(matchDoc.ref, { status: 'matched', roomId: roomRef.id });

    await batch.commit();

    functions.logger.info(`Matched ${matchData.uid} with ${newEntry.uid} in room ${roomRef.id}`);
  });
