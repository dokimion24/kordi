"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/shared/lib/utils";

interface QuizProgressProps {
  currentIndex: number;
  totalCount: number;
  timeLeft: number;
  totalScore: number;
}

export function QuizProgress({
  currentIndex,
  totalCount,
  timeLeft,
  totalScore,
}: QuizProgressProps) {
  const t = useTranslations("chordQuiz");
  const seconds = Math.ceil(timeLeft / 1000);
  const progress = (timeLeft / 10000) * 100;

  return (
    <div className="flex w-full max-w-4xl flex-col gap-3 px-4">
      {/* Question number + Time + Score */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          {t("question")} {currentIndex + 1}/{totalCount}
        </span>
        <span
          className={cn(
            "text-5xl font-bold tabular-nums leading-none",
            seconds > 5
              ? "text-success"
              : seconds > 2
                ? "text-warning"
                : "text-destructive animate-pulse",
          )}
        >
          {seconds}
        </span>

        <span className="text-sm font-medium text-foreground">
          {t("totalScore")}: {totalScore}
        </span>
      </div>

      {/* Timer bar */}
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-100",
            seconds > 5
              ? "bg-success"
              : seconds > 2
                ? "bg-warning"
                : "bg-destructive",
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
