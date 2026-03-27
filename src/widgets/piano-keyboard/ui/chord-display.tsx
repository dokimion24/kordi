"use client";

import type { ActiveNote } from "@/entities/note";
import { detectChord } from "@/shared/lib/music";

interface ChordDisplayProps {
  activeNotes: ActiveNote[];
}

export function ChordDisplay({ activeNotes }: ChordDisplayProps) {
  const chord = detectChord(activeNotes.map((n) => n.midi));

  if (!chord) {
    return (
      <div className="flex h-16 items-center justify-center">
        <span className="text-lg text-muted-foreground/40">-</span>
      </div>
    );
  }

  return (
    <div className="flex h-16 items-center justify-center">
      <span className="neon-text text-3xl font-bold tracking-wide">
        {chord}
      </span>
    </div>
  );
}
