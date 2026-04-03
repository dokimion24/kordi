"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { updateProfile } from "../api/update-profile";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { nicknameSchema, type NicknameFormValues } from "../model/schema";
import { useNicknameCheck } from "../lib/use-nickname-check";

interface ProfileFormProps {
  currentNickname: string;
}

export function ProfileForm({ currentNickname }: ProfileFormProps) {
  const t = useTranslations("me");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<NicknameFormValues>({
    resolver: zodResolver(nicknameSchema),
    defaultValues: { nickname: currentNickname },
  });

  const nickname = watch("nickname");
  const duplicateStatus = useNicknameCheck(nickname, currentNickname);
  const { mutate, isPending } = useMutation({ mutationFn: updateProfile });

  const onSubmit = (data: NicknameFormValues) => {
    if (duplicateStatus === "duplicated") return;
    mutate(data.nickname);
  };

  const errorKey = errors.nickname?.message;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label className="mb-1.5 text-muted-foreground">{t("nickname")}</Label>
        <Input
          {...register("nickname")}
          placeholder={t("nicknamePlaceholder")}
          aria-invalid={!!errors.nickname}
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
      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={
          duplicateStatus === "duplicated" ||
          duplicateStatus === "checking" ||
          isPending ||
          nickname === currentNickname
        }
      >
        {isPending ? "..." : t("save")}
      </Button>
    </form>
  );
}
