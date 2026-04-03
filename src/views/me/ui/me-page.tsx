import { useTranslations } from "next-intl";
import type { User } from "@/entities/user";
import { ProfileForm } from "@/features/profile";
import { LogoutButton } from "@/features/auth";
import { AppHeader } from "@/widgets/app-header";
import { Avatar, AvatarImage, AvatarFallback } from "@/shared/ui/avatar";
import { Label } from "@/shared/ui/label";
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

      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="glass w-full max-w-sm rounded-2xl p-8">
          {/* Profile Image */}
          <div className="mb-6 flex justify-center">
            <Avatar size="lg" className="size-20">
              <AvatarImage src={user.profileImageUrl ?? undefined} alt={user.nickname} />
              <AvatarFallback className="text-2xl">
                {user.nickname.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Email */}
          <div className="mb-6">
            <Label className="mb-1.5 text-muted-foreground">{t("email")}</Label>
            <p className="glass rounded-lg px-3 py-2 text-sm text-muted-foreground">
              {user.email}
            </p>
          </div>

          {/* Nickname Form */}
          <ProfileForm currentNickname={user.nickname} />

          <Separator className="my-6" />

          {/* Logout */}
          <LogoutButton label={tCommon("logout")} />
        </div>
      </div>
    </div>
  );
}
