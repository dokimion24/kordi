export interface RankingEntry {
  nickname: string;
  profileImageUrl: string | null;
  totalScore: number;
  correctCount: number;
  totalCount: number;
}

export type RankingDifficulty = "EASY" | "MEDIUM" | "HARD";
