"use client";

import dynamic from "next/dynamic";

const PianoPage = dynamic(
  () => import("@/views/piano").then((m) => m.PianoPage),
  { ssr: false }
);

export function PianoClient() {
  return <PianoPage />;
}
