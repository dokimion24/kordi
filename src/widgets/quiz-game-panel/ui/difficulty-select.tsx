"use client";

import { useTranslations } from "next-intl";
import type { QuizDifficulty } from "@/entities/quiz";

interface DifficultySelectProps {
  onSelect: (difficulty: QuizDifficulty) => void;
  isLoading?: boolean;
}

const DIFFICULTIES: {
  value: QuizDifficulty;
  key: string;
  color: string;
  bgColor: string;
}[] = [
  {
    value: "EASY",
    key: "easy",
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    value: "MEDIUM",
    key: "medium",
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    value: "HARD",
    key: "hard",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
];

export function DifficultySelect({
  onSelect,
  isLoading,
}: DifficultySelectProps) {
  const t = useTranslations("chordQuiz");

  return (
    <div className="flex flex-col items-center gap-6">
      <h2 className="text-xl font-semibold text-foreground">
        {t("selectDifficulty")}
      </h2>
      <div className="grid w-full max-w-sm gap-3">
        {DIFFICULTIES.map(({ value, key, color, bgColor }) => (
          <button
            key={value}
            onClick={() => onSelect(value)}
            disabled={isLoading}
            className={`glass glass-hover flex items-center gap-4 rounded-2xl p-5 transition-all duration-300 hover:neon-glow-sm disabled:opacity-50`}
          >
            <div
              className={`flex size-10 items-center justify-center rounded-xl ${bgColor}`}
            >
              <span className={`text-lg font-bold ${color}`}>
                {key.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="text-lg font-medium text-foreground">
              {t(key)}
            </span>
          </button>
        ))}
      </div>
      {isLoading && (
        <p className="text-sm text-muted-foreground">{t("loading")}</p>
      )}
    </div>
  );
}
