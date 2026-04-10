"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { DEFAULT_QUIZ_SETTINGS, type QuizSettings } from "@/entities/chord-quiz";
import { usePianoInput } from "@/features/piano-player";
import { useQuizGame } from "@/features/chord-quiz";
import { PianoKeyboard } from "@/widgets/piano-keyboard";
import {
  ChordPrompt,
  MetronomeDisplay,
  QuizScore,
  QuizControls,
  QuizSettingsPanel,
} from "@/widgets/chord-quiz-game";
import { AppHeader } from "@/widgets/app-header";
import { cn } from "@/shared/lib/utils";

export function ChordPracticePage() {
  const t = useTranslations("chordPractice");
  const [settings, setSettings] = useState<QuizSettings>(DEFAULT_QUIZ_SETTINGS);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const { activeNotes, isAudioStarted, isLoaded, startAudio, keyboard, midi, mouse } =
    usePianoInput();

  const { state, feedbackState, metronome, start, stop, pause, resume } =
    useQuizGame(settings, activeNotes);

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
      <div className="mb-2 flex w-full max-w-4xl justify-end px-4">
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

      {/* Idle: show inline settings */}
      {state.status === "idle" && (
        <div className="mb-6 w-full max-w-md px-4">
          <QuizSettingsPanel
            ns="chordPractice"
            settings={settings}
            onChange={setSettings}
            onClose={() => {}}
            isOpen={true}
            inline={true}
          />
        </div>
      )}

      {/* Playing/Paused */}
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
          ns="chordPractice"
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
        <div className="mb-4 text-sm text-muted-foreground">{t("loadingSamples")}</div>
      )}

      {/* Piano Keyboard with feedback glow */}
      <div
        className={cn(
          "w-full max-w-4xl rounded-lg px-4 transition-shadow duration-200",
          feedbackState === "correct" && "shadow-[0_0_25px_oklch(0.72_0.1_155/20%)]",
          feedbackState === "incorrect" && "shadow-[0_0_25px_oklch(0.65_0.12_20/20%)]"
        )}
      >
        <PianoKeyboard
          activeNotes={activeNotes}
          onNoteOn={mouse.onNoteOn}
          onNoteOff={mouse.onNoteOff}
          showShortcuts={true}
          octave={keyboard.octave}
        />
      </div>

      {/* Settings Panel (slide-out, only when playing/paused) */}
      {state.status !== "idle" && (
        <QuizSettingsPanel
          ns="chordPractice"
          settings={settings}
          onChange={setSettings}
          onClose={() => setSettingsOpen(false)}
          isOpen={settingsOpen}
        />
      )}
    </div>
  );
}
