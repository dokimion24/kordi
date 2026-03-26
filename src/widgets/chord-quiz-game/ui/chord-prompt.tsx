"use client";

import { cn } from "@/shared/lib/utils";
import type { QuizChord, QuizResult } from "@/entities/chord-quiz";

interface ChordPromptProps {
  currentChord: QuizChord | null;
  nextChord: QuizChord | null;
  showNext: boolean;
  feedbackState: QuizResult;
}

export function ChordPrompt({
  currentChord,
  nextChord,
  showNext,
  feedbackState,
}: ChordPromptProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={cn(
          "flex h-28 w-48 items-center justify-center rounded-2xl border transition-all duration-200",
          feedbackState === "correct" &&
            "border-emerald-500 bg-emerald-500/10 shadow-[0_0_30px_rgba(16,185,129,0.3)]",
          feedbackState === "incorrect" &&
            "border-red-500 bg-red-500/10 shadow-[0_0_30px_rgba(239,68,68,0.3)]",
          feedbackState === "timeout" &&
            "border-amber-500 bg-amber-500/10",
          !feedbackState && "border-zinc-700 bg-zinc-900"
        )}
      >
        <span className="text-5xl font-bold tracking-tight text-zinc-100">
          {currentChord?.name ?? "-"}
        </span>
      </div>

      {showNext && nextChord && (
        <div className="text-sm text-zinc-500">
          Up next:{" "}
          <span className="font-medium text-zinc-400">{nextChord.name}</span>
        </div>
      )}
    </div>
  );
}
