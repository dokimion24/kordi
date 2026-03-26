import {
  NOTE_NAMES,
  OCTAVE_SIZE,
  type NoteWithOctave,
} from "./constants";

export function midiToNoteName(midi: number): NoteWithOctave {
  const octave = Math.floor(midi / OCTAVE_SIZE) - 1;
  const noteIndex = midi % OCTAVE_SIZE;
  return `${NOTE_NAMES[noteIndex]}${octave}` as NoteWithOctave;
}

export function noteNameToMidi(note: NoteWithOctave): number {
  const match = note.match(/^([A-G]#?)(-?\d+)$/);
  if (!match) throw new Error(`Invalid note: ${note}`);
  const [, name, octaveStr] = match;
  const noteIndex = NOTE_NAMES.indexOf(name as (typeof NOTE_NAMES)[number]);
  if (noteIndex === -1) throw new Error(`Invalid note name: ${name}`);
  return (parseInt(octaveStr) + 1) * OCTAVE_SIZE + noteIndex;
}

export function midiToOctave(midi: number): number {
  return Math.floor(midi / OCTAVE_SIZE) - 1;
}

export function isBlackKey(midi: number): boolean {
  const index = midi % OCTAVE_SIZE;
  return [1, 3, 6, 8, 10].includes(index);
}

export function getKeyIndex(midi: number): number {
  return midi % OCTAVE_SIZE;
}
