"use client";

import { useCallback, useRef, useState } from "react";
import type { ActiveNote } from "./types";

export function useActiveNotes() {
  const notesMap = useRef(new Map<number, ActiveNote>());
  const [activeNotes, setActiveNotes] = useState<ActiveNote[]>([]);

  const syncState = useCallback(() => {
    setActiveNotes([...notesMap.current.values()]);
  }, []);

  const noteOn = useCallback(
    (midi: number, velocity: number, source: ActiveNote["source"]) => {
      notesMap.current.set(midi, { midi, velocity, source });
      syncState();
    },
    [syncState]
  );

  const noteOff = useCallback(
    (midi: number) => {
      notesMap.current.delete(midi);
      syncState();
    },
    [syncState]
  );

  const allNotesOff = useCallback(() => {
    notesMap.current.clear();
    syncState();
  }, [syncState]);

  return { activeNotes, noteOn, noteOff, allNotesOff };
}
