import { useTranslations } from "next-intl";
import { Dumbbell, HelpCircle } from "lucide-react";
import { Link } from "@/shared/config/i18n/navigation";
import { ROUTES } from "@/shared/config/routes";
import { MonoCard } from "@/shared/ui/mono-card";
import { MonoButton } from "@/shared/ui/mono-button";
import { SectionHeader } from "@/shared/ui/section-header";
import { PianoKeysIllustration } from "./piano-keys-illustration";
import { ChordDiagramCmaj7 } from "./chord-diagram-cmaj7";
import { QuickAccessCard } from "./quick-access-card";

export function HomePage() {
  const t = useTranslations("home");

  return (
    <main className="flex-1 overflow-y-auto p-6 md:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <MonoCard className="grid grid-cols-1 items-center gap-8 p-8 md:grid-cols-2 md:gap-10 md:p-10">
          <div className="min-w-0 space-y-5">
            <SectionHeader as="h1" size="xl">
              {t("hero.title")}
            </SectionHeader>
            <p className="text-base leading-relaxed md:text-lg">
              {t("hero.subtitle")}
            </p>
            <Link href={ROUTES.CHORD_PRACTICE} className="inline-block">
              <MonoButton variant="solid" size="lg">
                {t("hero.cta")}
              </MonoButton>
            </Link>
          </div>
          <div className="flex min-w-0 justify-center md:justify-end">
            <MonoCard className="flex h-56 w-full max-w-md items-center justify-center overflow-hidden md:h-64">
              <PianoKeysIllustration />
            </MonoCard>
          </div>
        </MonoCard>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:col-span-8">
            <QuickAccessCard
              href={ROUTES.CHORD_PRACTICE}
              icon={Dumbbell}
              title={t("card.practice.title")}
              desc={t("card.practice.desc")}
              cta={t("card.practice.cta")}
            />
            <QuickAccessCard
              href={ROUTES.CHORD_QUIZ}
              icon={HelpCircle}
              title={t("card.quiz.title")}
              desc={t("card.quiz.desc")}
              cta={t("card.quiz.cta")}
            />
          </div>

          <aside className="flex flex-col gap-6 md:col-span-4">
            <MonoCard className="p-4">
              <h3 className="mb-2 border-b border-black pb-1 text-xs font-bold uppercase tracking-widest">
                {t("daily.title")}
              </h3>
              <div className="space-y-2 py-3 text-center">
                <div className="font-heading text-[32px] font-black leading-tight">
                  Cmaj7
                </div>
                <p className="text-sm">{t("daily.subtitle")}</p>
                <MonoCard className="mt-2 flex h-24 items-center justify-center overflow-hidden">
                  <ChordDiagramCmaj7 />
                </MonoCard>
              </div>
            </MonoCard>

            <MonoCard className="p-4">
              <h3 className="mb-2 border-b border-black pb-1 text-xs font-bold uppercase tracking-widest">
                {t("activity.title")}
              </h3>
              <ul className="space-y-1">
                <li className="flex items-center justify-between border-b border-black py-1.5 last:border-0">
                  <div className="flex items-center gap-2">
                    <Dumbbell className="size-4" strokeWidth={1.75} aria-hidden />
                    <span className="text-sm">{t("activity.item1")}</span>
                  </div>
                  <span className="text-sm font-bold tabular-nums">85%</span>
                </li>
                <li className="flex items-center justify-between border-b border-black py-1.5 last:border-0">
                  <div className="flex items-center gap-2">
                    <HelpCircle
                      className="size-4"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                    <span className="text-sm">{t("activity.item2")}</span>
                  </div>
                  <span className="text-sm font-bold tabular-nums">1,200</span>
                </li>
              </ul>
            </MonoCard>
          </aside>
        </div>
      </div>
    </main>
  );
}
