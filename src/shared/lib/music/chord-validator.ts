import { CHORD_TEMPLATES, NOTE_LABELS, type ChordType } from "./chord-templates";
import { toPitchClasses, pitchClassesEqual } from "./pitch-class";

function parseChordName(
  name: string
): { rootIndex: number; type: ChordType } | null {
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

  const expected = template
    .map((interval) => (interval + parsed.rootIndex) % 12)
    .sort((a, b) => a - b);

  const played = toPitchClasses(playedMidiNotes);

  return pitchClassesEqual(expected, played);
}
