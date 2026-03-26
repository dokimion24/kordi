"use client";

import { useCallback } from "react";
import { useTranslations } from "next-intl";
import { useActiveNotes } from "@/entities/note";
import type { ActiveNote } from "@/entities/note";
import {
  useKeyboardInput,
  useMidiInput,
  useSoundEngine,
} from "@/features/piano-player";
import { PianoKeyboard, ChordDisplay } from "@/widgets/piano-keyboard";

export function PianoPage() {
  const t = useTranslations("piano");
  const tCommon = useTranslations("common");
  const { activeNotes, noteOn, noteOff } = useActiveNotes();

  const { isAudioStarted, isLoaded, startAudio, handleNoteOn, handleNoteOff } =
    useSoundEngine({ noteOn, noteOff });

  const keyboardNoteOn = useCallback(
    (midi: number, velocity: number) => handleNoteOn(midi, velocity, "keyboard"),
    [handleNoteOn]
  );
  const keyboardNoteOff = useCallback(
    (midi: number) => handleNoteOff(midi, "keyboard"),
    [handleNoteOff]
  );

  const { octave, velocity, sustain } = useKeyboardInput({
    onNoteOn: keyboardNoteOn,
    onNoteOff: keyboardNoteOff,
    enabled: isAudioStarted,
  });

  const midiNoteOn = useCallback(
    (midi: number, velocity: number) => handleNoteOn(midi, velocity, "midi"),
    [handleNoteOn]
  );
  const midiNoteOff = useCallback(
    (midi: number) => handleNoteOff(midi, "midi"),
    [handleNoteOff]
  );

  const { devices, selectedDeviceId } = useMidiInput({
    onNoteOn: midiNoteOn,
    onNoteOff: midiNoteOff,
    enabled: isAudioStarted,
  });

  const mouseNoteOn = useCallback(
    (midi: number) => handleNoteOn(midi, 0.8, "mouse"),
    [handleNoteOn]
  );
  const mouseNoteOff = useCallback(
    (midi: number) => handleNoteOff(midi, "mouse"),
    [handleNoteOff]
  );

  const selectedDevice = devices.find((d) => d.id === selectedDeviceId);

  // Audio start overlay
  if (!isAudioStarted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950">
        <button
          onClick={startAudio}
          className="group flex flex-col items-center gap-4 rounded-2xl border border-zinc-800 bg-zinc-900 px-12 py-10 transition-all hover:border-violet-500/50 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]"
        >
          <div className="flex size-16 items-center justify-center rounded-full bg-violet-500/10">
            <svg
              className="size-8 text-violet-400 transition-transform group-hover:scale-110"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
              />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-zinc-100">
              {t("clickToStart")}
            </p>
            <p className="mt-1 text-sm text-zinc-500">
              {t("audioDescription")}
            </p>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-950 pt-8">
      {/* Header */}
      <div className="mb-8 flex w-full max-w-4xl items-center justify-between px-4">
        <h1 className="text-xl font-bold text-zinc-100">{tCommon("appName")}</h1>
        <div className="flex items-center gap-2">
          {selectedDevice ? (
            <span className="flex items-center gap-1.5 rounded-full bg-violet-500/10 px-3 py-1 text-xs text-violet-400">
              <span className="size-1.5 rounded-full bg-violet-400" />
              {selectedDevice.name}
            </span>
          ) : (
            <span className="flex items-center gap-1.5 rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-500">
              <span className="size-1.5 rounded-full bg-zinc-600" />
              {t("noMidiDevice")}
            </span>
          )}
        </div>
      </div>

      {/* Chord Display */}
      <ChordDisplay activeNotes={activeNotes} />

      {/* Loading indicator */}
      {!isLoaded && (
        <div className="mb-4 text-sm text-zinc-500">{t("loadingSamples")}</div>
      )}

      {/* Controls */}
      <div className="mb-4 flex items-center gap-4 text-xs text-zinc-500">
        <span className="rounded bg-zinc-800 px-2 py-1">
          Oct: <span className="text-zinc-300">{octave}</span>
          <span className="ml-1 text-zinc-600">[Z/X]</span>
        </span>
        <span className="rounded bg-zinc-800 px-2 py-1">
          Vel: <span className="text-zinc-300">{velocity}</span>
          <span className="ml-1 text-zinc-600">[C/V]</span>
        </span>
        <span
          className={`rounded px-2 py-1 ${
            sustain
              ? "bg-violet-500/20 text-violet-400"
              : "bg-zinc-800 text-zinc-500"
          }`}
        >
          Sustain {sustain ? "ON" : "OFF"}
          <span className="ml-1 text-zinc-600">[Tab]</span>
        </span>
      </div>

      {/* Piano Keyboard */}
      <div className="w-full max-w-4xl px-4">
        <PianoKeyboard
          activeNotes={activeNotes}
          onNoteOn={mouseNoteOn}
          onNoteOff={mouseNoteOff}
          showShortcuts={true}
          octave={octave}
        />
      </div>

      {/* Instructions */}
      <div className="mt-8 text-center text-xs text-zinc-600">
        <p>{t("instructions")}</p>
      </div>
    </div>
  );
}
