import { apiClient } from "@/shared/api";
import type { User } from "../model/types";

export async function getMe(): Promise<User> {
  return apiClient.get("api/users/me").json<User>();
}
