import { useState } from 'react';

interface RoomCodeDisplayProps {
  code: string;
}

export default function RoomCodeDisplay({ code }: RoomCodeDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-text-secondary text-xs uppercase tracking-wider font-display">
        Room Code
      </div>
      <button
        onClick={handleCopy}
        className="flex items-center gap-3 px-6 py-3 bg-bg-card rounded-xl border border-border hover:border-accent/50 transition-colors group"
      >
        <span className="font-mono text-2xl font-bold text-accent tracking-[0.3em]">
          {code}
        </span>
        <span className="text-text-muted group-hover:text-accent text-sm transition-colors">
          {copied ? '✓' : '📋'}
        </span>
      </button>
    </div>
  );
}
