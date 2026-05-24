import { useState } from 'react';

const S = {
  surface:      'var(--surface)',
  border:       'var(--border)',
  accent:       'var(--accent)',
  accentBorder: 'var(--accent-border)',
  text:         'var(--text)',
  textDim:      'var(--text-dim)',
  fontBody:     "'DM Sans', system-ui, sans-serif",
  fontMono:     "'JetBrains Mono', monospace",
  radius:       '12px',
};

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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: S.textDim, fontFamily: S.fontBody }}>
        Room Code
      </div>
      <button
        onClick={handleCopy}
        style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '12px 24px', background: S.surface,
          borderRadius: S.radius, border: `1px solid ${S.border}`,
          cursor: 'pointer', transition: 'border-color 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = S.accentBorder)}
        onMouseLeave={e => (e.currentTarget.style.borderColor = S.border)}
      >
        <span style={{ fontFamily: S.fontMono, fontSize: '1.8rem', fontWeight: 700, color: S.accent, letterSpacing: '0.3em' }}>
          {code}
        </span>
        <span style={{ color: S.textDim, fontSize: '0.9rem' }}>
          {copied ? '✓' : '📋'}
        </span>
      </button>
      <p style={{ fontSize: '0.8rem', color: S.textDim, fontFamily: S.fontBody }}>
        Share this code with your friend
      </p>
    </div>
  );
}
