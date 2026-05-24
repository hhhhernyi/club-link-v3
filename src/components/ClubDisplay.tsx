import type { ClubInfo } from '../types/game';

interface ClubDisplayProps {
  clubA: ClubInfo | null;
  clubB: ClubInfo | null;
  size?: 'sm' | 'md' | 'lg';
}

export default function ClubDisplay({ clubA, clubB, size = 'md' }: ClubDisplayProps) {
  const logoSize = size === 'sm' ? 'w-10 h-10' : size === 'lg' ? 'w-20 h-20' : 'w-14 h-14';
  const textSize = size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base';
  const subSize = size === 'sm' ? 'text-[10px]' : 'text-xs';

  const renderClub = (club: ClubInfo | null) => (
    <div className="flex flex-col items-center gap-2">
      <div className={`${logoSize} rounded-full bg-bg-card border border-border/50 flex items-center justify-center overflow-hidden`}>
        {club?.logo_url ? (
          <img src={club.logo_url} alt={club.name} className="w-4/5 h-4/5 object-contain" />
        ) : (
          <span className="text-text-muted text-lg">⚽</span>
        )}
      </div>
      <div className="text-center">
        <div className={`font-display font-bold text-text-primary ${textSize}`}>
          {club?.name || '???'}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex items-center justify-center gap-6">
      {renderClub(clubA)}
      <span className="text-text-muted text-lg font-mono">↔</span>
      {renderClub(clubB)}
    </div>
  );
}
