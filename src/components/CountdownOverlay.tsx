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
      const timer = setTimeout(onComplete, 600);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => setCount(count - 1), 1000);
    return () => clearTimeout(timer);
  }, [count, onComplete]);

  return (
    <div className="fixed inset-0 bg-bg-primary/95 flex flex-col items-center justify-center z-50 animate-fade-in">
      {/* Club display */}
      <div className="mb-12">
        <ClubDisplay clubA={clubA} clubB={clubB} size="lg" />
      </div>

      {/* Countdown number */}
      <div className="flex flex-col items-center gap-3">
        <span
          key={count}
          className={`font-display font-black text-7xl animate-countdown ${
            count > 0 ? 'text-accent' : 'text-accent'
          }`}
        >
          {count > 0 ? count : 'GO!'}
        </span>
        {count > 0 && (
          <span className="text-text-secondary font-body text-sm uppercase tracking-widest">
            Get ready...
          </span>
        )}
      </div>
    </div>
  );
}
