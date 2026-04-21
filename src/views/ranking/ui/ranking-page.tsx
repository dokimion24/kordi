import { useTranslations } from "next-intl";
import { Trophy } from "lucide-react";
import { AppHeader } from "@/widgets/app-header";
import { RankingBoard } from "@/widgets/ranking-board";

export function RankingPage() {
  const t = useTranslations("ranking");

  return (
    <div className="flex min-h-screen flex-col items-center">
      <AppHeader showBack title={t("title")} />

      <div className="w-full max-w-3xl flex-1 px-4 py-8">
        <div className="mb-8 flex items-center gap-3">
          <Trophy className="size-6 text-brand-accent" strokeWidth={1.5} />
          <h2 className="text-xl font-bold text-foreground">{t("leaderboard")}</h2>
        </div>
        <RankingBoard />
      </div>
    </div>
  );
}
