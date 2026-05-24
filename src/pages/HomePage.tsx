import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();
  const [visits, setVisits] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(0);

  useEffect(() => {
    const v = parseInt(localStorage.getItem('cl_visits') || '0') + 1;
    localStorage.setItem('cl_visits', v.toString());
    setVisits(v);
    setGamesPlayed(parseInt(localStorage.getItem('cl_games') || '0'));
  }, []);

  return (
    <div className="min-h-screen bg-pitch flex flex-col items-center justify-center px-4 py-12">
      {/* Soccer ball */}
      <div className="mb-6 text-6xl animate-fade-in">⚽</div>

      {/* Title */}
      <h1 className="font-display font-black text-5xl md:text-6xl text-ink mb-3 animate-fade-in">
        Club <span className="text-accent">Link</span>
      </h1>

      {/* Subtitle */}
      <p className="text-ink-dim font-body text-center max-w-md mb-8 animate-fade-in">
        Name a player who has played for both clubs. 5 rounds. 10 seconds each.
      </p>

      {/* Mode buttons */}
      <div className="flex flex-col gap-3 w-full max-w-sm animate-slide-up">
        <button
          onClick={() => navigate('/single')}
          className="w-full py-4 rounded-xl bg-accent text-pitch font-display font-bold text-lg hover:bg-accent-dim transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          Single Player
        </button>
        <button
          onClick={() => navigate('/matchmaking')}
          className="w-full py-4 rounded-xl bg-card border border-rail text-ink font-display font-bold text-lg hover:bg-card-hover transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          Play Online
        </button>
        <button
          onClick={() => navigate('/lobby')}
          className="w-full py-4 rounded-xl bg-card border border-rail text-ink font-display font-bold text-lg hover:bg-card-hover transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          Play with Friends
        </button>
      </div>

      {/* How to Play */}
      <div className="mt-10 w-full max-w-sm bg-card rounded-2xl p-6 border border-rail/50 animate-slide-up">
        <h2 className="font-display font-bold text-sm uppercase tracking-wider text-ink-dim mb-4">
          How to Play
        </h2>
        <div className="flex flex-col gap-3">
          {[
            'Pick a football club you know well',
            "We'll pair it with a mystery club",
            'Name any player who played for BOTH clubs',
            'You have 10 seconds per round',
            'Score 5/5 for a perfect game',
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center flex-shrink-0 text-xs font-mono font-bold">
                {i + 1}
              </div>
              <span className="text-ink-dim text-sm font-body">{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="mt-8 flex items-center gap-10 animate-fade-in">
        <div className="text-center">
          <div className="font-display font-black text-2xl text-accent">{visits}</div>
          <div className="text-ink-faint text-xs uppercase tracking-wider font-display">Visits</div>
        </div>
        <div className="text-center">
          <div className="font-display font-black text-2xl text-accent">{gamesPlayed}</div>
          <div className="text-ink-faint text-xs uppercase tracking-wider font-display">Games Played</div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-ink-faint text-xs font-mono">
        v0.2.0 · built by Hern
      </div>
    </div>
  );
}