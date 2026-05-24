import { useState, useEffect, useRef, useCallback } from 'react';

interface UseTimerOptions {
  duration: number;
  onComplete?: () => void;
  autoStart?: boolean;
}

export function useTimer({ duration, onComplete, autoStart = false }: UseTimerOptions) {
  const [secondsLeft, setSecondsLeft] = useState(duration);
  const [fraction, setFraction] = useState(1);
  const [isRunning, setIsRunning] = useState(autoStart);
  const startTimeRef = useRef<number>(0);
  const rafRef = useRef<number>(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const start = useCallback(() => {
    startTimeRef.current = Date.now();
    setIsRunning(true);
  }, []);

  const stop = useCallback(() => {
    setIsRunning(false);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  const reset = useCallback((newDuration?: number) => {
    const d = newDuration ?? duration;
    setSecondsLeft(d);
    setFraction(1);
    setIsRunning(false);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, [duration]);

  useEffect(() => {
    if (!isRunning) return;

    startTimeRef.current = Date.now();

    const tick = () => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const remaining = Math.max(0, duration - elapsed);
      const frac = remaining / duration;

      setSecondsLeft(remaining);
      setFraction(frac);

      if (remaining <= 0) {
        setIsRunning(false);
        onCompleteRef.current?.();
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isRunning, duration]);

  return { secondsLeft, fraction, isRunning, start, stop, reset };
}
