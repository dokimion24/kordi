"use client";

import { useTranslations } from "next-intl";
import type { QuizState } from "@/entities/chord-quiz";

interface QuizScoreProps {
  state: QuizState;
}

export function QuizScore({ state }: QuizScoreProps) {
  const t = useTranslations("chordQuiz");
  const accuracy =
    state.totalAttempted > 0
      ? Math.round((state.totalCorrect / state.totalAttempted) * 100)
      : 0;

  return (
    <div className="flex items-center gap-6 text-sm">
      <div className="text-center">
        <div className="text-2xl font-bold text-zinc-100">{state.score}</div>
        <div className="text-xs text-zinc-500">{t("score")}</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-violet-400">{state.streak}</div>
        <div className="text-xs text-zinc-500">{t("streak")}</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-zinc-400">{state.bestStreak}</div>
        <div className="text-xs text-zinc-500">{t("best")}</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-zinc-400">{accuracy}%</div>
        <div className="text-xs text-zinc-500">{t("accuracy")}</div>
      </div>
    </div>
  );
}
