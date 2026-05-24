import type { ClubInfo } from '../types/game';
import ClubDisplay from './ClubDisplay';

const S = {
  surface:      'var(--surface)',
  surface2:     'var(--surface2)',
  border:       'var(--border)',
  accent:       'var(--accent)',
  accentBg:     'var(--accent-bg)',
  accentBg2:    'var(--accent-bg2)',
  accentBorder: 'var(--accent-border)',
  accentGlow:   'var(--accent-glow)',
  danger:       'var(--danger)',
  dangerBg:     'var(--danger-bg)',
  text:         'var(--text)',
  textDim:      'var(--text-dim)',
  fontHead:     "'Dela Gothic One', system-ui, sans-serif",
  fontBody:     "'DM Sans', system-ui, sans-serif",
  radius:       '12px',
  radiusLg:     '16px',
};

interface RoundResultProps {
  result: 'correct' | 'wrong' | 'timeout' | 'skipped';
  guess: string | null;
  validAnswers: string[];
  clubA: ClubInfo | null;
  clubB: ClubInfo | null;
  onContinue: () => void;
}

export default function RoundResult({ result, guess, validAnswers, clubA, clubB, onContinue }: RoundResultProps) {
  const correct = result === 'correct';
  const label = correct ? 'Correct!'
    : result === 'timeout' ? "Time's up!"
    : result === 'skipped' ? 'Skipped'
    : 'Wrong answer!';
  const sub = correct && guess ? `${guess} played for both clubs`
    : !correct && guess ? `You guessed: "${guess}"` : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, width: '100%', animation: 'fadeIn 0.25s ease' }}>
      {/* Result card */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        padding: '24px 32px', borderRadius: S.radiusLg, width: '100%', textAlign: 'center',
        background: correct ? S.accentBg : S.dangerBg,
        border: `1px solid ${correct ? S.accent : S.danger}`,
      }}>
        <span style={{ fontSize: '2.5rem' }}>{correct ? '✓' : '✗'}</span>
        <span style={{ fontFamily: S.fontHead, fontSize: '1.8rem', color: correct ? S.accent : S.danger }}>
          {label}
        </span>
        {sub && <span style={{ fontSize: '0.9rem', color: S.text, opacity: 0.8 }}>{sub}</span>}
      </div>

      {/* Clubs */}
      <ClubDisplay clubA={clubA} clubB={clubB} size="sm" />

      {/* Valid answers */}
      {validAnswers.length > 0 && (
        <div style={{ background: S.surface, border: `1px solid ${S.border}`, borderRadius: S.radiusLg, padding: 20, width: '100%' }}>
          <div style={{ fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: S.textDim, marginBottom: 12, fontFamily: S.fontBody }}>
            {validAnswers.length} valid answer{validAnswers.length !== 1 ? 's' : ''}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {validAnswers.map(name => {
              const isGuessed = correct && name.toLowerCase() === guess?.toLowerCase();
              return (
                <span key={name} style={{
                  background: isGuessed ? S.accentBg2 : S.surface2,
                  border: `1px solid ${isGuessed ? S.accent : S.border}`,
                  color: isGuessed ? S.accent : S.text,
                  borderRadius: 8, padding: '5px 12px',
                  fontSize: '0.85rem', fontWeight: isGuessed ? 600 : 400,
                  fontFamily: S.fontBody,
                }}>
                  {name}{isGuessed ? ' ✓' : ''}
                </span>
              );
            })}
          </div>
        </div>
      )}

      <button
        onClick={onContinue}
        style={{
          background: S.accent, color: '#000', fontFamily: S.fontHead,
          fontSize: '1rem', padding: '14px 48px', borderRadius: S.radius,
          border: 'none', cursor: 'pointer', boxShadow: `0 0 24px ${S.accentGlow}`,
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
      >
        Next Round
      </button>
    </div>
  );
}
