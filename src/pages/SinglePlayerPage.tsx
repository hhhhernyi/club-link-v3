import { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClubSearch } from '../hooks/useClubSearch';
import { useTimer } from '../hooks/useTimer';
import { useGameActions } from '../hooks/useGameActions';
import { getCrestUrl } from '../utils/crestUrl';
import type { ClubInfo } from '../types/game';

// ── V1 design tokens (CSS-variable-backed for theme support) ─────────────────
const S = {
  bg:             'var(--bg)',
  surface:        'var(--surface)',
  surface2:       'var(--surface2)',
  border:         'var(--border)',
  accent:         'var(--accent)',
  danger:         'var(--danger)',
  warning:        'var(--warning)',
  text:           'var(--text)',
  textDim:        'var(--text-dim)',
  accentBg:       'var(--accent-bg)',
  accentBg2:      'var(--accent-bg2)',
  accentBorder:   'var(--accent-border)',
  accentGlow:     'var(--accent-glow)',
  dangerBg:       'var(--danger-bg)',
  fontHead:       "'Dela Gothic One', system-ui, sans-serif",
  fontBody:       "'DM Sans', system-ui, sans-serif",
  radius:         '12px',
  radiusLg:       '20px',
  transition:     '200ms cubic-bezier(0.4, 0, 0.2, 1)',
};

// ── Shared sub-components ────────────────────────────────────────────────────

function ClubBadge({ club, size = 'md' }: { club: ClubInfo | null; size?: 'sm' | 'md' | 'lg' }) {
  const dim = size === 'sm' ? 36 : size === 'lg' ? 64 : 52;
  const [imgError, setImgError] = useState(false);
  const logoSrc = club ? getCrestUrl(club.name, club.logo_url) : null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <div style={{ width: dim, height: dim, borderRadius: '50%', background: S.surface, border: `1px solid ${S.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
        {logoSrc && !imgError
          ? <img src={logoSrc} style={{ width: dim * 0.72, height: dim * 0.72, objectFit: 'contain' }} alt={club!.name} onError={() => setImgError(true)} />
          : <span style={{ fontSize: dim * 0.4 }}>⚽</span>}
      </div>
      <span style={{ fontWeight: 600, fontSize: size === 'sm' ? '0.8rem' : '0.9rem', color: S.text, textAlign: 'center', maxWidth: dim * 2.2 }}>
        {club?.name ?? '???'}
      </span>
    </div>
  );
}

function RoundDots({ currentRound, totalRounds, results }: { currentRound: number; totalRounds: number; results: (string | null)[] }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {Array.from({ length: totalRounds }, (_, i) => {
        const r = results[i];
        const isCurrent = i + 1 === currentRound && !r;
        const bg = r === 'correct' ? S.accent : (r === 'wrong' || r === 'timeout' || r === 'skipped') ? S.danger : isCurrent ? S.accent : S.border;
        return <div key={i} style={{ width: isCurrent ? 24 : 12, height: 12, borderRadius: 6, background: bg, transition: 'all 0.3s' }} />;
      })}
    </div>
  );
}

function TimerRing({ timeLeft, total }: { timeLeft: number; total: number }) {
  const r = 40;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - timeLeft / total);
  const warn = timeLeft <= 3;
  return (
    <div style={{ position: 'relative', width: 100, height: 100 }}>
      <svg style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={r} fill="none" stroke={S.border} strokeWidth="5" />
        <circle cx="50" cy="50" r={r} fill="none" stroke={warn ? S.danger : S.accent} strokeWidth="5"
          strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.25s linear, stroke 0.3s' }} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: S.fontHead, fontSize: '1.8rem', color: warn ? S.danger : S.text }}>
          {Math.ceil(timeLeft)}
        </span>
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

type Phase = 'choosing' | 'countdown' | 'guessing' | 'result' | 'gameover';
type ResultType = 'correct' | 'wrong' | 'timeout' | 'skipped';

interface RoundHistory {
  clubA: ClubInfo;
  clubB: ClubInfo;
  result: ResultType;
  guess: string | null;
}

const TOTAL_ROUNDS = 5;
const TIMER_SECONDS = 10;

export default function SinglePlayerPage() {
  const navigate = useNavigate();
  const { clubs, loading: clubsLoading, searchClubs, getAllClubs, getCompatibleClub } = useClubSearch();
  const { getValidPlayers } = useGameActions();

  const [phase, setPhase]           = useState<Phase>('choosing');
  const [currentRound, setCurrentRound] = useState(1);
  const [score, setScore]           = useState(0);
  const [clubA, setClubA]           = useState<ClubInfo | null>(null);
  const [clubB, setClubB]           = useState<ClubInfo | null>(null);
  const [roundResult, setRoundResult] = useState<ResultType | null>(null);
  const [lastGuess, setLastGuess]   = useState<string | null>(null);
  const [validAnswers, setValidAnswers] = useState<string[]>([]);
  const [history, setHistory]       = useState<RoundHistory[]>([]);
  const [results, setResults]       = useState<(ResultType | null)[]>(Array(TOTAL_ROUNDS).fill(null));

  const [logosReady, setLogosReady] = useState(false);

  const timer = useTimer({ duration: TIMER_SECONDS, onComplete: () => handleTimeout() });

  useEffect(() => { getAllClubs(); }, [getAllClubs]);

  // Preload all club logos so the list only appears once every image has
  // either loaded or failed — no layout jumps with missing crests.
  useEffect(() => {
    if (clubs.length === 0) { setLogosReady(false); return; }
    const sources = clubs
      .map(c => getCrestUrl(c.name, c.logo_url))
      .filter((s): s is string => !!s);
    if (sources.length === 0) { setLogosReady(true); return; }
    setLogosReady(false);
    let remaining = sources.length;
    sources.forEach(src => {
      const img = new Image();
      img.onload = img.onerror = () => { if (--remaining === 0) setLogosReady(true); };
      img.src = src;
    });
  }, [clubs]);

  const handleClubSelect = useCallback(async (club: { id: number; name: string; logo_url: string | null }) => {
    setClubA({ id: club.id, name: club.name, logo_url: club.logo_url });
    const compatible = await getCompatibleClub(club.id);
    if (compatible) setClubB({ id: compatible.id, name: compatible.name, logo_url: compatible.logo_url });
    setPhase('countdown');
  }, [getCompatibleClub]);

  const handleCountdownComplete = useCallback(() => {
    setPhase('guessing');
    timer.reset(TIMER_SECONDS);
    timer.start();
  }, [timer]);

  const handleGuess = useCallback(async (guess: string) => {
    if (!clubA || !clubB) return;
    timer.stop();
    setLastGuess(guess);
    let result: ResultType = 'wrong';
    let players: { id: number; name: string }[] = [];
    try {
      const { data, error } = await (await import('../config/supabase')).supabase.rpc('validate_answer', {
        guess, club_a_id: clubA.id, club_b_id: clubB.id,
      });
      if (!error && (data?.valid ?? false)) {
        result = 'correct';
        setScore(s => s + 1);
      }
    } catch (err) { console.error('validate_answer error:', err); }
    try {
      players = await getValidPlayers(clubA.id, clubB.id);
    } catch (err) { console.error('getValidPlayers error:', err); }
    setValidAnswers(players.map(p => p.name));
    setRoundResult(result);
    setResults(prev => { const n = [...prev]; n[currentRound - 1] = result; return n; });
    setHistory(prev => [...prev, { clubA, clubB, result, guess }]);
    setPhase('result');
  }, [clubA, clubB, timer, currentRound, getValidPlayers]);

  const handleSkip = useCallback(async () => {
    if (!clubA || !clubB) return;
    timer.stop();
    let players: { id: number; name: string }[] = [];
    try { players = await getValidPlayers(clubA.id, clubB.id); } catch (err) { console.error(err); }
    setValidAnswers(players.map(p => p.name));
    setLastGuess(null);
    setRoundResult('skipped');
    setResults(prev => { const n = [...prev]; n[currentRound - 1] = 'skipped'; return n; });
    setHistory(prev => [...prev, { clubA, clubB, result: 'skipped', guess: null }]);
    setPhase('result');
  }, [clubA, clubB, timer, currentRound, getValidPlayers]);

  const handleTimeout = useCallback(async () => {
    if (!clubA || !clubB) return;
    let players: { id: number; name: string }[] = [];
    try { players = await getValidPlayers(clubA.id, clubB.id); } catch (err) { console.error(err); }
    setValidAnswers(players.map(p => p.name));
    setLastGuess(null);
    setRoundResult('timeout');
    setResults(prev => { const n = [...prev]; n[currentRound - 1] = 'timeout'; return n; });
    setHistory(prev => [...prev, { clubA, clubB, result: 'timeout', guess: null }]);
    setPhase('result');
  }, [clubA, clubB, currentRound, getValidPlayers]);

  const handleNextRound = useCallback(() => {
    if (currentRound >= TOTAL_ROUNDS) {
      const gp = parseInt(localStorage.getItem('cl_games') || '0') + 1;
      localStorage.setItem('cl_games', gp.toString());
      setPhase('gameover');
      return;
    }
    setCurrentRound(r => r + 1);
    setClubA(null); setClubB(null);
    setRoundResult(null); setLastGuess(null); setValidAnswers([]);
    setPhase('choosing');
    getAllClubs();
  }, [currentRound, getAllClubs]);

  const handlePlayAgain = useCallback(() => {
    setCurrentRound(1); setScore(0);
    setClubA(null); setClubB(null);
    setRoundResult(null); setLastGuess(null); setValidAnswers([]);
    setHistory([]); setResults(Array(TOTAL_ROUNDS).fill(null));
    setPhase('choosing');
    getAllClubs();
  }, [getAllClubs]);

  // ── CHOOSING (PickClubScreen) ───────────────────────────────────────────
  if (phase === 'choosing') {
    return (
      // height: 100vh so the list can scroll within the fixed container
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100%', maxWidth: 480, margin: '0 auto', padding: '2rem 1.5rem 1.5rem', gap: 16, animation: 'fadeIn 0.3s ease forwards', background: S.bg, overflow: 'hidden' }}>
        {/* Header — does not scroll */}
        <div>
          <button style={{ background: 'transparent', color: S.textDim, fontSize: '0.85rem', padding: '6px 0', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 12 }}
            onClick={() => navigate('/')}>← Back</button>
          <h2 style={{ fontFamily: S.fontHead, fontSize: '1.8rem', letterSpacing: '-0.01em', color: S.text }}>
            Round {currentRound} — Pick your club
          </h2>
          <p style={{ fontSize: '0.9rem', color: S.textDim, marginTop: 4 }}>Choose a club you know well.</p>
        </div>

        {/* Search — does not scroll */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: S.textDim, fontSize: '1rem', pointerEvents: 'none' }}>🔍</span>
          <input
            type="text"
            placeholder="Search clubs..."
            autoFocus
            onChange={e => searchClubs(e.target.value)}
            style={{ width: '100%', background: S.surface, border: `1px solid ${S.border}`, borderRadius: S.radius, color: S.text, fontSize: '0.95rem', padding: '12px 12px 12px 42px', transition: 'border-color 0.2s', outline: 'none', fontFamily: S.fontBody }}
            onFocus={e => e.target.style.borderColor = S.accent}
            onBlur={e => e.target.style.borderColor = S.border}
          />
        </div>

        {/* Club list — scrolls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, overflowY: 'auto', flex: 1 }}>
          {/* Spinner while DB fetch OR logo preload is in progress */}
          {(clubsLoading || (clubs.length > 0 && !logosReady)) && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, padding: '4rem 0' }}>
              <svg viewBox="0 0 48 48" style={{ width: 48, height: 48 }}>
                <circle cx="24" cy="24" r="20" fill="none" stroke={S.border} strokeWidth="3" />
                <circle cx="24" cy="24" r="20" fill="none" stroke={S.accent} strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 20 * 0.25} ${2 * Math.PI * 20 * 0.75}`}
                  style={{ transformOrigin: '24px 24px', animation: 'spin 1s linear infinite' }} />
              </svg>
              <span style={{ color: S.textDim, fontSize: '0.9rem', fontFamily: S.fontBody }}>
                {clubsLoading ? 'Fetching clubs…' : 'Loading logos…'}
              </span>
            </div>
          )}
          {!clubsLoading && logosReady && clubs.length === 0 && (
            <div style={{ textAlign: 'center', color: S.textDim, padding: '3rem 0', fontSize: '0.9rem' }}>No clubs found</div>
          )}
          {!clubsLoading && logosReady && clubs.map(club => {
            const logoSrc = getCrestUrl(club.name, club.logo_url);
            return (
              <button key={club.id}
                style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 14px', borderRadius: S.radius, background: S.surface, border: `1px solid ${S.border}`, cursor: 'pointer', transition: S.transition, textAlign: 'left', width: '100%' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = S.accent; e.currentTarget.style.background = S.surface2; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = S.border; e.currentTarget.style.background = S.surface; }}
                onClick={() => handleClubSelect(club)}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: S.surface2, border: `1px solid ${S.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
                  {logoSrc
                    ? <img src={logoSrc} style={{ width: 26, height: 26, objectFit: 'contain' }} alt={club.name} onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                    : <span style={{ fontSize: '0.85rem' }}>⚽</span>}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, minWidth: 0 }}>
                  <span style={{ fontWeight: 600, fontSize: '0.9rem', color: S.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontFamily: S.fontBody }}>{club.name}</span>
                  <span style={{ fontSize: '0.75rem', color: S.textDim, fontFamily: S.fontBody }}>{club.country} · {club.league}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ── COUNTDOWN (CountdownScreen) ─────────────────────────────────────────
  if (phase === 'countdown') {
    return <CountdownPhase clubA={clubA} clubB={clubB} onDone={handleCountdownComplete} />;
  }

  // ── GUESSING (GuessScreen) ──────────────────────────────────────────────
  if (phase === 'guessing') {
    return (
      <GuessingPhase
        clubA={clubA} clubB={clubB}
        currentRound={currentRound} totalRounds={TOTAL_ROUNDS}
        results={results} timer={timer}
        onGuess={handleGuess} onSkip={handleSkip}
      />
    );
  }

  // ── RESULT (ResultScreen) ───────────────────────────────────────────────
  if (phase === 'result' && roundResult) {
    return (
      <ResultPhase
        clubA={clubA} clubB={clubB}
        currentRound={currentRound} totalRounds={TOTAL_ROUNDS}
        results={results} roundResult={roundResult}
        lastGuess={lastGuess} validAnswers={validAnswers}
        onNext={handleNextRound}
      />
    );
  }

  // ── GAME OVER (GameOverScreen) ──────────────────────────────────────────
  if (phase === 'gameover') {
    return (
      <GameOverPhase
        score={score} history={history}
        onPlayAgain={handlePlayAgain}
        onMenu={() => navigate('/')}
      />
    );
  }

  return null;
}

// ── Sub-phase components ─────────────────────────────────────────────────────

function CountdownPhase({ clubA, clubB, onDone }: { clubA: ClubInfo | null; clubB: ClubInfo | null; onDone: () => void }) {
  const [n, setN] = useState(3);
  useEffect(() => {
    if (n <= 0) { onDone(); return; }
    const t = setTimeout(() => setN(prev => prev - 1), 800);
    return () => clearTimeout(t);
  }, [n, onDone]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', gap: 32, padding: '2rem', background: S.bg }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
        <ClubBadge club={clubA} size="lg" />
        <span style={{ fontFamily: S.fontHead, fontSize: '1.2rem', color: S.textDim }}>VS</span>
        <ClubBadge club={clubB} size="lg" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <div style={{ fontFamily: S.fontHead, fontSize: '6rem', color: S.accent, lineHeight: 1 }}>{n > 0 ? n : ''}</div>
        <span style={{ fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: S.textDim }}>Get ready…</span>
      </div>
    </div>
  );
}

function GuessingPhase({ clubA, clubB, currentRound, totalRounds, results, timer, onGuess, onSkip }: {
  clubA: ClubInfo | null; clubB: ClubInfo | null;
  currentRound: number; totalRounds: number;
  results: (string | null)[];
  timer: ReturnType<typeof import('../hooks/useTimer').useTimer>;
  onGuess: (g: string) => void; onSkip: () => void;
}) {
  const [guess, setGuess] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => { inputRef.current?.focus(); }, []);

  const submit = () => {
    if (!guess.trim()) return;
    onGuess(guess.trim());
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', padding: '2rem 1.5rem', gap: 24, maxWidth: 500, margin: '0 auto', width: '100%', animation: 'fadeIn 0.3s ease forwards', background: S.bg }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, width: '100%' }}>
        <div style={{ fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: S.textDim }}>
          Round {currentRound} of {totalRounds}
        </div>
        <RoundDots currentRound={currentRound} totalRounds={totalRounds} results={results} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, flexWrap: 'wrap' }}>
          <ClubBadge club={clubA} size="md" />
          <span style={{ fontFamily: S.fontHead, fontSize: '1rem', color: S.textDim }}>↔</span>
          <ClubBadge club={clubB} size="md" />
        </div>
      </div>

      <TimerRing timeLeft={timer.secondsLeft} total={TIMER_SECONDS} />

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, width: '100%' }}>
        <p style={{ fontSize: '0.95rem', color: S.textDim, textAlign: 'center' }}>
          Name a player who played for both clubs
        </p>
        <div style={{ display: 'flex', gap: 10, width: '100%' }}>
          <input ref={inputRef}
            style={{ flex: 1, background: S.surface, border: `2px solid ${S.border}`, borderRadius: S.radius, color: S.text, fontSize: '1rem', padding: '14px 16px', transition: 'border-color 0.2s', outline: 'none', fontFamily: S.fontBody }}
            type="text" placeholder="Player name…" value={guess}
            onChange={e => setGuess(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && submit()}
            onFocus={e => e.target.style.borderColor = S.accent}
            onBlur={e => e.target.style.borderColor = S.border}
          />
          <button onClick={submit}
            style={{ background: S.accent, color: '#000', fontFamily: S.fontBody, fontWeight: 700, fontSize: '0.9rem', padding: '14px 20px', borderRadius: S.radius, flexShrink: 0, border: 'none', cursor: 'pointer' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}>GO</button>
        </div>
        <button onClick={onSkip}
          style={{ background: 'transparent', border: `1px solid ${S.border}`, color: S.textDim, fontSize: '0.85rem', padding: '8px 20px', borderRadius: S.radius, cursor: 'pointer' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = S.textDim; e.currentTarget.style.color = S.text; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = S.border; e.currentTarget.style.color = S.textDim; }}>Skip</button>
      </div>
    </div>
  );
}

function ResultPhase({ clubA, clubB, currentRound, totalRounds, results, roundResult, lastGuess, validAnswers, onNext }: {
  clubA: ClubInfo | null; clubB: ClubInfo | null;
  currentRound: number; totalRounds: number;
  results: (string | null)[];
  roundResult: string; lastGuess: string | null;
  validAnswers: string[]; onNext: () => void;
}) {
  const correct = roundResult === 'correct';
  const label = roundResult === 'correct' ? 'Correct!' : roundResult === 'timeout' ? "Time's up!" : roundResult === 'skipped' ? 'Skipped' : 'Wrong answer!';
  const sub = correct && lastGuess ? `${lastGuess} played for both clubs`
            : !correct && lastGuess ? `You guessed: "${lastGuess}"` : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', padding: '2rem 1.5rem', gap: 24, maxWidth: 500, margin: '0 auto', width: '100%', animation: 'fadeIn 0.25s ease forwards', background: S.bg }}>
      <RoundDots currentRound={currentRound} totalRounds={totalRounds} results={results} />

      {/* Result card */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '24px 32px', borderRadius: S.radiusLg, width: '100%', textAlign: 'center', background: correct ? S.accentBg : S.dangerBg, border: `1px solid ${correct ? S.accent : S.danger}` }}>
        <span style={{ fontSize: '2.5rem' }}>{correct ? '✓' : '✗'}</span>
        <span style={{ fontFamily: S.fontHead, fontSize: '1.8rem', color: correct ? S.accent : S.danger }}>{label}</span>
        {sub && <span style={{ fontSize: '0.9rem', opacity: 0.8, color: S.text }}>{sub}</span>}
      </div>

      {/* Clubs */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
        <ClubBadge club={clubA} size="sm" />
        <span style={{ fontFamily: S.fontHead, fontSize: '0.9rem', color: S.textDim }}>↔</span>
        <ClubBadge club={clubB} size="sm" />
      </div>

      {/* Valid answers — always shown for non-correct results */}
      {(!correct || validAnswers.length > 0) && (
        <div style={{ background: S.surface, border: `1px solid ${S.border}`, borderRadius: S.radiusLg, padding: '20px', width: '100%' }}>
          <div style={{ fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: S.textDim, marginBottom: 12 }}>
            {validAnswers.length > 0
              ? `${validAnswers.length} valid answer${validAnswers.length !== 1 ? 's' : ''}`
              : 'Valid answers'}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {validAnswers.length > 0 ? validAnswers.map(name => {
              const isGuessed = correct && name.toLowerCase() === lastGuess?.toLowerCase();
              return (
                <span key={name} style={{ background: isGuessed ? S.accentBg2 : S.surface2, border: `1px solid ${isGuessed ? S.accent : S.border}`, color: isGuessed ? S.accent : S.text, borderRadius: 8, padding: '5px 12px', fontSize: '0.85rem', fontWeight: isGuessed ? 600 : 400, fontFamily: S.fontBody }}>
                  {name}{isGuessed ? ' ✓' : ''}
                </span>
              );
            }) : (
              <span style={{ fontSize: '0.85rem', color: S.textDim, fontFamily: S.fontBody }}>No answers found</span>
            )}
          </div>
        </div>
      )}

      <button onClick={onNext}
        style={{ background: S.accent, color: '#000', fontFamily: S.fontHead, fontSize: '1rem', padding: '15px 48px', borderRadius: S.radius, marginTop: 'auto', boxShadow: `0 0 24px ${S.accentGlow}`, border: 'none', cursor: 'pointer' }}
        onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
        onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
        {currentRound >= totalRounds ? 'SEE RESULTS' : 'NEXT ROUND'}
      </button>
    </div>
  );
}

function GameOverPhase({ score, history, onPlayAgain, onMenu }: {
  score: number; history: RoundHistory[];
  onPlayAgain: () => void; onMenu: () => void;
}) {
  const verdicts = [
    { min: 5, text: 'Perfect game! 🔥', color: S.accent },
    { min: 4, text: 'Almost perfect!',  color: S.accent },
    { min: 3, text: 'Not bad!',         color: S.warning },
    { min: 2, text: 'Room to improve.', color: S.warning },
    { min: 0, text: 'Better luck next time.', color: S.danger },
  ];
  const verdict = verdicts.find(v => score >= v.min)!;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', padding: '2rem 1.5rem', gap: 28, maxWidth: 500, margin: '0 auto', width: '100%', animation: 'fadeIn 0.4s ease forwards', background: S.bg }}>
      {/* Score */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, textAlign: 'center' }}>
        <div style={{ fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: S.textDim }}>Final score</div>
        <div>
          <span style={{ fontFamily: S.fontHead, fontSize: 'clamp(4rem,12vw,6rem)', lineHeight: 1, color: verdict.color }}>{score}</span>
          <span style={{ fontFamily: S.fontHead, fontSize: '1.5rem', color: S.textDim }}> / {TOTAL_ROUNDS}</span>
        </div>
        <div style={{ fontSize: '1.1rem', color: verdict.color }}>{verdict.text}</div>
      </div>

      {/* Round history */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
        {history.map((h, i) => {
          const logoA = getCrestUrl(h.clubA.name, h.clubA.logo_url);
          const logoB = getCrestUrl(h.clubB.name, h.clubB.logo_url);
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: S.radius, border: `1px solid ${h.result === 'correct' ? S.accentBorder : S.border}`, background: S.surface }}>
              <span style={{ fontWeight: 700, fontSize: '0.8rem', color: S.textDim, minWidth: 16 }}>{i + 1}</span>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: S.surface2, border: `1px solid ${S.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
                {logoA ? <img src={logoA} style={{ width: 20, height: 20, objectFit: 'contain' }} alt="" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} /> : <span style={{ fontSize: '0.7rem' }}>⚽</span>}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1, minWidth: 0 }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: S.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontFamily: S.fontBody }}>{h.clubA.name}</span>
                <span style={{ fontSize: '0.75rem', color: S.textDim, flexShrink: 0 }}>↔</span>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: S.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontFamily: S.fontBody }}>{h.clubB.name}</span>
              </div>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: S.surface2, border: `1px solid ${S.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
                {logoB ? <img src={logoB} style={{ width: 20, height: 20, objectFit: 'contain' }} alt="" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} /> : <span style={{ fontSize: '0.7rem' }}>⚽</span>}
              </div>
              <span style={{ fontSize: '0.8rem', color: h.result === 'correct' ? S.accent : S.textDim, maxWidth: 90, textAlign: 'right', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontFamily: S.fontBody }}>
                {h.result === 'correct' ? (h.guess ?? '') : h.result === 'timeout' ? 'Timed out' : h.result === 'skipped' ? 'Skipped' : `✗ ${h.guess ?? ''}`}
              </span>
              <span style={{ fontSize: '1rem', flexShrink: 0 }}>{h.result === 'correct' ? '✓' : '✗'}</span>
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', marginTop: 'auto' }}>
        <button onClick={onPlayAgain}
          style={{ background: S.accent, color: '#000', fontFamily: S.fontHead, fontSize: '1.1rem', padding: 16, borderRadius: S.radius, width: '100%', border: 'none', cursor: 'pointer', boxShadow: `0 0 24px ${S.accentGlow}` }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}>PLAY AGAIN</button>
        <button onClick={onMenu}
          style={{ background: 'transparent', border: `1px solid ${S.border}`, color: S.textDim, fontFamily: S.fontBody, fontWeight: 600, fontSize: '0.9rem', padding: 13, borderRadius: S.radius, width: '100%', cursor: 'pointer' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = S.textDim; e.currentTarget.style.color = S.text; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = S.border; e.currentTarget.style.color = S.textDim; }}>Main menu</button>
      </div>
    </div>
  );
}
