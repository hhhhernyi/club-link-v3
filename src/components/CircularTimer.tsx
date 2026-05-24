interface CircularTimerProps {
  secondsLeft: number;
  fraction: number;
  totalSeconds: number;
}

export default function CircularTimer({ secondsLeft, fraction }: CircularTimerProps) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - fraction);
  const displaySeconds = Math.ceil(secondsLeft);
  const isWarning = secondsLeft <= 3;

  return (
    <div className="relative w-24 h-24 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth="4"
        />
        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={isWarning ? 'var(--color-danger)' : 'var(--color-accent)'}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-[stroke] duration-300"
        />
      </svg>
      {/* Number in center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className={`font-mono text-3xl font-bold ${
            isWarning ? 'text-danger' : 'text-accent'
          }`}
        >
          {displaySeconds}
        </span>
      </div>
    </div>
  );
}
