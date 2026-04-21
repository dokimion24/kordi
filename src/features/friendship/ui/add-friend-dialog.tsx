"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { UserPlus, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { useSearchUser } from "../lib/use-search-user";
import { useSendRequest } from "../lib/use-send-request";
import { SearchResultCard } from "./search-result-card";

interface AddFriendDialogProps {
  currentUserId?: number;
}

export function AddFriendDialog({ currentUserId }: AddFriendDialogProps) {
  const t = useTranslations("friends");
  const [open, setOpen] = useState(false);
  const [nickname, setNickname] = useState("");

  const trimmed = nickname.trim();
  const { data, isFetching, isError } = useSearchUser(nickname);
  const { mutate, isPending } = useSendRequest();

  useEffect(() => {
    if (!open) setNickname("");
  }, [open]);

  const isSelf = data && currentUserId != null && data.id === currentUserId;

  const handleSend = () => {
    if (!data || isSelf) return;
    mutate(data.id, {
      onSuccess: () => setOpen(false),
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button size="sm" />}>
        <UserPlus className="size-3.5" strokeWidth={1.75} />
        {t("add")}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("add")}</DialogTitle>
          <DialogDescription>{t("addDescription")}</DialogDescription>
        </DialogHeader>

        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder={t("searchPlaceholder")}
            autoFocus
            className="pl-8"
          />
        </div>

        <div className="min-h-[60px]">
          {trimmed.length < 2 ? (
            <p className="py-3 text-center text-xs text-muted-foreground">
              {t("searchHint")}
            </p>
          ) : isFetching ? (
            <p className="py-3 text-center text-xs text-muted-foreground">
              {t("searching")}
            </p>
          ) : isError || !data ? (
            <p className="py-3 text-center text-xs text-muted-foreground">
              {t("noResult")}
            </p>
          ) : isSelf ? (
            <p className="py-3 text-center text-xs text-destructive">
              {t("error.cannotAddSelf")}
            </p>
          ) : (
            <SearchResultCard
              user={data}
              onSend={handleSend}
              disabled={isPending}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
