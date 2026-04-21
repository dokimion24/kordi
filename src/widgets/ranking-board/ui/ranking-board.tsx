"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { Trophy } from "lucide-react";
import { rankingQueries, type RankingDifficulty } from "@/entities/ranking";
import { Avatar, AvatarImage, AvatarFallback } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

const DIFFICULTIES: RankingDifficulty[] = ["EASY", "MEDIUM", "HARD"];

const MEDAL_COLORS = [
  "text-[oklch(0.8_0.12_85)]",   // gold
  "text-[oklch(0.7_0.02_260)]",  // silver
  "text-[oklch(0.6_0.1_55)]",    // bronze
];

export function RankingBoard() {
  const t = useTranslations("ranking");
  const [difficulty, setDifficulty] = useState<RankingDifficulty>("EASY");

  const { data: rankings, isLoading } = useQuery(rankingQueries.list(difficulty));

  return (
    <div className="w-full max-w-2xl">
      {/* Difficulty Tabs */}
      <div className="mb-6 flex gap-2">
        {DIFFICULTIES.map((d) => (
          <Button
            key={d}
            variant={difficulty === d ? "default" : "ghost"}
            size="sm"
            onClick={() => setDifficulty(d)}
            className={cn(difficulty === d && "neon-glow-sm")}
          >
            {t(d.toLowerCase())}
          </Button>
        ))}
      </div>

      {/* Ranking List */}
      <div className="space-y-2">
        {isLoading && (
          <p className="py-12 text-center text-sm text-muted-foreground">
            {t("loading")}
          </p>
        )}

        {rankings && rankings.length === 0 && (
          <p className="py-12 text-center text-sm text-muted-foreground">
            {t("empty")}
          </p>
        )}

        {rankings?.map((entry, i) => {
          const accuracy = entry.totalCount > 0
            ? Math.round((entry.correctCount / entry.totalCount) * 100)
            : 0;

          return (
            <div
              key={`${entry.nickname}-${i}`}
              className={cn(
                "glass flex items-center gap-4 rounded-xl px-4 py-3",
                i < 3 && "border-primary/20",
              )}
            >
              {/* Rank */}
              <div className="flex w-8 shrink-0 items-center justify-center">
                {i < 3 ? (
                  <Trophy
                    className={cn("size-5", MEDAL_COLORS[i])}
                    strokeWidth={1.5}
                  />
                ) : (
                  <span className="text-sm font-medium text-muted-foreground">
                    {i + 1}
                  </span>
                )}
              </div>

              {/* Avatar */}
              <Avatar size="sm">
                <AvatarImage src={entry.profileImageUrl ?? undefined} alt={entry.nickname} />
                <AvatarFallback className="text-xs">
                  {entry.nickname.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              {/* Name */}
              <span className={cn(
                "flex-1 text-sm font-medium",
                i < 3 ? "text-foreground" : "text-muted-foreground",
              )}>
                {entry.nickname}
              </span>

              {/* Accuracy */}
              <span className="text-xs text-muted-foreground">
                {accuracy}%
              </span>

              {/* Score */}
              <span className={cn(
                "w-16 text-right text-sm font-bold tabular-nums",
                i === 0 ? "neon-text" : "text-foreground",
              )}>
                {entry.totalScore}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
