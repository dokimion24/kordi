"use client";

import { useTranslations } from "next-intl";
import type { Friendship } from "@/entities/friendship";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { useCancelRequest } from "../lib/use-cancel-request";

interface SentRequestItemProps {
  friendship: Friendship;
}

export function SentRequestItem({ friendship }: SentRequestItemProps) {
  const t = useTranslations("friends");
  const { mutate, isPending } = useCancelRequest();

  return (
    <div className="glass flex items-center gap-3 rounded-xl px-3 py-2.5">
      <Avatar size="sm">
        <AvatarFallback className="text-xs">
          {friendship.receiverNickname.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-1 items-center gap-2 truncate">
        <span className="truncate text-sm font-medium text-foreground">
          {friendship.receiverNickname}
        </span>
        <Badge variant="outline" className="text-[10px]">
          {t("pending")}
        </Badge>
      </div>
      <Button
        size="sm"
        variant="outline"
        disabled={isPending}
        onClick={() => mutate(friendship.id)}
      >
        {t("cancelRequest")}
      </Button>
    </div>
  );
}
