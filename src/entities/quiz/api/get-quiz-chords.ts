import { publicApiClient } from "@/shared/api";
import type { QuizChordItem, QuizDifficulty } from "../model/types";

interface ApiResponse<T> {
  data: T;
}

export async function getQuizChords(
  difficulty: QuizDifficulty,
): Promise<QuizChordItem[]> {
  const response = await publicApiClient
    .get("api/quiz/chords", { searchParams: { difficulty } })
    .json<ApiResponse<QuizChordItem[]>>();
  return response.data;
}
