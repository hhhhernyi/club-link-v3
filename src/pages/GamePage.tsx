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

  const timer = useTimer({
    duration: TIMER_SECONDS,
    onComplete: () => handleTimeout(),
  });

  // Load clubs when in choosing phase
  useEffect(() => {
    if (room?.status === 'choosing' || room?.roundState?.phase === 'choosing') {
      getAllClubs();
    }
  }, [room?.status, room?.roundState?.phase, getAllClubs]);

  // Handle phase transitions
  useEffect(() => {
    if (!room) return;

    if (room.status === 'countdown' || room.roundState?.phase === 'countdown') {
      setShowCountdown(true);
    }

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
      const result = await submitGuess(
        roomId,
        uid,
        guess,
        room.roundState.clubA.id,
        room.roundState.clubB.id
      );

      setLocalResult(result.valid ? 'correct' : 'wrong');

      const players = await getValidPlayers(
        room.roundState.clubA.id,
        room.roundState.clubB.id
      );
      setValidAnswers(players.map((p) => p.name));
    } catch (err) {
      console.error('Submit error:', err);
    }
  }, [roomId, uid, room, timer, submitGuess, getValidPlayers]);

  const handleTimeout = useCallback(async () => {
    if (!room?.roundState?.clubA || !room?.roundState?.clubB) return;
    setLocalResult('timeout');
    setLastGuess(null);

    try {
      const players = await getValidPlayers(
        room.roundState.clubA.id,
        room.roundState.clubB.id
      );
      setValidAnswers(players.map((p) => p.name));
    } catch (err) {
      console.error(err);
    }
  }, [room, getValidPlayers]);

  const handleSkip = useCallback(async () => {
    if (!room?.roundState?.clubA || !room?.roundState?.clubB) return;
    timer.stop();
    setLocalResult('skipped');
    setLastGuess(null);

    try {
      const players = await getValidPlayers(
        room.roundState.clubA.id,
        room.roundState.clubB.id
      );
      setValidAnswers(players.map((p) => p.name));
    } catch (err) {
      console.error(err);
    }
  }, [room, timer, getValidPlayers]);

  // Loading / error states
  if (roomLoading) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="text-text-secondary font-body">Loading game...</div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center gap-4">
        <div className="text-text-secondary font-body">Room not found</div>
        <button
          onClick={() => navigate('/')}
          className="text-accent hover:text-accent-dim font-display"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const playerKeys = Object.keys(room.players);
  const myPlayer = uid ? room.players[uid] : null;
  const opponentUid = playerKeys.find((k) => k !== uid);
  const opponent = opponentUid ? room.players[opponentUid] : null;
  const totalRounds = room.maxRounds;

  return (
    <div className="min-h-screen bg-bg-primary px-4 py-6 flex flex-col items-center">
      {/* Back */}
      <div className="w-full max-w-lg">
      <button
        onClick={() => navigate('/')}
        className="text-text-secondary hover:text-text-primary text-sm font-body transition-colors mb-6"
      >
        ← Back
      </button>
      </div>

      {/* WAITING */}
      {room.status === 'waiting' && (
        <div className="w-full max-w-md text-center animate-fade-in">
          <h2 className="font-display font-bold text-2xl text-text-primary mb-4">
            Waiting for players...
          </h2>

          {room.roomCode && (
            <div className="mb-6">
              <RoomCodeDisplay code={room.roomCode} />
            </div>
          )}

          <div className="mb-6 text-text-secondary font-body text-sm">
            {playerKeys.length} / 2 players
          </div>

          {myPlayer && !myPlayer.ready && playerKeys.length >= 2 && (
            <button
              onClick={handleReady}
              className="px-8 py-3 rounded-xl bg-accent text-bg-primary font-display font-bold hover:bg-accent-dim transition-colors"
            >
              Ready
            </button>
          )}

          {myPlayer?.ready && (
            <p className="text-accent font-display text-sm">Waiting for opponent to ready up...</p>
          )}
        </div>
      )}

      {/* CHOOSING */}
      {(room.status === 'choosing' || room.roundState?.phase === 'choosing') &&
        myPlayer && !myPlayer.chosenClubId && (
        <div className="w-full max-w-lg animate-fade-in">
          <h1 className="font-display font-black text-3xl text-text-primary mb-2">
            Round {room.currentRound} – Pick your club
          </h1>
          <p className="text-text-secondary font-body mb-6">
            Choose a club you know well.
          </p>
          <ClubSelector
            clubs={clubs}
            onSelect={handleClubSelect}
            onSearch={searchClubs}
            loading={clubsLoading}
          />
        </div>
      )}

      {myPlayer?.chosenClubId && room.roundState?.phase === 'choosing' && (
        <div className="w-full max-w-md text-center animate-fade-in">
          <p className="text-accent font-display text-lg">
            You picked <span className="font-bold">{myPlayer.chosenClubName}</span>
          </p>
          <p className="text-text-secondary text-sm mt-2">Waiting for opponent...</p>
        </div>
      )}

      {/* COUNTDOWN */}
      {showCountdown && room.roundState?.clubA && room.roundState?.clubB && (
        <CountdownOverlay
          clubA={room.roundState.clubA}
          clubB={room.roundState.clubB}
          onComplete={() => setShowCountdown(false)}
        />
      )}

      {/* GUESSING */}
      {(room.status === 'guessing' || room.roundState?.phase === 'guessing') &&
        !showCountdown && !localResult && (
        <div className="w-full max-w-lg flex flex-col items-center gap-6 animate-fade-in">
          <div className="text-text-secondary text-sm font-display uppercase tracking-wider">
            Round {room.currentRound} of {totalRounds}
          </div>

          <RoundDots
            currentRound={room.currentRound}
            totalRounds={totalRounds}
            results={results}
          />

          {/* Score */}
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

          <ClubDisplay
            clubA={room.roundState?.clubA || null}
            clubB={room.roundState?.clubB || null}
          />

          <CircularTimer
            secondsLeft={timer.secondsLeft}
            fraction={timer.fraction}
            totalSeconds={TIMER_SECONDS}
          />

          <GuessInput
            onSubmit={handleGuess}
            onSkip={handleSkip}
          />
        </div>
      )}

      {/* RESULT (local) */}
      {localResult && room.roundState && (
        <div className="w-full max-w-lg animate-fade-in">
          <div className="mb-6">
            <RoundDots
              currentRound={room.currentRound}
              totalRounds={totalRounds}
              results={[...results, localResult]}
            />
          </div>
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
              setResults((prev) => [...prev, localResult]);
            }}
          />
        </div>
      )}

      {/* FINISHED */}
      {room.status === 'finished' && myPlayer && (
        <div className="w-full max-w-lg text-center animate-fade-in">
          <div className="text-text-secondary text-sm font-display uppercase tracking-wider mb-4">
            Game Over
          </div>

          <div className="flex items-baseline justify-center gap-1 mb-2">
            <span className="font-display font-black text-6xl text-accent">
              {myPlayer.score}
            </span>
            <span className="text-text-muted font-display text-xl">- {opponent?.score ?? 0}</span>
          </div>

          <p className="text-text-secondary font-body mb-8">
            {myPlayer.score > (opponent?.score ?? 0)
              ? 'You win! 🏆'
              : myPlayer.score < (opponent?.score ?? 0)
              ? 'You lost!'
              : "It's a draw!"}
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate('/')}
              className="w-full py-4 rounded-xl bg-accent text-bg-primary font-display font-bold text-lg hover:bg-accent-dim transition-all"
            >
              Back to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
