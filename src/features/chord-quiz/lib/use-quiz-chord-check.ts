"use client";

import { useMemo, useRef } from "react";
import { useChordCheck } from "@/shared/lib/music/use-chord-check";
import type { ActiveNote } from "@/entities/note";
import type { QuizChordItem } from "@/entities/chord-quiz";

interface UseQuizChordCheckOptions {
  currentChord: QuizChordItem | null;
  activeNotes: ActiveNote[];
  timeLeft: number;
  enabled: boolean;
  onCorrect: (score: number) => void;
  onIncorrect: () => void;
}

export function useQuizChordCheck({
  currentChord,
  activeNotes,
  timeLeft,
  enabled,
  onCorrect,
  onIncorrect,
}: UseQuizChordCheckOptions) {
  const midiNotes = useMemo(() => activeNotes.map((n) => n.midi), [activeNotes]);
  const timeLeftRef = useRef(timeLeft);
  timeLeftRef.current = timeLeft;

  useChordCheck({
    targetChordName: currentChord?.name ?? null,
    midiNotes,
    enabled,
    minNotesToCheck: 2,
    finalizeIncorrect: true,
    // Timer ticks re-run validation so a chord held through the cooldown still registers
    revalidateKey: timeLeft,
    onCorrect: () => {
      const remainingSeconds = timeLeftRef.current / 1000;
      onCorrect(Math.floor(remainingSeconds * 10));
    },
    onIncorrect,
  });
}
