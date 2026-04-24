"use client";

import { acceptFriendRequest } from "../api/mutations";
import {
  removeFromLists,
  useFriendshipMutation,
} from "./use-friendship-mutation";

export function useAcceptRequest() {
  return useFriendshipMutation({
    mutationFn: acceptFriendRequest,
    invalidateKeys: [
      ["friendship", "received"],
      ["friendship", "friends"],
    ],
    successKey: "friends.toast.accepted",
    // Optimistic: remove from received list immediately; friends list will
    // reconcile on invalidation (server-assigned fields make optimistic insert risky).
    optimisticUpdate: (id, qc) =>
      removeFromLists([["friendship", "received"]], id)(id, qc),
  });
}
