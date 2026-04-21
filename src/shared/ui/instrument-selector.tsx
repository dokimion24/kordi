"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import {
  INSTRUMENTS,
  loadInstrument,
  getCurrentInstrumentId,
  type InstrumentId,
} from "@/shared/lib/audio";
import { cn } from "@/shared/lib/utils";

export function InstrumentSelector() {
  const t = useTranslations("instruments");
  const [activeId, setActiveId] = useState<InstrumentId>(
    getCurrentInstrumentId() ?? "grand-piano"
  );
  const [loading, setLoading] = useState(false);

  const handleSelect = useCallback(async (id: InstrumentId) => {
    if (id === activeId) return;
    setLoading(true);
    await loadInstrument(id);
    setActiveId(id);
    setLoading(false);
  }, [activeId]);

  return (
    <div className="flex flex-wrap gap-1.5">
      {INSTRUMENTS.map(({ id, labelKey }) => (
        <button
          key={id}
          disabled={loading}
          onClick={() => handleSelect(id)}
          className={cn(
            "rounded-lg px-3 py-1.5 text-xs transition-all duration-200",
            id === activeId
              ? "glass neon-border text-primary neon-glow-sm"
              : "glass glass-hover text-muted-foreground",
            loading && "opacity-50 cursor-wait"
          )}
        >
          {t(labelKey)}
        </button>
      ))}
    </div>
  );
}
