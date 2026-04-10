import { useTranslations } from "next-intl";
import { Link } from "@/shared/config/i18n/navigation";
import { AppHeader } from "@/widgets/app-header";
import { MascotHero } from "@/widgets/mascot-hero";
import { Piano3D } from "@/shared/ui/illustrations/piano-3d";
import { ChordPractice3D } from "@/shared/ui/illustrations/chord-practice-3d";
import { ChordQuiz3D } from "@/shared/ui/illustrations/chord-quiz-3d";
import { ROUTES } from "@/shared/config/routes";

export default function LocaleHome() {
  const t = useTranslations("home");

  return (
    <div className="flex min-h-screen flex-col items-center">
      <AppHeader />

      <div className="w-full max-w-md flex-1 px-4 pt-6">
        {/* Mascot + Speech Bubble */}
        <MascotHero />
        {/* Top 2-column: main features */}
        <div className="mb-3 grid grid-cols-2 gap-3">
          {/* Piano - Free Play */}
          <Link href={ROUTES.PIANO}>
            <div className="group relative h-40 overflow-hidden rounded-2xl bg-[#F3F4F5] p-4 transition-all duration-200 hover:bg-[#EDEEF0] active:scale-[0.98] dark:bg-[#1e1f24] dark:hover:bg-[#25262c]">
              <h2 className="text-[15px] font-bold leading-snug text-foreground">
                {t("freePlay")}
              </h2>
              <Piano3D className="absolute -bottom-1 -right-1 w-20 transition-transform duration-200 group-hover:scale-105" />
            </div>
          </Link>

          {/* Chord Practice */}
          <Link href={ROUTES.CHORD_PRACTICE}>
            <div className="group relative h-40 overflow-hidden rounded-2xl bg-[#F3F4F5] p-4 transition-all duration-200 hover:bg-[#EDEEF0] active:scale-[0.98] dark:bg-[#1e1f24] dark:hover:bg-[#25262c]">
              <h2 className="text-[15px] font-bold leading-snug text-foreground">
                {t("chordPractice")}
              </h2>
              <ChordPractice3D className="absolute -bottom-1 -right-1 w-20 transition-transform duration-200 group-hover:scale-105" />
            </div>
          </Link>
        </div>

        {/* Chord Quiz */}
        <Link href={ROUTES.CHORD_QUIZ}>
          <div className="group relative h-28 overflow-hidden rounded-2xl bg-[#F3F4F5] p-4 transition-all duration-200 hover:bg-[#EDEEF0] active:scale-[0.98] dark:bg-[#1e1f24] dark:hover:bg-[#25262c]">
            <h2 className="text-[15px] font-bold leading-snug text-foreground">
              {t("chordQuiz")}
            </h2>
            <ChordQuiz3D className="absolute -bottom-1 -right-1 w-20 transition-transform duration-200 group-hover:scale-105" />
          </div>
        </Link>
      </div>
    </div>
  );
}
