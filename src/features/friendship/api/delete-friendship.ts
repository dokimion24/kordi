import ky from "ky";

export function deleteFriendship(id: number): Promise<void> {
  return ky.delete(`/api/friendships/${id}`).json<void>();
}
