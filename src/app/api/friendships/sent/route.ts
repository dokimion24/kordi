import { apiClient } from "@/shared/api";
import { proxyBackend } from "@/shared/api/proxy";

export async function GET() {
  return proxyBackend(async () => {
    const res = await apiClient
      .get("api/friendships/sent")
      .json<{ data: unknown }>();
    return res.data;
  });
}
