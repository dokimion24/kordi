"use client";

import { useEffect, useRef, useCallback } from "react";

interface UseQuizTimerOptions {
  duration: number;
  enabled: boolean;
  resetKey?: number;
  onTick: (remaining: number) => void;
  onTimeout: () => void;
}

export function useQuizTimer({
  duration,
  enabled,
  resetKey = 0,
  onTick,
  onTimeout,
}: UseQuizTimerOptions) {
  const startTimeRef = useRef<number>(0);
  const rafRef = useRef<number>(0);
  const onTickRef = useRef(onTick);
  const onTimeoutRef = useRef(onTimeout);

  onTickRef.current = onTick;
  onTimeoutRef.current = onTimeout;

  const stop = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
  }, []);

  const restart = useCallback(() => {
    stop();
    startTimeRef.current = performance.now();

    const loop = () => {
      const elapsed = performance.now() - startTimeRef.current;
      const remaining = Math.max(0, duration - elapsed);

      onTickRef.current(remaining);

      if (remaining <= 0) {
        onTimeoutRef.current();
        return;
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
  }, [duration, stop]);

  useEffect(() => {
    if (enabled) {
      restart();
    } else {
      stop();
    }
    return stop;
  }, [enabled, resetKey, restart, stop]);

  return { restart, stop };
}
