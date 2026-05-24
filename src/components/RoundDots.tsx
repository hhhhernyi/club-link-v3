interface RoundDotsProps {
  currentRound: number;
  totalRounds: number;
  results: ('correct' | 'wrong' | 'timeout' | 'skipped' | null)[];
}

export default function RoundDots({ currentRound, totalRounds, results }: RoundDotsProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: totalRounds }, (_, i) => {
        const roundNum = i + 1;
        const result = results[i];
        const isCurrent = roundNum === currentRound;

        let bgColor = 'bg-border'; // future round
        let size = 'w-3 h-3';

        if (result === 'correct') {
          bgColor = 'bg-accent';
        } else if (result === 'wrong' || result === 'timeout' || result === 'skipped') {
          bgColor = 'bg-danger';
        } else if (isCurrent) {
          bgColor = 'bg-accent';
          size = 'w-6 h-3 rounded-full';
          return (
            <div
              key={i}
              className={`${size} ${bgColor} transition-all duration-300`}
            />
          );
        }

        return (
          <div
            key={i}
            className={`${size} ${bgColor} rounded-full transition-all duration-300`}
          />
        );
      })}
    </div>
  );
}
