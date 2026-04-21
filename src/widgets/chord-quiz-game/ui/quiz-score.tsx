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
    <div className="glass flex items-center gap-6 rounded-xl px-6 py-3 text-sm">
      <div className="text-center">
        <div className="neon-text text-2xl font-bold">{state.score}</div>
        <div className="text-xs text-muted-foreground">{t("score")}</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-primary">{state.streak}</div>
        <div className="text-xs text-muted-foreground">{t("streak")}</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-foreground/60">{state.bestStreak}</div>
        <div className="text-xs text-muted-foreground">{t("best")}</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-foreground/60">{accuracy}%</div>
        <div className="text-xs text-muted-foreground">{t("accuracy")}</div>
      </div>
    </div>
  );
}
