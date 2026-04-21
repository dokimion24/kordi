import ky from "ky";
import type { Friendship } from "../model/types";

export function getSentRequests(): Promise<Friendship[]> {
  return ky.get("/api/friendships/sent").json<Friendship[]>();
}
