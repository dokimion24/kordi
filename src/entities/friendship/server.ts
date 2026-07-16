// Server-only exports. Uses next/headers via shared/api apiClient.
import "server-only";

export {
  getFriendsServer,
  getSentRequestsServer,
  getReceivedRequestsServer,
} from "./api/fetchers.server";
