"use client";

import { cn } from "@/shared/lib/utils";

interface MetronomeDisplayProps {
  beatsPerBar: number;
  currentBeat: number;
  isPlaying: boolean;
}

export function MetronomeDisplay({
  beatsPerBar,
  currentBeat,
  isPlaying,
}: MetronomeDisplayProps) {
  if (!isPlaying) return null;

  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: beatsPerBar }, (_, i) => (
        <div
          key={i}
          className={cn(
            "size-3 rounded-full transition-all duration-100",
            i === currentBeat
              ? i === 0
                ? "scale-125 bg-violet-400 shadow-[0_0_8px_rgba(139,92,246,0.6)]"
                : "scale-110 bg-zinc-300"
              : "bg-zinc-700"
          )}
        />
      ))}
    </div>
  );
}
