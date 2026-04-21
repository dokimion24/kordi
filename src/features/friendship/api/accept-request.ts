import ky from "ky";
import type { Friendship } from "@/entities/friendship";

export function acceptFriendRequest(id: number): Promise<Friendship> {
  return ky.patch(`/api/friendships/${id}/accept`).json<Friendship>();
}
