"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/shared/lib/utils";

type ChordFeedback = "correct" | "incorrect" | "timeout" | null;

interface ChordPromptProps {
  ns: string;
  chordName: string | null;
  nextChordName?: string | null;
  showNext?: boolean;
  feedbackState: ChordFeedback;
}

export function ChordPrompt({
  ns,
  chordName,
  nextChordName = null,
  showNext = false,
  feedbackState,
}: ChordPromptProps) {
  const t = useTranslations(ns);
  const isInvert = feedbackState === "correct";

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className={cn(
          "flex h-28 min-w-48 items-center justify-center rounded-lg border border-black px-8 transition-all duration-200",
          isInvert ? "bg-black text-white" : "bg-white text-black",
          feedbackState === "incorrect" && "ring-2 ring-black ring-offset-2",
          feedbackState === "timeout" && "opacity-60",
        )}
      >
        <span className="font-heading text-5xl font-black tracking-tight tabular-nums">
          {chordName ?? "-"}
        </span>
      </div>

      {showNext && nextChordName && (
        <div className="text-xs font-bold uppercase tracking-widest opacity-60">
          {t("upNext")}:{" "}
          <span className="font-black text-black">{nextChordName}</span>
        </div>
      )}
    </div>
  );
}
