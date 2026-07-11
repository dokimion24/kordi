import type { Metadata } from "next";
import { QueryClient } from "@tanstack/react-query";
import { requireUser } from "@/entities/user/server";
import { FriendsPage } from "@/views/friends";

export const metadata: Metadata = {
  title: "Friends | Kordi",
};

export default async function Page() {
  const queryClient = new QueryClient();
  const user = await requireUser(queryClient);

  return <FriendsPage user={user} />;
}
