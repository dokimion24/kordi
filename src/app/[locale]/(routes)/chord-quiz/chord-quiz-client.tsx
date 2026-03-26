"use client";

import dynamic from "next/dynamic";

const ChordQuizPage = dynamic(
  () => import("@/views/chord-quiz").then((m) => m.ChordQuizPage),
  { ssr: false }
);

export function ChordQuizClient() {
  return <ChordQuizPage />;
}
