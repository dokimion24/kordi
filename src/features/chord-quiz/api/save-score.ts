import ky from "ky";
import type { SaveScoreRequest, ScoreRecord } from "@/entities/chord-quiz";

export function saveScore(request: SaveScoreRequest): Promise<ScoreRecord> {
  return ky.post("/api/backend/scores", { json: request }).json<ScoreRecord>();
}
