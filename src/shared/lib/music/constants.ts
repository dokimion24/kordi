export const NOTE_NAMES = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
] as const;

export type NoteName = (typeof NOTE_NAMES)[number];
export type NoteWithOctave = `${NoteName}${number}`;

export const OCTAVE_SIZE = 12;
export const MIDI_MIN = 21; // A0
export const MIDI_MAX = 108; // C8
