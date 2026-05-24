import { useState, useCallback } from 'react';

const S = {
  surface: 'var(--surface)',
  border:  'var(--border)',
  accent:  'var(--accent)',
  text:    'var(--text)',
  textDim: 'var(--text-dim)',
  fontBody: "'DM Sans', system-ui, sans-serif",
  radius:  '12px',
};

interface GuessInputProps {
  onSubmit: (guess: string) => void;
  onSkip?: () => void;
  disabled?: boolean;
}

export default function GuessInput({ onSubmit, onSkip, disabled }: GuessInputProps) {
  const [value, setValue] = useState('');

  const handleSubmit = useCallback(() => {
    const trimmed = value.trim();
    if (trimmed && !disabled) { onSubmit(trimmed); setValue(''); }
  }, [value, disabled, onSubmit]);

  return (
    <div style={{ width: '100%' }}>
      <p style={{ textAlign: 'center', color: S.textDim, fontFamily: S.fontBody, fontSize: '0.95rem', marginBottom: 16 }}>
        Name a player who played for both clubs
      </p>

      <div style={{ display: 'flex', gap: 10 }}>
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          placeholder="Player name…"
          disabled={disabled}
          autoFocus
          style={{
            flex: 1, padding: '14px 16px', borderRadius: S.radius,
            border: `2px solid ${S.border}`, background: S.surface,
            color: S.text, fontFamily: S.fontBody, fontSize: '1rem',
            transition: 'border-color 0.2s', outline: 'none',
            opacity: disabled ? 0.5 : 1,
          }}
          onFocus={e => (e.currentTarget.style.borderColor = S.accent)}
          onBlur={e => (e.currentTarget.style.borderColor = S.border)}
        />
        <button
          onClick={handleSubmit}
          disabled={disabled || !value.trim()}
          style={{
            background: S.accent, color: '#000',
            fontFamily: S.fontBody, fontWeight: 700,
            fontSize: '0.9rem', padding: '14px 20px',
            borderRadius: S.radius, border: 'none', flexShrink: 0,
            cursor: disabled || !value.trim() ? 'not-allowed' : 'pointer',
            opacity: disabled || !value.trim() ? 0.5 : 1,
          }}
        >
          GO
        </button>
      </div>

      {onSkip && (
        <button
          onClick={onSkip}
          disabled={disabled}
          style={{
            display: 'block', margin: '12px auto 0',
            background: 'transparent', border: `1px solid ${S.border}`,
            color: S.textDim, fontFamily: S.fontBody, fontSize: '0.85rem',
            padding: '8px 24px', borderRadius: S.radius,
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.5 : 1,
            transition: 'border-color 0.2s, color 0.2s',
          }}
          onMouseEnter={e => { if (!disabled) { e.currentTarget.style.borderColor = S.textDim; e.currentTarget.style.color = S.text; } }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = S.border; e.currentTarget.style.color = S.textDim; }}
        >
          Skip
        </button>
      )}
    </div>
  );
}
