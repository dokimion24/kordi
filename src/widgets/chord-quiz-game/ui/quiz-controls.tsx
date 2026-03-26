"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/shared/ui/button";
import type { QuizStatus } from "@/entities/chord-quiz";

interface QuizControlsProps {
  status: QuizStatus;
  bpm: number;
  onStart: () => void;
  onStop: () => void;
  onPause: () => void;
  onResume: () => void;
  onSettingsOpen: () => void;
}

export function QuizControls({
  status,
  bpm,
  onStart,
  onStop,
  onPause,
  onResume,
  onSettingsOpen,
}: QuizControlsProps) {
  const t = useTranslations("chordQuiz");

  return (
    <div className="flex items-center gap-3">
      {status === "idle" && (
        <Button onClick={onStart} variant="default" size="lg">
          {t("start")}
        </Button>
      )}
      {status === "playing" && (
        <>
          <Button onClick={onPause} variant="outline" size="lg">
            {t("pause")}
          </Button>
          <Button onClick={onStop} variant="ghost" size="lg">
            {t("stop")}
          </Button>
        </>
      )}
      {status === "paused" && (
        <>
          <Button onClick={onResume} variant="default" size="lg">
            {t("resume")}
          </Button>
          <Button onClick={onStop} variant="ghost" size="lg">
            {t("stop")}
          </Button>
        </>
      )}

      <span className="ml-2 text-sm text-zinc-500">
        {bpm} BPM
      </span>

      {status === "idle" && (
        <Button onClick={onSettingsOpen} variant="ghost" size="icon">
          <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </Button>
      )}
    </div>
  );
}
