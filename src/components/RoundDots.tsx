interface RoundDotsProps {
  currentRound: number;
  totalRounds: number;
  results: ('correct' | 'wrong' | 'timeout' | 'skipped' | null)[];
}

export default function RoundDots({ currentRound, totalRounds, results }: RoundDotsProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
      {Array.from({ length: totalRounds }, (_, i) => {
        const roundNum = i + 1;
        const result = results[i];
        const isCurrent = roundNum === currentRound;

        let bg = 'var(--color-border)';
        if (result === 'correct') bg = 'var(--color-accent)';
        else if (result === 'wrong' || result === 'timeout' || result === 'skipped') bg = 'var(--color-danger)';
        else if (isCurrent) bg = 'var(--color-accent)';

        const width = isCurrent && !result ? 24 : 12;

        return (
          <div
            key={i}
            style={{
              width, height: 12,
              borderRadius: 6,
              background: bg,
              transition: 'all 300ms ease',
            }}
          />
        );
      })}
    </div>
  );
}
