/**
 * Shared pitch class utility.
 * Used by both chord detection and chord validation.
 */
export function toPitchClasses(midiNotes: number[]): number[] {
  const unique = new Set(midiNotes.map((n) => n % 12));
  return [...unique].sort((a, b) => a - b);
}

export function pitchClassesEqual(a: number[], b: number[]): boolean {
  if (a.length !== b.length) return false;
  return a.every((val, i) => val === b[i]);
}
