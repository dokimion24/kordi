"use client";

import { Piano } from "lucide-react";

interface AudioStartPromptProps {
  title: string;
  description: string;
  onStart: () => void;
}

export function AudioStartPrompt({
  title,
  description,
  onStart,
}: AudioStartPromptProps) {
  return (
    <main className="flex flex-1 items-center justify-center p-6">
      <button
        onClick={onStart}
        className="flex flex-col items-center gap-4 rounded-lg border border-black bg-white px-12 py-10 transition-all hover:bg-muted"
      >
        <div className="flex size-16 items-center justify-center rounded-lg border border-black bg-black text-white">
          <Piano className="size-8" strokeWidth={1.75} />
        </div>
        <div className="text-center">
          <p className="font-heading text-lg font-bold uppercase tracking-wider">
            {title}
          </p>
          <p className="mt-1 text-sm opacity-70">{description}</p>
        </div>
      </button>
    </main>
  );
}
