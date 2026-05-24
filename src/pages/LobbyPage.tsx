import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useGameActions } from '../hooks/useGameActions';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

type Tab = 'host' | 'join';

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
      // Find room by code
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

  return (
    <div className="min-h-screen bg-bg-primary px-4 py-6">
      <button
        onClick={() => navigate('/')}
        className="text-text-secondary hover:text-text-primary text-sm font-body transition-colors mb-8"
      >
        ← Back
      </button>

      <div className="max-w-md mx-auto animate-fade-in">
        <h1 className="font-display font-black text-3xl text-center mb-8">
          Play with <span className="text-accent">Friends</span>
        </h1>

        {/* Name input */}
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
          />
        </div>

        {/* Host / Join tabs */}
        <div className="flex rounded-xl border border-border overflow-hidden mb-6">
          <button
            onClick={() => setTab('host')}
            className={`flex-1 py-3 font-display font-semibold text-sm transition-colors ${
              tab === 'host'
                ? 'bg-accent/15 text-accent border-r border-accent/20'
                : 'bg-bg-card text-text-secondary hover:text-text-primary border-r border-border'
            }`}
          >
            Host Game
          </button>
          <button
            onClick={() => setTab('join')}
            className={`flex-1 py-3 font-display font-semibold text-sm transition-colors ${
              tab === 'join'
                ? 'bg-accent/15 text-accent'
                : 'bg-bg-card text-text-secondary hover:text-text-primary'
            }`}
          >
            Join Game
          </button>
        </div>

        {/* Host tab content */}
        {tab === 'host' && (
          <div className="animate-fade-in">
            <div className="mb-6">
              <label className="block text-text-secondary text-xs uppercase tracking-wider font-display mb-2">
                Rounds: {rounds}
              </label>
              <input
                type="range"
                min={3}
                max={10}
                value={rounds}
                onChange={(e) => setRounds(Number(e.target.value))}
                className="w-full accent-accent"
              />
              <div className="flex justify-between text-text-muted text-xs font-mono mt-1">
                <span>3</span>
                <span>10</span>
              </div>
            </div>

            <button
              onClick={handleHost}
              disabled={loading || !name.trim()}
              className="w-full py-4 rounded-xl bg-accent text-bg-primary font-display font-bold text-lg hover:bg-accent-dim transition-all disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Room'}
            </button>
          </div>
        )}

        {/* Join tab content */}
        {tab === 'join' && (
          <div className="animate-fade-in">
            <div className="mb-6">
              <label className="block text-text-secondary text-xs uppercase tracking-wider font-display mb-2">
                Room Code
              </label>
              <input
                type="text"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                placeholder="A B C D 1 2"
                maxLength={6}
                className="w-full px-4 py-3.5 rounded-xl border border-border bg-bg-input text-text-primary font-mono text-xl text-center tracking-[0.3em] placeholder:text-text-muted placeholder:tracking-[0.3em] focus:border-accent transition-colors"
              />
            </div>

            <button
              onClick={handleJoin}
              disabled={loading || !name.trim() || roomCode.length < 6}
              className="w-full py-4 rounded-xl bg-accent text-bg-primary font-display font-bold text-lg hover:bg-accent-dim transition-all disabled:opacity-50"
            >
              {loading ? 'Joining...' : 'Join Room'}
            </button>
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="mt-4 text-center text-danger text-sm font-body">{error}</p>
        )}
      </div>
    </div>
  );
}
