import { queryOptions } from "@tanstack/react-query";
import { checkNickname } from "./check-nickname";
import { searchUserByNickname } from "./search-user";

export const userQueries = {
  checkNickname: (nickname: string) =>
    queryOptions({
      queryKey: ["user", "check-nickname", nickname],
      queryFn: () => checkNickname(nickname),
      enabled: nickname.length >= 2,
      staleTime: 5 * 1000,
    }),
  searchByNickname: (nickname: string) =>
    queryOptions({
      queryKey: ["user", "search", nickname],
      queryFn: () => searchUserByNickname(nickname),
      enabled: nickname.trim().length >= 2,
      staleTime: 10 * 1000,
      retry: false,
    }),
};
