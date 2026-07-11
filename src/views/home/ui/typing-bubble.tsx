"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { TypingText } from "@/shared/ui/typing-text";

const TIPS_COUNT = 57;

export function TypingBubble() {
  const t = useTranslations("home");

  const tips = useMemo(
    () => Array.from({ length: TIPS_COUNT }, (_, i) => t(`tips_${i}`)),
    [t],
  );

  return (
    <div className="relative max-w-[220px]">
      <div className="min-h-[3.5rem] rounded-2xl border-2 border-black bg-white px-4 py-3 text-sm font-semibold leading-snug">
        <TypingText texts={tips} />
      </div>
      <div className="absolute -right-[10px] top-1/2 -translate-y-1/2 h-0 w-0 border-y-[8px] border-l-[10px] border-y-transparent border-l-black" />
      <div className="absolute -right-[8px] top-1/2 -translate-y-1/2 h-0 w-0 border-y-[6px] border-l-[10px] border-y-transparent border-l-white" />
    </div>
  );
}
