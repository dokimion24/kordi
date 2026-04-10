"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Trophy } from "lucide-react";
import type { ScoreRecord, QuizDifficulty } from "@/entities/quiz";

const DIFFICULTIES: QuizDifficulty[] = ["EASY", "MEDIUM", "HARD"];

interface MyScoresPanelProps {
  scores: ScoreRecord[];
}

export function MyScoresPanel({ scores }: MyScoresPanelProps) {
  const t = useTranslations("me");
  const [selected, setSelected] = useState<QuizDifficulty>("EASY");

  const filtered = scores
    .filter((s) => s.difficulty === selected)
    .toSorted((a, b) => b.totalScore - a.totalScore);

  const best = filtered[0] ?? null;

  return (
    <div className="glass rounded-2xl px-6 py-8">
      <div className="mb-6 flex items-center gap-2">
        <Trophy className="size-5 text-warning" strokeWidth={1.5} />
        <h2 className="text-lg font-semibold text-foreground">{t("quizScores")}</h2>
      </div>

      {/* Difficulty Tabs */}
      <div className="mb-6 flex gap-1.5">
        {DIFFICULTIES.map((d) => (
          <button
            key={d}
            onClick={() => setSelected(d)}
            className={`rounded-lg px-4 py-1.5 text-sm transition-colors ${
              selected === d
                ? "bg-neon/20 text-neon ring-1 ring-neon/30"
                : "glass text-muted-foreground hover:text-foreground"
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Best Score */}
      {best && (
        <div className="mb-6 glass rounded-xl px-4 py-4">
          <p className="mb-1 text-xs text-muted-foreground">{t("bestScore")}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-neon">{best.totalScore}</span>
            <span className="text-sm text-muted-foreground">
              {best.correctCount}/{best.totalCount}
            </span>
          </div>
        </div>
      )}

      {/* Score List */}
      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground">{t("noScores")}</p>
      ) : (
        <div className="flex flex-col gap-2">
          {filtered.map((score) => (
            <div
              key={score.id}
              className="flex items-center justify-between rounded-lg px-4 py-3 glass"
            >
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-foreground">{score.totalScore}</span>
                <span className="text-xs text-muted-foreground">
                  {score.correctCount}/{score.totalCount}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                {new Date(score.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
