"use client";

import { useCallback, useRef, useState } from "react";
import type { ActiveNote } from "@/entities/note";
import {
  ensureAudioStarted,
  getSampler,
  playNoteOn,
  playNoteOff,
} from "@/shared/lib/audio";

interface UseSoundEngineOptions {
  noteOn: (midi: number, velocity: number, source: ActiveNote["source"]) => void;
  noteOff: (midi: number) => void;
}

export function useSoundEngine({ noteOn, noteOff }: UseSoundEngineOptions) {
  const [isAudioStarted, setIsAudioStarted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const startingRef = useRef(false);
  const sustainRef = useRef(false);
  // Notes released while the sustain pedal is down — kept ringing until pedal-up
  const sustainedNotes = useRef(new Set<number>());

  const startAudio = useCallback(async () => {
    if (startingRef.current) return;
    startingRef.current = true;

    await ensureAudioStarted();
    setIsAudioStarted(true);

    await getSampler();
    setIsLoaded(true);
  }, []);

  const handleNoteOn = useCallback(
    (midi: number, velocity: number, source: ActiveNote["source"]) => {
      // Re-pressing a sustained note: it's held again, no longer pedal-owned
      sustainedNotes.current.delete(midi);
      playNoteOn(midi, velocity);
      noteOn(midi, velocity, source);
    },
    [noteOn]
  );

  const handleNoteOff = useCallback(
    (midi: number, source: ActiveNote["source"]) => {
      noteOff(midi);
      if (sustainRef.current) {
        sustainedNotes.current.add(midi);
        return;
      }
      playNoteOff(midi);
    },
    [noteOff]
  );

  const setSustain = useCallback((on: boolean) => {
    sustainRef.current = on;
    if (!on) {
      for (const midi of sustainedNotes.current) {
        playNoteOff(midi);
      }
      sustainedNotes.current.clear();
    }
  }, []);

  return {
    isAudioStarted,
    isLoaded,
    startAudio,
    handleNoteOn,
    handleNoteOff,
    setSustain,
  };
}
