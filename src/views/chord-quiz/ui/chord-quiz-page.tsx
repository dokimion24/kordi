"use client";

import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import { useActiveNotes } from "@/entities/note";
import { DEFAULT_QUIZ_SETTINGS, type QuizSettings } from "@/entities/chord-quiz";
import {
  useKeyboardInput,
  useMidiInput,
  useSoundEngine,
} from "@/features/piano-player";
import { useQuizGame } from "@/features/chord-quiz";
import { PianoKeyboard } from "@/widgets/piano-keyboard";
import {
  ChordPrompt,
  MetronomeDisplay,
  QuizScore,
  QuizControls,
  QuizSettingsPanel,
} from "@/widgets/chord-quiz-game";
import { cn } from "@/shared/lib/utils";

export function ChordQuizPage() {
  const t = useTranslations("chordQuiz");
  const tCommon = useTranslations("common");
  const [settings, setSettings] = useState<QuizSettings>(DEFAULT_QUIZ_SETTINGS);
  const [settingsOpen, setSettingsOpen] = useState(false);

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

  const { octave } = useKeyboardInput({
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

  const { state, feedbackState, metronome, start, stop, pause, resume } =
    useQuizGame(settings, activeNotes);

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
            <p className="text-lg font-semibold text-zinc-100">{t("clickToStart")}</p>
            <p className="mt-1 text-sm text-zinc-500">{t("audioDescription")}</p>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-950 pt-6">
      {/* Header */}
      <div className="mb-4 flex w-full max-w-4xl items-center justify-between px-4">
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

      {/* Idle: show inline settings */}
      {state.status === "idle" && (
        <div className="mb-6 w-full max-w-md px-4">
          <QuizSettingsPanel
            settings={settings}
            onChange={setSettings}
            onClose={() => {}}
            isOpen={true}
            inline={true}
          />
        </div>
      )}

      {/* Chord Prompt (playing/paused) */}
      {state.status !== "idle" && (
        <>
          <div className="mb-4">
            <ChordPrompt
              currentChord={state.currentChord}
              nextChord={state.nextChord}
              showNext={settings.showNextChord}
              feedbackState={feedbackState}
            />
          </div>

          {settings.metronomeVisualEnabled && (
            <div className="mb-4">
              <MetronomeDisplay
                beatsPerBar={metronome.beatsPerBar}
                currentBeat={metronome.currentBeat}
                isPlaying={metronome.isPlaying}
              />
            </div>
          )}

          <div className="mb-4">
            <QuizScore state={state} />
          </div>
        </>
      )}

      {/* Controls */}
      <div className="mb-6">
        <QuizControls
          status={state.status}
          bpm={settings.bpm}
          onStart={start}
          onStop={stop}
          onPause={pause}
          onResume={resume}
          onSettingsOpen={() => setSettingsOpen(true)}
        />
      </div>

      {/* Loading */}
      {!isLoaded && (
        <div className="mb-4 text-sm text-zinc-500">{t("loadingSamples")}</div>
      )}

      {/* Piano Keyboard with feedback glow */}
      <div
        className={cn(
          "w-full max-w-4xl rounded-lg px-4 transition-shadow duration-200",
          feedbackState === "correct" && "shadow-[0_0_30px_rgba(16,185,129,0.3)]",
          feedbackState === "incorrect" && "shadow-[0_0_30px_rgba(239,68,68,0.3)]"
        )}
      >
        <PianoKeyboard
          activeNotes={activeNotes}
          onNoteOn={mouseNoteOn}
          onNoteOff={mouseNoteOff}
          showShortcuts={true}
          octave={octave}
        />
      </div>

      {/* Settings Panel (slide-out, only when playing/paused) */}
      {state.status !== "idle" && (
        <QuizSettingsPanel
          settings={settings}
          onChange={setSettings}
          onClose={() => setSettingsOpen(false)}
          isOpen={settingsOpen}
        />
      )}
    </div>
  );
}
