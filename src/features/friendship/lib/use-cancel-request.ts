"use client";

import { cancelFriendRequest } from "../api/mutations";
import {
  removeFromLists,
  useFriendshipMutation,
} from "./use-friendship-mutation";

export function useCancelRequest() {
  return useFriendshipMutation({
    mutationFn: cancelFriendRequest,
    invalidateKeys: [["friendship", "sent"]],
    successKey: "friends.toast.cancelled",
    optimisticUpdate: (id, qc) =>
      removeFromLists([["friendship", "sent"]], id)(id, qc),
  });
}
