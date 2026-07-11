import { apiClient } from "@/shared/api";
import type { ScoreRecord, QuizDifficulty } from "../model/types";

interface ApiResponse<T> {
  data: T;
}

export async function getMyScores(): Promise<ScoreRecord[]> {
  const response = await apiClient
    .get("api/scores/me")
    .json<ApiResponse<ScoreRecord[]>>();
  return response.data;
}

export async function getMyScoresByDifficulty(
  difficulty: QuizDifficulty,
): Promise<ScoreRecord[]> {
  const response = await apiClient
    .get(`api/scores/me/${difficulty}`)
    .json<ApiResponse<ScoreRecord[]>>();
  return response.data;
}
