import { CHORD_TEMPLATES, NOTE_LABELS, type ChordType } from "./chord-templates";
import { ALL_KEYS, getDiatonicChords, type KeySignature } from "./music-theory";

export interface GeneratedChord {
  name: string;
  rootIndex: number;
  type: ChordType;
  pitchClasses: number[];
}

function buildPitchClasses(rootIndex: number, type: ChordType): number[] {
  const template = CHORD_TEMPLATES[type];
  return template.map((interval) => (interval + rootIndex) % 12).sort((a, b) => a - b);
}

export function generateChordPool(
  allowedTypes: ChordType[],
  keyFilter: string | null
): GeneratedChord[] {
  if (keyFilter) {
    const key = ALL_KEYS.find((k) => k.name === keyFilter);
    if (key) {
      return getDiatonicChords(key, allowedTypes).map((dc) => ({
        name: dc.name,
        rootIndex: dc.root,
        type: dc.type,
        pitchClasses: buildPitchClasses(dc.root, dc.type),
      }));
    }
  }

  // Any key: all 12 roots × allowed types
  const pool: GeneratedChord[] = [];
  for (let root = 0; root < 12; root++) {
    for (const type of allowedTypes) {
      pool.push({
        name: `${NOTE_LABELS[root]}${type}`,
        rootIndex: root,
        type,
        pitchClasses: buildPitchClasses(root, type),
      });
    }
  }
  return pool;
}

export function pickNextChord(
  pool: GeneratedChord[],
  previousName: string | null
): GeneratedChord {
  if (pool.length === 0) throw new Error("Chord pool is empty");
  if (pool.length === 1) return pool[0];

  let next: GeneratedChord;
  do {
    next = pool[Math.floor(Math.random() * pool.length)];
  } while (next.name === previousName);

  return next;
}
