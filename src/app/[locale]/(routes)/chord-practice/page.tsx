import type { Metadata } from "next";
import { ChordPracticeClient } from "./chord-practice-client";

export const metadata: Metadata = {
  title: "Chord Practice | Kordi",
  description: "Practice chords with random chord flash cards",
};

export default function Page() {
  return <ChordPracticeClient />;
}
