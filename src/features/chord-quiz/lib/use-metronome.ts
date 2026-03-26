"use client";

import { useCallback, useRef, useState } from "react";
import * as Tone from "tone";
import type { TimeSignature } from "@/entities/chord-quiz";

function getBeatsPerBar(ts: TimeSignature): number {
  switch (ts) {
    case "4/4": return 4;
    case "3/4": return 3;
    case "2/4": return 2;
    case "6/8": return 6;
  }
}

function getSubdivision(ts: TimeSignature): string {
  return ts === "6/8" ? "8n" : "4n";
}

interface UseMetronomeOptions {
  bpm: number;
  timeSignature: TimeSignature;
  audioEnabled: boolean;
  onBeat?: (beat: number, isDownbeat: boolean) => void;
  onBarComplete?: (barCount: number) => void;
}

export function useMetronome({
  bpm,
  timeSignature,
  audioEnabled,
  onBeat,
  onBarComplete,
}: UseMetronomeOptions) {
  const [currentBeat, setCurrentBeat] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const synthRef = useRef<Tone.Synth | null>(null);
  const eventIdRef = useRef<number | null>(null);
  const barCountRef = useRef(0);
  const onBeatRef = useRef(onBeat);
  const onBarCompleteRef = useRef(onBarComplete);
  onBeatRef.current = onBeat;
  onBarCompleteRef.current = onBarComplete;

  const start = useCallback(() => {
    const beatsPerBar = getBeatsPerBar(timeSignature);
    const subdivision = getSubdivision(timeSignature);
    const transport = Tone.getTransport();

    transport.bpm.value = timeSignature === "6/8" ? bpm * 1.5 : bpm;
    transport.cancel();

    if (audioEnabled && !synthRef.current) {
      synthRef.current = new Tone.Synth({
        oscillator: { type: "triangle" },
        envelope: { attack: 0.001, decay: 0.1, sustain: 0, release: 0.1 },
        volume: -10,
      }).toDestination();
    }

    let beatIndex = 0;
    barCountRef.current = 0;

    eventIdRef.current = transport.scheduleRepeat(
      (time) => {
        const beatInBar = beatIndex % beatsPerBar;
        const isDownbeat = beatInBar === 0;

        if (audioEnabled && synthRef.current) {
          synthRef.current.triggerAttackRelease(
            isDownbeat ? "C6" : "C5",
            "32n",
            time
          );
        }

        Tone.getDraw().schedule(() => {
          setCurrentBeat(beatInBar);
          onBeatRef.current?.(beatInBar, isDownbeat);

          if (beatIndex > 0 && isDownbeat) {
            barCountRef.current++;
            onBarCompleteRef.current?.(barCountRef.current);
          }
        }, time);

        beatIndex++;
      },
      subdivision
    );

    transport.start();
    setIsPlaying(true);
  }, [bpm, timeSignature, audioEnabled]);

  const stop = useCallback(() => {
    const transport = Tone.getTransport();
    transport.stop();
    transport.cancel();
    if (synthRef.current) {
      synthRef.current.dispose();
      synthRef.current = null;
    }
    eventIdRef.current = null;
    barCountRef.current = 0;
    setCurrentBeat(-1);
    setIsPlaying(false);
  }, []);

  const beatsPerBar = getBeatsPerBar(timeSignature);

  return { currentBeat, isPlaying, beatsPerBar, start, stop };
}
