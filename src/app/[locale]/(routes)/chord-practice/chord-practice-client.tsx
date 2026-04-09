"use client";

import dynamic from "next/dynamic";

const ChordPracticePage = dynamic(
  () => import("@/views/chord-practice").then((m) => m.ChordPracticePage),
  { ssr: false }
);

export function ChordPracticeClient() {
  return <ChordPracticePage />;
}
