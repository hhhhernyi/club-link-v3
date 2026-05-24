import { useState, useEffect } from 'react';
import type { ClubInfo } from '../types/game';
import ClubDisplay from './ClubDisplay';

interface CountdownOverlayProps {
  clubA: ClubInfo | null;
  clubB: ClubInfo | null;
  onComplete: () => void;
}

export default function CountdownOverlay({ clubA, clubB, onComplete }: CountdownOverlayProps) {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count <= 0) {
      const t = setTimeout(onComplete, 600);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setCount(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [count, onComplete]);

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'var(--bg)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      zIndex: 50, animation: 'fadeIn 0.3s ease',
    }}>
      <div style={{ marginBottom: 48 }}>
        <ClubDisplay clubA={clubA} clubB={clubB} size="lg" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <span
          key={count}
          style={{
            fontFamily: "'Dela Gothic One', system-ui, sans-serif",
            fontSize: '5rem', lineHeight: 1, color: 'var(--accent)',
            animation: 'countdown-pop 0.5s ease-out',
            display: 'block',
          }}
        >
          {count > 0 ? count : 'GO!'}
        </span>
        {count > 0 && (
          <span style={{
            color: 'var(--text-dim)', fontSize: '0.85rem',
            letterSpacing: '0.15em', textTransform: 'uppercase',
          }}>
            Get ready…
          </span>
        )}
      </div>
    </div>
  );
}
