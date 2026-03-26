import type { Metadata } from "next";
import { ChordQuizClient } from "./chord-quiz-client";

export const metadata: Metadata = {
  title: "Chord Quiz | Kordi",
  description: "Practice chords with random chord flash cards",
};

export default function Page() {
  return <ChordQuizClient />;
}
