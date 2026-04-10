"use client";

import { useTranslations } from "next-intl";
import type { QuizStatus } from "@/entities/chord-quiz";

interface QuizControlsProps {
  ns: string;
  status: QuizStatus;
  bpm: number;
  onStart: () => void;
  onStop: () => void;
  onPause: () => void;
  onResume: () => void;
  onSettingsOpen: () => void;
}

export function QuizControls({
  ns,
  status,
  bpm,
  onStart,
  onStop,
  onPause,
  onResume,
  onSettingsOpen,
}: QuizControlsProps) {
  const t = useTranslations(ns);

  return (
    <div className="flex items-center gap-3">
      {status === "idle" && (
        <button
          onClick={onStart}
          className="rounded-xl bg-neon/15 px-6 py-2.5 text-sm font-medium text-neon transition-all duration-200 hover:bg-neon/25 hover:shadow-[0_0_15px_var(--neon-glow)]"
        >
          {t("start")}
        </button>
      )}
      {status === "playing" && (
        <>
          <button
            onClick={onPause}
            className="glass glass-hover rounded-xl px-5 py-2 text-sm font-medium text-foreground transition-all duration-200"
          >
            {t("pause")}
          </button>
          <button
            onClick={onStop}
            className="rounded-xl px-5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("stop")}
          </button>
        </>
      )}
      {status === "paused" && (
        <>
          <button
            onClick={onResume}
            className="rounded-xl bg-neon/15 px-5 py-2 text-sm font-medium text-neon transition-all duration-200 hover:bg-neon/25"
          >
            {t("resume")}
          </button>
          <button
            onClick={onStop}
            className="rounded-xl px-5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("stop")}
          </button>
        </>
      )}

      {status === "idle" && (
        <button
          onClick={onSettingsOpen}
          className="glass glass-hover rounded-xl p-2 text-muted-foreground transition-all duration-200 hover:text-foreground"
        >
          <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      )}
    </div>
  );
}
