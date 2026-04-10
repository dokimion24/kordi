"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/shared/lib/utils";

interface SpeechBubbleProps {
  messages: string[];
  interval?: number;
  typingSpeed?: number;
  className?: string;
}

export function SpeechBubble({
  messages,
  interval = 5000,
  typingSpeed = 50,
  className,
}: SpeechBubbleProps) {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * messages.length));
  const [displayed, setDisplayed] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const message = messages[index];
    let charIndex = 0;
    setDisplayed("");
    setIsTyping(true);

    const type = () => {
      if (charIndex <= message.length) {
        setDisplayed(message.slice(0, charIndex));
        charIndex++;
        timeoutRef.current = setTimeout(type, typingSpeed);
      } else {
        setIsTyping(false);
        timeoutRef.current = setTimeout(() => {
          setIndex((prev) => {
            let next;
            do {
              next = Math.floor(Math.random() * messages.length);
            } while (next === prev && messages.length > 1);
            return next;
          });
        }, interval);
      }
    };

    type();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [index, messages, interval, typingSpeed]);

  return (
    <div
      className={cn(
        "glass relative rounded-2xl px-4 py-2.5 text-sm text-foreground",
        className,
      )}
    >
      {displayed}
      {isTyping && (
        <span className="ml-0.5 inline-block h-4 w-[2px] animate-pulse bg-foreground align-middle" />
      )}
      {/* Tail - points down to mascot */}
      <div className="absolute -bottom-1.5 left-8 size-3 rotate-45 border-b border-r border-glass-border bg-[var(--glass)]" />
    </div>
  );
}
