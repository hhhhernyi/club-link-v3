import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useOnlineCount } from '../hooks/useOnlineCount';

const fontHead = "'Dela Gothic One', system-ui, sans-serif";
const fontBody  = "'DM Sans', system-ui, sans-serif";

export function StatsBar() {
  const [visits, setVisits] = useState<number | null>(null);
  const [gamesPlayed, setGamesPlayed] = useState<number | null>(null);
  const onlineCount = useOnlineCount();

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'app_stats', 'global'), (snap) => {
      if (snap.exists()) {
        const d = snap.data();
        setVisits(d.visits ?? 0);
        setGamesPlayed(d.gamesPlayed ?? 0);
      }
    });
    return unsub;
  }, []);

  return (
    <div style={{
      display: 'flex', gap: 32, justifyContent: 'center',
      padding: '1.5rem 1.5rem 0', background: 'var(--bg)',
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: fontHead, fontSize: '1.8rem', color: 'var(--accent)' }}>{visits ?? '—'}</div>
        <div style={{ fontFamily: fontBody, fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Visits</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: fontHead, fontSize: '1.8rem', color: 'var(--accent)' }}>{gamesPlayed ?? '—'}</div>
        <div style={{ fontFamily: fontBody, fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Games played</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', flexShrink: 0 }} />
          <div style={{ fontFamily: fontHead, fontSize: '1.8rem', color: 'var(--accent)' }}>{onlineCount ?? '—'}</div>
        </div>
        <div style={{ fontFamily: fontBody, fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Online now</div>
      </div>
    </div>
  );
}
