"use client";

import { useEffect, useRef, useState } from "react";
import { useCallbackRef } from "@/shared/lib/react/use-callback-ref";
import {
  NOTE_KEY_OFFSETS,
  CONTROL_KEYS,
  DEFAULT_OCTAVE,
  MIN_OCTAVE,
  MAX_OCTAVE,
  VELOCITY_STEP,
  DEFAULT_VELOCITY,
  offsetToMidi,
} from "@/shared/lib/music";

interface UseKeyboardInputOptions {
  onNoteOn: (midi: number, velocity: number) => void;
  onNoteOff: (midi: number) => void;
  onSustainChange?: (on: boolean) => void;
  enabled?: boolean;
}

export function useKeyboardInput({
  onNoteOn,
  onNoteOff,
  onSustainChange,
  enabled = true,
}: UseKeyboardInputOptions) {
  const [octave, setOctave] = useState(DEFAULT_OCTAVE);
  const [velocity, setVelocity] = useState(DEFAULT_VELOCITY);
  const [sustain, setSustain] = useState(false);

  const octaveRef = useRef(octave);
  const velocityRef = useRef(velocity);
  octaveRef.current = octave;
  velocityRef.current = velocity;

  const onNoteOnRef = useCallbackRef(onNoteOn);
  const onNoteOffRef = useCallbackRef(onNoteOff);
  const onSustainChangeRef = useCallbackRef(onSustainChange);

  const pressedKeys = useRef(new Map<string, number>());

  useEffect(() => {
    if (!enabled) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.repeat) return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const { code } = e;

      if (code === CONTROL_KEYS.OCTAVE_DOWN) {
        e.preventDefault();
        setOctave((prev) => Math.max(MIN_OCTAVE, prev - 1));
        return;
      }
      if (code === CONTROL_KEYS.OCTAVE_UP) {
        e.preventDefault();
        setOctave((prev) => Math.min(MAX_OCTAVE, prev + 1));
        return;
      }
      if (code === CONTROL_KEYS.VELOCITY_DOWN) {
        e.preventDefault();
        setVelocity((prev) => Math.max(1, prev - VELOCITY_STEP));
        return;
      }
      if (code === CONTROL_KEYS.VELOCITY_UP) {
        e.preventDefault();
        setVelocity((prev) => Math.min(127, prev + VELOCITY_STEP));
        return;
      }
      if (code === CONTROL_KEYS.SUSTAIN) {
        e.preventDefault();
        setSustain((prev) => {
          const next = !prev;
          onSustainChangeRef.current?.(next);
          return next;
        });
        return;
      }

      const offset = NOTE_KEY_OFFSETS[code];
      if (offset === undefined) return;
      if (pressedKeys.current.has(code)) return;

      e.preventDefault();
      const midi = offsetToMidi(offset, octaveRef.current);
      pressedKeys.current.set(code, midi);
      onNoteOnRef.current(midi, velocityRef.current / 127);
    }

    function handleKeyUp(e: KeyboardEvent) {
      const { code } = e;
      const midi = pressedKeys.current.get(code);
      if (midi === undefined) return;

      e.preventDefault();
      pressedKeys.current.delete(code);
      onNoteOffRef.current(midi);
    }

    window.addEventListener("keydown", handleKeyDown, { passive: false });
    window.addEventListener("keyup", handleKeyUp, { passive: false });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [enabled]);

  return { octave, velocity, sustain };
}
