import { apiClient } from "@/shared/api";
import { proxyBackend } from "@/shared/api/proxy";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  return proxyBackend(async () => {
    await apiClient.delete(`api/friendships/${id}`).json();
    return null;
  });
}
