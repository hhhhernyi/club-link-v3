import { useState, useCallback } from 'react';

interface GuessInputProps {
  onSubmit: (guess: string) => void;
  onSkip?: () => void;
  disabled?: boolean;
}

export default function GuessInput({ onSubmit, onSkip, disabled }: GuessInputProps) {
  const [value, setValue] = useState('');

  const handleSubmit = useCallback(() => {
    const trimmed = value.trim();
    if (trimmed && !disabled) {
      onSubmit(trimmed);
      setValue('');
    }
  }, [value, disabled, onSubmit]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <p className="text-center text-text-primary font-display font-semibold text-lg mb-4">
        Name a player who played for both clubs
      </p>

      <div className="flex gap-3">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Player name..."
          disabled={disabled}
          className="flex-1 px-4 py-3.5 rounded-xl border border-border bg-bg-input text-text-primary font-body text-base placeholder:text-text-muted focus:border-accent transition-colors disabled:opacity-50"
          autoFocus
        />
        <button
          onClick={handleSubmit}
          disabled={disabled || !value.trim()}
          className="px-6 py-3.5 rounded-xl bg-accent text-bg-primary font-display font-bold text-base hover:bg-accent-dim transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          GO
        </button>
      </div>

      {onSkip && (
        <button
          onClick={onSkip}
          disabled={disabled}
          className="block mx-auto mt-4 text-text-secondary hover:text-text-primary text-sm font-body transition-colors border border-border/50 rounded-lg px-6 py-2 hover:border-border disabled:opacity-50"
        >
          Skip
        </button>
      )}
    </div>
  );
}
