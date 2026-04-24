"use client";

import { useTranslations } from "next-intl";
import type { QuizGameState } from "@/entities/quiz";
import { MonoCard } from "@/shared/ui/mono-card";
import { MonoButton } from "@/shared/ui/mono-button";
import { SectionHeader } from "@/shared/ui/section-header";

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
  const incorrectCount = state.questions.length - correctCount;

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-6 p-6">
      <SectionHeader as="h2" size="md">
        {t("result")}
      </SectionHeader>

      <div className="rounded-lg border border-black bg-black px-10 py-6 text-center text-white">
        <div className="font-heading text-5xl font-black tabular-nums">
          {state.totalScore}
        </div>
        <div className="mt-1 text-xs font-bold uppercase tracking-widest opacity-70">
          / 1000 {t("maxScore")}
        </div>
      </div>

      <div className="flex w-full gap-4">
        <StatBlock value={correctCount} label={t("correct")} />
        <StatBlock value={incorrectCount} label={t("incorrect")} />
      </div>

      <div className="w-full overflow-hidden rounded-lg border border-black">
        {state.questions.map((q, i) => (
          <div
            key={q.id}
            className="flex items-center justify-between border-b border-black px-4 py-2 last:border-b-0"
          >
            <div className="flex items-center gap-3">
              <span className="text-xs tabular-nums opacity-60">{i + 1}</span>
              <span className="font-bold text-black">{q.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">
                {t(state.answers[i] ?? "timeout")}
              </span>
              <span className="font-heading font-bold tabular-nums text-black">
                {state.scores[i] ?? 0}
              </span>
            </div>
          </div>
        ))}
      </div>

      {isSaving && <p className="text-sm opacity-60">{t("saving")}</p>}
      {isSaved && (
        <p className="text-xs font-bold uppercase tracking-widest text-black">
          {t("saved")}
        </p>
      )}

      <div className="flex gap-3">
        <MonoButton variant="solid" size="lg" onClick={onRetry}>
          {t("retry")}
        </MonoButton>
        <MonoButton variant="outline" size="lg" onClick={onBackToSelect}>
          {t("backToSelect")}
        </MonoButton>
      </div>
    </div>
  );
}

function StatBlock({ value, label }: { value: number; label: string }) {
  return (
    <MonoCard className="flex-1 px-4 py-3 text-center">
      <div className="font-heading text-2xl font-black tabular-nums">
        {value}
      </div>
      <div className="text-[11px] font-bold uppercase tracking-widest opacity-70">
        {label}
      </div>
    </MonoCard>
  );
}
