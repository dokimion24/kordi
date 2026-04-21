import ky from "ky";
import type { User } from "../model/types";

export function searchUserByNickname(nickname: string): Promise<User> {
  return ky
    .get("/api/users/search", { searchParams: { nickname } })
    .json<User>();
}
