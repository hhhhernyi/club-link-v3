import type { ClubInfo } from '../types/game';
import ClubDisplay from './ClubDisplay';

interface RoundResultProps {
  result: 'correct' | 'wrong' | 'timeout' | 'skipped';
  guess: string | null;
  validAnswers: string[];
  clubA: ClubInfo | null;
  clubB: ClubInfo | null;
  onContinue: () => void;
}

export default function RoundResult({
  result,
  guess,
  validAnswers,
  clubA,
  clubB,
  onContinue,
}: RoundResultProps) {
  const isCorrect = result === 'correct';
  const icon = isCorrect ? '✓' : '✗';
  const message = (() => {
    switch (result) {
      case 'correct': return 'Correct!';
      case 'wrong': return 'Wrong!';
      case 'timeout': return "Time's up!";
      case 'skipped': return 'Skipped';
    }
  })();

  return (
    <div className="flex flex-col items-center gap-6 animate-fade-in max-w-lg mx-auto">
      {/* Result card */}
      <div
        className={`w-full rounded-2xl border-2 p-8 text-center ${
          isCorrect
            ? 'border-accent/30 bg-bg-result-correct'
            : 'border-danger/30 bg-bg-result-wrong'
        }`}
      >
        <div className={`text-4xl font-display font-black mb-2 ${
          isCorrect ? 'text-accent' : 'text-danger'
        }`}>
          {icon}
        </div>
        <div className={`text-2xl font-display font-bold ${
          isCorrect ? 'text-accent' : 'text-danger'
        }`}>
          {message}
        </div>
        {guess && !isCorrect && (
          <div className="mt-2 text-text-secondary text-sm">
            Your guess: <span className="text-text-primary">{guess}</span>
          </div>
        )}
      </div>

      {/* Clubs */}
      <ClubDisplay clubA={clubA} clubB={clubB} size="sm" />

      {/* Valid answers */}
      {validAnswers.length > 0 && (
        <div className="w-full bg-bg-card rounded-xl p-4">
          <div className="text-text-secondary text-xs uppercase tracking-wider font-display mb-3">
            {validAnswers.length} valid answer{validAnswers.length !== 1 ? 's' : ''}
          </div>
          <div className="flex flex-wrap gap-2">
            {validAnswers.map((name) => (
              <span
                key={name}
                className="px-3 py-1.5 bg-bg-secondary rounded-lg text-sm font-body text-text-primary border border-border/50"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Continue button */}
      <button
        onClick={onContinue}
        className="px-8 py-3 rounded-xl bg-accent text-bg-primary font-display font-bold hover:bg-accent-dim transition-colors"
      >
        Next Round
      </button>
    </div>
  );
}
