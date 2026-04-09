"use client";

import { useTranslations } from "next-intl";
import type { QuizGameState } from "@/entities/quiz";
import { cn } from "@/shared/lib/utils";

interface QuizResultProps {
  state: QuizGameState;
  isSaving: boolean;
  isSaved: boolean;
  onRetry: () => void;
  onBackToSelect: () => void;
}

export function QuizResult({
  state,
  isSaving,
  isSaved,
  onRetry,
  onBackToSelect,
}: QuizResultProps) {
  const t = useTranslations("chordQuiz");
  const correctCount = state.answers.filter((a) => a === "correct").length;

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-6">
      <h2 className="text-xl font-semibold text-foreground">{t("result")}</h2>

      {/* Total score */}
      <div className="glass rounded-2xl px-10 py-6 text-center">
        <div className="text-4xl font-bold text-neon">{state.totalScore}</div>
        <div className="mt-1 text-sm text-muted-foreground">
          / 1000 {t("maxScore")}
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-4">
        <div className="glass rounded-xl px-4 py-2 text-center">
          <div className="text-lg font-bold text-success">{correctCount}</div>
          <div className="text-xs text-muted-foreground">{t("correct")}</div>
        </div>
        <div className="glass rounded-xl px-4 py-2 text-center">
          <div className="text-lg font-bold text-destructive">
            {state.questions.length - correctCount}
          </div>
          <div className="text-xs text-muted-foreground">{t("incorrect")}</div>
        </div>
      </div>

      {/* Per-question results */}
      <div className="w-full space-y-2">
        {state.questions.map((q, i) => (
          <div
            key={q.id}
            className="glass flex items-center justify-between rounded-lg px-4 py-2"
          >
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">{i + 1}</span>
              <span className="font-medium text-foreground">{q.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "text-xs",
                  state.answers[i] === "correct"
                    ? "text-success"
                    : state.answers[i] === "timeout"
                      ? "text-warning"
                      : "text-destructive",
                )}
              >
                {t(state.answers[i] ?? "timeout")}
              </span>
              <span className="font-medium tabular-nums text-foreground">
                {state.scores[i] ?? 0}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Save status */}
      {isSaving && (
        <p className="text-sm text-muted-foreground">{t("saving")}</p>
      )}
      {isSaved && <p className="text-sm text-success">{t("saved")}</p>}

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={onRetry}
          className="glass glass-hover rounded-xl px-6 py-3 font-medium text-neon transition-all hover:neon-glow-sm"
        >
          {t("retry")}
        </button>
        <button
          onClick={onBackToSelect}
          className="glass glass-hover rounded-xl px-6 py-3 font-medium text-muted-foreground transition-all"
        >
          {t("backToSelect")}
        </button>
      </div>
    </div>
  );
}
