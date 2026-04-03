import { queryOptions } from "@tanstack/react-query";
import { getMe } from "./get-me";

export const userServerQueries = {
  me: () =>
    queryOptions({
      queryKey: ["user", "me"],
      queryFn: getMe,
    }),
};
