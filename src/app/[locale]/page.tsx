import { useTranslations } from "next-intl";
import { Music, Lightbulb, Trophy } from "lucide-react";
import { Link } from "@/shared/config/i18n/navigation";
import { AppHeader } from "@/widgets/app-header";
import { ROUTES } from "@/shared/config/routes";

const MENU_ITEMS = [
  { href: ROUTES.PIANO, icon: Music, iconColor: "text-neon", bgColor: "bg-neon/10", titleKey: "freePlay", descKey: "freePlayDesc" },
  { href: ROUTES.CHORD_PRACTICE, icon: Lightbulb, iconColor: "text-success", bgColor: "bg-success/10", titleKey: "chordPractice", descKey: "chordPracticeDesc" },
  { href: ROUTES.CHORD_QUIZ, icon: Trophy, iconColor: "text-warning", bgColor: "bg-warning/10", titleKey: "chordQuiz", descKey: "chordQuizDesc" },
] as const;

export default function LocaleHome() {
  const t = useTranslations("home");

  return (
    <div className="flex min-h-screen flex-col items-center">
      <AppHeader />

      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="grid w-full max-w-md gap-4 px-6">
          {MENU_ITEMS.map(({ href, icon: Icon, iconColor, bgColor, titleKey, descKey }) => (
            <Link
              key={href}
              href={href}
              className="glass glass-hover group flex items-center gap-4 rounded-2xl p-6 transition-all duration-300 hover:neon-glow-sm"
            >
              <div className={`flex size-12 items-center justify-center rounded-xl ${bgColor}`}>
                <Icon className={`size-6 ${iconColor}`} strokeWidth={1.5} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">{t(titleKey)}</h2>
                <p className="text-sm text-muted-foreground">{t(descKey)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
