import { useEffect } from 'react';
import { doc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db, ensureAuth } from '../config/firebase';

export function usePresence() {
  useEffect(() => {
    let uid: string;
    let interval: ReturnType<typeof setInterval>;
    let mounted = true;

    ensureAuth().then((id) => {
      if (!mounted) return;
      uid = id;
      const ref = doc(db, 'presence', uid);
      setDoc(ref, { lastSeen: serverTimestamp() }).catch(console.error);
      interval = setInterval(
        () => setDoc(ref, { lastSeen: serverTimestamp() }).catch(console.error),
        30_000
      );
    });

    return () => {
      mounted = false;
      clearInterval(interval);
      if (uid) deleteDoc(doc(db, 'presence', uid)).catch(console.error);
    };
  }, []);
}
