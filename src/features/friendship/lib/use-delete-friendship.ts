"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { deleteFriendship } from "../api/delete-friendship";
import { mapFriendshipError } from "./map-friendship-error";

export function useDeleteFriendship() {
  const qc = useQueryClient();
  const t = useTranslations();
  return useMutation({
    mutationFn: deleteFriendship,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["friendship", "friends"] });
      toast.success(t("friends.toast.deleted"));
    },
    onError: async (err) => {
      toast.error(t(await mapFriendshipError(err)));
    },
  });
}
