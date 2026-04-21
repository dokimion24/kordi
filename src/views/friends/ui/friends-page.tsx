import { useTranslations } from "next-intl";
import { Users } from "lucide-react";
import type { User } from "@/entities/user";
import { AppHeader } from "@/widgets/app-header";
import { FriendsPanel } from "@/widgets/friends-panel";
import { AddFriendDialog } from "@/features/friendship";

interface FriendsPageProps {
  user: User;
}

export function FriendsPage({ user }: FriendsPageProps) {
  const t = useTranslations("friends");

  return (
    <div className="flex min-h-screen flex-col items-center">
      <AppHeader showBack title={t("title")} />

      <div className="w-full max-w-3xl flex-1 px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="size-6 text-brand-accent" strokeWidth={1.5} />
            <h2 className="text-xl font-bold text-foreground">{t("title")}</h2>
          </div>
          <AddFriendDialog currentUserId={user.id} />
        </div>

        <FriendsPanel currentUserId={user.id} />
      </div>
    </div>
  );
}
