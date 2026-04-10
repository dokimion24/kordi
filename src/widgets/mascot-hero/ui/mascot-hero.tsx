"use client";

import { useTranslations } from "next-intl";
import { KordiMascot } from "@/shared/ui/illustrations/kordi-mascot";
import { SpeechBubble } from "@/shared/ui/speech-bubble";

const TIP_COUNT = 58;
const TIP_KEYS = Array.from({ length: TIP_COUNT }, (_, i) => `tips_${i}`);

export function MascotHero() {
  const t = useTranslations("home");
  const messages = TIP_KEYS.map((key) => t(key));

  return (
    <div className="mb-12 flex items-start gap-5">
      <KordiMascot size="md" className="shrink-0" interactive />
      <SpeechBubble messages={messages} interval={5000} typingSpeed={45} className="mt-1" />
    </div>
  );
}
