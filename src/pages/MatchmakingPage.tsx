import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useMatchmaking } from '../hooks/useMatchmaking';

const S = {
  bg:         'var(--bg)',
  surface:    'var(--surface)',
  surface2:   'var(--surface2)',
  border:     'var(--border)',
  accent:     'var(--accent)',
  accentBg:   'var(--accent-bg)',
  accentBorder:'var(--accent-border)',
  danger:     'var(--danger)',
  text:       'var(--text)',
  textDim:    'var(--text-dim)',
  fontHead:   "'Dela Gothic One', system-ui, sans-serif",
  fontBody:   "'DM Sans', system-ui, sans-serif",
  fontMono:   "'JetBrains Mono', monospace",
  radius:     '12px',
  transition: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
};

export default function MatchmakingPage() {
  const navigate = useNavigate();
  const { uid } = useAuth();
  const { searching, matchedRoomId, joinQueue, leaveQueue } = useMatchmaking();

  const [name, setName] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [dots, setDots] = useState('');

  const handleFind = useCallback(() => {
    if (!uid || !name.trim()) return;
    joinQueue(uid, name.trim());
    setHasSearched(true);
  }, [uid, name, joinQueue]);

  const handleCancel = useCallback(() => {
    leaveQueue();
    setHasSearched(false);
  }, [leaveQueue]);

  // Animated dots while searching
  useEffect(() => {
    if (!hasSearched) return;
    const interval = setInterval(() => {
      setDots(d => d.length >= 3 ? '' : d + '.');
    }, 500);
    return () => clearInterval(interval);
  }, [hasSearched]);

  // Navigate when matched
  useEffect(() => {
    if (matchedRoomId) navigate(`/game/${matchedRoomId}`);
  }, [matchedRoomId, navigate]);

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      minHeight: '100vh', background: S.bg, padding: '1.5rem',
      animation: 'fadeIn 0.3s ease forwards',
    }}>
      {/* Back */}
      <div style={{ width: '100%', maxWidth: 400, marginBottom: 32 }}>
        <button
          onClick={() => { if (hasSearched) handleCancel(); navigate('/'); }}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: S.textDim, fontFamily: S.fontBody, fontSize: '0.9rem',
            transition: S.transition, padding: 0,
          }}
          onMouseEnter={e => (e.currentTarget.style.color = S.text)}
          onMouseLeave={e => (e.currentTarget.style.color = S.textDim)}
        >
          ← Back
        </button>
      </div>

      <div style={{ width: '100%', maxWidth: 400 }}>
        {/* Title */}
        <h1 style={{
          fontFamily: S.fontHead, fontSize: '2rem', color: S.text,
          textAlign: 'center', marginBottom: 32,
        }}>
          Play <span style={{ color: S.accent }}>Online</span>
        </h1>

        {!hasSearched ? (
          <>
            {/* Name input */}
            <div style={{ marginBottom: 20 }}>
              <label style={{
                display: 'block', fontFamily: S.fontBody, fontWeight: 600,
                fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                color: S.textDim, marginBottom: 8,
              }}>
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleFind()}
                placeholder="Enter your name"
                style={{
                  width: '100%', padding: '12px 16px', borderRadius: S.radius,
                  border: `1px solid ${S.border}`, background: S.surface,
                  color: S.text, fontFamily: S.fontBody, fontSize: '1rem',
                  transition: S.transition, boxSizing: 'border-box',
                }}
                onFocus={e => (e.currentTarget.style.borderColor = S.accent)}
                onBlur={e => (e.currentTarget.style.borderColor = S.border)}
              />
            </div>

            {/* Find button */}
            <button
              onClick={handleFind}
              disabled={!name.trim()}
              style={{
                width: '100%', padding: '14px 0', borderRadius: S.radius,
                background: name.trim() ? S.accent : S.surface,
                color: name.trim() ? '#000' : S.textDim,
                fontFamily: S.fontHead, fontSize: '1.1rem',
                border: `1px solid ${name.trim() ? 'transparent' : S.border}`,
                cursor: name.trim() ? 'pointer' : 'not-allowed',
                transition: S.transition,
              }}
            >
              Find Opponent
            </button>
          </>
        ) : (
          /* Searching state */
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: 24, marginTop: 48,
          }}>
            {/* Spinner */}
            <div style={{ position: 'relative', width: 80, height: 80 }}>
              <svg viewBox="0 0 80 80" style={{ width: '100%', height: '100%' }}>
                <circle cx="40" cy="40" r="36" fill="none" stroke={S.border} strokeWidth="3" />
                <circle
                  cx="40" cy="40" r="36" fill="none" stroke={S.accent} strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 36 * 0.25} ${2 * Math.PI * 36 * 0.75}`}
                  style={{
                    transformOrigin: '40px 40px',
                    animation: 'spin 1.2s linear infinite',
                  }}
                />
              </svg>
              <div style={{
                position: 'absolute', inset: 0, display: 'flex',
                alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem',
              }}>
                ⚽
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: S.fontBody, color: S.text, fontSize: '1rem', marginBottom: 4 }}>
                Finding an opponent{dots}
              </p>
              {searching && (
                <p style={{ fontFamily: S.fontBody, color: S.textDim, fontSize: '0.85rem' }}>
                  Hi {name}, hang tight!
                </p>
              )}
            </div>

            <button
              onClick={handleCancel}
              style={{
                background: 'none', border: `1px solid ${S.border}`,
                borderRadius: S.radius, padding: '8px 24px',
                color: S.danger, fontFamily: S.fontBody, fontWeight: 600,
                fontSize: '0.9rem', cursor: 'pointer', transition: S.transition,
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = S.danger)}
              onMouseLeave={e => (e.currentTarget.style.borderColor = S.border)}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
