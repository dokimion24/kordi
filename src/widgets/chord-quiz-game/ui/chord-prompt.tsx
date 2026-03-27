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
    <div className="flex flex-col items-center gap-3">
      <div
        className={cn(
          "glass flex h-28 w-48 items-center justify-center rounded-2xl transition-all duration-200",
          feedbackState === "correct" &&
            "border-success/40 bg-success/8 shadow-[0_0_25px_oklch(0.72_0.1_165/20%)]",
          feedbackState === "incorrect" &&
            "border-error/40 bg-error/8 shadow-[0_0_25px_oklch(0.65_0.12_20/20%)]",
          feedbackState === "timeout" &&
            "border-[oklch(0.7_0.08_80/30%)] bg-[oklch(0.7_0.08_80/5%)]"
        )}
      >
        <span
          className={cn(
            "text-5xl font-bold tracking-tight",
            feedbackState === "correct" && "text-success",
            feedbackState === "incorrect" && "text-error",
            !feedbackState && "neon-text"
          )}
        >
          {currentChord?.name ?? "-"}
        </span>
      </div>

      {showNext && nextChord && (
        <div className="text-sm text-muted-foreground">
          Up next:{" "}
          <span className="font-medium text-foreground/70">{nextChord.name}</span>
        </div>
      )}
    </div>
  );
}
