import ky from "ky";
import type { User } from "@/entities/user";

export function updateProfile(nickname: string) {
  return ky.post("/api/profile/update", { json: { nickname } }).json<User>();
}
