import { apiClient } from "@/shared/api";
import type { ScoreRecord } from "../model/types";

export async function getMyScores(): Promise<ScoreRecord[]> {
  const response = await apiClient
    .get("api/scores/me")
    .json<{ data: ScoreRecord[] }>();
  return response.data;
}
