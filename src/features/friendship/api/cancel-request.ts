import ky from "ky";
import type { Friendship } from "@/entities/friendship";

export function cancelFriendRequest(id: number): Promise<Friendship> {
  return ky.patch(`/api/friendships/${id}/cancel`).json<Friendship>();
}
