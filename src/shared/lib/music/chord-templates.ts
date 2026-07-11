export const CHORD_TEMPLATES: Record<string, number[]> = {
  // 3음 — triads
  "": [0, 4, 7], // major
  "m": [0, 3, 7], // minor
  "dim": [0, 3, 6], // diminished
  "aug": [0, 4, 8], // augmented
  "sus2": [0, 2, 7], // suspended 2nd
  "sus4": [0, 5, 7], // suspended 4th
  "5": [0, 7], // power chord

  // 4음 — sevenths / sixths / adds
  "maj7": [0, 4, 7, 11], // major 7th
  "7": [0, 4, 7, 10], // dominant 7th
  "m7": [0, 3, 7, 10], // minor 7th
  "mMaj7": [0, 3, 7, 11], // minor major 7th
  "dim7": [0, 3, 6, 9], // diminished 7th
  "dim(maj7)": [0, 3, 6, 11], // diminished major 7th
  "m7b5": [0, 3, 6, 10], // half-diminished
  "+Maj7": [0, 4, 8, 11], // augmented major 7th
  "7#5": [0, 4, 8, 10], // 7#5 (augmented dominant 7th)
  "7b5": [0, 4, 6, 10], // 7b5
  "7sus4": [0, 5, 7, 10], // 7th sus4
  "6": [0, 4, 7, 9], // major 6th
  "m6": [0, 3, 7, 9], // minor 6th
  "add9": [0, 2, 4, 7], // add9
  "madd9": [0, 2, 3, 7], // minor add9

  // 5음 — ninths / 6/9 / altered 7
  "maj9": [0, 4, 7, 11, 2], // major 9th
  "9": [0, 4, 7, 10, 2], // dominant 9th
  "m9": [0, 3, 7, 10, 2], // minor 9th
  "m(maj9)": [0, 3, 7, 11, 2], // minor major 9th
  "6/9": [0, 4, 7, 9, 2], // 6/9
  "m6/9": [0, 3, 7, 9, 2], // minor 6/9
  "9sus4": [0, 5, 7, 10, 2], // 9sus4
  "9#5": [0, 4, 8, 10, 2], // 9#5
  "9b5": [0, 4, 6, 10, 2], // 9b5
  "7#9": [0, 4, 7, 10, 3], // 7#9
  "7b9": [0, 4, 7, 10, 1], // 7b9
  "7#11": [0, 4, 7, 10, 6], // 7#11
  "maj7#11": [0, 4, 7, 11, 6], // maj7#11

  // 6음 — elevenths / 9#11 / alt
  "maj9#11": [0, 4, 7, 11, 2, 6], // maj9#11
  "9#11": [0, 4, 7, 10, 2, 6], // 9#11
  "11": [0, 4, 7, 10, 2, 5], // dominant 11th
  "m11": [0, 3, 7, 10, 2, 5], // minor 11th
  "13sus4": [0, 5, 7, 10, 2, 9], // 13sus4
  "13b9": [0, 4, 7, 10, 1, 9], // 13b9
  "13#9": [0, 4, 7, 10, 3, 9], // 13#9
  "7alt": [0, 4, 8, 10, 1, 3], // 7alt (1, 3, #5, b7, b9, #9)

  // 7음 — thirteenths (구체 → 일반 순)
  "maj13#11": [0, 4, 7, 11, 2, 6, 9], // maj13#11
  "maj13": [0, 4, 7, 11, 2, 5, 9], // major 13th
  "13#11": [0, 4, 7, 10, 2, 6, 9], // 13#11
  "13": [0, 4, 7, 10, 2, 5, 9], // dominant 13th
  "m13": [0, 3, 7, 10, 2, 5, 9], // minor 13th
};

export const NOTE_LABELS = [
  "C", "C#", "D", "D#", "E", "F",
  "F#", "G", "G#", "A", "A#", "B",
] as const;

export type ChordType = keyof typeof CHORD_TEMPLATES;
