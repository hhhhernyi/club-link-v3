interface ScoreBoardProps {
  playerName: string;
  playerScore: number;
  opponentName: string;
  opponentScore: number;
  currentRound: number;
  totalRounds: number;
}

export default function ScoreBoard({
  playerName,
  playerScore,
  opponentName,
  opponentScore,
  currentRound,
  totalRounds,
}: ScoreBoardProps) {
  return (
    <div className="flex items-center justify-center gap-8 text-center">
      <div>
        <div className="text-text-secondary text-xs uppercase tracking-wider font-display">{playerName}</div>
        <div className="text-accent font-display font-black text-3xl">{playerScore}</div>
      </div>
      <div>
        <div className="text-text-secondary text-xs uppercase tracking-wider font-display">{opponentName}</div>
        <div className="text-text-primary font-display font-black text-3xl">{opponentScore}</div>
      </div>
      <div>
        <div className="text-text-secondary text-xs uppercase tracking-wider font-display">Round</div>
        <div className="text-text-primary font-display font-bold text-xl">{currentRound}/{totalRounds}</div>
      </div>
    </div>
  );
}
