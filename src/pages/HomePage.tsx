import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, onSnapshot, setDoc, increment } from 'firebase/firestore';
import { db } from '../config/firebase';

const S = {
  bg:        'var(--bg)',
  surface:   'var(--surface)',
  border:    'var(--border)',
  accent:    'var(--accent)',
  text:      'var(--text)',
  textDim:   'var(--text-dim)',
  fontHead:  "'Dela Gothic One', system-ui, sans-serif",
  fontBody:  "'DM Sans', system-ui, sans-serif",
  radius:    '12px',
  radiusLg:  '20px',
  transition:'200ms cubic-bezier(0.4, 0, 0.2, 1)',
};

export default function HomePage() {
  const navigate = useNavigate();
  const [visits, setVisits] = useState<number | null>(null);
  const [gamesPlayed, setGamesPlayed] = useState<number | null>(null);

  useEffect(() => {
    const statsRef = doc(db, 'app_stats', 'global');

    // Atomically increment visit count (creates the doc if it doesn't exist)
    setDoc(statsRef, { visits: increment(1) }, { merge: true }).catch(console.error);

    // Live-subscribe so both counters update in real time
    const unsub = onSnapshot(statsRef, (snap) => {
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
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', minHeight: '100vh', background: S.bg,
      padding: '2rem 1.5rem', gap: 40,
      animation: 'fadeIn 0.4s ease forwards',
    }}>

      {/* Hero */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center' }}>
        <div style={{ fontSize: '3.5rem', lineHeight: 1, marginBottom: 4 }}>⚽</div>
        <h1 style={{ fontFamily: S.fontHead, fontSize: 'clamp(2.4rem, 8vw, 3.5rem)', letterSpacing: '-0.02em', color: S.text, lineHeight: 1 }}>
          Club Link
        </h1>
        <p style={{ fontFamily: S.fontBody, fontSize: '1rem', color: S.textDim, maxWidth: 300, lineHeight: 1.5 }}>
          Name a player who has played for both clubs. 5 rounds. 10 seconds each.
        </p>
      </div>

      {/* Mode buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 380 }}>
        {/* Primary — Single Player */}
        <button
          onClick={() => navigate('/single')}
          style={{
            background: S.accent, color: '#000', fontFamily: S.fontHead,
            fontSize: '1.2rem', letterSpacing: '0.02em', padding: '16px 0',
            borderRadius: S.radius, border: 'none', cursor: 'pointer',
            transition: S.transition, boxShadow: '0 0 32px var(--accent-glow-lg)',
            width: '100%',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 0 48px var(--accent-glow-xl)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 0 32px var(--accent-glow-lg)'; }}
        >
          SINGLE PLAYER
        </button>

        {/* Secondary — Play Online */}
        <button
          onClick={() => navigate('/matchmaking')}
          style={{
            background: S.surface, color: S.text, fontFamily: S.fontHead,
            fontSize: '1rem', letterSpacing: '0.02em', padding: '14px 0',
            borderRadius: S.radius, border: `1px solid ${S.border}`, cursor: 'pointer',
            transition: S.transition, width: '100%',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = S.accent; e.currentTarget.style.transform = 'scale(1.02)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = S.border; e.currentTarget.style.transform = 'scale(1)'; }}
        >
          PLAY ONLINE
        </button>

        {/* Secondary — Play with Friends */}
        <button
          onClick={() => navigate('/lobby')}
          style={{
            background: S.surface, color: S.text, fontFamily: S.fontHead,
            fontSize: '1rem', letterSpacing: '0.02em', padding: '14px 0',
            borderRadius: S.radius, border: `1px solid ${S.border}`, cursor: 'pointer',
            transition: S.transition, width: '100%',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = S.accent; e.currentTarget.style.transform = 'scale(1.02)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = S.border; e.currentTarget.style.transform = 'scale(1)'; }}
        >
          PLAY WITH FRIENDS
        </button>

        {/* Tertiary — Send Feedback */}
        <button
          onClick={() => navigate('/contact')}
          style={{
            background: 'none', color: S.textDim, fontFamily: S.fontBody,
            fontSize: '0.85rem', padding: '8px 0',
            border: 'none', cursor: 'pointer',
            transition: S.transition, width: '100%',
            textDecoration: 'underline', textUnderlineOffset: '3px',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = S.text)}
          onMouseLeave={e => (e.currentTarget.style.color = S.textDim)}
        >
          Send Feedback
        </button>
      </div>

      {/* How to Play */}
      <div style={{ background: S.surface, border: `1px solid ${S.border}`, borderRadius: S.radiusLg, padding: '24px', maxWidth: 380, width: '100%' }}>
        <div style={{ fontFamily: S.fontBody, fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: S.textDim, marginBottom: 14 }}>
          How to play
        </div>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            'Pick a football club you know well',
            "We'll pair it with a mystery club",
            'Name any player who played for BOTH clubs',
            'You have 10 seconds per round',
            'Score 5/5 for a perfect game',
          ].map((item, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.9rem', color: S.textDim, lineHeight: 1.4 }}>
              <span style={{ background: S.border, color: S.text, borderRadius: '50%', width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, flexShrink: 0, marginTop: 1, fontFamily: S.fontBody }}>
                {i + 1}
              </span>
              <span style={{ fontFamily: S.fontBody }}>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Stats */}
      {visits !== null && (
        <div style={{ display: 'flex', gap: 32, justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: S.fontHead, fontSize: '1.8rem', color: S.accent }}>{visits ?? '—'}</div>
            <div style={{ fontFamily: S.fontBody, fontSize: '0.75rem', color: S.textDim, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Visits</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: S.fontHead, fontSize: '1.8rem', color: S.accent }}>{gamesPlayed ?? '—'}</div>
            <div style={{ fontFamily: S.fontBody, fontSize: '0.75rem', color: S.textDim, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Games played</div>
          </div>
        </div>
      )}
    </div>
  );
}
