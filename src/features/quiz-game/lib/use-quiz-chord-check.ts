"use client";

import { useEffect, useRef } from "react";
import { validateChord } from "@/shared/lib/music";
import type { ActiveNote } from "@/entities/note";
import type { QuizChordItem } from "@/entities/quiz";

interface UseQuizChordCheckOptions {
  currentChord: QuizChordItem | null;
  activeNotes: ActiveNote[];
  timeLeft: number;
  enabled: boolean;
  onCorrect: (score: number) => void;
  onIncorrect: () => void;
}

const MIN_NOTES = 2;
const COOLDOWN_MS = 600;

export function useQuizChordCheck({
  currentChord,
  activeNotes,
  timeLeft,
  enabled,
  onCorrect,
  onIncorrect,
}: UseQuizChordCheckOptions) {
  const answeredRef = useRef(false);
  const lastChangeRef = useRef(0);
  const onCorrectRef = useRef(onCorrect);
  const onIncorrectRef = useRef(onIncorrect);

  onCorrectRef.current = onCorrect;
  onIncorrectRef.current = onIncorrect;

  // Reset answered flag when chord changes
  useEffect(() => {
    answeredRef.current = false;
    lastChangeRef.current = performance.now();
  }, [currentChord]);

  useEffect(() => {
    if (!enabled || !currentChord || answeredRef.current) return;
    if (activeNotes.length < MIN_NOTES) return;

    const elapsed = performance.now() - lastChangeRef.current;
    if (elapsed < COOLDOWN_MS) return;

    const midiNotes = activeNotes.map((n) => n.midi);
    const isCorrect = validateChord(currentChord.name, midiNotes);

    if (isCorrect) {
      answeredRef.current = true;
      const remainingSeconds = timeLeft / 1000;
      const score = Math.floor(remainingSeconds * 10);
      onCorrectRef.current(score);
    } else if (activeNotes.length >= 3) {
      answeredRef.current = true;
      onIncorrectRef.current();
    }
  }, [activeNotes, currentChord, timeLeft, enabled]);
}
