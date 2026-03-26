"use client";

import { useReducer, useCallback } from "react";
import type { QuizState, QuizChord } from "./types";

const INITIAL_STATE: QuizState = {
  status: "idle",
  currentChord: null,
  nextChord: null,
  score: 0,
  streak: 0,
  bestStreak: 0,
  totalAttempted: 0,
  totalCorrect: 0,
  lastResult: null,
};

type QuizAction =
  | { type: "START"; current: QuizChord; next: QuizChord }
  | { type: "STOP" }
  | { type: "PAUSE" }
  | { type: "RESUME" }
  | { type: "MARK_CORRECT"; next: QuizChord }
  | { type: "MARK_INCORRECT" }
  | { type: "MARK_TIMEOUT"; next: QuizChord }
  | { type: "RESET" };

function reducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "START":
      return {
        ...INITIAL_STATE,
        status: "playing",
        currentChord: action.current,
        nextChord: action.next,
      };
    case "STOP":
      return { ...state, status: "idle" };
    case "PAUSE":
      return { ...state, status: "paused" };
    case "RESUME":
      return { ...state, status: "playing" };
    case "MARK_CORRECT": {
      const newStreak = state.streak + 1;
      return {
        ...state,
        score: state.score + 1,
        streak: newStreak,
        bestStreak: Math.max(state.bestStreak, newStreak),
        totalAttempted: state.totalAttempted + 1,
        totalCorrect: state.totalCorrect + 1,
        lastResult: "correct",
        currentChord: state.nextChord,
        nextChord: action.next,
      };
    }
    case "MARK_INCORRECT":
      return {
        ...state,
        streak: 0,
        totalAttempted: state.totalAttempted + 1,
        lastResult: "incorrect",
      };
    case "MARK_TIMEOUT":
      return {
        ...state,
        streak: 0,
        totalAttempted: state.totalAttempted + 1,
        lastResult: "timeout",
        currentChord: state.nextChord,
        nextChord: action.next,
      };
    case "RESET":
      return INITIAL_STATE;
    default:
      return state;
  }
}

export function useQuizState() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const start = useCallback(
    (current: QuizChord, next: QuizChord) =>
      dispatch({ type: "START", current, next }),
    []
  );
  const stop = useCallback(() => dispatch({ type: "STOP" }), []);
  const pause = useCallback(() => dispatch({ type: "PAUSE" }), []);
  const resume = useCallback(() => dispatch({ type: "RESUME" }), []);
  const markCorrect = useCallback(
    (next: QuizChord) => dispatch({ type: "MARK_CORRECT", next }),
    []
  );
  const markIncorrect = useCallback(
    () => dispatch({ type: "MARK_INCORRECT" }),
    []
  );
  const markTimeout = useCallback(
    (next: QuizChord) => dispatch({ type: "MARK_TIMEOUT", next }),
    []
  );
  const reset = useCallback(() => dispatch({ type: "RESET" }), []);

  return {
    state,
    start,
    stop,
    pause,
    resume,
    markCorrect,
    markIncorrect,
    markTimeout,
    reset,
  };
}
