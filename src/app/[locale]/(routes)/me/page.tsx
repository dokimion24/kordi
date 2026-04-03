import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { userServerQueries } from "@/entities/user/api/queries.server";
import { MePage } from "@/views/me";
import { ROUTES } from "@/shared/config/routes";

export const metadata: Metadata = {
  title: "My Profile | Kordi",
};

export default async function Page() {
  const queryClient = new QueryClient();

  try {
    await queryClient.fetchQuery(userServerQueries.me());
  } catch {
    redirect(ROUTES.LOGIN);
  }

  const user = queryClient.getQueryData(userServerQueries.me().queryKey);

  if (!user) {
    redirect(ROUTES.LOGIN);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MePage user={user} />
    </HydrationBoundary>
  );
}
