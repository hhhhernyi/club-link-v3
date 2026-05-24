import { useState, useEffect } from 'react';
import { ensureAuth } from '../config/firebase';

export function useAuth() {
  const [uid, setUid] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ensureAuth()
      .then(setUid)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { uid, loading };
}
