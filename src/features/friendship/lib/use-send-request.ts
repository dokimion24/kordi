"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { sendFriendRequest } from "../api/send-request";
import { mapFriendshipError } from "./map-friendship-error";

export function useSendRequest() {
  const qc = useQueryClient();
  const t = useTranslations();
  return useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["friendship", "sent"] });
      toast.success(t("friends.toast.requestSent"));
    },
    onError: async (err) => {
      toast.error(t(await mapFriendshipError(err)));
    },
  });
}
