import * as Tone from "tone";

const SAMPLE_BASE_URL = "https://tonejs.github.io/audio/salamander/";

// Map every 3rd note for reasonable download size
const SAMPLE_URLS: Record<string, string> = {
  A0: "A0.mp3",
  C1: "C1.mp3",
  "D#1": "Ds1.mp3",
  "F#1": "Fs1.mp3",
  A1: "A1.mp3",
  C2: "C2.mp3",
  "D#2": "Ds2.mp3",
  "F#2": "Fs2.mp3",
  A2: "A2.mp3",
  C3: "C3.mp3",
  "D#3": "Ds3.mp3",
  "F#3": "Fs3.mp3",
  A3: "A3.mp3",
  C4: "C4.mp3",
  "D#4": "Ds4.mp3",
  "F#4": "Fs4.mp3",
  A4: "A4.mp3",
  C5: "C5.mp3",
  "D#5": "Ds5.mp3",
  "F#5": "Fs5.mp3",
  A5: "A5.mp3",
  C6: "C6.mp3",
  "D#6": "Ds6.mp3",
  "F#6": "Fs6.mp3",
  A6: "A6.mp3",
  C7: "C7.mp3",
  "D#7": "Ds7.mp3",
  "F#7": "Fs7.mp3",
  A7: "A7.mp3",
  C8: "C8.mp3",
};

let sampler: Tone.Sampler | null = null;
let loadingPromise: Promise<Tone.Sampler> | null = null;

export function getSampler(): Promise<Tone.Sampler> {
  if (sampler) return Promise.resolve(sampler);
  if (loadingPromise) return loadingPromise;

  loadingPromise = new Promise((resolve) => {
    const s = new Tone.Sampler({
      urls: SAMPLE_URLS,
      baseUrl: SAMPLE_BASE_URL,
      release: 1,
      onload: () => {
        sampler = s;
        resolve(s);
      },
    }).toDestination();
  });

  return loadingPromise;
}

export function playNoteOn(midi: number, velocity: number): void {
  if (!sampler) return;
  const note = Tone.Frequency(midi, "midi").toNote();
  sampler.triggerAttack(note, Tone.now(), velocity);
}

export function playNoteOff(midi: number): void {
  if (!sampler) return;
  const note = Tone.Frequency(midi, "midi").toNote();
  sampler.triggerRelease(note, Tone.now());
}

export function disposeSampler(): void {
  if (sampler) {
    sampler.dispose();
    sampler = null;
    loadingPromise = null;
  }
}
