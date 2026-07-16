import ky from "ky";
import type { Friendship } from "@/entities/friendship";

export function sendFriendRequest(receiverId: number): Promise<Friendship> {
  return ky
    .post("/api/backend/friendships", { json: { receiverId } })
    .json<Friendship>();
}

export function acceptFriendRequest(id: number): Promise<Friendship> {
  return ky.patch(`/api/backend/friendships/${id}/accept`).json<Friendship>();
}

export function rejectFriendRequest(id: number): Promise<Friendship> {
  return ky.patch(`/api/backend/friendships/${id}/reject`).json<Friendship>();
}

export function cancelFriendRequest(id: number): Promise<Friendship> {
  return ky.patch(`/api/backend/friendships/${id}/cancel`).json<Friendship>();
}

export function deleteFriendship(id: number): Promise<void> {
  return ky.delete(`/api/backend/friendships/${id}`).json<void>();
}
