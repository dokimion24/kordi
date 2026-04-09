"use client";

import { useReducer, useCallback } from "react";
import type {
  QuizGameState,
  QuizChordItem,
  QuizDifficulty,
} from "@/entities/quiz";

const INITIAL_STATE: QuizGameState = {
  phase: "select",
  difficulty: null,
  questions: [],
  currentIndex: 0,
  timeLeft: 10000,
  scores: [],
  answers: [],
  totalScore: 0,
};

type Action =
  | {
      type: "START_QUIZ";
      difficulty: QuizDifficulty;
      questions: QuizChordItem[];
    }
  | { type: "ANSWER_CORRECT"; score: number }
  | { type: "ANSWER_INCORRECT" }
  | { type: "ANSWER_TIMEOUT" }
  | { type: "TICK"; timeLeft: number }
  | { type: "RESET" };

function reducer(state: QuizGameState, action: Action): QuizGameState {
  switch (action.type) {
    case "START_QUIZ":
      return {
        ...INITIAL_STATE,
        phase: "playing",
        difficulty: action.difficulty,
        questions: action.questions,
      };
    case "ANSWER_CORRECT": {
      const newScores = [...state.scores, action.score];
      const newAnswers = [...state.answers, "correct" as const];
      const nextIndex = state.currentIndex + 1;
      const isLast = nextIndex >= state.questions.length;
      return {
        ...state,
        scores: newScores,
        answers: newAnswers,
        totalScore: state.totalScore + action.score,
        currentIndex: isLast ? state.currentIndex : nextIndex,
        timeLeft: 10000,
        phase: isLast ? "result" : "playing",
      };
    }
    case "ANSWER_INCORRECT": {
      const nextIndex = state.currentIndex + 1;
      const isLast = nextIndex >= state.questions.length;
      return {
        ...state,
        scores: [...state.scores, 0],
        answers: [...state.answers, "incorrect" as const],
        currentIndex: isLast ? state.currentIndex : nextIndex,
        timeLeft: 10000,
        phase: isLast ? "result" : "playing",
      };
    }
    case "ANSWER_TIMEOUT": {
      const nextIndex = state.currentIndex + 1;
      const isLast = nextIndex >= state.questions.length;
      return {
        ...state,
        scores: [...state.scores, 0],
        answers: [...state.answers, "timeout" as const],
        currentIndex: isLast ? state.currentIndex : nextIndex,
        timeLeft: 10000,
        phase: isLast ? "result" : "playing",
      };
    }
    case "TICK":
      return { ...state, timeLeft: action.timeLeft };
    case "RESET":
      return INITIAL_STATE;
    default:
      return state;
  }
}

export function useQuizGameState() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const startQuiz = useCallback(
    (difficulty: QuizDifficulty, questions: QuizChordItem[]) => {
      dispatch({ type: "START_QUIZ", difficulty, questions });
    },
    [],
  );

  const answerCorrect = useCallback((score: number) => {
    dispatch({ type: "ANSWER_CORRECT", score });
  }, []);

  const answerIncorrect = useCallback(() => {
    dispatch({ type: "ANSWER_INCORRECT" });
  }, []);

  const answerTimeout = useCallback(() => {
    dispatch({ type: "ANSWER_TIMEOUT" });
  }, []);

  const tick = useCallback((timeLeft: number) => {
    dispatch({ type: "TICK", timeLeft });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);

  return {
    state,
    startQuiz,
    answerCorrect,
    answerIncorrect,
    answerTimeout,
    tick,
    reset,
  };
}
