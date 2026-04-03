"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { userQueries } from "@/entities/user/api/queries";

const DEBOUNCE_MS = 500;

export function useNicknameCheck(nickname: string, currentNickname: string) {
  const [debounced, setDebounced] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(nickname), DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [nickname]);

  const shouldCheck = debounced.length >= 2 && debounced !== currentNickname;

  const { data, isFetching } = useQuery({
    ...userQueries.checkNickname(debounced),
    enabled: shouldCheck,
  });

  if (!shouldCheck) return "idle" as const;
  if (isFetching) return "checking" as const;
  if (data === true) return "duplicated" as const;
  if (data === false) return "available" as const;
  return "idle" as const;
}
