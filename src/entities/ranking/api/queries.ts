import { queryOptions } from "@tanstack/react-query";
import { getRankings } from "./get-rankings";
import type { RankingDifficulty } from "../model/types";

export const rankingQueries = {
  list: (difficulty: RankingDifficulty) =>
    queryOptions({
      queryKey: ["ranking", difficulty],
      queryFn: () => getRankings(difficulty),
      staleTime: 30 * 1000,
    }),
};
