import { useState, useEffect, useCallback } from 'react';
import type { Club } from '../types/database';

interface ClubSelectorProps {
  clubs: Club[];
  onSelect: (club: Club) => void;
  onSearch: (query: string) => void;
  loading?: boolean;
}

export default function ClubSelector({ clubs, onSelect, onSearch, loading }: ClubSelectorProps) {
  const [query, setQuery] = useState('');

  const handleChange = useCallback((value: string) => {
    setQuery(value);
    onSearch(value);
  }, [onSearch]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length >= 1) {
        onSearch(query);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [query, onSearch]);

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Search input */}
      <div className="relative mb-4">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">🔍</div>
        <input
          type="text"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Search clubs..."
          className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-border-accent/40 bg-bg-input text-text-primary font-body text-base placeholder:text-text-muted focus:border-accent transition-colors"
          autoFocus
        />
      </div>

      {/* Club list */}
      <div className="flex flex-col gap-1">
        {clubs.map((club) => (
          <button
            key={club.id}
            onClick={() => onSelect(club)}
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-bg-card-hover transition-colors text-left group"
          >
            {/* Club logo or placeholder */}
            <div className="w-10 h-10 rounded-full bg-bg-card flex items-center justify-center overflow-hidden flex-shrink-0 border border-border/50">
              {club.logo_url ? (
                <img src={club.logo_url} alt={club.name} className="w-8 h-8 object-contain" />
              ) : (
                <span className="text-text-muted text-xs font-mono">⚽</span>
              )}
            </div>

            {/* Club info */}
            <div className="flex-1 min-w-0">
              <div className="font-display font-semibold text-text-primary group-hover:text-accent transition-colors">
                {club.name}
              </div>
              <div className="text-xs text-text-secondary">
                {club.country} · {club.league}
              </div>
            </div>
          </button>
        ))}

        {loading && (
          <div className="text-center py-8 text-text-muted text-sm">Loading clubs...</div>
        )}

        {!loading && clubs.length === 0 && query.length > 0 && (
          <div className="text-center py-8 text-text-muted text-sm">No clubs found</div>
        )}
      </div>
    </div>
  );
}
