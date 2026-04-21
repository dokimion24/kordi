"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { acceptFriendRequest } from "../api/accept-request";
import { mapFriendshipError } from "./map-friendship-error";

export function useAcceptRequest() {
  const qc = useQueryClient();
  const t = useTranslations();
  return useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["friendship", "received"] });
      qc.invalidateQueries({ queryKey: ["friendship", "friends"] });
      toast.success(t("friends.toast.accepted"));
    },
    onError: async (err) => {
      toast.error(t(await mapFriendshipError(err)));
    },
  });
}
