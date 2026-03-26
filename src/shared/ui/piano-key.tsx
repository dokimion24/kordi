"use client";

import { memo, useCallback } from "react";
import { cn } from "@/shared/lib/utils";

interface PianoKeyProps {
  midi: number;
  isBlack: boolean;
  isActive: boolean;
  keyboardShortcut?: string;
  noteName: string;
  onNoteOn: (midi: number) => void;
  onNoteOff: (midi: number) => void;
}

export const PianoKey = memo(function PianoKey({
  midi,
  isBlack,
  isActive,
  keyboardShortcut,
  noteName,
  onNoteOn,
  onNoteOff,
}: PianoKeyProps) {
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      onNoteOn(midi);
    },
    [midi, onNoteOn]
  );

  const handlePointerUp = useCallback(() => {
    onNoteOff(midi);
  }, [midi, onNoteOff]);

  const handlePointerEnter = useCallback(
    (e: React.PointerEvent) => {
      if (e.buttons > 0) {
        onNoteOn(midi);
      }
    },
    [midi, onNoteOn]
  );

  const handlePointerLeave = useCallback(
    (e: React.PointerEvent) => {
      if (e.buttons > 0) {
        onNoteOff(midi);
      }
    },
    [midi, onNoteOff]
  );

  if (isBlack) {
    return (
      <button
        role="button"
        aria-label={noteName}
        data-active={isActive || undefined}
        className={cn(
          "flex flex-col items-center justify-end",
          "h-[60%] w-full rounded-b-md",
          "bg-zinc-900 border border-zinc-800",
          "transition-all duration-50",
          "hover:bg-zinc-800",
          "data-[active]:bg-violet-500 data-[active]:shadow-[0_0_12px_rgba(139,92,246,0.5)]",
          "touch-none select-none cursor-pointer"
        )}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        {keyboardShortcut && (
          <span className="mb-1 text-[9px] font-mono text-zinc-500 data-[active]:text-white">
            {keyboardShortcut}
          </span>
        )}
      </button>
    );
  }

  return (
    <button
      role="button"
      aria-label={noteName}
      data-active={isActive || undefined}
      className={cn(
        "relative flex flex-col items-center justify-end",
        "h-full flex-1 rounded-b-lg",
        "bg-zinc-100 border border-zinc-300",
        "transition-all duration-50",
        "hover:bg-zinc-200",
        "data-[active]:bg-violet-200 data-[active]:shadow-[0_0_16px_rgba(139,92,246,0.3)]",
        "touch-none select-none cursor-pointer"
      )}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      {keyboardShortcut && (
        <span className="mb-2 text-[10px] font-mono text-zinc-400">
          {keyboardShortcut}
        </span>
      )}
    </button>
  );
});
