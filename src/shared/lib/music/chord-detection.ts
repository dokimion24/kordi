import { CHORD_TEMPLATES, NOTE_LABELS } from "./chord-templates";
import { toPitchClasses, pitchClassesEqual } from "./pitch-class";

function matchTemplate(
  pitchClasses: number[],
  template: number[]
): number | null {
  if (pitchClasses.length !== template.length) return null;

  for (let root = 0; root < 12; root++) {
    const rotated = template
      .map((interval) => (interval + root) % 12)
      .sort((a, b) => a - b);
    if (pitchClassesEqual(rotated, pitchClasses)) {
      return root;
    }
  }
  return null;
}

export function detectChord(midiNotes: number[]): string | null {
  if (midiNotes.length < 2) return null;

  const pitchClasses = toPitchClasses(midiNotes);

  for (const [suffix, template] of Object.entries(CHORD_TEMPLATES)) {
    const root = matchTemplate(pitchClasses, template);
    if (root !== null) {
      return `${NOTE_LABELS[root]}${suffix}`;
    }
  }

  return null;
}
