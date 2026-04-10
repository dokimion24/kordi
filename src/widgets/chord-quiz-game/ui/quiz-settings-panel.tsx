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
  ns: string;
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
  ns,
  settings,
  onChange,
}: {
  ns: string;
  settings: QuizSettings;
  onChange: (settings: QuizSettings) => void;
}) {
  const t = useTranslations(ns);

  const update = (partial: Partial<QuizSettings>) => {
    onChange({ ...settings, ...partial });
  };

  const isPractice = settings.gameMode === "practice";

  return (
    <div className="flex flex-col gap-5">
      {/* Game Mode */}
      <div>
        <label className="mb-2 block text-xs font-medium text-muted-foreground">{t("gameMode")}</label>
        <div className="flex gap-1.5">
          {(["practice", "timeattack"] as GameMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => update({ gameMode: mode })}
              className={`rounded-md px-3 py-1.5 text-xs transition-colors ${
                settings.gameMode === mode
                  ? "bg-neon/20 text-neon ring-1 ring-neon/30"
                  : "glass text-muted-foreground hover:text-foreground"
              }`}
            >
              {t(`mode_${mode}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty */}
      <div>
        <label className="mb-2 block text-xs font-medium text-muted-foreground">{t("difficulty")}</label>
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
                  ? "bg-neon/20 text-neon ring-1 ring-neon/30"
                  : "glass text-muted-foreground hover:text-foreground"
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
          <label className="mb-2 block text-xs font-medium text-muted-foreground">{t("chordTypes")}</label>
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
                      ? "bg-neon/15 text-neon ring-1 ring-neon/30"
                      : "glass text-muted-foreground/60 hover:text-muted-foreground"
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
        <label className="mb-2 block text-xs font-medium text-muted-foreground">{t("key")}</label>
        <select
          value={settings.keyFilter ?? "any"}
          onChange={(e) => update({ keyFilter: e.target.value === "any" ? null : e.target.value })}
          className="w-full rounded-md glass px-3 py-1.5 text-sm text-foreground"
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
          <label className="mb-2 block text-xs font-medium text-muted-foreground">
            {t("tempo")}: {settings.bpm} BPM
          </label>
          <input
            type="range"
            min={40}
            max={200}
            value={settings.bpm}
            onChange={(e) => update({ bpm: Number(e.target.value) })}
            className="w-full accent-[oklch(0.75_0.08_195)]"
          />
        </div>
      )}

      {/* Bars per chord (timeattack only) */}
      {!isPractice && (
        <div>
          <label className="mb-2 block text-xs font-medium text-muted-foreground">{t("barsPerChord")}</label>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4].map((n) => (
              <button
                key={n}
                onClick={() => update({ barsPerChord: n })}
                className={`rounded-md px-3 py-1 text-xs transition-colors ${
                  settings.barsPerChord === n
                    ? "bg-neon/20 text-neon ring-1 ring-neon/30"
                    : "glass text-muted-foreground hover:text-foreground"
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
          <label className="mb-2 block text-xs font-medium text-muted-foreground">{t("timeSignature")}</label>
          <div className="flex gap-1.5">
            {TIME_SIGNATURES.map((ts) => (
              <button
                key={ts}
                onClick={() => update({ timeSignature: ts })}
                className={`rounded-md px-3 py-1 text-xs transition-colors ${
                  settings.timeSignature === ts
                    ? "bg-neon/20 text-neon ring-1 ring-neon/30"
                    : "glass text-muted-foreground hover:text-foreground"
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
            <label className="flex items-center justify-between text-sm text-foreground/80">
              {t("metronomeAudio")}
              <input
                type="checkbox"
                checked={settings.metronomeAudioEnabled}
                onChange={(e) => update({ metronomeAudioEnabled: e.target.checked })}
                className="accent-[oklch(0.75_0.08_195)]"
              />
            </label>
            <label className="flex items-center justify-between text-sm text-foreground/80">
              {t("metronomeVisual")}
              <input
                type="checkbox"
                checked={settings.metronomeVisualEnabled}
                onChange={(e) => update({ metronomeVisualEnabled: e.target.checked })}
                className="accent-[oklch(0.75_0.08_195)]"
              />
            </label>
          </>
        )}
        <label className="flex items-center justify-between text-sm text-foreground/80">
          {t("showNextChord")}
          <input
            type="checkbox"
            checked={settings.showNextChord}
            onChange={(e) => update({ showNextChord: e.target.checked })}
            className="accent-[oklch(0.75_0.08_195)]"
          />
        </label>
      </div>
    </div>
  );
}

export function QuizSettingsPanel({
  ns,
  settings,
  onChange,
  onClose,
  isOpen,
  inline = false,
}: QuizSettingsPanelProps) {
  const t = useTranslations(ns);

  if (!isOpen) return null;

  if (inline) {
    return (
      <div className="glass rounded-2xl p-6">
        <h2 className="mb-4 text-lg font-semibold text-foreground">{t("settings")}</h2>
        <SettingsContent ns={ns} settings={settings} onChange={onChange} />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="glass-strong relative z-10 flex w-80 flex-col gap-6 overflow-y-auto p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">{t("settings")}</h2>
          <button onClick={onClose} className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:text-foreground">
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <SettingsContent ns={ns} settings={settings} onChange={onChange} />
      </div>
    </div>
  );
}
