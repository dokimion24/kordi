import { queryOptions } from "@tanstack/react-query";
import { getQuizChords } from "./get-quiz-chords";
import { getMyScores, getMyScoresByDifficulty } from "./get-my-scores";
import type { QuizDifficulty } from "../model/types";

export const quizQueries = {
  chords: (difficulty: QuizDifficulty) =>
    queryOptions({
      queryKey: ["quiz", "chords", difficulty],
      queryFn: () => getQuizChords(difficulty),
      staleTime: 0,
    }),
  myScores: () =>
    queryOptions({
      queryKey: ["scores", "me"],
      queryFn: getMyScores,
    }),
  myScoresByDifficulty: (difficulty: QuizDifficulty) =>
    queryOptions({
      queryKey: ["scores", "me", difficulty],
      queryFn: () => getMyScoresByDifficulty(difficulty),
    }),
};
