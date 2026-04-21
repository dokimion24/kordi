"use client";

import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { friendshipQueries, type Friendship } from "@/entities/friendship";
import {
  FriendItem,
  ReceivedRequestItem,
  SentRequestItem,
} from "@/features/friendship";
import { Badge } from "@/shared/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";

interface FriendsPanelProps {
  currentUserId: number;
}

export function FriendsPanel({ currentUserId }: FriendsPanelProps) {
  const t = useTranslations("friends");

  const friends = useQuery(friendshipQueries.friends());
  const received = useQuery(friendshipQueries.received());
  const sent = useQuery(friendshipQueries.sent());

  return (
    <Tabs defaultValue="friends" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="friends">
          {t("tabs.friends")}
          <Badge variant="secondary" className="ml-1">
            {friends.data?.length ?? 0}
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="received">
          {t("tabs.received")}
          {received.data && received.data.length > 0 ? (
            <Badge className="ml-1">{received.data.length}</Badge>
          ) : null}
        </TabsTrigger>
        <TabsTrigger value="sent">
          {t("tabs.sent")}
          <Badge variant="secondary" className="ml-1">
            {sent.data?.length ?? 0}
          </Badge>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="friends">
        <TabList
          isLoading={friends.isLoading}
          items={friends.data}
          emptyLabel={t("empty.friends")}
          loadingLabel={t("loading")}
          renderItem={(f) => (
            <FriendItem
              key={f.id}
              friendship={f}
              currentUserId={currentUserId}
            />
          )}
        />
      </TabsContent>

      <TabsContent value="received">
        <TabList
          isLoading={received.isLoading}
          items={received.data}
          emptyLabel={t("empty.received")}
          loadingLabel={t("loading")}
          renderItem={(f) => <ReceivedRequestItem key={f.id} friendship={f} />}
        />
      </TabsContent>

      <TabsContent value="sent">
        <TabList
          isLoading={sent.isLoading}
          items={sent.data}
          emptyLabel={t("empty.sent")}
          loadingLabel={t("loading")}
          renderItem={(f) => <SentRequestItem key={f.id} friendship={f} />}
        />
      </TabsContent>
    </Tabs>
  );
}

function TabList({
  isLoading,
  items,
  emptyLabel,
  loadingLabel,
  renderItem,
}: {
  isLoading: boolean;
  items: Friendship[] | undefined;
  emptyLabel: string;
  loadingLabel: string;
  renderItem: (f: Friendship) => React.ReactNode;
}) {
  if (isLoading) {
    return (
      <p className="py-10 text-center text-sm text-muted-foreground">
        {loadingLabel}
      </p>
    );
  }
  if (!items || items.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-muted-foreground">
        {emptyLabel}
      </p>
    );
  }
  return <div className="space-y-2 pt-2">{items.map(renderItem)}</div>;
}
