"use client";

import { rejectFriendRequest } from "../api/mutations";
import {
  removeFromLists,
  useFriendshipMutation,
} from "./use-friendship-mutation";

export function useRejectRequest() {
  return useFriendshipMutation({
    mutationFn: rejectFriendRequest,
    invalidateKeys: [["friendship", "received"]],
    successKey: "friends.toast.rejected",
    optimisticUpdate: (id, qc) =>
      removeFromLists([["friendship", "received"]], id)(id, qc),
  });
}
