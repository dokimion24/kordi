"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/shared/ui/button";
import { CHORD_TEMPLATES, ALL_KEYS, type ChordType } from "@/shared/lib/music";
import {
  DIFFICULTY_CHORD_TYPES,
  type QuizSettings,
  type Difficulty,
  type TimeSignature,
  type GameMode,
} from "@/entities/chord-quiz";

interface QuizSettingsPanelProps {
  settings: QuizSettings;
  onChange: (settings: QuizSettings) => void;
  onClose: () => void;
  isOpen: boolean;
  inline?: boolean;
}

const DIFFICULTIES: Difficulty[] = ["beginner", "intermediate", "advanced", "custom"];
const TIME_SIGNATURES: TimeSignature[] = ["4/4", "3/4", "2/4", "6/8"];
const ALL_CHORD_TYPES = Object.keys(CHORD_TEMPLATES) as ChordType[];

function SettingsContent({
  settings,
  onChange,
}: {
  settings: QuizSettings;
  onChange: (settings: QuizSettings) => void;
}) {
  const t = useTranslations("chordQuiz");

  const update = (partial: Partial<QuizSettings>) => {
    onChange({ ...settings, ...partial });
  };

  const isPractice = settings.gameMode === "practice";

  return (
    <div className="flex flex-col gap-5">
      {/* Game Mode */}
      <div>
        <label className="mb-2 block text-xs font-medium text-zinc-400">{t("gameMode")}</label>
        <div className="flex gap-1.5">
          {(["practice", "timeattack"] as GameMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => update({ gameMode: mode })}
              className={`rounded-md px-3 py-1.5 text-xs transition-colors ${
                settings.gameMode === mode
                  ? "bg-violet-500 text-white"
                  : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
              }`}
            >
              {t(`mode_${mode}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty */}
      <div>
        <label className="mb-2 block text-xs font-medium text-zinc-400">{t("difficulty")}</label>
        <div className="flex flex-wrap gap-1.5">
          {DIFFICULTIES.map((d) => (
            <button
              key={d}
              onClick={() => {
                const types = d === "custom" ? settings.customChordTypes : DIFFICULTY_CHORD_TYPES[d];
                update({ difficulty: d, customChordTypes: types });
              }}
              className={`rounded-md px-2.5 py-1 text-xs transition-colors ${
                settings.difficulty === d
                  ? "bg-violet-500 text-white"
                  : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
              }`}
            >
              {t(`difficulty_${d}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Custom chord types */}
      {settings.difficulty === "custom" && (
        <div>
          <label className="mb-2 block text-xs font-medium text-zinc-400">{t("chordTypes")}</label>
          <div className="flex flex-wrap gap-1.5">
            {ALL_CHORD_TYPES.map((type) => {
              const label = type === "" ? "Major" : type;
              const isSelected = settings.customChordTypes.includes(type);
              return (
                <button
                  key={type || "major"}
                  onClick={() => {
                    const next = isSelected
                      ? settings.customChordTypes.filter((ct) => ct !== type)
                      : [...settings.customChordTypes, type];
                    if (next.length > 0) update({ customChordTypes: next });
                  }}
                  className={`rounded-md px-2 py-1 text-xs transition-colors ${
                    isSelected
                      ? "bg-violet-500/20 text-violet-300 ring-1 ring-violet-500/50"
                      : "bg-zinc-800 text-zinc-500 hover:bg-zinc-700"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Key */}
      <div>
        <label className="mb-2 block text-xs font-medium text-zinc-400">{t("key")}</label>
        <select
          value={settings.keyFilter ?? "any"}
          onChange={(e) => update({ keyFilter: e.target.value === "any" ? null : e.target.value })}
          className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-sm text-zinc-200"
        >
          <option value="any">{t("anyKey")}</option>
          {ALL_KEYS.map((k) => (
            <option key={k.name} value={k.name}>{k.name}</option>
          ))}
        </select>
      </div>

      {/* BPM (timeattack only) */}
      {!isPractice && (
        <div>
          <label className="mb-2 block text-xs font-medium text-zinc-400">
            {t("tempo")}: {settings.bpm} BPM
          </label>
          <input
            type="range"
            min={40}
            max={200}
            value={settings.bpm}
            onChange={(e) => update({ bpm: Number(e.target.value) })}
            className="w-full accent-violet-500"
          />
        </div>
      )}

      {/* Bars per chord (timeattack only) */}
      {!isPractice && (
        <div>
          <label className="mb-2 block text-xs font-medium text-zinc-400">{t("barsPerChord")}</label>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4].map((n) => (
              <button
                key={n}
                onClick={() => update({ barsPerChord: n })}
                className={`rounded-md px-3 py-1 text-xs transition-colors ${
                  settings.barsPerChord === n
                    ? "bg-violet-500 text-white"
                    : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Time signature (timeattack only) */}
      {!isPractice && (
        <div>
          <label className="mb-2 block text-xs font-medium text-zinc-400">{t("timeSignature")}</label>
          <div className="flex gap-1.5">
            {TIME_SIGNATURES.map((ts) => (
              <button
                key={ts}
                onClick={() => update({ timeSignature: ts })}
                className={`rounded-md px-3 py-1 text-xs transition-colors ${
                  settings.timeSignature === ts
                    ? "bg-violet-500 text-white"
                    : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                }`}
              >
                {ts}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Toggles */}
      <div className="flex flex-col gap-3">
        {!isPractice && (
          <>
            <label className="flex items-center justify-between text-sm text-zinc-300">
              {t("metronomeAudio")}
              <input
                type="checkbox"
                checked={settings.metronomeAudioEnabled}
                onChange={(e) => update({ metronomeAudioEnabled: e.target.checked })}
                className="accent-violet-500"
              />
            </label>
            <label className="flex items-center justify-between text-sm text-zinc-300">
              {t("metronomeVisual")}
              <input
                type="checkbox"
                checked={settings.metronomeVisualEnabled}
                onChange={(e) => update({ metronomeVisualEnabled: e.target.checked })}
                className="accent-violet-500"
              />
            </label>
          </>
        )}
        <label className="flex items-center justify-between text-sm text-zinc-300">
          {t("showNextChord")}
          <input
            type="checkbox"
            checked={settings.showNextChord}
            onChange={(e) => update({ showNextChord: e.target.checked })}
            className="accent-violet-500"
          />
        </label>
      </div>
    </div>
  );
}

export function QuizSettingsPanel({
  settings,
  onChange,
  onClose,
  isOpen,
  inline = false,
}: QuizSettingsPanelProps) {
  const t = useTranslations("chordQuiz");

  if (!isOpen) return null;

  // Inline mode: render settings directly without overlay
  if (inline) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="mb-4 text-lg font-semibold text-zinc-100">{t("settings")}</h2>
        <SettingsContent settings={settings} onChange={onChange} />
      </div>
    );
  }

  // Slide-out mode
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 flex w-80 flex-col gap-6 overflow-y-auto bg-zinc-900 p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-100">{t("settings")}</h2>
          <Button variant="ghost" size="icon-sm" onClick={onClose}>
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Button>
        </div>
        <SettingsContent settings={settings} onChange={onChange} />
      </div>
    </div>
  );
}
