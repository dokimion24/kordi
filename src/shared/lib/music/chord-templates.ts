export const CHORD_TEMPLATES: Record<string, number[]> = {
  "": [0, 4, 7], // major
  "m": [0, 3, 7], // minor
  "dim": [0, 3, 6], // diminished
  "aug": [0, 4, 8], // augmented
  "sus2": [0, 2, 7], // suspended 2nd
  "sus4": [0, 5, 7], // suspended 4th
  "7": [0, 4, 7, 10], // dominant 7th
  "maj7": [0, 4, 7, 11], // major 7th
  "m7": [0, 3, 7, 10], // minor 7th
  "dim7": [0, 3, 6, 9], // diminished 7th
  "m7b5": [0, 3, 6, 10], // half-diminished
  "aug7": [0, 4, 8, 10], // augmented 7th
};

export const NOTE_LABELS = [
  "C", "C#", "D", "D#", "E", "F",
  "F#", "G", "G#", "A", "A#", "B",
] as const;

export type ChordType = keyof typeof CHORD_TEMPLATES;
