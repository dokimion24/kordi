"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { cancelFriendRequest } from "../api/cancel-request";
import { mapFriendshipError } from "./map-friendship-error";

export function useCancelRequest() {
  const qc = useQueryClient();
  const t = useTranslations();
  return useMutation({
    mutationFn: cancelFriendRequest,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["friendship", "sent"] });
      toast.success(t("friends.toast.cancelled"));
    },
    onError: async (err) => {
      toast.error(t(await mapFriendshipError(err)));
    },
  });
}
