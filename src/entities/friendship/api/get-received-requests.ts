import ky from "ky";
import type { Friendship } from "../model/types";

export function getReceivedRequests(): Promise<Friendship[]> {
  return ky.get("/api/friendships/received").json<Friendship[]>();
}
