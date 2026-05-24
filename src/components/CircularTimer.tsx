interface CircularTimerProps {
  secondsLeft: number;
  fraction: number;
  totalSeconds: number;
}

export default function CircularTimer({ secondsLeft, fraction }: CircularTimerProps) {
  const r = 40;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - fraction);
  const display = Math.ceil(secondsLeft);
  const warn = secondsLeft <= 3;

  return (
    <div style={{ position: 'relative', width: 96, height: 96 }}>
      <svg style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={r} fill="none" stroke="var(--border)" strokeWidth="5" />
        <circle
          cx="50" cy="50" r={r} fill="none"
          stroke={warn ? 'var(--danger)' : 'var(--accent)'}
          strokeWidth="5" strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.25s linear, stroke 0.3s' }}
        />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{
          fontFamily: "'Dela Gothic One', system-ui, sans-serif",
          fontSize: '1.8rem',
          color: warn ? 'var(--danger)' : 'var(--text)',
        }}>
          {display}
        </span>
      </div>
    </div>
  );
}
