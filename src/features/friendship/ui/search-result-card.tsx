"use client";

import { useTranslations } from "next-intl";
import type { User } from "@/entities/user";
import { Avatar, AvatarImage, AvatarFallback } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import { UserPlus } from "lucide-react";

interface SearchResultCardProps {
  user: User;
  onSend: () => void;
  disabled?: boolean;
}

export function SearchResultCard({ user, onSend, disabled }: SearchResultCardProps) {
  const t = useTranslations("friends");

  return (
    <div className="glass flex items-center gap-3 rounded-xl px-3 py-2.5">
      <Avatar size="sm">
        <AvatarImage src={user.profileImageUrl ?? undefined} alt={user.nickname} />
        <AvatarFallback className="text-xs">
          {user.nickname.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <span className="flex-1 truncate text-sm font-medium text-foreground">
        {user.nickname}
      </span>
      <Button size="sm" onClick={onSend} disabled={disabled}>
        <UserPlus className="size-3.5" strokeWidth={1.75} />
        {t("sendRequest")}
      </Button>
    </div>
  );
}
