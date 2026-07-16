import ky from "ky";
import type { QuizChordItem, QuizDifficulty } from "../model/types";

export function getQuizChords(
  difficulty: QuizDifficulty,
): Promise<QuizChordItem[]> {
  return ky
    .get("/api/backend/quiz/chords", { searchParams: { difficulty } })
    .json<QuizChordItem[]>();
}
