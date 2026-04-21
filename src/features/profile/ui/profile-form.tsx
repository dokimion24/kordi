"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { updateProfile } from "../api/update-profile";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { nicknameSchema, type NicknameFormValues } from "../model/schema";
import { useNicknameCheck } from "../lib/use-nickname-check";

interface ProfileFormProps {
  currentNickname: string;
}

export function ProfileForm({ currentNickname }: ProfileFormProps) {
  const t = useTranslations("me");
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<NicknameFormValues>({
    resolver: zodResolver(nicknameSchema),
    defaultValues: { nickname: currentNickname },
  });

  const nickname = watch("nickname");
  const duplicateStatus = useNicknameCheck(nickname, currentNickname);
  const { mutate, isPending } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => setIsEditing(false),
  });

  const onSubmit = (data: NicknameFormValues) => {
    if (duplicateStatus === "duplicated") return;
    mutate(data.nickname);
  };

  const onDiscard = () => {
    reset({ nickname: currentNickname });
    setIsEditing(false);
  };

  const errorKey = errors.nickname?.message;

  return (
    <div>
      <p className="mb-2 text-sm font-medium text-primary">{t("displayName")}</p>

      {!isEditing ? (
        <div className="flex items-center gap-3">
          <div className="glass flex-1 rounded-xl px-4 py-3">
            <span className="text-sm text-foreground">{currentNickname}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="shrink-0 text-primary border-primary/30 hover:bg-primary/10"
            onClick={() => setIsEditing(true)}
          >
            {t("edit")}
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <Input
              {...register("nickname")}
              placeholder={t("nicknamePlaceholder")}
              aria-invalid={!!errors.nickname}
              autoFocus
            />
            {errorKey && (
              <p className="mt-1 text-xs text-destructive">{t(errorKey)}</p>
            )}
            {duplicateStatus === "checking" && (
              <p className="mt-1 text-xs text-muted-foreground">...</p>
            )}
            {duplicateStatus === "available" && (
              <p className="mt-1 text-xs text-success">{t("nicknameAvailable")}</p>
            )}
            {duplicateStatus === "duplicated" && (
              <p className="mt-1 text-xs text-destructive">{t("nicknameDuplicated")}</p>
            )}
          </div>
          <div className="flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onDiscard}
              className="text-muted-foreground"
            >
              {t("discard")}
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={
                duplicateStatus === "duplicated" ||
                duplicateStatus === "checking" ||
                isPending ||
                nickname === currentNickname
              }
            >
              {isPending ? "..." : t("save")}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
