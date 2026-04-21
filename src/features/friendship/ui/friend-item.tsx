"use client";

import { useTranslations } from "next-intl";
import { MoreVertical, UserMinus } from "lucide-react";
import type { Friendship } from "@/entities/friendship";
import { Avatar, AvatarImage, AvatarFallback } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { useDeleteFriendship } from "../lib/use-delete-friendship";

interface FriendItemProps {
  friendship: Friendship;
  currentUserId: number;
}

export function FriendItem({ friendship, currentUserId }: FriendItemProps) {
  const t = useTranslations("friends");
  const { mutate, isPending } = useDeleteFriendship();

  const isSender = friendship.senderId === currentUserId;
  const otherNickname = isSender
    ? friendship.receiverNickname
    : friendship.senderNickname;

  return (
    <div className="glass flex items-center gap-3 rounded-xl px-3 py-2.5">
      <Avatar size="sm">
        <AvatarFallback className="text-xs">
          {otherNickname.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <span className="flex-1 truncate text-sm font-medium text-foreground">
        {otherNickname}
      </span>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button variant="ghost" size="icon-sm" />}
        >
          <MoreVertical className="size-3.5" strokeWidth={1.75} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            variant="destructive"
            disabled={isPending}
            onClick={() => mutate(friendship.id)}
          >
            <UserMinus className="size-4" />
            {t("delete")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
