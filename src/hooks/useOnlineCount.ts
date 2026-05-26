import { useState, useEffect } from 'react';
import { collection, query, where, getCountFromServer, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

export function useOnlineCount(): number | null {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const cutoff = Timestamp.fromMillis(Date.now() - 90_000);
        const snap = await getCountFromServer(
          query(collection(db, 'presence'), where('lastSeen', '>', cutoff))
        );
        setCount(snap.data().count);
      } catch (e) { console.error(e); }
    };
    fetch();
    const id = setInterval(fetch, 30_000);
    return () => clearInterval(id);
  }, []);

  return count;
}
