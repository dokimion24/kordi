"use client";

import { useTranslations } from "next-intl";
import { usePianoInput } from "@/features/piano-player";
import { PianoKeyboard, ChordDisplay } from "@/widgets/piano-keyboard";
import { AppHeader } from "@/widgets/app-header";
import { InstrumentSelector } from "@/shared/ui/instrument-selector";

export function PianoPage() {
  const t = useTranslations("piano");

  const { activeNotes, isAudioStarted, isLoaded, startAudio, keyboard, midi, mouse } =
    usePianoInput();

  if (!isAudioStarted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <button
          onClick={startAudio}
          className="glass glass-hover group flex flex-col items-center gap-4 rounded-2xl px-12 py-10 transition-all duration-300 hover:neon-glow"
        >
          <div className="flex size-16 items-center justify-center rounded-full bg-neon/10">
            <svg
              className="size-8 text-neon transition-transform group-hover:scale-110"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
              />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-foreground">{t("clickToStart")}</p>
            <p className="mt-1 text-sm text-muted-foreground">{t("audioDescription")}</p>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center">
      <AppHeader showBack />

      {/* MIDI Status */}
      <div className="mb-4 flex w-full max-w-4xl justify-end px-4">
        {midi.selectedDevice ? (
          <span className="glass flex items-center gap-1.5 rounded-full px-3 py-1 text-xs text-neon">
            <span className="size-1.5 rounded-full bg-neon" />
            {midi.selectedDevice.name}
          </span>
        ) : (
          <span className="glass flex items-center gap-1.5 rounded-full px-3 py-1 text-xs text-muted-foreground">
            <span className="size-1.5 rounded-full bg-muted-foreground" />
            {t("noMidiDevice")}
          </span>
        )}
      </div>

      {/* Instrument Selector */}
      <div className="mb-4 w-full max-w-4xl px-4">
        <InstrumentSelector />
      </div>

      {/* Chord Display */}
      <ChordDisplay activeNotes={activeNotes} />

      {/* Loading */}
      {!isLoaded && (
        <div className="mb-4 text-sm text-muted-foreground">{t("loadingSamples")}</div>
      )}

      {/* Controls */}
      <div className="mb-4 flex items-center gap-3 text-xs">
        <span className="glass rounded-lg px-2.5 py-1 text-muted-foreground">
          Oct: <span className="text-foreground">{keyboard.octave}</span>
          <span className="ml-1 opacity-40">[Z/X]</span>
        </span>
        <span className="glass rounded-lg px-2.5 py-1 text-muted-foreground">
          Vel: <span className="text-foreground">{keyboard.velocity}</span>
          <span className="ml-1 opacity-40">[C/V]</span>
        </span>
        <span
          className={`rounded-lg px-2.5 py-1 ${
            keyboard.sustain
              ? "glass neon-border text-neon"
              : "glass text-muted-foreground"
          }`}
        >
          Sustain {keyboard.sustain ? "ON" : "OFF"}
          <span className="ml-1 opacity-40">[Tab]</span>
        </span>
      </div>

      {/* Piano Keyboard */}
      <div className="w-full max-w-4xl px-4">
        <PianoKeyboard
          activeNotes={activeNotes}
          onNoteOn={mouse.onNoteOn}
          onNoteOff={mouse.onNoteOff}
          showShortcuts={true}
          octave={keyboard.octave}
        />
      </div>

      {/* Instructions */}
      <div className="mt-8 text-center text-xs text-muted-foreground/60">
        <p>{t("instructions")}</p>
      </div>
    </div>
  );
}
