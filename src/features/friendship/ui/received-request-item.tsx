"use client";

import { useTranslations } from "next-intl";
import { Check, X } from "lucide-react";
import type { Friendship } from "@/entities/friendship";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import { useAcceptRequest } from "../lib/use-accept-request";
import { useRejectRequest } from "../lib/use-reject-request";

interface ReceivedRequestItemProps {
  friendship: Friendship;
}

export function ReceivedRequestItem({ friendship }: ReceivedRequestItemProps) {
  const t = useTranslations("friends");
  const accept = useAcceptRequest();
  const reject = useRejectRequest();
  const disabled = accept.isPending || reject.isPending;

  return (
    <div className="glass flex items-center gap-3 rounded-xl px-3 py-2.5">
      <Avatar size="sm">
        <AvatarFallback className="text-xs">
          {friendship.senderNickname.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <span className="flex-1 truncate text-sm font-medium text-foreground">
        {friendship.senderNickname}
      </span>
      <Button
        size="sm"
        disabled={disabled}
        onClick={() => accept.mutate(friendship.id)}
      >
        <Check className="size-3.5" strokeWidth={2} />
        {t("accept")}
      </Button>
      <Button
        size="sm"
        variant="outline"
        disabled={disabled}
        onClick={() => reject.mutate(friendship.id)}
      >
        <X className="size-3.5" strokeWidth={2} />
        {t("reject")}
      </Button>
    </div>
  );
}
