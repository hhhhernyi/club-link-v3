import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

const db = admin.firestore();

/**
 * Scheduled Cloud Function — runs every 30 minutes.
 * Cleans up stale rooms and queue entries.
 */
export const cleanupRooms = functions.pubsub
  .schedule('every 30 minutes')
  .onRun(async () => {
    const now = admin.firestore.Timestamp.now();
    const thirtyMinAgo = admin.firestore.Timestamp.fromMillis(now.toMillis() - 30 * 60 * 1000);
    const twoHoursAgo = admin.firestore.Timestamp.fromMillis(now.toMillis() - 2 * 60 * 60 * 1000);

    const batch = db.batch();
    let deleteCount = 0;

    // Delete waiting rooms older than 30 minutes
    const staleWaiting = await db.collection('game_rooms')
      .where('status', '==', 'waiting')
      .where('createdAt', '<', thirtyMinAgo)
      .get();

    staleWaiting.forEach((doc) => {
      batch.delete(doc.ref);
      deleteCount++;
    });

    // Delete finished rooms older than 2 hours
    const staleFinished = await db.collection('game_rooms')
      .where('status', '==', 'finished')
      .where('createdAt', '<', twoHoursAgo)
      .get();

    staleFinished.forEach((doc) => {
      batch.delete(doc.ref);
      deleteCount++;
    });

    // Delete stale queue entries older than 30 minutes
    const staleQueue = await db.collection('matchmaking_queue')
      .where('status', '==', 'waiting')
      .where('joinedAt', '<', thirtyMinAgo)
      .get();

    staleQueue.forEach((doc) => {
      batch.delete(doc.ref);
      deleteCount++;
    });

    if (deleteCount > 0) {
      await batch.commit();
      functions.logger.info(`Cleaned up ${deleteCount} stale documents`);
    }

    return null;
  });
