import ky from "ky";
import type { Friendship } from "../model/types";

export function getFriends(): Promise<Friendship[]> {
  return ky.get("/api/backend/friendships").json<Friendship[]>();
}

export function getSentRequests(): Promise<Friendship[]> {
  return ky.get("/api/backend/friendships/sent").json<Friendship[]>();
}

export function getReceivedRequests(): Promise<Friendship[]> {
  return ky.get("/api/backend/friendships/received").json<Friendship[]>();
}
