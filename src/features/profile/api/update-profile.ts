import ky from "ky";
import type { User } from "@/entities/user";

export function updateProfile(nickname: string) {
  return ky
    .patch("/api/backend/users/me/profile", { json: { nickname } })
    .json<User>();
}
