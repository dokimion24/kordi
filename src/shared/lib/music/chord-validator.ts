import { CHORD_TEMPLATES, NOTE_LABELS, type ChordType } from "./chord-templates";

// Parse chord name like "G7", "C#m7", "Abmaj7" into root index and type
function parseChordName(
  name: string
): { rootIndex: number; type: ChordType } | null {
  // Try longest suffix first to match correctly (e.g., "m7b5" before "m7" before "m")
  const sortedTypes = Object.keys(CHORD_TEMPLATES).sort(
    (a, b) => b.length - a.length
  );

  for (const type of sortedTypes) {
    if (!name.endsWith(type) && type !== "") continue;

    const rootStr = type === "" ? name : name.slice(0, -type.length);
    const rootIndex = NOTE_LABELS.indexOf(
      rootStr as (typeof NOTE_LABELS)[number]
    );

    if (rootIndex !== -1) {
      return { rootIndex, type: type as ChordType };
    }
  }

  // Try with empty suffix (major chord)
  const rootIndex = NOTE_LABELS.indexOf(
    name as (typeof NOTE_LABELS)[number]
  );
  if (rootIndex !== -1) {
    return { rootIndex, type: "" as ChordType };
  }

  return null;
}

export function validateChord(
  targetChordName: string,
  playedMidiNotes: number[]
): boolean {
  if (playedMidiNotes.length === 0) return false;

  const parsed = parseChordName(targetChordName);
  if (!parsed) return false;

  const template = CHORD_TEMPLATES[parsed.type];
  if (!template) return false;

  const expectedPitchClasses = template
    .map((interval) => (interval + parsed.rootIndex) % 12)
    .sort((a, b) => a - b);

  const playedPitchClasses = [
    ...new Set(playedMidiNotes.map((n) => n % 12)),
  ].sort((a, b) => a - b);

  if (expectedPitchClasses.length !== playedPitchClasses.length) return false;

  return expectedPitchClasses.every(
    (val, i) => val === playedPitchClasses[i]
  );
}
