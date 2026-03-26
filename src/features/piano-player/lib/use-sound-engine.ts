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
      playNoteOn(midi, velocity);
      noteOn(midi, velocity, source);
    },
    [noteOn]
  );

  const handleNoteOff = useCallback(
    (midi: number, source: ActiveNote["source"]) => {
      playNoteOff(midi);
      noteOff(midi);
    },
    [noteOff]
  );

  return {
    isAudioStarted,
    isLoaded,
    startAudio,
    handleNoteOn,
    handleNoteOff,
  };
}
