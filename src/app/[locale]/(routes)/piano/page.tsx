import type { Metadata } from "next";
import { PianoClient } from "./piano-client";

export const metadata: Metadata = {
  title: "Piano | Kordi",
  description: "Play piano with your keyboard or MIDI device",
};

export default function Page() {
  return <PianoClient />;
}
