import { publicApiClient } from "@/shared/api/public-client";

export function checkNickname(nickname: string): Promise<boolean> {
  return publicApiClient
    .get("api/users/check-nickname", { searchParams: { nickname } })
    .json<{ data: boolean }>()
    .then((res) => res.data);
}
