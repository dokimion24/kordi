import { queryOptions } from "@tanstack/react-query";
import { checkNickname } from "./check-nickname";

export const userQueries = {
  checkNickname: (nickname: string) =>
    queryOptions({
      queryKey: ["user", "check-nickname", nickname],
      queryFn: () => checkNickname(nickname),
      enabled: nickname.length >= 2,
      staleTime: 5 * 1000,
    }),
};
