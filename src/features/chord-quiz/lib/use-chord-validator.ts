"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { validateChord } from "@/shared/lib/music";
import type { ActiveNote } from "@/entities/note";
import type { QuizResult } from "@/entities/chord-quiz";

interface UseChordValidatorOptions {
  activeNotes: ActiveNote[];
  targetChordName: string | null;
  enabled: boolean;
  onCorrect: () => void;
  onIncorrect: () => void;
}

export function useChordValidator({
  activeNotes,
  targetChordName,
  enabled,
  onCorrect,
  onIncorrect,
}: UseChordValidatorOptions) {
  const [feedbackState, setFeedbackState] = useState<QuizResult>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const answeredRef = useRef(false);
  const cooldownRef = useRef(false);
  const onCorrectRef = useRef(onCorrect);
  const onIncorrectRef = useRef(onIncorrect);
  onCorrectRef.current = onCorrect;
  onIncorrectRef.current = onIncorrect;

  // Reset answered flag when target chord changes, with cooldown
  useEffect(() => {
    answeredRef.current = false;
    cooldownRef.current = true;

    // 600ms cooldown after chord change - gives user time to release keys
    const timer = setTimeout(() => {
      cooldownRef.current = false;
      setFeedbackState(null);
    }, 600);

    return () => clearTimeout(timer);
  }, [targetChordName]);

  useEffect(() => {
    if (!enabled || !targetChordName || activeNotes.length === 0 || answeredRef.current || cooldownRef.current) {
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      const midiNotes = activeNotes.map((n) => n.midi);
      const isCorrect = validateChord(targetChordName, midiNotes);

      if (isCorrect) {
        answeredRef.current = true;
        setFeedbackState("correct");
        onCorrectRef.current();
      } else if (midiNotes.length >= 3) {
        setFeedbackState("incorrect");
        setTimeout(() => {
          if (!answeredRef.current) setFeedbackState(null);
        }, 500);
      }
    }, 150);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [activeNotes, targetChordName, enabled]);

  const resetFeedback = useCallback(() => {
    setFeedbackState(null);
    answeredRef.current = false;
    cooldownRef.current = false;
  }, []);

  return { feedbackState, resetFeedback };
}
