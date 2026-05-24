import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useGameActions } from '../hooks/useGameActions';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

type Tab = 'host' | 'join';

const S = {
  bg:          'var(--bg)',
  surface:     'var(--surface)',
  surface2:    'var(--surface2)',
  border:      'var(--border)',
  accent:      'var(--accent)',
  accentBg:    'var(--accent-bg)',
  accentBorder:'var(--accent-border)',
  danger:      'var(--danger)',
  dangerBg:    'var(--danger-bg)',
  text:        'var(--text)',
  textDim:     'var(--text-dim)',
  fontHead:    "'Dela Gothic One', system-ui, sans-serif",
  fontBody:    "'DM Sans', system-ui, sans-serif",
  fontMono:    "'JetBrains Mono', monospace",
  radius:      '12px',
  radiusLg:    '16px',
  transition:  '200ms cubic-bezier(0.4, 0, 0.2, 1)',
};

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontFamily: S.fontBody, fontWeight: 600, fontSize: '0.75rem',
      letterSpacing: '0.1em', textTransform: 'uppercase' as const,
      color: S.textDim, marginBottom: 8,
    }}>
      {children}
    </div>
  );
}

export default function LobbyPage() {
  const navigate = useNavigate();
  const { uid } = useAuth();
  const { createRoom, joinRoom } = useGameActions();

  const [tab, setTab] = useState<Tab>('host');
  const [name, setName] = useState('');
  const [rounds, setRounds] = useState(5);
  const [roomCode, setRoomCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleHost = useCallback(async () => {
    if (!uid || !name.trim()) return;
    setLoading(true);
    setError('');
    try {
      const roomId = await createRoom(uid, name.trim(), 'friends', rounds);
      navigate(`/game/${roomId}`);
    } catch (err) {
      setError('Failed to create room');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [uid, name, rounds, createRoom, navigate]);

  const handleJoin = useCallback(async () => {
    if (!uid || !name.trim() || !roomCode.trim()) return;
    setLoading(true);
    setError('');
    try {
      const q = query(
        collection(db, 'game_rooms'),
        where('roomCode', '==', roomCode.trim().toUpperCase()),
        where('status', '==', 'waiting')
      );
      const snap = await getDocs(q);
      if (snap.empty) {
        setError('Room not found or already started');
        setLoading(false);
        return;
      }
      const roomId = snap.docs[0].id;
      await joinRoom(roomId, uid, name.trim());
      navigate(`/game/${roomId}`);
    } catch (err) {
      setError('Failed to join room');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [uid, name, roomCode, joinRoom, navigate]);

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 16px', borderRadius: S.radius,
    border: `1px solid ${S.border}`, background: S.surface,
    color: S.text, fontFamily: S.fontBody, fontSize: '1rem',
    transition: S.transition, boxSizing: 'border-box',
  };

  const canSubmit = tab === 'host'
    ? name.trim().length > 0
    : name.trim().length > 0 && roomCode.length >= 6;

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      minHeight: '100vh', background: S.bg, padding: '1.5rem',
      animation: 'fadeIn 0.3s ease forwards',
    }}>
      {/* Back */}
      <div style={{ width: '100%', maxWidth: 420, marginBottom: 32 }}>
        <button
          onClick={() => navigate('/')}
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

      <div style={{ width: '100%', maxWidth: 420 }}>
        {/* Title */}
        <h1 style={{
          fontFamily: S.fontHead, fontSize: '2rem', color: S.text,
          textAlign: 'center', marginBottom: 32,
        }}>
          Play with <span style={{ color: S.accent }}>Friends</span>
        </h1>

        {/* Name input */}
        <div style={{ marginBottom: 20 }}>
          <Label>Your Name</Label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter your name"
            style={inputStyle}
            onFocus={e => (e.currentTarget.style.borderColor = S.accent)}
            onBlur={e => (e.currentTarget.style.borderColor = S.border)}
          />
        </div>

        {/* Host / Join tabs */}
        <div style={{
          display: 'flex', border: `1px solid ${S.border}`,
          borderRadius: S.radiusLg, overflow: 'hidden', marginBottom: 24,
        }}>
          {(['host', 'join'] as Tab[]).map((t, i) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                flex: 1, padding: '12px 0', fontFamily: S.fontHead,
                fontSize: '0.95rem', cursor: 'pointer', transition: S.transition,
                border: 'none',
                borderRight: i === 0 ? `1px solid ${tab === 'host' ? S.accentBorder : S.border}` : 'none',
                background: tab === t ? S.accentBg : S.surface,
                color: tab === t ? S.accent : S.textDim,
              }}
            >
              {t === 'host' ? 'Host Game' : 'Join Game'}
            </button>
          ))}
        </div>

        {/* Host tab */}
        {tab === 'host' && (
          <div style={{ animation: 'fadeIn 0.2s ease forwards' }}>
            <div style={{ marginBottom: 24 }}>
              <Label>Rounds: {rounds}</Label>
              <input
                type="range"
                min={3} max={10}
                value={rounds}
                onChange={e => setRounds(Number(e.target.value))}
                style={{ width: '100%', accentColor: S.accent }}
              />
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                fontFamily: S.fontMono, fontSize: '0.75rem', color: S.textDim,
                marginTop: 4,
              }}>
                <span>3</span><span>10</span>
              </div>
            </div>

            <button
              onClick={handleHost}
              disabled={loading || !name.trim()}
              style={{
                width: '100%', padding: '14px 0', borderRadius: S.radius,
                background: canSubmit ? S.accent : S.surface,
                color: canSubmit ? '#000' : S.textDim,
                fontFamily: S.fontHead, fontSize: '1.1rem',
                border: `1px solid ${canSubmit ? 'transparent' : S.border}`,
                cursor: canSubmit ? 'pointer' : 'not-allowed',
                transition: S.transition, opacity: loading ? 0.6 : 1,
              }}
            >
              {loading ? 'Creating…' : 'Create Room'}
            </button>
          </div>
        )}

        {/* Join tab */}
        {tab === 'join' && (
          <div style={{ animation: 'fadeIn 0.2s ease forwards' }}>
            <div style={{ marginBottom: 24 }}>
              <Label>Room Code</Label>
              <input
                type="text"
                value={roomCode}
                onChange={e => setRoomCode(e.target.value.toUpperCase())}
                placeholder="ABC123"
                maxLength={6}
                style={{
                  ...inputStyle,
                  fontFamily: S.fontMono, fontSize: '1.5rem',
                  textAlign: 'center', letterSpacing: '0.3em',
                }}
                onFocus={e => (e.currentTarget.style.borderColor = S.accent)}
                onBlur={e => (e.currentTarget.style.borderColor = S.border)}
              />
            </div>

            <button
              onClick={handleJoin}
              disabled={loading || !canSubmit}
              style={{
                width: '100%', padding: '14px 0', borderRadius: S.radius,
                background: canSubmit ? S.accent : S.surface,
                color: canSubmit ? '#000' : S.textDim,
                fontFamily: S.fontHead, fontSize: '1.1rem',
                border: `1px solid ${canSubmit ? 'transparent' : S.border}`,
                cursor: canSubmit ? 'pointer' : 'not-allowed',
                transition: S.transition, opacity: loading ? 0.6 : 1,
              }}
            >
              {loading ? 'Joining…' : 'Join Room'}
            </button>
          </div>
        )}

        {/* Error */}
        {error && (
          <div style={{
            marginTop: 16, padding: '12px 16px', borderRadius: S.radius,
            background: S.dangerBg, border: `1px solid ${S.danger}`,
            color: S.danger, fontFamily: S.fontBody, fontSize: '0.9rem',
            textAlign: 'center',
          }}>
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
