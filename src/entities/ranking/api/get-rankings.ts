import { publicApiClient } from "@/shared/api/public-client";
import type { RankingEntry, RankingDifficulty } from "../model/types";

export function getRankings(difficulty: RankingDifficulty): Promise<RankingEntry[]> {
  return publicApiClient
    .get("api/rankings", { searchParams: { difficulty } })
    .json<{ data: RankingEntry[] }>()
    .then((res) => res.data);
}
