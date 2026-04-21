import type { NextRequest } from "next/server";
import { apiClient } from "@/shared/api";
import { proxyBackend } from "@/shared/api/proxy";

export async function GET() {
  return proxyBackend(async () => {
    const res = await apiClient
      .get("api/friendships")
      .json<{ data: unknown }>();
    return res.data;
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  return proxyBackend(async () => {
    const res = await apiClient
      .post("api/friendships", { json: body })
      .json<{ data: unknown }>();
    return res.data;
  });
}
