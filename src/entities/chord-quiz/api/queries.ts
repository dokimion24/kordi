import { queryOptions } from "@tanstack/react-query";
import { getQuizChords } from "./get-quiz-chords";
import type { QuizDifficulty } from "../model/types";

export const quizQueries = {
  chords: (difficulty: QuizDifficulty) =>
    queryOptions({
      queryKey: ["quiz", "chords", difficulty],
      queryFn: () => getQuizChords(difficulty),
      staleTime: 0,
    }),
};
