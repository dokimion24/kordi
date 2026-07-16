import { apiClient } from "@/shared/api";
import type { Friendship } from "../model/types";

/**
 * Server-side variants of the friendship fetchers: hit the Spring API
 * directly (cookie → Bearer via apiClient) instead of the /api/backend
 * browser proxy, whose relative URLs cannot be resolved during SSR.
 */

function unwrap<T>(res: Promise<{ data: T }>): Promise<T> {
  return res.then((r) => r.data);
}

export function getFriendsServer(): Promise<Friendship[]> {
  return unwrap(apiClient.get("api/friendships").json<{ data: Friendship[] }>());
}

export function getSentRequestsServer(): Promise<Friendship[]> {
  return unwrap(
    apiClient.get("api/friendships/sent").json<{ data: Friendship[] }>(),
  );
}

export function getReceivedRequestsServer(): Promise<Friendship[]> {
  return unwrap(
    apiClient.get("api/friendships/received").json<{ data: Friendship[] }>(),
  );
}
