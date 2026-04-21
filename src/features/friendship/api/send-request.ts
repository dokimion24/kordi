import ky from "ky";
import type { Friendship } from "@/entities/friendship";

export function sendFriendRequest(receiverId: number): Promise<Friendship> {
  return ky
    .post("/api/friendships", { json: { receiverId } })
    .json<Friendship>();
}
