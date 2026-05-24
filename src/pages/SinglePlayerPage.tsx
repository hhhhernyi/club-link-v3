import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClubSearch } from '../hooks/useClubSearch';
import { useTimer } from '../hooks/useTimer';
import { useGameActions } from '../hooks/useGameActions';
import ClubSelector from '../components/ClubSelector';
import ClubDisplay from '../components/ClubDisplay';
import CircularTimer from '../components/CircularTimer';
import CountdownOverlay from '../components/CountdownOverlay';
import GuessInput from '../components/GuessInput';
import RoundResult from '../components/RoundResult';
import RoundDots from '../components/RoundDots';
import type { ClubInfo } from '../types/game';

type Phase = 'choosing' | 'countdown' | 'guessing' | 'result' | 'gameover';
type RoundResultType = 'correct' | 'wrong' | 'timeout' | 'skipped';

interface RoundHistory {
  clubA: ClubInfo;
  clubB: ClubInfo;
  result: RoundResultType;
  guess: string | null;
  answer: string | null;
}

const TOTAL_ROUNDS = 5;
const TIMER_SECONDS = 10;

export default function SinglePlayerPage() {
  const navigate = useNavigate();
  const { clubs, loading: clubsLoading, searchClubs, getAllClubs, getRandomClub } = useClubSearch();
  const { getValidPlayers } = useGameActions();

  const [phase, setPhase] = useState<Phase>('choosing');
  const [currentRound, setCurrentRound] = useState(1);
  const [score, setScore] = useState(0);
  const [clubA, setClubA] = useState<ClubInfo | null>(null);
  const [clubB, setClubB] = useState<ClubInfo | null>(null);
  const [roundResult, setRoundResult] = useState<RoundResultType | null>(null);
  const [lastGuess, setLastGuess] = useState<string | null>(null);
  const [validAnswers, setValidAnswers] = useState<string[]>([]);
  const [history, setHistory] = useState<RoundHistory[]>([]);
  const [results, setResults] = useState<(RoundResultType | null)[]>(
    Array(TOTAL_ROUNDS).fill(null)
  );

  const timer = useTimer({ duration: TIMER_SECONDS, onComplete: () => handleTimeout() });

  useEffect(() => { getAllClubs(); }, [getAllClubs]);

  const handleClubSelect = useCallback(async (club: { id: number; name: string; logo_url: string | null }) => {
    setClubA({ id: club.id, name: club.name, logo_url: club.logo_url });
    const randomClub = await getRandomClub();
    if (randomClub) setClubB({ id: randomClub.id, name: randomClub.name, logo_url: randomClub.logo_url });
    setPhase('countdown');
  }, [getRandomClub]);

  const handleCountdownComplete = useCallback(() => {
    setPhase('guessing');
    timer.reset(TIMER_SECONDS);
    timer.start();
  }, [timer]);

  const handleGuess = useCallback(async (guess: string) => {
    if (!clubA || !clubB) return;
    timer.stop();
    setLastGuess(guess);
    try {
      const { data, error } = await (await import('../config/supabase')).supabase.rpc('validate_answer', {
        guess, club_a_id: clubA.id, club_b_id: clubB.id,
      });
      if (error) throw error;
      const isValid = data?.valid ?? false;
      const result: RoundResultType = isValid ? 'correct' : 'wrong';
      if (isValid) setScore((s) => s + 1);
      const players = await getValidPlayers(clubA.id, clubB.id);
      setValidAnswers(players.map((p) => p.name));
      setRoundResult(result);
      setResults((prev) => { const next = [...prev]; next[currentRound - 1] = result; return next; });
      setHistory((prev) => [...prev, { clubA, clubB, result, guess, answer: data?.player_name || null }]);
      setPhase('result');
    } catch (err) { console.error('Guess error:', err); }
  }, [clubA, clubB, timer, currentRound, getValidPlayers]);

  const handleSkip = useCallback(async () => {
    if (!clubA || !clubB) return;
    timer.stop();
    setLastGuess(null);
    const players = await getValidPlayers(clubA.id, clubB.id);
    setValidAnswers(players.map((p) => p.name));
    setRoundResult('skipped');
    setResults((prev) => { const next = [...prev]; next[currentRound - 1] = 'skipped'; return next; });
    setHistory((prev) => [...prev, { clubA, clubB, result: 'skipped', guess: null, answer: null }]);
    setPhase('result');
  }, [clubA, clubB, timer, currentRound, getValidPlayers]);

  const handleTimeout = useCallback(async () => {
    if (!clubA || !clubB) return;
    const players = await getValidPlayers(clubA.id, clubB.id);
    setValidAnswers(players.map((p) => p.name));
    setRoundResult('timeout');
    setLastGuess(null);
    setResults((prev) => { const next = [...prev]; next[currentRound - 1] = 'timeout'; return next; });
    setHistory((prev) => [...prev, { clubA, clubB, result: 'timeout', guess: null, answer: null }]);
    setPhase('result');
  }, [clubA, clubB, currentRound, getValidPlayers]);

  const handleNextRound = useCallback(() => {
    if (currentRound >= TOTAL_ROUNDS) {
      const gp = parseInt(localStorage.getItem('cl_games') || '0') + 1;
      localStorage.setItem('cl_games', gp.toString());
      setPhase('gameover');
      return;
    }
    setCurrentRound((r) => r + 1);
    setClubA(null); setClubB(null); setRoundResult(null);
    setLastGuess(null); setValidAnswers([]);
    setPhase('choosing');
    getAllClubs();
  }, [currentRound, getAllClubs]);

  const handlePlayAgain = useCallback(() => {
    setCurrentRound(1); setScore(0);
    setClubA(null); setClubB(null); setRoundResult(null);
    setLastGuess(null); setValidAnswers([]); setHistory([]);
    setResults(Array(TOTAL_ROUNDS).fill(null));
    setPhase('choosing');
    getAllClubs();
  }, [getAllClubs]);

  return (
    <div className="min-h-screen bg-pitch px-4 py-6">
      <button
        onClick={() => navigate('/')}
        className="text-ink-dim hover:text-ink text-sm font-body transition-colors mb-6 block"
      >
        ← Back
      </button>

      {/* CHOOSING */}
      {phase === 'choosing' && (
        <div className="max-w-lg mx-auto animate-fade-in">
          <h1 className="font-display font-black text-3xl text-ink mb-2">
            Round {currentRound} – Pick your club
          </h1>
          <p className="text-ink-dim font-body mb-6">Choose a club you know well.</p>
          <ClubSelector
            clubs={clubs}
            onSelect={handleClubSelect}
            onSearch={searchClubs}
            loading={clubsLoading}
          />
        </div>
      )}

      {/* COUNTDOWN */}
      {phase === 'countdown' && (
        <CountdownOverlay clubA={clubA} clubB={clubB} onComplete={handleCountdownComplete} />
      )}

      {/* GUESSING */}
      {phase === 'guessing' && (
        <div className="max-w-lg mx-auto flex flex-col items-center gap-6 animate-fade-in">
          <div className="text-ink-dim text-sm font-display uppercase tracking-wider">
            Round {currentRound} of {TOTAL_ROUNDS}
          </div>
          <RoundDots currentRound={currentRound} totalRounds={TOTAL_ROUNDS} results={results} />
          <ClubDisplay clubA={clubA} clubB={clubB} />
          <CircularTimer secondsLeft={timer.secondsLeft} fraction={timer.fraction} totalSeconds={TIMER_SECONDS} />
          <GuessInput onSubmit={handleGuess} onSkip={handleSkip} />
        </div>
      )}

      {/* RESULT */}
      {phase === 'result' && roundResult && (
        <div className="max-w-lg mx-auto animate-fade-in">
          <div className="mb-6">
            <RoundDots currentRound={currentRound} totalRounds={TOTAL_ROUNDS} results={results} />
          </div>
          <RoundResult
            result={roundResult}
            guess={lastGuess}
            validAnswers={validAnswers}
            clubA={clubA}
            clubB={clubB}
            onContinue={handleNextRound}
          />
        </div>
      )}

      {/* GAME OVER */}
      {phase === 'gameover' && (
        <div className="max-w-lg mx-auto animate-fade-in">
          <div className="text-center mb-8">
            <div className="text-ink-dim text-sm font-display uppercase tracking-wider mb-4">Final Score</div>
            <div className="flex items-baseline justify-center gap-1">
              <span className={`font-display font-black text-7xl ${
                score >= 4 ? 'text-accent' : score >= 2 ? 'text-warning' : 'text-danger'
              }`}>{score}</span>
              <span className="text-ink-faint font-display text-2xl">/ {TOTAL_ROUNDS}</span>
            </div>
            <p className={`mt-2 font-body ${
              score === TOTAL_ROUNDS ? 'text-accent' : score >= 3 ? 'text-warning' : 'text-danger'
            }`}>
              {score === TOTAL_ROUNDS ? 'Perfect! 🏆' : score >= 3 ? 'Well played!' : 'Better luck next time.'}
            </p>
          </div>

          <div className="flex flex-col gap-2 mb-8">
            {history.map((h, i) => (
              <div key={i} className="flex items-center gap-3 bg-card rounded-xl px-4 py-3 border border-rail/30">
                <span className="text-ink-faint font-mono text-sm w-5">{i + 1}</span>
                <div className="w-8 h-8 rounded-full bg-pitch-light flex items-center justify-center overflow-hidden border border-rail/50">
                  {h.clubA.logo_url ? <img src={h.clubA.logo_url} alt="" className="w-6 h-6 object-contain" /> : <span className="text-xs">⚽</span>}
                </div>
                <span className="flex-1 text-sm font-body text-ink truncate">{h.clubA.name} ↔ {h.clubB.name}</span>
                <div className="w-8 h-8 rounded-full bg-pitch-light flex items-center justify-center overflow-hidden border border-rail/50">
                  {h.clubB.logo_url ? <img src={h.clubB.logo_url} alt="" className="w-6 h-6 object-contain" /> : <span className="text-xs">⚽</span>}
                </div>
                <span className={`text-xs font-body ${h.result === 'correct' ? 'text-accent' : 'text-danger'}`}>
                  {h.result === 'correct' ? 'Correct' : h.result === 'timeout' ? 'Timed out' : h.result === 'skipped' ? 'Skipped' : 'Wrong'}
                </span>
                <span className={`text-lg ${h.result === 'correct' ? 'text-accent' : 'text-danger'}`}>
                  {h.result === 'correct' ? '✓' : '✗'}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <button onClick={handlePlayAgain} className="w-full py-4 rounded-xl bg-accent text-pitch font-display font-bold text-lg hover:bg-accent-dim transition-all">
              Play Again
            </button>
            <button onClick={() => navigate('/')} className="w-full py-4 rounded-xl bg-card border border-rail text-ink font-display font-semibold hover:bg-card-hover transition-all">
              Main menu
            </button>
          </div>
        </div>
      )}
    </div>
  );
}