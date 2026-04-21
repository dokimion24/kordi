"use client";

import { useCallback } from "react";
import { useTranslations } from "next-intl";
import { useTheme } from "@/shared/lib/react/theme-provider";
import { useRouter, usePathname } from "@/shared/config/i18n/navigation";
import {
  Music,
  BookOpen,
  Trophy,
  Menu,
  User,
  Users,
  Globe,
  Sun,
  Moon,
  LogOut,
  ChevronLeft,
} from "lucide-react";
import { Link } from "@/shared/config/i18n/navigation";
import ky from "ky";
import { ROUTES } from "@/shared/config/routes";
import { KordiMascot } from "@/shared/ui/illustrations/kordi-mascot";
import { cn } from "@/shared/lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/shared/ui/dropdown-menu";

const NAV_ITEMS = [
  { href: ROUTES.PIANO, icon: Music, labelKey: "navPiano" },
  { href: ROUTES.CHORD_PRACTICE, icon: BookOpen, labelKey: "navPractice" },
  { href: ROUTES.CHORD_QUIZ, icon: Trophy, labelKey: "navQuiz" },
  { href: ROUTES.RANKING, icon: Trophy, labelKey: "navRanking" },
  { href: ROUTES.FRIENDS, icon: Users, labelKey: "navFriends" },
] as const;

interface AppHeaderProps {
  title?: string;
  showBack?: boolean;
}

export function AppHeader({ title, showBack = false }: AppHeaderProps) {
  const t = useTranslations("common");
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const isDark = theme === "dark";
  const isKo = t("currentLocale") === "ko";

  const handleNavigateProfile = useCallback(() => router.push(ROUTES.ME), [router]);
  const handleToggleLocale = useCallback(
    () => router.replace(pathname, { locale: isKo ? "en" : "ko" }),
    [router, pathname, isKo],
  );
  const handleToggleTheme = useCallback(
    () => setTheme(isDark ? "light" : "dark"),
    [setTheme, isDark],
  );
  const handleLogout = useCallback(async () => {
    await ky.post("/api/auth/logout");
    router.push(ROUTES.HOME);
  }, [router]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-surface/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        {/* Left - Logo */}
        <div className="flex items-center gap-2">
          {showBack ? (
            <Link
              href={ROUTES.HOME}
              className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              <ChevronLeft className="size-4" strokeWidth={1.5} />
              <KordiMascot size="xs" />
              {title && <span className="text-sm font-semibold text-foreground">{title}</span>}
            </Link>
          ) : (
            <Link href={ROUTES.HOME} className="flex items-center gap-2">
              <KordiMascot size="xs" />
              <span className="text-lg font-[590] text-foreground">Kordi</span>
            </Link>
          )}
        </div>

        {/* Center - Nav (desktop) */}
        {!showBack && (
          <nav className="hidden items-center gap-1 sm:flex">
            {NAV_ITEMS.map(({ href, labelKey }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "rounded-md px-3 py-1.5 text-[13px] font-[510] transition-colors",
                  pathname === href
                    ? "bg-[rgba(255,255,255,0.05)] text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {t(labelKey)}
              </Link>
            ))}
          </nav>
        )}

        {/* Right - Actions */}
        <div className="flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-lg p-1.5 text-muted-foreground outline-none transition-colors hover:bg-accent hover:text-foreground">
              <Menu className="size-4" strokeWidth={1.5} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={8}>
              {/* Mobile nav items */}
              <div className="sm:hidden">
                {NAV_ITEMS.map(({ href, icon: Icon, labelKey }) => (
                  <DropdownMenuItem key={href} onClick={() => router.push(href)}>
                    <Icon className="size-4" />
                    {t(labelKey)}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
              </div>

              <DropdownMenuItem onClick={handleNavigateProfile}>
                <User className="size-4" />
                {t("myProfile")}
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={handleToggleLocale}>
                <Globe className="size-4" />
                {t("language")}
              </DropdownMenuItem>

              <DropdownMenuItem onClick={handleToggleTheme}>
                {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
                {t("theme")}
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem variant="destructive" onClick={handleLogout}>
                <LogOut className="size-4" />
                {t("logout")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
