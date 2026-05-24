const S = {
  text:     'var(--text)',
  textDim:  'var(--text-dim)',
  accent:   'var(--accent)',
  border:   'var(--border)',
  fontHead: "'Dela Gothic One', system-ui, sans-serif",
  fontBody: "'DM Sans', system-ui, sans-serif",
};

interface ScoreBoardProps {
  playerName: string;
  playerScore: number;
  opponentName: string;
  opponentScore: number;
  currentRound: number;
  totalRounds: number;
}

export default function ScoreBoard({ playerName, playerScore, opponentName, opponentScore }: ScoreBoardProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 28, textAlign: 'center' }}>
      <div>
        <div style={{ fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: S.textDim, fontFamily: S.fontBody, marginBottom: 4 }}>
          {playerName}
        </div>
        <div style={{ fontFamily: S.fontHead, fontSize: '2.2rem', color: S.accent }}>{playerScore}</div>
      </div>
      <div style={{ color: S.textDim, fontFamily: S.fontHead, fontSize: '1.2rem' }}>vs</div>
      <div>
        <div style={{ fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: S.textDim, fontFamily: S.fontBody, marginBottom: 4 }}>
          {opponentName}
        </div>
        <div style={{ fontFamily: S.fontHead, fontSize: '2.2rem', color: S.text }}>{opponentScore}</div>
      </div>
    </div>
  );
}
