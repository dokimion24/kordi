import { useTranslations } from "next-intl";
import { User as UserIcon, Lock } from "lucide-react";
import type { User } from "@/entities/user";
import { ProfileForm } from "@/features/profile";
import { LogoutButton } from "@/features/auth";
import { AppHeader } from "@/widgets/app-header";
import { Avatar, AvatarImage, AvatarFallback } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Separator } from "@/shared/ui/separator";

interface MePageProps {
  user: User;
}

export function MePage({ user }: MePageProps) {
  const t = useTranslations("me");
  const tCommon = useTranslations("common");

  return (
    <div className="flex min-h-screen flex-col items-center">
      <AppHeader showBack title={t("title")} />

      <div className="w-full max-w-3xl flex-1 px-4 py-8">
        {/* Grid: 1col mobile, 2col desktop */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[280px_1fr]">
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            {/* Avatar Card */}
            <div className="glass flex flex-col items-center rounded-2xl px-6 py-8">
              <Avatar size="lg" className="mb-4 size-24 ring-2 ring-neon/20">
                <AvatarImage src={user.profileImageUrl ?? undefined} alt={user.nickname} />
                <AvatarFallback className="text-3xl">
                  {user.nickname.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-lg font-semibold text-foreground">{user.nickname}</h2>
              <Badge variant="outline" className="mt-2 border-neon/30 text-xs text-neon">
                {t("userId")}: #{user.id}
              </Badge>
            </div>

            {/* Logout */}
            <div className="glass rounded-2xl px-6 py-4">
              <LogoutButton label={tCommon("logout")} className="w-full" />
            </div>
          </div>

          {/* Right Column - Identity Details */}
          <div className="glass rounded-2xl px-6 py-8">
            <div className="mb-6 flex items-center gap-2">
              <UserIcon className="size-5 text-neon" strokeWidth={1.5} />
              <h2 className="text-lg font-semibold text-foreground">{t("identityDetails")}</h2>
            </div>

            {/* Display Name */}
            <ProfileForm currentNickname={user.nickname} />

            <Separator className="my-6" />

            {/* Primary Email */}
            <div className="mb-6">
              <p className="mb-2 text-sm font-medium text-neon">{t("primaryEmail")}</p>
              <div className="glass flex items-center justify-between rounded-xl px-4 py-3">
                <span className="text-sm text-foreground">{user.email}</span>
                <Lock className="size-4 text-muted-foreground" strokeWidth={1.5} />
              </div>
            </div>

            {/* OAuth Provider */}
            <div>
              <p className="mb-2 text-sm font-medium text-neon">{t("oauthProvider")}</p>
              <div className="glass flex items-center justify-between rounded-xl px-4 py-3">
                <div className="flex items-center gap-3">
                  <svg className="size-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  <span className="text-sm font-medium text-foreground">{user.oAuthProvider}</span>
                </div>
                <Badge className="border-0 bg-success/15 text-xs text-success">
                  {t("connected")}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
