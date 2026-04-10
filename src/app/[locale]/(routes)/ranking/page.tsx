import type { Metadata } from "next";
import { RankingPage } from "@/views/ranking";

export const metadata: Metadata = {
  title: "Ranking | Kordi",
};

export default function Page() {
  return <RankingPage />;
}
