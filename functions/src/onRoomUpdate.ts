import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

const db = admin.firestore();

/**
 * Firestore onUpdate trigger on game_rooms/{roomId}.
 * Implements the game state machine.
 */
export const onRoomUpdate = functions.firestore
  .document('game_rooms/{roomId}')
  .onUpdate(async (change, context) => {
    const before = change.before.data();
    const after = change.after.data();
    const roomId = context.params.roomId;
    const roomRef = db.collection('game_rooms').doc(roomId);

    const players = after.players as Record<string, any>;
    const playerUids = Object.keys(players);

    // WAITING → CHOOSING: all players ready (need 2 players)
    if (after.status === 'waiting' && playerUids.length >= 2) {
      const allReady = playerUids.every((uid) => players[uid].ready);
      if (allReady) {
        await roomRef.update({ status: 'choosing', 'roundState.phase': 'choosing' });
        return;
      }
    }

    // CHOOSING → COUNTDOWN: all players chose clubs
    if (after.status === 'choosing' || after.roundState?.phase === 'choosing') {
      const allChose = playerUids.every((uid) => players[uid].chosenClubId !== null);
      if (allChose && playerUids.length >= 2) {
        // Assign clubs from player choices
        const [uidA, uidB] = playerUids;
        const clubAId = players[uidA].chosenClubId;
        const clubAName = players[uidA].chosenClubName;
        const clubBId = players[uidB].chosenClubId;
        const clubBName = players[uidB].chosenClubName;

        await roomRef.update({
          status: 'countdown',
          'roundState.phase': 'countdown',
          'roundState.clubA': { id: clubAId, name: clubAName, logo_url: null },
          'roundState.clubB': { id: clubBId, name: clubBName, logo_url: null },
        });

        // After 4 seconds, move to guessing
        setTimeout(async () => {
          const phaseEndsAt = admin.firestore.Timestamp.fromMillis(Date.now() + 10000);
          await roomRef.update({
            status: 'guessing',
            'roundState.phase': 'guessing',
            'roundState.phaseEndsAt': phaseEndsAt,
          });
        }, 4000);

        return;
      }
    }

    // GUESSING: track first submitter
    if (after.roundState?.phase === 'guessing') {
      const submitted = playerUids.filter((uid) => players[uid].hasSubmitted);
      if (submitted.length > 0 && !after.roundState.firstSubmitter) {
        await roomRef.update({
          'roundState.firstSubmitter': submitted[0],
        });
      }

      // All submitted → move to result
      if (submitted.length >= 2 || (submitted.length === 1 && before.roundState?.firstSubmitter)) {
        await roomRef.update({
          status: 'result',
          'roundState.phase': 'result',
        });

        // After 5 seconds, advance to next round or finish
        setTimeout(async () => {
          const snap = await roomRef.get();
          const data = snap.data();
          if (!data) return;

          if (data.currentRound >= data.maxRounds) {
            await roomRef.update({ status: 'finished' });
          } else {
            // Reset for next round
            const resetPlayers: Record<string, any> = {};
            for (const uid of Object.keys(data.players)) {
              resetPlayers[`players.${uid}.chosenClubId`] = null;
              resetPlayers[`players.${uid}.chosenClubName`] = null;
              resetPlayers[`players.${uid}.currentGuess`] = null;
              resetPlayers[`players.${uid}.hasSubmitted`] = false;
            }

            await roomRef.update({
              ...resetPlayers,
              status: 'choosing',
              currentRound: admin.firestore.FieldValue.increment(1),
              'roundState.clubA': null,
              'roundState.clubB': null,
              'roundState.phase': 'choosing',
              'roundState.phaseEndsAt': null,
              'roundState.firstSubmitter': null,
              'roundState.roundWinner': null,
              'roundState.correctAnswer': null,
            });
          }
        }, 5000);
      }
    }
  });
