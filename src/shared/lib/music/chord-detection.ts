import { CHORD_TEMPLATES, NOTE_LABELS, type ChordType } from "./chord-templates";
import { toPitchClasses, pitchClassesEqual } from "./pitch-class";

// Detection priority, simple/common first. Kept explicit because plain object
// iteration hoists integer-like keys ("5", "6", "7", …) ahead of everything else,
// which silently scrambles the intended order.
const DETECTION_PRIORITY: ChordType[] = [
  // triads
  "", "m", "dim", "aug", "sus2", "sus4",
  // power chord
  "5",
  // 4-note
  "maj7", "7", "m7", "mMaj7", "dim7", "dim(maj7)", "m7b5",
  "+Maj7", "7#5", "7b5", "7sus4", "6", "m6", "add9", "madd9",
  // 5-note
  "maj9", "9", "m9", "m(maj9)", "6/9", "m6/9", "9sus4",
  "9#5", "9b5", "7#9", "7b9", "7#11", "maj7#11",
  // 6-note
  "maj9#11", "9#11", "11", "m11", "13sus4", "13b9", "13#9", "7alt",
  // 7-note
  "maj13#11", "maj13", "13#11", "13", "m13",
];

// Templates added later but missing from the priority list still get detected (last).
const DETECTION_ORDER: [ChordType, number[]][] = [
  ...DETECTION_PRIORITY,
  ...(Object.keys(CHORD_TEMPLATES) as ChordType[]).filter(
    (k) => !DETECTION_PRIORITY.includes(k),
  ),
].map((k) => [k, CHORD_TEMPLATES[k]]);

// Omitted-fifth variants (jazz shell voicings: 1-3-7, rootful 9ths without the 5th, …).
// Checked only when no full template matches, so they never override an exact match.
const OMITTED_FIFTH_ORDER: [ChordType, number[]][] = DETECTION_ORDER.filter(
  ([, template]) => template.length >= 4 && template.includes(7),
).map(([suffix, template]) => [suffix, template.filter((iv) => iv !== 7)]);

function matchRoots(pitchClasses: number[], template: number[]): number[] {
  if (pitchClasses.length !== template.length) return [];

  const roots: number[] = [];
  for (let root = 0; root < 12; root++) {
    const rotated = template
      .map((interval) => (interval + root) % 12)
      .sort((a, b) => a - b);
    if (pitchClassesEqual(rotated, pitchClasses)) {
      roots.push(root);
    }
  }
  return roots;
}

function collectCandidates(
  pitchClasses: number[],
  order: [ChordType, number[]][],
): { root: number; suffix: ChordType }[] {
  const candidates: { root: number; suffix: ChordType }[] = [];
  for (const [suffix, template] of order) {
    for (const root of matchRoots(pitchClasses, template)) {
      candidates.push({ root, suffix });
    }
  }
  return candidates;
}

export function detectChord(midiNotes: number[]): string | null {
  if (midiNotes.length < 1) return null;

  const pitchClasses = toPitchClasses(midiNotes);
  const bass = Math.min(...midiNotes) % 12;

  const fullCandidates = collectCandidates(pitchClasses, DETECTION_ORDER);

  // The bass note decides between enharmonic sets (C6 vs Am7, Csus2 vs Gsus4, …)
  const rootedFull = fullCandidates.find((c) => c.root === bass);
  if (rootedFull) return `${NOTE_LABELS[rootedFull.root]}${rootedFull.suffix}`;

  // Omitted-fifth reading rooted at the bass (e.g. C-E-Bb → C7)
  const no5Candidates = collectCandidates(pitchClasses, OMITTED_FIFTH_ORDER);
  const rootedNo5 = no5Candidates.find((c) => c.root === bass);
  if (rootedNo5) return `${NOTE_LABELS[rootedNo5.root]}${rootedNo5.suffix}`;

  // Bass isn't any candidate's root → inversion, shown as a slash chord
  const best = fullCandidates[0] ?? no5Candidates[0];
  if (!best) return null;
  return `${NOTE_LABELS[best.root]}${best.suffix}/${NOTE_LABELS[bass]}`;
}
