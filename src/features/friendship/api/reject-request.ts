import ky from "ky";
import type { Friendship } from "@/entities/friendship";

export function rejectFriendRequest(id: number): Promise<Friendship> {
  return ky.patch(`/api/friendships/${id}/reject`).json<Friendship>();
}
