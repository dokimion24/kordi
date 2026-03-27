"use client";

import { useCallback } from "react";
import { useActiveNotes, type ActiveNote } from "@/entities/note";
import { useKeyboardInput } from "./use-keyboard-input";
import { useMidiInput } from "./use-midi-input";
import { useSoundEngine } from "./use-sound-engine";

/**
 * Facade hook: wires up sound engine + keyboard + MIDI + mouse input.
 * Eliminates duplicated callback wrappers in piano-page and chord-quiz-page.
 */
export function usePianoInput() {
  const { activeNotes, noteOn, noteOff } = useActiveNotes();

  const { isAudioStarted, isLoaded, startAudio, handleNoteOn, handleNoteOff } =
    useSoundEngine({ noteOn, noteOff });

  // Source-specific handlers (Factory pattern)
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

  return {
    activeNotes,
    isAudioStarted,
    isLoaded,
    startAudio,
    keyboard: { octave, velocity, sustain },
    midi: { devices, selectedDevice, selectedDeviceId },
    mouse: { onNoteOn: mouseNoteOn, onNoteOff: mouseNoteOff },
  };
}
