"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { rejectFriendRequest } from "../api/reject-request";
import { mapFriendshipError } from "./map-friendship-error";

export function useRejectRequest() {
  const qc = useQueryClient();
  const t = useTranslations();
  return useMutation({
    mutationFn: rejectFriendRequest,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["friendship", "received"] });
      toast.success(t("friends.toast.rejected"));
    },
    onError: async (err) => {
      toast.error(t(await mapFriendshipError(err)));
    },
  });
}
