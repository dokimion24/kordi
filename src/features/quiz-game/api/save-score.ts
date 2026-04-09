import ky from "ky";
import type { SaveScoreRequest, ScoreRecord } from "@/entities/quiz";

interface ApiResponse<T> {
  data: T;
}

export async function saveScore(
  request: SaveScoreRequest,
): Promise<ScoreRecord> {
  const response = await ky
    .post("/api/scores", { json: request })
    .json<ApiResponse<ScoreRecord>>();
  return response.data;
}
