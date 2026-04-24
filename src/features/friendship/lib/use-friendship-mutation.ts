"use client";

import { useMutation, useQueryClient, type QueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { mapFriendshipError } from "./map-friendship-error";

type QueryKey = readonly unknown[];

/**
 * Optimistic update contract: receives mutation vars + queryClient,
 * applies an immediate cache change, and returns a rollback closure.
 * Rollback runs on error.
 */
type OptimisticUpdate<TVars> = (
  vars: TVars,
  qc: QueryClient,
) => Promise<() => void> | (() => void);

interface UseFriendshipMutationOptions<TVars, TResult> {
  mutationFn: (vars: TVars) => Promise<TResult>;
  invalidateKeys: readonly QueryKey[];
  successKey: string;
  /** Optional optimistic cache update. */
  optimisticUpdate?: OptimisticUpdate<TVars>;
}

export function useFriendshipMutation<TVars, TResult>({
  mutationFn,
  invalidateKeys,
  successKey,
  optimisticUpdate,
}: UseFriendshipMutationOptions<TVars, TResult>) {
  const qc = useQueryClient();
  const t = useTranslations();
  return useMutation({
    mutationFn,
    onMutate: optimisticUpdate
      ? async (vars) => {
          // Cancel in-flight queries so they don't overwrite our optimistic state.
          await Promise.all(
            invalidateKeys.map((key) => qc.cancelQueries({ queryKey: key })),
          );
          const rollback = await optimisticUpdate(vars, qc);
          return { rollback };
        }
      : undefined,
    onSuccess: () => {
      toast.success(t(successKey));
    },
    onError: async (err, _vars, context) => {
      (context as { rollback?: () => void } | undefined)?.rollback?.();
      toast.error(t(await mapFriendshipError(err)));
    },
    onSettled: () => {
      for (const key of invalidateKeys) {
        qc.invalidateQueries({ queryKey: key });
      }
    },
  });
}

/**
 * Helper: builds an optimistic update that removes a matching item from
 * the given list query cache(s). Returns a rollback restoring prior data.
 */
export function removeFromLists(
  lists: readonly QueryKey[],
  matchId: number,
): OptimisticUpdate<number> {
  return (_vars, qc) => {
    const snapshots = lists.map(
      (key) =>
        [key, qc.getQueryData<{ id: number }[]>(key)] as const,
    );
    for (const [key, prev] of snapshots) {
      if (prev) {
        qc.setQueryData(
          key,
          prev.filter((item) => item.id !== matchId),
        );
      }
    }
    return () => {
      for (const [key, prev] of snapshots) {
        qc.setQueryData(key, prev);
      }
    };
  };
}
