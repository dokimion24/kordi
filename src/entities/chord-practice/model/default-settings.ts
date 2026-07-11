import type { QuizSettings } from "./types";

export const DEFAULT_QUIZ_SETTINGS: QuizSettings = {
  gameMode: "practice",
  difficulty: "beginner",
  customChordTypes: ["", "m"],
  keyFilter: null,
  bpm: 100,
  barsPerChord: 1,
  timeSignature: "4/4",
  metronomeAudioEnabled: true,
  metronomeVisualEnabled: true,
  showNextChord: true,
};
