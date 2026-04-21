import { apiClient } from "@/shared/api";
import { proxyBackend } from "@/shared/api/proxy";

export async function PATCH(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  return proxyBackend(async () => {
    const res = await apiClient
      .patch(`api/friendships/${id}/cancel`)
      .json<{ data: unknown }>();
    return res.data;
  });
}
