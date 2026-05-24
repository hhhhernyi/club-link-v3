import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useGameRoom } from '../hooks/useGameRoom';
import { useGameActions } from '../hooks/useGameActions';
import { useClubSearch } from '../hooks/useClubSearch';
import { useTimer } from '../hooks/useTimer';
import ClubSelector from '../components/ClubSelector';
import ClubDisplay from '../components/ClubDisplay';
import CircularTimer from '../components/CircularTimer';
import CountdownOverlay from '../components/CountdownOverlay';
import GuessInput from '../components/GuessInput';
import RoundResult from '../components/RoundResult';
import RoundDots from '../components/RoundDots';
import RoomCodeDisplay from '../components/RoomCodeDisplay';
import ScoreBoard from '../components/ScoreBoard';

const TIMER_SECONDS = 10;

const S = {
  bg:       'var(--bg)',
  surface:  'var(--surface)',
  surface2: 'var(--surface2)',
  border:   'var(--border)',
  accent:   'var(--accent)',
  accentBg: 'var(--accent-bg)',
  accentGlow: 'var(--accent-glow)',
  danger:   'var(--danger)',
  text:     'var(--text)',
  textDim:  'var(--text-dim)',
  fontHead: "'Dela Gothic One', system-ui, sans-serif",
  fontBody: "'DM Sans', system-ui, sans-serif",
  radius:   '12px',
  radiusLg: '16px',
  transition: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
};

export default function GamePage() {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const { uid } = useAuth();
  const { room, loading: roomLoading } = useGameRoom(roomId || null);
  const { setReady, chooseClub, submitGuess, getValidPlayers } = useGameActions();
  const { clubs, loading: clubsLoading, searchClubs, getAllClubs } = useClubSearch();

  const [validAnswers, setValidAnswers] = useState<string[]>([]);
  const [lastGuess, setLastGuess] = useState<string | null>(null);
  const [localResult, setLocalResult] = useState<'correct' | 'wrong' | 'timeout' | 'skipped' | null>(null);
  const [showCountdown, setShowCountdown] = useState(false);
  const [results, setResults] = useState<('correct' | 'wrong' | 'timeout' | 'skipped' | null)[]>([]);

  const timer = useTimer({ duration: TIMER_SECONDS, onComplete: () => handleTimeout() });

  useEffect(() => {
    if (room?.status === 'choosing' || room?.roundState?.phase === 'choosing') getAllClubs();
  }, [room?.status, room?.roundState?.phase, getAllClubs]);

  useEffect(() => {
    if (!room) return;
    if (room.status === 'countdown' || room.roundState?.phase === 'countdown') setShowCountdown(true);
    if (room.status === 'guessing' || room.roundState?.phase === 'guessing') {
      setShowCountdown(false);
      timer.reset(TIMER_SECONDS);
      timer.start();
    }
  }, [room?.status, room?.roundState?.phase]);

  const handleReady = useCallback(() => {
    if (!roomId || !uid) return;
    setReady(roomId, uid, true);
  }, [roomId, uid, setReady]);

  const handleClubSelect = useCallback((club: { id: number; name: string }) => {
    if (!roomId || !uid) return;
    chooseClub(roomId, uid, club.id, club.name);
  }, [roomId, uid, chooseClub]);

  const handleGuess = useCallback(async (guess: string) => {
    if (!roomId || !uid || !room?.roundState?.clubA || !room?.roundState?.clubB) return;
    timer.stop();
    setLastGuess(guess);
    try {
      const result = await submitGuess(roomId, uid, guess, room.roundState.clubA.id, room.roundState.clubB.id);
      setLocalResult(result.valid ? 'correct' : 'wrong');
      const players = await getValidPlayers(room.roundState.clubA.id, room.roundState.clubB.id);
      setValidAnswers(players.map(p => p.name));
    } catch (err) { console.error('Submit error:', err); }
  }, [roomId, uid, room, timer, submitGuess, getValidPlayers]);

  const handleTimeout = useCallback(async () => {
    if (!room?.roundState?.clubA || !room?.roundState?.clubB) return;
    setLocalResult('timeout');
    setLastGuess(null);
    try {
      const players = await getValidPlayers(room.roundState.clubA.id, room.roundState.clubB.id);
      setValidAnswers(players.map(p => p.name));
    } catch (err) { console.error(err); }
  }, [room, getValidPlayers]);

  const handleSkip = useCallback(async () => {
    if (!room?.roundState?.clubA || !room?.roundState?.clubB) return;
    timer.stop();
    setLocalResult('skipped');
    setLastGuess(null);
    try {
      const players = await getValidPlayers(room.roundState.clubA.id, room.roundState.clubB.id);
      setValidAnswers(players.map(p => p.name));
    } catch (err) { console.error(err); }
  }, [room, timer, getValidPlayers]);

  // ── Loading ────────────────────────────────────────────────────────────────
  if (roomLoading) {
    return (
      <div style={{ minHeight: '100vh', background: S.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <svg viewBox="0 0 48 48" style={{ width: 48, height: 48 }}>
          <circle cx="24" cy="24" r="20" fill="none" stroke={S.border} strokeWidth="3" />
          <circle cx="24" cy="24" r="20" fill="none" stroke={S.accent} strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 20 * 0.25} ${2 * Math.PI * 20 * 0.75}`}
            style={{ transformOrigin: '24px 24px', animation: 'spin 1s linear infinite' }} />
        </svg>
        <p style={{ color: S.textDim, fontFamily: S.fontBody, fontSize: '0.9rem' }}>Loading game…</p>
      </div>
    );
  }

  if (!room) {
    return (
      <div style={{ minHeight: '100vh', background: S.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <p style={{ color: S.textDim, fontFamily: S.fontBody }}>Room not found</p>
        <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: S.accent, fontFamily: S.fontHead, fontSize: '1rem', cursor: 'pointer' }}>
          Back to Home
        </button>
      </div>
    );
  }

  const playerKeys = Object.keys(room.players);
  const myPlayer = uid ? room.players[uid] : null;
  const opponentUid = playerKeys.find(k => k !== uid);
  const opponent = opponentUid ? room.players[opponentUid] : null;
  const totalRounds = room.maxRounds;

  const page = (content: React.ReactNode) => (
    <div style={{ minHeight: '100vh', background: S.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1.5rem', animation: 'fadeIn 0.3s ease' }}>
      <div style={{ width: '100%', maxWidth: 500, marginBottom: 24 }}>
        <button
          onClick={() => navigate('/')}
          style={{ background: 'none', border: 'none', color: S.textDim, fontFamily: S.fontBody, fontSize: '0.9rem', cursor: 'pointer', padding: 0 }}
          onMouseEnter={e => (e.currentTarget.style.color = S.text)}
          onMouseLeave={e => (e.currentTarget.style.color = S.textDim)}
        >
          ← Back
        </button>
      </div>
      <div style={{ width: '100%', maxWidth: 500 }}>{content}</div>
    </div>
  );

  // ── WAITING ────────────────────────────────────────────────────────────────
  if (room.status === 'waiting') {
    return page(
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, textAlign: 'center' }}>
        <h2 style={{ fontFamily: S.fontHead, fontSize: '1.8rem', color: S.text }}>Waiting for players…</h2>

        {room.roomCode && <RoomCodeDisplay code={room.roomCode} />}

        <p style={{ color: S.textDim, fontFamily: S.fontBody, fontSize: '0.9rem' }}>
          {playerKeys.length} / 2 players joined
        </p>

        {myPlayer && !myPlayer.ready && playerKeys.length >= 2 && (
          <button
            onClick={handleReady}
            style={{
              background: S.accent, color: '#000', fontFamily: S.fontHead,
              fontSize: '1.1rem', padding: '14px 40px', borderRadius: S.radius,
              border: 'none', cursor: 'pointer', boxShadow: `0 0 24px ${S.accentGlow}`,
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Ready
          </button>
        )}

        {myPlayer?.ready && (
          <p style={{ color: S.accent, fontFamily: S.fontBody, fontSize: '0.9rem' }}>
            Waiting for opponent to ready up…
          </p>
        )}
      </div>
    );
  }

  // ── CHOOSING ───────────────────────────────────────────────────────────────
  if ((room.status === 'choosing' || room.roundState?.phase === 'choosing') && myPlayer && !myPlayer.chosenClubId) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', maxWidth: 500, margin: '0 auto', padding: '1.5rem', gap: 16, background: S.bg, overflow: 'hidden' }}>
        <div>
          <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: S.textDim, fontFamily: S.fontBody, fontSize: '0.9rem', cursor: 'pointer', padding: 0, marginBottom: 16 }}
            onMouseEnter={e => (e.currentTarget.style.color = S.text)}
            onMouseLeave={e => (e.currentTarget.style.color = S.textDim)}
          >
            ← Back
          </button>
          <h1 style={{ fontFamily: S.fontHead, fontSize: '1.8rem', color: S.text }}>
            Round {room.currentRound} — Pick your club
          </h1>
          <p style={{ color: S.textDim, fontFamily: S.fontBody, fontSize: '0.9rem', marginTop: 4 }}>
            Choose a club you know well.
          </p>
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <ClubSelector clubs={clubs} onSelect={handleClubSelect} onSearch={searchClubs} loading={clubsLoading} />
        </div>
      </div>
    );
  }

  // Waiting after choosing
  if (myPlayer?.chosenClubId && room.roundState?.phase === 'choosing') {
    return page(
      <div style={{ textAlign: 'center', padding: '2rem 0' }}>
        <p style={{ color: S.accent, fontFamily: S.fontHead, fontSize: '1.2rem' }}>
          You picked <span style={{ fontWeight: 700 }}>{myPlayer.chosenClubName}</span>
        </p>
        <p style={{ color: S.textDim, fontFamily: S.fontBody, fontSize: '0.9rem', marginTop: 8 }}>
          Waiting for opponent…
        </p>
      </div>
    );
  }

  // ── COUNTDOWN ──────────────────────────────────────────────────────────────
  if (showCountdown && room.roundState?.clubA && room.roundState?.clubB) {
    return (
      <CountdownOverlay
        clubA={room.roundState.clubA}
        clubB={room.roundState.clubB}
        onComplete={() => setShowCountdown(false)}
      />
    );
  }

  // ── GUESSING ───────────────────────────────────────────────────────────────
  if ((room.status === 'guessing' || room.roundState?.phase === 'guessing') && !showCountdown && !localResult) {
    return page(
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
        <div style={{ fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: S.textDim }}>
          Round {room.currentRound} of {totalRounds}
        </div>
        <RoundDots currentRound={room.currentRound} totalRounds={totalRounds} results={results} />

        {opponent && myPlayer && (
          <ScoreBoard
            playerName={myPlayer.displayName || 'You'}
            playerScore={myPlayer.score}
            opponentName={opponent.displayName || 'Opponent'}
            opponentScore={opponent.score}
            currentRound={room.currentRound}
            totalRounds={totalRounds}
          />
        )}

        <ClubDisplay clubA={room.roundState?.clubA || null} clubB={room.roundState?.clubB || null} />

        <CircularTimer secondsLeft={timer.secondsLeft} fraction={timer.fraction} totalSeconds={TIMER_SECONDS} />

        <GuessInput onSubmit={handleGuess} onSkip={handleSkip} />
      </div>
    );
  }

  // ── RESULT (local) ─────────────────────────────────────────────────────────
  if (localResult && room.roundState) {
    return page(
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <RoundDots currentRound={room.currentRound} totalRounds={totalRounds} results={[...results, localResult]} />
        <RoundResult
          result={localResult}
          guess={lastGuess}
          validAnswers={validAnswers}
          clubA={room.roundState.clubA}
          clubB={room.roundState.clubB}
          onContinue={() => {
            setLocalResult(null);
            setLastGuess(null);
            setValidAnswers([]);
            setResults(prev => [...prev, localResult]);
          }}
        />
      </div>
    );
  }

  // ── FINISHED ───────────────────────────────────────────────────────────────
  if (room.status === 'finished' && myPlayer) {
    const won = myPlayer.score > (opponent?.score ?? 0);
    const drew = myPlayer.score === (opponent?.score ?? 0);
    return page(
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, textAlign: 'center' }}>
        <div style={{ fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: S.textDim }}>
          Game Over
        </div>

        <div>
          <span style={{ fontFamily: S.fontHead, fontSize: 'clamp(3.5rem, 12vw, 5rem)', color: S.accent, lineHeight: 1 }}>
            {myPlayer.score}
          </span>
          <span style={{ fontFamily: S.fontHead, fontSize: '1.5rem', color: S.textDim }}>
            {' '}– {opponent?.score ?? 0}
          </span>
        </div>

        <p style={{ fontFamily: S.fontBody, color: S.textDim, fontSize: '1rem' }}>
          {won ? '🏆 You win!' : drew ? "It's a draw!" : 'You lost!'}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              background: S.accent, color: '#000', fontFamily: S.fontHead,
              fontSize: '1.1rem', padding: '15px 0', borderRadius: S.radius,
              border: 'none', cursor: 'pointer', width: '100%',
              boxShadow: `0 0 24px ${S.accentGlow}`,
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return null;
}
