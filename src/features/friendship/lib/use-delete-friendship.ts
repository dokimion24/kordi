"use client";

import { deleteFriendship } from "../api/mutations";
import {
  removeFromLists,
  useFriendshipMutation,
} from "./use-friendship-mutation";

export function useDeleteFriendship() {
  return useFriendshipMutation({
    mutationFn: deleteFriendship,
    invalidateKeys: [["friendship", "friends"]],
    successKey: "friends.toast.deleted",
    optimisticUpdate: (id, qc) =>
      removeFromLists([["friendship", "friends"]], id)(id, qc),
  });
}
