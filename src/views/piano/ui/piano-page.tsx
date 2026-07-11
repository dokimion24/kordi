"use client";

import { usePianoInput, InstrumentSelector } from "@/features/piano-player";
import {
  AudioStartPrompt,
  ChordDisplay,
  MidiStatus,
  PianoKeyboard,
} from "@/widgets/piano-keyboard";
import { useTranslations } from "next-intl";

export function PianoPage() {
  const t = useTranslations("piano");

  const {
    activeNotes,
    isAudioStarted,
    isLoaded,
    startAudio,
    keyboard,
    midi,
    mouse,
  } = usePianoInput();

  if (!isAudioStarted) {
    return (
      <AudioStartPrompt
        title={t("clickToStart")}
        description={t("audioDescription")}
        onStart={startAudio}
      />
    );
  }

  return (
    <main className="flex flex-1 flex-col items-center p-6">
      <MidiStatus
        midiName={midi.selectedDevice?.name}
        fallback={t("noMidiDevice")}
      />

      <div className="mb-4 w-full max-w-4xl">
        <InstrumentSelector />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center">
        <ChordDisplay activeNotes={activeNotes} />

        {!isLoaded && (
          <div className="mt-4 text-sm opacity-60">{t("loadingSamples")}</div>
        )}
      </div>

      <div className="mb-12 w-full max-w-4xl">
        <KeyboardStatusBar
          octave={keyboard.octave}
          velocity={keyboard.velocity}
          sustain={keyboard.sustain}
        />

        <PianoKeyboard
          activeNotes={activeNotes}
          onNoteOn={mouse.onNoteOn}
          onNoteOff={mouse.onNoteOff}
          showShortcuts
          octave={keyboard.octave}
        />
      </div>

      <div className="mt-8 text-center text-xs opacity-60">
        <p>{t("instructions")}</p>
      </div>
    </main>
  );
}

function KeyboardStatusBar({
  octave,
  velocity,
  sustain,
}: {
  octave: number;
  velocity: number;
  sustain: boolean;
}) {
  return (
    <div className="mb-4 flex items-center justify-end gap-3 text-xs">
      <span className="rounded-lg border border-black bg-white px-2.5 py-1 font-bold uppercase">
        Oct: <span className="font-black">{octave}</span>
        <span className="ml-1 opacity-40">[Z/X]</span>
      </span>
      <span className="rounded-lg border border-black bg-white px-2.5 py-1 font-bold uppercase">
        Vel: <span className="font-black">{velocity}</span>
        <span className="ml-1 opacity-40">[C/V]</span>
      </span>
      <span
        className={`rounded-lg border border-black px-2.5 py-1 font-bold uppercase transition-colors ${
          sustain ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        Sustain {sustain ? "ON" : "OFF"}
        <span className="ml-1 opacity-40">[Tab]</span>
      </span>
    </div>
  );
}
