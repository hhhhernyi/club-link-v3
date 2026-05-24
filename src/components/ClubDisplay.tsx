import { useState } from 'react';
import type { ClubInfo } from '../types/game';
import { getCrestUrl } from '../utils/crestUrl';

const S = {
  surface:  'var(--surface)',
  surface2: 'var(--surface2)',
  border:   'var(--border)',
  text:     'var(--text)',
  textDim:  'var(--text-dim)',
  fontHead: "'Dela Gothic One', system-ui, sans-serif",
  fontBody: "'DM Sans', system-ui, sans-serif",
};

function ClubBadge({ club, size }: { club: ClubInfo | null; size: 'sm' | 'md' | 'lg' }) {
  const [imgError, setImgError] = useState(false);
  const dim = size === 'sm' ? 40 : size === 'lg' ? 72 : 56;
  const logoSrc = club ? getCrestUrl(club.name, club.logo_url) : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{
        width: dim, height: dim, borderRadius: '50%',
        background: S.surface2, border: `1px solid ${S.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', flexShrink: 0,
      }}>
        {logoSrc && !imgError
          ? <img src={logoSrc} alt={club?.name} style={{ width: dim * 0.72, height: dim * 0.72, objectFit: 'contain' }}
              onError={() => setImgError(true)} />
          : <span style={{ fontSize: dim * 0.38 }}>⚽</span>}
      </div>
      <span style={{
        fontWeight: 600, color: S.text, textAlign: 'center',
        fontFamily: S.fontBody, maxWidth: dim * 2.2,
        fontSize: size === 'sm' ? '0.8rem' : size === 'lg' ? '1rem' : '0.9rem',
      }}>
        {club?.name ?? '???'}
      </span>
    </div>
  );
}

interface ClubDisplayProps {
  clubA: ClubInfo | null;
  clubB: ClubInfo | null;
  size?: 'sm' | 'md' | 'lg';
}

export default function ClubDisplay({ clubA, clubB, size = 'md' }: ClubDisplayProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
      <ClubBadge club={clubA} size={size} />
      <span style={{ fontFamily: S.fontHead, fontSize: '1rem', color: S.textDim }}>↔</span>
      <ClubBadge club={clubB} size={size} />
    </div>
  );
}
