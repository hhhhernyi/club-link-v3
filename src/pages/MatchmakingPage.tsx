import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useMatchmaking } from '../hooks/useMatchmaking';

export default function MatchmakingPage() {
  const navigate = useNavigate();
  const { uid } = useAuth();
  const { searching, matchedRoomId, joinQueue, leaveQueue } = useMatchmaking();

  const [name, setName] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleFind = useCallback(() => {
    if (!uid || !name.trim()) return;
    joinQueue(uid, name.trim());
    setHasSearched(true);
  }, [uid, name, joinQueue]);

  const handleCancel = useCallback(() => {
    leaveQueue();
    setHasSearched(false);
  }, [leaveQueue]);

  // Navigate when matched
  useEffect(() => {
    if (matchedRoomId) {
      navigate(`/game/${matchedRoomId}`);
    }
  }, [matchedRoomId, navigate]);

  return (
    <div className="min-h-screen bg-bg-primary px-4 py-6">
      <button
        onClick={() => {
          if (hasSearched) handleCancel();
          navigate('/');
        }}
        className="text-text-secondary hover:text-text-primary text-sm font-body transition-colors mb-8"
      >
        ← Back
      </button>

      <div className="max-w-md mx-auto animate-fade-in">
        <h1 className="font-display font-black text-3xl text-center mb-8">
          Play <span className="text-accent">Online</span>
        </h1>

        {!hasSearched ? (
          <>
            <div className="mb-6">
              <label className="block text-text-secondary text-xs uppercase tracking-wider font-display mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-3.5 rounded-xl border border-border bg-bg-input text-text-primary font-body placeholder:text-text-muted focus:border-accent transition-colors"
                onKeyDown={(e) => e.key === 'Enter' && handleFind()}
              />
            </div>

            <button
              onClick={handleFind}
              disabled={!name.trim()}
              className="w-full py-4 rounded-xl bg-accent text-bg-primary font-display font-bold text-lg hover:bg-accent-dim transition-all disabled:opacity-50"
            >
              Find Opponent
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-6 mt-12 animate-fade-in">
            {/* Spinner */}
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 rounded-full border-2 border-border" />
              <div className="absolute inset-0 rounded-full border-2 border-accent border-t-transparent animate-spin-slow" />
              <div className="absolute inset-0 flex items-center justify-center text-2xl">
                ⚽
              </div>
            </div>

            <p className="text-text-secondary font-body">Finding an opponent...</p>

            <button
              onClick={handleCancel}
              className="text-danger hover:text-danger-dim text-sm font-display font-semibold transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
