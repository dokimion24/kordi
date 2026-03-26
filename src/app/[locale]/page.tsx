import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function LocaleHome() {
  const t = useTranslations("home");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950">
      <h1 className="mb-2 text-4xl font-bold text-zinc-100">Kordi</h1>
      <p className="mb-12 text-sm text-zinc-500">{t("subtitle")}</p>

      <div className="grid w-full max-w-md gap-4 px-6">
        <Link
          href="/piano"
          className="group flex items-center gap-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-all hover:border-violet-500/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.1)]"
        >
          <div className="flex size-12 items-center justify-center rounded-xl bg-violet-500/10">
            <svg
              className="size-6 text-violet-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-zinc-100">{t("freePlay")}</h2>
            <p className="text-sm text-zinc-500">{t("freePlayDesc")}</p>
          </div>
        </Link>

        <Link
          href="/chord-quiz"
          className="group flex items-center gap-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-all hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]"
        >
          <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-500/10">
            <svg
              className="size-6 text-emerald-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-zinc-100">{t("chordQuiz")}</h2>
            <p className="text-sm text-zinc-500">{t("chordQuizDesc")}</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
