import ky from "ky";
import type { Friendship } from "../model/types";

export function getFriends(): Promise<Friendship[]> {
  return ky.get("/api/friendships").json<Friendship[]>();
}
