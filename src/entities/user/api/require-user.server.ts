import { redirect } from "next/navigation";
import type { QueryClient } from "@tanstack/react-query";
import { ROUTES } from "@/shared/config/routes";
import type { User } from "../model/types";
import { userServerQueries } from "./queries.server";

/**
 * Auth guard for server components. Fetches the current user into the
 * query client (so pages can dehydrate it) and redirects to the login
 * page when unauthenticated.
 */
export async function requireUser(queryClient: QueryClient): Promise<User> {
  let user: User | undefined;
  try {
    user = await queryClient.fetchQuery(userServerQueries.me());
  } catch {
    // fall through to redirect
  }
  if (!user) redirect(ROUTES.LOGIN);
  return user;
}
