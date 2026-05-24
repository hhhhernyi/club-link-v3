import { useState, useCallback, useEffect } from 'react';
import type { Club } from '../types/database';
import { getCrestUrl } from '../utils/crestUrl';

const S = {
  surface:  'var(--surface)',
  surface2: 'var(--surface2)',
  border:   'var(--border)',
  accent:   'var(--accent)',
  text:     'var(--text)',
  textDim:  'var(--text-dim)',
  fontBody: "'DM Sans', system-ui, sans-serif",
  radius:   '12px',
  transition: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
};

interface ClubSelectorProps {
  clubs: Club[];
  onSelect: (club: Club) => void;
  onSearch: (query: string) => void;
  loading?: boolean;
}

export default function ClubSelector({ clubs, onSelect, onSearch, loading }: ClubSelectorProps) {
  const [query, setQuery] = useState('');
  const [logosReady, setLogosReady] = useState(false);

  const handleChange = useCallback((value: string) => {
    setQuery(value);
    onSearch(value);
  }, [onSearch]);

  // Preload club logos before revealing the list
  useEffect(() => {
    if (clubs.length === 0) { setLogosReady(false); return; }
    const sources = clubs
      .map(c => getCrestUrl(c.name, c.logo_url))
      .filter((s): s is string => !!s);
    if (sources.length === 0) { setLogosReady(true); return; }
    setLogosReady(false);
    let remaining = sources.length;
    sources.forEach(src => {
      const img = new Image();
      img.onload = img.onerror = () => { if (--remaining === 0) setLogosReady(true); };
      img.src = src;
    });
  }, [clubs]);

  const isLoading = loading || (clubs.length > 0 && !logosReady);

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Search input */}
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: S.textDim, pointerEvents: 'none' }}>🔍</span>
        <input
          type="text"
          value={query}
          onChange={e => handleChange(e.target.value)}
          placeholder="Search clubs..."
          autoFocus
          style={{
            width: '100%', paddingLeft: 42, paddingRight: 14, paddingTop: 12, paddingBottom: 12,
            borderRadius: S.radius, border: `1px solid ${S.border}`,
            background: S.surface, color: S.text,
            fontFamily: S.fontBody, fontSize: '0.95rem',
            outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box',
          }}
          onFocus={e => (e.currentTarget.style.borderColor = S.accent)}
          onBlur={e => (e.currentTarget.style.borderColor = S.border)}
        />
      </div>

      {/* Spinner */}
      {isLoading && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '3rem 0' }}>
          <svg viewBox="0 0 48 48" style={{ width: 48, height: 48 }}>
            <circle cx="24" cy="24" r="20" fill="none" stroke={S.border} strokeWidth="3" />
            <circle cx="24" cy="24" r="20" fill="none" stroke={S.accent} strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 20 * 0.25} ${2 * Math.PI * 20 * 0.75}`}
              style={{ transformOrigin: '24px 24px', animation: 'spin 1s linear infinite' }} />
          </svg>
          <span style={{ color: S.textDim, fontSize: '0.9rem', fontFamily: S.fontBody }}>
            {loading ? 'Fetching clubs…' : 'Loading logos…'}
          </span>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && clubs.length === 0 && query.length > 0 && (
        <div style={{ textAlign: 'center', padding: '3rem 0', color: S.textDim, fontSize: '0.9rem', fontFamily: S.fontBody }}>
          No clubs found
        </div>
      )}

      {/* Club list */}
      {!isLoading && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {clubs.map(club => {
            const logoSrc = getCrestUrl(club.name, club.logo_url);
            return (
              <button
                key={club.id}
                onClick={() => onSelect(club)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '10px 14px', borderRadius: S.radius,
                  background: S.surface, border: `1px solid ${S.border}`,
                  cursor: 'pointer', transition: S.transition,
                  textAlign: 'left', width: '100%',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = S.accent; e.currentTarget.style.background = S.surface2; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = S.border; e.currentTarget.style.background = S.surface; }}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: S.surface2, border: `1px solid ${S.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  overflow: 'hidden', flexShrink: 0,
                }}>
                  {logoSrc
                    ? <img src={logoSrc} alt={club.name} style={{ width: 26, height: 26, objectFit: 'contain' }}
                        onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                    : <span style={{ fontSize: '0.85rem' }}>⚽</span>}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, minWidth: 0 }}>
                  <span style={{ fontWeight: 600, fontSize: '0.9rem', color: S.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontFamily: S.fontBody }}>
                    {club.name}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: S.textDim, fontFamily: S.fontBody }}>
                    {club.country} · {club.league}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
