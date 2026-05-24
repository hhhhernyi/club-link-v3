import * as admin from 'firebase-admin';

admin.initializeApp();

export { matchPlayers } from './matchPlayers';
export { onRoomUpdate } from './onRoomUpdate';
export { cleanupRooms } from './cleanupRooms';
