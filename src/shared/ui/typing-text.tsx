"use client";

import { useEffect, useState } from "react";
import { cn } from "@/shared/lib/utils";

interface TypingTextProps {
  texts: string[];
  speed?: number;
  pauseAfter?: number;
  className?: string;
}

export function TypingText({
  texts,
  speed = 70,
  pauseAfter = 3000,
  className,
}: TypingTextProps) {
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (texts.length === 0) return;
    const text = texts[index % texts.length];
    let charIndex = 0;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    setDisplayed("");

    const tick = () => {
      if (charIndex <= text.length) {
        setDisplayed(text.slice(0, charIndex));
        charIndex += 1;
        timeoutId = setTimeout(tick, speed);
        return;
      }
      timeoutId = setTimeout(() => {
        setIndex((prev) => (prev + 1) % texts.length);
      }, pauseAfter);
    };

    tick();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [texts, index, speed, pauseAfter]);

  return (
    <span className={cn("whitespace-pre-line", className)}>
      {displayed}
      <span
        aria-hidden
        className="ml-0.5 inline-block h-[1em] w-[2px] -mb-[2px] bg-current animate-pulse align-text-bottom"
      />
    </span>
  );
}
