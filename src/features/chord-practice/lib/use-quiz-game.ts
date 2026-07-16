"use client";

import { useCallback, useRef } from "react";
import type { ActiveNote } from "@/entities/note";
import type { QuizSettings } from "@/entities/chord-practice";
import { useQuizState } from "../model/use-quiz-state";
import { useMetronome } from "./use-metronome";
import { useChordGenerator } from "./use-chord-generator";
import { useChordValidator } from "./use-chord-validator";

export function useQuizGame(
  settings: QuizSettings,
  activeNotes: ActiveNote[]
) {
  const isPractice = settings.gameMode === "practice";

  const {
    state,
    start: startQuiz,
    stop: stopQuiz,
    pause: pauseQuiz,
    resume: resumeQuiz,
    markCorrect,
    markTimeout,
  } = useQuizState();

  const { generateNext } = useChordGenerator(settings);
  const barCountRef = useRef(0);
  // Bar at which the current chord appeared — early correct answers move this
  // anchor so the next chord gets its full barsPerChord instead of inheriting
  // the previous chord's grid position (which skipped it via a false timeout)
  const chordStartBarRef = useRef(0);

  const handleBarComplete = useCallback(
    (barCount: number) => {
      if (state.status !== "playing") return;
      if (isPractice) return; // No timeout in practice mode

      barCountRef.current = barCount;
      if (barCount - chordStartBarRef.current >= settings.barsPerChord) {
        chordStartBarRef.current = barCount;
        const next = generateNext(state.nextChord?.name ?? null);
        markTimeout({ ...next });
      }
    },
    [state.status, state.nextChord, settings.barsPerChord, isPractice, generateNext, markTimeout]
  );

  const metronome = useMetronome({
    bpm: settings.bpm,
    timeSignature: settings.timeSignature,
    audioEnabled: !isPractice && settings.metronomeAudioEnabled,
    onBarComplete: handleBarComplete,
  });

  const handleCorrect = useCallback(() => {
    chordStartBarRef.current = barCountRef.current;
    const next = generateNext(state.nextChord?.name ?? null);
    markCorrect({ ...next });
  }, [generateNext, state.nextChord, markCorrect]);

  const handleIncorrect = useCallback(() => {
    // Feedback only, don't advance
  }, []);

  const { feedbackState } = useChordValidator({
    activeNotes,
    targetChordName: state.currentChord?.name ?? null,
    enabled: state.status === "playing",
    onCorrect: handleCorrect,
    onIncorrect: handleIncorrect,
  });

  const start = useCallback(() => {
    const first = generateNext(null);
    const second = generateNext(first.name);
    startQuiz({ ...first }, { ...second });
    barCountRef.current = 0;
    chordStartBarRef.current = 0;
    if (!isPractice) {
      metronome.start();
    }
  }, [generateNext, startQuiz, metronome, isPractice]);

  const stop = useCallback(() => {
    metronome.stop();
    stopQuiz();
  }, [metronome, stopQuiz]);

  const pause = useCallback(() => {
    metronome.stop();
    pauseQuiz();
  }, [metronome, pauseQuiz]);

  const resume = useCallback(() => {
    if (!isPractice) {
      metronome.start();
    }
    resumeQuiz();
  }, [metronome, resumeQuiz, isPractice]);

  return {
    state,
    feedbackState,
    metronome: {
      currentBeat: metronome.currentBeat,
      beatsPerBar: metronome.beatsPerBar,
      isPlaying: metronome.isPlaying,
    },
    start,
    stop,
    pause,
    resume,
  };
}
