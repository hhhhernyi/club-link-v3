import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, updateDoc, setDoc, increment } from 'firebase/firestore';
import { db } from '../config/firebase';
import { supabase } from '../config/supabase';
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
import RoundDots from '../components/RoundDots';
import RoomCodeDisplay from '../components/RoomCodeDisplay';
import ScoreBoard from '../components/ScoreBoard';

const TIMER_SECONDS = 10;
const COUNTDOWN_MS  = 3800;

const S = {
  bg:          'var(--bg)',
  surface:     'var(--surface)',
  surface2:    'var(--surface2)',
  border:      'var(--border)',
  accent:      'var(--accent)',
  accentBg:    'var(--accent-bg)',
  accentBg2:   'var(--accent-bg2)',
  accentBorder:'var(--accent-border)',
  accentGlow:  'var(--accent-glow)',
  danger:      'var(--danger)',
  dangerBg:    'var(--danger-bg)',
  text:        'var(--text)',
  textDim:     'var(--text-dim)',
  fontHead:    "'Dela Gothic One', system-ui, sans-serif",
  fontBody:    "'DM Sans', system-ui, sans-serif",
  radius:      '12px',
  radiusLg:    '16px',
};

function Spinner() {
  return (
    <svg viewBox="0 0 48 48" style={{ width: 48, height: 48 }}>
      <circle cx="24" cy="24" r="20" fill="none" stroke={S.border} strokeWidth="3" />
      <circle cx="24" cy="24" r="20" fill="none" stroke={S.accent} strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={`${2 * Math.PI * 20 * 0.25} ${2 * Math.PI * 20 * 0.75}`}
        style={{ transformOrigin: '24px 24px', animation: 'spin 1s linear infinite' }} />
    </svg>
  );
}

export default function GamePage() {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate   = useNavigate();
  const { uid }    = useAuth();
  const { room, loading: roomLoading } = useGameRoom(roomId || null);
  const { setReady, chooseClub } = useGameActions();
  const { clubs, loading: clubsLoading, searchClubs, getAllClubs } = useClubSearch();

  const [showCountdown, setShowCountdown] = useState(false);
  const [results,       setResults]       = useState<('correct' | 'wrong' | null)[]>([]);


  // Prevents double-processing of the same submission
  const processingRef        = useRef(false);
  // Tracks which round we've already recorded into `results`
  const lastRecordedRoundRef = useRef(0);
  // Prevents double-submission (e.g. timer fires just as player submits)
  const submittedRef         = useRef(false);
  // Prevents multiple countdown → guessing timeouts being scheduled
  const countdownScheduledRef = useRef(false);
  // Always-fresh room reference for use inside setTimeout callbacks
  const roomRef              = useRef(room);
  roomRef.current = room;
  // 30s club-choosing disconnect timeout (host only)
  const chooseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isHost     = !!(uid && room && uid === room.hostId);
  const roundPhase = room?.roundState?.phase ?? null;

  const timer       = useTimer({ duration: TIMER_SECONDS, onComplete: () => handleTimeout() });
  const chooseTimer = useTimer({ duration: 30 });

  // ── Load clubs ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (room?.status === 'choosing') getAllClubs();
  }, [room?.status]);

  // ── Choosing-phase countdown (multiplayer only) ───────────────────────────
  useEffect(() => {
    if (room?.status === 'choosing' && room?.mode !== 'single') {
      chooseTimer.restart(30);
    } else {
      chooseTimer.stop();
    }
  }, [room?.status]);

  // ── Reset submittedRef when phase changes ────────────────────────────────
  useEffect(() => {
    submittedRef.current = false;
  }, [roundPhase, room?.currentRound]);

  // ── Record round result when result phase begins ─────────────────────────
  useEffect(() => {
    if (!room || !uid) return;
    if (room.status !== 'guessing' || roundPhase !== 'result') return;
    if (room.currentRound <= lastRecordedRoundRef.current) return;
    lastRecordedRoundRef.current = room.currentRound;
    const winner = room.roundState?.roundWinner;
    setResults(prev => [...prev, winner === uid ? 'correct' : 'wrong']);
  }, [roundPhase]);

  // ── HOST: waiting → choosing ─────────────────────────────────────────────
  useEffect(() => {
    if (!isHost || !roomId || !room || room.status !== 'waiting') return;
    const players = Object.values(room.players);
    if (players.length >= 2 && players.every(p => p.ready)) {
      const resets: Record<string, unknown> = {};
      Object.keys(room.players).forEach(pUid => {
        resets[`players.${pUid}.chosenClubId`]   = null;
        resets[`players.${pUid}.chosenClubName`] = null;
        resets[`players.${pUid}.hasSubmitted`]   = false;
        resets[`players.${pUid}.currentGuess`]   = null;
      });
      updateDoc(doc(db, 'game_rooms', roomId), { status: 'choosing', ...resets });
    }
  }, [isHost, roomId, room]);

  // ── HOST: choosing → countdown → guessing (30s disconnect guard) ───────────
  useEffect(() => {
    if (!isHost || !roomId || !room || room.status !== 'choosing') {
      // Leaving choosing phase — cancel any pending disconnect timer
      if (chooseTimeoutRef.current !== null) {
        clearTimeout(chooseTimeoutRef.current);
        chooseTimeoutRef.current = null;
      }
      countdownScheduledRef.current = false;
      return;
    }
    if (countdownScheduledRef.current) return;

    const entries = Object.entries(room.players);
    if (entries.length >= 2 && entries.every(([, p]) => p.chosenClubId != null)) {
      // Both players chose — cancel disconnect timer and start countdown
      countdownScheduledRef.current = true;
      if (chooseTimeoutRef.current !== null) {
        clearTimeout(chooseTimeoutRef.current);
        chooseTimeoutRef.current = null;
      }
      const sorted = [...entries].sort(([a], [b]) => a === room.hostId ? -1 : b === room.hostId ? 1 : 0);
      const [, hp] = sorted[0];
      const [, gp] = sorted[1];
      updateDoc(doc(db, 'game_rooms', roomId), {
        status: 'countdown',
        'roundState.clubA': { id: hp.chosenClubId, name: hp.chosenClubName, logo_url: null },
        'roundState.clubB': { id: gp.chosenClubId, name: gp.chosenClubName, logo_url: null },
      });
      setTimeout(() => {
        updateDoc(doc(db, 'game_rooms', roomId), {
          status: 'guessing',
          'roundState.phase': 'guessing',
          'roundState.firstSubmitter':  null,
          'roundState.firstGuess':      null,
          'roundState.firstResult':     null,
          'roundState.secondSubmitter': null,
          'roundState.secondGuess':     null,
          'roundState.secondResult':    null,
          'roundState.roundWinner':     null,
          'roundState.correctAnswer':   null,
          'roundState.validAnswers':    null,
        });
      }, COUNTDOWN_MS);
    } else {
      // Not all players have chosen yet — start the 30s disconnect timer (once)
      if (chooseTimeoutRef.current === null) {
        chooseTimeoutRef.current = setTimeout(async () => {
          chooseTimeoutRef.current = null;
          const currentRoom = roomRef.current;
          if (!currentRoom || currentRoom.status !== 'choosing') return;
          // Find whoever still hasn't picked a club
          const notChosen = Object.entries(currentRoom.players).find(([, p]) => !p.chosenClubId);
          if (!notChosen) return; // Everyone chose in the last moment — safe to ignore
          const [, slowPlayer] = notChosen;
          try {
            await updateDoc(doc(db, 'game_rooms', roomId), {
              status: 'disconnected',
              disconnectedPlayerName: slowPlayer.displayName,
            });
          } catch (err) {
            console.error('Disconnect update failed:', err);
          }
        }, 30_000);
      }
    }
  }, [isHost, roomId, room]);

  // Cleanup choose timeout on unmount
  useEffect(() => {
    return () => {
      if (chooseTimeoutRef.current !== null) clearTimeout(chooseTimeoutRef.current);
    };
  }, []);

  // ── HOST: process first submission (guessing → second_chance | result) ────
  useEffect(() => {
    if (!isHost || !roomId || !room) return;
    if (room.status !== 'guessing' || roundPhase !== 'guessing') return;
    if (room.roundState?.firstSubmitter != null) return;
    if (processingRef.current) return;

    const submitterEntry = Object.entries(room.players).find(([, p]) => p.hasSubmitted);
    if (!submitterEntry) return;

    const [submitterUid, submitterPlayer] = submitterEntry;
    const guess   = submitterPlayer.currentGuess;
    const clubAId = room.roundState?.clubA?.id;
    const clubBId = room.roundState?.clubB?.id;
    if (clubAId == null || clubBId == null) return;

    const secondUid = Object.keys(room.players).find(k => k !== submitterUid);

    processingRef.current = true;
    (async () => {
      try {
        let isCorrect = false;
        if (guess) {
          const { data } = await supabase.rpc('validate_answer', {
            guess, club_a_id: clubAId, club_b_id: clubBId,
          });
          isCorrect = (data as any)?.valid ?? false;
        }

        const base: Record<string, unknown> = {
          'roundState.firstSubmitter': submitterUid,
          'roundState.firstGuess':    guess ?? null,
          'roundState.firstResult':   isCorrect ? 'correct' : (guess ? 'wrong' : 'timeout'),
        };

        if (isCorrect) {
          const { data: vd } = await supabase.rpc('get_valid_players', {
            club_a_id: clubAId, club_b_id: clubBId,
          });
          const validAnswers = ((vd ?? []) as any[]).map((p: any) => p.name);
          await updateDoc(doc(db, 'game_rooms', roomId), {
            ...base,
            'roundState.phase':       'result',
            'roundState.roundWinner': submitterUid,
            'roundState.correctAnswer': guess,
            'roundState.validAnswers': validAnswers,
            [`players.${submitterUid}.score`]: (room.players[submitterUid]?.score ?? 0) + 1,
          });
        } else {
          const updates: Record<string, unknown> = { ...base, 'roundState.phase': 'second_chance' };
          if (secondUid) {
            updates[`players.${secondUid}.hasSubmitted`] = false;
            updates[`players.${secondUid}.currentGuess`] = null;
          }
          await updateDoc(doc(db, 'game_rooms', roomId), updates as any);
        }
      } catch (err) {
        console.error('Error processing first guess:', err);
      } finally {
        processingRef.current = false;
      }
    })();
  }, [isHost, roomId, room, roundPhase]);

  // ── HOST: process second submission (second_chance → result) ─────────────
  useEffect(() => {
    if (!isHost || !roomId || !room) return;
    if (room.status !== 'guessing' || roundPhase !== 'second_chance') return;
    if (room.roundState?.secondSubmitter != null) return;
    if (processingRef.current) return;

    const firstSub = room.roundState?.firstSubmitter;
    if (!firstSub) return;
    const secondUid = Object.keys(room.players).find(k => k !== firstSub);
    if (!secondUid) return;

    const secondPlayer = room.players[secondUid];
    if (!secondPlayer.hasSubmitted) return;

    const guess   = secondPlayer.currentGuess;
    const clubAId = room.roundState?.clubA?.id;
    const clubBId = room.roundState?.clubB?.id;
    if (clubAId == null || clubBId == null) return;

    processingRef.current = true;
    (async () => {
      try {
        let isCorrect = false;
        if (guess) {
          const { data } = await supabase.rpc('validate_answer', {
            guess, club_a_id: clubAId, club_b_id: clubBId,
          });
          isCorrect = (data as any)?.valid ?? false;
        }

        const { data: vd } = await supabase.rpc('get_valid_players', {
          club_a_id: clubAId, club_b_id: clubBId,
        });
        const validAnswers = ((vd ?? []) as any[]).map((p: any) => p.name);

        const updates: Record<string, unknown> = {
          'roundState.phase':          'result',
          'roundState.secondSubmitter': secondUid,
          'roundState.secondGuess':    guess ?? null,
          'roundState.secondResult':   isCorrect ? 'correct' : (guess ? 'wrong' : 'timeout'),
          'roundState.validAnswers':   validAnswers,
          'roundState.roundWinner':    isCorrect ? secondUid : null,
          'roundState.correctAnswer':  isCorrect ? guess : null,
        };
        if (isCorrect) {
          updates[`players.${secondUid}.score`] = (room.players[secondUid]?.score ?? 0) + 1;
        }
        await updateDoc(doc(db, 'game_rooms', roomId), updates as any);
      } catch (err) {
        console.error('Error processing second guess:', err);
      } finally {
        processingRef.current = false;
      }
    })();
  }, [isHost, roomId, room, roundPhase]);

  // ── Countdown overlay ────────────────────────────────────────────────────
  useEffect(() => {
    if (room?.status === 'countdown') setShowCountdown(true);
    if (room?.status === 'guessing' && showCountdown) setShowCountdown(false);
  }, [room?.status]);

  // ── Timer management ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!room || room.status !== 'guessing' || showCountdown) {
      timer.stop();
      return;
    }
    if (roundPhase === 'guessing') {
      timer.restart(TIMER_SECONDS);
    } else if (roundPhase === 'second_chance') {
      const amISecond = room.roundState?.firstSubmitter !== uid;
      if (amISecond) { timer.restart(TIMER_SECONDS); }
      else timer.stop();
    } else {
      timer.stop();
    }
  }, [roundPhase, showCountdown, uid]);

  // ── Player actions ───────────────────────────────────────────────────────
  const handleReady = useCallback(() => {
    if (!roomId || !uid) return;
    setReady(roomId, uid, true);
  }, [roomId, uid, setReady]);

  const handleClubSelect = useCallback((club: { id: number; name: string }) => {
    if (!roomId || !uid) return;
    chooseClub(roomId, uid, club.id, club.name);
  }, [roomId, uid, chooseClub]);

  // Players write their guess to Firestore; host validates
  const handleGuess = useCallback(async (guess: string) => {
    if (!roomId || !uid || submittedRef.current) return;
    submittedRef.current = true;
    timer.stop();
    await updateDoc(doc(db, 'game_rooms', roomId), {
      [`players.${uid}.currentGuess`]: guess,
      [`players.${uid}.hasSubmitted`]: true,
    });
  }, [roomId, uid, timer]);

  const handleTimeout = useCallback(async () => {
    if (!roomId || !uid || submittedRef.current) return;
    submittedRef.current = true;
    await updateDoc(doc(db, 'game_rooms', roomId), {
      [`players.${uid}.currentGuess`]: null,
      [`players.${uid}.hasSubmitted`]: true,
    });
  }, [roomId, uid]);

  const handleSkip = useCallback(async () => {
    if (!roomId || !uid || submittedRef.current) return;
    submittedRef.current = true;
    timer.stop();
    await updateDoc(doc(db, 'game_rooms', roomId), {
      [`players.${uid}.currentGuess`]: null,
      [`players.${uid}.hasSubmitted`]: true,
    });
  }, [roomId, uid, timer]);

  // ── HOST: advance round or end game ─────────────────────────────────────
  const handleContinue = useCallback(async () => {
    if (!isHost || !roomId || !room) return;
    if (room.currentRound >= room.maxRounds) {
      await updateDoc(doc(db, 'game_rooms', roomId), { status: 'finished' });
      setDoc(doc(db, 'app_stats', 'global'), { gamesPlayed: increment(1) }, { merge: true }).catch(console.error);
    } else {
      const resets: Record<string, unknown> = {
        currentRound: room.currentRound + 1,
        status: 'choosing',
        'roundState.phase':          null,
        'roundState.firstSubmitter':  null,
        'roundState.firstGuess':      null,
        'roundState.firstResult':     null,
        'roundState.secondSubmitter': null,
        'roundState.secondGuess':     null,
        'roundState.secondResult':    null,
        'roundState.roundWinner':     null,
        'roundState.correctAnswer':   null,
        'roundState.validAnswers':    null,
      };
      Object.keys(room.players).forEach(pUid => {
        resets[`players.${pUid}.chosenClubId`]   = null;
        resets[`players.${pUid}.chosenClubName`] = null;
        resets[`players.${pUid}.hasSubmitted`]   = false;
        resets[`players.${pUid}.currentGuess`]   = null;
      });
      await updateDoc(doc(db, 'game_rooms', roomId), resets as any);
    }
  }, [isHost, roomId, room]);

  // ── Layout helper ────────────────────────────────────────────────────────
  // Hide back button in multiplayer once the game is underway (choosing or beyond)
  const showBack = !room || room.mode === 'single' || room.status === 'waiting';

  const page = (content: React.ReactNode) => (
    <div style={{ minHeight: '100vh', background: S.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1.5rem', animation: 'fadeIn 0.3s ease' }}>
      <div style={{ width: '100%', maxWidth: 500, marginBottom: 20, minHeight: 24 }}>
        {showBack && (
          <button onClick={() => navigate('/')}
            style={{ background: 'none', border: 'none', color: S.textDim, fontFamily: S.fontBody, fontSize: '0.9rem', cursor: 'pointer', padding: 0 }}
            onMouseEnter={e => (e.currentTarget.style.color = S.text)}
            onMouseLeave={e => (e.currentTarget.style.color = S.textDim)}
          >
            ← Back
          </button>
        )}
      </div>
      <div style={{ width: '100%', maxWidth: 500 }}>{content}</div>
    </div>
  );

  // ── Loading ──────────────────────────────────────────────────────────────
  if (roomLoading) return (
    <div style={{ minHeight: '100vh', background: S.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
      <Spinner />
      <p style={{ color: S.textDim, fontFamily: S.fontBody, fontSize: '0.9rem' }}>Loading game…</p>
    </div>
  );

  if (!room) return (
    <div style={{ minHeight: '100vh', background: S.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
      <p style={{ color: S.textDim, fontFamily: S.fontBody }}>Room not found</p>
      <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: S.accent, fontFamily: S.fontHead, fontSize: '1rem', cursor: 'pointer' }}>
        Back to Home
      </button>
    </div>
  );

  const playerKeys  = Object.keys(room.players);
  const myPlayer    = uid ? room.players[uid] : null;
  const opponentUid = playerKeys.find(k => k !== uid);
  const opponent    = opponentUid ? room.players[opponentUid] : null;
  const totalRounds = room.maxRounds;
  const isLastRound = room.currentRound >= totalRounds;

  // ── DISCONNECTED ─────────────────────────────────────────────────────────
  if (room.status === 'disconnected') {
    const disconnectedName = room.disconnectedPlayerName ?? 'A player';
    return page(
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, textAlign: 'center', paddingTop: '2rem' }}>
        <span style={{ fontSize: '3.5rem' }}>⚡</span>
        <h2 style={{ fontFamily: S.fontHead, fontSize: '2rem', color: S.text }}>Player Disconnected</h2>
        <p style={{ color: S.textDim, fontFamily: S.fontBody, lineHeight: 1.5 }}>
          <strong style={{ color: S.text }}>{disconnectedName}</strong> didn't choose a club in time.
        </p>
        <button
          onClick={() => navigate('/')}
          style={{ background: S.accent, color: '#000', fontFamily: S.fontHead, fontSize: '1rem', padding: '14px 40px', borderRadius: S.radius, border: 'none', cursor: 'pointer', boxShadow: `0 0 24px ${S.accentGlow}` }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          Return to Home
        </button>
      </div>
    );
  }

  // ── WAITING ──────────────────────────────────────────────────────────────
  if (room.status === 'waiting') {
    return page(
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28, textAlign: 'center' }}>
        <h2 style={{ fontFamily: S.fontHead, fontSize: '2rem', color: S.text }}>Waiting for players…</h2>
        {room.roomCode && <RoomCodeDisplay code={room.roomCode} />}
        <p style={{ color: S.textDim, fontFamily: S.fontBody, fontSize: '0.9rem' }}>
          {playerKeys.length} / 2 players joined
        </p>
        {myPlayer && !myPlayer.ready && playerKeys.length >= 2 && (
          <button onClick={handleReady}
            style={{ background: S.accent, color: '#000', fontFamily: S.fontHead, fontSize: '1.1rem', padding: '14px 48px', borderRadius: S.radius, border: 'none', cursor: 'pointer', boxShadow: `0 0 24px ${S.accentGlow}` }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Ready
          </button>
        )}
        {myPlayer?.ready && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <Spinner />
            <p style={{ color: S.accent, fontFamily: S.fontBody, fontSize: '0.9rem' }}>
              Waiting for opponent to ready up…
            </p>
          </div>
        )}
      </div>
    );
  }

  // ── CHOOSING ─────────────────────────────────────────────────────────────
  if (room.status === 'choosing') {
    if (myPlayer && !myPlayer.chosenClubId) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', maxWidth: 500, margin: '0 auto', padding: '1.5rem', gap: 16, background: S.bg, overflow: 'hidden' }}>
          <div>
            {showBack && (
              <button onClick={() => navigate('/')}
                style={{ background: 'none', border: 'none', color: S.textDim, fontFamily: S.fontBody, fontSize: '0.9rem', cursor: 'pointer', padding: 0, marginBottom: 16 }}
                onMouseEnter={e => (e.currentTarget.style.color = S.text)}
                onMouseLeave={e => (e.currentTarget.style.color = S.textDim)}
              >
                ← Back
              </button>
            )}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginTop: 8 }}>
              <div>
                <h1 style={{ fontFamily: S.fontHead, fontSize: '1.8rem', color: S.text }}>
                  Round {room.currentRound} — Pick your club
                </h1>
                <p style={{ color: S.textDim, fontFamily: S.fontBody, fontSize: '0.9rem', marginTop: 4 }}>
                  Choose a club you know well.
                </p>
              </div>
              {room.mode !== 'single' && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flexShrink: 0, marginLeft: 16 }}>
                  <CircularTimer secondsLeft={chooseTimer.secondsLeft} fraction={chooseTimer.fraction} totalSeconds={30} />
                  <span style={{ fontFamily: S.fontBody, fontSize: '0.72rem', color: S.textDim }}>to pick</span>
                </div>
              )}
            </div>
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <ClubSelector clubs={clubs} onSelect={handleClubSelect} onSearch={searchClubs} loading={clubsLoading} />
          </div>
        </div>
      );
    }
    return page(
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, textAlign: 'center', paddingTop: '3rem' }}>
        {room.mode !== 'single' && (
          <CircularTimer secondsLeft={chooseTimer.secondsLeft} fraction={chooseTimer.fraction} totalSeconds={30} />
        )}
        <Spinner />
        <p style={{ color: S.accent, fontFamily: S.fontHead, fontSize: '1.2rem' }}>
          You picked {myPlayer?.chosenClubName}
        </p>
        <p style={{ color: S.textDim, fontFamily: S.fontBody, fontSize: '0.9rem' }}>
          Waiting for opponent to choose…
        </p>
      </div>
    );
  }

  // ── COUNTDOWN ────────────────────────────────────────────────────────────
  if (room.status === 'countdown' && showCountdown && room.roundState?.clubA && room.roundState?.clubB) {
    return (
      <CountdownOverlay
        clubA={room.roundState.clubA}
        clubB={room.roundState.clubB}
        onComplete={() => setShowCountdown(false)}
      />
    );
  }

  // ── GUESSING (all sub-phases) ─────────────────────────────────────────────
  if (room.status === 'guessing') {
    const rs       = room.roundState;
    const clubA    = rs?.clubA ?? null;
    const clubB    = rs?.clubB ?? null;
    const firstSub = rs?.firstSubmitter ?? null;
    const amIFirst = firstSub === uid;

    // Compute display results inline to avoid one-render lag
    const displayResults = [...results];
    if (roundPhase === 'result' && displayResults.length === room.currentRound - 1) {
      displayResults.push(rs?.roundWinner === uid ? 'correct' : 'wrong');
    }

    // ── second_chance: I submitted first, waiting for opponent ─────────────
    if (roundPhase === 'second_chance' && amIFirst) {
      const opponentName = opponent?.displayName ?? 'Opponent';
      return page(
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          <RoundDots currentRound={room.currentRound} totalRounds={totalRounds} results={displayResults} />
          <ClubDisplay clubA={clubA} clubB={clubB} size="sm" />
          <div style={{
            width: '100%', padding: '24px 28px', borderRadius: S.radiusLg,
            textAlign: 'center', background: S.dangerBg, border: `1px solid ${S.danger}`,
            display: 'flex', flexDirection: 'column', gap: 8,
          }}>
            <span style={{ fontSize: '2rem' }}>✗</span>
            <span style={{ fontFamily: S.fontHead, fontSize: '1.5rem', color: S.danger }}>
              Wrong answer!
            </span>
            {rs?.firstGuess && (
              <span style={{ color: S.text, fontSize: '0.9rem', opacity: 0.8 }}>
                You guessed: "{rs.firstGuess}"
              </span>
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <Spinner />
            <p style={{ color: S.textDim, fontFamily: S.fontBody, fontSize: '0.95rem' }}>
              {opponentName} is guessing…
            </p>
          </div>
        </div>
      );
    }

    // ── second_chance: I'm the second player, my turn ──────────────────────
    if (roundPhase === 'second_chance' && !amIFirst && firstSub) {
      const firstSubmitterName = firstSub === opponentUid
        ? (opponent?.displayName ?? 'Opponent')
        : 'Player';
      return page(
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          <RoundDots currentRound={room.currentRound} totalRounds={totalRounds} results={displayResults} />
          <div style={{
            width: '100%', padding: '14px 20px', borderRadius: S.radius,
            background: S.dangerBg, border: `1px solid ${S.danger}`,
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <span style={{ color: S.danger, fontSize: '1.3rem', flexShrink: 0 }}>✗</span>
            <span style={{ color: S.text, fontFamily: S.fontBody, fontSize: '0.9rem' }}>
              {firstSubmitterName} answered{' '}
              {rs?.firstGuess ? `"${rs.firstGuess}"` : '(no answer)'} — Wrong! Your turn!
            </span>
          </div>
          <ClubDisplay clubA={clubA} clubB={clubB} />
          <CircularTimer secondsLeft={timer.secondsLeft} fraction={timer.fraction} totalSeconds={TIMER_SECONDS} />
          <GuessInput onSubmit={handleGuess} onSkip={handleSkip} />
        </div>
      );
    }

    // ── result phase ───────────────────────────────────────────────────────
    if (roundPhase === 'result') {
      const winner     = rs?.roundWinner;
      const iWon       = winner === uid;
      const noWinner   = winner === null || winner === undefined;
      const correctAns = rs?.correctAnswer;
      const validAns   = rs?.validAnswers ?? [];
      const winnerName = iWon ? 'You' : (opponent?.displayName ?? 'Opponent');

      return page(
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
          <RoundDots currentRound={room.currentRound} totalRounds={totalRounds} results={displayResults} />

          {/* Result card — green if anyone answered correctly, neutral if no winner */}
          <div style={{
            width: '100%', padding: '24px 28px', borderRadius: S.radiusLg, textAlign: 'center',
            background: noWinner ? S.surface : S.accentBg,
            border: `1px solid ${noWinner ? S.border : S.accent}`,
            display: 'flex', flexDirection: 'column', gap: 8,
          }}>
            <span style={{ fontSize: '2.5rem' }}>{noWinner ? '—' : '✓'}</span>
            <span style={{ fontFamily: S.fontHead, fontSize: '1.6rem', color: noWinner ? S.textDim : S.accent }}>
              {noWinner ? 'No correct answer!' : `${winnerName} answered correctly!`}
            </span>
            {correctAns && (
              <span style={{ color: S.text, fontSize: '0.9rem', opacity: 0.8 }}>
                "{correctAns}"
              </span>
            )}
          </div>

          {/* Scoreboard */}
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

          <ClubDisplay clubA={clubA} clubB={clubB} size="sm" />

          {/* Valid answers */}
          {validAns.length > 0 && (
            <div style={{ width: '100%', background: S.surface, border: `1px solid ${S.border}`, borderRadius: S.radiusLg, padding: 20 }}>
              <div style={{ fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: S.textDim, marginBottom: 12, fontFamily: S.fontBody }}>
                {validAns.length} valid answer{validAns.length !== 1 ? 's' : ''}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {validAns.map((name: string) => {
                  const isCorrectAnswer = name.toLowerCase() === correctAns?.toLowerCase();
                  return (
                    <span key={name} style={{
                      background: isCorrectAnswer ? S.accentBg2 : S.surface2,
                      border: `1px solid ${isCorrectAnswer ? S.accent : S.border}`,
                      color: isCorrectAnswer ? S.accent : S.text,
                      borderRadius: 8, padding: '5px 12px',
                      fontSize: '0.85rem', fontWeight: isCorrectAnswer ? 600 : 400,
                      fontFamily: S.fontBody,
                    }}>
                      {name}{isCorrectAnswer ? ' ✓' : ''}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {isHost ? (
            <button onClick={handleContinue}
              style={{
                background: S.accent, color: '#000', fontFamily: S.fontHead,
                fontSize: '1rem', padding: '14px 0', borderRadius: S.radius,
                border: 'none', cursor: 'pointer', width: '100%',
                boxShadow: `0 0 24px ${S.accentGlow}`,
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              {isLastRound ? 'View Results' : 'Next Round'}
            </button>
          ) : (
            <p style={{ textAlign: 'center', color: S.textDim, fontFamily: S.fontBody, fontSize: '0.85rem' }}>
              Waiting for host to start next round…
            </p>
          )}
        </div>
      );
    }

    // ── guessing phase: both players see clubs + timer + input ─────────────
    return page(
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
        <div style={{ fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: S.textDim }}>
          Round {room.currentRound} of {totalRounds}
        </div>
        <RoundDots currentRound={room.currentRound} totalRounds={totalRounds} results={displayResults} />
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
        <ClubDisplay clubA={clubA} clubB={clubB} />
        <CircularTimer secondsLeft={timer.secondsLeft} fraction={timer.fraction} totalSeconds={TIMER_SECONDS} />
        <GuessInput onSubmit={handleGuess} onSkip={handleSkip} />
      </div>
    );
  }

  // ── FINISHED ─────────────────────────────────────────────────────────────
  if (room.status === 'finished' && myPlayer) {
    const myScore  = myPlayer.score;
    const oppScore = opponent?.score ?? 0;
    const won  = myScore > oppScore;
    const drew = myScore === oppScore;
    return page(
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, textAlign: 'center' }}>
        <div style={{ fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: S.textDim }}>
          Game Over
        </div>
        <div>
          <span style={{ fontFamily: S.fontHead, fontSize: 'clamp(3.5rem, 12vw, 5rem)', color: S.accent, lineHeight: 1 }}>
            {myScore}
          </span>
          <span style={{ fontFamily: S.fontHead, fontSize: '1.5rem', color: S.textDim }}> – {oppScore}</span>
        </div>
        <p style={{ fontFamily: S.fontBody, color: S.textDim, fontSize: '1rem' }}>
          {won ? '🏆 You win!' : drew ? "It's a draw!" : 'You lost!'}
        </p>
        <button onClick={() => navigate('/')}
          style={{ background: S.accent, color: '#000', fontFamily: S.fontHead, fontSize: '1.1rem', padding: '15px 0', borderRadius: S.radius, border: 'none', cursor: 'pointer', width: '100%', boxShadow: `0 0 24px ${S.accentGlow}` }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          Back to Home
        </button>
      </div>
    );
  }

  // Transitional states — show spinner
  return (
    <div style={{ minHeight: '100vh', background: S.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
      <Spinner />
      <p style={{ color: S.textDim, fontFamily: S.fontBody, fontSize: '0.9rem' }}>Starting game…</p>
    </div>
  );
}
