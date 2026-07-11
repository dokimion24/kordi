import * as Tone from "tone";

let started = false;

export async function ensureAudioStarted(): Promise<void> {
  if (started) return;
  await Tone.start();
  // Default lookAhead (0.1s) adds ~100ms latency — unacceptable for live playing
  Tone.getContext().lookAhead = 0;
  started = true;
}

export function isAudioStarted(): boolean {
  return started;
}
