import type { NextRequest } from "next/server";
import { apiClient } from "@/shared/api";
import { proxyBackend } from "@/shared/api/proxy";

export async function GET(request: NextRequest) {
  const nickname = request.nextUrl.searchParams.get("nickname") ?? "";
  return proxyBackend(async () => {
    const res = await apiClient
      .get("api/users/search", { searchParams: { nickname } })
      .json<{ data: unknown }>();
    return res.data;
  });
}
